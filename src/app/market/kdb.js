/**
 * Kdb接口模块
 * 
 * @module market/kdb
 */
import store from '../store/mysql';
import util from '../common/util';
import logger from '../common/log';
import Analyst from '../core/analyst';
import cheerio from 'cheerio';
var Store = require("jfs");
var db = new Store(".");
const analyst = new Analyst();

/**
 * @class
 * @classdesc {@link http://k-db.com/stocks/|Kdb接口}
 */
class Kdb {
	constructor() {}

	/**
	 * 获取股票基本情报
	 * @param  {string}   code 股票代码
	 * @param  {Function} fn 回调函数
	 * @return {object} 股票基本情报
	 */
	getHead(code, fn) {
		let $ = null,
			url = 'http://k-db.com/stocks/' + code;
		if (url.indexOf('-T') == -1) url += '-T';
		util.getHttp(url, (res) => {
			$ = cheerio.load(res);
			if ($) {
				let title = $("h1").text(); // [5341 東証2部] アサヒ衛陶 日足 時系列データ

				if (title.indexOf('[') == -1) {
					if (typeof fn != 'undefined')
						fn && fn(null);
					return false;
				}
				let [left, right] = title.split(']'); // ["[5341 東証2部", " アサヒ衛陶 日足 時系列データ"]
				let cg = left.substr(1, left.length).split(' ');
				let [c, g] = cg, n = right.substr(1, right.length).split(' ')[0];
				let info = {
					code: c,
					name: n,
					group: g,
					title: title
				};
				if (typeof fn != 'undefined')
					fn && fn(info);
			}
		});
	}

	getHistory(code, fn) {
		let url = 'http://k-db.com/stocks/' + code;
		if (url.indexOf('-T') == -1) {
			url += '-T';
		}
		url += '?download=csv';
		util.getCsvData(code, url, (res) => {
			logger.info('通过kdb获取：', code, ',历史csv数据。');
			if (res && res.length != 0) {
				res.shift();
				// 正序排序
				res = res.reverse();
				// kd值计算
				let kdList = analyst.getKDList(res.map(util.toStockObj));
				if (kdList && kdList.length != 0) {
					// kd值list在元list的偏移大小
					let offset = res.length - kdList.length;
					// 添加kd值
					for (let i = 0; i < kdList.length; i++) {
						// k
						res[offset + i][11] = (kdList[i].k || kdList[i].k == 0) ? Math.round(kdList[i].k) : null;
						// d
						res[offset + i][12] = (kdList[i].d || kdList[i].d == 0) ? Math.round(kdList[i].d) : null;
					}
				}

				// 数据整理
				for (let i = 0; i < res.length; i++) {
					res[i][2] = parseFloat(res[i][2]) + '';
					res[i][3] = parseFloat(res[i][3]) + '';
					res[i][4] = parseFloat(res[i][4]) + '';
					res[i][5] = parseFloat(res[i][5]) + '';
					if (i > 0) {
						// 获取趋势
						res[i][8] = util.getTrend(res[i - 1], res[i]);
					} else {
						res[i][8] = null;
					}
					// 间隔
					res[i][9] = null;
					// 时间
					res[i][10] = null;
					// k
					if (!res[i][11] && res[i][11] != 0)
						res[i][11] = null;
					// d
					if (!res[i][12] && res[i][12] != 0)
						res[i][12] = null;
				}
				if (typeof fn != 'undefined')
					fn && fn(res);
			} else {
				logger.error(code, ',未获取历史数据')
			}
		});
	}

	copyQuote(code, fn) {
		// 通过web获取
		this.getHead(code, (info) => {
			logger.info(code, ',copyQuote:通过web获取,', info);

			// 查询到数据时保存DB
			if (info) {
				store.select('stock_master', {
					code: code
				}, (data) => {
					if (!data || data.length == 0) {
						// 写入DB
						store.insert('stock_master', info);
					}
				});
				// 获取历史数据
				this.getHistory(code, (list) => {
					//logger.info('copyQuote->getHistory:取历史数据;', list);
					logger.info(
						'copyQuote->getHistory:获取%d条历史数据;%s\n...\n%s',
						list.length,
						JSON.stringify(list[0], null, 2),
						JSON.stringify(list[list.length - 1], null, 2)
					);

					// 写入DB
					if (list && list.length != 0) {
						store.insertMulti('stock', list);
					}

					let res = {
						head: info,
						list: list.map(util.toStockObj)
					}
					if (typeof fn != 'undefined')
						fn && fn(res);
				});
			} else { //TODO info永远不为空！！
				let res = {
					head: info,
					list: null
				}
				if (typeof fn != 'undefined')
					fn && fn(res);
			}
		});
	}

	copyToday(code, fn, todayData) {
		// 通过kdb获取当天数据
		if (!todayData) {
			// 获取历史数据
			this.getHistory(code, (list) => {
				//TODO 获取当天数据方式不好（顺序变换后，找不到）
				let info = list[list.length - 1];
				if (info[1] != util.getNowDate()) {
					logger.info(code + ',当天数据未更新');
					if (typeof fn != 'undefined')
						fn && fn(null);
					return;
				}
				// 获取趋势
				info.trend = util.getTrend(list[list.length - 2], info);
				logger.info(code + ',当天数据: ' + JSON.stringify(info));

				if (typeof fn != 'undefined')
					fn && fn(info);
				// 写入当天数据
				store.insert('stock', info);
			});
		}
		// 保存当天数据
		else {
			// 获取历史数据
			store.select('stock', {
				code: code
			}, (data) => {
				// DB有数据时
				if (data && data.length != 0) {
					//console.log(data.slice(data.length - 39, data.length))
					// kd值计算
					let res = analyst.getKDList(data.slice(data.length - 39, data.length)),
						lastKD = res.kdList[res.kdList.length - 1];
					todayData.k = (lastKD.k != null && lastKD.k != undefined) ? Math.round(lastKD.k) : null;
					todayData.d = (lastKD.d != null && lastKD.d != undefined) ? Math.round(lastKD.d) : null;
					todayData.trend = util.getTrend(data[data.length - 1], todayData);
					// 间隔
					todayData.period = null;
					// 时间
					todayData.time = null;
					store.delete('stock', {
						code: code,
						date: todayData.date
					}, () => {
						// console.log(todayData);
						// 写入当天数据
						store.insert('stock', todayData);
					});
				}
			});
		}
	}

	get(code, fn) {
		if (!code) return;
		if (code.indexOf('-T') != -1) {
			code = code.split('-T')[0];
		}
		store.select('stock', {
			code: code
		}, (data) => {
			// DB没有数据时
			if (!data || data.length == 0) {
				this.copyQuote(code, fn);
			} else {
				store.select('stock_master', {
					code: code
				}, (head) => {
					let res = {
						head: head[0],
						list: data
					}
					if (typeof fn != 'undefined')
						fn && fn(res);
				});
			}
		});
	}

	getList(code, fn) {
		if (!code) return;
		if (code.indexOf('-T') != -1) {
			code = code.split('-T')[0];
		}
		store.select('stock', {
			code: code
		}, (data) => {
			// DB没有数据时
			if (!data || data.length == 0) {
				this.copyQuote(code, fn);
			} else {
				let res = {
					data: data
				}
				if (typeof fn != 'undefined')
					fn && fn(res);
			}
		});
	}

	getStockList(fn) {
		store.select('stock_master', null, (data) => {
			if (typeof fn != 'undefined')
				fn && fn(data);
		});
	}

	getNoSetKDList(fn) {
		store.select('stock', {
			period: null,
			k: null
		}, (data) => {
			if (typeof fn != 'undefined')
				fn && fn(data);
		});
	}

	saveDde(record) {
		if (record) {
			store.select('dde', {
				date: record.date,
				time: record.time,
				topic: record.topic,
				item: record.item
			}, (data) => {
				// db中没有数据时，插入数据
				if (!data || data.length == 0) {
					store.insert('dde', record);
				} else {
					logger.info('数据库中存在重复数据，不进行插入操作', record);
				}
			});
		}
	}
}
export default Kdb;