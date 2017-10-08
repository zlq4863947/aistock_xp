// 数据饲料处理类
function FeedHandler(feedHandler) {

  "use strict";

  //在这里初始化所有的变量
  this._webSocketConnection = null;
  this._symbolRequestResponseHandler = null;
  this._ohlcRequestResponseHandler = null;
  this._tickDataRequestResponseHandler = null;
  this._isConnectionReady = false;
  this._db = null;
  this._lastTickTime = null;

  this.init();

}

FeedHandler.prototype.close = function() {

  "use strict";

  if (this._webSocketConnection) {
    this._webSocketConnection.close();
  }

};

FeedHandler.prototype.init = function() {

  "use strict";
  // wss://www.binary.com/websockets/v3
  this._webSocketConnection = new ReconnectingWebSocket("ws://ws.aistock.ga");

  this._db = new loki();
  /*
    {
      //--------------------Start - Used in OHLCRequestResponseHandler --------------------
      barsKeyTableID : <timestamp>,
      key : symbol + actualResolution,
      onErrorCallback_chart : ,
      onDataCallback_chart : ,
      //--------------------End - Used in OHLCRequestResponseHandler ----------------------
      //--------------------Start - Used in TickDataRequestResponseHandler ----------------
      listenerGUID : , //From TradingView
      onRealtimeCallback_chart : ,
      //--------------------End - Used in TickDataRequestResponseHandler ------------------
    }
  */
  // 创建数据集
  this._db.addCollection('bars_key_table');
  /*
    {
      barsKeyTableID : <same as bars_key_table.id>,
      open : ,
      high : ,
      low : ,
      close : ,
      time : ,
      //该字段用于指示K线是否已在图表上呈现。
      //TradingView不喜欢尝试重新绘制已经在图表上呈现的K线。
      rendered :
    }
  */
  this._db.addCollection('bars_table');

  this._symbolRequestResponseHandler = new SymbolRequestResponsehandler(this);
  this._ohlcRequestResponseHandler = new OHLCRequestResponseHandler(this);
  this._tickDataRequestResponseHandler = new TickDataRequestResponseHandler(this);
  this._webSocketConnection.debug = false;
  this._webSocketConnection.timeoutInterval = 5400;

  this._webSocketConnection.onopen = function(event) {
    this._isConnectionReady = true;
    $(document).trigger('websocketsConnectionReady');
  };

  this._webSocketConnection.onerror = function(event) {
    this._isConnectionReady = false;
    console.log('WS 错误!', event);
  };

  var that = this;
  this._webSocketConnection.onmessage = function(event) {
    var data = JSON.parse(event.data);
    console.log('Message type : ', data.msg_type);
    console.log('Message : ', data);
    switch (data.msg_type) {
      // 收到一个给定日期的市场开放时间列表
      case "trading_times":
        that._symbolRequestResponseHandler.process(data);
        break;
      case "candles":
        console.log(data);
        that._ohlcRequestResponseHandler.process(data);
        break;
      case "tick":
        //console.log(data);
        if (data.tick.error) {
          //这意味着，在这个仪器没有实时数据饲料
          $(document).trigger("chart-status-picture-change", ["delayed-feed"]);
          that._lastTickTime = null;
        } else {
          if (data.echo_req.passthrough && data.echo_req.passthrough.tradingview_ticker_id) {
            var tradingview_ticker_id = TradingView.currentlyDisplayedSymbol + TradingView.actualResolution;
            if (tradingview_ticker_id === data.echo_req.passthrough.tradingview_ticker_id) {
              that._lastTickTime = Date.now();
              $(document).trigger("chart-status-picture-change", ["realtime-feed"]);
              that._tickDataRequestResponseHandler.process(data);
            } else {
              that._webSocketConnection.send(JSON.stringify({
                "forget": data.tick.id
              }));
            }
          }
        }
        break;
    }
  };

  //如果图表是实时的，并且我们在过去1分钟没有收到tick，那么我们处于断开模式
  //再次订阅tick流
  setInterval(function() {

    if (!that._lastTickTime) return;

    var timeElapsedAfterLastTick = Date.now() - that._lastTickTime;
    if (timeElapsedAfterLastTick >= 60000) { //60 seconds
      $(document).trigger("chart-status-picture-change", ["no-connection"]);
      //再次订阅tick流
      if (that._tickDataRequestResponseHandler) {
        console.log('重新订阅tick流');
        that._tickDataRequestResponseHandler.reSubscribeToTicks();
      }
    }

  }, 60000);

};