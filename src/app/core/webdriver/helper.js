/**
 * web驱动模块帮助类
 * 
 * @module core/webdriver/helper
 */
import config from '../../config/config';
import logger from '../../common/log';
import moment from 'moment';
import numeral from 'numeral';
const acc = config.account;
const errUrl = 'https://www.rakuten-sec.co.jp/session_error.html';

module.exports = {
	/**
	 * 登录乐天账户
	 */
	login: function() {
		return this
			.url('https://www.rakuten-sec.co.jp/')
			.setValue('#form-login-id', acc.id)
			.setValue('#form-login-pass', acc.pass)
			.click('.s1-form-login__btn')
			.waitForExist('#str-main-inner', 1000)
			//シャク　リュウキ　様のホームページ
			.getText('.mbodyb').then(function(result) {
				console.log(result);
			}).pause(500)
			// 自動ログアウトoff
			.click('#changeAutoLogout').pause(500)
			.alertAccept();
	},
	/**
	 * 現物购买
	 * @param  {Object} opt 参数对象
	 * @param  {string} opt.code 股票代码
	 * @param  {string} opt.volume 数量(株/口)
	 * @param  {string} opt.price 价格
	 */
	spotBuy: function(opt) {
		return this
			// 国内株式
			.click('#gmenu_domestic_stock')
			// 買い注文(現物)
			.click('#ord1').click('#jp-stk-top-btn-ord-spot-buy')
			// 銘柄名･銘柄コード
			.setValue('#ss-02', opt.code)
			// 検索
			.click('.img-ipad')
			// 股价自动更新
			.click('#autoUpdateButtonOn')
			// 数量( 株/口)
			.setValue('#orderValue', opt.volume)
			// 価格
			.setValue('#marketOrderPrice', opt.price)
			.setValue('*[type="password"]', acc.otp)
			// 確認画面を省略する
			.click('#ormit_checkbox')
			//注文
			.click('#ormit_sbm');
	},
	/**
	 * 进入信用交易界面
	 * @param  {Object} opt 参数对象
	 * @param  {string} opt.code 股票代码
	 */
	toMargin: function(opt) {
		return this
			.waitForExist('#gmenu_domestic_stock', 5000)
			// 国内株式
			.click('#gmenu_domestic_stock')
			// 買い注文(現物)
			.click('#ord2').click('#jp-stk-top-btn-ord-mgn-new')
			// 銘柄名･銘柄コード
			.setValue('#ss-02', opt.code)
			// 検索
			.click('.img-ipad')
			// 股价自动更新
			.click('#autoUpdateButtonOn');

	},
	toMarginSach: function(opt) {
		return this
			// 国内株式
			.click('#gmenu_domestic_stock')
			// 注文
			.click('#nav-sub-menu-order-arrow')
			.click('span=信用取引')
			// 注文照会・訂正・取消
			.click('.nav-tab-01 li:nth-last-child(1)')
			// 「表示する」 检索
			.click('.ord_jp_req_search input[src="/member/images/btn-disp.png"]')
			// 取消
			.click('a=取消')
			.setValue('*[type="password"]', acc.otp)
			// 取消注文
			.click('#sbm')
			/*// 銘柄名･銘柄コード
			.setValue('#ss-02', opt.code)
			// 検索
			.click('.img-ipad')
			// 股价自动更新
			.click('#autoUpdateButtonOn');*/

	},
	/**
	 * 信用购买
	 * @param  {Object} opt 参数对象
	 * @param  {string} opt.volume 数量(株/口)
	 * @param  {string} opt.price 价格
	 */
	marginBuy: function(opt) {
		return this
			// 売買区分->買建
			.click('.stockm #buy')
			.waitForExist('#mgnMaturityCd_system_6m', 5000)
			// 信用区分（期限）-> 制度（6ヶ月）
			.click('#mgnMaturityCd_system_6m')
			// 数量( 株/口)
			.setValue('#orderValue', opt.volume)
			// 価格
			.setValue('#marketOrderPrice', opt.price)
			.setValue('*[type="password"]', acc.otp)
			// 確認画面を省略する
			.click('#ormit_checkbox')
			//注文
			.click('#ormit_sbm');
	},
	/**
	 * 信用卖出
	 * @param  {Object} opt 参数对象
	 * @param  {string} opt.price 价格
	 */
	marginSell: function(opt, fn) {
		let that = this;
		return that
			// 返済注文(1:新規注文,2:返済注文,3:現引現渡注文,4:注文照会・訂正・取消)
			.click('.nav-tab-01 li:nth-child(2)')
			// 返済注文按钮
			.click('#special_table .tbl-data-01>tbody>tr:last-child img[src="/member/images/btn-repayment-02.gif"]')
			.elements('input[name^="chkRepay"]').then(function(res) {
				// 获取已购买股票数量
				let len = res.value.length;
				// 有短期持仓股票时
				if (len > acc.longLen) {
					that
					// 获取卖单损益额
						.getText('#form > table:nth-child(17) > tbody > tr:nth-child(1) > td:nth-child(1) > table > tbody > tr:last-child')
						.then((res) => {
							let raw = res.split('\n');
							let [profit, buyDate] = [numeral(raw[5]).value(), raw[6]];
							logger.info('卖单损益额:', profit, '円');
							// 卖单损益额大于1000时运行卖单执行 并且建日为当天
							if (profit > 1000 && moment().format('YYYY/MM/DD') == buyDate) {
								that
								// 选择最后一个持仓股票
									.click('#chkRepay' + (acc.longLen))
									// 価格（卖价减1）
									.setValue('#marketOrderPrice', opt.price)
									.setValue('*[type="password"]', acc.otp)
									// 確認画面を省略する
									.click('#ormit_checkbox')
									//注文
									.click('#ormit_sbm').then((res) => {
										fn && fn(res);
									});
							}
							//else {
							//	logger.info('无短线卖单！')
							//}
						});
				}
			});
	},
	/**
	 * 信用买单取消
	 * @param  {Object} opt 参数对象
	 * @param  {string} opt.price 价格
	 */
	marginCancel: function(opt) {
		return this
			// 国内株式
			.click('#gmenu_domestic_stock')
			// 注文
			.click('#nav-sub-menu-order-arrow')
			.click('span=信用取引')
			// 注文照会・訂正・取消
			.click('.nav-tab-01 li:nth-last-child(1)')
			// 「表示する」 检索
			.click('.ord_jp_req_search input[src="/member/images/btn-disp.png"]')
			// 取消
			.click('a=取消')
			.setValue('*[type="password"]', acc.otp)
			// 取消注文
			.click('#sbm')
	},
	/**
	 * 错误界面重新登录
	 */
	errLogin: function() {
		this.getUrl().then(function(res) {
			if (res == errUrl) {
				return this
					.setValue('#form-login-id', acc.id)
					.setValue('#form-login-pass', acc.pass)
					.click('.s1-form-login__btn');
			}
		})
	}
};