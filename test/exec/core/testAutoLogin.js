import robot from 'robotjs';
import timelineplayer from 'timelineplayer';
// 登录坐标
let loginPos = {
		x: 762,
		y: 154
	},
	loginHex;
(new timelineplayer([

	[0, function() {
		robot.moveMouse(82, 780)
		robot.mouseClick();
	}],

	[2000, function() {
		loginHex = robot.getPixelColor(loginPos.x, loginPos.y);
		console.log(loginHex)
			// #49ff00 绿色
		if (loginHex == '49ff00') {
			console.log("判定为登出状态，执行自动登录");

			robot.keyTap("enter");
			robot.moveMouse(loginPos.x, loginPos.y);
			robot.mouseClick();
		}
	}],

	[4000, function() {
		if (loginHex == '49ff00') {
			robot.typeString("xxx");
			robot.keyTap("enter");
		}

	}],

	[5000, function() {
		if (loginHex == '49ff00') {
			robot.keyTap("enter");
			let hex = robot.getPixelColor(loginPos.x, loginPos.y);

			// #ff0000 红色
			if (hex == 'ff0000') {
				console.log('登录成功！');
			}
		}
	}]
], function(p, v) {
	v[1]();
})).play();