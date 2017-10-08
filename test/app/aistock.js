/**
 * Created by 23tl on 2017/4/9.
 */
import AiStock from '../../src/app/market/kdb';
const aistock = new AiStock();

var assert = require('assert');
describe('AiStock', () => {
	describe('#getStock()', () => {
		it('获取数据是否正常', () => {
			assert.doesNotThrow(function() {
				aistock.get('5341')
			}, "5341");
			assert.doesNotThrow(function() {
				aistock.get('5341')
			}, "5341");
			assert.doesNotThrow(function() {
				aistock.get('1234')
			}, "1234");
			assert.doesNotThrow(function() {
				aistock.get('5342')
			}, "5342");
		});
	});
})

describe('AiStock', () => {
	describe('#updateTodayQuote()', () => {
		it('获取当天数据是否正常', () => {

			/*assert.doesNotThrow(function() {
				// 启动当天数据更新服务
				aistock.updateTodayQuote();
			});*/
			assert.doesNotThrow(function() {
				// 启动当天数据更新服务
				aistock.updateTodayQuote('55 0 * * *');
			});
		});
	});
})
