import talib from 'talib-c';

let result = null;
let a = (res) => {
		console.log(res)
	}
	/*
	__awaiter(this, void 0, Promise, function*() {

		result = yield talib.func({
			name: "Stoch",
			startIdx: 0,
			endIdx: 2,
			inHigh: [12, 3, 45],
			inLow: [23, 3, 5],
			inClose: [23, 3, 20],
			optInFastK_Period: 1,
			optInSlowK_Period: 1,
			optInSlowK_MAType: MAType.Ema,
			optInSlowD_Period: 1,
			optInSlowD_MAType: MAType.Ema,
			outBegIdx: 0,
			outNBElement: 0,
			outSlowK: [0, 0, 0],
			outSlowD: [0, 0, 0]
		});
		//console.log(result)
		a(result);
	});*/

var test = {
	"closeList": ["105", "104", "105", "104", "105", "105", "105", "107", "104", "104", "104", "104", "105", "106", "105", "105", "104", "105", "105", "104", "104", "106", "107", "106", "106", "114", "112", "107", "111", "113", "109", "104", "104", "104", "101", "101", "103", "105", "104", "113", "114", "112", "106", "104", "102", "103", "99", "99", "102", "99", "98", "102", "105", "103", "101", "102", "105", "104", "102", "102", "102"],
	"lowList": ["103", "104", "103", "104", "104", "104", "105", "105", "103", "103", "103", "103", "104", "104", "104", "104", "104", "103", "104", "104", "104", "105", "106", "106", "106", "105", "110", "107", "108", "110", "109", "102", "103", "104", "101", "100", "101", "102", "103", "110", "107", "110", "104", "101", "101", "100", "98", "94", "100", "98", "98", "98", "102", "102", "100", "100", "101", "102", "102", "101", "101"],
	"highList": ["106", "106", "105", "107", "106", "106", "107", "108", "106", "105", "105", "106", "106", "107", "106", "106", "105", "105", "105", "105", "105", "108", "110", "109", "108", "117", "114", "112", "112", "113", "113", "107", "105", "106", "104", "103", "103", "108", "108", "115", "114", "132", "112", "108", "105", "105", "102", "100", "104", "102", "101", "104", "106", "107", "104", "102", "106", "105", "104", "103", "102"],
	"zeroList": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
}

__awaiter(this, void 0, Promise, function*() {

	result = yield talib.func({
		name: "Stoch",
		startIdx: 0,
		endIdx: test.closeList.length - 1,
		inHigh: test.highList,
		inLow: test.lowList,
		inClose: test.closeList,
		optInFastK_Period: 9,
		optInSlowK_Period: 3,
		optInSlowK_MAType: MAType.Ema,
		optInSlowD_Period: 3,
		optInSlowD_MAType: MAType.Ema,
		outBegIdx: 0,
		outNBElement: 0,
		outSlowK: test.zeroList,
		outSlowD: test.zeroList
	});
	//console.log(result)
	a(result);
});