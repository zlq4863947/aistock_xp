/**
 * web驱动模块
 * 
 * @module core/webdriver
 */
import moment from 'moment';
import numeral from 'numeral';
import Gdb from '../../market/gdb';
const gdb = new Gdb();
const webdriverio = require('webdriverio');
const helper = require('./helper');

/**
 * @class
 * @classdesc 自动交易驱动类
 */
class WebDriver {
	constructor() {
		this.client = webdriverio.remote({
			desiredCapabilities: {
				browserName: 'chrome'
			}
		});
		this.client.addCommand('login', helper.login.bind(this.client));
		this.client.addCommand('spotBuy', helper.spotBuy.bind(this.client));
		this.client.addCommand('toMargin', helper.toMargin.bind(this.client));
		this.client.addCommand('marginBuy', helper.marginBuy.bind(this.client));
		this.client.addCommand('marginSell', helper.marginSell.bind(this.client));
		this.client.addCommand('toMarginSach', helper.toMarginSach.bind(this.client));
		this.client.addCommand('marginCancel', helper.marginCancel.bind(this.client));
	}

	/**
	 * 初始化方法
	 * @param  {Function} fn 回调函数
	 */
	init(fn) {
		this.client.init().login().then((res) => {
			fn && fn(res);
		});
	}

	/**
	 * 进入信用交易界面
	 * @param  {Object} opt 参数对象
	 * @param  {string} opt.code 股票代码
	 * @param  {Function} fn 回调函数
	 */
	toMargin(opt, fn) {
		this.client.toMargin(opt).then((res) => {
			fn && fn(res);
		});
	}

	/**
	 * 信用购买
	 * @param  {Object} opt 参数对象
	 * @param  {string} opt.volume 数量(株/口)
	 * @param  {string} opt.price 价格
	 * @param  {Function} fn 回调函数
	 */
	marginBuy(opt, fn) {
		this.client.marginBuy(opt).then((res) => {
			fn && fn(res);
		});
	}

	/**
	 * 信用卖出
	 * @param  {Object} opt 参数对象
	 * @param  {string} opt.price 价格
	 * @param  {Function} fn 回调函数
	 */
	marginSell(opt, fn) {
		this.client.marginSell(opt, fn);
	}

	/**
	 * 刷新浏览器
	 */
	refresh() {
		this.client.refresh();
	}

	/**
	 * 获取价格
	 * @param  {Function} fn 回调函数
	 */
	getPrice(fn) {
		let obj = {};
		// 获取价格
		this.client.getText('.price-01 nobr').then((price) => {
			obj.price = price;
			// 获取价格
			this.client.getText('#auto_update_field_stock_price > tbody > tr > td:nth-child(1) > table:nth-child(7) > tbody > tr:nth-child(1) > td:nth-child(3) > div > nobr').then((power) => {
				obj.power = power.split(' ')[0];
				// 単元株数
				this.client.getText('#pricetable1 > tbody > tr:nth-child(4) > td > div > table > tbody > tr > td:nth-child(2) > div').then((roundLot) => {
					obj.roundLot = parseInt(roundLot.split('  ')[1].split(' ')[0]);
					// 卖1 数量
					this.client.getText('#yori_table_update_ask_volume_1').then((askVol1) => {
						obj.askVol1 = askVol1;
						// 卖1 价格
						this.client.getText('#yori_table_update_ask_1').then((ask1) => {
							obj.ask1 = ask1;
							// 买1 数量
							this.client.getText('#yori_table_update_bid_volume_1').then((bidVol1) => {
								obj.bidVol1 = bidVol1;
								// 买1 价格
								this.client.getText('#yori_table_update_bid_1').then((bid1) => {
									obj.bid1 = bid1;

									// 卖盘总量
									this.client.getText('#yori_table_update_ask_volume_over').then((askOver) => {
										obj.askOver = numeral(askOver).value();
										// 卖盘总量
										this.client.getText('#yori_table_update_bid_volume_under').then((bidUnder) => {
											obj.bidUnder = numeral(bidUnder).value();
											fn && fn(obj);
										});
									});
								});
							});
						});
					});
				});
			});
		});
	}

	/**
	 * 关闭浏览器
	 */
	end() {
		this.client.end();
	}
}

export default WebDriver;