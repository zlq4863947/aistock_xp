import _ from 'lodash';
import Store from 'jfs';
import Table from 'cli-table2';
import numeral from 'numeral';
import Hesonogoma from '../../../src/app/market/hesonogoma';
import util from '../../../src/app/common/util';
import googleFinance from 'google-finance2';
import moment from 'moment';

const Stochastic = require('technicalindicators').Stochastic;
//const db = new Store("./path");
const hesonogoma = new Hesonogoma();

let buy = (order) => {
	table.push(
		[table.length + 1, order.code, order.date, order.num, order.price] //, order.sellPrice
	);
}

let sss = 0

let sell = (order) => {
	let sellInfo = find(order.code);
	/*console.log('sellInfo:', sellInfo);
	return;*/
	for (var i = 0; i < sellInfo.length; i++) {
		// 卖出价格
		sellInfo[i][5] = order.price;
		// 盈亏= （卖出价格 - 成本）*持仓数
		sellInfo[i][6] = numeral((order.price - sellInfo[i][4]) * sellInfo[i][3]).format('0,0');
	}
	// 盈亏总计
	var s = _.sumBy(sellInfo, function(o) {
		return numeral._.stringToNumber(o[6]);
	});
	// 成本总计
	var a = _.sumBy(sellInfo, function(o) {
		return o[4];
	}) * 1000;
	// 持仓总计
	var b = _.sumBy(sellInfo, function(o) {
		return o[3];
	});
	console.log('卖出日期:', order.date, '持仓总计:', b, '成本总计:', a, ',盈亏总计:', s);
	sss = sss + s;

	console.log('\n' + table.toString());
	console.log('累积盈亏总计:', numeral(sss).format('0,0'));
	//清空数组
	table.splice(0, table.length);
}
let find = (code) => {
	return _.filter(table, {
		1: code
	});
}

googleFinance.prices({
	symbol: 'TYO:6664',
	interval: 300,
	period: '60d'
}, (err, his) => { //5341 6200

	let closeList = _.chain(his).map(function(bar) {
		return bar.close;
	}).value();

	let lowList = _.chain(his).map(function(bar) {
		return bar.low;
	}).value();

	let highList = _.chain(his).map(function(bar) {
		return bar.high;
	}).value();

	let result = null;

	let input = {
		high: highList,
		low: lowList,
		close: closeList,
		period: 9,
		signalPeriod: 3
	};

	var calcRes = Stochastic.calculate(input);
	var barRes = his.slice(his.length - calcRes.length, his.length);

	for (var i = 0; i < calcRes.length; i++) {
		let date = moment(barRes[i].date).utc();
		barRes[i].k = calcRes[i].k;
		barRes[i].date = date.format('YYYY-MM-DD');
		barRes[i].time = date.format('HH:mm');
		/*
				if (calcRes[i].k < 10) {
					var bar = barRes[i];
					var orderInfo = {
						num: 2000,
						price: parseInt(bar.close),
						code: bar.symbol,
						date: bar.date
					}
					buy(orderInfo);
					//console.log('k: ', calcRes[i].k, ',买入股票: ', orderInfo);

					//console.log('calcRes: ', calcRes[i], ',barRes: ', barRes[i]);
				}
				if (calcRes[i].k > 80) {
					var bar = barRes[i];
					var orderInfo = {
						//num: 1000,
						price: bar.high,
						code: bar.symbol,
						date: bar.date
					};
					let stocks = find(orderInfo.code);
					if (stocks.length != 0) {
						sell(orderInfo);
					}
					//console.log('k: ', calcRes[i].k, ',卖出股票: ', orderInfo);
				} /**/
	}
	console.log(barRes);

});