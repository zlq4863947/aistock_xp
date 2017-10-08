/**
 * Created by 23tl on 2017/4/6.
 */
/*
var assert = require('assert');
describe('Array', () => {
    describe('#indexOf()', () => {
        it('should return -1 when the value is not present', function () {
            assert.equal(-1, [1,2,3].indexOf(5));
            assert.equal(-1, [1,2,3].indexOf(0));
        });
    });
});
*/


import util from '../../src/app/common/util';
import AiStock from '../../src/app/market/kdb';
import logger from '../../src/app/common/log';
import store from '../../src/app/store/mysql';

const aistock = new AiStock();

const code = '6502';

/*aistock.getHistory(code, (list) => {
	//TODO 获取当天数据方式不好（顺序变换后，找不到）
	let info = list[list.length - 1];
	//logger.debug(list);
	logger.debug(info[1]);
	logger.debug(util.getNowDate());
	if (info[1] != util.getNowDate()) {
		console.log(code + ',当天数据未更新');
		return;
	}
	// 获取趋势
	info.trend = util.getTrend(list[list.length - 2], info);
	console.log(code + ',当天数据: ' + JSON.stringify(info));
	// 写入当天数据
	store.insert('stock', info);
});

// 启动当天数据更新服务
//aistock.updateTodayQuote('12 1 * * *');*/

aistock.get(code);