/**
 * 日志模块
 * 
 * @module common/log
 */
import log4js from 'log4js';
import config from '../config/config';

/**
 * 日志对象
 * @property {boolean} firstLoad - 是否为第一次加载（默认：true）.
 */
const log = {
	firstLoad: true,
	/**
	 * 初始化日志
	 * @func init
	 */
	init: function() {
		if (this.firstLoad) {
			log4js.configure(config.log);
			this.firstLoad = false;
		}
	},
	/**
	 * 获取系统日志
	 * @func get
	 * @return {Object} 系统日志对象
	 */
	get: function() {
		return log4js.getLogger('system');
	}
};
log.firstLoad && log.init();
/** 模块的名称。 */
const logger = log.get();

export default logger;