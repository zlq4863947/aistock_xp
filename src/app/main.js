import express from 'express';
import moment from 'moment';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import fs from 'fs';
import fileStreamRotator from 'file-stream-rotator';
import exphbs from 'express-handlebars';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import router from './web/routes/router';
import stock from './web/routes/stock';
import users from './web/routes/users';

import Scheduler from './common/schedule';
import util from './common/util';
import Intcer from './core/inspector';
import Sniper from './core/sniper';

const app = express();

const scheduler = new Scheduler();
// 启动定时任务
scheduler.do();

let mock = {
	date: '2017-05-01' //util.getNowDate()
};
mock = null;

const intcer = new Intcer.WebSocket(mock);
// 启动实时更新服务
intcer.listen();

//交易时段程序重启时启动交易机器人
if (util.isTradeTime()) {
	setTimeout(() => {
		let sniper = new Sniper();
		sniper.watch();
	}, moment.duration(5, 's').asMilliseconds());
}

// 加载hbs模块
let hbs = exphbs.create({
	layoutsDir: path.join(__dirname, '../views/layouts/'),
	defaultLayout: 'main',
	extname: '.html',
	partialsDir: [
		path.join(__dirname, '../views/')
	]
});
// 运行hbs模块
app.engine('.html', hbs.engine);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', '.html');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));

var logDirectory = __dirname + './../../../logs/daily'

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

// create a rotating write stream
var accessLogStream = fileStreamRotator.getStream({
	filename: logDirectory + '/access-%DATE%.log',
	frequency: 'daily',
	verbose: false
});
// setup the logger
app.use(logger('dev', {
	stream: accessLogStream
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', router);
app.use('/users', users);
app.get('/stock/:code', stock.kdb);
app.get('/list/:code', stock.list);
app.get('/gdb/', stock.gdb);
app.get('/tick/', stock.getWa);
app.get('/rt/', stock.realTrade);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;