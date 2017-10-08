import config from '../../../../src/app/config/config';
import moment from 'moment';
const acc = config.account;
const errUrl = 'https://www.rakuten-sec.co.jp/session_error.html';

module.exports = {
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
	toMargin: function(opt) {
		return this
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
	marginBuy: function(opt) {
		return this
			// 売買区分->買建
			.click('.stockm #buy')
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
	marginSell: function(opt) {
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
						.then(function(res) {
							let raw = res.split('\n');
							let [profit, buyDate] = [raw[5], raw[6]];
							console.log('卖单损益额:', profit, '円');
							// 卖单损益额大于1000时运行卖单执行 并且建日为当天
							if (profit > 1000 && moment().format('YYYY/MM/DD') == buyDate) {
								that
								// 选择最后一个持仓股票
									.click('input[name="chkRepay' + (len - 1) + '"]')
									// 価格
									.setValue('#marketOrderPrice', opt.price)
									.setValue('*[type="password"]', acc.otp)
									// 確認画面を省略する
									.click('#ormit_checkbox')
									//注文
									.click('#ormit_sbm');
							} else {
								console.log('无短线卖单！')
							}

						})
				}
			});
	},
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