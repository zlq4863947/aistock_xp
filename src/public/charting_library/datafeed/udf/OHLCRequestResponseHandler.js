OHLCRequestResponseHandler = function(feedHandler) {

  "use strict";

  this.feedHandler = feedHandler;
  this._barsKeyTable = {};
  this._barsTable = {};

  this.init();
};

OHLCRequestResponseHandler.prototype.init = function() {

  "use strict";

  this._barsKeyTable = this.feedHandler._db.getCollection('bars_key_table');
  this._barsTable = this.feedHandler._db.getCollection('bars_table');

  this.requestParameters = function(rangeStartDate, rangeEndDate) {

    var parseSuffixAndIntValue = this.parseSuffixAndIntValue(),
      suffix = parseSuffixAndIntValue.suffix,
      intVal = parseSuffixAndIntValue.intVal,
      totalSecondsInABar = this.totalSecondsInABar(suffix, intVal);
    //console.log(suffix, intVal, totalSecondsInABar);

    // 计算K线条数
    var count = Math.ceil((rangeEndDate - rangeStartDate) / totalSecondsInABar);
    //console.log('Number of bars requested : ', count);

    return {
      suffix: suffix,
      intVal: intVal,
      count: count,
      totalSecondsInABar: totalSecondsInABar
    };

  };

  this.renderBars = function(tableID) {
    // 查找未被渲染的K线数组，以升序排序
    var db_Bars = this._barsTable.chain()
      .find({
        barsKeyTableID: tableID
      })
      .find({
        'rendered': false
      })
      .simplesort('time', false).data(),
      tableRow = this._barsKeyTable.findObject({
        barsKeyTableID: tableID
      });

    var
      onErrorCallback = tableRow.onErrorCallback_chart,
      onDataCallback = tableRow.onDataCallback_chart,
      bars = [];
    db_Bars.forEach(function(eachBar) {
      bars.push({
        time: eachBar.time,
        open: eachBar.open,
        high: eachBar.high,
        low: eachBar.low,
        close: eachBar.close
      });
      eachBar.rendered = true;
    });

    if (db_Bars && db_Bars.length > 0) {
      //不用标记最后的K线 rendered = true。因为它一直在变化
      db_Bars[db_Bars.length - 1].rendered = false;
    }
    this._barsTable.update(db_Bars);
    //console.log('Rendering bars', bars);
    console.log('K线大小:', bars.length);

    if (bars.length === 0 && onErrorCallback) {
      console.log('调用 TV onErrorCallback');
      onErrorCallback("no data");
    } else if (onDataCallback) {
      console.log('调用 TV onDataCallback');
      //如果 onErrorCallback 为 undefined/NULL，则请求最新K线订阅数据
      if (!onErrorCallback) {
        bars.forEach(function(bar) {
          onDataCallback(bar);
        });
      } else {
        onDataCallback(bars);
      }
    }
  };

};

// 解析分辨率
OHLCRequestResponseHandler.prototype.parseSuffixAndIntValue = function() {

  "use strict";

  // 获取当前分辨率数字
  var intValInString = TradingView.actualResolution.toUpperCase().replace('D', '').replace('M', '').replace('W', '');
  var intVal = intValInString === '' ? 1 : parseInt(intValInString);
  // 获取当前分辨率后缀
  var suffix = TradingView.actualResolution.replace('' + intVal, '');
  //console.log('Suffix : ', suffix, " TradingView.actualResolution : ", TradingView.actualResolution);
  switch (suffix) {
    case '':
      if (intVal < 60) {
        suffix = 'M';
      } else {
        intVal /= 60;
        suffix = 'H';
      }
      break;
    case 'W':
      intVal *= 7;
      suffix = 'D';
      break;
    case 'M':
      intVal *= 30;
      suffix = 'D';
      break;
  }
  return {
    suffix: suffix,
    intVal: intVal
  };
};

// 获取K线秒数
OHLCRequestResponseHandler.prototype.totalSecondsInABar = function(suffix, intVal) {

  "use strict";

  var totalSecondsInABar = 0;
  switch (suffix) {
    case 'M':
      totalSecondsInABar = intVal * 60;
      break;
    case 'H':
      totalSecondsInABar = intVal * 60 * 60;
      break;
    case 'D':
      totalSecondsInABar = intVal * 24 * 60 * 60;
      break;
  }
  return totalSecondsInABar;
};

OHLCRequestResponseHandler.prototype.getBars = function(symbolInfo, rangeStartDate, rangeEndDate, onDataCallback, onErrorCallback, ignoreEndDate) {

  "use strict";

  var that = this;

  //	timestamp sample: 1399939200
  if (rangeStartDate > 0 && (rangeStartDate + "").length > 10) {
    throw "Got a JS time instead of Unix one.";
  }

  var tableRow = this._barsKeyTable.findObject({
      'key': symbolInfo.ticker + TradingView.actualResolution
    }) || {},
    tableID = tableRow.barsKeyTableID || -1;
  if (tableID === -1) {
    tableID = new Date().getTime();
    this._barsKeyTable.insert({
      barsKeyTableID: tableID,
      key: symbolInfo.ticker + TradingView.actualResolution,
      onErrorCallback_chart: onErrorCallback,
      onDataCallback_chart: onDataCallback,
    });
    tableRow = this._barsKeyTable.findOne({
      barsKeyTableID: tableID
    });
  } else {
    //更新回调方法
    tableRow.onDataCallback_chart = onDataCallback;
    tableRow.onErrorCallback_chart = onErrorCallback;
    this._barsKeyTable.update(tableRow);
  }

  var requestParameters = this.requestParameters(rangeStartDate, rangeEndDate),
    suffix = requestParameters.suffix,
    intVal = requestParameters.intVal,
    count = requestParameters.count,
    totalSecondsInABar = requestParameters.totalSecondsInABar;

  var dataExists = false;
  if (this._barsTable.findObject({
      'barsKeyTableID': tableID
    })) { //检查数据是否存在
    var firstBar = this._barsTable.chain().find({
        'barsKeyTableID': tableID
      }).simplesort('time', false).limit(1).data()[0],
      timeOfFirstBar = firstBar.time / 1000;

    //图表移动到左边时获取K线历史数据，我们不需要rangeEndDate作为最新的K线时间。
    //rangeEndDate可以是图表上第一个K线的时间。 TradingView库有一些问题
    //它始终发送rangeEndDate作为当前时间。这增加了WS API调用的COUNT参数
    if (rangeStartDate < timeOfFirstBar) {
      console.log('修改结束时间!');
      rangeEndDate = timeOfFirstBar;
    }
    dataExists = true;
  }

  //我们一次不能要求超过500支蜡烛
  if (count > 500) {
    rangeStartDate = rangeEndDate - 450 * totalSecondsInABar;
  }

  //我们不能要求超过3年的旧数据。
  var maxDateBackFromNow_seconds = Math.floor(moment.utc().valueOf() / 1000 - 3 * 365 * 24 * 60 * 60);
  if (rangeStartDate < maxDateBackFromNow_seconds) {
    rangeStartDate = maxDateBackFromNow_seconds;
  }

  rangeEndDate += totalSecondsInABar;
  console.log('请求日期范围 : ', new Date(rangeStartDate * 1000), new Date(rangeEndDate * 1000),
    'K线秒数 : ', totalSecondsInABar,
    '忽略结束日期 : ', ignoreEndDate);
  var requestObject = {
    "ticks_history": symbolInfo.ticker,
    "start": Math.floor(rangeStartDate),
    "end": ignoreEndDate || !dataExists ? 'latest' : Math.ceil(rangeEndDate),
    //"count": count,
    // 粒度：蜡烛的时间维度。默认60(秒)
    "granularity": suffix + intVal,
    "adjust_start_time": 1
  };
  console.log(JSON.stringify(requestObject));
  this.feedHandler._webSocketConnection.send(JSON.stringify(requestObject));

};

OHLCRequestResponseHandler.prototype.process = function(data) {

  "use strict";

  if (!data.candles) return;
  console.log('返回的蜡烛数 (通过 WS API): ', data.candles.length);

  //蜡烛按时间顺序返回
  var barsFromResponse = data.candles;

  var tableRow = this._barsKeyTable.findObject({
      'key': data.echo_req.ticks_history + TradingView.actualResolution
    }) || {},
    tableID = tableRow.barsKeyTableID || -1;

  var that = this;

  barsFromResponse.forEach(function(eachData) {
    var time = parseInt(eachData.epoch) * 1000;
    var open = parseFloat(eachData.open);
    var high = parseFloat(eachData.high);
    var low = parseFloat(eachData.low);
    var close = parseFloat(eachData.close);

    var bars = that._barsTable.chain().find({
      'barsKeyTableID': tableID
    }).find({
      'time': time
    }).limit(1).data();
    if (bars.length <= 0) {
      that._barsTable.insert({
        barsKeyTableID: tableID,
        time: time,
        open: open,
        high: high,
        low: low,
        close: close,
        rendered: false
      });
    } else {
      bars[0].open = open;
      bars[0].high = high;
      bars[0].low = low;
      bars[0].close = close;
      that._barsTable.update(bars);
    }

  });

  this.renderBars(tableID);

  $(document).trigger('barsLoaded');

};

OHLCRequestResponseHandler.prototype.resetTableData = function(symbolInfo) {

  "use strict";

  var tableRow = this._barsKeyTable.findObject({
      'key': symbolInfo.ticker + TradingView.actualResolution
    }) || {},
    tableID = tableRow.barsKeyTableID || -1,
    bars = this._barsTable.chain().find({
      'barsKeyTableID': tableID
    }).data() || [];
  bars.forEach(function(bar) {
    bar.rendered = false;
  });
  this._barsTable.update(bars);
};