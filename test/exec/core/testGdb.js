import Gdb from '../../../src/app/market/gdb';
import moment from 'moment';
import Store from 'jfs';
//const db = new Store("./test");

const gdb = new Gdb();


gdb.get({
	x: 'TYO',
	s: '6664',
	i: '7', //300
	p: '1d'
}, (data) => {

	let rows = data.rows;
	console.log(rows)
		/*console.log(
			'%s\n...\n%s',
			JSON.stringify(rows[0], null, 2),
			JSON.stringify(rows[rows.length - 1], null, 2)
		);*/
		//db.saveSync("6664", rows);
});