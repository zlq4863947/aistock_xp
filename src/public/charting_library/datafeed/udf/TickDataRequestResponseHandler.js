TickDataRequestResponseHandler = function(feedHandler) {

  "use strict";

  this.feedHandler = feedHandler;
  this._barsKeyTable = {};
  this._barsTable = {};

  this.init();

};

TickDataRequestResponseHandler.prototype.init = function() {

  "use strict";
  this._barsKeyTable = this.feedHandler._db.getCollection('bars_key_table');
  this._barsTable = this.feedHandler._db.getCollection('bars_table');

};

TickDataRequestResponseHandler.prototype.process = function(data) {

  "use strict";
  var tableRow = this._barsKeyTable.findObject({
    key: data.echo_req.ticks + TradingView.actualResolution
  });
  if (!tableRow) return;

  var lastBar = this._barsTable.chain().find({
    barsKeyTableID: tableRow.barsKeyTableID
  }).simplesort('time', true).limit(1).data();
  if (!lastBar || lastBar.length <= 0) return;
  lastBar = lastBar[0];
  if (lastBar.time < parseInt(data.tick.epoch)) return;

  var price = parseFloat(data.tick.quote);

  if (price > lastBar.high) {
    lastBar.high = price;
  } else if (price < lastBar.low) {
    lastBar.low = price;
  }
  lastBar.close = price;
  lastBar.rendered = false; //Keep it to false because it is always changing bar

  if (tableRow.onRealtimeCallback_chart) {
    this._barsTable.update(lastBar);
    tableRow.onRealtimeCallback_chart({
      time: lastBar.time,
      open: lastBar.open,
      high: lastBar.high,
      low: lastBar.low,
      close: lastBar.close
    });
  }

};

TickDataRequestResponseHandler.prototype.subscribeBars = function(symbolInfo, onRealtimeCallback, listenerGUID) {

  "use strict";
  //console.log(listenerGUID);
  var tableRow = this._barsKeyTable.findObject({
    key: symbolInfo.ticker + TradingView.actualResolution
  });
  if (!tableRow) return;

  // 检查listenerGUID是否已经被分配，如果已分配则中断处理
  if (tableRow.listenerGUID) return;

  tableRow.onRealtimeCallback_chart = onRealtimeCallback;
  tableRow.listenerGUID = listenerGUID;

  // 订阅实时tick饲料
  this.feedHandler._webSocketConnection.send(JSON.stringify({
    "ticks": symbolInfo.ticker,
    // 直通: 通过ws传输数据
    "passthrough": {
      "tradingview_ticker_id": symbolInfo.ticker + TradingView.actualResolution
    }
  }));

  //订阅新的K线 - 第一次超时调用是基于我们执行此时间和下一个K线时间之间的差异
  //这种差异可能与totalSecondsInABar不同，因为我们不知道用户什么时候打开图表。
  var lastBar = this._barsTable.chain().find({
    barsKeyTableID: tableRow.barsKeyTableID
  }).simplesort('time', true).limit(1).data()[0];
  console.log('我们现在不知道最后一个K线时间 : ', lastBar.time);
  var suffixAndIntVal = this.feedHandler._ohlcRequestResponseHandler.parseSuffixAndIntValue(),
    totalSecondsInABar = this.feedHandler._ohlcRequestResponseHandler.totalSecondsInABar(suffixAndIntVal.suffix, suffixAndIntVal.intVal),
    nextBarDateInLocal = lastBar.time + totalSecondsInABar * 1000;
  var dateNow = moment.utc().valueOf();
  var that = this;
  console.log('秒钟之后将调用setTimeout: ', Math.ceil((nextBarDateInLocal - dateNow) / 1000));
  console.log('秒钟之后将调用setInterval: ', totalSecondsInABar);

  tableRow.timerHandler = setTimeout(function() {
    console.log('设定超时时间 : ', new Date());

    function requestBarUpdates() {
      lastBar = that._barsTable.chain().find({
        barsKeyTableID: tableRow.barsKeyTableID
      }).simplesort('time', true).limit(1).data();
      if (lastBar && lastBar.length > 0) {
        lastBar = lastBar[0];
        console.log('最新的K线 : ', lastBar);
        //请求新K线
        that.feedHandler._ohlcRequestResponseHandler.getBars(symbolInfo, lastBar.time / 1000, moment().utc().valueOf() / 1000 + totalSecondsInABar, onRealtimeCallback, null, true);
      }
    }

    //从现在起，我们可以有一个间隔计时器来更新的K线
    tableRow.timerHandler = setInterval(function() {
      console.log('设置间隔调用: ', new Date());
      requestBarUpdates();
    }, totalSecondsInABar * 1000);

    requestBarUpdates();
    that._barsKeyTable.update(tableRow);

  }, Math.ceil(nextBarDateInLocal - dateNow) + 1000); //Trigger scheduled time + 1s later. Hitting server before 1s is too early to get current bar
  this._barsKeyTable.update(tableRow);

};

TickDataRequestResponseHandler.prototype.unsubscribeBars = function(listenerGUID) {

  "use strict";
  var tableRow = this._barsKeyTable.findObject({
    listenerGUID: listenerGUID
  });
  if (!tableRow) return;

  //清除定时器以获取最新的OHLC - 在这一点上，我们不知道它是setTimeout还是setInterval
  try {
    clearInterval(tableRow.timerHandler);
  } catch (e) {}
  try {
    clearTimeout(tableRow.timerHandler);
  } catch (e) {}

  /*
    在以下情况下调用此方法 - 
       当图表从左向右移动时，图表框架要求更多的历史蜡烛
       当时间段改变时
       当商品改变时
     我们不能清除整个表。 我们可以做的是，我们可以清除这些变量（那些标签）
      {
        barsKeyTableID : <timestamp>,
        key : symbol + actualResolution,
                onErrorCallback_chart : ,
                onDataCallback_chart : ,
                listenerGUID : , //From TradingView
                onRealtimeCallback_chart : ,
      }
  */
  tableRow.onErrorCallback_chart = null;
  tableRow.onDataCallback_chart = null;
  tableRow.listenerGUID = null;
  tableRow.onRealtimeCallback_chart = null;
  this._barsKeyTable.update(tableRow);
};

TickDataRequestResponseHandler.prototype.reSubscribeToTicks = function() {

  "use strict";
  var tableRows = this._barsKeyTable.findObjects({});
  if (tableRows) {
    for (var tableRowIndex = 0; tableRowIndex < tableRows.length; tableRowIndex++) {
      var tableRow = tableRows[tableRowIndex];
      if (tableRow) {
        var ticker = tableRow.key.replace(TradingView.actualResolution, "").trim();
        this.feedHandler._webSocketConnection.send(JSON.stringify({
          "ticks": ticker,
          "passthrough": {
            "tradingview_ticker_id": tableRow.key
          }
        }));
      }
    }
    this._barsKeyTable.update(tableRows);
  }

};