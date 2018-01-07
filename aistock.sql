/*
Navicat MySQL Data Transfer

Source Server         : 127.0.0.1
Source Server Version : 50717
Source Host           : 127.0.0.1:3306
Source Database       : aistock

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2018-01-07 19:59:55
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for analyst
-- ----------------------------
DROP TABLE IF EXISTS `analyst`;
CREATE TABLE `analyst` (
  `symbol` varchar(11) NOT NULL,
  `date` varchar(10) NOT NULL,
  `time` varchar(8) NOT NULL,
  `k` varchar(3) DEFAULT NULL,
  `open` varchar(11) DEFAULT NULL COMMENT '始値',
  `high` varchar(11) DEFAULT NULL COMMENT '高値',
  `low` varchar(11) DEFAULT NULL COMMENT '安値',
  `close` varchar(11) DEFAULT NULL COMMENT '終値',
  `period` varchar(5) DEFAULT NULL,
  `volume` int(11) DEFAULT NULL COMMENT '出来高',
  `turnover` bigint(20) DEFAULT NULL COMMENT '売買代金',
  `trend` varchar(1) DEFAULT NULL COMMENT '0:盘整,1:跌势,2:涨势',
  `new` varchar(1) DEFAULT NULL,
  `over` bigint(20) DEFAULT NULL,
  `under` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`symbol`,`date`,`time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for asset
-- ----------------------------
DROP TABLE IF EXISTS `asset`;
CREATE TABLE `asset` (
  `userId` varchar(11) NOT NULL,
  `date` varchar(10) NOT NULL,
  `time` varchar(8) NOT NULL,
  `fund` varchar(50) DEFAULT NULL,
  `symbol` varchar(11) DEFAULT NULL,
  `unit` varchar(11) DEFAULT NULL COMMENT '安値',
  `new` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`userId`,`date`,`time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for min_tick
-- ----------------------------
DROP TABLE IF EXISTS `min_tick`;
CREATE TABLE `min_tick` (
  `symbol` varchar(11) NOT NULL,
  `date` varchar(10) NOT NULL,
  `time` varchar(8) NOT NULL,
  `k` varchar(3) DEFAULT NULL,
  `open` varchar(11) DEFAULT NULL COMMENT '始値',
  `high` varchar(11) DEFAULT NULL COMMENT '高値',
  `low` varchar(11) DEFAULT NULL COMMENT '安値',
  `close` varchar(11) DEFAULT NULL COMMENT '終値',
  `trend` varchar(1) DEFAULT NULL COMMENT '0:盘整,1:跌势,2:涨势',
  `over` bigint(20) DEFAULT NULL,
  `under` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`symbol`,`date`,`time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for mock_tick
-- ----------------------------
DROP TABLE IF EXISTS `mock_tick`;
CREATE TABLE `mock_tick` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `symbol` varchar(11) DEFAULT NULL,
  `date` varchar(10) DEFAULT NULL,
  `time` varchar(8) DEFAULT NULL,
  `price` varchar(11) DEFAULT NULL COMMENT '股价',
  `volume` varchar(11) DEFAULT NULL COMMENT '出来高',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1709 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for quotes
-- ----------------------------
DROP TABLE IF EXISTS `quotes`;
CREATE TABLE `quotes` (
  `code` varchar(11) NOT NULL,
  `date` varchar(11) NOT NULL COMMENT '現在日付',
  `time` varchar(8) NOT NULL COMMENT '現在値詳細時刻',
  `epoch` int(20) DEFAULT NULL,
  `open` int(11) DEFAULT NULL,
  `high` int(11) DEFAULT NULL,
  `low` int(11) DEFAULT NULL,
  `close` int(11) DEFAULT NULL,
  `step1` int(11) DEFAULT NULL COMMENT '歩み１',
  `step2` int(11) DEFAULT NULL COMMENT '歩み２',
  `step3` int(11) DEFAULT NULL COMMENT '歩み３',
  `step4` int(11) DEFAULT NULL COMMENT '歩み４',
  `step1_time` varchar(8) DEFAULT NULL,
  `step2_time` varchar(8) DEFAULT NULL,
  `step3_time` varchar(8) DEFAULT NULL,
  `step4_time` varchar(8) DEFAULT NULL,
  `volume` int(11) DEFAULT NULL COMMENT '出来高',
  `turnover` bigint(20) DEFAULT NULL COMMENT '売買代金',
  `vwap` int(11) DEFAULT NULL COMMENT '出来高加重平均',
  `bid1` int(11) DEFAULT NULL COMMENT '最良売気配値１',
  `bid2` int(11) DEFAULT NULL,
  `bid3` int(11) DEFAULT NULL,
  `bid4` int(11) DEFAULT NULL,
  `bid5` int(11) DEFAULT NULL,
  `bid6` int(11) DEFAULT NULL,
  `bid7` int(11) DEFAULT NULL,
  `bid8` int(11) DEFAULT NULL,
  `bid9` int(11) DEFAULT NULL,
  `bid10` int(11) DEFAULT NULL,
  `bid_vol1` bigint(20) DEFAULT NULL COMMENT '最良売気配数量１',
  `bid_vol2` bigint(20) DEFAULT NULL,
  `bid_vol3` bigint(20) DEFAULT NULL,
  `bid_vol4` bigint(20) DEFAULT NULL,
  `bid_vol5` bigint(20) DEFAULT NULL,
  `bid_vol6` bigint(20) DEFAULT NULL,
  `bid_vol7` bigint(20) DEFAULT NULL,
  `bid_vol8` bigint(20) DEFAULT NULL,
  `bid_vol9` bigint(20) DEFAULT NULL,
  `bid_vol10` bigint(20) DEFAULT NULL,
  `ask1` int(11) DEFAULT NULL,
  `ask2` int(11) DEFAULT NULL,
  `ask3` int(11) DEFAULT NULL,
  `ask4` int(11) DEFAULT NULL,
  `ask5` int(11) DEFAULT NULL,
  `ask6` int(11) DEFAULT NULL,
  `ask7` int(11) DEFAULT NULL,
  `ask8` int(11) DEFAULT NULL,
  `ask9` int(11) DEFAULT NULL,
  `ask10` int(11) DEFAULT NULL,
  `ask_vol1` bigint(20) DEFAULT NULL,
  `ask_vol2` bigint(20) DEFAULT NULL,
  `ask_vol3` bigint(20) DEFAULT NULL,
  `ask_vol4` bigint(20) DEFAULT NULL,
  `ask_vol5` bigint(20) DEFAULT NULL,
  `ask_vol6` bigint(20) DEFAULT NULL,
  `ask_vol7` bigint(20) DEFAULT NULL,
  `ask_vol8` bigint(20) DEFAULT NULL,
  `ask_vol9` bigint(20) DEFAULT NULL,
  `ask_vol10` bigint(20) DEFAULT NULL,
  `over_vol` bigint(20) DEFAULT NULL,
  `under_vol` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`code`,`date`,`time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sniper
-- ----------------------------
DROP TABLE IF EXISTS `sniper`;
CREATE TABLE `sniper` (
  `code` varchar(11) NOT NULL,
  `date` varchar(10) NOT NULL,
  `time` varchar(10) NOT NULL,
  `price` varchar(20) DEFAULT NULL COMMENT '价格',
  `k` varchar(2) DEFAULT NULL COMMENT 'k値',
  PRIMARY KEY (`code`,`date`,`time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for stock
-- ----------------------------
DROP TABLE IF EXISTS `stock`;
CREATE TABLE `stock` (
  `code` varchar(11) NOT NULL,
  `date` varchar(10) NOT NULL,
  `open` varchar(11) DEFAULT NULL COMMENT '始値',
  `high` varchar(11) DEFAULT NULL COMMENT '高値',
  `low` varchar(11) DEFAULT NULL COMMENT '安値',
  `close` varchar(11) DEFAULT NULL COMMENT '終値',
  `volume` int(11) DEFAULT NULL COMMENT '出来高',
  `turnover` bigint(20) DEFAULT NULL COMMENT '売買代金',
  `trend` varchar(1) DEFAULT NULL COMMENT '0:盘整,1:跌势,2:涨势',
  `period` varchar(5) DEFAULT NULL COMMENT '间隔',
  `time` varchar(5) DEFAULT NULL,
  `k` varchar(10) DEFAULT NULL,
  `d` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`code`,`date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for stock_master
-- ----------------------------
DROP TABLE IF EXISTS `stock_master`;
CREATE TABLE `stock_master` (
  `code` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `group` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for test
-- ----------------------------
DROP TABLE IF EXISTS `test`;
CREATE TABLE `test` (
  `id` varchar(255) NOT NULL,
  `a` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for trader
-- ----------------------------
DROP TABLE IF EXISTS `trader`;
CREATE TABLE `trader` (
  `userId` varchar(11) NOT NULL,
  `symbol` varchar(11) NOT NULL,
  `date` varchar(10) NOT NULL,
  `time` varchar(8) NOT NULL,
  `k` varchar(3) DEFAULT NULL,
  `buy` varchar(11) DEFAULT NULL COMMENT '始値',
  `sell` varchar(11) DEFAULT NULL COMMENT '高値',
  `unit` varchar(11) DEFAULT NULL COMMENT '安値',
  `money` varchar(11) DEFAULT NULL COMMENT '終値',
  PRIMARY KEY (`symbol`,`date`,`time`,`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_dde
-- ----------------------------
DROP TABLE IF EXISTS `t_dde`;
CREATE TABLE `t_dde` (
  `date` varchar(11) NOT NULL COMMENT '現在日付',
  `time` varchar(15) NOT NULL COMMENT '現在値詳細時刻',
  `topic` varchar(50) NOT NULL,
  `item` varchar(50) NOT NULL,
  `text` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`date`,`time`,`topic`,`item`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
