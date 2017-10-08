webpackJsonp([3], {
    517: function(t, e) {
        "use strict";

        function i(t, e) {
            void 0 === e && (e = "&nbsp;");
            var i = (t + "").split(".");
            return i[0].replace(/\B(?=(\d{3})+(?!\d))/g, e) + (i[1] ? "." + i[1] : "")
        }
        Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.default = i
    },
    561: function(t, e, i) {
        "use strict";

        function s(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        var n, a, r, o, u, l, d, c, h, f, p, _, v, b, m, g, y, w, C, S, k, O, F, x, U, D, P, R, E, T, A, N, j, I, B, M, V, H;
        Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            n = i(508),
            a = s(n),
            r = i(468),
            o = s(r),
            u = i(472),
            l = s(u),
            d = i(117),
            c = s(d),
            h = i(118),
            f = s(h),
            i(562),
            p = i(563),
            _ = i(385),
            v = s(_),
            b = i(450),
            m = s(b),
            g = i(569),
            y = s(g),
            w = i(575),
            C = s(w),
            S = i(576),
            k = s(S),
            O = i(580),
            F = s(O),
            x = i(581),
            U = s(x),
            D = i(582),
            P = s(D),
            R = i(421),
            E = i(382),
            T = i(383),
            A = i(178),
            N = i(393),
            j = i(583),
            I = [T.ORDERSTATUS.WORKING, T.ORDERSTATUS.INACTIVE, T.ORDERSTATUS.FILLED, T.ORDERSTATUS.CANCELED, T.ORDERSTATUS.REJECTED],
            B = [T.ORDERSTATUS.FILLED, T.ORDERSTATUS.CANCELED, T.ORDERSTATUS.REJECTED],
            M = function(t) {
                return function(e) {
                    return Array(t).fill(e).join("")
                }
            },
            V = function(t) {
                var e = t.accId,
                    s = void 0 === e ? "" : e,
                    n = (t.brokerName,
                        t.tabsCount),
                    a = void 0 === n ? 0 : n;
                return '\n<div class="tv-account-manager">\n\t<div class="tv-account-manager__top-panel">\n\t\t<div class="tv-tabs tv-tabs--semi-compact tv-tabs--no-margin tv-tabs--no-border">\n\t\t\t' + M(a)('<div class="tv-tabs__tab js-tab"></div>') + '\n\t\t</div>\n\t\t<div class="controls">\n\t\t\t<div class="controls__elem controls__elem--disabled account-selector js-account-dropdown">\n\t\t\t\t<span class="js-account-name">' + s + '</span>\n\t\t\t</div>\n\t\t\t<div class="controls__elem option js-tab-options">' + i(584) + '</div>\n\t\t</div>\n\t</div>\n\t<div class="tv-account-manager__secondary-panel js-cesondary-panel">\n\t\t<div class="js-secondary-tabs"></div>\n\t\t<div class="tv-account-manager__summary js-summary"></div>\n\t</div>\n\t<div class="tv-account-manager__content js-content">\n\t\t' + M(a)('<div class="tv-account-manager__page js-page"></div>') + "\n\t</div>\n</div>"
            },
            H = function() {
                function t(e, i) {
                    (0,
                        c.default)(this, t),
                    this._adapter = e,
                        this._bridge = i,
                        this._container = i.$body,
                        this._pages = [],
                        this._topLines = {},
                        this._trading = (0,
                            N.tradingService)(),
                        this._updateAccountIdBinded = this._updateAccountId.bind(this),
                        this.adapter.connectionStatusUpdate.subscribe(this, this._onStatusChange),
                        this._onStatusChange(this._adapter.connectionStatus())
                }
                return (0,
                        f.default)(t, [{
                        key: "drawAttention",
                        value: function() {
                            this._loginForm && this._loginForm.drawAttention && this._loginForm.drawAttention()
                        }
                    }, {
                        key: "_onStatusChange",
                        value: function(t, e) {
                            var i = this;
                            this._container.empty(),
                                this._unsubscribe(),
                                this._spinner && (this._spinner.stop(),
                                    Reflect.deleteProperty(this, "_spinner")),
                                this._spinnerContainer && (this._spinnerContainer.remove(),
                                    Reflect.deleteProperty(this, "_spinnerContainer")),
                                t === T.CONNECTSTATUSES.ERROR || t === T.CONNECTSTATUSES.DISCONNECTED ? (e && $("<div>").addClass("trading-connection-error-message").text(e).appendTo(this._container),
                                    "undefined" != typeof LoginForm && this._adapter.metainfo().configFlags.supportLoginForm && (this._loginForm = new LoginForm(this._adapter.metainfo(), this._trading),
                                        this._container.append(this._loginForm.content()),
                                        this._loginForm.focus(),
                                        this._loginForm.getAuthInfo().then(function(t) {
                                            var e = t.username,
                                                s = t.password,
                                                n = t.type;
                                            i._adapter.signIn(e, s, n)
                                        })),
                                    this.unbindContexMenu()) : this._loginForm && (this._loginForm.remove(),
                                    Reflect.deleteProperty(this, "_loginForm")),
                                t === T.CONNECTSTATUSES.CONNECTING && (this._spinnerContainer = $("<div>").addClass("spinner-container").appendTo(this._container),
                                    this._spinner = (0,
                                        A.unifiedSpinner)().spin(this._spinnerContainer.get(0))),
                                t === T.CONNECTSTATUSES.CONNECTED && (this._create(),
                                    this._fullupdate())
                        }
                    }, {
                        key: "priceFormatter",
                        value: function(t) {
                            return t.symbol ? this._trading.formatter(t.symbol) : Promise.resolve(null)
                        }
                    }, {
                        key: "_updateAccountId",
                        value: function(t) {
                            this._accName.text(t.name)
                        }
                    }, {
                        key: "_create",
                        value: function() {
                            var t, e, i, s, n, a, r, o, u, l, d, c, h = this;
                            this._pages = this.pages.map(function(t) {
                                    var e = Reflect.construct(t.constructor, [t.ctorArgument]);
                                    return e.subscribeUpdates && e.subscribeUpdates(),
                                        e
                                }),
                                t = this._info = this.adapter.accountManagerInfo(),
                                e = this._info.accountTitle,
                                i = this._pages.length,
                                this._container.append($(V({
                                    tabsCount: i,
                                    brokerName: e,
                                    accId: ""
                                }))),
                                s = this._container.find(".js-tab-options"),
                                (0,
                                    R.bindPopupMenu)(s, this.adapter.buttonDropdownActions.bind(this.adapter), {
                                    reverse: !0
                                }),
                                n = function(t, e) {
                                    return t && e && t.id === e.id
                                },
                                a = this._container.find(".js-account-dropdown"),
                                this._accName = this._container.find(".js-account-name"),
                                this._accountSummaryRow && this._accountSummaryRow.destroy(),
                                this._info.summary && (r = this._container.find(".js-summary"),
                                    this._accountSummaryRow = new j.AccountSummaryRow(r[0], this._info.summary)),
                                this._info.account ? this._info.account.subscribe(this._updateAccountIdBinded, {
                                    callWithLast: !0
                                }) : a.addClass("js-hidden"),
                                t.accountsList && (o = function() {
                                        return t.accountsList.map(function(e) {
                                            return {
                                                html: '<div class="pair"><div>' + e.name + "</div><div>" + e.currency + "</div></div>",
                                                action: function() {
                                                    n(e, t.account.value()) || t.account.setValue(e)
                                                },
                                                active: n(e, t.account.value())
                                            }
                                        })
                                    },
                                    a.removeClass("controls__elem--disabled").append($('<span class="tv-caret"></span>')),
                                    (0,
                                        R.bindPopupMenu)(a, o, {
                                        direction: "down",
                                        notCloseOnButtons: !0,
                                        reverse: !0,
                                        activeClass: "i-dropped i-active",
                                        addClass: "account-selector"
                                    })),
                                this._contentWrapper = this._container.find("div.content-wrapper"),
                                u = this._container.find(".js-page"),
                                l = this._container.find(".js-tab"),
                                this._pages.forEach(function(t, e) {
                                    u.eq(e).html(t.content),
                                        l.eq(e).html(t.header)
                                }),
                                d = this.tabs = Reflect.construct(p.Tabs, [this._container.find(".tv-tabs").get(0), this._container.find(".js-content").get(0)]),
                                d.tabChanged.subscribe(this, this._onPageChanged),
                                this.unbindContexMenu(),
                                this._dispatch = this.bindContextMenu(),
                                this._dispatchHeightHandler && (this._dispatchHeightHandler(),
                                    delete this._dispatchHeightHandler),
                                c = function(t) {
                                    h._container.find(".js-content").css("height", t - 78 + "px")
                                },
                                this._bridge.height.subscribe(c, {
                                    callWithLast: !0
                                }),
                                this._dispatchHeightHandler = function() {
                                    return h._bridge.height.unsubscribe(c)
                                }
                        }
                    }, {
                        key: "_onPageChanged",
                        value: function(t) {
                            this._attachFilter(),
                                this._trading.trackEvent("Bottom Panel", "Select " + this._pages[t].id + " page"),
                                this._updatePagesActiveStatuses()
                        }
                    }, {
                        key: "_updatePagesActiveStatuses",
                        value: function() {
                            var t, e = this.tabs.index();
                            for (t = 0; t < this._pages.length; t++)
                                this._pages[t].setActive(e === t)
                        }
                    }, {
                        key: "_detachFilter",
                        value: function() {
                            this._container.find(".js-secondary-tabs").children().addClass("js-hidden")
                        }
                    }, {
                        key: "_attachFilter",
                        value: function() {
                            var t, e;
                            this._detachFilter(),
                                this._topLines[this._currentPageIndex()] ? this._topLines[this._currentPageIndex()].removeClass("js-hidden") : this._currentPage().topline && (t = this._currentPage().topline,
                                    e = this._container.find(".js-secondary-tabs"),
                                    t.appendTo(e),
                                    this._topLines[this._currentPageIndex()] = t)
                        }
                    }, {
                        key: "_fullupdate",
                        value: function() {
                            this._pages.forEach(function(t) {
                                    return t.fullUpdate()
                                }),
                                this._updatePagesActiveStatuses()
                        }
                    }, {
                        key: "_unsubscribe",
                        value: function() {
                            this._pages.forEach(function(t) {
                                    return t.unsubscribeUpdates()
                                }),
                                this._info && this._info.account && this._info.account.unsubscribe(this._updateAccountIdBinded),
                                this.tabs && (this.tabs.tabChanged.unsubscribe(this, this._onPageChanged),
                                    this.tabs.stop()),
                                this._dispatchHeightHandler && (this._dispatchHeightHandler(),
                                    delete this._dispatchHeightHandler),
                                this._container.find(".js-secondary-tabs").empty(),
                                this._topLines = {}
                        }
                    }, {
                        key: "remove",
                        value: function() {
                            this.adapter.connectionStatusUpdate.unsubscribe(this, this._onStatusChange),
                                this._unsubscribe(),
                                this.unbindContexMenu(),
                                this._container.empty()
                        }
                    }, {
                        key: "bindContextMenu",
                        value: function() {
                            var t = this,
                                e = function(e) {
                                    e.preventDefault(),
                                        t._contextItems(e).then(function(t) {
                                            v.default.createMenu((0,
                                                E.convertActionDescriptionsToActions)(t)).show(e)
                                        })
                                };
                            return this._container.on("contextmenu", e),
                                this._container.off.bind(this._container, "contextmenu", e)
                        }
                    }, {
                        key: "unbindContexMenu",
                        value: function() {
                            this._dispatch && (this._dispatch(),
                                Reflect.deleteProperty(this, "_dispatch"))
                        }
                    }, {
                        key: "_getCurrentPrice",
                        value: function() {
                            function t(t) {
                                return e.apply(this, arguments)
                            }
                            var e = (0,
                                l.default)(o.default.mark(function t(e) {
                                var i, s, n;
                                return o.default.wrap(function(t) {
                                    for (;;)
                                        switch (t.prev = t.next) {
                                            case 0:
                                                return t.next = 2,
                                                    this._trading.realtimeProvider().lastQuotes(e);
                                            case 2:
                                                return i = t.sent,
                                                    s = i.bid,
                                                    n = i.ask,
                                                    t.abrupt("return", (n + s) / 2);
                                            case 6:
                                            case "end":
                                                return t.stop()
                                        }
                                }, t, this)
                            }));
                            return t
                        }()
                    }, {
                        key: "_currentPageIndex",
                        value: function() {
                            return this.tabs.index()
                        }
                    }, {
                        key: "_currentPage",
                        value: function() {
                            return this._pages[this._currentPageIndex()]
                        }
                    }, {
                        key: "_contextItems",
                        value: function() {
                            function t(t) {
                                return e.apply(this, arguments)
                            }
                            var e = (0,
                                l.default)(o.default.mark(function t(e) {
                                var i, s, n, r, u, l, d, c, h, f = this;
                                return o.default.wrap(function(t) {
                                    for (;;)
                                        switch (t.prev = t.next) {
                                            case 0:
                                                return i = "Bottom Panel Context Menu",
                                                    s = m.default.proSymbol.value(),
                                                    t.next = 4,
                                                    Promise.all([this._getCurrentPrice(s), this._trading.suggestedQty().value(s)]);
                                            case 4:
                                                if (n = t.sent,
                                                    r = (0,
                                                        a.default)(n, 2),
                                                    u = r[0],
                                                    l = r[1],
                                                    d = this._currentPage().contextItems(e), !this._info || !this._info.contextMenuActions) {
                                                    t.next = 13;
                                                    break
                                                }
                                                return t.next = 12,
                                                    this._info.contextMenuActions(e, d);
                                            case 12:
                                                return t.abrupt("return", t.sent);
                                            case 13:
                                                return c = {
                                                        separator: !0
                                                    },
                                                    d.length && d.push(c),
                                                    h = [{
                                                        text: $.t("Create New Order..."),
                                                        action: function() {
                                                            f._trading.trackEvent(i, "New Order"),
                                                                f._adapter.placeOrder({
                                                                    symbol: s,
                                                                    price: u,
                                                                    qty: l
                                                                })
                                                        }
                                                    }, c, {
                                                        text: $.t("Show Buy/Sell Panel"),
                                                        checkable: !0,
                                                        checked: this._adapter.host().floatingTradingPanelVisibility().value(),
                                                        action: function() {
                                                            var t = f._adapter.host().floatingTradingPanelVisibility().value();
                                                            f._trading.trackEvent(i, "Show Panel", t ? "Uncheck" : "Check"),
                                                                f._adapter.host().floatingTradingPanelVisibility().setValue(!t)
                                                        }
                                                    }, c, {
                                                        text: $.t("Trading properties..."),
                                                        action: function() {
                                                            f._trading.trackEvent(i, "Trading Properties"),
                                                                f._adapter.host().showTradingProperties()
                                                        }
                                                    }],
                                                    this._trading.availableBrokers().length > 1 && (h.push(c),
                                                        h.push({
                                                            text: $.t("Disconnect"),
                                                            action: function() {
                                                                f._trading.trackEvent(i, "Disconnect"),
                                                                    f._adapter.disconnect()
                                                            }
                                                        })),
                                                    t.abrupt("return", d.concat(h));
                                            case 18:
                                            case "end":
                                                return t.stop()
                                        }
                                }, t, this)
                            }));
                            return t
                        }()
                    }, {
                        key: "adapter",
                        get: function() {
                            return this._adapter
                        }
                    }, {
                        key: "pages",
                        get: function() {
                            var t = this,
                                e = this.adapter.metainfo().id,
                                i = this.adapter.accountManagerInfo(),
                                s = [{
                                    constructor: U.default,
                                    ctorArgument: {
                                        id: "Positions",
                                        source: this.adapter.positions.bind(this.adapter),
                                        closeFn: this.adapter.closePosition.bind(this.adapter),
                                        editFn: this.adapter.metainfo().configFlags.supportBrackets ? this.adapter.editPositionBrackets.bind(this.adapter) : null,
                                        reverseFn: this.adapter.metainfo().configFlags.supportReversePosition ? this.adapter.reversePosition.bind(this.adapter) : null,
                                        metainfo: {
                                            name: $.t("Positions"),
                                            columns: i.positionColumns,
                                            headerCounter: !0,
                                            options: {
                                                id: e + ".positions",
                                                className: "positions",
                                                idProperty: "id"
                                            }
                                        },
                                        formatters: i.customFormatters || [],
                                        priceFormatterFn: this.priceFormatter.bind(this),
                                        subscriptions: {
                                            fullUpdateDelegate: this.adapter.fullUpdate,
                                            rowUpdateDelegate: new P.default([this.adapter.positionPartialUpdate, this.adapter.positionUpdate]),
                                            linking: m.default.proSymbol,
                                            plSubscription: this.adapter.subscribePL.bind(this.adapter)
                                        }
                                    }
                                }, {
                                    constructor: k.default,
                                    ctorArgument: {
                                        id: "Orders",
                                        source: this.adapter.orders.bind(this.adapter),
                                        cancelFn: this.adapter.cancelOrder.bind(this.adapter),
                                        modifyFn: this.adapter.modifyOrder.bind(this.adapter),
                                        metainfo: {
                                            name: $.t("Orders"),
                                            columns: i.orderColumns,
                                            headerCounter: !0,
                                            options: {
                                                id: e + ".orders",
                                                className: "orders",
                                                idProperty: "id"
                                            }
                                        },
                                        formatters: i.customFormatters || [],
                                        priceFormatterFn: this.priceFormatter.bind(this),
                                        subscriptions: {
                                            fullUpdateDelegate: this.adapter.fullUpdate,
                                            rowUpdateDelegate: new P.default([this.adapter.orderPartialUpdate, this.adapter.orderUpdate]),
                                            orderUpdateDelegate: this.adapter.orderUpdate,
                                            linking: m.default.proSymbol
                                        },
                                        possibleOrderStatuses: I.filter(function(t) {
                                            return !i.possibleOrderStatuses || -1 !== i.possibleOrderStatuses.indexOf(t)
                                        }),
                                        filter: i.hasHistory ? function(t) {
                                            return !!t.updateTime
                                        } : function() {
                                            return !0
                                        },
                                        highlightChanges: !0
                                    }
                                }];
                            return i.hasHistory && s.push({
                                    constructor: F.default,
                                    ctorArgument: {
                                        id: "History",
                                        source: this.adapter.orders.bind(this.adapter),
                                        cancelFn: this.adapter.cancelOrder.bind(this.adapter),
                                        modifyFn: this.adapter.modifyOrder.bind(this.adapter),
                                        metainfo: {
                                            name: $.t("History"),
                                            columns: i.orderColumns.filter(function(t) {
                                                return "updateTime" !== t.property
                                            }),
                                            headerCounter: !0,
                                            options: {
                                                id: e + ".history",
                                                className: "orders",
                                                idProperty: "id"
                                            }
                                        },
                                        formatters: i.customFormatters || [],
                                        priceFormatterFn: this.priceFormatter.bind(this),
                                        subscriptions: {
                                            fullUpdateDelegate: this.adapter.fullUpdate,
                                            rowUpdateDelegate: new P.default([this.adapter.orderPartialUpdate, this.adapter.orderUpdate]),
                                            orderUpdateDelegate: this.adapter.orderUpdate,
                                            linking: m.default.proSymbol
                                        },
                                        possibleOrderStatuses: B.filter(function(t) {
                                            return !i.possibleOrderStatuses || -1 !== i.possibleOrderStatuses.indexOf(t)
                                        }),
                                        filter: function() {
                                            return !0
                                        },
                                        highlightChanges: !1
                                    }
                                }),
                                i.pages && i.pages.forEach(function(n) {
                                    var a = [];
                                    n.tables.forEach(function(s) {
                                            a.push({
                                                constructor: y.default,
                                                ctorArgument: {
                                                    source: (0,
                                                        E.wrapDeferredWithPromise)(s.getData),
                                                    metainfo: {
                                                        name: s.name || "",
                                                        headerCounter: !1,
                                                        columns: s.columns,
                                                        options: {
                                                            id: e + "." + n.id + "." + s.id,
                                                            className: "balances",
                                                            idProperty: "id"
                                                        }
                                                    },
                                                    formatters: i.customFormatters || [],
                                                    priceFormatterFn: t.priceFormatter.bind(t),
                                                    subscriptions: {
                                                        fullUpdateDelegate: t.adapter.fullUpdate,
                                                        rowUpdateDelegate: s.changeDelegate
                                                    }
                                                }
                                            })
                                        }),
                                        s.push({
                                            constructor: C.default,
                                            ctorArgument: {
                                                id: n.id,
                                                title: n.title,
                                                tables: a
                                            }
                                        })
                                }),
                                s
                        }
                    }]),
                    t
            }(),
            e.default = H,
            t.exports = e.default
    },
    562: function(t, e) {},
    569: function(t, e, i) {
        "use strict";

        function s(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        var n, a, r, o, u, l, d, c, h, f;
        Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            n = i(117),
            a = s(n),
            r = i(122),
            o = s(r),
            u = i(158),
            l = s(u),
            d = i(570),
            c = s(d),
            h = i(572),
            f = function(t) {
                function e(t) {
                    (0,
                        a.default)(this, e);
                    var i = (0,
                        o.default)(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t));
                    return i.addFormatters(h.formatters.concat(t.formatters || [])),
                        i
                }
                return (0,
                        l.default)(e, t),
                    e
            }(c.default),
            e.default = f,
            t.exports = e.default
    },
    570: function(t, e, i) {
        "use strict";

        function s(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        var n, a, r, o, u, l, d, c, h, f, p;
        Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            n = i(468),
            a = s(n),
            r = i(472),
            o = s(r),
            u = i(117),
            l = s(u),
            d = i(118),
            c = s(d),
            h = i(571),
            f = s(h),
            p = function() {
                function t(e) {
                    (0,
                        l.default)(this, t),
                    this._subscriptions = e.subscriptions,
                        this._content = $("<div>"),
                        this._table = new f.default(this._content, e.metainfo.columns, e.metainfo.options, e.priceFormatterFn),
                        this._source = e.source;
                    var i = e.metainfo.headerCounter ? '<div class="counter"><div class="counter__text">' + e.metainfo.name + '</div><div class="counter__count">0</div></div>' : "<span>" + e.metainfo.name + "</span>";
                    this._$header = $(i),
                        this._name = e.metainfo.name,
                        this._id = e.id,
                        this.$countHtml = this._$header.find(".counter__count"),
                        this._active = !1,
                        this._created = !1
                }
                return (0,
                        c.default)(t, [{
                        key: "setActive",
                        value: function(t) {
                            this._active !== t && (this._active = t,
                                this._active && !this._created && this.fullUpdate())
                        }
                    }, {
                        key: "subscribeUpdates",
                        value: function() {
                            if (this._full)
                                throw Error("should unsubscribe first");
                            this._full = this._subscriptions.fullUpdateDelegate,
                                this._full.subscribe(this, this.fullUpdate),
                                this._partial = this._subscriptions.rowUpdateDelegate,
                                this._partial.subscribe(this, this.update),
                                this._subscriptions.rowDeleteDelegate && (this._delete = this._subscriptions.rowDeleteDelegate,
                                    this._delete.subscribe(this, this.deleteRow))
                        }
                    }, {
                        key: "unsubscribeUpdates",
                        value: function() {
                            this._full && (this._full.unsubscribe(this, this.fullUpdate),
                                    delete this._full),
                                this._partial && (this._partial.unsubscribe(this, this.update),
                                    delete this._partial),
                                this._delete && (this._delete.unsubscribe(this, this.deleteRow),
                                    delete this._delete)
                        }
                    }, {
                        key: "update",
                        value: function(t) {
                            var e = this,
                                i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                                s = i.silent,
                                n = void 0 !== s && s;
                            this._created && (this._table.addRow(t, n ? void 0 : function(t) {
                                    return e.onUpdate(t)
                                }),
                                this.count())
                        }
                    }, {
                        key: "deleteRow",
                        value: function(t) {
                            this._created && (this._table.deleteRow(t),
                                this.count())
                        }
                    }, {
                        key: "fullUpdate",
                        value: function() {
                            function t() {
                                return e.apply(this, arguments)
                            }
                            var e = (0,
                                o.default)(a.default.mark(function t() {
                                var e, i = this;
                                return a.default.wrap(function(t) {
                                    for (;;)
                                        switch (t.prev = t.next) {
                                            case 0:
                                                if (this.deleteRows(),
                                                    this._active) {
                                                    t.next = 4;
                                                    break
                                                }
                                                return this._created = !1,
                                                    t.abrupt("return");
                                            case 4:
                                                return t.next = 6,
                                                    this._source();
                                            case 6:
                                                e = t.sent,
                                                    this._table.addRows(e, function(t) {
                                                        return i.onUpdate(t)
                                                    }),
                                                    this.count(),
                                                    this._created = !0;
                                            case 10:
                                            case "end":
                                                return t.stop()
                                        }
                                }, t, this)
                            }));
                            return t
                        }()
                    }, {
                        key: "deleteRows",
                        value: function() {
                            this._table.deleteRows()
                        }
                    }, {
                        key: "deleteRow",
                        value: function(t) {
                            this._table.deleteRow(t)
                        }
                    }, {
                        key: "count",
                        value: function() {
                            this.$countHtml.text(this.data.length)
                        }
                    }, {
                        key: "addFormatters",
                        value: function(t) {
                            this._table.addFormatters(t)
                        }
                    }, {
                        key: "rowElementById",
                        value: function(t) {
                            return this._table.rowElementById(t)
                        }
                    }, {
                        key: "onUpdate",
                        value: function() {}
                    }, {
                        key: "contextItems",
                        value: function() {
                            return []
                        }
                    }, {
                        key: "setColumnVisible",
                        value: function(t, e) {
                            this._table.setColumnVisible(t, e)
                        }
                    }, {
                        key: "highlightRow",
                        value: function(t) {
                            this._table.highlightRowById(t)
                        }
                    }, {
                        key: "data",
                        get: function() {
                            return this._table.getRows()
                        }
                    }, {
                        key: "header",
                        get: function() {
                            return this._$header
                        }
                    }, {
                        key: "content",
                        get: function() {
                            return this._content
                        }
                    }, {
                        key: "name",
                        get: function() {
                            return this._name
                        }
                    }, {
                        key: "id",
                        get: function() {
                            return this._id || this._name
                        }
                    }]),
                    t
            }(),
            e.default = p,
            t.exports = e.default
    },
    571: function(t, e, i) {
        (function(s, n) {
            "use strict";

            function a(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            var r, o, u, l, d, c, h, f, p, _;
            Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                r = i(123),
                o = a(r),
                u = i(117),
                l = a(u),
                d = i(118),
                c = a(d),
                h = i(185),
                f = a(h),
                p = i(210),
                _ = function() {
                    function t(e, i, n, a) {
                        var r, o;
                        (0,
                            l.default)(this, t),
                        r = this,
                            n = n || {},
                            this.container = e,
                            this.priceFormatterFn = a,
                            this.columns = i,
                            this.data = [],
                            this.idx = TVSettings.getInt(n.id + ".sort.idx", n.idx || 0),
                            this.asc = TVSettings.getBool(n.id + ".sort.asc", n.asc || !1),
                            this.formatters = {},
                            this._group = n.group,
                            this._defaultPriceFormatter = new p.PriceFormatter,
                            this._columnsVisibility = {},
                            this.idProperty = n.idProperty || i[0].property,
                            o = s.render(f.default.tvDataTable, {
                                columns: i,
                                className: "tv-data-table--trading-cqg " + n.className,
                                bodys: [{
                                    className: ""
                                }]
                            }),
                            $(o).appendTo(e),
                            this.head = n.className ? $(e).find("." + n.className + " thead") : $(e).find("thead"),
                            this.body = n.className ? $(e).find("." + n.className + " tbody") : $(e).find("tbody"),
                            i.forEach(function(t, e) {
                                var i = r.head.find("tr").children()[e];
                                $(i).find(".tv-data-table__sortable").on("click", function(t) {
                                    t.preventDefault(),
                                        r.head.find(".tv-data-table__sortable--asc, .tv-data-table__sortable--desc").removeClass("tv-data-table__sortable--asc tv-data-table__sortable--desc"),
                                        r.idx === e ? r.asc = !r.asc : (r.idx = e,
                                            r.asc = !1),
                                        $(this).addClass(r.asc ? "tv-data-table__sortable--asc" : "tv-data-table__sortable--desc"),
                                        TVSettings.setValue(n.id + ".sort.idx", r.idx),
                                        TVSettings.setValue(n.id + ".sort.asc", r.asc),
                                        r._sortViewImpl()
                                })
                            }, this),
                            this.head.find("th:eq(" + this.idx + ") .tv-data-table__sortable").addClass(r.asc ? "tv-data-table__sortable--asc" : "tv-data-table__sortable--desc"),
                            this._sortTimeout = null
                    }
                    return (0,
                            c.default)(t, [{
                            key: "defFormatter",
                            value: function(t) {
                                return t.value
                            }
                        }, {
                            key: "addRow",
                            value: function(t, e) {
                                var i, a, r, u, l, d = this,
                                    c = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2],
                                    h = this.data.filter(function(e) {
                                        return e[this.idProperty] === t[this.idProperty]
                                    }, this)[0];
                                if (h)
                                    return this.updateRow(h, t, e);
                                if (t = t.copy ? t.copy() : n.extend({}, t),
                                    c)
                                    for (r = this.data.length; r--;)
                                        - 1 === this._compare(t, this.data[r]) && (i = this.data[r],
                                            a = r);
                                u = s.render(f.default.tvDataTableRow, {}),
                                    t.$row = $(u),
                                    void 0 === t.priceFormatter && this._resolveFormatter(t),
                                    l = t.priceFormatter || this._defaultPriceFormatter,
                                    this.columns.forEach(function(e) {
                                        var i, n, a, r = $(s.render(f.default.tvDataTableCell, {
                                            contain: ""
                                        }));
                                        r[0].className += " " + e.className,
                                            i = d.formatters[e.formatter] ? d.formatters[e.formatter] : d.defFormatter,
                                            n = e.property ? t[e.property] : t,
                                            a = i({
                                                value: n,
                                                priceFormatter: l,
                                                row: t,
                                                $container: r
                                            }),
                                            e.fixedWidth && (a = $('<span class="js-fixed inlined">').append(a)),
                                            "object" === (void 0 === a ? "undefined" : (0,
                                                o.default)(a)) ? d._append(r, a) : r.append(a),
                                            d._append(t.$row, r)
                                    }, this),
                                    this._hideHiddenColumns(t.$row),
                                    i ? (this.data.splice(a, 0, t),
                                        t.$row.insertBefore(i.$row)) : (this.data.push(t),
                                        t.$row.appendTo(this.body)),
                                    "function" == typeof e && e(t)
                            }
                        }, {
                            key: "_append",
                            value: function(t, e) {
                                t[0].appendChild(e[0])
                            }
                        }, {
                            key: "_resolveFormatter",
                            value: function(t) {
                                var e = this;
                                this.priceFormatterFn && this.priceFormatterFn(t).then(function(i) {
                                    var s = e.data.filter(function(e) {
                                        return e[this.idProperty] === t[this.idProperty]
                                    }, e)[0];
                                    s && (s.priceFormatter = i,
                                        e.updateRow(s, $.extend({}, s), null, !0))
                                })
                            }
                        }, {
                            key: "addRows",
                            value: function(t, e) {
                                var i = this;
                                t.forEach(function(t) {
                                        return i.addRow(t, e, !1)
                                    }),
                                    this._sortViewImpl()
                            }
                        }, {
                            key: "deleteRow",
                            value: function(t) {
                                var e = this.data.filter(function(e) {
                                    return e[this.idProperty] === t[this.idProperty]
                                }, this)[0];
                                e && (e.$row.remove(),
                                    this.data.splice(this.data.indexOf(e), 1))
                            }
                        }, {
                            key: "_removeAllChildren",
                            value: function(t) {
                                for (; t.firstChild;)
                                    t.removeChild(t.firstChild)
                            }
                        }, {
                            key: "deleteRows",
                            value: function() {
                                this._removeAllChildren(this.body[0]),
                                    this.data = []
                            }
                        }, {
                            key: "updateRow",
                            value: function(t, e, i) {
                                var a, r, u, l = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
                                if (!t)
                                    throw Error("row not exist");
                                a = !!this._group && this._group(t) !== this._group(e),
                                    r = t.priceFormatter || this._defaultPriceFormatter,
                                    u = $.extend({}, t),
                                    this.columns.forEach(function(i, n) {
                                        var d, c, h, p, _, v, b = i.modificationProperty || i.property;
                                        (l || b && u[b] !== e[b]) && (n === this.idx && (a = !0),
                                            d = t[b],
                                            t[b] = e[b],
                                            c = t.$row.find("td:eq(" + n + ")"),
                                            h = this.formatters[i.formatter] ? this.formatters[i.formatter] : this.defFormatter,
                                            p = i.property ? t[i.property] : t,
                                            _ = $(s.render(f.default.tvDataTableCell, {
                                                contain: ""
                                            })),
                                            _[0].className += " " + i.className,
                                            v = h({
                                                value: p,
                                                priceFormatter: r,
                                                row: e,
                                                prevValue: i.highlightDiff ? d : null,
                                                $container: _
                                            }),
                                            i.fixedWidth && (v = $("<span>").addClass("js-fixedwidth").css("display", "inline-block").css("min-width", c.find(".js-fixedwidth").width()).append(v)),
                                            "object" === (void 0 === v ? "undefined" : (0,
                                                o.default)(v)) && 1 === v.length ? this._append(_, v) : _.append(v),
                                            _.insertBefore(c),
                                            c.remove())
                                    }, this),
                                    this._hideHiddenColumns(t.$row),
                                    a && this._sortView(),
                                    delete e.$row,
                                    t = n.extend(t, e),
                                    "function" == typeof i && i(t)
                            }
                        }, {
                            key: "rowElementById",
                            value: function(t) {
                                var e = this.data.filter(function(e) {
                                    return e[this.idProperty] === t
                                }, this)[0];
                                return e && e.$row
                            }
                        }, {
                            key: "highlightRowById",
                            value: function(t) {
                                var e = this.rowElementById(t);
                                e && e.highlight(2)
                            }
                        }, {
                            key: "getRows",
                            value: function() {
                                return this.data
                            }
                        }, {
                            key: "setColumnVisible",
                            value: function(t, e) {
                                this.head.find("th:nth-child(" + (t + 1) + ")").toggleClass("js-hidden", !e),
                                    this.body.find("td:nth-child(" + (t + 1) + ")").toggleClass("js-hidden", !e),
                                    this._columnsVisibility[t] = e
                            }
                        }, {
                            key: "_hideHiddenColumns",
                            value: function(t) {
                                var e, i;
                                for (e in this._columnsVisibility)
                                    i = +e, !1 === this._columnsVisibility[e] && t.find("td:nth-child(" + (i + 1) + ")").toggleClass("js-hidden", !0)
                            }
                        }, {
                            key: "addFormatter",
                            value: function(t, e) {
                                this.formatters[t] = e
                            }
                        }, {
                            key: "addFormatters",
                            value: function(t) {
                                t.forEach(function(t) {
                                    this.addFormatter(t.name, t.format)
                                }, this)
                            }
                        }, {
                            key: "_compare",
                            value: function(t, e) {
                                var i, s, n = this.columns[this.idx].sortProp || this.columns[this.idx].property,
                                    a = t[n] || "",
                                    r = e[n] || "",
                                    o = 0;
                                return this._group && "function" == typeof this._group && (i = this._group(t),
                                        s = this._group(e),
                                        o = i < s ? 1 : i > s ? -1 : 0),
                                    o || (o = t.isTotalRow ? 1 : e.isTotalRow ? -1 : 0),
                                    o || (o = a < r ? 1 : a > r ? -1 : 0,
                                        this.asc && (o = -o)),
                                    o || (n = this.columns[0].sortProp || this.columns[0].property,
                                        a = t[n] || "",
                                        r = e[n] || "",
                                        o = a < r ? 1 : a > r ? -1 : 0),
                                    o
                            }
                        }, {
                            key: "_sortViewImpl",
                            value: function() {
                                var t, e, i;
                                for (this.data.sort(this._compare.bind(this)),
                                    t = null,
                                    e = this.data.length; e--;)
                                    i = this.data[e].$row[0],
                                    t && t.parentNode.insertBefore(i, t),
                                    t = i
                            }
                        }, {
                            key: "_sortView",
                            value: function() {
                                if (!this._sortTimeout) {
                                    var t = this;
                                    this._sortTimeout = setTimeout(function() {
                                        t._sortViewImpl(),
                                            t._sortTimeout = null
                                    }, 1e3)
                                }
                            }
                        }]),
                        t
                }(),
                e.default = _,
                t.exports = e.default
        }).call(e, i(72), i(64))
    },
    572: function(t, e, i) {
        "use strict";

        function s(t, e, i) {
            var s = {
                textPrevPrice: i ? d.default(t.format(i)) : "",
                textPrice: e ? d.default(t.format(e)) : ""
            };
            return _.isNumber(e) && _.isNumber(i) && (s.elem = f.PriceColorer.domDifference(s.textPrice, s.textPrevPrice, e - i, "tv-data-table__red-text", "tv-data-table__green-text")),
                s
        }

        function n(t, i) {
            var s, n, a;
            for (void 0 === i && (i = o),
                s = 0,
                n = e.formatters; s < n.length; s++)
                if (a = n[s],
                    a.name === t)
                    return a;
            return i
        }
        var a, r, o, u, l = i(383),
            d = i(517),
            c = i(450),
            h = i(208),
            f = i(573),
            p = i(382),
            _ = i(50);
        i(574),
            a = new h.DateTimeFormatter,
            u = {},
            u[l.ORDERSTATUS.INACTIVE] = "tv-data-table__grey-text",
            u[l.ORDERSTATUS.WORKING] = "tv-data-table__blue-text",
            u[l.ORDERSTATUS.REJECTED] = "tv-data-table__red-text",
            u[l.ORDERSTATUS.FILLED] = "tv-data-table__green-text",
            u[l.ORDERSTATUS.CANCELED] = "tv-data-table__red-green-text",
            r = u,
            o = {
                name: "default",
                format: function(t) {
                    return t.value + ""
                }
            },
            e.formatters = [{
                name: "symbol",
                format: function(t) {
                    var e = t.value,
                        i = t.row;
                    return t.$container.on("click", function() {
                            return c.symbol.setValue(i.symbol)
                        }),
                        e
                }
            }, {
                name: "side",
                format: function(t) {
                    var e = t.value,
                        i = t.$container,
                        s = p.sideToText(e);
                    return e === l.SIDE.BUY ? i.addClass("tv-data-table__blue-text") : i.addClass("tv-data-table__light-red-text"),
                        s
                }
            }, {
                name: "type",
                format: function(t) {
                    var e = t.value;
                    return p.orderTypeToText(e)
                }
            }, {
                name: "formatPrice",
                format: function(t) {
                    var e = t.value,
                        i = t.priceFormatter,
                        n = t.prevValue,
                        a = s(i, e, n);
                    return a.elem || a.textPrice
                }
            }, {
                name: "formatPriceForexSup",
                format: function(t) {
                    var e = t.value,
                        i = t.priceFormatter,
                        n = t.prevValue,
                        a = s(i, e, n);
                    return a.elem && i.hasForexAdditionalPrecision() && a.elem.last().lastCharSup(),
                        a.elem || a.textPrice
                }
            }, {
                name: "status",
                format: function(t) {
                    var e = t.value,
                        i = t.$container,
                        s = p.orderStatusToText(e),
                        n = r[e];
                    return n && i.addClass(n),
                        s
                }
            }, {
                name: "date",
                format: function(t) {
                    var e = t.value;
                    return e ? a.format(new Date(e)) : ""
                }
            }, {
                name: "localDate",
                format: function(t) {
                    var e = t.value;
                    return e ? a.formatLocal(new Date(e)) : ""
                }
            }, {
                name: "fixed",
                format: function(t) {
                    var e = t.value;
                    return Math.abs(e || 0) < .001 ? "0.00" : d.default((e || 0).toFixed(2))
                }
            }, {
                name: "profit",
                format: function(t) {
                    var e = t.value,
                        i = t.$container,
                        s = e && Math.round(100 * e) / 100,
                        n = s > 0 ? "+" : "",
                        a = s < 0 ? "tv-data-table__red-text" : "tv-data-table__green-text";
                    return i.addClass(a),
                        n + d.default((s || 0).toFixed(2))
                }
            }],
            e.tableFormatterByName = n
    },
    574: function(t, e) {
        "use strict";
        $.fn.lastCharSup = function() {
                function t(e) {
                    var i, s;
                    if (3 === e.nodeType && e.data.trim())
                        return e;
                    if (e.childNodes)
                        for (i = e.childNodes.length; i--;)
                            if (s = t(e.childNodes[i]))
                                return s;
                    return null
                }
                var e, i, s, n, a;
                for (e = 0; e < this.size(); e++)
                    if (i = t(this.get(e)),
                        s = i.data,
                        i) {
                        if (i.parentNode && i.parentNode.tagName && "sup" === i.parentNode.tagName.toLowerCase())
                            continue;
                        n = /^([^]*)(\S)(\s*)$/.exec(s),
                            n && (i.data = n[1],
                                a = $(document.createElement("sup")).text(n[2]).insertAfter(i),
                                n[3] && $(document.createTextNode(n[3])).insertAfter(a))
                    }
                return this
            },
            t.exports = $
    },
    575: function(t, e, i) {
        "use strict";

        function s(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        var n, a, r, o, u;
        Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            n = i(117),
            a = s(n),
            r = i(118),
            o = s(r),
            u = function() {
                function t(e) {
                    var i, s = this;
                    (0,
                        a.default)(this, t),
                    this._id = e.id,
                        i = "<span>" + e.title + "</span>",
                        this._header = $(i),
                        this._content = $("<div>"),
                        this._pages = e.tables.map(function(t) {
                            var e = Reflect.construct(t.constructor, [t.ctorArgument]);
                            return e.subscribeUpdates(),
                                e
                        }),
                        this._pages.forEach(function(t) {
                            t.name.length && $('<h3 class="tv-data-table__header">').text(t.name).appendTo(s._content),
                                t.content.appendTo(s._content)
                        })
                }
                return (0,
                        o.default)(t, [{
                        key: "setActive",
                        value: function(t) {
                            this._pages.forEach(function(e) {
                                return e.setActive(t)
                            })
                        }
                    }, {
                        key: "fullUpdate",
                        value: function() {
                            this._pages.forEach(function(t) {
                                return t.fullUpdate()
                            })
                        }
                    }, {
                        key: "unsubscribeUpdates",
                        value: function() {
                            this._pages.forEach(function(t) {
                                return t.unsubscribeUpdates()
                            })
                        }
                    }, {
                        key: "contextItems",
                        value: function() {
                            return []
                        }
                    }, {
                        key: "header",
                        get: function() {
                            return this._header
                        }
                    }, {
                        key: "content",
                        get: function() {
                            return this._content
                        }
                    }, {
                        key: "id",
                        get: function() {
                            return this._id
                        }
                    }]),
                    t
            }(),
            e.default = u,
            t.exports = e.default
    },
    576: function(t, e, i) {
        (function(s) {
            "use strict";

            function n(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            var a, r, o, u, l, d, c, h, f, p, _, v, b, m, g, y, w, C, S, k, O, F, x, U, D, P, R, E, T, A, N;
            Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                a = i(495),
                r = n(a),
                o = i(122),
                u = n(o),
                l = i(158),
                d = n(l),
                c = i(117),
                h = n(c),
                f = i(118),
                p = n(f),
                _ = i(577),
                v = n(_),
                b = i(572),
                m = i(578),
                g = n(m),
                y = i(393),
                w = i(383),
                C = i(382),
                S = i(563),
                k = i(56),
                O = n(k),
                F = i(390),
                x = n(F),
                U = 0,
                D = -1,
                P = function() {
                    function t(e, i, s, n) {
                        (0,
                            h.default)(this, t),
                        this._source = e,
                            this._totalCount = 0,
                            this._activeCount = 0,
                            this._orderUpdateDelegate = i,
                            this._fullUpdateDelegate = s,
                            this._possibleStatuses = n,
                            this._statusCount = this._emptyStatuses(),
                            this.countChanged = new O.default
                    }
                    return (0,
                            p.default)(t, [{
                            key: "_emptyStatuses",
                            value: function() {
                                var t = {};
                                return this._possibleStatuses.forEach(function(e) {
                                        t[e] = 0
                                    }),
                                    t
                            }
                        }, {
                            key: "start",
                            value: function() {
                                this._orderUpdateDelegate.subscribe(this, this._recalcCounts),
                                    this._fullUpdateDelegate.subscribe(this, this._recalcCounts),
                                    this._recalcCounts()
                            }
                        }, {
                            key: "stop",
                            value: function() {
                                this._statusCount = this._emptyStatuses(),
                                    this._orderUpdateDelegate.unsubscribe(this, this._recalcCounts),
                                    this._fullUpdateDelegate.unsubscribe(this, this._recalcCounts)
                            }
                        }, {
                            key: "_recalcCounts",
                            value: function() {
                                var t = this,
                                    e = this._emptyStatuses();
                                this._source().then(function(i) {
                                    var s = 0;
                                    i.forEach(function(t) {
                                            e[t.status]++,
                                                t.status !== w.ORDERSTATUS.WORKING && t.status !== w.ORDERSTATUS.INACTIVE || s++
                                        }),
                                        t._possibleStatuses.forEach(function(i) {
                                            e[i] !== t._statusCount[i] && (t._statusCount[i] = e[i],
                                                t.countChanged.fire(i, t._statusCount[i]))
                                        }),
                                        t._totalCount !== i.length && (t._totalCount = i.length,
                                            t.countChanged.fire(U, t._totalCount)),
                                        t._activeCount !== s && (t._activeCount = s,
                                            t.countChanged.fire(D, t._activeCount))
                                })
                            }
                        }]),
                        t
                }(),
                R = function() {
                    function t(e, i, s, n) {
                        (0,
                            h.default)(this, t),
                        this.filterRowUpdateDelegate = new O.default,
                            this.filterRowDeleteDelegate = new O.default,
                            this.filterFullUpdateDelegate = new O.default,
                            this._source = e,
                            this._rowUpdateDelegate = i,
                            this._rowDeleteDelegate = s,
                            this._fullUpdateDelegate = n,
                            this._filteredOrders = [],
                            this._requestsCount = 0,
                            this._started = !1
                    }
                    return (0,
                            p.default)(t, [{
                            key: "start",
                            value: function() {
                                var t = this;
                                this._requestsCount++,
                                    this._ordersRequest = (this._ordersRequest || Promise.resolve()).then(function() {
                                        return t._source()
                                    }).then(function(e) {
                                        return e.filter(function(e) {
                                            return t.satisfy(e)
                                        })
                                    }).then(function(e) {
                                        return t._requestsCount--,
                                            t._requestsCount || (t.stop(),
                                                t._filteredOrders = e,
                                                t._ordersRequest = null,
                                                t._rowUpdateDelegate.subscribe(t, t._onRowUpdated),
                                                t._rowDeleteDelegate && t._rowDeleteDelegate.subscribe(t, t._onRowDeleted),
                                                t._fullUpdateDelegate.subscribe(t, t._onFullUpdate),
                                                t._started = !0),
                                            e.slice(0)
                                    })
                            }
                        }, {
                            key: "stop",
                            value: function() {
                                this._rowUpdateDelegate.unsubscribe(this, this._onRowUpdated),
                                    this._fullUpdateDelegate.unsubscribe(this, this._onFullUpdate),
                                    this._rowDeleteDelegate && this._rowDeleteDelegate.unsubscribe(this, this._onRowDeleted),
                                    this._filteredOrders = [],
                                    this._started = !1
                            }
                        }, {
                            key: "isStarted",
                            value: function() {
                                return this._started
                            }
                        }, {
                            key: "filterSource",
                            value: function() {
                                return this._ordersRequest ? this._ordersRequest : Promise.resolve(this._filteredOrders.slice(0))
                            }
                        }, {
                            key: "satisfy",
                            value: function(t) {
                                throw Error("should be implemented")
                            }
                        }, {
                            key: "_onFullUpdate",
                            value: function() {
                                this.stop(),
                                    this.start(),
                                    this.filterFullUpdateDelegate.fire()
                            }
                        }, {
                            key: "_onRowDeleted",
                            value: function(t) {
                                var e = this._filteredOrders.find(function(e) {
                                    return e.id === t.id
                                });
                                e && this.filterRowDeleteDelegate.fire(e)
                            }
                        }, {
                            key: "_onRowUpdated",
                            value: function(t) {
                                var e = this._filteredOrders.find(function(e) {
                                        return e.id === t.id
                                    }),
                                    i = e ? this._filteredOrders.indexOf(e) : -1;
                                this.satisfy(t) ? (e ? this._filteredOrders[i] = t : this._filteredOrders.push(t),
                                    this.filterRowUpdateDelegate.fire(t)) : e && (this.filterRowDeleteDelegate.fire(e),
                                    this._filteredOrders.splice(i, 1))
                            }
                        }]),
                        t
                }(),
                E = function(t) {
                    function e(t, i, s, n) {
                        (0,
                            h.default)(this, e);
                        var a = (0,
                            u.default)(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, i, s, n));
                        return a._filterStatus = null,
                            a
                    }
                    return (0,
                            d.default)(e, t),
                        (0,
                            p.default)(e, [{
                            key: "setFilterStatus",
                            value: function(t) {
                                this._filterStatus = t,
                                    this.isStarted() && (this.stop(),
                                        this.start())
                            }
                        }, {
                            key: "filterStatus",
                            value: function() {
                                return this._filterStatus
                            }
                        }, {
                            key: "satisfy",
                            value: function(t) {
                                return !this._filterStatus || t.status === this._filterStatus
                            }
                        }]),
                        e
                }(R),
                T = function(t) {
                    function e(t, i, s, n, a) {
                        (0,
                            h.default)(this, e);
                        var r = (0,
                            u.default)(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, i, s, n));
                        return r._functor = a,
                            r
                    }
                    return (0,
                            d.default)(e, t),
                        (0,
                            p.default)(e, [{
                            key: "satisfy",
                            value: function(t) {
                                return this._functor(t)
                            }
                        }]),
                        e
                }(R),
                A = function() {
                    function t(e, i, s) {
                        (0,
                            h.default)(this, t),
                        this._source = e,
                            this._rowUpdateDelegate = i,
                            this._fullUpdateDelegate = s,
                            this._orders = [],
                            this.newStatusDelegate = new O.default
                    }
                    return (0,
                            p.default)(t, [{
                            key: "start",
                            value: function() {
                                var t = this;
                                this._source().then(function(e) {
                                    t._orders = e.slice(0),
                                        t._rowUpdateDelegate.subscribe(t, t._onRowUpdated),
                                        t._fullUpdateDelegate.subscribe(t, t._onFullUpdate)
                                })
                            }
                        }, {
                            key: "stop",
                            value: function() {
                                this._fullUpdateDelegate.unsubscribe(this, this._onFullUpdate),
                                    this._rowUpdateDelegate.unsubscribe(this, this._onRowUpdated),
                                    this._orders = []
                            }
                        }, {
                            key: "_onFullUpdate",
                            value: function() {
                                this.stop(),
                                    this.start()
                            }
                        }, {
                            key: "_onRowUpdated",
                            value: function(t) {
                                var e = this._orders.find(function(e) {
                                    return e.id === t.id
                                });
                                e && e.status === t.status || (this.newStatusDelegate.fire(t),
                                    e ? e.status = t.status : this._orders.push($.extend({}, t)))
                            }
                        }]),
                        t
                }(),
                N = function(t) {
                    function e(t) {
                        var i, n, a, r, o, l, d, c, f, p;
                        return (0,
                                h.default)(this, e),
                            i = t.formatters || [],
                            Object.assign(t.metainfo.options, {
                                group: function(t) {
                                    return +(0,
                                        C.isOrderActive)(t.status)
                                },
                                idProperty: "id"
                            }),
                            n = new T(t.source, t.subscriptions.rowUpdateDelegate, null, t.subscriptions.fullUpdateDelegate, t.filter),
                            a = new P(n.filterSource.bind(n), n.filterRowUpdateDelegate, n.filterFullUpdateDelegate, t.possibleOrderStatuses),
                            r = new E(n.filterSource.bind(n), n.filterRowUpdateDelegate, n.filterRowDeleteDelegate, n.filterFullUpdateDelegate),
                            t.source = r.filterSource.bind(r),
                            t.subscriptions.rowUpdateDelegate = r.filterRowUpdateDelegate,
                            t.subscriptions.rowDeleteDelegate = r.filterRowDeleteDelegate,
                            t.subscriptions.fullUpdateDelegate = r.filterFullUpdateDelegate,
                            o = (0,
                                u.default)(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t)),
                            o._statusWatcher = new A(n.filterSource.bind(n), n.filterRowUpdateDelegate, n.filterFullUpdateDelegate),
                            o._orderPreFilter = n,
                            o._ordersFilter = r,
                            o._statusesCount = a,
                            o._activeCount = 0,
                            o._highlightChanges = t.highlightChanges,
                            o._subscriptions = t.subscriptions,
                            o._possibleOrderStatuses = t.possibleOrderStatuses,
                            o._pendingNewOrdersByStatuses = {},
                            l = "Orders Page",
                            d = (0,
                                y.tradingService)(),
                            o._closeFn = function() {
                                return d.trackEvent(l, "Cancel Order"),
                                    t.cancelFn.apply(t, arguments)
                            },
                            o._editFn = function() {
                                return d.trackEvent(l, "Edit Order"),
                                    t.modifyFn.apply(t, arguments)
                            },
                            c = {
                                name: "orderSettings",
                                format: function(t) {
                                    var e = t.value;
                                    return (0,
                                        C.isOrderActive)(e.status) ? (0,
                                        g.default)(o._closeFn, $.t("Cancel"), o._editFn, e.id, e) : (0,
                                        g.default)()
                                }
                            },
                            o.addFormatters(b.formatters.concat([c]).concat(i)),
                            f = '\n\t\t<div class="tv-tabs tv-tabs--no-border tv-tabs--secondary-active tv-tabs--no-margin tv-tabs--semi-compact">\n\t\t\t{{#filter}}\n\t\t\t\t<div class="tv-tabs__tab {{id}}">\n\t\t\t\t\t<div class="tv-tabs__wrap">\n\t\t\t\t\t\t<div class="counter ">\n\t\t\t\t\t\t\t<div class="counter__text">{{name}}</div>\n\t\t\t\t\t\t\t<div class="counter__count counter__count--{{id}}">0</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t{{/filter}}\n\t\t</div>',
                            p = o._possibleOrderStatuses.map(o._translateStatus),
                            o._filter = $(s.render(f, {
                                filter: [{
                                    id: "status-all",
                                    name: $.t("All")
                                }].concat(p)
                            })),
                            o._filterTabs = Reflect.construct(S.Tabs, [o._filter.get(0), null, {
                                noSlider: !0
                            }]),
                            o._statusColumnIndex = t.metainfo.columns.indexOf(t.metainfo.columns.find(function(t) {
                                return "status" === t.id
                            })),
                            o
                    }
                    return (0,
                            d.default)(e, t),
                        (0,
                            p.default)(e, [{
                            key: "subscribeUpdates",
                            value: function() {
                                this._orderPreFilter.start(),
                                    this._ordersFilter.start(),
                                    this._statusesCount.start(),
                                    this._statusWatcher.start(),
                                    this._statusWatcher.newStatusDelegate.subscribe(this, this._onNewStatus),
                                    this._filterTabs.tabChanged.subscribe(this, this._onFilterChanged),
                                    this._statusesCount.countChanged.subscribe(this, this._onCountChanged),
                                    (0,
                                        r.default)(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "subscribeUpdates", this).call(this)
                            }
                        }, {
                            key: "unsubscribeUpdates",
                            value: function() {
                                (0,
                                    r.default)(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "unsubscribeUpdates", this).call(this),
                                    this._statusWatcher.newStatusDelegate.unsubscribe(this, this._onNewStatus),
                                    this._statusWatcher.stop(),
                                    this._ordersFilter.stop(),
                                    this._statusesCount.stop(),
                                    this._filterTabs.tabChanged.unsubscribe(this, this._onFilterChanged),
                                    this._statusesCount.countChanged.unsubscribe(this, this._onCountChanged)
                            }
                        }, {
                            key: "count",
                            value: function() {
                                this.$countHtml.text(this._activeCount)
                            }
                        }, {
                            key: "_setActiveOrder",
                            value: function(t) {
                                t.$row.toggleClass("tv-data-table__stroke--grayed", !this._ordersFilter.filterStatus() && !(0,
                                    C.isOrderActive)(t.status))
                            }
                        }, {
                            key: "onUpdate",
                            value: function(t) {
                                (0,
                                    r.default)(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "onUpdate", this).call(this, t),
                                    this._setActiveOrder(t)
                            }
                        }, {
                            key: "_translateStatus",
                            value: function(t) {
                                var e = (0,
                                        C.orderStatusToText)(t),
                                    i = e[0].toUpperCase() + e.slice(1);
                                return {
                                    id: (0,
                                        C.orderStatusId)(t),
                                    name: i
                                }
                            }
                        }, {
                            key: "contextItems",
                            value: function(t) {
                                var e = this,
                                    i = $(t.srcElement || t.target).parents().andSelf(),
                                    s = this.data.find(function(t) {
                                        return i.is(t.$row)
                                    });
                                return s ? [{
                                    text: $.t("Cancel Order"),
                                    enabled: (0,
                                        C.isOrderActive)(s.status),
                                    action: function() {
                                        return e._closeFn(s.id)
                                    }
                                }, {
                                    text: $.t("Edit Order..."),
                                    enabled: (0,
                                        C.isOrderActive)(s.status),
                                    action: function() {
                                        return e._editFn(s)
                                    }
                                }] : []
                            }
                        }, {
                            key: "_onFilterChanged",
                            value: function(t) {
                                var e = this,
                                    i = 0 === t ? null : this._possibleOrderStatuses[t - 1];
                                this._ordersFilter.setFilterStatus(i),
                                    this.setColumnVisible(this._statusColumnIndex, 0 === t),
                                    this.fullUpdate().then(function() {
                                        i && e._pendingNewOrdersByStatuses[i] && e._pendingNewOrdersByStatuses[i].forEach(function(t) {
                                                return e.highlightRow(t)
                                            }),
                                            e._removeActiveState()
                                    })
                            }
                        }, {
                            key: "_onCountChanged",
                            value: function(t, e) {
                                var i, s = this._filter.find(".counter .counter__count");
                                return t === U ? void $(s[0]).text(e) : t === D && this._activeCount !== e ? (this._activeCount = e,
                                    void this.count()) : void(-1 !== (i = this._possibleOrderStatuses.indexOf(t)) && $(s[i + 1]).text(e))
                            }
                        }, {
                            key: "_onNewStatus",
                            value: function(t) {
                                var e = this;
                                t.status !== w.ORDERSTATUS.PLACING && (this._possibleOrderStatuses.forEach(function(i) {
                                        if (e._pendingNewOrdersByStatuses[i]) {
                                            var s = e._pendingNewOrdersByStatuses[i].indexOf(t.id); - 1 !== s && e._pendingNewOrdersByStatuses[i].splice(s, 1)
                                        }
                                    }),
                                    this._pendingNewOrdersByStatuses[t.status] || (this._pendingNewOrdersByStatuses[t.status] = []),
                                    this._pendingNewOrdersByStatuses[t.status].push(t.id),
                                    setTimeout(function() {
                                        var i, s = e._ordersFilter.filterStatus(),
                                            n = !1;
                                        s && s !== t.status || (i = e.rowElementById(t.id)) && x.default.isElementInViewport(i) && (e.highlightRow(t.id),
                                                n = !0),
                                            n || e._pendingNewOrdersByStatuses[t.status] && -1 !== e._pendingNewOrdersByStatuses[t.status].indexOf(t.id) && e._updateFiltersActiveState(),
                                            e._scheduleRemoveActiveState()
                                    }, 0))
                            }
                        }, {
                            key: "_scheduleRemoveActiveState",
                            value: function() {
                                var t = this;
                                this._activeStateRemovalScheduled || (this._activeStateRemovalScheduled = !0,
                                    setTimeout(function() {
                                        return t._removeActiveState()
                                    }, 1e3))
                            }
                        }, {
                            key: "_removeActiveState",
                            value: function() {
                                this._activeStateRemovalScheduled = !1;
                                var t = this._ordersFilter.filterStatus();
                                t ? this._pendingNewOrdersByStatuses[t] = [] : this._pendingNewOrdersByStatuses = {},
                                    this._updateFiltersActiveState()
                            }
                        }, {
                            key: "_updateFiltersActiveState",
                            value: function() {
                                var t = this;
                                this._highlightChanges && this._possibleOrderStatuses.forEach(function(e) {
                                    var i = t._pendingNewOrdersByStatuses[e] && t._pendingNewOrdersByStatuses[e].length;
                                    t._filter.find("." + (0,
                                        C.orderStatusId)(e) + " .counter__count").toggleClass("i-active", !!i)
                                })
                            }
                        }, {
                            key: "filter",
                            get: function() {
                                return this._filter
                            }
                        }, {
                            key: "topline",
                            get: function() {
                                return this._filter
                            }
                        }]),
                        e
                }(v.default),
                e.default = N,
                t.exports = e.default
        }).call(e, i(72))
    },
    577: function(t, e, i) {
        "use strict";

        function s(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        var n, a, r, o, u, l, d, c, h, f, p, _, v;
        Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            n = i(117),
            a = s(n),
            r = i(118),
            o = s(r),
            u = i(122),
            l = s(u),
            d = i(495),
            c = s(d),
            h = i(158),
            f = s(h),
            p = i(570),
            _ = s(p),
            v = function(t) {
                function e(t) {
                    (0,
                        a.default)(this, e);
                    var i = (0,
                        l.default)(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t));
                    return i._subscriptions = t.subscriptions,
                        i
                }
                return (0,
                        f.default)(e, t),
                    (0,
                        o.default)(e, [{
                        key: "_setActive",
                        value: function(t, e) {
                            e.$row.toggleClass("tv-data-table__stroke--active", e.symbol === t)
                        }
                    }, {
                        key: "subscribeUpdates",
                        value: function() {
                            var t = this;
                            this._linking = this._subscriptions.linking,
                                this._linkingHandler = function(e) {
                                    t.data.forEach(t._setActive.bind(t, e))
                                },
                                this._linking.subscribe(this._linkingHandler),
                                (0,
                                    c.default)(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "subscribeUpdates", this).call(this)
                        }
                    }, {
                        key: "_unsubscribe",
                        value: function() {
                            this._linking && (this._linking.unsubscribe(this._linkingHandler),
                                delete this._linkingHandler,
                                delete this._linking)
                        }
                    }, {
                        key: "unsubscribeUpdates",
                        value: function() {
                            this._unsubscribe(),
                                (0,
                                    c.default)(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "unsubscribeUpdates", this).call(this)
                        }
                    }, {
                        key: "onUpdate",
                        value: function(t) {
                            this._setActive(this._subscriptions.linking.value(), t)
                        }
                    }]),
                    e
            }(_.default),
            e.default = v,
            t.exports = e.default
    },
    578: function(t, e, i) {
        "use strict";

        function s(t, e, s, n) {
            var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : n,
                r = $("<span>");
            return s && $("<span>").addClass("tv-data-table__button").attr("title", $.t("Edit")).append($(i(579)).attr({
                    width: 10,
                    height: 12
                })).appendTo(r).on("click", function(t) {
                    t.preventDefault(),
                        s(a)
                }),
                t && $("<span>").addClass("tv-data-table__button").attr("title", e).append($(i(191)).attr({
                    width: 12,
                    height: 12
                })).appendTo(r).on("click", function(e) {
                    e.preventDefault(),
                        t(n)
                }),
                r
        }
        Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.default = s,
            t.exports = e.default
    },
    579: function(t, e) {
        t.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60"><path d="M0 46l35-35 14 14-35 35H0zM39 7l6-6c5-5 19 9 14 14l-6 6z"/></svg>'
    },
    580: function(t, e, i) {
        "use strict";

        function s(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        var n, a, r, o, u, l, d, c, h, f, p;
        Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            n = i(117),
            a = s(n),
            r = i(118),
            o = s(r),
            u = i(122),
            l = s(u),
            d = i(158),
            c = s(d),
            h = i(576),
            f = s(h),
            p = function(t) {
                function e(t) {
                    (0,
                        a.default)(this, e);
                    var i = (0,
                        l.default)(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t));
                    return i.$countHtml.addClass("js-hidden"),
                        i
                }
                return (0,
                        c.default)(e, t),
                    (0,
                        o.default)(e, [{
                        key: "_setActiveOrder",
                        value: function(t) {}
                    }]),
                    e
            }(f.default),
            e.default = p,
            t.exports = e.default
    },
    581: function(t, e, i) {
        "use strict";

        function s(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        var n, a, r, o, u, l, d, c, h, f, p, _, v, b, m, g, y, w, C;
        Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            n = i(75),
            a = s(n),
            r = i(117),
            o = s(r),
            u = i(118),
            l = s(u),
            d = i(122),
            c = s(d),
            h = i(495),
            f = s(h),
            p = i(158),
            _ = s(p),
            v = i(577),
            b = s(v),
            m = i(572),
            g = i(578),
            y = s(g),
            w = i(393),
            C = function(t) {
                function e(t) {
                    var i, s, n, a, r;
                    return (0,
                            o.default)(this, e),
                        i = (0,
                            c.default)(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t)),
                        s = t.formatters || [],
                        i._subscriptions = t.subscriptions,
                        n = (0,
                            w.tradingService)(),
                        a = "Positions Page",
                        i._closeFn = t.closeFn ? function() {
                            return n.trackEvent(a, "Close Position"),
                                t.closeFn.apply(t, arguments)
                        } : null,
                        i._editFn = t.editFn ? function() {
                            return n.trackEvent(a, "Edit Position"),
                                t.editFn.apply(t, arguments)
                        } : null,
                        i._reverseFn = t.reverseFn ? function() {
                            return n.trackEvent(a, "Reverse Position"),
                                t.reverseFn.apply(t, arguments)
                        } : null,
                        r = {
                            name: "posSettings",
                            format: function(t) {
                                var e = t.value;
                                return (0,
                                    y.default)(i._closeFn ? i._closeFn : null, $.t("Close"), i._editFn ? i._editFn : null, e.id)
                            }
                        },
                        i.addFormatters(m.formatters.concat([r]).concat(s)),
                        i
                }
                return (0,
                        _.default)(e, t),
                    (0,
                        l.default)(e, [{
                        key: "_subscribe",
                        value: function(t) {
                            var e, i = this;
                            if (this._pl)
                                return e = function(e, s, n) {
                                        var r = (0,
                                            a.default)({}, t, {
                                            pl: s
                                        });
                                        n && (r = $.extend(r, n)),
                                            i.update(r, {
                                                silent: !0
                                            })
                                    },
                                    this._pl(t.id, e)
                        }
                    }, {
                        key: "subscribeUpdates",
                        value: function() {
                            var t = this;
                            (0,
                                f.default)(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "subscribeUpdates", this).call(this),
                                this._pl = this._subscriptions.plSubscription,
                                this.data.forEach(function(e) {
                                    e._unsubscribe = t._subscribe(e)
                                })
                        }
                    }, {
                        key: "unsubscribeUpdates",
                        value: function() {
                            (0,
                                f.default)(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "unsubscribeUpdates", this).call(this),
                                this._pl && (this.data.forEach(function(t) {
                                        t._unsubscribe && (t._unsubscribe(),
                                            delete t._unsubscribe)
                                    }),
                                    delete this._pl)
                        }
                    }, {
                        key: "deleteRows",
                        value: function() {
                            this.data.forEach(function(t) {
                                    t._unsubscribe && (t._unsubscribe(),
                                        delete t._unsubscribe)
                                }),
                                (0,
                                    f.default)(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "deleteRows", this).call(this)
                        }
                    }, {
                        key: "deleteRow",
                        value: function(t) {
                            t._unsubscribe && (t._unsubscribe(),
                                    delete t._unsubscribe),
                                (0,
                                    f.default)(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "deleteRow", this).call(this, t)
                        }
                    }, {
                        key: "onUpdate",
                        value: function(t) {
                            0 === t.qty ? this.deleteRow(t) : ((0,
                                    f.default)(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "onUpdate", this).call(this, t),
                                t._unsubscribe || (t._unsubscribe = this._subscribe(t)))
                        }
                    }, {
                        key: "contextItems",
                        value: function(t) {
                            var e, i = this,
                                s = $(t.srcElement || t.target).parents().andSelf(),
                                n = this.data.find(function(t) {
                                    return s.is(t.$row)
                                });
                            return n ? (e = [],
                                this._closeFn && e.push({
                                    text: $.t("Close Position"),
                                    action: function() {
                                        return i._closeFn(n.id)
                                    }
                                }),
                                this._editFn && e.push({
                                    text: $.t("Edit Position..."),
                                    action: function() {
                                        return i._editFn(n.id)
                                    }
                                }),
                                this._reverseFn && e.push({
                                    text: $.t("Reverse Position"),
                                    action: function() {
                                        return i._reverseFn(n.id)
                                    }
                                }),
                                e) : []
                        }
                    }]),
                    e
            }(b.default),
            e.default = C,
            t.exports = e.default
    },
    582: function(t, e, i) {
        "use strict";

        function s(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        var n, a, r, o, u, l, d, c, h, f, p, _, v;
        Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            n = i(117),
            a = s(n),
            r = i(118),
            o = s(r),
            u = i(122),
            l = s(u),
            d = i(495),
            c = s(d),
            h = i(158),
            f = s(h),
            p = i(56),
            _ = s(p),
            v = function(t) {
                function e(t) {
                    (0,
                        a.default)(this, e);
                    var i = (0,
                        l.default)(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this));
                    return i._delegates = t,
                        i._isSubscribed = !1,
                        i
                }
                return (0,
                        f.default)(e, t),
                    (0,
                        o.default)(e, [{
                        key: "subscribe",
                        value: function(t, i, s) {
                            var n = this;
                            (0,
                                c.default)(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "subscribe", this).call(this, t, i, s), !this._isSubscribed && this._listeners.length && this._delegates.forEach(function(t) {
                                return t.subscribe(n, n._onFire)
                            })
                        }
                    }, {
                        key: "unsubscribe",
                        value: function(t, i) {
                            var s = this;
                            (0,
                                c.default)(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "unsubscribe", this).call(this, t, i),
                                this._isSubscribed && 0 === this._listeners.length && this._delegates.forEach(function(t) {
                                    return t.unsubscribe(s, s._onFire)
                                })
                        }
                    }, {
                        key: "_onFire",
                        value: function() {
                            this.fire.apply(this, arguments)
                        }
                    }]),
                    e
            }(_.default),
            e.default = v,
            t.exports = e.default
    },
    583: function(t, e, i) {
        "use strict";

        function s(t, e) {
            var i, s, n;
            return void 0 === e && (e = ""),
                i = document.createElement("div"),
                i.className = "tv-account-manager__el " + e,
                s = document.createElement("div"),
                s.className = "tv-account-manager__text",
                s.textContent = t,
                n = document.createElement("div"),
                n.className = "tv-account-manager__data js-collateral-value",
                i.appendChild(s),
                i.appendChild(n),
                i
        }
        var n = i(572),
            a = function() {
                function t(t, e) {
                    this._infoUnsubscribe = [],
                        this._infoUnsubscribe = e.reverse().map(function(e, i) {
                            var a, r, o, u = "js-" + i,
                                l = s(e.text, u),
                                d = l.getElementsByClassName("js-collateral-value")[0];
                            return t.appendChild(l),
                                a = e.formatter || "fixed",
                                r = n.tableFormatterByName(a),
                                o = function(t) {
                                    var e = r.format({
                                        value: t,
                                        $container: $(d),
                                        row: {}
                                    });
                                    d.textContent = ("" + e).replace(/&nbsp;/g, " ")
                                },
                                e.wValue.subscribe(o),
                                void 0 !== e.wValue.value() && o(e.wValue.value()),
                                function() {
                                    return e.wValue.unsubscribe(o)
                                }
                        })
                }
                return t.prototype.destroy = function() {
                        this._infoUnsubscribe.forEach(function(t) {
                            return t()
                        })
                    },
                    t
            }();
        e.AccountSummaryRow = a
    },
    584: function(t, e) {
        t.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M14.59 6.857s-.57 0-.723-.533c-.115-.457-.305-.876-.534-1.295-.228-.497.153-.878.153-.878l.57-.57c.23-.23.23-.61 0-.877l-.76-.762c-.23-.23-.61-.23-.877 0l-.572.57s-.38.382-.877.154c-.418-.23-.837-.42-1.294-.534-.533-.152-.533-.723-.533-.723v-.8a.602.602 0 0 0-.61-.61H7.467a.602.602 0 0 0-.61.61v.8s0 .57-.533.723c-.457.115-.876.305-1.295.534-.497.228-.878-.153-.878-.153l-.57-.57c-.23-.23-.61-.23-.877 0l-.762.76c-.23.23-.23.61 0 .877l.57.572s.382.38.154.877c-.23.418-.42.837-.534 1.294-.152.495-.723.533-.723.533h-.8a.602.602 0 0 0-.61.61v1.066c0 .343.267.61.61.61h.8s.57 0 .723.533c.115.457.305.876.534 1.295.228.497-.153.878-.153.878l-.57.57c-.23.23-.23.61 0 .877l.76.762c.23.23.61.23.877 0l.572-.57s.38-.382.877-.154c.418.23.837.42 1.294.534.495.152.533.723.533.723v.8c0 .343.267.61.61.61h1.066c.343 0 .61-.267.61-.61v-.8s0-.57.533-.723c.457-.115.876-.305 1.295-.534.497-.228.878.153.878.153l.57.57c.23.23.61.23.877 0l.762-.76c.23-.23.23-.61 0-.877l-.57-.572s-.382-.38-.154-.877c.23-.418.42-.837.534-1.294.152-.495.723-.533.723-.533h.8c.343 0 .61-.267.61-.61V7.467a.602.602 0 0 0-.61-.61h-.8zM4 8c0-2.222 1.778-4 4-4s4 1.778 4 4-1.812 4-4 4c-2.222 0-4-1.778-4-4z"/></svg>'
    }
});