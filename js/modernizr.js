/*!
 * Modernizr v2.5.3
 * www.modernizr.com
 *
 * Copyright (c) Faruk Ates, Paul Irish, Alex Sexton
 * Available under the BSD and MIT licenses: www.modernizr.com/license/
 */ window.Modernizr = (function (e, t, n) {
  var r,
    o,
    i,
    a,
    c,
    s,
    u,
    l = {},
    d = t.documentElement,
    f = "modernizr",
    p = t.createElement(f),
    m = p.style,
    h = t.createElement("input"),
    g = {}.toString,
    v = " -webkit- -moz- -o- -ms- ".split(" "),
    y = "Webkit Moz O ms",
    b = y.split(" "),
    x = y.toLowerCase().split(" "),
    C = { svg: "http://www.w3.org/2000/svg" },
    E = {},
    w = {},
    $ = {},
    k = [],
    S = k.slice,
    _ = function (e, n, r, o) {
      var i,
        a,
        c,
        s = t.createElement("div"),
        u = t.body,
        l = u || t.createElement("body");
      if (parseInt(r, 10))
        for (; r--; )
          ((c = t.createElement("div")).id = o ? o[r] : f + (r + 1)),
            s.appendChild(c);
      return (
        (i = ["&#173;", "<style>", e, "</style>"].join("")),
        (s.id = f),
        (l.innerHTML += i),
        l.appendChild(s),
        u || ((l.style.background = ""), d.appendChild(l)),
        (a = n(s, e)),
        u ? s.parentNode.removeChild(s) : l.parentNode.removeChild(l),
        !!a
      );
    },
    T = function (t) {
      var n,
        r = e.matchMedia || e.msMatchMedia;
      return r
        ? r(t).matches
        : (_(
            "@media " + t + " { #" + f + " { position: absolute; } }",
            function (t) {
              n =
                "absolute" ==
                (e.getComputedStyle
                  ? getComputedStyle(t, null)
                  : t.currentStyle
                ).position;
            }
          ),
          n);
    },
    N =
      ((c = {
        select: "input",
        change: "input",
        submit: "form",
        reset: "form",
        error: "img",
        load: "img",
        abort: "img",
      }),
      function e(r, o) {
        o = o || t.createElement(c[r] || "div");
        var i = (r = "on" + r) in o;
        return (
          !i &&
            (o.setAttribute || (o = t.createElement("div")),
            o.setAttribute &&
              o.removeAttribute &&
              (o.setAttribute(r, ""),
              (i = j(o[r], "function")),
              j(o[r], "undefined") || (o[r] = n),
              o.removeAttribute(r))),
          (o = null),
          i
        );
      }),
    P = {}.hasOwnProperty;
  function M(e) {
    m.cssText = e;
  }
  function j(e, t) {
    return typeof e === t;
  }
  function A(e, t) {
    return !!~("" + e).indexOf(t);
  }
  function D(e, t) {
    for (var r in e) if (n !== m[e[r]]) return "pfx" != t || e[r];
    return !1;
  }
  function L(e, t, r) {
    var o = e.charAt(0).toUpperCase() + e.substr(1),
      i = (e + " " + b.join(o + " ") + o).split(" ");
    return j(t, "string") || j(t, "undefined")
      ? D(i, t)
      : (function e(t, r, o) {
          for (var i in t) {
            var a = r[t[i]];
            if (a !== n) {
              if (!1 === o) return t[i];
              if (j(a, "function")) return a.bind(o || r);
              return a;
            }
          }
          return !1;
        })((i = (e + " " + x.join(o + " ") + o).split(" ")), t, r);
  }
  for (var z in ((u =
    j(P, "undefined") || j(P.call, "undefined")
      ? function (e, t) {
          return t in e && j(e.constructor.prototype[t], "undefined");
        }
      : function (e, t) {
          return P.call(e, t);
        }),
  Function.prototype.bind ||
    (Function.prototype.bind = function e(t) {
      var n = this;
      if ("function" != typeof n) throw TypeError();
      var r = S.call(arguments, 1),
        o = function () {
          if (!(this instanceof o))
            return n.apply(t, r.concat(S.call(arguments)));
          var e = function () {};
          e.prototype = n.prototype;
          var i = new e(),
            a = n.apply(i, r.concat(S.call(arguments)));
          return Object(a) === a ? a : i;
        };
      return o;
    }),
  (r = [
    '@font-face {font-family:"font";src:url("https://")}',
    [
      "@media (",
      v.join("touch-enabled),("),
      f,
      ")",
      "{#touch{top:9px;position:absolute}}",
    ].join(""),
    [
      "@media (",
      v.join("transform-3d),("),
      f,
      ")",
      "{#csstransforms3d{left:9px;position:absolute;height:3px;}}",
    ].join(""),
    '#generatedcontent:after{content:":)";visibility:hidden}',
  ]),
  (o = ["fontface", "touch", "csstransforms3d", "generatedcontent"]),
  (i = r.join("")),
  _(
    i,
    function (n, r) {
      for (
        var o = t.styleSheets[t.styleSheets.length - 1],
          i = o
            ? o.cssRules && o.cssRules[0]
              ? o.cssRules[0].cssText
              : o.cssText || ""
            : "",
          c = n.childNodes,
          s = {};
        a--;

      )
        s[c[a].id] = c[a];
      (l.touch =
        "ontouchstart" in e ||
        (e.DocumentTouch && t instanceof DocumentTouch) ||
        9 === (s.touch && s.touch.offsetTop)),
        (l.csstransforms3d =
          9 === (s.csstransforms3d && s.csstransforms3d.offsetLeft) &&
          3 === s.csstransforms3d.offsetHeight),
        (l.generatedcontent =
          (s.generatedcontent && s.generatedcontent.offsetHeight) >= 1),
        (l.fontface = /src/i.test(i) && 0 === i.indexOf(r.split(" ")[0]));
    },
    (a = o.length),
    o
  ),
  (E.flexbox = function () {
    return L("flexOrder");
  }),
  (E["flexbox-legacy"] = function () {
    return L("boxDirection");
  }),
  (E.canvas = function () {
    var e = t.createElement("canvas");
    return !!(e.getContext && e.getContext("2d"));
  }),
  (E.canvastext = function () {
    return !!(
      l.canvas &&
      j(t.createElement("canvas").getContext("2d").fillText, "function")
    );
  }),
  (E.webgl = function () {
    try {
      var r,
        o = t.createElement("canvas");
      (r = !!(
        e.WebGLRenderingContext &&
        (o.getContext("experimental-webgl") || o.getContext("webgl"))
      )),
        (o = n);
    } catch (i) {
      r = !1;
    }
    return r;
  }),
  (E.touch = function () {
    return l.touch;
  }),
  (E.geolocation = function () {
    return !!navigator.geolocation;
  }),
  (E.postmessage = function () {
    return !!e.postMessage;
  }),
  (E.websqldatabase = function () {
    return !!e.openDatabase;
  }),
  (E.indexedDB = function () {
    return !!L("indexedDB", e);
  }),
  (E.hashchange = function () {
    return N("hashchange", e) && (n === t.documentMode || t.documentMode > 7);
  }),
  (E.history = function () {
    return !!(e.history && history.pushState);
  }),
  (E.draganddrop = function () {
    var e = t.createElement("div");
    return "draggable" in e || ("ondragstart" in e && "ondrop" in e);
  }),
  (E.websockets = function () {
    for (var t = -1, n = b.length; ++t < n; )
      if (e[b[t] + "WebSocket"]) return !0;
    return "WebSocket" in e;
  }),
  (E.rgba = function () {
    return (
      M("background-color:rgba(150,255,150,.5)"), A(m.backgroundColor, "rgba")
    );
  }),
  (E.hsla = function () {
    return (
      M("background-color:hsla(120,40%,100%,.5)"),
      A(m.backgroundColor, "rgba") || A(m.backgroundColor, "hsla")
    );
  }),
  (E.multiplebgs = function () {
    return (
      M("background:url(https://),url(https://),red url(https://)"),
      /(url\s*\(.*?){3}/.test(m.background)
    );
  }),
  (E.backgroundsize = function () {
    return L("backgroundSize");
  }),
  (E.borderimage = function () {
    return L("borderImage");
  }),
  (E.borderradius = function () {
    return L("borderRadius");
  }),
  (E.boxshadow = function () {
    return L("boxShadow");
  }),
  (E.textshadow = function () {
    return "" === t.createElement("div").style.textShadow;
  }),
  (E.opacity = function () {
    return M(v.join("opacity:.55;") + ""), /^0.55$/.test(m.opacity);
  }),
  (E.cssanimations = function () {
    return L("animationName");
  }),
  (E.csscolumns = function () {
    return L("columnCount");
  }),
  (E.cssgradients = function () {
    var e = "background-image:";
    return (
      M(
        (
          e +
          "-webkit- "
            .split(" ")
            .join(
              "gradient(linear,left top,right bottom,from(#9f9),to(white));" + e
            ) +
          v.join("linear-gradient(left top,#9f9, white);" + e)
        ).slice(0, -e.length)
      ),
      A(m.backgroundImage, "gradient")
    );
  }),
  (E.cssreflections = function () {
    return L("boxReflect");
  }),
  (E.csstransforms = function () {
    return !!L("transform");
  }),
  (E.csstransforms3d = function () {
    var e = !!L("perspective");
    return e && "webkitPerspective" in d.style && (e = l.csstransforms3d), e;
  }),
  (E.csstransitions = function () {
    return L("transition");
  }),
  (E.fontface = function () {
    return l.fontface;
  }),
  (E.generatedcontent = function () {
    return l.generatedcontent;
  }),
  (E.video = function () {
    var e = t.createElement("video"),
      n = !1;
    try {
      (n = !!e.canPlayType) &&
        (((n = new Boolean(n)).ogg = e
          .canPlayType('video/ogg; codecs="theora"')
          .replace(/^no$/, "")),
        (n.h264 = e
          .canPlayType('video/mp4; codecs="avc1.42E01E"')
          .replace(/^no$/, "")),
        (n.webm = e
          .canPlayType('video/webm; codecs="vp8, vorbis"')
          .replace(/^no$/, "")));
    } catch (r) {}
    return n;
  }),
  (E.audio = function () {
    var e = t.createElement("audio"),
      n = !1;
    try {
      (n = !!e.canPlayType) &&
        (((n = new Boolean(n)).ogg = e
          .canPlayType('audio/ogg; codecs="vorbis"')
          .replace(/^no$/, "")),
        (n.mp3 = e.canPlayType("audio/mpeg;").replace(/^no$/, "")),
        (n.wav = e.canPlayType('audio/wav; codecs="1"').replace(/^no$/, "")),
        (n.m4a = (
          e.canPlayType("audio/x-m4a;") || e.canPlayType("audio/aac;")
        ).replace(/^no$/, "")));
    } catch (r) {}
    return n;
  }),
  (E.localstorage = function () {
    try {
      return localStorage.setItem(f, f), localStorage.removeItem(f), !0;
    } catch (e) {
      return !1;
    }
  }),
  (E.sessionstorage = function () {
    try {
      return sessionStorage.setItem(f, f), sessionStorage.removeItem(f), !0;
    } catch (e) {
      return !1;
    }
  }),
  (E.webworkers = function () {
    return !!e.Worker;
  }),
  (E.applicationcache = function () {
    return !!e.applicationCache;
  }),
  (E.svg = function () {
    return (
      !!t.createElementNS && !!t.createElementNS(C.svg, "svg").createSVGRect
    );
  }),
  (E.inlinesvg = function () {
    var e = t.createElement("div");
    return (
      (e.innerHTML = "<svg/>"),
      (e.firstChild && e.firstChild.namespaceURI) == C.svg
    );
  }),
  (E.smil = function () {
    return (
      !!t.createElementNS &&
      /SVGAnimate/.test(g.call(t.createElementNS(C.svg, "animate")))
    );
  }),
  (E.svgclippaths = function () {
    return (
      !!t.createElementNS &&
      /SVGClipPath/.test(g.call(t.createElementNS(C.svg, "clipPath")))
    );
  }),
  E))
    u(E, z) &&
      ((l[(s = z.toLowerCase())] = E[z]()), k.push((l[s] ? "" : "no-") + s));
  return (
    l.input ||
      ((l.input = (function (n) {
        for (var r = 0, o = n.length; r < o; r++) $[n[r]] = n[r] in h;
        return (
          $.list &&
            ($.list = !!(t.createElement("datalist") && e.HTMLDataListElement)),
          $
        );
      })(
        "autocomplete autofocus list placeholder max min multiple pattern required step".split(
          " "
        )
      )),
      (l.inputtypes = (function (e) {
        for (var r, o, i, a = 0, c = e.length; a < c; a++)
          h.setAttribute("type", (o = e[a])),
            (r = "text" !== h.type) &&
              ((h.value = ":)"),
              (h.style.cssText = "position:absolute;visibility:hidden;"),
              /^range$/.test(o) && n !== h.style.WebkitAppearance
                ? (d.appendChild(h),
                  (r =
                    (i = t.defaultView).getComputedStyle &&
                    "textfield" !==
                      i.getComputedStyle(h, null).WebkitAppearance &&
                    0 !== h.offsetHeight),
                  d.removeChild(h))
                : /^(search|tel)$/.test(o) ||
                  (/^(url|email)$/.test(o)
                    ? (r = h.checkValidity && !1 === h.checkValidity())
                    : /^color$/.test(o)
                    ? (d.appendChild(h),
                      d.offsetWidth,
                      (r = ":)" != h.value),
                      d.removeChild(h))
                    : (r = ":)" != h.value))),
            (w[e[a]] = !!r);
        return w;
      })(
        "search tel url email datetime date month week time datetime-local number range color".split(
          " "
        )
      ))),
    (l.addTest = function (e, t) {
      if ("object" == typeof e) for (var r in e) u(e, r) && l.addTest(r, e[r]);
      else {
        if (n !== l[(e = e.toLowerCase())]) return l;
        (t = "function" == typeof t ? t() : t),
          (d.className += " " + (t ? "" : "no-") + e),
          (l[e] = t);
      }
      return l;
    }),
    M(""),
    (p = h = null),
    !(
      /*! HTML5 Shiv v3.4 | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed */ (function (
        e,
        t
      ) {
        var n,
          r,
          o,
          i = e.html5 || {},
          a = /^<|^(?:button|form|map|select|textarea)$/i;
        function c(e) {
          if (e.documentShived) return e;
          if (s.shivCSS && !n) {
            var t, o, i, c, u, l, d, f, p;
            l =
              ((f = (d = e).createElement("p")),
              (p = d.getElementsByTagName("head")[0] || d.documentElement),
              (f.innerHTML =
                "x<style>article,aside,details,figcaption,figure,footer,header,hgroup,nav,section{display:block}audio{display:none}canvas,video{display:inline-block;*display:inline;*zoom:1}[hidden]{display:none}audio[controls]{display:inline-block;*display:inline;*zoom:1}mark{background:#FF0;color:#000}</style>"),
              !!p.insertBefore(f.lastChild, p.firstChild));
          }
          return (
            !r &&
              (l =
                ((o = {}),
                (i = (t = e).createElement),
                (c = (0, t.createDocumentFragment)()),
                (t.createElement = function (e) {
                  var t = (o[e] || (o[e] = i(e))).cloneNode();
                  return s.shivMethods && t.canHaveChildren && !a.test(e)
                    ? c.appendChild(t)
                    : t;
                }),
                (t.createDocumentFragment = Function(
                  "h,f",
                  "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" +
                    ("string" == typeof (u = s.elements) ? u.split(" ") : u)
                      .join()
                      .replace(/\w+/g, function (e) {
                        return (
                          (o[e] = i(e)), c.createElement(e), 'c("' + e + '")'
                        );
                      }) +
                    ");return n}"
                )(s, c)),
                !0)),
            l && (e.documentShived = l),
            e
          );
        }
        ((o = t.createElement("a")).innerHTML = "<xyz></xyz>"),
          (n = "hidden" in o),
          (r =
            1 == o.childNodes.length ||
            (function () {
              try {
                t.createElement("a");
              } catch (e) {
                return !0;
              }
              var n = t.createDocumentFragment();
              return (
                void 0 === n.cloneNode ||
                void 0 === n.createDocumentFragment ||
                void 0 === n.createElement
              );
            })());
        var s = {
          elements:
            i.elements ||
            "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",
          shivCSS: !1 !== i.shivCSS,
          shivMethods: !1 !== i.shivMethods,
          type: "default",
          shivDocument: c,
        };
        (e.html5 = s), c(t);
      })(this, t)
    ),
    (l._version = "2.5.3"),
    (l._prefixes = v),
    (l._domPrefixes = x),
    (l._cssomPrefixes = b),
    (l.mq = T),
    (l.hasEvent = N),
    (l.testProp = function (e) {
      return D([e]);
    }),
    (l.testAllProps = L),
    (l.testStyles = _),
    (l.prefixed = function (e, t, n) {
      return t ? L(e, t, n) : L(e, "pfx");
    }),
    (d.className =
      d.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + " js " + k.join(" ")),
    l
  );
})(this, this.document);
