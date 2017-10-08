/**
 * 共通模块
 * 
 * @module common/util
 */
import moment from 'moment';
import http from 'http';
import https from 'https';
import csv from 'fast-csv';
import jpHolidays from 'japanese-holidays';
import datejs from 'datejs';
import logger from './log';
import _ from 'lodash';

/**
 * 日志对象
 */
const util = {
	/**
	 * 判断是否为假日
	 * @func isHoliday
	 * @param  {Date} date 日期
	 */
	isHoliday: function(date) {
		return jpHolidays.isHoliday(date) ? true : false;
	},
	/**
	 * 判断是否为周末
	 * @func isWeekend
	 * @param  {Date} date 日期
	 * @return {boolean} 为周末时返回true
	 */
	isWeekend: function(date) {
		return date.getDay() % 6 == 0 ? true : false;
	},
	/**
	 * 判断是否为交易日
	 * @func isTradeDate
	 * @param  {Date} date 日期
	 * @return {boolean} 为交易日时返回true
	 */
	isTradeDate: function(date) {
		return !this.isHoliday(date) && !this.isWeekend(date);
	},
	/**
	 * 判断是否为交易时间
	 * @func isTradeTime
	 * @return {boolean} true:现在为交易时间
	 */
	isTradeTime: function() {
		if (!this.isTradeDate(new Date())) {
			return false;
		}
		let format = 'hh:mm';
		let time = moment();
		let amSTime = moment('09:00', format),
			amETime = moment('11:30', format),
			pmSTime = moment('12:30', format),
			pmETime = moment('15:00', format);
		logger.info("判断是否为交易时间，time：",time,",amSTime:",amSTime,",amETime:",amETime,",pmSTime:",pmSTime,",pmETime:",pmETime);
		if (time.isBetween(amSTime, amETime) || time.isBetween(pmSTime, pmETime)) {
			return true;
		}
		return false;
	},
	/**
	 * 获取当前日时
	 * @func getNowDatetime
	 * @param  {string} date 日期('yyyy-MM-dd HH:mm:ss.ms')
	 * @return {string} 当前日时
	 */
	getNowDatetime: function() {
		let d = new Date().toString('yyyy-MM-dd HH:mm:ss.ms');
		return d.substr(0, d.length - 1);
	},
	/**
	 * 获取当前日期
	 * @func getNowDate
	 * @param  {string} date 日期('yyyy-MM-dd')
	 * @return {string} 当前日期
	 */
	getNowDate: function() {
		return Date.today().toString('yyyy-MM-dd');
	},
	/**
	 * 左侧填充
	 * @func leftpad
	 * @param  {string} str 待填充字符串
	 * @param  {string} len 需要填充的长度
	 * @param  {string=}[ch=' '] 填充字符
	 * @return {string} 已填充字符串
	 */
	leftpad: function(str, len, ch) {
		str = String(str);
		if (!ch && ch !== 0) ch = ' ';
		return String(ch).repeat(len - str.length) + str;
	},
	/**
	 * 获取http资源
	 * @func getHttp
	 * @param  {string}   url 资源url路径
	 * @param  {requestCallback} fn  回调函数
	 */
	getHttp: function(url, fn) {
		http.get(url, (res) => {
			//console.log(`STATUS: ${res.statusCode}`);
			//console.log(`HEADERS: ${JSON.stringify(res.headers)}`);

			let body = '';
			res.setEncoding('utf8');

			res.on('data', (chunk) => {
				body += chunk;
			});

			res.on('end', () => {
				fn && fn(body);
			});
		})
	},
	/**
	 * 获取https资源
	 * @func getHttps
	 * @param  {string}   url 资源url路径
	 * @param  {requestCallback} fn  回调函数
	 */
	getHttps: function(url, fn) {
		https.get(url, (res) => {
			//console.log(`STATUS: ${res.statusCode}`);
			//console.log(`HEADERS: ${JSON.stringify(res.headers)}`);

			let body = '';
			res.setEncoding('utf8');

			res.on('data', (chunk) => {
				body += chunk;
			});

			res.on('end', () => {
				fn && fn(body);
			});
		})
	},
	/**
	 * 获取csv格式数据
	 * @func getCsvData
	 * @param  {string}   code 股票代码
	 * @param  {string}   url 资源url路径
	 * @param  {requestCallback} fn  回调函数
	 */
	getCsvData: function(code, url, fn) {
		this.getHttp(url, (res) => {
			let dataArr = [];
			csv.fromString(res)
				.on("data", function(data) {
					data.splice(0, 0, code);
					dataArr.push(data);
				})
				.on("end", function() {
					fn && fn(dataArr);
				});
		});
	},
	/**
	 * 判定趋势
	 * @func getTrend
	 * @param  {array}   preData 前一条数据
	 * @param  {array}   nowData 当前数据
	 * @return {string}  [0：盘整，1：跌势，2：涨势]
	 * @example
	 * 参数数组格式：
	 * [0][1][2][3][4][5][6][7][8]
	 * [代码][日期][开盘][最高][最安][收盘][6][7][8]
	 */
	getTrend: function(preData, nowData) {
		var trend = "0"; //盘整
		// 当天收盘 >= 昨天最高
		if (parseFloat(nowData[5]) >= parseFloat(preData[3])) {
			trend = "2"; // 涨势
		}
		// 当天收盘 <= 昨天最低
		else if (parseFloat(nowData[5]) <= preData[4]) {
			trend = "1"; // 跌势
		}
		return trend;
	},
	/**
	 * 指定休眠时间
	 * @func sleep
	 * @param  {string} ms 休眠的毫秒数
	 * 
	 * @example
	 * async function demo() {
	 *  console.log('Taking a break...');
	 *  await util.sleep(4000);
	 *  console.log('Two second later');
	 *}
	 * demo();
	 */
	sleep: function(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	},
	/**
	 * 转换成股票对象
	 * @func toStockObj
	 * @param  {array}   arr 股票数组
	 * @return {object}  股票对象
	 * @example
	 * ['code', 'date', 'open', 'high', 'low', 'close', 'volume', 'turnover', 'trend', 'period', 'time', 'k', 'd'];
	 * arr to obj -> list.map(util.toStockObj)
	 */
	toStockObj: function(arr) {
		let names = ['code', 'date', 'open', 'high', 'low', 'close', 'volume', 'turnover', 'trend', 'period', 'time', 'k', 'd'];
		return arr.reduce(function(p, c, i) {
			p[names[i]] = c;
			return p;
		}, {});
	},
	/**
	 * 转换成股票数组
	 * @func toStockArr
	 * @param {array} objs 股票对象格式的数组
	 * @return  {array}   股票数组
	 * @example
	 * {a:1,b:2} ->[1,2]
	 */
	toStockArr: function(objs) {
		return _.map(objs, function(val) {
			return val;
		});
	},
	isEmpty: function(obj) {
		return !Object.keys(obj).length;
	}
};

export default util;

/**
 * 资源请求回调函数
 * 
 * @callback requestCallback
 * @param {object} response 响应对象
 */