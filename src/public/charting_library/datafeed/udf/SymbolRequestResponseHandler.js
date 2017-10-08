// 商品信息处理类
SymbolRequestResponsehandler = function(feedHandler) {

  "use strict";

  this._markets = null;
  this._symbolTypes = null;

  this._currentlyProcessingRequest = false;

  this.fetchSymbolListAndInformation = function() {
    // 如果市场信息尚未加载
    if (!this._markets) {
      // 如果我们现在已经在处理一个请求， 则忽略后续请求
      if (!this._currentlyProcessingRequest) {
        //当WS API可用时，请更改此代码以使用API获取交易所和商品类型列表
        if (feedHandler._webSocketConnection) {
          this._currentlyProcessingRequest = true;
          if (!feedHandler._isConnectionReady) {
            $(document).one('websocketsConnectionReady', function() {
              feedHandler._webSocketConnection.send(JSON.stringify({
                "trading_times": "" + new Date().toLocaleDateString()
              }));
            });
          } else {
            feedHandler._webSocketConnection.send(JSON.stringify({
              "trading_times": "" + new Date().toLocaleDateString() //.toISOString().slice(0, 10)
            }));
          }
        }
      }
    } else {
      this._currentlyProcessingRequest = false;
    }
  };

};

SymbolRequestResponsehandler.prototype.getSymbolTypeList = function() {
  "use strict";
  this.fetchSymbolListAndInformation();
  return this._symbolTypes;
};

SymbolRequestResponsehandler.prototype.getSymbolList = function() {
  "use strict";
  this.fetchSymbolListAndInformation();
  return this.markets;
};

SymbolRequestResponsehandler.prototype.process = function(data) {
  "use strict";
  this._markets = [];
  this._symbolTypes = [];

  for (var marketIndex = 0; marketIndex < data.trading_times.markets.length; marketIndex++) {
    var marketFromResponse = data.trading_times.markets[marketIndex];
    this._symbolTypes.push(marketFromResponse.name);
    var market = {
      name: marketFromResponse.name, //Same as symbolType
      submarkets: []
    };

    for (var subMktIndx = 0; subMktIndx < marketFromResponse.submarkets.length; ++subMktIndx) {
      var submarket = marketFromResponse.submarkets[subMktIndx];
      var submarketObj = {
        name: submarket.name,
        symbols: []
      };
      for (var symbIndx = 0; symbIndx < submarket.symbols.length; symbIndx++) {
        var eachSymbol = submarket.symbols[symbIndx];
        if (!eachSymbol.feed_license || eachSymbol.feed_license !== 'chartonly') {
          submarketObj.symbols.push({
            symbol: eachSymbol.symbol,
            symbol_display: eachSymbol.name
          });
        }
      }
      market.submarkets.push(submarketObj);
    }

    this._markets.push(market);
  }

  $(document).trigger('marketsLoaded');
  this._currentlyProcessingRequest = false;
};