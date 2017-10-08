/**
 * Created by 23tl on 2017/4/6.
 */
import util from '../../src/app/common/util';

var assert = require('assert');
describe('util', () => {
    describe('#isTradeDate()', () => {
        it('判断是否为日本节假日', () => {
            // 月份+1
            assert.equal(true,!util.isTradeDate(new Date(2017,2,20)),"祝日");
            assert.equal(true,!util.isTradeDate(new Date(2017,3,8)),"休日");
            assert.equal(false,!util.isTradeDate(new Date(2017,3,6)),"平日");
            //assert.equal(-1, [1,2,3].indexOf(0));
        });
    });
})