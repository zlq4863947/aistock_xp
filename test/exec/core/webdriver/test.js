import moment from 'moment';
import config from '../../../../src/app/config/config';
import WebDriver from '../../../../src/app/core/webdriver';
import Sniper from '../../../../src/app/core/sniper';
import Gdb from '../../../../src/app/market/gdb';
/*
const webDriver = new WebDriver();
const gdb = new Gdb();
webDriver.init(() => {
	console.log('初期化完了。');

	let order = {
		code: '6664',
		volume: 300
	};
	webDriver.toMargin(order, () => {
		console.log('信用界面跳转完了');
		let i = 0;
		let interval = setInterval(() => {
			i++;
			console.log(moment().format('HH:mm:ss'));
			// 获取价格
			webDriver.getPrice((res) => {
				console.log('价格查询，原值：', order.price, '现值：', res.price);
				//if (order.price && order.price != res.price) {
				console.log('与之前价格不相同，查询K值');
				gdb.get({
					x: 'TYO',
					s: order.code,
					i: '300',
					p: '1d',
					price: res.price
				}, (data) => {
					let rows = data.rows;
					console.log(
						'%s\n...\n%s',
						JSON.stringify(rows[rows.length - 2], null, 2),
						JSON.stringify(rows[rows.length - 1], null, 2)
					);

					let k = rows[rows.length - 1].k;
					if (k < config.account.buyK) {
						console.log('k：', k, '，价格：', res.price, '下单。');
						// 小于k值20时，下单
						webDriver.marginBuy(order, () => {
							// 返回股票信息界面
							webDriver.toMargin(order);
						});
					} else if (k > config.account.sellK) {
						console.log('k：', k, '，价格：', res.price, '下单。');
						// 大于k值85时，下单
						webDriver.marginSell(order, () => {
							// 返回股票信息界面
							webDriver.toMargin(order);
						});
					}
				});
				//}
				order.price = res.price;
			});
		}, moment.duration(1, 's').asMilliseconds());
		let interval2 = setInterval(() => {
			webDriver.refresh();
		}, moment.duration(15, 'm').asMilliseconds());
	});
});*/
var sniper = new Sniper();
sniper.start('am');