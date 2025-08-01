/**
 * simplebar - v6.2.5
 * Scrollbars, simpler.
 * https://grsmto.github.io/simplebar/
 *
 * Made by Adrien Denat from a fork by Jonathan Nicol
 * Under MIT License
 */

var SimpleBar = (function () {
	"use strict";
	var e = function (t, i) {
		return (
			(e =
				Object.setPrototypeOf ||
				({ __proto__: [] } instanceof Array &&
					function (e, t) {
						e.__proto__ = t;
					}) ||
				function (e, t) {
					for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
				}),
			e(t, i)
		);
	};
	var t = !("undefined" == typeof window || !window.document || !window.document.createElement),
		i = "object" == typeof global && global && global.Object === Object && global,
		s = "object" == typeof self && self && self.Object === Object && self,
		r = i || s || Function("return this")(),
		l = r.Symbol,
		o = Object.prototype,
		n = o.hasOwnProperty,
		a = o.toString,
		c = l ? l.toStringTag : void 0;
	var h = Object.prototype.toString;
	var u = l ? l.toStringTag : void 0;
	function d(e) {
		return null == e
			? void 0 === e
				? "[object Undefined]"
				: "[object Null]"
			: u && u in Object(e)
			? (function (e) {
					var t = n.call(e, c),
						i = e[c];
					try {
						e[c] = void 0;
						var s = !0;
					} catch (e) {}
					var r = a.call(e);
					return s && (t ? (e[c] = i) : delete e[c]), r;
			  })(e)
			: (function (e) {
					return h.call(e);
			  })(e);
	}
	var p = /\s/;
	var v = /^\s+/;
	function f(e) {
		return e
			? e
					.slice(
						0,
						(function (e) {
							for (var t = e.length; t-- && p.test(e.charAt(t)); );
							return t;
						})(e) + 1
					)
					.replace(v, "")
			: e;
	}
	function m(e) {
		var t = typeof e;
		return null != e && ("object" == t || "function" == t);
	}
	var b = /^[-+]0x[0-9a-f]+$/i,
		g = /^0b[01]+$/i,
		x = /^0o[0-7]+$/i,
		y = parseInt;
	function E(e) {
		if ("number" == typeof e) return e;
		if (
			(function (e) {
				return (
					"symbol" == typeof e ||
					((function (e) {
						return null != e && "object" == typeof e;
					})(e) &&
						"[object Symbol]" == d(e))
				);
			})(e)
		)
			return NaN;
		if (m(e)) {
			var t = "function" == typeof e.valueOf ? e.valueOf() : e;
			e = m(t) ? t + "" : t;
		}
		if ("string" != typeof e) return 0 === e ? e : +e;
		e = f(e);
		var i = g.test(e);
		return i || x.test(e) ? y(e.slice(2), i ? 2 : 8) : b.test(e) ? NaN : +e;
	}
	var O = function () {
			return r.Date.now();
		},
		w = Math.max,
		S = Math.min;
	function A(e, t, i) {
		var s,
			r,
			l,
			o,
			n,
			a,
			c = 0,
			h = !1,
			u = !1,
			d = !0;
		if ("function" != typeof e) throw new TypeError("Expected a function");
		function p(t) {
			var i = s,
				l = r;
			return (s = r = void 0), (c = t), (o = e.apply(l, i));
		}
		function v(e) {
			return (c = e), (n = setTimeout(b, t)), h ? p(e) : o;
		}
		function f(e) {
			var i = e - a;
			return void 0 === a || i >= t || i < 0 || (u && e - c >= l);
		}
		function b() {
			var e = O();
			if (f(e)) return g(e);
			n = setTimeout(
				b,
				(function (e) {
					var i = t - (e - a);
					return u ? S(i, l - (e - c)) : i;
				})(e)
			);
		}
		function g(e) {
			return (n = void 0), d && s ? p(e) : ((s = r = void 0), o);
		}
		function x() {
			var e = O(),
				i = f(e);
			if (((s = arguments), (r = this), (a = e), i)) {
				if (void 0 === n) return v(a);
				if (u) return clearTimeout(n), (n = setTimeout(b, t)), p(a);
			}
			return void 0 === n && (n = setTimeout(b, t)), o;
		}
		return (
			(t = E(t) || 0),
			m(i) &&
				((h = !!i.leading),
				(l = (u = "maxWait" in i) ? w(E(i.maxWait) || 0, t) : l),
				(d = "trailing" in i ? !!i.trailing : d)),
			(x.cancel = function () {
				void 0 !== n && clearTimeout(n), (c = 0), (s = a = r = n = void 0);
			}),
			(x.flush = function () {
				return void 0 === n ? o : g(O());
			}),
			x
		);
	}
	var k = function () {
			return (
				(k =
					Object.assign ||
					function (e) {
						for (var t, i = 1, s = arguments.length; i < s; i++)
							for (var r in (t = arguments[i]))
								Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
						return e;
					}),
				k.apply(this, arguments)
			);
		},
		W = null,
		M = null;
	function N() {
		if (null === W) {
			if ("undefined" == typeof document) return (W = 0);
			var e = document.body,
				t = document.createElement("div");
			t.classList.add("simplebar-hide-scrollbar"), e.appendChild(t);
			var i = t.getBoundingClientRect().right;
			e.removeChild(t), (W = i);
		}
		return W;
	}
	function L(e) {
		return e && e.ownerDocument && e.ownerDocument.defaultView ? e.ownerDocument.defaultView : window;
	}
	function z(e) {
		return e && e.ownerDocument ? e.ownerDocument : document;
	}
	t &&
		window.addEventListener("resize", function () {
			M !== window.devicePixelRatio && ((M = window.devicePixelRatio), (W = null));
		});
	var C = function (e) {
		return Array.prototype.reduce.call(
			e,
			function (e, t) {
				var i = t.name.match(/data-simplebar-(.+)/);
				if (i) {
					var s = i[1].replace(/\W+(.)/g, function (e, t) {
						return t.toUpperCase();
					});
					switch (t.value) {
						case "true":
							e[s] = !0;
							break;
						case "false":
							e[s] = !1;
							break;
						case void 0:
							e[s] = !0;
							break;
						default:
							e[s] = t.value;
					}
				}
				return e;
			},
			{}
		);
	};
	function T(e, t) {
		var i;
		e && (i = e.classList).add.apply(i, t.split(" "));
	}
	function R(e, t) {
		e &&
			t.split(" ").forEach(function (t) {
				e.classList.remove(t);
			});
	}
	function D(e) {
		return ".".concat(e.split(" ").join("."));
	}
	var V = Object.freeze({
			__proto__: null,
			getElementWindow: L,
			getElementDocument: z,
			getOptions: C,
			addClasses: T,
			removeClasses: R,
			classNamesToQuery: D,
		}),
		H = L,
		j = z,
		B = C,
		_ = T,
		q = R,
		P = D,
		X = (function () {
			function e(t, i) {
				void 0 === i && (i = {});
				var s = this;
				if (
					((this.removePreventClickId = null),
					(this.minScrollbarWidth = 20),
					(this.stopScrollDelay = 175),
					(this.isScrolling = !1),
					(this.isMouseEntering = !1),
					(this.scrollXTicking = !1),
					(this.scrollYTicking = !1),
					(this.wrapperEl = null),
					(this.contentWrapperEl = null),
					(this.contentEl = null),
					(this.offsetEl = null),
					(this.maskEl = null),
					(this.placeholderEl = null),
					(this.heightAutoObserverWrapperEl = null),
					(this.heightAutoObserverEl = null),
					(this.rtlHelpers = null),
					(this.scrollbarWidth = 0),
					(this.resizeObserver = null),
					(this.mutationObserver = null),
					(this.elStyles = null),
					(this.isRtl = null),
					(this.mouseX = 0),
					(this.mouseY = 0),
					(this.onMouseMove = function () {}),
					(this.onWindowResize = function () {}),
					(this.onStopScrolling = function () {}),
					(this.onMouseEntered = function () {}),
					(this.onScroll = function () {
						var e = H(s.el);
						s.scrollXTicking || (e.requestAnimationFrame(s.scrollX), (s.scrollXTicking = !0)),
							s.scrollYTicking || (e.requestAnimationFrame(s.scrollY), (s.scrollYTicking = !0)),
							s.isScrolling || ((s.isScrolling = !0), _(s.el, s.classNames.scrolling)),
							s.showScrollbar("x"),
							s.showScrollbar("y"),
							s.onStopScrolling();
					}),
					(this.scrollX = function () {
						s.axis.x.isOverflowing && s.positionScrollbar("x"), (s.scrollXTicking = !1);
					}),
					(this.scrollY = function () {
						s.axis.y.isOverflowing && s.positionScrollbar("y"), (s.scrollYTicking = !1);
					}),
					(this._onStopScrolling = function () {
						q(s.el, s.classNames.scrolling),
							s.options.autoHide && (s.hideScrollbar("x"), s.hideScrollbar("y")),
							(s.isScrolling = !1);
					}),
					(this.onMouseEnter = function () {
						s.isMouseEntering ||
							(_(s.el, s.classNames.mouseEntered),
							s.showScrollbar("x"),
							s.showScrollbar("y"),
							(s.isMouseEntering = !0)),
							s.onMouseEntered();
					}),
					(this._onMouseEntered = function () {
						q(s.el, s.classNames.mouseEntered),
							s.options.autoHide && (s.hideScrollbar("x"), s.hideScrollbar("y")),
							(s.isMouseEntering = !1);
					}),
					(this._onMouseMove = function (e) {
						(s.mouseX = e.clientX),
							(s.mouseY = e.clientY),
							(s.axis.x.isOverflowing || s.axis.x.forceVisible) && s.onMouseMoveForAxis("x"),
							(s.axis.y.isOverflowing || s.axis.y.forceVisible) && s.onMouseMoveForAxis("y");
					}),
					(this.onMouseLeave = function () {
						s.onMouseMove.cancel(),
							(s.axis.x.isOverflowing || s.axis.x.forceVisible) && s.onMouseLeaveForAxis("x"),
							(s.axis.y.isOverflowing || s.axis.y.forceVisible) && s.onMouseLeaveForAxis("y"),
							(s.mouseX = -1),
							(s.mouseY = -1);
					}),
					(this._onWindowResize = function () {
						(s.scrollbarWidth = s.getScrollbarWidth()), s.hideNativeScrollbar();
					}),
					(this.onPointerEvent = function (e) {
						var t, i;
						s.axis.x.track.el &&
							s.axis.y.track.el &&
							s.axis.x.scrollbar.el &&
							s.axis.y.scrollbar.el &&
							((s.axis.x.track.rect = s.axis.x.track.el.getBoundingClientRect()),
							(s.axis.y.track.rect = s.axis.y.track.el.getBoundingClientRect()),
							(s.axis.x.isOverflowing || s.axis.x.forceVisible) &&
								(t = s.isWithinBounds(s.axis.x.track.rect)),
							(s.axis.y.isOverflowing || s.axis.y.forceVisible) &&
								(i = s.isWithinBounds(s.axis.y.track.rect)),
							(t || i) &&
								(e.stopPropagation(),
								"pointerdown" === e.type &&
									"touch" !== e.pointerType &&
									(t &&
										((s.axis.x.scrollbar.rect = s.axis.x.scrollbar.el.getBoundingClientRect()),
										s.isWithinBounds(s.axis.x.scrollbar.rect)
											? s.onDragStart(e, "x")
											: s.onTrackClick(e, "x")),
									i &&
										((s.axis.y.scrollbar.rect = s.axis.y.scrollbar.el.getBoundingClientRect()),
										s.isWithinBounds(s.axis.y.scrollbar.rect)
											? s.onDragStart(e, "y")
											: s.onTrackClick(e, "y")))));
					}),
					(this.drag = function (t) {
						var i, r, l, o, n, a, c, h, u, d, p;
						if (s.draggedAxis && s.contentWrapperEl) {
							var v = s.axis[s.draggedAxis].track,
								f =
									null !==
										(r =
											null === (i = v.rect) || void 0 === i
												? void 0
												: i[s.axis[s.draggedAxis].sizeAttr]) && void 0 !== r
										? r
										: 0,
								m = s.axis[s.draggedAxis].scrollbar,
								b =
									null !==
										(o =
											null === (l = s.contentWrapperEl) || void 0 === l
												? void 0
												: l[s.axis[s.draggedAxis].scrollSizeAttr]) && void 0 !== o
										? o
										: 0,
								g = parseInt(
									null !==
										(a =
											null === (n = s.elStyles) || void 0 === n
												? void 0
												: n[s.axis[s.draggedAxis].sizeAttr]) && void 0 !== a
										? a
										: "0px",
									10
								);
							t.preventDefault(), t.stopPropagation();
							var x =
									("y" === s.draggedAxis ? t.pageY : t.pageX) -
									(null !==
										(h =
											null === (c = v.rect) || void 0 === c
												? void 0
												: c[s.axis[s.draggedAxis].offsetAttr]) && void 0 !== h
										? h
										: 0) -
									s.axis[s.draggedAxis].dragOffset,
								y =
									((x =
										"x" === s.draggedAxis && s.isRtl
											? (null !==
													(d =
														null === (u = v.rect) || void 0 === u
															? void 0
															: u[s.axis[s.draggedAxis].sizeAttr]) && void 0 !== d
													? d
													: 0) -
											  m.size -
											  x
											: x) /
										(f - m.size)) *
									(b - g);
							"x" === s.draggedAxis &&
								s.isRtl &&
								(y = (
									null === (p = e.getRtlHelpers()) || void 0 === p ? void 0 : p.isScrollingToNegative
								)
									? -y
									: y),
								(s.contentWrapperEl[s.axis[s.draggedAxis].scrollOffsetAttr] = y);
						}
					}),
					(this.onEndDrag = function (e) {
						var t = j(s.el),
							i = H(s.el);
						e.preventDefault(),
							e.stopPropagation(),
							q(s.el, s.classNames.dragging),
							t.removeEventListener("mousemove", s.drag, !0),
							t.removeEventListener("mouseup", s.onEndDrag, !0),
							(s.removePreventClickId = i.setTimeout(function () {
								t.removeEventListener("click", s.preventClick, !0),
									t.removeEventListener("dblclick", s.preventClick, !0),
									(s.removePreventClickId = null);
							}));
					}),
					(this.preventClick = function (e) {
						e.preventDefault(), e.stopPropagation();
					}),
					(this.el = t),
					(this.options = k(k({}, e.defaultOptions), i)),
					(this.classNames = k(k({}, e.defaultOptions.classNames), i.classNames)),
					(this.axis = {
						x: {
							scrollOffsetAttr: "scrollLeft",
							sizeAttr: "width",
							scrollSizeAttr: "scrollWidth",
							offsetSizeAttr: "offsetWidth",
							offsetAttr: "left",
							overflowAttr: "overflowX",
							dragOffset: 0,
							isOverflowing: !0,
							forceVisible: !1,
							track: { size: null, el: null, rect: null, isVisible: !1 },
							scrollbar: { size: null, el: null, rect: null, isVisible: !1 },
						},
						y: {
							scrollOffsetAttr: "scrollTop",
							sizeAttr: "height",
							scrollSizeAttr: "scrollHeight",
							offsetSizeAttr: "offsetHeight",
							offsetAttr: "top",
							overflowAttr: "overflowY",
							dragOffset: 0,
							isOverflowing: !0,
							forceVisible: !1,
							track: { size: null, el: null, rect: null, isVisible: !1 },
							scrollbar: { size: null, el: null, rect: null, isVisible: !1 },
						},
					}),
					"object" != typeof this.el || !this.el.nodeName)
				)
					throw new Error("Argument passed to SimpleBar must be an HTML element instead of ".concat(this.el));
				(this.onMouseMove = (function (e, t, i) {
					var s = !0,
						r = !0;
					if ("function" != typeof e) throw new TypeError("Expected a function");
					return (
						m(i) && ((s = "leading" in i ? !!i.leading : s), (r = "trailing" in i ? !!i.trailing : r)),
						A(e, t, { leading: s, maxWait: t, trailing: r })
					);
				})(this._onMouseMove, 64)),
					(this.onWindowResize = A(this._onWindowResize, 64, { leading: !0 })),
					(this.onStopScrolling = A(this._onStopScrolling, this.stopScrollDelay)),
					(this.onMouseEntered = A(this._onMouseEntered, this.stopScrollDelay)),
					this.init();
			}
			return (
				(e.getRtlHelpers = function () {
					if (e.rtlHelpers) return e.rtlHelpers;
					var t = document.createElement("div");
					t.innerHTML = '<div class="simplebar-dummy-scrollbar-size"><div></div></div>';
					var i = t.firstElementChild,
						s = null == i ? void 0 : i.firstElementChild;
					if (!s) return null;
					document.body.appendChild(i), (i.scrollLeft = 0);
					var r = e.getOffset(i),
						l = e.getOffset(s);
					i.scrollLeft = -999;
					var o = e.getOffset(s);
					return (
						document.body.removeChild(i),
						(e.rtlHelpers = {
							isScrollOriginAtZero: r.left !== l.left,
							isScrollingToNegative: l.left !== o.left,
						}),
						e.rtlHelpers
					);
				}),
				(e.prototype.getScrollbarWidth = function () {
					try {
						return (this.contentWrapperEl &&
							"none" === getComputedStyle(this.contentWrapperEl, "::-webkit-scrollbar").display) ||
							"scrollbarWidth" in document.documentElement.style ||
							"-ms-overflow-style" in document.documentElement.style
							? 0
							: N();
					} catch (e) {
						return N();
					}
				}),
				(e.getOffset = function (e) {
					var t = e.getBoundingClientRect(),
						i = j(e),
						s = H(e);
					return {
						top: t.top + (s.pageYOffset || i.documentElement.scrollTop),
						left: t.left + (s.pageXOffset || i.documentElement.scrollLeft),
					};
				}),
				(e.prototype.init = function () {
					t &&
						(this.initDOM(),
						(this.rtlHelpers = e.getRtlHelpers()),
						(this.scrollbarWidth = this.getScrollbarWidth()),
						this.recalculate(),
						this.initListeners());
				}),
				(e.prototype.initDOM = function () {
					var e, t;
					(this.wrapperEl = this.el.querySelector(P(this.classNames.wrapper))),
						(this.contentWrapperEl =
							this.options.scrollableNode || this.el.querySelector(P(this.classNames.contentWrapper))),
						(this.contentEl =
							this.options.contentNode || this.el.querySelector(P(this.classNames.contentEl))),
						(this.offsetEl = this.el.querySelector(P(this.classNames.offset))),
						(this.maskEl = this.el.querySelector(P(this.classNames.mask))),
						(this.placeholderEl = this.findChild(this.wrapperEl, P(this.classNames.placeholder))),
						(this.heightAutoObserverWrapperEl = this.el.querySelector(
							P(this.classNames.heightAutoObserverWrapperEl)
						)),
						(this.heightAutoObserverEl = this.el.querySelector(P(this.classNames.heightAutoObserverEl))),
						(this.axis.x.track.el = this.findChild(
							this.el,
							"".concat(P(this.classNames.track)).concat(P(this.classNames.horizontal))
						)),
						(this.axis.y.track.el = this.findChild(
							this.el,
							"".concat(P(this.classNames.track)).concat(P(this.classNames.vertical))
						)),
						(this.axis.x.scrollbar.el =
							(null === (e = this.axis.x.track.el) || void 0 === e
								? void 0
								: e.querySelector(P(this.classNames.scrollbar))) || null),
						(this.axis.y.scrollbar.el =
							(null === (t = this.axis.y.track.el) || void 0 === t
								? void 0
								: t.querySelector(P(this.classNames.scrollbar))) || null),
						this.options.autoHide ||
							(_(this.axis.x.scrollbar.el, this.classNames.visible),
							_(this.axis.y.scrollbar.el, this.classNames.visible));
				}),
				(e.prototype.initListeners = function () {
					var e,
						t = this,
						i = H(this.el);
					if (
						(this.el.addEventListener("mouseenter", this.onMouseEnter),
						this.el.addEventListener("pointerdown", this.onPointerEvent, !0),
						this.el.addEventListener("mousemove", this.onMouseMove),
						this.el.addEventListener("mouseleave", this.onMouseLeave),
						null === (e = this.contentWrapperEl) ||
							void 0 === e ||
							e.addEventListener("scroll", this.onScroll),
						i.addEventListener("resize", this.onWindowResize),
						this.contentEl)
					) {
						if (window.ResizeObserver) {
							var s = !1,
								r = i.ResizeObserver || ResizeObserver;
							(this.resizeObserver = new r(function () {
								s &&
									i.requestAnimationFrame(function () {
										t.recalculate();
									});
							})),
								this.resizeObserver.observe(this.el),
								this.resizeObserver.observe(this.contentEl),
								i.requestAnimationFrame(function () {
									s = !0;
								});
						}
						(this.mutationObserver = new i.MutationObserver(function () {
							i.requestAnimationFrame(function () {
								t.recalculate();
							});
						})),
							this.mutationObserver.observe(this.contentEl, {
								childList: !0,
								subtree: !0,
								characterData: !0,
							});
					}
				}),
				(e.prototype.recalculate = function () {
					if (
						this.heightAutoObserverEl &&
						this.contentEl &&
						this.contentWrapperEl &&
						this.wrapperEl &&
						this.placeholderEl
					) {
						var e = H(this.el);
						(this.elStyles = e.getComputedStyle(this.el)), (this.isRtl = "rtl" === this.elStyles.direction);
						var t = this.contentEl.offsetWidth,
							i = this.heightAutoObserverEl.offsetHeight <= 1,
							s = this.heightAutoObserverEl.offsetWidth <= 1 || t > 0,
							r = this.contentWrapperEl.offsetWidth,
							l = this.elStyles.overflowX,
							o = this.elStyles.overflowY;
						(this.contentEl.style.padding = ""
							.concat(this.elStyles.paddingTop, " ")
							.concat(this.elStyles.paddingRight, " ")
							.concat(this.elStyles.paddingBottom, " ")
							.concat(this.elStyles.paddingLeft)),
							(this.wrapperEl.style.margin = "-"
								.concat(this.elStyles.paddingTop, " -")
								.concat(this.elStyles.paddingRight, " -")
								.concat(this.elStyles.paddingBottom, " -")
								.concat(this.elStyles.paddingLeft));
						var n = this.contentEl.scrollHeight,
							a = this.contentEl.scrollWidth;
						(this.contentWrapperEl.style.height = i ? "auto" : "100%"),
							(this.placeholderEl.style.width = s ? "".concat(t || a, "px") : "auto"),
							(this.placeholderEl.style.height = "".concat(n, "px"));
						var c = this.contentWrapperEl.offsetHeight;
						(this.axis.x.isOverflowing = 0 !== t && a > t),
							(this.axis.y.isOverflowing = n > c),
							(this.axis.x.isOverflowing = "hidden" !== l && this.axis.x.isOverflowing),
							(this.axis.y.isOverflowing = "hidden" !== o && this.axis.y.isOverflowing),
							(this.axis.x.forceVisible =
								"x" === this.options.forceVisible || !0 === this.options.forceVisible),
							(this.axis.y.forceVisible =
								"y" === this.options.forceVisible || !0 === this.options.forceVisible),
							this.hideNativeScrollbar();
						var h = this.axis.x.isOverflowing ? this.scrollbarWidth : 0,
							u = this.axis.y.isOverflowing ? this.scrollbarWidth : 0;
						(this.axis.x.isOverflowing = this.axis.x.isOverflowing && a > r - u),
							(this.axis.y.isOverflowing = this.axis.y.isOverflowing && n > c - h),
							(this.axis.x.scrollbar.size = this.getScrollbarSize("x")),
							(this.axis.y.scrollbar.size = this.getScrollbarSize("y")),
							this.axis.x.scrollbar.el &&
								(this.axis.x.scrollbar.el.style.width = "".concat(this.axis.x.scrollbar.size, "px")),
							this.axis.y.scrollbar.el &&
								(this.axis.y.scrollbar.el.style.height = "".concat(this.axis.y.scrollbar.size, "px")),
							this.positionScrollbar("x"),
							this.positionScrollbar("y"),
							this.toggleTrackVisibility("x"),
							this.toggleTrackVisibility("y");
					}
				}),
				(e.prototype.getScrollbarSize = function (e) {
					var t, i;
					if ((void 0 === e && (e = "y"), !this.axis[e].isOverflowing || !this.contentEl)) return 0;
					var s,
						r = this.contentEl[this.axis[e].scrollSizeAttr],
						l =
							null !==
								(i =
									null === (t = this.axis[e].track.el) || void 0 === t
										? void 0
										: t[this.axis[e].offsetSizeAttr]) && void 0 !== i
								? i
								: 0,
						o = l / r;
					return (
						(s = Math.max(~~(o * l), this.options.scrollbarMinSize)),
						this.options.scrollbarMaxSize && (s = Math.min(s, this.options.scrollbarMaxSize)),
						s
					);
				}),
				(e.prototype.positionScrollbar = function (t) {
					var i, s, r;
					void 0 === t && (t = "y");
					var l = this.axis[t].scrollbar;
					if (this.axis[t].isOverflowing && this.contentWrapperEl && l.el && this.elStyles) {
						var o = this.contentWrapperEl[this.axis[t].scrollSizeAttr],
							n =
								(null === (i = this.axis[t].track.el) || void 0 === i
									? void 0
									: i[this.axis[t].offsetSizeAttr]) || 0,
							a = parseInt(this.elStyles[this.axis[t].sizeAttr], 10),
							c = this.contentWrapperEl[this.axis[t].scrollOffsetAttr];
						(c =
							"x" === t &&
							this.isRtl &&
							(null === (s = e.getRtlHelpers()) || void 0 === s ? void 0 : s.isScrollOriginAtZero)
								? -c
								: c),
							"x" === t &&
								this.isRtl &&
								(c = (
									null === (r = e.getRtlHelpers()) || void 0 === r ? void 0 : r.isScrollingToNegative
								)
									? c
									: -c);
						var h = c / (o - a),
							u = ~~((n - l.size) * h);
						(u = "x" === t && this.isRtl ? -u + (n - l.size) : u),
							(l.el.style.transform =
								"x" === t
									? "translate3d(".concat(u, "px, 0, 0)")
									: "translate3d(0, ".concat(u, "px, 0)"));
					}
				}),
				(e.prototype.toggleTrackVisibility = function (e) {
					void 0 === e && (e = "y");
					var t = this.axis[e].track.el,
						i = this.axis[e].scrollbar.el;
					t &&
						i &&
						this.contentWrapperEl &&
						(this.axis[e].isOverflowing || this.axis[e].forceVisible
							? ((t.style.visibility = "visible"),
							  (this.contentWrapperEl.style[this.axis[e].overflowAttr] = "scroll"),
							  this.el.classList.add("".concat(this.classNames.scrollable, "-").concat(e)))
							: ((t.style.visibility = "hidden"),
							  (this.contentWrapperEl.style[this.axis[e].overflowAttr] = "hidden"),
							  this.el.classList.remove("".concat(this.classNames.scrollable, "-").concat(e))),
						this.axis[e].isOverflowing ? (i.style.display = "block") : (i.style.display = "none"));
				}),
				(e.prototype.showScrollbar = function (e) {
					void 0 === e && (e = "y"),
						this.axis[e].isOverflowing &&
							!this.axis[e].scrollbar.isVisible &&
							(_(this.axis[e].scrollbar.el, this.classNames.visible),
							(this.axis[e].scrollbar.isVisible = !0));
				}),
				(e.prototype.hideScrollbar = function (e) {
					void 0 === e && (e = "y"),
						this.axis[e].isOverflowing &&
							this.axis[e].scrollbar.isVisible &&
							(q(this.axis[e].scrollbar.el, this.classNames.visible),
							(this.axis[e].scrollbar.isVisible = !1));
				}),
				(e.prototype.hideNativeScrollbar = function () {
					this.offsetEl &&
						((this.offsetEl.style[this.isRtl ? "left" : "right"] =
							this.axis.y.isOverflowing || this.axis.y.forceVisible
								? "-".concat(this.scrollbarWidth, "px")
								: "0px"),
						(this.offsetEl.style.bottom =
							this.axis.x.isOverflowing || this.axis.x.forceVisible
								? "-".concat(this.scrollbarWidth, "px")
								: "0px"));
				}),
				(e.prototype.onMouseMoveForAxis = function (e) {
					void 0 === e && (e = "y");
					var t = this.axis[e];
					t.track.el &&
						t.scrollbar.el &&
						((t.track.rect = t.track.el.getBoundingClientRect()),
						(t.scrollbar.rect = t.scrollbar.el.getBoundingClientRect()),
						this.isWithinBounds(t.track.rect)
							? (this.showScrollbar(e),
							  _(t.track.el, this.classNames.hover),
							  this.isWithinBounds(t.scrollbar.rect)
									? _(t.scrollbar.el, this.classNames.hover)
									: q(t.scrollbar.el, this.classNames.hover))
							: (q(t.track.el, this.classNames.hover), this.options.autoHide && this.hideScrollbar(e)));
				}),
				(e.prototype.onMouseLeaveForAxis = function (e) {
					void 0 === e && (e = "y"),
						q(this.axis[e].track.el, this.classNames.hover),
						q(this.axis[e].scrollbar.el, this.classNames.hover),
						this.options.autoHide && this.hideScrollbar(e);
				}),
				(e.prototype.onDragStart = function (e, t) {
					var i;
					void 0 === t && (t = "y");
					var s = j(this.el),
						r = H(this.el),
						l = this.axis[t].scrollbar,
						o = "y" === t ? e.pageY : e.pageX;
					(this.axis[t].dragOffset =
						o - ((null === (i = l.rect) || void 0 === i ? void 0 : i[this.axis[t].offsetAttr]) || 0)),
						(this.draggedAxis = t),
						_(this.el, this.classNames.dragging),
						s.addEventListener("mousemove", this.drag, !0),
						s.addEventListener("mouseup", this.onEndDrag, !0),
						null === this.removePreventClickId
							? (s.addEventListener("click", this.preventClick, !0),
							  s.addEventListener("dblclick", this.preventClick, !0))
							: (r.clearTimeout(this.removePreventClickId), (this.removePreventClickId = null));
				}),
				(e.prototype.onTrackClick = function (e, t) {
					var i,
						s,
						r,
						l,
						o = this;
					void 0 === t && (t = "y");
					var n = this.axis[t];
					if (this.options.clickOnTrack && n.scrollbar.el && this.contentWrapperEl) {
						e.preventDefault();
						var a = H(this.el);
						this.axis[t].scrollbar.rect = n.scrollbar.el.getBoundingClientRect();
						var c =
								null !==
									(s =
										null === (i = this.axis[t].scrollbar.rect) || void 0 === i
											? void 0
											: i[this.axis[t].offsetAttr]) && void 0 !== s
									? s
									: 0,
							h = parseInt(
								null !==
									(l =
										null === (r = this.elStyles) || void 0 === r
											? void 0
											: r[this.axis[t].sizeAttr]) && void 0 !== l
									? l
									: "0px",
								10
							),
							u = this.contentWrapperEl[this.axis[t].scrollOffsetAttr],
							d = ("y" === t ? this.mouseY - c : this.mouseX - c) < 0 ? -1 : 1,
							p = -1 === d ? u - h : u + h,
							v = function () {
								o.contentWrapperEl &&
									(-1 === d
										? u > p &&
										  ((u -= 40),
										  (o.contentWrapperEl[o.axis[t].scrollOffsetAttr] = u),
										  a.requestAnimationFrame(v))
										: u < p &&
										  ((u += 40),
										  (o.contentWrapperEl[o.axis[t].scrollOffsetAttr] = u),
										  a.requestAnimationFrame(v)));
							};
						v();
					}
				}),
				(e.prototype.getContentElement = function () {
					return this.contentEl;
				}),
				(e.prototype.getScrollElement = function () {
					return this.contentWrapperEl;
				}),
				(e.prototype.removeListeners = function () {
					var e = H(this.el);
					this.el.removeEventListener("mouseenter", this.onMouseEnter),
						this.el.removeEventListener("pointerdown", this.onPointerEvent, !0),
						this.el.removeEventListener("mousemove", this.onMouseMove),
						this.el.removeEventListener("mouseleave", this.onMouseLeave),
						this.contentWrapperEl && this.contentWrapperEl.removeEventListener("scroll", this.onScroll),
						e.removeEventListener("resize", this.onWindowResize),
						this.mutationObserver && this.mutationObserver.disconnect(),
						this.resizeObserver && this.resizeObserver.disconnect(),
						this.onMouseMove.cancel(),
						this.onWindowResize.cancel(),
						this.onStopScrolling.cancel(),
						this.onMouseEntered.cancel();
				}),
				(e.prototype.unMount = function () {
					this.removeListeners();
				}),
				(e.prototype.isWithinBounds = function (e) {
					return (
						this.mouseX >= e.left &&
						this.mouseX <= e.left + e.width &&
						this.mouseY >= e.top &&
						this.mouseY <= e.top + e.height
					);
				}),
				(e.prototype.findChild = function (e, t) {
					var i = e.matches || e.webkitMatchesSelector || e.mozMatchesSelector || e.msMatchesSelector;
					return Array.prototype.filter.call(e.children, function (e) {
						return i.call(e, t);
					})[0];
				}),
				(e.rtlHelpers = null),
				(e.defaultOptions = {
					forceVisible: !1,
					clickOnTrack: !0,
					scrollbarMinSize: 25,
					scrollbarMaxSize: 0,
					ariaLabel: "scrollable content",
					classNames: {
						contentEl: "simplebar-content",
						contentWrapper: "simplebar-content-wrapper",
						offset: "simplebar-offset",
						mask: "simplebar-mask",
						wrapper: "simplebar-wrapper",
						placeholder: "simplebar-placeholder",
						scrollbar: "simplebar-scrollbar",
						track: "simplebar-track",
						heightAutoObserverWrapperEl: "simplebar-height-auto-observer-wrapper",
						heightAutoObserverEl: "simplebar-height-auto-observer",
						visible: "simplebar-visible",
						horizontal: "simplebar-horizontal",
						vertical: "simplebar-vertical",
						hover: "simplebar-hover",
						dragging: "simplebar-dragging",
						scrolling: "simplebar-scrolling",
						scrollable: "simplebar-scrollable",
						mouseEntered: "simplebar-mouse-entered",
					},
					scrollableNode: null,
					contentNode: null,
					autoHide: !0,
				}),
				(e.getOptions = B),
				(e.helpers = V),
				e
			);
		})(),
		Y = X.helpers,
		F = Y.getOptions,
		I = Y.addClasses,
		$ = (function (t) {
			function i() {
				for (var e = [], s = 0; s < arguments.length; s++) e[s] = arguments[s];
				var r = t.apply(this, e) || this;
				return i.instances.set(e[0], r), r;
			}
			return (
				(function (t, i) {
					if ("function" != typeof i && null !== i)
						throw new TypeError("Class extends value " + String(i) + " is not a constructor or null");
					function s() {
						this.constructor = t;
					}
					e(t, i), (t.prototype = null === i ? Object.create(i) : ((s.prototype = i.prototype), new s()));
				})(i, t),
				(i.initDOMLoadedElements = function () {
					document.removeEventListener("DOMContentLoaded", this.initDOMLoadedElements),
						window.removeEventListener("load", this.initDOMLoadedElements),
						Array.prototype.forEach.call(document.querySelectorAll("[data-simplebar]"), function (e) {
							"init" === e.getAttribute("data-simplebar") ||
								i.instances.has(e) ||
								new i(e, F(e.attributes));
						});
				}),
				(i.removeObserver = function () {
					var e;
					null === (e = i.globalObserver) || void 0 === e || e.disconnect();
				}),
				(i.prototype.initDOM = function () {
					var e,
						t,
						i,
						s = this;
					if (
						!Array.prototype.filter.call(this.el.children, function (e) {
							return e.classList.contains(s.classNames.wrapper);
						}).length
					) {
						for (
							this.wrapperEl = document.createElement("div"),
								this.contentWrapperEl = document.createElement("div"),
								this.offsetEl = document.createElement("div"),
								this.maskEl = document.createElement("div"),
								this.contentEl = document.createElement("div"),
								this.placeholderEl = document.createElement("div"),
								this.heightAutoObserverWrapperEl = document.createElement("div"),
								this.heightAutoObserverEl = document.createElement("div"),
								I(this.wrapperEl, this.classNames.wrapper),
								I(this.contentWrapperEl, this.classNames.contentWrapper),
								I(this.offsetEl, this.classNames.offset),
								I(this.maskEl, this.classNames.mask),
								I(this.contentEl, this.classNames.contentEl),
								I(this.placeholderEl, this.classNames.placeholder),
								I(this.heightAutoObserverWrapperEl, this.classNames.heightAutoObserverWrapperEl),
								I(this.heightAutoObserverEl, this.classNames.heightAutoObserverEl);
							this.el.firstChild;

						)
							this.contentEl.appendChild(this.el.firstChild);
						this.contentWrapperEl.appendChild(this.contentEl),
							this.offsetEl.appendChild(this.contentWrapperEl),
							this.maskEl.appendChild(this.offsetEl),
							this.heightAutoObserverWrapperEl.appendChild(this.heightAutoObserverEl),
							this.wrapperEl.appendChild(this.heightAutoObserverWrapperEl),
							this.wrapperEl.appendChild(this.maskEl),
							this.wrapperEl.appendChild(this.placeholderEl),
							this.el.appendChild(this.wrapperEl),
							null === (e = this.contentWrapperEl) || void 0 === e || e.setAttribute("tabindex", "0"),
							null === (t = this.contentWrapperEl) || void 0 === t || t.setAttribute("role", "region"),
							null === (i = this.contentWrapperEl) ||
								void 0 === i ||
								i.setAttribute("aria-label", this.options.ariaLabel);
					}
					if (!this.axis.x.track.el || !this.axis.y.track.el) {
						var r = document.createElement("div"),
							l = document.createElement("div");
						I(r, this.classNames.track),
							I(l, this.classNames.scrollbar),
							r.appendChild(l),
							(this.axis.x.track.el = r.cloneNode(!0)),
							I(this.axis.x.track.el, this.classNames.horizontal),
							(this.axis.y.track.el = r.cloneNode(!0)),
							I(this.axis.y.track.el, this.classNames.vertical),
							this.el.appendChild(this.axis.x.track.el),
							this.el.appendChild(this.axis.y.track.el);
					}
					X.prototype.initDOM.call(this), this.el.setAttribute("data-simplebar", "init");
				}),
				(i.prototype.unMount = function () {
					X.prototype.unMount.call(this), i.instances.delete(this.el);
				}),
				(i.initHtmlApi = function () {
					(this.initDOMLoadedElements = this.initDOMLoadedElements.bind(this)),
						"undefined" != typeof MutationObserver &&
							((this.globalObserver = new MutationObserver(i.handleMutations)),
							this.globalObserver.observe(document, { childList: !0, subtree: !0 })),
						"complete" === document.readyState ||
						("loading" !== document.readyState && !document.documentElement.doScroll)
							? window.setTimeout(this.initDOMLoadedElements)
							: (document.addEventListener("DOMContentLoaded", this.initDOMLoadedElements),
							  window.addEventListener("load", this.initDOMLoadedElements));
				}),
				(i.handleMutations = function (e) {
					e.forEach(function (e) {
						e.addedNodes.forEach(function (e) {
							1 === e.nodeType &&
								(e.hasAttribute("data-simplebar")
									? !i.instances.has(e) &&
									  document.documentElement.contains(e) &&
									  new i(e, F(e.attributes))
									: e.querySelectorAll("[data-simplebar]").forEach(function (e) {
											"init" !== e.getAttribute("data-simplebar") &&
												!i.instances.has(e) &&
												document.documentElement.contains(e) &&
												new i(e, F(e.attributes));
									  }));
						}),
							e.removedNodes.forEach(function (e) {
								1 === e.nodeType &&
									("init" === e.getAttribute("data-simplebar")
										? i.instances.has(e) &&
										  !document.documentElement.contains(e) &&
										  i.instances.get(e).unMount()
										: Array.prototype.forEach.call(
												e.querySelectorAll('[data-simplebar="init"]'),
												function (e) {
													i.instances.has(e) &&
														!document.documentElement.contains(e) &&
														i.instances.get(e).unMount();
												}
										  ));
							});
					});
				}),
				(i.instances = new WeakMap()),
				i
			);
		})(X);
	return t && $.initHtmlApi(), $;
})();
