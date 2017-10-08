var webdriverio = require('webdriverio');
var helper = require('./helper');
var options = {
	desiredCapabilities: {
		browserName: 'chrome'
	}
}; //phantomjs
var client = webdriverio.remote(options);
client.addCommand('login', helper.login.bind(client));
client.addCommand('spotBuy', helper.spotBuy.bind(client));
client.addCommand('toMargin', helper.toMargin.bind(client));
client.addCommand('marginBuy', helper.marginBuy.bind(client));
client.addCommand('marginSell', helper.marginSell.bind(client));
client.addCommand('toMarginSach', helper.toMarginSach.bind(client));
client.addCommand('marginCancel', helper.marginCancel.bind(client));

var order = {
	code: '6664',
	volume: 300,
	price: '1000'
};
var tabs = {
	bizTabId: '',
	sachTabId: ''
}

client
	.init()
	.login().then(() => {
		client.getCurrentTabId().then((tabId) => {
			// 记录交易tabId
			tabs.bizTabId = tabId;
		});

		/**/
		client.toMargin(order).getText('.price-01 nobr').then((price) => {
			//order.price = price;
			// 信用买入
			//client.marginBuy(order);
			// 信用卖出
			client.marginSell(order);

			// 信用订单取消
			//client.marginCancel(order);
		});
	})
	//.spotBuy(order);
	//.saveScreenshot('./snapshot2.png')



/*
	
	.execute(function() {
        autoLogoutUsed = true; // 自動ログアウト抑制機能を使ったことがある
		// 自動ログアウト無効に切り替え
		$.cookie(autoLogoutStsCookieKey, "0");
		autoLogout = false;
		console.log("autoLogout:",autoLogout)
		//「自動ログアウト停止中」ボタンを表示(自動ログアウト：無効)
		$("#autologouton").hide();
		$("#autologoutoff").show();
		$("a[id^='changeAutoLogout']").attr("id", "member-top-btn-automatic-logout");
		reloadtime = +new Date(0);
		console.log("reloadtime:",reloadtime)
		refreshTimerLoop();
    })
	//自動ログアウトoff
	.click('#changeAutoLogout').pause(500)
	.alertAccept()

	//client.click('#gmenu_domestic_stock > a')
	/*
    .getHTML('.nav-main').then(function(result){
		console.log(result);
	})
	
	/*.getText('#title').then(function(result){
		console.log(result);
	}).setValue('#filter', '5341')
    .click('#searchBtn').pause(5000)
	.getText('#title').then(function(result){
		console.log(result);
	})
	//.end();

	.pause(5000)
/*

    .init()
    .url('http://www.google.com')
    .setValue('[name="q"]', 'webdriver')
    .click('[name="btnG"]')
    .waitForExist('#str-main-inner', timeoutMSec)
    .getText('#resultStats', function(err, text) {
        console.log(text);
    })
    .end();
.waitForVisible('#header', 5000, false, function(result) {
            console.log(result);
        });
*/
// .waitForVisible('h3')
/*.getHTML('#title', function(e,v){
            console.log(v) 
    });.then(function(title,b) {
	
	});*/

//getText('#titlle').then(function(title,b) {
/*client.getHTML('#titlle', function(e,v){
            console.log(v) 
    });*/
// .end();


//.end();
//autologoutoff