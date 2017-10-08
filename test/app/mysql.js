/**
 * Created by 23tl on 2017/4/9.
 */
import mysql from '../../src/app/store/mysql';

var assert = require('assert');
describe('myStore', () => {
	describe('#saveData()', () => {
		it('插入数据是否正常', () => {
			// 月份+1
			assert.doesNotThrow(mysql.getElementsByTagName(''), "祝日");
			assert.equal(true, !util.isTradeDate(new Date(2017, 3, 8)), "休日");
			assert.equal(false, !util.isTradeDate(new Date(2017, 3, 6)), "平日");
			//assert.equal(-1, [1,2,3].indexOf(0));
		});
	});
})