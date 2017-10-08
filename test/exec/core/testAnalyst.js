//import Analyst from '../../../src/app/core/analyst';
import Kdb from '../../../src/app/market/kdb';
import Gdb from '../../../src/app/market/gdb';
import _ from 'lodash';
import Table from 'cli-table2';
import numeral from 'numeral';

/*const analyst = new Analyst();
analyst.getKDList()*/

const kdb = new Kdb();
const gdb = new Gdb();

var table = new Table({
	chars: {
		'top': '═',
		'top-mid': '╤',
		'top-left': '╔',
		'top-right': '╗',
		'bottom': '═',
		'bottom-mid': '╧',
		'bottom-left': '╚',
		'bottom-right': '╝',
		'left': '║',
		'left-mid': '╟',
		'mid': '─',
		'mid-mid': '┼',
		'right': '║',
		'right-mid': '╢',
		'middle': '│'
	},
	//head: ['仓号', '股票', '持仓', '当前价', '盈亏', '持仓比'],
	head: ['仓号', '股票', '日期', '持仓', '成本', '卖出价格', '盈亏'],
	style: {
		head: ['cyan'],
		border: ['grey']
	}
});

let putPortfolio = (index, code, num, close) => {
	table.push(
		[index, code, num, close, '', '']
	);
}

let buy = (order) => {
	table.push(
		[table.length + 1, order.code, order.date, order.num, order.price] //, order.sellPrice
	);
}
let sss = 0

let sell = (order) => {
	let sellInfo = find(order.code);
	for (var i = 0; i < sellInfo.length; i++) {
		var profit = numeral((order.price - sellInfo[i][4]) * sellInfo[i][3]).format('0,0');
		//if (numeral(profit).value() > 1000) {
		console.log(profit)
			// 卖出价格
		sellInfo[i][5] = order.price;
		// 盈亏= （卖出价格 - 成本）*持仓数
		sellInfo[i][6] = profit;
		//}
	}
	// 盈亏总计
	var s = _.sumBy(sellInfo, function(o) {
		return o[6] ? numeral._.stringToNumber(o[6]) : 0;
	});
	// 成本总计
	var a = _.sumBy(sellInfo, function(o) {
		return o[4];
	}) * 100;
	// 持仓总计
	var b = _.sumBy(sellInfo, function(o) {
		return o[3];
	});
	console.log('卖出日期:', order.date, '持仓总计:', b, '成本总计:', a, ',盈亏总计:', s);
	sss = sss + s;

	console.log(table.toString());
	console.log('累积盈亏总计:', numeral(sss).format('0,0'));
	//清空数组
	table.splice(0, table.length);
}
let find = (code) => {
	return _.filter(table, {
		1: code
	});
	table.filter((item) => {
		console.log(item)
		return item[1] == '5341';
	});
}

//kdb.get('6664', (data) => { //5341 6200
gdb.get({
	x: 'TYO',
	s: '6664',
	i: '300',
	p: '1d'
}, (data) => {
	//return;
	let res = data.rows //.slice(data.list.length - 39, data.list.length); //.reverse()
		//console.log(his.length);

	for (var i = 0; i < res.length; i++) {
		if (res[i].k < 20) {
			if (table.length < 3) {
				var bar = res[i];
				var orderInfo = {
					num: 500,
					price: parseInt(bar.close),
					code: bar.code,
					date: bar.time
				}
				buy(orderInfo);
			}
			//console.log('k: ', res[i].k, ',买入股票: ', orderInfo);

			//console.log('res: ', res[i], ',resBars: ', resBars[i]);
		}
		if (res[i].k > 80) {
			if (table.length > 0) {
				var bar = res[i];
				var orderInfo = {
					//num: 1000,
					price: bar.high,
					code: bar.code,
					date: bar.time
				};
				let stocks = find(orderInfo.code);
				if (stocks.length != 0) {
					sell(orderInfo);
				}
			}
			//console.log('k: ', res[i].k, ',卖出股票: ', orderInfo);
		}
	}

	//console.log(table.toString());
	//console.log('累积盈亏总计:', sss);

	//console.log(find('5341').length)
	//console.log('res len: ', res.length, ',resBars len: ', resBars.length)

	//db.saveSync("res", resBars);

}); /**/