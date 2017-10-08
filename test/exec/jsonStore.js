var Store = require("jfs");
var db = new Store("./path");
var d = {
	foo: "bar"
};
/*
var delFlg = false;
try {
	db.getSync("anId");
} catch (e) {
	delFlg = true;
}
console.log(delFlg);
if (!delFlg) {
	db.deleteSync("anId");
}
// save with custom ID
db.saveSync("anId", d);

var obj = db.getSync("anId");
console.log(obj);
var c = {
	ss: "123"
}
obj.bb = c;
db.deleteSync("anId");
db.saveSync("anId", obj);
console.log(db.getSync("anId"));*/

var topic = "xxx",
	item = "item",
	text = "text";
let dateStr = "2016-03-04",
	jId = topic + '_' + dateStr,
	delFlg = false,
	quote = {};
try {
	jsonDB.getSync(jId);
} catch (e) {
	// json文件不存在
	delFlg = true;
}
// json存在则删除
if (!delFlg) {
	quote = jsonDB.getSync(jId);
	jsonDB.deleteSync(jId);
}
let detailTime = '';
// 不是現在値詳細時刻时
if (item != '現在値詳細時刻') {
	// 現在値詳細時刻项目无值 && 临时变量没有这个项目
	if (!detailTime && !quote.tmp) {
		// 初始化临时变量
		quote.tmp = {};
		quote.tmp[item] = text;
	}
	// 現在値詳細時刻项目有值 && 临时变量没有这个项目
	else if (detailTime && !quote.tmp) {
		quote[detailTime][item] = detailTime = 　text;
	}
	// 現在値詳細時刻项目无值 && 临时变量有这个项目
	else if (!detailTime && quote.tmp) {
		quote.tmp[item] = text;
	}
} else { // 当前是現在値詳細時刻
	quote[text] = {};
	// 临时变量有这个项目
	if (quote.tmp) {
		quote[text] = quote.tmp;
		// 删除临时变量
		quote.tmp = {};
	}
	quote[text] = quote.tmp;
	delete quote.tmp;
}
console.log(quote)