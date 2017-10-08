webpackJsonp([6], {
    523: function(t, e) {},
    983: function(t, e, i) {
        "use strict";
        function s(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        var n, a, o, r, l, d, u, c, h, _, p, v, m, f, g, y, b, k, w, T, P, x, C, I, D, S;
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e.DomeWidget = void 0,
        n = i(468),
        a = s(n),
        o = i(508),
        r = s(o),
        l = i(472),
        d = s(l),
        u = i(427),
        c = s(u),
        h = i(75),
        _ = s(h),
        p = i(117),
        v = s(p),
        m = i(118),
        f = s(m),
        i(523),
        g = i(393),
        y = i(383),
        b = i(984),
        k = i(989),
        w = i(210),
        T = i(305),
        P = i(991),
        x = i(992),
        C = i(546),
        i(993),
        i(994),
        i(995),
        i(996),
        I = i(450),
        D = 20,
        S = 4e3,
        e.DomeWidget = function() {
            function t(e) {
                var i, s = this, n = e.body, a = e.height, o = e.visible;
                (0,
                v.default)(this, t),
                this._height = a,
                this._visible = o,
                this._volumeFormatter = new T.VolumeFormatter,
                this._symbolData = null,
                this._trading = (0,
                g.tradingService)(),
                i = this._handlers(),
                this._data = new b.DomeData(i,this._trading.showPricesWithZeroVolume.readonly()),
                this._calcData = new k.DomeCalcBlock(i),
                this._uiState = {},
                this._timerLockState = {},
                this._timer = new x.Timer(S,function() {
                    s._data.centerOnLast()
                }
                ,function(t) {
                    s._updateTimerUi(t)
                }
                ),
                this._data.autoCenterRequired.subscribe(function(t) {
                    s._mergeTimerLockState({
                        autoCenterRequired: t
                    })
                }),
                n.subscribe(function(t) {
                    return s._recreateLayout(t)
                }, {
                    callWithLast: !0
                }),
                this._height.subscribe(function() {
                    return s._calculateLayout()
                }),
                I.proSymbol.subscribe(function() {
                    return s._onStateChange()
                }),
                this._trading.onConnectionStatusChange.subscribe(null, function() {
                    return s._onStateChange()
                }),
                o.subscribe(function() {
                    return s._onStateChange()
                }),
                this._onStateChange()
            }
            return (0,
            f.default)(t, [{
                key: "_recreateLayout",
                value: function(t) {
                    this._$container && this._$container.off().empty(),
                    this._$container = t,
                    this._createCalculatorBlock(),
                    this._createLegendBlock(),
                    this._createMainBlock(),
                    this._createNavBlock(),
                    this._createActionsBlock(),
                    this._syncActionButtons(),
                    this._calculateLayout()
                }
            }, {
                key: "_createMainBlock",
                value: function() {
                    var t, e = this, i = $("<div>", this._$container).addClass("tv-dome-widget-main");
                    i.appendTo(this._$container),
                    this._data.setContainer(i),
                    i.on("mousewheel", function(t, i, s, n) {
                        t.preventDefault(),
                        e.uiScroll(n)
                    }),
                    t = !1,
                    i.on("touchstart mousedown", function(s) {
                        var n, a, o, r, l, d, u, c;
                        t || ((n = "mousedown" !== s.type) || 1 === s.buttons) && (a = e._data.topIndex,
                        isFinite(a) && (s.touches && 1 !== s.touches.length || (o = $(s.target).closest(".tv-dome-widget-main__value--price").eq(0),
                        o.size() && (t = !0,
                        r = function(t) {
                            return t.originalEvent.touches && t.originalEvent.touches[0] && t.originalEvent.touches[0].pageY || t.originalEvent.pageY || 0
                        }
                        ,
                        l = r(s),
                        d = i.parents("html").eq(0),
                        u = function i() {
                            d.off("mouseup mousedown touchend touchstart touchcancel", i),
                            d.off("mousemove touchmove", c),
                            t = !1,
                            e._data.setDragShield(!1),
                            e._mergeTimerLockState({
                                scroll: !1
                            })
                        }
                        ,
                        c = function(t) {
                            var i, s;
                            if (!n && 1 !== t.buttons)
                                return void u();
                            t.preventDefault(),
                            i = r(t) - l,
                            s = Math.round(i / D),
                            s && (e._data.setDragShield(!0),
                            e._mergeTimerLockState({
                                scroll: !0
                            })),
                            e._data.shiftTopIndexRelativeToIndex(a, s)
                        }
                        ,
                        d.on(n ? "touchmove" : "mousemove", c),
                        d.on(n ? "touchend" : "mouseup", u),
                        n && d.on("touchcancel", u),
                        setTimeout(function() {
                            t && d.on(n ? "touchstart" : "mousedown", u)
                        }, 0)))))
                    }),
                    i.on("dblclick", function(t) {
                        $(t.target).closest(".tv-dome-widget-main__value--price").eq(0).size() && e.uiCenter()
                    }),
                    this._$mainBlock = i
                }
            }, {
                key: "_createActionsBlock",
                value: function() {
                    var t = this
                      , e = this._$container;
                    this._$actionsBlock = $("<div>", e).addClass("tv-dome-widget-actions").html('<div class="tv-dome-widget-actions__row">\n\t\t\t\t\t\t<div class="tv-dome-widget-actions__elem tv-button tv-button--primary tv-button--size_small js-buy-mkt">Buy Market</div>\n\t\t\t\t\t\t<div class="tv-dome-widget-actions__elem tv-button tv-button--danger tv-button--size_small js-sell-mkt">Sell Market</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="tv-dome-widget-actions__row">\n\t\t\t\t\t\t<div class="tv-dome-widget-actions__elem tv-buttons-group tv-buttons-group--primary tv-buttons-group--size-small">\n\t\t\t\t\t\t\t<div class="tv-buttons-group__option js-day">DAY</div>\n\t\t\t\t\t\t\t<div class="tv-buttons-group__option js-gtc">GTC</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="tv-dome-widget-actions__elem tv-button tv-button--default tv-button--size_small js-flatten">Flatten</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="tv-dome-widget-actions__row">\n\t\t\t\t\t\t<div class="tv-dome-widget-actions__elem tv-button tv-button--default tv-button--size_small js-clear">CXL All</div>\n\t\t\t\t\t\t<div class="tv-dome-widget-actions__elem tv-button tv-button--default tv-button--size_small js-reverse">Reverse</div>\n\t\t\t\t\t</div>'),
                    this._actionButtons = {
                        $buyMarket: this._$actionsBlock.find(".js-buy-mkt").on("click", function(e) {
                            e.preventDefault(),
                            t.uiPlaceOrder({
                                side: y.SIDE.BUY,
                                type: y.ORDERTYPE.MARKET
                            })
                        }),
                        $sellMarket: this._$actionsBlock.find(".js-sell-mkt").on("click", function(e) {
                            e.preventDefault(),
                            t.uiPlaceOrder({
                                side: y.SIDE.SELL,
                                type: y.ORDERTYPE.MARKET
                            })
                        }),
                        $day: this._$actionsBlock.find(".js-day").text($.t("DAY")).on("click", function(e) {
                            e.preventDefault(),
                            t._uiState.isTradable && (t._trackEvent("Select DAY"),
                            t._mergeUiState({
                                gtcOrder: !1
                            }))
                        }),
                        $gtc: this._$actionsBlock.find(".js-gtc").text($.t("GTC")).on("click", function(e) {
                            e.preventDefault(),
                            t._uiState.isTradable && (t._trackEvent("Select GTC"),
                            t._mergeUiState({
                                gtcOrder: !0
                            }))
                        }),
                        $flatten: this._$actionsBlock.find(".js-flatten").text($.t("Flatten")).on("click", function(e) {
                            e.preventDefault(),
                            t.uiClosePosition()
                        }),
                        $clear: this._$actionsBlock.find(".js-clear").text($.t("CXL All")).on("click", function(e) {
                            e.preventDefault(),
                            t.uiCancelAllOrders()
                        }),
                        $reverse: this._$actionsBlock.find(".js-reverse").text($.t("Reverse")).on("click", function(e) {
                            e.preventDefault(),
                            t.uiReversePosition()
                        })
                    };	
                    this._$actionsBlock.appendTo(this._$container)
                }
            }, {
                key: "_createCalculatorBlock",
                value: function() {
                    this._$calculatorBlock = $("<div>", this._$container).addClass("tv-dome-widget-actions").appendTo(this._$container),
                    this._calcData.setContainer(this._$calculatorBlock)
                }
            }, {
                key: "_createLegendBlock",
                value: function() {
                    var t = this._$container
                      , e = $("<div>", this._$container).addClass("tv-dome-widget-legend");
                    $("<span>", t).addClass("tv-dome-widget-legend__label tv-dome-widget-legend__label--buy").text($.t("Buy")).appendTo(e),
                    $("<span>", t).addClass("tv-dome-widget-legend__label tv-dome-widget-legend__label--price").text($.t("Price")).appendTo(e),
                    $("<span>", t).addClass("tv-dome-widget-legend__label tv-dome-widget-legend__label--sell").text($.t("Sell")).appendTo(e),
                    this._$legendBlock = e,
                    e.appendTo(this._$container)
                }
            }, {
                key: "_createNavBlock",
                value: function() {
                    var t, e = this, s = this._$container, n = $("<div>", s).addClass("tv-dome-widget-nav").html('<div class="tv-dome-widget-nav__button-block tv-dome-widget-nav__button-block--orders"><span class="tv-dome-widget-nav__button tv-dome-widget-nav__button--clear-ask js-clear-ask">' + i(191) + '</span></div><div class="tv-dome-widget-nav__button-block tv-dome-widget-nav__button-block--buysell"><span class="tv-dome-widget-nav__button tv-dome-widget-nav__button--scroll-up js-scroll-up">' + i(987) + '</span></div><div class="tv-dome-widget-nav__button-block tv-dome-widget-nav__button-block--price"><svg class="tv-dome-widget-nav__timer" viewBox="-1 -1 2 2" width="2" height="2"><path d="M 0,0" class="js-timer-path"></path></svg><span class="tv-dome-widget-nav__button tv-dome-widget-nav__button--center js-center">' + i(997) + '</span></div><div class="tv-dome-widget-nav__button-block tv-dome-widget-nav__button-block--buysell"><span class="tv-dome-widget-nav__button tv-dome-widget-nav__button--scroll-down js-scroll-down">' + i(988) + '</span></div><div class="tv-dome-widget-nav__button-block tv-dome-widget-nav__button-block--orders"><span class="tv-dome-widget-nav__button tv-dome-widget-nav__button--clear-bid js-clear-bid">' + i(191) + "</span></div>");
                    this._$navBlock = n,
                    this._$svgTimerPath = n.find(".js-timer-path"),
                    this._navButtons = {
                        $clearBuy: n.find(".js-clear-ask").addClass("apply-common-tooltip").attr("title", $.t("Cancel all buy orders")).on("click", function(t) {
                            t.preventDefault(),
                            e.uiCancelAllOrders(y.SIDE.BUY)
                        }),
                        $clearSell: n.find(".js-clear-bid").addClass("apply-common-tooltip").attr("title", $.t("Cancel all sell orders")).on("click", function(t) {
                            t.preventDefault(),
                            e.uiCancelAllOrders(y.SIDE.SELL)
                        }),
                        $scrollUp: n.find(".js-scroll-up").addClass("apply-common-tooltip").attr("title", $.t("Scroll up")).on("click", function(t) {
                            t.preventDefault(),
                            e.uiScroll(1)
                        }),
                        $scrollDown: n.find(".js-scroll-down").addClass("apply-common-tooltip").attr("title", $.t("Scroll down")).on("click", function(t) {
                            t.preventDefault(),
                            e.uiScroll(-1)
                        }),
                        $centerView: n.find(".js-center").addClass("apply-common-tooltip").attr("title", $.t("Center view")).on("click", function(t) {
                            t.preventDefault(),
                            e.uiCenter()
                        })
                    },
                    n.appendTo(s),
                    t = n.prop("ownerDocument"),
                    this._timer.setWindow(t && t.defaultView)
                }
            }, {
                key: "_syncActionButtons",
                value: function() {
                    var t, e, i, s, n, a, o = this._uiState, r = o.isTradable, l = o.hasPosition, d = o.hasBuyOrders, u = o.hasSellOrders, c = o.qty, h = o.gtcOrder;
                    this._actionButtons && (t = this._actionButtons,
                    e = "i-active",
                    i = "i-disabled",
                    t.$gtc.toggleClass(e, !!this._hasDayGTC && !!h && r),
                    t.$day.toggleClass(e, !!this._hasDayGTC && !h && r),
                    t.$gtc.toggleClass(i, !this._hasDayGTC || !r),
                    t.$day.toggleClass(i, !this._hasDayGTC || !r),
                    t.$buyMarket.toggleClass(i, !r),
                    t.$sellMarket.toggleClass(i, !r),
                    t.$flatten.toggleClass(i, !r || !l || !this._hasFlatten),
                    t.$reverse.toggleClass(i, !r || !l || !this._hasReverse),
                    t.$clear.toggleClass(i, !r || !(d || u)),
                    c && r ? (s = (0,
                    C.abbreviatedNumber)(c),
                    t.$buyMarket.text($.t("Buy {0} Market").format(s)),
                    t.$sellMarket.text($.t("Sell {0} Market").format(s))) : (t.$buyMarket.text($.t("Buy Market")),
                    t.$sellMarket.text($.t("Sell Market")))),
                    this._navButtons && (n = this._navButtons,
                    a = "tv-dome-widget-nav__button--disabled",
                    n.$scrollUp.toggleClass(a, !r),
                    n.$scrollDown.toggleClass(a, !r),
                    n.$centerView.toggleClass(a, !r),
                    n.$clearBuy.toggleClass(a, !r || !d),
                    n.$clearSell.toggleClass(a, !r || !u))
                }
            }, {
                key: "_calculateLayout",
                value: function() {
                    var t, e, i, s, n, a = this._height.value(), o = !1, r = [{
                        $element: this._$actionsBlock,
                        height: 131
                    }, {
                        $element: this._$navBlock,
                        height: 46
                    }, {
                        $element: this._$calculatorBlock,
                        height: 49
                    }, {
                        $element: this._$legendBlock,
                        height: 40
                    }];
                    for (t = 0; t < r.length; t++)
                        e = r[t],
                        i = e.$element,
                        s = e.height,
                        o || (a - s < 100 ? o = !0 : a -= s),
                        o ? i.addClass("js-hidden") : i.css("height", s).removeClass("js-hidden");
                    this._$mainBlock.css("height", a),
                    n = Math.ceil(a / D),
                    this._data.setHeight(n)
                }
            }, {
                key: "uiScroll",
                value: function(t) {
                    this._data.shiftTopIndexRelativeToIndex(this._data.topIndex, 0 | t),
                    this._timer.revert()
                }
            }, {
                key: "uiCenter",
                value: function() {
                    this._data.centerOnLast(),
                    this._trackEvent("Center")
                }
            }, {
                key: "uiCancelOrder",
                value: function(t) {
                    this._uiState.isTradable && (this._trading.activeBroker().cancelOrder(t, !0),
                    this._trackEvent("Cancel Order"))
                }
            }, {
                key: "uiModifyOrder",
                value: function(t, e) {
                    var i, s;
                    return t && this._uiState.isTradable ? (i = !0,
                    null == e && (e = {},
                    i = !1),
                    s = this._trading.activeBroker().modifyOrder((0,
                    _.default)({}, t, e), i),
                    this._lockTimerUntilSettled(s),
                    this._trackEvent("Modify Order"),
                    s) : Promise.resolve()
                }
            }, {
                key: "uiPlaceOrder",
                value: function(t) {
                    var e, i, s, n, a = t.side, o = t.price, r = t.altPrice, l = t.type, d = t.inverseType;
                    return this._uiState.isTradable ? (e = this._trading.activeBroker(),
                    l === y.ORDERTYPE.MARKET || isFinite(o) ? (null == l && (l = this._data.guessOrderType(o, a)),
                    i = !0,
                    null == l && (i = !1,
                    l = y.ORDERTYPE.LIMIT),
                    d && (l === y.ORDERTYPE.STOP ? l = y.ORDERTYPE.LIMIT : l === y.ORDERTYPE.LIMIT && (l = y.ORDERTYPE.STOP)),
                    s = {
                        symbol: I.proSymbol.value(),
                        qty: this._calcData.getQty(),
                        side: a,
                        type: l,
                        duration: this._hasDayGTC ? {
                            type: this._uiState.gtcOrder ? "GTC" : "DAY"
                        } : void 0
                    },
                    null != s.type && (s.type === y.ORDERTYPE.STOP ? s.stopPrice = o : s.type === y.ORDERTYPE.LIMIT ? s.limitPrice = o : s.type === y.ORDERTYPE.STOPLIMIT && (s.stopPrice = o,
                    isFinite(r) ? s.limitPrice = r : i = !1)),
                    n = e.placeOrder(s, i),
                    this._lockTimerUntilSettled(n),
                    this._trackEvent("Place Order"),
                    n) : void 0) : Promise.resolve()
                }
            }, {
                key: "uiCancelAllOrders",
                value: function(t) {
                    var e, i = this._uiState;
                    return !i.isTradable || !i.hasBuyOrders && !i.hasSellOrders || t === y.SIDE.BUY && !i.hasBuyOrders || t === y.SIDE.SELL && !i.hasSellOrders ? Promise.resolve() : (e = this._trading.activeBroker().cancelOrders(I.proSymbol.value(), t),
                    this._lockTimerUntilSettled(e),
                    this._trackEvent("Cancel All Orders"),
                    e)
                }
            }, {
                key: "uiClosePosition",
                value: function() {
                    var t, e;
                    return this._uiState.isTradable && this._uiState.hasPosition && this._hasFlatten ? (t = this._trading.activeBroker(),
                    e = t.positions(I.proSymbol.value()).then(function(e) {
                        var i, s;
                        for (i = 0; i < e.length; i++)
                            if (s = e[i],
                            0 !== s.qty)
                                return t.closePosition(s.id, !0)
                    }),
                    this._lockTimerUntilSettled(e),
                    this._trackEvent("Close Position"),
                    e) : Promise.resolve()
                }
            }, {
                key: "uiReversePosition",
                value: function() {
                    var t, e;
                    return this._uiState.isTradable && this._uiState.hasPosition && this._hasReverse ? (t = this._trading.activeBroker(),
                    e = t.positions(I.proSymbol.value()).then(function(e) {
                        var i, s;
                        for (i = 0; i < e.length; i++)
                            if (s = e[i],
                            0 !== s.qty)
                                return t.reversePosition(s.id, !0)
                    }),
                    this._lockTimerUntilSettled(e),
                    this._trackEvent("Reverse"),
                    e) : Promise.resolve()
                }
            }, {
                key: "uiOrderMousedown",
                value: function(t, e, i) {
                    var s, n, a, o, r, l, d, u = this;
                    1 === t.buttons && (s = e[i],
                    n = this._data.priceToIndex(e[i]),
                    isFinite(n) && (this.uiStopOrderDrag(),
                    a = function(t) {
                        return t.touches && t.touches[0] && t.touches[0].pageY || t.pageY || 0
                    }
                    ,
                    o = a(t),
                    r = NaN,
                    l = !1,
                    d = this._subscription,
                    d.$orderMouseRoot = this._$mainBlock.parents("html").eq(0),
                    d.orderMousemoveHandler = function(t) {
                        var d, c, h;
                        if (t.preventDefault(),
                        1 !== t.buttons)
                            return void u.uiStopOrderDrag();
                        d = 0,
                        $(t.target).closest(u._$mainBlock).size() && (d = o - a(t)),
                        c = Math.round(d / D),
                        0 === c ? r = s : (h = u._data.correctIndex(n, c),
                        r = u._data.indexToPrice(h),
                        l = !0,
                        u._data.setDragShield(!0),
                        u._mergeTimerLockState({
                            drag: !0
                        })),
                        l && u._data.setOrderGhost({
                            order: e,
                            pricePropertyName: i,
                            price: r
                        })
                    }
                    ,
                    d.orderMouseupHandler = function(t) {
                        u.uiStopOrderDrag(),
                        u._trading.activeBroker() && isFinite(r) && r !== s && (u._data.setOrderGhost({
                            order: e,
                            pricePropertyName: i,
                            price: r
                        }),
                        u._data.setDragShield(!0),
                        u._trackEvent("Move Order"),
                        u.uiModifyOrder(e, (0,
                        c.default)({}, i, r)).then(function() {
                            return u.uiStopOrderDrag()
                        }).catch(function() {
                            return u.uiStopOrderDrag()
                        }))
                    }
                    ,
                    d.orderMousedownHandler = function(t) {
                        u.uiStopOrderDrag()
                    }
                    ,
                    d.$orderMouseRoot.on("mousemove", d.orderMousemoveHandler),
                    d.$orderMouseRoot.on("mouseup", d.orderMouseupHandler),
                    setTimeout(function() {
                        d.$orderMouseRoot.on("mousedown", d.orderMousedownHandler)
                    }, 0)))
                }
            }, {
                key: "uiStopOrderDrag",
                value: function() {
                    if (this._data.setDragShield(!1),
                    this._data.resetOrderGhost(),
                    this._mergeTimerLockState({
                        drag: !1
                    }),
                    this._subscription) {
                        var t = this._subscription
                          , e = t.orderMousemoveHandler
                          , i = t.orderMouseupHandler
                          , s = t.orderMousedownHandler
                          , n = t.$orderMouseRoot;
                        delete this._subscription.orderMousemoveHandler,
                        delete this._subscription.orderMouseupHandler,
                        delete this._subscription.orderMousedownHandler,
                        delete this._subscription.$orderMouseRoot,
                        n && e && n.off("mousemove", e),
                        n && i && n.off("mouseup", i),
                        n && s && n.off("mousedown", s)
                    }
                }
            }, {
                key: "uiContextMenu",
                value: function(t, e, s) {
                    var n, a, o, r, l, d, u, c, h, _, p, v, m, f, g, b, k, T, P, x = this;
                    this._uiState.isTradable && (e !== y.SIDE.BUY && e !== y.SIDE.SELL || (n = I.seriesShortSymbol.value() || I.proSymbol.value(),
                    a = (0,
                    C.abbreviatedNumber)(this._uiState.qty),
                    o = i(214).Action,
                    r = [],
                    l = this._symbolData && this._symbolData.priceFormatter || new w.PriceFormatter,
                    this._trackEvent("Context Menu"),
                    isFinite(s) && (d = l.format(s),
                    u = {
                        stopPrice: d,
                        qty: a,
                        symbol: n
                    },
                    c = "",
                    c = e === y.SIDE.BUY ? $.t("Buy __qty__ __symbol__ @ __stopPrice__ Stop", u) : $.t("Sell __qty__ __symbol__ @ __stopPrice__ Stop", u),
                    h = new o({
                        text: c
                    }),
                    h.callbacks().subscribe(null, function() {
                        x.uiPlaceOrder({
                            side: e,
                            price: s,
                            type: y.ORDERTYPE.STOP
                        })
                    }),
                    r.push(h),
                    _ = {
                        limitPrice: d,
                        qty: a,
                        symbol: n
                    },
                    p = "",
                    p = e === y.SIDE.BUY ? $.t("Buy __qty__ __symbol__ @ __limitPrice__ Limit", _) : $.t("Sell __qty__ __symbol__ @ __limitPrice__ Limit", _),
                    v = new o({
                        text: p
                    }),
                    v.callbacks().subscribe(null, function() {
                        x.uiPlaceOrder({
                            side: e,
                            price: s,
                            type: y.ORDERTYPE.LIMIT
                        })
                    }),
                    r.push(v),
                    this._symbolData && this._hasStopLimit && (m = s + this._symbolData.minTick * (e === y.SIDE.BUY ? 1 : -1),
                    f = {
                        stopPrice: d,
                        limitPrice: l.format(m),
                        qty: a,
                        symbol: n
                    },
                    g = "",
                    g = e === y.SIDE.BUY ? $.t("Buy __qty__ __symbol__ @ __stopPrice__ Stop __limitPrice__ Limit", f) : $.t("Sell __qty__ __symbol__ @ __stopPrice__ Stop __limitPrice__ Limit", f),
                    b = new o({
                        text: g
                    }),
                    b.callbacks().subscribe(null, function() {
                        x.uiPlaceOrder({
                            side: e,
                            price: s,
                            altPrice: m,
                            type: y.ORDERTYPE.STOPLIMIT
                        })
                    }),
                    r.push(b))),
                    k = {
                        qty: a,
                        symbol: n
                    },
                    T = "",
                    T = e === y.SIDE.BUY ? $.t("Buy __qty__ __symbol__ @ Market", k) : $.t("Sell __qty__ __symbol__ @ Market", k),
                    P = new o({
                        text: T
                    }),
                    P.callbacks().subscribe(null, function() {
                        x.uiPlaceOrder({
                            side: e,
                            type: y.ORDERTYPE.MARKET
                        })
                    }),
                    r.push(P),
                    r.length && i(385).createMenu(r).show(t)))
                }
            }, {
                key: "_mergeUiState",
                value: function(t) {
                    var e, i = this._uiState, s = !1;
                    for (e in t)
                        i !== t[e] && (i[e] = t[e],
                        s = !0);
                    s && this._syncActionButtons()
                }
            }, {
                key: "_handlers",
                value: function() {
                    var t = this;
                    return {
                        closeButtonClick: function(e, i) {
                            var s = i.order;
                            e.preventDefault(),
                            t.uiCancelOrder(s && s.id)
                        },
                        qtyClick: function(e, i) {
                            var s = i.order;
                            e.preventDefault(),
                            t.uiModifyOrder(s)
                        },
                        bidAskClick: function(e, i) {
                            var s = i.side
                              , n = i.price;
                            e.preventDefault(),
                            t.uiPlaceOrder({
                                side: s,
                                price: n,
                                inverseType: !!e.ctrlKey
                            })
                        },
                        bidAskContextMenu: function(e, i) {
                            var s = i.side
                              , n = i.price;
                            e.preventDefault(),
                            t.uiContextMenu(e, s, n)
                        },
                        qtyChange: function(e, i) {
                            var s = i.qty;
                            !isFinite(s) || s < 0 || t._trading.suggestedQty().setValue(I.proSymbol.value(), s)
                        },
                        qtyInput: function(e, i) {
                            var s = i.qty;
                            !isFinite(s) || s < 0 || t._mergeUiState({
                                qty: s
                            })
                        },
                        orderMousedown: function(e, i) {
                            var s = i.order
                              , n = i.pricePropertyName;
                            t.uiOrderMousedown(e, s, n)
                        }
                    }
                }
            }, {
                key: "_mergeTimerLockState",
                value: function(t) {
                    var e, i = this._timerLockState, s = !1;
                    for (e in t)
                        i[e] !== t[e] && (i[e] = t[e],
                        s = !0);
                    s && (!i.autoCenterRequired || i.scroll || i.drag || i.dialog ? this._timer.abort() : this._timer.run())
                }
            }, {
                key: "_lockTimerUntilSettled",
                value: function(t) {
                    var e, i = this;
                    if (t)
                        return this._mergeTimerLockState({
                            dialog: t
                        }),
                        e = function() {
                            i._timerLockState.dialog === t && i._mergeTimerLockState({
                                dialog: null
                            })
                        }
                        ,
                        t.then(e, e)
                }
            }, {
                key: "_updateTimerUi",
                value: function(t) {
                    t = t || 0,
                    this._$svgTimerPath.attr("d", (0,
                    P.pieChartD)(t))
                }
            }, {
                key: "_getSymbolData",
                value: function() {
                    function t(t, i) {
                        return e.apply(this, arguments)
                    }
                    var e = (0,
                    d.default)(a.default.mark(function t(e, i) {
                        var s, n, o, l;
                        return a.default.wrap(function(t) {
                            for (; ; )
                                switch (t.prev = t.next) {
                                case 0:
                                    return t.next = 2,
                                    Promise.all([e.symbolInfo(i), e.formatter(i)]);
                                case 2:
                                    return s = t.sent,
                                    n = (0,
                                    r.default)(s, 2),
                                    o = n[0],
                                    l = n[1],
                                    t.abrupt("return", {
                                        minTick: o.minTick,
                                        priceFormatter: l,
                                        volumeFormatter: this._volumeFormatter,
                                        qtyProperties: o.qty
                                    });
                                case 7:
                                case "end":
                                    return t.stop()
                                }
                        }, t, this)
                    }));
                    return t
                }()
            }, {
                key: "_unsubscribeData",
                value: function() {
                    if (this._subscription) {
                        var t = this._subscription
                          , e = t.broker
                          , i = t.symbol
                          , s = t.domeHandler
                          , n = t.realtimeHandler
                          , a = t.orderHandler
                          , o = t.positionHandler
                          , r = t.plHandler
                          , l = t.plPositionId
                          , d = t.suggestedQtyHandler
                          , u = t.fullUpdateOrders
                          , c = t.fullUpdatePosition;
                        this._subscription = null,
                        e && i && s && e.unsubscribeDOME(i, s),
                        e && i && n && e.unsubscribeRealtime(i, n),
                        e && a && e.orderUpdate.unsubscribe(null, a),
                        e && o && e.positionUpdate.unsubscribe(null, o),
                        e && r && l && e.unsubscribePL(l, r),
                        d && this._trading.suggestedQty().changed.unsubscribe(null, d),
                        e && u && e.fullUpdate.unsubscribe(u),
                        e && c && e.fullUpdate.unsubscribe(c)
                    }
                }
            }, {
                key: "_trackEvent",
                value: function(t) {
                    this._trading.trackEvent("DOM", t)
                }
            }, {
                key: "_onStateChange",
                value: function() {
                    var t, e, i = this, s = null, n = null;
                    this._visible.value() && (s = I.proSymbol.value(),
                    (n = this._trading.activeBroker()) && (this._trading.connectStatus() === y.CONNECTSTATUSES.CONNECTED && n.metainfo().configFlags.supportDOME || (n = null))),
                    this._subscription && this._subscription.symbol === s && this._subscription.broker === n || (this._symbolData = null,
                    this._unsubscribeData(),
                    this._data.reset(),
                    this._calcData.reset(),
                    t = n && n.metainfo().durations,
                    this._hasDayGTC = !!(t && t.find(function(t) {
                        return "DAY" === t.value
                    }) && t.find(function(t) {
                        return "GTC" === t.value
                    })),
                    this._hasReverse = n && n.metainfo().configFlags.supportReversePosition,
                    this._hasFlatten = n && !n.metainfo().configFlags.supportMultiposition,
                    this._hasStopLimit = n && n.metainfo().configFlags.supportStopLimitOrders,
                    this._mergeUiState({
                        isTradable: !1,
                        hasPosition: !1,
                        hasBuyOrders: !1,
                        hasSellOrders: !1,
                        qty: void 0
                    }),
                    this._mergeTimerLockState({
                        scroll: !1,
                        drag: !1,
                        dialog: null
                    }),
                    this.uiStopOrderDrag(),
                    s && n && (e = {
                        broker: n,
                        symbol: s,
                        domeHandler: null,
                        realtimeHandler: null,
                        orderHandler: null,
                        positionHandler: null,
                        plHandler: null,
                        plPositionId: void 0,
                        suggestedQtyHandler: null,
                        fullUpdateOrders: null,
                        fullUpdatePosition: null
                    },
                    this._subscription = e,
                    e.suggestedQtyHandler = function() {
                        i._trading.suggestedQty().value(s).then(function(t) {
                            i._subscription === e && (i._calcData.updateQty(t),
                            i._mergeUiState({
                                qty: t
                            }))
                        })
                    }
                    ,
                    this._trading.suggestedQty().changed.subscribe(null, e.suggestedQtyHandler),
                    e.suggestedQtyHandler(),
                    Promise.all([this._getSymbolData(n, s), n.isTradable(s)]).then(function(t) {
                        var a = (0,
                        r.default)(t, 2)
                          , o = a[0]
                          , l = a[1];
                        i._subscription === e && l && o && (i._mergeUiState({
                            isTradable: !0
                        }),
                        i._symbolData = o,
                        i._data.setSymbolInfo(o),
                        i._calcData.setSymbolInfo(o),
                        e.realtimeHandler = function(t, e) {
                            i._data.updateLast(e.trade),
                            i._calcData.updateLast(e.trade)
                        }
                        ,
                        e.domeHandler = function(t, e) {
                            i._data.updateData(e)
                        }
                        ,
                        e.fullUpdateOrders = function() {
                            var t = n.orders(s);
                            e.orderPromise = t,
                            t.then(function(s) {
                                var n, a, o, r, l;
                                if (i._subscription === e && e.orderPromise === t) {
                                    for (n = [],
                                    a = !1,
                                    o = !1,
                                    r = 0; r < s.length; r++)
                                        if (l = s[r],
                                        l.status === y.ORDERSTATUS.PLACING || l.status === y.ORDERSTATUS.INACTIVE || l.status === y.ORDERSTATUS.WORKING)
                                            switch (n.push(l),
                                            l.side) {
                                            case y.SIDE.BUY:
                                                a = !0;
                                                break;
                                            case y.SIDE.SELL:
                                                o = !0
                                            }
                                    i._data.updateOrders(n),
                                    i._mergeUiState({
                                        hasBuyOrders: a,
                                        hasSellOrders: o
                                    })
                                }
                            })
                        }
                        ,
                        e.fullUpdatePosition = function() {
                            var t = n.positions(s);
                            e.positionPromise = t,
                            t.then(function(s) {
                                if (i._subscription === e && e.positionPromise === t) {
                                    var a = s.filter(function(t) {
                                        return 0 !== t.qty
                                    })[0];
                                    i._mergeUiState({
                                        hasPosition: !!a
                                    }),
                                    a && a.id === e.plPositionId || e.plPositionId && e.plHandler && (n.unsubscribePL(e.plPositionId, e.plHandler),
                                    delete e.plPositionId,
                                    delete e.plHandler),
                                    a && (e.plPositionId === a.id && e.plHandler || (e.plHandler = function(t, s) {
                                        i._subscription === e && i._calcData.updatePL(s)
                                    }
                                    ,
                                    e.plPositionId = a.id,
                                    n.subscribePL(e.plPositionId, e.plHandler))),
                                    i._data.updatePosition(a),
                                    i._calcData.updatePosition(a)
                                }
                            })
                        }
                        ,
                        e.orderHandler = function(t) {
                            t.symbol === e.symbol && e.fullUpdateOrders()
                        }
                        ,
                        e.positionHandler = function(t) {
                            t.symbol === e.symbol && e.fullUpdatePosition()
                        }
                        ,
                        n.subscribeRealtime(s, e.realtimeHandler),
                        n.subscribeDOME(s, e.domeHandler),
                        n.orderUpdate.subscribe(null, e.orderHandler),
                        n.positionUpdate.subscribe(null, e.positionHandler),
                        n.fullUpdate.subscribe(null, e.fullUpdateOrders),
                        n.fullUpdate.subscribe(null, e.fullUpdatePosition),
                        e.fullUpdateOrders(),
                        e.fullUpdatePosition())
                    })))
                }
            }]),
            t
        }()
    },
    984: function(t, e, i) {
        "use strict";
        function s(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        var n, a, o, r, l, d, u;
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e.DomeData = void 0,
        n = i(117),
        a = s(n),
        o = i(118),
        r = s(o),
        l = i(985),
        d = i(383),
        u = i(203),
        e.DomeData = function() {
            function t(e, i) {
                (0,
                a.default)(this, t),
                this._handlers = e || {},
                this._showPricesWithZeroVolume = i,
                this.autoCenterRequired = new u(!1),
                this.height = 0,
                this.topIndex = NaN,
                this._$container = null,
                this._$listContainer = null,
                this._symbolData = null,
                this._lastPriceIndex = NaN,
                this._viewAllocated = null,
                this._viewPool = null,
                this._invalidatedAsk = {},
                this._invalidatedBid = {},
                this._invalidatedPriceHighlight = {},
                this._invalidatedMax = !1,
                this._invalidatedOrders = {},
                this._showPricesWithZeroVolume.subscribe(this.scheduleRepaint.bind(this)),
                this.reset()
            }
            return (0,
            r.default)(t, [{
                key: "reset",
                value: function() {
                    this.topIndex = NaN,
                    this._symbolData = null,
                    this._lastPriceIndex = NaN,
                    this.resetData(),
                    this.resetView(),
                    this.resetOrders(),
                    this.resetOrderGhost(),
                    this.resetPosition(),
                    this.autoCenterRequired.setValue(!1)
                }
            }, {
                key: "resetData",
                value: function() {
                    if (this._bids = {},
                    this._asks = {},
                    this._recalcMaxVolume(),
                    this._recalcBestWorstBid(),
                    this._recalcBestWorstAsk(),
                    this._viewAllocated)
                        for (var t in this._viewAllocated)
                            this._invalidatedAsk[t] = !0,
                            this._invalidatedBid[t] = !0;
                    $(this._$offscreenArrowHigher).addClass("js-hidden"),
                    $(this._$offscreenArrowLower).addClass("js-hidden"),
                    this._offscreenPriceHigher = !1,
                    this._offscreenPriceLower = !1,
                    this.scheduleRepaint()
                }
            }, {
                key: "resetOrders",
                value: function() {
                    if (this._orders)
                        for (var t in this._orders)
                            this._invalidatedOrders[t] = !0;
                    this._orders = {},
                    this.scheduleRepaint()
                }
            }, {
                key: "resetPosition",
                value: function() {
                    this._invalidatedPriceHighlight[this._positionIndex] = !0,
                    this._positionIndex = NaN,
                    this._positionQty = 0,
                    this.scheduleRepaint()
                }
            }, {
                key: "resetView",
                value: function() {
                    if (this._viewAllocated && this._viewPool)
                        for (var t in this._viewAllocated)
                            this._viewAllocated[t].$element.detach(),
                            this._viewPool.free(this._viewAllocated[t]),
                            delete this._viewAllocated[t];
                    this._$listContainer && this._$listContainer.empty(),
                    this.setDragShield(!1),
                    this.scheduleRepaint()
                }
            }, {
                key: "setSymbolInfo",
                value: function(t) {
                    var e = t.minTick
                      , i = t.priceFormatter
                      , s = t.volumeFormatter;
                    this._symbolData = {
                        minTick: e,
                        priceFormatter: i,
                        volumeFormatter: s
                    }
                }
            }, {
                key: "setContainer",
                value: function(t) {
                    if (this._$container !== t) {
                        this._$container && (this.resetView(),
                        this._$container.empty()),
                        this._$container = t;
                        var e = t.prop("ownerDocument");
                        this._containerWnd = e && e.defaultView,
                        this._viewPool = new l.DomeRowViewPool(t,this._handlers),
                        this._viewAllocated = {},
                        this._$listContainer = $("<div>", t).addClass("tv-dome-widget-main__anchor").appendTo(t),
                        this._$offscreenArrowHigher = $("<span>", t).addClass("tv-dome-widget-main__offscreen-arrow tv-dome-widget-main__offscreen-arrow--higher js-hidden").html(i(987)).appendTo(t),
                        this._$offscreenArrowLower = $("<span>", t).addClass("tv-dome-widget-main__offscreen-arrow tv-dome-widget-main__offscreen-arrow--lower js-hidden").html(i(988)).appendTo(t),
                        this._$dragShield = $("<div>", t).addClass("tv-dome-widget-main__drag-shield js-hidden").appendTo(t),
                        this._repaintScheduled = !1,
                        this.scheduleRepaint()
                    }
                }
            }, {
                key: "setHeight",
                value: function(t) {
                    t !== this.height && (this.height = t,
                    this.checkAutoCenter(),
                    this.scheduleRepaint())
                }
            }, {
                key: "shiftTopIndexRelativeToIndex",
                value: function(t, e) {
                    var i = this.correctIndex(t, e);
                    this._setTopIndex(i)
                }
            }, {
                key: "_setTopIndex",
                value: function(t) {
                    t !== this.topIndex && (this.topIndex = t,
                    this.checkAutoCenter(),
                    this.scheduleRepaint())
                }
            }, {
                key: "_canIndexBeDisplayed",
                value: function(t) {
                    var e, i, s, n, a, o;
                    return !!this._showPricesWithZeroVolume.value() || (e = t === this._lastPriceIndex,
                    i = t === this._positionIndex,
                    s = void 0 !== this._bids[t] || void 0 !== this._asks[t],
                    n = t <= this._worstBidIndex || this._worstAskIndex <= t,
                    a = this._orders[t] || [],
                    o = this._orderGhost && this._orderGhost.index === t,
                    i || e || o || n || s || 0 !== a.length)
                }
            }, {
                key: "correctIndex",
                value: function(t, e) {
                    var i, s, n;
                    if (!isFinite(t))
                        return t;
                    if (this._showPricesWithZeroVolume.value())
                        return t + e;
                    for (i = e > 0 ? 1 : -1,
                    s = 0,
                    n = 1,
                    e = Math.abs(e); s < e; ++n)
                        this._canIndexBeDisplayed(t + i * n) && (s += 1);
                    return t + i * (n - 1)
                }
            }, {
                key: "_getGapMiddleIndex",
                value: function() {
                    var t = this._bestAskIndex
                      , e = this._bestBidIndex;
                    return isFinite(t) || (t = e),
                    isFinite(e) || (e = t),
                    (e + t) / 2
                }
            }, {
                key: "_autoCenterTargetTopIndex",
                value: function() {
                    var t = NaN;
                    return t = isFinite(this._lastPriceIndex) ? this._lastPriceIndex : this._getGapMiddleIndex(),
                    this.correctIndex(t, Math.floor(this.height / 2))
                }
            }, {
                key: "centerOnLast",
                value: function() {
                    this.autoCenterRequired.setValue(!1);
                    var t = this._autoCenterTargetTopIndex();
                    isFinite(t) && this._setTopIndex(t)
                }
            }, {
                key: "guessOrderType",
                value: function(t, e) {
                    var i, s, n = this.priceToIndex(t);
                    if (isFinite(t) && (e === d.SIDE.BUY || e === d.SIDE.SELL))
                        return i = this._bestAskIndex,
                        s = this._bestBidIndex,
                        isFinite(i) || (i = s + 1),
                        isFinite(s) || (s = i - 1),
                        isFinite(i) || isFinite(s) || (i = s = this._lastPriceIndex),
                        e === d.SIDE.BUY ? n < i ? d.ORDERTYPE.LIMIT : d.ORDERTYPE.STOP : n > s ? d.ORDERTYPE.LIMIT : d.ORDERTYPE.STOP
                }
            }, {
                key: "indexToPrice",
                value: function(t) {
                    return t * this._symbolData.minTick
                }
            }, {
                key: "priceToIndex",
                value: function(t) {
                    return Math.round(t / this._symbolData.minTick)
                }
            }, {
                key: "_recalcMaxVolume",
                value: function() {
                    var t, e, i = 0;
                    for (t in this._asks)
                        i = Math.max(this._asks[t], i);
                    for (e in this._bids)
                        i = Math.max(this._bids[e], i);
                    i !== this._currentVolumeMax && (this._currentVolumeMax = i,
                    this._invalidatedMax = !0)
                }
            }, {
                key: "_recalcBestWorstBid",
                value: function() {
                    var t, e = -1 / 0, i = 1 / 0;
                    for (t in this._bids)
                        +t > e && (e = +t),
                        +t < i && (i = +t);
                    this._bestBidIndex = e,
                    this._worstBidIndex = i
                }
            }, {
                key: "_recalcBestWorstAsk",
                value: function() {
                    var t, e = 1 / 0, i = -1 / 0;
                    for (t in this._asks)
                        +t < e && (e = +t),
                        +t > i && (i = +t);
                    this._bestAskIndex = e,
                    this._worstAskIndex = i
                }
            }, {
                key: "updateData",
                value: function(t) {
                    var e, i, s, n, a, o, r, l = !1;
                    if (t.snapshot && (e = 0 === Object.keys(this._asks).length && 0 === Object.keys(this._bids).length,
                    l = !this._showPricesWithZeroVolume.value() && e,
                    this.resetData()),
                    t.bids) {
                        for (i = 0; i < t.bids.length; i++)
                            s = this.priceToIndex(t.bids[i].price),
                            n = t.bids[i].volume,
                            (this._bids[s] || 0) !== n && (n > 0 ? this._bids[s] = n : delete this._bids[s],
                            this._invalidatedBid[s] = !0);
                        this._recalcBestWorstBid()
                    }
                    if (t.asks) {
                        for (a = 0; a < t.asks.length; a++)
                            o = this.priceToIndex(t.asks[a].price),
                            r = t.asks[a].volume,
                            (this._asks[o] || 0) !== r && (r > 0 ? this._asks[o] = r : delete this._asks[o],
                            this._invalidatedAsk[o] = !0);
                        this._recalcBestWorstAsk()
                    }
                    this._recalcMaxVolume(),
                    l ? this.centerOnLast() : this.checkAutoCenter(),
                    this.scheduleRepaint()
                }
            }, {
                key: "updateOrders",
                value: function(t) {
                    var e, i, s, n;
                    for (this.resetOrders(),
                    e = 0; e < t.length; e++)
                        i = t[e],
                        null != i.stopPrice && (s = this.priceToIndex(i.stopPrice),
                        this._orders[s] || (this._orders[s] = []),
                        this._orders[s].push({
                            order: i,
                            pricePropertyName: "stopPrice"
                        }),
                        this._invalidatedOrders[s] = !0),
                        null != i.limitPrice && (n = this.priceToIndex(i.limitPrice),
                        this._orders[n] || (this._orders[n] = []),
                        this._orders[n].push({
                            order: i,
                            pricePropertyName: "limitPrice"
                        }),
                        this._invalidatedOrders[n] = !0);
                    this.scheduleRepaint()
                }
            }, {
                key: "updateLast",
                value: function(t) {
                    var e = this.priceToIndex(t);
                    e !== this._lastPriceIndex && (this._invalidatedPriceHighlight[this._lastPriceIndex] = !0,
                    this._invalidatedPriceHighlight[e] = !0,
                    this._lastPriceIndex = e,
                    this.checkAutoCenter(),
                    this.scheduleRepaint())
                }
            }, {
                key: "updatePosition",
                value: function(t) {
                    var e, i;
                    if (!t || !t.qty)
                        return void this.resetPosition();
                    e = this.priceToIndex(t.avgPrice),
                    i = Math.abs(t.qty) * (t.side === d.SIDE.BUY ? 1 : -1),
                    this._positionIndex === e && this._positionQty === i || (this._invalidatedPriceHighlight[this._positionIndex] = !0,
                    this._invalidatedPriceHighlight[e] = !0,
                    this._positionIndex = e,
                    this._positionQty = i,
                    this.scheduleRepaint())
                }
            }, {
                key: "resetOrderGhost",
                value: function() {
                    this._orderGhost && (this._invalidatedOrders[this._orderGhost.index] = !0,
                    this._invalidatedOrders[this._orderGhost.originIndex] = !0,
                    this._orderGhost = null,
                    this.scheduleRepaint())
                }
            }, {
                key: "setOrderGhost",
                value: function(t) {
                    var e, i = t.order, s = t.pricePropertyName, n = t.price;
                    this.resetOrderGhost(),
                    e = this.priceToIndex(n),
                    isFinite(e) && (this._orderGhost = {
                        ghost: !0,
                        order: i,
                        pricePropertyName: s,
                        index: e,
                        originIndex: this.priceToIndex(i[s])
                    },
                    this._invalidatedOrders[e] = !0,
                    this.scheduleRepaint())
                }
            }, {
                key: "setDragShield",
                value: function(t) {
                    this._$dragShield && this._$dragShield.toggleClass("js-hidden", !t)
                }
            }, {
                key: "scheduleRepaint",
                value: function() {
                    var t = this;
                    this._repaintScheduled || this._symbolData && (this._containerWnd && this._containerWnd.requestAnimationFrame ? this._containerWnd.requestAnimationFrame(function() {
                        return t.repaint()
                    }) : window.setTimeout(function() {
                        return t.repaint()
                    }, 0),
                    this._repaintScheduled = !0)
                }
            }, {
                key: "repaint",
                value: function() {
                    var t, e, i, s, n, a, o, r, l, u, c, h, _, p, v, m, f, g, y, b, k, w, T, P, x, C, I;
                    if (this._repaintScheduled = !1,
                    this._$listContainer && this._symbolData && (t = this.topIndex,
                    this._canIndexBeDisplayed(t) || (t = this.correctIndex(t, -1)),
                    e = this.correctIndex(t, 1 - this.height),
                    isFinite(e))) {
                        for (i = this._viewAllocated,
                        s = Object.keys(this._viewAllocated),
                        n = s.length; n--; )
                            a = s[n],
                            ((o = +a) > t || o < e || !this._canIndexBeDisplayed(o)) && (i[a].$element.detach(),
                            this._viewPool.free(i[a]),
                            delete i[a]);
                        for (r = e; r <= t; r++)
                            if (this._canIndexBeDisplayed(r)) {
                                if (l = !1,
                                u = i[r],
                                u || (u = this._viewPool.allocate(),
                                i[r] = u,
                                l = !0),
                                c = this._orderGhost,
                                l && (h = this.indexToPrice(r),
                                u.updateIndex(r),
                                u.updatePrice(h),
                                u.updatePriceText(this._symbolData.priceFormatter.format(h))),
                                (l || this._invalidatedAsk[r]) && (this._asks[r] ? u.updateAskVolume(this._symbolData.volumeFormatter.format(this._asks[r])) : u.updateAskVolume("")),
                                (l || this._invalidatedBid[r]) && (this._bids[r] ? u.updateBidVolume(this._symbolData.volumeFormatter.format(this._bids[r])) : u.updateBidVolume("")),
                                (l || this._invalidatedAsk[r] || this._invalidatedMax) && u.updateAskMeter(this._asks[r] / this._currentVolumeMax || 0),
                                (l || this._invalidatedBid[r] || this._invalidatedMax) && u.updateBidMeter(this._bids[r] / this._currentVolumeMax || 0),
                                (l || this._invalidatedPriceHighlight[r]) && (_ = r === this._lastPriceIndex,
                                p = r === this._positionIndex ? this._positionQty : 0,
                                u.updatePriceHighlight(_, p)),
                                l || this._invalidatedOrders[r]) {
                                    for (v = this._orders[r] || [],
                                    m = void 0,
                                    f = void 0,
                                    this._orderGhost && (c.index === r && (c.originIndex !== r ? v = v.concat(c) : f = c.order.id),
                                    c.index !== r && c.originIndex !== r || (m = c.order.side)),
                                    g = 0; g < v.length; g++) {
                                        switch (y = v[g],
                                        b = y.order,
                                        y.inactive = b.status !== d.ORDERSTATUS.WORKING || b.type === d.ORDERTYPE.STOPLIMIT && "limitPrice" === y.pricePropertyName,
                                        b.type) {
                                        case d.ORDERTYPE.MARKET:
                                            y.typeText = $.t("Market"),
                                            y.type = "market";
                                            break;
                                        case d.ORDERTYPE.LIMIT:
                                            y.typeText = b.parentId ? $.t("TakeProfit") : $.t("Limit"),
                                            y.type = "limit";
                                            break;
                                        case d.ORDERTYPE.STOP:
                                            y.typeText = b.parentId ? $.t("StopLoss") : $.t("Stop"),
                                            y.type = "stop";
                                            break;
                                        case d.ORDERTYPE.STOPLIMIT:
                                            y.typeText = $.t("StopLimit"),
                                            y.type = "stoplimit";
                                            break;
                                        default:
                                            y.typeText = ""
                                        }
                                        y.qty = this._symbolData.volumeFormatter.format(b.qty),
                                        y.buy = b.side === d.SIDE.BUY,
                                        y.noCollapse = b.side === m,
                                        y.highlighted = null != f && b.id === f && c.pricePropertyName === y.pricePropertyName
                                    }
                                    u.updateOrders(v)
                                }
                                l && (k = this.correctIndex(r, -1),
                                i[k] ? u.$element.insertBefore(i[k].$element) : u.$element.appendTo(this._$listContainer))
                            }
                        isFinite(this._lastPriceIndex) && (w = this._lastPriceIndex > t,
                        T = this._lastPriceIndex < e,
                        w !== this._offscreenPriceHigher && (this._offscreenPriceHigher = w,
                        this._$offscreenArrowHigher.toggleClass("js-hidden", !w)),
                        T !== this._offscreenPriceLower && (this._offscreenPriceLower = T,
                        this._$offscreenArrowLower.toggleClass("js-hidden", !T))),
                        this._invalidatedMax = !1;
                        for (P in this._invalidatedBid)
                            delete this._invalidatedBid[P];
                        for (x in this._invalidatedAsk)
                            delete this._invalidatedAsk[x];
                        for (C in this._invalidatedPriceHighlight)
                            delete this._invalidatedPriceHighlight[C];
                        for (I in this._invalidatedOrders)
                            delete this._invalidatedOrders[I]
                    }
                }
            }, {
                key: "checkAutoCenter",
                value: function() {
                    var t, e, i, s, n;
                    isFinite(this.topIndex) || this.centerOnLast(),
                    t = this.topIndex,
                    e = this.correctIndex(this.topIndex, 1 - this.height),
                    i = void 0,
                    i = isFinite(this._lastPriceIndex) ? this._lastPriceIndex : isFinite(this._bestBidIndex) ? this._bestBidIndex : isFinite(this._bestAskIndex) ? this._bestAskIndex : NaN,
                    s = void 0,
                    s = isFinite(this._lastPriceIndex) ? this._lastPriceIndex : isFinite(this._bestAskIndex) ? this._bestAskIndex : isFinite(this._bestBidIndex) ? this._bestBidIndex : NaN,
                    n = !1,
                    (s > t || i < e) && this.topIndex !== this._autoCenterTargetTopIndex() && (n = !0),
                    this.autoCenterRequired.setValue(n)
                }
            }]),
            t
        }()
    },
    985: function(t, e, i) {
        "use strict";
        function s(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        var n, a, o, r, l, d, u, c;
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e.DomeRowViewPool = void 0,
        n = i(117),
        a = s(n),
        o = i(118),
        r = s(o),
        l = i(383),
        i(986),
        e.DomeRowViewPool = function() {
            function t(e, i) {
                (0,
                a.default)(this, t),
                this._pool = [];
                var s = e.get(0);
                s.nodeType === Node.DOCUMENT_NODE ? this._document = s : this._document = s.ownerDocument,
                this._handlers = i || {},
                this._ordersPool = new u(e,this._handlers),
                this._useCssTransform = "transform"in this._document.createElement("span").style
            }
            return (0,
            r.default)(t, [{
                key: "allocate",
                value: function() {
                    return this._pool.length ? this._pool.pop() : new d(this._document,this._ordersPool,this._handlers,this._useCssTransform)
                }
            }, {
                key: "free",
                value: function(t) {
                    t.destroy(),
                    this._pool.push(t)
                }
            }]),
            t
        }(),
        d = function() {
            function t(e, i, s, n) {
                var o, r, d, u, c, h, _, p, v, m, f, g, y, b = this;
                (0,
                a.default)(this, t),
                this._useCssTransform = n,
                this._ordersPool = i,
                this._handlers = s,
                this._allocatedOrderViews = [],
                o = e.createElement("div"),
                o.setAttribute("class", "tv-dome-widget-main__row"),
                r = e.createElement("span"),
                r.setAttribute("class", "tv-dome-widget-main__value tv-dome-widget-main__value--price"),
                d = e.createElement("span"),
                d.setAttribute("class", "tv-dome-widget-main__value tv-dome-widget-main__value--sell"),
                u = e.createElement("span"),
                u.setAttribute("class", "tv-dome-widget-main__value tv-dome-widget-main__value--buy"),
                c = e.createElement("span"),
                c.setAttribute("class", "tv-dome-widget-main__meter tv-dome-widget-main__meter--sell"),
                h = e.createElement("span"),
                h.setAttribute("class", "tv-dome-widget-main__meter tv-dome-widget-main__meter--buy"),
                _ = e.createElement("span"),
                _.setAttribute("class", "tv-dome-widget-main__value-readout"),
                p = e.createElement("span"),
                p.setAttribute("class", "tv-dome-widget-main__value-readout"),
                v = e.createTextNode(""),
                m = e.createTextNode(""),
                f = e.createTextNode(""),
                this._useCssTransform && (c.style.width = h.style.width = "100%",
                c.style.transform = h.style.transform = "scale(0, 1)"),
                g = e.createElement("span"),
                g.setAttribute("class", "tv-dome-widget-main__value tv-dome-widget-main__value--orders-buy"),
                y = e.createElement("span"),
                y.setAttribute("class", "tv-dome-widget-main__value tv-dome-widget-main__value--orders-sell"),
                o.appendChild(d),
                o.appendChild(u),
                o.appendChild(r),
                o.appendChild(g),
                o.appendChild(y),
                r.appendChild(f),
                d.appendChild(c),
                u.appendChild(h),
                d.appendChild(_),
                u.appendChild(p),
                _.appendChild(v),
                p.appendChild(m),
                this._priceCell = r,
                this._priceText = f,
                this._askText = v,
                this._bidText = m,
                this._askMeter = c,
                this._bidMeter = h,
                this._ordersBuy = g,
                this._ordersSell = y,
                s && s.bidAskClick && (d.addEventListener("click", function(t) {
                    s.bidAskClick.call(null, t, {
                        price: b._price,
                        side: l.SIDE.SELL
                    })
                }, !1),
                u.addEventListener("click", function(t) {
                    s.bidAskClick.call(null, t, {
                        price: b._price,
                        side: l.SIDE.BUY
                    })
                }, !1)),
                s && s.bidAskContextMenu && (d.addEventListener("contextmenu", function(t) {
                    s.bidAskContextMenu.call(null, t, {
                        price: b._price,
                        side: l.SIDE.SELL
                    })
                }, !1),
                u.addEventListener("contextmenu", function(t) {
                    s.bidAskContextMenu.call(null, t, {
                        price: b._price,
                        side: l.SIDE.BUY
                    })
                }, !1)),
                this.$element = $(o)
            }
            return (0,
            r.default)(t, [{
                key: "updatePriceText",
                value: function(t) {
                    this._priceText.nodeValue = t
                }
            }, {
                key: "updateBidVolume",
                value: function(t) {
                    this._bidText.nodeValue = t || ""
                }
            }, {
                key: "updateAskVolume",
                value: function(t) {
                    this._askText.nodeValue = t || ""
                }
            }, {
                key: "updateBidMeter",
                value: function(t) {
                    var e = Math.min(Math.max(t, 0), 1) || 0;
                    this._useCssTransform ? this._bidMeter.style.transform = "scale(" + e + ", 1)" : this._bidMeter.style.width = 100 * e + "%"
                }
            }, {
                key: "updateAskMeter",
                value: function(t) {
                    var e = Math.min(Math.max(t, 0), 1) || 0;
                    this._useCssTransform ? this._askMeter.style.transform = "scale(" + e + ", 1)" : this._askMeter.style.width = 100 * e + "%"
                }
            }, {
                key: "updatePriceHighlight",
                value: function(t, e) {
                    var i, s = this._priceCell.classList;
                    s ? (s[t ? "add" : "remove"]("tv-dome-widget-main__value--highlighted"),
                    s[e > 0 ? "add" : "remove"]("tv-dome-widget-main__value--long-position"),
                    s[e < 0 ? "add" : "remove"]("tv-dome-widget-main__value--short-position")) : (i = "tv-dome-widget-main__value tv-dome-widget-main__value--price",
                    t && (i += " tv-dome-widget-main__value--highlighted"),
                    e > 0 ? i += " tv-dome-widget-main__value--long-position" : e < 0 && (i += " tv-dome-widget-main__value--short-position"),
                    this._priceCell.setAttribute("class", i))
                }
            }, {
                key: "updateIndex",
                value: function(t) {
                    this._index = t
                }
            }, {
                key: "updatePrice",
                value: function(t) {
                    this._price = t
                }
            }, {
                key: "updateOrders",
                value: function(t) {
                    for (var e, i, s, n, a, o; this._allocatedOrderViews.length > t.length; )
                        this._ordersPool.free(this._allocatedOrderViews.pop());
                    for (; this._allocatedOrderViews.length < t.length; )
                        this._allocatedOrderViews.push(this._ordersPool.allocate());
                    for (e = !1,
                    i = !1,
                    s = t.length; s-- > 0; )
                        n = t[s],
                        a = this._allocatedOrderViews[s],
                        o = !n.noCollapse && (n.buy ? e : i),
                        a.updateOrderData(n.order, n.pricePropertyName),
                        a.updateQty(n.qty),
                        a.updateTypeText(n.typeText),
                        a.updateClassName(n.buy, o, n.type, n.inactive, n.ghost, n.highlighted),
                        n.buy ? (this._ordersBuy.appendChild(a.element),
                        e = !0) : (this._ordersSell.insertBefore(a.element, this._ordersSell.firstChild),
                        i = !0)
                }
            }, {
                key: "destroy",
                value: function() {
                    var t, e = this._allocatedOrderViews.length;
                    if (e > 0) {
                        for (t = 0; t < e; t++)
                            this._ordersPool.free(this._allocatedOrderViews[t]);
                        this._allocatedOrderViews.length = 0
                    }
                }
            }]),
            t
        }(),
        u = function() {
            function t(e, i) {
                (0,
                a.default)(this, t),
                this._pool = [],
                this._handlers = i;
                var s = e.get(0);
                s.nodeType === Node.DOCUMENT_NODE ? this._document = s : this._document = s.ownerDocument
            }
            return (0,
            r.default)(t, [{
                key: "allocate",
                value: function() {
                    return this._pool.length ? this._pool.pop() : new c(this._document,this._handlers)
                }
            }, {
                key: "free",
                value: function(t) {
                    t.destroy(),
                    this._pool.push(t)
                }
            }]),
            t
        }(),
        c = function() {
            function t(e, s) {
                var n, o, r, l, d, u, c = this;
                (0,
                a.default)(this, t),
                n = e.createElement("div"),
                n.setAttribute("class", "tv-dome-widget-main__order tv-dome-widget-order"),
                o = e.createElement("div"),
                o.innerHTML = i(191),
                o.setAttribute("class", "tv-dome-widget-order__close"),
                r = e.createElement("span"),
                r.setAttribute("class", "tv-dome-widget-order__qty"),
                l = e.createTextNode(""),
                d = e.createElement("span"),
                d.setAttribute("class", "tv-dome-widget-order__type"),
                u = e.createTextNode(""),
                n.appendChild(o),
                n.appendChild(r),
                r.appendChild(l),
                n.appendChild(d),
                d.appendChild(u),
                s && s.closeButtonClick && o.addEventListener("click", function(t) {
                    s.closeButtonClick.call(null, t, {
                        order: c._order
                    })
                }, !1),
                s && s.qtyClick && r.addEventListener("click", function(t) {
                    s.qtyClick.call(null, t, {
                        order: c._order
                    })
                }, !1),
                s && s.orderMousedown && r.addEventListener("mousedown", function(t) {
                    s.orderMousedown.call(null, t, {
                        order: c._order,
                        pricePropertyName: c._pricePropertyName
                    })
                }, !1),
                this.element = n,
                this._closeButton = o,
                this._qtyText = l,
                this._typeText = u
            }
            return (0,
            r.default)(t, [{
                key: "updateQty",
                value: function(t) {
                    this._qtyText.nodeValue = t || ""
                }
            }, {
                key: "updateTypeText",
                value: function(t) {
                    this._typeText.nodeValue = t || ""
                }
            }, {
                key: "updateClassName",
                value: function(t, e, i, s, n, a) {
                    var o = this.element
                      , r = "tv-dome-widget-main__order tv-dome-widget-order";
                    e && (r += " tv-dome-widget-main__order--collapsed"),
                    t && (r += " tv-dome-widget-order--buy"),
                    i && (r += " tv-dome-widget-order--type-" + i),
                    s && (r += " tv-dome-widget-order--inactive"),
                    n && (r += " tv-dome-widget-order--ghost"),
                    a && (r += " tv-dome-widget-order--highlighted"),
                    o.setAttribute("class", r)
                }
            }, {
                key: "updateOrderData",
                value: function(t, e) {
                    this._order = t,
                    this._pricePropertyName = e
                }
            }, {
                key: "destroy",
                value: function() {
                    this.element.parentNode && this.element.parentNode.removeChild(this.element),
                    this._order = null
                }
            }]),
            t
        }()
    },
    986: function(t, e) {},
    987: function(t, e) {
        t.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 7" width="12" height="7"><path d="M1 7a1 1 0 0 1-1-1c0-.276.1-.538.28-.72l5-5C5.463.1 5.725 0 6 0c.276 0 .538.1.72.28l5 5c.18.182.28.444.28.72a1 1 0 0 1-1 1c-.276 0-.538-.1-.72-.28L6 2.437l-4.28 4.28C1.537 6.9 1.275 7 1 7z"/></svg>'
    },
    988: function(t, e) {
        t.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 7" width="12" height="7"><path d="M1 0a1 1 0 0 0-1 1c0 .276.1.538.28.72l5 5c.182.18.444.28.72.28.276 0 .538-.1.72-.28l5-5c.18-.182.28-.444.28-.72a1 1 0 0 0-1-1c-.276 0-.538.1-.72.28L6 4.563 1.72.282C1.537.1 1.275 0 1 0z"/></svg>'
    },
    989: function(t, e, i) {
        "use strict";
        function s(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        var n, a, o, r;
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e.DomeCalcBlock = void 0,
        n = i(117),
        a = s(n),
        o = i(118),
        r = s(o),
        i(183),
        i(990),
        e.DomeCalcBlock = function() {
            function t(e) {
                (0,
                a.default)(this, t),
                this._handlers = e || {},
                this._nodes = {},
                this._uiState = {
                    plViewType: 0
                },
                this.reset()
            }
            return (0,
            r.default)(t, [{
                key: "reset",
                value: function() {
                    this._position = void 0,
                    this._pl = void 0,
                    this._lastPrice = void 0,
                    this._symbolData = null,
                    this.updateQty(1),
                    this._positionInvalidated = !0,
                    this._plInvalidated = !0,
                    this._lastInvalidated = !0,
                    this.scheduleRepaint()
                }
            }, {
                key: "setSymbolInfo",
                value: function(t) {
                    var e = t.minTick
                      , i = t.priceFormatter
                      , s = t.volumeFormatter
                      , n = t.qtyProperties;
                    this._symbolData = {
                        minTick: e,
                        priceFormatter: i,
                        volumeFormatter: s
                    },
                    this._$qty.TVTicker({
                        min: n.min,
                        step: n.step,
                        max: n.max
                    })
                }
            }, {
                key: "updatePosition",
                value: function(t) {
                    this._position = t,
                    this._position || (this._pl = void 0),
                    this._positionInvalidated = !0,
                    this._plInvalidated = !0,
                    this.scheduleRepaint()
                }
            }, {
                key: "updatePL",
                value: function(t) {
                    this._pl = t,
                    this._position && (this._plInvalidated = !0,
                    this.scheduleRepaint())
                }
            }, {
                key: "updateLast",
                value: function(t) {
                    this._lastPrice = t,
                    this._position && (1 !== this._uiState.plViewType && 2 !== this._uiState.plViewType || (this._plInvalidated = !0,
                    this.scheduleRepaint()))
                }
            }, {
                key: "updateQty",
                value: function(t) {
                    var e, i;
                    this._suggestedQty = t,
                    e = t + "" || "",
                    (i = this._nodes.$qty) && i.val() !== e && i.val(e)
                }
            }, {
                key: "getQty",
                value: function() {
                    var t = +this._nodes.$qty.val();
                    return !isFinite(t) || t < 0 ? NaN : t
                }
            }, {
                key: "setContainer",
                value: function(t) {
                    var e, i, s, n, a, o, r, l = this;
                    if (this._nodes.$container) {
                        this._nodes.$container.empty();
                        for (e in this._nodes)
                            delete this._nodes[e]
                    }
                    delete this._plDirectionCache,
                    delete this._plTextCache,
                    t && (t.empty().addClass("tv-dome-calc-block").html('<div class="tv-dome-widget-calculator tv-dome-calc-block"><div class="tv-dome-calc-block__wrap"><div class="tv-dome-calc-block__qty-wrap"><input class="tv-dome-calc-block__qty tv-text-input js-qty"></div><span class="tv-dome-calc-block__position js-position"></span><span class="tv-dome-calc-block__pl js-pl"></span></div></div>'),
                    i = t.prop("ownerDocument"),
                    s = i.createTextNode(""),
                    n = i.createTextNode(""),
                    a = this._$qty = t.find(".js-qty").val(this._qty || 1).addClass("apply-common-tooltip").attr("title", $.t("Quantity")),
                    o = t.find(".js-position").addClass("apply-common-tooltip").attr("title", $.t("Position")).append(n),
                    r = t.find(".js-pl").addClass("apply-common-tooltip").attr("title", $.t("Profit/Loss")).append(s),
                    this._nodes = {
                        $container: t,
                        $qty: a,
                        $position: o,
                        $pl: r,
                        plText: s,
                        positionText: n
                    },
                    o.on("click", function(t) {
                        t.preventDefault();
                        var e = Math.abs(l._position && l._position.qty);
                        e > 0 && isFinite(e) && (l.updateQty(e),
                        a.trigger("change"))
                    }),
                    a.on("change", function(t) {
                        l._handlers && l._handlers.qtyChange && (a.val(a.val().replace(/\D+/g, "") || l._suggestedQty || "1"),
                        l._handlers.qtyChange.call(null, t, {
                            qty: l.getQty()
                        }))
                    }),
                    a.on("keypress", function(t) {
                        t.charCode && /\D/.test(String.fromCharCode(t.charCode)) && t.preventDefault()
                    }),
                    this._handlers && this._handlers.qtyInput && a.on("input", function(t) {
                        l._handlers.qtyInput.call(null, t, {
                            qty: l.getQty()
                        })
                    }),
                    r.on("click", function(t) {
                        t.preventDefault(),
                        l._uiState.plViewType = -~l._uiState.plViewType % 3,
                        l._plInvalidated = !0,
                        l.scheduleRepaint()
                    }),
                    a.TVTicker({
                        min: 1,
                        step: 1
                    })),
                    this._positionInvalidated = !0,
                    this._plInvalidated = !0,
                    this.scheduleRepaint()
                }
            }, {
                key: "scheduleRepaint",
                value: function() {
                    var t = this;
                    this._repaintScheduled || (window.requestAnimationFrame ? window.requestAnimationFrame(function() {
                        return t.repaint()
                    }) : window.setTimeout(function() {
                        return t.repaint()
                    }, 0),
                    this._repaintScheduled = !0)
                }
            }, {
                key: "repaint",
                value: function() {
                    var t, e, i, s, n, a, o, r;
                    this._repaintScheduled = !1,
                    t = this._nodes,
                    t.$container && (this._positionInvalidated && (this._positionInvalidated = !1,
                    e = this._position && this._position.qty || 0,
                    0 === e ? t.positionText.nodeValue = $.t("Flat") : (i = Math.abs(e),
                    s = void 0,
                    s = this._symbolData && this._symbolData.volumeFormatter ? this._symbolData.volumeFormatter.format(i) : i + "",
                    t.positionText.nodeValue = s),
                    t.$position.toggleClass("tv-dome-calc-block__position--short", e < 0).toggleClass("tv-dome-calc-block__position--long", e > 0)),
                    this._plInvalidated && (this._plInvalidated = !1,
                    n = 0,
                    a = "",
                    2 === this._uiState.plViewType ? (o = NaN,
                    this._position && (o = (this._lastPrice - this._position.avgPrice) / this._position.avgPrice * (this._position.qty < 1 ? -1 : 1)),
                    isFinite(o) ? (a = (100 * o).toFixed(2) + "%",
                    n = o < 0 ? -1 : 1) : a = "%") : 1 === this._uiState.plViewType ? (r = NaN,
                    this._position && this._symbolData && (r = (this._lastPrice - this._position.avgPrice) * (this._position.qty < 1 ? -1 : 1) / this._symbolData.minTick),
                    isFinite(r) ? (a = $.t("{0} pts", {
                        context: "Points"
                    }).format(Math.round(r)),
                    n = r < 0 ? -1 : 1) : a = $.t("Points")) : this._position && isFinite(this._pl) ? (a = this._pl.toFixed(2),
                    n = this._pl < 0 ? -1 : 1) : a = $.t("P/L"),
                    this._plTextCache !== a && (t.plText.nodeValue = a,
                    this._plTextCache = a),
                    this._plDirectionCache !== n && (t.$pl.toggleClass("tv-dome-calc-block__pl--loss", n < 0).toggleClass("tv-dome-calc-block__pl--profit", n > 0),
                    this._plDirectionCache = n)))
                }
            }]),
            t
        }()
    },
    990: function(t, e) {},
    991: function(t, e) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        e.pieChartD = function(t) {
            var e = "M 0 0";
            return t > 0 && (t >= 1 ? e = "M 0 -1" : e += "L 0 -1",
            t > .5 && (e += "A 1 1 0 0 1 0 1"),
            e += "A 1 1 0 0 1 " + Math.sin(2 * t * Math.PI) + " " + -Math.cos(2 * t * Math.PI) + "Z"),
            e
        }
    },
    992: function(t, e, i) {
        "use strict";
        function s(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        var n, a, o, r;
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e.Timer = void 0,
        n = i(117),
        a = s(n),
        o = i(118),
        r = s(o),
        e.Timer = function() {
            function t(e, i, s) {
                (0,
                a.default)(this, t),
                this._delay = e,
                this._doneCb = i,
                this._progressCb = s
            }
            return (0,
            r.default)(t, [{
                key: "run",
                value: function() {
                    var t, e = this;
                    this._timeoutId || (t = Date.now ? Date.now() : +new Date,
                    this._expiresAt = t + this._delay,
                    this._timeoutId = window.setTimeout(function() {
                        e.abort(),
                        e._doneCb()
                    }, this._delay),
                    this._trackProgressScheduled || this._trackProgress())
                }
            }, {
                key: "revert",
                value: function() {
                    this._timeoutId && (window.clearTimeout(this._timeoutId),
                    this._timeoutId = void 0,
                    this.run())
                }
            }, {
                key: "abort",
                value: function() {
                    this._timeoutId && (window.clearTimeout(this._timeoutId),
                    this._timeoutId = void 0,
                    this._expiresAt = void 0,
                    this._progressCb && this._progressCb(void 0))
                }
            }, {
                key: "_trackProgress",
                value: function() {
                    var t, e, i = this;
                    this._trackProgressScheduled = !1,
                    this._progressCb && this._timeoutId && (t = Date.now ? Date.now() : +new Date,
                    e = 1 - (this._expiresAt - t) / this._delay,
                    e = Math.max(Math.min(e, 1), 0),
                    this._progressCb(e),
                    this._wnd && this._wnd.requestAnimationFrame ? this._wnd.requestAnimationFrame(function() {
                        i._trackProgress()
                    }) : window.setTimeout(function() {
                        i._trackProgress()
                    }, 40),
                    this._trackProgressScheduled = !0)
                }
            }, {
                key: "setWindow",
                value: function(t) {
                    this._wnd = t
                }
            }]),
            t
        }()
    },
    993: function(t, e) {},
    994: function(t, e) {},
    995: function(t, e) {},
    996: function(t, e) {},
    997: function(t, e) {
        t.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" width="15" height="15"><path d="M7 1v3h1V1H7zM1 7v1h3V7H1zm10 0v1h3V7h-3zm-4 4v3h1v-3H7zm.5-11a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15zm0 2a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11z"/></svg>'
    }
});
