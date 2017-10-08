import Schedule from '../../src/app/common/schedule';
import Kdb from '../../src/app/market/kdb';
import logger from '../../src/app/common/log';
import store from '../../src/app/store/mysql';
import util from '../../src/app/common/util';

const kdb = new Kdb();
const schedule = new Schedule();

schedule.autoRakutennLogin();

/*if (!util.isTradeDate(new Date())) {
	let txt = "判断为节假日，不执行定时任务";
	logger.info(txt);
}

let txt = util.getNowDatetime() + ' 定时任务执行';
console.log(txt);
let hour = 15;
store.select('stock_master', null, (data) => {
	for (let item of data) {
		kdb.copyToday(item.code, (res) => {
			// 未找到更新数据时，延迟1小时继续执行
			if (res == null) {
				hour += 1;
				let taskList = new TaskList();
				console.log('未找到更新数据时，延迟1小时继续执行');
				//taskList.updateTodayQuote('30 ' + hour + ' * * *');
			}
		});
	}
	//job.reminder.cancel()
});*/
/*
util.getHttp('http://www.educity.cn/tiku/paper_test.aspx?Is_member=1&tp_id=19679', data => {
	logger.info(data)
})*/