import Table from 'cli-table2';
import logger from '../../../src/app/common/log';
/*
var table = new Table({
	head: ['仓号', '股票', '持仓', '当前价', '盈亏', '持仓比']
});
// table is an Array, so you can `push`, `unshift`, `splice` and friends
table.push(
	['frob', 'bar', 'quuz', '', '', '']
);

console.log(table.toString());
table.push(
	['frob', 'bar', 'quuz', '', '', '']
);

console.log(table.toString());

//logger.info(table.toString());
*/

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
	head: ['仓号', '股票', '持仓', '当前价', '盈亏', '持仓比'],
	style: {
		head: ['cyan'],
		border: ['grey']
	}
});
const colors = require('colors');

table.push(
	['frob', 'bar', colors.red('quuz'), '', '', '']
);

logger.info(table.toString());
/*

let cliTable = new Table({
	head: [colors.black.bgWhite("header 1"), colors.black.bgWhite("header 2"), colors.black.bgWhite("header 3")],
	style: {
		border: ['cyan', 'bgWhite'],
		'padding-left': 1,
		'padding-right': 1,
		empty: ['bgWhite']
	}
});

cliTable.push([
	colors.black.bgWhite("val 11111111111111"), colors.black.bgWhite("val 12"), colors.black.bgWhite("val 13")
]);
cliTable.push([
	colors.black.bgWhite("val 21"), colors.black.bgWhite("val 2222222"), colors.black.bgWhite("val 23")
]);

logger.info(cliTable.toString());*/