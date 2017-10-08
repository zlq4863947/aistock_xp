import store from '../../src/app/store/mysql';
import _ from 'lodash';

/*
store.select('stock_master', {
    code: '5341'
}, (data) => {
    console.log(data)
});*/

/*
store.insertMulti('stock', ['5341', '2016-04-28',
	'84.00',
	'84.00',
	'81.00',
	'83.00',
	'152000',
	'12545000', null, null, null, 100, null
]);*/

console.log(_.zipObject([
	['a', 'b']
], [
	[1, 2],
	[3, 4]
]));