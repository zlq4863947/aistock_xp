/**
 * 定时任务执行模块
 * 
 * @module common/schedule
 */
import moment from 'moment';
import schedule from 'node-schedule';
import logger from './log';
import Kdb from '../market/kdb';
import store from '../store/mysql';
import util from './util';
import robot from 'robotjs';
import timelineplayer from 'timelineplayer';
import Sniper from '../core/sniper';
import Intcer from '../core/inspector';

/**
 * @class
 * @classdesc Cron表达式定时器
 *
 * @param {string=}[cron='30 15 * * *'] Cron表达式<br/>
 **    *    *    *    *    *<br/>
 *┬    ┬    ┬    ┬    ┬    ┬<br/>
 *│    │    │    │    │    └ 星期 (0 - 7) (0 or 7 为星期日)<br/>
 *│    │    │    │    └───── 月 (1 - 12)<br/>
 *│    │    │    └────────── 天 (1 - 31)<br/>
 *│    │    └─────────────── 小时 (0 - 23)<br/>
 *│    └──────────────────── 分钟 (0 - 59)<br/>
 *└───────────────────────── 秒 (0 - 59, 可选)
 */
class Scheduler {
	constructor(cron) {
		this.cron = cron || '30 15 * * *';
	}

	/**
	 * 
	 * 执行任务计划
	 * @param  {Function} fn 具体执行的处理方法
	 */
	invok(fn) {
		if (!fn) return;
		this.reminder = schedule.scheduleJob(this.cron, () => {
			fn();
		})
	}
}

/**
 * @class
 * @classdesc 定时任务表
 */
class TaskList {

	/**
	 * 每交易日启动短线狙击手
	 * @param {string=}[cron='30 15 * * *'] Cron表达式
	 * @todo 交易日判定待修改
	 */
	doSniper(cron) {
		const job = new Scheduler(cron);

		job.invok(() => {
			if (!util.isTradeDate(new Date())) {
				return;
			}
			let txt = util.getNowDatetime() + ' 定时执行短线狙击手';
			logger.info(txt);
			let sniper = new Sniper();
			if (cron.split(' ')[1] < 12) {
				sniper.start('am');
			} else {
				sniper.start('pm');
			}
		});
	}

	/**
	 * 运行tickdata收集服务
	 */
	doTickDataSvr() {
		const job = new Scheduler('59 8 * * *');

		job.invok(() => {
			if (!util.isTradeDate(new Date())) {
				logger.info("今天为节假日，不运行tickdata收集服务");
				return;
			}
			let txt = util.getNowDatetime() + ' 运行tickdata收集服务';
			logger.info(txt);

			let mock = {
				date: '2017-04-20'
			};
			mock = null;

			const ddeIntcer = new Intcer.DdeInspector(['6502', '6553'], mock, true);

			(new timelineplayer([
				[1000, function() {
					ddeIntcer.listen();
				}],
				[1800000000, function() {
					ddeIntcer.stop();
				}]
			], function(p, v) {
				v[1]();
			})).play();
		});
	}

	/**
	 * 每天15：30执行数据更新
	 * @param {string=}[cron='30 15 * * *'] Cron表达式
	 */
	updateTodayQuote(cron) {
		const job = new Scheduler(cron);
		const kdb = new Kdb();

		job.invok(() => {
			if (!util.isTradeDate(new Date())) {
				return;
			}

			let txt = util.getNowDatetime() + ' 定时任务执行';
			logger.info(txt);
			let hour = 15;
			store.select('stock_master', null, async(data) => {
				for (let item of data) {
					kdb.copyToday(item.code, (res) => {
						// 未找到更新数据时，延迟1小时继续执行
						if (res == null) {
							logger.error('未找到当日更新数据', item);
							/*hour += 1;
							let taskList = new TaskList();
							taskList.updateTodayQuote('30 ' + hour + ' * * *');*/
						}
					});
					await util.sleep(moment.duration(2, 'm').asMilliseconds());
				}
				//job.reminder.cancel()
			});
		});
	}

	/**
	 * 乐天自动登录
	 * @todo 作为服务器运行有问题。
	 */
	autoRakutennLogin() {

		// 每天7：30执行数据更新
		//const job = new Scheduler('30 7 * * *');

		//job.invok(() => {
		// 登录坐标
		let loginPos = {
				x: 1194,
				y: 40,
				red: '940000',
				green: '299200'
			},
			loginHex;
		(new timelineplayer([

			[0, function() {
				robot.moveMouse(82, 780)
				robot.mouseClick();
			}],

			[2000, function() {
				loginHex = robot.getPixelColor(loginPos.x, loginPos.y);
				logger.info(loginHex)
					// 绿色
				if (loginHex == loginPos.green) {
					logger.info("判定为登出状态，执行自动登录");

					robot.keyTap("enter");
					robot.moveMouse(loginPos.x, loginPos.y);
					robot.mouseClick();
				}
			}],

			[4000, function() {
				if (loginHex == loginPos.green) {
					robot.typeString("wodi!234");
					robot.keyTap("enter");
				}

			}],

			[5000, function() {
				if (loginHex == loginPos.green) {
					robot.keyTap("enter");
					let hex = robot.getPixelColor(loginPos.x, loginPos.y);

					// #ff0000 红色
					if (hex == loginPos.red) {
						logger.info('登录成功！');
					}
				}
				process.exit();
			}]
		], function(p, v) {
			v[1]();
		})).play();
		//});
	}

	/**
	 * 定时任务表执行方法
	 */
	do() {
		// 启动短线狙击手
		this.doSniper('55 8 * * *');
		//this.doSniper('28 12 * * *');


		// 收集tickdata
		//this.doTickDataSvr();

		// 启动当天数据更新服务
		this.updateTodayQuote('35 15 * * *');
		// 乐天自动登录
		//this.autoRakutennLogin();
	}
}

export default TaskList;