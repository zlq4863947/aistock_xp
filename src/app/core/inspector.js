/**
 * 情报员模块
 * 
 * @module core/inspector
 */
import dde from 'node-dde';
import ws from 'ws';
import Kdb from '../market/kdb';
import util from '../common/util';
import timelineplayer from 'timelineplayer';
import ddeConfig from '../api/dde.json';
import logger from '../common/log';
import datejs from 'datejs';
const kdb = new Kdb();
/**
 * 情报员 Inspector
 * Created by 23tl on 2017/4/16.
 */
/*class Inspector {
    constructor() {
        this.webSocket = new WebSocket();
    }

    listen(mock) {
        // 启动实时更新服务
        this.webSocket.listen(mock);
    }
}*/

/**
 * @class
 * @classdesc DDE情报员
 */
class DdeInspector {
    constructor(codeList, mock, watchStock) {
        if (codeList && codeList.length != 0) {
            this.tick = {};
            this.mock = mock;
            this.watchStock = watchStock;
            // 监视项目
            this.items = !watchStock ? ddeConfig.watchItems : ddeConfig.watchStock;
            // 项目名对应关系映射
            this.mapper = ddeConfig.watchMapper;

            // 真实模式
            if (!mock) {
                let RSS = this.RSS = {};
                for (var i = 0; i < codeList.length; i++) {
                    RSS[codeList[i] + '.T'] = this.items;
                }

                // 多只股票检测
                if (codeList.length > 1) {
                    this.client = dde.createClients({
                        RSS
                    }, 'shift_jis');
                } else if (codeList.length == 1) { // 单只股票检测
                    this.client = dde.createClient('RSS', Object.keys(RSS)[0]);
                }
            } else { // 测试模式
                let T_RSS = this.T_RSS = {};
                for (var i = 0; i < codeList.length; i++) {
                    T_RSS[codeList[i] + '.T'] = this.items;
                }

                // 多只股票检测
                if (codeList.length > 1) {
                    this.client = dde.createClients({
                        T_RSS
                    }, 'shift_jis');
                } else if (codeList.length == 1) { // 单只股票检测
                    this.client = dde.createClient('T_RSS', Object.keys(T_RSS)[0]);
                }
            }
            //logger.info(this);
        }
    }

    /**
     * 运行dde监听服务
     * @param  {WebSocket} ws WebSocket类实例
     */
    runServ(ws) {
        let dde = this;
        (new timelineplayer([
            [1000, function() {
                ws ? ws.ddeIntcer.listen(ws) : dde.listen();
            }],
            [43200000, function() { //12H
                ws ? ws.ddeIntcer.stop() : dde.stop();
            }]
        ], function(p, v) {
            v[1]();
        })).play();
    }

    /**
     * 监听实时数据
     * @param  {WebSocket} ws WebSocket类实例
     */
    listen(ws) {
        let client = this.client;
        try {
            client.connect();
            logger.info("监听状态: " + client.isConnected());
            if (!client.isConnected()) {
                return;
            }
            client.on('advise', function(service, topic, item, text) {
                //logger.info("topic:", topic, "item:", item, "text:", text);
                logger.info("topic:", topic, "item:", item, "text:", text);
                if (item == '売買代金') {
                    // 売買代金*1000
                    text = parseFloat(text) * 1000;
                }
                console.log(text)
                    // 实时更新股价
                if (this.watchStock) {
                    this.watchQuote(topic, item, text);
                }
                // 实时更新交易详情
                else {
                    this.watchDde(topic, item, text);
                }

            }.bind(this));

            this.start();
        } catch (e) {
            logger.error("连接dde出错:", e);
        }
    }

    /**
     * 监听dde数据
     */
    watchDde(topic, item, text) {
        // 该股票tick数据没有时
        if (!this.tick[topic]) {
            // 初始化
            this.tick[topic] = {};
            // 股票代码
            this.tick[topic].code = topic.split('.T')[0];
            // 时间(YYYY-MM-DD)
            this.tick[topic].date = this.mock ? this.mock.date : util.getNowDate();
            // 开盘unix时间戳
            this.tick[topic].open_time = Date.parse(this.tick[topic].date + 'T09:00:00').getTime() / 1000;
        }
        // 去掉u0000字符 并且设置tick数据
        this.tick[topic][this.mapper[item]] = parseFloat(text.trim().split("\u0000")[0]) + '';
        if (item == '現在値詳細時刻') {
            this.tick[topic]['epoch'] = Date.today().at(this.tick[topic][this.mapper[item]]).getTime() / 1000;
        }

        let nowTime = new Date().toString('HH:mm:ss.ms');
        nowTime = nowTime.substr(0, nowTime.length - 1);

        // 存入DB
        let record = {
            date: this.tick[topic].date,
            time: nowTime,
            topic: topic,
            item: item,
            text: text.trim()
        };

        // 有值时存储
        if (record.text) {
            kdb.saveDde(record);
        }

        // 收到【現在値詳細時刻】数据时
        if (this.tick[topic]['epoch'] && this.tick[topic]["close"] && this.tick[topic]["low"] && this.tick[topic]["high"] && this.tick[topic]["open_time"] && this.tick[topic]["open"]) {
            // 当上一次股价为空，或者上一次股价不等于本次股价时
            if (!this.tick[topic]['preClose'] || this.tick[topic]['preClose'] != this.tick[topic]['close']) {
                logger.info("sendTick:", topic);
                // 发送ws
                this.sendTick(topic, (data) => {
                    if (ws) {
                        ws.send(JSON.stringify(data), (err) => {
                            if (err) {
                                logger.info(`[SERVER] error: ${err}`);
                            }
                        });
                    }
                });
            }
            this.tick[topic]['preClose'] = this.tick[topic]['close'];
        }
        //logger.info("tick:", this.tick);
    }

    /**
     * 监听报价数据
     */
    watchQuote(topic, item, text) {

        // 该股票tick数据没有时
        if (!this.tick[topic]) {
            // 初始化
            this.tick[topic] = {};
            // 股票代码
            this.tick[topic].code = topic.split('.T')[0];
            // 时间(YYYY-MM-DD)
            this.tick[topic].date = this.mock ? this.mock.date : util.getNowDate();
        }
        // 去掉u0000字符 并且设置tick数据
        this.tick[topic][this.mapper[item]] = parseFloat(text.trim().split("\u0000")[0]);

        // 收到詳細数据时
        if (this.tick[topic]['close'] && this.tick[topic]['low'] && this.tick[topic]['high'] && this.tick[topic]['open'] && this.tick[topic]['volume'] && this.tick[topic]['turnover']) {
            let todayData = this.tick[topic];
            //插入数据库
            kdb.copyToday(todayData.code, null, todayData);
        }
    }

    /**
     * 发送tick数据
     */
    sendTick(topic, fn) {
        let lastTick = {
            "echo_req": {
                "count": 1,
                "end": "latest",
                // 粒度：蜡烛的时间维度。默认60(秒)
                "granularity": 86400,
                "style": "candles",
                // 如果设置为1，将发送更新的价格变化
                "subscribe": 1,
                "ticks_history": this.tick[topic].code
            },
            "msg_type": "candles",
            "candles": [{
                "close": this.tick[topic].close,
                "epoch": this.tick[topic].epoch,
                "granularity": 86400,
                "high": this.tick[topic].high,
                //"id": "d0ceee7c-3653-c654-31e9-f7f8e7f53e90",
                "low": this.tick[topic].low,
                "open": this.tick[topic].open,
                "open_time": this.tick[topic].open_time,
                "symbol": this.tick[topic].code
            }]
        }
        logger.info('lastTick:', lastTick);

        if (typeof fn != 'undefined')
            fn && fn(lastTick);
    }

    /**
     * 开启监听
     */
    start() {
        // 多只股票检测
        if (Object.keys(!this.mock ? this.RSS : this.T_RSS).length > 1) {
            this.client.startAdvise();
        } else if (Object.keys(!this.mock ? this.RSS : this.T_RSS).length == 1) { // 单只股票检测
            for (var i = 0; i < this.items.length; i++) {
                this.client.startAdvise(this.items[i]);
            }
        }
    }

    /**
     * 关闭监听
     */
    stop() {
        try {
            if (this.client.isConnected()) {
                if (Object.keys(!this.mock ? this.RSS : this.T_RSS).length > 1) {
                    this.client.stopAdvise();
                } else if (Object.keys(!this.mock ? this.RSS : this.T_RSS).length == 1) {
                    for (var i = 0; i < this.items.length; i++) {
                        this.client.stopAdvise(this.items[i]);
                    }
                }
                this.client.dispose();
            }
        } catch (e) {
            logger.error("关闭dde监听出错:", e);
        }
    }
}


/**
 * @class
 * @classdesc WebSocket类
 */
class WebSocket {
    constructor(port) {
        this.port = process.env.PORT || '7071';
        this.server = new ws.Server({
            port: this.port
        });
    }

    /**
     * 监听实时数据
     */
    listen(mock) {
        this.server.on('connection', function(ws) {
            ws.on('message', function(message) {
                logger.info(`[SERVER] Received: ${message}`);
                var msg = JSON.parse(message);
                // 获取市场信息
                if (msg.trading_times) {
                    kdb.getStockList((data) => {
                        if (data) {
                            var symbols = [];
                            for (var i = 0; i < data.length; i++) {
                                symbols.push({
                                    name: data[i].name,
                                    settlement: '',
                                    symbol: data[i].code,
                                    times: {
                                        close: ['--'],
                                        open: ['--'],
                                        settlement: '--'
                                    }
                                })
                            }
                            var res = {
                                "echo_req": {
                                    "req_id": 1,
                                    "trading_times": util.getNowDate()
                                },
                                "msg_type": "trading_times",
                                "req_id": 1,
                                "trading_times": {
                                    "markets": [{
                                        "name": "股票",
                                        "submarkets": [{
                                            "name": "东证",
                                            "symbols": symbols
                                        }]
                                    }]
                                }
                            };
                            logger.info(res);
                            ws.send(JSON.stringify(res), (err) => {
                                if (err) {
                                    logger.info(`[SERVER] error: ${err}`);
                                }
                            });
                        }
                    });
                } else if (msg.ticks_history) { //获取商品历史数据
                    // {"ticks_history":"5341","start":1493337600,"end":"latest","granularity":"D1","adjust_start_time":1}
                    kdb.get(msg.ticks_history, (data) => {
                        if (data && data.list) {
                            var candles = data.list;
                            for (var i = 0; i < candles.length; i++) {
                                // 设置Unix时间戳(毫秒转成秒)
                                candles[i].epoch = Date.parse(candles[i].date + 'T09:00:00') / 1000;
                            }
                            var res = {
                                msg_type: 'candles',
                                req_id: 2,
                                candles: candles,
                                echo_req: {
                                    adjust_start_time: 1,
                                    count: 5000,
                                    end: 'latest',
                                    granularity: 86400,
                                    req_id: 2,
                                    start: candles[0].epoch,
                                    style: 'candles',
                                    ticks_history: msg.ticks_history
                                }
                            }
                            ws.send(JSON.stringify(res), (err) => {
                                if (err) {
                                    logger.info(`[SERVER] error: ${err}`);
                                }
                            });
                        }
                        /*
                        try {
                            logger.info('DDE获取最新行情');
                            // 获取最新行情
                            //TODO 多个WS时有隐患？
                            if (ws.ddeIntcer) {
                                logger.info('已经开启dde监听：', Object.keys(ws.ddeIntcer.tick));
                                ws.ddeIntcer.stop();
                                logger.info('关闭后,重开监听：', msg.ticks_history);
                            }
                            ws.ddeIntcer = new DdeInspector([msg.ticks_history], mock);
                            ws.ddeIntcer.runServ(ws);
                        } catch (err) {
                            logger.info("ddeIntcer异常:", err);
                        }*/
                    });
                }
            });

            ws.on('close', () => {
                if (ws.ddeIntcer) {
                    logger.info('on close ws,', Object.keys(ws.ddeIntcer.tick));
                    ws.ddeIntcer.stop();
                }
            });
        });

        console.log('ws server started at port ' + this.port + '...');
    }

    /**
     * 关闭监听
     */
    close() {
        this.server.close();
    }
}

export default {
    WebSocket: WebSocket,
    DdeInspector: DdeInspector
};