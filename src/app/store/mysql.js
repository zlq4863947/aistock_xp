import mysql from 'mysql2';
import logger from '../common/log';
import util from '../common/util';
import config from '../config/config';

/**
 * String.prototype.format
 * @param String.prototype.format2arg
 * 
 * "abc {hoge} {moge}".format({hoge: "text1", moge: "text2"}))
 * out :abc text1 text2
 * "abc {0} {1}".format("text1", "text2");
 * out: abc text1 text2
 */
String.prototype.format = function(arg) {
	var func = null;

	if (typeof arg === "object") {
		func = function(regexp, key) {
			return arg[key];
		};
	} else {
		var args = arguments;
		func = function(regexp, key) {
			return args[key];
		};
	}
	return this.replace(/\{(\w+)\}/g, func);
};

const myStore = {
	isConnect: false,
	conn: null,
	config: config.mysql,
	action: {
		// 插入单条数据
		insert: function(tb, data, fn) {
			let sql = 'INSERT INTO ' + tb + ' SET ?';
			if (data instanceof Array) {
				let subSql = '';
				for (let val of data) {
					subSql += "?,";
				}
				subSql = subSql.substr(0, subSql.length - 1);
				sql = 'INSERT INTO ' + tb + ' VALUES(' + subSql + ')';
			}

			myStore.conn.query(sql,
				data,
				(error, results, fields) => {
					if (error) logger.info(error); //throw error;
					typeof fn != 'undefined' && fn && fn();
					// Neat!
				});
		},
		// 插入多条数据
		insertMulti: function(tb, dataList, fn) {
			myStore.conn.query('INSERT INTO ' + tb + ' VALUES ?', [dataList], (err, res) => {
				if (err) logger.error(err, ',sql: ', this.sql, this);
				fn && fn(res);
			});
		},
		// 插入单条数据
		test: function(tb, data, fn) {

			var query = myStore.conn.query('INSERT INTO ' + tb + ' VALUES ?', [data], (err, res) => {
				console.log(err)
			});
		},
		select: function(tb, data, fn) {
			let sql = "select * from {tb}";
			if (data) {
				sql = sql + ' where {field}';
			}
			sql = myStore.format(sql, tb, data);
			//logger.info('select sql: ', sql);
			myStore.conn.query(sql, (err, rows, fields) => {
				if (err) logger.error(err, ',sql: ', this.sql, this);
				fn && fn(rows);
			});
		},
		delete: function(tb, data, fn) {
			let sql = "delete from {tb}";
			if (data) {
				sql = sql + ' where {field}';
			}
			sql = myStore.format(sql, tb, data);
			//logger.info(sql);
			myStore.conn.query(sql, (err, rows, fields) => {
				if (err) logger.error(err, ',sql: ', this.sql, this);
				fn && fn(rows);
			});
		},
		query: function(sql, data, fn) {
			//logger.info(sql);
			myStore.conn.query(sql, data, (err, rows, fields) => {
				if (err) logger.error(err, ',sql: ', this.sql, this);
				fn && fn(rows);
			});
		}
	},
	/*
		let sql = "select * from {tb} where {field}"
		let data = {code:5341,name:'哈哈',group:'这是地方'}
	 */
	format: function(sql, tb, data) {
		let fm = {
			tb: tb
		};
		if (data) {
			let keys = Object.keys(data),
				vals = Object.values(data);
			if (keys.length == 1) {
				fm.field = keys[0] + (data[keys] == null ? 'is null' : '=\'' + data[keys] + '\'');
			} else {
				fm.field = keys.reduce((prekey, curkey, i) => {
					if (i == 1) {
						prekey = prekey + (vals[i - 1] == null ? ' is null' : '=\'' + vals[i - 1] + '\'')
					}
					curkey = curkey + (vals[i] == null ? ' is null' : '=\'' + vals[i] + '\'');
					return prekey + ' AND ' + curkey;
				});
			}
		}
		return sql.format(fm);
	},
	connect: function() {
		this.conn = mysql.createConnection(this.config);
		this.isConnect = true;
	},
	open: function() {
		this.connect();
		this.conn.connect();
	},
	close: function() {
		this.conn.release(); //end();
	}
};

const action = myStore.action;
myStore.open();

export default action;