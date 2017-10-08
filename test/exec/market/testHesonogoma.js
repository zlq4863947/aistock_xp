import Hesonogoma from '../../../src/app/market/hesonogoma';
import Kdb from '../../../src/app/market/kdb';
import Analyst from '../../../src/app/core/analyst';
import util from '../../../src/app/common/util';
import https from 'https';
import _ from 'lodash';
const Stochastic = require('technicalindicators').Stochastic;
const hesonogoma = new Hesonogoma();
const analyst = new Analyst();
const kdb = new Kdb();
var Store = require("jfs");
var db = new Store(".");
/*------------- 历史数据获取 -----------------*/
hesonogoma.getStockList(async(sList) => {
	return;
	let c, l, h;
	//return;

	console.log('len:', sList.length);
	//sList = [sList[0]];
	db.saveSync("sList", sList);
	for (var i = 0; i < sList.length; i++) {
		let code = sList[i][0];
		console.log('code:', code)
		kdb.get(code, (his) => {
			console.log('his:' + his.head) //.list[0])
				/*let closeList = _.chain(his).map(function(bar) {
					return bar.close;
				}).value();
				c = closeList;

				let lowList = _.chain(his).map(function(bar) {
					return bar.low;
				}).value();
				l = lowList;

				let highList = _.chain(his).map(function(bar) {
					return bar.high;
				}).value();
				h = highList;
			console.log('h: ', h[0]);
			console.log('c: ', c[0]);
			console.log('l: ', l[0]);*/
		});
		await util.sleep(1000);
	}
});

/*------------- 历史数据获取 -----------------*/


/*------------- K/D值设定 -----------------*/
kdb.getNoSetKDList((data) => {
		//console.log(data)
		if (!data || data.length == 0) return;
		var bars = _.groupBy(data, (o) => {
			return o.code;
		});

		var codes = Object.keys(bars);
		codes = [codes[0]]
		for (var i = 0; i < codes.length; i++) {
			var his = bars[codes[i]];
			console.log(codes)
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
			//db.saveSync("input", input);

			var res = Stochastic.calculate(input);
			var resBars = his.slice(his.length - res.length, his.length);
			console.log(res)
			console.log('res len: ', res.length, ',resBars len: ', resBars.length)
		}
		//db.saveSync("sss", s);
		//console.log("end")
	})
	/*------------- K/D值设定 -----------------*/
	/*
	kdb.get('1768', (his) => {
		console.log('his:', his.list[0]);
	}) */

/**/
kdb.getHistory('5341', (his) => {
	//analyst.getKDList(his)
});
/*
async function demo() {
	console.log('Taking a break...');
	await util.sleep(4000);
	console.log('Two second later');
}

demo();*/


/*
var url = 'https://hesonogoma.com/stocks/data/japan-all-stock-data.json';

https.get(url, function(res) {
	var body = '';

	res.on('data', function(chunk) {
		body += chunk;
	});

	res.on('end', function() {
		console.log(body)
			//var fbResponse = JSON.parse(body);
			//console.log("Got a response: ", fbResponse.picture);
	});
}).on('error', function(e) {
	console.log("Got an error: ", e);
});*/