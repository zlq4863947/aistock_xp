/**
 * 短线狙击手模块
 * 
 * @module core/sniper
 */
import moment from 'moment';
import _ from 'lodash';
import numeral from 'numeral';
import timelineplayer from 'timelineplayer';
import config from '../config/config';
import Trader from './trader';
import WebDriver from './webdriver';
import Gdb from '../market/gdb';
import store from '../store/mysql';
import logger from '../common/log';
import util from '../common/util';
const webDriver = new WebDriver();
const gdb = new Gdb();

/**
 * @class
 * @classdesc 短线狙击手
 * @param {string} code 股票代码
 */
class Sniper {
	constructor(code) {
		this.code = code || '6553';
		this.trader = new Trader();
		// 设置监视分钟为0
		this.minutes = 0;
		// 买卖信号
		this.signal = {};
		this.bar = {};
		this.isTest = config.account.test;
		this.testDate = config.account.testDate;
	}

	/**
	 * 监听
	 */
	watch() {
		try {
			if (!this.isTest) {
				this.trader.init();
				webDriver.init(() => {
					// 初始化后处理
					this.afterInit();
				});
			} else {
				// 初始化后处理
				this.afterInit();
			}
		} catch (e) {
			logger.error('运行出错：', e);
		}
	}

	afterInit() {
		let order = {
				code: this.code
			},
			invl2Time = moment.duration(10, 's').asMilliseconds();
		if (this.isTest) {
			invl2Time = moment.duration(1, 's').asMilliseconds();
		}
		let doWatch = () => {
			logger.info('短线狙击开始。');
			this.bar = {};
			this.invl2 = setInterval(() => {
				try {
					// 瞄准
					this.aim();
				} catch (e) {
					logger.error('狙击失败', e);
				}
			}, invl2Time);
		};
		if (!this.isTest) {
			webDriver.toMargin(order, () => {
				logger.info('信用界面跳转完了');
				this.invl = setInterval(() => {
					logger.info('每隔15分钟刷新网页');
					try {
						webDriver.refresh();
					} catch (e) {
						logger.error('15分钟刷新失败', e);
					}
				}, moment.duration(15, 'm').asMilliseconds());
				doWatch();
			});
		} else {
			doWatch();
		}
	}

	// 瞄准
	aim() {
		// 交易时段时，开始监听
		let isTradeTime = util.isTradeTime();
		this.autoStop();
		let nowTime = moment().format('HH:mm');
		if ((nowTime == '11:30' && !this.isTest) || isTradeTime || this.isTest) {
			// 获取价格
			this.getPrice((res) => {
				// 转换为数字
				if (!res || numeral(res.price).value() == null) {
					logger.error('未获取股价：', res);
					return;
				}
				let price = numeral(res.price).value();
				logger.info('获取股价：', res.price);
				if (this.isTest) {
					logger.info('测试时间：', res.time);
				}

				// 开盘价为空时，以当前价赋值
				if (!this.bar.open) {
					this.bar.open = this.bar.high = this.bar.low = price;
					this.bar.symbol = 'TYO:' + this.code;
				}
				// 生成K线
				this.makeBar(price);
				this.bar.date = moment().format('YYYY-MM-DD');
				this.bar.time = this.isTest ? res.time + moment().format(':ss') : moment().format('HH:mm:ss');
				this.bar.over = res.askOver;
				this.bar.under = res.bidUnder;
				// 刚开盘时不记录数据
				if (nowTime == '09:00' || nowTime == '12:30') {
					return;
				}
				/*
				this.trader.buy(bar);
				setTimeout(() => {
					this.trader.sell(bar);
				}, 15000)*/

				// 未开盘时不更新数据
				if (this.bar.open) {

					// 测试是分钟单位改为秒
					let mins = !this.isTest ? moment().minutes() : moment().second();

					// 每5分钟，执行一次
					if (!this.is5Mins && mins % 5 == 0) {
						logger.info('每5分钟，执行更新数据。');
						// 设置为已被执行
						this.is5Mins = true;
						this.bar.new = 0;
						this.updateDB(() => {
							this.bar = {};
						});
					}
					// 每1分钟，执行一次
					else if (this.minutes - mins < 0) {
						logger.info('每1分钟，执行更新数据。');
						// 设置5分钟执行一次方法，为可执行
						this.is5Mins = false;
						this.bar.new = 1;
						this.updateDB();
					} else {
						this.bar.new = 1;
						this.updateDB();
					}
					// 更新成当前分钟数
					this.minutes = mins;
				}
			});
		}
	}

	//获取股价
	getPrice(fn) {
		//真实环境
		if (!this.isTest) {
			webDriver.getPrice(fn)
		}
		//测试环境
		else {
			if (!this.testData) {
				// 初期化测试数据
				/**/
				store.select('mock_tick', {
					symbol: 'TYO:' + this.code,
					date: this.testDate
				}, (arr) => {
					let rows = _.uniqBy(arr, 'time');
					if (rows.length != 0) {
						fn && fn(rows[0]);
						//从第二个元素开始截取到末尾
						this.testData = rows.slice(1);
					}
				});
				/*
				let opt = {
					x: 'TYO',
					s: this.code,
					i: 300,
					p: '1d'
				}
				gdb.get(opt, (res) => {
					if (res.rows.length != 0) {
						fn && fn(res.rows[0]);
						//从第二个元素开始截取到末尾
						this.testData = res.rows.slice(1);
					}
				});*/

			} else {
				let tick = _.clone(this.testData[0]);
				fn && fn(tick);
				//删除第一个元素
				this.testData.splice(0, 1);
			}
		}
	}

	addMinTick(fn) {
		if (this.isTest) return;
		// 插入到分钟逐笔
		let min_tick = _.clone(this.bar);
		delete min_tick.new;
		store.insert('min_tick', min_tick);
		if (typeof fn != 'undefined')
			fn && fn();
	}

	getTrend(preData, nowData) {
		var trend = "0"; //盘整
		// 当天收盘 >= 昨天最高
		if (parseFloat(nowData.close) >= parseFloat(preData.high)) {
			trend = "2"; // 涨势
		}
		// 当天收盘 <= 昨天最低
		else if (parseFloat(nowData.close) <= parseFloat(nowData.low)) {
			trend = "1"; // 跌势
		}
		return trend;
	}

	/**
	 * 更新数据
	 * @return {object} bar K线对象
	 */
	updateDB(fn) {
		try {
			// 删除临时数据
			store.delete('analyst', {
				symbol: this.bar.symbol,
				new: '1'
			}, this.doSignal(() => {
				store.insert('analyst', this.bar);
				if (typeof fn != 'undefined')
					fn && fn();
			}));
		} catch (e) {
			logger.error('updateDB报错', e);
		}
	}

	doSignal(fn) {
		// 查询股票当然数据
		store.select('analyst', {
			symbol: this.bar.symbol,
			date: this.bar.date
		}, (data) => {
			if (data && data.length > 0 && this.bar.symbol) {
				this.bar.trend = this.getTrend(data[data.length - 1], this.bar);
				if (data.length < 8) {
					// 获取昨天5分钟数据
					/**/
					gdb.getYdayMin5(this.bar.symbol, (rows) => {
						// 取得昨天最后9条数据
						let last9 = rows.splice(rows.length - 9, rows.length - 1);
						// 插入到当天数组
						data = _.concat(last9, data);
						logger.info('股票数据不足8条, 通过gdb追加：', data.length);
						this.updateSignal(data);
					});
					//this.updateSignal(data);
				} else {
					this.updateSignal(data);
				}
			}
			if (typeof fn != 'undefined')
				fn && fn();
		});
	}

	// 更新信号
	updateSignal(data) {

		// 插入到当天数组
		data = _.concat(data, this.bar);
		let bars = gdb.calcK(data);
		let lastBar = bars[bars.length - 1];
		// 没有信号时
		if (util.isEmpty(this.signal) && lastBar) {
			if (lastBar.k < 15 && !this.buyPrice) {
				logger.info('记录买入信号', lastBar);
				// 记录买入信号
				this.signal.buy = true;
				// 记录股价
				this.signal.buyPrice = lastBar.close;
			}
			// 已买入股票时
			else if (lastBar.k > 85 && this.buyPrice) {
				logger.info('记录卖出信号', lastBar);
				// 记录卖出信号
				this.signal.sell = true;
				// 记录股价
				this.signal.sellPrice = lastBar.close;
			}
		}
		// 信号出现
		else {
			// 买入信号时
			if (this.signal.buy) {
				// 信号出现时股价 < 当前股价(股价上涨)
				if (this.signal.buyPrice < lastBar.close) {
					logger.info('股价上涨,立即买入', lastBar);
					// 买入
					this.trader.buy(lastBar);
					// 记录买入价
					this.buyPrice = lastBar.close;
					// 消除信号
					this.signal = {};
				} else {
					logger.info('更新买入信号股价', lastBar.close);
					// 记录当前股价
					this.signal.buyPrice = lastBar.close;
				}
			}
			// 卖出信号时
			if (this.signal.sell) {
				// 信号出现时股价 > 当前股价(股价下跌) && 并且盈利超过1000
				if (this.signal.sellPrice > lastBar.close && this.buyPrice && lastBar.close - this.buyPrice >= 11) {
					logger.info('股价下跌,立即卖出', lastBar);
					// 卖出
					this.trader.sell(lastBar);
					// 清空买入价
					this.buyPrice = null;
					// 消除信号
					this.signal = {};
				} else {
					logger.info('更新卖出信号股价', lastBar.close);
					// 记录当前股价
					this.signal.sellPrice = lastBar.close;
				}
			}
		}
	}

	/**
	 * 制作当前股价对象
	 * @return {object} bar K线对象
	 */
	makeBar(price) {
		this.bar.close = price;
		if (this.bar.high < price) {
			this.bar.high = price;
		}
		if (this.bar.low > price) {
			this.bar.low = price;
		}
	}

	trade(order, res) {
		// 获取买卖单位（购买单位*単元株数）
		order.volume = config.account.unit * res.roundLot;
		gdb.get({
			x: 'TYO',
			s: order.code,
			i: '300',
			p: '1d',
			price: res.price
		}, (data) => {
			let rows = data.rows;
			let k = rows[rows.length - 1].k;
			let time = moment().format('HH:mm:ss');
			// 第一次order.time为空 或者 order.time不等于当前时间
			if (!order.time || order.time != time) {
				order.time = time;
				let sniperRecord = {
					code: order.code,
					date: moment().format('YYYY-MM-DD'),
					time: order.time,
					price: order.price,
					k: k
				};
				// 写入DB
				store.insert('sniper', sniperRecord);
			}
			// 大于9；25时，执行买卖
			if (moment().isAfter(moment({
					h: 9,
					m: 25
				}))) {
				// 购买总价 = 价格*买卖单位株数
				let totalPrice = numeral(res.price).value() * order.volume;
				// 可购买单位
				let availableUnit = parseInt(numeral(res.power).value() / totalPrice);
				if (k < config.account.buyK && availableUnit) {
					logger.info('k：', k, '，价格：', res.price, '下买单。');
					// 小于k值20时，下单
					/*webDriver.marginBuy(order, () => {
						// 返回股票信息界面
						webDriver.toMargin(order);
					});*/
				} else if (k > config.account.sellK) {
					logger.info('k：', k, '，价格：', res.price, '下卖单。');
					// 大于k值85时，下单
					/*webDriver.marginSell(order, () => {
						// 返回股票信息界面
						webDriver.toMargin(order);
					});*/
				}
			}
		});
	}

	/**
	 * 启动监听
	 * @param  {string} timeslot 时间槽('am':上午盘，'pm':下午盘)
	 */
	start(timeslot) {
		this.watch();
	}

	/**
	 * 自动停止
	 */
	autoStop() {
		let time = moment().format('HH:mm');
		if (time == '15:31') { // time == '11:31' || 
			logger.info(time, ',自动停止webDriver');
			clearInterval(this.invl);
			clearInterval(this.invl2);
			webDriver.end();
			this.trader.end();
		}
	}
}

export default Sniper;