var express = require('express');
import Kdb from '../../market/kdb';
import Gdb from '../../market/gdb';
import store from '../../store/mysql';
import Intcer from '../../core/inspector';
import moment from 'moment';
const kdb = new Kdb();
const gdb = new Gdb();

/*
let watchS = (code) => {
	const ddeIntcer = new Intcer.DdeInspector([code], null, true);

	(new timelineplayer([
		[1000, function() {
			ddeIntcer.listen();
		}],
		[43200000, function() { //12H
			ddeIntcer.stop();
		}]
	], function(p, v) {
		v[1]();
	})).play();
}*/

export default {
	kdb: (req, res) => {
		const code = req.params.code;
		let getData = (code) => {
			kdb.get(code, (data) => {
				res.setHeader('Content-Type', 'text/javascript;charset=UTF-8');
				/*res.writeHead(200, {
					'Content-Type': 'text/html;charset=utf-8'
				});*/
				res.end(JSON.stringify(data));
			});
		};
		const reload = req.query.reload;
		if (reload == "1") {
			store.delete("stock", {
				code: code
			}, () => {
				console.log("getData:", code)
				getData(code);
			});
		} else {
			getData(code);
		}
	},
	list: (req, res) => {
		const code = req.params.code;
		kdb.getList(code, (data) => {
			res.setHeader('Content-Type', 'text/javascript;charset=UTF-8');
			res.send(req.query.callback + '(' + JSON.stringify(data) + ');');
		});
	},
	gdb: (req, res) => {
		gdb.get(req.query.q, (data) => {
			res.setHeader('Content-Type', 'text/javascript;charset=UTF-8');
			res.end(JSON.stringify(data));
		});
	},
	getWa: (req, res) => {
		let param = {
			symbol: req.query.code,
			date: moment().format('YYYY-MM-DD')
		};
		if (req.query.date == 'all') {
			delete param.date;
		} else if (req.query.date) {
			param.date = req.query.date;
		}
		store.select('analyst', param, (data) => {
			res.setHeader('Content-Type', 'text/javascript;charset=UTF-8');
			res.end(JSON.stringify({
				// 倒叙排序
				rows: data.reverse()
			}));
		});
	},
	// 实时交易开关查询及更新
	realTrade: (req, res) => {
		try {
			if (req.query.auth) {
				if (req.query.auth == 'wodi') {
					let action = req.query.action == "true" ? 1 : 0;
					// 更新交易开关
					let updSql = 'UPDATE test SET a = \'' + action + '\' WHERE id = ?';
					store.query(updSql, ['real'], () => {
						res.end("true");
					});
				} else {
					res.end("false");
				}
			} else {
				store.select('test', {
					id: 'real'
				}, (data) => {
					res.end(data[0].a);
				});
			}
		} catch (e) {
			logger.error('realTrade运行出错：', e);
		}
	}
}