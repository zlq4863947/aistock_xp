'use strict';

// API IMPLEMENTATION

var TradingController = function(datafeed) {
	this._positions = [];
	this._orders = [];
	this._executions = [];
	this._ordersById = {};
	this._idsCounter = 1;
	this._positionsBySymbol = {};
	this._datafeed = datafeed;
	this._host = null;

	this._amChangeDelegate = null;
	this._amData = {
		title: '交易终端',
		balance: 10000000,
		equity: 10000000,
		pl: 0.0
	};

	this._plSubscriptions = {};
};

TradingController.prototype.setHost = function(host) {
	this._host = host;

	var that = this;

	this._host.setButtonDropdownActions(that.buttonDropdownItems());

	this._host.floatingTradingPanelVisibility().subscribe(function() {
		that._host.setButtonDropdownActions(that.buttonDropdownItems());
	});

	this._amChangeDelegate = that._host.factory.createDelegate();

	this._summaryValues = {
		balance: that._host.factory.createWatchedValue(this._amData.balance),
		equity: that._host.factory.createWatchedValue(this._amData.equity),
	};

	this._amChangeDelegate.subscribe(null, function(values) {
		that._summaryValues.balance.setValue(values.balance);
		that._summaryValues.equity.setValue(values.equity);
	});
};

TradingController.prototype.supportFloatingPanel = function() {
	return true;
};

TradingController.prototype.supportBottomWidget = function() {
	return true;
};

TradingController.prototype.configFlags = function() {
	return {
		supportReversePosition: true,
		supportClosePosition: true,
		supportPLUpdate: true,
		supportDOME: true,
		showQuantityInsteadOfAmount: true,
		supportEditAmount: false,
	};
};

TradingController.prototype.durations = function() {
	return [{
		name: 'DAY',
		value: 'DAY'
	}, {
		name: 'GTC',
		value: 'GTC'
	}];
};

TradingController.prototype.buttonDropdownItems = function() {
	var that = this;
	var defaultActions = this._host.defaultDropdownMenuActions({
		showFloatingToolbar: true
	});
	return defaultActions.concat([{
		text: '-'
	}, {
		text: '交易属性...',
		action: function() {
			that._host.showTradingProperties();
		}
	}]);
};

TradingController.prototype.chartContextMenuItems = function(context) {
	return this._host.defaultContextMenuActions(context);
};

TradingController.prototype.bottomContextMenuItems = function(e, activePageItems) {
	// this method is optional, it overrides default menu

	var that = this;

	var separator = {
		text: '-'
	};

	if (activePageItems.length) {
		activePageItems.push(separator);
	}

	return activePageItems.concat([{
		text: '显示 买/卖 面板',
		action: function() {
			that._host.floatingTradingPanelVisibility().setValue(!that._host.floatingTradingPanelVisibility().value());
		},

		checkable: true,
		checked: that._host.floatingTradingPanelVisibility().value()
	}, {
		text: '交易属性...',
		action: function() {
			that._host.showTradingProperties();
		}
	}]);
};

TradingController.prototype.isTradable = function(symbol) {
	return true;
};

TradingController.prototype.placeOrder = function(order, silently) {
	var that = this;

	var handler = function(params) {
		if (params.stopLoss || params.takeProfit || (params.expiration && params.expiration.expiration)) {
			console.log('Stop Loss, Take Profit and Expiration are not implemented in this sample.');
		}

		that._host.activateBottomWidget();

		var d = $.Deferred();

		var obj = {
			symbol: params.symbol,
			side: params.side,
			qty: params.qty,
			stopPrice: params.stopPrice,
			limitPrice: params.limitPrice,
			type: params.type,
			id: that._idsCounter++,
			profit: 0,
			status: 'working',
			duration: params.duration, // duration is not used in this sample
		};

		that._updateOrder(obj);

		setTimeout(function() {
			d.resolve(obj);
		}, 0);

		return d.promise();
	};

	if (silently) {
		return handler(order);
	} else {
		return this._host.showOrderDialog(order, handler).catch(function() {});
	}
};

TradingController.prototype.modifyOrder = function(params, silently, focus) {
	var that = this;

	var handler = function(params) {
		var order = that._ordersById[params.id];
		if (order) {
			var data = $.extend({}, order.data);
			data.qty = params.qty;
			data.stopPrice = params.stopPrice;
			data.limitPrice = params.limitPrice;
			that._updateOrder(data);
		}

		return $.Deferred().resolve();
	};

	if (silently) {
		return handler(params);
	} else {
		return this._host.showOrderDialog(params, handler).catch(function() {});
	}
};

TradingController.prototype.closePosition = function(symbol, silently) {
	var that = this;
	var position = this._positionsBySymbol[symbol];

	var handler = function() {
		return that.placeOrder({
			symbol: symbol,
			side: position.data.side === 'sell' ? 'buy' : 'sell',
			type: 'market',
			qty: position.data.qty
		}, true);
	};

	if (silently) {
		return handler();
	} else {
		return this._host.showClosePositionDialog(position.data, handler);
	}
};

TradingController.prototype.orders = function() {
	return $.Deferred().resolve(this._orders.map(function(orderObj) {
		return orderObj.data;
	}));
};

TradingController.prototype.positions = function() {
	return $.Deferred().resolve(this._positions.map(function(positionObj) {
		return positionObj.data;
	}));
};

TradingController.prototype.executions = function(symbol) {
	return $.Deferred().resolve(this._executions.map(function(executionObj) {
		return executionObj.data;
	}).filter(function(data) {
		return data.symbol === symbol;
	}));
};

TradingController.prototype.reversePosition = function(symbol, silently) {
	var that = this;
	var position = this._positionsBySymbol[symbol];
	var handler = function() {
		return that.placeOrder({
			symbol: symbol,
			side: position.data.side === 'sell' ? 'buy' : 'sell',
			type: 'market',
			qty: position.data.qty * 2
		}, true);
	};

	if (silently) {
		return handler();
	} else {
		return this._host.showReversePositionDialog(position.data, handler);
	}
};

TradingController.prototype.cancelOrder = function(orderId, silently) {
	var that = this;
	var data = this._ordersById[orderId].data;

	var handler = function() {
		data.status = 'cancelled';
		that._updateOrder(data);
		return $.Deferred().resolve();
	};

	if (silently) {
		return handler();
	} else {
		return this._host.showCancelOrderDialog(data.id, handler);
	}
};

TradingController.prototype.cancelOrders = function(symbol, side, ordersIds, silently) {
	var that = this;

	function closeHandler() {
		return $.when(ordersIds.map(function(orderId) {
			return that.cancelOrder(orderId, true);
		}));
	}

	if (silently) {
		return closeHandler();
	} else {
		return that._host.showCancelMultipleOrdersDialog(symbol, side, ordersIds.length, closeHandler);
	}
};

TradingController.prototype.accountManagerInfo = function() {
	var ORDERCOLUMNS = [{
		label: '商品',
		className: 'tv-data-table__cell--symbol-cell',
		formatter: 'symbol',
		property: 'symbol'
	}, {
		label: '方向',
		className: '',
		property: 'side',
		formatter: 'side'
	}, {
		label: '类型',
		className: '',
		property: 'type',
		formatter: 'type'
	}, {
		label: '数量',
		className: 'tv-data-table__cell--right-align',
		property: 'qty',
		help: 'Size in lots'
	}, {
		label: '限价',
		className: 'tv-data-table__cell--right-align',
		property: 'limitPrice',
		formatter: 'formatPrice'
	}, {
		label: '停损价',
		className: 'tv-data-table__cell--right-align',
		property: 'stopPrice',
		formatter: 'formatPrice'
	}, {
		label: '成交价',
		className: 'tv-data-table__cell--right-align',
		property: 'last',
		formatter: 'formatPriceForexSup',
		highlightDiff: true
	}, {
		id: 'status', // this column is filtered out in statuses filter by id
		label: '状态',
		className: '',
		property: 'status',
		formatter: 'status'
	}, {
		label: '报单id',
		className: '',
		property: 'id'
	}, {
		label: '',
		className: 'tv-data-table__cell--buttons-cell',
		formatter: 'orderSettings',
		notSortable: true,
		modificationProperty: 'status'
	}];

	var POSITIONCOLUMNS = [{
		label: '商品',
		className: 'tv-data-table__cell--symbol-cell',
		formatter: 'symbol',
		property: 'symbol'
	}, {
		label: '方向',
		className: '',
		property: 'side',
		formatter: 'side'
	}, {
		label: '数量',
		className: 'tv-data-table__cell--right-align',
		property: 'qty',
		help: 'Size in lots'
	}, {
		label: '平均成交价',
		className: 'tv-data-table__cell--right-align',
		property: 'avgPrice',
		formatter: 'formatPrice'
	}, {
		label: '成交价',
		className: 'tv-data-table__cell--right-align',
		property: 'last',
		formatter: 'formatPriceForexSup',
		highlightDiff: true
	}, {
		label: '盈利',
		className: 'tv-data-table__cell--right-align',
		property: 'pl',
		formatter: 'profit'
	}, {
		label: '',
		className: 'tv-data-table__cell--buttons-cell',
		formatter: 'posSettings',
		notSortable: true,
		modificationProperty: 'status'
	}];

	var AM_COLUMNS = [{
		notSortable: true,
		property: 'title',
		formatter: 'custom_uppercase'
	}, {
		label: '余额',
		className: 'tv-data-table__cell--right-align',
		property: 'balance',
		formatter: 'fixed',
		notSortable: true,
		fixedWidth: true
	}, {
		label: '损益',
		className: 'tv-data-table__cell--right-align',
		property: 'pl',
		formatter: 'profit',
		notSortable: true,
		fixedWidth: true
	}, {
		label: '资产',
		className: 'tv-data-table__cell--right-align',
		property: 'equity',
		formatter: 'fixed',
		notSortable: true,
		fixedWidth: true
	}];

	var summaryProps = [{
		text: '余额',
		wValue: this._summaryValues.balance,
		formatter: 'fixed', // default value
	}, {
		text: '资产',
		wValue: this._summaryValues.equity,
		formatter: 'fixed', // default value
	}];


	var that = this;

	return {
		accountTitle: '交易终端',
		account: '',
		hasHistory: false,
		summary: summaryProps,
		customFormatters: [{
			name: 'custom_uppercase',
			format: function(obj) {
				return obj.value.toUpperCase();
			}
		}],
		orderColumns: ORDERCOLUMNS,
		positionColumns: POSITIONCOLUMNS,
		pages: [{
			id: 'accountsummary',
			title: '帐户汇总',
			tables: [{
				id: 'accountsummary',
				columns: AM_COLUMNS,
				getData: function() {
					return $.Deferred().resolve([that._amData]);
				},
				changeDelegate: that._amChangeDelegate
			}]
		}],
		contextMenuActions: function(e, activePageActions) {
			return $.Deferred().resolve(that.bottomContextMenuItems(e, activePageActions));
		}
	};
};

TradingController.prototype.symbolInfo = function(symbol) {
	return this._host.symbolSnapshot(symbol).then(function(data) {
		var mintick = data.minmov / data.pricescale;

		var pipSize = mintick; // pip size can differ from minTick

		var accountCurrencyRate = 1; // account currency rate

		var pointValue = 1; // USD value of 1 point of price

		return {
			qty: {
				min: 1,
				max: Number.MAX_VALUE,
				step: 1
			},
			pipValue: pipSize * pointValue * accountCurrencyRate || 1,
			pipSize: pipSize,
			minTick: mintick,
			description: data.description
		};
	});
};

TradingController.prototype.accountInfo = function() {
	return {
		currencySign: 'USD'
	};
};

TradingController.prototype.subscribePL = function(positionId) {
	this._plSubscriptions[positionId] = true;

	var position = this._positionsBySymbol[positionId];

	if (position.profit !== undefined) {
		this._host.plUpdate(positionId, position.profit);
	}
};

TradingController.prototype.unsubscribePL = function(positionId) {
	this._plSubscriptions[positionId] = false;
};

TradingController.prototype.subscribeEquity = function() {

};

TradingController.prototype.unsubscribeEquity = function() {

};

// END OF API IMPLEMENTATION

// THE FOLLOWING CODE IS A ROUGH EXAMPLE OF CREATING/PROCESSING ORDERS AND POSITIONS

TradingController.prototype._createPosition = function(data) {
	var position = this._positionsBySymbol[data.symbol];
	var orderSide = data.side;
	var orderQty = data.qty;
	if (position) {
		var sign = data.side === position.data.side ? 1 : -1;
		if (sign > 0) {
			data.avg_price = (position.data.qty * position.data.avg_price + data.qty * data.price) / (position.data.qty + data.qty);
		} else {
			data.avg_price = position.data.avg_price;

			var amountToClose = Math.min(orderQty, position.data.qty);
			this._amData.balance += (data.price - position.data.avg_price) * amountToClose * (position.data.side === 'sell' ? -1 : 1);
		}

		data.qty = position.data.qty + data.qty * sign;
		if (data.qty < 0) {
			data.side = position.data.side === 'sell' ? 'buy' : 'sell';
			data.qty *= -1;
			data.avg_price = data.price; // open new position
		} else {
			data.side = position.data.side;
		}
	} else {
		data.avg_price = data.price;
	}

	data.id = data.symbol;
	data.profit = undefined;

	var execution = $.extend({}, data);
	execution.time = new Date().valueOf();
	execution.price = data.price;
	execution.id = this._idsCounter++;
	execution.side = orderSide;
	execution.qty = orderQty;

	var executionObj = {
		data: execution
	};

	this._executions.push(executionObj);
	this._host.executionUpdate(execution);

	this._updatePosition(data);
	this._recalculateAMData();
};

TradingController.prototype._updateOrderLast = function(data) {
	this._host.orderPartialUpdate(data);
};

TradingController.prototype._updateOrder = function(data) {
	var that = this;

	var order = this._ordersById[data.id];

	var executionChecks = {
		sell: {
			market: function() {
				return !!data.price;
			},
			limit: function(data) {
				return data.last >= data.limitPrice;
			},
			stop: function(data) {
				return data.last <= data.stopPrice;
			}
		},
		buy: {
			market: function() {
				return !!data.price;
			},
			limit: function(data) {
				return data.last <= data.limitPrice;
			},
			stop: function(data) {
				return data.last >= data.stopPrice;
			}
		}
	};

	if (!order) {
		order = {};

		this._ordersById[data.id] = order;
		this._orders.push(order);

		this._subscribeData(order, data.symbol, data.id, function(data) {
			if (data.status === 'working' && executionChecks[data.side][data.type](data)) {
				var positionData = $.extend({}, data);
				delete positionData.status;
				data.price = data.avg_price = data.last;
				that._createPosition(positionData);

				data.status = 'filled';
				that._updateOrder(data);
			}

			that._updateOrderLast(data);
		});
	}

	order.data = data;

	this._host.orderUpdate(data);
};

TradingController.prototype._updatePosition = function(positionData) {
	var position = this._positionsBySymbol[positionData.symbol];
	if (position && !positionData.qty) {
		if (position) {
			position.data = positionData;
			this._unsubscribeData(position);
			var index = this._positions.indexOf(position);
			if (index !== -1) {
				this._positions.splice(index, 1);
			}

			delete this._positionsBySymbol[positionData.symbol];

			this._host.positionUpdate(positionData);
		}

		return;
	}

	var that = this;

	if (!position) {
		position = {};
		this._positionsBySymbol[positionData.symbol] = position;
		this._positions.push(position);

		this._subscribeData(position, positionData.symbol, positionData.id, function(data) {
			if (that._plSubscriptions[data.symbol]) {
				that._host.plUpdate(data.symbol, data.profit);
			}

			that._host.positionPartialUpdate(data);
			that._recalculateAMData();
		});
	}

	position.data = positionData;

	this._host.positionUpdate(positionData);
};

TradingController.prototype._subscribeData = function(orderOrPosition, symbol, id, updateFunction) {
	if (!orderOrPosition.quotes) {
		orderOrPosition.quotes = true;

		this._datafeed.subscribeQuotes([], [symbol], function(symbols) {
			if (!symbols[0]) {
				return;
			}

			var deltaData = symbols[0];
			var data = orderOrPosition.data;

			if (deltaData.v.lp != null && data.last !== deltaData.v.lp) {
				data.last = deltaData.v.lp;
				if (data.price == null) {
					data.price = data.last;
				}

				data.profit = (data.last - data.price) * data.qty * (data.side === 'sell' ? -1 : 1);

				updateFunction(data);
			}
		}, 'TradingController' + id);
	}
};

TradingController.prototype._unsubscribeData = function(order) {
	if (order.quotes) {
		this._datafeed.unsubscribeQuotes('TradingController' + order.data.id);
		order.quotes = false;
	}
};

TradingController.prototype._recalculateAMData = function() {
	var pl = 0;
	this._positions.forEach(function(pos) {
		pl += pos.data.profit || 0;
	});

	this._amData.pl = pl;
	this._amData.equity = this._amData.balance + pl;

	this._amChangeDelegate.fire(this._amData);
};

if (typeof module !== 'undefined' && module && module.exports) {
	module.exports = {
		TradingController: TradingController,
	};
}