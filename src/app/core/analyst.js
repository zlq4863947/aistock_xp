/**
 * 分析师模块
 * 
 * @module core/analyst
 */
import _ from 'lodash';
import Table from 'cli-table2';
import numeral from 'numeral';
import logger from '../common/log';

var Store = require("jfs");
var db = new Store(".");
const Stochastic = require('technicalindicators').Stochastic;
/**
 * @class
 * @classdesc 分析师
 */
class Analyst {
	constructor() {}

	/**
	 * 获取KD数组值
	 * @param  {Object} his 计算kd值的原始数据
	 * @return {array} kd值列表 [{d:??,k:??},...]
	 */
	getKDList(his) {
		//console.log(his)
		if (!his || his.length == 0) return;
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
		return Stochastic.calculate(input);
		// [{d:??,k:??},...]
	}
}

export default Analyst;