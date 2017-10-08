import Kdb from '../market/kdb';
import talib from 'talib-c';
import _ from 'lodash';
var Store = require("jfs");
var db = new Store(".");

const kdb = new Kdb();
/**
 * 分析师 analyst
 * Created by 23tl on 2017/5/6.
 */
kdb.get('5341', (data) => {
	let his = data.list //.slice(data.list.length - 61, data.list.length); //.reverse()
		//console.log(data.length);

	let closeList = _.chain(his).map(function(bar) {
		return bar.close;
	}).value();

	let lowList = _.chain(his).map(function(bar) {
		return bar.low;
	}).value();

	let highList = _.chain(his).map(function(bar) {
		return bar.high;
	}).value();

	let zeroList = _.chain(his).map(function(bar) {
		return bar.high;
	}).value()
	zeroList = _.fill(zeroList, 0);

	/*
		db.saveSync("anId", {
			closeList: closeList,
			lowList: lowList,
			highList: highList,
			zeroList: zeroList
		});*/

	let result = null;
	let a = (res) => {

		db.saveSync("res", res);
		console.log(res)
	}

	__awaiter(this, void 0, Promise, function*() {
		result = yield talib.func({
			name: "Stoch",
			startIdx: 0,
			endIdx: closeList.length - 1,
			inHigh: highList,
			inLow: lowList,
			inClose: closeList,
			optInFastK_Period: 9,
			optInSlowK_Period: 3,
			optInSlowK_MAType: MAType.Ema,
			optInSlowD_Period: 3,
			optInSlowD_MAType: MAType.Ema,
			outBegIdx: 0,
			outNBElement: 0,
			outSlowK: zeroList,
			outSlowD: zeroList
		});

		let k = result.result.outSlowK;
		k = k.slice(0, k.length - 12);
		let d = result.result.outSlowD;
		d = d.slice(0, d.length - 12);
		var kbars = his.slice(12, his.length);

		for (var i = 0; i < k.length; i++) {

			//console.log('k: ', k[i], ',kbars: ', kbars[i])
			//if
		}
		//a(result);
	});

	/*
		__awaiter(this, void 0, Promise, function*() {
			result = yield talib.func({
				name: "Stoch",
				startIdx: 0,
				endIdx: 14,
				inHigh: [105, 102, 100, 104, 102, 101, 104, 106, 107, 104, 102, 106, 105, 104, 103],
				inLow: [110, 104, 101, 101, 100, 98, 94, 100, 98, 98, 98, 102, 102, 100, 100],
				inClose: [99, 99, 102, 99, 98, 102, 105, 103, 101, 102, 105, 104, 102, 102, 102],
				optInFastK_Period: 9,
				optInSlowK_Period: 3,
				optInSlowK_MAType: MAType.Ema,
				optInSlowD_Period: 3,
				optInSlowD_MAType: MAType.Ema,
				outBegIdx: 0,
				outNBElement: 0,
				outSlowK: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				outSlowD: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
			});
			//console.log(result)
			a(result);
		});*/
});