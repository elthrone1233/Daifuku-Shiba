/**
 * (c) Iconify
 *
 * For the full copyright and license information, please view the license.txt
 * files at https://github.com/iconify/iconify
 *
 * Licensed under MIT.
 *
 * @license MIT
 * @version 2.1.0
 */
!(function () {
	"use strict";
	const t = Object.freeze({ left: 0, top: 0, width: 16, height: 16 }),
		e = Object.freeze({ rotate: 0, vFlip: !1, hFlip: !1 }),
		n = Object.freeze({ ...t, ...e }),
		i = Object.freeze({ ...n, body: "", hidden: !1 }),
		r = Object.freeze({ width: null, height: null }),
		o = Object.freeze({ ...r, ...e });
	const s = /[\s,]+/;
	const c = { ...o, preserveAspectRatio: "" };
	function a(t) {
		const e = { ...c },
			n = (e, n) => t.getAttribute(e) || n;
		var i;
		return (
			(e.width = n("width", null)),
			(e.height = n("height", null)),
			(e.rotate = (function (t, e = 0) {
				const n = t.replace(/^-?[0-9.]*/, "");
				function i(t) {
					for (; t < 0; ) t += 4;
					return t % 4;
				}
				if ("" === n) {
					const e = parseInt(t);
					return isNaN(e) ? 0 : i(e);
				}
				if (n !== t) {
					let e = 0;
					switch (n) {
						case "%":
							e = 25;
							break;
						case "deg":
							e = 90;
					}
					if (e) {
						let r = parseFloat(t.slice(0, t.length - n.length));
						return isNaN(r) ? 0 : ((r /= e), r % 1 == 0 ? i(r) : 0);
					}
				}
				return e;
			})(n("rotate", ""))),
			(i = e),
			n("flip", "")
				.split(s)
				.forEach((t) => {
					switch (t.trim()) {
						case "horizontal":
							i.hFlip = !0;
							break;
						case "vertical":
							i.vFlip = !0;
					}
				}),
			(e.preserveAspectRatio = n("preserveAspectRatio", n("preserveaspectratio", ""))),
			e
		);
	}
	const u = /^[a-z0-9]+(-[a-z0-9]+)*$/,
		l = (t, e, n, i = "") => {
			const r = t.split(":");
			if ("@" === t.slice(0, 1)) {
				if (r.length < 2 || r.length > 3) return null;
				i = r.shift().slice(1);
			}
			if (r.length > 3 || !r.length) return null;
			if (r.length > 1) {
				const t = r.pop(),
					n = r.pop(),
					o = { provider: r.length > 0 ? r[0] : i, prefix: n, name: t };
				return e && !f(o) ? null : o;
			}
			const o = r[0],
				s = o.split("-");
			if (s.length > 1) {
				const t = { provider: i, prefix: s.shift(), name: s.join("-") };
				return e && !f(t) ? null : t;
			}
			if (n && "" === i) {
				const t = { provider: i, prefix: "", name: o };
				return e && !f(t, n) ? null : t;
			}
			return null;
		},
		f = (t, e) =>
			!!t &&
			!(
				("" !== t.provider && !t.provider.match(u)) ||
				!((e && "" === t.prefix) || t.prefix.match(u)) ||
				!t.name.match(u)
			);
	function d(t, n) {
		const r = (function (t, e) {
			const n = {};
			!t.hFlip != !e.hFlip && (n.hFlip = !0), !t.vFlip != !e.vFlip && (n.vFlip = !0);
			const i = ((t.rotate || 0) + (e.rotate || 0)) % 4;
			return i && (n.rotate = i), n;
		})(t, n);
		for (const o in i)
			o in e ? o in t && !(o in r) && (r[o] = e[o]) : o in n ? (r[o] = n[o]) : o in t && (r[o] = t[o]);
		return r;
	}
	function h(t, e, n) {
		const i = t.icons,
			r = t.aliases || Object.create(null);
		let o = {};
		function s(t) {
			o = d(i[t] || r[t], o);
		}
		return s(e), n.forEach(s), d(t, o);
	}
	function p(t, e) {
		const n = [];
		if ("object" != typeof t || "object" != typeof t.icons) return n;
		t.not_found instanceof Array &&
			t.not_found.forEach((t) => {
				e(t, null), n.push(t);
			});
		const i = (function (t, e) {
			const n = t.icons,
				i = t.aliases || Object.create(null),
				r = Object.create(null);
			return (
				(e || Object.keys(n).concat(Object.keys(i))).forEach(function t(e) {
					if (n[e]) return (r[e] = []);
					if (!(e in r)) {
						r[e] = null;
						const n = i[e] && i[e].parent,
							o = n && t(n);
						o && (r[e] = [n].concat(o));
					}
					return r[e];
				}),
				r
			);
		})(t);
		for (const r in i) {
			const o = i[r];
			o && (e(r, h(t, r, o)), n.push(r));
		}
		return n;
	}
	const g = { provider: "", aliases: {}, not_found: {}, ...t };
	function b(t, e) {
		for (const n in e) if (n in t && typeof t[n] != typeof e[n]) return !1;
		return !0;
	}
	function v(t) {
		if ("object" != typeof t || null === t) return null;
		const e = t;
		if ("string" != typeof e.prefix || !t.icons || "object" != typeof t.icons) return null;
		if (!b(t, g)) return null;
		const n = e.icons;
		for (const t in n) {
			const e = n[t];
			if (!t.match(u) || "string" != typeof e.body || !b(e, i)) return null;
		}
		const r = e.aliases || Object.create(null);
		for (const t in r) {
			const e = r[t],
				o = e.parent;
			if (!t.match(u) || "string" != typeof o || (!n[o] && !r[o]) || !b(e, i)) return null;
		}
		return e;
	}
	const m = Object.create(null);
	function y(t, e) {
		const n = m[t] || (m[t] = Object.create(null));
		return (
			n[e] ||
			(n[e] = (function (t, e) {
				return { provider: t, prefix: e, icons: Object.create(null), missing: new Set() };
			})(t, e))
		);
	}
	function x(t, e) {
		return v(e)
			? p(e, (e, n) => {
					n ? (t.icons[e] = n) : t.missing.add(e);
			  })
			: [];
	}
	function w(t, e) {
		let n = [];
		return (
			("string" == typeof t ? [t] : Object.keys(m)).forEach((t) => {
				("string" == typeof t && "string" == typeof e ? [e] : Object.keys(m[t] || {})).forEach((e) => {
					const i = y(t, e);
					n = n.concat(Object.keys(i.icons).map((n) => ("" !== t ? "@" + t + ":" : "") + e + ":" + n));
				});
			}),
			n
		);
	}
	let _ = !1;
	function k(t) {
		return "boolean" == typeof t && (_ = t), _;
	}
	function j(t) {
		const e = "string" == typeof t ? l(t, !0, _) : t;
		if (e) {
			const t = y(e.provider, e.prefix),
				n = e.name;
			return t.icons[n] || (t.missing.has(n) ? null : void 0);
		}
	}
	function A(t, e) {
		const n = l(t, !0, _);
		if (!n) return !1;
		return (function (t, e, n) {
			try {
				if ("string" == typeof n.body) return (t.icons[e] = { ...n }), !0;
			} catch (t) {}
			return !1;
		})(y(n.provider, n.prefix), n.name, e);
	}
	function O(t, e) {
		if ("object" != typeof t) return !1;
		if (("string" != typeof e && (e = t.provider || ""), _ && !e && !t.prefix)) {
			let e = !1;
			return (
				v(t) &&
					((t.prefix = ""),
					p(t, (t, n) => {
						n && A(t, n) && (e = !0);
					})),
				e
			);
		}
		const n = t.prefix;
		if (!f({ provider: e, prefix: n, name: "a" })) return !1;
		return !!x(y(e, n), t);
	}
	function C(t) {
		return !!j(t);
	}
	function I(t) {
		const e = j(t);
		return e ? { ...n, ...e } : null;
	}
	function S(t, e) {
		t.forEach((t) => {
			const n = t.loaderCallbacks;
			n && (t.loaderCallbacks = n.filter((t) => t.id !== e));
		});
	}
	let E = 0;
	const M = Object.create(null);
	function T(t, e) {
		M[t] = e;
	}
	function F(t) {
		return M[t] || M[""];
	}
	var R = { resources: [], index: 0, timeout: 2e3, rotate: 750, random: !1, dataAfterTimeout: !1 };
	function L(t, e, n, i) {
		const r = t.resources.length,
			o = t.random ? Math.floor(Math.random() * r) : t.index;
		let s;
		if (t.random) {
			let e = t.resources.slice(0);
			for (s = []; e.length > 1; ) {
				const t = Math.floor(Math.random() * e.length);
				s.push(e[t]), (e = e.slice(0, t).concat(e.slice(t + 1)));
			}
			s = s.concat(e);
		} else s = t.resources.slice(o).concat(t.resources.slice(0, o));
		const c = Date.now();
		let a,
			u = "pending",
			l = 0,
			f = null,
			d = [],
			h = [];
		function p() {
			f && (clearTimeout(f), (f = null));
		}
		function g() {
			"pending" === u && (u = "aborted"),
				p(),
				d.forEach((t) => {
					"pending" === t.status && (t.status = "aborted");
				}),
				(d = []);
		}
		function b(t, e) {
			e && (h = []), "function" == typeof t && h.push(t);
		}
		function v() {
			(u = "failed"),
				h.forEach((t) => {
					t(void 0, a);
				});
		}
		function m() {
			d.forEach((t) => {
				"pending" === t.status && (t.status = "aborted");
			}),
				(d = []);
		}
		function y() {
			if ("pending" !== u) return;
			p();
			const i = s.shift();
			if (void 0 === i)
				return d.length
					? void (f = setTimeout(() => {
							p(), "pending" === u && (m(), v());
					  }, t.timeout))
					: void v();
			const r = {
				status: "pending",
				resource: i,
				callback: (e, n) => {
					!(function (e, n, i) {
						const r = "success" !== n;
						switch (((d = d.filter((t) => t !== e)), u)) {
							case "pending":
								break;
							case "failed":
								if (r || !t.dataAfterTimeout) return;
								break;
							default:
								return;
						}
						if ("abort" === n) return (a = i), void v();
						if (r) return (a = i), void (d.length || (s.length ? y() : v()));
						if ((p(), m(), !t.random)) {
							const n = t.resources.indexOf(e.resource);
							-1 !== n && n !== t.index && (t.index = n);
						}
						(u = "completed"),
							h.forEach((t) => {
								t(i);
							});
					})(r, e, n);
				},
			};
			d.push(r), l++, (f = setTimeout(y, t.rotate)), n(i, e, r.callback);
		}
		return (
			"function" == typeof i && h.push(i),
			setTimeout(y),
			function () {
				return {
					startTime: c,
					payload: e,
					status: u,
					queriesSent: l,
					queriesPending: d.length,
					subscribe: b,
					abort: g,
				};
			}
		);
	}
	function P(t) {
		const e = { ...R, ...t };
		let n = [];
		function i() {
			n = n.filter((t) => "pending" === t().status);
		}
		return {
			query: function (t, r, o) {
				const s = L(e, t, r, (t, e) => {
					i(), o && o(t, e);
				});
				return n.push(s), s;
			},
			find: function (t) {
				return n.find((e) => t(e)) || null;
			},
			setIndex: (t) => {
				e.index = t;
			},
			getIndex: () => e.index,
			cleanup: i,
		};
	}
	function N(t) {
		let e;
		if ("string" == typeof t.resources) e = [t.resources];
		else if (((e = t.resources), !(e instanceof Array && e.length))) return null;
		return {
			resources: e,
			path: t.path || "/",
			maxURL: t.maxURL || 500,
			rotate: t.rotate || 750,
			timeout: t.timeout || 5e3,
			random: !0 === t.random,
			index: t.index || 0,
			dataAfterTimeout: !1 !== t.dataAfterTimeout,
		};
	}
	const z = Object.create(null),
		Q = ["https://api.simplesvg.com", "https://api.unisvg.com"],
		q = [];
	for (; Q.length > 0; ) 1 === Q.length || Math.random() > 0.5 ? q.push(Q.shift()) : q.push(Q.pop());
	function D(t, e) {
		const n = N(e);
		return null !== n && ((z[t] = n), !0);
	}
	function U(t) {
		return z[t];
	}
	function H() {
		return Object.keys(z);
	}
	function J() {}
	z[""] = N({ resources: ["https://api.iconify.design"].concat(q) });
	const $ = Object.create(null);
	function B(t, e, n) {
		let i, r;
		if ("string" == typeof t) {
			const e = F(t);
			if (!e) return n(void 0, 424), J;
			r = e.send;
			const o = (function (t) {
				if (!$[t]) {
					const e = U(t);
					if (!e) return;
					const n = { config: e, redundancy: P(e) };
					$[t] = n;
				}
				return $[t];
			})(t);
			o && (i = o.redundancy);
		} else {
			const e = N(t);
			if (e) {
				i = P(e);
				const n = F(t.resources ? t.resources[0] : "");
				n && (r = n.send);
			}
		}
		return i && r ? i.query(e, r, n)().abort : (n(void 0, 424), J);
	}
	const G = "iconify2",
		V = "iconify",
		K = V + "-count",
		W = V + "-version",
		X = 36e5,
		Y = 168,
		Z = 50;
	function tt(t, e) {
		try {
			return t.getItem(e);
		} catch (t) {}
	}
	function et(t, e, n) {
		try {
			return t.setItem(e, n), !0;
		} catch (t) {}
	}
	function nt(t, e) {
		try {
			t.removeItem(e);
		} catch (t) {}
	}
	function it(t, e) {
		return et(t, K, e.toString());
	}
	function rt(t) {
		return parseInt(tt(t, K)) || 0;
	}
	const ot = { local: !0, session: !0 },
		st = { local: new Set(), session: new Set() };
	let ct = !1;
	let at = "undefined" == typeof window ? {} : window;
	function ut(t) {
		const e = t + "Storage";
		try {
			if (at && at[e] && "number" == typeof at[e].length) return at[e];
		} catch (t) {}
		ot[t] = !1;
	}
	function lt(t, e) {
		const n = ut(t);
		if (!n) return;
		const i = tt(n, W);
		if (i !== G) {
			if (i) {
				const t = rt(n);
				for (let e = 0; e < t; e++) nt(n, V + e.toString());
			}
			return et(n, W, G), void it(n, 0);
		}
		const r = Math.floor(Date.now() / X) - Y,
			o = (t) => {
				const i = V + t.toString(),
					o = tt(n, i);
				if ("string" == typeof o) {
					try {
						const n = JSON.parse(o);
						if (
							"object" == typeof n &&
							"number" == typeof n.cached &&
							n.cached > r &&
							"string" == typeof n.provider &&
							"object" == typeof n.data &&
							"string" == typeof n.data.prefix &&
							e(n, t)
						)
							return !0;
					} catch (t) {}
					nt(n, i);
				}
			};
		let s = rt(n);
		for (let e = s - 1; e >= 0; e--) o(e) || (e === s - 1 ? (s--, it(n, s)) : st[t].add(e));
	}
	function ft() {
		if (!ct) {
			ct = !0;
			for (const t in ot)
				lt(t, (t) => {
					const e = t.data,
						n = y(t.provider, e.prefix);
					if (!x(n, e).length) return !1;
					const i = e.lastModified || -1;
					return (n.lastModifiedCached = n.lastModifiedCached ? Math.min(n.lastModifiedCached, i) : i), !0;
				});
		}
	}
	function dt(t, e) {
		function n(n) {
			let i;
			if (!ot[n] || !(i = ut(n))) return;
			const r = st[n];
			let o;
			if (r.size) r.delete((o = Array.from(r).shift()));
			else if (((o = rt(i)), o >= Z || !it(i, o + 1))) return;
			const s = { cached: Math.floor(Date.now() / X), provider: t.provider, data: e };
			return et(i, V + o.toString(), JSON.stringify(s));
		}
		ct || ft(),
			(e.lastModified &&
				!(function (t, e) {
					const n = t.lastModifiedCached;
					if (n && n >= e) return n === e;
					if (((t.lastModifiedCached = e), n))
						for (const n in ot)
							lt(n, (n) => {
								const i = n.data;
								return n.provider !== t.provider || i.prefix !== t.prefix || i.lastModified === e;
							});
					return !0;
				})(t, e.lastModified)) ||
				(Object.keys(e.icons).length &&
					(e.not_found && delete (e = Object.assign({}, e)).not_found, n("local") || n("session")));
	}
	function ht() {}
	function pt(t) {
		t.iconsLoaderFlag ||
			((t.iconsLoaderFlag = !0),
			setTimeout(() => {
				(t.iconsLoaderFlag = !1),
					(function (t) {
						t.pendingCallbacksFlag ||
							((t.pendingCallbacksFlag = !0),
							setTimeout(() => {
								t.pendingCallbacksFlag = !1;
								const e = t.loaderCallbacks ? t.loaderCallbacks.slice(0) : [];
								if (!e.length) return;
								let n = !1;
								const i = t.provider,
									r = t.prefix;
								e.forEach((e) => {
									const o = e.icons,
										s = o.pending.length;
									(o.pending = o.pending.filter((e) => {
										if (e.prefix !== r) return !0;
										const s = e.name;
										if (t.icons[s]) o.loaded.push({ provider: i, prefix: r, name: s });
										else {
											if (!t.missing.has(s)) return (n = !0), !0;
											o.missing.push({ provider: i, prefix: r, name: s });
										}
										return !1;
									})),
										o.pending.length !== s &&
											(n || S([t], e.id),
											e.callback(
												o.loaded.slice(0),
												o.missing.slice(0),
												o.pending.slice(0),
												e.abort
											));
								});
							}));
					})(t);
			}));
	}
	const gt = (t, e) => {
			const n = (function (t, e = !0, n = !1) {
					const i = [];
					return (
						t.forEach((t) => {
							const r = "string" == typeof t ? l(t, e, n) : t;
							r && i.push(r);
						}),
						i
					);
				})(t, !0, k()),
				i = (function (t) {
					const e = { loaded: [], missing: [], pending: [] },
						n = Object.create(null);
					t.sort((t, e) =>
						t.provider !== e.provider
							? t.provider.localeCompare(e.provider)
							: t.prefix !== e.prefix
							? t.prefix.localeCompare(e.prefix)
							: t.name.localeCompare(e.name)
					);
					let i = { provider: "", prefix: "", name: "" };
					return (
						t.forEach((t) => {
							if (i.name === t.name && i.prefix === t.prefix && i.provider === t.provider) return;
							i = t;
							const r = t.provider,
								o = t.prefix,
								s = t.name,
								c = n[r] || (n[r] = Object.create(null)),
								a = c[o] || (c[o] = y(r, o));
							let u;
							u = s in a.icons ? e.loaded : "" === o || a.missing.has(s) ? e.missing : e.pending;
							const l = { provider: r, prefix: o, name: s };
							u.push(l);
						}),
						e
					);
				})(n);
			if (!i.pending.length) {
				let t = !0;
				return (
					e &&
						setTimeout(() => {
							t && e(i.loaded, i.missing, i.pending, ht);
						}),
					() => {
						t = !1;
					}
				);
			}
			const r = Object.create(null),
				o = [];
			let s, c;
			return (
				i.pending.forEach((t) => {
					const { provider: e, prefix: n } = t;
					if (n === c && e === s) return;
					(s = e), (c = n), o.push(y(e, n));
					const i = r[e] || (r[e] = Object.create(null));
					i[n] || (i[n] = []);
				}),
				i.pending.forEach((t) => {
					const { provider: e, prefix: n, name: i } = t,
						o = y(e, n),
						s = o.pendingIcons || (o.pendingIcons = new Set());
					s.has(i) || (s.add(i), r[e][n].push(i));
				}),
				o.forEach((t) => {
					const { provider: e, prefix: n } = t;
					r[e][n].length &&
						(function (t, e) {
							t.iconsToLoad ? (t.iconsToLoad = t.iconsToLoad.concat(e).sort()) : (t.iconsToLoad = e),
								t.iconsQueueFlag ||
									((t.iconsQueueFlag = !0),
									setTimeout(() => {
										t.iconsQueueFlag = !1;
										const { provider: e, prefix: n } = t,
											i = t.iconsToLoad;
										let r;
										delete t.iconsToLoad,
											i &&
												(r = F(e)) &&
												r.prepare(e, n, i).forEach((n) => {
													B(e, n, (e) => {
														if ("object" != typeof e)
															n.icons.forEach((e) => {
																t.missing.add(e);
															});
														else
															try {
																const n = x(t, e);
																if (!n.length) return;
																const i = t.pendingIcons;
																i &&
																	n.forEach((t) => {
																		i.delete(t);
																	}),
																	dt(t, e);
															} catch (t) {
																console.error(t);
															}
														pt(t);
													});
												});
									}));
						})(t, r[e][n]);
				}),
				e
					? (function (t, e, n) {
							const i = E++,
								r = S.bind(null, n, i);
							if (!e.pending.length) return r;
							const o = { id: i, icons: e, callback: t, abort: r };
							return (
								n.forEach((t) => {
									(t.loaderCallbacks || (t.loaderCallbacks = [])).push(o);
								}),
								r
							);
					  })(e, i, o)
					: ht
			);
		},
		bt = (t) =>
			new Promise((e, i) => {
				const r = "string" == typeof t ? l(t, !0) : t;
				r
					? gt([r || t], (o) => {
							if (o.length && r) {
								const t = j(r);
								if (t) return void e({ ...n, ...t });
							}
							i(t);
					  })
					: i(t);
			});
	function vt(t, e) {
		const n = "string" == typeof t ? l(t, !0, !0) : null;
		if (!n) {
			const e = (function (t) {
				try {
					const e = "string" == typeof t ? JSON.parse(t) : t;
					if ("string" == typeof e.body) return { ...e };
				} catch (t) {}
			})(t);
			return { value: t, data: e };
		}
		const i = j(n);
		if (void 0 !== i || !n.prefix) return { value: t, name: n, data: i };
		const r = gt([n], () => e(t, n, j(n)));
		return { value: t, name: n, loading: r };
	}
	let mt = !1;
	try {
		mt = 0 === navigator.vendor.indexOf("Apple");
	} catch (t) {}
	const yt = /(-?[0-9.]*[0-9]+[0-9.]*)/g,
		xt = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
	function wt(t, e, n) {
		if (1 === e) return t;
		if (((n = n || 100), "number" == typeof t)) return Math.ceil(t * e * n) / n;
		if ("string" != typeof t) return t;
		const i = t.split(yt);
		if (null === i || !i.length) return t;
		const r = [];
		let o = i.shift(),
			s = xt.test(o);
		for (;;) {
			if (s) {
				const t = parseFloat(o);
				isNaN(t) ? r.push(o) : r.push(Math.ceil(t * e * n) / n);
			} else r.push(o);
			if (((o = i.shift()), void 0 === o)) return r.join("");
			s = !s;
		}
	}
	const _t = (t) => "unset" === t || "undefined" === t || "none" === t;
	function kt(t, e) {
		const i = { ...n, ...t },
			r = { ...o, ...e },
			s = { left: i.left, top: i.top, width: i.width, height: i.height };
		let c = i.body;
		[i, r].forEach((t) => {
			const e = [],
				n = t.hFlip,
				i = t.vFlip;
			let r,
				o = t.rotate;
			switch (
				(n
					? i
						? (o += 2)
						: (e.push("translate(" + (s.width + s.left).toString() + " " + (0 - s.top).toString() + ")"),
						  e.push("scale(-1 1)"),
						  (s.top = s.left = 0))
					: i &&
					  (e.push("translate(" + (0 - s.left).toString() + " " + (s.height + s.top).toString() + ")"),
					  e.push("scale(1 -1)"),
					  (s.top = s.left = 0)),
				o < 0 && (o -= 4 * Math.floor(o / 4)),
				(o %= 4),
				o)
			) {
				case 1:
					(r = s.height / 2 + s.top), e.unshift("rotate(90 " + r.toString() + " " + r.toString() + ")");
					break;
				case 2:
					e.unshift(
						"rotate(180 " +
							(s.width / 2 + s.left).toString() +
							" " +
							(s.height / 2 + s.top).toString() +
							")"
					);
					break;
				case 3:
					(r = s.width / 2 + s.left), e.unshift("rotate(-90 " + r.toString() + " " + r.toString() + ")");
			}
			o % 2 == 1 &&
				(s.left !== s.top && ((r = s.left), (s.left = s.top), (s.top = r)),
				s.width !== s.height && ((r = s.width), (s.width = s.height), (s.height = r))),
				e.length &&
					(c = (function (t, e, n) {
						const i = (function (t, e = "defs") {
							let n = "";
							const i = t.indexOf("<" + e);
							for (; i >= 0; ) {
								const r = t.indexOf(">", i),
									o = t.indexOf("</" + e);
								if (-1 === r || -1 === o) break;
								const s = t.indexOf(">", o);
								if (-1 === s) break;
								(n += t.slice(r + 1, o).trim()), (t = t.slice(0, i).trim() + t.slice(s + 1));
							}
							return { defs: n, content: t };
						})(t);
						return (r = i.defs), (o = e + i.content + n), r ? "<defs>" + r + "</defs>" + o : o;
						var r, o;
					})(c, '<g transform="' + e.join(" ") + '">', "</g>"));
		});
		const a = r.width,
			u = r.height,
			l = s.width,
			f = s.height;
		let d, h;
		null === a
			? ((h = null === u ? "1em" : "auto" === u ? f : u), (d = wt(h, l / f)))
			: ((d = "auto" === a ? l : a), (h = null === u ? wt(d, f / l) : "auto" === u ? f : u));
		const p = {},
			g = (t, e) => {
				_t(e) || (p[t] = e.toString());
			};
		g("width", d), g("height", h);
		const b = [s.left, s.top, l, f];
		return (p.viewBox = b.join(" ")), { attributes: p, viewBox: b, body: c };
	}
	function jt(t, e) {
		let n = -1 === t.indexOf("xlink:") ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
		for (const t in e) n += " " + t + '="' + e[t] + '"';
		return '<svg xmlns="http://www.w3.org/2000/svg"' + n + ">" + t + "</svg>";
	}
	function At(t) {
		return (
			'url("' +
			(function (t) {
				return (
					"data:image/svg+xml," +
					(function (t) {
						return t
							.replace(/"/g, "'")
							.replace(/%/g, "%25")
							.replace(/#/g, "%23")
							.replace(/</g, "%3C")
							.replace(/>/g, "%3E")
							.replace(/\s+/g, " ");
					})(t)
				);
			})(t) +
			'")'
		);
	}
	let Ot = (() => {
		let t;
		try {
			if (((t = fetch), "function" == typeof t)) return t;
		} catch (t) {}
	})();
	function Ct(t) {
		Ot = t;
	}
	function It() {
		return Ot;
	}
	const St = {
		prepare: (t, e, n) => {
			const i = [],
				r = (function (t, e) {
					const n = U(t);
					if (!n) return 0;
					let i;
					if (n.maxURL) {
						let t = 0;
						n.resources.forEach((e) => {
							const n = e;
							t = Math.max(t, n.length);
						});
						const r = e + ".json?icons=";
						i = n.maxURL - t - n.path.length - r.length;
					} else i = 0;
					return i;
				})(t, e),
				o = "icons";
			let s = { type: o, provider: t, prefix: e, icons: [] },
				c = 0;
			return (
				n.forEach((n, a) => {
					(c += n.length + 1),
						c >= r &&
							a > 0 &&
							(i.push(s), (s = { type: o, provider: t, prefix: e, icons: [] }), (c = n.length)),
						s.icons.push(n);
				}),
				i.push(s),
				i
			);
		},
		send: (t, e, n) => {
			if (!Ot) return void n("abort", 424);
			let i = (function (t) {
				if ("string" == typeof t) {
					const e = U(t);
					if (e) return e.path;
				}
				return "/";
			})(e.provider);
			switch (e.type) {
				case "icons": {
					const t = e.prefix,
						n = e.icons.join(",");
					i += t + ".json?" + new URLSearchParams({ icons: n }).toString();
					break;
				}
				case "custom": {
					const t = e.uri;
					i += "/" === t.slice(0, 1) ? t.slice(1) : t;
					break;
				}
				default:
					return void n("abort", 400);
			}
			let r = 503;
			Ot(t + i)
				.then((t) => {
					const e = t.status;
					if (200 === e) return (r = 501), t.json();
					setTimeout(() => {
						n(
							(function (t) {
								return 404 === t;
							})(e)
								? "abort"
								: "next",
							e
						);
					});
				})
				.then((t) => {
					"object" == typeof t && null !== t
						? setTimeout(() => {
								n("success", t);
						  })
						: setTimeout(() => {
								404 === t ? n("abort", t) : n("next", r);
						  });
				})
				.catch(() => {
					n("next", r);
				});
		},
	};
	function Et(t, e) {
		switch (t) {
			case "local":
			case "session":
				ot[t] = e;
				break;
			case "all":
				for (const t in ot) ot[t] = e;
		}
	}
	const Mt = "data-style";
	let Tt = "";
	function Ft(t) {
		Tt = t;
	}
	function Rt(t, e) {
		let n = Array.from(t.childNodes).find((t) => t.hasAttribute && t.hasAttribute(Mt));
		n || ((n = document.createElement("style")), n.setAttribute(Mt, Mt), t.appendChild(n)),
			(n.textContent =
				":host{display:inline-block;vertical-align:" +
				(e ? "-0.125em" : "0") +
				"}span,svg{display:block}" +
				Tt);
	}
	const Lt = { "background-color": "currentColor" },
		Pt = { "background-color": "transparent" },
		Nt = { image: "var(--svg)", repeat: "no-repeat", size: "100% 100%" },
		zt = { "-webkit-mask": Lt, mask: Lt, background: Pt };
	for (const t in zt) {
		const e = zt[t];
		for (const n in Nt) e[t + "-" + n] = Nt[n];
	}
	function Qt(t) {
		return t ? t + (t.match(/^[-0-9.]+$/) ? "px" : "") : "inherit";
	}
	let qt;
	function Dt(t) {
		return (
			void 0 === qt &&
				(function () {
					try {
						qt = window.trustedTypes.createPolicy("iconify", { createHTML: (t) => t });
					} catch (t) {
						qt = null;
					}
				})(),
			qt ? qt.createHTML(t) : t
		);
	}
	function Ut(t) {
		return Array.from(t.childNodes).find((t) => {
			const e = t.tagName && t.tagName.toUpperCase();
			return "SPAN" === e || "SVG" === e;
		});
	}
	function Ht(t, e) {
		const i = e.icon.data,
			r = e.customisations,
			o = kt(i, r);
		r.preserveAspectRatio && (o.attributes.preserveAspectRatio = r.preserveAspectRatio);
		const s = e.renderedMode;
		let c;
		if ("svg" === s)
			c = (function (t) {
				const e = document.createElement("span"),
					n = t.attributes;
				let i = "";
				n.width || (i = "width: inherit;"), n.height || (i += "height: inherit;"), i && (n.style = i);
				const r = jt(t.body, n);
				return (e.innerHTML = Dt(r)), e.firstChild;
			})(o);
		else
			c = (function (t, e, n) {
				const i = document.createElement("span");
				let r = t.body;
				-1 !== r.indexOf("<a") && (r += "\x3c!-- " + Date.now() + " --\x3e");
				const o = t.attributes,
					s = At(jt(r, { ...o, width: e.width + "", height: e.height + "" })),
					c = i.style,
					a = { "--svg": s, width: Qt(o.width), height: Qt(o.height), ...(n ? Lt : Pt) };
				for (const t in a) c.setProperty(t, a[t]);
				return i;
			})(o, { ...n, ...i }, "mask" === s);
		const a = Ut(t);
		a
			? "SPAN" === c.tagName && a.tagName === c.tagName
				? a.setAttribute("style", c.getAttribute("style"))
				: t.replaceChild(c, a)
			: t.appendChild(c);
	}
	function Jt(t, e, n) {
		return { rendered: !1, inline: e, icon: t, lastRender: n && (n.rendered ? n : n.lastRender) };
	}
	!(function (t = "iconify-icon") {
		let e, n;
		try {
			(e = window.customElements), (n = window.HTMLElement);
		} catch (t) {
			return;
		}
		if (!e || !n) return;
		const i = e.get(t);
		if (i) return i;
		const r = ["icon", "mode", "inline", "noobserver", "width", "height", "rotate", "flip"],
			o = class extends n {
				_shadowRoot;
				_initialised = !1;
				_state;
				_checkQueued = !1;
				_connected = !1;
				_observer = null;
				_visible = !0;
				constructor() {
					super();
					const t = (this._shadowRoot = this.attachShadow({ mode: "open" })),
						e = this.hasAttribute("inline");
					Rt(t, e), (this._state = Jt({ value: "" }, e)), this._queueCheck();
				}
				connectedCallback() {
					(this._connected = !0), this.startObserver();
				}
				disconnectedCallback() {
					(this._connected = !1), this.stopObserver();
				}
				static get observedAttributes() {
					return r.slice(0);
				}
				attributeChangedCallback(t) {
					switch (t) {
						case "inline": {
							const t = this.hasAttribute("inline"),
								e = this._state;
							t !== e.inline && ((e.inline = t), Rt(this._shadowRoot, t));
							break;
						}
						case "noobserver":
							this.hasAttribute("noobserver") ? this.startObserver() : this.stopObserver();
							break;
						default:
							this._queueCheck();
					}
				}
				get icon() {
					const t = this.getAttribute("icon");
					if (t && "{" === t.slice(0, 1))
						try {
							return JSON.parse(t);
						} catch (t) {}
					return t;
				}
				set icon(t) {
					"object" == typeof t && (t = JSON.stringify(t)), this.setAttribute("icon", t);
				}
				get inline() {
					return this.hasAttribute("inline");
				}
				set inline(t) {
					t ? this.setAttribute("inline", "true") : this.removeAttribute("inline");
				}
				get observer() {
					return this.hasAttribute("observer");
				}
				set observer(t) {
					t ? this.setAttribute("observer", "true") : this.removeAttribute("observer");
				}
				restartAnimation() {
					const t = this._state;
					if (t.rendered) {
						const e = this._shadowRoot;
						if ("svg" === t.renderedMode)
							try {
								return void e.lastChild.setCurrentTime(0);
							} catch (t) {}
						Ht(e, t);
					}
				}
				get status() {
					const t = this._state;
					return t.rendered ? "rendered" : null === t.icon.data ? "failed" : "loading";
				}
				_queueCheck() {
					this._checkQueued ||
						((this._checkQueued = !0),
						setTimeout(() => {
							this._check();
						}));
				}
				_check() {
					if (!this._checkQueued) return;
					this._checkQueued = !1;
					const t = this._state,
						e = this.getAttribute("icon");
					if (e !== t.icon.value) return void this._iconChanged(e);
					if (!t.rendered || !this._visible) return;
					const n = this.getAttribute("mode"),
						i = a(this);
					(t.attrMode === n &&
						!(function (t, e) {
							for (const n in c) if (t[n] !== e[n]) return !0;
							return !1;
						})(t.customisations, i) &&
						Ut(this._shadowRoot)) ||
						this._renderIcon(t.icon, i, n);
				}
				_iconChanged(t) {
					const e = vt(t, (t, e, n) => {
						const i = this._state;
						if (i.rendered || this.getAttribute("icon") !== t) return;
						const r = { value: t, name: e, data: n };
						r.data ? this._gotIconData(r) : (i.icon = r);
					});
					e.data ? this._gotIconData(e) : (this._state = Jt(e, this._state.inline, this._state));
				}
				_forceRender() {
					if (this._visible) this._queueCheck();
					else {
						const t = Ut(this._shadowRoot);
						t && this._shadowRoot.removeChild(t);
					}
				}
				_gotIconData(t) {
					(this._checkQueued = !1), this._renderIcon(t, a(this), this.getAttribute("mode"));
				}
				_renderIcon(t, e, n) {
					const i = (function (t, e) {
							switch (e) {
								case "svg":
								case "bg":
								case "mask":
									return e;
							}
							return "style" === e || (!mt && -1 !== t.indexOf("<a"))
								? -1 === t.indexOf("currentColor")
									? "bg"
									: "mask"
								: "svg";
						})(t.data.body, n),
						r = this._state.inline;
					Ht(
						this._shadowRoot,
						(this._state = {
							rendered: !0,
							icon: t,
							inline: r,
							customisations: e,
							attrMode: n,
							renderedMode: i,
						})
					);
				}
				startObserver() {
					if (!this._observer && !this.hasAttribute("noobserver"))
						try {
							(this._observer = new IntersectionObserver((t) => {
								const e = t.some((t) => t.isIntersecting);
								e !== this._visible && ((this._visible = e), this._forceRender());
							})),
								this._observer.observe(this);
						} catch (t) {
							if (this._observer) {
								try {
									this._observer.disconnect();
								} catch (t) {}
								this._observer = null;
							}
						}
				}
				stopObserver() {
					this._observer &&
						(this._observer.disconnect(),
						(this._observer = null),
						(this._visible = !0),
						this._connected && this._forceRender());
				}
			};
		r.forEach((t) => {
			t in o.prototype ||
				Object.defineProperty(o.prototype, t, {
					get: function () {
						return this.getAttribute(t);
					},
					set: function (e) {
						null !== e ? this.setAttribute(t, e) : this.removeAttribute(t);
					},
				});
		});
		const s = (function () {
			let t;
			T("", St), k(!0);
			try {
				t = window;
			} catch (t) {}
			if (t) {
				if ((ft(), void 0 !== t.IconifyPreload)) {
					const e = t.IconifyPreload,
						n = "Invalid IconifyPreload syntax.";
					"object" == typeof e &&
						null !== e &&
						(e instanceof Array ? e : [e]).forEach((t) => {
							try {
								("object" != typeof t ||
									null === t ||
									t instanceof Array ||
									"object" != typeof t.icons ||
									"string" != typeof t.prefix ||
									!O(t)) &&
									console.error(n);
							} catch (t) {
								console.error(n);
							}
						});
				}
				if (void 0 !== t.IconifyProviders) {
					const e = t.IconifyProviders;
					if ("object" == typeof e && null !== e)
						for (const t in e) {
							const n = "IconifyProviders[" + t + "] is invalid.";
							try {
								const i = e[t];
								if ("object" != typeof i || !i || void 0 === i.resources) continue;
								D(t, i) || console.error(n);
							} catch (t) {
								console.error(n);
							}
						}
				}
			}
			return {
				enableCache: (t) => Et(t, !0),
				disableCache: (t) => Et(t, !1),
				iconLoaded: C,
				iconExists: C,
				getIcon: I,
				listIcons: w,
				addIcon: A,
				addCollection: O,
				calculateSize: wt,
				buildIcon: kt,
				iconToHTML: jt,
				svgToURL: At,
				loadIcons: gt,
				loadIcon: bt,
				addAPIProvider: D,
				appendCustomStyle: Ft,
				_api: {
					getAPIConfig: U,
					setAPIModule: T,
					sendAPIQuery: B,
					setFetch: Ct,
					getFetch: It,
					listAPIProviders: H,
				},
			};
		})();
		for (const t in s) o[t] = o.prototype[t] = s[t];
		e.define(t, o);
	})();
})();
