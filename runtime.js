(()=>{
    "use strict";
    var e = {}
      , r = {};
    function n(t) {
        if (r[t])
            return r[t].exports;
        var o = r[t] = {
            id: t,
            loaded: !1,
            exports: {}
        };
        return e[t].call(o.exports, o, o.exports, n),
        o.loaded = !0,
        o.exports
    }
    n.m = e,
    n.x = e=>{}
    ,
    n.n = e=>{
        var r = e && e.__esModule ? ()=>e.default : ()=>e;
        return n.d(r, {
            a: r
        }),
        r
    }
    ,
    n.d = (e,r)=>{
        for (var t in r)
            n.o(r, t) && !n.o(e, t) && Object.defineProperty(e, t, {
                enumerable: !0,
                get: r[t]
            })
    }
    ,
    n.g = function() {
        if ("object" == typeof globalThis)
            return globalThis;
        try {
            return this || new Function("return this")()
        } catch (e) {
            if ("object" == typeof window)
                return window
        }
    }(),
    n.o = (e,r)=>Object.prototype.hasOwnProperty.call(e, r),
    n.nmd = e=>(e.paths = [],
    e.children || (e.children = []),
    e),
    (()=>{
        var e = {
            666: 0
        }
          , r = []
          , t = e=>{}
          , o = (o,l)=>{
            for (var i, a, [s,u,h,p] = l, f = 0, c = []; f < s.length; f++)
                a = s[f],
                n.o(e, a) && e[a] && c.push(e[a][0]),
                e[a] = 0;
            for (i in u)
                n.o(u, i) && (n.m[i] = u[i]);
            for (h && h(n),
            o && o(l); c.length; )
                c.shift()();
            return p && r.push.apply(r, p),
            t()
        }
          , l = self.webpackChunklegion_solver = self.webpackChunklegion_solver || [];
        function i() {
            for (var t, o = 0; o < r.length; o++) {
                for (var l = r[o], i = !0, a = 1; a < l.length; a++) {
                    var s = l[a];
                    0 !== e[s] && (i = !1)
                }
                i && (r.splice(o--, 1),
                t = n(n.s = l[0]))
            }
            return 0 === r.length && (n.x(),
            n.x = e=>{}
            ),
            t
        }
        l.forEach(o.bind(null, 0)),
        l.push = o.bind(null, l.push.bind(l));
        var a = n.x;
        n.x = ()=>(n.x = a || (e=>{}
        ),
        (t = i)())
    }
    )(),
    n.x()
}
)();
