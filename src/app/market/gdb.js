/**
 * google财经接口模块
 * 
 * @module market/gdb
 */
import _ from 'lodash';
import numeral from 'numeral';
import Hesonogoma from './hesonogoma';
import util from '../common/util';
import googleFinance from 'google-finance2';
import moment from 'moment';
//import Store from 'jfs';
//const db = new Store("./path");
const Stochastic = require('technicalindicators').Stochastic;

/**
 * @class
 * @classdesc google财经接口 <br>{@link http://www.google.com/intl/zh-CN/googlefinance/disclaimer/?ei=lHuEWYGOJcWY0ATG8I3IBA|交易所延迟时间说明}
 */
class Gdb {
	/**
	 * 获取股价数据
	 * @param  {Object}   opt 参数对象
	 * @param  {string}   opt.x 交易所代码
	 * @param  {string}   opt.s 股票代码
	 * @param  {string}   opt.i 间隔(秒)
	 * @param  {string}   opt.p 区间单位(1d=一天)
	 * @param  {Function} fn  回调函数
	 * @return {array} 股价数组
	 */
	get(opt, fn) {
		// 区间加1，以用于kdj计算
		let pNum = opt.p ? parseInt(opt.p.slice(0, opt.p.length - 1)) + 1 : '';
		let pStr = opt.p ? opt.p.slice(opt.p.length - 1, opt.p.length) : '';
		googleFinance.prices({
			symbol: opt.x + ':' + opt.s,
			interval: opt.i,
			period: pNum + pStr
		}, (err, his) => {
			let half_length = Math.ceil(his.length / 2);
			//取得昨天数据
			let leftSide = his.splice(0, half_length);
			// 取得昨天最后9条数据
			let last9 = leftSide.splice(leftSide.length - 8, leftSide.length - 1);
			// 插入到当天数组
			his = _.concat(last9, his);
			if (opt.price) {
				his = _.concat(his, this.makeNowS(opt.price, his[his.length - 1]));
			}
			let bars = this.calcK(his);
			let res = {
				// 取得当天数据
				rows: bars
			};
			/*
			_.filter(bars, {
					'date': moment().format('YYYY-MM-DD')
				})
			 */
			if (typeof fn != 'undefined')
				fn && fn(res);
		});
	}

	// 获取昨天5分钟数据
	getYdayMin5(symbol, fn) {
		googleFinance.prices({
			symbol: symbol,
			interval: 300,
			period: '2d'
		}, (err, his) => {
			if (typeof fn != 'undefined')
				fn && fn(his);
		});
	}

	/**
	 * 制作当前股价对象
	 * @param  {string} price 价格
	 * @param  {object} bar K线对象
	 * @param  {string} bar.high 最高价
	 * @param  {string} bar.low 最低价
	 * @return {object} bar K线对象
	 */
	makeNowS(price, bar) {
		bar.close = price;
		if (bar.high < price) {
			bar.high = price;
		}
		if (bar.low > price) {
			bar.low = price;
		}

		return bar;
	}

	/**
	 * 计算K值
	 * @param  {array} his K线数组
	 * @return {array} 计算K值后的K线数组
	 */
	calcK(his) {

		let closeList = _.chain(his).map(function(bar) {
			return bar.close;
		}).value();

		let lowList = _.chain(his).map(function(bar) {
			return bar.low;
		}).value();

		let highList = _.chain(his).map(function(bar) {
			return bar.high;
		}).value();

		let input = {
			high: highList,
			low: lowList,
			close: closeList,
			period: 9,
			signalPeriod: 3
		};

		let calcRes = Stochastic.calculate(input);

		let bars = his.slice(his.length - calcRes.length, his.length);

		for (let i = 0; i < calcRes.length; i++) {
			if (calcRes[i].k || calcRes[i].k == 0) {
				bars[i].k = Math.round(calcRes[i].k);
			}
			if (bars[i].date && bars[i].date.length > 10) {
				let date = moment(bars[i].date).utc();
				bars[i].date = date.format('YYYY-MM-DD');
				bars[i].time = date.format('HH:mm:ss');
			}
		}
		return bars;
	}
}
export default Gdb;