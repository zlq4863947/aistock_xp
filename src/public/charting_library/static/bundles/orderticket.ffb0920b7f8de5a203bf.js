webpackJsonp([1], {
    493: function(t, e, n) {
        "use strict";
        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        function i(t) {
            var e = [{
                optionText: $.t("Market"),
                optionClass: "js-market i-active"
            }, {
                optionText: $.t("Limit"),
                optionClass: "js-limit"
            }, {
                optionText: $.t("Stop"),
                optionClass: "js-stop"
            }];
            return t.supportStopLimitOrders && e.push({
                optionText: $.t("StopLimit"),
                optionClass: "js-stop-limit"
            }),
            (0,
            R.ticket)({
                body: (0,
                R.combine)(K({
                    containerClass: "tv-ticket__field",
                    content: (0,
                    R.buttonsGroup)({
                        containerClass: "tv-buttons-group--primary js-type",
                        options: e
                    })
                }), (0,
                R.control)({
                    containerClass: "js-order-price",
                    label: t.supportStopLimitOrders ? $.t("Limit Price") : $.t("Price"),
                    selector: z(),
                    input: Y(),
                    output: U()
                }), t.supportStopLimitOrders ? (0,
                R.control)({
                    containerClass: "js-order-stop-price",
                    label: $.t("Stop Price"),
                    selector: z(),
                    input: Y(),
                    output: U()
                }) : "", (0,
                R.control)({
                    containerClass: "js-order-sl",
                    label: (0,
                    R.checkbox)({
                        labelText: $.t("Stop Loss"),
                        checkboxClass: "js-sl-checker"
                    }),
                    selector: z(),
                    input: Y(),
                    output: U()
                }), (0,
                R.control)({
                    containerClass: "js-order-tp",
                    label: (0,
                    R.checkbox)({
                        labelText: $.t("Take Profit"),
                        checkboxClass: "js-tp-checker"
                    }),
                    selector: z(),
                    input: Y(),
                    output: U()
                }), (0,
                R.control)({
                    containerClass: "js-order-qty",
                    label: t.showQuantityInsteadOfAmount ? $.t("Quantity") : $.t("Amount"),
                    selector: (0,
                    R.buttonsGroup)({
                        containerClass: "tv-buttons-group--primary_ghost tv-buttons-group--size-small js-order-switch",
                        options: [{
                            optionText: $.t("Manual"),
                            optionClass: ""
                        }, {
                            optionText: $.t("% Risk"),
                            optionClass: ""
                        }]
                    }),
                    input: Y(),
                    output: (0,
                    R.textLabel)({
                        outputClass: "js-order-output",
                        outputText: $.t("0.00 %")
                    })
                }), (0,
                R.control)({
                    containerClass: "js-order-duration",
                    label: $.t("Duration"),
                    selector: B(),
                    input: H(),
                    output: W()
                })),
                riskRewardClass: "risk-revard-js",
                riskClass: "risk-js",
                profitClass: "profit-js",
                doneText: $.t("Sell"),
                doneClass: "js-done"
            })
        }
        function o(t) {
            var e, n, r, i, o, s, u, c, a, l, h, p, f, d, b, v, m, y, _, w, g, E, k, x, D, $, P, j, L, N, R = t.container, M = t.price$, F = t.custom$, V = t.initState$, U = t.firstToSecond, Y = t.secondToFirst, z = t.firstProps, B = t.secondProps, H = t.supportBrackets, W = t.switchClass, K = void 0 === W ? ".js-order-switch" : W, G = t.inputClass, Z = void 0 === G ? ".js-order-input" : G, J = t.outputClass, X = void 0 === J ? ".js-order-output" : J, tt = t.errorChecker, et = void 0 === tt ? Q({
                min: 1,
                step: 1
            }) : tt, nt = t.createDisabled, rt = void 0 !== nt && nt, it = {
                FIRST: 1,
                SECOND: 2
            }, ot = R.querySelector(K), st = R.querySelector(Z), ut = R.querySelector(X);
            return H || ([ot, ut.parentNode].forEach(function(t) {
                return t.classList.add("js-hidden")
            }),
            R.querySelector(".js-second-control").classList.add("tv-ticket__input--singlechild")),
            e = ot.querySelectorAll("div")[0],
            n = ot.querySelectorAll("div")[1],
            r = new q.Subject,
            i = V.delay(1).concat(r).publish(),
            o = F.filter(function(t) {
                return void 0 === t
            }).map(it.FIRST),
            s = q.Observable.fromEvent(e, "click", function() {
                return it.FIRST
            }),
            u = q.Observable.fromEvent(n, "click", function() {
                return it.SECOND
            }).withLatestFrom(F, function(t, e) {
                return void 0 === e ? it.FIRST : t
            }),
            c = q.Observable.merge(s, u, o).startWith(it.FIRST).distinctUntilChanged(),
            a = i.map(function(t) {
                return t.type
            }).publish(),
            l = new q.Subject,
            h = (0,
            I.createCustomNumberInput)({
                input: st,
                state$: i,
                error$: l,
                leftMessageAlign: !H,
                onOff$: q.Observable.of(!rt)
            }),
            p = h.value$,
            f = h.error$,
            d = h.connect,
            b = h.subscribe,
            v = function() {
                for (var t = arguments.length, e = Array(t), n = 0; n < t; n++)
                    e[n] = arguments[n];
                return e
            }
            ,
            m = F ? [a, p, M, F.filter(function(t) {
                return void 0 !== t
            })] : [a, p, M],
            y = q.Observable.combineLatest.apply(q.Observable, (0,
            T.default)(m.concat(v))).publish(),
            _ = q.Observable.combineLatest(a, p, v).publish(),
            w = function(t, e, n) {
                return t.filter(function(t) {
                    return (0,
                    S.default)(t, 1)[0] === e
                }).map(function(t) {
                    var e = (0,
                    O.default)(t)
                      , r = e.slice(1);
                    return n.apply(void 0, (0,
                    T.default)(r))
                })
            }
            ,
            g = w(y, it.SECOND, Y).map(function(t) {
                return (0,
                I.parseWithFormatter)(z.formatter, t)
            }).merge(w(y, it.FIRST, U).map(function(t) {
                return (0,
                I.parseWithFormatter)(B.formatter, t)
            })).publish(),
            E = g.withLatestFrom(a, function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ""
                  , e = arguments[1];
                return (e !== it.FIRST ? (0,
                A.default)(t, ",") : t) + " " + (e === it.FIRST ? "%" : "")
            }),
            k = c.withLatestFrom(g, function(t, e) {
                return (0,
                C.default)({}, t === it.FIRST ? z : B, {
                    type: t,
                    value: e
                })
            }).publish(),
            x = w(y, it.SECOND, Y).merge(w(_, it.FIRST, function(t) {
                return t
            })).publish(),
            D = (0,
            I.makeObservableOffable)(q.Observable.merge(w(y, it.FIRST, U), w(_, it.SECOND, function(t) {
                return t
            })), F.map(function(t) {
                return void 0 !== t
            }).distinctUntilChanged()),
            $ = D.value$,
            P = D.disposable,
            j = $.publish(),
            L = x.map(et).distinctUntilChanged(function(t) {
                return t.text
            }),
            N = (0,
            I.combineErrors)([l, f], I.mergeErrors),
            {
                first$: x,
                second$: j,
                error$: N,
                subscribe: function() {
                    var t = i.subscribe(function(t) {
                        t.type === I.INPUT_TYPE.PRICE ? (e.classList.add("i-active"),
                        n.classList.remove("i-active")) : (e.classList.remove("i-active"),
                        n.classList.add("i-active"))
                    })
                      , r = F.map(function(t) {
                        return void 0 === t
                    }).distinctUntilChanged().subscribe(function(t) {
                        t ? (n.classList.add("i-disabled"),
                        ut.parentNode.classList.add("i-disabled")) : (n.classList.remove("i-disabled"),
                        ut.parentNode.classList.remove("i-disabled"))
                    })
                      , o = E.subscribe(function(t) {
                        " %" !== t && (ut.textContent = t)
                    })
                      , s = b();
                    return new q.CompositeDisposable(o,r,t,s,P)
                },
                connect: function() {
                    return new q.CompositeDisposable(L.subscribe(l),g.connect(),j.connect(),x.connect(),_.connect(),y.connect(),a.connect(),d(),i.connect(),k.subscribe(r),k.connect())
                }
            }
        }
        function s(t) {
            var e = t.container
              , n = t.quotes$
              , r = t.priceFormatter
              , i = t.spreadFormatter
              , o = e.querySelector(".js-bid")
              , s = e.querySelector(".js-ask")
              , u = e.querySelector(".js-spread");
            return n.subscribe(function(t) {
                var e = +t.ask || +t.trade || 0
                  , n = +t.bid || +t.trade || 0;
                o.textContent = r.format(n),
                s.textContent = r.format(e),
                u.textContent = (0,
                M.isNumber)(t.spread) ? i.format(t.spread) : r.format(e - n)
            })
        }
        function u(t, e) {
            var n, r = $(t);
            return e.forEach(function(t) {
                var e = $("<option>").attr("value", t.value).text(t.name);
                r.append(e)
            }),
            r.tvControlSelect(),
            1 === e.length && (n = r.parent(),
            n.addClass("js-hidden"),
            n.parent().addClass("tv-ticket__input--no-selector")),
            r
        }
        var c, a, l, h, p, f, d, b, v, m, y, _, w, g, E, C, k, O, x, S, D, T, P, j, A, L, N, R, q, I, M, F, V, U, Y, z, B, H, W, K, Q, G, Z, J, X;
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e.Ticket = void 0,
        c = n(494),
        a = r(c),
        l = n(427),
        h = r(l),
        p = n(117),
        f = r(p),
        d = n(118),
        b = r(d),
        v = n(122),
        m = r(v),
        y = n(495),
        _ = r(y),
        w = n(158),
        g = r(w),
        E = n(75),
        C = r(E),
        k = n(503),
        O = r(k),
        x = n(508),
        S = r(x),
        D = n(515),
        T = r(D),
        n(516),
        P = n(180),
        j = n(517),
        A = r(j),
        L = n(173),
        n(518),
        N = n(383),
        R = n(520),
        q = n(526),
        I = n(527),
        M = n(50),
        F = null,
        n(533),
        V = '\n<div class="tv-ticket-header js-theader">\n\t<div class="tv-ticket-header__wrapper">\n\t\t<div class="tv-ticket-header__bid js-bid-button">\n\t\t\t<div class="tv-ticket-header__title">' + $.t("Bid") + '</div>\n\t\t\t<div class="tv-ticket-header__value js-bid">...</div>\n\t\t\t<span class="tv-ticket-header__button tv-button tv-button--default tv-button--size_xsmall js-bid-label">' + $.t("SELL") + '</span>\n\t\t</div>\n\t\t<div class="tv-ticket-header__ask js-ask-button">\n\t\t\t<div class="tv-ticket-header__title">' + $.t("Ask") + '</div>\n\t\t\t<div class="tv-ticket-header__value js-ask">...</div>\n\t\t\t<span class="tv-ticket-header__button tv-button tv-button--default tv-button--size_xsmall js-ask-label">' + $.t("BUY") + '</span>\n\t\t</div>\n\t</div>\n\t<div class="tv-ticket-header__spread js-spread">...</div>\n</div>',
        U = function() {
            return (0,
            R.textLabel)({
                outputClass: "js-order-output"
            })
        }
        ,
        Y = function() {
            return (0,
            R.errorLabel)({
                element: (0,
                R.numberInput)({
                    containerClass: "js-order-input",
                    inputClass: "js-input",
                    upClass: "js-input-up",
                    downClass: "js-input-down"
                }),
                containerClass: ""
            })
        }
        ,
        z = function() {
            return (0,
            R.buttonsGroup)({
                containerClass: "tv-buttons-group--primary_ghost tv-buttons-group--size-small js-order-switch",
                options: [{
                    optionText: $.t("Price"),
                    optionClass: ""
                }, {
                    optionText: $.t("Pips"),
                    optionClass: ""
                }]
            })
        }
        ,
        B = function() {
            return (0,
            R.comboBox)({
                outputClass: "js-duration-type"
            })
        }
        ,
        H = function() {
            return (0,
            R.datePicker)({
                outputClass: "js-duration-date"
            })
        }
        ,
        W = function() {
            return (0,
            R.timePicker)({
                outputClass: "js-duration-time"
            })
        }
        ,
        K = function(t) {
            var e = t.content;
            return '\n<div class="' + t.containerClass + '">' + e + "</div>\n"
        }
        ,
        Q = function(t) {
            var e = t.min
              , n = void 0 === e ? null : e
              , r = t.max
              , i = void 0 === r ? null : r
              , o = t.step
              , s = void 0 === o ? null : o;
            return function(t) {
                return i && t > i ? {
                    hasError: !0,
                    text: I.qtyErrors.max
                } : n && t < n ? {
                    hasError: !0,
                    text: I.qtyErrors.min
                } : s && t % s != 0 ? {
                    hasError: !0,
                    text: I.qtyErrors.step
                } : {
                    hasError: !1
                }
            }
        }
        ,
        G = {},
        Z = function(t) {
            return function(e, n) {
                return e <= 0 || n <= 0 ? {
                    text: t,
                    hasError: !0
                } : {
                    text: "",
                    hasError: !1
                }
            }
        }
        ,
        J = Z($.t("If the position is long, stop loss order must be below entry price. If short, then higher.")),
        X = Z($.t("If the position is long, take profit order must be above entry price. If short, then lower.")),
        e.Ticket = function(t) {
            function e() {
                return (0,
                f.default)(this, e),
                (0,
                m.default)(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments))
            }
            return (0,
            g.default)(e, t),
            (0,
            b.default)(e, [{
                key: "open",
                value: function(t, n) {
                    var r, i, c, l, p, f, d, b, v = this, m = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
                    return this.opened ? (this.focus(),
                    this.toTop(),
                    Promise.reject()) : (r = this.el,
                    i = !!t.id,
                    c = F.realtimeProvider(),
                    l = F.activeBroker(),
                    p = l.metainfo().configFlags,
                    f = p.supportBrackets,
                    d = p.supportStopLimitOrders,
                    b = p.supportEditAmount,
                    Promise.all([l.symbolInfo(t.symbol), l.accountInfo(), l.quotesSnapshot(t.symbol), l.formatter(t.symbol), l.spreadFormatter(t.symbol)]).then(function(p) {
                        var y, w, g, E, k, O, x, D, T, P, j, A, R, M, V, U, Y, z, B, H, W, K, G, Z, tt, et, nt, rt, it, ot, st, ut, ct, at, lt, ht, pt, ft, dt, bt, vt, mt, yt, _t, wt, gt, Et, Ct, kt, Ot, xt, St, Dt, $t, Tt, Pt, jt, At, Lt, Nt, Rt, qt, It, Mt, Ft, Vt, Ut, Yt, zt, Bt, Ht, Wt, Kt, Qt, Gt, Zt, Jt, Xt, te, ee, ne, re, ie, oe, se, ue, ce, ae, le, he, pe, fe, de, be, ve, me, ye, _e, we, ge, Ee, Ce = (0,
                        S.default)(p, 5), ke = Ce[0], Oe = Ce[1], xe = Ce[2], Se = Ce[3], De = Ce[4];
                        if (v.setTitle("<strong>" + (t.brokerSymbol || t.symbol) + (ke.description ? "," : "") + "</strong> " + ke.description, !0),
                        w = q.Observable.fromEventPattern(function(e) {
                            return c.subscribeRealtime(t.symbol, e)
                        }, function(e) {
                            return c.unsubscribeRealtime(t.symbol, e)
                        }, function(t, e) {
                            return e
                        }).publish(),
                        g = q.Observable.fromEventPattern(function(t) {
                            return l.subscribeEquity(t)
                        }, function(t) {
                            return l.unsubscribeEquity(t)
                        }, function(t, e) {
                            return e
                        }).publish(),
                        E = q.Observable.fromEventPattern(function(t) {
                            return F.onConnectionStatusChange.subscribe(null, t)
                        }, function(t) {
                            return F.onConnectionStatusChange.unsubscribe(null, t)
                        }, function(t) {
                            return t.status || t
                        }),
                        k = q.Observable.fromEventPattern(function(t) {
                            return l.orderUpdate.subscribe(null, t)
                        }, function(t) {
                            return l.orderUpdate.unsubscribe(null, t)
                        }).filter(function(e) {
                            return e.id === t.id
                        }).map(function(t) {
                            return t.status
                        }),
                        O = r.querySelector(".js-bid-button"),
                        x = r.querySelector(".js-ask-button"),
                        D = i ? q.Observable.empty() : q.Observable.fromEvent(O, "click", function() {
                            return N.SIDE.SELL
                        }),
                        T = i ? q.Observable.empty() : q.Observable.fromEvent(x, "click", function() {
                            return N.SIDE.BUY
                        }),
                        P = D.merge(T).startWith(t.side || N.SIDE.SELL).distinctUntilChanged().publish(),
                        j = q.Observable.combineLatest(P, w, function(t, e) {
                            return t === N.SIDE.SELL ? +e.bid || +e.trade || 0 : +e.ask || +e.trade || 0
                        }).publish(),
                        A = r.querySelector(".js-done"),
                        R = new L.ButtonLoader(A),
                        M = r.querySelector(".js-ask-label"),
                        V = r.querySelector(".js-bid-label"),
                        U = r.querySelector(".js-order-duration"),
                        Y = U.querySelector("select.js-duration-type"),
                        z = t.duration ? t.duration.type : null,
                        B = t.duration ? t.duration.datetime : null,
                        H = l.metainfo().durations,
                        H && (v.durationComboControl || (v.durationComboControl = u(Y, H)),
                        v.durationComboControl.tvControlSelect("val", z || H[0].value)),
                        W = function(t) {
                            t === N.SIDE.SELL ? (x.classList.remove("i-active"),
                            M.classList.add("tv-button--default"),
                            M.classList.remove("tv-button--primary"),
                            O.classList.add("i-active"),
                            V.classList.add("tv-button--danger"),
                            V.classList.remove("tv-button--default"),
                            V.classList.remove("i-disabled"),
                            A.classList.remove("tv-button--primary"),
                            A.classList.add("tv-button--danger"),
                            R.contentHtml($.t("Sell"))) : (O.classList.remove("i-active"),
                            V.classList.add("tv-button--default"),
                            V.classList.remove("tv-button--danger"),
                            x.classList.add("i-active"),
                            M.classList.add("tv-button--primary"),
                            M.classList.remove("tv-button--default"),
                            M.classList.remove("i-disabled"),
                            A.classList.remove("tv-button--danger"),
                            A.classList.add("tv-button--primary"),
                            R.contentHtml($.t("Buy"))),
                            i ? (R.contentHtml($.t("Modify")),
                            U.classList.add("i-disabled"),
                            t === N.SIDE.BUY ? V.classList.add("i-disabled") : M.classList.add("i-disabled")) : (V.classList.remove("i-disabled"),
                            M.classList.remove("i-disabled"))
                        }
                        ,
                        K = r.querySelector(".js-type"),
                        G = r.querySelector(".js-market"),
                        Z = r.querySelector(".js-limit"),
                        tt = r.querySelector(".js-stop"),
                        et = r.querySelector(".js-stop-limit"),
                        nt = i ? q.Observable.empty() : q.Observable.fromEvent(G, "click", function() {
                            return N.ORDERTYPE.MARKET
                        }),
                        rt = i ? q.Observable.empty() : q.Observable.fromEvent(Z, "click", function() {
                            return N.ORDERTYPE.LIMIT
                        }),
                        it = i ? q.Observable.empty() : q.Observable.fromEvent(tt, "click", function() {
                            return N.ORDERTYPE.STOP
                        }),
                        ot = i || !et ? q.Observable.empty() : q.Observable.fromEvent(et, "click", function() {
                            return N.ORDERTYPE.STOPLIMIT
                        }),
                        st = q.Observable.merge(rt, nt, it, ot, q.Observable.of(t.type || N.ORDERTYPE.MARKET).delay(10)).distinctUntilChanged().publish(),
                        ut = r.querySelector(".js-order-price"),
                        ct = r.querySelector(".js-order-stop-price"),
                        at = r.querySelector(".js-order-stop-price input"),
                        lt = r.querySelector(".js-order-qty"),
                        ht = (0,
                        I.createDurationController)(U, r, z, B, H, st, v.durationComboControl, i),
                        y = {},
                        (0,
                        h.default)(y, N.ORDERTYPE.MARKET, G),
                        (0,
                        h.default)(y, N.ORDERTYPE.LIMIT, Z),
                        (0,
                        h.default)(y, N.ORDERTYPE.STOP, tt),
                        pt = y,
                        et && (pt[N.ORDERTYPE.STOPLIMIT] = et),
                        ft = function(e) {
                            K.querySelector(".i-active").classList.remove("i-active"),
                            e === N.ORDERTYPE.MARKET ? G.classList.add("i-active") : e === N.ORDERTYPE.LIMIT ? Z.classList.add("i-active") : e === N.ORDERTYPE.STOP ? tt.classList.add("i-active") : et.classList.add("i-active"),
                            i ? Object.values(pt).forEach(function(e) {
                                e !== pt[t.type] && e.classList.add("i-disabled")
                            }) : Object.values(pt).forEach(function(t) {
                                return t.classList.remove("i-disabled")
                            })
                        }
                        ,
                        dt = ke.pipSize,
                        bt = {
                            step: 1,
                            formatter: new I.NumericFormatter(1)
                        },
                        vt = (0,
                        C.default)({}, bt, {
                            min: .1
                        }),
                        mt = {
                            step: ke.minTick,
                            min: ke.minTick,
                            formatter: Se
                        },
                        yt = function(t, e, n) {
                            return n * (t - e) / dt
                        }
                        ,
                        _t = function(t, e, n) {
                            return n * t * dt + e
                        }
                        ,
                        wt = q.Observable.combineLatest(st, P, function(t, e) {
                            return {
                                type: t,
                                side: e
                            }
                        }).map(function(t) {
                            var e = t.type
                              , n = t.side;
                            return e === N.ORDERTYPE.LIMIT && n === N.SIDE.SELL || (e === N.ORDERTYPE.STOP || e === N.ORDERTYPE.STOPLIMIT) && n === N.SIDE.BUY ? 1 : -1
                        }).publish(),
                        gt = P.map(function(t) {
                            return t === N.SIDE.BUY ? 1 : -1
                        }).publish(),
                        Et = t.limitPrice || !d && t.stopPrice || t.price || xe.trade || 0,
                        Ct = t.stopPrice || t.price || t.limitPrice || xe.trade || 0,
                        kt = {
                            pipsProps: vt,
                            priceProps: mt,
                            priceToPips: yt,
                            pipsToPrice: _t,
                            orderType$: st
                        },
                        Ot = {
                            type: I.INPUT_TYPE.PRICE,
                            value: (0,
                            I.parseWithFormatter)(mt.formatter, Et),
                            step: mt.step,
                            formatter: mt.formatter
                        },
                        xt = {
                            type: I.INPUT_TYPE.PRICE,
                            value: (0,
                            I.parseWithFormatter)(mt.formatter, Ct),
                            step: mt.step,
                            formatter: mt.formatter
                        },
                        St = d ? (0,
                        I.createPriceController)((0,
                        C.default)({}, kt, {
                            container: ct,
                            custom$: gt,
                            onOff$: st.map(function(t) {
                                return t === N.ORDERTYPE.STOP || t === N.ORDERTYPE.STOPLIMIT
                            }),
                            price$: j,
                            initState$: q.Observable.of(xt),
                            errorChecker: function(t, e) {
                                return t < 0 || e < 0 ? {
                                    text: $.t("Order price is not appropriate for this order type/direction."),
                                    hasError: !0
                                } : {
                                    text: "",
                                    hasError: !1
                                }
                            }
                        })) : q.Observable.empty().publish(),
                        Dt = d ? St.price$ : q.Observable.of(0),
                        $t = q.Observable.combineLatest(st, Dt, j, function(t, e, n) {
                            return t === N.ORDERTYPE.STOPLIMIT ? e : n
                        }).publish(),
                        Tt = st.map(function(t) {
                            return t === N.ORDERTYPE.STOPLIMIT
                        }),
                        Pt = (0,
                        I.createPriceController)((0,
                        C.default)({}, kt, {
                            pipsProps: bt,
                            container: ut,
                            custom$: wt,
                            onOff$: st.map(function(t) {
                                return d ? t === N.ORDERTYPE.LIMIT || t === N.ORDERTYPE.STOPLIMIT : t !== N.ORDERTYPE.MARKET
                            }),
                            errorChecker: function(t, e, n, r, i) {
                                var o, s, u = {
                                    text: "",
                                    hasError: !1
                                };
                                return n ? u : (o = "forex" === ke.type,
                                s = Math.abs(r - t) > t / 2 && t > 1,
                                t < 0 || e < 0 && (i !== N.ORDERTYPE.LIMIT || o || s) ? {
                                    text: $.t("Order price is not appropriate for this order type/direction."),
                                    hasError: !0
                                } : u)
                            },
                            price$: $t,
                            initState$: q.Observable.of(Ot),
                            anyPriceValid$: Tt
                        })),
                        jt = Pt.price$,
                        At = q.Observable.combineLatest(j, jt, Dt, st, function(t, e, n, r) {
                            return r === N.ORDERTYPE.MARKET ? t : r !== N.ORDERTYPE.LIMIT && r !== N.ORDERTYPE.STOP && d ? n : e
                        }).distinctUntilChanged().publish(),
                        Lt = q.Observable.combineLatest(j, jt, Dt, st, function(t, e, n, r) {
                            var i = d ? n : e;
                            return {
                                price: t,
                                limitPrice: r === N.ORDERTYPE.LIMIT || r === N.ORDERTYPE.STOPLIMIT ? e : void 0,
                                stopPrice: r === N.ORDERTYPE.STOP || r === N.ORDERTYPE.STOPLIMIT ? i : void 0
                            }
                        }).distinctUntilChanged().publish(),
                        Nt = (0,
                        I.makeObservableOffable)(Pt.error$, st.map(function(t) {
                            return t !== N.ORDERTYPE.MARKET && (!d || t !== N.ORDERTYPE.STOP)
                        }), {
                            text: "",
                            hasError: !1
                        }),
                        Rt = Nt.value$,
                        qt = Nt.disposable,
                        It = d ? q.Observable.combineLatest(St.error$, st, function(t, e) {
                            return e === N.ORDERTYPE.MARKET || e === N.ORDERTYPE.LIMIT ? {} : t
                        }).distinctUntilChanged().publish() : q.Observable.of({}).publish(),
                        Mt = function(t) {
                            return N.SIDE.BUY === t ? 1 : -1
                        }
                        ,
                        Ft = r.querySelector(".js-sl-checker"),
                        Vt = r.querySelector(".js-tp-checker"),
                        Ut = (0,
                        I.createCheckBox)({
                            container: Ft,
                            startState: !!t.stopLoss
                        }),
                        Yt = (0,
                        I.createCheckBox)({
                            container: Vt,
                            startState: !!t.takeProfit
                        }),
                        zt = r.querySelector(".js-order-sl"),
                        Bt = r.querySelector(".js-order-tp"),
                        Ht = r.querySelector(".js-order-sl .js-input"),
                        Wt = r.querySelector(".js-order-tp .js-input"),
                        f || [zt, Bt].forEach(function(t) {
                            return t.classList.add("js-hidden")
                        }),
                        v.firstFocusControl = null,
                        i && m)
                            switch (m) {
                            case N.TICKETFOCUS.STOPPRICE:
                                v.firstFocusControl = at;
                                break;
                            case N.TICKETFOCUS.STOPLOSS:
                                v.firstFocusControl = t.stopLoss && Ht;
                                break;
                            case N.TICKETFOCUS.TAKEPROFIT:
                                v.firstFocusControl = t.takeProfit && Wt
                            }
                        return Kt = t.stopLoss ? (0,
                        C.default)({}, mt, {
                            type: I.INPUT_TYPE.PRICE,
                            value: (0,
                            I.parseWithFormatter)(mt.formatter, t.stopLoss)
                        }) : (0,
                        C.default)({}, vt, {
                            type: I.INPUT_TYPE.PIPS,
                            value: 25
                        }),
                        Qt = t.takeProfit ? (0,
                        C.default)({}, mt, {
                            type: I.INPUT_TYPE.PRICE,
                            value: (0,
                            I.parseWithFormatter)(mt.formatter, t.takeProfit)
                        }) : (0,
                        C.default)({}, vt, {
                            type: I.INPUT_TYPE.PIPS,
                            value: 75
                        }),
                        Gt = (0,
                        I.createPriceController)((0,
                        C.default)({}, kt, {
                            errorChecker: J,
                            container: zt,
                            price$: At,
                            custom$: P.map(function(t) {
                                return -1 * Mt(t)
                            }),
                            initState$: q.Observable.of(Kt),
                            onOff$: Ut.value$
                        })),
                        Zt = (0,
                        I.createPriceController)((0,
                        C.default)({}, kt, {
                            errorChecker: X,
                            container: Bt,
                            price$: At,
                            custom$: P.map(function(t) {
                                return Mt(t)
                            }),
                            initState$: q.Observable.of(Qt),
                            onOff$: Yt.value$
                        })),
                        Jt = (0,
                        I.combineControllerAndCheckbox)(Gt, Ut),
                        Xt = Jt.price$,
                        te = Jt.pips$,
                        ee = Jt.error$,
                        ne = (0,
                        a.default)(Jt, ["price$", "pips$", "error$"]),
                        re = (0,
                        I.combineControllerAndCheckbox)(Zt, Yt),
                        ie = re.price$,
                        oe = re.pips$,
                        se = re.error$,
                        ue = (0,
                        a.default)(re, ["price$", "pips$", "error$"]),
                        ce = ke.pipValue,
                        ae = o({
                            container: lt,
                            price$: g,
                            custom$: te,
                            initState$: q.Observable.of({
                                type: 1,
                                value: t.qty,
                                step: ke.qty.step,
                                min: ke.qty.min,
                                max: ke.qty.max,
                                formatter: new I.QtyFormatter(ke.qty)
                            }),
                            firstProps: {
                                start: t.qty,
                                step: ke.qty.step,
                                min: ke.qty.min,
                                max: ke.qty.max,
                                formatter: new I.QtyFormatter(ke.qty)
                            },
                            secondProps: {
                                start: 2,
                                step: .1,
                                min: .01,
                                max: 100,
                                formatter: new I.NumericFormatter(2)
                            },
                            errorChecker: Q(ke.qty),
                            secondToFirst: function(t, e, n) {
                                return Math.round(t * e / n / ce / 100 / ke.qty.step) * ke.qty.step
                            },
                            firstToSecond: function(t, e, n) {
                                return t * n * ce * 100 / e
                            },
                            supportBrackets: f,
                            createDisabled: i && !b
                        }),
                        le = ae.first$,
                        he = (0,
                        I.combineErrors)([Rt, ee, se, ae.error$, It, ht.durationDateError$, ht.durationTimeError$], function() {
                            for (var t = arguments.length, e = Array(t), n = 0; n < t; n++)
                                e[n] = arguments[n];
                            return e.every(function(t) {
                                return !t.hasError
                            })
                        }),
                        pe = q.Observable.combineLatest(P, st, Lt, Xt, ie, le, ht.duration$, function(e, n, r, i, o, s, u) {
                            var c, a, l, h, p, f = (0,
                            C.default)({}, t, r, {
                                side: e,
                                type: n,
                                stopLoss: i,
                                takeProfit: o,
                                qty: s
                            });
                            return u.type && (f.duration = {
                                type: u.type
                            },
                            c = H.find(function(t) {
                                return t.value === u.type
                            }),
                            c.hasTimePicker ? (a = u.dateStr + "T" + u.timeStr + ":00Z",
                            l = new Date(a),
                            f.duration.datetime = l.valueOf() - (0,
                            I.localOffset)()) : c.hasDatePicker && (h = u.dateStr + "T00:00:00Z",
                            p = new Date(h),
                            f.duration.datetime = p.valueOf())),
                            f
                        }),
                        fe = (0,
                        I.createDoneButton)({
                            buttonLoader: R,
                            result$: pe,
                            fire$: q.Observable.fromEvent(document, "keyup", function(t) {
                                return t.keyCode
                            }).filter(function(t) {
                                return 13 === t && v.isFocused()
                            }),
                            enable$: he,
                            handler: function(t) {
                                return F.suggestedQty().setValue(t.symbol, t.qty),
                                n(t)
                            }
                        }),
                        de = fe.result$,
                        be = (0,
                        a.default)(fe, ["result$"]),
                        ve = r.querySelector(".risk-revard-js"),
                        me = r.querySelector(".risk-js"),
                        ye = r.querySelector(".profit-js"),
                        _e = (0,
                        I.createRiskHelper)({
                            container: me,
                            qty$: le,
                            pips$: te,
                            equity$: g,
                            pipValue: ke.pipValue,
                            currencySign: Oe.currencySign,
                            text: $.t("Risk")
                        }),
                        we = (0,
                        I.createRiskHelper)({
                            container: ye,
                            qty$: le,
                            pips$: oe,
                            equity$: g,
                            pipValue: ke.pipValue,
                            currencySign: Oe.currencySign,
                            text: $.t("Reward")
                        }),
                        ge = (0,
                        I.createRiskRewardHelper)({
                            container: ve,
                            slPips$: te,
                            tpPips$: oe
                        }),
                        Ee = [qt, s({
                            container: v.el.querySelector(".js-theader"),
                            quotes$: w,
                            priceFormatter: Se,
                            spreadFormatter: De
                        }), we.subscribe(), _e.subscribe(), ge.subscribe(), E.subscribe(function(t) {
                            t !== N.CONNECTSTATUSES.CONNECTED && v.close()
                        }), k.subscribe(function(t) {
                            t !== N.ORDERSTATUS.WORKING && t !== N.ORDERSTATUS.INACTIVE && v.close()
                        }), de.subscribe(function(t) {
                            if ("error" === t.status)
                                return t.details && F.showErrorNotification($.t("Order rejected"), t.details);
                            v._resolve(!0),
                            v.close()
                        }), st.subscribe(ft), P.subscribe(W), ae.subscribe(), ue.subscribe(), ne.subscribe(), be.subscribe(), Pt.subscribe(), ht.subscribe(), St.subscribe(), be.connect(), ae.connect(), ne.connect(), ue.connect(), wt.connect(), gt.connect(), Pt.connect(), $t.connect(), St.connect(), At.connect(), Lt.connect(), It.connect(), st.connect(), j.connect(), P.connect(), w.connect(), g.connect(), ht.connect()],
                        v.once("beforeClose", function() {
                            Ee.forEach(function(t) {
                                return t.dispose()
                            }),
                            v._reject()
                        }),
                        (0,
                        _.default)(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "open", v).call(v),
                        new Promise(function(t, e) {
                            v._resolve = t,
                            v._reject = e
                        }
                        )
                    }))
                }
            }], [{
                key: "get",
                value: function(t) {
                    F = t;
                    var n = F.activeBroker().metainfo();
                    return G[n.id] || (G[n.id] = new e({
                        title: "ticket",
                        width: 450,
                        destroyOnClose: !1,
                        closeOnOutsideClick: !1,
                        content: V + i(n.configFlags),
                        contentWrapTemplate: "<div>"
                    })),
                    G[n.id]
                }
            }]),
            e
        }(P.TVPopup)
    },
    494: function(t, e) {
        "use strict";
        e.__esModule = !0,
        e.default = function(t, e) {
            var n, r = {};
            for (n in t)
                e.indexOf(n) >= 0 || Object.prototype.hasOwnProperty.call(t, n) && (r[n] = t[n]);
            return r
        }
    },
    503: function(t, e, n) {
        "use strict";
        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        var i, o;
        e.__esModule = !0,
        i = n(504),
        o = r(i),
        e.default = function(t) {
            return Array.isArray(t) ? t : (0,
            o.default)(t)
        }
    },
    504: function(t, e, n) {
        t.exports = {
            default: n(505),
            __esModule: !0
        }
    },
    505: function(t, e, n) {
        n(126),
        n(506),
        t.exports = n(81).Array.from
    },
    506: function(t, e, n) {
        "use strict";
        var r = n(82)
          , i = n(79)
          , o = n(112)
          , s = n(479)
          , u = n(480)
          , c = n(103)
          , a = n(507)
          , l = n(481);
        i(i.S + i.F * !n(488)(function(t) {
            Array.from(t)
        }), "Array", {
            from: function(t) {
                var e, n, i, h, p = o(t), f = "function" == typeof this ? this : Array, d = arguments.length, b = d > 1 ? arguments[1] : void 0, v = void 0 !== b, m = 0, y = l(p);
                if (v && (b = r(b, d > 2 ? arguments[2] : void 0, 2)),
                void 0 == y || f == Array && u(y))
                    for (e = c(p.length),
                    n = new f(e); e > m; m++)
                        a(n, m, v ? b(p[m], m) : p[m]);
                else
                    for (h = y.call(p),
                    n = new f; !(i = h.next()).done; m++)
                        a(n, m, v ? s(h, b, [i.value, m], !0) : i.value);
                return n.length = m,
                n
            }
        })
    },
    507: function(t, e, n) {
        "use strict";
        var r = n(85)
          , i = n(93);
        t.exports = function(t, e, n) {
            e in t ? r.f(t, e, i(0, n)) : t[e] = n
        }
    },
    515: function(t, e, n) {
        "use strict";
        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        var i, o;
        e.__esModule = !0,
        i = n(504),
        o = r(i),
        e.default = function(t) {
            if (Array.isArray(t)) {
                for (var e = 0, n = Array(t.length); e < t.length; e++)
                    n[e] = t[e];
                return n
            }
            return (0,
            o.default)(t)
        }
    },
    516: function(t, e) {},
    517: function(t, e) {
        "use strict";
        function n(t, e) {
            void 0 === e && (e = "&nbsp;");
            var n = (t + "").split(".");
            return n[0].replace(/\B(?=(\d{3})+(?!\d))/g, e) + (n[1] ? "." + n[1] : "")
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e.default = n
    },
    518: function(t, e, n) {
        (function(t, e) {
            "use strict";
            function r(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            var i, o, s, u = n(117), c = r(u), a = n(118), l = r(a);
            n(519),
            i = n(174),
            n(430),
            o = {
                wrap: '<span class="tv-control-select__wrap tv-dropdown-behavior {{ class }}{{# touch }} tv-control-select__wrap--touch{{/ touch }}{{# disabled }} i-disabled{{/ disabled }}"><span class="tv-control-select__control{{^ touch }} tv-dropdown-behavior__button{{/ touch }}{{# disabled }} i-disabled{{/ disabled }}"><span class="tv-control-select__control-inner"></span></span>{{^ touch }}<span class="tv-control-select__dropdown tv-dropdown-behavior__body tv-dropdown-behavior__body--from_top {{ dropdown_class }} i-hidden"><span class="tv-control-select__scroll tv-dropdown-behavior__scroll"><span class="tv-dropdown-behavior__inscroll">{{> route }}</span></span></span>{{/ touch }}<span class="tv-control-select__caret js-dropdown-toggle"></span></span>',
                route: "{{# items }}{{# option }}{{> option }}{{/ option }}{{^ option }}{{# optgroup }}{{> optgroup }}{{/ optgroup }}{{/ option }}{{/ items }}",
                optgroup: '<span class="tv-dropdown-behavior__item tv-control-select__optgroup-label">{{ label }}</span>{{> route}}',
                option: '<span data-id="{{ id }}" class="tv-dropdown-behavior__item tv-control-select__option{{# disabled }} i-disabled{{/ disabled }}"><span class="tv-control-select__option-wrap">{{ label }}</span></span>'
            },
            s = function() {
                function e() {
                    var t, n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0,
                    c.default)(this, e),
                    this._options = n,
                    this.touch = Modernizr.touch,
                    this.$select = this._options.$select,
                    this.makeOptionId = this.optionIdMaker(),
                    t = this.$select.attr("multiple"),
                    this.multiple = void 0 === t || !1 === t,
                    this.disabled = !!this.$select.is(":disabled"),
                    this.options = [],
                    this.filterQuery = [],
                    this.items = this.parseDomItems(this.$select),
                    this.render(),
                    this.$el.insertBefore(this.$select),
                    this.$select.detach().addClass("i-inited").appendTo(this.$el)
                }
                return (0,
                l.default)(e, [{
                    key: "optionIdMaker",
                    value: function() {
                        var t = 0;
                        return function() {
                            return t++
                        }
                    }
                }]),
                (0,
                l.default)(e, [{
                    key: "setActive",
                    value: function(t) {
                        this.updateActive(t),
                        (this.$select.val() && "" + this.$select.val()) !== "" + this.options[t].value && this.$select.val(this.options[t].value).trigger("change")
                    }
                }, {
                    key: "updateActive",
                    value: function(t) {
                        var e = this.options[t];
                        e && (this.selectOption(t),
                        this.activeOption = t,
                        this.$controlInner.text(e.label),
                        this.$controlInner.toggleClass("tv-control-select__control-inner--option-disabled", e.disabled))
                    }
                }, {
                    key: "selectOption",
                    value: function(t) {
                        var e, n, r, i, o, s, u = this.options[t].$el;
                        if (this.selectedOption = t,
                        !this.touch) {
                            if (this.$options.removeClass("i-active"),
                            u.addClass("i-active"),
                            !this.dropdownScroll || !this.opened)
                                return;
                            e = this.dropdownScroll.currentPosition(),
                            n = u.outerHeight(),
                            r = u.position().top,
                            i = this.dropdownScroll.getContainerHeight(),
                            o = r < -e,
                            s = -e + i < r + n,
                            o ? this.dropdownScroll.scrollTo(r) : s && this.dropdownScroll.scrollTo(r + n)
                        }
                    }
                }, {
                    key: "val",
                    value: function(t) {
                        this.setActive(this.findOption(t))
                    }
                }, {
                    key: "findOption",
                    value: function(t) {
                        var e, n = Object.keys(this.options);
                        for (e = 0; e < n.length; e++)
                            if ("" + this.options[n[e]].value == "" + t)
                                return this.options[n[e]].id
                    }
                }, {
                    key: "parseDomItems",
                    value: function(t) {
                        var e, n, r, i = t.children(), o = [];
                        for (e = 0; e < i.length; e++)
                            n = $(i[e]),
                            "optgroup" === n.prop("tagName").toLowerCase() ? r = {
                                optgroup: !0,
                                label: n.attr("label"),
                                items: this.parseDomItems(n)
                            } : "option" === n.prop("tagName").toLowerCase() && (r = {
                                id: this.makeOptionId(),
                                option: !0,
                                label: n.text(),
                                value: n.attr("value"),
                                disabled: n.is(":disabled")
                            },
                            this.options[r.id] = r,
                            n.is(":selected") && (this.activeOption = r.id)),
                            o.push(r);
                        return o
                    }
                }, {
                    key: "render",
                    value: function() {
                        var e, n, r, i, s = this;
                        if (this.$el = $(t.render(o.wrap, {
                            items: this.items,
                            class: this.$select.attr("class"),
                            touch: this.touch,
                            multiple: this.multiple,
                            disabled: this.disabled,
                            dropdown_class: this._options.addDropdownClass
                        }, o)).removeClass("tv-control-select"),
                        this.$control = this.$el.find(".tv-control-select__control"),
                        this.$controlInner = this.$el.find(".tv-control-select__control-inner"),
                        !this.touch)
                            for (this.$dropdown = this.$el.find(".tv-control-select__dropdown"),
                            this.$options = this.$el.find(".tv-control-select__option"),
                            e = 0; e < this.$options.length; e++)
                                n = $(this.$options[e]),
                                r = n.data("id"),
                                this.options[r] && (this.options[r].$el = n);
                        if (void 0 === this.activeOption || void 0 === this.options[this.activeOption])
                            for (i in this.options) {
                                this.activeOption = i;
                                break
                            }
                        this.setActive(this.activeOption),
                        this.$select.on("change", function(t) {
                            s.updateActive(s.findOption(s.$select.val()))
                        }),
                        this.touch || (this.$el.tvDropdown({
                            scroll: !0,
                            adaptBody: !0
                        }),
                        this.dropdownScroll = this.$el.tvDropdown("get", "scroll"),
                        this.$dropdown.on("click", ".tv-control-select__option", function(t) {
                            var e = parseInt($(t.currentTarget).data("id"));
                            s.options[e] && !s.options[e].disabled && (s.setActive(e),
                            s.close())
                        }),
                        this.$el.on("beforeOpenMenu", function() {
                            s.opened = !0
                        }),
                        this.$el.on("afterCloseMenu", function() {
                            s.opened = !1,
                            s.filterQuery = [],
                            "" + s.selectedOption != "" + s.activeOption && s.selectOption(s.activeOption)
                        }),
                        this.$el.on("click", function() {
                            s.$control.focus()
                        }),
                        this.$el.on("keydown", function(t) {
                            s.filter(t)
                        }),
                        this.disabled ? this.disable() : this.enable())
                    }
                }, {
                    key: "enable",
                    value: function() {
                        this.disabled = !1,
                        this.$el.add(this.$dropdown).removeClass("i-disabled"),
                        this.touch || (this.$el.tvDropdown("enable"),
                        this.$control.attr("tabindex", this.$select.attr("tabindex") || 0))
                    }
                }, {
                    key: "disable",
                    value: function() {
                        this.disabled = !0,
                        this.$el.add(this.$dropdown).addClass("i-disabled"),
                        this.touch || (this.$el.tvDropdown("disable"),
                        this.$control.removeAttr("tabindex"))
                    }
                }, {
                    key: "toggle",
                    value: function() {
                        this.disabled || (this.touch ? this.$select.click() : this.$el.tvDropdown("toggle"))
                    }
                }, {
                    key: "open",
                    value: function() {
                        this.disabled || (this.touch ? this.$select.click() : this.$el.tvDropdown("open"))
                    }
                }, {
                    key: "close",
                    value: function() {
                        this.disabled || (this.touch ? this.$select.click() : (this.selectOption(this.activeOption),
                        this.$el.tvDropdown("close")))
                    }
                }, {
                    key: "filter",
                    value: function(t) {
                        var e, n, r, i, o, s, u, c = this;
                        if (9 === t.which)
                            return void this.close();
                        if (13 !== t.which || this.opened) {
                            if ((40 === t.which || 32 === t.which) && !this.opened)
                                return this.open(),
                                void t.preventDefault();
                            if (t.preventDefault(),
                            this.opened || this.open(),
                            e = String.fromCharCode(t.which).toLowerCase(),
                            n = [9, 13, 27, 38, 40],
                            e && -1 === n.indexOf(t.which)) {
                                for (this.filterQuery.push(e),
                                r = this.filterQuery.join(""),
                                o = Object.keys(this.options),
                                s = 0; s < o.length; s++)
                                    if (0 === this.options[o[s]].label.toLowerCase().indexOf(r) && !this.options[o[s]].disabled) {
                                        i = this.options[o[s]].id;
                                        break
                                    }
                                void 0 !== i && this.selectOption(i),
                                this.clearFilter && clearTimeout(this.clearFilter),
                                this.clearFilter = setTimeout(function() {
                                    c.filterQuery = []
                                }, 500)
                            }
                            32 !== t.which && 13 !== t.which || !this.opened || (this.setActive(this.selectedOption),
                            this.close(),
                            this.$el.one("keyup", function(t) {
                                return t.stopPropagation()
                            })),
                            u = function(t) {
                                var e, n;
                                return c.options[c.selectedOption] ? (n = c.options[c.selectedOption].$el[t](c.$dropdown, ".tv-control-select__option:not(.i-disabled)"),
                                e = n.length ? n.data("id") : c.selectedOption) : e = c.$options.first(".tv-control-select__option:not(.i-disabled)").data("id"),
                                e
                            }
                            ,
                            40 === t.which && (this.filterQuery = [],
                            this.selectOption(u("nextUntil"))),
                            38 === t.which && (this.filterQuery = [],
                            this.selectOption(u("prevUntil"))),
                            27 === t.which && this.close()
                        }
                    }
                }]),
                e
            }(),
            $.fn.tvControlSelect = (0,
            i.createTvBlockWithInstance)("tv-control-select", function(t) {
                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                return new s(e.extend(n, {
                    $select: t
                }))
            })
        }
        ).call(e, n(72), n(64))
    },
    519: function(t, e) {},
    520: function(t, e, n) {
        "use strict";
        function r(t) {
            var e = document.createElement("div");
            return e.innerHTML = t,
            e.children[0]
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e.combine = e.ticket = e.control = e.timePicker = e.datePicker = e.comboBox = e.textLabel = e.numberInput = e.buttonsGroup = e.checkbox = e.errorLabel = void 0,
        e.createHTML = r,
        n(521),
        n(522),
        n(523),
        n(524),
        e.errorLabel = function(t) {
            var e = t.element
              , r = void 0 === e ? "" : e
              , i = t.containerClass
              , o = void 0 === i ? "" : i;
            return '\n<div class="tv-control-error tv-control-error--fix_size tv-control-error--size_small ' + (Modernizr.touch ? "" : "tv-control-error--for-number-input") + " " + o + '">\n\t' + r + '\n\t<span class="tv-control-error__icon">' + $("<div>").append($(n(525)).attr("focusable", "false")).html() + '</span>\n\t<span class="tv-control-error__messages"></span>\n</div>'
        }
        ,
        e.checkbox = function(t) {
            var e = t.labelText;
            return '\n<label>\n\t<span class="tv-control-checkbox">\n\t\t<input class="tv-control-checkbox__input ' + t.checkboxClass + '" type="checkbox">\n\t\t<span class="tv-control-checkbox__box">' + n(444) + '</span>\n\t\t<span class="tv-control-checkbox__ripple js-ripple"></span>\n\t</span>\n\n\t<span class="tv-control-checkbox__label">' + e + "</span>\n</label>"
        }
        ,
        e.buttonsGroup = function(t) {
            var e = t.containerClass
              , n = void 0 === e ? "" : e
              , r = t.options;
            return '<div class="tv-buttons-group ' + n + '">\n\t' + (void 0 === r ? [] : r).map(function(t) {
                var e = t.optionText;
                return '<div class="tv-buttons-group__option ' + t.optionClass + '">' + e + "</div>"
            }).join("") + "\n</div>"
        }
        ,
        e.numberInput = function(t) {
            var e = t.containerClass
              , n = void 0 === e ? "" : e
              , r = t.inputClass
              , i = void 0 === r ? "" : r
              , o = t.upClass
              , s = void 0 === o ? "" : o
              , u = t.downClass
              , c = void 0 === u ? "" : u;
            return '\n<div class="tv-control-number-input tv-control-number-input--size_small ' + (Modernizr.touch ? "tv-control-number-input--mobile" : "") + " " + n + '">\n\t<input type="text" class="tv-control-number-input__input tv-control-number-input__input--size_small ' + i + '"/>\n\t<div class="tv-control-number-input__controls">\n\t\t<div tabindex="-2" class="tv-control-number-input__wrapper ' + s + '">\n\t\t\t<div class="tv-control-number-input__up"></div>\n\t\t</div>\n\t\t<div class="tv-control-number-input__splinter"></div>\n\t\t<div tabindex="-2" class="tv-control-number-input__wrapper ' + c + '">\n\t\t\t<div class="tv-control-number-input__down"></div>\n\t\t</div>\n\t</div>\n</div>'
        }
        ,
        e.textLabel = function(t) {
            var e = t.outputClass
              , n = void 0 === e ? "" : e
              , r = t.outputText;
            return '\n<div class="tv-text-label js-text-label">\n\t<div class="tv-text-label__label">=</div>\n\t<div class="tv-text-label__value ' + n + '">' + (void 0 === r ? "" : r) + "</div>\n</div>"
        }
        ,
        e.comboBox = function(t) {
            var e = t.outputClass;
            return '\n<select class="' + (void 0 === e ? "" : e) + ' tv-control-select tv-control-select--size_small"></select>\n'
        }
        ,
        e.datePicker = function(t) {
            var e = t.outputClass;
            return '\n<div class="' + (void 0 === e ? "" : e) + '">\n\t<input type="text" placeholder="yyyy-mm-dd" class="tv-control-input tv-control-input--size_small">\n</div>\n'
        }
        ,
        e.timePicker = function(t) {
            var e = t.outputClass;
            return '\n<div class="' + (void 0 === e ? "" : e) + '">\n\t<input type="text" placeholder="hh:mm" name="expired-time" class="tv-control-input tv-control-input--size_small">\n</div>\n'
        }
        ,
        e.control = function(t) {
            var e = t.containerClass;
            return '\n<div class="tv-ticket__field ' + (void 0 === e ? "" : e) + '">\n\t<div class="tv-ticket__label">' + t.label + '</div>\n\t<div class="tv-ticket__inputs">\n\t\t<div class="tv-ticket__input js-first-control">\n\t\t\t' + t.selector + '\n\t\t</div>\n\n\t\t<div class="tv-ticket__input js-second-control">\n\t\t\t' + t.input + '\n\t\t</div>\n\n\t\t<div class="tv-ticket__input js-third-control">\n\t\t\t' + t.output + "\n\t\t</div>\n\t</div>\n</div>"
        }
        ,
        e.ticket = function(t) {
            var e = t.body
              , n = void 0 === e ? "" : e
              , r = t.riskRewardClass
              , i = void 0 === r ? "" : r
              , o = t.riskClass
              , s = void 0 === o ? "" : o
              , u = t.doneText
              , c = void 0 === u ? "" : u
              , a = t.doneClass
              , l = void 0 === a ? "" : a
              , h = t.profitClass;
            return '\n<div class="tv-ticket">\n\t' + n + '\n\t<div class="tv-ticket__submit">\n\t\t<div class="tv-ticket__risk">\n\t\t\t<div class="' + s + '"></div>\n\t\t\t<div class="' + i + '"></div>\n\t\t\t<div class="' + (void 0 === h ? "" : h) + '"></div>\n\t\t</div>\n\t\t<span class="tv-button tv-button--primary ' + l + '">' + c + "</span>\n\t</div>\n</div>"
        }
        ,
        e.combine = function() {
            for (var t = arguments.length, e = Array(t), n = 0; n < t; n++)
                e[n] = arguments[n];
            return e.join("")
        }
    },
    521: function(t, e) {},
    522: function(t, e) {},
    523: function(t, e) {},
    524: function(t, e) {},
    525: function(t, e) {
        t.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 508.52 508.52" enable-background="new 0 0 508.52 508.52"><path d="M254.26 0c-140.415 0-254.26 113.845-254.26 254.26s113.845 254.26 254.26 254.26 254.26-113.845 254.26-254.26-113.845-254.26-254.26-254.26zm0 412.664c-17.544 0-31.782-14.239-31.782-31.782 0-17.576 14.239-31.782 31.782-31.782s31.782 14.207 31.782 31.782c0 17.543-14.238 31.782-31.782 31.782zm31.782-126.622c0 17.544-14.239 31.782-31.782 31.782s-31.782-14.239-31.782-31.782v-158.912c0-17.544 14.239-31.782 31.782-31.782s31.782 14.239 31.782 31.782v158.912z"/></svg>'
    },
    526: function(t, e, n) {
        var r;
        (function(t, i, o) {
            (function(s) {
                function u(t) {
                    return t && t.Object === Object ? t : null
                }
                function c(t) {
                    var e, n = t.length, r = Array(n);
                    for (e = 0; e < n; e++)
                        r[e] = t[e];
                    return r
                }
                function a(t) {
                    return function() {
                        try {
                            return t.apply(this, arguments)
                        } catch (t) {
                            return Ei.e = t,
                            Ei
                        }
                    }
                }
                function l(t) {
                    throw t
                }
                function h(t, e) {
                    var n, r, i;
                    if (at && e.stack && "object" == typeof t && null !== t && t.stack && -1 === t.stack.indexOf(ft)) {
                        for (n = [],
                        r = e; r; r = r.source)
                            r.stack && n.unshift(r.stack);
                        n.unshift(t.stack),
                        i = n.join("\n" + ft + "\n"),
                        t.stack = p(i)
                    }
                }
                function p(t) {
                    var e, n, r, i = t.split("\n"), o = [];
                    for (e = 0,
                    n = i.length; e < n; e++)
                        r = i[e],
                        f(r) || d(r) || !r || o.push(r);
                    return o.join("\n")
                }
                function f(t) {
                    var e, n, r = v(t);
                    return !!r && (e = r[0],
                    n = r[1],
                    e === pt && n >= ht && n <= ri)
                }
                function d(t) {
                    return -1 !== t.indexOf("(module.js:") || -1 !== t.indexOf("(node.js:")
                }
                function b() {
                    var t, e, n;
                    if (at)
                        try {
                            throw Error()
                        } catch (r) {
                            if (t = r.stack.split("\n"),
                            e = t[0].indexOf("@") > 0 ? t[1] : t[2],
                            !(n = v(e)))
                                return;
                            return pt = n[0],
                            n[1]
                        }
                }
                function v(t) {
                    var e, n, r = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(t);
                    return r ? [r[1], +r[2]] : (e = /at ([^ ]+):(\d+):(?:\d+)$/.exec(t)) ? [e[1], +e[2]] : (n = /.*@(.+):(\d+)$/.exec(t),
                    n ? [n[1], +n[2]] : s)
                }
                function m(t, e, n, r, i, o) {
                    var u, c, a, l, h, p, f, d, b = te(t), v = b.length;
                    if (v !== te(e).length && !r)
                        return !1;
                    for (u = v; u--; )
                        if (c = b[u],
                        !(r ? c in e : Zt.call(e, c)))
                            return !1;
                    for (a = r; ++u < v; ) {
                        if (c = b[u],
                        l = t[c],
                        h = e[c],
                        !(p === s ? n(l, h, r, i, o) : p))
                            return !1;
                        a || (a = "constructor" === c)
                    }
                    return !(!a && (f = t.constructor,
                    d = e.constructor,
                    f !== d && "constructor"in t && "constructor"in e && !("function" == typeof f && f instanceof f && "function" == typeof d && d instanceof d)))
                }
                function y(t, e, n) {
                    switch (n) {
                    case Dt:
                    case $t:
                        return +t == +e;
                    case Tt:
                        return t.name === e.name && t.message === e.message;
                    case At:
                        return t !== +t ? e !== +e : t === +e;
                    case Nt:
                    case qt:
                        return t === e + ""
                    }
                    return !1
                }
                function _(t) {
                    return !!t && "object" == typeof t
                }
                function w(t) {
                    return "number" == typeof t && t > -1 && t % 1 == 0 && t <= Xt
                }
                function g(t) {
                    return _(t) && w(t.length) && !!Qt[Jt.call(t)]
                }
                function E(t, e) {
                    for (var n = -1, r = t.length; ++n < r; )
                        if (e(t[n], n, t))
                            return !0;
                    return !1
                }
                function C(t, e, n, r, i, o) {
                    var u, c, a, l = -1, h = t.length, p = e.length;
                    if (h !== p && !(r && p > h))
                        return !1;
                    for (; ++l < h; ) {
                        if (u = t[l],
                        c = e[l],
                        a !== s) {
                            if (a)
                                continue;
                            return !1
                        }
                        if (r) {
                            if (!E(e, function(t) {
                                return u === t || n(u, t, r, i, o)
                            }))
                                return !1
                        } else if (u !== c && !n(u, c, r, i, o))
                            return !1
                    }
                    return !0
                }
                function k(t, e, n, r, i, o) {
                    var s, u, c, a, l, h, p, f = re(t), d = re(e), b = St, v = St;
                    if (f || (b = Jt.call(t),
                    b === xt ? b = Lt : b !== Lt && (f = g(t))),
                    d || (v = Jt.call(e)) === xt && (v = Lt),
                    s = b === Lt && !ne(t),
                    u = v === Lt && !ne(e),
                    c = b === v,
                    c && !f && !s)
                        return y(t, e, b);
                    if (!r && (a = s && Zt.call(t, "__wrapped__"),
                    l = u && Zt.call(e, "__wrapped__"),
                    a || l))
                        return n(a ? t.value() : t, l ? e.value() : e, r, i, o);
                    if (!c)
                        return !1;
                    for (i || (i = []),
                    o || (o = []),
                    h = i.length; h--; )
                        if (i[h] === t)
                            return o[h] === e;
                    return i.push(t),
                    o.push(e),
                    p = (f ? C : m)(t, e, n, r, i, o),
                    i.pop(),
                    o.pop(),
                    p
                }
                function O(t, e, n, r, i) {
                    return t === e || (null == t || null == e || !ee(t) && !_(e) ? t !== t && e !== e : k(t, e, O, n, r, i))
                }
                function x(t, e) {
                    var n, r = Array(t);
                    for (n = 0; n < t; n++)
                        r[n] = e();
                    return r
                }
                function S(t, e) {
                    this.id = t,
                    this.value = e
                }
                function D(t) {
                    this._s = t,
                    this.isDisposed = !1
                }
                function $(t) {
                    this._s = t
                }
                function T(t) {
                    this._s = t,
                    this._l = t.length,
                    this._i = 0
                }
                function P(t) {
                    this._a = t
                }
                function j(t) {
                    this._a = t,
                    this._l = R(t),
                    this._i = 0
                }
                function A(t) {
                    return "number" == typeof t && pi.isFinite(t)
                }
                function L(t) {
                    var e, n = t[wt];
                    if (!n && "string" == typeof t)
                        return e = new $(t),
                        e[wt]();
                    if (!n && t.length !== s)
                        return e = new P(t),
                        e[wt]();
                    if (!n)
                        throw new TypeError("Object is not iterable");
                    return t[wt]()
                }
                function N(t) {
                    var e = +t;
                    return 0 === e ? e : isNaN(e) ? e : e < 0 ? -1 : 1
                }
                function R(t) {
                    var e = +t.length;
                    return isNaN(e) ? 0 : 0 !== e && A(e) ? (e = N(e) * Math.floor(Math.abs(e)),
                    e <= 0 ? 0 : e > fn ? fn : e) : e
                }
                function q(t, e) {
                    return Ee(t) || (t = xe),
                    new bn(e,t)
                }
                function I(t, e) {
                    this.observer = t,
                    this.parent = e
                }
                function M() {
                    return !1
                }
                function F() {
                    var t, e = arguments.length, n = Array(e);
                    for (t = 0; t < e; t++)
                        n[t] = arguments[t];
                    return n
                }
                function M() {
                    return !1
                }
                function F() {
                    var t, e = arguments.length, n = Array(e);
                    for (t = 0; t < e; t++)
                        n[t] = arguments[t];
                    return n
                }
                function M() {
                    return !1
                }
                function V() {
                    return []
                }
                function M() {
                    return !1
                }
                function V() {
                    return []
                }
                function F() {
                    var t, e = arguments.length, n = Array(e);
                    for (t = 0; t < e; t++)
                        n[t] = arguments[t];
                    return n
                }
                function U(t) {
                    return function(e) {
                        return t.subscribe(e)
                    }
                }
                function Y(t) {
                    return {
                        "@@iterator": function() {
                            return {
                                next: function() {
                                    return {
                                        done: !1,
                                        value: t
                                    }
                                }
                            }
                        }
                    }
                }
                function Y(t) {
                    return {
                        "@@iterator": function() {
                            return {
                                next: function() {
                                    return {
                                        done: !1,
                                        value: t
                                    }
                                }
                            }
                        }
                    }
                }
                function z(t, e) {
                    return function(n) {
                        var r, i, o = n;
                        for (r = 0; r < e; r++) {
                            if (i = o[t[r]],
                            s === i)
                                return s;
                            o = i
                        }
                        return o
                    }
                }
                function B(t, e, n, r) {
                    var i = new Xr;
                    return r.push(H(i, e, n)),
                    t.apply(e, r),
                    i.asObservable()
                }
                function H(t, e, n) {
                    return function() {
                        var r, i = arguments.length, o = Array(i);
                        for (r = 0; r < i; r++)
                            o[r] = arguments[r];
                        if (gi(n)) {
                            if ((o = Ci(n).apply(e, o)) === Ei)
                                return t.onError(o.e);
                            t.onNext(o)
                        } else
                            o.length <= 1 ? t.onNext(o[0]) : t.onNext(o);
                        t.onCompleted()
                    }
                }
                function W(t, e, n, r) {
                    var i = new Xr;
                    return r.push(K(i, e, n)),
                    t.apply(e, r),
                    i.asObservable()
                }
                function K(t, e, n) {
                    return function() {
                        var r, i, o, s = arguments[0];
                        if (s)
                            return t.onError(s);
                        for (r = arguments.length,
                        i = [],
                        o = 1; o < r; o++)
                            i[o - 1] = arguments[o];
                        if (gi(n)) {
                            if ((i = Ci(n).apply(e, i)) === Ei)
                                return t.onError(i.e);
                            t.onNext(i)
                        } else
                            i.length <= 1 ? t.onNext(i[0]) : t.onNext(i);
                        t.onCompleted()
                    }
                }
                function Q(t) {
                    return pi.StaticNodeList ? t instanceof pi.StaticNodeList || t instanceof pi.NodeList : "[object NodeList]" === Object.prototype.toString.call(t)
                }
                function G(t, e, n) {
                    this._e = t,
                    this._n = e,
                    this._fn = n,
                    this._e.addEventListener(this._n, this._fn, !1),
                    this.isDisposed = !1
                }
                function Z(t, e, n) {
                    var r, i, o = new ue, s = Object.prototype.toString.call(t);
                    if (Q(t) || "[object HTMLCollection]" === s)
                        for (r = 0,
                        i = t.length; r < i; r++)
                            o.add(Z(t.item(r), e, n));
                    else
                        t && o.add(new G(t,e,n));
                    return o
                }
                function J(t, e) {
                    return new Lr(t,e)
                }
                function X(t, e, n) {
                    return new Qr(function(r) {
                        var i = t
                          , o = ge(e);
                        return n.scheduleRecursiveFuture(0, i, function(t, e) {
                            if (o > 0) {
                                var s = n.now();
                                i = new Date(i.getTime() + o),
                                i.getTime() <= s && (i = new Date(s + o))
                            }
                            r.onNext(t),
                            e(t + 1, new Date(i))
                        })
                    }
                    )
                }
                function tt(t, e, n) {
                    return t === e ? new Qr(function(t) {
                        return n.schedulePeriodic(0, e, function(e) {
                            return t.onNext(e),
                            e + 1
                        })
                    }
                    ) : cn(function() {
                        return X(new Date(n.now() + t), e, n)
                    })
                }
                function et(t, e, n) {
                    return new Qr(function(r) {
                        var i, o = !1, s = new ve, u = null, c = [], a = !1;
                        return i = t.materialize().timestamp(n).subscribe(function(t) {
                            var i, l;
                            "E" === t.value.kind ? (c = [],
                            c.push(t),
                            u = t.value.error,
                            l = !a) : (c.push({
                                value: t.value,
                                timestamp: t.timestamp + e
                            }),
                            l = !o,
                            o = !0),
                            l && (null !== u ? r.onError(u) : (i = new be,
                            s.setDisposable(i),
                            i.setDisposable(n.scheduleRecursiveFuture(null, e, function(t, e) {
                                var i, s, l, h;
                                if (null === u) {
                                    a = !0;
                                    do {
                                        l = null,
                                        c.length > 0 && c[0].timestamp - n.now() <= 0 && (l = c.shift().value),
                                        null !== l && l.accept(r)
                                    } while (null !== l);h = !1,
                                    s = 0,
                                    c.length > 0 ? (h = !0,
                                    s = Math.max(0, c[0].timestamp - n.now())) : o = !1,
                                    i = u,
                                    a = !1,
                                    null !== i ? r.onError(i) : h && e(null, s)
                                }
                            }))))
                        }),
                        new me(i,s)
                    }
                    ,t)
                }
                function nt(t, e, n) {
                    return cn(function() {
                        return et(t, e - n.now(), n)
                    })
                }
                function rt(t, e, n) {
                    var r, i;
                    return gi(e) ? i = e : (r = e,
                    i = n),
                    new Qr(function(e) {
                        function n() {
                            c.setDisposable(t.subscribe(function(t) {
                                var n, r = Ci(i)(t);
                                if (r === Ei)
                                    return e.onError(r.e);
                                n = new be,
                                s.add(n),
                                n.setDisposable(r.subscribe(function() {
                                    e.onNext(t),
                                    s.remove(n),
                                    o()
                                }, function(t) {
                                    e.onError(t)
                                }, function() {
                                    e.onNext(t),
                                    s.remove(n),
                                    o()
                                }))
                            }, function(t) {
                                e.onError(t)
                            }, function() {
                                u = !0,
                                c.dispose(),
                                o()
                            }))
                        }
                        function o() {
                            u && 0 === s.length && e.onCompleted()
                        }
                        var s = new ue
                          , u = !1
                          , c = new ve;
                        return r ? c.setDisposable(r.subscribe(n, function(t) {
                            e.onError(t)
                        }, n)) : n(),
                        new me(c,s)
                    }
                    ,t)
                }
                function it(t, e) {
                    return new Qr(function(n) {
                        var r, i = !1, o = new ve, s = 0, u = t.subscribe(function(t) {
                            var u, c, a = Ci(e)(t);
                            if (a === Ei)
                                return n.onError(a.e);
                            wi(a) && (a = Tr(a)),
                            i = !0,
                            r = t,
                            s++,
                            u = s,
                            c = new be,
                            o.setDisposable(c),
                            c.setDisposable(a.subscribe(function() {
                                i && s === u && n.onNext(r),
                                i = !1,
                                c.dispose()
                            }, function(t) {
                                n.onError(t)
                            }, function() {
                                i && s === u && n.onNext(r),
                                i = !1,
                                c.dispose()
                            }))
                        }, function(t) {
                            o.dispose(),
                            n.onError(t),
                            i = !1,
                            s++
                        }, function() {
                            o.dispose(),
                            i && n.onNext(r),
                            n.onCompleted(),
                            i = !1,
                            s++
                        });
                        return new me(u,o)
                    }
                    ,t)
                }
                function ot(t, e, n, r) {
                    return gi(e) && (r = n,
                    n = e,
                    e = _n()),
                    Ke.isObservable(r) || (r = On(new Yr)),
                    new Qr(function(i) {
                        function o(t) {
                            function e() {
                                return c = n === u
                            }
                            var n = u
                              , o = new be;
                            l.setDisposable(o),
                            o.setDisposable(t.subscribe(function() {
                                e() && a.setDisposable(r.subscribe(i)),
                                o.dispose()
                            }, function(t) {
                                e() && i.onError(t)
                            }, function() {
                                e() && a.setDisposable(r.subscribe(i))
                            }))
                        }
                        function s() {
                            var t = !c;
                            return t && u++,
                            t
                        }
                        var u, c, a = new ve, l = new ve, h = new be;
                        return a.setDisposable(h),
                        u = 0,
                        c = !1,
                        o(e),
                        h.setDisposable(t.subscribe(function(t) {
                            if (s()) {
                                i.onNext(t);
                                var e = Ci(n)(t);
                                if (e === Ei)
                                    return i.onError(e.e);
                                o(wi(e) ? Tr(e) : e)
                            }
                        }, function(t) {
                            s() && i.onError(t)
                        }, function() {
                            s() && i.onCompleted()
                        })),
                        new me(a,l)
                    }
                    ,t)
                }
                function st(t, e, n, r) {
                    return Ee(n) && (r = n,
                    n = On(new Yr)),
                    n instanceof Error && (n = On(n)),
                    Ee(r) || (r = Ae),
                    Ke.isObservable(n) || (n = On(new Yr)),
                    new Qr(function(i) {
                        function o() {
                            var t = s;
                            l.setDisposable(r.scheduleFuture(null, e, function() {
                                (a = s === t) && (wi(n) && (n = Tr(n)),
                                c.setDisposable(n.subscribe(i)))
                            }))
                        }
                        var s = 0
                          , u = new be
                          , c = new ve
                          , a = !1
                          , l = new ve;
                        return c.setDisposable(u),
                        o(),
                        u.setDisposable(t.subscribe(function(t) {
                            a || (s++,
                            i.onNext(t),
                            o())
                        }, function(t) {
                            a || (s++,
                            i.onError(t))
                        }, function() {
                            a || (s++,
                            i.onCompleted())
                        })),
                        new me(c,l)
                    }
                    ,t)
                }
                function ut(t, e, n) {
                    return new Qr(function(r) {
                        function i(t, e) {
                            if (a[e] = t,
                            s[e] = !0,
                            u || (u = s.every(bi))) {
                                if (o)
                                    return r.onError(o);
                                var i = Ci(n).apply(null, a);
                                if (i === Ei)
                                    return r.onError(i.e);
                                r.onNext(i)
                            }
                            c && a[1] && r.onCompleted()
                        }
                        var o, s = [!1, !1], u = !1, c = !1, a = Array(2);
                        return new me(t.subscribe(function(t) {
                            i(t, 0)
                        }, function(t) {
                            a[1] ? r.onError(t) : o = t
                        }, function() {
                            c = !0,
                            a[1] && r.onCompleted()
                        }),e.subscribe(function(t) {
                            i(t, 1)
                        }, function(t) {
                            r.onError(t)
                        }, function() {
                            c = !0,
                            i(!0, 1)
                        }))
                    }
                    ,t)
                }
                function ct(t) {
                    return {
                        "@@transducer/init": function() {
                            return t
                        },
                        "@@transducer/step": function(t, e) {
                            return t.onNext(e)
                        },
                        "@@transducer/result": function(t) {
                            return t.onCompleted()
                        }
                    }
                }
                var at, lt, ht, pt, ft, dt, bt, vt, mt, yt, _t, wt, gt, Et, Ct, kt, Ot, xt, St, Dt, $t, Tt, Pt, jt, At, Lt, Nt, Rt, qt, It, Mt, Ft, Vt, Ut, Yt, zt, Bt, Ht, Wt, Kt, Qt, Gt, Zt, Jt, Xt, te, ee, ne, re, ie, oe, se, ue, ce, ae, le, he, pe, fe, de, be, ve, me, ye, _e, we, ge, Ee, Ce, ke, Oe, xe, Se, De, $e, Te, Pe, je, Ae, Le, Ne, Re, qe, Ie, Me, Fe, Ve, Ue, Ye, ze, Be, He, We, Ke, Qe, Ge, Ze, Je, Xe, tn, en, nn, rn, on, sn, un, cn, an, ln, hn, pn, fn, dn, bn, vn, mn, yn, _n, wn, gn, En, Cn, kn, On, xn, Sn, Dn, $n, Tn, Pn, jn, An, Ln, Nn, Rn, qn, In, Mn, Fn, Vn, Un, Yn, zn, Bn, Hn, Wn, Kn, Qn, Gn, Zn, Jn, Xn, tr, er, nr, rr, ir, or, sr, ur, cr, ar, lr, hr, pr, fr, dr, br, vr, mr, yr, _r, wr, gr, Er, Cr, kr, Or, xr, Sr, Dr, $r, Tr, Pr, jr, Ar, Lr, Nr, Rr, qr, Ir, Mr, Fr, Vr, Ur, Yr, zr, Br, Hr, Wr, Kr, Qr, Gr, Zr, Jr, Xr, ti, ei, ni, ri, ii = {
                    function: !0,
                    object: !0
                }, oi = ii[typeof e] && e && !e.nodeType ? e : null, si = ii[typeof t] && t && !t.nodeType ? t : null, ui = u(oi && si && "object" == typeof i && i), ci = u(ii[typeof self] && self), ai = u(ii[typeof window] && window), li = si && si.exports === oi ? oi : null, hi = u(ii[typeof this] && this), pi = ui || ai !== (hi && hi.window) && ai || ci || hi || Function("return this")(), fi = {
                    internals: {},
                    config: {
                        Promise: pi.Promise
                    },
                    helpers: {}
                }, di = fi.helpers.noop = function() {}
                , bi = fi.helpers.identity = function(t) {
                    return t
                }
                , vi = fi.helpers.defaultNow = Date.now, mi = fi.helpers.defaultComparer = function(t, e) {
                    return ie(t, e)
                }
                , yi = fi.helpers.defaultSubComparer = function(t, e) {
                    return t > e ? 1 : t < e ? -1 : 0
                }
                , _i = (fi.helpers.defaultKeySerializer = function(t) {
                    return "" + t
                }
                ,
                fi.helpers.defaultError = function(t) {
                    throw t
                }
                ), wi = fi.helpers.isPromise = function(t) {
                    return !!t && "function" != typeof t.subscribe && "function" == typeof t.then
                }
                , gi = fi.helpers.isFunction = function() {
                    var t = function(t) {
                        return "function" == typeof t || !1
                    };
                    return t(/x/) && (t = function(t) {
                        return "function" == typeof t && "[object Function]" == toString.call(t)
                    }
                    ),
                    t
                }(), Ei = {
                    e: {}
                }, Ci = fi.internals.tryCatch = function(t) {
                    if (!gi(t))
                        throw new TypeError("fn must be a function");
                    return a(t)
                }
                ;
                fi.config.longStackSupport = !1,
                at = !1,
                lt = Ci(function() {
                    throw Error()
                })(),
                at = !!lt.e && !!lt.e.stack,
                ht = b(),
                ft = "From previous event:",
                dt = fi.EmptyError = function() {
                    this.message = "Sequence contains no elements.",
                    Error.call(this)
                }
                ,
                dt.prototype = Object.create(Error.prototype),
                dt.prototype.name = "EmptyError",
                bt = fi.ObjectDisposedError = function() {
                    this.message = "Object has been disposed",
                    Error.call(this)
                }
                ,
                bt.prototype = Object.create(Error.prototype),
                bt.prototype.name = "ObjectDisposedError",
                vt = fi.ArgumentOutOfRangeError = function() {
                    this.message = "Argument out of range",
                    Error.call(this)
                }
                ,
                vt.prototype = Object.create(Error.prototype),
                vt.prototype.name = "ArgumentOutOfRangeError",
                mt = fi.NotSupportedError = function(t) {
                    this.message = t || "This operation is not supported",
                    Error.call(this)
                }
                ,
                mt.prototype = Object.create(Error.prototype),
                mt.prototype.name = "NotSupportedError",
                yt = fi.NotImplementedError = function(t) {
                    this.message = t || "This operation is not implemented",
                    Error.call(this)
                }
                ,
                yt.prototype = Object.create(Error.prototype),
                yt.prototype.name = "NotImplementedError",
                _t = fi.helpers.notImplemented = function() {
                    throw new yt
                }
                ,
                fi.helpers.notSupported = function() {
                    throw new mt
                }
                ,
                wt = "function" == typeof Symbol && Symbol.iterator || "_es6shim_iterator_",
                pi.Set && "function" == typeof (new pi.Set)["@@iterator"] && (wt = "@@iterator"),
                gt = fi.doneEnumerator = {
                    done: !0,
                    value: s
                },
                Et = fi.helpers.isIterable = function(t) {
                    return t && t[wt] !== s
                }
                ,
                Ct = fi.helpers.isArrayLike = function(t) {
                    return t && t.length !== s
                }
                ,
                fi.helpers.iterator = wt,
                kt = fi.internals.bindCallback = function(t, e, n) {
                    if (s === e)
                        return t;
                    switch (n) {
                    case 0:
                        return function() {
                            return t.call(e)
                        }
                        ;
                    case 1:
                        return function(n) {
                            return t.call(e, n)
                        }
                        ;
                    case 2:
                        return function(n, r) {
                            return t.call(e, n, r)
                        }
                        ;
                    case 3:
                        return function(n, r, i) {
                            return t.call(e, n, r, i)
                        }
                    }
                    return function() {
                        return t.apply(e, arguments)
                    }
                }
                ,
                Ot = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
                Ot.length,
                xt = "[object Arguments]",
                St = "[object Array]",
                Dt = "[object Boolean]",
                $t = "[object Date]",
                Tt = "[object Error]",
                Pt = "[object Function]",
                jt = "[object Map]",
                At = "[object Number]",
                Lt = "[object Object]",
                Nt = "[object RegExp]",
                Rt = "[object Set]",
                qt = "[object String]",
                It = "[object WeakMap]",
                Mt = "[object ArrayBuffer]",
                Ft = "[object Float32Array]",
                Vt = "[object Float64Array]",
                Ut = "[object Int8Array]",
                Yt = "[object Int16Array]",
                zt = "[object Int32Array]",
                Bt = "[object Uint8Array]",
                Ht = "[object Uint8ClampedArray]",
                Wt = "[object Uint16Array]",
                Kt = "[object Uint32Array]",
                Qt = {},
                Qt[Ft] = Qt[Vt] = Qt[Ut] = Qt[Yt] = Qt[zt] = Qt[Bt] = Qt[Ht] = Qt[Wt] = Qt[Kt] = !0,
                Qt[xt] = Qt[St] = Qt[Mt] = Qt[Dt] = Qt[$t] = Qt[Tt] = Qt[Pt] = Qt[jt] = Qt[At] = Qt[Lt] = Qt[Nt] = Qt[Rt] = Qt[qt] = Qt[It] = !1,
                Gt = Object.prototype,
                Zt = Gt.hasOwnProperty,
                Jt = Gt.toString,
                Xt = Math.pow(2, 53) - 1,
                te = Object.keys || function() {
                    var t = Object.prototype.hasOwnProperty
                      , e = !{
                        toString: null
                    }.propertyIsEnumerable("toString")
                      , n = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"]
                      , r = n.length;
                    return function(i) {
                        if ("object" != typeof i && ("function" != typeof i || null === i))
                            throw new TypeError("Object.keys called on non-object");
                        var o, s, u = [];
                        for (o in i)
                            t.call(i, o) && u.push(o);
                        if (e)
                            for (s = 0; s < r; s++)
                                t.call(i, n[s]) && u.push(n[s]);
                        return u
                    }
                }(),
                ee = fi.internals.isObject = function(t) {
                    var e = typeof t;
                    return !!t && ("object" === e || "function" === e)
                }
                ,
                ne = function() {
                    try {
                        Object({
                            toString: 0
                        } + "")
                    } catch (t) {
                        return function() {
                            return !1
                        }
                    }
                    return function(t) {
                        return "function" != typeof t.toString && "string" == typeof (t + "")
                    }
                }(),
                re = Array.isArray || function(t) {
                    return _(t) && w(t.length) && Jt.call(t) === St
                }
                ,
                ie = fi.internals.isEqual = function(t, e) {
                    return O(t, e)
                }
                ,
                {}.hasOwnProperty,
                Array.prototype.slice,
                oe = fi.internals.inherits = function(t, e) {
                    function n() {
                        this.constructor = t
                    }
                    n.prototype = e.prototype,
                    t.prototype = new n
                }
                ,
                se = fi.internals.addProperties = function(t) {
                    var e, n, r, i, o, s, u;
                    for (e = [],
                    n = 1,
                    r = arguments.length; n < r; n++)
                        e.push(arguments[n]);
                    for (i = 0,
                    o = e.length; i < o; i++) {
                        s = e[i];
                        for (u in s)
                            t[u] = s[u]
                    }
                }
                ,
                fi.internals.addRef = function(t, e) {
                    return new Qr(function(n) {
                        return new me(e.getDisposable(),t.subscribe(n))
                    }
                    )
                }
                ,
                ue = fi.CompositeDisposable = function() {
                    var t, e, n = [];
                    if (Array.isArray(arguments[0]))
                        n = arguments[0];
                    else
                        for (e = arguments.length,
                        n = Array(e),
                        t = 0; t < e; t++)
                            n[t] = arguments[t];
                    this.disposables = n,
                    this.isDisposed = !1,
                    this.length = n.length
                }
                ,
                ce = ue.prototype,
                ce.add = function(t) {
                    this.isDisposed ? t.dispose() : (this.disposables.push(t),
                    this.length++)
                }
                ,
                ce.remove = function(t) {
                    var e, n = !1;
                    return this.isDisposed || -1 !== (e = this.disposables.indexOf(t)) && (n = !0,
                    this.disposables.splice(e, 1),
                    this.length--,
                    t.dispose()),
                    n
                }
                ,
                ce.dispose = function() {
                    var t, e, n;
                    if (!this.isDisposed) {
                        for (this.isDisposed = !0,
                        t = this.disposables.length,
                        e = Array(t),
                        n = 0; n < t; n++)
                            e[n] = this.disposables[n];
                        for (this.disposables = [],
                        this.length = 0,
                        n = 0; n < t; n++)
                            e[n].dispose()
                    }
                }
                ,
                ae = fi.Disposable = function(t) {
                    this.isDisposed = !1,
                    this.action = t || di
                }
                ,
                ae.prototype.dispose = function() {
                    this.isDisposed || (this.action(),
                    this.isDisposed = !0)
                }
                ,
                le = ae.create = function(t) {
                    return new ae(t)
                }
                ,
                he = ae.empty = {
                    dispose: di
                },
                pe = ae.isDisposable = function(t) {
                    return t && gi(t.dispose)
                }
                ,
                fe = ae.checkDisposed = function(t) {
                    if (t.isDisposed)
                        throw new bt
                }
                ,
                de = ae._fixup = function(t) {
                    return pe(t) ? t : he
                }
                ,
                be = fi.SingleAssignmentDisposable = function() {
                    this.isDisposed = !1,
                    this.current = null
                }
                ,
                be.prototype.getDisposable = function() {
                    return this.current
                }
                ,
                be.prototype.setDisposable = function(t) {
                    if (this.current)
                        throw Error("Disposable has already been assigned");
                    var e = this.isDisposed;
                    !e && (this.current = t),
                    e && t && t.dispose()
                }
                ,
                be.prototype.dispose = function() {
                    if (!this.isDisposed) {
                        this.isDisposed = !0;
                        var t = this.current;
                        this.current = null,
                        t && t.dispose()
                    }
                }
                ,
                ve = fi.SerialDisposable = function() {
                    this.isDisposed = !1,
                    this.current = null
                }
                ,
                ve.prototype.getDisposable = function() {
                    return this.current
                }
                ,
                ve.prototype.setDisposable = function(t) {
                    var e, n = this.isDisposed;
                    n || (e = this.current,
                    this.current = t),
                    e && e.dispose(),
                    n && t && t.dispose()
                }
                ,
                ve.prototype.dispose = function() {
                    if (!this.isDisposed) {
                        this.isDisposed = !0;
                        var t = this.current;
                        this.current = null
                    }
                    t && t.dispose()
                }
                ,
                me = fi.BinaryDisposable = function(t, e) {
                    this._first = t,
                    this._second = e,
                    this.isDisposed = !1
                }
                ,
                me.prototype.dispose = function() {
                    var t, e;
                    this.isDisposed || (this.isDisposed = !0,
                    t = this._first,
                    this._first = null,
                    t && t.dispose(),
                    e = this._second,
                    this._second = null,
                    e && e.dispose())
                }
                ,
                ye = fi.NAryDisposable = function(t) {
                    this._disposables = t,
                    this.isDisposed = !1
                }
                ,
                ye.prototype.dispose = function() {
                    if (!this.isDisposed) {
                        this.isDisposed = !0;
                        for (var t = 0, e = this._disposables.length; t < e; t++)
                            this._disposables[t].dispose();
                        this._disposables.length = 0
                    }
                }
                ,
                fi.RefCountDisposable = function() {
                    function t(t) {
                        this.disposable = t,
                        this.disposable.count++,
                        this.isInnerDisposed = !1
                    }
                    function e(t) {
                        this.underlyingDisposable = t,
                        this.isDisposed = !1,
                        this.isPrimaryDisposed = !1,
                        this.count = 0
                    }
                    return t.prototype.dispose = function() {
                        this.disposable.isDisposed || this.isInnerDisposed || (this.isInnerDisposed = !0,
                        0 === --this.disposable.count && this.disposable.isPrimaryDisposed && (this.disposable.isDisposed = !0,
                        this.disposable.underlyingDisposable.dispose()))
                    }
                    ,
                    e.prototype.dispose = function() {
                        this.isDisposed || this.isPrimaryDisposed || (this.isPrimaryDisposed = !0,
                        0 === this.count && (this.isDisposed = !0,
                        this.underlyingDisposable.dispose()))
                    }
                    ,
                    e.prototype.getDisposable = function() {
                        return this.isDisposed ? he : new t(this)
                    }
                    ,
                    e
                }(),
                _e = fi.internals.ScheduledItem = function(t, e, n, r, i) {
                    this.scheduler = t,
                    this.state = e,
                    this.action = n,
                    this.dueTime = r,
                    this.comparer = i || yi,
                    this.disposable = new be
                }
                ,
                _e.prototype.invoke = function() {
                    this.disposable.setDisposable(this.invokeCore())
                }
                ,
                _e.prototype.compareTo = function(t) {
                    return this.comparer(this.dueTime, t.dueTime)
                }
                ,
                _e.prototype.isCancelled = function() {
                    return this.disposable.isDisposed
                }
                ,
                _e.prototype.invokeCore = function() {
                    return de(this.action(this.scheduler, this.state))
                }
                ,
                we = fi.Scheduler = function() {
                    function t() {}
                    t.isScheduler = function(e) {
                        return e instanceof t
                    }
                    ;
                    var e = t.prototype;
                    return e.schedule = function(t, e) {
                        throw new yt
                    }
                    ,
                    e.scheduleFuture = function(e, n, r) {
                        var i = n;
                        return i instanceof Date && (i -= this.now()),
                        i = t.normalize(i),
                        0 === i ? this.schedule(e, r) : this._scheduleFuture(e, i, r)
                    }
                    ,
                    e._scheduleFuture = function(t, e, n) {
                        throw new yt
                    }
                    ,
                    t.now = vi,
                    t.prototype.now = vi,
                    t.normalize = function(t) {
                        return t < 0 && (t = 0),
                        t
                    }
                    ,
                    t
                }(),
                ge = we.normalize,
                Ee = we.isScheduler,
                function(t) {
                    function e(t, e) {
                        function n(e) {
                            function r(t, e) {
                                return s ? o.remove(c) : u = !0,
                                i(e, n),
                                he
                            }
                            var s = !1
                              , u = !1
                              , c = t.schedule(e, r);
                            u || (o.add(c),
                            s = !0)
                        }
                        var r = e[0]
                          , i = e[1]
                          , o = new ue;
                        return i(r, n),
                        o
                    }
                    function n(t, e) {
                        function n(e, r) {
                            function s(t, e) {
                                return u ? o.remove(a) : c = !0,
                                i(e, n),
                                he
                            }
                            var u = !1
                              , c = !1
                              , a = t.scheduleFuture(e, r, s);
                            c || (o.add(a),
                            u = !0)
                        }
                        var r = e[0]
                          , i = e[1]
                          , o = new ue;
                        return i(r, n),
                        o
                    }
                    t.scheduleRecursive = function(t, n) {
                        return this.schedule([t, n], e)
                    }
                    ,
                    t.scheduleRecursiveFuture = function(t, e, r) {
                        return this.scheduleFuture([t, r], e, n)
                    }
                }(we.prototype),
                function(t) {
                    t.schedulePeriodic = function(t, e, n) {
                        if (s === pi.setInterval)
                            throw new mt;
                        e = ge(e);
                        var r = t
                          , i = pi.setInterval(function() {
                            r = n(r)
                        }, e);
                        return le(function() {
                            pi.clearInterval(i)
                        })
                    }
                }(we.prototype),
                Ce = function(t) {
                    function e() {
                        t.call(this)
                    }
                    return oe(e, t),
                    e.prototype.schedule = function(t, e) {
                        return de(e(this, t))
                    }
                    ,
                    e
                }(we),
                ke = we.immediate = new Ce,
                Oe = function(t) {
                    function e() {
                        for (; r.length > 0; ) {
                            var t = r.dequeue();
                            !t.isCancelled() && t.invoke()
                        }
                    }
                    function n() {
                        t.call(this)
                    }
                    var r;
                    return oe(n, t),
                    n.prototype.schedule = function(t, n) {
                        var i, o = new _e(this,t,n,this.now());
                        return r ? r.enqueue(o) : (r = new Le(4),
                        r.enqueue(o),
                        i = Ci(e)(),
                        r = null,
                        i === Ei && l(i.e)),
                        o.disposable
                    }
                    ,
                    n.prototype.scheduleRequired = function() {
                        return !r
                    }
                    ,
                    n
                }(we),
                xe = we.currentThread = new Oe,
                fi.internals.SchedulePeriodicRecursive = function() {
                    function t(t) {
                        return function(e, n) {
                            n(0, t._period);
                            var r = Ci(t._action)(t._state);
                            r === Ei && (t._cancel.dispose(),
                            l(r.e)),
                            t._state = r
                        }
                    }
                    function e(t, e, n, r) {
                        this._scheduler = t,
                        this._state = e,
                        this._period = n,
                        this._action = r
                    }
                    return e.prototype.start = function() {
                        var e = new be;
                        return this._cancel = e,
                        e.setDisposable(this._scheduler.scheduleRecursiveFuture(0, this._period, t(this))),
                        e
                    }
                    ,
                    e
                }(),
                $e = function() {
                    var t, e = di;
                    if (pi.setTimeout)
                        t = pi.setTimeout,
                        e = pi.clearTimeout;
                    else {
                        if (!pi.WScript)
                            throw new mt;
                        t = function(t, e) {
                            pi.WScript.Sleep(e),
                            t()
                        }
                    }
                    return {
                        setTimeout: t,
                        clearTimeout: e
                    }
                }(),
                Te = $e.setTimeout,
                Pe = $e.clearTimeout,
                function() {
                    function t(e) {
                        var n, r;
                        p ? Te(function() {
                            t(e)
                        }, 0) : (n = h[e]) && (p = !0,
                        r = Ci(n)(),
                        De(e),
                        p = !1,
                        r === Ei && l(r.e))
                    }
                    function e() {
                        if (!pi.postMessage || pi.importScripts)
                            return !1;
                        var t = !1
                          , e = pi.onmessage;
                        return pi.onmessage = function() {
                            t = !0
                        }
                        ,
                        pi.postMessage("", "*"),
                        pi.onmessage = e,
                        t
                    }
                    var n, r, i, u, c, a = 1, h = {}, p = !1;
                    De = function(t) {
                        delete h[t]
                    }
                    ,
                    n = RegExp("^" + (toString + "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/toString| for [^\]]+/g, ".*?") + "$"),
                    r = "function" == typeof (r = ui && li && ui.setImmediate) && !n.test(r) && r,
                    gi(r) ? Se = function(e) {
                        var n = a++;
                        return h[n] = e,
                        r(function() {
                            t(n)
                        }),
                        n
                    }
                    : s !== o && "[object process]" === {}.toString.call(o) ? Se = function(e) {
                        var n = a++;
                        return h[n] = e,
                        o.nextTick(function() {
                            t(n)
                        }),
                        n
                    }
                    : e() ? (i = "ms.rx.schedule" + Math.random(),
                    u = function(e) {
                        "string" == typeof e.data && e.data.substring(0, i.length) === i && t(e.data.substring(i.length))
                    }
                    ,
                    pi.addEventListener("message", u, !1),
                    Se = function(t) {
                        var e = a++;
                        return h[e] = t,
                        pi.postMessage(i + e, "*"),
                        e
                    }
                    ) : pi.MessageChannel ? (c = new pi.MessageChannel,
                    c.port1.onmessage = function(e) {
                        t(e.data)
                    }
                    ,
                    Se = function(t) {
                        var e = a++;
                        return h[e] = t,
                        c.port2.postMessage(e),
                        e
                    }
                    ) : Se = "document"in pi && "onreadystatechange"in pi.document.createElement("script") ? function(e) {
                        var n = pi.document.createElement("script")
                          , r = a++;
                        return h[r] = e,
                        n.onreadystatechange = function() {
                            t(r),
                            n.onreadystatechange = null,
                            n.parentNode.removeChild(n),
                            n = null
                        }
                        ,
                        pi.document.documentElement.appendChild(n),
                        r
                    }
                    : function(e) {
                        var n = a++;
                        return h[n] = e,
                        Te(function() {
                            t(n)
                        }, 0),
                        n
                    }
                }(),
                je = function(t) {
                    function e() {
                        t.call(this)
                    }
                    function n(t, e, n, r) {
                        return function() {
                            t.setDisposable(ae._fixup(e(n, r)))
                        }
                    }
                    function r(t) {
                        this._id = t,
                        this.isDisposed = !1
                    }
                    function i(t) {
                        this._id = t,
                        this.isDisposed = !1
                    }
                    return oe(e, t),
                    r.prototype.dispose = function() {
                        this.isDisposed || (this.isDisposed = !0,
                        De(this._id))
                    }
                    ,
                    i.prototype.dispose = function() {
                        this.isDisposed || (this.isDisposed = !0,
                        Pe(this._id))
                    }
                    ,
                    e.prototype.schedule = function(t, e) {
                        var i = new be
                          , o = Se(n(i, e, this, t));
                        return new me(i,new r(o))
                    }
                    ,
                    e.prototype._scheduleFuture = function(t, e, r) {
                        if (0 === e)
                            return this.schedule(t, r);
                        var o = new be
                          , s = Te(n(o, r, this, t), e);
                        return new me(o,new i(s))
                    }
                    ,
                    e
                }(we),
                Ae = we.default = we.async = new je,
                S.prototype.compareTo = function(t) {
                    var e = this.value.compareTo(t.value);
                    return 0 === e && (e = this.id - t.id),
                    e
                }
                ,
                Le = fi.internals.PriorityQueue = function(t) {
                    this.items = Array(t),
                    this.length = 0
                }
                ,
                Ne = Le.prototype,
                Ne.isHigherPriority = function(t, e) {
                    return this.items[t].compareTo(this.items[e]) < 0
                }
                ,
                Ne.percolate = function(t) {
                    var e, n;
                    t >= this.length || t < 0 || (e = t - 1 >> 1) < 0 || e === t || this.isHigherPriority(t, e) && (n = this.items[t],
                    this.items[t] = this.items[e],
                    this.items[e] = n,
                    this.percolate(e))
                }
                ,
                Ne.heapify = function(t) {
                    var e, n, r, i;
                    +t || (t = 0),
                    t >= this.length || t < 0 || (e = 2 * t + 1,
                    n = 2 * t + 2,
                    r = t,
                    e < this.length && this.isHigherPriority(e, r) && (r = e),
                    n < this.length && this.isHigherPriority(n, r) && (r = n),
                    r !== t && (i = this.items[t],
                    this.items[t] = this.items[r],
                    this.items[r] = i,
                    this.heapify(r)))
                }
                ,
                Ne.peek = function() {
                    return this.items[0].value
                }
                ,
                Ne.removeAt = function(t) {
                    this.items[t] = this.items[--this.length],
                    this.items[this.length] = s,
                    this.heapify()
                }
                ,
                Ne.dequeue = function() {
                    var t = this.peek();
                    return this.removeAt(0),
                    t
                }
                ,
                Ne.enqueue = function(t) {
                    var e = this.length++;
                    this.items[e] = new S(Le.count++,t),
                    this.percolate(e)
                }
                ,
                Ne.remove = function(t) {
                    for (var e = 0; e < this.length; e++)
                        if (this.items[e].value === t)
                            return this.removeAt(e),
                            !0;
                    return !1
                }
                ,
                Le.count = 0,
                Re = fi.Notification = function() {
                    function t() {}
                    return t.prototype._accept = function(t, e, n) {
                        throw new yt
                    }
                    ,
                    t.prototype._acceptObserver = function(t, e, n) {
                        throw new yt
                    }
                    ,
                    t.prototype.accept = function(t, e, n) {
                        return t && "object" == typeof t ? this._acceptObserver(t) : this._accept(t, e, n)
                    }
                    ,
                    t.prototype.toObservable = function(t) {
                        var e = this;
                        return Ee(t) || (t = ke),
                        new Qr(function(n) {
                            return t.schedule(e, function(t, e) {
                                e._acceptObserver(n),
                                "N" === e.kind && n.onCompleted()
                            })
                        }
                        )
                    }
                    ,
                    t
                }(),
                qe = function(t) {
                    function e(t) {
                        this.value = t,
                        this.kind = "N"
                    }
                    return oe(e, t),
                    e.prototype._accept = function(t) {
                        return t(this.value)
                    }
                    ,
                    e.prototype._acceptObserver = function(t) {
                        return t.onNext(this.value)
                    }
                    ,
                    e.prototype.toString = function() {
                        return "OnNext(" + this.value + ")"
                    }
                    ,
                    e
                }(Re),
                Ie = function(t) {
                    function e(t) {
                        this.error = t,
                        this.kind = "E"
                    }
                    return oe(e, t),
                    e.prototype._accept = function(t, e) {
                        return e(this.error)
                    }
                    ,
                    e.prototype._acceptObserver = function(t) {
                        return t.onError(this.error)
                    }
                    ,
                    e.prototype.toString = function() {
                        return "OnError(" + this.error + ")"
                    }
                    ,
                    e
                }(Re),
                Me = function(t) {
                    function e() {
                        this.kind = "C"
                    }
                    return oe(e, t),
                    e.prototype._accept = function(t, e, n) {
                        return n()
                    }
                    ,
                    e.prototype._acceptObserver = function(t) {
                        return t.onCompleted()
                    }
                    ,
                    e.prototype.toString = function() {
                        return "OnCompleted()"
                    }
                    ,
                    e
                }(Re),
                Fe = Re.createOnNext = function(t) {
                    return new qe(t)
                }
                ,
                Ve = Re.createOnError = function(t) {
                    return new Ie(t)
                }
                ,
                Ue = Re.createOnCompleted = function() {
                    return new Me
                }
                ,
                Ye = fi.Observer = function() {}
                ,
                ze = Ye.create = function(t, e, n) {
                    return t || (t = di),
                    e || (e = _i),
                    n || (n = di),
                    new He(t,e,n)
                }
                ,
                Be = fi.internals.AbstractObserver = function(t) {
                    function e() {
                        this.isStopped = !1
                    }
                    return oe(e, t),
                    e.prototype.next = _t,
                    e.prototype.error = _t,
                    e.prototype.completed = _t,
                    e.prototype.onNext = function(t) {
                        !this.isStopped && this.next(t)
                    }
                    ,
                    e.prototype.onError = function(t) {
                        this.isStopped || (this.isStopped = !0,
                        this.error(t))
                    }
                    ,
                    e.prototype.onCompleted = function() {
                        this.isStopped || (this.isStopped = !0,
                        this.completed())
                    }
                    ,
                    e.prototype.dispose = function() {
                        this.isStopped = !0
                    }
                    ,
                    e.prototype.fail = function(t) {
                        return !this.isStopped && (this.isStopped = !0,
                        this.error(t),
                        !0)
                    }
                    ,
                    e
                }(Ye),
                He = fi.AnonymousObserver = function(t) {
                    function e(e, n, r) {
                        t.call(this),
                        this._onNext = e,
                        this._onError = n,
                        this._onCompleted = r
                    }
                    return oe(e, t),
                    e.prototype.next = function(t) {
                        this._onNext(t)
                    }
                    ,
                    e.prototype.error = function(t) {
                        this._onError(t)
                    }
                    ,
                    e.prototype.completed = function() {
                        this._onCompleted()
                    }
                    ,
                    e
                }(Be),
                Ke = fi.Observable = function() {
                    function t(t, e) {
                        return function(n) {
                            var r = n.onError;
                            return n.onError = function(e) {
                                h(e, t),
                                r.call(n, e)
                            }
                            ,
                            e.call(t, n)
                        }
                    }
                    function e() {
                        var e, n;
                        fi.config.longStackSupport && at && (e = this._subscribe,
                        n = Ci(l)(Error()).e,
                        this.stack = n.stack.substring(n.stack.indexOf("\n") + 1),
                        this._subscribe = t(this, e))
                    }
                    return We = e.prototype,
                    e.isObservable = function(t) {
                        return t && gi(t.subscribe)
                    }
                    ,
                    We.subscribe = We.forEach = function(t, e, n) {
                        return this._subscribe("object" == typeof t ? t : ze(t, e, n))
                    }
                    ,
                    We.subscribeOnNext = function(t, e) {
                        return this._subscribe(ze(s !== e ? function(n) {
                            t.call(e, n)
                        }
                        : t))
                    }
                    ,
                    We.subscribeOnError = function(t, e) {
                        return this._subscribe(ze(null, s !== e ? function(n) {
                            t.call(e, n)
                        }
                        : t))
                    }
                    ,
                    We.subscribeOnCompleted = function(t, e) {
                        return this._subscribe(ze(null, null, s !== e ? function() {
                            t.call(e)
                        }
                        : t))
                    }
                    ,
                    e
                }(),
                Qe = fi.internals.ScheduledObserver = function(t) {
                    function e(e, n) {
                        t.call(this),
                        this.scheduler = e,
                        this.observer = n,
                        this.isAcquired = !1,
                        this.hasFaulted = !1,
                        this.queue = [],
                        this.disposable = new ve
                    }
                    function n(t, e) {
                        return function() {
                            t.onNext(e)
                        }
                    }
                    function r(t, e) {
                        return function() {
                            t.onError(e)
                        }
                    }
                    function i(t) {
                        return function() {
                            t.onCompleted()
                        }
                    }
                    function o(t, e) {
                        var n, r;
                        return t.queue.length > 0 ? (n = t.queue.shift(),
                        (r = Ci(n)()) === Ei ? (t.queue = [],
                        t.hasFaulted = !0,
                        l(r.e)) : void e(t)) : void (t.isAcquired = !1)
                    }
                    return oe(e, t),
                    e.prototype.next = function(t) {
                        this.queue.push(n(this.observer, t))
                    }
                    ,
                    e.prototype.error = function(t) {
                        this.queue.push(r(this.observer, t))
                    }
                    ,
                    e.prototype.completed = function() {
                        this.queue.push(i(this.observer))
                    }
                    ,
                    e.prototype.ensureActive = function() {
                        var t = !1;
                        !this.hasFaulted && this.queue.length > 0 && (t = !this.isAcquired,
                        this.isAcquired = !0),
                        t && this.disposable.setDisposable(this.scheduler.scheduleRecursive(this, o))
                    }
                    ,
                    e.prototype.dispose = function() {
                        t.prototype.dispose.call(this),
                        this.disposable.dispose()
                    }
                    ,
                    e
                }(Be),
                Ge = fi.ObservableBase = function(t) {
                    function e(t) {
                        return t && gi(t.dispose) ? t : gi(t) ? le(t) : he
                    }
                    function n(t, n) {
                        var r = n[0]
                          , i = n[1]
                          , o = Ci(i.subscribeCore).call(i, r);
                        o !== Ei || r.fail(Ei.e) || l(Ei.e),
                        r.setDisposable(e(o))
                    }
                    function r() {
                        t.call(this)
                    }
                    return oe(r, t),
                    r.prototype._subscribe = function(t) {
                        var e = new Gr(t)
                          , r = [e, this];
                        return xe.scheduleRequired() ? xe.schedule(r, n) : n(null, r),
                        e
                    }
                    ,
                    r.prototype.subscribeCore = _t,
                    r
                }(Ke),
                Ze = fi.FlatMapObservable = function(t) {
                    function e(e, n, r, i) {
                        this.resultSelector = gi(r) ? r : null,
                        this.selector = kt(gi(n) ? n : function() {
                            return n
                        }
                        , i, 3),
                        this.source = e,
                        t.call(this)
                    }
                    function n(t, e, n, r) {
                        this.i = 0,
                        this.selector = e,
                        this.resultSelector = n,
                        this.source = r,
                        this.o = t,
                        Be.call(this)
                    }
                    return oe(e, t),
                    e.prototype.subscribeCore = function(t) {
                        return this.source.subscribe(new n(t,this.selector,this.resultSelector,this))
                    }
                    ,
                    oe(n, Be),
                    n.prototype._wrapResult = function(t, e, n) {
                        return this.resultSelector ? t.map(function(t, r) {
                            return this.resultSelector(e, t, n, r)
                        }, this) : t
                    }
                    ,
                    n.prototype.next = function(t) {
                        var e = this.i++
                          , n = Ci(this.selector)(t, e, this.source);
                        if (n === Ei)
                            return this.o.onError(n.e);
                        wi(n) && (n = Tr(n)),
                        (Ct(n) || Et(n)) && (n = Ke.from(n)),
                        this.o.onNext(this._wrapResult(n, t, e))
                    }
                    ,
                    n.prototype.error = function(t) {
                        this.o.onError(t)
                    }
                    ,
                    n.prototype.completed = function() {
                        this.o.onCompleted()
                    }
                    ,
                    e
                }(Ge),
                Je = fi.internals.Enumerable = function() {}
                ,
                D.prototype.dispose = function() {
                    this.isDisposed || (this.isDisposed = !0,
                    this._s.isDisposed = !0)
                }
                ,
                Xe = function(t) {
                    function e(e) {
                        this.sources = e,
                        t.call(this)
                    }
                    function n(t, e) {
                        var n, i, o;
                        if (!t.isDisposed) {
                            if ((n = Ci(t.e.next).call(t.e)) === Ei)
                                return t.o.onError(n.e);
                            if (n.done)
                                return t.o.onCompleted();
                            i = n.value,
                            wi(i) && (i = Tr(i)),
                            o = new be,
                            t.subscription.setDisposable(o),
                            o.setDisposable(i.subscribe(new r(t,e)))
                        }
                    }
                    function r(t, e) {
                        this._state = t,
                        this._recurse = e,
                        Be.call(this)
                    }
                    return oe(e, t),
                    e.prototype.subscribeCore = function(t) {
                        var e = new ve
                          , r = {
                            isDisposed: !1,
                            o: t,
                            subscription: e,
                            e: this.sources[wt]()
                        }
                          , i = xe.scheduleRecursive(r, n);
                        return new ye([e, i, new D(r)])
                    }
                    ,
                    oe(r, Be),
                    r.prototype.next = function(t) {
                        this._state.o.onNext(t)
                    }
                    ,
                    r.prototype.error = function(t) {
                        this._state.o.onError(t)
                    }
                    ,
                    r.prototype.completed = function() {
                        this._recurse(this._state)
                    }
                    ,
                    e
                }(Ge),
                Je.prototype.concat = function() {
                    return new Xe(this)
                }
                ,
                tn = function(t) {
                    function e(e) {
                        this.sources = e,
                        t.call(this)
                    }
                    function n(t, e) {
                        var n, i, o;
                        if (!t.isDisposed) {
                            if ((n = Ci(t.e.next).call(t.e)) === Ei)
                                return t.o.onError(n.e);
                            if (n.done)
                                return null !== t.lastError ? t.o.onError(t.lastError) : t.o.onCompleted();
                            i = n.value,
                            wi(i) && (i = Tr(i)),
                            o = new be,
                            t.subscription.setDisposable(o),
                            o.setDisposable(i.subscribe(new r(t,e)))
                        }
                    }
                    function r(t, e) {
                        this._state = t,
                        this._recurse = e,
                        Be.call(this)
                    }
                    return oe(e, t),
                    e.prototype.subscribeCore = function(t) {
                        var e = new ve
                          , r = {
                            isDisposed: !1,
                            e: this.sources[wt](),
                            subscription: e,
                            lastError: null,
                            o: t
                        }
                          , i = xe.scheduleRecursive(r, n);
                        return new ye([e, i, new D(r)])
                    }
                    ,
                    oe(r, Be),
                    r.prototype.next = function(t) {
                        this._state.o.onNext(t)
                    }
                    ,
                    r.prototype.error = function(t) {
                        this._state.lastError = t,
                        this._recurse(this._state)
                    }
                    ,
                    r.prototype.completed = function() {
                        this._state.o.onCompleted()
                    }
                    ,
                    e
                }(Ge),
                Je.prototype.catchError = function() {
                    return new tn(this)
                }
                ,
                en = function(t) {
                    function e(t, e) {
                        this.v = t,
                        this.c = null == e ? -1 : e
                    }
                    function n(t) {
                        this.v = t.v,
                        this.l = t.c
                    }
                    return oe(e, t),
                    e.prototype[wt] = function() {
                        return new n(this)
                    }
                    ,
                    n.prototype.next = function() {
                        return 0 === this.l ? gt : (this.l > 0 && this.l--,
                        {
                            done: !1,
                            value: this.v
                        })
                    }
                    ,
                    e
                }(Je),
                nn = Je.repeat = function(t, e) {
                    return new en(t,e)
                }
                ,
                rn = function(t) {
                    function e(t, e, n) {
                        this.s = t,
                        this.fn = e ? kt(e, n, 3) : null
                    }
                    function n(t) {
                        this.i = -1,
                        this.s = t.s,
                        this.l = this.s.length,
                        this.fn = t.fn
                    }
                    return oe(e, t),
                    e.prototype[wt] = function() {
                        return new n(this)
                    }
                    ,
                    n.prototype.next = function() {
                        return ++this.i < this.l ? {
                            done: !1,
                            value: this.fn ? this.fn(this.s[this.i], this.i, this.s) : this.s[this.i]
                        } : gt
                    }
                    ,
                    e
                }(Je),
                on = Je.of = function(t, e, n) {
                    return new rn(t,e,n)
                }
                ,
                sn = function(t) {
                    function e(e) {
                        this.source = e,
                        t.call(this)
                    }
                    function n(t) {
                        this.o = t,
                        this.a = [],
                        Be.call(this)
                    }
                    return oe(e, t),
                    e.prototype.subscribeCore = function(t) {
                        return this.source.subscribe(new n(t))
                    }
                    ,
                    oe(n, Be),
                    n.prototype.next = function(t) {
                        this.a.push(t)
                    }
                    ,
                    n.prototype.error = function(t) {
                        this.o.onError(t)
                    }
                    ,
                    n.prototype.completed = function() {
                        this.o.onNext(this.a),
                        this.o.onCompleted()
                    }
                    ,
                    e
                }(Ge),
                We.toArray = function() {
                    return new sn(this)
                }
                ,
                Ke.create = function(t, e) {
                    return new Qr(t,e)
                }
                ,
                un = function(t) {
                    function e(e) {
                        this._f = e,
                        t.call(this)
                    }
                    return oe(e, t),
                    e.prototype.subscribeCore = function(t) {
                        var e = Ci(this._f)();
                        return e === Ei ? On(e.e).subscribe(t) : (wi(e) && (e = Tr(e)),
                        e.subscribe(t))
                    }
                    ,
                    e
                }(Ge),
                cn = Ke.defer = function(t) {
                    return new un(t)
                }
                ,
                an = function(t) {
                    function e(e) {
                        this.scheduler = e,
                        t.call(this)
                    }
                    function n(t, e) {
                        this.observer = t,
                        this.scheduler = e
                    }
                    function r(t, e) {
                        return e.onCompleted(),
                        he
                    }
                    return oe(e, t),
                    e.prototype.subscribeCore = function(t) {
                        return new n(t,this.scheduler).run()
                    }
                    ,
                    n.prototype.run = function() {
                        var t = this.observer;
                        return this.scheduler === ke ? r(null, t) : this.scheduler.schedule(t, r)
                    }
                    ,
                    e
                }(Ge),
                ln = new an(ke),
                hn = Ke.empty = function(t) {
                    return Ee(t) || (t = ke),
                    t === ke ? ln : new an(t)
                }
                ,
                pn = function(t) {
                    function e(e, n, r) {
                        this._iterable = e,
                        this._fn = n,
                        this._scheduler = r,
                        t.call(this)
                    }
                    function n(t, e, n) {
                        return function(r, i) {
                            var o, s = Ci(e.next).call(e);
                            return s === Ei ? t.onError(s.e) : s.done ? t.onCompleted() : (o = s.value,
                            gi(n) && (o = Ci(n)(o, r)) === Ei ? t.onError(o.e) : (t.onNext(o),
                            void i(r + 1)))
                        }
                    }
                    return oe(e, t),
                    e.prototype.subscribeCore = function(t) {
                        var e = Object(this._iterable)
                          , r = L(e);
                        return this._scheduler.scheduleRecursive(0, n(t, r, this._fn))
                    }
                    ,
                    e
                }(Ge),
                fn = Math.pow(2, 53) - 1,
                $.prototype[wt] = function() {
                    return new T(this._s)
                }
                ,
                T.prototype[wt] = function() {
                    return this
                }
                ,
                T.prototype.next = function() {
                    return this._i < this._l ? {
                        done: !1,
                        value: this._s.charAt(this._i++)
                    } : gt
                }
                ,
                P.prototype[wt] = function() {
                    return new j(this._a)
                }
                ,
                j.prototype[wt] = function() {
                    return this
                }
                ,
                j.prototype.next = function() {
                    return this._i < this._l ? {
                        done: !1,
                        value: this._a[this._i++]
                    } : gt
                }
                ,
                dn = Ke.from = function(t, e, n, r) {
                    if (null == t)
                        throw Error("iterable cannot be null.");
                    if (e && !gi(e))
                        throw Error("mapFn when provided must be a function");
                    if (e)
                        var i = kt(e, n, 2);
                    return Ee(r) || (r = xe),
                    new pn(t,i,r)
                }
                ,
                bn = function(t) {
                    function e(e, n) {
                        this._args = e,
                        this._scheduler = n,
                        t.call(this)
                    }
                    function n(t, e) {
                        var n = e.length;
                        return function(r, i) {
                            r < n ? (t.onNext(e[r]),
                            i(r + 1)) : t.onCompleted()
                        }
                    }
                    return oe(e, t),
                    e.prototype.subscribeCore = function(t) {
                        return this._scheduler.scheduleRecursive(0, n(t, this._args))
                    }
                    ,
                    e
                }(Ge),
                vn = Ke.fromArray = function(t, e) {
                    return Ee(e) || (e = xe),
                    new bn(t,e)
                }
                ,
                mn = function(t) {
                    function e() {
                        t.call(this)
                    }
                    return oe(e, t),
                    e.prototype.subscribeCore = function(t) {
                        return he
                    }
                    ,
                    e
                }(Ge),
                yn = new mn,
                _n = Ke.never = function() {
                    return yn
                }
                ,
                Ke.of = function() {
                    var t, e = arguments.length, n = Array(e);
                    for (t = 0; t < e; t++)
                        n[t] = arguments[t];
                    return new bn(n,xe)
                }
                ,
                Ke.ofWithScheduler = function(t) {
                    var e, n = arguments.length, r = Array(n - 1);
                    for (e = 1; e < n; e++)
                        r[e - 1] = arguments[e];
                    return new bn(r,t)
                }
                ,
                wn = function(t) {
                    function e(e, n) {
                        this._o = e,
                        this._keys = Object.keys(e),
                        this._scheduler = n,
                        t.call(this)
                    }
                    function n(t, e, n) {
                        return function(r, i) {
                            if (r < n.length) {
                                var o = n[r];
                                t.onNext([o, e[o]]),
                                i(r + 1)
                            } else
                                t.onCompleted()
                        }
                    }
                    return oe(e, t),
                    e.prototype.subscribeCore = function(t) {
                        return this._scheduler.scheduleRecursive(0, n(t, this._o, this._keys))
                    }
                    ,
                    e
                }(Ge),
                Ke.pairs = function(t, e) {
                    return e || (e = xe),
                    new wn(t,e)
                }
                ,
                gn = function(t) {
                    function e(e, n, r) {
                        this.start = e,
                        this.rangeCount = n,
                        this.scheduler = r,
                        t.call(this)
                    }
                    function n(t, e, n) {
                        return function(r, i) {
                            r < e ? (n.onNext(t + r),
                            i(r + 1)) : n.onCompleted()
                        }
                    }
                    return oe(e, t),
                    e.prototype.subscribeCore = function(t) {
                        return this.scheduler.scheduleRecursive(0, n(this.start, this.rangeCount, t))
                    }
                    ,
                    e
                }(Ge),
                Ke.range = function(t, e, n) {
                    return Ee(n) || (n = xe),
                    new gn(t,e,n)
                }
                ,
                En = function(t) {
                    function e(e, n, r) {
                        this.value = e,
                        this.repeatCount = null == n ? -1 : n,
                        this.scheduler = r,
                        t.call(this)
                    }
                    return oe(e, t),
                    e.prototype.subscribeCore = function(t) {
                        return new I(t,this).run()
                    }
                    ,
                    e
                }(Ge),
                I.prototype.run = function() {
                    function t(t, r) {
                        if ((-1 === t || t > 0) && (e.onNext(n),
                        t > 0 && t--),
                        0 === t)
                            return e.onCompleted();
                        r(t)
                    }
                    var e = this.observer
                      , n = this.parent.value;
                    return this.parent.scheduler.scheduleRecursive(this.parent.repeatCount, t)
                }
                ,
                Ke.repeat = function(t, e, n) {
                    return Ee(n) || (n = xe),
                    new En(t,e,n)
                }
                ,
                Cn = function(t) {
                    function e(e, n) {
                        this._value = e,
                        this._scheduler = n,
                        t.call(this)
                    }
                    function n(t, e) {
                        var n = e[0]
                          , r = e[1];
                        return r.onNext(n),
                        r.onCompleted(),
                        he
                    }
                    return oe(e, t),
                    e.prototype.subscribeCore = function(t) {
                        var e = [this._value, t];
                        return this._scheduler === ke ? n(null, e) : this._scheduler.schedule(e, n)
                    }
                    ,
                    e
                }(Ge),
                Ke.return = Ke.just = function(t, e) {
                    return Ee(e) || (e = ke),
                    new Cn(t,e)
                }
                ,
                kn = function(t) {
                    function e(e, n) {
                        this._error = e,
                        this._scheduler = n,
                        t.call(this)
                    }
                    function n(t, e) {
                        var n = e[0];
                        return e[1].onError(n),
                        he
                    }
                    return oe(e, t),
                    e.prototype.subscribeCore = function(t) {
                        var e = [this._error, t];
                        return this._scheduler === ke ? n(null, e) : this._scheduler.schedule(e, n)
                    }
                    ,
                    e
                }(Ge),
                On = Ke.throw = function(t, e) {
                    return Ee(e) || (e = ke),
                    new kn(t,e)
                }
                ,
                xn = function(t) {
                    function e(e, n) {
                        this.source = e,
                        this._fn = n,
                        t.call(this)
                    }
                    return oe(e, t),
                    e.prototype.subscribeCore = function(t) {
                        var e = new be
                          , n = new ve;
                        return n.setDisposable(e),
                        e.setDisposable(this.source.subscribe(new Sn(t,n,this._fn))),
                        n
                    }
                    ,
                    e
                }(Ge),
                Sn = function(t) {
                    function e(e, n, r) {
                        this._o = e,
                        this._s = n,
                        this._fn = r,
                        t.call(this)
                    }
                    return oe(e, t),
                    e.prototype.next = function(t) {
                        this._o.onNext(t)
                    }
                    ,
                    e.prototype.completed = function() {
                        return this._o.onCompleted()
                    }
                    ,
                    e.prototype.error = function(t) {
                        var e, n = Ci(this._fn)(t);
                        if (n === Ei)
                            return this._o.onError(n.e);
                        wi(n) && (n = Tr(n)),
                        e = new be,
                        this._s.setDisposable(e),
                        e.setDisposable(n.subscribe(this._o))
                    }
                    ,
                    e
                }(Be),
                We.catch = function(t) {
                    return gi(t) ? new xn(this,t) : Dn([this, t])
                }
                ,
                Dn = Ke.catch = function() {
                    var t, e, n;
                    if (Array.isArray(arguments[0]))
                        t = arguments[0];
                    else
                        for (e = arguments.length,
                        t = Array(e),
                        n = 0; n < e; n++)
                            t[n] = arguments[n];
                    return on(t).catchError()
                }
                ,
                We.combineLatest = function() {
                    var t, e = arguments.length, n = Array(e);
                    for (t = 0; t < e; t++)
                        n[t] = arguments[t];
                    return Array.isArray(n[0]) ? n[0].unshift(this) : n.unshift(this),
                    Pn.apply(this, n)
                }
                ,
                $n = function(t) {
                    function e(e, n) {
                        this._params = e,
                        this._cb = n,
                        t.call(this)
                    }
                    return oe(e, t),
                    e.prototype.subscribeCore = function(t) {
                        var e, n, r, i = this._params.length, o = Array(i), s = {
                            hasValue: x(i, M),
                            hasValueAll: !1,
                            isDone: x(i, M),
                            values: Array(i)
                        };
                        for (e = 0; e < i; e++)
                            n = this._params[e],
                            r = new be,
                            o[e] = r,
                            wi(n) && (n = Tr(n)),
                            r.setDisposable(n.subscribe(new Tn(t,e,this._cb,s)));
                        return new ye(o)
                    }
                    ,
                    e
                }(Ge),
                Tn = function(t) {
                    function e(e, n, r, i) {
                        this._o = e,
                        this._i = n,
                        this._cb = r,
                        this._state = i,
                        t.call(this)
                    }
                    function n(t) {
                        return function(e, n) {
                            return n !== t
                        }
                    }
                    return oe(e, t),
                    e.prototype.next = function(t) {
                        if (this._state.values[this._i] = t,
                        this._state.hasValue[this._i] = !0,
                        this._state.hasValueAll || (this._state.hasValueAll = this._state.hasValue.every(bi))) {
                            var e = Ci(this._cb).apply(null, this._state.values);
                            if (e === Ei)
                                return this._o.onError(e.e);
                            this._o.onNext(e)
                        } else
                            this._state.isDone.filter(n(this._i)).every(bi) && this._o.onCompleted()
                    }
                    ,
                    e.prototype.error = function(t) {
                        this._o.onError(t)
                    }
                    ,
                    e.prototype.completed = function() {
                        this._state.isDone[this._i] = !0,
                        this._state.isDone.every(bi) && this._o.onCompleted()
                    }
                    ,
                    e
                }(Be),
                Pn = Ke.combineLatest = function() {
                    var t, e, n = arguments.length, r = Array(n);
                    for (t = 0; t < n; t++)
                        r[t] = arguments[t];
                    return e = gi(r[n - 1]) ? r.pop() : F,
                    Array.isArray(r[0]) && (r = r[0]),
                    new $n(r,e)
                }
                ,
                We.concat = function() {
                    for (var t = [], e = 0, n = arguments.length; e < n; e++)
                        t.push(arguments[e]);
                    return t.unshift(this),
                    Ln.apply(null, t)
                }
                ,
                jn = function(t) {
                    function e(e, n) {
                        this._s = e,
                        this._fn = n,
                        t.call(this)
                    }
                    return oe(e, t),
                    e.prototype.next = function(t) {
                        this._s.o.onNext(t)
                    }
                    ,
                    e.prototype.error = function(t) {
                        this._s.o.onError(t)
                    }
                    ,
                    e.prototype.completed = function() {
                        this._s.i++,
                        this._fn(this._s)
                    }
                    ,
                    e
                }(Be),
                An = function(t) {
                    function e(e) {
                        this._sources = e,
                        t.call(this)
                    }
                    function n(t, e) {
                        var n, r;
                        if (!t.disposable.isDisposed) {
                            if (t.i === t.sources.length)
                                return t.o.onCompleted();
                            n = t.sources[t.i],
                            wi(n) && (n = Tr(n)),
                            r = new be,
                            t.subscription.setDisposable(r),
                            r.setDisposable(n.subscribe(new jn(t,e)))
                        }
                    }
                    return oe(e, t),
                    e.prototype.subscribeCore = function(t) {
                        var e = new ve
                          , r = le(di)
                          , i = {
                            o: t,
                            i: 0,
                            subscription: e,
                            disposable: r,
                            sources: this._sources
                        }
                          , o = ke.scheduleRecursive(i, n);
                        return new ye([e, r, o])
                    }
                    ,
                    e
                }(Ge),
                Ln = Ke.concat = function() {
                    var t, e, n;
                    if (Array.isArray(arguments[0]))
                        t = arguments[0];
                    else
                        for (t = Array(arguments.length),
                        e = 0,
                        n = arguments.length; e < n; e++)
                            t[e] = arguments[e];
                    return new An(t)
                }
                ,
                We.concatAll = function() {
                    return this.merge(1)
                }
                ,
                Nn = function(t) {
                    function e(e, n) {
                        this.source = e,
                        this.maxConcurrent = n,
                        t.call(this)
                    }
                    return oe(e, t),
                    e.prototype.subscribeCore = function(t) {
                        var e = new ue;
                        return e.add(this.source.subscribe(new Rn(t,this.maxConcurrent,e))),
                        e
                    }
                    ,
                    e
                }(Ge),
                Rn = function(t) {
                    function e(e, n, r) {
                        this.o = e,
                        this.max = n,
                        this.g = r,
                        this.done = !1,
                        this.q = [],
                        this.activeCount = 0,
                        t.call(this)
                    }
                    function n(e, n) {
                        this.parent = e,
                        this.sad = n,
                        t.call(this)
                    }
                    return oe(e, t),
                    e.prototype.handleSubscribe = function(t) {
                        var e = new be;
                        this.g.add(e),
                        wi(t) && (t = Tr(t)),
                        e.setDisposable(t.subscribe(new n(this,e)))
                    }
                    ,
                    e.prototype.next = function(t) {
                        this.activeCount < this.max ? (this.activeCount++,
                        this.handleSubscribe(t)) : this.q.push(t)
                    }
                    ,
                    e.prototype.error = function(t) {
                        this.o.onError(t)
                    }
                    ,
                    e.prototype.completed = function() {
                        this.done = !0,
                        0 === this.activeCount && this.o.onCompleted()
                    }
                    ,
                    oe(n, t),
                    n.prototype.next = function(t) {
                        this.parent.o.onNext(t)
                    }
                    ,
                    n.prototype.error = function(t) {
                        this.parent.o.onError(t)
                    }
                    ,
                    n.prototype.completed = function() {
                        this.parent.g.remove(this.sad),
                        this.parent.q.length > 0 ? this.parent.handleSubscribe(this.parent.q.shift()) : (this.parent.activeCount--,
                        this.parent.done && 0 === this.parent.activeCount && this.parent.o.onCompleted())
                    }
                    ,
                    e
                }(Be),
                We.merge = function(t) {
                    return "number" != typeof t ? qn(this, t) : new Nn(this,t)
                }
                ,
                qn = Ke.merge = function() {
                    var t, e, n = [], r = arguments.length;
                    if (arguments[0])
                        if (Ee(arguments[0]))
                            for (t = arguments[0],
                            e = 1; e < r; e++)
                                n.push(arguments[e]);
                        else
                            for (t = ke,
                            e = 0; e < r; e++)
                                n.push(arguments[e]);
                    else
                        for (t = ke,
                        e = 1; e < r; e++)
                            n.push(arguments[e]);
                    return Array.isArray(n[0]) && (n = n[0]),
                    q(t, n).mergeAll()
                }
                ,
                In = fi.CompositeError = function(t) {
                    this.innerErrors = t,
                    this.message = "This contains multiple errors. Check the innerErrors",
                    Error.call(this)
                }
                ,
                In.prototype = Object.create(Error.prototype),
                In.prototype.name = "CompositeError",
                Mn = function(t) {
                    function e(e) {
                        this.source = e,
                        t.call(this)
                    }
                    return oe(e, t),
                    e.prototype.subscribeCore = function(t) {
                        var e = new ue
                          , n = new be
                          , r = {
                            isStopped: !1,
                            errors: [],
                            o: t
                        };
                        return e.add(n),
                        n.setDisposable(this.source.subscribe(new Fn(e,r))),
                        e
                    }
                    ,
                    e
                }(Ge),
                Fn = function(t) {
                    function e(e, n) {
                        this._group = e,
                        this._state = n,
                        t.call(this)
                    }
                    function n(t, e) {
                        0 === e.length ? t.onCompleted() : 1 === e.length ? t.onError(e[0]) : t.onError(new In(e))
                    }
                    function r(e, n, r) {
                        this._inner = e,
                        this._group = n,
                        this._state = r,
                        t.call(this)
                    }
                    return oe(e, t),
                    e.prototype.next = function(t) {
                        var e = new be;
                        this._group.add(e),
                        wi(t) && (t = Tr(t)),
                        e.setDisposable(t.subscribe(new r(e,this._group,this._state)))
                    }
                    ,
                    e.prototype.error = function(t) {
                        this._state.errors.push(t),
                        this._state.isStopped = !0,
                        1 === this._group.length && n(this._state.o, this._state.errors)
                    }
                    ,
                    e.prototype.completed = function() {
                        this._state.isStopped = !0,
                        1 === this._group.length && n(this._state.o, this._state.errors)
                    }
                    ,
                    oe(r, t),
                    r.prototype.next = function(t) {
                        this._state.o.onNext(t)
                    }
                    ,
                    r.prototype.error = function(t) {
                        this._state.errors.push(t),
                        this._group.remove(this._inner),
                        this._state.isStopped && 1 === this._group.length && n(this._state.o, this._state.errors)
                    }
                    ,
                    r.prototype.completed = function() {
                        this._group.remove(this._inner),
                        this._state.isStopped && 1 === this._group.length && n(this._state.o, this._state.errors)
                    }
                    ,
                    e
                }(Be),
                Ke.mergeDelayError = function() {
                    var t, e, n, r;
                    if (Array.isArray(arguments[0]))
                        t = arguments[0];
                    else
                        for (e = arguments.length,
                        t = Array(e),
                        n = 0; n < e; n++)
                            t[n] = arguments[n];
                    return r = q(null, t),
                    new Mn(r)
                }
                ,
                Vn = function(t) {
                    function e(e) {
                        this.source = e,
                        t.call(this)
                    }
                    return oe(e, t),
                    e.prototype.subscribeCore = function(t) {
                        var e = new ue
                          , n = new be;
                        return e.add(n),
                        n.setDisposable(this.source.subscribe(new Un(t,e))),
                        e
                    }
                    ,
                    e
                }(Ge),
                Un = function(t) {
                    function e(e, n) {
                        this.o = e,
                        this.g = n,
                        this.done = !1,
                        t.call(this)
                    }
                    function n(e, n) {
                        this.parent = e,
                        this.sad = n,
                        t.call(this)
                    }
                    return oe(e, t),
                    e.prototype.next = function(t) {
                        var e = new be;
                        this.g.add(e),
                        wi(t) && (t = Tr(t)),
                        e.setDisposable(t.subscribe(new n(this,e)))
                    }
                    ,
                    e.prototype.error = function(t) {
                        this.o.onError(t)
                    }
                    ,
                    e.prototype.completed = function() {
                        this.done = !0,
                        1 === this.g.length && this.o.onCompleted()
                    }
                    ,
                    oe(n, t),
                    n.prototype.next = function(t) {
                        this.parent.o.onNext(t)
                    }
                    ,
                    n.prototype.error = function(t) {
                        this.parent.o.onError(t)
                    }
                    ,
                    n.prototype.completed = function() {
                        this.parent.g.remove(this.sad),
                        this.parent.done && 1 === this.parent.g.length && this.parent.o.onCompleted()
                    }
                    ,
                    e
                }(Be),
                We.mergeAll = function() {
                    return new Vn(this)
                }
                ,
                Yn = function(t) {
                    function e(e, n) {
                        this._s = e,
                        this._o = wi(n) ? Tr(n) : n,
                        this._open = !1,
                        t.call(this)
                    }
                    return oe(e, t),
                    e.prototype.subscribeCore = function(t) {
                        var e, n = new be;
                        return n.setDisposable(this._s.subscribe(new zn(t,this))),
                        wi(this._o) && (this._o = Tr(this._o)),
                        e = new be,
                        e.setDisposable(this._o.subscribe(new Bn(t,this,e))),
                        new me(n,e)
                    }
                    ,
                    e
                }(Ge),
                zn = function(t) {
                    function e(e, n) {
                        this._o = e,
                        this._p = n,
                        t.call(this)
                    }
                    return oe(e, t),
                    e.prototype.next = function(t) {
                        this._p._open && this._o.onNext(t)
                    }
                    ,
                    e.prototype.error = function(t) {
                        this._o.onError(t)
                    }
                    ,
                    e.prototype.onCompleted = function() {
                        this._p._open && this._o.onCompleted()
                    }
                    ,
                    e
                }(Be),
                Bn = function(t) {
                    function e(e, n, r) {
                        this._o = e,
                        this._p = n,
                        this._r = r,
                        t.call(this)
                    }
                    return oe(e, t),
                    e.prototype.next = function() {
                        this._p._open = !0,
                        this._r.dispose()
                    }
                    ,
                    e.prototype.error = function(t) {
                        this._o.onError(t)
                    }
                    ,
                    e.prototype.onCompleted = function() {
                        this._r.dispose()
                    }
                    ,
                    e
                }(Be),
                We.skipUntil = function(t) {
                    return new Yn(this,t)
                }
                ,
                Hn = function(t) {
                    function e(e) {
                        this.source = e,
                        t.call(this)
                    }
                    function n(t, e) {
                        this.o = t,
                        this.inner = e,
                        this.stopped = !1,
                        this.latest = 0,
                        this.hasLatest = !1,
                        Be.call(this)
                    }
                    function r(t, e) {
                        this.parent = t,
                        this.id = e,
                        Be.call(this)
                    }
                    return oe(e, t),
                    e.prototype.subscribeCore = function(t) {
                        var e = new ve
                          , r = this.source.subscribe(new n(t,e));
                        return new me(r,e)
                    }
                    ,
                    oe(n, Be),
                    n.prototype.next = function(t) {
                        var e = new be
                          , n = ++this.latest;
                        this.hasLatest = !0,
                        this.inner.setDisposable(e),
                        wi(t) && (t = Tr(t)),
                        e.setDisposable(t.subscribe(new r(this,n)))
                    }
                    ,
                    n.prototype.error = function(t) {
                        this.o.onError(t)
                    }
                    ,
                    n.prototype.completed = function() {
                        this.stopped = !0,
                        !this.hasLatest && this.o.onCompleted()
                    }
                    ,
                    oe(r, Be),
                    r.prototype.next = function(t) {
                        this.parent.latest === this.id && this.parent.o.onNext(t)
                    }
                    ,
                    r.prototype.error = function(t) {
                        this.parent.latest === this.id && this.parent.o.onError(t)
                    }
                    ,
                    r.prototype.completed = function() {
                        this.parent.latest === this.id && (this.parent.hasLatest = !1,
                        this.parent.stopped && this.parent.o.onCompleted())
                    }
                    ,
                    e
                }(Ge),
                We.switch = We.switchLatest = function() {
                    return new Hn(this)
                }
                ,
                Wn = function(t) {
                    function e(e, n) {
                        this.source = e,
                        this.other = wi(n) ? Tr(n) : n,
                        t.call(this)
                    }
                    return oe(e, t),
                    e.prototype.subscribeCore = function(t) {
                        return new me(this.source.subscribe(t),this.other.subscribe(new Kn(t)))
                    }
                    ,
                    e
                }(Ge),
                Kn = function(t) {
                    function e(e) {
                        this._o = e,
                        t.call(this)
                    }
                    return oe(e, t),
                    e.prototype.next = function() {
                        this._o.onCompleted()
                    }
                    ,
                    e.prototype.error = function(t) {
                        this._o.onError(t)
                    }
                    ,
                    e.prototype.onCompleted = di,
                    e
                }(Be),
                We.takeUntil = function(t) {
                    return new Wn(this,t)
                }
                ,
                Qn = function(t) {
                    function e(e, n, r) {
                        this._s = e,
                        this._ss = n,
                        this._cb = r,
                        t.call(this)
                    }
                    return oe(e, t),
                    e.prototype.subscribeCore = function(t) {
                        var e, n, r, i, o = this._ss.length, s = {
                            hasValue: x(o, M),
                            hasValueAll: !1,
                            values: Array(o)
                        }, u = this._ss.length, c = Array(u + 1);
                        for (e = 0; e < u; e++)
                            n = this._ss[e],
                            r = new be,
                            wi(n) && (n = Tr(n)),
                            r.setDisposable(n.subscribe(new Gn(t,e,s))),
                            c[e] = r;
                        return i = new be,
                        i.setDisposable(this._s.subscribe(new Zn(t,this._cb,s))),
                        c[u] = i,
                        new ye(c)
                    }
                    ,
                    e
                }(Ge),
                Gn = function(t) {
                    function e(e, n, r) {
                        this._o = e,
                        this._i = n,
                        this._state = r,
                        t.call(this)
                    }
                    return oe(e, t),
                    e.prototype.next = function(t) {
                        this._state.values[this._i] = t,
                        this._state.hasValue[this._i] = !0,
                        this._state.hasValueAll = this._state.hasValue.every(bi)
                    }
                    ,
                    e.prototype.error = function(t) {
                        this._o.onError(t)
                    }
                    ,
                    e.prototype.completed = di,
                    e
                }(Be),
                Zn = function(t) {
                    function e(e, n, r) {
                        this._o = e,
                        this._cb = n,
                        this._state = r,
                        t.call(this)
                    }
                    return oe(e, t),
                    e.prototype.next = function(t) {
                        var e, n = [t].concat(this._state.values);
                        if (this._state.hasValueAll) {
                            if ((e = Ci(this._cb).apply(null, n)) === Ei)
                                return this._o.onError(e.e);
                            this._o.onNext(e)
                        }
                    }
                    ,
                    e.prototype.error = function(t) {
                        this._o.onError(t)
                    }
                    ,
                    e.prototype.completed = function() {
                        this._o.onCompleted()
                    }
                    ,
                    e
                }(Be),
                We.withLatestFrom = function() {
                    var t, e, n, r;
                    if (0 === arguments.length)
                        throw Error("invalid arguments");
                    for (t = arguments.length,
                    e = Array(t),
                    n = 0; n < t; n++)
                        e[n] = arguments[n];
                    return r = gi(e[t - 1]) ? e.pop() : F,
                    Array.isArray(e[0]) && (e = e[0]),
                    new Qn(this,e,r)
                }
                ,
                Jn = function(t) {
                    function e(e, n) {
                        this._s = e,
                        this._cb = n,
                        t.call(this)
                    }
                    return oe(e, t),
                    e.prototype.subscribeCore = function(t) {
                        var e, n, r, i = this._s.length, o = Array(i), s = x(i, M), u = x(i, V);
                        for (e = 0; e < i; e++)
                            n = this._s[e],
                            r = new be,
                            o[e] = r,
                            wi(n) && (n = Tr(n)),
                            r.setDisposable(n.subscribe(new Xn(t,e,this,u,s)));
                        return new ye(o)
                    }
                    ,
                    e
                }(Ge),
                Xn = function(t) {
                    function e(e, n, r, i, o) {
                        this._o = e,
                        this._i = n,
                        this._p = r,
                        this._q = i,
                        this._d = o,
                        t.call(this)
                    }
                    function n(t) {
                        return t.length > 0
                    }
                    function r(t) {
                        return t.shift()
                    }
                    function i(t) {
                        return function(e, n) {
                            return n !== t
                        }
                    }
                    return oe(e, t),
                    e.prototype.next = function(t) {
                        var e, o;
                        if (this._q[this._i].push(t),
                        this._q.every(n)) {
                            if (e = this._q.map(r),
                            (o = Ci(this._p._cb).apply(null, e)) === Ei)
                                return this._o.onError(o.e);
                            this._o.onNext(o)
                        } else
                            this._d.filter(i(this._i)).every(bi) && this._o.onCompleted()
                    }
                    ,
                    e.prototype.error = function(t) {
                        this._o.onError(t)
                    }
                    ,
                    e.prototype.completed = function() {
                        this._d[this._i] = !0,
                        this._d.every(bi) && this._o.onCompleted()
                    }
                    ,
                    e
                }(Be),
                We.zip = function() {
                    var t, e, n, r, i;
                    if (0 === arguments.length)
                        throw Error("invalid arguments");
                    for (t = arguments.length,
                    e = Array(t),
                    n = 0; n < t; n++)
                        e[n] = arguments[n];
                    return r = gi(e[t - 1]) ? e.pop() : F,
                    Array.isArray(e[0]) && (e = e[0]),
                    i = this,
                    e.unshift(i),
                    new Jn(e,r)
                }
                ,
                Ke.zip = function() {
                    var t, e, n = arguments.length, r = Array(n);
                    for (t = 0; t < n; t++)
                        r[t] = arguments[t];
                    return Array.isArray(r[0]) && (r = gi(r[1]) ? r[0].concat(r[1]) : r[0]),
                    e = r.shift(),
                    e.zip.apply(e, r)
                }
                ,
                tr = function(t) {
                    function e(e, n) {
                        this.sources = e,
                        this._cb = n,
                        t.call(this)
                    }
                    return oe(e, t),
                    e.prototype.subscribeCore = function(t) {
                        var e, n = this.sources, r = n.length, i = Array(r), o = {
                            q: x(r, V),
                            done: x(r, M),
                            cb: this._cb,
                            o: t
                        };
                        for (e = 0; e < r; e++)
                            !function(t) {
                                var e = n[t]
                                  , r = new be;
                                (Ct(e) || Et(e)) && (e = dn(e)),
                                i[t] = r,
                                r.setDisposable(e.subscribe(new er(o,t)))
                            }(e);
                        return new ye(i)
                    }
                    ,
                    e
                }(Ge),
                er = function(t) {
                    function e(e, n) {
                        this._s = e,
                        this._i = n,
                        t.call(this)
                    }
                    function n(t) {
                        return t.length > 0
                    }
                    function r(t) {
                        return t.shift()
                    }
                    function i(t) {
                        return function(e, n) {
                            return n !== t
                        }
                    }
                    return oe(e, t),
                    e.prototype.next = function(t) {
                        if (this._s.q[this._i].push(t),
                        this._s.q.every(n)) {
                            var e = this._s.q.map(r)
                              , o = Ci(this._s.cb).apply(null, e);
                            if (o === Ei)
                                return this._s.o.onError(o.e);
                            this._s.o.onNext(o)
                        } else
                            this._s.done.filter(i(this._i)).every(bi) && this._s.o.onCompleted()
                    }
                    ,
                    e.prototype.error = function(t) {
                        this._s.o.onError(t)
                    }
                    ,
                    e.prototype.completed = function() {
                        this._s.done[this._i] = !0,
                        this._s.done.every(bi) && this._s.o.onCompleted()
                    }
                    ,
                    e
                }(Be),
                We.zipIterable = function() {
                    var t, e, n, r, i;
                    if (0 === arguments.length)
                        throw Error("invalid arguments");
                    for (t = arguments.length,
                    e = Array(t),
                    n = 0; n < t; n++)
                        e[n] = arguments[n];
                    return r = gi(e[t - 1]) ? e.pop() : F,
                    i = this,
                    e.unshift(i),
                    new tr(e,r)
                }
                ,
                We.asObservable = function() {
                    return new Qr(U(this),this)
                }
                ,
                nr = function(t) {
                    function e(e) {
                        this.source = e,
                        t.call(this)
                    }
                    return oe(e, t),
                    e.prototype.subscribeCore = function(t) {
                        return this.source.subscribe(new rr(t))
                    }
                    ,
                    e
                }(Ge),
                rr = function(t) {
                    function e(e) {
                        this._o = e,
                        t.call(this)
                    }
                    return oe(e, t),
                    e.prototype.next = function(t) {
                        t.accept(this._o)
                    }
                    ,
                    e.prototype.error = function(t) {
                        this._o.onError(t)
                    }
                    ,
                    e.prototype.completed = function() {
                        this._o.onCompleted()
                    }
                    ,
                    e
                }(Be),
                We.dematerialize = function() {
                    return new nr(this)
                }
                ,
                ir = function(t) {
                    function e(e, n, r) {
                        this.source = e,
                        this.keyFn = n,
                        this.comparer = r,
                        t.call(this)
                    }
                    return oe(e, t),
                    e.prototype.subscribeCore = function(t) {
                        return this.source.subscribe(new or(t,this.keyFn,this.comparer))
                    }
                    ,
                    e
                }(Ge),
                or = function(t) {
                    function e(e, n, r) {
                        this.o = e,
                        this.keyFn = n,
                        this.comparer = r,
                        this.hasCurrentKey = !1,
                        this.currentKey = null,
                        t.call(this)
                    }
                    return oe(e, t),
                    e.prototype.next = function(t) {
                        var e, n = t;
                        return gi(this.keyFn) && (n = Ci(this.keyFn)(t)) === Ei ? this.o.onError(n.e) : this.hasCurrentKey && (e = Ci(this.comparer)(this.currentKey, n)) === Ei ? this.o.onError(e.e) : void (this.hasCurrentKey && e || (this.hasCurrentKey = !0,
                        this.currentKey = n,
                        this.o.onNext(t)))
                    }
                    ,
                    e.prototype.error = function(t) {
                        this.o.onError(t)
                    }
                    ,
                    e.prototype.completed = function() {
                        this.o.onCompleted()
                    }
                    ,
                    e
                }(Be),
                We.distinctUntilChanged = function(t, e) {
                    return e || (e = mi),
                    new ir(this,t,e)
                }
                ,
                sr = function(t) {
                    function e(e, n, r, i) {
                        this.source = e,
                        this._oN = n,
                        this._oE = r,
                        this._oC = i,
                        t.call(this)
                    }
                    function n(t, e) {
                        this.o = t,
                        this.t = !e._oN || gi(e._oN) ? ze(e._oN || di, e._oE || di, e._oC || di) : e._oN,
                        this.isStopped = !1,
                        Be.call(this)
                    }
                    return oe(e, t),
                    e.prototype.subscribeCore = function(t) {
                        return this.source.subscribe(new n(t,this))
                    }
                    ,
                    oe(n, Be),
                    n.prototype.next = function(t) {
                        var e = Ci(this.t.onNext).call(this.t, t);
                        e === Ei && this.o.onError(e.e),
                        this.o.onNext(t)
                    }
                    ,
                    n.prototype.error = function(t) {
                        var e = Ci(this.t.onError).call(this.t, t);
                        if (e === Ei)
                            return this.o.onError(e.e);
                        this.o.onError(t)
                    }
                    ,
                    n.prototype.completed = function() {
                        var t = Ci(this.t.onCompleted).call(this.t);
                        if (t === Ei)
                            return this.o.onError(t.e);
                        this.o.onCompleted()
                    }
                    ,
                    e
                }(Ge),
                We.do = We.tap = We.doAction = function(t, e, n) {
                    return new sr(this,t,e,n)
                }
                ,
                We.doOnNext = We.tapOnNext = function(t, e) {
                    return this.tap(s !== e ? function(n) {
                        t.call(e, n)
                    }
                    : t)
                }
                ,
                We.doOnError = We.tapOnError = function(t, e) {
                    return this.tap(di, s !== e ? function(n) {
                        t.call(e, n)
                    }
                    : t)
                }
                ,
                We.doOnCompleted = We.tapOnCompleted = function(t, e) {
                    return this.tap(di, null, s !== e ? function() {
                        t.call(e)
                    }
                    : t)
                }
                ,
                ur = function(t) {
                    function e(e, n, r) {
                        this.source = e,
                        this._fn = kt(n, r, 0),
                        t.call(this)
                    }
                    function n(t, e) {
                        this.isDisposed = !1,
                        this._s = t,
                        this._fn = e
                    }
                    return oe(e, t),
                    e.prototype.subscribeCore = function(t) {
                        var e = Ci(this.source.subscribe).call(this.source, t);
                        return e === Ei && (this._fn(),
                        l(e.e)),
                        new n(e,this._fn)
                    }
                    ,
                    n.prototype.dispose = function() {
                        if (!this.isDisposed) {
                            var t = Ci(this._s.dispose).call(this._s);
                            this._fn(),
                            t === Ei && l(t.e)
                        }
                    }
                    ,
                    e
                }(Ge),
                We.finally = function(t, e) {
                    return new ur(this,t,e)
                }
                ,
                cr = function(t) {
                    function e(e) {
                        this.source = e,
                        t.call(this)
                    }
                    function n(t) {
                        this.o = t,
                        this.isStopped = !1
                    }
                    return oe(e, t),
                    e.prototype.subscribeCore = function(t) {
                        return this.source.subscribe(new n(t))
                    }
                    ,
                    n.prototype.onNext = di,
                    n.prototype.onError = function(t) {
                        this.isStopped || (this.isStopped = !0,
                        this.o.onError(t))
                    }
                    ,
                    n.prototype.onCompleted = function() {
                        this.isStopped || (this.isStopped = !0,
                        this.o.onCompleted())
                    }
                    ,
                    n.prototype.dispose = function() {
                        this.isStopped = !0
                    }
                    ,
                    n.prototype.fail = function(t) {
                        return !this.isStopped && (this.isStopped = !0,
                        this.observer.onError(t),
                        !0)
                    }
                    ,
                    e
                }(Ge),
                We.ignoreElements = function() {
                    return new cr(this)
                }
                ,
                ar = function(t) {
                    function e(e, n) {
                        this.source = e,
                        t.call(this)
                    }
                    return oe(e, t),
                    e.prototype.subscribeCore = function(t) {
                        return this.source.subscribe(new lr(t))
                    }
                    ,
                    e
                }(Ge),
                lr = function(t) {
                    function e(e) {
                        this._o = e,
                        t.call(this)
                    }
                    return oe(e, t),
                    e.prototype.next = function(t) {
                        this._o.onNext(Fe(t))
                    }
                    ,
                    e.prototype.error = function(t) {
                        this._o.onNext(Ve(t)),
                        this._o.onCompleted()
                    }
                    ,
                    e.prototype.completed = function() {
                        this._o.onNext(Ue()),
                        this._o.onCompleted()
                    }
                    ,
                    e
                }(Be),
                We.materialize = function() {
                    return new ar(this)
                }
                ,
                We.repeat = function(t) {
                    return nn(this, t).concat()
                }
                ,
                We.retry = function(t) {
                    return nn(this, t).catchError()
                }
                ,
                hr = function(t) {
                    function e(t) {
                        return {
                            isDisposed: !1,
                            dispose: function() {
                                this.isDisposed || (this.isDisposed = !0,
                                t.isDisposed = !0)
                            }
                        }
                    }
                    function n(e, n) {
                        this.source = e,
                        this._notifier = n,
                        t.call(this)
                    }
                    return oe(n, t),
                    n.prototype.subscribeCore = function(t) {
                        var n, r = new Jr, i = new Jr, o = this._notifier(r), s = o.subscribe(i), u = this.source["@@iterator"](), c = {
                            isDisposed: !1
                        }, a = new ve, l = xe.scheduleRecursive(null, function(e, o) {
                            var s, l, h, p;
                            if (!c.isDisposed) {
                                if (s = u.next(),
                                s.done)
                                    return void (n ? t.onError(n) : t.onCompleted());
                                l = s.value,
                                wi(l) && (l = Tr(l)),
                                h = new be,
                                p = new be,
                                a.setDisposable(new me(p,h)),
                                h.setDisposable(l.subscribe(function(e) {
                                    t.onNext(e)
                                }, function(e) {
                                    p.setDisposable(i.subscribe(o, function(e) {
                                        t.onError(e)
                                    }, function() {
                                        t.onCompleted()
                                    })),
                                    r.onNext(e),
                                    h.dispose()
                                }, function() {
                                    t.onCompleted()
                                }))
                            }
                        });
                        return new ye([s, a, l, e(c)])
                    }
                    ,
                    n
                }(Ge),
                We.retryWhen = function(t) {
                    return new hr(Y(this),t)
                }
                ,
                pr = function(t) {
                    function e(t) {
                        return {
                            isDisposed: !1,
                            dispose: function() {
                                this.isDisposed || (this.isDisposed = !0,
                                t.isDisposed = !0)
                            }
                        }
                    }
                    function n(e, n) {
                        this.source = e,
                        this._notifier = n,
                        t.call(this)
                    }
                    return oe(n, t),
                    n.prototype.subscribeCore = function(t) {
                        var n, r = new Jr, i = new Jr, o = this._notifier(r), s = o.subscribe(i), u = this.source["@@iterator"](), c = {
                            isDisposed: !1
                        }, a = new ve, l = xe.scheduleRecursive(null, function(e, o) {
                            var s, l, h, p;
                            if (!c.isDisposed) {
                                if (s = u.next(),
                                s.done)
                                    return void (n ? t.onError(n) : t.onCompleted());
                                l = s.value,
                                wi(l) && (l = Tr(l)),
                                h = new be,
                                p = new be,
                                a.setDisposable(new me(p,h)),
                                h.setDisposable(l.subscribe(function(e) {
                                    t.onNext(e)
                                }, function(e) {
                                    t.onError(e)
                                }, function() {
                                    p.setDisposable(i.subscribe(o, function(e) {
                                        t.onError(e)
                                    }, function() {
                                        t.onCompleted()
                                    })),
                                    r.onNext(null),
                                    h.dispose()
                                }))
                            }
                        });
                        return new ye([s, a, l, e(c)])
                    }
                    ,
                    n
                }(Ge),
                We.repeatWhen = function(t) {
                    return new pr(Y(this),t)
                }
                ,
                fr = function(t) {
                    function e(e, n, r, i) {
                        this.source = e,
                        this.accumulator = n,
                        this.hasSeed = r,
                        this.seed = i,
                        t.call(this)
                    }
                    return oe(e, t),
                    e.prototype.subscribeCore = function(t) {
                        return this.source.subscribe(new dr(t,this))
                    }
                    ,
                    e
                }(Ge),
                dr = function(t) {
                    function e(e, n) {
                        this._o = e,
                        this._p = n,
                        this._fn = n.accumulator,
                        this._hs = n.hasSeed,
                        this._s = n.seed,
                        this._ha = !1,
                        this._a = null,
                        this._hv = !1,
                        this._i = 0,
                        t.call(this)
                    }
                    return oe(e, t),
                    e.prototype.next = function(t) {
                        if (!this._hv && (this._hv = !0),
                        this._ha ? this._a = Ci(this._fn)(this._a, t, this._i, this._p) : (this._a = this._hs ? Ci(this._fn)(this._s, t, this._i, this._p) : t,
                        this._ha = !0),
                        this._a === Ei)
                            return this._o.onError(this._a.e);
                        this._o.onNext(this._a),
                        this._i++
                    }
                    ,
                    e.prototype.error = function(t) {
                        this._o.onError(t)
                    }
                    ,
                    e.prototype.completed = function() {
                        !this._hv && this._hs && this._o.onNext(this._s),
                        this._o.onCompleted()
                    }
                    ,
                    e
                }(Be),
                We.scan = function() {
                    var t, e = !1, n = arguments[0];
                    return 2 === arguments.length && (e = !0,
                    t = arguments[1]),
                    new fr(this,n,e,t)
                }
                ,
                br = function(t) {
                    function e(e, n) {
                        this.source = e,
                        this._c = n,
                        t.call(this)
                    }
                    return oe(e, t),
                    e.prototype.subscribeCore = function(t) {
                        return this.source.subscribe(new vr(t,this._c))
                    }
                    ,
                    e
                }(Ge),
                vr = function(t) {
                    function e(e, n) {
                        this._o = e,
                        this._c = n,
                        this._q = [],
                        t.call(this)
                    }
                    return oe(e, t),
                    e.prototype.next = function(t) {
                        this._q.push(t),
                        this._q.length > this._c && this._o.onNext(this._q.shift())
                    }
                    ,
                    e.prototype.error = function(t) {
                        this._o.onError(t)
                    }
                    ,
                    e.prototype.completed = function() {
                        this._o.onCompleted()
                    }
                    ,
                    e
                }(Be),
                We.skipLast = function(t) {
                    if (t < 0)
                        throw new vt;
                    return new br(this,t)
                }
                ,
                We.startWith = function() {
                    var t, e, n, r, i = 0;
                    for (arguments.length && Ee(arguments[0]) ? (t = arguments[0],
                    i = 1) : t = ke,
                    e = [],
                    n = i,
                    r = arguments.length; n < r; n++)
                        e.push(arguments[n]);
                    return on([vn(e, t), this]).concat()
                }
                ,
                mr = function(t) {
                    function e(e, n) {
                        this._o = e,
                        this._c = n,
                        this._q = [],
                        t.call(this)
                    }
                    return oe(e, t),
                    e.prototype.next = function(t) {
                        this._q.push(t),
                        this._q.length > this._c && this._q.shift()
                    }
                    ,
                    e.prototype.error = function(t) {
                        this._o.onError(t)
                    }
                    ,
                    e.prototype.completed = function() {
                        for (; this._q.length > 0; )
                            this._o.onNext(this._q.shift());
                        this._o.onCompleted()
                    }
                    ,
                    e
                }(Be),
                We.takeLast = function(t) {
                    if (t < 0)
                        throw new vt;
                    var e = this;
                    return new Qr(function(n) {
                        return e.subscribe(new mr(n,t))
                    }
                    ,e)
                }
                ,
                We.flatMapConcat = We.concatMap = function(t, e, n) {
                    return new Ze(this,t,e,n).merge(1)
                }
                ,
                yr = function(t) {
                    function e(e, n, r) {
                        this.source = e,
                        this.selector = kt(n, r, 3),
                        t.call(this)
                    }
                    function n(t, e) {
                        return function(n, r, i) {
                            return t.call(this, e.selector(n, r, i), r, i)
                        }
                    }
                    function r(t, e, n) {
                        this.o = t,
                        this.selector = e,
                        this.source = n,
                        this.i = 0,
                        Be.call(this)
                    }
                    return oe(e, t),
                    e.prototype.internalMap = function(t, r) {
                        return new e(this.source,n(t, this),r)
                    }
                    ,
                    e.prototype.subscribeCore = function(t) {
                        return this.source.subscribe(new r(t,this.selector,this))
                    }
                    ,
                    oe(r, Be),
                    r.prototype.next = function(t) {
                        var e = Ci(this.selector)(t, this.i++, this.source);
                        if (e === Ei)
                            return this.o.onError(e.e);
                        this.o.onNext(e)
                    }
                    ,
                    r.prototype.error = function(t) {
                        this.o.onError(t)
                    }
                    ,
                    r.prototype.completed = function() {
                        this.o.onCompleted()
                    }
                    ,
                    e
                }(Ge),
                We.map = We.select = function(t, e) {
                    var n = "function" == typeof t ? t : function() {
                        return t
                    }
                    ;
                    return this instanceof yr ? this.internalMap(n, e) : new yr(this,n,e)
                }
                ,
                We.pluck = function() {
                    var t, e = arguments.length, n = Array(e);
                    if (0 === e)
                        throw Error("List of properties cannot be empty.");
                    for (t = 0; t < e; t++)
                        n[t] = arguments[t];
                    return this.map(z(n, e))
                }
                ,
                We.flatMap = We.selectMany = function(t, e, n) {
                    return new Ze(this,t,e,n).mergeAll()
                }
                ,
                fi.Observable.prototype.flatMapLatest = function(t, e, n) {
                    return new Ze(this,t,e,n).switchLatest()
                }
                ,
                _r = function(t) {
                    function e(e, n) {
                        this.source = e,
                        this._count = n,
                        t.call(this)
                    }
                    function n(t, e) {
                        this._o = t,
                        this._r = e,
                        Be.call(this)
                    }
                    return oe(e, t),
                    e.prototype.subscribeCore = function(t) {
                        return this.source.subscribe(new n(t,this._count))
                    }
                    ,
                    oe(n, Be),
                    n.prototype.next = function(t) {
                        this._r <= 0 ? this._o.onNext(t) : this._r--
                    }
                    ,
                    n.prototype.error = function(t) {
                        this._o.onError(t)
                    }
                    ,
                    n.prototype.completed = function() {
                        this._o.onCompleted()
                    }
                    ,
                    e
                }(Ge),
                We.skip = function(t) {
                    if (t < 0)
                        throw new vt;
                    return new _r(this,t)
                }
                ,
                wr = function(t) {
                    function e(e, n) {
                        this.source = e,
                        this._fn = n,
                        t.call(this)
                    }
                    return oe(e, t),
                    e.prototype.subscribeCore = function(t) {
                        return this.source.subscribe(new gr(t,this))
                    }
                    ,
                    e
                }(Ge),
                gr = function(t) {
                    function e(e, n) {
                        this._o = e,
                        this._p = n,
                        this._i = 0,
                        this._r = !1,
                        t.call(this)
                    }
                    return oe(e, t),
                    e.prototype.next = function(t) {
                        if (!this._r) {
                            var e = Ci(this._p._fn)(t, this._i++, this._p);
                            if (e === Ei)
                                return this._o.onError(e.e);
                            this._r = !e
                        }
                        this._r && this._o.onNext(t)
                    }
                    ,
                    e.prototype.error = function(t) {
                        this._o.onError(t)
                    }
                    ,
                    e.prototype.completed = function() {
                        this._o.onCompleted()
                    }
                    ,
                    e
                }(Be),
                We.skipWhile = function(t, e) {
                    var n = kt(t, e, 3);
                    return new wr(this,n)
                }
                ,
                Er = function(t) {
                    function e(e, n) {
                        this.source = e,
                        this._count = n,
                        t.call(this)
                    }
                    function n(t, e) {
                        this._o = t,
                        this._c = e,
                        this._r = e,
                        Be.call(this)
                    }
                    return oe(e, t),
                    e.prototype.subscribeCore = function(t) {
                        return this.source.subscribe(new n(t,this._count))
                    }
                    ,
                    oe(n, Be),
                    n.prototype.next = function(t) {
                        this._r-- > 0 && (this._o.onNext(t),
                        this._r <= 0 && this._o.onCompleted())
                    }
                    ,
                    n.prototype.error = function(t) {
                        this._o.onError(t)
                    }
                    ,
                    n.prototype.completed = function() {
                        this._o.onCompleted()
                    }
                    ,
                    e
                }(Ge),
                We.take = function(t, e) {
                    if (t < 0)
                        throw new vt;
                    return 0 === t ? hn(e) : new Er(this,t)
                }
                ,
                Cr = function(t) {
                    function e(e, n) {
                        this.source = e,
                        this._fn = n,
                        t.call(this)
                    }
                    return oe(e, t),
                    e.prototype.subscribeCore = function(t) {
                        return this.source.subscribe(new kr(t,this))
                    }
                    ,
                    e
                }(Ge),
                kr = function(t) {
                    function e(e, n) {
                        this._o = e,
                        this._p = n,
                        this._i = 0,
                        this._r = !0,
                        t.call(this)
                    }
                    return oe(e, t),
                    e.prototype.next = function(t) {
                        if (this._r && (this._r = Ci(this._p._fn)(t, this._i++, this._p),
                        this._r === Ei))
                            return this._o.onError(this._r.e);
                        this._r ? this._o.onNext(t) : this._o.onCompleted()
                    }
                    ,
                    e.prototype.error = function(t) {
                        this._o.onError(t)
                    }
                    ,
                    e.prototype.completed = function() {
                        this._o.onCompleted()
                    }
                    ,
                    e
                }(Be),
                We.takeWhile = function(t, e) {
                    var n = kt(t, e, 3);
                    return new Cr(this,n)
                }
                ,
                Or = function(t) {
                    function e(e, n, r) {
                        this.source = e,
                        this.predicate = kt(n, r, 3),
                        t.call(this)
                    }
                    function n(t, e) {
                        return function(n, r, i) {
                            return e.predicate(n, r, i) && t.call(this, n, r, i)
                        }
                    }
                    function r(t, e, n) {
                        this.o = t,
                        this.predicate = e,
                        this.source = n,
                        this.i = 0,
                        Be.call(this)
                    }
                    return oe(e, t),
                    e.prototype.subscribeCore = function(t) {
                        return this.source.subscribe(new r(t,this.predicate,this))
                    }
                    ,
                    e.prototype.internalFilter = function(t, r) {
                        return new e(this.source,n(t, this),r)
                    }
                    ,
                    oe(r, Be),
                    r.prototype.next = function(t) {
                        var e = Ci(this.predicate)(t, this.i++, this.source);
                        if (e === Ei)
                            return this.o.onError(e.e);
                        e && this.o.onNext(t)
                    }
                    ,
                    r.prototype.error = function(t) {
                        this.o.onError(t)
                    }
                    ,
                    r.prototype.completed = function() {
                        this.o.onCompleted()
                    }
                    ,
                    e
                }(Ge),
                We.filter = We.where = function(t, e) {
                    return this instanceof Or ? this.internalFilter(t, e) : new Or(this,t,e)
                }
                ,
                Ke.fromCallback = function(t, e, n) {
                    return function() {
                        var r, i, o;
                        for (s === e && (e = this),
                        r = arguments.length,
                        i = Array(r),
                        o = 0; o < r; o++)
                            i[o] = arguments[o];
                        return B(t, e, n, i)
                    }
                }
                ,
                Ke.fromNodeCallback = function(t, e, n) {
                    return function() {
                        var r, i, o;
                        for (s === e && (e = this),
                        r = arguments.length,
                        i = Array(r),
                        o = 0; o < r; o++)
                            i[o] = arguments[o];
                        return W(t, e, n, i)
                    }
                }
                ,
                G.prototype.dispose = function() {
                    this.isDisposed || (this._e.removeEventListener(this._n, this._fn, !1),
                    this.isDisposed = !0)
                }
                ,
                fi.config.useNativeEvents = !1,
                xr = function(t) {
                    function e(e, n, r) {
                        this._el = e,
                        this._n = n,
                        this._fn = r,
                        t.call(this)
                    }
                    function n(t, e) {
                        return function() {
                            var n = arguments[0];
                            if (gi(e) && (n = Ci(e).apply(null, arguments)) === Ei)
                                return t.onError(n.e);
                            t.onNext(n)
                        }
                    }
                    return oe(e, t),
                    e.prototype.subscribeCore = function(t) {
                        return Z(this._el, this._n, n(t, this._fn))
                    }
                    ,
                    e
                }(Ge),
                Ke.fromEvent = function(t, e, n) {
                    return t.addListener ? Dr(function(n) {
                        t.addListener(e, n)
                    }, function(n) {
                        t.removeListener(e, n)
                    }, n) : fi.config.useNativeEvents || "function" != typeof t.on || "function" != typeof t.off ? new xr(t,e,n).publish().refCount() : Dr(function(n) {
                        t.on(e, n)
                    }, function(n) {
                        t.off(e, n)
                    }, n)
                }
                ,
                Sr = function(t) {
                    function e(e, n, r) {
                        this._add = e,
                        this._del = n,
                        this._fn = r,
                        t.call(this)
                    }
                    function n(t, e) {
                        return function() {
                            var n = arguments[0];
                            if (gi(e) && (n = Ci(e).apply(null, arguments)) === Ei)
                                return t.onError(n.e);
                            t.onNext(n)
                        }
                    }
                    function r(t, e, n) {
                        this._del = t,
                        this._fn = e,
                        this._ret = n,
                        this.isDisposed = !1
                    }
                    return oe(e, t),
                    e.prototype.subscribeCore = function(t) {
                        var e = n(t, this._fn)
                          , i = this._add(e);
                        return new r(this._del,e,i)
                    }
                    ,
                    r.prototype.dispose = function() {
                        this.isDisposed || (gi(this._del) && this._del(this._fn, this._ret),
                        this.isDisposed = !0)
                    }
                    ,
                    e
                }(Ge),
                Dr = Ke.fromEventPattern = function(t, e, n) {
                    return new Sr(t,e,n).publish().refCount()
                }
                ,
                $r = function(t) {
                    function e(e, n) {
                        this._p = e,
                        this._s = n,
                        t.call(this)
                    }
                    function n(t, e) {
                        var n = e[0]
                          , r = e[1];
                        n.onNext(r),
                        n.onCompleted()
                    }
                    function r(t, e) {
                        var n = e[0]
                          , r = e[1];
                        n.onError(r)
                    }
                    return oe(e, t),
                    e.prototype.subscribeCore = function(t) {
                        var e = new be
                          , i = this;
                        return this._p.then(function(r) {
                            e.setDisposable(i._s.schedule([t, r], n))
                        }, function(n) {
                            e.setDisposable(i._s.schedule([t, n], r))
                        }),
                        e
                    }
                    ,
                    e
                }(Ge),
                Tr = Ke.fromPromise = function(t, e) {
                    return e || (e = Ae),
                    new $r(t,e)
                }
                ,
                We.toPromise = function(t) {
                    if (t || (t = fi.config.Promise),
                    !t)
                        throw new mt("Promise type not provided nor in Rx.config.Promise");
                    var e = this;
                    return new t(function(t, n) {
                        var r;
                        e.subscribe(function(t) {
                            r = t
                        }, n, function() {
                            t(r)
                        })
                    }
                    )
                }
                ,
                Ke.startAsync = function(t) {
                    var e = Ci(t)();
                    return e === Ei ? On(e.e) : Tr(e)
                }
                ,
                Pr = function(t) {
                    function e(e, n, r) {
                        this.source = e,
                        this._fn1 = n,
                        this._fn2 = r,
                        t.call(this)
                    }
                    return oe(e, t),
                    e.prototype.subscribeCore = function(t) {
                        var e = this.source.multicast(this._fn1());
                        return new me(this._fn2(e).subscribe(t),e.connect())
                    }
                    ,
                    e
                }(Ge),
                We.multicast = function(t, e) {
                    return gi(t) ? new Pr(this,t,e) : new Ar(this,t)
                }
                ,
                We.publish = function(t) {
                    return t && gi(t) ? this.multicast(function() {
                        return new Jr
                    }, t) : this.multicast(new Jr)
                }
                ,
                We.share = function() {
                    return this.publish().refCount()
                }
                ,
                We.publishLast = function(t) {
                    return t && gi(t) ? this.multicast(function() {
                        return new Xr
                    }, t) : this.multicast(new Xr)
                }
                ,
                We.publishValue = function(t, e) {
                    return 2 === arguments.length ? this.multicast(function() {
                        return new ei(e)
                    }, t) : this.multicast(new ei(t))
                }
                ,
                We.shareValue = function(t) {
                    return this.publishValue(t).refCount()
                }
                ,
                We.replay = function(t, e, n, r) {
                    return t && gi(t) ? this.multicast(function() {
                        return new ni(e,n,r)
                    }, t) : this.multicast(new ni(e,n,r))
                }
                ,
                We.shareReplay = function(t, e, n) {
                    return this.replay(null, t, e, n).refCount()
                }
                ,
                jr = function(t) {
                    function e(e) {
                        this.source = e,
                        this._count = 0,
                        this._connectableSubscription = null,
                        t.call(this)
                    }
                    function n(t, e) {
                        this._p = t,
                        this._s = e,
                        this.isDisposed = !1
                    }
                    return oe(e, t),
                    e.prototype.subscribeCore = function(t) {
                        var e = this.source.subscribe(t);
                        return 1 == ++this._count && (this._connectableSubscription = this.source.connect()),
                        new n(this,e)
                    }
                    ,
                    n.prototype.dispose = function() {
                        this.isDisposed || (this.isDisposed = !0,
                        this._s.dispose(),
                        0 == --this._p._count && this._p._connectableSubscription.dispose())
                    }
                    ,
                    e
                }(Ge),
                Ar = fi.ConnectableObservable = function(t) {
                    function e(e, n) {
                        this.source = e,
                        this._connection = null,
                        this._source = e.asObservable(),
                        this._subject = n,
                        t.call(this)
                    }
                    function n(t, e) {
                        this._p = t,
                        this._s = e
                    }
                    return oe(e, t),
                    n.prototype.dispose = function() {
                        this._s && (this._s.dispose(),
                        this._s = null,
                        this._p._connection = null)
                    }
                    ,
                    e.prototype.connect = function() {
                        if (!this._connection) {
                            var t = this._source.subscribe(this._subject);
                            this._connection = new n(this,t)
                        }
                        return this._connection
                    }
                    ,
                    e.prototype._subscribe = function(t) {
                        return this._subject.subscribe(t)
                    }
                    ,
                    e.prototype.refCount = function() {
                        return new jr(this)
                    }
                    ,
                    e
                }(Ke),
                Lr = function(t) {
                    function e(e, n) {
                        this._dt = e,
                        this._s = n,
                        t.call(this)
                    }
                    function n(t, e) {
                        e.onNext(0),
                        e.onCompleted()
                    }
                    return oe(e, t),
                    e.prototype.subscribeCore = function(t) {
                        return this._s.scheduleFuture(t, this._dt, n)
                    }
                    ,
                    e
                }(Ge),
                Nr = Ke.interval = function(t, e) {
                    return tt(t, t, Ee(e) ? e : Ae)
                }
                ,
                Ke.timer = function(t, e, n) {
                    var r;
                    return Ee(n) || (n = Ae),
                    null != e && "number" == typeof e ? r = e : Ee(e) && (n = e),
                    (t instanceof Date || "number" == typeof t) && r === s ? J(t, n) : t instanceof Date && r !== s ? X(t, e, n) : tt(t, r, n)
                }
                ,
                We.delay = function() {
                    var t, e, n = arguments[0];
                    if ("number" == typeof n || n instanceof Date)
                        return t = n,
                        e = arguments[1],
                        Ee(e) || (e = Ae),
                        t instanceof Date ? nt(this, t, e) : et(this, t, e);
                    if (Ke.isObservable(n) || gi(n))
                        return rt(this, n, arguments[1]);
                    throw Error("Invalid arguments")
                }
                ,
                Rr = function(t) {
                    function e(e, n, r) {
                        Ee(r) || (r = Ae),
                        this.source = e,
                        this._dt = n,
                        this._s = r,
                        t.call(this)
                    }
                    return oe(e, t),
                    e.prototype.subscribeCore = function(t) {
                        var e = new ve;
                        return new me(this.source.subscribe(new qr(t,this._dt,this._s,e)),e)
                    }
                    ,
                    e
                }(Ge),
                qr = function(t) {
                    function e(e, n, r, i) {
                        this._o = e,
                        this._d = n,
                        this._scheduler = r,
                        this._c = i,
                        this._v = null,
                        this._hv = !1,
                        this._id = 0,
                        t.call(this)
                    }
                    return oe(e, t),
                    e.prototype.next = function(t) {
                        this._hv = !0,
                        this._v = t;
                        var e = ++this._id
                          , n = new be;
                        this._c.setDisposable(n),
                        n.setDisposable(this._scheduler.scheduleFuture(this, this._d, function(n, r) {
                            r._hv && r._id === e && r._o.onNext(t),
                            r._hv = !1
                        }))
                    }
                    ,
                    e.prototype.error = function(t) {
                        this._c.dispose(),
                        this._o.onError(t),
                        this._hv = !1,
                        this._id++
                    }
                    ,
                    e.prototype.completed = function() {
                        this._c.dispose(),
                        this._hv && this._o.onNext(this._v),
                        this._o.onCompleted(),
                        this._hv = !1,
                        this._id++
                    }
                    ,
                    e
                }(Be),
                We.debounce = function() {
                    if (gi(arguments[0]))
                        return it(this, arguments[0]);
                    if ("number" == typeof arguments[0])
                        return new Rr(this,arguments[0],arguments[1]);
                    throw Error("Invalid arguments")
                }
                ,
                Ir = function(t) {
                    function e(e, n) {
                        this.source = e,
                        this._s = n,
                        t.call(this)
                    }
                    return oe(e, t),
                    e.prototype.subscribeCore = function(t) {
                        return this.source.subscribe(new Mr(t,this._s))
                    }
                    ,
                    e
                }(Ge),
                Mr = function(t) {
                    function e(e, n) {
                        this._o = e,
                        this._s = n,
                        t.call(this)
                    }
                    return oe(e, t),
                    e.prototype.next = function(t) {
                        this._o.onNext({
                            value: t,
                            timestamp: this._s.now()
                        })
                    }
                    ,
                    e.prototype.error = function(t) {
                        this._o.onError(t)
                    }
                    ,
                    e.prototype.completed = function() {
                        this._o.onCompleted()
                    }
                    ,
                    e
                }(Be),
                We.timestamp = function(t) {
                    return Ee(t) || (t = Ae),
                    new Ir(this,t)
                }
                ,
                Fr = function(t) {
                    function e(e, n) {
                        this.source = e,
                        this._sampler = n,
                        t.call(this)
                    }
                    return oe(e, t),
                    e.prototype.subscribeCore = function(t) {
                        var e = {
                            o: t,
                            atEnd: !1,
                            value: null,
                            hasValue: !1,
                            sourceSubscription: new be
                        };
                        return e.sourceSubscription.setDisposable(this.source.subscribe(new Ur(e))),
                        new me(e.sourceSubscription,this._sampler.subscribe(new Vr(e)))
                    }
                    ,
                    e
                }(Ge),
                Vr = function(t) {
                    function e(e) {
                        this._s = e,
                        t.call(this)
                    }
                    return oe(e, t),
                    e.prototype._handleMessage = function() {
                        this._s.hasValue && (this._s.hasValue = !1,
                        this._s.o.onNext(this._s.value)),
                        this._s.atEnd && this._s.o.onCompleted()
                    }
                    ,
                    e.prototype.next = function() {
                        this._handleMessage()
                    }
                    ,
                    e.prototype.error = function(t) {
                        this._s.onError(t)
                    }
                    ,
                    e.prototype.completed = function() {
                        this._handleMessage()
                    }
                    ,
                    e
                }(Be),
                Ur = function(t) {
                    function e(e) {
                        this._s = e,
                        t.call(this)
                    }
                    return oe(e, t),
                    e.prototype.next = function(t) {
                        this._s.hasValue = !0,
                        this._s.value = t
                    }
                    ,
                    e.prototype.error = function(t) {
                        this._s.o.onError(t)
                    }
                    ,
                    e.prototype.completed = function() {
                        this._s.atEnd = !0,
                        this._s.sourceSubscription.dispose()
                    }
                    ,
                    e
                }(Be),
                We.sample = function(t, e) {
                    return Ee(e) || (e = Ae),
                    "number" == typeof t ? new Fr(this,Nr(t, e)) : new Fr(this,t)
                }
                ,
                Yr = fi.TimeoutError = function(t) {
                    this.message = t || "Timeout has occurred",
                    this.name = "TimeoutError",
                    Error.call(this)
                }
                ,
                Yr.prototype = Object.create(Error.prototype),
                We.timeout = function() {
                    var t = arguments[0];
                    if (t instanceof Date || "number" == typeof t)
                        return st(this, t, arguments[1], arguments[2]);
                    if (Ke.isObservable(t) || gi(t))
                        return ot(this, t, arguments[1], arguments[2]);
                    throw Error("Invalid arguments")
                }
                ,
                We.throttle = function(t, e) {
                    var n, r;
                    if (Ee(e) || (e = Ae),
                    (n = +t || 0) <= 0)
                        throw new RangeError("windowDuration cannot be less or equal zero.");
                    return r = this,
                    new Qr(function(t) {
                        var i = 0;
                        return r.subscribe(function(r) {
                            var o = e.now();
                            (0 === i || o - i >= n) && (i = o,
                            t.onNext(r))
                        }, function(e) {
                            t.onError(e)
                        }, function() {
                            t.onCompleted()
                        })
                    }
                    ,r)
                }
                ,
                zr = function(t) {
                    function e(e, n) {
                        this.source = e,
                        this.controller = new Jr,
                        n && n.subscribe ? this.pauser = this.controller.merge(n) : this.pauser = this.controller,
                        t.call(this)
                    }
                    return oe(e, t),
                    e.prototype._subscribe = function(t) {
                        var e = this.source.publish()
                          , n = e.subscribe(t)
                          , r = he
                          , i = this.pauser.distinctUntilChanged().subscribe(function(t) {
                            t ? r = e.connect() : (r.dispose(),
                            r = he)
                        });
                        return new ye([n, r, i])
                    }
                    ,
                    e.prototype.pause = function() {
                        this.controller.onNext(!1)
                    }
                    ,
                    e.prototype.resume = function() {
                        this.controller.onNext(!0)
                    }
                    ,
                    e
                }(Ke),
                We.pausable = function(t) {
                    return new zr(this,t)
                }
                ,
                Br = function(t) {
                    function e(e, n) {
                        this.source = e,
                        this.controller = new Jr,
                        n && n.subscribe ? this.pauser = this.controller.merge(n) : this.pauser = this.controller,
                        t.call(this)
                    }
                    return oe(e, t),
                    e.prototype._subscribe = function(t) {
                        function e() {
                            for (; r.length > 0; )
                                t.onNext(r.shift())
                        }
                        var n, r = [];
                        return ut(this.source, this.pauser.startWith(!1).distinctUntilChanged(), function(t, e) {
                            return {
                                data: t,
                                shouldFire: e
                            }
                        }).subscribe(function(i) {
                            n !== s && i.shouldFire !== n ? (n = i.shouldFire,
                            i.shouldFire && e()) : (n = i.shouldFire,
                            i.shouldFire ? t.onNext(i.data) : r.push(i.data))
                        }, function(n) {
                            e(),
                            t.onError(n)
                        }, function() {
                            e(),
                            t.onCompleted()
                        })
                    }
                    ,
                    e.prototype.pause = function() {
                        this.controller.onNext(!1)
                    }
                    ,
                    e.prototype.resume = function() {
                        this.controller.onNext(!0)
                    }
                    ,
                    e
                }(Ke),
                We.pausableBuffered = function(t) {
                    return new Br(this,t)
                }
                ,
                Hr = function(t) {
                    function e(e, n, r) {
                        t.call(this),
                        this.subject = new Wr(n,r),
                        this.source = e.multicast(this.subject).refCount()
                    }
                    return oe(e, t),
                    e.prototype._subscribe = function(t) {
                        return this.source.subscribe(t)
                    }
                    ,
                    e.prototype.request = function(t) {
                        return this.subject.request(null == t ? -1 : t)
                    }
                    ,
                    e
                }(Ke),
                Wr = function(t) {
                    function e(e, n) {
                        null == e && (e = !0),
                        t.call(this),
                        this.subject = new Jr,
                        this.enableQueue = e,
                        this.queue = e ? [] : null,
                        this.requestedCount = 0,
                        this.requestedDisposable = null,
                        this.error = null,
                        this.hasFailed = !1,
                        this.hasCompleted = !1,
                        this.scheduler = n || xe
                    }
                    return oe(e, t),
                    se(e.prototype, Ye, {
                        _subscribe: function(t) {
                            return this.subject.subscribe(t)
                        },
                        onCompleted: function() {
                            this.hasCompleted = !0,
                            this.enableQueue && 0 !== this.queue.length ? this.queue.push(Re.createOnCompleted()) : (this.subject.onCompleted(),
                            this.disposeCurrentRequest())
                        },
                        onError: function(t) {
                            this.hasFailed = !0,
                            this.error = t,
                            this.enableQueue && 0 !== this.queue.length ? this.queue.push(Re.createOnError(t)) : (this.subject.onError(t),
                            this.disposeCurrentRequest())
                        },
                        onNext: function(t) {
                            this.requestedCount <= 0 ? this.enableQueue && this.queue.push(Re.createOnNext(t)) : (0 == this.requestedCount-- && this.disposeCurrentRequest(),
                            this.subject.onNext(t))
                        },
                        _processRequest: function(t) {
                            if (this.enableQueue)
                                for (; this.queue.length > 0 && (t > 0 || "N" !== this.queue[0].kind); ) {
                                    var e = this.queue.shift();
                                    e.accept(this.subject),
                                    "N" === e.kind ? t-- : (this.disposeCurrentRequest(),
                                    this.queue = [])
                                }
                            return t
                        },
                        request: function(t) {
                            this.disposeCurrentRequest();
                            var e = this;
                            return this.requestedDisposable = this.scheduler.schedule(t, function(t, n) {
                                var r = e._processRequest(n);
                                if (!e.hasCompleted && !e.hasFailed && r > 0)
                                    return e.requestedCount = r,
                                    le(function() {
                                        e.requestedCount = 0
                                    })
                            }),
                            this.requestedDisposable
                        },
                        disposeCurrentRequest: function() {
                            this.requestedDisposable && (this.requestedDisposable.dispose(),
                            this.requestedDisposable = null)
                        }
                    }),
                    e
                }(Ke),
                We.controlled = function(t, e) {
                    return t && Ee(t) && (e = t,
                    t = !0),
                    null == t && (t = !0),
                    new Hr(this,t,e)
                }
                ,
                We.pipe = function(t) {
                    function e() {
                        n.resume()
                    }
                    var n = this.pausableBuffered();
                    return t.addListener("drain", e),
                    n.subscribe(function(e) {
                        !t.write(e + "") && n.pause()
                    }, function(e) {
                        t.emit("error", e)
                    }, function() {
                        !t._isStdio && t.end(),
                        t.removeListener("drain", e)
                    }),
                    n.resume(),
                    t
                }
                ,
                Kr = function(t) {
                    function e(e, n) {
                        this._o = e,
                        this._xform = n,
                        t.call(this)
                    }
                    return oe(e, t),
                    e.prototype.next = function(t) {
                        var e = Ci(this._xform["@@transducer/step"]).call(this._xform, this._o, t);
                        e === Ei && this._o.onError(e.e)
                    }
                    ,
                    e.prototype.error = function(t) {
                        this._o.onError(t)
                    }
                    ,
                    e.prototype.completed = function() {
                        this._xform["@@transducer/result"](this._o)
                    }
                    ,
                    e
                }(Be),
                We.transduce = function(t) {
                    var e = this;
                    return new Qr(function(n) {
                        var r = t(ct(n));
                        return e.subscribe(new Kr(n,r))
                    }
                    ,e)
                }
                ,
                Qr = fi.AnonymousObservable = function(t) {
                    function e(t) {
                        return t && gi(t.dispose) ? t : gi(t) ? le(t) : he
                    }
                    function n(t, n) {
                        var r = n[0]
                          , i = n[1]
                          , o = Ci(i.__subscribe).call(i, r);
                        o !== Ei || r.fail(Ei.e) || l(Ei.e),
                        r.setDisposable(e(o))
                    }
                    function r(e, n) {
                        this.source = n,
                        this.__subscribe = e,
                        t.call(this)
                    }
                    return oe(r, t),
                    r.prototype._subscribe = function(t) {
                        var e = new Gr(t)
                          , r = [e, this];
                        return xe.scheduleRequired() ? xe.schedule(r, n) : n(null, r),
                        e
                    }
                    ,
                    r
                }(Ke),
                Gr = function(t) {
                    function e(e) {
                        t.call(this),
                        this.observer = e,
                        this.m = new be
                    }
                    oe(e, t);
                    var n = e.prototype;
                    return n.next = function(t) {
                        var e = Ci(this.observer.onNext).call(this.observer, t);
                        e === Ei && (this.dispose(),
                        l(e.e))
                    }
                    ,
                    n.error = function(t) {
                        var e = Ci(this.observer.onError).call(this.observer, t);
                        this.dispose(),
                        e === Ei && l(e.e)
                    }
                    ,
                    n.completed = function() {
                        var t = Ci(this.observer.onCompleted).call(this.observer);
                        this.dispose(),
                        t === Ei && l(t.e)
                    }
                    ,
                    n.setDisposable = function(t) {
                        this.m.setDisposable(t)
                    }
                    ,
                    n.getDisposable = function() {
                        return this.m.getDisposable()
                    }
                    ,
                    n.dispose = function() {
                        t.prototype.dispose.call(this),
                        this.m.dispose()
                    }
                    ,
                    e
                }(Be),
                Zr = function(t, e) {
                    this._s = t,
                    this._o = e
                }
                ,
                Zr.prototype.dispose = function() {
                    if (!this._s.isDisposed && null !== this._o) {
                        var t = this._s.observers.indexOf(this._o);
                        this._s.observers.splice(t, 1),
                        this._o = null
                    }
                }
                ,
                Jr = fi.Subject = function(t) {
                    function e() {
                        t.call(this),
                        this.isDisposed = !1,
                        this.isStopped = !1,
                        this.observers = [],
                        this.hasError = !1
                    }
                    return oe(e, t),
                    se(e.prototype, Ye.prototype, {
                        _subscribe: function(t) {
                            return fe(this),
                            this.isStopped ? this.hasError ? (t.onError(this.error),
                            he) : (t.onCompleted(),
                            he) : (this.observers.push(t),
                            new Zr(this,t))
                        },
                        hasObservers: function() {
                            return fe(this),
                            this.observers.length > 0
                        },
                        onCompleted: function() {
                            if (fe(this),
                            !this.isStopped) {
                                this.isStopped = !0;
                                for (var t = 0, e = c(this.observers), n = e.length; t < n; t++)
                                    e[t].onCompleted();
                                this.observers.length = 0
                            }
                        },
                        onError: function(t) {
                            if (fe(this),
                            !this.isStopped) {
                                this.isStopped = !0,
                                this.error = t,
                                this.hasError = !0;
                                for (var e = 0, n = c(this.observers), r = n.length; e < r; e++)
                                    n[e].onError(t);
                                this.observers.length = 0
                            }
                        },
                        onNext: function(t) {
                            if (fe(this),
                            !this.isStopped)
                                for (var e = 0, n = c(this.observers), r = n.length; e < r; e++)
                                    n[e].onNext(t)
                        },
                        dispose: function() {
                            this.isDisposed = !0,
                            this.observers = null
                        }
                    }),
                    e.create = function(t, e) {
                        return new ti(t,e)
                    }
                    ,
                    e
                }(Ke),
                Xr = fi.AsyncSubject = function(t) {
                    function e() {
                        t.call(this),
                        this.isDisposed = !1,
                        this.isStopped = !1,
                        this.hasValue = !1,
                        this.observers = [],
                        this.hasError = !1
                    }
                    return oe(e, t),
                    se(e.prototype, Ye.prototype, {
                        _subscribe: function(t) {
                            return fe(this),
                            this.isStopped ? (this.hasError ? t.onError(this.error) : this.hasValue ? (t.onNext(this.value),
                            t.onCompleted()) : t.onCompleted(),
                            he) : (this.observers.push(t),
                            new Zr(this,t))
                        },
                        hasObservers: function() {
                            return fe(this),
                            this.observers.length > 0
                        },
                        onCompleted: function() {
                            var t, e, n, r;
                            if (fe(this),
                            !this.isStopped) {
                                if (this.isStopped = !0,
                                n = c(this.observers),
                                e = n.length,
                                this.hasValue)
                                    for (t = 0; t < e; t++)
                                        r = n[t],
                                        r.onNext(this.value),
                                        r.onCompleted();
                                else
                                    for (t = 0; t < e; t++)
                                        n[t].onCompleted();
                                this.observers.length = 0
                            }
                        },
                        onError: function(t) {
                            if (fe(this),
                            !this.isStopped) {
                                this.isStopped = !0,
                                this.hasError = !0,
                                this.error = t;
                                for (var e = 0, n = c(this.observers), r = n.length; e < r; e++)
                                    n[e].onError(t);
                                this.observers.length = 0
                            }
                        },
                        onNext: function(t) {
                            fe(this),
                            this.isStopped || (this.value = t,
                            this.hasValue = !0)
                        },
                        dispose: function() {
                            this.isDisposed = !0,
                            this.observers = null,
                            this.error = null,
                            this.value = null
                        }
                    }),
                    e
                }(Ke),
                ti = fi.AnonymousSubject = function(t) {
                    function e(e, n) {
                        this.observer = e,
                        this.observable = n,
                        t.call(this)
                    }
                    return oe(e, t),
                    se(e.prototype, Ye.prototype, {
                        _subscribe: function(t) {
                            return this.observable.subscribe(t)
                        },
                        onCompleted: function() {
                            this.observer.onCompleted()
                        },
                        onError: function(t) {
                            this.observer.onError(t)
                        },
                        onNext: function(t) {
                            this.observer.onNext(t)
                        }
                    }),
                    e
                }(Ke),
                ei = fi.BehaviorSubject = function(t) {
                    function e(e) {
                        t.call(this),
                        this.value = e,
                        this.observers = [],
                        this.isDisposed = !1,
                        this.isStopped = !1,
                        this.hasError = !1
                    }
                    return oe(e, t),
                    se(e.prototype, Ye.prototype, {
                        _subscribe: function(t) {
                            return fe(this),
                            this.isStopped ? (this.hasError ? t.onError(this.error) : t.onCompleted(),
                            he) : (this.observers.push(t),
                            t.onNext(this.value),
                            new Zr(this,t))
                        },
                        getValue: function() {
                            return fe(this),
                            this.hasError && l(this.error),
                            this.value
                        },
                        hasObservers: function() {
                            return fe(this),
                            this.observers.length > 0
                        },
                        onCompleted: function() {
                            if (fe(this),
                            !this.isStopped) {
                                this.isStopped = !0;
                                for (var t = 0, e = c(this.observers), n = e.length; t < n; t++)
                                    e[t].onCompleted();
                                this.observers.length = 0
                            }
                        },
                        onError: function(t) {
                            if (fe(this),
                            !this.isStopped) {
                                this.isStopped = !0,
                                this.hasError = !0,
                                this.error = t;
                                for (var e = 0, n = c(this.observers), r = n.length; e < r; e++)
                                    n[e].onError(t);
                                this.observers.length = 0
                            }
                        },
                        onNext: function(t) {
                            if (fe(this),
                            !this.isStopped) {
                                this.value = t;
                                for (var e = 0, n = c(this.observers), r = n.length; e < r; e++)
                                    n[e].onNext(t)
                            }
                        },
                        dispose: function() {
                            this.isDisposed = !0,
                            this.observers = null,
                            this.value = null,
                            this.error = null
                        }
                    }),
                    e
                }(Ke),
                ni = fi.ReplaySubject = function(t) {
                    function e(t, e) {
                        return le(function() {
                            e.dispose(),
                            !t.isDisposed && t.observers.splice(t.observers.indexOf(e), 1)
                        })
                    }
                    function n(e, n, i) {
                        this.bufferSize = null == e ? r : e,
                        this.windowSize = null == n ? r : n,
                        this.scheduler = i || xe,
                        this.q = [],
                        this.observers = [],
                        this.isStopped = !1,
                        this.isDisposed = !1,
                        this.hasError = !1,
                        this.error = null,
                        t.call(this)
                    }
                    var r = Math.pow(2, 53) - 1;
                    return oe(n, t),
                    se(n.prototype, Ye.prototype, {
                        _subscribe: function(t) {
                            var n, r, i, o;
                            for (fe(this),
                            n = new Qe(this.scheduler,t),
                            r = e(this, n),
                            this._trim(this.scheduler.now()),
                            this.observers.push(n),
                            i = 0,
                            o = this.q.length; i < o; i++)
                                n.onNext(this.q[i].value);
                            return this.hasError ? n.onError(this.error) : this.isStopped && n.onCompleted(),
                            n.ensureActive(),
                            r
                        },
                        hasObservers: function() {
                            return fe(this),
                            this.observers.length > 0
                        },
                        _trim: function(t) {
                            for (; this.q.length > this.bufferSize; )
                                this.q.shift();
                            for (; this.q.length > 0 && t - this.q[0].interval > this.windowSize; )
                                this.q.shift()
                        },
                        onNext: function(t) {
                            var e, n, r, i, o;
                            if (fe(this),
                            !this.isStopped)
                                for (e = this.scheduler.now(),
                                this.q.push({
                                    interval: e,
                                    value: t
                                }),
                                this._trim(e),
                                n = 0,
                                r = c(this.observers),
                                i = r.length; n < i; n++)
                                    o = r[n],
                                    o.onNext(t),
                                    o.ensureActive()
                        },
                        onError: function(t) {
                            var e, n, r, i, o;
                            if (fe(this),
                            !this.isStopped) {
                                for (this.isStopped = !0,
                                this.error = t,
                                this.hasError = !0,
                                e = this.scheduler.now(),
                                this._trim(e),
                                n = 0,
                                r = c(this.observers),
                                i = r.length; n < i; n++)
                                    o = r[n],
                                    o.onError(t),
                                    o.ensureActive();
                                this.observers.length = 0
                            }
                        },
                        onCompleted: function() {
                            var t, e, n, r, i;
                            if (fe(this),
                            !this.isStopped) {
                                for (this.isStopped = !0,
                                t = this.scheduler.now(),
                                this._trim(t),
                                e = 0,
                                n = c(this.observers),
                                r = n.length; e < r; e++)
                                    i = n[e],
                                    i.onCompleted(),
                                    i.ensureActive();
                                this.observers.length = 0
                            }
                        },
                        dispose: function() {
                            this.isDisposed = !0,
                            this.observers = null
                        }
                    }),
                    n
                }(Ke),
                fi.Pauser = function(t) {
                    function e() {
                        t.call(this)
                    }
                    return oe(e, t),
                    e.prototype.pause = function() {
                        this.onNext(!1)
                    }
                    ,
                    e.prototype.resume = function() {
                        this.onNext(!0)
                    }
                    ,
                    e
                }(Jr),
                pi.Rx = fi,
                (r = function() {
                    return fi
                }
                .call(e, n, e, t)) !== s && (t.exports = r),
                ri = b()
            }
            ).call(this)
        }
        ).call(e, n(31)(t), function() {
            return this
        }(), n(471))
    },
    527: function(t, e, n) {
        "use strict";
        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        function i(t) {
            var e = t.input
              , n = t.state$
              , r = t.error$
              , i = void 0 === r ? Y.Observable.of({
                hasError: !1
            }) : r
              , o = t.onOff$
              , s = void 0 === o ? Y.Observable.of(!0) : o
              , u = t.upClass
              , c = void 0 === u ? ".js-input-up" : u
              , a = t.downClass
              , l = void 0 === a ? ".js-input-down" : a
              , h = t.inputClass
              , f = void 0 === h ? ".js-input" : h
              , d = t.parseError
              , b = void 0 === d ? $.t("can not parse value") : d
              , v = t.leftMessageAlign
              , m = function(t, e) {
                return t.flatMapLatest(function() {
                    return Y.Observable.interval(50).delay(250).startWith(1).takeUntil(Y.Observable.fromEvent(document, "mouseup"))
                }).map(function() {
                    return e
                })
            }
              , y = e.querySelector(c)
              , w = e.querySelector(l)
              , g = e.querySelector(f)
              , E = new B.ControlError(e,{
                addFocusEvents: !1,
                addErrorOnElement: !1,
                leftMessageAlign: v
            })
              , C = Y.Observable.fromEvent(y, "mousedown").pausable(s).publish()
              , k = Y.Observable.fromEvent(w, "mousedown").pausable(s).publish()
              , O = m(C, 1)
              , x = m(k, -1)
              , S = Y.Observable.merge(Y.Observable.fromEvent(g, "focus", function(t) {
                return !0
            }), Y.Observable.fromEvent(y, "focus", function(t) {
                return !0
            }), Y.Observable.fromEvent(w, "focus", function(t) {
                return !0
            }))
              , D = Y.Observable.merge(Y.Observable.fromEvent(g, "blur", function(t) {
                return !1
            }), Y.Observable.fromEvent(y, "blur", function(t) {
                return !1
            }), Y.Observable.fromEvent(w, "blur", function(t) {
                return !1
            }))
              , T = S.merge(D).debounce(10).distinctUntilChanged()
              , P = Y.Observable.fromEvent(g, "input", function(t) {
                return t.target.value
            })
              , j = P.withLatestFrom(n, function(t, e) {
                var n = e.formatter.parse(t);
                return n.res ? {
                    hasError: !1,
                    input: n.price
                } : {
                    hasError: !0,
                    input: t,
                    text: n.error || b
                }
            }).publish()
              , A = j.map(function(t) {
                return t.input
            }).publish()
              , L = function(t, e) {
                return function(n) {
                    var r = n;
                    return void 0 !== t && (r = Math.max(r, t)),
                    void 0 !== e && (r = Math.min(r, e)),
                    r
                }
            }
              , N = n.map(function(t) {
                return t.value
            })
              , R = Y.Observable.merge(N, A).withLatestFrom(n, function(t, e) {
                return ["string" == typeof t ? 0 : t, e.step, L(e.min, e.max)]
            })
              , q = function(t) {
                var e = (0,
                F.default)(t, 3)
                  , n = e[0]
                  , r = e[1]
                  , i = e[2];
                return x.merge(O).scan(function(t, e) {
                    return i(t + e * r)
                }, n)
            }
              , I = R.flatMapLatest(q)
              , M = I.merge(N).distinctUntilChanged().publish()
              , V = Y.Observable.merge(M, j.filter(function(t) {
                return !t.hasError
            }).map(function(t) {
                return t.input
            })).distinctUntilChanged().publish()
              , U = M.withLatestFrom(n, function(t, e) {
                return e.formatter.format(t)
            })
              , z = j.merge(V.map(function(t) {
                return {
                    hasError: !1
                }
            })).distinctUntilChanged(function(t) {
                return t.text
            })
              , H = p(z, s, {
                hasError: !1
            })
              , W = H.value$
              , K = H.disposable
              , Q = p(i, s, {
                hasError: !1
            })
              , G = Q.value$
              , Z = Q.disposable
              , X = W.publish()
              , tt = _([X, G], J);
            return {
                value$: V,
                error$: X,
                subscribe: function() {
                    var t = T.subscribe(function(t) {
                        t ? (e.classList.add("i-active"),
                        e.parentNode.classList.add("i-focus")) : (e.classList.remove("i-active"),
                        e.parentNode.classList.remove("i-focus"))
                    })
                      , n = U.subscribe(function(t) {
                        g.value = t
                    })
                      , r = s.subscribe(function(t) {
                        t ? (g.removeAttribute("disabled"),
                        e.classList.remove("i-disabled")) : (g.setAttribute("disabled", "disabled"),
                        e.classList.add("i-disabled"))
                    })
                      , i = tt.subscribe(function(t) {
                        t.hasError ? (e.classList.add("i-error"),
                        E.add({
                            id: 1,
                            message: t.text
                        }).render()) : (e.classList.remove("i-error"),
                        E.clear().render())
                    });
                    return new Y.CompositeDisposable(t,n,r,i)
                },
                connect: function() {
                    return new Y.CompositeDisposable(X.connect(),V.connect(),M.connect(),A.connect(),j.connect(),C.connect(),k.connect(),Z,K)
                }
            }
        }
        function o(t, e, n) {
            return (t <= 0 || e <= 0) && !n ? {
                text: $.t("Value should be more than 0"),
                hasError: !0
            } : {
                text: "",
                hasError: !1
            }
        }
        function s(t) {
            var e = t.container
              , n = t.price$
              , r = t.custom$
              , s = t.initState$
              , u = t.pipsToPrice
              , c = t.priceToPips
              , a = t.pipsProps
              , l = t.priceProps
              , h = t.orderType$
              , p = t.onOff$
              , f = void 0 === p ? Y.Observable.of(!0) : p
              , d = t.anyPriceValid$
              , b = void 0 === d ? Y.Observable.of(!1) : d
              , v = t.switchClass
              , m = void 0 === v ? ".js-order-switch" : v
              , w = t.inputClass
              , g = void 0 === w ? ".js-order-input" : w
              , E = t.outputClass
              , C = void 0 === E ? ".js-order-output" : E
              , k = t.observableArrForErrorChecker
              , O = void 0 === k ? [] : k
              , x = t.errorChecker
              , S = void 0 === x ? o : x
              , D = e.querySelector(m)
              , T = e.querySelector(g)
              , P = e.querySelector(C)
              , j = D.querySelector("div")
              , A = D.querySelectorAll("div")[1]
              , N = new Y.Subject
              , q = s.delay(1).concat(N).distinctUntilChanged(function(t) {
                return t.type
            }).publish()
              , M = Y.Observable.fromEvent(j, "click", function() {
                return Z.PRICE
            }).pausable(f)
              , V = Y.Observable.fromEvent(A, "click", function() {
                return Z.PIPS
            }).pausable(f)
              , U = M.merge(V).distinctUntilChanged()
              , z = q.map(function(t) {
                return t.type
            }).publish()
              , B = new Y.Subject
              , H = i({
                input: T,
                state$: q,
                error$: B,
                onOff$: f
            })
              , W = H.value$
              , K = H.error$
              , Q = H.connect
              , G = H.subscribe
              , X = function() {
                for (var t = arguments.length, e = Array(t), n = 0; n < t; n++)
                    e[n] = arguments[n];
                return e
            }
              , tt = r ? [z, W, n, r] : [z, W, n]
              , et = Y.Observable.combineLatest.apply(Y.Observable, (0,
            I.default)(tt.concat(X))).publish()
              , nt = Y.Observable.combineLatest(z, W, X).publish()
              , rt = function(t, e, n) {
                return t.filter(function(t) {
                    return (0,
                    F.default)(t, 1)[0] === e
                }).map(function(t) {
                    var e = (0,
                    R.default)(t)
                      , r = e.slice(1);
                    return n.apply(void 0, (0,
                    I.default)(r))
                })
            }
              , it = rt(et, Z.PIPS, u).map(function(t) {
                return y(l.formatter, t)
            }).merge(rt(et, Z.PRICE, c).map(function(t) {
                return y(a.formatter, t)
            })).publish()
              , ot = $.t("Pips")
              , st = it.withLatestFrom(z, function(t, e) {
                var n = e === Z.PRICE ? ot : "";
                return (e === Z.PRICE ? a.formatter : l.formatter).format(t) + " " + n
            })
              , ut = U.withLatestFrom(it, function(t, e) {
                return (0,
                L.default)({}, t === Z.PRICE ? l : a, {
                    type: t,
                    value: e
                })
            }).publish()
              , ct = rt(et, Z.PIPS, u).merge(rt(nt, Z.PRICE, function(t) {
                return t
            })).publish()
              , at = rt(et, Z.PRICE, c).merge(rt(nt, Z.PIPS, function(t) {
                return t
            })).publish()
              , lt = Y.Observable.combineLatest.apply(Y.Observable, [ct, at].concat((0,
            I.default)(O), [b, n, h || Y.Observable.of(null), S])).distinctUntilChanged(function(t) {
                return t.text
            })
              , ht = _([B, K], J);
            return {
                price$: ct,
                pips$: at,
                error$: ht,
                subscribe: function() {
                    var t = q.subscribe(function(t) {
                        t.type === Z.PRICE ? (j.classList.add("i-active"),
                        A.classList.remove("i-active")) : (j.classList.remove("i-active"),
                        A.classList.add("i-active"))
                    })
                      , e = st.subscribe(function(t) {
                        P.textContent = t
                    })
                      , n = f.subscribe(function(t) {
                        t ? (D.classList.remove("i-disabled"),
                        P.parentNode.classList.remove("i-disabled")) : (D.classList.add("i-disabled"),
                        P.parentNode.classList.add("i-disabled"))
                    })
                      , r = G();
                    return new Y.CompositeDisposable(e,t,r,n)
                },
                connect: function() {
                    return new Y.CompositeDisposable(lt.subscribe(B),it.connect(),at.connect(),ct.connect(),nt.connect(),et.connect(),z.connect(),Q(),q.connect(),ut.subscribe(N),ut.connect())
                }
            }
        }
        function u(t, e) {
            var n = $(t);
            return Y.Observable.fromEventPattern(function(t) {
                return n.on("change", t)
            }, function(t) {
                return n.off("change", t)
            }, function() {
                return n.val()
            }).startWith(e).publish()
        }
        function c() {
            return 60 * -(new Date).getTimezoneOffset() * 1e3
        }
        function a(t, e) {
            var n, r, i = $(t);
            return (0,
            K.default)(i, {
                triggerChange: !0
            }),
            i.datepicker({
                dateFormat: "yy-mm-dd",
                minDate: new Date,
                showOtherMonths: !0
            }),
            e = e || Date.now() + 864e5,
            n = new Date(e + c()).toJSON(),
            r = n.substr(0, 10),
            i.val(r),
            Y.Observable.fromEventPattern(function(t) {
                return i.on("change input", t)
            }, function(t) {
                return i.off("change input", t)
            }, function() {
                return i.val()
            }).startWith(r)
        }
        function l(t, e, n) {
            var r, i, o = $(t);
            return (0,
            G.default)(o, {
                triggerChange: !0
            }),
            o.clockpicker({
                autoclose: !0,
                donetext: "OK",
                placement: "top",
                afterShow: function() {
                    var t = +e.css("z-index") + 1;
                    isFinite(t) && o.data("clockpicker").popover.css("z-index", t)
                }
            }),
            n = n || Date.now(),
            r = new Date(n + c()).toJSON(),
            i = r.substr(11, 5),
            o.val(i),
            Y.Observable.fromEventPattern(function(t) {
                return o.on("change input", t)
            }, function(t) {
                return o.off("change input", t)
            }, function() {
                return o.val()
            }).startWith(i)
        }
        function h(t, e, n, r, i, o, s, h) {
            function p(t, e, n) {
                e.classList.toggle("i-disabled", !n),
                $(t).prop("disabled", !n)
            }
            var f, d, b, v, m, y, _, w, g, E, C, k = t.querySelector("select.js-duration-type"), O = t.querySelector(".js-duration-date"), x = t.querySelector(".js-duration-time"), S = O.querySelector("input"), D = x.querySelector("input");
            return i ? ($(t).removeClass("js-hidden"),
            d = u(k, n || i[0].value),
            b = a(S, r),
            v = l(D, $(e), r),
            m = new B.ControlError(S,{
                addFocusEvents: !1,
                addErrorOnElement: !1
            }),
            y = new B.ControlError(D,{
                addFocusEvents: !1,
                addErrorOnElement: !1
            }),
            _ = {
                text: "",
                hasError: !1
            },
            w = Y.Observable.combineLatest(d, b, o, function(t, e, n) {
                var r, o, s, u;
                return i.filter(function(e) {
                    return e.value === t
                })[0].hasDatePicker && n !== H.ORDERTYPE.MARKET ? e ? (r = $.t("Incorrect date format. Should be yyyy-mm-dd."),
                e.match(/^\d{4}-[01]\d-[0-3]\d$/) ? (o = e + "T00:00:00Z",
                s = new Date(o),
                s.valueOf() ? (u = 864e5 * parseInt(Date.now() / 864e5),
                s < u ? {
                    text: $.t("Expiration date is in the past."),
                    hasError: !0
                } : _) : {
                    text: r,
                    hasError: !0
                }) : {
                    text: r,
                    hasError: !0
                }) : {
                    text: $.t("Enter valid date"),
                    hasError: !0
                } : _
            }).startWith(_).distinctUntilChanged(function(t) {
                return t.text
            }).publish(),
            g = Y.Observable.combineLatest(d, b, w, v, o, function(t, e, n, r, o) {
                var s, u, a;
                return i.filter(function(e) {
                    return e.value === t
                })[0].hasTimePicker && o !== H.ORDERTYPE.MARKET ? r ? (s = $.t("Incorrect time format. Should be hh:mm."),
                r.match(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/) ? n.hasError ? _ : (u = e + "T" + r + ":00Z",
                a = new Date(u),
                a.valueOf() ? (a -= c(),
                a < Date.now() ? {
                    text: $.t("Expiration time is in the past."),
                    hasError: !0
                } : _) : {
                    text: s,
                    hasError: !0
                }) : {
                    text: s,
                    hasError: !0
                }) : {
                    text: $.t("Enter valid time"),
                    hasError: !0
                } : _
            }).startWith(_).distinctUntilChanged(function(t) {
                return t.text
            }).publish(),
            E = Y.Observable.combineLatest(d, b, v, o, function(t, e, n, r) {
                return r === H.ORDERTYPE.MARKET ? {} : {
                    type: t,
                    dateStr: e,
                    timeStr: n
                }
            }).distinctUntilChanged().publish(),
            C = Y.Observable.combineLatest(d, o, function(t, e) {
                var n = i.filter(function(e) {
                    return e.value === t
                })[0]
                  , r = e !== H.ORDERTYPE.MARKET && !h;
                return {
                    duration: r,
                    datePicker: n.hasDatePicker && r,
                    timePicker: n.hasTimePicker && r
                }
            }),
            {
                duration$: E,
                durationDateError$: w,
                durationTimeError$: g,
                subscribe: function() {
                    var t = w.subscribe(function(t) {
                        m.clear().render(),
                        t.hasError && m.add({
                            id: 1,
                            message: t.text
                        }).render()
                    })
                      , e = g.subscribe(function(t) {
                        y.clear().render(),
                        t.hasError && y.add({
                            id: 1,
                            message: t.text
                        }).render()
                    })
                      , n = C.subscribe(function(t) {
                        p(S, O, t.datePicker),
                        p(D, x, t.timePicker),
                        t.duration ? s.tvControlSelect("enable") : setTimeout(function() {
                            s.tvControlSelect("disable")
                        }, 0)
                    });
                    return new Y.CompositeDisposable(t,e,n)
                },
                connect: function() {
                    return new Y.CompositeDisposable(E.connect(),g.connect(),w.connect(),d.connect())
                }
            }) : ($(t).addClass("js-hidden"),
            f = Y.Observable.of({}).publish(),
            {
                duration$: f,
                durationDateError$: f,
                durationTimeError$: f,
                subscribe: function() {
                    return f.subscribe(function() {})
                },
                connect: function() {
                    return f.connect()
                }
            })
        }
        function p(t, e, n) {
            var r = t.replay(null, 1)
              , i = r.connect();
            return {
                value$: e.flatMapLatest(function(t) {
                    return t ? r : Y.Observable.of(n)
                }),
                disposable: i
            }
        }
        function f(t) {
            var e, n = t.container, r = t.startState;
            return n.checked = !!r,
            e = Y.Observable.merge(Y.Observable.of(!!r).delay(1), Y.Observable.create(function(t) {
                var e = function(e) {
                    return setTimeout(function() {
                        return t.onNext(e.target.checked)
                    })
                };
                return n.addEventListener("change", e),
                function() {
                    return n.removeEventListener("checked", e)
                }
            })).distinctUntilChanged().publish(),
            {
                value$: e,
                connect: function() {
                    return e.connect()
                }
            }
        }
        function d(t, e) {
            var n = t.price$
              , r = t.pips$
              , i = t.error$
              , o = e.value$
              , s = p(n, o)
              , u = s.value$
              , c = s.disposable
              , a = p(r, o)
              , l = a.value$
              , h = a.disposable
              , f = p(i, o, {
                text: "",
                hasError: !1
            })
              , d = f.value$
              , b = f.disposable;
            return {
                price$: u,
                pips$: l,
                error$: d,
                connect: function() {
                    return new Y.CompositeDisposable(e.connect(),t.connect())
                },
                subscribe: function() {
                    return new Y.CompositeDisposable(t.subscribe(),b,h,c)
                }
            }
        }
        function b(t) {
            var e = t.buttonLoader
              , n = t.result$
              , r = t.fire$
              , i = void 0 === r ? Y.Observable.empty() : r
              , o = t.enable$
              , s = void 0 === o ? Y.Observable.of(!0) : o
              , u = t.handler
              , c = e.contentNojQuery()
              , a = new Y.Subject
              , l = a.merge(s)
              , h = Y.Observable.merge(Y.Observable.fromEvent(c, "click", function() {
                return "fire"
            }), i).pausable(l)
              , p = h.withLatestFrom(n, function(t, e) {
                return e
            })
              , f = p.flatMapLatest(function(t) {
                var e, n = u(t);
                return X(n) ? (e = function(t, e) {
                    return a.onNext(!0),
                    (0,
                    L.default)({}, t, {
                        details: e
                    })
                }
                ,
                a.onNext(!1),
                n.then().then(e.bind(null, {
                    status: "ok"
                }), e.bind(null, {
                    status: "error"
                }))) : Y.Observable.of({
                    status: "ok",
                    details: n
                })
            }).publish();
            return {
                result$: f,
                subscribe: function() {
                    var t = s.subscribe(function(t) {
                        t ? e.enable() : e.disable()
                    })
                      , n = a.subscribe(function(t) {
                        t ? e.stop() : e.start()
                    });
                    return new Y.CompositeDisposable(t,n)
                },
                connect: function() {
                    return new Y.CompositeDisposable(f.connect())
                }
            }
        }
        function v(t) {
            var e = t.container
              , n = t.qty$
              , r = t.pips$
              , i = t.equity$
              , o = t.pipValue
              , s = t.currencySign
              , u = void 0 === s ? "$" : s
              , c = t.text
              , a = void 0 === c ? $.t("Risk") : c
              , l = Y.Observable.combineLatest(n, r, i, function(t, e, n) {
                var r = e ? e * t * o : void 0;
                return {
                    rm: r,
                    rp: r ? 100 * r / n : void 0
                }
            }).distinctUntilChanged();
            return {
                subscribe: function() {
                    return l.subscribe(function(t) {
                        var n = t.rm
                          , r = t.rp;
                        e.textContent = void 0 === n || void 0 === r ? "" : a + " " + r.toFixed(2) + "% (" + u + (0,
                        U.default)(n.toFixed(2), ",") + ")"
                    })
                }
            }
        }
        function m(t) {
            var e = t.container
              , n = t.slPips$
              , r = t.tpPips$
              , i = Y.Observable.combineLatest(n, r, function(t, e) {
                return e / t
            }).distinctUntilChanged();
            return {
                subscribe: function() {
                    return i.subscribe(function(t) {
                        Number.isFinite(t) ? e.textContent = $.t("Risk/reward ratio:") + " " + t.toFixed(2) : e.textContent = ""
                    })
                }
            }
        }
        function y(t, e) {
            var n = t.parse(t.format(e));
            return n.res ? n.price : (n = Number.parseFloat(e),
            Number.isNaN(n) ? void 0 : n)
        }
        function _(t, e) {
            return Y.Observable.combineLatest.apply(Y.Observable, (0,
            I.default)(t.concat(e))).distinctUntilChanged().publish().refCount()
        }
        var w, g, E, C, k, O, x, S, D, T, P, j, A, L, N, R, q, I, M, F, V, U, Y, z, B, H, W, K, Q, G, Z, J, X, tt, et;
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e.QtyFormatter = e.qtyErrors = e.NumericFormatter = e.mergeErrors = e.INPUT_TYPE = void 0,
        w = n(117),
        g = r(w),
        E = n(118),
        C = r(E),
        k = n(122),
        O = r(k),
        x = n(495),
        S = r(x),
        D = n(158),
        T = r(D),
        P = n(123),
        j = r(P),
        A = n(75),
        L = r(A),
        N = n(503),
        R = r(N),
        q = n(515),
        I = r(q),
        M = n(508),
        F = r(M),
        e.createCustomNumberInput = i,
        e.createPriceController = s,
        e.localOffset = c,
        e.createDurationController = h,
        e.makeObservableOffable = p,
        e.createCheckBox = f,
        e.combineControllerAndCheckbox = d,
        e.createDoneButton = b,
        e.createRiskHelper = v,
        e.createRiskRewardHelper = m,
        e.parseWithFormatter = y,
        e.combineErrors = _,
        V = n(517),
        U = r(V),
        Y = n(526),
        z = n(210),
        B = n(528),
        H = n(383),
        W = n(530),
        K = r(W),
        Q = n(532),
        G = r(Q),
        Z = e.INPUT_TYPE = {
            PRICE: 1,
            PIPS: 2
        },
        J = e.mergeErrors = function() {
            for (var t = arguments.length, e = Array(t), n = 0; n < t; n++)
                e[n] = arguments[n];
            return e.reduce(function(t, e) {
                return {
                    hasError: t.hasError || e.hasError,
                    text: t.text || e.text
                }
            }, {})
        }
        ,
        X = function(t) {
            return "object" === (void 0 === t ? "undefined" : (0,
            j.default)(t)) && "function" == typeof t.then
        }
        ,
        tt = e.NumericFormatter = function(t) {
            function e(t) {
                var n, r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "Only numbers allowed.";
                return (0,
                g.default)(this, e),
                n = (0,
                O.default)(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, Math.pow(10, t))),
                n._errorLabel = r,
                n
            }
            return (0,
            T.default)(e, t),
            (0,
            C.default)(e, [{
                key: "parse",
                value: function(t) {
                    var n = (0,
                    S.default)(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "parse", this).call(this, t);
                    return n.res ? n : (0,
                    L.default)({}, n, {
                        error: this._errorLabel
                    })
                }
            }]),
            e
        }(z.PriceFormatter),
        et = e.qtyErrors = {
            min: $.t("Specified amount is less that the instrument minimum."),
            max: $.t("Specified amount is more than the instrument maximum."),
            step: $.t("Specified amount is not a multiple of the instrument minimum.")
        },
        e.QtyFormatter = function(t) {
            function e(t) {
                var n, r = t.min, i = void 0 === r ? null : r, o = t.max, s = void 0 === o ? null : o, u = t.step, c = void 0 === u ? null : u;
                return (0,
                g.default)(this, e),
                n = (0,
                O.default)(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, 0, $.t("Amount format is invalid."))),
                n._values = {
                    min: i,
                    max: s,
                    step: c
                },
                n
            }
            return (0,
            T.default)(e, t),
            (0,
            C.default)(e, [{
                key: "parse",
                value: function(t) {
                    var n, r = (0,
                    S.default)(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "parse", this).call(this, t);
                    if (r.res) {
                        if (n = r.price,
                        this._values.min && n < this._values.min)
                            return {
                                res: !1,
                                error: et.min
                            };
                        if (this._values.max && n > this._values.max)
                            return {
                                res: !1,
                                error: et.max
                            };
                        if (this._values.step && n % this._values.step != 0)
                            return {
                                res: !1,
                                error: et.step
                            }
                    }
                    return r
                }
            }, {
                key: "format",
                value: function(t) {
                    return (0,
                    S.default)(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "format", this).call(this, t)
                }
            }]),
            e
        }(tt)
    },
    528: function(t, e, n) {
        "use strict";
        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        var i, o, s, u, c, a, l, h;
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e.ControlError = void 0,
        i = n(117),
        o = r(i),
        s = n(118),
        u = r(s),
        n(529),
        c = n(174),
        a = n(166),
        l = r(a),
        h = e.ControlError = function() {
            function t(e) {
                function r(t, e) {
                    return t.some(function(t) {
                        return e.test(t)
                    })
                }
                var i, s, u, c, a = this, l = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, h = l.addFocusEvents, p = void 0 === h || h, f = l.addErrorOnElement, d = void 0 === f || f, b = l.leftMessageAlign, v = void 0 !== b && b;
                (0,
                o.default)(this, t),
                i = $(e),
                s = i.hasClass("tv-control-checkbox__input"),
                u = i.hasClass("tv-control-number-input"),
                c = r(i.attr("class").split(/\s+/), /^.+--size_small$/),
                this.options = {
                    smallMode: c,
                    addErrorOnElement: d
                },
                s && (i = i.closest(".tv-control-checkbox")),
                this.errors = {},
                this.$control = i,
                i.data("tv-control-material") ? this.$toWrap = i.data("tv-control-material").$el : i.data("tv-control-error-wrap") ? this.$toWrap = i.data("tv-control-error-wrap") : this.$toWrap = i,
                this.$toWrap.parent().hasClass("tv-control-error") || this.$toWrap.wrap('<div class="tv-control-error ' + (u ? "tv-control-error--for-number-input" : "") + '"></div>'),
                this.$el = this.$toWrap.parent(),
                s && this.$el.addClass("tv-control-error--msg_left"),
                c && this.$el.addClass("tv-control-error--size_small"),
                s || (this.$icon = this.$el.find(".tv-control-error__icon"),
                this.$icon.length || (this.$icon = $('<span class="tv-control-error__icon">' + $("<div>").append($(n(525)).attr("focusable", "false")).html() + "</span>").appendTo(this.$el)),
                i.data("tv-control-material") && this.$icon.addClass("tv-control-error__icon--material-input")),
                this.$messages = this.$el.find(".tv-control-error__messages"),
                this.$messages.length || (this.$messages = $('<span class="tv-control-error__messages"></span>').appendTo(this.$el)),
                v && this.$messages.addClass("tv-control-error__messages--from-left"),
                i.on("focus", function() {
                    a.$el.addClass("i-focus"),
                    i.removeClass("i-error"),
                    p && i.on("keyup.tv-control-error", function(t) {
                        9 !== t.keyCode && 16 !== t.keyCode && (a.clear().render(),
                        a.$el.removeClass("i-focus"),
                        i.off("keyup.tv-control-error"))
                    })
                }),
                i.on("blur", function() {
                    a.$el.removeClass("i-focus"),
                    a.hasErrors() && i.addClass("i-error")
                })
            }
            return (0,
            u.default)(t, [{
                key: "add",
                value: function(t) {
                    var e = t.id
                      , n = t.message;
                    return this.errors[e] = n,
                    this
                }
            }, {
                key: "remove",
                value: function(t) {
                    var e = t.id;
                    return delete this.errors[e],
                    this
                }
            }, {
                key: "clear",
                value: function() {
                    return this.errors = {},
                    this
                }
            }, {
                key: "hasErrors",
                value: function() {
                    return !!Object.keys(this.errors).length
                }
            }, {
                key: "render",
                value: function() {
                    var t, e, n = this;
                    if (this.emptyTimeout && clearTimeout(this.emptyTimeout),
                    t = Object.keys(this.errors),
                    t.length)
                        for (this.$messages.empty(),
                        this.$el.addClass("i-error"),
                        this.options.addErrorOnElement && this.$control.addClass("i-error"),
                        e = 0; e < t.length; e++)
                            this.errors[t[e]] && $('<span class="tv-control-error__message">' + this.errors[t[e]] + "</span>").appendTo(this.$messages);
                    else
                        this.$el.removeClass("i-error"),
                        this.$control.removeClass("i-error"),
                        this.emptyTimeout = setTimeout(function() {
                            n.$messages.empty()
                        }, l.default.dur);
                    return this
                }
            }]),
            t
        }(),
        $.fn.tvControlError = (0,
        c.createTvBlockWithInstance)("tv-control-error", function(t, e) {
            return new h(t,e)
        })
    },
    529: function(t, e) {},
    530: function(t, e, n) {
        "use strict";
        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        var i, o;
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e.default = function(t, e) {
            function n(t) {
                return 4 !== t.length && 7 !== t.length || (t += "-"),
                t = t.substr(0, 10)
            }
            var e = e || {};
            (0,
            o.default)(t, n, e.inputOnTypingCallback, e.triggerChange)
        }
        ,
        i = n(531),
        o = r(i),
        t.exports = e.default
    },
    531: function(t, e) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e.default = function(t, e, n, r) {
            function i() {
                var t = $(this)
                  , i = t.val()
                  , o = e(i);
                t.removeClass("_tv-dialog-text-input-error"),
                "function" == typeof n && n(i),
                i !== o && (t.val(o),
                r && t.trigger("change"))
            }
            function o(t) {
                if (t.ctrlKey)
                    return !1;
                if (t.metaKey)
                    return !1;
                if (!t.charCode)
                    return !1;
                var e = t.keyCode || t.which;
                return 9 !== e && (13 !== e && (16 !== e && (17 !== e && (18 !== e && (19 !== e && (20 !== e && (27 !== e && !(33 <= e && e <= 40))))))))
            }
            if (!(t instanceof $))
                return void console.warn("'$inputs' should be instance of jQuery");
            "function" != typeof e && (e = function(t) {
                return t
            }
            ),
            t.each(function(t, e) {
                var n = $(e);
                n.on("keypress", function(t) {
                    if (o(t)) {
                        var e = function() {
                            i.call(this),
                            $(this).off("keyup", e)
                        }
                        .bind(this);
                        $(this).on("keyup", e)
                    }
                }),
                n.change(i)
            })
        }
        ,
        t.exports = e.default
    },
    532: function(t, e, n) {
        "use strict";
        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        var i, o;
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e.default = function(t, e) {
            function n(t) {
                return 2 === t.length && (t += ":"),
                t = t.substr(0, 5)
            }
            var e = e || {};
            (0,
            o.default)(t, n, e.inputOnTypingCallback, e.triggerChange)
        }
        ,
        i = n(531),
        o = r(i),
        t.exports = e.default
    },
    533: function(t, e) {
        !function() {
            function t(t) {
                return document.createElementNS(a, t)
            }
            function e(t) {
                return (t < 10 ? "0" : "") + t
            }
            function n(t) {
                var e = ++m + "";
                return t ? t + e : e
            }
            function r(r, u) {
                function a(t, e) {
                    var n, r = R.offset(), i = /^touch/.test(t.type), s = r.left + y, a = r.top + y, h = (i ? t.originalEvent.touches[0] : t).pageX - s, p = (i ? t.originalEvent.touches[0] : t).pageY - a, f = Math.sqrt(h * h + p * p), v = !1;
                    e && (f < _ - g || f > _ + g) || (t.preventDefault(),
                    n = setTimeout(function() {
                        o.addClass("clockpicker-moving")
                    }, 200),
                    l && R.append(Y.canvas),
                    Y.setHand(h, p, !e, !0),
                    c.off(d).on(d, function(t) {
                        t.preventDefault();
                        var e = /^touch/.test(t.type)
                          , n = (e ? t.originalEvent.touches[0] : t).pageX - s
                          , r = (e ? t.originalEvent.touches[0] : t).pageY - a;
                        (v || n !== h || r !== p) && (v = !0,
                        Y.setHand(n, r, !1, !0))
                    }),
                    c.off(b).on(b, function(t) {
                        c.off(b),
                        t.preventDefault();
                        var r = /^touch/.test(t.type)
                          , i = (r ? t.originalEvent.changedTouches[0] : t).pageX - s
                          , l = (r ? t.originalEvent.changedTouches[0] : t).pageY - a;
                        (e || v) && i === h && l === p && Y.setHand(i, l),
                        "hours" === Y.currentView ? Y.toggleView("minutes", C / 2) : u.autoclose && (Y.minutesView.addClass("clockpicker-dial-out"),
                        setTimeout(function() {
                            Y.done()
                        }, C / 2)),
                        R.prepend(D),
                        clearTimeout(n),
                        o.removeClass("clockpicker-moving"),
                        c.off(d)
                    }))
                }
                var h, p, v, m, O, x, S, D, $, T, P, j, A, L, N = s(k), R = N.find(".clockpicker-plate"), q = N.find(".clockpicker-hours"), I = N.find(".clockpicker-minutes"), M = N.find(".clockpicker-am-pm-block"), F = "INPUT" === r.prop("tagName"), V = F ? r : r.find("input"), U = r.find(".input-group-addon"), Y = this;
                if (this.id = n("cp"),
                this.element = r,
                this.options = u,
                this.isAppended = !1,
                this.isShown = !1,
                this.currentView = "hours",
                this.isInput = F,
                this.input = V,
                this.addon = U,
                this.popover = N,
                this.plate = R,
                this.hoursView = q,
                this.minutesView = I,
                this.amPmBlock = M,
                this.spanHours = N.find(".clockpicker-span-hours"),
                this.spanMinutes = N.find(".clockpicker-span-minutes"),
                this.spanAmPm = N.find(".clockpicker-span-am-pm"),
                this.amOrPm = "PM",
                u.twelvehour && (h = '<div class="clockpicker-am-pm-block"><button type="button" class="btn btn-sm btn-default clockpicker-button clockpicker-am-button">AM</button><button type="button" class="btn btn-sm btn-default clockpicker-button clockpicker-pm-button">PM</button></div>',
                s(h),
                s('<button type="button" class="btn btn-sm btn-default clockpicker-button am-button">AM</button>').on("click", function() {
                    Y.amOrPm = "AM",
                    s(".clockpicker-span-am-pm").empty().append("AM")
                }).appendTo(this.amPmBlock),
                s('<button type="button" class="btn btn-sm btn-default clockpicker-button pm-button">PM</button>').on("click", function() {
                    Y.amOrPm = "PM",
                    s(".clockpicker-span-am-pm").empty().append("PM")
                }).appendTo(this.amPmBlock)),
                u.autoclose || s('<button type="button" class="btn btn-sm btn-default btn-block clockpicker-button">' + u.donetext + "</button>").click(s.proxy(this.done, this)).appendTo(N),
                "top" !== u.placement && "bottom" !== u.placement || "top" !== u.align && "bottom" !== u.align || (u.align = "left"),
                "left" !== u.placement && "right" !== u.placement || "left" !== u.align && "right" !== u.align || (u.align = "top"),
                N.addClass(u.placement),
                N.addClass("clockpicker-align-" + u.align),
                this.spanHours.click(s.proxy(this.toggleView, this, "hours")),
                this.spanMinutes.click(s.proxy(this.toggleView, this, "minutes")),
                V.on("focus.clockpicker click.clockpicker", s.proxy(this.show, this)),
                U.on("click.clockpicker", s.proxy(this.toggle, this)),
                p = s('<div class="clockpicker-tick"></div>'),
                u.twelvehour)
                    for (v = 1; v < 13; v += 1)
                        m = p.clone(),
                        O = v / 6 * Math.PI,
                        x = _,
                        m.css("font-size", "120%"),
                        m.css({
                            left: y + Math.sin(O) * x - g,
                            top: y - Math.cos(O) * x - g
                        }),
                        m.html(0 === v ? "00" : v),
                        q.append(m),
                        m.on(f, a);
                else
                    for (v = 0; v < 24; v += 1)
                        m = p.clone(),
                        O = v / 6 * Math.PI,
                        S = v > 0 && v < 13,
                        x = S ? w : _,
                        m.css({
                            left: y + Math.sin(O) * x - g,
                            top: y - Math.cos(O) * x - g
                        }),
                        S && m.css("font-size", "120%"),
                        m.html(0 === v ? "00" : v),
                        q.append(m),
                        m.on(f, a);
                for (v = 0; v < 60; v += 5)
                    m = p.clone(),
                    O = v / 30 * Math.PI,
                    m.css({
                        left: y + Math.sin(O) * _ - g,
                        top: y - Math.cos(O) * _ - g
                    }),
                    m.css("font-size", "120%"),
                    m.html(e(v)),
                    I.append(m),
                    m.on(f, a);
                R.on(f, function(t) {
                    0 === s(t.target).closest(".clockpicker-tick").length && a(t, !0)
                }),
                l && (D = N.find(".clockpicker-canvas"),
                $ = t("svg"),
                $.setAttribute("class", "clockpicker-svg"),
                $.setAttribute("width", E),
                $.setAttribute("height", E),
                T = t("g"),
                T.setAttribute("transform", "translate(" + y + "," + y + ")"),
                P = t("circle"),
                P.setAttribute("class", "clockpicker-canvas-bearing"),
                P.setAttribute("cx", 0),
                P.setAttribute("cy", 0),
                P.setAttribute("r", 2),
                j = t("line"),
                j.setAttribute("x1", 0),
                j.setAttribute("y1", 0),
                A = t("circle"),
                A.setAttribute("class", "clockpicker-canvas-bg"),
                A.setAttribute("r", g),
                L = t("circle"),
                L.setAttribute("class", "clockpicker-canvas-fg"),
                L.setAttribute("r", 3.5),
                T.appendChild(j),
                T.appendChild(A),
                T.appendChild(L),
                T.appendChild(P),
                $.appendChild(T),
                D.append($),
                this.hand = j,
                this.bg = A,
                this.fg = L,
                this.bearing = P,
                this.g = T,
                this.canvas = D),
                i(this.options.init)
            }
            function i(t) {
                t && "function" == typeof t && t()
            }
            var o, s = window.jQuery, u = s(window), c = s(document), a = "http://www.w3.org/2000/svg", l = "SVGAngle"in window && function() {
                var t, e = document.createElement("div");
                return e.innerHTML = "<svg/>",
                t = (e.firstChild && e.firstChild.namespaceURI) == a,
                e.innerHTML = "",
                t
            }(), h = function() {
                var t = document.createElement("div").style;
                return "transition"in t || "WebkitTransition"in t || "MozTransition"in t || "msTransition"in t || "OTransition"in t
            }(), p = "ontouchstart"in window, f = "mousedown" + (p ? " touchstart" : ""), d = "mousemove.clockpicker" + (p ? " touchmove.clockpicker" : ""), b = "mouseup.clockpicker" + (p ? " touchend.clockpicker" : ""), v = navigator.vibrate ? "vibrate" : navigator.webkitVibrate ? "webkitVibrate" : null, m = 0, y = 100, _ = 80, w = 54, g = 13, E = 2 * y, C = h ? 350 : 1, k = '<div class="popover clockpicker-popover"><div class="arrow"></div><div class="popover-title"><span class="clockpicker-span-hours text-primary"></span> : <span class="clockpicker-span-minutes"></span><span class="clockpicker-span-am-pm"></span></div><div class="popover-content"><div class="clockpicker-plate"><div class="clockpicker-canvas"></div><div class="clockpicker-dial clockpicker-hours"></div><div class="clockpicker-dial clockpicker-minutes clockpicker-dial-out"></div></div><span class="clockpicker-am-pm-block"></span></div></div>';
            r.DEFAULTS = {
                default: "",
                fromnow: 0,
                placement: "bottom",
                align: "left",
                donetext: "完成",
                autoclose: !1,
                twelvehour: !1,
                vibrate: !0
            },
            r.prototype.toggle = function() {
                this[this.isShown ? "hide" : "show"]()
            }
            ,
            r.prototype.locate = function() {
                var t = this.element
                  , e = this.popover
                  , n = t.offset()
                  , r = t.outerWidth()
                  , i = t.outerHeight()
                  , o = this.options.placement
                  , s = this.options.align
                  , u = {};
                switch (e.show(),
                o) {
                case "bottom":
                    u.top = n.top + i;
                    break;
                case "right":
                    u.left = n.left + r;
                    break;
                case "top":
                    u.top = n.top - e.outerHeight();
                    break;
                case "left":
                    u.left = n.left - e.outerWidth()
                }
                switch (s) {
                case "left":
                    u.left = n.left;
                    break;
                case "right":
                    u.left = n.left + r - e.outerWidth();
                    break;
                case "top":
                    u.top = n.top;
                    break;
                case "bottom":
                    u.top = n.top + i - e.outerHeight()
                }
                e.css(u)
            }
            ,
            r.prototype.show = function(t) {
                var n, r, a;
                this.isShown || (i(this.options.beforeShow),
                n = this,
                this.isAppended || (o = s(document.body).append(this.popover),
                u.on("resize.clockpicker" + this.id, function() {
                    n.isShown && n.locate()
                }),
                this.isAppended = !0),
                r = ((this.input.prop("value") || this.options.default || "") + "").split(":"),
                "now" === r[0] && (a = new Date(+new Date + this.options.fromnow),
                r = [a.getHours(), a.getMinutes()]),
                this.hours = +r[0] || 0,
                this.minutes = +r[1] || 0,
                this.spanHours.html(e(this.hours)),
                this.spanMinutes.html(e(this.minutes)),
                this.toggleView("hours"),
                this.locate(),
                this.isShown = !0,
                c.on("click.clockpicker." + this.id + " focusin.clockpicker." + this.id, function(t) {
                    var e = s(t.target);
                    0 === e.closest(n.popover).length && 0 === e.closest(n.addon).length && 0 === e.closest(n.input).length && n.hide()
                }),
                c.on("keyup.clockpicker." + this.id, function(t) {
                    27 === t.keyCode && n.hide()
                }),
                i(this.options.afterShow))
            }
            ,
            r.prototype.hide = function() {
                i(this.options.beforeHide),
                this.isShown = !1,
                c.off("click.clockpicker." + this.id + " focusin.clockpicker." + this.id),
                c.off("keyup.clockpicker." + this.id),
                this.popover.hide(),
                i(this.options.afterHide)
            }
            ,
            r.prototype.toggleView = function(t, e) {
                var n, r, o, u = !1;
                "minutes" === t && "visible" === s(this.hoursView).css("visibility") && (i(this.options.beforeHourSelect),
                u = !0),
                n = "hours" === t,
                r = n ? this.hoursView : this.minutesView,
                o = n ? this.minutesView : this.hoursView,
                this.currentView = t,
                this.spanHours.toggleClass("text-primary", n),
                this.spanMinutes.toggleClass("text-primary", !n),
                o.addClass("clockpicker-dial-out"),
                r.css("visibility", "visible").removeClass("clockpicker-dial-out"),
                this.resetClock(e),
                clearTimeout(this.toggleViewTimer),
                this.toggleViewTimer = setTimeout(function() {
                    o.css("visibility", "hidden")
                }, C),
                u && i(this.options.afterHourSelect)
            }
            ,
            r.prototype.resetClock = function(t) {
                var e = this.currentView
                  , n = this[e]
                  , r = "hours" === e
                  , i = Math.PI / (r ? 6 : 30)
                  , o = n * i
                  , s = r && n > 0 && n < 13 ? w : _
                  , u = Math.sin(o) * s
                  , c = -Math.cos(o) * s
                  , a = this;
                l && t ? (a.canvas.addClass("clockpicker-canvas-out"),
                setTimeout(function() {
                    a.canvas.removeClass("clockpicker-canvas-out"),
                    a.setHand(u, c)
                }, t)) : this.setHand(u, c)
            }
            ,
            r.prototype.setHand = function(t, n, r, i) {
                var o, u, c, a = Math.atan2(t, -n), h = "hours" === this.currentView, p = Math.PI / (h || r ? 6 : 30), f = Math.sqrt(t * t + n * n), d = this.options, b = h && f < (_ + w) / 2, m = b ? w : _;
                if (d.twelvehour && (m = _),
                a < 0 && (a = 2 * Math.PI + a),
                o = Math.round(a / p),
                a = o * p,
                d.twelvehour ? h ? 0 === o && (o = 12) : (r && (o *= 5),
                60 === o && (o = 0)) : h ? (12 === o && (o = 0),
                o = b ? 0 === o ? 12 : o : 0 === o ? 0 : o + 12) : (r && (o *= 5),
                60 === o && (o = 0)),
                this[this.currentView] !== o && v && this.options.vibrate && (this.vibrateTimer || (navigator[v](10),
                this.vibrateTimer = setTimeout(s.proxy(function() {
                    this.vibrateTimer = null
                }, this), 100))),
                this[this.currentView] = o,
                this[h ? "spanHours" : "spanMinutes"].html(e(o)),
                !l)
                    return void this[h ? "hoursView" : "minutesView"].find(".clockpicker-tick").each(function() {
                        var t = s(this);
                        t.toggleClass("active", o === +t.html())
                    });
                i || !h && o % 5 ? (this.g.insertBefore(this.hand, this.bearing),
                this.g.insertBefore(this.bg, this.fg),
                this.bg.setAttribute("class", "clockpicker-canvas-bg clockpicker-canvas-bg-trans")) : (this.g.insertBefore(this.hand, this.bg),
                this.g.insertBefore(this.fg, this.bg),
                this.bg.setAttribute("class", "clockpicker-canvas-bg")),
                u = Math.sin(a) * m,
                c = -Math.cos(a) * m,
                this.hand.setAttribute("x2", u),
                this.hand.setAttribute("y2", c),
                this.bg.setAttribute("cx", u),
                this.bg.setAttribute("cy", c),
                this.fg.setAttribute("cx", u),
                this.fg.setAttribute("cy", c)
            }
            ,
            r.prototype.done = function() {
                i(this.options.beforeDone),
                this.hide();
                var t = this.input.prop("value")
                  , n = e(this.hours) + ":" + e(this.minutes);
                this.options.twelvehour && (n += this.amOrPm),
                this.input.prop("value", n),
                n !== t && (this.input.triggerHandler("change"),
                this.isInput || this.element.trigger("change")),
                this.options.autoclose && this.input.trigger("blur"),
                i(this.options.afterDone)
            }
            ,
            r.prototype.remove = function() {
                this.element.removeData("clockpicker"),
                this.input.off("focus.clockpicker click.clockpicker"),
                this.addon.off("click.clockpicker"),
                this.isShown && this.hide(),
                this.isAppended && (u.off("resize.clockpicker" + this.id),
                this.popover.remove())
            }
            ,
            s.fn.clockpicker = function(t) {
                var e = Array.prototype.slice.call(arguments, 1);
                return this.each(function() {
                    var n, i = s(this), o = i.data("clockpicker");
                    o ? "function" == typeof o[t] && o[t].apply(o, e) : (n = s.extend({}, r.DEFAULTS, i.data(), "object" == typeof t && t),
                    i.data("clockpicker", new r(i,n)))
                })
            }
        }()
    }
});
