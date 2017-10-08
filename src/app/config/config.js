/**
 * Created by zlq4863947 on 2017/4/6.
 */
var config = {
    log: {
        appenders: [{
            "type": "console",
            "layout": {
                "type": "pattern",
                "pattern": "%[%d{yyyy-MM-ddThh:mm:ss.SSS} [pid=%x{pid}] %p %c -%] %m",
                "tokens": {
                    pid: () => {
                        return process.pid;
                    }
                }
            }
        }, {
            "type": "file",
            "filename": "./../logs/aistock.log",
            "layout": {
                "type": "pattern",
                "pattern": "%d{yyyy-MM-ddThh:mm:ss.SSS} [pid=%x{pid}] %p %c - %m",
                "tokens": {
                    pid: () => {
                        return process.pid;
                    }
                }
            }
        }],
        "replaceConsole": true
    },
    mysql: {
        host: 'xxx', //'127.0.0.1',
        port: '3306', //'3306',
        user: 'admin',
        password: "xxx", //数据库密码
        database: 'xxx'
    },
    account: {
        id: 'xxx',
        //userId: 'test',
        userId: 'stoc',
        pass: 'xxx',
        otp: 'xxx',
        sellK: 95,
        buyK: 10,
        unit: 5,
        unitNum: 200,
        // 长线持仓数
        longLen: 1 //,
            // 测试模式
            //test: true,
            //testDate: '2017-08-22'
    }
};
module.exports = config;