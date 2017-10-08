/**
 * Created by 23tl on 2017/4/16.
 */
import Intcer from '../../../src/app/core/intelligencer';
import Kdb from '../../../src/app/market/kdb';

import logger from '../../../src/app/common/log';

//const logger = log4js.getLogger('Mocha-Test');
//const webSocket = new Intcer.WebSocket();

//webSocket.listen();

const kdb = new Kdb();

kdb.get('5341', (data) => {
	logger.info(data);
	if (data && data.list) {
		var candles = data.list;
		for (var i = 0; i < candles.length; i++) {
			// 设置Unix时间戳(毫秒转成秒)
			candles[i].epoch = Date.parse(candles[i].date) / 1000;
		}
		var res = {
				msg_type: 'candles',
				req_id: 2,
				candles: candles,
				echo_req: {
					adjust_start_time: 1,
					count: 5000,
					end: 'latest',
					granularity: 86400,
					req_id: 2,
					start: candles[0].epoch,
					style: 'candles',
					ticks_history: '5341'
				}
			}
			//logger.info(res);
	}
});
/*
kdb.getStockList((data) => {
	console.log(data);
});*/