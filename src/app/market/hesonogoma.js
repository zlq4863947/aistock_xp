/**
 * Hesonogoma接口模块
 * 
 * @module market/hesonogoma
 */
import store from '../store/mysql';
import util from '../common/util';
import _ from 'lodash';
import logger from '../common/log';

/**
 * @class
 * @classdesc {@link https://hesonogoma.com/stocks|Hesonogoma接口}
 */
class Hesonogoma {
	constructor() {}

	/**
	 * 获取小于1000价格的股票
	 * @param  {Function} fn 回调函数
	 * @return {array}      SC	名称	市場	業種	時価総額(百万円)	発行済株式数	配当利回り
	 * 	1株配当	PER（予想）	PBR（実績）	EPS（予想）	BPS（実績）	最低購入額	単元株	高値日付
	 */
	getStockList(fn) {
		let url = 'https://hesonogoma.com/stocks/data/japan-all-stock-data.json';
		util.getHttps(url, (res) => {
			let json = JSON.parse(res)['japan-all-stock-data'];
			json = _.filter(json, function(o) {
				// 为可交易股票
				let isTrade = o[2] == '東証一部' || o[2] == '東証二部' || o[2] == '東証マザ' || o[2] == 'JQS';
				// 股票价格小于1000（最低購入額12/単元株13）
				let isLess = o[12] / o[13] < 1000
				return isTrade && isLess;
			});

			if (typeof fn != 'undefined')
				fn && fn(json);
		});
	}
}
export default Hesonogoma;