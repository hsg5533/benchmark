// three.js - http://github.com/mrdoob/three.js
"use strict";
var THREE = THREE || {
  REVISION: "53",
};
self.console = self.console || {
  info: function () {},
  log: function () {},
  debug: function () {},
  warn: function () {},
  error: function () {},
};
self.Int32Array = self.Int32Array || Array;
self.Float32Array = self.Float32Array || Array;
String.prototype.startsWith =
  String.prototype.startsWith ||
  function (a) {
    return this.slice(0, a.length) === a;
  };
String.prototype.endsWith =
  String.prototype.endsWith ||
  function (a) {
    var a = String(a),
      b = this.lastIndexOf(a);
    return (-1 < b && b) === this.length - a.length;
  };
String.prototype.trim =
  String.prototype.trim ||
  function () {
    return this.replace(/^\s+|\s+$/g, "");
  };
(function () {
  for (
    var a = 0, b = ["ms", "moz", "webkit", "o"], c = 0;
    c < b.length && !window.requestAnimationFrame;
    ++c
  )
    (window.requestAnimationFrame = window[b[c] + "RequestAnimationFrame"]),
      (window.cancelAnimationFrame =
        window[b[c] + "CancelAnimationFrame"] ||
        window[b[c] + "CancelRequestAnimationFrame"]);
  void 0 === window.requestAnimationFrame &&
    (window.requestAnimationFrame = function (b) {
      var c = Date.now(),
        f = Math.max(0, 16 - (c - a)),
        g = window.setTimeout(function () {
          b(c + f);
        }, f);
      a = c + f;
      return g;
    });
  window.cancelAnimationFrame =
    window.cancelAnimationFrame ||
    function (a) {
      window.clearTimeout(a);
    };
})();
THREE.FrontSide = 0;
THREE.BackSide = 1;
THREE.DoubleSide = 2;
THREE.NoShading = 0;
THREE.FlatShading = 1;
THREE.SmoothShading = 2;
THREE.NoColors = 0;
THREE.FaceColors = 1;
THREE.VertexColors = 2;
THREE.NoBlending = 0;
THREE.NormalBlending = 1;
THREE.AdditiveBlending = 2;
THREE.SubtractiveBlending = 3;
THREE.MultiplyBlending = 4;
THREE.CustomBlending = 5;
THREE.AddEquation = 100;
THREE.SubtractEquation = 101;
THREE.ReverseSubtractEquation = 102;
THREE.ZeroFactor = 200;
THREE.OneFactor = 201;
THREE.SrcColorFactor = 202;
THREE.OneMinusSrcColorFactor = 203;
THREE.SrcAlphaFactor = 204;
THREE.OneMinusSrcAlphaFactor = 205;
THREE.DstAlphaFactor = 206;
THREE.OneMinusDstAlphaFactor = 207;
THREE.DstColorFactor = 208;
THREE.OneMinusDstColorFactor = 209;
THREE.SrcAlphaSaturateFactor = 210;
THREE.MultiplyOperation = 0;
THREE.MixOperation = 1;
THREE.AddOperation = 2;
THREE.UVMapping = function () {};
THREE.CubeReflectionMapping = function () {};
THREE.CubeRefractionMapping = function () {};
THREE.SphericalReflectionMapping = function () {};
THREE.SphericalRefractionMapping = function () {};
THREE.RepeatWrapping = 1e3;
THREE.ClampToEdgeWrapping = 1001;
THREE.MirroredRepeatWrapping = 1002;
THREE.NearestFilter = 1003;
THREE.NearestMipMapNearestFilter = 1004;
THREE.NearestMipMapLinearFilter = 1005;
THREE.LinearFilter = 1006;
THREE.LinearMipMapNearestFilter = 1007;
THREE.LinearMipMapLinearFilter = 1008;
THREE.UnsignedByteType = 1009;
THREE.ByteType = 1010;
THREE.ShortType = 1011;
THREE.UnsignedShortType = 1012;
THREE.IntType = 1013;
THREE.UnsignedIntType = 1014;
THREE.FloatType = 1015;
THREE.UnsignedShort4444Type = 1016;
THREE.UnsignedShort5551Type = 1017;
THREE.UnsignedShort565Type = 1018;
THREE.AlphaFormat = 1019;
THREE.RGBFormat = 1020;
THREE.RGBAFormat = 1021;
THREE.LuminanceFormat = 1022;
THREE.LuminanceAlphaFormat = 1023;
THREE.RGB_S3TC_DXT1_Format = 2001;
THREE.RGBA_S3TC_DXT1_Format = 2002;
THREE.RGBA_S3TC_DXT3_Format = 2003;
THREE.RGBA_S3TC_DXT5_Format = 2004;
THREE.Clock = function (a) {
  this.autoStart = void 0 !== a ? a : !0;
  this.elapsedTime = this.oldTime = this.startTime = 0;
  this.running = !1;
};
THREE.Clock.prototype.start = function () {
  this.oldTime = this.startTime = Date.now();
  this.running = !0;
};
THREE.Clock.prototype.stop = function () {
  this.getElapsedTime();
  this.running = !1;
};
THREE.Clock.prototype.getElapsedTime = function () {
  return (this.elapsedTime += this.getDelta());
};
THREE.Clock.prototype.getDelta = function () {
  var a = 0;
  this.autoStart && !this.running && this.start();
  if (this.running) {
    var b = Date.now(),
      a = 0.001 * (b - this.oldTime);
    this.oldTime = b;
    this.elapsedTime += a;
  }
  return a;
};
THREE.Color = function (a) {
  void 0 !== a && this.setHex(a);
  return this;
};
THREE.Color.prototype = {
  constructor: THREE.Color,
  r: 1,
  g: 1,
  b: 1,
  copy: function (a) {
    this.r = a.r;
    this.g = a.g;
    this.b = a.b;
    return this;
  },
  copyGammaToLinear: function (a) {
    this.r = a.r * a.r;
    this.g = a.g * a.g;
    this.b = a.b * a.b;
    return this;
  },
  copyLinearToGamma: function (a) {
    this.r = Math.sqrt(a.r);
    this.g = Math.sqrt(a.g);
    this.b = Math.sqrt(a.b);
    return this;
  },
  convertGammaToLinear: function () {
    var a = this.r,
      b = this.g,
      c = this.b;
    this.r = a * a;
    this.g = b * b;
    this.b = c * c;
    return this;
  },
  convertLinearToGamma: function () {
    this.r = Math.sqrt(this.r);
    this.g = Math.sqrt(this.g);
    this.b = Math.sqrt(this.b);
    return this;
  },
  setRGB: function (a, b, c) {
    this.r = a;
    this.g = b;
    this.b = c;
    return this;
  },
  setHSV: function (a, b, c) {
    var d, e, f;
    0 === c
      ? (this.r = this.g = this.b = 0)
      : ((d = Math.floor(6 * a)),
        (e = 6 * a - d),
        (a = c * (1 - b)),
        (f = c * (1 - b * e)),
        (b = c * (1 - b * (1 - e))),
        0 === d
          ? ((this.r = c), (this.g = b), (this.b = a))
          : 1 === d
          ? ((this.r = f), (this.g = c), (this.b = a))
          : 2 === d
          ? ((this.r = a), (this.g = c), (this.b = b))
          : 3 === d
          ? ((this.r = a), (this.g = f), (this.b = c))
          : 4 === d
          ? ((this.r = b), (this.g = a), (this.b = c))
          : 5 === d && ((this.r = c), (this.g = a), (this.b = f)));
    return this;
  },
  getHex: function () {
    return (
      ((255 * this.r) << 16) ^ ((255 * this.g) << 8) ^ ((255 * this.b) << 0)
    );
  },
  setHex: function (a) {
    a = Math.floor(a);
    this.r = ((a >> 16) & 255) / 255;
    this.g = ((a >> 8) & 255) / 255;
    this.b = (a & 255) / 255;
    return this;
  },
  getHexString: function () {
    return ("000000" + this.getHex().toString(16)).slice(-6);
  },
  getContextStyle: function () {
    return (
      "rgb(" +
      ((255 * this.r) | 0) +
      "," +
      ((255 * this.g) | 0) +
      "," +
      ((255 * this.b) | 0) +
      ")"
    );
  },
  setContextStyle: function (a) {
    a = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/i.exec(a);
    this.r = parseInt(a[1], 10) / 255;
    this.g = parseInt(a[2], 10) / 255;
    this.b = parseInt(a[3], 10) / 255;
    return this;
  },
  getHSV: function (a) {
    var b = this.r,
      c = this.g,
      d = this.b,
      e = Math.max(Math.max(b, c), d),
      f = Math.min(Math.min(b, c), d);
    if (f === e) f = b = 0;
    else {
      var g = e - f,
        f = g / e,
        b =
          (b === e
            ? (c - d) / g
            : c === e
            ? 2 + (d - b) / g
            : 4 + (b - c) / g) / 6;
      0 > b && (b += 1);
      1 < b && (b -= 1);
    }
    void 0 === a &&
      (a = {
        h: 0,
        s: 0,
        v: 0,
      });
    a.h = b;
    a.s = f;
    a.v = e;
    return a;
  },
  lerpSelf: function (a, b) {
    this.r += (a.r - this.r) * b;
    this.g += (a.g - this.g) * b;
    this.b += (a.b - this.b) * b;
    return this;
  },
  clone: function () {
    return new THREE.Color().setRGB(this.r, this.g, this.b);
  },
};
THREE.Vector2 = function (a, b) {
  this.x = a || 0;
  this.y = b || 0;
};
THREE.Vector2.prototype = {
  constructor: THREE.Vector2,
  set: function (a, b) {
    this.x = a;
    this.y = b;
    return this;
  },
  copy: function (a) {
    this.x = a.x;
    this.y = a.y;
    return this;
  },
  add: function (a, b) {
    this.x = a.x + b.x;
    this.y = a.y + b.y;
    return this;
  },
  addSelf: function (a) {
    this.x += a.x;
    this.y += a.y;
    return this;
  },
  sub: function (a, b) {
    this.x = a.x - b.x;
    this.y = a.y - b.y;
    return this;
  },
  subSelf: function (a) {
    this.x -= a.x;
    this.y -= a.y;
    return this;
  },
  multiplyScalar: function (a) {
    this.x *= a;
    this.y *= a;
    return this;
  },
  divideScalar: function (a) {
    a ? ((this.x /= a), (this.y /= a)) : this.set(0, 0);
    return this;
  },
  negate: function () {
    return this.multiplyScalar(-1);
  },
  dot: function (a) {
    return this.x * a.x + this.y * a.y;
  },
  lengthSq: function () {
    return this.x * this.x + this.y * this.y;
  },
  length: function () {
    return Math.sqrt(this.lengthSq());
  },
  normalize: function () {
    return this.divideScalar(this.length());
  },
  distanceTo: function (a) {
    return Math.sqrt(this.distanceToSquared(a));
  },
  distanceToSquared: function (a) {
    var b = this.x - a.x,
      a = this.y - a.y;
    return b * b + a * a;
  },
  setLength: function (a) {
    return this.normalize().multiplyScalar(a);
  },
  lerpSelf: function (a, b) {
    this.x += (a.x - this.x) * b;
    this.y += (a.y - this.y) * b;
    return this;
  },
  equals: function (a) {
    return a.x === this.x && a.y === this.y;
  },
  clone: function () {
    return new THREE.Vector2(this.x, this.y);
  },
};
THREE.Vector3 = function (a, b, c) {
  this.x = a || 0;
  this.y = b || 0;
  this.z = c || 0;
};
THREE.Vector3.prototype = {
  constructor: THREE.Vector3,
  set: function (a, b, c) {
    this.x = a;
    this.y = b;
    this.z = c;
    return this;
  },
  setX: function (a) {
    this.x = a;
    return this;
  },
  setY: function (a) {
    this.y = a;
    return this;
  },
  setZ: function (a) {
    this.z = a;
    return this;
  },
  copy: function (a) {
    this.x = a.x;
    this.y = a.y;
    this.z = a.z;
    return this;
  },
  add: function (a, b) {
    this.x = a.x + b.x;
    this.y = a.y + b.y;
    this.z = a.z + b.z;
    return this;
  },
  addSelf: function (a) {
    this.x += a.x;
    this.y += a.y;
    this.z += a.z;
    return this;
  },
  addScalar: function (a) {
    this.x += a;
    this.y += a;
    this.z += a;
    return this;
  },
  sub: function (a, b) {
    this.x = a.x - b.x;
    this.y = a.y - b.y;
    this.z = a.z - b.z;
    return this;
  },
  subSelf: function (a) {
    this.x -= a.x;
    this.y -= a.y;
    this.z -= a.z;
    return this;
  },
  multiply: function (a, b) {
    this.x = a.x * b.x;
    this.y = a.y * b.y;
    this.z = a.z * b.z;
    return this;
  },
  multiplySelf: function (a) {
    this.x *= a.x;
    this.y *= a.y;
    this.z *= a.z;
    return this;
  },
  multiplyScalar: function (a) {
    this.x *= a;
    this.y *= a;
    this.z *= a;
    return this;
  },
  divideSelf: function (a) {
    this.x /= a.x;
    this.y /= a.y;
    this.z /= a.z;
    return this;
  },
  divideScalar: function (a) {
    a
      ? ((this.x /= a), (this.y /= a), (this.z /= a))
      : (this.z = this.y = this.x = 0);
    return this;
  },
  negate: function () {
    return this.multiplyScalar(-1);
  },
  dot: function (a) {
    return this.x * a.x + this.y * a.y + this.z * a.z;
  },
  lengthSq: function () {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  },
  length: function () {
    return Math.sqrt(this.lengthSq());
  },
  lengthManhattan: function () {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  },
  normalize: function () {
    return this.divideScalar(this.length());
  },
  setLength: function (a) {
    return this.normalize().multiplyScalar(a);
  },
  lerpSelf: function (a, b) {
    this.x += (a.x - this.x) * b;
    this.y += (a.y - this.y) * b;
    this.z += (a.z - this.z) * b;
    return this;
  },
  cross: function (a, b) {
    this.x = a.y * b.z - a.z * b.y;
    this.y = a.z * b.x - a.x * b.z;
    this.z = a.x * b.y - a.y * b.x;
    return this;
  },
  crossSelf: function (a) {
    var b = this.x,
      c = this.y,
      d = this.z;
    this.x = c * a.z - d * a.y;
    this.y = d * a.x - b * a.z;
    this.z = b * a.y - c * a.x;
    return this;
  },
  angleTo: function (a) {
    return Math.acos(this.dot(a) / this.length() / a.length());
  },
  distanceTo: function (a) {
    return Math.sqrt(this.distanceToSquared(a));
  },
  distanceToSquared: function (a) {
    return new THREE.Vector3().sub(this, a).lengthSq();
  },
  getPositionFromMatrix: function (a) {
    this.x = a.elements[12];
    this.y = a.elements[13];
    this.z = a.elements[14];
    return this;
  },
  setEulerFromRotationMatrix: function (a, b) {
    function c(a) {
      return Math.min(Math.max(a, -1), 1);
    }
    var d = a.elements,
      e = d[0],
      f = d[4],
      g = d[8],
      h = d[1],
      i = d[5],
      j = d[9],
      l = d[2],
      m = d[6],
      d = d[10];
    void 0 === b || "XYZ" === b
      ? ((this.y = Math.asin(c(g))),
        0.99999 > Math.abs(g)
          ? ((this.x = Math.atan2(-j, d)), (this.z = Math.atan2(-f, e)))
          : ((this.x = Math.atan2(m, i)), (this.z = 0)))
      : "YXZ" === b
      ? ((this.x = Math.asin(-c(j))),
        0.99999 > Math.abs(j)
          ? ((this.y = Math.atan2(g, d)), (this.z = Math.atan2(h, i)))
          : ((this.y = Math.atan2(-l, e)), (this.z = 0)))
      : "ZXY" === b
      ? ((this.x = Math.asin(c(m))),
        0.99999 > Math.abs(m)
          ? ((this.y = Math.atan2(-l, d)), (this.z = Math.atan2(-f, i)))
          : ((this.y = 0), (this.z = Math.atan2(h, e))))
      : "ZYX" === b
      ? ((this.y = Math.asin(-c(l))),
        0.99999 > Math.abs(l)
          ? ((this.x = Math.atan2(m, d)), (this.z = Math.atan2(h, e)))
          : ((this.x = 0), (this.z = Math.atan2(-f, i))))
      : "YZX" === b
      ? ((this.z = Math.asin(c(h))),
        0.99999 > Math.abs(h)
          ? ((this.x = Math.atan2(-j, i)), (this.y = Math.atan2(-l, e)))
          : ((this.x = 0), (this.y = Math.atan2(g, d))))
      : "XZY" === b &&
        ((this.z = Math.asin(-c(f))),
        0.99999 > Math.abs(f)
          ? ((this.x = Math.atan2(m, i)), (this.y = Math.atan2(g, e)))
          : ((this.x = Math.atan2(-j, d)), (this.y = 0)));
    return this;
  },
  setEulerFromQuaternion: function (a, b) {
    function c(a) {
      return Math.min(Math.max(a, -1), 1);
    }
    var d = a.x * a.x,
      e = a.y * a.y,
      f = a.z * a.z,
      g = a.w * a.w;
    void 0 === b || "XYZ" === b
      ? ((this.x = Math.atan2(2 * (a.x * a.w - a.y * a.z), g - d - e + f)),
        (this.y = Math.asin(c(2 * (a.x * a.z + a.y * a.w)))),
        (this.z = Math.atan2(2 * (a.z * a.w - a.x * a.y), g + d - e - f)))
      : "YXZ" === b
      ? ((this.x = Math.asin(c(2 * (a.x * a.w - a.y * a.z)))),
        (this.y = Math.atan2(2 * (a.x * a.z + a.y * a.w), g - d - e + f)),
        (this.z = Math.atan2(2 * (a.x * a.y + a.z * a.w), g - d + e - f)))
      : "ZXY" === b
      ? ((this.x = Math.asin(c(2 * (a.x * a.w + a.y * a.z)))),
        (this.y = Math.atan2(2 * (a.y * a.w - a.z * a.x), g - d - e + f)),
        (this.z = Math.atan2(2 * (a.z * a.w - a.x * a.y), g - d + e - f)))
      : "ZYX" === b
      ? ((this.x = Math.atan2(2 * (a.x * a.w + a.z * a.y), g - d - e + f)),
        (this.y = Math.asin(c(2 * (a.y * a.w - a.x * a.z)))),
        (this.z = Math.atan2(2 * (a.x * a.y + a.z * a.w), g + d - e - f)))
      : "YZX" === b
      ? ((this.x = Math.atan2(2 * (a.x * a.w - a.z * a.y), g - d + e - f)),
        (this.y = Math.atan2(2 * (a.y * a.w - a.x * a.z), g + d - e - f)),
        (this.z = Math.asin(c(2 * (a.x * a.y + a.z * a.w)))))
      : "XZY" === b &&
        ((this.x = Math.atan2(2 * (a.x * a.w + a.y * a.z), g - d + e - f)),
        (this.y = Math.atan2(2 * (a.x * a.z + a.y * a.w), g + d - e - f)),
        (this.z = Math.asin(c(2 * (a.z * a.w - a.x * a.y)))));
    return this;
  },
  getScaleFromMatrix: function (a) {
    var b = this.set(a.elements[0], a.elements[1], a.elements[2]).length(),
      c = this.set(a.elements[4], a.elements[5], a.elements[6]).length(),
      a = this.set(a.elements[8], a.elements[9], a.elements[10]).length();
    this.x = b;
    this.y = c;
    this.z = a;
    return this;
  },
  equals: function (a) {
    return a.x === this.x && a.y === this.y && a.z === this.z;
  },
  clone: function () {
    return new THREE.Vector3(this.x, this.y, this.z);
  },
};
THREE.Vector4 = function (a, b, c, d) {
  this.x = a || 0;
  this.y = b || 0;
  this.z = c || 0;
  this.w = void 0 !== d ? d : 1;
};
THREE.Vector4.prototype = {
  constructor: THREE.Vector4,
  set: function (a, b, c, d) {
    this.x = a;
    this.y = b;
    this.z = c;
    this.w = d;
    return this;
  },
  copy: function (a) {
    this.x = a.x;
    this.y = a.y;
    this.z = a.z;
    this.w = void 0 !== a.w ? a.w : 1;
    return this;
  },
  add: function (a, b) {
    this.x = a.x + b.x;
    this.y = a.y + b.y;
    this.z = a.z + b.z;
    this.w = a.w + b.w;
    return this;
  },
  addSelf: function (a) {
    this.x += a.x;
    this.y += a.y;
    this.z += a.z;
    this.w += a.w;
    return this;
  },
  sub: function (a, b) {
    this.x = a.x - b.x;
    this.y = a.y - b.y;
    this.z = a.z - b.z;
    this.w = a.w - b.w;
    return this;
  },
  subSelf: function (a) {
    this.x -= a.x;
    this.y -= a.y;
    this.z -= a.z;
    this.w -= a.w;
    return this;
  },
  multiplyScalar: function (a) {
    this.x *= a;
    this.y *= a;
    this.z *= a;
    this.w *= a;
    return this;
  },
  divideScalar: function (a) {
    a
      ? ((this.x /= a), (this.y /= a), (this.z /= a), (this.w /= a))
      : ((this.z = this.y = this.x = 0), (this.w = 1));
    return this;
  },
  negate: function () {
    return this.multiplyScalar(-1);
  },
  dot: function (a) {
    return this.x * a.x + this.y * a.y + this.z * a.z + this.w * a.w;
  },
  lengthSq: function () {
    return this.dot(this);
  },
  length: function () {
    return Math.sqrt(this.lengthSq());
  },
  lengthManhattan: function () {
    return (
      Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w)
    );
  },
  normalize: function () {
    return this.divideScalar(this.length());
  },
  setLength: function (a) {
    return this.normalize().multiplyScalar(a);
  },
  lerpSelf: function (a, b) {
    this.x += (a.x - this.x) * b;
    this.y += (a.y - this.y) * b;
    this.z += (a.z - this.z) * b;
    this.w += (a.w - this.w) * b;
    return this;
  },
  clone: function () {
    return new THREE.Vector4(this.x, this.y, this.z, this.w);
  },
  setAxisAngleFromQuaternion: function (a) {
    this.w = 2 * Math.acos(a.w);
    var b = Math.sqrt(1 - a.w * a.w);
    1e-4 > b
      ? ((this.x = 1), (this.z = this.y = 0))
      : ((this.x = a.x / b), (this.y = a.y / b), (this.z = a.z / b));
    return this;
  },
  setAxisAngleFromRotationMatrix: function (a) {
    var b,
      c,
      d,
      a = a.elements,
      e = a[0];
    d = a[4];
    var f = a[8],
      g = a[1],
      h = a[5],
      i = a[9];
    c = a[2];
    b = a[6];
    var j = a[10];
    if (
      0.01 > Math.abs(d - g) &&
      0.01 > Math.abs(f - c) &&
      0.01 > Math.abs(i - b)
    ) {
      if (
        0.1 > Math.abs(d + g) &&
        0.1 > Math.abs(f + c) &&
        0.1 > Math.abs(i + b) &&
        0.1 > Math.abs(e + h + j - 3)
      )
        return this.set(1, 0, 0, 0), this;
      a = Math.PI;
      e = (e + 1) / 2;
      h = (h + 1) / 2;
      j = (j + 1) / 2;
      d = (d + g) / 4;
      f = (f + c) / 4;
      i = (i + b) / 4;
      e > h && e > j
        ? 0.01 > e
          ? ((b = 0), (d = c = 0.707106781))
          : ((b = Math.sqrt(e)), (c = d / b), (d = f / b))
        : h > j
        ? 0.01 > h
          ? ((b = 0.707106781), (c = 0), (d = 0.707106781))
          : ((c = Math.sqrt(h)), (b = d / c), (d = i / c))
        : 0.01 > j
        ? ((c = b = 0.707106781), (d = 0))
        : ((d = Math.sqrt(j)), (b = f / d), (c = i / d));
      this.set(b, c, d, a);
      return this;
    }
    a = Math.sqrt((b - i) * (b - i) + (f - c) * (f - c) + (g - d) * (g - d));
    0.001 > Math.abs(a) && (a = 1);
    this.x = (b - i) / a;
    this.y = (f - c) / a;
    this.z = (g - d) / a;
    this.w = Math.acos((e + h + j - 1) / 2);
    return this;
  },
};
THREE.Matrix3 = function () {
  this.elements = new Float32Array(9);
};
THREE.Matrix3.prototype = {
  constructor: THREE.Matrix3,
  multiplyVector3: function (a) {
    var b = this.elements,
      c = a.x,
      d = a.y,
      e = a.z;
    a.x = b[0] * c + b[3] * d + b[6] * e;
    a.y = b[1] * c + b[4] * d + b[7] * e;
    a.z = b[2] * c + b[5] * d + b[8] * e;
    return a;
  },
  multiplyVector3Array: function (a) {
    for (var b = THREE.Matrix3.__v1, c = 0, d = a.length; c < d; c += 3)
      (b.x = a[c]),
        (b.y = a[c + 1]),
        (b.z = a[c + 2]),
        this.multiplyVector3(b),
        (a[c] = b.x),
        (a[c + 1] = b.y),
        (a[c + 2] = b.z);
    return a;
  },
  getInverse: function (a) {
    var b = a.elements,
      a = b[10] * b[5] - b[6] * b[9],
      c = -b[10] * b[1] + b[2] * b[9],
      d = b[6] * b[1] - b[2] * b[5],
      e = -b[10] * b[4] + b[6] * b[8],
      f = b[10] * b[0] - b[2] * b[8],
      g = -b[6] * b[0] + b[2] * b[4],
      h = b[9] * b[4] - b[5] * b[8],
      i = -b[9] * b[0] + b[1] * b[8],
      j = b[5] * b[0] - b[1] * b[4],
      b = b[0] * a + b[1] * e + b[2] * h;
    0 === b && console.warn("Matrix3.getInverse(): determinant == 0");
    var b = 1 / b,
      l = this.elements;
    l[0] = b * a;
    l[1] = b * c;
    l[2] = b * d;
    l[3] = b * e;
    l[4] = b * f;
    l[5] = b * g;
    l[6] = b * h;
    l[7] = b * i;
    l[8] = b * j;
    return this;
  },
  transpose: function () {
    var a,
      b = this.elements;
    a = b[1];
    b[1] = b[3];
    b[3] = a;
    a = b[2];
    b[2] = b[6];
    b[6] = a;
    a = b[5];
    b[5] = b[7];
    b[7] = a;
    return this;
  },
  transposeIntoArray: function (a) {
    var b = this.m;
    a[0] = b[0];
    a[1] = b[3];
    a[2] = b[6];
    a[3] = b[1];
    a[4] = b[4];
    a[5] = b[7];
    a[6] = b[2];
    a[7] = b[5];
    a[8] = b[8];
    return this;
  },
};
THREE.Matrix3.__v1 = new THREE.Vector3();
THREE.Matrix4 = function (a, b, c, d, e, f, g, h, i, j, l, m, n, p, o, s) {
  this.elements = new Float32Array(16);
  this.set(
    void 0 !== a ? a : 1,
    b || 0,
    c || 0,
    d || 0,
    e || 0,
    void 0 !== f ? f : 1,
    g || 0,
    h || 0,
    i || 0,
    j || 0,
    void 0 !== l ? l : 1,
    m || 0,
    n || 0,
    p || 0,
    o || 0,
    void 0 !== s ? s : 1
  );
};
THREE.Matrix4.prototype = {
  constructor: THREE.Matrix4,
  set: function (a, b, c, d, e, f, g, h, i, j, l, m, n, p, o, s) {
    var t = this.elements;
    t[0] = a;
    t[4] = b;
    t[8] = c;
    t[12] = d;
    t[1] = e;
    t[5] = f;
    t[9] = g;
    t[13] = h;
    t[2] = i;
    t[6] = j;
    t[10] = l;
    t[14] = m;
    t[3] = n;
    t[7] = p;
    t[11] = o;
    t[15] = s;
    return this;
  },
  identity: function () {
    this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    return this;
  },
  copy: function (a) {
    a = a.elements;
    this.set(
      a[0],
      a[4],
      a[8],
      a[12],
      a[1],
      a[5],
      a[9],
      a[13],
      a[2],
      a[6],
      a[10],
      a[14],
      a[3],
      a[7],
      a[11],
      a[15]
    );
    return this;
  },
  lookAt: function (a, b, c) {
    var d = this.elements,
      e = THREE.Matrix4.__v1,
      f = THREE.Matrix4.__v2,
      g = THREE.Matrix4.__v3;
    g.sub(a, b).normalize();
    0 === g.length() && (g.z = 1);
    e.cross(c, g).normalize();
    0 === e.length() && ((g.x += 1e-4), e.cross(c, g).normalize());
    f.cross(g, e);
    d[0] = e.x;
    d[4] = f.x;
    d[8] = g.x;
    d[1] = e.y;
    d[5] = f.y;
    d[9] = g.y;
    d[2] = e.z;
    d[6] = f.z;
    d[10] = g.z;
    return this;
  },
  multiply: function (a, b) {
    var c = a.elements,
      d = b.elements,
      e = this.elements,
      f = c[0],
      g = c[4],
      h = c[8],
      i = c[12],
      j = c[1],
      l = c[5],
      m = c[9],
      n = c[13],
      p = c[2],
      o = c[6],
      s = c[10],
      t = c[14],
      r = c[3],
      z = c[7],
      w = c[11],
      c = c[15],
      q = d[0],
      E = d[4],
      A = d[8],
      v = d[12],
      u = d[1],
      D = d[5],
      C = d[9],
      G = d[13],
      P = d[2],
      B = d[6],
      K = d[10],
      H = d[14],
      I = d[3],
      N = d[7],
      O = d[11],
      d = d[15];
    e[0] = f * q + g * u + h * P + i * I;
    e[4] = f * E + g * D + h * B + i * N;
    e[8] = f * A + g * C + h * K + i * O;
    e[12] = f * v + g * G + h * H + i * d;
    e[1] = j * q + l * u + m * P + n * I;
    e[5] = j * E + l * D + m * B + n * N;
    e[9] = j * A + l * C + m * K + n * O;
    e[13] = j * v + l * G + m * H + n * d;
    e[2] = p * q + o * u + s * P + t * I;
    e[6] = p * E + o * D + s * B + t * N;
    e[10] = p * A + o * C + s * K + t * O;
    e[14] = p * v + o * G + s * H + t * d;
    e[3] = r * q + z * u + w * P + c * I;
    e[7] = r * E + z * D + w * B + c * N;
    e[11] = r * A + z * C + w * K + c * O;
    e[15] = r * v + z * G + w * H + c * d;
    return this;
  },
  multiplySelf: function (a) {
    return this.multiply(this, a);
  },
  multiplyToArray: function (a, b, c) {
    var d = this.elements;
    this.multiply(a, b);
    c[0] = d[0];
    c[1] = d[1];
    c[2] = d[2];
    c[3] = d[3];
    c[4] = d[4];
    c[5] = d[5];
    c[6] = d[6];
    c[7] = d[7];
    c[8] = d[8];
    c[9] = d[9];
    c[10] = d[10];
    c[11] = d[11];
    c[12] = d[12];
    c[13] = d[13];
    c[14] = d[14];
    c[15] = d[15];
    return this;
  },
  multiplyScalar: function (a) {
    var b = this.elements;
    b[0] *= a;
    b[4] *= a;
    b[8] *= a;
    b[12] *= a;
    b[1] *= a;
    b[5] *= a;
    b[9] *= a;
    b[13] *= a;
    b[2] *= a;
    b[6] *= a;
    b[10] *= a;
    b[14] *= a;
    b[3] *= a;
    b[7] *= a;
    b[11] *= a;
    b[15] *= a;
    return this;
  },
  multiplyVector3: function (a) {
    var b = this.elements,
      c = a.x,
      d = a.y,
      e = a.z,
      f = 1 / (b[3] * c + b[7] * d + b[11] * e + b[15]);
    a.x = (b[0] * c + b[4] * d + b[8] * e + b[12]) * f;
    a.y = (b[1] * c + b[5] * d + b[9] * e + b[13]) * f;
    a.z = (b[2] * c + b[6] * d + b[10] * e + b[14]) * f;
    return a;
  },
  multiplyVector4: function (a) {
    var b = this.elements,
      c = a.x,
      d = a.y,
      e = a.z,
      f = a.w;
    a.x = b[0] * c + b[4] * d + b[8] * e + b[12] * f;
    a.y = b[1] * c + b[5] * d + b[9] * e + b[13] * f;
    a.z = b[2] * c + b[6] * d + b[10] * e + b[14] * f;
    a.w = b[3] * c + b[7] * d + b[11] * e + b[15] * f;
    return a;
  },
  multiplyVector3Array: function (a) {
    for (var b = THREE.Matrix4.__v1, c = 0, d = a.length; c < d; c += 3)
      (b.x = a[c]),
        (b.y = a[c + 1]),
        (b.z = a[c + 2]),
        this.multiplyVector3(b),
        (a[c] = b.x),
        (a[c + 1] = b.y),
        (a[c + 2] = b.z);
    return a;
  },
  rotateAxis: function (a) {
    var b = this.elements,
      c = a.x,
      d = a.y,
      e = a.z;
    a.x = c * b[0] + d * b[4] + e * b[8];
    a.y = c * b[1] + d * b[5] + e * b[9];
    a.z = c * b[2] + d * b[6] + e * b[10];
    a.normalize();
    return a;
  },
  crossVector: function (a) {
    var b = this.elements,
      c = new THREE.Vector4();
    c.x = b[0] * a.x + b[4] * a.y + b[8] * a.z + b[12] * a.w;
    c.y = b[1] * a.x + b[5] * a.y + b[9] * a.z + b[13] * a.w;
    c.z = b[2] * a.x + b[6] * a.y + b[10] * a.z + b[14] * a.w;
    c.w = a.w ? b[3] * a.x + b[7] * a.y + b[11] * a.z + b[15] * a.w : 1;
    return c;
  },
  determinant: function () {
    var a = this.elements,
      b = a[0],
      c = a[4],
      d = a[8],
      e = a[12],
      f = a[1],
      g = a[5],
      h = a[9],
      i = a[13],
      j = a[2],
      l = a[6],
      m = a[10],
      n = a[14],
      p = a[3],
      o = a[7],
      s = a[11],
      a = a[15];
    return (
      e * h * l * p -
      d * i * l * p -
      e * g * m * p +
      c * i * m * p +
      d * g * n * p -
      c * h * n * p -
      e * h * j * o +
      d * i * j * o +
      e * f * m * o -
      b * i * m * o -
      d * f * n * o +
      b * h * n * o +
      e * g * j * s -
      c * i * j * s -
      e * f * l * s +
      b * i * l * s +
      c * f * n * s -
      b * g * n * s -
      d * g * j * a +
      c * h * j * a +
      d * f * l * a -
      b * h * l * a -
      c * f * m * a +
      b * g * m * a
    );
  },
  transpose: function () {
    var a = this.elements,
      b;
    b = a[1];
    a[1] = a[4];
    a[4] = b;
    b = a[2];
    a[2] = a[8];
    a[8] = b;
    b = a[6];
    a[6] = a[9];
    a[9] = b;
    b = a[3];
    a[3] = a[12];
    a[12] = b;
    b = a[7];
    a[7] = a[13];
    a[13] = b;
    b = a[11];
    a[11] = a[14];
    a[14] = b;
    return this;
  },
  flattenToArray: function (a) {
    var b = this.elements;
    a[0] = b[0];
    a[1] = b[1];
    a[2] = b[2];
    a[3] = b[3];
    a[4] = b[4];
    a[5] = b[5];
    a[6] = b[6];
    a[7] = b[7];
    a[8] = b[8];
    a[9] = b[9];
    a[10] = b[10];
    a[11] = b[11];
    a[12] = b[12];
    a[13] = b[13];
    a[14] = b[14];
    a[15] = b[15];
    return a;
  },
  flattenToArrayOffset: function (a, b) {
    var c = this.elements;
    a[b] = c[0];
    a[b + 1] = c[1];
    a[b + 2] = c[2];
    a[b + 3] = c[3];
    a[b + 4] = c[4];
    a[b + 5] = c[5];
    a[b + 6] = c[6];
    a[b + 7] = c[7];
    a[b + 8] = c[8];
    a[b + 9] = c[9];
    a[b + 10] = c[10];
    a[b + 11] = c[11];
    a[b + 12] = c[12];
    a[b + 13] = c[13];
    a[b + 14] = c[14];
    a[b + 15] = c[15];
    return a;
  },
  getPosition: function () {
    var a = this.elements;
    return THREE.Matrix4.__v1.set(a[12], a[13], a[14]);
  },
  setPosition: function (a) {
    var b = this.elements;
    b[12] = a.x;
    b[13] = a.y;
    b[14] = a.z;
    return this;
  },
  getColumnX: function () {
    var a = this.elements;
    return THREE.Matrix4.__v1.set(a[0], a[1], a[2]);
  },
  getColumnY: function () {
    var a = this.elements;
    return THREE.Matrix4.__v1.set(a[4], a[5], a[6]);
  },
  getColumnZ: function () {
    var a = this.elements;
    return THREE.Matrix4.__v1.set(a[8], a[9], a[10]);
  },
  getInverse: function (a) {
    var b = this.elements,
      c = a.elements,
      d = c[0],
      e = c[4],
      f = c[8],
      g = c[12],
      h = c[1],
      i = c[5],
      j = c[9],
      l = c[13],
      m = c[2],
      n = c[6],
      p = c[10],
      o = c[14],
      s = c[3],
      t = c[7],
      r = c[11],
      c = c[15];
    b[0] =
      j * o * t - l * p * t + l * n * r - i * o * r - j * n * c + i * p * c;
    b[4] =
      g * p * t - f * o * t - g * n * r + e * o * r + f * n * c - e * p * c;
    b[8] =
      f * l * t - g * j * t + g * i * r - e * l * r - f * i * c + e * j * c;
    b[12] =
      g * j * n - f * l * n - g * i * p + e * l * p + f * i * o - e * j * o;
    b[1] =
      l * p * s - j * o * s - l * m * r + h * o * r + j * m * c - h * p * c;
    b[5] =
      f * o * s - g * p * s + g * m * r - d * o * r - f * m * c + d * p * c;
    b[9] =
      g * j * s - f * l * s - g * h * r + d * l * r + f * h * c - d * j * c;
    b[13] =
      f * l * m - g * j * m + g * h * p - d * l * p - f * h * o + d * j * o;
    b[2] =
      i * o * s - l * n * s + l * m * t - h * o * t - i * m * c + h * n * c;
    b[6] =
      g * n * s - e * o * s - g * m * t + d * o * t + e * m * c - d * n * c;
    b[10] =
      e * l * s - g * i * s + g * h * t - d * l * t - e * h * c + d * i * c;
    b[14] =
      g * i * m - e * l * m - g * h * n + d * l * n + e * h * o - d * i * o;
    b[3] =
      j * n * s - i * p * s - j * m * t + h * p * t + i * m * r - h * n * r;
    b[7] =
      e * p * s - f * n * s + f * m * t - d * p * t - e * m * r + d * n * r;
    b[11] =
      f * i * s - e * j * s - f * h * t + d * j * t + e * h * r - d * i * r;
    b[15] =
      e * j * m - f * i * m + f * h * n - d * j * n - e * h * p + d * i * p;
    this.multiplyScalar(1 / a.determinant());
    return this;
  },
  setRotationFromEuler: function (a, b) {
    var c = this.elements,
      d = a.x,
      e = a.y,
      f = a.z,
      g = Math.cos(d),
      d = Math.sin(d),
      h = Math.cos(e),
      e = Math.sin(e),
      i = Math.cos(f),
      f = Math.sin(f);
    if (void 0 === b || "XYZ" === b) {
      var j = g * i,
        l = g * f,
        m = d * i,
        n = d * f;
      c[0] = h * i;
      c[4] = -h * f;
      c[8] = e;
      c[1] = l + m * e;
      c[5] = j - n * e;
      c[9] = -d * h;
      c[2] = n - j * e;
      c[6] = m + l * e;
      c[10] = g * h;
    } else
      "YXZ" === b
        ? ((j = h * i),
          (l = h * f),
          (m = e * i),
          (n = e * f),
          (c[0] = j + n * d),
          (c[4] = m * d - l),
          (c[8] = g * e),
          (c[1] = g * f),
          (c[5] = g * i),
          (c[9] = -d),
          (c[2] = l * d - m),
          (c[6] = n + j * d),
          (c[10] = g * h))
        : "ZXY" === b
        ? ((j = h * i),
          (l = h * f),
          (m = e * i),
          (n = e * f),
          (c[0] = j - n * d),
          (c[4] = -g * f),
          (c[8] = m + l * d),
          (c[1] = l + m * d),
          (c[5] = g * i),
          (c[9] = n - j * d),
          (c[2] = -g * e),
          (c[6] = d),
          (c[10] = g * h))
        : "ZYX" === b
        ? ((j = g * i),
          (l = g * f),
          (m = d * i),
          (n = d * f),
          (c[0] = h * i),
          (c[4] = m * e - l),
          (c[8] = j * e + n),
          (c[1] = h * f),
          (c[5] = n * e + j),
          (c[9] = l * e - m),
          (c[2] = -e),
          (c[6] = d * h),
          (c[10] = g * h))
        : "YZX" === b
        ? ((j = g * h),
          (l = g * e),
          (m = d * h),
          (n = d * e),
          (c[0] = h * i),
          (c[4] = n - j * f),
          (c[8] = m * f + l),
          (c[1] = f),
          (c[5] = g * i),
          (c[9] = -d * i),
          (c[2] = -e * i),
          (c[6] = l * f + m),
          (c[10] = j - n * f))
        : "XZY" === b &&
          ((j = g * h),
          (l = g * e),
          (m = d * h),
          (n = d * e),
          (c[0] = h * i),
          (c[4] = -f),
          (c[8] = e * i),
          (c[1] = j * f + n),
          (c[5] = g * i),
          (c[9] = l * f - m),
          (c[2] = m * f - l),
          (c[6] = d * i),
          (c[10] = n * f + j));
    return this;
  },
  setRotationFromQuaternion: function (a) {
    var b = this.elements,
      c = a.x,
      d = a.y,
      e = a.z,
      f = a.w,
      g = c + c,
      h = d + d,
      i = e + e,
      a = c * g,
      j = c * h,
      c = c * i,
      l = d * h,
      d = d * i,
      e = e * i,
      g = f * g,
      h = f * h,
      f = f * i;
    b[0] = 1 - (l + e);
    b[4] = j - f;
    b[8] = c + h;
    b[1] = j + f;
    b[5] = 1 - (a + e);
    b[9] = d - g;
    b[2] = c - h;
    b[6] = d + g;
    b[10] = 1 - (a + l);
    return this;
  },
  compose: function (a, b, c) {
    var d = this.elements,
      e = THREE.Matrix4.__m1,
      f = THREE.Matrix4.__m2;
    e.identity();
    e.setRotationFromQuaternion(b);
    f.makeScale(c.x, c.y, c.z);
    this.multiply(e, f);
    d[12] = a.x;
    d[13] = a.y;
    d[14] = a.z;
    return this;
  },
  decompose: function (a, b, c) {
    var d = this.elements,
      e = THREE.Matrix4.__v1,
      f = THREE.Matrix4.__v2,
      g = THREE.Matrix4.__v3;
    e.set(d[0], d[1], d[2]);
    f.set(d[4], d[5], d[6]);
    g.set(d[8], d[9], d[10]);
    a = a instanceof THREE.Vector3 ? a : new THREE.Vector3();
    b = b instanceof THREE.Quaternion ? b : new THREE.Quaternion();
    c = c instanceof THREE.Vector3 ? c : new THREE.Vector3();
    c.x = e.length();
    c.y = f.length();
    c.z = g.length();
    a.x = d[12];
    a.y = d[13];
    a.z = d[14];
    d = THREE.Matrix4.__m1;
    d.copy(this);
    d.elements[0] /= c.x;
    d.elements[1] /= c.x;
    d.elements[2] /= c.x;
    d.elements[4] /= c.y;
    d.elements[5] /= c.y;
    d.elements[6] /= c.y;
    d.elements[8] /= c.z;
    d.elements[9] /= c.z;
    d.elements[10] /= c.z;
    b.setFromRotationMatrix(d);
    return [a, b, c];
  },
  extractPosition: function (a) {
    var b = this.elements,
      a = a.elements;
    b[12] = a[12];
    b[13] = a[13];
    b[14] = a[14];
    return this;
  },
  extractRotation: function (a) {
    var b = this.elements,
      a = a.elements,
      c = THREE.Matrix4.__v1,
      d = 1 / c.set(a[0], a[1], a[2]).length(),
      e = 1 / c.set(a[4], a[5], a[6]).length(),
      c = 1 / c.set(a[8], a[9], a[10]).length();
    b[0] = a[0] * d;
    b[1] = a[1] * d;
    b[2] = a[2] * d;
    b[4] = a[4] * e;
    b[5] = a[5] * e;
    b[6] = a[6] * e;
    b[8] = a[8] * c;
    b[9] = a[9] * c;
    b[10] = a[10] * c;
    return this;
  },
  translate: function (a) {
    var b = this.elements,
      c = a.x,
      d = a.y,
      a = a.z;
    b[12] = b[0] * c + b[4] * d + b[8] * a + b[12];
    b[13] = b[1] * c + b[5] * d + b[9] * a + b[13];
    b[14] = b[2] * c + b[6] * d + b[10] * a + b[14];
    b[15] = b[3] * c + b[7] * d + b[11] * a + b[15];
    return this;
  },
  rotateX: function (a) {
    var b = this.elements,
      c = b[4],
      d = b[5],
      e = b[6],
      f = b[7],
      g = b[8],
      h = b[9],
      i = b[10],
      j = b[11],
      l = Math.cos(a),
      a = Math.sin(a);
    b[4] = l * c + a * g;
    b[5] = l * d + a * h;
    b[6] = l * e + a * i;
    b[7] = l * f + a * j;
    b[8] = l * g - a * c;
    b[9] = l * h - a * d;
    b[10] = l * i - a * e;
    b[11] = l * j - a * f;
    return this;
  },
  rotateY: function (a) {
    var b = this.elements,
      c = b[0],
      d = b[1],
      e = b[2],
      f = b[3],
      g = b[8],
      h = b[9],
      i = b[10],
      j = b[11],
      l = Math.cos(a),
      a = Math.sin(a);
    b[0] = l * c - a * g;
    b[1] = l * d - a * h;
    b[2] = l * e - a * i;
    b[3] = l * f - a * j;
    b[8] = l * g + a * c;
    b[9] = l * h + a * d;
    b[10] = l * i + a * e;
    b[11] = l * j + a * f;
    return this;
  },
  rotateZ: function (a) {
    var b = this.elements,
      c = b[0],
      d = b[1],
      e = b[2],
      f = b[3],
      g = b[4],
      h = b[5],
      i = b[6],
      j = b[7],
      l = Math.cos(a),
      a = Math.sin(a);
    b[0] = l * c + a * g;
    b[1] = l * d + a * h;
    b[2] = l * e + a * i;
    b[3] = l * f + a * j;
    b[4] = l * g - a * c;
    b[5] = l * h - a * d;
    b[6] = l * i - a * e;
    b[7] = l * j - a * f;
    return this;
  },
  rotateByAxis: function (a, b) {
    var c = this.elements;
    if (1 === a.x && 0 === a.y && 0 === a.z) return this.rotateX(b);
    if (0 === a.x && 1 === a.y && 0 === a.z) return this.rotateY(b);
    if (0 === a.x && 0 === a.y && 1 === a.z) return this.rotateZ(b);
    var d = a.x,
      e = a.y,
      f = a.z,
      g = Math.sqrt(d * d + e * e + f * f),
      d = d / g,
      e = e / g,
      f = f / g,
      g = d * d,
      h = e * e,
      i = f * f,
      j = Math.cos(b),
      l = Math.sin(b),
      m = 1 - j,
      n = d * e * m,
      p = d * f * m,
      m = e * f * m,
      d = d * l,
      o = e * l,
      l = f * l,
      f = g + (1 - g) * j,
      g = n + l,
      e = p - o,
      n = n - l,
      h = h + (1 - h) * j,
      l = m + d,
      p = p + o,
      m = m - d,
      i = i + (1 - i) * j,
      j = c[0],
      d = c[1],
      o = c[2],
      s = c[3],
      t = c[4],
      r = c[5],
      z = c[6],
      w = c[7],
      q = c[8],
      E = c[9],
      A = c[10],
      v = c[11];
    c[0] = f * j + g * t + e * q;
    c[1] = f * d + g * r + e * E;
    c[2] = f * o + g * z + e * A;
    c[3] = f * s + g * w + e * v;
    c[4] = n * j + h * t + l * q;
    c[5] = n * d + h * r + l * E;
    c[6] = n * o + h * z + l * A;
    c[7] = n * s + h * w + l * v;
    c[8] = p * j + m * t + i * q;
    c[9] = p * d + m * r + i * E;
    c[10] = p * o + m * z + i * A;
    c[11] = p * s + m * w + i * v;
    return this;
  },
  scale: function (a) {
    var b = this.elements,
      c = a.x,
      d = a.y,
      a = a.z;
    b[0] *= c;
    b[4] *= d;
    b[8] *= a;
    b[1] *= c;
    b[5] *= d;
    b[9] *= a;
    b[2] *= c;
    b[6] *= d;
    b[10] *= a;
    b[3] *= c;
    b[7] *= d;
    b[11] *= a;
    return this;
  },
  getMaxScaleOnAxis: function () {
    var a = this.elements;
    return Math.sqrt(
      Math.max(
        a[0] * a[0] + a[1] * a[1] + a[2] * a[2],
        Math.max(
          a[4] * a[4] + a[5] * a[5] + a[6] * a[6],
          a[8] * a[8] + a[9] * a[9] + a[10] * a[10]
        )
      )
    );
  },
  makeTranslation: function (a, b, c) {
    this.set(1, 0, 0, a, 0, 1, 0, b, 0, 0, 1, c, 0, 0, 0, 1);
    return this;
  },
  makeRotationX: function (a) {
    var b = Math.cos(a),
      a = Math.sin(a);
    this.set(1, 0, 0, 0, 0, b, -a, 0, 0, a, b, 0, 0, 0, 0, 1);
    return this;
  },
  makeRotationY: function (a) {
    var b = Math.cos(a),
      a = Math.sin(a);
    this.set(b, 0, a, 0, 0, 1, 0, 0, -a, 0, b, 0, 0, 0, 0, 1);
    return this;
  },
  makeRotationZ: function (a) {
    var b = Math.cos(a),
      a = Math.sin(a);
    this.set(b, -a, 0, 0, a, b, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    return this;
  },
  makeRotationAxis: function (a, b) {
    var c = Math.cos(b),
      d = Math.sin(b),
      e = 1 - c,
      f = a.x,
      g = a.y,
      h = a.z,
      i = e * f,
      j = e * g;
    this.set(
      i * f + c,
      i * g - d * h,
      i * h + d * g,
      0,
      i * g + d * h,
      j * g + c,
      j * h - d * f,
      0,
      i * h - d * g,
      j * h + d * f,
      e * h * h + c,
      0,
      0,
      0,
      0,
      1
    );
    return this;
  },
  makeScale: function (a, b, c) {
    this.set(a, 0, 0, 0, 0, b, 0, 0, 0, 0, c, 0, 0, 0, 0, 1);
    return this;
  },
  makeFrustum: function (a, b, c, d, e, f) {
    var g = this.elements;
    g[0] = (2 * e) / (b - a);
    g[4] = 0;
    g[8] = (b + a) / (b - a);
    g[12] = 0;
    g[1] = 0;
    g[5] = (2 * e) / (d - c);
    g[9] = (d + c) / (d - c);
    g[13] = 0;
    g[2] = 0;
    g[6] = 0;
    g[10] = -(f + e) / (f - e);
    g[14] = (-2 * f * e) / (f - e);
    g[3] = 0;
    g[7] = 0;
    g[11] = -1;
    g[15] = 0;
    return this;
  },
  makePerspective: function (a, b, c, d) {
    var a = c * Math.tan((a * Math.PI) / 360),
      e = -a;
    return this.makeFrustum(e * b, a * b, e, a, c, d);
  },
  makeOrthographic: function (a, b, c, d, e, f) {
    var g = this.elements,
      h = b - a,
      i = c - d,
      j = f - e;
    g[0] = 2 / h;
    g[4] = 0;
    g[8] = 0;
    g[12] = -((b + a) / h);
    g[1] = 0;
    g[5] = 2 / i;
    g[9] = 0;
    g[13] = -((c + d) / i);
    g[2] = 0;
    g[6] = 0;
    g[10] = -2 / j;
    g[14] = -((f + e) / j);
    g[3] = 0;
    g[7] = 0;
    g[11] = 0;
    g[15] = 1;
    return this;
  },
  clone: function () {
    var a = this.elements;
    return new THREE.Matrix4(
      a[0],
      a[4],
      a[8],
      a[12],
      a[1],
      a[5],
      a[9],
      a[13],
      a[2],
      a[6],
      a[10],
      a[14],
      a[3],
      a[7],
      a[11],
      a[15]
    );
  },
};
THREE.Matrix4.__v1 = new THREE.Vector3();
THREE.Matrix4.__v2 = new THREE.Vector3();
THREE.Matrix4.__v3 = new THREE.Vector3();
THREE.Matrix4.__m1 = new THREE.Matrix4();
THREE.Matrix4.__m2 = new THREE.Matrix4();
THREE.EventTarget = function () {
  var a = {};
  this.addEventListener = function (b, c) {
    void 0 === a[b] && (a[b] = []);
    -1 === a[b].indexOf(c) && a[b].push(c);
  };
  this.dispatchEvent = function (b) {
    for (var c in a[b.type]) a[b.type][c](b);
  };
  this.removeEventListener = function (b, c) {
    var d = a[b].indexOf(c);
    -1 !== d && a[b].splice(d, 1);
  };
};
THREE.Frustum = function () {
  this.planes = [
    new THREE.Vector4(),
    new THREE.Vector4(),
    new THREE.Vector4(),
    new THREE.Vector4(),
    new THREE.Vector4(),
    new THREE.Vector4(),
  ];
};
THREE.Frustum.prototype.setFromMatrix = function (a) {
  var b = this.planes,
    c = a.elements,
    a = c[0],
    d = c[1],
    e = c[2],
    f = c[3],
    g = c[4],
    h = c[5],
    i = c[6],
    j = c[7],
    l = c[8],
    m = c[9],
    n = c[10],
    p = c[11],
    o = c[12],
    s = c[13],
    t = c[14],
    c = c[15];
  b[0].set(f - a, j - g, p - l, c - o);
  b[1].set(f + a, j + g, p + l, c + o);
  b[2].set(f + d, j + h, p + m, c + s);
  b[3].set(f - d, j - h, p - m, c - s);
  b[4].set(f - e, j - i, p - n, c - t);
  b[5].set(f + e, j + i, p + n, c + t);
  for (d = 0; 6 > d; d++)
    (a = b[d]), a.divideScalar(Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z));
};
THREE.Frustum.prototype.contains = function (a) {
  for (
    var b = 0,
      c = this.planes,
      b = a.matrixWorld,
      d = b.elements,
      a = -a.geometry.boundingSphere.radius * b.getMaxScaleOnAxis(),
      e = 0;
    6 > e;
    e++
  )
    if (
      ((b = c[e].x * d[12] + c[e].y * d[13] + c[e].z * d[14] + c[e].w), b <= a)
    )
      return !1;
  return !0;
};
THREE.Frustum.__v1 = new THREE.Vector3();
(function (a) {
  a.Ray = function (b, c, d, e) {
    this.origin = b || new a.Vector3();
    this.direction = c || new a.Vector3();
    this.near = d || 0;
    this.far = e || Infinity;
  };
  var b = new a.Vector3(),
    c = new a.Vector3(),
    d = new a.Vector3(),
    e = new a.Vector3();
  new a.Vector3();
  var f = new a.Vector3(),
    g = new a.Matrix4(),
    h = function (a, b) {
      return a.distance - b.distance;
    },
    i = new a.Vector3(),
    j = new a.Vector3(),
    l = new a.Vector3(),
    m = function (a, b, c) {
      i.sub(c, a);
      var d = i.dot(b),
        a = j.add(a, l.copy(b).multiplyScalar(d));
      return c.distanceTo(a);
    },
    n = function (a, b, c, d) {
      i.sub(d, b);
      j.sub(c, b);
      l.sub(a, b);
      var a = i.dot(i),
        b = i.dot(j),
        c = i.dot(l),
        e = j.dot(j),
        d = j.dot(l),
        f = 1 / (a * e - b * b),
        e = (e * c - b * d) * f,
        a = (a * d - b * c) * f;
      return 0 <= e && 0 <= a && 1 > e + a;
    },
    p = function (h, i, j) {
      if (h instanceof a.Particle) {
        var l = m(i.origin, i.direction, h.matrixWorld.getPosition());
        if (l > h.scale.x) return j;
        j.push({
          distance: l,
          point: h.position,
          face: null,
          object: h,
        });
      } else if (h instanceof a.Mesh) {
        var o =
            h.geometry.boundingSphere.radius *
            h.matrixWorld.getMaxScaleOnAxis(),
          l = m(i.origin, i.direction, h.matrixWorld.getPosition());
        if (l > o) return j;
        var o = h.geometry,
          p = o.vertices,
          E = h.material instanceof a.MeshFaceMaterial,
          A = !0 === E ? h.material.materials : null,
          l = h.material.side,
          v,
          u,
          D,
          C = i.precision;
        h.matrixRotationWorld.extractRotation(h.matrixWorld);
        b.copy(i.origin);
        g.getInverse(h.matrixWorld);
        c.copy(b);
        g.multiplyVector3(c);
        d.copy(i.direction);
        g.rotateAxis(d).normalize();
        for (var G = 0, P = o.faces.length; G < P; G++) {
          var B = o.faces[G],
            l = !0 === E ? A[B.materialIndex] : h.material;
          if (
            void 0 !== l &&
            ((l = l.side),
            e.sub(B.centroid, c),
            (u = B.normal),
            (v = d.dot(u)),
            !(Math.abs(v) < C) &&
              ((u = u.dot(e) / v),
              !(0 > u) &&
                (l === a.DoubleSide || (l === a.FrontSide ? 0 > v : 0 < v))))
          )
            if ((f.add(c, d.multiplyScalar(u)), B instanceof a.Face3))
              (l = p[B.a]),
                (v = p[B.b]),
                (u = p[B.c]),
                n(f, l, v, u) &&
                  ((v = h.matrixWorld.multiplyVector3(f.clone())),
                  (l = b.distanceTo(v)),
                  l < i.near ||
                    l > i.far ||
                    j.push({
                      distance: l,
                      point: v,
                      face: B,
                      faceIndex: G,
                      object: h,
                    }));
            else if (
              B instanceof a.Face4 &&
              ((l = p[B.a]),
              (v = p[B.b]),
              (u = p[B.c]),
              (D = p[B.d]),
              n(f, l, v, D) || n(f, v, u, D))
            )
              (v = h.matrixWorld.multiplyVector3(f.clone())),
                (l = b.distanceTo(v)),
                l < i.near ||
                  l > i.far ||
                  j.push({
                    distance: l,
                    point: v,
                    face: B,
                    faceIndex: G,
                    object: h,
                  });
        }
      }
    },
    o = function (a, b, c) {
      for (var a = a.getDescendants(), d = 0, e = a.length; d < e; d++)
        p(a[d], b, c);
    };
  a.Ray.prototype.precision = 1e-4;
  a.Ray.prototype.set = function (a, b) {
    this.origin = a;
    this.direction = b;
  };
  a.Ray.prototype.intersectObject = function (a, b) {
    var c = [];
    !0 === b && o(a, this, c);
    p(a, this, c);
    c.sort(h);
    return c;
  };
  a.Ray.prototype.intersectObjects = function (a, b) {
    for (var c = [], d = 0, e = a.length; d < e; d++)
      p(a[d], this, c), !0 === b && o(a[d], this, c);
    c.sort(h);
    return c;
  };
})(THREE);
THREE.Rectangle = function () {
  function a() {
    f = d - b;
    g = e - c;
  }
  var b = 0,
    c = 0,
    d = 0,
    e = 0,
    f = 0,
    g = 0,
    h = !0;
  this.getX = function () {
    return b;
  };
  this.getY = function () {
    return c;
  };
  this.getWidth = function () {
    return f;
  };
  this.getHeight = function () {
    return g;
  };
  this.getLeft = function () {
    return b;
  };
  this.getTop = function () {
    return c;
  };
  this.getRight = function () {
    return d;
  };
  this.getBottom = function () {
    return e;
  };
  this.set = function (f, g, l, m) {
    h = !1;
    b = f;
    c = g;
    d = l;
    e = m;
    a();
  };
  this.addPoint = function (f, g) {
    !0 === h
      ? ((h = !1), (b = f), (c = g), (d = f), (e = g))
      : ((b = b < f ? b : f),
        (c = c < g ? c : g),
        (d = d > f ? d : f),
        (e = e > g ? e : g));
    a();
  };
  this.add3Points = function (f, g, l, m, n, p) {
    !0 === h
      ? ((h = !1),
        (b = f < l ? (f < n ? f : n) : l < n ? l : n),
        (c = g < m ? (g < p ? g : p) : m < p ? m : p),
        (d = f > l ? (f > n ? f : n) : l > n ? l : n),
        (e = g > m ? (g > p ? g : p) : m > p ? m : p))
      : ((b =
          f < l
            ? f < n
              ? f < b
                ? f
                : b
              : n < b
              ? n
              : b
            : l < n
            ? l < b
              ? l
              : b
            : n < b
            ? n
            : b),
        (c =
          g < m
            ? g < p
              ? g < c
                ? g
                : c
              : p < c
              ? p
              : c
            : m < p
            ? m < c
              ? m
              : c
            : p < c
            ? p
            : c),
        (d =
          f > l
            ? f > n
              ? f > d
                ? f
                : d
              : n > d
              ? n
              : d
            : l > n
            ? l > d
              ? l
              : d
            : n > d
            ? n
            : d),
        (e =
          g > m
            ? g > p
              ? g > e
                ? g
                : e
              : p > e
              ? p
              : e
            : m > p
            ? m > e
              ? m
              : e
            : p > e
            ? p
            : e));
    a();
  };
  this.addRectangle = function (f) {
    !0 === h
      ? ((h = !1),
        (b = f.getLeft()),
        (c = f.getTop()),
        (d = f.getRight()),
        (e = f.getBottom()))
      : ((b = b < f.getLeft() ? b : f.getLeft()),
        (c = c < f.getTop() ? c : f.getTop()),
        (d = d > f.getRight() ? d : f.getRight()),
        (e = e > f.getBottom() ? e : f.getBottom()));
    a();
  };
  this.inflate = function (f) {
    b -= f;
    c -= f;
    d += f;
    e += f;
    a();
  };
  this.minSelf = function (f) {
    b = b > f.getLeft() ? b : f.getLeft();
    c = c > f.getTop() ? c : f.getTop();
    d = d < f.getRight() ? d : f.getRight();
    e = e < f.getBottom() ? e : f.getBottom();
    a();
  };
  this.intersects = function (a) {
    return d < a.getLeft() ||
      b > a.getRight() ||
      e < a.getTop() ||
      c > a.getBottom()
      ? !1
      : !0;
  };
  this.empty = function () {
    h = !0;
    e = d = c = b = 0;
    a();
  };
  this.isEmpty = function () {
    return h;
  };
};
THREE.Math = {
  clamp: function (a, b, c) {
    return a < b ? b : a > c ? c : a;
  },
  clampBottom: function (a, b) {
    return a < b ? b : a;
  },
  mapLinear: function (a, b, c, d, e) {
    return d + ((a - b) * (e - d)) / (c - b);
  },
  random16: function () {
    return (65280 * Math.random() + 255 * Math.random()) / 65535;
  },
  randInt: function (a, b) {
    return a + Math.floor(Math.random() * (b - a + 1));
  },
  randFloat: function (a, b) {
    return a + Math.random() * (b - a);
  },
  randFloatSpread: function (a) {
    return a * (0.5 - Math.random());
  },
  sign: function (a) {
    return 0 > a ? -1 : 0 < a ? 1 : 0;
  },
};
THREE.Object3D = function () {
  THREE.Object3DLibrary.push(this);
  this.id = THREE.Object3DIdCount++;
  this.name = "";
  this.properties = {};
  this.parent = void 0;
  this.children = [];
  this.up = new THREE.Vector3(0, 1, 0);
  this.position = new THREE.Vector3();
  this.rotation = new THREE.Vector3();
  this.eulerOrder = THREE.Object3D.defaultEulerOrder;
  this.scale = new THREE.Vector3(1, 1, 1);
  this.renderDepth = null;
  this.rotationAutoUpdate = !0;
  this.matrix = new THREE.Matrix4();
  this.matrixWorld = new THREE.Matrix4();
  this.matrixRotationWorld = new THREE.Matrix4();
  this.matrixWorldNeedsUpdate = this.matrixAutoUpdate = !0;
  this.quaternion = new THREE.Quaternion();
  this.useQuaternion = !1;
  this.boundRadius = 0;
  this.boundRadiusScale = 1;
  this.visible = !0;
  this.receiveShadow = this.castShadow = !1;
  this.frustumCulled = !0;
  this._vector = new THREE.Vector3();
};
THREE.Object3D.prototype = {
  constructor: THREE.Object3D,
  applyMatrix: function (a) {
    this.matrix.multiply(a, this.matrix);
    this.scale.getScaleFromMatrix(this.matrix);
    a = new THREE.Matrix4().extractRotation(this.matrix);
    this.rotation.setEulerFromRotationMatrix(a, this.eulerOrder);
    this.position.getPositionFromMatrix(this.matrix);
  },
  translate: function (a, b) {
    this.matrix.rotateAxis(b);
    this.position.addSelf(b.multiplyScalar(a));
  },
  translateX: function (a) {
    this.translate(a, this._vector.set(1, 0, 0));
  },
  translateY: function (a) {
    this.translate(a, this._vector.set(0, 1, 0));
  },
  translateZ: function (a) {
    this.translate(a, this._vector.set(0, 0, 1));
  },
  localToWorld: function (a) {
    return this.matrixWorld.multiplyVector3(a);
  },
  worldToLocal: function (a) {
    return THREE.Object3D.__m1.getInverse(this.matrixWorld).multiplyVector3(a);
  },
  lookAt: function (a) {
    this.matrix.lookAt(a, this.position, this.up);
    this.rotationAutoUpdate &&
      (!1 === this.useQuaternion
        ? this.rotation.setEulerFromRotationMatrix(this.matrix, this.eulerOrder)
        : this.quaternion.copy(this.matrix.decompose()[1]));
  },
  add: function (a) {
    if (a === this)
      console.warn(
        "THREE.Object3D.add: An object can't be added as a child of itself."
      );
    else if (a instanceof THREE.Object3D) {
      void 0 !== a.parent && a.parent.remove(a);
      a.parent = this;
      this.children.push(a);
      for (var b = this; void 0 !== b.parent; ) b = b.parent;
      void 0 !== b && b instanceof THREE.Scene && b.__addObject(a);
    }
  },
  remove: function (a) {
    var b = this.children.indexOf(a);
    if (-1 !== b) {
      a.parent = void 0;
      this.children.splice(b, 1);
      for (b = this; void 0 !== b.parent; ) b = b.parent;
      void 0 !== b && b instanceof THREE.Scene && b.__removeObject(a);
    }
  },
  traverse: function (a) {
    a(this);
    for (var b = 0, c = this.children.length; b < c; b++)
      this.children[b].traverse(a);
  },
  getChildByName: function (a, b) {
    for (var c = 0, d = this.children.length; c < d; c++) {
      var e = this.children[c];
      if (
        e.name === a ||
        (!0 === b && ((e = e.getChildByName(a, b)), void 0 !== e))
      )
        return e;
    }
  },
  getDescendants: function (a) {
    void 0 === a && (a = []);
    Array.prototype.push.apply(a, this.children);
    for (var b = 0, c = this.children.length; b < c; b++)
      this.children[b].getDescendants(a);
    return a;
  },
  updateMatrix: function () {
    this.matrix.setPosition(this.position);
    !1 === this.useQuaternion
      ? this.matrix.setRotationFromEuler(this.rotation, this.eulerOrder)
      : this.matrix.setRotationFromQuaternion(this.quaternion);
    if (1 !== this.scale.x || 1 !== this.scale.y || 1 !== this.scale.z)
      this.matrix.scale(this.scale),
        (this.boundRadiusScale = Math.max(
          this.scale.x,
          Math.max(this.scale.y, this.scale.z)
        ));
    this.matrixWorldNeedsUpdate = !0;
  },
  updateMatrixWorld: function (a) {
    !0 === this.matrixAutoUpdate && this.updateMatrix();
    if (!0 === this.matrixWorldNeedsUpdate || !0 === a)
      void 0 === this.parent
        ? this.matrixWorld.copy(this.matrix)
        : this.matrixWorld.multiply(this.parent.matrixWorld, this.matrix),
        (this.matrixWorldNeedsUpdate = !1),
        (a = !0);
    for (var b = 0, c = this.children.length; b < c; b++)
      this.children[b].updateMatrixWorld(a);
  },
  clone: function (a) {
    void 0 === a && (a = new THREE.Object3D());
    a.name = this.name;
    a.up.copy(this.up);
    a.position.copy(this.position);
    a.rotation instanceof THREE.Vector3 && a.rotation.copy(this.rotation);
    a.eulerOrder = this.eulerOrder;
    a.scale.copy(this.scale);
    a.renderDepth = this.renderDepth;
    a.rotationAutoUpdate = this.rotationAutoUpdate;
    a.matrix.copy(this.matrix);
    a.matrixWorld.copy(this.matrixWorld);
    a.matrixRotationWorld.copy(this.matrixRotationWorld);
    a.matrixAutoUpdate = this.matrixAutoUpdate;
    a.matrixWorldNeedsUpdate = this.matrixWorldNeedsUpdate;
    a.quaternion.copy(this.quaternion);
    a.useQuaternion = this.useQuaternion;
    a.boundRadius = this.boundRadius;
    a.boundRadiusScale = this.boundRadiusScale;
    a.visible = this.visible;
    a.castShadow = this.castShadow;
    a.receiveShadow = this.receiveShadow;
    a.frustumCulled = this.frustumCulled;
    for (var b = 0; b < this.children.length; b++)
      a.add(this.children[b].clone());
    return a;
  },
  deallocate: function () {
    var a = THREE.Object3DLibrary.indexOf(this);
    -1 !== a && THREE.Object3DLibrary.splice(a, 1);
  },
};
THREE.Object3D.__m1 = new THREE.Matrix4();
THREE.Object3D.defaultEulerOrder = "XYZ";
THREE.Object3DIdCount = 0;
THREE.Object3DLibrary = [];
THREE.Projector = function () {
  function a() {
    if (f === h) {
      var a = new THREE.RenderableObject();
      g.push(a);
      h++;
      f++;
      return a;
    }
    return g[f++];
  }
  function b() {
    if (j === m) {
      var a = new THREE.RenderableVertex();
      l.push(a);
      m++;
      j++;
      return a;
    }
    return l[j++];
  }
  function c(a, b) {
    return b.z - a.z;
  }
  function d(a, b) {
    var c = 0,
      d = 1,
      e = a.z + a.w,
      f = b.z + b.w,
      g = -a.z + a.w,
      h = -b.z + b.w;
    if (0 <= e && 0 <= f && 0 <= g && 0 <= h) return !0;
    if ((0 > e && 0 > f) || (0 > g && 0 > h)) return !1;
    0 > e
      ? (c = Math.max(c, e / (e - f)))
      : 0 > f && (d = Math.min(d, e / (e - f)));
    0 > g
      ? (c = Math.max(c, g / (g - h)))
      : 0 > h && (d = Math.min(d, g / (g - h)));
    if (d < c) return !1;
    a.lerpSelf(b, c);
    b.lerpSelf(a, 1 - d);
    return !0;
  }
  var e,
    f,
    g = [],
    h = 0,
    i,
    j,
    l = [],
    m = 0,
    n,
    p,
    o = [],
    s = 0,
    t,
    r = [],
    z = 0,
    w,
    q,
    E = [],
    A = 0,
    v,
    u,
    D = [],
    C = 0,
    G = {
      objects: [],
      sprites: [],
      lights: [],
      elements: [],
    },
    P = new THREE.Vector3(),
    B = new THREE.Vector4(),
    K = new THREE.Matrix4(),
    H = new THREE.Matrix4(),
    I = new THREE.Matrix3(),
    N = new THREE.Frustum(),
    O = new THREE.Vector4(),
    R = new THREE.Vector4();
  this.projectVector = function (a, b) {
    b.matrixWorldInverse.getInverse(b.matrixWorld);
    K.multiply(b.projectionMatrix, b.matrixWorldInverse);
    K.multiplyVector3(a);
    return a;
  };
  this.unprojectVector = function (a, b) {
    b.projectionMatrixInverse.getInverse(b.projectionMatrix);
    K.multiply(b.matrixWorld, b.projectionMatrixInverse);
    K.multiplyVector3(a);
    return a;
  };
  this.pickingRay = function (a, b) {
    var c;
    a.z = -1;
    c = new THREE.Vector3(a.x, a.y, 1);
    this.unprojectVector(a, b);
    this.unprojectVector(c, b);
    c.subSelf(a).normalize();
    return new THREE.Ray(a, c);
  };
  this.projectScene = function (g, h, m, Q) {
    var Z = h.near,
      L = h.far,
      oa = !1,
      X,
      fa,
      ca,
      Y,
      ba,
      aa,
      ia,
      Aa,
      Na,
      Ja,
      ma,
      sa,
      Ea,
      rb,
      ib;
    u = q = t = p = 0;
    G.elements.length = 0;
    g.updateMatrixWorld();
    void 0 === h.parent && h.updateMatrixWorld();
    h.matrixWorldInverse.getInverse(h.matrixWorld);
    K.multiply(h.projectionMatrix, h.matrixWorldInverse);
    N.setFromMatrix(K);
    f = 0;
    G.objects.length = 0;
    G.sprites.length = 0;
    G.lights.length = 0;
    var ob = function (b) {
      for (var c = 0, d = b.children.length; c < d; c++) {
        var f = b.children[c];
        if (!1 !== f.visible) {
          if (f instanceof THREE.Light) G.lights.push(f);
          else if (f instanceof THREE.Mesh || f instanceof THREE.Line) {
            if (!1 === f.frustumCulled || !0 === N.contains(f))
              (e = a()),
                (e.object = f),
                null !== f.renderDepth
                  ? (e.z = f.renderDepth)
                  : (P.copy(f.matrixWorld.getPosition()),
                    K.multiplyVector3(P),
                    (e.z = P.z)),
                G.objects.push(e);
          } else
            f instanceof THREE.Sprite || f instanceof THREE.Particle
              ? ((e = a()),
                (e.object = f),
                null !== f.renderDepth
                  ? (e.z = f.renderDepth)
                  : (P.copy(f.matrixWorld.getPosition()),
                    K.multiplyVector3(P),
                    (e.z = P.z)),
                G.sprites.push(e))
              : ((e = a()),
                (e.object = f),
                null !== f.renderDepth
                  ? (e.z = f.renderDepth)
                  : (P.copy(f.matrixWorld.getPosition()),
                    K.multiplyVector3(P),
                    (e.z = P.z)),
                G.objects.push(e));
          ob(f);
        }
      }
    };
    ob(g);
    !0 === m && G.objects.sort(c);
    g = 0;
    for (m = G.objects.length; g < m; g++)
      if (
        ((Aa = G.objects[g].object),
        (Na = Aa.matrixWorld),
        (j = 0),
        Aa instanceof THREE.Mesh)
      ) {
        Ja = Aa.geometry;
        ca = Ja.vertices;
        ma = Ja.faces;
        Ja = Ja.faceVertexUvs;
        I.getInverse(Na);
        I.transpose();
        Ea = Aa.material instanceof THREE.MeshFaceMaterial;
        rb = !0 === Ea ? Aa.material : null;
        X = 0;
        for (fa = ca.length; X < fa; X++)
          (i = b()),
            i.positionWorld.copy(ca[X]),
            Na.multiplyVector3(i.positionWorld),
            i.positionScreen.copy(i.positionWorld),
            K.multiplyVector4(i.positionScreen),
            (i.positionScreen.x /= i.positionScreen.w),
            (i.positionScreen.y /= i.positionScreen.w),
            (i.visible = i.positionScreen.z > Z && i.positionScreen.z < L);
        ca = 0;
        for (X = ma.length; ca < X; ca++)
          if (
            ((fa = ma[ca]),
            (ib = !0 === Ea ? rb.materials[fa.materialIndex] : Aa.material),
            void 0 !== ib)
          ) {
            aa = ib.side;
            if (fa instanceof THREE.Face3)
              if (
                ((Y = l[fa.a]),
                (ba = l[fa.b]),
                (ia = l[fa.c]),
                !0 === Y.visible && !0 === ba.visible && !0 === ia.visible)
              )
                if (
                  ((oa =
                    0 >
                    (ia.positionScreen.x - Y.positionScreen.x) *
                      (ba.positionScreen.y - Y.positionScreen.y) -
                      (ia.positionScreen.y - Y.positionScreen.y) *
                        (ba.positionScreen.x - Y.positionScreen.x)),
                  aa === THREE.DoubleSide || oa === (aa === THREE.FrontSide))
                )
                  p === s
                    ? ((sa = new THREE.RenderableFace3()),
                      o.push(sa),
                      s++,
                      p++,
                      (n = sa))
                    : (n = o[p++]),
                    n.v1.copy(Y),
                    n.v2.copy(ba),
                    n.v3.copy(ia);
                else continue;
              else continue;
            else if (fa instanceof THREE.Face4)
              if (
                ((Y = l[fa.a]),
                (ba = l[fa.b]),
                (ia = l[fa.c]),
                (sa = l[fa.d]),
                !0 === Y.visible &&
                  !0 === ba.visible &&
                  !0 === ia.visible &&
                  !0 === sa.visible)
              )
                if (
                  ((oa =
                    0 >
                      (sa.positionScreen.x - Y.positionScreen.x) *
                        (ba.positionScreen.y - Y.positionScreen.y) -
                        (sa.positionScreen.y - Y.positionScreen.y) *
                          (ba.positionScreen.x - Y.positionScreen.x) ||
                    0 >
                      (ba.positionScreen.x - ia.positionScreen.x) *
                        (sa.positionScreen.y - ia.positionScreen.y) -
                        (ba.positionScreen.y - ia.positionScreen.y) *
                          (sa.positionScreen.x - ia.positionScreen.x)),
                  aa === THREE.DoubleSide || oa === (aa === THREE.FrontSide))
                ) {
                  if (t === z) {
                    var jb = new THREE.RenderableFace4();
                    r.push(jb);
                    z++;
                    t++;
                    n = jb;
                  } else n = r[t++];
                  n.v1.copy(Y);
                  n.v2.copy(ba);
                  n.v3.copy(ia);
                  n.v4.copy(sa);
                } else continue;
              else continue;
            n.normalWorld.copy(fa.normal);
            !1 === oa &&
              (aa === THREE.BackSide || aa === THREE.DoubleSide) &&
              n.normalWorld.negate();
            I.multiplyVector3(n.normalWorld).normalize();
            n.centroidWorld.copy(fa.centroid);
            Na.multiplyVector3(n.centroidWorld);
            n.centroidScreen.copy(n.centroidWorld);
            K.multiplyVector3(n.centroidScreen);
            ia = fa.vertexNormals;
            Y = 0;
            for (ba = ia.length; Y < ba; Y++)
              (sa = n.vertexNormalsWorld[Y]),
                sa.copy(ia[Y]),
                !1 === oa &&
                  (aa === THREE.BackSide || aa === THREE.DoubleSide) &&
                  sa.negate(),
                I.multiplyVector3(sa).normalize();
            n.vertexNormalsLength = ia.length;
            Y = 0;
            for (ba = Ja.length; Y < ba; Y++)
              if (((sa = Ja[Y][ca]), void 0 !== sa)) {
                aa = 0;
                for (ia = sa.length; aa < ia; aa++) n.uvs[Y][aa] = sa[aa];
              }
            n.color = fa.color;
            n.material = ib;
            n.z = n.centroidScreen.z;
            G.elements.push(n);
          }
      } else if (Aa instanceof THREE.Line) {
        H.multiply(K, Na);
        ca = Aa.geometry.vertices;
        Y = b();
        Y.positionScreen.copy(ca[0]);
        H.multiplyVector4(Y.positionScreen);
        Na = Aa.type === THREE.LinePieces ? 2 : 1;
        X = 1;
        for (fa = ca.length; X < fa; X++)
          (Y = b()),
            Y.positionScreen.copy(ca[X]),
            H.multiplyVector4(Y.positionScreen),
            0 < (X + 1) % Na ||
              ((ba = l[j - 2]),
              O.copy(Y.positionScreen),
              R.copy(ba.positionScreen),
              !0 === d(O, R) &&
                (O.multiplyScalar(1 / O.w),
                R.multiplyScalar(1 / R.w),
                q === A
                  ? ((ma = new THREE.RenderableLine()),
                    E.push(ma),
                    A++,
                    q++,
                    (w = ma))
                  : (w = E[q++]),
                w.v1.positionScreen.copy(O),
                w.v2.positionScreen.copy(R),
                (w.z = Math.max(O.z, R.z)),
                (w.material = Aa.material),
                G.elements.push(w)));
      }
    g = 0;
    for (m = G.sprites.length; g < m; g++)
      (Aa = G.sprites[g].object),
        (Na = Aa.matrixWorld),
        Aa instanceof THREE.Particle &&
          (B.set(Na.elements[12], Na.elements[13], Na.elements[14], 1),
          K.multiplyVector4(B),
          (B.z /= B.w),
          0 < B.z &&
            1 > B.z &&
            (u === C
              ? ((Z = new THREE.RenderableParticle()),
                D.push(Z),
                C++,
                u++,
                (v = Z))
              : (v = D[u++]),
            (v.object = Aa),
            (v.x = B.x / B.w),
            (v.y = B.y / B.w),
            (v.z = B.z),
            (v.rotation = Aa.rotation.z),
            (v.scale.x =
              Aa.scale.x *
              Math.abs(
                v.x -
                  (B.x + h.projectionMatrix.elements[0]) /
                    (B.w + h.projectionMatrix.elements[12])
              )),
            (v.scale.y =
              Aa.scale.y *
              Math.abs(
                v.y -
                  (B.y + h.projectionMatrix.elements[5]) /
                    (B.w + h.projectionMatrix.elements[13])
              )),
            (v.material = Aa.material),
            G.elements.push(v)));
    !0 === Q && G.elements.sort(c);
    return G;
  };
};
THREE.Quaternion = function (a, b, c, d) {
  this.x = a || 0;
  this.y = b || 0;
  this.z = c || 0;
  this.w = void 0 !== d ? d : 1;
};
THREE.Quaternion.prototype = {
  constructor: THREE.Quaternion,
  set: function (a, b, c, d) {
    this.x = a;
    this.y = b;
    this.z = c;
    this.w = d;
    return this;
  },
  copy: function (a) {
    this.x = a.x;
    this.y = a.y;
    this.z = a.z;
    this.w = a.w;
    return this;
  },
  setFromEuler: function (a, b) {
    var c = Math.cos(a.x / 2),
      d = Math.cos(a.y / 2),
      e = Math.cos(a.z / 2),
      f = Math.sin(a.x / 2),
      g = Math.sin(a.y / 2),
      h = Math.sin(a.z / 2);
    void 0 === b || "XYZ" === b
      ? ((this.x = f * d * e + c * g * h),
        (this.y = c * g * e - f * d * h),
        (this.z = c * d * h + f * g * e),
        (this.w = c * d * e - f * g * h))
      : "YXZ" === b
      ? ((this.x = f * d * e + c * g * h),
        (this.y = c * g * e - f * d * h),
        (this.z = c * d * h - f * g * e),
        (this.w = c * d * e + f * g * h))
      : "ZXY" === b
      ? ((this.x = f * d * e - c * g * h),
        (this.y = c * g * e + f * d * h),
        (this.z = c * d * h + f * g * e),
        (this.w = c * d * e - f * g * h))
      : "ZYX" === b
      ? ((this.x = f * d * e - c * g * h),
        (this.y = c * g * e + f * d * h),
        (this.z = c * d * h - f * g * e),
        (this.w = c * d * e + f * g * h))
      : "YZX" === b
      ? ((this.x = f * d * e + c * g * h),
        (this.y = c * g * e + f * d * h),
        (this.z = c * d * h - f * g * e),
        (this.w = c * d * e - f * g * h))
      : "XZY" === b &&
        ((this.x = f * d * e - c * g * h),
        (this.y = c * g * e - f * d * h),
        (this.z = c * d * h + f * g * e),
        (this.w = c * d * e + f * g * h));
    return this;
  },
  setFromAxisAngle: function (a, b) {
    var c = b / 2,
      d = Math.sin(c);
    this.x = a.x * d;
    this.y = a.y * d;
    this.z = a.z * d;
    this.w = Math.cos(c);
    return this;
  },
  setFromRotationMatrix: function (a) {
    var b = a.elements,
      c = b[0],
      a = b[4],
      d = b[8],
      e = b[1],
      f = b[5],
      g = b[9],
      h = b[2],
      i = b[6],
      b = b[10],
      j = c + f + b;
    0 < j
      ? ((c = 0.5 / Math.sqrt(j + 1)),
        (this.w = 0.25 / c),
        (this.x = (i - g) * c),
        (this.y = (d - h) * c),
        (this.z = (e - a) * c))
      : c > f && c > b
      ? ((c = 2 * Math.sqrt(1 + c - f - b)),
        (this.w = (i - g) / c),
        (this.x = 0.25 * c),
        (this.y = (a + e) / c),
        (this.z = (d + h) / c))
      : f > b
      ? ((c = 2 * Math.sqrt(1 + f - c - b)),
        (this.w = (d - h) / c),
        (this.x = (a + e) / c),
        (this.y = 0.25 * c),
        (this.z = (g + i) / c))
      : ((c = 2 * Math.sqrt(1 + b - c - f)),
        (this.w = (e - a) / c),
        (this.x = (d + h) / c),
        (this.y = (g + i) / c),
        (this.z = 0.25 * c));
    return this;
  },
  inverse: function () {
    this.conjugate().normalize();
    return this;
  },
  conjugate: function () {
    this.x *= -1;
    this.y *= -1;
    this.z *= -1;
    return this;
  },
  length: function () {
    return Math.sqrt(
      this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
    );
  },
  normalize: function () {
    var a = Math.sqrt(
      this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
    );
    0 === a
      ? ((this.z = this.y = this.x = 0), (this.w = 1))
      : ((a = 1 / a),
        (this.x *= a),
        (this.y *= a),
        (this.z *= a),
        (this.w *= a));
    return this;
  },
  multiply: function (a, b) {
    var c = a.x,
      d = a.y,
      e = a.z,
      f = a.w,
      g = b.x,
      h = b.y,
      i = b.z,
      j = b.w;
    this.x = c * j + d * i - e * h + f * g;
    this.y = -c * i + d * j + e * g + f * h;
    this.z = c * h - d * g + e * j + f * i;
    this.w = -c * g - d * h - e * i + f * j;
    return this;
  },
  multiplySelf: function (a) {
    var b = this.x,
      c = this.y,
      d = this.z,
      e = this.w,
      f = a.x,
      g = a.y,
      h = a.z,
      a = a.w;
    this.x = b * a + e * f + c * h - d * g;
    this.y = c * a + e * g + d * f - b * h;
    this.z = d * a + e * h + b * g - c * f;
    this.w = e * a - b * f - c * g - d * h;
    return this;
  },
  multiplyVector3: function (a, b) {
    b || (b = a);
    var c = a.x,
      d = a.y,
      e = a.z,
      f = this.x,
      g = this.y,
      h = this.z,
      i = this.w,
      j = i * c + g * e - h * d,
      l = i * d + h * c - f * e,
      m = i * e + f * d - g * c,
      c = -f * c - g * d - h * e;
    b.x = j * i + c * -f + l * -h - m * -g;
    b.y = l * i + c * -g + m * -f - j * -h;
    b.z = m * i + c * -h + j * -g - l * -f;
    return b;
  },
  slerpSelf: function (a, b) {
    var c = this.x,
      d = this.y,
      e = this.z,
      f = this.w,
      g = f * a.w + c * a.x + d * a.y + e * a.z;
    0 > g
      ? ((this.w = -a.w),
        (this.x = -a.x),
        (this.y = -a.y),
        (this.z = -a.z),
        (g = -g))
      : this.copy(a);
    if (1 <= g)
      return (this.w = f), (this.x = c), (this.y = d), (this.z = e), this;
    var h = Math.acos(g),
      i = Math.sqrt(1 - g * g);
    if (0.001 > Math.abs(i))
      return (
        (this.w = 0.5 * (f + this.w)),
        (this.x = 0.5 * (c + this.x)),
        (this.y = 0.5 * (d + this.y)),
        (this.z = 0.5 * (e + this.z)),
        this
      );
    g = Math.sin((1 - b) * h) / i;
    h = Math.sin(b * h) / i;
    this.w = f * g + this.w * h;
    this.x = c * g + this.x * h;
    this.y = d * g + this.y * h;
    this.z = e * g + this.z * h;
    return this;
  },
  clone: function () {
    return new THREE.Quaternion(this.x, this.y, this.z, this.w);
  },
};
THREE.Quaternion.slerp = function (a, b, c, d) {
  var e = a.w * b.w + a.x * b.x + a.y * b.y + a.z * b.z;
  0 > e
    ? ((c.w = -b.w), (c.x = -b.x), (c.y = -b.y), (c.z = -b.z), (e = -e))
    : c.copy(b);
  if (1 <= Math.abs(e))
    return (c.w = a.w), (c.x = a.x), (c.y = a.y), (c.z = a.z), c;
  var b = Math.acos(e),
    f = Math.sqrt(1 - e * e);
  if (0.001 > Math.abs(f))
    return (
      (c.w = 0.5 * (a.w + c.w)),
      (c.x = 0.5 * (a.x + c.x)),
      (c.y = 0.5 * (a.y + c.y)),
      (c.z = 0.5 * (a.z + c.z)),
      c
    );
  e = Math.sin((1 - d) * b) / f;
  d = Math.sin(d * b) / f;
  c.w = a.w * e + c.w * d;
  c.x = a.x * e + c.x * d;
  c.y = a.y * e + c.y * d;
  c.z = a.z * e + c.z * d;
  return c;
};
THREE.Vertex = function (a) {
  console.warn("THREE.Vertex has been DEPRECATED. Use THREE.Vector3 instead.");
  return a;
};
THREE.Face3 = function (a, b, c, d, e, f) {
  this.a = a;
  this.b = b;
  this.c = c;
  this.normal = d instanceof THREE.Vector3 ? d : new THREE.Vector3();
  this.vertexNormals = d instanceof Array ? d : [];
  this.color = e instanceof THREE.Color ? e : new THREE.Color();
  this.vertexColors = e instanceof Array ? e : [];
  this.vertexTangents = [];
  this.materialIndex = f;
  this.centroid = new THREE.Vector3();
};
THREE.Face3.prototype = {
  constructor: THREE.Face3,
  clone: function () {
    var a = new THREE.Face3(this.a, this.b, this.c);
    a.normal.copy(this.normal);
    a.color.copy(this.color);
    a.centroid.copy(this.centroid);
    a.materialIndex = this.materialIndex;
    var b, c;
    b = 0;
    for (c = this.vertexNormals.length; b < c; b++)
      a.vertexNormals[b] = this.vertexNormals[b].clone();
    b = 0;
    for (c = this.vertexColors.length; b < c; b++)
      a.vertexColors[b] = this.vertexColors[b].clone();
    b = 0;
    for (c = this.vertexTangents.length; b < c; b++)
      a.vertexTangents[b] = this.vertexTangents[b].clone();
    return a;
  },
};
THREE.Face4 = function (a, b, c, d, e, f, g) {
  this.a = a;
  this.b = b;
  this.c = c;
  this.d = d;
  this.normal = e instanceof THREE.Vector3 ? e : new THREE.Vector3();
  this.vertexNormals = e instanceof Array ? e : [];
  this.color = f instanceof THREE.Color ? f : new THREE.Color();
  this.vertexColors = f instanceof Array ? f : [];
  this.vertexTangents = [];
  this.materialIndex = g;
  this.centroid = new THREE.Vector3();
};
THREE.Face4.prototype = {
  constructor: THREE.Face4,
  clone: function () {
    var a = new THREE.Face4(this.a, this.b, this.c, this.d);
    a.normal.copy(this.normal);
    a.color.copy(this.color);
    a.centroid.copy(this.centroid);
    a.materialIndex = this.materialIndex;
    var b, c;
    b = 0;
    for (c = this.vertexNormals.length; b < c; b++)
      a.vertexNormals[b] = this.vertexNormals[b].clone();
    b = 0;
    for (c = this.vertexColors.length; b < c; b++)
      a.vertexColors[b] = this.vertexColors[b].clone();
    b = 0;
    for (c = this.vertexTangents.length; b < c; b++)
      a.vertexTangents[b] = this.vertexTangents[b].clone();
    return a;
  },
};
THREE.UV = function (a, b) {
  this.u = a || 0;
  this.v = b || 0;
};
THREE.UV.prototype = {
  constructor: THREE.UV,
  set: function (a, b) {
    this.u = a;
    this.v = b;
    return this;
  },
  copy: function (a) {
    this.u = a.u;
    this.v = a.v;
    return this;
  },
  lerpSelf: function (a, b) {
    this.u += (a.u - this.u) * b;
    this.v += (a.v - this.v) * b;
    return this;
  },
  clone: function () {
    return new THREE.UV(this.u, this.v);
  },
};
THREE.Geometry = function () {
  THREE.GeometryLibrary.push(this);
  this.id = THREE.GeometryIdCount++;
  this.name = "";
  this.vertices = [];
  this.colors = [];
  this.normals = [];
  this.faces = [];
  this.faceUvs = [[]];
  this.faceVertexUvs = [[]];
  this.morphTargets = [];
  this.morphColors = [];
  this.morphNormals = [];
  this.skinWeights = [];
  this.skinIndices = [];
  this.lineDistances = [];
  this.boundingSphere = this.boundingBox = null;
  this.hasTangents = !1;
  this.dynamic = !0;
  this.buffersNeedUpdate =
    this.lineDistancesNeedUpdate =
    this.colorsNeedUpdate =
    this.tangentsNeedUpdate =
    this.normalsNeedUpdate =
    this.uvsNeedUpdate =
    this.elementsNeedUpdate =
    this.verticesNeedUpdate =
      !1;
};
THREE.Geometry.prototype = {
  constructor: THREE.Geometry,
  applyMatrix: function (a) {
    var b = new THREE.Matrix3();
    b.getInverse(a).transpose();
    for (var c = 0, d = this.vertices.length; c < d; c++)
      a.multiplyVector3(this.vertices[c]);
    c = 0;
    for (d = this.faces.length; c < d; c++) {
      var e = this.faces[c];
      b.multiplyVector3(e.normal).normalize();
      for (var f = 0, g = e.vertexNormals.length; f < g; f++)
        b.multiplyVector3(e.vertexNormals[f]).normalize();
      a.multiplyVector3(e.centroid);
    }
  },
  computeCentroids: function () {
    var a, b, c;
    a = 0;
    for (b = this.faces.length; a < b; a++)
      (c = this.faces[a]),
        c.centroid.set(0, 0, 0),
        c instanceof THREE.Face3
          ? (c.centroid.addSelf(this.vertices[c.a]),
            c.centroid.addSelf(this.vertices[c.b]),
            c.centroid.addSelf(this.vertices[c.c]),
            c.centroid.divideScalar(3))
          : c instanceof THREE.Face4 &&
            (c.centroid.addSelf(this.vertices[c.a]),
            c.centroid.addSelf(this.vertices[c.b]),
            c.centroid.addSelf(this.vertices[c.c]),
            c.centroid.addSelf(this.vertices[c.d]),
            c.centroid.divideScalar(4));
  },
  computeFaceNormals: function () {
    var a,
      b,
      c,
      d,
      e,
      f,
      g = new THREE.Vector3(),
      h = new THREE.Vector3();
    a = 0;
    for (b = this.faces.length; a < b; a++)
      (c = this.faces[a]),
        (d = this.vertices[c.a]),
        (e = this.vertices[c.b]),
        (f = this.vertices[c.c]),
        g.sub(f, e),
        h.sub(d, e),
        g.crossSelf(h),
        g.normalize(),
        c.normal.copy(g);
  },
  computeVertexNormals: function (a) {
    var b, c, d, e;
    if (void 0 === this.__tmpVertices) {
      e = this.__tmpVertices = Array(this.vertices.length);
      b = 0;
      for (c = this.vertices.length; b < c; b++) e[b] = new THREE.Vector3();
      b = 0;
      for (c = this.faces.length; b < c; b++)
        (d = this.faces[b]),
          d instanceof THREE.Face3
            ? (d.vertexNormals = [
                new THREE.Vector3(),
                new THREE.Vector3(),
                new THREE.Vector3(),
              ])
            : d instanceof THREE.Face4 &&
              (d.vertexNormals = [
                new THREE.Vector3(),
                new THREE.Vector3(),
                new THREE.Vector3(),
                new THREE.Vector3(),
              ]);
    } else {
      e = this.__tmpVertices;
      b = 0;
      for (c = this.vertices.length; b < c; b++) e[b].set(0, 0, 0);
    }
    if (a) {
      var f,
        g,
        h,
        i = new THREE.Vector3(),
        j = new THREE.Vector3(),
        l = new THREE.Vector3(),
        m = new THREE.Vector3(),
        n = new THREE.Vector3();
      b = 0;
      for (c = this.faces.length; b < c; b++)
        (d = this.faces[b]),
          d instanceof THREE.Face3
            ? ((a = this.vertices[d.a]),
              (f = this.vertices[d.b]),
              (g = this.vertices[d.c]),
              i.sub(g, f),
              j.sub(a, f),
              i.crossSelf(j),
              e[d.a].addSelf(i),
              e[d.b].addSelf(i),
              e[d.c].addSelf(i))
            : d instanceof THREE.Face4 &&
              ((a = this.vertices[d.a]),
              (f = this.vertices[d.b]),
              (g = this.vertices[d.c]),
              (h = this.vertices[d.d]),
              l.sub(h, f),
              j.sub(a, f),
              l.crossSelf(j),
              e[d.a].addSelf(l),
              e[d.b].addSelf(l),
              e[d.d].addSelf(l),
              m.sub(h, g),
              n.sub(f, g),
              m.crossSelf(n),
              e[d.b].addSelf(m),
              e[d.c].addSelf(m),
              e[d.d].addSelf(m));
    } else {
      b = 0;
      for (c = this.faces.length; b < c; b++)
        (d = this.faces[b]),
          d instanceof THREE.Face3
            ? (e[d.a].addSelf(d.normal),
              e[d.b].addSelf(d.normal),
              e[d.c].addSelf(d.normal))
            : d instanceof THREE.Face4 &&
              (e[d.a].addSelf(d.normal),
              e[d.b].addSelf(d.normal),
              e[d.c].addSelf(d.normal),
              e[d.d].addSelf(d.normal));
    }
    b = 0;
    for (c = this.vertices.length; b < c; b++) e[b].normalize();
    b = 0;
    for (c = this.faces.length; b < c; b++)
      (d = this.faces[b]),
        d instanceof THREE.Face3
          ? (d.vertexNormals[0].copy(e[d.a]),
            d.vertexNormals[1].copy(e[d.b]),
            d.vertexNormals[2].copy(e[d.c]))
          : d instanceof THREE.Face4 &&
            (d.vertexNormals[0].copy(e[d.a]),
            d.vertexNormals[1].copy(e[d.b]),
            d.vertexNormals[2].copy(e[d.c]),
            d.vertexNormals[3].copy(e[d.d]));
  },
  computeMorphNormals: function () {
    var a, b, c, d, e;
    c = 0;
    for (d = this.faces.length; c < d; c++) {
      e = this.faces[c];
      e.__originalFaceNormal
        ? e.__originalFaceNormal.copy(e.normal)
        : (e.__originalFaceNormal = e.normal.clone());
      e.__originalVertexNormals || (e.__originalVertexNormals = []);
      a = 0;
      for (b = e.vertexNormals.length; a < b; a++)
        e.__originalVertexNormals[a]
          ? e.__originalVertexNormals[a].copy(e.vertexNormals[a])
          : (e.__originalVertexNormals[a] = e.vertexNormals[a].clone());
    }
    var f = new THREE.Geometry();
    f.faces = this.faces;
    a = 0;
    for (b = this.morphTargets.length; a < b; a++) {
      if (!this.morphNormals[a]) {
        this.morphNormals[a] = {};
        this.morphNormals[a].faceNormals = [];
        this.morphNormals[a].vertexNormals = [];
        var g = this.morphNormals[a].faceNormals,
          h = this.morphNormals[a].vertexNormals,
          i,
          j;
        c = 0;
        for (d = this.faces.length; c < d; c++)
          (e = this.faces[c]),
            (i = new THREE.Vector3()),
            (j =
              e instanceof THREE.Face3
                ? {
                    a: new THREE.Vector3(),
                    b: new THREE.Vector3(),
                    c: new THREE.Vector3(),
                  }
                : {
                    a: new THREE.Vector3(),
                    b: new THREE.Vector3(),
                    c: new THREE.Vector3(),
                    d: new THREE.Vector3(),
                  }),
            g.push(i),
            h.push(j);
      }
      g = this.morphNormals[a];
      f.vertices = this.morphTargets[a].vertices;
      f.computeFaceNormals();
      f.computeVertexNormals();
      c = 0;
      for (d = this.faces.length; c < d; c++)
        (e = this.faces[c]),
          (i = g.faceNormals[c]),
          (j = g.vertexNormals[c]),
          i.copy(e.normal),
          e instanceof THREE.Face3
            ? (j.a.copy(e.vertexNormals[0]),
              j.b.copy(e.vertexNormals[1]),
              j.c.copy(e.vertexNormals[2]))
            : (j.a.copy(e.vertexNormals[0]),
              j.b.copy(e.vertexNormals[1]),
              j.c.copy(e.vertexNormals[2]),
              j.d.copy(e.vertexNormals[3]));
    }
    c = 0;
    for (d = this.faces.length; c < d; c++)
      (e = this.faces[c]),
        (e.normal = e.__originalFaceNormal),
        (e.vertexNormals = e.__originalVertexNormals);
  },
  computeTangents: function () {
    function a(a, b, c, d, e, f, u) {
      h = a.vertices[b];
      i = a.vertices[c];
      j = a.vertices[d];
      l = g[e];
      m = g[f];
      n = g[u];
      p = i.x - h.x;
      o = j.x - h.x;
      s = i.y - h.y;
      t = j.y - h.y;
      r = i.z - h.z;
      z = j.z - h.z;
      w = m.u - l.u;
      q = n.u - l.u;
      E = m.v - l.v;
      A = n.v - l.v;
      v = 1 / (w * A - q * E);
      G.set((A * p - E * o) * v, (A * s - E * t) * v, (A * r - E * z) * v);
      P.set((w * o - q * p) * v, (w * t - q * s) * v, (w * z - q * r) * v);
      D[b].addSelf(G);
      D[c].addSelf(G);
      D[d].addSelf(G);
      C[b].addSelf(P);
      C[c].addSelf(P);
      C[d].addSelf(P);
    }
    var b,
      c,
      d,
      e,
      f,
      g,
      h,
      i,
      j,
      l,
      m,
      n,
      p,
      o,
      s,
      t,
      r,
      z,
      w,
      q,
      E,
      A,
      v,
      u,
      D = [],
      C = [],
      G = new THREE.Vector3(),
      P = new THREE.Vector3(),
      B = new THREE.Vector3(),
      K = new THREE.Vector3(),
      H = new THREE.Vector3();
    b = 0;
    for (c = this.vertices.length; b < c; b++)
      (D[b] = new THREE.Vector3()), (C[b] = new THREE.Vector3());
    b = 0;
    for (c = this.faces.length; b < c; b++)
      (f = this.faces[b]),
        (g = this.faceVertexUvs[0][b]),
        f instanceof THREE.Face3
          ? a(this, f.a, f.b, f.c, 0, 1, 2)
          : f instanceof THREE.Face4 &&
            (a(this, f.a, f.b, f.d, 0, 1, 3), a(this, f.b, f.c, f.d, 1, 2, 3));
    var I = ["a", "b", "c", "d"];
    b = 0;
    for (c = this.faces.length; b < c; b++) {
      f = this.faces[b];
      for (d = 0; d < f.vertexNormals.length; d++)
        H.copy(f.vertexNormals[d]),
          (e = f[I[d]]),
          (u = D[e]),
          B.copy(u),
          B.subSelf(H.multiplyScalar(H.dot(u))).normalize(),
          K.cross(f.vertexNormals[d], u),
          (e = K.dot(C[e])),
          (e = 0 > e ? -1 : 1),
          (f.vertexTangents[d] = new THREE.Vector4(B.x, B.y, B.z, e));
    }
    this.hasTangents = !0;
  },
  computeLineDistances: function () {
    for (var a = 0, b = this.vertices, c = 0, d = b.length; c < d; c++)
      0 < c && (a += b[c].distanceTo(b[c - 1])), (this.lineDistances[c] = a);
  },
  computeBoundingBox: function () {
    this.boundingBox ||
      (this.boundingBox = {
        min: new THREE.Vector3(),
        max: new THREE.Vector3(),
      });
    if (0 < this.vertices.length) {
      var a;
      a = this.vertices[0];
      this.boundingBox.min.copy(a);
      this.boundingBox.max.copy(a);
      for (
        var b = this.boundingBox.min,
          c = this.boundingBox.max,
          d = 1,
          e = this.vertices.length;
        d < e;
        d++
      )
        ((a = this.vertices[d]),
        a.x < b.x ? (b.x = a.x) : a.x > c.x && (c.x = a.x),
        a.y < b.y ? (b.y = a.y) : a.y > c.y && (c.y = a.y),
        a.z < b.z)
          ? (b.z = a.z)
          : a.z > c.z && (c.z = a.z);
    } else this.boundingBox.min.set(0, 0, 0), this.boundingBox.max.set(0, 0, 0);
  },
  computeBoundingSphere: function () {
    var a = 0;
    null === this.boundingSphere &&
      (this.boundingSphere = {
        radius: 0,
      });
    for (var b = 0, c = this.vertices.length; b < c; b++) {
      var d = this.vertices[b].lengthSq();
      d > a && (a = d);
    }
    this.boundingSphere.radius = Math.sqrt(a);
  },
  mergeVertices: function () {
    var a = {},
      b = [],
      c = [],
      d,
      e = Math.pow(10, 4),
      f,
      g,
      h,
      i;
    f = 0;
    for (g = this.vertices.length; f < g; f++)
      (d = this.vertices[f]),
        (d = [
          Math.round(d.x * e),
          Math.round(d.y * e),
          Math.round(d.z * e),
        ].join("_")),
        void 0 === a[d]
          ? ((a[d] = f), b.push(this.vertices[f]), (c[f] = b.length - 1))
          : (c[f] = c[a[d]]);
    f = 0;
    for (g = this.faces.length; f < g; f++)
      if (((a = this.faces[f]), a instanceof THREE.Face3))
        (a.a = c[a.a]), (a.b = c[a.b]), (a.c = c[a.c]);
      else if (a instanceof THREE.Face4) {
        a.a = c[a.a];
        a.b = c[a.b];
        a.c = c[a.c];
        a.d = c[a.d];
        d = [a.a, a.b, a.c, a.d];
        for (e = 3; 0 < e; e--)
          if (d.indexOf(a["abcd"[e]]) !== e) {
            d.splice(e, 1);
            this.faces[f] = new THREE.Face3(
              d[0],
              d[1],
              d[2],
              a.normal,
              a.color,
              a.materialIndex
            );
            d = 0;
            for (h = this.faceVertexUvs.length; d < h; d++)
              (i = this.faceVertexUvs[d][f]) && i.splice(e, 1);
            this.faces[f].vertexColors = a.vertexColors;
            break;
          }
      }
    c = this.vertices.length - b.length;
    this.vertices = b;
    return c;
  },
  clone: function () {
    for (
      var a = new THREE.Geometry(), b = this.vertices, c = 0, d = b.length;
      c < d;
      c++
    )
      a.vertices.push(b[c].clone());
    b = this.faces;
    c = 0;
    for (d = b.length; c < d; c++) a.faces.push(b[c].clone());
    b = this.faceVertexUvs[0];
    c = 0;
    for (d = b.length; c < d; c++) {
      for (var e = b[c], f = [], g = 0, h = e.length; g < h; g++)
        f.push(new THREE.UV(e[g].u, e[g].v));
      a.faceVertexUvs[0].push(f);
    }
    return a;
  },
  deallocate: function () {
    var a = THREE.GeometryLibrary.indexOf(this);
    -1 !== a && THREE.GeometryLibrary.splice(a, 1);
  },
};
THREE.GeometryIdCount = 0;
THREE.GeometryLibrary = [];
THREE.BufferGeometry = function () {
  THREE.GeometryLibrary.push(this);
  this.id = THREE.GeometryIdCount++;
  this.attributes = {};
  this.dynamic = !1;
  this.boundingSphere = this.boundingBox = null;
  this.hasTangents = !1;
  this.morphTargets = [];
};
THREE.BufferGeometry.prototype = {
  constructor: THREE.BufferGeometry,
  applyMatrix: function (a) {
    var b, c;
    this.attributes.position && (b = this.attributes.position.array);
    this.attributes.normal && (c = this.attributes.normal.array);
    void 0 !== b && (a.multiplyVector3Array(b), (this.verticesNeedUpdate = !0));
    void 0 !== c &&
      ((b = new THREE.Matrix3()),
      b.getInverse(a).transpose(),
      b.multiplyVector3Array(c),
      this.normalizeNormals(),
      (this.normalsNeedUpdate = !0));
  },
  computeBoundingBox: function () {
    this.boundingBox ||
      (this.boundingBox = {
        min: new THREE.Vector3(Infinity, Infinity, Infinity),
        max: new THREE.Vector3(-Infinity, -Infinity, -Infinity),
      });
    var a = this.attributes.position.array;
    if (a)
      for (
        var b = this.boundingBox, c, d, e, f = 0, g = a.length;
        f < g;
        f += 3
      )
        ((c = a[f]),
        (d = a[f + 1]),
        (e = a[f + 2]),
        c < b.min.x ? (b.min.x = c) : c > b.max.x && (b.max.x = c),
        d < b.min.y ? (b.min.y = d) : d > b.max.y && (b.max.y = d),
        e < b.min.z)
          ? (b.min.z = e)
          : e > b.max.z && (b.max.z = e);
    if (void 0 === a || 0 === a.length)
      this.boundingBox.min.set(0, 0, 0), this.boundingBox.max.set(0, 0, 0);
  },
  computeBoundingSphere: function () {
    this.boundingSphere ||
      (this.boundingSphere = {
        radius: 0,
      });
    var a = this.attributes.position.array;
    if (a) {
      for (var b, c = 0, d, e, f = 0, g = a.length; f < g; f += 3)
        (b = a[f]),
          (d = a[f + 1]),
          (e = a[f + 2]),
          (b = b * b + d * d + e * e),
          b > c && (c = b);
      this.boundingSphere.radius = Math.sqrt(c);
    }
  },
  computeVertexNormals: function () {
    if (this.attributes.position && this.attributes.index) {
      var a, b, c, d;
      a = this.attributes.position.array.length;
      if (void 0 === this.attributes.normal)
        this.attributes.normal = {
          itemSize: 3,
          array: new Float32Array(a),
          numItems: a,
        };
      else {
        a = 0;
        for (b = this.attributes.normal.array.length; a < b; a++)
          this.attributes.normal.array[a] = 0;
      }
      var e = this.offsets,
        f = this.attributes.index.array,
        g = this.attributes.position.array,
        h = this.attributes.normal.array,
        i,
        j,
        l,
        m,
        n,
        p,
        o = new THREE.Vector3(),
        s = new THREE.Vector3(),
        t = new THREE.Vector3(),
        r = new THREE.Vector3(),
        z = new THREE.Vector3();
      c = 0;
      for (d = e.length; c < d; ++c) {
        b = e[c].start;
        i = e[c].count;
        var w = e[c].index;
        a = b;
        for (b += i; a < b; a += 3)
          (i = w + f[a]),
            (j = w + f[a + 1]),
            (l = w + f[a + 2]),
            (m = g[3 * i]),
            (n = g[3 * i + 1]),
            (p = g[3 * i + 2]),
            o.set(m, n, p),
            (m = g[3 * j]),
            (n = g[3 * j + 1]),
            (p = g[3 * j + 2]),
            s.set(m, n, p),
            (m = g[3 * l]),
            (n = g[3 * l + 1]),
            (p = g[3 * l + 2]),
            t.set(m, n, p),
            r.sub(t, s),
            z.sub(o, s),
            r.crossSelf(z),
            (h[3 * i] += r.x),
            (h[3 * i + 1] += r.y),
            (h[3 * i + 2] += r.z),
            (h[3 * j] += r.x),
            (h[3 * j + 1] += r.y),
            (h[3 * j + 2] += r.z),
            (h[3 * l] += r.x),
            (h[3 * l + 1] += r.y),
            (h[3 * l + 2] += r.z);
      }
      this.normalizeNormals();
      this.normalsNeedUpdate = !0;
    }
  },
  normalizeNormals: function () {
    for (
      var a = this.attributes.normal.array, b, c, d, e = 0, f = a.length;
      e < f;
      e += 3
    )
      (b = a[e]),
        (c = a[e + 1]),
        (d = a[e + 2]),
        (b = 1 / Math.sqrt(b * b + c * c + d * d)),
        (a[e] *= b),
        (a[e + 1] *= b),
        (a[e + 2] *= b);
  },
  computeTangents: function () {
    function a(a) {
      ga.x = d[3 * a];
      ga.y = d[3 * a + 1];
      ga.z = d[3 * a + 2];
      M.copy(ga);
      Q = i[a];
      O.copy(Q);
      O.subSelf(ga.multiplyScalar(ga.dot(Q))).normalize();
      R.cross(M, Q);
      Z = R.dot(j[a]);
      J = 0 > Z ? -1 : 1;
      h[4 * a] = O.x;
      h[4 * a + 1] = O.y;
      h[4 * a + 2] = O.z;
      h[4 * a + 3] = J;
    }
    if (
      void 0 === this.attributes.index ||
      void 0 === this.attributes.position ||
      void 0 === this.attributes.normal ||
      void 0 === this.attributes.uv
    )
      console.warn(
        "Missing required attributes (index, position, normal or uv) in BufferGeometry.computeTangents()"
      );
    else {
      var b = this.attributes.index.array,
        c = this.attributes.position.array,
        d = this.attributes.normal.array,
        e = this.attributes.uv.array,
        f = c.length / 3;
      if (void 0 === this.attributes.tangent) {
        var g = 4 * f;
        this.attributes.tangent = {
          itemSize: 4,
          array: new Float32Array(g),
          numItems: g,
        };
      }
      for (
        var h = this.attributes.tangent.array, i = [], j = [], g = 0;
        g < f;
        g++
      )
        (i[g] = new THREE.Vector3()), (j[g] = new THREE.Vector3());
      var l,
        m,
        n,
        p,
        o,
        s,
        t,
        r,
        z,
        w,
        q,
        E,
        A,
        v,
        u,
        f = new THREE.Vector3(),
        g = new THREE.Vector3(),
        D,
        C,
        G,
        P,
        B,
        K,
        H,
        I = this.offsets;
      G = 0;
      for (P = I.length; G < P; ++G) {
        C = I[G].start;
        B = I[G].count;
        var N = I[G].index;
        D = C;
        for (C += B; D < C; D += 3)
          (B = N + b[D]),
            (K = N + b[D + 1]),
            (H = N + b[D + 2]),
            (l = c[3 * B]),
            (m = c[3 * B + 1]),
            (n = c[3 * B + 2]),
            (p = c[3 * K]),
            (o = c[3 * K + 1]),
            (s = c[3 * K + 2]),
            (t = c[3 * H]),
            (r = c[3 * H + 1]),
            (z = c[3 * H + 2]),
            (w = e[2 * B]),
            (q = e[2 * B + 1]),
            (E = e[2 * K]),
            (A = e[2 * K + 1]),
            (v = e[2 * H]),
            (u = e[2 * H + 1]),
            (p -= l),
            (l = t - l),
            (o -= m),
            (m = r - m),
            (s -= n),
            (n = z - n),
            (E -= w),
            (w = v - w),
            (A -= q),
            (q = u - q),
            (u = 1 / (E * q - w * A)),
            f.set(
              (q * p - A * l) * u,
              (q * o - A * m) * u,
              (q * s - A * n) * u
            ),
            g.set(
              (E * l - w * p) * u,
              (E * m - w * o) * u,
              (E * n - w * s) * u
            ),
            i[B].addSelf(f),
            i[K].addSelf(f),
            i[H].addSelf(f),
            j[B].addSelf(g),
            j[K].addSelf(g),
            j[H].addSelf(g);
      }
      var O = new THREE.Vector3(),
        R = new THREE.Vector3(),
        ga = new THREE.Vector3(),
        M = new THREE.Vector3(),
        J,
        Q,
        Z;
      G = 0;
      for (P = I.length; G < P; ++G) {
        C = I[G].start;
        B = I[G].count;
        N = I[G].index;
        D = C;
        for (C += B; D < C; D += 3)
          (B = N + b[D]),
            (K = N + b[D + 1]),
            (H = N + b[D + 2]),
            a(B),
            a(K),
            a(H);
      }
      this.tangentsNeedUpdate = this.hasTangents = !0;
    }
  },
  deallocate: function () {
    var a = THREE.GeometryLibrary.indexOf(this);
    -1 !== a && THREE.GeometryLibrary.splice(a, 1);
  },
};
THREE.Spline = function (a) {
  function b(a, b, c, d, e, f, g) {
    a = 0.5 * (c - a);
    d = 0.5 * (d - b);
    return (
      (2 * (b - c) + a + d) * g + (-3 * (b - c) - 2 * a - d) * f + a * e + b
    );
  }
  this.points = a;
  var c = [],
    d = {
      x: 0,
      y: 0,
      z: 0,
    },
    e,
    f,
    g,
    h,
    i,
    j,
    l,
    m,
    n;
  this.initFromArray = function (a) {
    this.points = [];
    for (var b = 0; b < a.length; b++)
      this.points[b] = {
        x: a[b][0],
        y: a[b][1],
        z: a[b][2],
      };
  };
  this.getPoint = function (a) {
    e = (this.points.length - 1) * a;
    f = Math.floor(e);
    g = e - f;
    c[0] = 0 === f ? f : f - 1;
    c[1] = f;
    c[2] = f > this.points.length - 2 ? this.points.length - 1 : f + 1;
    c[3] = f > this.points.length - 3 ? this.points.length - 1 : f + 2;
    j = this.points[c[0]];
    l = this.points[c[1]];
    m = this.points[c[2]];
    n = this.points[c[3]];
    h = g * g;
    i = g * h;
    d.x = b(j.x, l.x, m.x, n.x, g, h, i);
    d.y = b(j.y, l.y, m.y, n.y, g, h, i);
    d.z = b(j.z, l.z, m.z, n.z, g, h, i);
    return d;
  };
  this.getControlPointsArray = function () {
    var a,
      b,
      c = this.points.length,
      d = [];
    for (a = 0; a < c; a++) (b = this.points[a]), (d[a] = [b.x, b.y, b.z]);
    return d;
  };
  this.getLength = function (a) {
    var b,
      c,
      d,
      e = (b = b = 0),
      f = new THREE.Vector3(),
      g = new THREE.Vector3(),
      h = [],
      i = 0;
    h[0] = 0;
    a || (a = 100);
    c = this.points.length * a;
    f.copy(this.points[0]);
    for (a = 1; a < c; a++)
      (b = a / c),
        (d = this.getPoint(b)),
        g.copy(d),
        (i += g.distanceTo(f)),
        f.copy(d),
        (b *= this.points.length - 1),
        (b = Math.floor(b)),
        b != e && ((h[b] = i), (e = b));
    h[h.length] = i;
    return {
      chunks: h,
      total: i,
    };
  };
  this.reparametrizeByArcLength = function (a) {
    var b,
      c,
      d,
      e,
      f,
      g,
      h = [],
      i = new THREE.Vector3(),
      j = this.getLength();
    h.push(i.copy(this.points[0]).clone());
    for (b = 1; b < this.points.length; b++) {
      c = j.chunks[b] - j.chunks[b - 1];
      g = Math.ceil((a * c) / j.total);
      e = (b - 1) / (this.points.length - 1);
      f = b / (this.points.length - 1);
      for (c = 1; c < g - 1; c++)
        (d = e + c * (1 / g) * (f - e)),
          (d = this.getPoint(d)),
          h.push(i.copy(d).clone());
      h.push(i.copy(this.points[b]).clone());
    }
    this.points = h;
  };
};
THREE.Camera = function () {
  THREE.Object3D.call(this);
  this.matrixWorldInverse = new THREE.Matrix4();
  this.projectionMatrix = new THREE.Matrix4();
  this.projectionMatrixInverse = new THREE.Matrix4();
};
THREE.Camera.prototype = Object.create(THREE.Object3D.prototype);
THREE.Camera.prototype.lookAt = function (a) {
  this.matrix.lookAt(this.position, a, this.up);
  !0 === this.rotationAutoUpdate &&
    (!1 === this.useQuaternion
      ? this.rotation.setEulerFromRotationMatrix(this.matrix, this.eulerOrder)
      : this.quaternion.copy(this.matrix.decompose()[1]));
};
THREE.OrthographicCamera = function (a, b, c, d, e, f) {
  THREE.Camera.call(this);
  this.left = a;
  this.right = b;
  this.top = c;
  this.bottom = d;
  this.near = void 0 !== e ? e : 0.1;
  this.far = void 0 !== f ? f : 2e3;
  this.updateProjectionMatrix();
};
THREE.OrthographicCamera.prototype = Object.create(THREE.Camera.prototype);
THREE.OrthographicCamera.prototype.updateProjectionMatrix = function () {
  this.projectionMatrix.makeOrthographic(
    this.left,
    this.right,
    this.top,
    this.bottom,
    this.near,
    this.far
  );
};
THREE.PerspectiveCamera = function (a, b, c, d) {
  THREE.Camera.call(this);
  this.fov = void 0 !== a ? a : 50;
  this.aspect = void 0 !== b ? b : 1;
  this.near = void 0 !== c ? c : 0.1;
  this.far = void 0 !== d ? d : 2e3;
  this.updateProjectionMatrix();
};
THREE.PerspectiveCamera.prototype = Object.create(THREE.Camera.prototype);
THREE.PerspectiveCamera.prototype.setLens = function (a, b) {
  void 0 === b && (b = 24);
  this.fov = 2 * Math.atan(b / (2 * a)) * (180 / Math.PI);
  this.updateProjectionMatrix();
};
THREE.PerspectiveCamera.prototype.setViewOffset = function (a, b, c, d, e, f) {
  this.fullWidth = a;
  this.fullHeight = b;
  this.x = c;
  this.y = d;
  this.width = e;
  this.height = f;
  this.updateProjectionMatrix();
};
THREE.PerspectiveCamera.prototype.updateProjectionMatrix = function () {
  if (this.fullWidth) {
    var a = this.fullWidth / this.fullHeight,
      b = Math.tan((this.fov * Math.PI) / 360) * this.near,
      c = -b,
      d = a * c,
      a = Math.abs(a * b - d),
      c = Math.abs(b - c);
    this.projectionMatrix.makeFrustum(
      d + (this.x * a) / this.fullWidth,
      d + ((this.x + this.width) * a) / this.fullWidth,
      b - ((this.y + this.height) * c) / this.fullHeight,
      b - (this.y * c) / this.fullHeight,
      this.near,
      this.far
    );
  } else
    this.projectionMatrix.makePerspective(
      this.fov,
      this.aspect,
      this.near,
      this.far
    );
};
THREE.Light = function (a) {
  THREE.Object3D.call(this);
  this.color = new THREE.Color(a);
};
THREE.Light.prototype = Object.create(THREE.Object3D.prototype);
THREE.AmbientLight = function (a) {
  THREE.Light.call(this, a);
};
THREE.AmbientLight.prototype = Object.create(THREE.Light.prototype);
THREE.DirectionalLight = function (a, b) {
  THREE.Light.call(this, a);
  this.position = new THREE.Vector3(0, 1, 0);
  this.target = new THREE.Object3D();
  this.intensity = void 0 !== b ? b : 1;
  this.onlyShadow = this.castShadow = !1;
  this.shadowCameraNear = 50;
  this.shadowCameraFar = 5e3;
  this.shadowCameraLeft = -500;
  this.shadowCameraTop = this.shadowCameraRight = 500;
  this.shadowCameraBottom = -500;
  this.shadowCameraVisible = !1;
  this.shadowBias = 0;
  this.shadowDarkness = 0.5;
  this.shadowMapHeight = this.shadowMapWidth = 512;
  this.shadowCascade = !1;
  this.shadowCascadeOffset = new THREE.Vector3(0, 0, -1e3);
  this.shadowCascadeCount = 2;
  this.shadowCascadeBias = [0, 0, 0];
  this.shadowCascadeWidth = [512, 512, 512];
  this.shadowCascadeHeight = [512, 512, 512];
  this.shadowCascadeNearZ = [-1, 0.99, 0.998];
  this.shadowCascadeFarZ = [0.99, 0.998, 1];
  this.shadowCascadeArray = [];
  this.shadowMatrix =
    this.shadowCamera =
    this.shadowMapSize =
    this.shadowMap =
      null;
};
THREE.DirectionalLight.prototype = Object.create(THREE.Light.prototype);
THREE.HemisphereLight = function (a, b, c) {
  THREE.Light.call(this, a);
  this.groundColor = new THREE.Color(b);
  this.position = new THREE.Vector3(0, 100, 0);
  this.intensity = void 0 !== c ? c : 1;
};
THREE.HemisphereLight.prototype = Object.create(THREE.Light.prototype);
THREE.PointLight = function (a, b, c) {
  THREE.Light.call(this, a);
  this.position = new THREE.Vector3(0, 0, 0);
  this.intensity = void 0 !== b ? b : 1;
  this.distance = void 0 !== c ? c : 0;
};
THREE.PointLight.prototype = Object.create(THREE.Light.prototype);
THREE.SpotLight = function (a, b, c, d, e) {
  THREE.Light.call(this, a);
  this.position = new THREE.Vector3(0, 1, 0);
  this.target = new THREE.Object3D();
  this.intensity = void 0 !== b ? b : 1;
  this.distance = void 0 !== c ? c : 0;
  this.angle = void 0 !== d ? d : Math.PI / 2;
  this.exponent = void 0 !== e ? e : 10;
  this.onlyShadow = this.castShadow = !1;
  this.shadowCameraNear = 50;
  this.shadowCameraFar = 5e3;
  this.shadowCameraFov = 50;
  this.shadowCameraVisible = !1;
  this.shadowBias = 0;
  this.shadowDarkness = 0.5;
  this.shadowMapHeight = this.shadowMapWidth = 512;
  this.shadowMatrix =
    this.shadowCamera =
    this.shadowMapSize =
    this.shadowMap =
      null;
};
THREE.SpotLight.prototype = Object.create(THREE.Light.prototype);
THREE.Loader = function (a) {
  this.statusDomElement = (this.showStatus = a)
    ? THREE.Loader.prototype.addStatusElement()
    : null;
  this.onLoadStart = function () {};
  this.onLoadProgress = function () {};
  this.onLoadComplete = function () {};
};
THREE.Loader.prototype = {
  constructor: THREE.Loader,
  crossOrigin: "anonymous",
  addStatusElement: function () {
    var a = document.createElement("div");
    a.style.position = "absolute";
    a.style.right = "0px";
    a.style.top = "0px";
    a.style.fontSize = "0.8em";
    a.style.textAlign = "left";
    a.style.background = "rgba(0,0,0,0.25)";
    a.style.color = "#fff";
    a.style.width = "120px";
    a.style.padding = "0.5em 0.5em 0.5em 0.5em";
    a.style.zIndex = 1e3;
    a.innerHTML = "Loading ...";
    return a;
  },
  updateProgress: function (a) {
    var b = "Loaded ",
      b = a.total
        ? b + (((100 * a.loaded) / a.total).toFixed(0) + "%")
        : b + ((a.loaded / 1e3).toFixed(2) + " KB");
    this.statusDomElement.innerHTML = b;
  },
  extractUrlBase: function (a) {
    a = a.split("/");
    a.pop();
    return (1 > a.length ? "." : a.join("/")) + "/";
  },
  initMaterials: function (a, b) {
    for (var c = [], d = 0; d < a.length; ++d)
      c[d] = THREE.Loader.prototype.createMaterial(a[d], b);
    return c;
  },
  needsTangents: function (a) {
    for (var b = 0, c = a.length; b < c; b++)
      if (a[b] instanceof THREE.ShaderMaterial) return !0;
    return !1;
  },
  createMaterial: function (a, b) {
    function c(a) {
      a = Math.log(a) / Math.LN2;
      return Math.floor(a) == a;
    }
    function d(a) {
      a = Math.log(a) / Math.LN2;
      return Math.pow(2, Math.round(a));
    }
    function e(a, e, f, h, i, j, t) {
      var r = f.toLowerCase().endsWith(".dds"),
        z = b + "/" + f;
      if (r) {
        var w = THREE.ImageUtils.loadCompressedTexture(z);
        a[e] = w;
      } else
        (w = document.createElement("canvas")), (a[e] = new THREE.Texture(w));
      a[e].sourceFile = f;
      if (
        h &&
        (a[e].repeat.set(h[0], h[1]),
        1 !== h[0] && (a[e].wrapS = THREE.RepeatWrapping),
        1 !== h[1])
      )
        a[e].wrapT = THREE.RepeatWrapping;
      i && a[e].offset.set(i[0], i[1]);
      if (
        j &&
        ((f = {
          repeat: THREE.RepeatWrapping,
          mirror: THREE.MirroredRepeatWrapping,
        }),
        void 0 !== f[j[0]] && (a[e].wrapS = f[j[0]]),
        void 0 !== f[j[1]])
      )
        a[e].wrapT = f[j[1]];
      t && (a[e].anisotropy = t);
      if (!r) {
        var q = a[e],
          a = new Image();
        a.onload = function () {
          if (!c(this.width) || !c(this.height)) {
            var a = d(this.width),
              b = d(this.height);
            q.image.width = a;
            q.image.height = b;
            q.image.getContext("2d").drawImage(this, 0, 0, a, b);
          } else q.image = this;
          q.needsUpdate = true;
        };
        a.crossOrigin = g.crossOrigin;
        a.src = z;
      }
    }
    function f(a) {
      return ((255 * a[0]) << 16) + ((255 * a[1]) << 8) + 255 * a[2];
    }
    var g = this,
      h = "MeshLambertMaterial",
      i = {
        color: 15658734,
        opacity: 1,
        map: null,
        lightMap: null,
        normalMap: null,
        bumpMap: null,
        wireframe: !1,
      };
    if (a.shading) {
      var j = a.shading.toLowerCase();
      "phong" === j
        ? (h = "MeshPhongMaterial")
        : "basic" === j && (h = "MeshBasicMaterial");
    }
    void 0 !== a.blending &&
      void 0 !== THREE[a.blending] &&
      (i.blending = THREE[a.blending]);
    if (void 0 !== a.transparent || 1 > a.opacity)
      i.transparent = a.transparent;
    void 0 !== a.depthTest && (i.depthTest = a.depthTest);
    void 0 !== a.depthWrite && (i.depthWrite = a.depthWrite);
    void 0 !== a.visible && (i.visible = a.visible);
    void 0 !== a.flipSided && (i.side = THREE.BackSide);
    void 0 !== a.doubleSided && (i.side = THREE.DoubleSide);
    void 0 !== a.wireframe && (i.wireframe = a.wireframe);
    void 0 !== a.vertexColors &&
      ("face" === a.vertexColors
        ? (i.vertexColors = THREE.FaceColors)
        : a.vertexColors && (i.vertexColors = THREE.VertexColors));
    a.colorDiffuse
      ? (i.color = f(a.colorDiffuse))
      : a.DbgColor && (i.color = a.DbgColor);
    a.colorSpecular && (i.specular = f(a.colorSpecular));
    a.colorAmbient && (i.ambient = f(a.colorAmbient));
    a.transparency && (i.opacity = a.transparency);
    a.specularCoef && (i.shininess = a.specularCoef);
    a.mapDiffuse &&
      b &&
      e(
        i,
        "map",
        a.mapDiffuse,
        a.mapDiffuseRepeat,
        a.mapDiffuseOffset,
        a.mapDiffuseWrap,
        a.mapDiffuseAnisotropy
      );
    a.mapLight &&
      b &&
      e(
        i,
        "lightMap",
        a.mapLight,
        a.mapLightRepeat,
        a.mapLightOffset,
        a.mapLightWrap,
        a.mapLightAnisotropy
      );
    a.mapBump &&
      b &&
      e(
        i,
        "bumpMap",
        a.mapBump,
        a.mapBumpRepeat,
        a.mapBumpOffset,
        a.mapBumpWrap,
        a.mapBumpAnisotropy
      );
    a.mapNormal &&
      b &&
      e(
        i,
        "normalMap",
        a.mapNormal,
        a.mapNormalRepeat,
        a.mapNormalOffset,
        a.mapNormalWrap,
        a.mapNormalAnisotropy
      );
    a.mapSpecular &&
      b &&
      e(
        i,
        "specularMap",
        a.mapSpecular,
        a.mapSpecularRepeat,
        a.mapSpecularOffset,
        a.mapSpecularWrap,
        a.mapSpecularAnisotropy
      );
    a.mapBumpScale && (i.bumpScale = a.mapBumpScale);
    a.mapNormal
      ? ((h = THREE.ShaderUtils.lib.normal),
        (j = THREE.UniformsUtils.clone(h.uniforms)),
        (j.tNormal.value = i.normalMap),
        a.mapNormalFactor &&
          j.uNormalScale.value.set(a.mapNormalFactor, a.mapNormalFactor),
        i.map && ((j.tDiffuse.value = i.map), (j.enableDiffuse.value = !0)),
        i.specularMap &&
          ((j.tSpecular.value = i.specularMap), (j.enableSpecular.value = !0)),
        i.lightMap && ((j.tAO.value = i.lightMap), (j.enableAO.value = !0)),
        j.uDiffuseColor.value.setHex(i.color),
        j.uSpecularColor.value.setHex(i.specular),
        j.uAmbientColor.value.setHex(i.ambient),
        (j.uShininess.value = i.shininess),
        void 0 !== i.opacity && (j.uOpacity.value = i.opacity),
        (i = new THREE.ShaderMaterial({
          fragmentShader: h.fragmentShader,
          vertexShader: h.vertexShader,
          uniforms: j,
          lights: !0,
          fog: !0,
        })))
      : (i = new THREE[h](i));
    void 0 !== a.DbgName && (i.name = a.DbgName);
    return i;
  },
};
THREE.BinaryLoader = function (a) {
  THREE.Loader.call(this, a);
};
THREE.BinaryLoader.prototype = Object.create(THREE.Loader.prototype);
THREE.BinaryLoader.prototype.load = function (a, b, c, d) {
  var c = c && "string" === typeof c ? c : this.extractUrlBase(a),
    d = d && "string" === typeof d ? d : this.extractUrlBase(a),
    e = this.showProgress ? THREE.Loader.prototype.updateProgress : null;
  this.onLoadStart();
  this.loadAjaxJSON(this, a, b, c, d, e);
};
THREE.BinaryLoader.prototype.loadAjaxJSON = function (a, b, c, d, e, f) {
  var g = new XMLHttpRequest();
  g.onreadystatechange = function () {
    if (4 == g.readyState)
      if (200 == g.status || 0 == g.status) {
        var h = JSON.parse(g.responseText);
        a.loadAjaxBuffers(h, c, e, d, f);
      } else
        console.error(
          "THREE.BinaryLoader: Couldn't load [" + b + "] [" + g.status + "]"
        );
  };
  g.open("GET", b, !0);
  g.send(null);
};
THREE.BinaryLoader.prototype.loadAjaxBuffers = function (a, b, c, d, e) {
  var f = new XMLHttpRequest(),
    g = c + "/" + a.buffers,
    h = 0;
  f.onreadystatechange = function () {
    if (4 == f.readyState)
      if (200 == f.status || 0 == f.status) {
        var c = f.response;
        void 0 === c && (c = new Uint8Array(f.responseBody).buffer);
        THREE.BinaryLoader.prototype.createBinModel(c, b, d, a.materials);
      } else
        console.error(
          "THREE.BinaryLoader: Couldn't load [" + g + "] [" + f.status + "]"
        );
    else
      3 == f.readyState
        ? e &&
          (0 == h && (h = f.getResponseHeader("Content-Length")),
          e({
            total: h,
            loaded: f.responseText.length,
          }))
        : 2 == f.readyState && (h = f.getResponseHeader("Content-Length"));
  };
  f.open("GET", g, !0);
  f.responseType = "arraybuffer";
  f.send(null);
};
THREE.BinaryLoader.prototype.createBinModel = function (a, b, c, d) {
  var e = function () {
    var b, c, d, e, j, l, m, n, p, o, s, t, r, z, w, q;
    function E(a) {
      return a % 4 ? 4 - (a % 4) : 0;
    }
    function A(a, b) {
      return new Uint8Array(a, b, 1)[0];
    }
    function v(a, b) {
      return new Uint32Array(a, b, 1)[0];
    }
    function u(b, c) {
      var d,
        e,
        f,
        g,
        h,
        i,
        j,
        l = new Uint32Array(a, c, 3 * b);
      for (d = 0; d < b; d++)
        (e = l[3 * d]),
          (f = l[3 * d + 1]),
          (g = l[3 * d + 2]),
          (h = N[2 * e]),
          (e = N[2 * e + 1]),
          (i = N[2 * f]),
          (j = N[2 * f + 1]),
          (f = N[2 * g]),
          (g = N[2 * g + 1]),
          K.faceVertexUvs[0].push([
            new THREE.UV(h, e),
            new THREE.UV(i, j),
            new THREE.UV(f, g),
          ]);
    }
    function D(b, c) {
      var d,
        e,
        f,
        g,
        h,
        i,
        j,
        l,
        n,
        m = new Uint32Array(a, c, 4 * b);
      for (d = 0; d < b; d++)
        (e = m[4 * d]),
          (f = m[4 * d + 1]),
          (g = m[4 * d + 2]),
          (h = m[4 * d + 3]),
          (i = N[2 * e]),
          (e = N[2 * e + 1]),
          (j = N[2 * f]),
          (l = N[2 * f + 1]),
          (f = N[2 * g]),
          (n = N[2 * g + 1]),
          (g = N[2 * h]),
          (h = N[2 * h + 1]),
          K.faceVertexUvs[0].push([
            new THREE.UV(i, e),
            new THREE.UV(j, l),
            new THREE.UV(f, n),
            new THREE.UV(g, h),
          ]);
    }
    function C(b, c, d) {
      for (
        var e,
          f,
          g,
          h,
          c = new Uint32Array(a, c, 3 * b),
          i = new Uint16Array(a, d, b),
          d = 0;
        d < b;
        d++
      )
        (e = c[3 * d]),
          (f = c[3 * d + 1]),
          (g = c[3 * d + 2]),
          (h = i[d]),
          K.faces.push(new THREE.Face3(e, f, g, null, null, h));
    }
    function G(b, c, d) {
      for (
        var e,
          f,
          g,
          h,
          i,
          c = new Uint32Array(a, c, 4 * b),
          j = new Uint16Array(a, d, b),
          d = 0;
        d < b;
        d++
      )
        (e = c[4 * d]),
          (f = c[4 * d + 1]),
          (g = c[4 * d + 2]),
          (h = c[4 * d + 3]),
          (i = j[d]),
          K.faces.push(new THREE.Face4(e, f, g, h, null, null, i));
    }
    function P(b, c, d, e) {
      for (
        var f,
          g,
          h,
          i,
          j,
          l,
          n,
          c = new Uint32Array(a, c, 3 * b),
          d = new Uint32Array(a, d, 3 * b),
          m = new Uint16Array(a, e, b),
          e = 0;
        e < b;
        e++
      ) {
        f = c[3 * e];
        g = c[3 * e + 1];
        h = c[3 * e + 2];
        j = d[3 * e];
        l = d[3 * e + 1];
        n = d[3 * e + 2];
        i = m[e];
        var o = I[3 * l],
          p = I[3 * l + 1];
        l = I[3 * l + 2];
        var s = I[3 * n],
          r = I[3 * n + 1];
        n = I[3 * n + 2];
        K.faces.push(
          new THREE.Face3(
            f,
            g,
            h,
            [
              new THREE.Vector3(I[3 * j], I[3 * j + 1], I[3 * j + 2]),
              new THREE.Vector3(o, p, l),
              new THREE.Vector3(s, r, n),
            ],
            null,
            i
          )
        );
      }
    }
    function B(b, c, d, e) {
      for (
        var f,
          g,
          h,
          i,
          j,
          l,
          n,
          m,
          o,
          c = new Uint32Array(a, c, 4 * b),
          d = new Uint32Array(a, d, 4 * b),
          p = new Uint16Array(a, e, b),
          e = 0;
        e < b;
        e++
      ) {
        f = c[4 * e];
        g = c[4 * e + 1];
        h = c[4 * e + 2];
        i = c[4 * e + 3];
        l = d[4 * e];
        n = d[4 * e + 1];
        m = d[4 * e + 2];
        o = d[4 * e + 3];
        j = p[e];
        var s = I[3 * n],
          r = I[3 * n + 1];
        n = I[3 * n + 2];
        var q = I[3 * m],
          t = I[3 * m + 1];
        m = I[3 * m + 2];
        var u = I[3 * o],
          v = I[3 * o + 1];
        o = I[3 * o + 2];
        K.faces.push(
          new THREE.Face4(
            f,
            g,
            h,
            i,
            [
              new THREE.Vector3(I[3 * l], I[3 * l + 1], I[3 * l + 2]),
              new THREE.Vector3(s, r, n),
              new THREE.Vector3(q, t, m),
              new THREE.Vector3(u, v, o),
            ],
            null,
            j
          )
        );
      }
    }
    var K = this,
      H = 0,
      I = [],
      N = [],
      O,
      R,
      ga;
    THREE.Geometry.call(this);
    q = a;
    R = H;
    z = new Uint8Array(q, R, 12);
    o = "";
    for (r = 0; 12 > r; r++) o += String.fromCharCode(z[R + r]);
    b = A(q, R + 12);
    A(q, R + 13);
    A(q, R + 14);
    A(q, R + 15);
    c = A(q, R + 16);
    d = A(q, R + 17);
    e = A(q, R + 18);
    j = A(q, R + 19);
    l = v(q, R + 20);
    m = v(q, R + 20 + 4);
    n = v(q, R + 20 + 8);
    p = v(q, R + 20 + 12);
    o = v(q, R + 20 + 16);
    s = v(q, R + 20 + 20);
    t = v(q, R + 20 + 24);
    r = v(q, R + 20 + 28);
    z = v(q, R + 20 + 32);
    w = v(q, R + 20 + 36);
    q = v(q, R + 20 + 40);
    H += b;
    R = 3 * c + j;
    ga = 4 * c + j;
    O = p * R;
    b = o * (R + 3 * d);
    c = s * (R + 3 * e);
    j = t * (R + 3 * d + 3 * e);
    R = r * ga;
    d = z * (ga + 4 * d);
    e = w * (ga + 4 * e);
    ga = H;
    var H = new Float32Array(a, H, 3 * l),
      M,
      J,
      Q,
      Z;
    for (M = 0; M < l; M++)
      (J = H[3 * M]),
        (Q = H[3 * M + 1]),
        (Z = H[3 * M + 2]),
        K.vertices.push(new THREE.Vector3(J, Q, Z));
    l = H = ga + 3 * l * Float32Array.BYTES_PER_ELEMENT;
    if (m) {
      H = new Int8Array(a, H, 3 * m);
      for (ga = 0; ga < m; ga++)
        (M = H[3 * ga]),
          (J = H[3 * ga + 1]),
          (Q = H[3 * ga + 2]),
          I.push(M / 127, J / 127, Q / 127);
    }
    H = l + 3 * m * Int8Array.BYTES_PER_ELEMENT;
    m = H += E(3 * m);
    if (n) {
      l = new Float32Array(a, H, 2 * n);
      for (H = 0; H < n; H++)
        (ga = l[2 * H]), (M = l[2 * H + 1]), N.push(ga, M);
    }
    n = H = m + 2 * n * Float32Array.BYTES_PER_ELEMENT;
    O = n + O + E(2 * p);
    m = O + b + E(2 * o);
    b = m + c + E(2 * s);
    c = b + j + E(2 * t);
    R = c + R + E(2 * r);
    j = R + d + E(2 * z);
    d = j + e + E(2 * w);
    s &&
      ((e = m + 3 * s * Uint32Array.BYTES_PER_ELEMENT),
      C(s, m, e + 3 * s * Uint32Array.BYTES_PER_ELEMENT),
      u(s, e));
    t &&
      ((s = b + 3 * t * Uint32Array.BYTES_PER_ELEMENT),
      (e = s + 3 * t * Uint32Array.BYTES_PER_ELEMENT),
      P(t, b, s, e + 3 * t * Uint32Array.BYTES_PER_ELEMENT),
      u(t, e));
    w &&
      ((t = j + 4 * w * Uint32Array.BYTES_PER_ELEMENT),
      G(w, j, t + 4 * w * Uint32Array.BYTES_PER_ELEMENT),
      D(w, t));
    q &&
      ((w = d + 4 * q * Uint32Array.BYTES_PER_ELEMENT),
      (t = w + 4 * q * Uint32Array.BYTES_PER_ELEMENT),
      B(q, d, w, t + 4 * q * Uint32Array.BYTES_PER_ELEMENT),
      D(q, t));
    p && C(p, n, n + 3 * p * Uint32Array.BYTES_PER_ELEMENT);
    o &&
      ((p = O + 3 * o * Uint32Array.BYTES_PER_ELEMENT),
      P(o, O, p, p + 3 * o * Uint32Array.BYTES_PER_ELEMENT));
    r && G(r, c, c + 4 * r * Uint32Array.BYTES_PER_ELEMENT);
    z &&
      ((o = R + 4 * z * Uint32Array.BYTES_PER_ELEMENT),
      B(z, R, o, o + 4 * z * Uint32Array.BYTES_PER_ELEMENT));
    this.computeCentroids();
    this.computeFaceNormals();
  };
  e.prototype = Object.create(THREE.Geometry.prototype);
  e = new e(c);
  c = this.initMaterials(d, c);
  this.needsTangents(c) && e.computeTangents();
  b(e, c);
};
THREE.ImageLoader = function () {
  THREE.EventTarget.call(this);
  this.crossOrigin = null;
};
THREE.ImageLoader.prototype = {
  constructor: THREE.ImageLoader,
  load: function (a, b) {
    var c = this;
    void 0 === b && (b = new Image());
    b.addEventListener(
      "load",
      function () {
        c.dispatchEvent({
          type: "load",
          content: b,
        });
      },
      !1
    );
    b.addEventListener(
      "error",
      function () {
        c.dispatchEvent({
          type: "error",
          message: "Couldn't load URL [" + a + "]",
        });
      },
      !1
    );
    c.crossOrigin && (b.crossOrigin = c.crossOrigin);
    b.src = a;
  },
};
THREE.JSONLoader = function (a) {
  THREE.Loader.call(this, a);
  this.withCredentials = !1;
};
THREE.JSONLoader.prototype = Object.create(THREE.Loader.prototype);
THREE.JSONLoader.prototype.load = function (a, b, c) {
  c = c && "string" === typeof c ? c : this.extractUrlBase(a);
  this.onLoadStart();
  this.loadAjaxJSON(this, a, b, c);
};
THREE.JSONLoader.prototype.loadAjaxJSON = function (a, b, c, d, e) {
  var f = new XMLHttpRequest(),
    g = 0;
  f.withCredentials = this.withCredentials;
  f.onreadystatechange = function () {
    if (f.readyState === f.DONE)
      if (200 === f.status || 0 === f.status) {
        if (f.responseText) {
          var h = JSON.parse(f.responseText);
          a.createModel(h, c, d);
        } else
          console.warn(
            "THREE.JSONLoader: [" +
              b +
              "] seems to be unreachable or file there is empty"
          );
        a.onLoadComplete();
      } else
        console.error(
          "THREE.JSONLoader: Couldn't load [" + b + "] [" + f.status + "]"
        );
    else
      f.readyState === f.LOADING
        ? e &&
          (0 === g && (g = f.getResponseHeader("Content-Length")),
          e({
            total: g,
            loaded: f.responseText.length,
          }))
        : f.readyState === f.HEADERS_RECEIVED &&
          (g = f.getResponseHeader("Content-Length"));
  };
  f.open("GET", b, !0);
  f.send(null);
};
THREE.JSONLoader.prototype.createModel = function (a, b, c) {
  var d = new THREE.Geometry(),
    e = void 0 !== a.scale ? 1 / a.scale : 1,
    f,
    g,
    h,
    i,
    j,
    l,
    m,
    n,
    p,
    o,
    s,
    t,
    r,
    z,
    w,
    q = a.faces;
  o = a.vertices;
  var E = a.normals,
    A = a.colors,
    v = 0;
  for (f = 0; f < a.uvs.length; f++) a.uvs[f].length && v++;
  for (f = 0; f < v; f++) (d.faceUvs[f] = []), (d.faceVertexUvs[f] = []);
  i = 0;
  for (j = o.length; i < j; )
    (l = new THREE.Vector3()),
      (l.x = o[i++] * e),
      (l.y = o[i++] * e),
      (l.z = o[i++] * e),
      d.vertices.push(l);
  i = 0;
  for (j = q.length; i < j; ) {
    o = q[i++];
    l = o & 1;
    h = o & 2;
    f = o & 4;
    g = o & 8;
    n = o & 16;
    m = o & 32;
    s = o & 64;
    o &= 128;
    l
      ? ((t = new THREE.Face4()),
        (t.a = q[i++]),
        (t.b = q[i++]),
        (t.c = q[i++]),
        (t.d = q[i++]),
        (l = 4))
      : ((t = new THREE.Face3()),
        (t.a = q[i++]),
        (t.b = q[i++]),
        (t.c = q[i++]),
        (l = 3));
    h && ((h = q[i++]), (t.materialIndex = h));
    h = d.faces.length;
    if (f)
      for (f = 0; f < v; f++)
        (r = a.uvs[f]),
          (p = q[i++]),
          (w = r[2 * p]),
          (p = r[2 * p + 1]),
          (d.faceUvs[f][h] = new THREE.UV(w, p));
    if (g)
      for (f = 0; f < v; f++) {
        r = a.uvs[f];
        z = [];
        for (g = 0; g < l; g++)
          (p = q[i++]),
            (w = r[2 * p]),
            (p = r[2 * p + 1]),
            (z[g] = new THREE.UV(w, p));
        d.faceVertexUvs[f][h] = z;
      }
    n &&
      ((n = 3 * q[i++]),
      (g = new THREE.Vector3()),
      (g.x = E[n++]),
      (g.y = E[n++]),
      (g.z = E[n]),
      (t.normal = g));
    if (m)
      for (f = 0; f < l; f++)
        (n = 3 * q[i++]),
          (g = new THREE.Vector3()),
          (g.x = E[n++]),
          (g.y = E[n++]),
          (g.z = E[n]),
          t.vertexNormals.push(g);
    s && ((m = q[i++]), (m = new THREE.Color(A[m])), (t.color = m));
    if (o)
      for (f = 0; f < l; f++)
        (m = q[i++]), (m = new THREE.Color(A[m])), t.vertexColors.push(m);
    d.faces.push(t);
  }
  if (a.skinWeights) {
    i = 0;
    for (j = a.skinWeights.length; i < j; i += 2)
      (q = a.skinWeights[i]),
        (E = a.skinWeights[i + 1]),
        d.skinWeights.push(new THREE.Vector4(q, E, 0, 0));
  }
  if (a.skinIndices) {
    i = 0;
    for (j = a.skinIndices.length; i < j; i += 2)
      (q = a.skinIndices[i]),
        (E = a.skinIndices[i + 1]),
        d.skinIndices.push(new THREE.Vector4(q, E, 0, 0));
  }
  d.bones = a.bones;
  d.animation = a.animation;
  if (void 0 !== a.morphTargets) {
    i = 0;
    for (j = a.morphTargets.length; i < j; i++) {
      d.morphTargets[i] = {};
      d.morphTargets[i].name = a.morphTargets[i].name;
      d.morphTargets[i].vertices = [];
      A = d.morphTargets[i].vertices;
      v = a.morphTargets[i].vertices;
      q = 0;
      for (E = v.length; q < E; q += 3)
        (o = new THREE.Vector3()),
          (o.x = v[q] * e),
          (o.y = v[q + 1] * e),
          (o.z = v[q + 2] * e),
          A.push(o);
    }
  }
  if (void 0 !== a.morphColors) {
    i = 0;
    for (j = a.morphColors.length; i < j; i++) {
      d.morphColors[i] = {};
      d.morphColors[i].name = a.morphColors[i].name;
      d.morphColors[i].colors = [];
      E = d.morphColors[i].colors;
      A = a.morphColors[i].colors;
      e = 0;
      for (q = A.length; e < q; e += 3)
        (v = new THREE.Color(16755200)),
          v.setRGB(A[e], A[e + 1], A[e + 2]),
          E.push(v);
    }
  }
  d.computeCentroids();
  d.computeFaceNormals();
  a = this.initMaterials(a.materials, c);
  this.needsTangents(a) && d.computeTangents();
  b(d, a);
};
THREE.LoadingMonitor = function () {
  THREE.EventTarget.call(this);
  var a = this,
    b = 0,
    c = 0,
    d = function () {
      b++;
      a.dispatchEvent({
        type: "progress",
        loaded: b,
        total: c,
      });
      b === c &&
        a.dispatchEvent({
          type: "load",
        });
    };
  this.add = function (a) {
    c++;
    a.addEventListener("load", d, !1);
  };
};
THREE.SceneLoader = function () {
  this.onLoadStart = function () {};
  this.onLoadProgress = function () {};
  this.onLoadComplete = function () {};
  this.callbackSync = function () {};
  this.callbackProgress = function () {};
  this.geometryHandlerMap = {};
  this.hierarchyHandlerMap = {};
  this.addGeometryHandler("ascii", THREE.JSONLoader);
  this.addGeometryHandler("binary", THREE.BinaryLoader);
};
THREE.SceneLoader.prototype.constructor = THREE.SceneLoader;
THREE.SceneLoader.prototype.load = function (a, b) {
  var c = this,
    d = new XMLHttpRequest();
  d.onreadystatechange = function () {
    if (4 === d.readyState)
      if (200 === d.status || 0 === d.status) {
        var e = JSON.parse(d.responseText);
        c.parse(e, b, a);
      } else
        console.error(
          "THREE.SceneLoader: Couldn't load [" + a + "] [" + d.status + "]"
        );
  };
  d.open("GET", a, !0);
  d.send(null);
};
THREE.SceneLoader.prototype.addGeometryHandler = function (a, b) {
  this.geometryHandlerMap[a] = {
    loaderClass: b,
  };
};
THREE.SceneLoader.prototype.addHierarchyHandler = function (a, b) {
  this.hierarchyHandlerMap[a] = {
    loaderClass: b,
  };
};
THREE.SceneLoader.prototype.parse = function (a, b, c) {
  function d(a, b) {
    return "relativeToHTML" == b ? a : m + "/" + a;
  }
  function e() {
    f(M.scene, Q.objects);
  }
  function f(a, b) {
    for (var c in b)
      if (void 0 === M.objects[c]) {
        var e = b[c],
          g = null;
        if (e.type && e.type in l.hierarchyHandlerMap && void 0 === e.loading) {
          var i = {},
            j;
          for (j in t) "type" !== j && "url" !== j && (i[j] = t[j]);
          C = M.materials[e.material];
          e.loading = !0;
          var n = l.hierarchyHandlerMap[e.type].loaderObject;
          n.addEventListener
            ? (n.addEventListener("load", h(c, a, C, e)),
              n.load(d(e.url, Q.urlBaseType)))
            : n.options
            ? n.load(d(e.url, Q.urlBaseType), h(c, a, C, e))
            : n.load(d(e.url, Q.urlBaseType), h(c, a, C, e), i);
        } else if (void 0 !== e.geometry) {
          if ((D = M.geometries[e.geometry])) {
            g = !1;
            C = M.materials[e.material];
            g = C instanceof THREE.ShaderMaterial;
            w = e.position;
            q = e.rotation;
            E = e.quaternion;
            A = e.scale;
            r = e.matrix;
            E = 0;
            e.material ||
              (C = new THREE.MeshFaceMaterial(M.face_materials[e.geometry]));
            C instanceof THREE.MeshFaceMaterial &&
              0 === C.materials.length &&
              (C = new THREE.MeshFaceMaterial(M.face_materials[e.geometry]));
            if (C instanceof THREE.MeshFaceMaterial)
              for (i = 0; i < C.materials.length; i++)
                g = g || C.materials[i] instanceof THREE.ShaderMaterial;
            g && D.computeTangents();
            e.skin
              ? (g = new THREE.SkinnedMesh(D, C))
              : e.morph
              ? ((g = new THREE.MorphAnimMesh(D, C)),
                void 0 !== e.duration && (g.duration = e.duration),
                void 0 !== e.time && (g.time = e.time),
                void 0 !== e.mirroredLoop && (g.mirroredLoop = e.mirroredLoop),
                C.morphNormals && D.computeMorphNormals())
              : (g = new THREE.Mesh(D, C));
            g.name = c;
            r
              ? ((g.matrixAutoUpdate = !1),
                g.matrix.set(
                  r[0],
                  r[1],
                  r[2],
                  r[3],
                  r[4],
                  r[5],
                  r[6],
                  r[7],
                  r[8],
                  r[9],
                  r[10],
                  r[11],
                  r[12],
                  r[13],
                  r[14],
                  r[15]
                ))
              : (g.position.set(w[0], w[1], w[2]),
                E
                  ? (g.quaternion.set(E[0], E[1], E[2], E[3]),
                    (g.useQuaternion = !0))
                  : g.rotation.set(q[0], q[1], q[2]),
                g.scale.set(A[0], A[1], A[2]));
            g.visible = e.visible;
            g.castShadow = e.castShadow;
            g.receiveShadow = e.receiveShadow;
            a.add(g);
            M.objects[c] = g;
          }
        } else
          "DirectionalLight" === e.type ||
          "PointLight" === e.type ||
          "AmbientLight" === e.type
            ? ((H = void 0 !== e.color ? e.color : 16777215),
              (I = void 0 !== e.intensity ? e.intensity : 1),
              "DirectionalLight" === e.type
                ? ((w = e.direction),
                  (K = new THREE.DirectionalLight(H, I)),
                  K.position.set(w[0], w[1], w[2]),
                  e.target &&
                    (J.push({
                      object: K,
                      targetName: e.target,
                    }),
                    (K.target = null)))
                : "PointLight" === e.type
                ? ((w = e.position),
                  (z = e.distance),
                  (K = new THREE.PointLight(H, I, z)),
                  K.position.set(w[0], w[1], w[2]))
                : "AmbientLight" === e.type && (K = new THREE.AmbientLight(H)),
              a.add(K),
              (K.name = c),
              (M.lights[c] = K),
              (M.objects[c] = K))
            : "PerspectiveCamera" === e.type || "OrthographicCamera" === e.type
            ? ("PerspectiveCamera" === e.type
                ? (G = new THREE.PerspectiveCamera(
                    e.fov,
                    e.aspect,
                    e.near,
                    e.far
                  ))
                : "OrthographicCamera" === e.type &&
                  (G = new THREE.OrthographicCamera(
                    v.left,
                    v.right,
                    v.top,
                    v.bottom,
                    v.near,
                    v.far
                  )),
              (w = e.position),
              G.position.set(w[0], w[1], w[2]),
              a.add(G),
              (G.name = c),
              (M.cameras[c] = G),
              (M.objects[c] = G))
            : ((w = e.position),
              (q = e.rotation),
              (E = e.quaternion),
              (A = e.scale),
              (E = 0),
              (g = new THREE.Object3D()),
              (g.name = c),
              g.position.set(w[0], w[1], w[2]),
              E
                ? (g.quaternion.set(E[0], E[1], E[2], E[3]),
                  (g.useQuaternion = !0))
                : g.rotation.set(q[0], q[1], q[2]),
              g.scale.set(A[0], A[1], A[2]),
              (g.visible = void 0 !== e.visible ? e.visible : !1),
              a.add(g),
              (M.objects[c] = g),
              (M.empties[c] = g));
        if (g) {
          if (void 0 !== e.properties)
            for (var m in e.properties) g.properties[m] = e.properties[m];
          void 0 !== e.children && f(g, e.children);
        }
      }
  }
  function g(a) {
    return function (b, c) {
      M.geometries[a] = b;
      M.face_materials[a] = c;
      e();
      N -= 1;
      l.onLoadComplete();
      j();
    };
  }
  function h(a, b, c, d) {
    return function (f) {
      var f = f.content ? f.content : f.dae ? f.scene : f,
        g = d.position,
        h = d.rotation,
        i = d.quaternion,
        n = d.scale;
      f.position.set(g[0], g[1], g[2]);
      i
        ? (f.quaternion.set(i[0], i[1], i[2], i[3]), (f.useQuaternion = !0))
        : f.rotation.set(h[0], h[1], h[2]);
      f.scale.set(n[0], n[1], n[2]);
      c &&
        f.traverse(function (a) {
          a.material = c;
        });
      b.add(f);
      M.objects[a] = f;
      e();
      N -= 1;
      l.onLoadComplete();
      j();
    };
  }
  function i(a) {
    return function (b, c) {
      M.geometries[a] = b;
      M.face_materials[a] = c;
    };
  }
  function j() {
    l.callbackProgress(
      {
        totalModels: R,
        totalTextures: ga,
        loadedModels: R - N,
        loadedTextures: ga - O,
      },
      M
    );
    l.onLoadProgress();
    if (0 === N && 0 === O) {
      for (var a = 0; a < J.length; a++) {
        var c = J[a],
          d = M.objects[c.targetName];
        d
          ? (c.object.target = d)
          : ((c.object.target = new THREE.Object3D()),
            M.scene.add(c.object.target));
        c.object.target.properties.targetInverse = c.object;
      }
      b(M);
    }
  }
  var l = this,
    m = THREE.Loader.prototype.extractUrlBase(c),
    n,
    p,
    o,
    s,
    t,
    r,
    z,
    w,
    q,
    E,
    A,
    v,
    u,
    D,
    C,
    G,
    P,
    B,
    K,
    H,
    I,
    N,
    O,
    R,
    ga,
    M,
    J = [],
    Q = a,
    Z;
  for (Z in this.geometryHandlerMap)
    (a = this.geometryHandlerMap[Z].loaderClass),
      (this.geometryHandlerMap[Z].loaderObject = new a());
  for (Z in this.hierarchyHandlerMap)
    (a = this.hierarchyHandlerMap[Z].loaderClass),
      (this.hierarchyHandlerMap[Z].loaderObject = new a());
  O = N = 0;
  M = {
    scene: new THREE.Scene(),
    geometries: {},
    face_materials: {},
    materials: {},
    textures: {},
    objects: {},
    cameras: {},
    lights: {},
    fogs: {},
    empties: {},
  };
  if (
    Q.transform &&
    ((Z = Q.transform.position),
    (a = Q.transform.rotation),
    (c = Q.transform.scale),
    Z && M.scene.position.set(Z[0], Z[1], Z[2]),
    a && M.scene.rotation.set(a[0], a[1], a[2]),
    c && M.scene.scale.set(c[0], c[1], c[2]),
    Z || a || c)
  )
    M.scene.updateMatrix(), M.scene.updateMatrixWorld();
  Z = function (a) {
    return function () {
      O -= a;
      j();
      l.onLoadComplete();
    };
  };
  for (o in Q.fogs)
    (a = Q.fogs[o]),
      "linear" === a.type
        ? (P = new THREE.Fog(0, a.near, a.far))
        : "exp2" === a.type && (P = new THREE.FogExp2(0, a.density)),
      (v = a.color),
      P.color.setRGB(v[0], v[1], v[2]),
      (M.fogs[o] = P);
  for (n in Q.geometries)
    (t = Q.geometries[n]),
      t.type in this.geometryHandlerMap && ((N += 1), l.onLoadStart());
  for (var L in Q.objects)
    (o = Q.objects[L]),
      o.type &&
        o.type in this.hierarchyHandlerMap &&
        ((N += 1), l.onLoadStart());
  R = N;
  for (n in Q.geometries)
    if (((t = Q.geometries[n]), "cube" === t.type))
      (D = new THREE.CubeGeometry(
        t.width,
        t.height,
        t.depth,
        t.widthSegments,
        t.heightSegments,
        t.depthSegments
      )),
        (M.geometries[n] = D);
    else if ("plane" === t.type)
      (D = new THREE.PlaneGeometry(
        t.width,
        t.height,
        t.widthSegments,
        t.heightSegments
      )),
        (M.geometries[n] = D);
    else if ("sphere" === t.type)
      (D = new THREE.SphereGeometry(
        t.radius,
        t.widthSegments,
        t.heightSegments
      )),
        (M.geometries[n] = D);
    else if ("cylinder" === t.type)
      (D = new THREE.CylinderGeometry(
        t.topRad,
        t.botRad,
        t.height,
        t.radSegs,
        t.heightSegs
      )),
        (M.geometries[n] = D);
    else if ("torus" === t.type)
      (D = new THREE.TorusGeometry(t.radius, t.tube, t.segmentsR, t.segmentsT)),
        (M.geometries[n] = D);
    else if ("icosahedron" === t.type)
      (D = new THREE.IcosahedronGeometry(t.radius, t.subdivisions)),
        (M.geometries[n] = D);
    else if (t.type in this.geometryHandlerMap) {
      L = {};
      for (B in t) "type" !== B && "url" !== B && (L[B] = t[B]);
      this.geometryHandlerMap[t.type].loaderObject.load(
        d(t.url, Q.urlBaseType),
        g(n),
        L
      );
    } else
      "embedded" === t.type &&
        ((L = Q.embeds[t.id]),
        (L.metadata = Q.metadata),
        L &&
          this.geometryHandlerMap.ascii.loaderObject.createModel(L, i(n), ""));
  for (s in Q.textures)
    if (((n = Q.textures[s]), n.url instanceof Array)) {
      O += n.url.length;
      for (B = 0; B < n.url.length; B++) l.onLoadStart();
    } else (O += 1), l.onLoadStart();
  ga = O;
  for (s in Q.textures) {
    n = Q.textures[s];
    void 0 !== n.mapping &&
      void 0 !== THREE[n.mapping] &&
      (n.mapping = new THREE[n.mapping]());
    if (n.url instanceof Array) {
      L = n.url.length;
      o = [];
      for (B = 0; B < L; B++) o[B] = d(n.url[B], Q.urlBaseType);
      B = (B = o[0].endsWith(".dds"))
        ? THREE.ImageUtils.loadCompressedTextureCube(o, n.mapping, Z(L))
        : THREE.ImageUtils.loadTextureCube(o, n.mapping, Z(L));
    } else {
      B = n.url.toLowerCase().endsWith(".dds");
      L = d(n.url, Q.urlBaseType);
      o = Z(1);
      B = B
        ? THREE.ImageUtils.loadCompressedTexture(L, n.mapping, o)
        : THREE.ImageUtils.loadTexture(L, n.mapping, o);
      void 0 !== THREE[n.minFilter] && (B.minFilter = THREE[n.minFilter]);
      void 0 !== THREE[n.magFilter] && (B.magFilter = THREE[n.magFilter]);
      n.anisotropy && (B.anisotropy = n.anisotropy);
      if (
        n.repeat &&
        (B.repeat.set(n.repeat[0], n.repeat[1]),
        1 !== n.repeat[0] && (B.wrapS = THREE.RepeatWrapping),
        1 !== n.repeat[1])
      )
        B.wrapT = THREE.RepeatWrapping;
      n.offset && B.offset.set(n.offset[0], n.offset[1]);
      if (
        n.wrap &&
        ((L = {
          repeat: THREE.RepeatWrapping,
          mirror: THREE.MirroredRepeatWrapping,
        }),
        void 0 !== L[n.wrap[0]] && (B.wrapS = L[n.wrap[0]]),
        void 0 !== L[n.wrap[1]])
      )
        B.wrapT = L[n.wrap[1]];
    }
    M.textures[s] = B;
  }
  for (p in Q.materials) {
    r = Q.materials[p];
    for (u in r.parameters)
      "envMap" === u || "map" === u || "lightMap" === u || "bumpMap" === u
        ? (r.parameters[u] = M.textures[r.parameters[u]])
        : "shading" === u
        ? (r.parameters[u] =
            "flat" === r.parameters[u]
              ? THREE.FlatShading
              : THREE.SmoothShading)
        : "side" === u
        ? (r.parameters[u] =
            "double" == r.parameters[u]
              ? THREE.DoubleSide
              : "back" == r.parameters[u]
              ? THREE.BackSide
              : THREE.FrontSide)
        : "blending" === u
        ? (r.parameters[u] =
            r.parameters[u] in THREE
              ? THREE[r.parameters[u]]
              : THREE.NormalBlending)
        : "combine" === u
        ? (r.parameters[u] =
            "MixOperation" == r.parameters[u]
              ? THREE.MixOperation
              : THREE.MultiplyOperation)
        : "vertexColors" === u
        ? "face" == r.parameters[u]
          ? (r.parameters[u] = THREE.FaceColors)
          : r.parameters[u] && (r.parameters[u] = THREE.VertexColors)
        : "wrapRGB" === u &&
          ((s = r.parameters[u]),
          (r.parameters[u] = new THREE.Vector3(s[0], s[1], s[2])));
    void 0 !== r.parameters.opacity &&
      1 > r.parameters.opacity &&
      (r.parameters.transparent = !0);
    r.parameters.normalMap
      ? ((s = THREE.ShaderUtils.lib.normal),
        (Z = THREE.UniformsUtils.clone(s.uniforms)),
        (n = r.parameters.color),
        (B = r.parameters.specular),
        (L = r.parameters.ambient),
        (o = r.parameters.shininess),
        (Z.tNormal.value = M.textures[r.parameters.normalMap]),
        r.parameters.normalScale &&
          Z.uNormalScale.value.set(
            r.parameters.normalScale[0],
            r.parameters.normalScale[1]
          ),
        r.parameters.map &&
          ((Z.tDiffuse.value = r.parameters.map), (Z.enableDiffuse.value = !0)),
        r.parameters.envMap &&
          ((Z.tCube.value = r.parameters.envMap),
          (Z.enableReflection.value = !0),
          (Z.uReflectivity.value = r.parameters.reflectivity)),
        r.parameters.lightMap &&
          ((Z.tAO.value = r.parameters.lightMap), (Z.enableAO.value = !0)),
        r.parameters.specularMap &&
          ((Z.tSpecular.value = M.textures[r.parameters.specularMap]),
          (Z.enableSpecular.value = !0)),
        r.parameters.displacementMap &&
          ((Z.tDisplacement.value = M.textures[r.parameters.displacementMap]),
          (Z.enableDisplacement.value = !0),
          (Z.uDisplacementBias.value = r.parameters.displacementBias),
          (Z.uDisplacementScale.value = r.parameters.displacementScale)),
        Z.uDiffuseColor.value.setHex(n),
        Z.uSpecularColor.value.setHex(B),
        Z.uAmbientColor.value.setHex(L),
        (Z.uShininess.value = o),
        r.parameters.opacity && (Z.uOpacity.value = r.parameters.opacity),
        (C = new THREE.ShaderMaterial({
          fragmentShader: s.fragmentShader,
          vertexShader: s.vertexShader,
          uniforms: Z,
          lights: !0,
          fog: !0,
        })))
      : (C = new THREE[r.type](r.parameters));
    M.materials[p] = C;
  }
  for (p in Q.materials)
    if (((r = Q.materials[p]), r.parameters.materials)) {
      u = [];
      for (B = 0; B < r.parameters.materials.length; B++)
        u.push(M.materials[r.parameters.materials[B]]);
      M.materials[p].materials = u;
    }
  e();
  M.cameras &&
    Q.defaults.camera &&
    (M.currentCamera = M.cameras[Q.defaults.camera]);
  M.fogs && Q.defaults.fog && (M.scene.fog = M.fogs[Q.defaults.fog]);
  v = Q.defaults.bgcolor;
  M.bgColor = new THREE.Color();
  M.bgColor.setRGB(v[0], v[1], v[2]);
  M.bgColorAlpha = Q.defaults.bgalpha;
  l.callbackSync(M);
  j();
};
THREE.TextureLoader = function () {
  THREE.EventTarget.call(this);
  this.crossOrigin = null;
};
THREE.TextureLoader.prototype = {
  constructor: THREE.TextureLoader,
  load: function (a) {
    var b = this,
      c = new Image();
    c.addEventListener(
      "load",
      function () {
        var a = new THREE.Texture(c);
        a.needsUpdate = !0;
        b.dispatchEvent({
          type: "load",
          content: a,
        });
      },
      !1
    );
    c.addEventListener(
      "error",
      function () {
        b.dispatchEvent({
          type: "error",
          message: "Couldn't load URL [" + a + "]",
        });
      },
      !1
    );
    b.crossOrigin && (c.crossOrigin = b.crossOrigin);
    c.src = a;
  },
};
THREE.Material = function () {
  THREE.MaterialLibrary.push(this);
  this.id = THREE.MaterialIdCount++;
  this.name = "";
  this.side = THREE.FrontSide;
  this.opacity = 1;
  this.transparent = !1;
  this.blending = THREE.NormalBlending;
  this.blendSrc = THREE.SrcAlphaFactor;
  this.blendDst = THREE.OneMinusSrcAlphaFactor;
  this.blendEquation = THREE.AddEquation;
  this.depthWrite = this.depthTest = !0;
  this.polygonOffset = !1;
  this.alphaTest = this.polygonOffsetUnits = this.polygonOffsetFactor = 0;
  this.overdraw = !1;
  this.needsUpdate = this.visible = !0;
};
THREE.Material.prototype.setValues = function (a) {
  if (void 0 !== a)
    for (var b in a) {
      var c = a[b];
      if (void 0 === c)
        console.warn("THREE.Material: '" + b + "' parameter is undefined.");
      else if (b in this) {
        var d = this[b];
        d instanceof THREE.Color && c instanceof THREE.Color
          ? d.copy(c)
          : d instanceof THREE.Color && "number" === typeof c
          ? d.setHex(c)
          : d instanceof THREE.Vector3 && c instanceof THREE.Vector3
          ? d.copy(c)
          : (this[b] = c);
      }
    }
};
THREE.Material.prototype.clone = function (a) {
  void 0 === a && (a = new THREE.Material());
  a.name = this.name;
  a.side = this.side;
  a.opacity = this.opacity;
  a.transparent = this.transparent;
  a.blending = this.blending;
  a.blendSrc = this.blendSrc;
  a.blendDst = this.blendDst;
  a.blendEquation = this.blendEquation;
  a.depthTest = this.depthTest;
  a.depthWrite = this.depthWrite;
  a.polygonOffset = this.polygonOffset;
  a.polygonOffsetFactor = this.polygonOffsetFactor;
  a.polygonOffsetUnits = this.polygonOffsetUnits;
  a.alphaTest = this.alphaTest;
  a.overdraw = this.overdraw;
  a.visible = this.visible;
  return a;
};
THREE.Material.prototype.deallocate = function () {
  var a = THREE.MaterialLibrary.indexOf(this);
  -1 !== a && THREE.MaterialLibrary.splice(a, 1);
};
THREE.MaterialIdCount = 0;
THREE.MaterialLibrary = [];
THREE.LineBasicMaterial = function (a) {
  THREE.Material.call(this);
  this.color = new THREE.Color(16777215);
  this.linewidth = 1;
  this.linejoin = this.linecap = "round";
  this.vertexColors = !1;
  this.fog = !0;
  this.setValues(a);
};
THREE.LineBasicMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.LineBasicMaterial.prototype.clone = function () {
  var a = new THREE.LineBasicMaterial();
  THREE.Material.prototype.clone.call(this, a);
  a.color.copy(this.color);
  a.linewidth = this.linewidth;
  a.linecap = this.linecap;
  a.linejoin = this.linejoin;
  a.vertexColors = this.vertexColors;
  a.fog = this.fog;
  return a;
};
THREE.LineDashedMaterial = function (a) {
  THREE.Material.call(this);
  this.color = new THREE.Color(16777215);
  this.scale = this.linewidth = 1;
  this.dashSize = 3;
  this.gapSize = 1;
  this.vertexColors = !1;
  this.fog = !0;
  this.setValues(a);
};
THREE.LineDashedMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.LineDashedMaterial.prototype.clone = function () {
  var a = new THREE.LineDashedMaterial();
  THREE.Material.prototype.clone.call(this, a);
  a.color.copy(this.color);
  a.linewidth = this.linewidth;
  a.scale = this.scale;
  a.dashSize = this.dashSize;
  a.gapSize = this.gapSize;
  a.vertexColors = this.vertexColors;
  a.fog = this.fog;
  return a;
};
THREE.MeshBasicMaterial = function (a) {
  THREE.Material.call(this);
  this.color = new THREE.Color(16777215);
  this.envMap = this.specularMap = this.lightMap = this.map = null;
  this.combine = THREE.MultiplyOperation;
  this.reflectivity = 1;
  this.refractionRatio = 0.98;
  this.fog = !0;
  this.shading = THREE.SmoothShading;
  this.wireframe = !1;
  this.wireframeLinewidth = 1;
  this.wireframeLinejoin = this.wireframeLinecap = "round";
  this.vertexColors = THREE.NoColors;
  this.morphTargets = this.skinning = !1;
  this.setValues(a);
};
THREE.MeshBasicMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.MeshBasicMaterial.prototype.clone = function () {
  var a = new THREE.MeshBasicMaterial();
  THREE.Material.prototype.clone.call(this, a);
  a.color.copy(this.color);
  a.map = this.map;
  a.lightMap = this.lightMap;
  a.specularMap = this.specularMap;
  a.envMap = this.envMap;
  a.combine = this.combine;
  a.reflectivity = this.reflectivity;
  a.refractionRatio = this.refractionRatio;
  a.fog = this.fog;
  a.shading = this.shading;
  a.wireframe = this.wireframe;
  a.wireframeLinewidth = this.wireframeLinewidth;
  a.wireframeLinecap = this.wireframeLinecap;
  a.wireframeLinejoin = this.wireframeLinejoin;
  a.vertexColors = this.vertexColors;
  a.skinning = this.skinning;
  a.morphTargets = this.morphTargets;
  return a;
};
THREE.MeshLambertMaterial = function (a) {
  THREE.Material.call(this);
  this.color = new THREE.Color(16777215);
  this.ambient = new THREE.Color(16777215);
  this.emissive = new THREE.Color(0);
  this.wrapAround = !1;
  this.wrapRGB = new THREE.Vector3(1, 1, 1);
  this.envMap = this.specularMap = this.lightMap = this.map = null;
  this.combine = THREE.MultiplyOperation;
  this.reflectivity = 1;
  this.refractionRatio = 0.98;
  this.fog = !0;
  this.shading = THREE.SmoothShading;
  this.wireframe = !1;
  this.wireframeLinewidth = 1;
  this.wireframeLinejoin = this.wireframeLinecap = "round";
  this.vertexColors = THREE.NoColors;
  this.morphNormals = this.morphTargets = this.skinning = !1;
  this.setValues(a);
};
THREE.MeshLambertMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.MeshLambertMaterial.prototype.clone = function () {
  var a = new THREE.MeshLambertMaterial();
  THREE.Material.prototype.clone.call(this, a);
  a.color.copy(this.color);
  a.ambient.copy(this.ambient);
  a.emissive.copy(this.emissive);
  a.wrapAround = this.wrapAround;
  a.wrapRGB.copy(this.wrapRGB);
  a.map = this.map;
  a.lightMap = this.lightMap;
  a.specularMap = this.specularMap;
  a.envMap = this.envMap;
  a.combine = this.combine;
  a.reflectivity = this.reflectivity;
  a.refractionRatio = this.refractionRatio;
  a.fog = this.fog;
  a.shading = this.shading;
  a.wireframe = this.wireframe;
  a.wireframeLinewidth = this.wireframeLinewidth;
  a.wireframeLinecap = this.wireframeLinecap;
  a.wireframeLinejoin = this.wireframeLinejoin;
  a.vertexColors = this.vertexColors;
  a.skinning = this.skinning;
  a.morphTargets = this.morphTargets;
  a.morphNormals = this.morphNormals;
  return a;
};
THREE.MeshPhongMaterial = function (a) {
  THREE.Material.call(this);
  this.color = new THREE.Color(16777215);
  this.ambient = new THREE.Color(16777215);
  this.emissive = new THREE.Color(0);
  this.specular = new THREE.Color(1118481);
  this.shininess = 30;
  this.metal = !1;
  this.perPixel = !0;
  this.wrapAround = !1;
  this.wrapRGB = new THREE.Vector3(1, 1, 1);
  this.bumpMap = this.lightMap = this.map = null;
  this.bumpScale = 1;
  this.normalMap = null;
  this.normalScale = new THREE.Vector2(1, 1);
  this.envMap = this.specularMap = null;
  this.combine = THREE.MultiplyOperation;
  this.reflectivity = 1;
  this.refractionRatio = 0.98;
  this.fog = !0;
  this.shading = THREE.SmoothShading;
  this.wireframe = !1;
  this.wireframeLinewidth = 1;
  this.wireframeLinejoin = this.wireframeLinecap = "round";
  this.vertexColors = THREE.NoColors;
  this.morphNormals = this.morphTargets = this.skinning = !1;
  this.setValues(a);
};
THREE.MeshPhongMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.MeshPhongMaterial.prototype.clone = function () {
  var a = new THREE.MeshPhongMaterial();
  THREE.Material.prototype.clone.call(this, a);
  a.color.copy(this.color);
  a.ambient.copy(this.ambient);
  a.emissive.copy(this.emissive);
  a.specular.copy(this.specular);
  a.shininess = this.shininess;
  a.metal = this.metal;
  a.perPixel = this.perPixel;
  a.wrapAround = this.wrapAround;
  a.wrapRGB.copy(this.wrapRGB);
  a.map = this.map;
  a.lightMap = this.lightMap;
  a.bumpMap = this.bumpMap;
  a.bumpScale = this.bumpScale;
  a.normalMap = this.normalMap;
  a.normalScale.copy(this.normalScale);
  a.specularMap = this.specularMap;
  a.envMap = this.envMap;
  a.combine = this.combine;
  a.reflectivity = this.reflectivity;
  a.refractionRatio = this.refractionRatio;
  a.fog = this.fog;
  a.shading = this.shading;
  a.wireframe = this.wireframe;
  a.wireframeLinewidth = this.wireframeLinewidth;
  a.wireframeLinecap = this.wireframeLinecap;
  a.wireframeLinejoin = this.wireframeLinejoin;
  a.vertexColors = this.vertexColors;
  a.skinning = this.skinning;
  a.morphTargets = this.morphTargets;
  a.morphNormals = this.morphNormals;
  return a;
};
THREE.MeshDepthMaterial = function (a) {
  THREE.Material.call(this);
  this.wireframe = !1;
  this.wireframeLinewidth = 1;
  this.setValues(a);
};
THREE.MeshDepthMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.MeshDepthMaterial.prototype.clone = function () {
  var a = new THREE.LineBasicMaterial();
  THREE.Material.prototype.clone.call(this, a);
  a.wireframe = this.wireframe;
  a.wireframeLinewidth = this.wireframeLinewidth;
  return a;
};
THREE.MeshNormalMaterial = function (a) {
  THREE.Material.call(this, a);
  this.shading = THREE.FlatShading;
  this.wireframe = !1;
  this.wireframeLinewidth = 1;
  this.setValues(a);
};
THREE.MeshNormalMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.MeshNormalMaterial.prototype.clone = function () {
  var a = new THREE.MeshNormalMaterial();
  THREE.Material.prototype.clone.call(this, a);
  a.shading = this.shading;
  a.wireframe = this.wireframe;
  a.wireframeLinewidth = this.wireframeLinewidth;
  return a;
};
THREE.MeshFaceMaterial = function (a) {
  this.materials = a instanceof Array ? a : [];
};
THREE.MeshFaceMaterial.prototype.clone = function () {
  return new THREE.MeshFaceMaterial(this.materials.slice(0));
};
THREE.ParticleBasicMaterial = function (a) {
  THREE.Material.call(this);
  this.color = new THREE.Color(16777215);
  this.map = null;
  this.size = 1;
  this.sizeAttenuation = !0;
  this.vertexColors = !1;
  this.fog = !0;
  this.setValues(a);
};
THREE.ParticleBasicMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.ParticleBasicMaterial.prototype.clone = function () {
  var a = new THREE.ParticleBasicMaterial();
  THREE.Material.prototype.clone.call(this, a);
  a.color.copy(this.color);
  a.map = this.map;
  a.size = this.size;
  a.sizeAttenuation = this.sizeAttenuation;
  a.vertexColors = this.vertexColors;
  a.fog = this.fog;
  return a;
};
THREE.ParticleCanvasMaterial = function (a) {
  THREE.Material.call(this);
  this.color = new THREE.Color(16777215);
  this.program = function () {};
  this.setValues(a);
};
THREE.ParticleCanvasMaterial.prototype = Object.create(
  THREE.Material.prototype
);
THREE.ParticleCanvasMaterial.prototype.clone = function () {
  var a = new THREE.ParticleCanvasMaterial();
  THREE.Material.prototype.clone.call(this, a);
  a.color.copy(this.color);
  a.program = this.program;
  return a;
};
THREE.ParticleDOMMaterial = function (a) {
  this.element = a;
};
THREE.ParticleDOMMaterial.prototype.clone = function () {
  return new THREE.ParticleDOMMaterial(this.element);
};
THREE.ShaderMaterial = function (a) {
  THREE.Material.call(this);
  this.vertexShader = this.fragmentShader = "void main() {}";
  this.uniforms = {};
  this.defines = {};
  this.attributes = null;
  this.shading = THREE.SmoothShading;
  this.wireframe = !1;
  this.wireframeLinewidth = 1;
  this.lights = this.fog = !1;
  this.vertexColors = THREE.NoColors;
  this.morphNormals = this.morphTargets = this.skinning = !1;
  this.setValues(a);
};
THREE.ShaderMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.ShaderMaterial.prototype.clone = function () {
  var a = new THREE.ShaderMaterial();
  THREE.Material.prototype.clone.call(this, a);
  a.fragmentShader = this.fragmentShader;
  a.vertexShader = this.vertexShader;
  a.uniforms = THREE.UniformsUtils.clone(this.uniforms);
  a.attributes = this.attributes;
  a.defines = this.defines;
  a.shading = this.shading;
  a.wireframe = this.wireframe;
  a.wireframeLinewidth = this.wireframeLinewidth;
  a.fog = this.fog;
  a.lights = this.lights;
  a.vertexColors = this.vertexColors;
  a.skinning = this.skinning;
  a.morphTargets = this.morphTargets;
  a.morphNormals = this.morphNormals;
  return a;
};
THREE.Texture = function (a, b, c, d, e, f, g, h, i) {
  THREE.TextureLibrary.push(this);
  this.id = THREE.TextureIdCount++;
  this.name = "";
  this.image = a;
  this.mapping = void 0 !== b ? b : new THREE.UVMapping();
  this.wrapS = void 0 !== c ? c : THREE.ClampToEdgeWrapping;
  this.wrapT = void 0 !== d ? d : THREE.ClampToEdgeWrapping;
  this.magFilter = void 0 !== e ? e : THREE.LinearFilter;
  this.minFilter = void 0 !== f ? f : THREE.LinearMipMapLinearFilter;
  this.anisotropy = void 0 !== i ? i : 1;
  this.format = void 0 !== g ? g : THREE.RGBAFormat;
  this.type = void 0 !== h ? h : THREE.UnsignedByteType;
  this.offset = new THREE.Vector2(0, 0);
  this.repeat = new THREE.Vector2(1, 1);
  this.generateMipmaps = !0;
  this.premultiplyAlpha = !1;
  this.flipY = !0;
  this.needsUpdate = !1;
  this.onUpdate = null;
};
THREE.Texture.prototype = {
  constructor: THREE.Texture,
  clone: function () {
    var a = new THREE.Texture();
    a.image = this.image;
    a.mapping = this.mapping;
    a.wrapS = this.wrapS;
    a.wrapT = this.wrapT;
    a.magFilter = this.magFilter;
    a.minFilter = this.minFilter;
    a.anisotropy = this.anisotropy;
    a.format = this.format;
    a.type = this.type;
    a.offset.copy(this.offset);
    a.repeat.copy(this.repeat);
    a.generateMipmaps = this.generateMipmaps;
    a.premultiplyAlpha = this.premultiplyAlpha;
    a.flipY = this.flipY;
    return a;
  },
  deallocate: function () {
    var a = THREE.TextureLibrary.indexOf(this);
    -1 !== a && THREE.TextureLibrary.splice(a, 1);
  },
};
THREE.TextureIdCount = 0;
THREE.TextureLibrary = [];
THREE.CompressedTexture = function (a, b, c, d, e, f, g, h, i, j) {
  THREE.Texture.call(this, null, f, g, h, i, j, d, e);
  this.image = {
    width: b,
    height: c,
  };
  this.mipmaps = a;
};
THREE.CompressedTexture.prototype = Object.create(THREE.Texture.prototype);
THREE.CompressedTexture.prototype.clone = function () {
  var a = new THREE.CompressedTexture();
  a.image = this.image;
  a.mipmaps = this.mipmaps;
  a.format = this.format;
  a.type = this.type;
  a.mapping = this.mapping;
  a.wrapS = this.wrapS;
  a.wrapT = this.wrapT;
  a.magFilter = this.magFilter;
  a.minFilter = this.minFilter;
  a.anisotropy = this.anisotropy;
  a.offset.copy(this.offset);
  a.repeat.copy(this.repeat);
  return a;
};
THREE.DataTexture = function (a, b, c, d, e, f, g, h, i, j) {
  THREE.Texture.call(this, null, f, g, h, i, j, d, e);
  this.image = {
    data: a,
    width: b,
    height: c,
  };
};
THREE.DataTexture.prototype = Object.create(THREE.Texture.prototype);
THREE.DataTexture.prototype.clone = function () {
  var a = new THREE.DataTexture(
    this.image.data,
    this.image.width,
    this.image.height,
    this.format,
    this.type,
    this.mapping,
    this.wrapS,
    this.wrapT,
    this.magFilter,
    this.minFilter
  );
  a.offset.copy(this.offset);
  a.repeat.copy(this.repeat);
  return a;
};
THREE.Particle = function (a) {
  THREE.Object3D.call(this);
  this.material = a;
};
THREE.Particle.prototype = Object.create(THREE.Object3D.prototype);
THREE.Particle.prototype.clone = function (a) {
  void 0 === a && (a = new THREE.Particle(this.material));
  THREE.Object3D.prototype.clone.call(this, a);
  return a;
};
THREE.ParticleSystem = function (a, b) {
  THREE.Object3D.call(this);
  this.geometry = a;
  this.material =
    void 0 !== b
      ? b
      : new THREE.ParticleBasicMaterial({
          color: 16777215 * Math.random(),
        });
  this.sortParticles = !1;
  this.geometry &&
    (null === this.geometry.boundingSphere &&
      this.geometry.computeBoundingSphere(),
    (this.boundRadius = a.boundingSphere.radius));
  this.frustumCulled = !1;
};
THREE.ParticleSystem.prototype = Object.create(THREE.Object3D.prototype);
THREE.ParticleSystem.prototype.clone = function (a) {
  void 0 === a && (a = new THREE.ParticleSystem(this.geometry, this.material));
  a.sortParticles = this.sortParticles;
  THREE.Object3D.prototype.clone.call(this, a);
  return a;
};
THREE.Line = function (a, b, c) {
  THREE.Object3D.call(this);
  this.geometry = a;
  this.material =
    void 0 !== b
      ? b
      : new THREE.LineBasicMaterial({
          color: 16777215 * Math.random(),
        });
  this.type = void 0 !== c ? c : THREE.LineStrip;
  this.geometry &&
    (this.geometry.boundingSphere || this.geometry.computeBoundingSphere());
};
THREE.LineStrip = 0;
THREE.LinePieces = 1;
THREE.Line.prototype = Object.create(THREE.Object3D.prototype);
THREE.Line.prototype.clone = function (a) {
  void 0 === a && (a = new THREE.Line(this.geometry, this.material, this.type));
  THREE.Object3D.prototype.clone.call(this, a);
  return a;
};
THREE.Mesh = function (a, b) {
  THREE.Object3D.call(this);
  this.geometry = a;
  this.material =
    void 0 !== b
      ? b
      : new THREE.MeshBasicMaterial({
          color: 16777215 * Math.random(),
          wireframe: !0,
        });
  if (
    this.geometry &&
    (null === this.geometry.boundingSphere &&
      this.geometry.computeBoundingSphere(),
    (this.boundRadius = a.boundingSphere.radius),
    this.geometry.morphTargets.length)
  ) {
    this.morphTargetBase = -1;
    this.morphTargetForcedOrder = [];
    this.morphTargetInfluences = [];
    this.morphTargetDictionary = {};
    for (var c = 0; c < this.geometry.morphTargets.length; c++)
      this.morphTargetInfluences.push(0),
        (this.morphTargetDictionary[this.geometry.morphTargets[c].name] = c);
  }
};
THREE.Mesh.prototype = Object.create(THREE.Object3D.prototype);
THREE.Mesh.prototype.getMorphTargetIndexByName = function (a) {
  if (void 0 !== this.morphTargetDictionary[a])
    return this.morphTargetDictionary[a];
  console.log(
    "THREE.Mesh.getMorphTargetIndexByName: morph target " +
      a +
      " does not exist. Returning 0."
  );
  return 0;
};
THREE.Mesh.prototype.clone = function (a) {
  void 0 === a && (a = new THREE.Mesh(this.geometry, this.material));
  THREE.Object3D.prototype.clone.call(this, a);
  return a;
};
THREE.Bone = function (a) {
  THREE.Object3D.call(this);
  this.skin = a;
  this.skinMatrix = new THREE.Matrix4();
};
THREE.Bone.prototype = Object.create(THREE.Object3D.prototype);
THREE.Bone.prototype.update = function (a, b) {
  this.matrixAutoUpdate && (b |= this.updateMatrix());
  if (b || this.matrixWorldNeedsUpdate)
    a
      ? this.skinMatrix.multiply(a, this.matrix)
      : this.skinMatrix.copy(this.matrix),
      (this.matrixWorldNeedsUpdate = !1),
      (b = !0);
  var c,
    d = this.children.length;
  for (c = 0; c < d; c++) this.children[c].update(this.skinMatrix, b);
};
THREE.SkinnedMesh = function (a, b, c) {
  THREE.Mesh.call(this, a, b);
  this.useVertexTexture = void 0 !== c ? c : !0;
  this.identityMatrix = new THREE.Matrix4();
  this.bones = [];
  this.boneMatrices = [];
  var d, e, f;
  if (this.geometry && void 0 !== this.geometry.bones) {
    for (a = 0; a < this.geometry.bones.length; a++)
      (c = this.geometry.bones[a]),
        (d = c.pos),
        (e = c.rotq),
        (f = c.scl),
        (b = this.addBone()),
        (b.name = c.name),
        b.position.set(d[0], d[1], d[2]),
        b.quaternion.set(e[0], e[1], e[2], e[3]),
        (b.useQuaternion = !0),
        void 0 !== f ? b.scale.set(f[0], f[1], f[2]) : b.scale.set(1, 1, 1);
    for (a = 0; a < this.bones.length; a++)
      (c = this.geometry.bones[a]),
        (b = this.bones[a]),
        -1 === c.parent ? this.add(b) : this.bones[c.parent].add(b);
    a = this.bones.length;
    this.useVertexTexture
      ? ((this.boneTextureHeight =
          this.boneTextureWidth =
          a =
            256 < a ? 64 : 64 < a ? 32 : 16 < a ? 16 : 8),
        (this.boneMatrices = new Float32Array(
          4 * this.boneTextureWidth * this.boneTextureHeight
        )),
        (this.boneTexture = new THREE.DataTexture(
          this.boneMatrices,
          this.boneTextureWidth,
          this.boneTextureHeight,
          THREE.RGBAFormat,
          THREE.FloatType
        )),
        (this.boneTexture.minFilter = THREE.NearestFilter),
        (this.boneTexture.magFilter = THREE.NearestFilter),
        (this.boneTexture.generateMipmaps = !1),
        (this.boneTexture.flipY = !1))
      : (this.boneMatrices = new Float32Array(16 * a));
    this.pose();
  }
};
THREE.SkinnedMesh.prototype = Object.create(THREE.Mesh.prototype);
THREE.SkinnedMesh.prototype.addBone = function (a) {
  void 0 === a && (a = new THREE.Bone(this));
  this.bones.push(a);
  return a;
};
THREE.SkinnedMesh.prototype.updateMatrixWorld = function (a) {
  this.matrixAutoUpdate && this.updateMatrix();
  if (this.matrixWorldNeedsUpdate || a)
    this.parent
      ? this.matrixWorld.multiply(this.parent.matrixWorld, this.matrix)
      : this.matrixWorld.copy(this.matrix),
      (this.matrixWorldNeedsUpdate = !1);
  for (var a = 0, b = this.children.length; a < b; a++) {
    var c = this.children[a];
    c instanceof THREE.Bone
      ? c.update(this.identityMatrix, !1)
      : c.updateMatrixWorld(!0);
  }
  if (void 0 == this.boneInverses) {
    this.boneInverses = [];
    a = 0;
    for (b = this.bones.length; a < b; a++)
      (c = new THREE.Matrix4()),
        c.getInverse(this.bones[a].skinMatrix),
        this.boneInverses.push(c);
  }
  a = 0;
  for (b = this.bones.length; a < b; a++)
    THREE.SkinnedMesh.offsetMatrix.multiply(
      this.bones[a].skinMatrix,
      this.boneInverses[a]
    ),
      THREE.SkinnedMesh.offsetMatrix.flattenToArrayOffset(
        this.boneMatrices,
        16 * a
      );
  this.useVertexTexture && (this.boneTexture.needsUpdate = !0);
};
THREE.SkinnedMesh.prototype.pose = function () {
  this.updateMatrixWorld(!0);
  for (var a = 0; a < this.geometry.skinIndices.length; a++) {
    var b = this.geometry.skinWeights[a],
      c = 1 / b.lengthManhattan();
    Infinity !== c ? b.multiplyScalar(c) : b.set(1);
  }
};
THREE.SkinnedMesh.prototype.clone = function (a) {
  void 0 === a &&
    (a = new THREE.SkinnedMesh(
      this.geometry,
      this.material,
      this.useVertexTexture
    ));
  THREE.Mesh.prototype.clone.call(this, a);
  return a;
};
THREE.SkinnedMesh.offsetMatrix = new THREE.Matrix4();
THREE.MorphAnimMesh = function (a, b) {
  THREE.Mesh.call(this, a, b);
  this.duration = 1e3;
  this.mirroredLoop = !1;
  this.currentKeyframe = this.lastKeyframe = this.time = 0;
  this.direction = 1;
  this.directionBackwards = !1;
  this.setFrameRange(0, this.geometry.morphTargets.length - 1);
};
THREE.MorphAnimMesh.prototype = Object.create(THREE.Mesh.prototype);
THREE.MorphAnimMesh.prototype.setFrameRange = function (a, b) {
  this.startKeyframe = a;
  this.endKeyframe = b;
  this.length = this.endKeyframe - this.startKeyframe + 1;
};
THREE.MorphAnimMesh.prototype.setDirectionForward = function () {
  this.direction = 1;
  this.directionBackwards = !1;
};
THREE.MorphAnimMesh.prototype.setDirectionBackward = function () {
  this.direction = -1;
  this.directionBackwards = !0;
};
THREE.MorphAnimMesh.prototype.parseAnimations = function () {
  var a = this.geometry;
  a.animations || (a.animations = {});
  for (
    var b,
      c = a.animations,
      d = /([a-z]+)(\d+)/,
      e = 0,
      f = a.morphTargets.length;
    e < f;
    e++
  ) {
    var g = a.morphTargets[e].name.match(d);
    if (g && 1 < g.length) {
      g = g[1];
      c[g] ||
        (c[g] = {
          start: Infinity,
          end: -Infinity,
        });
      var h = c[g];
      e < h.start && (h.start = e);
      e > h.end && (h.end = e);
      b || (b = g);
    }
  }
  a.firstAnimation = b;
};
THREE.MorphAnimMesh.prototype.setAnimationLabel = function (a, b, c) {
  this.geometry.animations || (this.geometry.animations = {});
  this.geometry.animations[a] = {
    start: b,
    end: c,
  };
};
THREE.MorphAnimMesh.prototype.playAnimation = function (a, b) {
  var c = this.geometry.animations[a];
  c
    ? (this.setFrameRange(c.start, c.end),
      (this.duration = 1e3 * ((c.end - c.start) / b)),
      (this.time = 0))
    : console.warn("animation[" + a + "] undefined");
};
THREE.MorphAnimMesh.prototype.updateAnimation = function (a) {
  var b = this.duration / this.length;
  this.time += this.direction * a;
  if (this.mirroredLoop) {
    if (this.time > this.duration || 0 > this.time)
      if (
        ((this.direction *= -1),
        this.time > this.duration &&
          ((this.time = this.duration), (this.directionBackwards = !0)),
        0 > this.time)
      )
        (this.time = 0), (this.directionBackwards = !1);
  } else
    (this.time %= this.duration), 0 > this.time && (this.time += this.duration);
  a =
    this.startKeyframe +
    THREE.Math.clamp(Math.floor(this.time / b), 0, this.length - 1);
  a !== this.currentKeyframe &&
    ((this.morphTargetInfluences[this.lastKeyframe] = 0),
    (this.morphTargetInfluences[this.currentKeyframe] = 1),
    (this.morphTargetInfluences[a] = 0),
    (this.lastKeyframe = this.currentKeyframe),
    (this.currentKeyframe = a));
  b = (this.time % b) / b;
  this.directionBackwards && (b = 1 - b);
  this.morphTargetInfluences[this.currentKeyframe] = b;
  this.morphTargetInfluences[this.lastKeyframe] = 1 - b;
};
THREE.MorphAnimMesh.prototype.clone = function (a) {
  void 0 === a && (a = new THREE.MorphAnimMesh(this.geometry, this.material));
  a.duration = this.duration;
  a.mirroredLoop = this.mirroredLoop;
  a.time = this.time;
  a.lastKeyframe = this.lastKeyframe;
  a.currentKeyframe = this.currentKeyframe;
  a.direction = this.direction;
  a.directionBackwards = this.directionBackwards;
  THREE.Mesh.prototype.clone.call(this, a);
  return a;
};
THREE.Ribbon = function (a, b) {
  THREE.Object3D.call(this);
  this.geometry = a;
  this.material = b;
};
THREE.Ribbon.prototype = Object.create(THREE.Object3D.prototype);
THREE.Ribbon.prototype.clone = function (a) {
  void 0 === a && (a = new THREE.Ribbon(this.geometry, this.material));
  THREE.Object3D.prototype.clone.call(this, a);
  return a;
};
THREE.LOD = function () {
  THREE.Object3D.call(this);
  this.LODs = [];
};
THREE.LOD.prototype = Object.create(THREE.Object3D.prototype);
THREE.LOD.prototype.addLevel = function (a, b) {
  void 0 === b && (b = 0);
  for (
    var b = Math.abs(b), c = 0;
    c < this.LODs.length && !(b < this.LODs[c].visibleAtDistance);
    c++
  );
  this.LODs.splice(c, 0, {
    visibleAtDistance: b,
    object3D: a,
  });
  this.add(a);
};
THREE.LOD.prototype.update = function (a) {
  if (1 < this.LODs.length) {
    a.matrixWorldInverse.getInverse(a.matrixWorld);
    a = a.matrixWorldInverse;
    a = -(
      a.elements[2] * this.matrixWorld.elements[12] +
      a.elements[6] * this.matrixWorld.elements[13] +
      a.elements[10] * this.matrixWorld.elements[14] +
      a.elements[14]
    );
    this.LODs[0].object3D.visible = !0;
    for (var b = 1; b < this.LODs.length; b++)
      if (a >= this.LODs[b].visibleAtDistance)
        (this.LODs[b - 1].object3D.visible = !1),
          (this.LODs[b].object3D.visible = !0);
      else break;
    for (; b < this.LODs.length; b++) this.LODs[b].object3D.visible = !1;
  }
};
THREE.LOD.prototype.clone = function () {};
THREE.Sprite = function (a) {
  THREE.Object3D.call(this);
  a = a || {};
  this.color =
    void 0 !== a.color ? new THREE.Color(a.color) : new THREE.Color(16777215);
  this.map = void 0 !== a.map ? a.map : new THREE.Texture();
  this.blending = void 0 !== a.blending ? a.blending : THREE.NormalBlending;
  this.blendSrc = void 0 !== a.blendSrc ? a.blendSrc : THREE.SrcAlphaFactor;
  this.blendDst =
    void 0 !== a.blendDst ? a.blendDst : THREE.OneMinusSrcAlphaFactor;
  this.blendEquation =
    void 0 !== a.blendEquation ? a.blendEquation : THREE.AddEquation;
  this.useScreenCoordinates =
    void 0 !== a.useScreenCoordinates ? a.useScreenCoordinates : !0;
  this.mergeWith3D =
    void 0 !== a.mergeWith3D ? a.mergeWith3D : !this.useScreenCoordinates;
  this.affectedByDistance =
    void 0 !== a.affectedByDistance
      ? a.affectedByDistance
      : !this.useScreenCoordinates;
  this.scaleByViewport =
    void 0 !== a.scaleByViewport ? a.scaleByViewport : !this.affectedByDistance;
  this.alignment =
    a.alignment instanceof THREE.Vector2
      ? a.alignment
      : THREE.SpriteAlignment.center.clone();
  this.fog = void 0 !== a.fog ? a.fog : !1;
  this.rotation3d = this.rotation;
  this.rotation = 0;
  this.opacity = 1;
  this.uvOffset = new THREE.Vector2(0, 0);
  this.uvScale = new THREE.Vector2(1, 1);
};
THREE.Sprite.prototype = Object.create(THREE.Object3D.prototype);
THREE.Sprite.prototype.updateMatrix = function () {
  this.matrix.setPosition(this.position);
  this.rotation3d.set(0, 0, this.rotation);
  this.matrix.setRotationFromEuler(this.rotation3d);
  if (1 !== this.scale.x || 1 !== this.scale.y)
    this.matrix.scale(this.scale),
      (this.boundRadiusScale = Math.max(this.scale.x, this.scale.y));
  this.matrixWorldNeedsUpdate = !0;
};
THREE.Sprite.prototype.clone = function (a) {
  void 0 === a && (a = new THREE.Sprite({}));
  a.color.copy(this.color);
  a.map = this.map;
  a.blending = this.blending;
  a.useScreenCoordinates = this.useScreenCoordinates;
  a.mergeWith3D = this.mergeWith3D;
  a.affectedByDistance = this.affectedByDistance;
  a.scaleByViewport = this.scaleByViewport;
  a.alignment = this.alignment;
  a.fog = this.fog;
  a.rotation3d.copy(this.rotation3d);
  a.rotation = this.rotation;
  a.opacity = this.opacity;
  a.uvOffset.copy(this.uvOffset);
  a.uvScale.copy(this.uvScale);
  THREE.Object3D.prototype.clone.call(this, a);
  return a;
};
THREE.SpriteAlignment = {};
THREE.SpriteAlignment.topLeft = new THREE.Vector2(1, -1);
THREE.SpriteAlignment.topCenter = new THREE.Vector2(0, -1);
THREE.SpriteAlignment.topRight = new THREE.Vector2(-1, -1);
THREE.SpriteAlignment.centerLeft = new THREE.Vector2(1, 0);
THREE.SpriteAlignment.center = new THREE.Vector2(0, 0);
THREE.SpriteAlignment.centerRight = new THREE.Vector2(-1, 0);
THREE.SpriteAlignment.bottomLeft = new THREE.Vector2(1, 1);
THREE.SpriteAlignment.bottomCenter = new THREE.Vector2(0, 1);
THREE.SpriteAlignment.bottomRight = new THREE.Vector2(-1, 1);
THREE.Scene = function () {
  THREE.Object3D.call(this);
  this.overrideMaterial = this.fog = null;
  this.matrixAutoUpdate = !1;
  this.__objects = [];
  this.__lights = [];
  this.__objectsAdded = [];
  this.__objectsRemoved = [];
};
THREE.Scene.prototype = Object.create(THREE.Object3D.prototype);
THREE.Scene.prototype.__addObject = function (a) {
  if (a instanceof THREE.Light)
    -1 === this.__lights.indexOf(a) && this.__lights.push(a),
      a.target && void 0 === a.target.parent && this.add(a.target);
  else if (
    !(a instanceof THREE.Camera || a instanceof THREE.Bone) &&
    -1 === this.__objects.indexOf(a)
  ) {
    this.__objects.push(a);
    this.__objectsAdded.push(a);
    var b = this.__objectsRemoved.indexOf(a);
    -1 !== b && this.__objectsRemoved.splice(b, 1);
  }
  for (b = 0; b < a.children.length; b++) this.__addObject(a.children[b]);
};
THREE.Scene.prototype.__removeObject = function (a) {
  if (a instanceof THREE.Light) {
    var b = this.__lights.indexOf(a);
    -1 !== b && this.__lights.splice(b, 1);
  } else
    a instanceof THREE.Camera ||
      ((b = this.__objects.indexOf(a)),
      -1 !== b &&
        (this.__objects.splice(b, 1),
        this.__objectsRemoved.push(a),
        (b = this.__objectsAdded.indexOf(a)),
        -1 !== b && this.__objectsAdded.splice(b, 1)));
  for (b = 0; b < a.children.length; b++) this.__removeObject(a.children[b]);
};
THREE.Fog = function (a, b, c) {
  this.name = "";
  this.color = new THREE.Color(a);
  this.near = void 0 !== b ? b : 1;
  this.far = void 0 !== c ? c : 1e3;
};
THREE.Fog.prototype.clone = function () {
  return new THREE.Fog(this.color.getHex(), this.near, this.far);
};
THREE.FogExp2 = function (a, b) {
  this.name = "";
  this.color = new THREE.Color(a);
  this.density = void 0 !== b ? b : 2.5e-4;
};
THREE.FogExp2.prototype.clone = function () {
  return new THREE.FogExp2(this.color.getHex(), this.density);
};
THREE.CanvasRenderer = function (a) {
  function b(a) {
    z !== a && (z = s.globalAlpha = a);
  }
  function c(a) {
    w !== a &&
      (a === THREE.NormalBlending
        ? (s.globalCompositeOperation = "source-over")
        : a === THREE.AdditiveBlending
        ? (s.globalCompositeOperation = "lighter")
        : a === THREE.SubtractiveBlending &&
          (s.globalCompositeOperation = "darker"),
      (w = a));
  }
  function d(a) {
    q !== a && (q = s.strokeStyle = a);
  }
  function e(a) {
    E !== a && (E = s.fillStyle = a);
  }
  console.log("THREE.CanvasRenderer", THREE.REVISION);
  var a = a || {},
    f = this,
    g,
    h,
    i,
    j = new THREE.Projector(),
    l = void 0 !== a.canvas ? a.canvas : document.createElement("canvas"),
    m,
    n,
    p,
    o,
    s = l.getContext("2d"),
    t = new THREE.Color(0),
    r = 0,
    z = 1,
    w = 0,
    q = null,
    E = null,
    A = null,
    v = null,
    u = null,
    D,
    C,
    G,
    P,
    B = new THREE.RenderableVertex(),
    K = new THREE.RenderableVertex(),
    H,
    I,
    N,
    O,
    R,
    ga,
    M,
    J,
    Q,
    Z,
    L,
    oa,
    X = new THREE.Color(),
    fa = new THREE.Color(),
    ca = new THREE.Color(),
    Y = new THREE.Color(),
    ba = new THREE.Color(),
    aa = new THREE.Color(),
    ia = new THREE.Color(),
    Aa = {},
    Na = {},
    Ja,
    ma,
    sa,
    Ea,
    rb,
    ib,
    ob,
    jb,
    Bb,
    Cb,
    Wa = new THREE.Rectangle(),
    Sa = new THREE.Rectangle(),
    Ka = new THREE.Rectangle(),
    kb = !1,
    Oa = new THREE.Color(),
    lb = new THREE.Color(),
    ab = new THREE.Color(),
    va = new THREE.Vector3(),
    eb,
    pb,
    bb,
    xa,
    mb,
    sb,
    a = 16;
  eb = document.createElement("canvas");
  eb.width = eb.height = 2;
  pb = eb.getContext("2d");
  pb.fillStyle = "rgba(0,0,0,1)";
  pb.fillRect(0, 0, 2, 2);
  bb = pb.getImageData(0, 0, 2, 2);
  xa = bb.data;
  mb = document.createElement("canvas");
  mb.width = mb.height = a;
  sb = mb.getContext("2d");
  sb.translate(-a / 2, -a / 2);
  sb.scale(a, a);
  a--;
  this.domElement = l;
  this.sortElements = this.sortObjects = this.autoClear = !0;
  this.info = {
    render: {
      vertices: 0,
      faces: 0,
    },
  };
  this.setSize = function (a, b) {
    m = a;
    n = b;
    p = Math.floor(m / 2);
    o = Math.floor(n / 2);
    l.width = m;
    l.height = n;
    Wa.set(-p, -o, p, o);
    Sa.set(-p, -o, p, o);
    z = 1;
    w = 0;
    u = v = A = E = q = null;
  };
  this.setClearColor = function (a, b) {
    t.copy(a);
    r = void 0 !== b ? b : 1;
    Sa.set(-p, -o, p, o);
  };
  this.setClearColorHex = function (a, b) {
    t.setHex(a);
    r = void 0 !== b ? b : 1;
    Sa.set(-p, -o, p, o);
  };
  this.getMaxAnisotropy = function () {
    return 0;
  };
  this.clear = function () {
    s.setTransform(1, 0, 0, -1, p, o);
    !1 === Sa.isEmpty() &&
      (Sa.minSelf(Wa),
      Sa.inflate(2),
      1 > r &&
        s.clearRect(
          Math.floor(Sa.getX()),
          Math.floor(Sa.getY()),
          Math.floor(Sa.getWidth()),
          Math.floor(Sa.getHeight())
        ),
      0 < r &&
        (c(THREE.NormalBlending),
        b(1),
        e(
          "rgba(" +
            Math.floor(255 * t.r) +
            "," +
            Math.floor(255 * t.g) +
            "," +
            Math.floor(255 * t.b) +
            "," +
            r +
            ")"
        ),
        s.fillRect(
          Math.floor(Sa.getX()),
          Math.floor(Sa.getY()),
          Math.floor(Sa.getWidth()),
          Math.floor(Sa.getHeight())
        )),
      Sa.empty());
  };
  this.render = function (a, l) {
    function n(a, b, c) {
      for (var d = 0, e = i.length; d < e; d++) {
        var f = i[d],
          g = f.color;
        if (f instanceof THREE.DirectionalLight) {
          var h = f.matrixWorld.getPosition().normalize(),
            k = b.dot(h);
          0 >= k ||
            ((k *= f.intensity),
            (c.r += g.r * k),
            (c.g += g.g * k),
            (c.b += g.b * k));
        } else
          f instanceof THREE.PointLight &&
            ((h = f.matrixWorld.getPosition()),
            (k = b.dot(va.sub(h, a).normalize())),
            0 >= k ||
              ((k *=
                0 == f.distance
                  ? 1
                  : 1 - Math.min(a.distanceTo(h) / f.distance, 1)),
              0 != k &&
                ((k *= f.intensity),
                (c.r += g.r * k),
                (c.g += g.g * k),
                (c.b += g.b * k))));
      }
    }
    function m(a, d, e, g, h, k, i, j) {
      f.info.render.vertices += 3;
      f.info.render.faces++;
      b(j.opacity);
      c(j.blending);
      H = a.positionScreen.x;
      I = a.positionScreen.y;
      N = d.positionScreen.x;
      O = d.positionScreen.y;
      R = e.positionScreen.x;
      ga = e.positionScreen.y;
      r(H, I, N, O, R, ga);
      (j instanceof THREE.MeshLambertMaterial ||
        j instanceof THREE.MeshPhongMaterial) &&
      null === j.map &&
      null === j.map
        ? (aa.copy(j.color),
          ia.copy(j.emissive),
          j.vertexColors === THREE.FaceColors &&
            ((aa.r *= i.color.r), (aa.g *= i.color.g), (aa.b *= i.color.b)),
          !0 === kb)
          ? !1 === j.wireframe &&
            j.shading == THREE.SmoothShading &&
            3 == i.vertexNormalsLength
            ? ((fa.r = ca.r = Y.r = Oa.r),
              (fa.g = ca.g = Y.g = Oa.g),
              (fa.b = ca.b = Y.b = Oa.b),
              n(i.v1.positionWorld, i.vertexNormalsWorld[0], fa),
              n(i.v2.positionWorld, i.vertexNormalsWorld[1], ca),
              n(i.v3.positionWorld, i.vertexNormalsWorld[2], Y),
              (fa.r = fa.r * aa.r + ia.r),
              (fa.g = fa.g * aa.g + ia.g),
              (fa.b = fa.b * aa.b + ia.b),
              (ca.r = ca.r * aa.r + ia.r),
              (ca.g = ca.g * aa.g + ia.g),
              (ca.b = ca.b * aa.b + ia.b),
              (Y.r = Y.r * aa.r + ia.r),
              (Y.g = Y.g * aa.g + ia.g),
              (Y.b = Y.b * aa.b + ia.b),
              (ba.r = 0.5 * (ca.r + Y.r)),
              (ba.g = 0.5 * (ca.g + Y.g)),
              (ba.b = 0.5 * (ca.b + Y.b)),
              (sa = yc(fa, ca, Y, ba)),
              na(H, I, N, O, R, ga, 0, 0, 1, 0, 0, 1, sa))
            : ((X.r = Oa.r),
              (X.g = Oa.g),
              (X.b = Oa.b),
              n(i.centroidWorld, i.normalWorld, X),
              (X.r = X.r * aa.r + ia.r),
              (X.g = X.g * aa.g + ia.g),
              (X.b = X.b * aa.b + ia.b),
              !0 === j.wireframe
                ? t(
                    X,
                    j.wireframeLinewidth,
                    j.wireframeLinecap,
                    j.wireframeLinejoin
                  )
                : w(X))
          : !0 === j.wireframe
          ? t(
              j.color,
              j.wireframeLinewidth,
              j.wireframeLinecap,
              j.wireframeLinejoin
            )
          : w(j.color)
        : j instanceof THREE.MeshBasicMaterial ||
          j instanceof THREE.MeshLambertMaterial ||
          j instanceof THREE.MeshPhongMaterial
        ? null !== j.map
          ? j.map.mapping instanceof THREE.UVMapping &&
            ((Ea = i.uvs[0]),
            z(
              H,
              I,
              N,
              O,
              R,
              ga,
              Ea[g].u,
              Ea[g].v,
              Ea[h].u,
              Ea[h].v,
              Ea[k].u,
              Ea[k].v,
              j.map
            ))
          : null !== j.envMap
          ? j.envMap.mapping instanceof THREE.SphericalReflectionMapping &&
            ((a = l.matrixWorldInverse),
            va.copy(i.vertexNormalsWorld[g]),
            (rb =
              0.5 *
                (va.x * a.elements[0] +
                  va.y * a.elements[4] +
                  va.z * a.elements[8]) +
              0.5),
            (ib =
              0.5 *
                (va.x * a.elements[1] +
                  va.y * a.elements[5] +
                  va.z * a.elements[9]) +
              0.5),
            va.copy(i.vertexNormalsWorld[h]),
            (ob =
              0.5 *
                (va.x * a.elements[0] +
                  va.y * a.elements[4] +
                  va.z * a.elements[8]) +
              0.5),
            (jb =
              0.5 *
                (va.x * a.elements[1] +
                  va.y * a.elements[5] +
                  va.z * a.elements[9]) +
              0.5),
            va.copy(i.vertexNormalsWorld[k]),
            (Bb =
              0.5 *
                (va.x * a.elements[0] +
                  va.y * a.elements[4] +
                  va.z * a.elements[8]) +
              0.5),
            (Cb =
              0.5 *
                (va.x * a.elements[1] +
                  va.y * a.elements[5] +
                  va.z * a.elements[9]) +
              0.5),
            z(H, I, N, O, R, ga, rb, ib, ob, jb, Bb, Cb, j.envMap))
          : (X.copy(j.color),
            j.vertexColors === THREE.FaceColors &&
              ((X.r *= i.color.r), (X.g *= i.color.g), (X.b *= i.color.b)),
            !0 === j.wireframe
              ? t(
                  X,
                  j.wireframeLinewidth,
                  j.wireframeLinecap,
                  j.wireframeLinejoin
                )
              : w(X))
        : j instanceof THREE.MeshDepthMaterial
        ? ((Ja = l.near),
          (ma = l.far),
          (fa.r = fa.g = fa.b = 1 - Db(a.positionScreen.z, Ja, ma)),
          (ca.r = ca.g = ca.b = 1 - Db(d.positionScreen.z, Ja, ma)),
          (Y.r = Y.g = Y.b = 1 - Db(e.positionScreen.z, Ja, ma)),
          (ba.r = 0.5 * (ca.r + Y.r)),
          (ba.g = 0.5 * (ca.g + Y.g)),
          (ba.b = 0.5 * (ca.b + Y.b)),
          (sa = yc(fa, ca, Y, ba)),
          na(H, I, N, O, R, ga, 0, 0, 1, 0, 0, 1, sa))
        : j instanceof THREE.MeshNormalMaterial &&
          ((X.r = ic(i.normalWorld.x)),
          (X.g = ic(i.normalWorld.y)),
          (X.b = ic(i.normalWorld.z)),
          !0 === j.wireframe
            ? t(
                X,
                j.wireframeLinewidth,
                j.wireframeLinecap,
                j.wireframeLinejoin
              )
            : w(X));
    }
    function r(a, b, c, d, e, f) {
      s.beginPath();
      s.moveTo(a, b);
      s.lineTo(c, d);
      s.lineTo(e, f);
      s.closePath();
    }
    function q(a, b, c, d, e, f, g, h) {
      s.beginPath();
      s.moveTo(a, b);
      s.lineTo(c, d);
      s.lineTo(e, f);
      s.lineTo(g, h);
      s.closePath();
    }
    function t(a, b, c, e) {
      A !== b && (A = s.lineWidth = b);
      v !== c && (v = s.lineCap = c);
      u !== e && (u = s.lineJoin = e);
      d(a.getContextStyle());
      s.stroke();
      Ka.inflate(2 * b);
    }
    function w(a) {
      e(a.getContextStyle());
      s.fill();
    }
    function z(a, b, c, d, f, g, h, k, i, j, l, n, na) {
      if (
        !(
          na instanceof THREE.DataTexture ||
          void 0 === na.image ||
          0 == na.image.width
        )
      ) {
        if (!0 === na.needsUpdate) {
          var m = na.wrapS == THREE.RepeatWrapping,
            o = na.wrapT == THREE.RepeatWrapping;
          Aa[na.id] = s.createPattern(
            na.image,
            !0 === m && !0 === o
              ? "repeat"
              : !0 === m && !1 === o
              ? "repeat-x"
              : !1 === m && !0 === o
              ? "repeat-y"
              : "no-repeat"
          );
          na.needsUpdate = !1;
        }
        void 0 === Aa[na.id] ? e("rgba(0,0,0,1)") : e(Aa[na.id]);
        var m = na.offset.x / na.repeat.x,
          o = na.offset.y / na.repeat.y,
          Db = na.image.width * na.repeat.x,
          p = na.image.height * na.repeat.y,
          h = (h + m) * Db,
          k = (1 - k + o) * p,
          c = c - a,
          d = d - b,
          f = f - a,
          g = g - b,
          i = (i + m) * Db - h,
          j = (1 - j + o) * p - k,
          l = (l + m) * Db - h,
          n = (1 - n + o) * p - k,
          m = i * n - l * j;
        0 === m
          ? (void 0 === Na[na.id] &&
              ((b = document.createElement("canvas")),
              (b.width = na.image.width),
              (b.height = na.image.height),
              (b = b.getContext("2d")),
              b.drawImage(na.image, 0, 0),
              (Na[na.id] = b.getImageData(
                0,
                0,
                na.image.width,
                na.image.height
              ).data)),
            (b = Na[na.id]),
            (h = 4 * (Math.floor(h) + Math.floor(k) * na.image.width)),
            X.setRGB(b[h] / 255, b[h + 1] / 255, b[h + 2] / 255),
            w(X))
          : ((m = 1 / m),
            (na = (n * c - j * f) * m),
            (j = (n * d - j * g) * m),
            (c = (i * f - l * c) * m),
            (d = (i * g - l * d) * m),
            (a = a - na * h - c * k),
            (h = b - j * h - d * k),
            s.save(),
            s.transform(na, j, c, d, a, h),
            s.fill(),
            s.restore());
      }
    }
    function na(a, b, c, d, e, f, g, h, k, i, j, l, na) {
      var n, m;
      n = na.width - 1;
      m = na.height - 1;
      g *= n;
      h *= m;
      c -= a;
      d -= b;
      e -= a;
      f -= b;
      k = k * n - g;
      i = i * m - h;
      j = j * n - g;
      l = l * m - h;
      m = 1 / (k * l - j * i);
      n = (l * c - i * e) * m;
      i = (l * d - i * f) * m;
      c = (k * e - j * c) * m;
      d = (k * f - j * d) * m;
      a = a - n * g - c * h;
      b = b - i * g - d * h;
      s.save();
      s.transform(n, i, c, d, a, b);
      s.clip();
      s.drawImage(na, 0, 0);
      s.restore();
    }
    function yc(a, b, c, d) {
      xa[0] = (255 * a.r) | 0;
      xa[1] = (255 * a.g) | 0;
      xa[2] = (255 * a.b) | 0;
      xa[4] = (255 * b.r) | 0;
      xa[5] = (255 * b.g) | 0;
      xa[6] = (255 * b.b) | 0;
      xa[8] = (255 * c.r) | 0;
      xa[9] = (255 * c.g) | 0;
      xa[10] = (255 * c.b) | 0;
      xa[12] = (255 * d.r) | 0;
      xa[13] = (255 * d.g) | 0;
      xa[14] = (255 * d.b) | 0;
      pb.putImageData(bb, 0, 0);
      sb.drawImage(eb, 0, 0);
      return mb;
    }
    function Db(a, b, c) {
      a = (a - b) / (c - b);
      return a * a * (3 - 2 * a);
    }
    function ic(a) {
      a = 0.5 * (a + 1);
      return 0 > a ? 0 : 1 < a ? 1 : a;
    }
    function Zb(a, b) {
      var c = b.x - a.x,
        d = b.y - a.y,
        e = c * c + d * d;
      0 !== e &&
        ((e = 1 / Math.sqrt(e)),
        (c *= e),
        (d *= e),
        (b.x += c),
        (b.y += d),
        (a.x -= c),
        (a.y -= d));
    }
    if (!1 === l instanceof THREE.Camera)
      console.error(
        "THREE.CanvasRenderer.render: camera is not an instance of THREE.Camera."
      );
    else {
      var $b, zc, ka, da;
      !0 === this.autoClear ? this.clear() : s.setTransform(1, 0, 0, -1, p, o);
      f.info.render.vertices = 0;
      f.info.render.faces = 0;
      g = j.projectScene(a, l, this.sortObjects, this.sortElements);
      h = g.elements;
      i = g.lights;
      kb = 0 < i.length;
      if (!0 === kb) {
        Oa.setRGB(0, 0, 0);
        lb.setRGB(0, 0, 0);
        ab.setRGB(0, 0, 0);
        $b = 0;
        for (zc = i.length; $b < zc; $b++) {
          da = i[$b];
          var la = da.color;
          da instanceof THREE.AmbientLight
            ? ((Oa.r += la.r), (Oa.g += la.g), (Oa.b += la.b))
            : da instanceof THREE.DirectionalLight
            ? ((lb.r += la.r), (lb.g += la.g), (lb.b += la.b))
            : da instanceof THREE.PointLight &&
              ((ab.r += la.r), (ab.g += la.g), (ab.b += la.b));
        }
      }
      $b = 0;
      for (zc = h.length; $b < zc; $b++)
        if (
          ((ka = h[$b]),
          (da = ka.material),
          !(void 0 === da || !1 === da.visible))
        ) {
          Ka.empty();
          if (ka instanceof THREE.RenderableParticle) {
            D = ka;
            D.x *= p;
            D.y *= o;
            var la = D,
              cb = ka;
            b(da.opacity);
            c(da.blending);
            var E = void 0,
              Ab = void 0,
              tb = void 0,
              ub = void 0,
              jc = (ka = void 0),
              Rc = void 0;
            da instanceof THREE.ParticleBasicMaterial
              ? null === da.map
                ? ((tb = cb.object.scale.x),
                  (ub = cb.object.scale.y),
                  (tb *= cb.scale.x * p),
                  (ub *= cb.scale.y * o),
                  Ka.set(la.x - tb, la.y - ub, la.x + tb, la.y + ub),
                  !1 !== Wa.intersects(Ka) &&
                    (e(da.color.getContextStyle()),
                    s.save(),
                    s.translate(la.x, la.y),
                    s.rotate(-cb.rotation),
                    s.scale(tb, ub),
                    s.fillRect(-1, -1, 2, 2),
                    s.restore()))
                : ((ka = da.map.image),
                  (jc = ka.width >> 1),
                  (Rc = ka.height >> 1),
                  (tb = cb.scale.x * p),
                  (ub = cb.scale.y * o),
                  (E = tb * jc),
                  (Ab = ub * Rc),
                  Ka.set(la.x - E, la.y - Ab, la.x + E, la.y + Ab),
                  !1 !== Wa.intersects(Ka) &&
                    (s.save(),
                    s.translate(la.x, la.y),
                    s.rotate(-cb.rotation),
                    s.scale(tb, -ub),
                    s.translate(-jc, -Rc),
                    s.drawImage(ka, 0, 0),
                    s.restore()))
              : da instanceof THREE.ParticleCanvasMaterial &&
                ((E = cb.scale.x * p),
                (Ab = cb.scale.y * o),
                Ka.set(la.x - E, la.y - Ab, la.x + E, la.y + Ab),
                !1 !== Wa.intersects(Ka) &&
                  (d(da.color.getContextStyle()),
                  e(da.color.getContextStyle()),
                  s.save(),
                  s.translate(la.x, la.y),
                  s.rotate(-cb.rotation),
                  s.scale(E, Ab),
                  da.program(s),
                  s.restore()));
          } else if (ka instanceof THREE.RenderableLine) {
            if (
              ((D = ka.v1),
              (C = ka.v2),
              (D.positionScreen.x *= p),
              (D.positionScreen.y *= o),
              (C.positionScreen.x *= p),
              (C.positionScreen.y *= o),
              Ka.addPoint(D.positionScreen.x, D.positionScreen.y),
              Ka.addPoint(C.positionScreen.x, C.positionScreen.y),
              !0 === Wa.intersects(Ka) &&
                ((la = D),
                (cb = C),
                b(da.opacity),
                c(da.blending),
                s.beginPath(),
                s.moveTo(la.positionScreen.x, la.positionScreen.y),
                s.lineTo(cb.positionScreen.x, cb.positionScreen.y),
                da instanceof THREE.LineBasicMaterial))
            )
              (la = da.linewidth),
                A !== la && (A = s.lineWidth = la),
                (la = da.linecap),
                v !== la && (v = s.lineCap = la),
                (la = da.linejoin),
                u !== la && (u = s.lineJoin = la),
                d(da.color.getContextStyle()),
                s.stroke(),
                Ka.inflate(2 * da.linewidth);
          } else if (ka instanceof THREE.RenderableFace3)
            (D = ka.v1),
              (C = ka.v2),
              (G = ka.v3),
              (D.positionScreen.x *= p),
              (D.positionScreen.y *= o),
              (C.positionScreen.x *= p),
              (C.positionScreen.y *= o),
              (G.positionScreen.x *= p),
              (G.positionScreen.y *= o),
              !0 === da.overdraw &&
                (Zb(D.positionScreen, C.positionScreen),
                Zb(C.positionScreen, G.positionScreen),
                Zb(G.positionScreen, D.positionScreen)),
              Ka.add3Points(
                D.positionScreen.x,
                D.positionScreen.y,
                C.positionScreen.x,
                C.positionScreen.y,
                G.positionScreen.x,
                G.positionScreen.y
              ),
              !0 === Wa.intersects(Ka) && m(D, C, G, 0, 1, 2, ka, da, a);
          else if (
            ka instanceof THREE.RenderableFace4 &&
            ((D = ka.v1),
            (C = ka.v2),
            (G = ka.v3),
            (P = ka.v4),
            (D.positionScreen.x *= p),
            (D.positionScreen.y *= o),
            (C.positionScreen.x *= p),
            (C.positionScreen.y *= o),
            (G.positionScreen.x *= p),
            (G.positionScreen.y *= o),
            (P.positionScreen.x *= p),
            (P.positionScreen.y *= o),
            B.positionScreen.copy(C.positionScreen),
            K.positionScreen.copy(P.positionScreen),
            !0 === da.overdraw &&
              (Zb(D.positionScreen, C.positionScreen),
              Zb(C.positionScreen, P.positionScreen),
              Zb(P.positionScreen, D.positionScreen),
              Zb(G.positionScreen, B.positionScreen),
              Zb(G.positionScreen, K.positionScreen)),
            Ka.addPoint(D.positionScreen.x, D.positionScreen.y),
            Ka.addPoint(C.positionScreen.x, C.positionScreen.y),
            Ka.addPoint(G.positionScreen.x, G.positionScreen.y),
            Ka.addPoint(P.positionScreen.x, P.positionScreen.y),
            !0 === Wa.intersects(Ka))
          )
            ((la = D),
            (cb = C),
            (E = G),
            (Ab = P),
            (tb = B),
            (ub = K),
            (jc = a),
            (f.info.render.vertices += 4),
            f.info.render.faces++,
            b(da.opacity),
            c(da.blending),
            (void 0 !== da.map && null !== da.map) ||
              (void 0 !== da.envMap && null !== da.envMap))
              ? (m(la, cb, Ab, 0, 1, 3, ka, da, jc),
                m(tb, E, ub, 1, 2, 3, ka, da, jc))
              : ((H = la.positionScreen.x),
                (I = la.positionScreen.y),
                (N = cb.positionScreen.x),
                (O = cb.positionScreen.y),
                (R = E.positionScreen.x),
                (ga = E.positionScreen.y),
                (M = Ab.positionScreen.x),
                (J = Ab.positionScreen.y),
                (Q = tb.positionScreen.x),
                (Z = tb.positionScreen.y),
                (L = ub.positionScreen.x),
                (oa = ub.positionScreen.y),
                da instanceof THREE.MeshLambertMaterial ||
                  da instanceof THREE.MeshPhongMaterial)
              ? (aa.copy(da.color),
                ia.copy(da.emissive),
                da.vertexColors === THREE.FaceColors &&
                  ((aa.r *= ka.color.r),
                  (aa.g *= ka.color.g),
                  (aa.b *= ka.color.b)),
                !0 === kb)
                ? !1 === da.wireframe &&
                  da.shading == THREE.SmoothShading &&
                  4 == ka.vertexNormalsLength
                  ? ((fa.r = ca.r = Y.r = ba.r = Oa.r),
                    (fa.g = ca.g = Y.g = ba.g = Oa.g),
                    (fa.b = ca.b = Y.b = ba.b = Oa.b),
                    n(ka.v1.positionWorld, ka.vertexNormalsWorld[0], fa),
                    n(ka.v2.positionWorld, ka.vertexNormalsWorld[1], ca),
                    n(ka.v4.positionWorld, ka.vertexNormalsWorld[3], Y),
                    n(ka.v3.positionWorld, ka.vertexNormalsWorld[2], ba),
                    (fa.r = fa.r * aa.r + ia.r),
                    (fa.g = fa.g * aa.g + ia.g),
                    (fa.b = fa.b * aa.b + ia.b),
                    (ca.r = ca.r * aa.r + ia.r),
                    (ca.g = ca.g * aa.g + ia.g),
                    (ca.b = ca.b * aa.b + ia.b),
                    (Y.r = Y.r * aa.r + ia.r),
                    (Y.g = Y.g * aa.g + ia.g),
                    (Y.b = Y.b * aa.b + ia.b),
                    (ba.r = ba.r * aa.r + ia.r),
                    (ba.g = ba.g * aa.g + ia.g),
                    (ba.b = ba.b * aa.b + ia.b),
                    (sa = yc(fa, ca, Y, ba)),
                    r(H, I, N, O, M, J),
                    na(H, I, N, O, M, J, 0, 0, 1, 0, 0, 1, sa),
                    r(Q, Z, R, ga, L, oa),
                    na(Q, Z, R, ga, L, oa, 1, 0, 1, 1, 0, 1, sa))
                  : ((X.r = Oa.r),
                    (X.g = Oa.g),
                    (X.b = Oa.b),
                    n(ka.centroidWorld, ka.normalWorld, X),
                    (X.r = X.r * aa.r + ia.r),
                    (X.g = X.g * aa.g + ia.g),
                    (X.b = X.b * aa.b + ia.b),
                    q(H, I, N, O, R, ga, M, J),
                    !0 === da.wireframe
                      ? t(
                          X,
                          da.wireframeLinewidth,
                          da.wireframeLinecap,
                          da.wireframeLinejoin
                        )
                      : w(X))
                : ((X.r = aa.r + ia.r),
                  (X.g = aa.g + ia.g),
                  (X.b = aa.b + ia.b),
                  q(H, I, N, O, R, ga, M, J),
                  !0 === da.wireframe
                    ? t(
                        X,
                        da.wireframeLinewidth,
                        da.wireframeLinecap,
                        da.wireframeLinejoin
                      )
                    : w(X))
              : da instanceof THREE.MeshBasicMaterial
              ? (X.copy(da.color),
                da.vertexColors === THREE.FaceColors &&
                  ((X.r *= ka.color.r),
                  (X.g *= ka.color.g),
                  (X.b *= ka.color.b)),
                q(H, I, N, O, R, ga, M, J),
                !0 === da.wireframe
                  ? t(
                      X,
                      da.wireframeLinewidth,
                      da.wireframeLinecap,
                      da.wireframeLinejoin
                    )
                  : w(X))
              : da instanceof THREE.MeshNormalMaterial
              ? ((X.r = ic(ka.normalWorld.x)),
                (X.g = ic(ka.normalWorld.y)),
                (X.b = ic(ka.normalWorld.z)),
                q(H, I, N, O, R, ga, M, J),
                !0 === da.wireframe
                  ? t(
                      X,
                      da.wireframeLinewidth,
                      da.wireframeLinecap,
                      da.wireframeLinejoin
                    )
                  : w(X))
              : da instanceof THREE.MeshDepthMaterial &&
                ((Ja = l.near),
                (ma = l.far),
                (fa.r = fa.g = fa.b = 1 - Db(la.positionScreen.z, Ja, ma)),
                (ca.r = ca.g = ca.b = 1 - Db(cb.positionScreen.z, Ja, ma)),
                (Y.r = Y.g = Y.b = 1 - Db(Ab.positionScreen.z, Ja, ma)),
                (ba.r = ba.g = ba.b = 1 - Db(E.positionScreen.z, Ja, ma)),
                (sa = yc(fa, ca, Y, ba)),
                r(H, I, N, O, M, J),
                na(H, I, N, O, M, J, 0, 0, 1, 0, 0, 1, sa),
                r(Q, Z, R, ga, L, oa),
                na(Q, Z, R, ga, L, oa, 1, 0, 1, 1, 0, 1, sa));
          Sa.addRectangle(Ka);
        }
      s.setTransform(1, 0, 0, 1, 0, 0);
    }
  };
};
THREE.ShaderChunk = {
  fog_pars_fragment:
    "#ifdef USE_FOG\nuniform vec3 fogColor;\n#ifdef FOG_EXP2\nuniform float fogDensity;\n#else\nuniform float fogNear;\nuniform float fogFar;\n#endif\n#endif",
  fog_fragment:
    "#ifdef USE_FOG\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\n#ifdef FOG_EXP2\nconst float LOG2 = 1.442695;\nfloat fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );\nfogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );\n#else\nfloat fogFactor = smoothstep( fogNear, fogFar, depth );\n#endif\ngl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n#endif",
  envmap_pars_fragment:
    "#ifdef USE_ENVMAP\nuniform float reflectivity;\nuniform samplerCube envMap;\nuniform float flipEnvMap;\nuniform int combine;\n#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )\nuniform bool useRefract;\nuniform float refractionRatio;\n#else\nvarying vec3 vReflect;\n#endif\n#endif",
  envmap_fragment:
    "#ifdef USE_ENVMAP\nvec3 reflectVec;\n#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )\nvec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );\nif ( useRefract ) {\nreflectVec = refract( cameraToVertex, normal, refractionRatio );\n} else { \nreflectVec = reflect( cameraToVertex, normal );\n}\n#else\nreflectVec = vReflect;\n#endif\n#ifdef DOUBLE_SIDED\nfloat flipNormal = ( -1.0 + 2.0 * float( gl_FrontFacing ) );\nvec4 cubeColor = textureCube( envMap, flipNormal * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n#else\nvec4 cubeColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n#endif\n#ifdef GAMMA_INPUT\ncubeColor.xyz *= cubeColor.xyz;\n#endif\nif ( combine == 1 ) {\ngl_FragColor.xyz = mix( gl_FragColor.xyz, cubeColor.xyz, specularStrength * reflectivity );\n} else if ( combine == 2 ) {\ngl_FragColor.xyz += cubeColor.xyz * specularStrength * reflectivity;\n} else {\ngl_FragColor.xyz = mix( gl_FragColor.xyz, gl_FragColor.xyz * cubeColor.xyz, specularStrength * reflectivity );\n}\n#endif",
  envmap_pars_vertex:
    "#if defined( USE_ENVMAP ) && ! defined( USE_BUMPMAP ) && ! defined( USE_NORMALMAP )\nvarying vec3 vReflect;\nuniform float refractionRatio;\nuniform bool useRefract;\n#endif",
  worldpos_vertex:
    "#if defined( USE_ENVMAP ) || defined( PHONG ) || defined( LAMBERT ) || defined ( USE_SHADOWMAP )\n#ifdef USE_SKINNING\nvec4 worldPosition = modelMatrix * skinned;\n#endif\n#if defined( USE_MORPHTARGETS ) && ! defined( USE_SKINNING )\nvec4 worldPosition = modelMatrix * vec4( morphed, 1.0 );\n#endif\n#if ! defined( USE_MORPHTARGETS ) && ! defined( USE_SKINNING )\nvec4 worldPosition = modelMatrix * vec4( position, 1.0 );\n#endif\n#endif",
  envmap_vertex:
    "#if defined( USE_ENVMAP ) && ! defined( USE_BUMPMAP ) && ! defined( USE_NORMALMAP )\nvec3 worldNormal = mat3( modelMatrix[ 0 ].xyz, modelMatrix[ 1 ].xyz, modelMatrix[ 2 ].xyz ) * objectNormal;\nworldNormal = normalize( worldNormal );\nvec3 cameraToVertex = normalize( worldPosition.xyz - cameraPosition );\nif ( useRefract ) {\nvReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n} else {\nvReflect = reflect( cameraToVertex, worldNormal );\n}\n#endif",
  map_particle_pars_fragment: "#ifdef USE_MAP\nuniform sampler2D map;\n#endif",
  map_particle_fragment:
    "#ifdef USE_MAP\ngl_FragColor = gl_FragColor * texture2D( map, vec2( gl_PointCoord.x, 1.0 - gl_PointCoord.y ) );\n#endif",
  map_pars_vertex:
    "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP )\nvarying vec2 vUv;\nuniform vec4 offsetRepeat;\n#endif",
  map_pars_fragment:
    "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP )\nvarying vec2 vUv;\n#endif\n#ifdef USE_MAP\nuniform sampler2D map;\n#endif",
  map_vertex:
    "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP )\nvUv = uv * offsetRepeat.zw + offsetRepeat.xy;\n#endif",
  map_fragment:
    "#ifdef USE_MAP\n#ifdef GAMMA_INPUT\nvec4 texelColor = texture2D( map, vUv );\ntexelColor.xyz *= texelColor.xyz;\ngl_FragColor = gl_FragColor * texelColor;\n#else\ngl_FragColor = gl_FragColor * texture2D( map, vUv );\n#endif\n#endif",
  lightmap_pars_fragment:
    "#ifdef USE_LIGHTMAP\nvarying vec2 vUv2;\nuniform sampler2D lightMap;\n#endif",
  lightmap_pars_vertex: "#ifdef USE_LIGHTMAP\nvarying vec2 vUv2;\n#endif",
  lightmap_fragment:
    "#ifdef USE_LIGHTMAP\ngl_FragColor = gl_FragColor * texture2D( lightMap, vUv2 );\n#endif",
  lightmap_vertex: "#ifdef USE_LIGHTMAP\nvUv2 = uv2;\n#endif",
  bumpmap_pars_fragment:
    "#ifdef USE_BUMPMAP\nuniform sampler2D bumpMap;\nuniform float bumpScale;\nvec2 dHdxy_fwd() {\nvec2 dSTdx = dFdx( vUv );\nvec2 dSTdy = dFdy( vUv );\nfloat Hll = bumpScale * texture2D( bumpMap, vUv ).x;\nfloat dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\nfloat dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\nreturn vec2( dBx, dBy );\n}\nvec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {\nvec3 vSigmaX = dFdx( surf_pos );\nvec3 vSigmaY = dFdy( surf_pos );\nvec3 vN = surf_norm;\nvec3 R1 = cross( vSigmaY, vN );\nvec3 R2 = cross( vN, vSigmaX );\nfloat fDet = dot( vSigmaX, R1 );\nvec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\nreturn normalize( abs( fDet ) * surf_norm - vGrad );\n}\n#endif",
  normalmap_pars_fragment:
    "#ifdef USE_NORMALMAP\nuniform sampler2D normalMap;\nuniform vec2 normalScale;\nvec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm ) {\nvec3 q0 = dFdx( eye_pos.xyz );\nvec3 q1 = dFdy( eye_pos.xyz );\nvec2 st0 = dFdx( vUv.st );\nvec2 st1 = dFdy( vUv.st );\nvec3 S = normalize(  q0 * st1.t - q1 * st0.t );\nvec3 T = normalize( -q0 * st1.s + q1 * st0.s );\nvec3 N = normalize( surf_norm );\nvec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\nmapN.xy = normalScale * mapN.xy;\nmat3 tsn = mat3( S, T, N );\nreturn normalize( tsn * mapN );\n}\n#endif",
  specularmap_pars_fragment:
    "#ifdef USE_SPECULARMAP\nuniform sampler2D specularMap;\n#endif",
  specularmap_fragment:
    "float specularStrength;\n#ifdef USE_SPECULARMAP\nvec4 texelSpecular = texture2D( specularMap, vUv );\nspecularStrength = texelSpecular.r;\n#else\nspecularStrength = 1.0;\n#endif",
  lights_lambert_pars_vertex:
    "uniform vec3 ambient;\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_HEMI_LIGHTS > 0\nuniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];\nuniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];\nuniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#endif\n#if MAX_SPOT_LIGHTS > 0\nuniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\nuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\nuniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];\nuniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\n#endif\n#ifdef WRAP_AROUND\nuniform vec3 wrapRGB;\n#endif",
  lights_lambert_vertex:
    "vLightFront = vec3( 0.0 );\n#ifdef DOUBLE_SIDED\nvLightBack = vec3( 0.0 );\n#endif\ntransformedNormal = normalize( transformedNormal );\n#if MAX_DIR_LIGHTS > 0\nfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\nfloat dotProduct = dot( transformedNormal, dirVector );\nvec3 directionalLightWeighting = vec3( max( dotProduct, 0.0 ) );\n#ifdef DOUBLE_SIDED\nvec3 directionalLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n#ifdef WRAP_AROUND\nvec3 directionalLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n#endif\n#endif\n#ifdef WRAP_AROUND\nvec3 directionalLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\ndirectionalLightWeighting = mix( directionalLightWeighting, directionalLightWeightingHalf, wrapRGB );\n#ifdef DOUBLE_SIDED\ndirectionalLightWeightingBack = mix( directionalLightWeightingBack, directionalLightWeightingHalfBack, wrapRGB );\n#endif\n#endif\nvLightFront += directionalLightColor[ i ] * directionalLightWeighting;\n#ifdef DOUBLE_SIDED\nvLightBack += directionalLightColor[ i ] * directionalLightWeightingBack;\n#endif\n}\n#endif\n#if MAX_POINT_LIGHTS > 0\nfor( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\nfloat dotProduct = dot( transformedNormal, lVector );\nvec3 pointLightWeighting = vec3( max( dotProduct, 0.0 ) );\n#ifdef DOUBLE_SIDED\nvec3 pointLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n#ifdef WRAP_AROUND\nvec3 pointLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n#endif\n#endif\n#ifdef WRAP_AROUND\nvec3 pointLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\npointLightWeighting = mix( pointLightWeighting, pointLightWeightingHalf, wrapRGB );\n#ifdef DOUBLE_SIDED\npointLightWeightingBack = mix( pointLightWeightingBack, pointLightWeightingHalfBack, wrapRGB );\n#endif\n#endif\nvLightFront += pointLightColor[ i ] * pointLightWeighting * lDistance;\n#ifdef DOUBLE_SIDED\nvLightBack += pointLightColor[ i ] * pointLightWeightingBack * lDistance;\n#endif\n}\n#endif\n#if MAX_SPOT_LIGHTS > 0\nfor( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - worldPosition.xyz ) );\nif ( spotEffect > spotLightAngleCos[ i ] ) {\nspotEffect = max( pow( spotEffect, spotLightExponent[ i ] ), 0.0 );\nfloat lDistance = 1.0;\nif ( spotLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\nfloat dotProduct = dot( transformedNormal, lVector );\nvec3 spotLightWeighting = vec3( max( dotProduct, 0.0 ) );\n#ifdef DOUBLE_SIDED\nvec3 spotLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n#ifdef WRAP_AROUND\nvec3 spotLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n#endif\n#endif\n#ifdef WRAP_AROUND\nvec3 spotLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\nspotLightWeighting = mix( spotLightWeighting, spotLightWeightingHalf, wrapRGB );\n#ifdef DOUBLE_SIDED\nspotLightWeightingBack = mix( spotLightWeightingBack, spotLightWeightingHalfBack, wrapRGB );\n#endif\n#endif\nvLightFront += spotLightColor[ i ] * spotLightWeighting * lDistance * spotEffect;\n#ifdef DOUBLE_SIDED\nvLightBack += spotLightColor[ i ] * spotLightWeightingBack * lDistance * spotEffect;\n#endif\n}\n}\n#endif\n#if MAX_HEMI_LIGHTS > 0\nfor( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( hemisphereLightDirection[ i ], 0.0 );\nvec3 lVector = normalize( lDirection.xyz );\nfloat dotProduct = dot( transformedNormal, lVector );\nfloat hemiDiffuseWeight = 0.5 * dotProduct + 0.5;\nfloat hemiDiffuseWeightBack = -0.5 * dotProduct + 0.5;\nvLightFront += mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );\n#ifdef DOUBLE_SIDED\nvLightBack += mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeightBack );\n#endif\n}\n#endif\nvLightFront = vLightFront * diffuse + ambient * ambientLightColor + emissive;\n#ifdef DOUBLE_SIDED\nvLightBack = vLightBack * diffuse + ambient * ambientLightColor + emissive;\n#endif",
  lights_phong_pars_vertex:
    "#ifndef PHONG_PER_PIXEL\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\n#if MAX_SPOT_LIGHTS > 0\nuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\nuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\nvarying vec4 vSpotLight[ MAX_SPOT_LIGHTS ];\n#endif\n#endif\n#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP )\nvarying vec3 vWorldPosition;\n#endif",
  lights_phong_vertex:
    "#ifndef PHONG_PER_PIXEL\n#if MAX_POINT_LIGHTS > 0\nfor( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nvPointLight[ i ] = vec4( lVector, lDistance );\n}\n#endif\n#if MAX_SPOT_LIGHTS > 0\nfor( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( spotLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );\nvSpotLight[ i ] = vec4( lVector, lDistance );\n}\n#endif\n#endif\n#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP )\nvWorldPosition = worldPosition.xyz;\n#endif",
  lights_phong_pars_fragment:
    "uniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_HEMI_LIGHTS > 0\nuniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];\nuniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];\nuniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\n#ifdef PHONG_PER_PIXEL\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#else\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\n#endif\n#if MAX_SPOT_LIGHTS > 0\nuniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\nuniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];\nuniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\n#ifdef PHONG_PER_PIXEL\nuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\n#else\nvarying vec4 vSpotLight[ MAX_SPOT_LIGHTS ];\n#endif\n#endif\n#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP )\nvarying vec3 vWorldPosition;\n#endif\n#ifdef WRAP_AROUND\nuniform vec3 wrapRGB;\n#endif\nvarying vec3 vViewPosition;\nvarying vec3 vNormal;",
  lights_phong_fragment:
    "vec3 normal = normalize( vNormal );\nvec3 viewPosition = normalize( vViewPosition );\n#ifdef DOUBLE_SIDED\nnormal = normal * ( -1.0 + 2.0 * float( gl_FrontFacing ) );\n#endif\n#ifdef USE_NORMALMAP\nnormal = perturbNormal2Arb( -viewPosition, normal );\n#elif defined( USE_BUMPMAP )\nnormal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );\n#endif\n#if MAX_POINT_LIGHTS > 0\nvec3 pointDiffuse  = vec3( 0.0 );\nvec3 pointSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\n#ifdef PHONG_PER_PIXEL\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz + vViewPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\n#else\nvec3 lVector = normalize( vPointLight[ i ].xyz );\nfloat lDistance = vPointLight[ i ].w;\n#endif\nfloat dotProduct = dot( normal, lVector );\n#ifdef WRAP_AROUND\nfloat pointDiffuseWeightFull = max( dotProduct, 0.0 );\nfloat pointDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\nvec3 pointDiffuseWeight = mix( vec3 ( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );\n#else\nfloat pointDiffuseWeight = max( dotProduct, 0.0 );\n#endif\npointDiffuse  += diffuse * pointLightColor[ i ] * pointDiffuseWeight * lDistance;\nvec3 pointHalfVector = normalize( lVector + viewPosition );\nfloat pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );\nfloat pointSpecularWeight = specularStrength * max( pow( pointDotNormalHalf, shininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\nvec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, pointHalfVector ), 5.0 );\npointSpecular += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * lDistance * specularNormalization;\n#else\npointSpecular += specular * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * lDistance;\n#endif\n}\n#endif\n#if MAX_SPOT_LIGHTS > 0\nvec3 spotDiffuse  = vec3( 0.0 );\nvec3 spotSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\n#ifdef PHONG_PER_PIXEL\nvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz + vViewPosition.xyz;\nfloat lDistance = 1.0;\nif ( spotLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\n#else\nvec3 lVector = normalize( vSpotLight[ i ].xyz );\nfloat lDistance = vSpotLight[ i ].w;\n#endif\nfloat spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - vWorldPosition ) );\nif ( spotEffect > spotLightAngleCos[ i ] ) {\nspotEffect = max( pow( spotEffect, spotLightExponent[ i ] ), 0.0 );\nfloat dotProduct = dot( normal, lVector );\n#ifdef WRAP_AROUND\nfloat spotDiffuseWeightFull = max( dotProduct, 0.0 );\nfloat spotDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\nvec3 spotDiffuseWeight = mix( vec3 ( spotDiffuseWeightFull ), vec3( spotDiffuseWeightHalf ), wrapRGB );\n#else\nfloat spotDiffuseWeight = max( dotProduct, 0.0 );\n#endif\nspotDiffuse += diffuse * spotLightColor[ i ] * spotDiffuseWeight * lDistance * spotEffect;\nvec3 spotHalfVector = normalize( lVector + viewPosition );\nfloat spotDotNormalHalf = max( dot( normal, spotHalfVector ), 0.0 );\nfloat spotSpecularWeight = specularStrength * max( pow( spotDotNormalHalf, shininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\nvec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, spotHalfVector ), 5.0 );\nspotSpecular += schlick * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * lDistance * specularNormalization * spotEffect;\n#else\nspotSpecular += specular * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * lDistance * spotEffect;\n#endif\n}\n}\n#endif\n#if MAX_DIR_LIGHTS > 0\nvec3 dirDiffuse  = vec3( 0.0 );\nvec3 dirSpecular = vec3( 0.0 );\nfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\nfloat dotProduct = dot( normal, dirVector );\n#ifdef WRAP_AROUND\nfloat dirDiffuseWeightFull = max( dotProduct, 0.0 );\nfloat dirDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\nvec3 dirDiffuseWeight = mix( vec3( dirDiffuseWeightFull ), vec3( dirDiffuseWeightHalf ), wrapRGB );\n#else\nfloat dirDiffuseWeight = max( dotProduct, 0.0 );\n#endif\ndirDiffuse  += diffuse * directionalLightColor[ i ] * dirDiffuseWeight;\nvec3 dirHalfVector = normalize( dirVector + viewPosition );\nfloat dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );\nfloat dirSpecularWeight = specularStrength * max( pow( dirDotNormalHalf, shininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\nvec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( dirVector, dirHalfVector ), 5.0 );\ndirSpecular += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;\n#else\ndirSpecular += specular * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight;\n#endif\n}\n#endif\n#if MAX_HEMI_LIGHTS > 0\nvec3 hemiDiffuse  = vec3( 0.0 );\nvec3 hemiSpecular = vec3( 0.0 );\nfor( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( hemisphereLightDirection[ i ], 0.0 );\nvec3 lVector = normalize( lDirection.xyz );\nfloat dotProduct = dot( normal, lVector );\nfloat hemiDiffuseWeight = 0.5 * dotProduct + 0.5;\nvec3 hemiColor = mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );\nhemiDiffuse += diffuse * hemiColor;\nvec3 hemiHalfVectorSky = normalize( lVector + viewPosition );\nfloat hemiDotNormalHalfSky = 0.5 * dot( normal, hemiHalfVectorSky ) + 0.5;\nfloat hemiSpecularWeightSky = specularStrength * max( pow( hemiDotNormalHalfSky, shininess ), 0.0 );\nvec3 lVectorGround = -lVector;\nvec3 hemiHalfVectorGround = normalize( lVectorGround + viewPosition );\nfloat hemiDotNormalHalfGround = 0.5 * dot( normal, hemiHalfVectorGround ) + 0.5;\nfloat hemiSpecularWeightGround = specularStrength * max( pow( hemiDotNormalHalfGround, shininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat dotProductGround = dot( normal, lVectorGround );\nfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\nvec3 schlickSky = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, hemiHalfVectorSky ), 5.0 );\nvec3 schlickGround = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVectorGround, hemiHalfVectorGround ), 5.0 );\nhemiSpecular += hemiColor * specularNormalization * ( schlickSky * hemiSpecularWeightSky * max( dotProduct, 0.0 ) + schlickGround * hemiSpecularWeightGround * max( dotProductGround, 0.0 ) );\n#else\nhemiSpecular += specular * hemiColor * ( hemiSpecularWeightSky + hemiSpecularWeightGround ) * hemiDiffuseWeight;\n#endif\n}\n#endif\nvec3 totalDiffuse = vec3( 0.0 );\nvec3 totalSpecular = vec3( 0.0 );\n#if MAX_DIR_LIGHTS > 0\ntotalDiffuse += dirDiffuse;\ntotalSpecular += dirSpecular;\n#endif\n#if MAX_HEMI_LIGHTS > 0\ntotalDiffuse += hemiDiffuse;\ntotalSpecular += hemiSpecular;\n#endif\n#if MAX_POINT_LIGHTS > 0\ntotalDiffuse += pointDiffuse;\ntotalSpecular += pointSpecular;\n#endif\n#if MAX_SPOT_LIGHTS > 0\ntotalDiffuse += spotDiffuse;\ntotalSpecular += spotSpecular;\n#endif\n#ifdef METAL\ngl_FragColor.xyz = gl_FragColor.xyz * ( emissive + totalDiffuse + ambientLightColor * ambient + totalSpecular );\n#else\ngl_FragColor.xyz = gl_FragColor.xyz * ( emissive + totalDiffuse + ambientLightColor * ambient ) + totalSpecular;\n#endif",
  color_pars_fragment: "#ifdef USE_COLOR\nvarying vec3 vColor;\n#endif",
  color_fragment:
    "#ifdef USE_COLOR\ngl_FragColor = gl_FragColor * vec4( vColor, opacity );\n#endif",
  color_pars_vertex: "#ifdef USE_COLOR\nvarying vec3 vColor;\n#endif",
  color_vertex:
    "#ifdef USE_COLOR\n#ifdef GAMMA_INPUT\nvColor = color * color;\n#else\nvColor = color;\n#endif\n#endif",
  skinning_pars_vertex:
    "#ifdef USE_SKINNING\n#ifdef BONE_TEXTURE\nuniform sampler2D boneTexture;\nmat4 getBoneMatrix( const in float i ) {\nfloat j = i * 4.0;\nfloat x = mod( j, N_BONE_PIXEL_X );\nfloat y = floor( j / N_BONE_PIXEL_X );\nconst float dx = 1.0 / N_BONE_PIXEL_X;\nconst float dy = 1.0 / N_BONE_PIXEL_Y;\ny = dy * ( y + 0.5 );\nvec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\nvec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\nvec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\nvec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\nmat4 bone = mat4( v1, v2, v3, v4 );\nreturn bone;\n}\n#else\nuniform mat4 boneGlobalMatrices[ MAX_BONES ];\nmat4 getBoneMatrix( const in float i ) {\nmat4 bone = boneGlobalMatrices[ int(i) ];\nreturn bone;\n}\n#endif\n#endif",
  skinbase_vertex:
    "#ifdef USE_SKINNING\nmat4 boneMatX = getBoneMatrix( skinIndex.x );\nmat4 boneMatY = getBoneMatrix( skinIndex.y );\n#endif",
  skinning_vertex:
    "#ifdef USE_SKINNING\n#ifdef USE_MORPHTARGETS\nvec4 skinVertex = vec4( morphed, 1.0 );\n#else\nvec4 skinVertex = vec4( position, 1.0 );\n#endif\nvec4 skinned  = boneMatX * skinVertex * skinWeight.x;\nskinned \t  += boneMatY * skinVertex * skinWeight.y;\n#endif",
  morphtarget_pars_vertex:
    "#ifdef USE_MORPHTARGETS\n#ifndef USE_MORPHNORMALS\nuniform float morphTargetInfluences[ 8 ];\n#else\nuniform float morphTargetInfluences[ 4 ];\n#endif\n#endif",
  morphtarget_vertex:
    "#ifdef USE_MORPHTARGETS\nvec3 morphed = vec3( 0.0 );\nmorphed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\nmorphed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\nmorphed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\nmorphed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\n#ifndef USE_MORPHNORMALS\nmorphed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\nmorphed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\nmorphed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\nmorphed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\n#endif\nmorphed += position;\n#endif",
  default_vertex:
    "vec4 mvPosition;\n#ifdef USE_SKINNING\nmvPosition = modelViewMatrix * skinned;\n#endif\n#if !defined( USE_SKINNING ) && defined( USE_MORPHTARGETS )\nmvPosition = modelViewMatrix * vec4( morphed, 1.0 );\n#endif\n#if !defined( USE_SKINNING ) && ! defined( USE_MORPHTARGETS )\nmvPosition = modelViewMatrix * vec4( position, 1.0 );\n#endif\ngl_Position = projectionMatrix * mvPosition;",
  morphnormal_vertex:
    "#ifdef USE_MORPHNORMALS\nvec3 morphedNormal = vec3( 0.0 );\nmorphedNormal +=  ( morphNormal0 - normal ) * morphTargetInfluences[ 0 ];\nmorphedNormal +=  ( morphNormal1 - normal ) * morphTargetInfluences[ 1 ];\nmorphedNormal +=  ( morphNormal2 - normal ) * morphTargetInfluences[ 2 ];\nmorphedNormal +=  ( morphNormal3 - normal ) * morphTargetInfluences[ 3 ];\nmorphedNormal += normal;\n#endif",
  skinnormal_vertex:
    "#ifdef USE_SKINNING\nmat4 skinMatrix = skinWeight.x * boneMatX;\nskinMatrix \t+= skinWeight.y * boneMatY;\n#ifdef USE_MORPHNORMALS\nvec4 skinnedNormal = skinMatrix * vec4( morphedNormal, 0.0 );\n#else\nvec4 skinnedNormal = skinMatrix * vec4( normal, 0.0 );\n#endif\n#endif",
  defaultnormal_vertex:
    "vec3 objectNormal;\n#ifdef USE_SKINNING\nobjectNormal = skinnedNormal.xyz;\n#endif\n#if !defined( USE_SKINNING ) && defined( USE_MORPHNORMALS )\nobjectNormal = morphedNormal;\n#endif\n#if !defined( USE_SKINNING ) && ! defined( USE_MORPHNORMALS )\nobjectNormal = normal;\n#endif\n#ifdef FLIP_SIDED\nobjectNormal = -objectNormal;\n#endif\nvec3 transformedNormal = normalMatrix * objectNormal;",
  shadowmap_pars_fragment:
    "#ifdef USE_SHADOWMAP\nuniform sampler2D shadowMap[ MAX_SHADOWS ];\nuniform vec2 shadowMapSize[ MAX_SHADOWS ];\nuniform float shadowDarkness[ MAX_SHADOWS ];\nuniform float shadowBias[ MAX_SHADOWS ];\nvarying vec4 vShadowCoord[ MAX_SHADOWS ];\nfloat unpackDepth( const in vec4 rgba_depth ) {\nconst vec4 bit_shift = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );\nfloat depth = dot( rgba_depth, bit_shift );\nreturn depth;\n}\n#endif",
  shadowmap_fragment:
    "#ifdef USE_SHADOWMAP\n#ifdef SHADOWMAP_DEBUG\nvec3 frustumColors[3];\nfrustumColors[0] = vec3( 1.0, 0.5, 0.0 );\nfrustumColors[1] = vec3( 0.0, 1.0, 0.8 );\nfrustumColors[2] = vec3( 0.0, 0.5, 1.0 );\n#endif\n#ifdef SHADOWMAP_CASCADE\nint inFrustumCount = 0;\n#endif\nfloat fDepth;\nvec3 shadowColor = vec3( 1.0 );\nfor( int i = 0; i < MAX_SHADOWS; i ++ ) {\nvec3 shadowCoord = vShadowCoord[ i ].xyz / vShadowCoord[ i ].w;\nbvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\nbool inFrustum = all( inFrustumVec );\n#ifdef SHADOWMAP_CASCADE\ninFrustumCount += int( inFrustum );\nbvec3 frustumTestVec = bvec3( inFrustum, inFrustumCount == 1, shadowCoord.z <= 1.0 );\n#else\nbvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n#endif\nbool frustumTest = all( frustumTestVec );\nif ( frustumTest ) {\nshadowCoord.z += shadowBias[ i ];\n#ifdef SHADOWMAP_SOFT\nfloat shadow = 0.0;\nconst float shadowDelta = 1.0 / 9.0;\nfloat xPixelOffset = 1.0 / shadowMapSize[ i ].x;\nfloat yPixelOffset = 1.0 / shadowMapSize[ i ].y;\nfloat dx0 = -1.25 * xPixelOffset;\nfloat dy0 = -1.25 * yPixelOffset;\nfloat dx1 = 1.25 * xPixelOffset;\nfloat dy1 = 1.25 * yPixelOffset;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy1 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nshadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );\n#else\nvec4 rgbaDepth = texture2D( shadowMap[ i ], shadowCoord.xy );\nfloat fDepth = unpackDepth( rgbaDepth );\nif ( fDepth < shadowCoord.z )\nshadowColor = shadowColor * vec3( 1.0 - shadowDarkness[ i ] );\n#endif\n}\n#ifdef SHADOWMAP_DEBUG\n#ifdef SHADOWMAP_CASCADE\nif ( inFrustum && inFrustumCount == 1 ) gl_FragColor.xyz *= frustumColors[ i ];\n#else\nif ( inFrustum ) gl_FragColor.xyz *= frustumColors[ i ];\n#endif\n#endif\n}\n#ifdef GAMMA_OUTPUT\nshadowColor *= shadowColor;\n#endif\ngl_FragColor.xyz = gl_FragColor.xyz * shadowColor;\n#endif",
  shadowmap_pars_vertex:
    "#ifdef USE_SHADOWMAP\nvarying vec4 vShadowCoord[ MAX_SHADOWS ];\nuniform mat4 shadowMatrix[ MAX_SHADOWS ];\n#endif",
  shadowmap_vertex:
    "#ifdef USE_SHADOWMAP\nfor( int i = 0; i < MAX_SHADOWS; i ++ ) {\nvShadowCoord[ i ] = shadowMatrix[ i ] * worldPosition;\n}\n#endif",
  alphatest_fragment:
    "#ifdef ALPHATEST\nif ( gl_FragColor.a < ALPHATEST ) discard;\n#endif",
  linear_to_gamma_fragment:
    "#ifdef GAMMA_OUTPUT\ngl_FragColor.xyz = sqrt( gl_FragColor.xyz );\n#endif",
};
THREE.UniformsUtils = {
  merge: function (a) {
    var b,
      c,
      d,
      e = {};
    for (b = 0; b < a.length; b++)
      for (c in ((d = this.clone(a[b])), d)) e[c] = d[c];
    return e;
  },
  clone: function (a) {
    var b,
      c,
      d,
      e = {};
    for (b in a)
      for (c in ((e[b] = {}), a[b]))
        (d = a[b][c]),
          (e[b][c] =
            d instanceof THREE.Color ||
            d instanceof THREE.Vector2 ||
            d instanceof THREE.Vector3 ||
            d instanceof THREE.Vector4 ||
            d instanceof THREE.Matrix4 ||
            d instanceof THREE.Texture
              ? d.clone()
              : d instanceof Array
              ? d.slice()
              : d);
    return e;
  },
};
THREE.UniformsLib = {
  common: {
    diffuse: {
      type: "c",
      value: new THREE.Color(15658734),
    },
    opacity: {
      type: "f",
      value: 1,
    },
    map: {
      type: "t",
      value: null,
    },
    offsetRepeat: {
      type: "v4",
      value: new THREE.Vector4(0, 0, 1, 1),
    },
    lightMap: {
      type: "t",
      value: null,
    },
    specularMap: {
      type: "t",
      value: null,
    },
    envMap: {
      type: "t",
      value: null,
    },
    flipEnvMap: {
      type: "f",
      value: -1,
    },
    useRefract: {
      type: "i",
      value: 0,
    },
    reflectivity: {
      type: "f",
      value: 1,
    },
    refractionRatio: {
      type: "f",
      value: 0.98,
    },
    combine: {
      type: "i",
      value: 0,
    },
    morphTargetInfluences: {
      type: "f",
      value: 0,
    },
  },
  bump: {
    bumpMap: {
      type: "t",
      value: null,
    },
    bumpScale: {
      type: "f",
      value: 1,
    },
  },
  normalmap: {
    normalMap: {
      type: "t",
      value: null,
    },
    normalScale: {
      type: "v2",
      value: new THREE.Vector2(1, 1),
    },
  },
  fog: {
    fogDensity: {
      type: "f",
      value: 2.5e-4,
    },
    fogNear: {
      type: "f",
      value: 1,
    },
    fogFar: {
      type: "f",
      value: 2e3,
    },
    fogColor: {
      type: "c",
      value: new THREE.Color(16777215),
    },
  },
  lights: {
    ambientLightColor: {
      type: "fv",
      value: [],
    },
    directionalLightDirection: {
      type: "fv",
      value: [],
    },
    directionalLightColor: {
      type: "fv",
      value: [],
    },
    hemisphereLightDirection: {
      type: "fv",
      value: [],
    },
    hemisphereLightSkyColor: {
      type: "fv",
      value: [],
    },
    hemisphereLightGroundColor: {
      type: "fv",
      value: [],
    },
    pointLightColor: {
      type: "fv",
      value: [],
    },
    pointLightPosition: {
      type: "fv",
      value: [],
    },
    pointLightDistance: {
      type: "fv1",
      value: [],
    },
    spotLightColor: {
      type: "fv",
      value: [],
    },
    spotLightPosition: {
      type: "fv",
      value: [],
    },
    spotLightDirection: {
      type: "fv",
      value: [],
    },
    spotLightDistance: {
      type: "fv1",
      value: [],
    },
    spotLightAngleCos: {
      type: "fv1",
      value: [],
    },
    spotLightExponent: {
      type: "fv1",
      value: [],
    },
  },
  particle: {
    psColor: {
      type: "c",
      value: new THREE.Color(15658734),
    },
    opacity: {
      type: "f",
      value: 1,
    },
    size: {
      type: "f",
      value: 1,
    },
    scale: {
      type: "f",
      value: 1,
    },
    map: {
      type: "t",
      value: null,
    },
    fogDensity: {
      type: "f",
      value: 2.5e-4,
    },
    fogNear: {
      type: "f",
      value: 1,
    },
    fogFar: {
      type: "f",
      value: 2e3,
    },
    fogColor: {
      type: "c",
      value: new THREE.Color(16777215),
    },
  },
  shadowmap: {
    shadowMap: {
      type: "tv",
      value: [],
    },
    shadowMapSize: {
      type: "v2v",
      value: [],
    },
    shadowBias: {
      type: "fv1",
      value: [],
    },
    shadowDarkness: {
      type: "fv1",
      value: [],
    },
    shadowMatrix: {
      type: "m4v",
      value: [],
    },
  },
};
THREE.ShaderLib = {
  depth: {
    uniforms: {
      mNear: {
        type: "f",
        value: 1,
      },
      mFar: {
        type: "f",
        value: 2e3,
      },
      opacity: {
        type: "f",
        value: 1,
      },
    },
    vertexShader:
      "void main() {\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
    fragmentShader:
      "uniform float mNear;\nuniform float mFar;\nuniform float opacity;\nvoid main() {\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\nfloat color = 1.0 - smoothstep( mNear, mFar, depth );\ngl_FragColor = vec4( vec3( color ), opacity );\n}",
  },
  normal: {
    uniforms: {
      opacity: {
        type: "f",
        value: 1,
      },
    },
    vertexShader:
      "varying vec3 vNormal;\nvoid main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\nvNormal = normalize( normalMatrix * normal );\ngl_Position = projectionMatrix * mvPosition;\n}",
    fragmentShader:
      "uniform float opacity;\nvarying vec3 vNormal;\nvoid main() {\ngl_FragColor = vec4( 0.5 * normalize( vNormal ) + 0.5, opacity );\n}",
  },
  basic: {
    uniforms: THREE.UniformsUtils.merge([
      THREE.UniformsLib.common,
      THREE.UniformsLib.fog,
      THREE.UniformsLib.shadowmap,
    ]),
    vertexShader: [
      THREE.ShaderChunk.map_pars_vertex,
      THREE.ShaderChunk.lightmap_pars_vertex,
      THREE.ShaderChunk.envmap_pars_vertex,
      THREE.ShaderChunk.color_pars_vertex,
      THREE.ShaderChunk.morphtarget_pars_vertex,
      THREE.ShaderChunk.skinning_pars_vertex,
      THREE.ShaderChunk.shadowmap_pars_vertex,
      "void main() {",
      THREE.ShaderChunk.map_vertex,
      THREE.ShaderChunk.lightmap_vertex,
      THREE.ShaderChunk.color_vertex,
      "#ifdef USE_ENVMAP",
      THREE.ShaderChunk.morphnormal_vertex,
      THREE.ShaderChunk.skinbase_vertex,
      THREE.ShaderChunk.skinnormal_vertex,
      THREE.ShaderChunk.defaultnormal_vertex,
      "#endif",
      THREE.ShaderChunk.morphtarget_vertex,
      THREE.ShaderChunk.skinning_vertex,
      THREE.ShaderChunk.default_vertex,
      THREE.ShaderChunk.worldpos_vertex,
      THREE.ShaderChunk.envmap_vertex,
      THREE.ShaderChunk.shadowmap_vertex,
      "}",
    ].join("\n"),
    fragmentShader: [
      "uniform vec3 diffuse;\nuniform float opacity;",
      THREE.ShaderChunk.color_pars_fragment,
      THREE.ShaderChunk.map_pars_fragment,
      THREE.ShaderChunk.lightmap_pars_fragment,
      THREE.ShaderChunk.envmap_pars_fragment,
      THREE.ShaderChunk.fog_pars_fragment,
      THREE.ShaderChunk.shadowmap_pars_fragment,
      THREE.ShaderChunk.specularmap_pars_fragment,
      "void main() {\ngl_FragColor = vec4( diffuse, opacity );",
      THREE.ShaderChunk.map_fragment,
      THREE.ShaderChunk.alphatest_fragment,
      THREE.ShaderChunk.specularmap_fragment,
      THREE.ShaderChunk.lightmap_fragment,
      THREE.ShaderChunk.color_fragment,
      THREE.ShaderChunk.envmap_fragment,
      THREE.ShaderChunk.shadowmap_fragment,
      THREE.ShaderChunk.linear_to_gamma_fragment,
      THREE.ShaderChunk.fog_fragment,
      "}",
    ].join("\n"),
  },
  lambert: {
    uniforms: THREE.UniformsUtils.merge([
      THREE.UniformsLib.common,
      THREE.UniformsLib.fog,
      THREE.UniformsLib.lights,
      THREE.UniformsLib.shadowmap,
      {
        ambient: {
          type: "c",
          value: new THREE.Color(16777215),
        },
        emissive: {
          type: "c",
          value: new THREE.Color(0),
        },
        wrapRGB: {
          type: "v3",
          value: new THREE.Vector3(1, 1, 1),
        },
      },
    ]),
    vertexShader: [
      "#define LAMBERT\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\nvarying vec3 vLightBack;\n#endif",
      THREE.ShaderChunk.map_pars_vertex,
      THREE.ShaderChunk.lightmap_pars_vertex,
      THREE.ShaderChunk.envmap_pars_vertex,
      THREE.ShaderChunk.lights_lambert_pars_vertex,
      THREE.ShaderChunk.color_pars_vertex,
      THREE.ShaderChunk.morphtarget_pars_vertex,
      THREE.ShaderChunk.skinning_pars_vertex,
      THREE.ShaderChunk.shadowmap_pars_vertex,
      "void main() {",
      THREE.ShaderChunk.map_vertex,
      THREE.ShaderChunk.lightmap_vertex,
      THREE.ShaderChunk.color_vertex,
      THREE.ShaderChunk.morphnormal_vertex,
      THREE.ShaderChunk.skinbase_vertex,
      THREE.ShaderChunk.skinnormal_vertex,
      THREE.ShaderChunk.defaultnormal_vertex,
      THREE.ShaderChunk.morphtarget_vertex,
      THREE.ShaderChunk.skinning_vertex,
      THREE.ShaderChunk.default_vertex,
      THREE.ShaderChunk.worldpos_vertex,
      THREE.ShaderChunk.envmap_vertex,
      THREE.ShaderChunk.lights_lambert_vertex,
      THREE.ShaderChunk.shadowmap_vertex,
      "}",
    ].join("\n"),
    fragmentShader: [
      "uniform float opacity;\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\nvarying vec3 vLightBack;\n#endif",
      THREE.ShaderChunk.color_pars_fragment,
      THREE.ShaderChunk.map_pars_fragment,
      THREE.ShaderChunk.lightmap_pars_fragment,
      THREE.ShaderChunk.envmap_pars_fragment,
      THREE.ShaderChunk.fog_pars_fragment,
      THREE.ShaderChunk.shadowmap_pars_fragment,
      THREE.ShaderChunk.specularmap_pars_fragment,
      "void main() {\ngl_FragColor = vec4( vec3 ( 1.0 ), opacity );",
      THREE.ShaderChunk.map_fragment,
      THREE.ShaderChunk.alphatest_fragment,
      THREE.ShaderChunk.specularmap_fragment,
      "#ifdef DOUBLE_SIDED\nif ( gl_FrontFacing )\ngl_FragColor.xyz *= vLightFront;\nelse\ngl_FragColor.xyz *= vLightBack;\n#else\ngl_FragColor.xyz *= vLightFront;\n#endif",
      THREE.ShaderChunk.lightmap_fragment,
      THREE.ShaderChunk.color_fragment,
      THREE.ShaderChunk.envmap_fragment,
      THREE.ShaderChunk.shadowmap_fragment,
      THREE.ShaderChunk.linear_to_gamma_fragment,
      THREE.ShaderChunk.fog_fragment,
      "}",
    ].join("\n"),
  },
  phong: {
    uniforms: THREE.UniformsUtils.merge([
      THREE.UniformsLib.common,
      THREE.UniformsLib.bump,
      THREE.UniformsLib.normalmap,
      THREE.UniformsLib.fog,
      THREE.UniformsLib.lights,
      THREE.UniformsLib.shadowmap,
      {
        ambient: {
          type: "c",
          value: new THREE.Color(16777215),
        },
        emissive: {
          type: "c",
          value: new THREE.Color(0),
        },
        specular: {
          type: "c",
          value: new THREE.Color(1118481),
        },
        shininess: {
          type: "f",
          value: 30,
        },
        wrapRGB: {
          type: "v3",
          value: new THREE.Vector3(1, 1, 1),
        },
      },
    ]),
    vertexShader: [
      "#define PHONG\nvarying vec3 vViewPosition;\nvarying vec3 vNormal;",
      THREE.ShaderChunk.map_pars_vertex,
      THREE.ShaderChunk.lightmap_pars_vertex,
      THREE.ShaderChunk.envmap_pars_vertex,
      THREE.ShaderChunk.lights_phong_pars_vertex,
      THREE.ShaderChunk.color_pars_vertex,
      THREE.ShaderChunk.morphtarget_pars_vertex,
      THREE.ShaderChunk.skinning_pars_vertex,
      THREE.ShaderChunk.shadowmap_pars_vertex,
      "void main() {",
      THREE.ShaderChunk.map_vertex,
      THREE.ShaderChunk.lightmap_vertex,
      THREE.ShaderChunk.color_vertex,
      THREE.ShaderChunk.morphnormal_vertex,
      THREE.ShaderChunk.skinbase_vertex,
      THREE.ShaderChunk.skinnormal_vertex,
      THREE.ShaderChunk.defaultnormal_vertex,
      "vNormal = normalize( transformedNormal );",
      THREE.ShaderChunk.morphtarget_vertex,
      THREE.ShaderChunk.skinning_vertex,
      THREE.ShaderChunk.default_vertex,
      "vViewPosition = -mvPosition.xyz;",
      THREE.ShaderChunk.worldpos_vertex,
      THREE.ShaderChunk.envmap_vertex,
      THREE.ShaderChunk.lights_phong_vertex,
      THREE.ShaderChunk.shadowmap_vertex,
      "}",
    ].join("\n"),
    fragmentShader: [
      "uniform vec3 diffuse;\nuniform float opacity;\nuniform vec3 ambient;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;",
      THREE.ShaderChunk.color_pars_fragment,
      THREE.ShaderChunk.map_pars_fragment,
      THREE.ShaderChunk.lightmap_pars_fragment,
      THREE.ShaderChunk.envmap_pars_fragment,
      THREE.ShaderChunk.fog_pars_fragment,
      THREE.ShaderChunk.lights_phong_pars_fragment,
      THREE.ShaderChunk.shadowmap_pars_fragment,
      THREE.ShaderChunk.bumpmap_pars_fragment,
      THREE.ShaderChunk.normalmap_pars_fragment,
      THREE.ShaderChunk.specularmap_pars_fragment,
      "void main() {\ngl_FragColor = vec4( vec3 ( 1.0 ), opacity );",
      THREE.ShaderChunk.map_fragment,
      THREE.ShaderChunk.alphatest_fragment,
      THREE.ShaderChunk.specularmap_fragment,
      THREE.ShaderChunk.lights_phong_fragment,
      THREE.ShaderChunk.lightmap_fragment,
      THREE.ShaderChunk.color_fragment,
      THREE.ShaderChunk.envmap_fragment,
      THREE.ShaderChunk.shadowmap_fragment,
      THREE.ShaderChunk.linear_to_gamma_fragment,
      THREE.ShaderChunk.fog_fragment,
      "}",
    ].join("\n"),
  },
  particle_basic: {
    uniforms: THREE.UniformsUtils.merge([
      THREE.UniformsLib.particle,
      THREE.UniformsLib.shadowmap,
    ]),
    vertexShader: [
      "uniform float size;\nuniform float scale;",
      THREE.ShaderChunk.color_pars_vertex,
      THREE.ShaderChunk.shadowmap_pars_vertex,
      "void main() {",
      THREE.ShaderChunk.color_vertex,
      "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n#ifdef USE_SIZEATTENUATION\ngl_PointSize = size * ( scale / length( mvPosition.xyz ) );\n#else\ngl_PointSize = size;\n#endif\ngl_Position = projectionMatrix * mvPosition;",
      THREE.ShaderChunk.worldpos_vertex,
      THREE.ShaderChunk.shadowmap_vertex,
      "}",
    ].join("\n"),
    fragmentShader: [
      "uniform vec3 psColor;\nuniform float opacity;",
      THREE.ShaderChunk.color_pars_fragment,
      THREE.ShaderChunk.map_particle_pars_fragment,
      THREE.ShaderChunk.fog_pars_fragment,
      THREE.ShaderChunk.shadowmap_pars_fragment,
      "void main() {\ngl_FragColor = vec4( psColor, opacity );",
      THREE.ShaderChunk.map_particle_fragment,
      THREE.ShaderChunk.alphatest_fragment,
      THREE.ShaderChunk.color_fragment,
      THREE.ShaderChunk.shadowmap_fragment,
      THREE.ShaderChunk.fog_fragment,
      "}",
    ].join("\n"),
  },
  dashed: {
    uniforms: THREE.UniformsUtils.merge([
      THREE.UniformsLib.common,
      THREE.UniformsLib.fog,
      {
        scale: {
          type: "f",
          value: 1,
        },
        dashSize: {
          type: "f",
          value: 1,
        },
        totalSize: {
          type: "f",
          value: 2,
        },
      },
    ]),
    vertexShader: [
      "uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;",
      THREE.ShaderChunk.color_pars_vertex,
      "void main() {",
      THREE.ShaderChunk.color_vertex,
      "vLineDistance = scale * lineDistance;\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\ngl_Position = projectionMatrix * mvPosition;\n}",
    ].join("\n"),
    fragmentShader: [
      "uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;",
      THREE.ShaderChunk.color_pars_fragment,
      THREE.ShaderChunk.fog_pars_fragment,
      "void main() {\nif ( mod( vLineDistance, totalSize ) > dashSize ) {\ndiscard;\n}\ngl_FragColor = vec4( diffuse, opacity );",
      THREE.ShaderChunk.color_fragment,
      THREE.ShaderChunk.fog_fragment,
      "}",
    ].join("\n"),
  },
  depthRGBA: {
    uniforms: {},
    vertexShader: [
      THREE.ShaderChunk.morphtarget_pars_vertex,
      THREE.ShaderChunk.skinning_pars_vertex,
      "void main() {",
      THREE.ShaderChunk.skinbase_vertex,
      THREE.ShaderChunk.morphtarget_vertex,
      THREE.ShaderChunk.skinning_vertex,
      THREE.ShaderChunk.default_vertex,
      "}",
    ].join("\n"),
    fragmentShader:
      "vec4 pack_depth( const in float depth ) {\nconst vec4 bit_shift = vec4( 256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0 );\nconst vec4 bit_mask  = vec4( 0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0 );\nvec4 res = fract( depth * bit_shift );\nres -= res.xxyz * bit_mask;\nreturn res;\n}\nvoid main() {\ngl_FragData[ 0 ] = pack_depth( gl_FragCoord.z );\n}",
  },
};
THREE.WebGLRenderer = function (a) {
  function b(a) {
    if (a.__webglCustomAttributesList)
      for (var b in a.__webglCustomAttributesList)
        k.deleteBuffer(a.__webglCustomAttributesList[b].buffer);
  }
  function c(a, b) {
    var c = a.vertices.length,
      d = b.material;
    if (d.attributes) {
      void 0 === a.__webglCustomAttributesList &&
        (a.__webglCustomAttributesList = []);
      for (var e in d.attributes) {
        var f = d.attributes[e];
        if (!f.__webglInitialized || f.createUniqueBuffers) {
          f.__webglInitialized = !0;
          var g = 1;
          "v2" === f.type
            ? (g = 2)
            : "v3" === f.type
            ? (g = 3)
            : "v4" === f.type
            ? (g = 4)
            : "c" === f.type && (g = 3);
          f.size = g;
          f.array = new Float32Array(c * g);
          f.buffer = k.createBuffer();
          f.buffer.belongsToAttribute = e;
          f.needsUpdate = !0;
        }
        a.__webglCustomAttributesList.push(f);
      }
    }
  }
  function d(a, b) {
    var c = b.geometry,
      d = a.faces3,
      h = a.faces4,
      i = 3 * d.length + 4 * h.length,
      j = 1 * d.length + 2 * h.length,
      h = 3 * d.length + 4 * h.length,
      d = e(b, a),
      l = g(d),
      n = f(d),
      m = d.vertexColors ? d.vertexColors : !1;
    a.__vertexArray = new Float32Array(3 * i);
    n && (a.__normalArray = new Float32Array(3 * i));
    c.hasTangents && (a.__tangentArray = new Float32Array(4 * i));
    m && (a.__colorArray = new Float32Array(3 * i));
    if (l) {
      if (0 < c.faceUvs.length || 0 < c.faceVertexUvs.length)
        a.__uvArray = new Float32Array(2 * i);
      if (1 < c.faceUvs.length || 1 < c.faceVertexUvs.length)
        a.__uv2Array = new Float32Array(2 * i);
    }
    b.geometry.skinWeights.length &&
      b.geometry.skinIndices.length &&
      ((a.__skinIndexArray = new Float32Array(4 * i)),
      (a.__skinWeightArray = new Float32Array(4 * i)));
    a.__faceArray = new Uint16Array(3 * j);
    a.__lineArray = new Uint16Array(2 * h);
    if (a.numMorphTargets) {
      a.__morphTargetsArrays = [];
      c = 0;
      for (l = a.numMorphTargets; c < l; c++)
        a.__morphTargetsArrays.push(new Float32Array(3 * i));
    }
    if (a.numMorphNormals) {
      a.__morphNormalsArrays = [];
      c = 0;
      for (l = a.numMorphNormals; c < l; c++)
        a.__morphNormalsArrays.push(new Float32Array(3 * i));
    }
    a.__webglFaceCount = 3 * j;
    a.__webglLineCount = 2 * h;
    if (d.attributes) {
      void 0 === a.__webglCustomAttributesList &&
        (a.__webglCustomAttributesList = []);
      for (var o in d.attributes) {
        var j = d.attributes[o],
          c = {},
          p;
        for (p in j) c[p] = j[p];
        if (!c.__webglInitialized || c.createUniqueBuffers)
          (c.__webglInitialized = !0),
            (h = 1),
            "v2" === c.type
              ? (h = 2)
              : "v3" === c.type
              ? (h = 3)
              : "v4" === c.type
              ? (h = 4)
              : "c" === c.type && (h = 3),
            (c.size = h),
            (c.array = new Float32Array(i * h)),
            (c.buffer = k.createBuffer()),
            (c.buffer.belongsToAttribute = o),
            (j.needsUpdate = !0),
            (c.__original = j);
        a.__webglCustomAttributesList.push(c);
      }
    }
    a.__inittedArrays = !0;
  }
  function e(a, b) {
    return a.material instanceof THREE.MeshFaceMaterial
      ? a.material.materials[b.materialIndex]
      : a.material;
  }
  function f(a) {
    return (a instanceof THREE.MeshBasicMaterial && !a.envMap) ||
      a instanceof THREE.MeshDepthMaterial
      ? !1
      : a && void 0 !== a.shading && a.shading === THREE.SmoothShading
      ? THREE.SmoothShading
      : THREE.FlatShading;
  }
  function g(a) {
    return a.map ||
      a.lightMap ||
      a.bumpMap ||
      a.normalMap ||
      a.specularMap ||
      a instanceof THREE.ShaderMaterial
      ? !0
      : !1;
  }
  function h(a) {
    var b, c, d;
    for (b in a.attributes)
      (d = "index" === b ? k.ELEMENT_ARRAY_BUFFER : k.ARRAY_BUFFER),
        (c = a.attributes[b]),
        (c.buffer = k.createBuffer()),
        k.bindBuffer(d, c.buffer),
        k.bufferData(d, c.array, k.STATIC_DRAW);
  }
  function i(a, b, c) {
    var d,
      e,
      f,
      g,
      h = a.vertices;
    g = h.length;
    var i = a.colors,
      j = i.length,
      l = a.__vertexArray,
      n = a.__colorArray,
      m = a.__sortArray,
      o = a.verticesNeedUpdate,
      p = a.colorsNeedUpdate,
      s = a.__webglCustomAttributesList;
    if (c.sortParticles) {
      pb.copy(eb);
      pb.multiplySelf(c.matrixWorld);
      for (d = 0; d < g; d++)
        (e = h[d]), bb.copy(e), pb.multiplyVector3(bb), (m[d] = [bb.z, d]);
      m.sort(function (a, b) {
        return b[0] - a[0];
      });
      for (d = 0; d < g; d++)
        (e = h[m[d][1]]),
          (f = 3 * d),
          (l[f] = e.x),
          (l[f + 1] = e.y),
          (l[f + 2] = e.z);
      for (d = 0; d < j; d++)
        (f = 3 * d),
          (e = i[m[d][1]]),
          (n[f] = e.r),
          (n[f + 1] = e.g),
          (n[f + 2] = e.b);
      if (s) {
        i = 0;
        for (j = s.length; i < j; i++)
          if (((h = s[i]), void 0 === h.boundTo || "vertices" === h.boundTo))
            if (((f = 0), (e = h.value.length), 1 === h.size))
              for (d = 0; d < e; d++) (g = m[d][1]), (h.array[d] = h.value[g]);
            else if (2 === h.size)
              for (d = 0; d < e; d++)
                (g = m[d][1]),
                  (g = h.value[g]),
                  (h.array[f] = g.x),
                  (h.array[f + 1] = g.y),
                  (f += 2);
            else if (3 === h.size)
              if ("c" === h.type)
                for (d = 0; d < e; d++)
                  (g = m[d][1]),
                    (g = h.value[g]),
                    (h.array[f] = g.r),
                    (h.array[f + 1] = g.g),
                    (h.array[f + 2] = g.b),
                    (f += 3);
              else
                for (d = 0; d < e; d++)
                  (g = m[d][1]),
                    (g = h.value[g]),
                    (h.array[f] = g.x),
                    (h.array[f + 1] = g.y),
                    (h.array[f + 2] = g.z),
                    (f += 3);
            else if (4 === h.size)
              for (d = 0; d < e; d++)
                (g = m[d][1]),
                  (g = h.value[g]),
                  (h.array[f] = g.x),
                  (h.array[f + 1] = g.y),
                  (h.array[f + 2] = g.z),
                  (h.array[f + 3] = g.w),
                  (f += 4);
      }
    } else {
      if (o)
        for (d = 0; d < g; d++)
          (e = h[d]),
            (f = 3 * d),
            (l[f] = e.x),
            (l[f + 1] = e.y),
            (l[f + 2] = e.z);
      if (p)
        for (d = 0; d < j; d++)
          (e = i[d]),
            (f = 3 * d),
            (n[f] = e.r),
            (n[f + 1] = e.g),
            (n[f + 2] = e.b);
      if (s) {
        i = 0;
        for (j = s.length; i < j; i++)
          if (
            ((h = s[i]),
            h.needsUpdate && (void 0 === h.boundTo || "vertices" === h.boundTo))
          )
            if (((e = h.value.length), (f = 0), 1 === h.size))
              for (d = 0; d < e; d++) h.array[d] = h.value[d];
            else if (2 === h.size)
              for (d = 0; d < e; d++)
                (g = h.value[d]),
                  (h.array[f] = g.x),
                  (h.array[f + 1] = g.y),
                  (f += 2);
            else if (3 === h.size)
              if ("c" === h.type)
                for (d = 0; d < e; d++)
                  (g = h.value[d]),
                    (h.array[f] = g.r),
                    (h.array[f + 1] = g.g),
                    (h.array[f + 2] = g.b),
                    (f += 3);
              else
                for (d = 0; d < e; d++)
                  (g = h.value[d]),
                    (h.array[f] = g.x),
                    (h.array[f + 1] = g.y),
                    (h.array[f + 2] = g.z),
                    (f += 3);
            else if (4 === h.size)
              for (d = 0; d < e; d++)
                (g = h.value[d]),
                  (h.array[f] = g.x),
                  (h.array[f + 1] = g.y),
                  (h.array[f + 2] = g.z),
                  (h.array[f + 3] = g.w),
                  (f += 4);
      }
    }
    if (o || c.sortParticles)
      k.bindBuffer(k.ARRAY_BUFFER, a.__webglVertexBuffer),
        k.bufferData(k.ARRAY_BUFFER, l, b);
    if (p || c.sortParticles)
      k.bindBuffer(k.ARRAY_BUFFER, a.__webglColorBuffer),
        k.bufferData(k.ARRAY_BUFFER, n, b);
    if (s) {
      i = 0;
      for (j = s.length; i < j; i++)
        if (((h = s[i]), h.needsUpdate || c.sortParticles))
          k.bindBuffer(k.ARRAY_BUFFER, h.buffer),
            k.bufferData(k.ARRAY_BUFFER, h.array, b);
    }
  }
  function j(a, b, c) {
    var d = a.attributes,
      e = d.index,
      f = d.position,
      g = d.normal,
      h = d.uv,
      i = d.color,
      d = d.tangent;
    a.elementsNeedUpdate &&
      void 0 !== e &&
      (k.bindBuffer(k.ELEMENT_ARRAY_BUFFER, e.buffer),
      k.bufferData(k.ELEMENT_ARRAY_BUFFER, e.array, b));
    a.verticesNeedUpdate &&
      void 0 !== f &&
      (k.bindBuffer(k.ARRAY_BUFFER, f.buffer),
      k.bufferData(k.ARRAY_BUFFER, f.array, b));
    a.normalsNeedUpdate &&
      void 0 !== g &&
      (k.bindBuffer(k.ARRAY_BUFFER, g.buffer),
      k.bufferData(k.ARRAY_BUFFER, g.array, b));
    a.uvsNeedUpdate &&
      void 0 !== h &&
      (k.bindBuffer(k.ARRAY_BUFFER, h.buffer),
      k.bufferData(k.ARRAY_BUFFER, h.array, b));
    a.colorsNeedUpdate &&
      void 0 !== i &&
      (k.bindBuffer(k.ARRAY_BUFFER, i.buffer),
      k.bufferData(k.ARRAY_BUFFER, i.array, b));
    a.tangentsNeedUpdate &&
      void 0 !== d &&
      (k.bindBuffer(k.ARRAY_BUFFER, d.buffer),
      k.bufferData(k.ARRAY_BUFFER, d.array, b));
    if (c) for (var j in a.attributes) delete a.attributes[j].array;
  }
  function l(a, b) {
    return a.z !== b.z ? b.z - a.z : b.id - a.id;
  }
  function m(a, b) {
    return b[1] - a[1];
  }
  function n(a, b, c) {
    if (a.length)
      for (var d = 0, e = a.length; d < e; d++)
        (aa = fa = null),
          (Y = ba = Ja = Na = ob = ib = ma = -1),
          (mb = !0),
          a[d].render(b, c, lb, ab),
          (aa = fa = null),
          (Y = ba = Ja = Na = ob = ib = ma = -1),
          (mb = !0);
  }
  function p(a, b, c, d, e, f, g, h) {
    var i, k, j, l;
    b ? ((k = a.length - 1), (l = b = -1)) : ((k = 0), (b = a.length), (l = 1));
    for (var n = k; n !== b; n += l)
      if (((i = a[n]), i.render)) {
        k = i.object;
        j = i.buffer;
        if (h) i = h;
        else {
          i = i[c];
          if (!i) continue;
          g &&
            L.setBlending(i.blending, i.blendEquation, i.blendSrc, i.blendDst);
          L.setDepthTest(i.depthTest);
          L.setDepthWrite(i.depthWrite);
          D(i.polygonOffset, i.polygonOffsetFactor, i.polygonOffsetUnits);
        }
        L.setMaterialFaces(i);
        j instanceof THREE.BufferGeometry
          ? L.renderBufferDirect(d, e, f, i, j, k)
          : L.renderBuffer(d, e, f, i, j, k);
      }
  }
  function o(a, b, c, d, e, f, g) {
    for (var h, i, k = 0, j = a.length; k < j; k++)
      if (((h = a[k]), (i = h.object), i.visible)) {
        if (g) h = g;
        else {
          h = h[b];
          if (!h) continue;
          f &&
            L.setBlending(h.blending, h.blendEquation, h.blendSrc, h.blendDst);
          L.setDepthTest(h.depthTest);
          L.setDepthWrite(h.depthWrite);
          D(h.polygonOffset, h.polygonOffsetFactor, h.polygonOffsetUnits);
        }
        L.renderImmediateObject(c, d, e, h, i);
      }
  }
  function s(a, b, c) {
    a.push({
      buffer: b,
      object: c,
      opaque: null,
      transparent: null,
    });
  }
  function t(a) {
    for (var b in a.attributes) if (a.attributes[b].needsUpdate) return !0;
    return !1;
  }
  function r(a) {
    for (var b in a.attributes) a.attributes[b].needsUpdate = !1;
  }
  function z(a, b) {
    for (var c = a.length - 1; 0 <= c; c--) a[c].object === b && a.splice(c, 1);
  }
  function w(a, b) {
    for (var c = a.length - 1; 0 <= c; c--) a[c] === b && a.splice(c, 1);
  }
  function q(a, b, c, d, e) {
    Aa = 0;
    d.needsUpdate &&
      (d.program && L.deallocateMaterial(d),
      L.initMaterial(d, b, c, e),
      (d.needsUpdate = !1));
    d.morphTargets &&
      !e.__webglMorphTargetInfluences &&
      (e.__webglMorphTargetInfluences = new Float32Array(L.maxMorphTargets));
    var f = !1,
      g = d.program,
      h = g.uniforms,
      i = d.uniforms;
    g !== fa && (k.useProgram(g), (fa = g), (f = !0));
    d.id !== Y && ((Y = d.id), (f = !0));
    if (f || a !== aa)
      k.uniformMatrix4fv(h.projectionMatrix, !1, a._projectionMatrixArray),
        a !== aa && (aa = a);
    if (d.skinning)
      if (hc && e.useVertexTexture) {
        if (null !== h.boneTexture) {
          var j = E();
          k.uniform1i(h.boneTexture, j);
          L.setTexture(e.boneTexture, j);
        }
      } else
        null !== h.boneGlobalMatrices &&
          k.uniformMatrix4fv(h.boneGlobalMatrices, !1, e.boneMatrices);
    if (f) {
      c &&
        d.fog &&
        ((i.fogColor.value = c.color),
        c instanceof THREE.Fog
          ? ((i.fogNear.value = c.near), (i.fogFar.value = c.far))
          : c instanceof THREE.FogExp2 && (i.fogDensity.value = c.density));
      if (
        d instanceof THREE.MeshPhongMaterial ||
        d instanceof THREE.MeshLambertMaterial ||
        d.lights
      ) {
        if (mb) {
          for (
            var l = 0,
              n = 0,
              m = 0,
              o,
              p,
              s,
              r = sb,
              q = r.directional.colors,
              t = r.directional.positions,
              w = r.point.colors,
              z = r.point.positions,
              A = r.point.distances,
              B = r.spot.colors,
              C = r.spot.positions,
              D = r.spot.distances,
              G = r.spot.directions,
              X = r.spot.anglesCos,
              J = r.spot.exponents,
              K = r.hemi.skyColors,
              Q = r.hemi.groundColors,
              M = r.hemi.positions,
              O = 0,
              ca = 0,
              N = 0,
              R = 0,
              ia = 0,
              Z = 0,
              ba = 0,
              ga = 0,
              qa = (p = 0),
              c = (qa = qa = 0),
              f = b.length;
            c < f;
            c++
          )
            (j = b[c]),
              j.onlyShadow ||
                ((o = j.color),
                (s = j.intensity),
                (p = j.distance),
                j instanceof THREE.AmbientLight
                  ? j.visible &&
                    (L.gammaInput
                      ? ((l += o.r * o.r), (n += o.g * o.g), (m += o.b * o.b))
                      : ((l += o.r), (n += o.g), (m += o.b)))
                  : j instanceof THREE.DirectionalLight
                  ? ((ia += 1),
                    j.visible &&
                      ((p = 3 * O),
                      L.gammaInput ? v(q, p, o, s * s) : u(q, p, o, s),
                      xa.copy(j.matrixWorld.getPosition()),
                      xa.subSelf(j.target.matrixWorld.getPosition()),
                      xa.normalize(),
                      (t[p] = xa.x),
                      (t[p + 1] = xa.y),
                      (t[p + 2] = xa.z),
                      (O += 1)))
                  : j instanceof THREE.PointLight
                  ? ((Z += 1),
                    j.visible &&
                      ((qa = 3 * ca),
                      L.gammaInput ? v(w, qa, o, s * s) : u(w, qa, o, s),
                      (s = j.matrixWorld.getPosition()),
                      (z[qa] = s.x),
                      (z[qa + 1] = s.y),
                      (z[qa + 2] = s.z),
                      (A[ca] = p),
                      (ca += 1)))
                  : j instanceof THREE.SpotLight
                  ? ((ba += 1),
                    j.visible &&
                      ((qa = 3 * N),
                      L.gammaInput ? v(B, qa, o, s * s) : u(B, qa, o, s),
                      (s = j.matrixWorld.getPosition()),
                      (C[qa] = s.x),
                      (C[qa + 1] = s.y),
                      (C[qa + 2] = s.z),
                      (D[N] = p),
                      xa.copy(s),
                      xa.subSelf(j.target.matrixWorld.getPosition()),
                      xa.normalize(),
                      (G[qa] = xa.x),
                      (G[qa + 1] = xa.y),
                      (G[qa + 2] = xa.z),
                      (X[N] = Math.cos(j.angle)),
                      (J[N] = j.exponent),
                      (N += 1)))
                  : j instanceof THREE.HemisphereLight &&
                    ((ga += 1),
                    j.visible &&
                      ((o = j.color),
                      (p = j.groundColor),
                      (qa = 3 * R),
                      L.gammaInput
                        ? ((s *= s), v(K, qa, o, s), v(Q, qa, p, s))
                        : (u(K, qa, o, s), u(Q, qa, p, s)),
                      xa.copy(j.matrixWorld.getPosition()),
                      xa.normalize(),
                      (M[qa] = xa.x),
                      (M[qa + 1] = xa.y),
                      (M[qa + 2] = xa.z),
                      (R += 1))));
          c = 3 * O;
          for (f = Math.max(q.length, 3 * ia); c < f; c++) q[c] = 0;
          c = 3 * O;
          for (f = Math.max(t.length, 3 * ia); c < f; c++) t[c] = 0;
          c = 3 * ca;
          for (f = Math.max(w.length, 3 * Z); c < f; c++) w[c] = 0;
          c = 3 * ca;
          for (f = Math.max(z.length, 3 * Z); c < f; c++) z[c] = 0;
          c = ca;
          for (f = Math.max(A.length, Z); c < f; c++) A[c] = 0;
          c = 3 * N;
          for (f = Math.max(B.length, 3 * ba); c < f; c++) B[c] = 0;
          c = 3 * N;
          for (f = Math.max(C.length, 3 * ba); c < f; c++) C[c] = 0;
          c = 3 * N;
          for (f = Math.max(G.length, 3 * ba); c < f; c++) G[c] = 0;
          c = N;
          for (f = Math.max(X.length, ba); c < f; c++) X[c] = 0;
          c = N;
          for (f = Math.max(J.length, ba); c < f; c++) J[c] = 0;
          c = N;
          for (f = Math.max(D.length, ba); c < f; c++) D[c] = 0;
          c = 3 * R;
          for (f = Math.max(K.length, 3 * ga); c < f; c++) K[c] = 0;
          c = 3 * R;
          for (f = Math.max(Q.length, 3 * ga); c < f; c++) Q[c] = 0;
          c = 3 * R;
          for (f = Math.max(M.length, 3 * ga); c < f; c++) M[c] = 0;
          r.directional.length = O;
          r.point.length = ca;
          r.spot.length = N;
          r.hemi.length = R;
          r.ambient[0] = l;
          r.ambient[1] = n;
          r.ambient[2] = m;
          mb = !1;
        }
        c = sb;
        i.ambientLightColor.value = c.ambient;
        i.directionalLightColor.value = c.directional.colors;
        i.directionalLightDirection.value = c.directional.positions;
        i.pointLightColor.value = c.point.colors;
        i.pointLightPosition.value = c.point.positions;
        i.pointLightDistance.value = c.point.distances;
        i.spotLightColor.value = c.spot.colors;
        i.spotLightPosition.value = c.spot.positions;
        i.spotLightDistance.value = c.spot.distances;
        i.spotLightDirection.value = c.spot.directions;
        i.spotLightAngleCos.value = c.spot.anglesCos;
        i.spotLightExponent.value = c.spot.exponents;
        i.hemisphereLightSkyColor.value = c.hemi.skyColors;
        i.hemisphereLightGroundColor.value = c.hemi.groundColors;
        i.hemisphereLightDirection.value = c.hemi.positions;
      }
      if (
        d instanceof THREE.MeshBasicMaterial ||
        d instanceof THREE.MeshLambertMaterial ||
        d instanceof THREE.MeshPhongMaterial
      ) {
        i.opacity.value = d.opacity;
        L.gammaInput
          ? i.diffuse.value.copyGammaToLinear(d.color)
          : (i.diffuse.value = d.color);
        i.map.value = d.map;
        i.lightMap.value = d.lightMap;
        i.specularMap.value = d.specularMap;
        d.bumpMap &&
          ((i.bumpMap.value = d.bumpMap), (i.bumpScale.value = d.bumpScale));
        d.normalMap &&
          ((i.normalMap.value = d.normalMap),
          i.normalScale.value.copy(d.normalScale));
        var T;
        d.map
          ? (T = d.map)
          : d.specularMap
          ? (T = d.specularMap)
          : d.normalMap
          ? (T = d.normalMap)
          : d.bumpMap && (T = d.bumpMap);
        void 0 !== T &&
          ((c = T.offset),
          (T = T.repeat),
          i.offsetRepeat.value.set(c.x, c.y, T.x, T.y));
        i.envMap.value = d.envMap;
        i.flipEnvMap.value =
          d.envMap instanceof THREE.WebGLRenderTargetCube ? 1 : -1;
        i.reflectivity.value = d.reflectivity;
        i.refractionRatio.value = d.refractionRatio;
        i.combine.value = d.combine;
        i.useRefract.value =
          d.envMap && d.envMap.mapping instanceof THREE.CubeRefractionMapping;
      }
      d instanceof THREE.LineBasicMaterial
        ? ((i.diffuse.value = d.color), (i.opacity.value = d.opacity))
        : d instanceof THREE.LineDashedMaterial
        ? ((i.diffuse.value = d.color),
          (i.opacity.value = d.opacity),
          (i.dashSize.value = d.dashSize),
          (i.totalSize.value = d.dashSize + d.gapSize),
          (i.scale.value = d.scale))
        : d instanceof THREE.ParticleBasicMaterial
        ? ((i.psColor.value = d.color),
          (i.opacity.value = d.opacity),
          (i.size.value = d.size),
          (i.scale.value = I.height / 2),
          (i.map.value = d.map))
        : d instanceof THREE.MeshPhongMaterial
        ? ((i.shininess.value = d.shininess),
          L.gammaInput
            ? (i.ambient.value.copyGammaToLinear(d.ambient),
              i.emissive.value.copyGammaToLinear(d.emissive),
              i.specular.value.copyGammaToLinear(d.specular))
            : ((i.ambient.value = d.ambient),
              (i.emissive.value = d.emissive),
              (i.specular.value = d.specular)),
          d.wrapAround && i.wrapRGB.value.copy(d.wrapRGB))
        : d instanceof THREE.MeshLambertMaterial
        ? (L.gammaInput
            ? (i.ambient.value.copyGammaToLinear(d.ambient),
              i.emissive.value.copyGammaToLinear(d.emissive))
            : ((i.ambient.value = d.ambient), (i.emissive.value = d.emissive)),
          d.wrapAround && i.wrapRGB.value.copy(d.wrapRGB))
        : d instanceof THREE.MeshDepthMaterial
        ? ((i.mNear.value = a.near),
          (i.mFar.value = a.far),
          (i.opacity.value = d.opacity))
        : d instanceof THREE.MeshNormalMaterial &&
          (i.opacity.value = d.opacity);
      if (e.receiveShadow && !d._shadowPass && i.shadowMatrix) {
        c = T = 0;
        for (f = b.length; c < f; c++)
          if (
            ((j = b[c]),
            j.castShadow &&
              (j instanceof THREE.SpotLight ||
                (j instanceof THREE.DirectionalLight && !j.shadowCascade)))
          )
            (i.shadowMap.value[T] = j.shadowMap),
              (i.shadowMapSize.value[T] = j.shadowMapSize),
              (i.shadowMatrix.value[T] = j.shadowMatrix),
              (i.shadowDarkness.value[T] = j.shadowDarkness),
              (i.shadowBias.value[T] = j.shadowBias),
              T++;
      }
      b = d.uniformsList;
      i = 0;
      for (T = b.length; i < T; i++)
        if ((f = g.uniforms[b[i][1]]))
          if (((c = b[i][0]), (l = c.type), (j = c.value), "i" === l))
            k.uniform1i(f, j);
          else if ("f" === l) k.uniform1f(f, j);
          else if ("v2" === l) k.uniform2f(f, j.x, j.y);
          else if ("v3" === l) k.uniform3f(f, j.x, j.y, j.z);
          else if ("v4" === l) k.uniform4f(f, j.x, j.y, j.z, j.w);
          else if ("c" === l) k.uniform3f(f, j.r, j.g, j.b);
          else if ("iv1" === l) k.uniform1iv(f, j);
          else if ("iv" === l) k.uniform3iv(f, j);
          else if ("fv1" === l) k.uniform1fv(f, j);
          else if ("fv" === l) k.uniform3fv(f, j);
          else if ("v2v" === l) {
            void 0 === c._array && (c._array = new Float32Array(2 * j.length));
            l = 0;
            for (n = j.length; l < n; l++)
              (m = 2 * l), (c._array[m] = j[l].x), (c._array[m + 1] = j[l].y);
            k.uniform2fv(f, c._array);
          } else if ("v3v" === l) {
            void 0 === c._array && (c._array = new Float32Array(3 * j.length));
            l = 0;
            for (n = j.length; l < n; l++)
              (m = 3 * l),
                (c._array[m] = j[l].x),
                (c._array[m + 1] = j[l].y),
                (c._array[m + 2] = j[l].z);
            k.uniform3fv(f, c._array);
          } else if ("v4v" === l) {
            void 0 === c._array && (c._array = new Float32Array(4 * j.length));
            l = 0;
            for (n = j.length; l < n; l++)
              (m = 4 * l),
                (c._array[m] = j[l].x),
                (c._array[m + 1] = j[l].y),
                (c._array[m + 2] = j[l].z),
                (c._array[m + 3] = j[l].w);
            k.uniform4fv(f, c._array);
          } else if ("m4" === l)
            void 0 === c._array && (c._array = new Float32Array(16)),
              j.flattenToArray(c._array),
              k.uniformMatrix4fv(f, !1, c._array);
          else if ("m4v" === l) {
            void 0 === c._array && (c._array = new Float32Array(16 * j.length));
            l = 0;
            for (n = j.length; l < n; l++)
              j[l].flattenToArrayOffset(c._array, 16 * l);
            k.uniformMatrix4fv(f, !1, c._array);
          } else if ("t" === l) {
            if (((m = j), (j = E()), k.uniform1i(f, j), m))
              if (m.image instanceof Array && 6 === m.image.length) {
                if (((c = m), (f = j), 6 === c.image.length))
                  if (c.needsUpdate) {
                    c.image.__webglTextureCube ||
                      (c.image.__webglTextureCube = k.createTexture());
                    k.activeTexture(k.TEXTURE0 + f);
                    k.bindTexture(
                      k.TEXTURE_CUBE_MAP,
                      c.image.__webglTextureCube
                    );
                    k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL, c.flipY);
                    f = c instanceof THREE.CompressedTexture;
                    j = [];
                    for (l = 0; 6 > l; l++)
                      L.autoScaleCubemaps && !f
                        ? ((n = j),
                          (m = l),
                          (r = c.image[l]),
                          (t = Qc),
                          (r.width <= t && r.height <= t) ||
                            ((w = Math.max(r.width, r.height)),
                            (q = Math.floor((r.width * t) / w)),
                            (t = Math.floor((r.height * t) / w)),
                            (w = document.createElement("canvas")),
                            (w.width = q),
                            (w.height = t),
                            w
                              .getContext("2d")
                              .drawImage(
                                r,
                                0,
                                0,
                                r.width,
                                r.height,
                                0,
                                0,
                                q,
                                t
                              ),
                            (r = w)),
                          (n[m] = r))
                        : (j[l] = c.image[l]);
                    l = j[0];
                    n =
                      0 === (l.width & (l.width - 1)) &&
                      0 === (l.height & (l.height - 1));
                    m = H(c.format);
                    r = H(c.type);
                    P(k.TEXTURE_CUBE_MAP, c, n);
                    for (l = 0; 6 > l; l++)
                      if (f) {
                        t = j[l].mipmaps;
                        w = 0;
                        for (z = t.length; w < z; w++)
                          (q = t[w]),
                            k.compressedTexImage2D(
                              k.TEXTURE_CUBE_MAP_POSITIVE_X + l,
                              w,
                              m,
                              q.width,
                              q.height,
                              0,
                              q.data
                            );
                      } else
                        k.texImage2D(
                          k.TEXTURE_CUBE_MAP_POSITIVE_X + l,
                          0,
                          m,
                          m,
                          r,
                          j[l]
                        );
                    c.generateMipmaps &&
                      n &&
                      k.generateMipmap(k.TEXTURE_CUBE_MAP);
                    c.needsUpdate = !1;
                    if (c.onUpdate) c.onUpdate();
                  } else
                    k.activeTexture(k.TEXTURE0 + f),
                      k.bindTexture(
                        k.TEXTURE_CUBE_MAP,
                        c.image.__webglTextureCube
                      );
              } else
                m instanceof THREE.WebGLRenderTargetCube
                  ? ((c = m),
                    k.activeTexture(k.TEXTURE0 + j),
                    k.bindTexture(k.TEXTURE_CUBE_MAP, c.__webglTexture))
                  : L.setTexture(m, j);
          } else if ("tv" === l) {
            void 0 === c._array && (c._array = []);
            l = 0;
            for (n = c.value.length; l < n; l++) c._array[l] = E();
            k.uniform1iv(f, c._array);
            l = 0;
            for (n = c.value.length; l < n; l++)
              (m = c.value[l]), (j = c._array[l]), m && L.setTexture(m, j);
          }
      if (
        (d instanceof THREE.ShaderMaterial ||
          d instanceof THREE.MeshPhongMaterial ||
          d.envMap) &&
        null !== h.cameraPosition
      )
        (b = a.matrixWorld.getPosition()),
          k.uniform3f(h.cameraPosition, b.x, b.y, b.z);
      (d instanceof THREE.MeshPhongMaterial ||
        d instanceof THREE.MeshLambertMaterial ||
        d instanceof THREE.ShaderMaterial ||
        d.skinning) &&
        null !== h.viewMatrix &&
        k.uniformMatrix4fv(h.viewMatrix, !1, a._viewMatrixArray);
    }
    k.uniformMatrix4fv(h.modelViewMatrix, !1, e._modelViewMatrix.elements);
    h.normalMatrix &&
      k.uniformMatrix3fv(h.normalMatrix, !1, e._normalMatrix.elements);
    null !== h.modelMatrix &&
      k.uniformMatrix4fv(h.modelMatrix, !1, e.matrixWorld.elements);
    return g;
  }
  function E() {
    var a = Aa;
    a >= xc &&
      console.warn(
        "Trying to use " +
          a +
          " texture units while this GPU supports only " +
          xc
      );
    Aa += 1;
    return a;
  }
  function A(a, b) {
    a._modelViewMatrix.multiply(b.matrixWorldInverse, a.matrixWorld);
    a._normalMatrix.getInverse(a._modelViewMatrix);
    a._normalMatrix.transpose();
  }
  function v(a, b, c, d) {
    a[b] = c.r * c.r * d;
    a[b + 1] = c.g * c.g * d;
    a[b + 2] = c.b * c.b * d;
  }
  function u(a, b, c, d) {
    a[b] = c.r * d;
    a[b + 1] = c.g * d;
    a[b + 2] = c.b * d;
  }
  function D(a, b, c) {
    jb !== a &&
      (a ? k.enable(k.POLYGON_OFFSET_FILL) : k.disable(k.POLYGON_OFFSET_FILL),
      (jb = a));
    if (a && (Bb !== b || Cb !== c)) k.polygonOffset(b, c), (Bb = b), (Cb = c);
  }
  function C(a) {
    for (var a = a.split("\n"), b = 0, c = a.length; b < c; b++)
      a[b] = b + 1 + ": " + a[b];
    return a.join("\n");
  }
  function G(a, b) {
    var c;
    "fragment" === a
      ? (c = k.createShader(k.FRAGMENT_SHADER))
      : "vertex" === a && (c = k.createShader(k.VERTEX_SHADER));
    k.shaderSource(c, b);
    k.compileShader(c);
    return !k.getShaderParameter(c, k.COMPILE_STATUS)
      ? (console.error(k.getShaderInfoLog(c)), console.error(C(b)), null)
      : c;
  }
  function P(a, b, c) {
    c
      ? (k.texParameteri(a, k.TEXTURE_WRAP_S, H(b.wrapS)),
        k.texParameteri(a, k.TEXTURE_WRAP_T, H(b.wrapT)),
        k.texParameteri(a, k.TEXTURE_MAG_FILTER, H(b.magFilter)),
        k.texParameteri(a, k.TEXTURE_MIN_FILTER, H(b.minFilter)))
      : (k.texParameteri(a, k.TEXTURE_WRAP_S, k.CLAMP_TO_EDGE),
        k.texParameteri(a, k.TEXTURE_WRAP_T, k.CLAMP_TO_EDGE),
        k.texParameteri(a, k.TEXTURE_MAG_FILTER, K(b.magFilter)),
        k.texParameteri(a, k.TEXTURE_MIN_FILTER, K(b.minFilter)));
    if (
      zb &&
      b.type !== THREE.FloatType &&
      (1 < b.anisotropy || b.__oldAnisotropy)
    )
      k.texParameterf(
        a,
        zb.TEXTURE_MAX_ANISOTROPY_EXT,
        Math.min(b.anisotropy, oc)
      ),
        (b.__oldAnisotropy = b.anisotropy);
  }
  function B(a, b) {
    k.bindRenderbuffer(k.RENDERBUFFER, a);
    b.depthBuffer && !b.stencilBuffer
      ? (k.renderbufferStorage(
          k.RENDERBUFFER,
          k.DEPTH_COMPONENT16,
          b.width,
          b.height
        ),
        k.framebufferRenderbuffer(
          k.FRAMEBUFFER,
          k.DEPTH_ATTACHMENT,
          k.RENDERBUFFER,
          a
        ))
      : b.depthBuffer && b.stencilBuffer
      ? (k.renderbufferStorage(
          k.RENDERBUFFER,
          k.DEPTH_STENCIL,
          b.width,
          b.height
        ),
        k.framebufferRenderbuffer(
          k.FRAMEBUFFER,
          k.DEPTH_STENCIL_ATTACHMENT,
          k.RENDERBUFFER,
          a
        ))
      : k.renderbufferStorage(k.RENDERBUFFER, k.RGBA4, b.width, b.height);
  }
  function K(a) {
    return a === THREE.NearestFilter ||
      a === THREE.NearestMipMapNearestFilter ||
      a === THREE.NearestMipMapLinearFilter
      ? k.NEAREST
      : k.LINEAR;
  }
  function H(a) {
    if (a === THREE.RepeatWrapping) return k.REPEAT;
    if (a === THREE.ClampToEdgeWrapping) return k.CLAMP_TO_EDGE;
    if (a === THREE.MirroredRepeatWrapping) return k.MIRRORED_REPEAT;
    if (a === THREE.NearestFilter) return k.NEAREST;
    if (a === THREE.NearestMipMapNearestFilter) return k.NEAREST_MIPMAP_NEAREST;
    if (a === THREE.NearestMipMapLinearFilter) return k.NEAREST_MIPMAP_LINEAR;
    if (a === THREE.LinearFilter) return k.LINEAR;
    if (a === THREE.LinearMipMapNearestFilter) return k.LINEAR_MIPMAP_NEAREST;
    if (a === THREE.LinearMipMapLinearFilter) return k.LINEAR_MIPMAP_LINEAR;
    if (a === THREE.UnsignedByteType) return k.UNSIGNED_BYTE;
    if (a === THREE.UnsignedShort4444Type) return k.UNSIGNED_SHORT_4_4_4_4;
    if (a === THREE.UnsignedShort5551Type) return k.UNSIGNED_SHORT_5_5_5_1;
    if (a === THREE.UnsignedShort565Type) return k.UNSIGNED_SHORT_5_6_5;
    if (a === THREE.ByteType) return k.BYTE;
    if (a === THREE.ShortType) return k.SHORT;
    if (a === THREE.UnsignedShortType) return k.UNSIGNED_SHORT;
    if (a === THREE.IntType) return k.INT;
    if (a === THREE.UnsignedIntType) return k.UNSIGNED_INT;
    if (a === THREE.FloatType) return k.FLOAT;
    if (a === THREE.AlphaFormat) return k.ALPHA;
    if (a === THREE.RGBFormat) return k.RGB;
    if (a === THREE.RGBAFormat) return k.RGBA;
    if (a === THREE.LuminanceFormat) return k.LUMINANCE;
    if (a === THREE.LuminanceAlphaFormat) return k.LUMINANCE_ALPHA;
    if (a === THREE.AddEquation) return k.FUNC_ADD;
    if (a === THREE.SubtractEquation) return k.FUNC_SUBTRACT;
    if (a === THREE.ReverseSubtractEquation) return k.FUNC_REVERSE_SUBTRACT;
    if (a === THREE.ZeroFactor) return k.ZERO;
    if (a === THREE.OneFactor) return k.ONE;
    if (a === THREE.SrcColorFactor) return k.SRC_COLOR;
    if (a === THREE.OneMinusSrcColorFactor) return k.ONE_MINUS_SRC_COLOR;
    if (a === THREE.SrcAlphaFactor) return k.SRC_ALPHA;
    if (a === THREE.OneMinusSrcAlphaFactor) return k.ONE_MINUS_SRC_ALPHA;
    if (a === THREE.DstAlphaFactor) return k.DST_ALPHA;
    if (a === THREE.OneMinusDstAlphaFactor) return k.ONE_MINUS_DST_ALPHA;
    if (a === THREE.DstColorFactor) return k.DST_COLOR;
    if (a === THREE.OneMinusDstColorFactor) return k.ONE_MINUS_DST_COLOR;
    if (a === THREE.SrcAlphaSaturateFactor) return k.SRC_ALPHA_SATURATE;
    if (void 0 !== qb) {
      if (a === THREE.RGB_S3TC_DXT1_Format)
        return qb.COMPRESSED_RGB_S3TC_DXT1_EXT;
      if (a === THREE.RGBA_S3TC_DXT1_Format)
        return qb.COMPRESSED_RGBA_S3TC_DXT1_EXT;
      if (a === THREE.RGBA_S3TC_DXT3_Format)
        return qb.COMPRESSED_RGBA_S3TC_DXT3_EXT;
      if (a === THREE.RGBA_S3TC_DXT5_Format)
        return qb.COMPRESSED_RGBA_S3TC_DXT5_EXT;
    }
    return 0;
  }
  console.log("THREE.WebGLRenderer", THREE.REVISION);
  var a = a || {},
    I = void 0 !== a.canvas ? a.canvas : document.createElement("canvas"),
    N = void 0 !== a.precision ? a.precision : "highp",
    O = void 0 !== a.alpha ? a.alpha : !0,
    R = void 0 !== a.premultipliedAlpha ? a.premultipliedAlpha : !0,
    ga = void 0 !== a.antialias ? a.antialias : !1,
    M = void 0 !== a.stencil ? a.stencil : !0,
    J = void 0 !== a.preserveDrawingBuffer ? a.preserveDrawingBuffer : !1,
    Q =
      void 0 !== a.clearColor
        ? new THREE.Color(a.clearColor)
        : new THREE.Color(0),
    Z = void 0 !== a.clearAlpha ? a.clearAlpha : 0;
  this.domElement = I;
  this.context = null;
  this.autoUpdateScene =
    this.autoUpdateObjects =
    this.sortObjects =
    this.autoClearStencil =
    this.autoClearDepth =
    this.autoClearColor =
    this.autoClear =
      !0;
  this.shadowMapEnabled =
    this.physicallyBasedShading =
    this.gammaOutput =
    this.gammaInput =
      !1;
  this.shadowMapCullFrontFaces =
    this.shadowMapSoft =
    this.shadowMapAutoUpdate =
      !0;
  this.shadowMapCascade = this.shadowMapDebug = !1;
  this.maxMorphTargets = 8;
  this.maxMorphNormals = 4;
  this.autoScaleCubemaps = !0;
  this.renderPluginsPre = [];
  this.renderPluginsPost = [];
  this.info = {
    memory: {
      programs: 0,
      geometries: 0,
      textures: 0,
    },
    render: {
      calls: 0,
      vertices: 0,
      faces: 0,
      points: 0,
    },
  };
  var L = this,
    oa = [],
    X = 0,
    fa = null,
    ca = null,
    Y = -1,
    ba = null,
    aa = null,
    ia = 0,
    Aa = 0,
    Na = -1,
    Ja = -1,
    ma = -1,
    sa = -1,
    Ea = -1,
    rb = -1,
    ib = -1,
    ob = -1,
    jb = null,
    Bb = null,
    Cb = null,
    Wa = null,
    Sa = 0,
    Ka = 0,
    kb = 0,
    Oa = 0,
    lb = 0,
    ab = 0,
    va = new THREE.Frustum(),
    eb = new THREE.Matrix4(),
    pb = new THREE.Matrix4(),
    bb = new THREE.Vector4(),
    xa = new THREE.Vector3(),
    mb = !0,
    sb = {
      ambient: [0, 0, 0],
      directional: {
        length: 0,
        colors: [],
        positions: [],
      },
      point: {
        length: 0,
        colors: [],
        positions: [],
        distances: [],
      },
      spot: {
        length: 0,
        colors: [],
        positions: [],
        distances: [],
        directions: [],
        anglesCos: [],
        exponents: [],
      },
      hemi: {
        length: 0,
        skyColors: [],
        groundColors: [],
        positions: [],
      },
    },
    k,
    zb,
    qb;
  try {
    if (
      !(k = I.getContext("experimental-webgl", {
        alpha: O,
        premultipliedAlpha: R,
        antialias: ga,
        stencil: M,
        preserveDrawingBuffer: J,
      }))
    )
      throw "Error creating WebGL context.";
  } catch (Pc) {
    console.error(Pc);
  }
  a = k.getExtension("OES_texture_float");
  O = k.getExtension("OES_standard_derivatives");
  zb =
    k.getExtension("EXT_texture_filter_anisotropic") ||
    k.getExtension("MOZ_EXT_texture_filter_anisotropic") ||
    k.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
  qb =
    k.getExtension("WEBGL_compressed_texture_s3tc") ||
    k.getExtension("MOZ_WEBGL_compressed_texture_s3tc") ||
    k.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
  a || console.log("THREE.WebGLRenderer: Float textures not supported.");
  O || console.log("THREE.WebGLRenderer: Standard derivatives not supported.");
  zb ||
    console.log(
      "THREE.WebGLRenderer: Anisotropic texture filtering not supported."
    );
  qb ||
    console.log("THREE.WebGLRenderer: S3TC compressed textures not supported.");
  k.clearColor(0, 0, 0, 1);
  k.clearDepth(1);
  k.clearStencil(0);
  k.enable(k.DEPTH_TEST);
  k.depthFunc(k.LEQUAL);
  k.frontFace(k.CCW);
  k.cullFace(k.BACK);
  k.enable(k.CULL_FACE);
  k.enable(k.BLEND);
  k.blendEquation(k.FUNC_ADD);
  k.blendFunc(k.SRC_ALPHA, k.ONE_MINUS_SRC_ALPHA);
  k.clearColor(Q.r, Q.g, Q.b, Z);
  this.context = k;
  var xc = k.getParameter(k.MAX_TEXTURE_IMAGE_UNITS),
    O = k.getParameter(k.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
  k.getParameter(k.MAX_TEXTURE_SIZE);
  var Qc = k.getParameter(k.MAX_CUBE_MAP_TEXTURE_SIZE),
    oc = zb ? k.getParameter(zb.MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 0,
    gc = 0 < O,
    hc = gc && a;
  qb && k.getParameter(k.COMPRESSED_TEXTURE_FORMATS);
  this.getContext = function () {
    return k;
  };
  this.supportsVertexTextures = function () {
    return gc;
  };
  this.getMaxAnisotropy = function () {
    return oc;
  };
  this.setSize = function (a, b) {
    I.width = a;
    I.height = b;
    this.setViewport(0, 0, I.width, I.height);
  };
  this.setViewport = function (a, b, c, d) {
    Sa = void 0 !== a ? a : 0;
    Ka = void 0 !== b ? b : 0;
    kb = void 0 !== c ? c : I.width;
    Oa = void 0 !== d ? d : I.height;
    k.viewport(Sa, Ka, kb, Oa);
  };
  this.setScissor = function (a, b, c, d) {
    k.scissor(a, b, c, d);
  };
  this.enableScissorTest = function (a) {
    a ? k.enable(k.SCISSOR_TEST) : k.disable(k.SCISSOR_TEST);
  };
  this.setClearColorHex = function (a, b) {
    Q.setHex(a);
    Z = b;
    k.clearColor(Q.r, Q.g, Q.b, Z);
  };
  this.setClearColor = function (a, b) {
    Q.copy(a);
    Z = b;
    k.clearColor(Q.r, Q.g, Q.b, Z);
  };
  this.getClearColor = function () {
    return Q;
  };
  this.getClearAlpha = function () {
    return Z;
  };
  this.clear = function (a, b, c) {
    var d = 0;
    if (void 0 === a || a) d |= k.COLOR_BUFFER_BIT;
    if (void 0 === b || b) d |= k.DEPTH_BUFFER_BIT;
    if (void 0 === c || c) d |= k.STENCIL_BUFFER_BIT;
    k.clear(d);
  };
  this.clearTarget = function (a, b, c, d) {
    this.setRenderTarget(a);
    this.clear(b, c, d);
  };
  this.addPostPlugin = function (a) {
    a.init(this);
    this.renderPluginsPost.push(a);
  };
  this.addPrePlugin = function (a) {
    a.init(this);
    this.renderPluginsPre.push(a);
  };
  this.deallocateObject = function (a) {
    if (a.__webglInit)
      if (
        ((a.__webglInit = !1),
        delete a._modelViewMatrix,
        delete a._normalMatrix,
        delete a._normalMatrixArray,
        delete a._modelViewMatrixArray,
        delete a._modelMatrixArray,
        a instanceof THREE.Mesh)
      )
        for (var c in a.geometry.geometryGroups) {
          var d = a.geometry.geometryGroups[c];
          k.deleteBuffer(d.__webglVertexBuffer);
          k.deleteBuffer(d.__webglNormalBuffer);
          k.deleteBuffer(d.__webglTangentBuffer);
          k.deleteBuffer(d.__webglColorBuffer);
          k.deleteBuffer(d.__webglUVBuffer);
          k.deleteBuffer(d.__webglUV2Buffer);
          k.deleteBuffer(d.__webglSkinIndicesBuffer);
          k.deleteBuffer(d.__webglSkinWeightsBuffer);
          k.deleteBuffer(d.__webglFaceBuffer);
          k.deleteBuffer(d.__webglLineBuffer);
          var e = void 0,
            f = void 0;
          if (d.numMorphTargets) {
            e = 0;
            for (f = d.numMorphTargets; e < f; e++)
              k.deleteBuffer(d.__webglMorphTargetsBuffers[e]);
          }
          if (d.numMorphNormals) {
            e = 0;
            for (f = d.numMorphNormals; e < f; e++)
              k.deleteBuffer(d.__webglMorphNormalsBuffers[e]);
          }
          b(d);
          L.info.memory.geometries--;
        }
      else
        a instanceof THREE.Ribbon
          ? ((a = a.geometry),
            k.deleteBuffer(a.__webglVertexBuffer),
            k.deleteBuffer(a.__webglColorBuffer),
            k.deleteBuffer(a.__webglNormalBuffer),
            b(a),
            L.info.memory.geometries--)
          : a instanceof THREE.Line
          ? ((a = a.geometry),
            k.deleteBuffer(a.__webglVertexBuffer),
            k.deleteBuffer(a.__webglColorBuffer),
            k.deleteBuffer(a.__webglLineDistanceBuffer),
            b(a),
            L.info.memory.geometries--)
          : a instanceof THREE.ParticleSystem &&
            ((a = a.geometry),
            k.deleteBuffer(a.__webglVertexBuffer),
            k.deleteBuffer(a.__webglColorBuffer),
            b(a),
            L.info.memory.geometries--);
  };
  this.deallocateTexture = function (a) {
    a.__webglInit &&
      ((a.__webglInit = !1),
      k.deleteTexture(a.__webglTexture),
      L.info.memory.textures--);
  };
  this.deallocateRenderTarget = function (a) {
    if (a && a.__webglTexture)
      if (
        (k.deleteTexture(a.__webglTexture),
        a instanceof THREE.WebGLRenderTargetCube)
      )
        for (var b = 0; 6 > b; b++)
          k.deleteFramebuffer(a.__webglFramebuffer[b]),
            k.deleteRenderbuffer(a.__webglRenderbuffer[b]);
      else
        k.deleteFramebuffer(a.__webglFramebuffer),
          k.deleteRenderbuffer(a.__webglRenderbuffer);
  };
  this.deallocateMaterial = function (a) {
    var b = a.program;
    if (b) {
      a.program = void 0;
      var c,
        d,
        e = !1,
        a = 0;
      for (c = oa.length; a < c; a++)
        if (((d = oa[a]), d.program === b)) {
          d.usedTimes--;
          0 === d.usedTimes && (e = !0);
          break;
        }
      if (e) {
        e = [];
        a = 0;
        for (c = oa.length; a < c; a++)
          (d = oa[a]), d.program !== b && e.push(d);
        oa = e;
        k.deleteProgram(b);
        L.info.memory.programs--;
      }
    }
  };
  this.updateShadowMap = function (a, b) {
    fa = null;
    Y = ba = ob = ib = ma = -1;
    mb = !0;
    Ja = Na = -1;
    this.shadowMapPlugin.update(a, b);
  };
  this.renderBufferImmediate = function (a, b, c) {
    a.hasPositions &&
      !a.__webglVertexBuffer &&
      (a.__webglVertexBuffer = k.createBuffer());
    a.hasNormals &&
      !a.__webglNormalBuffer &&
      (a.__webglNormalBuffer = k.createBuffer());
    a.hasUvs && !a.__webglUvBuffer && (a.__webglUvBuffer = k.createBuffer());
    a.hasColors &&
      !a.__webglColorBuffer &&
      (a.__webglColorBuffer = k.createBuffer());
    a.hasPositions &&
      (k.bindBuffer(k.ARRAY_BUFFER, a.__webglVertexBuffer),
      k.bufferData(k.ARRAY_BUFFER, a.positionArray, k.DYNAMIC_DRAW),
      k.enableVertexAttribArray(b.attributes.position),
      k.vertexAttribPointer(b.attributes.position, 3, k.FLOAT, !1, 0, 0));
    if (a.hasNormals) {
      k.bindBuffer(k.ARRAY_BUFFER, a.__webglNormalBuffer);
      if (c.shading === THREE.FlatShading) {
        var d,
          e,
          f,
          g,
          h,
          i,
          j,
          l,
          n,
          m,
          o,
          p = 3 * a.count;
        for (o = 0; o < p; o += 9)
          (m = a.normalArray),
            (d = m[o]),
            (e = m[o + 1]),
            (f = m[o + 2]),
            (g = m[o + 3]),
            (i = m[o + 4]),
            (l = m[o + 5]),
            (h = m[o + 6]),
            (j = m[o + 7]),
            (n = m[o + 8]),
            (d = (d + g + h) / 3),
            (e = (e + i + j) / 3),
            (f = (f + l + n) / 3),
            (m[o] = d),
            (m[o + 1] = e),
            (m[o + 2] = f),
            (m[o + 3] = d),
            (m[o + 4] = e),
            (m[o + 5] = f),
            (m[o + 6] = d),
            (m[o + 7] = e),
            (m[o + 8] = f);
      }
      k.bufferData(k.ARRAY_BUFFER, a.normalArray, k.DYNAMIC_DRAW);
      k.enableVertexAttribArray(b.attributes.normal);
      k.vertexAttribPointer(b.attributes.normal, 3, k.FLOAT, !1, 0, 0);
    }
    a.hasUvs &&
      c.map &&
      (k.bindBuffer(k.ARRAY_BUFFER, a.__webglUvBuffer),
      k.bufferData(k.ARRAY_BUFFER, a.uvArray, k.DYNAMIC_DRAW),
      k.enableVertexAttribArray(b.attributes.uv),
      k.vertexAttribPointer(b.attributes.uv, 2, k.FLOAT, !1, 0, 0));
    a.hasColors &&
      c.vertexColors !== THREE.NoColors &&
      (k.bindBuffer(k.ARRAY_BUFFER, a.__webglColorBuffer),
      k.bufferData(k.ARRAY_BUFFER, a.colorArray, k.DYNAMIC_DRAW),
      k.enableVertexAttribArray(b.attributes.color),
      k.vertexAttribPointer(b.attributes.color, 3, k.FLOAT, !1, 0, 0));
    k.drawArrays(k.TRIANGLES, 0, a.count);
    a.count = 0;
  };
  this.renderBufferDirect = function (a, b, c, d, e, f) {
    if (!1 !== d.visible)
      if (
        ((c = q(a, b, c, d, f)),
        (a = c.attributes),
        (b = !1),
        (d = 16777215 * e.id + 2 * c.id + (d.wireframe ? 1 : 0)),
        d !== ba && ((ba = d), (b = !0)),
        f instanceof THREE.Mesh)
      ) {
        f = e.offsets;
        1 < f.length && (b = !0);
        d = 0;
        for (c = f.length; d < c; ++d) {
          var g = f[d].index;
          if (b) {
            var h = e.attributes.position,
              i = h.itemSize;
            k.bindBuffer(k.ARRAY_BUFFER, h.buffer);
            k.vertexAttribPointer(a.position, i, k.FLOAT, !1, 0, 4 * g * i);
            h = e.attributes.normal;
            0 <= a.normal &&
              h &&
              ((i = h.itemSize),
              k.bindBuffer(k.ARRAY_BUFFER, h.buffer),
              k.vertexAttribPointer(a.normal, i, k.FLOAT, !1, 0, 4 * g * i));
            h = e.attributes.uv;
            0 <= a.uv &&
              h &&
              (h.buffer
                ? ((i = h.itemSize),
                  k.bindBuffer(k.ARRAY_BUFFER, h.buffer),
                  k.vertexAttribPointer(a.uv, i, k.FLOAT, !1, 0, 4 * g * i),
                  k.enableVertexAttribArray(a.uv))
                : k.disableVertexAttribArray(a.uv));
            i = e.attributes.color;
            if (0 <= a.color && i) {
              var j = i.itemSize;
              k.bindBuffer(k.ARRAY_BUFFER, i.buffer);
              k.vertexAttribPointer(a.color, j, k.FLOAT, !1, 0, 4 * g * j);
            }
            h = e.attributes.tangent;
            0 <= a.tangent &&
              h &&
              ((i = h.itemSize),
              k.bindBuffer(k.ARRAY_BUFFER, h.buffer),
              k.vertexAttribPointer(a.tangent, i, k.FLOAT, !1, 0, 4 * g * i));
            k.bindBuffer(k.ELEMENT_ARRAY_BUFFER, e.attributes.index.buffer);
          }
          k.drawElements(
            k.TRIANGLES,
            f[d].count,
            k.UNSIGNED_SHORT,
            2 * f[d].start
          );
          L.info.render.calls++;
          L.info.render.vertices += f[d].count;
          L.info.render.faces += f[d].count / 3;
        }
      } else
        f instanceof THREE.ParticleSystem &&
          b &&
          ((h = e.attributes.position),
          (i = h.itemSize),
          k.bindBuffer(k.ARRAY_BUFFER, h.buffer),
          k.vertexAttribPointer(a.position, i, k.FLOAT, !1, 0, 0),
          (i = e.attributes.color),
          0 <= a.color &&
            i &&
            ((j = i.itemSize),
            k.bindBuffer(k.ARRAY_BUFFER, i.buffer),
            k.vertexAttribPointer(a.color, j, k.FLOAT, !1, 0, 0)),
          k.drawArrays(k.POINTS, 0, h.numItems / 3),
          L.info.render.calls++,
          (L.info.render.points += h.numItems / 3));
  };
  this.renderBuffer = function (a, b, c, d, e, f) {
    if (!1 !== d.visible) {
      var g,
        h,
        c = q(a, b, c, d, f),
        b = c.attributes,
        a = !1,
        c = 16777215 * e.id + 2 * c.id + (d.wireframe ? 1 : 0);
      c !== ba && ((ba = c), (a = !0));
      if (!d.morphTargets && 0 <= b.position)
        a &&
          (k.bindBuffer(k.ARRAY_BUFFER, e.__webglVertexBuffer),
          k.vertexAttribPointer(b.position, 3, k.FLOAT, !1, 0, 0));
      else if (f.morphTargetBase) {
        c = d.program.attributes;
        -1 !== f.morphTargetBase
          ? (k.bindBuffer(
              k.ARRAY_BUFFER,
              e.__webglMorphTargetsBuffers[f.morphTargetBase]
            ),
            k.vertexAttribPointer(c.position, 3, k.FLOAT, !1, 0, 0))
          : 0 <= c.position &&
            (k.bindBuffer(k.ARRAY_BUFFER, e.__webglVertexBuffer),
            k.vertexAttribPointer(c.position, 3, k.FLOAT, !1, 0, 0));
        if (f.morphTargetForcedOrder.length) {
          var i = 0;
          h = f.morphTargetForcedOrder;
          for (
            g = f.morphTargetInfluences;
            i < d.numSupportedMorphTargets && i < h.length;

          )
            k.bindBuffer(k.ARRAY_BUFFER, e.__webglMorphTargetsBuffers[h[i]]),
              k.vertexAttribPointer(c["morphTarget" + i], 3, k.FLOAT, !1, 0, 0),
              d.morphNormals &&
                (k.bindBuffer(
                  k.ARRAY_BUFFER,
                  e.__webglMorphNormalsBuffers[h[i]]
                ),
                k.vertexAttribPointer(
                  c["morphNormal" + i],
                  3,
                  k.FLOAT,
                  !1,
                  0,
                  0
                )),
              (f.__webglMorphTargetInfluences[i] = g[h[i]]),
              i++;
        } else {
          h = [];
          g = f.morphTargetInfluences;
          var j,
            l = g.length;
          for (j = 0; j < l; j++) (i = g[j]), 0 < i && h.push([j, i]);
          h.length > d.numSupportedMorphTargets
            ? (h.sort(m), (h.length = d.numSupportedMorphTargets))
            : h.length > d.numSupportedMorphNormals
            ? h.sort(m)
            : 0 === h.length && h.push([0, 0]);
          for (i = 0; i < d.numSupportedMorphTargets; )
            h[i]
              ? ((j = h[i][0]),
                k.bindBuffer(k.ARRAY_BUFFER, e.__webglMorphTargetsBuffers[j]),
                k.vertexAttribPointer(
                  c["morphTarget" + i],
                  3,
                  k.FLOAT,
                  !1,
                  0,
                  0
                ),
                d.morphNormals &&
                  (k.bindBuffer(
                    k.ARRAY_BUFFER,
                    e.__webglMorphNormalsBuffers[j]
                  ),
                  k.vertexAttribPointer(
                    c["morphNormal" + i],
                    3,
                    k.FLOAT,
                    !1,
                    0,
                    0
                  )),
                (f.__webglMorphTargetInfluences[i] = g[j]))
              : (k.vertexAttribPointer(
                  c["morphTarget" + i],
                  3,
                  k.FLOAT,
                  !1,
                  0,
                  0
                ),
                d.morphNormals &&
                  k.vertexAttribPointer(
                    c["morphNormal" + i],
                    3,
                    k.FLOAT,
                    !1,
                    0,
                    0
                  ),
                (f.__webglMorphTargetInfluences[i] = 0)),
              i++;
        }
        null !== d.program.uniforms.morphTargetInfluences &&
          k.uniform1fv(
            d.program.uniforms.morphTargetInfluences,
            f.__webglMorphTargetInfluences
          );
      }
      if (a) {
        if (e.__webglCustomAttributesList) {
          g = 0;
          for (h = e.__webglCustomAttributesList.length; g < h; g++)
            (c = e.__webglCustomAttributesList[g]),
              0 <= b[c.buffer.belongsToAttribute] &&
                (k.bindBuffer(k.ARRAY_BUFFER, c.buffer),
                k.vertexAttribPointer(
                  b[c.buffer.belongsToAttribute],
                  c.size,
                  k.FLOAT,
                  !1,
                  0,
                  0
                ));
        }
        0 <= b.color &&
          (k.bindBuffer(k.ARRAY_BUFFER, e.__webglColorBuffer),
          k.vertexAttribPointer(b.color, 3, k.FLOAT, !1, 0, 0));
        0 <= b.normal &&
          (k.bindBuffer(k.ARRAY_BUFFER, e.__webglNormalBuffer),
          k.vertexAttribPointer(b.normal, 3, k.FLOAT, !1, 0, 0));
        0 <= b.tangent &&
          (k.bindBuffer(k.ARRAY_BUFFER, e.__webglTangentBuffer),
          k.vertexAttribPointer(b.tangent, 4, k.FLOAT, !1, 0, 0));
        0 <= b.uv &&
          (e.__webglUVBuffer
            ? (k.bindBuffer(k.ARRAY_BUFFER, e.__webglUVBuffer),
              k.vertexAttribPointer(b.uv, 2, k.FLOAT, !1, 0, 0),
              k.enableVertexAttribArray(b.uv))
            : k.disableVertexAttribArray(b.uv));
        0 <= b.uv2 &&
          (e.__webglUV2Buffer
            ? (k.bindBuffer(k.ARRAY_BUFFER, e.__webglUV2Buffer),
              k.vertexAttribPointer(b.uv2, 2, k.FLOAT, !1, 0, 0),
              k.enableVertexAttribArray(b.uv2))
            : k.disableVertexAttribArray(b.uv2));
        d.skinning &&
          0 <= b.skinIndex &&
          0 <= b.skinWeight &&
          (k.bindBuffer(k.ARRAY_BUFFER, e.__webglSkinIndicesBuffer),
          k.vertexAttribPointer(b.skinIndex, 4, k.FLOAT, !1, 0, 0),
          k.bindBuffer(k.ARRAY_BUFFER, e.__webglSkinWeightsBuffer),
          k.vertexAttribPointer(b.skinWeight, 4, k.FLOAT, !1, 0, 0));
        0 <= b.lineDistance &&
          (k.bindBuffer(k.ARRAY_BUFFER, e.__webglLineDistanceBuffer),
          k.vertexAttribPointer(b.lineDistance, 1, k.FLOAT, !1, 0, 0));
      }
      f instanceof THREE.Mesh
        ? (d.wireframe
            ? ((d = d.wireframeLinewidth),
              d !== Wa && (k.lineWidth(d), (Wa = d)),
              a && k.bindBuffer(k.ELEMENT_ARRAY_BUFFER, e.__webglLineBuffer),
              k.drawElements(k.LINES, e.__webglLineCount, k.UNSIGNED_SHORT, 0))
            : (a && k.bindBuffer(k.ELEMENT_ARRAY_BUFFER, e.__webglFaceBuffer),
              k.drawElements(
                k.TRIANGLES,
                e.__webglFaceCount,
                k.UNSIGNED_SHORT,
                0
              )),
          L.info.render.calls++,
          (L.info.render.vertices += e.__webglFaceCount),
          (L.info.render.faces += e.__webglFaceCount / 3))
        : f instanceof THREE.Line
        ? ((f = f.type === THREE.LineStrip ? k.LINE_STRIP : k.LINES),
          (d = d.linewidth),
          d !== Wa && (k.lineWidth(d), (Wa = d)),
          k.drawArrays(f, 0, e.__webglLineCount),
          L.info.render.calls++)
        : f instanceof THREE.ParticleSystem
        ? (k.drawArrays(k.POINTS, 0, e.__webglParticleCount),
          L.info.render.calls++,
          (L.info.render.points += e.__webglParticleCount))
        : f instanceof THREE.Ribbon &&
          (k.drawArrays(k.TRIANGLE_STRIP, 0, e.__webglVertexCount),
          L.info.render.calls++);
    }
  };
  this.render = function (a, b, c, d) {
    if (!1 === b instanceof THREE.Camera)
      console.error(
        "THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera."
      );
    else {
      var e,
        f,
        g,
        h,
        i = a.__lights,
        j = a.fog;
      Y = -1;
      mb = !0;
      this.autoUpdateScene && a.updateMatrixWorld();
      void 0 === b.parent && b.updateMatrixWorld();
      b._viewMatrixArray || (b._viewMatrixArray = new Float32Array(16));
      b._projectionMatrixArray ||
        (b._projectionMatrixArray = new Float32Array(16));
      b.matrixWorldInverse.getInverse(b.matrixWorld);
      b.matrixWorldInverse.flattenToArray(b._viewMatrixArray);
      b.projectionMatrix.flattenToArray(b._projectionMatrixArray);
      eb.multiply(b.projectionMatrix, b.matrixWorldInverse);
      va.setFromMatrix(eb);
      this.autoUpdateObjects && this.initWebGLObjects(a);
      n(this.renderPluginsPre, a, b);
      L.info.render.calls = 0;
      L.info.render.vertices = 0;
      L.info.render.faces = 0;
      L.info.render.points = 0;
      this.setRenderTarget(c);
      (this.autoClear || d) &&
        this.clear(
          this.autoClearColor,
          this.autoClearDepth,
          this.autoClearStencil
        );
      h = a.__webglObjects;
      d = 0;
      for (e = h.length; d < e; d++)
        if (
          ((f = h[d]),
          (g = f.object),
          (f.render = !1),
          g.visible &&
            (!(g instanceof THREE.Mesh || g instanceof THREE.ParticleSystem) ||
              !g.frustumCulled ||
              va.contains(g)))
        ) {
          A(g, b);
          var m = f,
            s = m.buffer,
            r = void 0,
            q = (r = void 0),
            q = m.object.material;
          if (q instanceof THREE.MeshFaceMaterial)
            (r = s.materialIndex),
              0 <= r &&
                ((r = q.materials[r]),
                r.transparent
                  ? ((m.transparent = r), (m.opaque = null))
                  : ((m.opaque = r), (m.transparent = null)));
          else if ((r = q))
            r.transparent
              ? ((m.transparent = r), (m.opaque = null))
              : ((m.opaque = r), (m.transparent = null));
          f.render = !0;
          !0 === this.sortObjects &&
            (null !== g.renderDepth
              ? (f.z = g.renderDepth)
              : (bb.copy(g.matrixWorld.getPosition()),
                eb.multiplyVector3(bb),
                (f.z = bb.z)),
            (f.id = g.id));
        }
      this.sortObjects && h.sort(l);
      h = a.__webglObjectsImmediate;
      d = 0;
      for (e = h.length; d < e; d++)
        (f = h[d]),
          (g = f.object),
          g.visible &&
            (A(g, b),
            (g = f.object.material),
            g.transparent
              ? ((f.transparent = g), (f.opaque = null))
              : ((f.opaque = g), (f.transparent = null)));
      a.overrideMaterial
        ? ((d = a.overrideMaterial),
          this.setBlending(d.blending, d.blendEquation, d.blendSrc, d.blendDst),
          this.setDepthTest(d.depthTest),
          this.setDepthWrite(d.depthWrite),
          D(d.polygonOffset, d.polygonOffsetFactor, d.polygonOffsetUnits),
          p(a.__webglObjects, !1, "", b, i, j, !0, d),
          o(a.__webglObjectsImmediate, "", b, i, j, !1, d))
        : (this.setBlending(THREE.NormalBlending),
          p(a.__webglObjects, !0, "opaque", b, i, j, !1),
          o(a.__webglObjectsImmediate, "opaque", b, i, j, !1),
          p(a.__webglObjects, !1, "transparent", b, i, j, !0),
          o(a.__webglObjectsImmediate, "transparent", b, i, j, !0));
      n(this.renderPluginsPost, a, b);
      c &&
        c.generateMipmaps &&
        c.minFilter !== THREE.NearestFilter &&
        c.minFilter !== THREE.LinearFilter &&
        (c instanceof THREE.WebGLRenderTargetCube
          ? (k.bindTexture(k.TEXTURE_CUBE_MAP, c.__webglTexture),
            k.generateMipmap(k.TEXTURE_CUBE_MAP),
            k.bindTexture(k.TEXTURE_CUBE_MAP, null))
          : (k.bindTexture(k.TEXTURE_2D, c.__webglTexture),
            k.generateMipmap(k.TEXTURE_2D),
            k.bindTexture(k.TEXTURE_2D, null)));
      this.setDepthTest(!0);
      this.setDepthWrite(!0);
    }
  };
  this.renderImmediateObject = function (a, b, c, d, e) {
    var f = q(a, b, c, d, e);
    ba = -1;
    L.setMaterialFaces(d);
    e.immediateRenderCallback
      ? e.immediateRenderCallback(f, k, va)
      : e.render(function (a) {
          L.renderBufferImmediate(a, f, d);
        });
  };
  this.initWebGLObjects = function (a) {
    a.__webglObjects ||
      ((a.__webglObjects = []),
      (a.__webglObjectsImmediate = []),
      (a.__webglSprites = []),
      (a.__webglFlares = []));
    for (; a.__objectsAdded.length; ) {
      var b = a.__objectsAdded[0],
        l = a,
        n = void 0,
        m = void 0,
        o = void 0,
        p = void 0;
      if (!b.__webglInit)
        if (
          ((b.__webglInit = !0),
          (b._modelViewMatrix = new THREE.Matrix4()),
          (b._normalMatrix = new THREE.Matrix3()),
          b instanceof THREE.Mesh)
        )
          if (
            ((m = b.geometry), (o = b.material), m instanceof THREE.Geometry)
          ) {
            if (void 0 === m.geometryGroups) {
              var q = m,
                u = void 0,
                v = void 0,
                A = void 0,
                B = void 0,
                C = void 0,
                D = void 0,
                E = void 0,
                G = {},
                H = q.morphTargets.length,
                I = q.morphNormals.length,
                X = o instanceof THREE.MeshFaceMaterial;
              q.geometryGroups = {};
              u = 0;
              for (v = q.faces.length; u < v; u++)
                (A = q.faces[u]),
                  (B = X ? A.materialIndex : void 0),
                  (D = void 0 !== B ? B : -1),
                  void 0 === G[D] &&
                    (G[D] = {
                      hash: D,
                      counter: 0,
                    }),
                  (E = G[D].hash + "_" + G[D].counter),
                  void 0 === q.geometryGroups[E] &&
                    (q.geometryGroups[E] = {
                      faces3: [],
                      faces4: [],
                      materialIndex: B,
                      vertices: 0,
                      numMorphTargets: H,
                      numMorphNormals: I,
                    }),
                  (C = A instanceof THREE.Face3 ? 3 : 4),
                  65535 < q.geometryGroups[E].vertices + C &&
                    ((G[D].counter += 1),
                    (E = G[D].hash + "_" + G[D].counter),
                    void 0 === q.geometryGroups[E] &&
                      (q.geometryGroups[E] = {
                        faces3: [],
                        faces4: [],
                        materialIndex: B,
                        vertices: 0,
                        numMorphTargets: H,
                        numMorphNormals: I,
                      })),
                  A instanceof THREE.Face3
                    ? q.geometryGroups[E].faces3.push(u)
                    : q.geometryGroups[E].faces4.push(u),
                  (q.geometryGroups[E].vertices += C);
              q.geometryGroupsList = [];
              var Y = void 0;
              for (Y in q.geometryGroups)
                (q.geometryGroups[Y].id = ia++),
                  q.geometryGroupsList.push(q.geometryGroups[Y]);
            }
            for (n in m.geometryGroups)
              if (((p = m.geometryGroups[n]), !p.__webglVertexBuffer)) {
                var J = p;
                J.__webglVertexBuffer = k.createBuffer();
                J.__webglNormalBuffer = k.createBuffer();
                J.__webglTangentBuffer = k.createBuffer();
                J.__webglColorBuffer = k.createBuffer();
                J.__webglUVBuffer = k.createBuffer();
                J.__webglUV2Buffer = k.createBuffer();
                J.__webglSkinIndicesBuffer = k.createBuffer();
                J.__webglSkinWeightsBuffer = k.createBuffer();
                J.__webglFaceBuffer = k.createBuffer();
                J.__webglLineBuffer = k.createBuffer();
                var K = void 0,
                  Q = void 0;
                if (J.numMorphTargets) {
                  J.__webglMorphTargetsBuffers = [];
                  K = 0;
                  for (Q = J.numMorphTargets; K < Q; K++)
                    J.__webglMorphTargetsBuffers.push(k.createBuffer());
                }
                if (J.numMorphNormals) {
                  J.__webglMorphNormalsBuffers = [];
                  K = 0;
                  for (Q = J.numMorphNormals; K < Q; K++)
                    J.__webglMorphNormalsBuffers.push(k.createBuffer());
                }
                L.info.memory.geometries++;
                d(p, b);
                m.verticesNeedUpdate = !0;
                m.morphTargetsNeedUpdate = !0;
                m.elementsNeedUpdate = !0;
                m.uvsNeedUpdate = !0;
                m.normalsNeedUpdate = !0;
                m.tangentsNeedUpdate = !0;
                m.colorsNeedUpdate = !0;
              }
          } else m instanceof THREE.BufferGeometry && h(m);
        else if (b instanceof THREE.Ribbon) {
          if (((m = b.geometry), !m.__webglVertexBuffer)) {
            var O = m;
            O.__webglVertexBuffer = k.createBuffer();
            O.__webglColorBuffer = k.createBuffer();
            O.__webglNormalBuffer = k.createBuffer();
            L.info.memory.geometries++;
            var M = m,
              P = b,
              N = M.vertices.length;
            M.__vertexArray = new Float32Array(3 * N);
            M.__colorArray = new Float32Array(3 * N);
            M.__normalArray = new Float32Array(3 * N);
            M.__webglVertexCount = N;
            c(M, P);
            m.verticesNeedUpdate = !0;
            m.colorsNeedUpdate = !0;
            m.normalsNeedUpdate = !0;
          }
        } else if (b instanceof THREE.Line) {
          if (((m = b.geometry), !m.__webglVertexBuffer)) {
            var ca = m;
            ca.__webglVertexBuffer = k.createBuffer();
            ca.__webglColorBuffer = k.createBuffer();
            ca.__webglLineDistanceBuffer = k.createBuffer();
            L.info.memory.geometries++;
            var fa = m,
              R = b,
              Z = fa.vertices.length;
            fa.__vertexArray = new Float32Array(3 * Z);
            fa.__colorArray = new Float32Array(3 * Z);
            fa.__lineDistanceArray = new Float32Array(1 * Z);
            fa.__webglLineCount = Z;
            c(fa, R);
            m.verticesNeedUpdate = !0;
            m.colorsNeedUpdate = !0;
            m.lineDistancesNeedUpdate = !0;
          }
        } else if (
          b instanceof THREE.ParticleSystem &&
          ((m = b.geometry), !m.__webglVertexBuffer)
        )
          if (m instanceof THREE.Geometry) {
            var aa = m;
            aa.__webglVertexBuffer = k.createBuffer();
            aa.__webglColorBuffer = k.createBuffer();
            L.info.memory.geometries++;
            var ba = m,
              ga = b,
              Aa = ba.vertices.length;
            ba.__vertexArray = new Float32Array(3 * Aa);
            ba.__colorArray = new Float32Array(3 * Aa);
            ba.__sortArray = [];
            ba.__webglParticleCount = Aa;
            c(ba, ga);
            m.verticesNeedUpdate = !0;
            m.colorsNeedUpdate = !0;
          } else m instanceof THREE.BufferGeometry && h(m);
      if (!b.__webglActive) {
        if (b instanceof THREE.Mesh)
          if (((m = b.geometry), m instanceof THREE.BufferGeometry))
            s(l.__webglObjects, m, b);
          else
            for (n in m.geometryGroups)
              (p = m.geometryGroups[n]), s(l.__webglObjects, p, b);
        else
          b instanceof THREE.Ribbon ||
          b instanceof THREE.Line ||
          b instanceof THREE.ParticleSystem
            ? ((m = b.geometry), s(l.__webglObjects, m, b))
            : b instanceof THREE.ImmediateRenderObject ||
              b.immediateRenderCallback
            ? l.__webglObjectsImmediate.push({
                object: b,
                opaque: null,
                transparent: null,
              })
            : b instanceof THREE.Sprite
            ? l.__webglSprites.push(b)
            : b instanceof THREE.LensFlare && l.__webglFlares.push(b);
        b.__webglActive = !0;
      }
      a.__objectsAdded.splice(0, 1);
    }
    for (; a.__objectsRemoved.length; ) {
      var oa = a.__objectsRemoved[0],
        sa = a;
      oa instanceof THREE.Mesh ||
      oa instanceof THREE.ParticleSystem ||
      oa instanceof THREE.Ribbon ||
      oa instanceof THREE.Line
        ? z(sa.__webglObjects, oa)
        : oa instanceof THREE.Sprite
        ? w(sa.__webglSprites, oa)
        : oa instanceof THREE.LensFlare
        ? w(sa.__webglFlares, oa)
        : (oa instanceof THREE.ImmediateRenderObject ||
            oa.immediateRenderCallback) &&
          z(sa.__webglObjectsImmediate, oa);
      oa.__webglActive = !1;
      a.__objectsRemoved.splice(0, 1);
    }
    for (var Na = 0, xa = a.__webglObjects.length; Na < xa; Na++) {
      var qa = a.__webglObjects[Na].object,
        T = qa.geometry,
        Ja = void 0,
        va = void 0,
        ma = void 0;
      if (qa instanceof THREE.Mesh)
        if (T instanceof THREE.BufferGeometry)
          (T.verticesNeedUpdate ||
            T.elementsNeedUpdate ||
            T.uvsNeedUpdate ||
            T.normalsNeedUpdate ||
            T.colorsNeedUpdate ||
            T.tangentsNeedUpdate) &&
            j(T, k.DYNAMIC_DRAW, !T.dynamic),
            (T.verticesNeedUpdate = !1),
            (T.elementsNeedUpdate = !1),
            (T.uvsNeedUpdate = !1),
            (T.normalsNeedUpdate = !1),
            (T.colorsNeedUpdate = !1),
            (T.tangentsNeedUpdate = !1);
        else {
          for (var Ka = 0, Oa = T.geometryGroupsList.length; Ka < Oa; Ka++)
            if (
              ((Ja = T.geometryGroupsList[Ka]),
              (ma = e(qa, Ja)),
              T.buffersNeedUpdate && d(Ja, qa),
              (va = ma.attributes && t(ma)),
              T.verticesNeedUpdate ||
                T.morphTargetsNeedUpdate ||
                T.elementsNeedUpdate ||
                T.uvsNeedUpdate ||
                T.normalsNeedUpdate ||
                T.colorsNeedUpdate ||
                T.tangentsNeedUpdate ||
                va)
            ) {
              var ra = Ja,
                Sa = qa,
                Ea = k.DYNAMIC_DRAW,
                ib = !T.dynamic,
                Wa = ma;
              if (ra.__inittedArrays) {
                var mb = f(Wa),
                  rb = Wa.vertexColors ? Wa.vertexColors : !1,
                  ob = g(Wa),
                  lb = mb === THREE.SmoothShading,
                  F = void 0,
                  $ = void 0,
                  ab = void 0,
                  S = void 0,
                  eb = void 0,
                  bb = void 0,
                  Eb = void 0,
                  pb = void 0,
                  Vb = void 0,
                  jb = void 0,
                  kb = void 0,
                  U = void 0,
                  V = void 0,
                  W = void 0,
                  pa = void 0,
                  Fb = void 0,
                  Gb = void 0,
                  Hb = void 0,
                  qb = void 0,
                  Ib = void 0,
                  Jb = void 0,
                  Kb = void 0,
                  sb = void 0,
                  Lb = void 0,
                  Mb = void 0,
                  Nb = void 0,
                  zb = void 0,
                  Ob = void 0,
                  Pb = void 0,
                  Qb = void 0,
                  Bb = void 0,
                  Rb = void 0,
                  Sb = void 0,
                  Tb = void 0,
                  Cb = void 0,
                  wa = void 0,
                  gc = void 0,
                  ac = void 0,
                  kc = void 0,
                  lc = void 0,
                  Ta = void 0,
                  hc = void 0,
                  Qa = void 0,
                  Ra = void 0,
                  bc = void 0,
                  Wb = void 0,
                  La = 0,
                  Pa = 0,
                  Xb = 0,
                  Yb = 0,
                  vb = 0,
                  Za = 0,
                  Ba = 0,
                  db = 0,
                  Ma = 0,
                  ha = 0,
                  ja = 0,
                  y = 0,
                  ya = void 0,
                  Ua = ra.__vertexArray,
                  pc = ra.__uvArray,
                  qc = ra.__uv2Array,
                  wb = ra.__normalArray,
                  Fa = ra.__tangentArray,
                  Va = ra.__colorArray,
                  Ga = ra.__skinIndexArray,
                  Ha = ra.__skinWeightArray,
                  Sc = ra.__morphTargetsArrays,
                  Tc = ra.__morphNormalsArrays,
                  Uc = ra.__webglCustomAttributesList,
                  x = void 0,
                  Ub = ra.__faceArray,
                  nb = ra.__lineArray,
                  fb = Sa.geometry,
                  xc = fb.elementsNeedUpdate,
                  oc = fb.uvsNeedUpdate,
                  Pc = fb.normalsNeedUpdate,
                  Qc = fb.tangentsNeedUpdate,
                  hd = fb.colorsNeedUpdate,
                  id = fb.morphTargetsNeedUpdate,
                  ec = fb.vertices,
                  ta = ra.faces3,
                  ua = ra.faces4,
                  $a = fb.faces,
                  Vc = fb.faceVertexUvs[0],
                  Wc = fb.faceVertexUvs[1],
                  fc = fb.skinIndices,
                  cc = fb.skinWeights,
                  dc = fb.morphTargets,
                  Ac = fb.morphNormals;
                if (fb.verticesNeedUpdate) {
                  F = 0;
                  for ($ = ta.length; F < $; F++)
                    (S = $a[ta[F]]),
                      (U = ec[S.a]),
                      (V = ec[S.b]),
                      (W = ec[S.c]),
                      (Ua[Pa] = U.x),
                      (Ua[Pa + 1] = U.y),
                      (Ua[Pa + 2] = U.z),
                      (Ua[Pa + 3] = V.x),
                      (Ua[Pa + 4] = V.y),
                      (Ua[Pa + 5] = V.z),
                      (Ua[Pa + 6] = W.x),
                      (Ua[Pa + 7] = W.y),
                      (Ua[Pa + 8] = W.z),
                      (Pa += 9);
                  F = 0;
                  for ($ = ua.length; F < $; F++)
                    (S = $a[ua[F]]),
                      (U = ec[S.a]),
                      (V = ec[S.b]),
                      (W = ec[S.c]),
                      (pa = ec[S.d]),
                      (Ua[Pa] = U.x),
                      (Ua[Pa + 1] = U.y),
                      (Ua[Pa + 2] = U.z),
                      (Ua[Pa + 3] = V.x),
                      (Ua[Pa + 4] = V.y),
                      (Ua[Pa + 5] = V.z),
                      (Ua[Pa + 6] = W.x),
                      (Ua[Pa + 7] = W.y),
                      (Ua[Pa + 8] = W.z),
                      (Ua[Pa + 9] = pa.x),
                      (Ua[Pa + 10] = pa.y),
                      (Ua[Pa + 11] = pa.z),
                      (Pa += 12);
                  k.bindBuffer(k.ARRAY_BUFFER, ra.__webglVertexBuffer);
                  k.bufferData(k.ARRAY_BUFFER, Ua, Ea);
                }
                if (id) {
                  Ta = 0;
                  for (hc = dc.length; Ta < hc; Ta++) {
                    F = ja = 0;
                    for ($ = ta.length; F < $; F++)
                      (bc = ta[F]),
                        (S = $a[bc]),
                        (U = dc[Ta].vertices[S.a]),
                        (V = dc[Ta].vertices[S.b]),
                        (W = dc[Ta].vertices[S.c]),
                        (Qa = Sc[Ta]),
                        (Qa[ja] = U.x),
                        (Qa[ja + 1] = U.y),
                        (Qa[ja + 2] = U.z),
                        (Qa[ja + 3] = V.x),
                        (Qa[ja + 4] = V.y),
                        (Qa[ja + 5] = V.z),
                        (Qa[ja + 6] = W.x),
                        (Qa[ja + 7] = W.y),
                        (Qa[ja + 8] = W.z),
                        Wa.morphNormals &&
                          (lb
                            ? ((Wb = Ac[Ta].vertexNormals[bc]),
                              (Ib = Wb.a),
                              (Jb = Wb.b),
                              (Kb = Wb.c))
                            : (Kb = Jb = Ib = Ac[Ta].faceNormals[bc]),
                          (Ra = Tc[Ta]),
                          (Ra[ja] = Ib.x),
                          (Ra[ja + 1] = Ib.y),
                          (Ra[ja + 2] = Ib.z),
                          (Ra[ja + 3] = Jb.x),
                          (Ra[ja + 4] = Jb.y),
                          (Ra[ja + 5] = Jb.z),
                          (Ra[ja + 6] = Kb.x),
                          (Ra[ja + 7] = Kb.y),
                          (Ra[ja + 8] = Kb.z)),
                        (ja += 9);
                    F = 0;
                    for ($ = ua.length; F < $; F++)
                      (bc = ua[F]),
                        (S = $a[bc]),
                        (U = dc[Ta].vertices[S.a]),
                        (V = dc[Ta].vertices[S.b]),
                        (W = dc[Ta].vertices[S.c]),
                        (pa = dc[Ta].vertices[S.d]),
                        (Qa = Sc[Ta]),
                        (Qa[ja] = U.x),
                        (Qa[ja + 1] = U.y),
                        (Qa[ja + 2] = U.z),
                        (Qa[ja + 3] = V.x),
                        (Qa[ja + 4] = V.y),
                        (Qa[ja + 5] = V.z),
                        (Qa[ja + 6] = W.x),
                        (Qa[ja + 7] = W.y),
                        (Qa[ja + 8] = W.z),
                        (Qa[ja + 9] = pa.x),
                        (Qa[ja + 10] = pa.y),
                        (Qa[ja + 11] = pa.z),
                        Wa.morphNormals &&
                          (lb
                            ? ((Wb = Ac[Ta].vertexNormals[bc]),
                              (Ib = Wb.a),
                              (Jb = Wb.b),
                              (Kb = Wb.c),
                              (sb = Wb.d))
                            : (sb = Kb = Jb = Ib = Ac[Ta].faceNormals[bc]),
                          (Ra = Tc[Ta]),
                          (Ra[ja] = Ib.x),
                          (Ra[ja + 1] = Ib.y),
                          (Ra[ja + 2] = Ib.z),
                          (Ra[ja + 3] = Jb.x),
                          (Ra[ja + 4] = Jb.y),
                          (Ra[ja + 5] = Jb.z),
                          (Ra[ja + 6] = Kb.x),
                          (Ra[ja + 7] = Kb.y),
                          (Ra[ja + 8] = Kb.z),
                          (Ra[ja + 9] = sb.x),
                          (Ra[ja + 10] = sb.y),
                          (Ra[ja + 11] = sb.z)),
                        (ja += 12);
                    k.bindBuffer(
                      k.ARRAY_BUFFER,
                      ra.__webglMorphTargetsBuffers[Ta]
                    );
                    k.bufferData(k.ARRAY_BUFFER, Sc[Ta], Ea);
                    Wa.morphNormals &&
                      (k.bindBuffer(
                        k.ARRAY_BUFFER,
                        ra.__webglMorphNormalsBuffers[Ta]
                      ),
                      k.bufferData(k.ARRAY_BUFFER, Tc[Ta], Ea));
                  }
                }
                if (cc.length) {
                  F = 0;
                  for ($ = ta.length; F < $; F++)
                    (S = $a[ta[F]]),
                      (Ob = cc[S.a]),
                      (Pb = cc[S.b]),
                      (Qb = cc[S.c]),
                      (Ha[ha] = Ob.x),
                      (Ha[ha + 1] = Ob.y),
                      (Ha[ha + 2] = Ob.z),
                      (Ha[ha + 3] = Ob.w),
                      (Ha[ha + 4] = Pb.x),
                      (Ha[ha + 5] = Pb.y),
                      (Ha[ha + 6] = Pb.z),
                      (Ha[ha + 7] = Pb.w),
                      (Ha[ha + 8] = Qb.x),
                      (Ha[ha + 9] = Qb.y),
                      (Ha[ha + 10] = Qb.z),
                      (Ha[ha + 11] = Qb.w),
                      (Rb = fc[S.a]),
                      (Sb = fc[S.b]),
                      (Tb = fc[S.c]),
                      (Ga[ha] = Rb.x),
                      (Ga[ha + 1] = Rb.y),
                      (Ga[ha + 2] = Rb.z),
                      (Ga[ha + 3] = Rb.w),
                      (Ga[ha + 4] = Sb.x),
                      (Ga[ha + 5] = Sb.y),
                      (Ga[ha + 6] = Sb.z),
                      (Ga[ha + 7] = Sb.w),
                      (Ga[ha + 8] = Tb.x),
                      (Ga[ha + 9] = Tb.y),
                      (Ga[ha + 10] = Tb.z),
                      (Ga[ha + 11] = Tb.w),
                      (ha += 12);
                  F = 0;
                  for ($ = ua.length; F < $; F++)
                    (S = $a[ua[F]]),
                      (Ob = cc[S.a]),
                      (Pb = cc[S.b]),
                      (Qb = cc[S.c]),
                      (Bb = cc[S.d]),
                      (Ha[ha] = Ob.x),
                      (Ha[ha + 1] = Ob.y),
                      (Ha[ha + 2] = Ob.z),
                      (Ha[ha + 3] = Ob.w),
                      (Ha[ha + 4] = Pb.x),
                      (Ha[ha + 5] = Pb.y),
                      (Ha[ha + 6] = Pb.z),
                      (Ha[ha + 7] = Pb.w),
                      (Ha[ha + 8] = Qb.x),
                      (Ha[ha + 9] = Qb.y),
                      (Ha[ha + 10] = Qb.z),
                      (Ha[ha + 11] = Qb.w),
                      (Ha[ha + 12] = Bb.x),
                      (Ha[ha + 13] = Bb.y),
                      (Ha[ha + 14] = Bb.z),
                      (Ha[ha + 15] = Bb.w),
                      (Rb = fc[S.a]),
                      (Sb = fc[S.b]),
                      (Tb = fc[S.c]),
                      (Cb = fc[S.d]),
                      (Ga[ha] = Rb.x),
                      (Ga[ha + 1] = Rb.y),
                      (Ga[ha + 2] = Rb.z),
                      (Ga[ha + 3] = Rb.w),
                      (Ga[ha + 4] = Sb.x),
                      (Ga[ha + 5] = Sb.y),
                      (Ga[ha + 6] = Sb.z),
                      (Ga[ha + 7] = Sb.w),
                      (Ga[ha + 8] = Tb.x),
                      (Ga[ha + 9] = Tb.y),
                      (Ga[ha + 10] = Tb.z),
                      (Ga[ha + 11] = Tb.w),
                      (Ga[ha + 12] = Cb.x),
                      (Ga[ha + 13] = Cb.y),
                      (Ga[ha + 14] = Cb.z),
                      (Ga[ha + 15] = Cb.w),
                      (ha += 16);
                  0 < ha &&
                    (k.bindBuffer(k.ARRAY_BUFFER, ra.__webglSkinIndicesBuffer),
                    k.bufferData(k.ARRAY_BUFFER, Ga, Ea),
                    k.bindBuffer(k.ARRAY_BUFFER, ra.__webglSkinWeightsBuffer),
                    k.bufferData(k.ARRAY_BUFFER, Ha, Ea));
                }
                if (hd && rb) {
                  F = 0;
                  for ($ = ta.length; F < $; F++)
                    (S = $a[ta[F]]),
                      (Eb = S.vertexColors),
                      (pb = S.color),
                      3 === Eb.length && rb === THREE.VertexColors
                        ? ((Lb = Eb[0]), (Mb = Eb[1]), (Nb = Eb[2]))
                        : (Nb = Mb = Lb = pb),
                      (Va[Ma] = Lb.r),
                      (Va[Ma + 1] = Lb.g),
                      (Va[Ma + 2] = Lb.b),
                      (Va[Ma + 3] = Mb.r),
                      (Va[Ma + 4] = Mb.g),
                      (Va[Ma + 5] = Mb.b),
                      (Va[Ma + 6] = Nb.r),
                      (Va[Ma + 7] = Nb.g),
                      (Va[Ma + 8] = Nb.b),
                      (Ma += 9);
                  F = 0;
                  for ($ = ua.length; F < $; F++)
                    (S = $a[ua[F]]),
                      (Eb = S.vertexColors),
                      (pb = S.color),
                      4 === Eb.length && rb === THREE.VertexColors
                        ? ((Lb = Eb[0]),
                          (Mb = Eb[1]),
                          (Nb = Eb[2]),
                          (zb = Eb[3]))
                        : (zb = Nb = Mb = Lb = pb),
                      (Va[Ma] = Lb.r),
                      (Va[Ma + 1] = Lb.g),
                      (Va[Ma + 2] = Lb.b),
                      (Va[Ma + 3] = Mb.r),
                      (Va[Ma + 4] = Mb.g),
                      (Va[Ma + 5] = Mb.b),
                      (Va[Ma + 6] = Nb.r),
                      (Va[Ma + 7] = Nb.g),
                      (Va[Ma + 8] = Nb.b),
                      (Va[Ma + 9] = zb.r),
                      (Va[Ma + 10] = zb.g),
                      (Va[Ma + 11] = zb.b),
                      (Ma += 12);
                  0 < Ma &&
                    (k.bindBuffer(k.ARRAY_BUFFER, ra.__webglColorBuffer),
                    k.bufferData(k.ARRAY_BUFFER, Va, Ea));
                }
                if (Qc && fb.hasTangents) {
                  F = 0;
                  for ($ = ta.length; F < $; F++)
                    (S = $a[ta[F]]),
                      (Vb = S.vertexTangents),
                      (Fb = Vb[0]),
                      (Gb = Vb[1]),
                      (Hb = Vb[2]),
                      (Fa[Ba] = Fb.x),
                      (Fa[Ba + 1] = Fb.y),
                      (Fa[Ba + 2] = Fb.z),
                      (Fa[Ba + 3] = Fb.w),
                      (Fa[Ba + 4] = Gb.x),
                      (Fa[Ba + 5] = Gb.y),
                      (Fa[Ba + 6] = Gb.z),
                      (Fa[Ba + 7] = Gb.w),
                      (Fa[Ba + 8] = Hb.x),
                      (Fa[Ba + 9] = Hb.y),
                      (Fa[Ba + 10] = Hb.z),
                      (Fa[Ba + 11] = Hb.w),
                      (Ba += 12);
                  F = 0;
                  for ($ = ua.length; F < $; F++)
                    (S = $a[ua[F]]),
                      (Vb = S.vertexTangents),
                      (Fb = Vb[0]),
                      (Gb = Vb[1]),
                      (Hb = Vb[2]),
                      (qb = Vb[3]),
                      (Fa[Ba] = Fb.x),
                      (Fa[Ba + 1] = Fb.y),
                      (Fa[Ba + 2] = Fb.z),
                      (Fa[Ba + 3] = Fb.w),
                      (Fa[Ba + 4] = Gb.x),
                      (Fa[Ba + 5] = Gb.y),
                      (Fa[Ba + 6] = Gb.z),
                      (Fa[Ba + 7] = Gb.w),
                      (Fa[Ba + 8] = Hb.x),
                      (Fa[Ba + 9] = Hb.y),
                      (Fa[Ba + 10] = Hb.z),
                      (Fa[Ba + 11] = Hb.w),
                      (Fa[Ba + 12] = qb.x),
                      (Fa[Ba + 13] = qb.y),
                      (Fa[Ba + 14] = qb.z),
                      (Fa[Ba + 15] = qb.w),
                      (Ba += 16);
                  k.bindBuffer(k.ARRAY_BUFFER, ra.__webglTangentBuffer);
                  k.bufferData(k.ARRAY_BUFFER, Fa, Ea);
                }
                if (Pc && mb) {
                  F = 0;
                  for ($ = ta.length; F < $; F++)
                    if (
                      ((S = $a[ta[F]]),
                      (eb = S.vertexNormals),
                      (bb = S.normal),
                      3 === eb.length && lb)
                    )
                      for (wa = 0; 3 > wa; wa++)
                        (ac = eb[wa]),
                          (wb[Za] = ac.x),
                          (wb[Za + 1] = ac.y),
                          (wb[Za + 2] = ac.z),
                          (Za += 3);
                    else
                      for (wa = 0; 3 > wa; wa++)
                        (wb[Za] = bb.x),
                          (wb[Za + 1] = bb.y),
                          (wb[Za + 2] = bb.z),
                          (Za += 3);
                  F = 0;
                  for ($ = ua.length; F < $; F++)
                    if (
                      ((S = $a[ua[F]]),
                      (eb = S.vertexNormals),
                      (bb = S.normal),
                      4 === eb.length && lb)
                    )
                      for (wa = 0; 4 > wa; wa++)
                        (ac = eb[wa]),
                          (wb[Za] = ac.x),
                          (wb[Za + 1] = ac.y),
                          (wb[Za + 2] = ac.z),
                          (Za += 3);
                    else
                      for (wa = 0; 4 > wa; wa++)
                        (wb[Za] = bb.x),
                          (wb[Za + 1] = bb.y),
                          (wb[Za + 2] = bb.z),
                          (Za += 3);
                  k.bindBuffer(k.ARRAY_BUFFER, ra.__webglNormalBuffer);
                  k.bufferData(k.ARRAY_BUFFER, wb, Ea);
                }
                if (oc && Vc && ob) {
                  F = 0;
                  for ($ = ta.length; F < $; F++)
                    if (((ab = ta[F]), (jb = Vc[ab]), void 0 !== jb))
                      for (wa = 0; 3 > wa; wa++)
                        (kc = jb[wa]),
                          (pc[Xb] = kc.u),
                          (pc[Xb + 1] = kc.v),
                          (Xb += 2);
                  F = 0;
                  for ($ = ua.length; F < $; F++)
                    if (((ab = ua[F]), (jb = Vc[ab]), void 0 !== jb))
                      for (wa = 0; 4 > wa; wa++)
                        (kc = jb[wa]),
                          (pc[Xb] = kc.u),
                          (pc[Xb + 1] = kc.v),
                          (Xb += 2);
                  0 < Xb &&
                    (k.bindBuffer(k.ARRAY_BUFFER, ra.__webglUVBuffer),
                    k.bufferData(k.ARRAY_BUFFER, pc, Ea));
                }
                if (oc && Wc && ob) {
                  F = 0;
                  for ($ = ta.length; F < $; F++)
                    if (((ab = ta[F]), (kb = Wc[ab]), void 0 !== kb))
                      for (wa = 0; 3 > wa; wa++)
                        (lc = kb[wa]),
                          (qc[Yb] = lc.u),
                          (qc[Yb + 1] = lc.v),
                          (Yb += 2);
                  F = 0;
                  for ($ = ua.length; F < $; F++)
                    if (((ab = ua[F]), (kb = Wc[ab]), void 0 !== kb))
                      for (wa = 0; 4 > wa; wa++)
                        (lc = kb[wa]),
                          (qc[Yb] = lc.u),
                          (qc[Yb + 1] = lc.v),
                          (Yb += 2);
                  0 < Yb &&
                    (k.bindBuffer(k.ARRAY_BUFFER, ra.__webglUV2Buffer),
                    k.bufferData(k.ARRAY_BUFFER, qc, Ea));
                }
                if (xc) {
                  F = 0;
                  for ($ = ta.length; F < $; F++)
                    (Ub[vb] = La),
                      (Ub[vb + 1] = La + 1),
                      (Ub[vb + 2] = La + 2),
                      (vb += 3),
                      (nb[db] = La),
                      (nb[db + 1] = La + 1),
                      (nb[db + 2] = La),
                      (nb[db + 3] = La + 2),
                      (nb[db + 4] = La + 1),
                      (nb[db + 5] = La + 2),
                      (db += 6),
                      (La += 3);
                  F = 0;
                  for ($ = ua.length; F < $; F++)
                    (Ub[vb] = La),
                      (Ub[vb + 1] = La + 1),
                      (Ub[vb + 2] = La + 3),
                      (Ub[vb + 3] = La + 1),
                      (Ub[vb + 4] = La + 2),
                      (Ub[vb + 5] = La + 3),
                      (vb += 6),
                      (nb[db] = La),
                      (nb[db + 1] = La + 1),
                      (nb[db + 2] = La),
                      (nb[db + 3] = La + 3),
                      (nb[db + 4] = La + 1),
                      (nb[db + 5] = La + 2),
                      (nb[db + 6] = La + 2),
                      (nb[db + 7] = La + 3),
                      (db += 8),
                      (La += 4);
                  k.bindBuffer(k.ELEMENT_ARRAY_BUFFER, ra.__webglFaceBuffer);
                  k.bufferData(k.ELEMENT_ARRAY_BUFFER, Ub, Ea);
                  k.bindBuffer(k.ELEMENT_ARRAY_BUFFER, ra.__webglLineBuffer);
                  k.bufferData(k.ELEMENT_ARRAY_BUFFER, nb, Ea);
                }
                if (Uc) {
                  wa = 0;
                  for (gc = Uc.length; wa < gc; wa++)
                    if (((x = Uc[wa]), x.__original.needsUpdate)) {
                      y = 0;
                      if (1 === x.size)
                        if (void 0 === x.boundTo || "vertices" === x.boundTo) {
                          F = 0;
                          for ($ = ta.length; F < $; F++)
                            (S = $a[ta[F]]),
                              (x.array[y] = x.value[S.a]),
                              (x.array[y + 1] = x.value[S.b]),
                              (x.array[y + 2] = x.value[S.c]),
                              (y += 3);
                          F = 0;
                          for ($ = ua.length; F < $; F++)
                            (S = $a[ua[F]]),
                              (x.array[y] = x.value[S.a]),
                              (x.array[y + 1] = x.value[S.b]),
                              (x.array[y + 2] = x.value[S.c]),
                              (x.array[y + 3] = x.value[S.d]),
                              (y += 4);
                        } else {
                          if ("faces" === x.boundTo) {
                            F = 0;
                            for ($ = ta.length; F < $; F++)
                              (ya = x.value[ta[F]]),
                                (x.array[y] = ya),
                                (x.array[y + 1] = ya),
                                (x.array[y + 2] = ya),
                                (y += 3);
                            F = 0;
                            for ($ = ua.length; F < $; F++)
                              (ya = x.value[ua[F]]),
                                (x.array[y] = ya),
                                (x.array[y + 1] = ya),
                                (x.array[y + 2] = ya),
                                (x.array[y + 3] = ya),
                                (y += 4);
                          }
                        }
                      else if (2 === x.size)
                        if (void 0 === x.boundTo || "vertices" === x.boundTo) {
                          F = 0;
                          for ($ = ta.length; F < $; F++)
                            (S = $a[ta[F]]),
                              (U = x.value[S.a]),
                              (V = x.value[S.b]),
                              (W = x.value[S.c]),
                              (x.array[y] = U.x),
                              (x.array[y + 1] = U.y),
                              (x.array[y + 2] = V.x),
                              (x.array[y + 3] = V.y),
                              (x.array[y + 4] = W.x),
                              (x.array[y + 5] = W.y),
                              (y += 6);
                          F = 0;
                          for ($ = ua.length; F < $; F++)
                            (S = $a[ua[F]]),
                              (U = x.value[S.a]),
                              (V = x.value[S.b]),
                              (W = x.value[S.c]),
                              (pa = x.value[S.d]),
                              (x.array[y] = U.x),
                              (x.array[y + 1] = U.y),
                              (x.array[y + 2] = V.x),
                              (x.array[y + 3] = V.y),
                              (x.array[y + 4] = W.x),
                              (x.array[y + 5] = W.y),
                              (x.array[y + 6] = pa.x),
                              (x.array[y + 7] = pa.y),
                              (y += 8);
                        } else {
                          if ("faces" === x.boundTo) {
                            F = 0;
                            for ($ = ta.length; F < $; F++)
                              (W = V = U = ya = x.value[ta[F]]),
                                (x.array[y] = U.x),
                                (x.array[y + 1] = U.y),
                                (x.array[y + 2] = V.x),
                                (x.array[y + 3] = V.y),
                                (x.array[y + 4] = W.x),
                                (x.array[y + 5] = W.y),
                                (y += 6);
                            F = 0;
                            for ($ = ua.length; F < $; F++)
                              (pa = W = V = U = ya = x.value[ua[F]]),
                                (x.array[y] = U.x),
                                (x.array[y + 1] = U.y),
                                (x.array[y + 2] = V.x),
                                (x.array[y + 3] = V.y),
                                (x.array[y + 4] = W.x),
                                (x.array[y + 5] = W.y),
                                (x.array[y + 6] = pa.x),
                                (x.array[y + 7] = pa.y),
                                (y += 8);
                          }
                        }
                      else if (3 === x.size) {
                        var ea;
                        ea = "c" === x.type ? ["r", "g", "b"] : ["x", "y", "z"];
                        if (void 0 === x.boundTo || "vertices" === x.boundTo) {
                          F = 0;
                          for ($ = ta.length; F < $; F++)
                            (S = $a[ta[F]]),
                              (U = x.value[S.a]),
                              (V = x.value[S.b]),
                              (W = x.value[S.c]),
                              (x.array[y] = U[ea[0]]),
                              (x.array[y + 1] = U[ea[1]]),
                              (x.array[y + 2] = U[ea[2]]),
                              (x.array[y + 3] = V[ea[0]]),
                              (x.array[y + 4] = V[ea[1]]),
                              (x.array[y + 5] = V[ea[2]]),
                              (x.array[y + 6] = W[ea[0]]),
                              (x.array[y + 7] = W[ea[1]]),
                              (x.array[y + 8] = W[ea[2]]),
                              (y += 9);
                          F = 0;
                          for ($ = ua.length; F < $; F++)
                            (S = $a[ua[F]]),
                              (U = x.value[S.a]),
                              (V = x.value[S.b]),
                              (W = x.value[S.c]),
                              (pa = x.value[S.d]),
                              (x.array[y] = U[ea[0]]),
                              (x.array[y + 1] = U[ea[1]]),
                              (x.array[y + 2] = U[ea[2]]),
                              (x.array[y + 3] = V[ea[0]]),
                              (x.array[y + 4] = V[ea[1]]),
                              (x.array[y + 5] = V[ea[2]]),
                              (x.array[y + 6] = W[ea[0]]),
                              (x.array[y + 7] = W[ea[1]]),
                              (x.array[y + 8] = W[ea[2]]),
                              (x.array[y + 9] = pa[ea[0]]),
                              (x.array[y + 10] = pa[ea[1]]),
                              (x.array[y + 11] = pa[ea[2]]),
                              (y += 12);
                        } else if ("faces" === x.boundTo) {
                          F = 0;
                          for ($ = ta.length; F < $; F++)
                            (W = V = U = ya = x.value[ta[F]]),
                              (x.array[y] = U[ea[0]]),
                              (x.array[y + 1] = U[ea[1]]),
                              (x.array[y + 2] = U[ea[2]]),
                              (x.array[y + 3] = V[ea[0]]),
                              (x.array[y + 4] = V[ea[1]]),
                              (x.array[y + 5] = V[ea[2]]),
                              (x.array[y + 6] = W[ea[0]]),
                              (x.array[y + 7] = W[ea[1]]),
                              (x.array[y + 8] = W[ea[2]]),
                              (y += 9);
                          F = 0;
                          for ($ = ua.length; F < $; F++)
                            (pa = W = V = U = ya = x.value[ua[F]]),
                              (x.array[y] = U[ea[0]]),
                              (x.array[y + 1] = U[ea[1]]),
                              (x.array[y + 2] = U[ea[2]]),
                              (x.array[y + 3] = V[ea[0]]),
                              (x.array[y + 4] = V[ea[1]]),
                              (x.array[y + 5] = V[ea[2]]),
                              (x.array[y + 6] = W[ea[0]]),
                              (x.array[y + 7] = W[ea[1]]),
                              (x.array[y + 8] = W[ea[2]]),
                              (x.array[y + 9] = pa[ea[0]]),
                              (x.array[y + 10] = pa[ea[1]]),
                              (x.array[y + 11] = pa[ea[2]]),
                              (y += 12);
                        } else if ("faceVertices" === x.boundTo) {
                          F = 0;
                          for ($ = ta.length; F < $; F++)
                            (ya = x.value[ta[F]]),
                              (U = ya[0]),
                              (V = ya[1]),
                              (W = ya[2]),
                              (x.array[y] = U[ea[0]]),
                              (x.array[y + 1] = U[ea[1]]),
                              (x.array[y + 2] = U[ea[2]]),
                              (x.array[y + 3] = V[ea[0]]),
                              (x.array[y + 4] = V[ea[1]]),
                              (x.array[y + 5] = V[ea[2]]),
                              (x.array[y + 6] = W[ea[0]]),
                              (x.array[y + 7] = W[ea[1]]),
                              (x.array[y + 8] = W[ea[2]]),
                              (y += 9);
                          F = 0;
                          for ($ = ua.length; F < $; F++)
                            (ya = x.value[ua[F]]),
                              (U = ya[0]),
                              (V = ya[1]),
                              (W = ya[2]),
                              (pa = ya[3]),
                              (x.array[y] = U[ea[0]]),
                              (x.array[y + 1] = U[ea[1]]),
                              (x.array[y + 2] = U[ea[2]]),
                              (x.array[y + 3] = V[ea[0]]),
                              (x.array[y + 4] = V[ea[1]]),
                              (x.array[y + 5] = V[ea[2]]),
                              (x.array[y + 6] = W[ea[0]]),
                              (x.array[y + 7] = W[ea[1]]),
                              (x.array[y + 8] = W[ea[2]]),
                              (x.array[y + 9] = pa[ea[0]]),
                              (x.array[y + 10] = pa[ea[1]]),
                              (x.array[y + 11] = pa[ea[2]]),
                              (y += 12);
                        }
                      } else if (4 === x.size)
                        if (void 0 === x.boundTo || "vertices" === x.boundTo) {
                          F = 0;
                          for ($ = ta.length; F < $; F++)
                            (S = $a[ta[F]]),
                              (U = x.value[S.a]),
                              (V = x.value[S.b]),
                              (W = x.value[S.c]),
                              (x.array[y] = U.x),
                              (x.array[y + 1] = U.y),
                              (x.array[y + 2] = U.z),
                              (x.array[y + 3] = U.w),
                              (x.array[y + 4] = V.x),
                              (x.array[y + 5] = V.y),
                              (x.array[y + 6] = V.z),
                              (x.array[y + 7] = V.w),
                              (x.array[y + 8] = W.x),
                              (x.array[y + 9] = W.y),
                              (x.array[y + 10] = W.z),
                              (x.array[y + 11] = W.w),
                              (y += 12);
                          F = 0;
                          for ($ = ua.length; F < $; F++)
                            (S = $a[ua[F]]),
                              (U = x.value[S.a]),
                              (V = x.value[S.b]),
                              (W = x.value[S.c]),
                              (pa = x.value[S.d]),
                              (x.array[y] = U.x),
                              (x.array[y + 1] = U.y),
                              (x.array[y + 2] = U.z),
                              (x.array[y + 3] = U.w),
                              (x.array[y + 4] = V.x),
                              (x.array[y + 5] = V.y),
                              (x.array[y + 6] = V.z),
                              (x.array[y + 7] = V.w),
                              (x.array[y + 8] = W.x),
                              (x.array[y + 9] = W.y),
                              (x.array[y + 10] = W.z),
                              (x.array[y + 11] = W.w),
                              (x.array[y + 12] = pa.x),
                              (x.array[y + 13] = pa.y),
                              (x.array[y + 14] = pa.z),
                              (x.array[y + 15] = pa.w),
                              (y += 16);
                        } else if ("faces" === x.boundTo) {
                          F = 0;
                          for ($ = ta.length; F < $; F++)
                            (W = V = U = ya = x.value[ta[F]]),
                              (x.array[y] = U.x),
                              (x.array[y + 1] = U.y),
                              (x.array[y + 2] = U.z),
                              (x.array[y + 3] = U.w),
                              (x.array[y + 4] = V.x),
                              (x.array[y + 5] = V.y),
                              (x.array[y + 6] = V.z),
                              (x.array[y + 7] = V.w),
                              (x.array[y + 8] = W.x),
                              (x.array[y + 9] = W.y),
                              (x.array[y + 10] = W.z),
                              (x.array[y + 11] = W.w),
                              (y += 12);
                          F = 0;
                          for ($ = ua.length; F < $; F++)
                            (pa = W = V = U = ya = x.value[ua[F]]),
                              (x.array[y] = U.x),
                              (x.array[y + 1] = U.y),
                              (x.array[y + 2] = U.z),
                              (x.array[y + 3] = U.w),
                              (x.array[y + 4] = V.x),
                              (x.array[y + 5] = V.y),
                              (x.array[y + 6] = V.z),
                              (x.array[y + 7] = V.w),
                              (x.array[y + 8] = W.x),
                              (x.array[y + 9] = W.y),
                              (x.array[y + 10] = W.z),
                              (x.array[y + 11] = W.w),
                              (x.array[y + 12] = pa.x),
                              (x.array[y + 13] = pa.y),
                              (x.array[y + 14] = pa.z),
                              (x.array[y + 15] = pa.w),
                              (y += 16);
                        } else if ("faceVertices" === x.boundTo) {
                          F = 0;
                          for ($ = ta.length; F < $; F++)
                            (ya = x.value[ta[F]]),
                              (U = ya[0]),
                              (V = ya[1]),
                              (W = ya[2]),
                              (x.array[y] = U.x),
                              (x.array[y + 1] = U.y),
                              (x.array[y + 2] = U.z),
                              (x.array[y + 3] = U.w),
                              (x.array[y + 4] = V.x),
                              (x.array[y + 5] = V.y),
                              (x.array[y + 6] = V.z),
                              (x.array[y + 7] = V.w),
                              (x.array[y + 8] = W.x),
                              (x.array[y + 9] = W.y),
                              (x.array[y + 10] = W.z),
                              (x.array[y + 11] = W.w),
                              (y += 12);
                          F = 0;
                          for ($ = ua.length; F < $; F++)
                            (ya = x.value[ua[F]]),
                              (U = ya[0]),
                              (V = ya[1]),
                              (W = ya[2]),
                              (pa = ya[3]),
                              (x.array[y] = U.x),
                              (x.array[y + 1] = U.y),
                              (x.array[y + 2] = U.z),
                              (x.array[y + 3] = U.w),
                              (x.array[y + 4] = V.x),
                              (x.array[y + 5] = V.y),
                              (x.array[y + 6] = V.z),
                              (x.array[y + 7] = V.w),
                              (x.array[y + 8] = W.x),
                              (x.array[y + 9] = W.y),
                              (x.array[y + 10] = W.z),
                              (x.array[y + 11] = W.w),
                              (x.array[y + 12] = pa.x),
                              (x.array[y + 13] = pa.y),
                              (x.array[y + 14] = pa.z),
                              (x.array[y + 15] = pa.w),
                              (y += 16);
                        }
                      k.bindBuffer(k.ARRAY_BUFFER, x.buffer);
                      k.bufferData(k.ARRAY_BUFFER, x.array, Ea);
                    }
                }
                ib &&
                  (delete ra.__inittedArrays,
                  delete ra.__colorArray,
                  delete ra.__normalArray,
                  delete ra.__tangentArray,
                  delete ra.__uvArray,
                  delete ra.__uv2Array,
                  delete ra.__faceArray,
                  delete ra.__vertexArray,
                  delete ra.__lineArray,
                  delete ra.__skinIndexArray,
                  delete ra.__skinWeightArray);
              }
            }
          T.verticesNeedUpdate = !1;
          T.morphTargetsNeedUpdate = !1;
          T.elementsNeedUpdate = !1;
          T.uvsNeedUpdate = !1;
          T.normalsNeedUpdate = !1;
          T.colorsNeedUpdate = !1;
          T.tangentsNeedUpdate = !1;
          T.buffersNeedUpdate = !1;
          ma.attributes && r(ma);
        }
      else if (qa instanceof THREE.Ribbon) {
        ma = e(qa, T);
        va = ma.attributes && t(ma);
        if (
          T.verticesNeedUpdate ||
          T.colorsNeedUpdate ||
          T.normalsNeedUpdate ||
          va
        ) {
          var xb = T,
            Bc = k.DYNAMIC_DRAW,
            rc = void 0,
            sc = void 0,
            tc = void 0,
            Cc = void 0,
            za = void 0,
            Dc = void 0,
            Ec = void 0,
            Fc = void 0,
            Zc = void 0,
            Xa = void 0,
            mc = void 0,
            Ca = void 0,
            gb = void 0,
            $c = xb.vertices,
            ad = xb.colors,
            bd = xb.normals,
            jd = $c.length,
            kd = ad.length,
            ld = bd.length,
            Gc = xb.__vertexArray,
            Hc = xb.__colorArray,
            Ic = xb.__normalArray,
            md = xb.colorsNeedUpdate,
            nd = xb.normalsNeedUpdate,
            Xc = xb.__webglCustomAttributesList;
          if (xb.verticesNeedUpdate) {
            for (rc = 0; rc < jd; rc++)
              (Cc = $c[rc]),
                (za = 3 * rc),
                (Gc[za] = Cc.x),
                (Gc[za + 1] = Cc.y),
                (Gc[za + 2] = Cc.z);
            k.bindBuffer(k.ARRAY_BUFFER, xb.__webglVertexBuffer);
            k.bufferData(k.ARRAY_BUFFER, Gc, Bc);
          }
          if (md) {
            for (sc = 0; sc < kd; sc++)
              (Dc = ad[sc]),
                (za = 3 * sc),
                (Hc[za] = Dc.r),
                (Hc[za + 1] = Dc.g),
                (Hc[za + 2] = Dc.b);
            k.bindBuffer(k.ARRAY_BUFFER, xb.__webglColorBuffer);
            k.bufferData(k.ARRAY_BUFFER, Hc, Bc);
          }
          if (nd) {
            for (tc = 0; tc < ld; tc++)
              (Ec = bd[tc]),
                (za = 3 * tc),
                (Ic[za] = Ec.x),
                (Ic[za + 1] = Ec.y),
                (Ic[za + 2] = Ec.z);
            k.bindBuffer(k.ARRAY_BUFFER, xb.__webglNormalBuffer);
            k.bufferData(k.ARRAY_BUFFER, Ic, Bc);
          }
          if (Xc) {
            Fc = 0;
            for (Zc = Xc.length; Fc < Zc; Fc++)
              if (
                ((Ca = Xc[Fc]),
                Ca.needsUpdate &&
                  (void 0 === Ca.boundTo || "vertices" === Ca.boundTo))
              ) {
                za = 0;
                mc = Ca.value.length;
                if (1 === Ca.size)
                  for (Xa = 0; Xa < mc; Xa++) Ca.array[Xa] = Ca.value[Xa];
                else if (2 === Ca.size)
                  for (Xa = 0; Xa < mc; Xa++)
                    (gb = Ca.value[Xa]),
                      (Ca.array[za] = gb.x),
                      (Ca.array[za + 1] = gb.y),
                      (za += 2);
                else if (3 === Ca.size)
                  if ("c" === Ca.type)
                    for (Xa = 0; Xa < mc; Xa++)
                      (gb = Ca.value[Xa]),
                        (Ca.array[za] = gb.r),
                        (Ca.array[za + 1] = gb.g),
                        (Ca.array[za + 2] = gb.b),
                        (za += 3);
                  else
                    for (Xa = 0; Xa < mc; Xa++)
                      (gb = Ca.value[Xa]),
                        (Ca.array[za] = gb.x),
                        (Ca.array[za + 1] = gb.y),
                        (Ca.array[za + 2] = gb.z),
                        (za += 3);
                else if (4 === Ca.size)
                  for (Xa = 0; Xa < mc; Xa++)
                    (gb = Ca.value[Xa]),
                      (Ca.array[za] = gb.x),
                      (Ca.array[za + 1] = gb.y),
                      (Ca.array[za + 2] = gb.z),
                      (Ca.array[za + 3] = gb.w),
                      (za += 4);
                k.bindBuffer(k.ARRAY_BUFFER, Ca.buffer);
                k.bufferData(k.ARRAY_BUFFER, Ca.array, Bc);
              }
          }
        }
        T.verticesNeedUpdate = !1;
        T.colorsNeedUpdate = !1;
        T.normalsNeedUpdate = !1;
        ma.attributes && r(ma);
      } else if (qa instanceof THREE.Line) {
        ma = e(qa, T);
        va = ma.attributes && t(ma);
        if (
          T.verticesNeedUpdate ||
          T.colorsNeedUpdate ||
          T.lineDistancesNeedUpdate ||
          va
        ) {
          var yb = T,
            Jc = k.DYNAMIC_DRAW,
            uc = void 0,
            vc = void 0,
            wc = void 0,
            Kc = void 0,
            Ia = void 0,
            Lc = void 0,
            cd = yb.vertices,
            dd = yb.colors,
            ed = yb.lineDistances,
            od = cd.length,
            pd = dd.length,
            qd = ed.length,
            Mc = yb.__vertexArray,
            Nc = yb.__colorArray,
            fd = yb.__lineDistanceArray,
            rd = yb.colorsNeedUpdate,
            sd = yb.lineDistancesNeedUpdate,
            Yc = yb.__webglCustomAttributesList,
            Oc = void 0,
            gd = void 0,
            Ya = void 0,
            nc = void 0,
            hb = void 0,
            Da = void 0;
          if (yb.verticesNeedUpdate) {
            for (uc = 0; uc < od; uc++)
              (Kc = cd[uc]),
                (Ia = 3 * uc),
                (Mc[Ia] = Kc.x),
                (Mc[Ia + 1] = Kc.y),
                (Mc[Ia + 2] = Kc.z);
            k.bindBuffer(k.ARRAY_BUFFER, yb.__webglVertexBuffer);
            k.bufferData(k.ARRAY_BUFFER, Mc, Jc);
          }
          if (rd) {
            for (vc = 0; vc < pd; vc++)
              (Lc = dd[vc]),
                (Ia = 3 * vc),
                (Nc[Ia] = Lc.r),
                (Nc[Ia + 1] = Lc.g),
                (Nc[Ia + 2] = Lc.b);
            k.bindBuffer(k.ARRAY_BUFFER, yb.__webglColorBuffer);
            k.bufferData(k.ARRAY_BUFFER, Nc, Jc);
          }
          if (sd) {
            for (wc = 0; wc < qd; wc++) fd[wc] = ed[wc];
            k.bindBuffer(k.ARRAY_BUFFER, yb.__webglLineDistanceBuffer);
            k.bufferData(k.ARRAY_BUFFER, fd, Jc);
          }
          if (Yc) {
            Oc = 0;
            for (gd = Yc.length; Oc < gd; Oc++)
              if (
                ((Da = Yc[Oc]),
                Da.needsUpdate &&
                  (void 0 === Da.boundTo || "vertices" === Da.boundTo))
              ) {
                Ia = 0;
                nc = Da.value.length;
                if (1 === Da.size)
                  for (Ya = 0; Ya < nc; Ya++) Da.array[Ya] = Da.value[Ya];
                else if (2 === Da.size)
                  for (Ya = 0; Ya < nc; Ya++)
                    (hb = Da.value[Ya]),
                      (Da.array[Ia] = hb.x),
                      (Da.array[Ia + 1] = hb.y),
                      (Ia += 2);
                else if (3 === Da.size)
                  if ("c" === Da.type)
                    for (Ya = 0; Ya < nc; Ya++)
                      (hb = Da.value[Ya]),
                        (Da.array[Ia] = hb.r),
                        (Da.array[Ia + 1] = hb.g),
                        (Da.array[Ia + 2] = hb.b),
                        (Ia += 3);
                  else
                    for (Ya = 0; Ya < nc; Ya++)
                      (hb = Da.value[Ya]),
                        (Da.array[Ia] = hb.x),
                        (Da.array[Ia + 1] = hb.y),
                        (Da.array[Ia + 2] = hb.z),
                        (Ia += 3);
                else if (4 === Da.size)
                  for (Ya = 0; Ya < nc; Ya++)
                    (hb = Da.value[Ya]),
                      (Da.array[Ia] = hb.x),
                      (Da.array[Ia + 1] = hb.y),
                      (Da.array[Ia + 2] = hb.z),
                      (Da.array[Ia + 3] = hb.w),
                      (Ia += 4);
                k.bindBuffer(k.ARRAY_BUFFER, Da.buffer);
                k.bufferData(k.ARRAY_BUFFER, Da.array, Jc);
              }
          }
        }
        T.verticesNeedUpdate = !1;
        T.colorsNeedUpdate = !1;
        T.lineDistancesNeedUpdate = !1;
        ma.attributes && r(ma);
      } else
        qa instanceof THREE.ParticleSystem &&
          (T instanceof THREE.BufferGeometry
            ? ((T.verticesNeedUpdate || T.colorsNeedUpdate) &&
                j(T, k.DYNAMIC_DRAW, !T.dynamic),
              (T.verticesNeedUpdate = !1),
              (T.colorsNeedUpdate = !1))
            : ((ma = e(qa, T)),
              (va = ma.attributes && t(ma)),
              (T.verticesNeedUpdate ||
                T.colorsNeedUpdate ||
                qa.sortParticles ||
                va) &&
                i(T, k.DYNAMIC_DRAW, qa),
              (T.verticesNeedUpdate = !1),
              (T.colorsNeedUpdate = !1),
              ma.attributes && r(ma)));
    }
  };
  this.initMaterial = function (a, b, c, d) {
    var e, f, g, h, i, j, l, m, n;
    a instanceof THREE.MeshDepthMaterial
      ? (n = "depth")
      : a instanceof THREE.MeshNormalMaterial
      ? (n = "normal")
      : a instanceof THREE.MeshBasicMaterial
      ? (n = "basic")
      : a instanceof THREE.MeshLambertMaterial
      ? (n = "lambert")
      : a instanceof THREE.MeshPhongMaterial
      ? (n = "phong")
      : a instanceof THREE.LineBasicMaterial
      ? (n = "basic")
      : a instanceof THREE.LineDashedMaterial
      ? (n = "dashed")
      : a instanceof THREE.ParticleBasicMaterial && (n = "particle_basic");
    if (n) {
      var o = THREE.ShaderLib[n];
      a.uniforms = THREE.UniformsUtils.clone(o.uniforms);
      a.vertexShader = o.vertexShader;
      a.fragmentShader = o.fragmentShader;
    }
    var p, s, r;
    e = p = s = r = o = 0;
    for (f = b.length; e < f; e++)
      (g = b[e]),
        g.onlyShadow ||
          (g instanceof THREE.DirectionalLight && p++,
          g instanceof THREE.PointLight && s++,
          g instanceof THREE.SpotLight && r++,
          g instanceof THREE.HemisphereLight && o++);
    e = p;
    f = s;
    g = r;
    h = o;
    o = p = 0;
    for (r = b.length; o < r; o++)
      (s = b[o]),
        s.castShadow &&
          (s instanceof THREE.SpotLight && p++,
          s instanceof THREE.DirectionalLight && !s.shadowCascade && p++);
    m = p;
    hc && d && d.useVertexTexture
      ? (l = 1024)
      : ((b = k.getParameter(k.MAX_VERTEX_UNIFORM_VECTORS)),
        (b = Math.floor((b - 20) / 4)),
        void 0 !== d &&
          d instanceof THREE.SkinnedMesh &&
          ((b = Math.min(d.bones.length, b)),
          b < d.bones.length &&
            console.warn(
              "WebGLRenderer: too many bones - " +
                d.bones.length +
                ", this GPU supports just " +
                b +
                " (try OpenGL instead of ANGLE)"
            )),
        (l = b));
    var q;
    a: {
      s = a.fragmentShader;
      r = a.vertexShader;
      o = a.uniforms;
      b = a.attributes;
      p = a.defines;
      var c = {
          map: !!a.map,
          envMap: !!a.envMap,
          lightMap: !!a.lightMap,
          bumpMap: !!a.bumpMap,
          normalMap: !!a.normalMap,
          specularMap: !!a.specularMap,
          vertexColors: a.vertexColors,
          fog: c,
          useFog: a.fog,
          fogExp: c instanceof THREE.FogExp2,
          sizeAttenuation: a.sizeAttenuation,
          skinning: a.skinning,
          maxBones: l,
          useVertexTexture: hc && d && d.useVertexTexture,
          boneTextureWidth: d && d.boneTextureWidth,
          boneTextureHeight: d && d.boneTextureHeight,
          morphTargets: a.morphTargets,
          morphNormals: a.morphNormals,
          maxMorphTargets: this.maxMorphTargets,
          maxMorphNormals: this.maxMorphNormals,
          maxDirLights: e,
          maxPointLights: f,
          maxSpotLights: g,
          maxHemiLights: h,
          maxShadows: m,
          shadowMapEnabled: this.shadowMapEnabled && d.receiveShadow,
          shadowMapSoft: this.shadowMapSoft,
          shadowMapDebug: this.shadowMapDebug,
          shadowMapCascade: this.shadowMapCascade,
          alphaTest: a.alphaTest,
          metal: a.metal,
          perPixel: a.perPixel,
          wrapAround: a.wrapAround,
          doubleSided: a.side === THREE.DoubleSide,
          flipSided: a.side === THREE.BackSide,
        },
        t,
        u,
        v,
        d = [];
      n ? d.push(n) : (d.push(s), d.push(r));
      for (u in p) d.push(u), d.push(p[u]);
      for (t in c) d.push(t), d.push(c[t]);
      n = d.join();
      t = 0;
      for (u = oa.length; t < u; t++)
        if (((d = oa[t]), d.code === n)) {
          d.usedTimes++;
          q = d.program;
          break a;
        }
      t = [];
      for (v in p)
        (u = p[v]), !1 !== u && ((u = "#define " + v + " " + u), t.push(u));
      u = t.join("\n");
      v = k.createProgram();
      t = [
        "precision " + N + " float;",
        u,
        gc ? "#define VERTEX_TEXTURES" : "",
        L.gammaInput ? "#define GAMMA_INPUT" : "",
        L.gammaOutput ? "#define GAMMA_OUTPUT" : "",
        L.physicallyBasedShading ? "#define PHYSICALLY_BASED_SHADING" : "",
        "#define MAX_DIR_LIGHTS " + c.maxDirLights,
        "#define MAX_POINT_LIGHTS " + c.maxPointLights,
        "#define MAX_SPOT_LIGHTS " + c.maxSpotLights,
        "#define MAX_HEMI_LIGHTS " + c.maxHemiLights,
        "#define MAX_SHADOWS " + c.maxShadows,
        "#define MAX_BONES " + c.maxBones,
        c.map ? "#define USE_MAP" : "",
        c.envMap ? "#define USE_ENVMAP" : "",
        c.lightMap ? "#define USE_LIGHTMAP" : "",
        c.bumpMap ? "#define USE_BUMPMAP" : "",
        c.normalMap ? "#define USE_NORMALMAP" : "",
        c.specularMap ? "#define USE_SPECULARMAP" : "",
        c.vertexColors ? "#define USE_COLOR" : "",
        c.skinning ? "#define USE_SKINNING" : "",
        c.useVertexTexture ? "#define BONE_TEXTURE" : "",
        c.boneTextureWidth
          ? "#define N_BONE_PIXEL_X " + c.boneTextureWidth.toFixed(1)
          : "",
        c.boneTextureHeight
          ? "#define N_BONE_PIXEL_Y " + c.boneTextureHeight.toFixed(1)
          : "",
        c.morphTargets ? "#define USE_MORPHTARGETS" : "",
        c.morphNormals ? "#define USE_MORPHNORMALS" : "",
        c.perPixel ? "#define PHONG_PER_PIXEL" : "",
        c.wrapAround ? "#define WRAP_AROUND" : "",
        c.doubleSided ? "#define DOUBLE_SIDED" : "",
        c.flipSided ? "#define FLIP_SIDED" : "",
        c.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
        c.shadowMapSoft ? "#define SHADOWMAP_SOFT" : "",
        c.shadowMapDebug ? "#define SHADOWMAP_DEBUG" : "",
        c.shadowMapCascade ? "#define SHADOWMAP_CASCADE" : "",
        c.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "",
        "uniform mat4 modelMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nuniform vec3 cameraPosition;\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec2 uv;\nattribute vec2 uv2;\n#ifdef USE_COLOR\nattribute vec3 color;\n#endif\n#ifdef USE_MORPHTARGETS\nattribute vec3 morphTarget0;\nattribute vec3 morphTarget1;\nattribute vec3 morphTarget2;\nattribute vec3 morphTarget3;\n#ifdef USE_MORPHNORMALS\nattribute vec3 morphNormal0;\nattribute vec3 morphNormal1;\nattribute vec3 morphNormal2;\nattribute vec3 morphNormal3;\n#else\nattribute vec3 morphTarget4;\nattribute vec3 morphTarget5;\nattribute vec3 morphTarget6;\nattribute vec3 morphTarget7;\n#endif\n#endif\n#ifdef USE_SKINNING\nattribute vec4 skinIndex;\nattribute vec4 skinWeight;\n#endif\n",
      ].join("\n");
      u = [
        "precision " + N + " float;",
        c.bumpMap || c.normalMap
          ? "#extension GL_OES_standard_derivatives : enable"
          : "",
        u,
        "#define MAX_DIR_LIGHTS " + c.maxDirLights,
        "#define MAX_POINT_LIGHTS " + c.maxPointLights,
        "#define MAX_SPOT_LIGHTS " + c.maxSpotLights,
        "#define MAX_HEMI_LIGHTS " + c.maxHemiLights,
        "#define MAX_SHADOWS " + c.maxShadows,
        c.alphaTest ? "#define ALPHATEST " + c.alphaTest : "",
        L.gammaInput ? "#define GAMMA_INPUT" : "",
        L.gammaOutput ? "#define GAMMA_OUTPUT" : "",
        L.physicallyBasedShading ? "#define PHYSICALLY_BASED_SHADING" : "",
        c.useFog && c.fog ? "#define USE_FOG" : "",
        c.useFog && c.fogExp ? "#define FOG_EXP2" : "",
        c.map ? "#define USE_MAP" : "",
        c.envMap ? "#define USE_ENVMAP" : "",
        c.lightMap ? "#define USE_LIGHTMAP" : "",
        c.bumpMap ? "#define USE_BUMPMAP" : "",
        c.normalMap ? "#define USE_NORMALMAP" : "",
        c.specularMap ? "#define USE_SPECULARMAP" : "",
        c.vertexColors ? "#define USE_COLOR" : "",
        c.metal ? "#define METAL" : "",
        c.perPixel ? "#define PHONG_PER_PIXEL" : "",
        c.wrapAround ? "#define WRAP_AROUND" : "",
        c.doubleSided ? "#define DOUBLE_SIDED" : "",
        c.flipSided ? "#define FLIP_SIDED" : "",
        c.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
        c.shadowMapSoft ? "#define SHADOWMAP_SOFT" : "",
        c.shadowMapDebug ? "#define SHADOWMAP_DEBUG" : "",
        c.shadowMapCascade ? "#define SHADOWMAP_CASCADE" : "",
        "uniform mat4 viewMatrix;\nuniform vec3 cameraPosition;\n",
      ].join("\n");
      u = G("fragment", u + s);
      t = G("vertex", t + r);
      k.attachShader(v, t);
      k.attachShader(v, u);
      k.linkProgram(v);
      k.getProgramParameter(v, k.LINK_STATUS) ||
        console.error(
          "Could not initialise shader\nVALIDATE_STATUS: " +
            k.getProgramParameter(v, k.VALIDATE_STATUS) +
            ", gl error [" +
            k.getError() +
            "]"
        );
      k.deleteShader(u);
      k.deleteShader(t);
      v.uniforms = {};
      v.attributes = {};
      var w;
      t =
        "viewMatrix modelViewMatrix projectionMatrix normalMatrix modelMatrix cameraPosition morphTargetInfluences".split(
          " "
        );
      c.useVertexTexture ? t.push("boneTexture") : t.push("boneGlobalMatrices");
      for (w in o) t.push(w);
      w = t;
      t = 0;
      for (u = w.length; t < u; t++)
        (d = w[t]), (v.uniforms[d] = k.getUniformLocation(v, d));
      t =
        "position normal uv uv2 tangent color skinIndex skinWeight lineDistance".split(
          " "
        );
      for (w = 0; w < c.maxMorphTargets; w++) t.push("morphTarget" + w);
      for (w = 0; w < c.maxMorphNormals; w++) t.push("morphNormal" + w);
      for (q in b) t.push(q);
      q = t;
      w = 0;
      for (b = q.length; w < b; w++)
        (t = q[w]), (v.attributes[t] = k.getAttribLocation(v, t));
      v.id = X++;
      oa.push({
        program: v,
        code: n,
        usedTimes: 1,
      });
      L.info.memory.programs = oa.length;
      q = v;
    }
    a.program = q;
    q = a.program.attributes;
    0 <= q.position && k.enableVertexAttribArray(q.position);
    0 <= q.color && k.enableVertexAttribArray(q.color);
    0 <= q.normal && k.enableVertexAttribArray(q.normal);
    0 <= q.tangent && k.enableVertexAttribArray(q.tangent);
    0 <= q.lineDistance && k.enableVertexAttribArray(q.lineDistance);
    a.skinning &&
      0 <= q.skinIndex &&
      0 <= q.skinWeight &&
      (k.enableVertexAttribArray(q.skinIndex),
      k.enableVertexAttribArray(q.skinWeight));
    if (a.attributes)
      for (j in a.attributes)
        void 0 !== q[j] && 0 <= q[j] && k.enableVertexAttribArray(q[j]);
    if (a.morphTargets) {
      a.numSupportedMorphTargets = 0;
      v = "morphTarget";
      for (j = 0; j < this.maxMorphTargets; j++)
        (w = v + j),
          0 <= q[w] &&
            (k.enableVertexAttribArray(q[w]), a.numSupportedMorphTargets++);
    }
    if (a.morphNormals) {
      a.numSupportedMorphNormals = 0;
      v = "morphNormal";
      for (j = 0; j < this.maxMorphNormals; j++)
        (w = v + j),
          0 <= q[w] &&
            (k.enableVertexAttribArray(q[w]), a.numSupportedMorphNormals++);
    }
    a.uniformsList = [];
    for (i in a.uniforms) a.uniformsList.push([a.uniforms[i], i]);
  };
  this.setFaceCulling = function (a, b) {
    a
      ? (!b || "ccw" === b ? k.frontFace(k.CCW) : k.frontFace(k.CW),
        "back" === a
          ? k.cullFace(k.BACK)
          : "front" === a
          ? k.cullFace(k.FRONT)
          : k.cullFace(k.FRONT_AND_BACK),
        k.enable(k.CULL_FACE))
      : k.disable(k.CULL_FACE);
  };
  this.setMaterialFaces = function (a) {
    var b = a.side === THREE.DoubleSide,
      a = a.side === THREE.BackSide;
    Na !== b && (b ? k.disable(k.CULL_FACE) : k.enable(k.CULL_FACE), (Na = b));
    Ja !== a && (a ? k.frontFace(k.CW) : k.frontFace(k.CCW), (Ja = a));
  };
  this.setDepthTest = function (a) {
    ib !== a &&
      (a ? k.enable(k.DEPTH_TEST) : k.disable(k.DEPTH_TEST), (ib = a));
  };
  this.setDepthWrite = function (a) {
    ob !== a && (k.depthMask(a), (ob = a));
  };
  this.setBlending = function (a, b, c, d) {
    a !== ma &&
      (a === THREE.NoBlending
        ? k.disable(k.BLEND)
        : a === THREE.AdditiveBlending
        ? (k.enable(k.BLEND),
          k.blendEquation(k.FUNC_ADD),
          k.blendFunc(k.SRC_ALPHA, k.ONE))
        : a === THREE.SubtractiveBlending
        ? (k.enable(k.BLEND),
          k.blendEquation(k.FUNC_ADD),
          k.blendFunc(k.ZERO, k.ONE_MINUS_SRC_COLOR))
        : a === THREE.MultiplyBlending
        ? (k.enable(k.BLEND),
          k.blendEquation(k.FUNC_ADD),
          k.blendFunc(k.ZERO, k.SRC_COLOR))
        : a === THREE.CustomBlending
        ? k.enable(k.BLEND)
        : (k.enable(k.BLEND),
          k.blendEquationSeparate(k.FUNC_ADD, k.FUNC_ADD),
          k.blendFuncSeparate(
            k.SRC_ALPHA,
            k.ONE_MINUS_SRC_ALPHA,
            k.ONE,
            k.ONE_MINUS_SRC_ALPHA
          )),
      (ma = a));
    if (a === THREE.CustomBlending) {
      if ((b !== sa && (k.blendEquation(H(b)), (sa = b)), c !== Ea || d !== rb))
        k.blendFunc(H(c), H(d)), (Ea = c), (rb = d);
    } else rb = Ea = sa = null;
  };
  this.setTexture = function (a, b) {
    if (a.needsUpdate) {
      a.__webglInit ||
        ((a.__webglInit = !0),
        (a.__webglTexture = k.createTexture()),
        L.info.memory.textures++);
      k.activeTexture(k.TEXTURE0 + b);
      k.bindTexture(k.TEXTURE_2D, a.__webglTexture);
      k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL, a.flipY);
      k.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL, a.premultiplyAlpha);
      var c = a.image,
        d =
          0 === (c.width & (c.width - 1)) && 0 === (c.height & (c.height - 1)),
        e = H(a.format),
        f = H(a.type);
      P(k.TEXTURE_2D, a, d);
      if (a instanceof THREE.CompressedTexture)
        for (var f = a.mipmaps, g = 0, h = f.length; g < h; g++)
          (c = f[g]),
            k.compressedTexImage2D(
              k.TEXTURE_2D,
              g,
              e,
              c.width,
              c.height,
              0,
              c.data
            );
      else
        a instanceof THREE.DataTexture
          ? k.texImage2D(k.TEXTURE_2D, 0, e, c.width, c.height, 0, e, f, c.data)
          : k.texImage2D(k.TEXTURE_2D, 0, e, e, f, a.image);
      a.generateMipmaps && d && k.generateMipmap(k.TEXTURE_2D);
      a.needsUpdate = !1;
      if (a.onUpdate) a.onUpdate();
    } else
      k.activeTexture(k.TEXTURE0 + b),
        k.bindTexture(k.TEXTURE_2D, a.__webglTexture);
  };
  this.setRenderTarget = function (a) {
    var b = a instanceof THREE.WebGLRenderTargetCube;
    if (a && !a.__webglFramebuffer) {
      void 0 === a.depthBuffer && (a.depthBuffer = !0);
      void 0 === a.stencilBuffer && (a.stencilBuffer = !0);
      a.__webglTexture = k.createTexture();
      var c =
          0 === (a.width & (a.width - 1)) && 0 === (a.height & (a.height - 1)),
        d = H(a.format),
        e = H(a.type);
      if (b) {
        a.__webglFramebuffer = [];
        a.__webglRenderbuffer = [];
        k.bindTexture(k.TEXTURE_CUBE_MAP, a.__webglTexture);
        P(k.TEXTURE_CUBE_MAP, a, c);
        for (var f = 0; 6 > f; f++) {
          a.__webglFramebuffer[f] = k.createFramebuffer();
          a.__webglRenderbuffer[f] = k.createRenderbuffer();
          k.texImage2D(
            k.TEXTURE_CUBE_MAP_POSITIVE_X + f,
            0,
            d,
            a.width,
            a.height,
            0,
            d,
            e,
            null
          );
          var g = a,
            h = k.TEXTURE_CUBE_MAP_POSITIVE_X + f;
          k.bindFramebuffer(k.FRAMEBUFFER, a.__webglFramebuffer[f]);
          k.framebufferTexture2D(
            k.FRAMEBUFFER,
            k.COLOR_ATTACHMENT0,
            h,
            g.__webglTexture,
            0
          );
          B(a.__webglRenderbuffer[f], a);
        }
        c && k.generateMipmap(k.TEXTURE_CUBE_MAP);
      } else
        (a.__webglFramebuffer = k.createFramebuffer()),
          (a.__webglRenderbuffer = k.createRenderbuffer()),
          k.bindTexture(k.TEXTURE_2D, a.__webglTexture),
          P(k.TEXTURE_2D, a, c),
          k.texImage2D(k.TEXTURE_2D, 0, d, a.width, a.height, 0, d, e, null),
          (d = k.TEXTURE_2D),
          k.bindFramebuffer(k.FRAMEBUFFER, a.__webglFramebuffer),
          k.framebufferTexture2D(
            k.FRAMEBUFFER,
            k.COLOR_ATTACHMENT0,
            d,
            a.__webglTexture,
            0
          ),
          B(a.__webglRenderbuffer, a),
          c && k.generateMipmap(k.TEXTURE_2D);
      b
        ? k.bindTexture(k.TEXTURE_CUBE_MAP, null)
        : k.bindTexture(k.TEXTURE_2D, null);
      k.bindRenderbuffer(k.RENDERBUFFER, null);
      k.bindFramebuffer(k.FRAMEBUFFER, null);
    }
    a
      ? ((b = b
          ? a.__webglFramebuffer[a.activeCubeFace]
          : a.__webglFramebuffer),
        (c = a.width),
        (a = a.height),
        (e = d = 0))
      : ((b = null), (c = kb), (a = Oa), (d = Sa), (e = Ka));
    b !== ca &&
      (k.bindFramebuffer(k.FRAMEBUFFER, b), k.viewport(d, e, c, a), (ca = b));
    lb = c;
    ab = a;
  };
  this.shadowMapPlugin = new THREE.ShadowMapPlugin();
  this.addPrePlugin(this.shadowMapPlugin);
  this.addPostPlugin(new THREE.SpritePlugin());
  this.addPostPlugin(new THREE.LensFlarePlugin());
};
THREE.WebGLRenderTarget = function (a, b, c) {
  this.width = a;
  this.height = b;
  c = c || {};
  this.wrapS = void 0 !== c.wrapS ? c.wrapS : THREE.ClampToEdgeWrapping;
  this.wrapT = void 0 !== c.wrapT ? c.wrapT : THREE.ClampToEdgeWrapping;
  this.magFilter = void 0 !== c.magFilter ? c.magFilter : THREE.LinearFilter;
  this.minFilter =
    void 0 !== c.minFilter ? c.minFilter : THREE.LinearMipMapLinearFilter;
  this.anisotropy = void 0 !== c.anisotropy ? c.anisotropy : 1;
  this.offset = new THREE.Vector2(0, 0);
  this.repeat = new THREE.Vector2(1, 1);
  this.format = void 0 !== c.format ? c.format : THREE.RGBAFormat;
  this.type = void 0 !== c.type ? c.type : THREE.UnsignedByteType;
  this.depthBuffer = void 0 !== c.depthBuffer ? c.depthBuffer : !0;
  this.stencilBuffer = void 0 !== c.stencilBuffer ? c.stencilBuffer : !0;
  this.generateMipmaps = !0;
};
THREE.WebGLRenderTarget.prototype.clone = function () {
  var a = new THREE.WebGLRenderTarget(this.width, this.height);
  a.wrapS = this.wrapS;
  a.wrapT = this.wrapT;
  a.magFilter = this.magFilter;
  a.anisotropy = this.anisotropy;
  a.minFilter = this.minFilter;
  a.offset.copy(this.offset);
  a.repeat.copy(this.repeat);
  a.format = this.format;
  a.type = this.type;
  a.depthBuffer = this.depthBuffer;
  a.stencilBuffer = this.stencilBuffer;
  a.generateMipmaps = this.generateMipmaps;
  return a;
};
THREE.WebGLRenderTargetCube = function (a, b, c) {
  THREE.WebGLRenderTarget.call(this, a, b, c);
  this.activeCubeFace = 0;
};
THREE.WebGLRenderTargetCube.prototype = Object.create(
  THREE.WebGLRenderTarget.prototype
);
THREE.RenderableVertex = function () {
  this.positionWorld = new THREE.Vector3();
  this.positionScreen = new THREE.Vector4();
  this.visible = !0;
};
THREE.RenderableVertex.prototype.copy = function (a) {
  this.positionWorld.copy(a.positionWorld);
  this.positionScreen.copy(a.positionScreen);
};
THREE.RenderableFace3 = function () {
  this.v1 = new THREE.RenderableVertex();
  this.v2 = new THREE.RenderableVertex();
  this.v3 = new THREE.RenderableVertex();
  this.centroidWorld = new THREE.Vector3();
  this.centroidScreen = new THREE.Vector3();
  this.normalWorld = new THREE.Vector3();
  this.vertexNormalsWorld = [
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3(),
  ];
  this.vertexNormalsLength = 0;
  this.material = this.color = null;
  this.uvs = [[]];
  this.z = null;
};
THREE.RenderableFace4 = function () {
  this.v1 = new THREE.RenderableVertex();
  this.v2 = new THREE.RenderableVertex();
  this.v3 = new THREE.RenderableVertex();
  this.v4 = new THREE.RenderableVertex();
  this.centroidWorld = new THREE.Vector3();
  this.centroidScreen = new THREE.Vector3();
  this.normalWorld = new THREE.Vector3();
  this.vertexNormalsWorld = [
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3(),
  ];
  this.vertexNormalsLength = 0;
  this.material = this.color = null;
  this.uvs = [[]];
  this.z = null;
};
THREE.RenderableObject = function () {
  this.z = this.object = null;
};
THREE.RenderableParticle = function () {
  this.rotation = this.z = this.y = this.x = this.object = null;
  this.scale = new THREE.Vector2();
  this.material = null;
};
THREE.RenderableLine = function () {
  this.z = null;
  this.v1 = new THREE.RenderableVertex();
  this.v2 = new THREE.RenderableVertex();
  this.material = null;
};
THREE.ColorUtils = {
  adjustHSV: function (a, b, c, d) {
    var e = THREE.ColorUtils.__hsv;
    a.getHSV(e);
    e.h = THREE.Math.clamp(e.h + b, 0, 1);
    e.s = THREE.Math.clamp(e.s + c, 0, 1);
    e.v = THREE.Math.clamp(e.v + d, 0, 1);
    a.setHSV(e.h, e.s, e.v);
  },
};
THREE.ColorUtils.__hsv = {
  h: 0,
  s: 0,
  v: 0,
};
THREE.GeometryUtils = {
  merge: function (a, b) {
    var c,
      d,
      e = a.vertices.length,
      f = b instanceof THREE.Mesh ? b.geometry : b,
      g = a.vertices,
      h = f.vertices,
      i = a.faces,
      j = f.faces,
      l = a.faceVertexUvs[0],
      f = f.faceVertexUvs[0];
    b instanceof THREE.Mesh &&
      (b.matrixAutoUpdate && b.updateMatrix(),
      (c = b.matrix),
      (d = new THREE.Matrix4()),
      d.extractRotation(c, b.scale));
    for (var m = 0, n = h.length; m < n; m++) {
      var p = h[m].clone();
      c && c.multiplyVector3(p);
      g.push(p);
    }
    m = 0;
    for (n = j.length; m < n; m++) {
      var p = j[m],
        o,
        s,
        t = p.vertexNormals,
        r = p.vertexColors;
      p instanceof THREE.Face3
        ? (o = new THREE.Face3(p.a + e, p.b + e, p.c + e))
        : p instanceof THREE.Face4 &&
          (o = new THREE.Face4(p.a + e, p.b + e, p.c + e, p.d + e));
      o.normal.copy(p.normal);
      d && d.multiplyVector3(o.normal);
      g = 0;
      for (h = t.length; g < h; g++)
        (s = t[g].clone()), d && d.multiplyVector3(s), o.vertexNormals.push(s);
      o.color.copy(p.color);
      g = 0;
      for (h = r.length; g < h; g++) (s = r[g]), o.vertexColors.push(s.clone());
      o.materialIndex = p.materialIndex;
      o.centroid.copy(p.centroid);
      c && c.multiplyVector3(o.centroid);
      i.push(o);
    }
    m = 0;
    for (n = f.length; m < n; m++) {
      c = f[m];
      d = [];
      g = 0;
      for (h = c.length; g < h; g++) d.push(new THREE.UV(c[g].u, c[g].v));
      l.push(d);
    }
  },
  removeMaterials: function (a, b) {
    for (var c = {}, d = 0, e = b.length; d < e; d++) c[b[d]] = !0;
    for (var f, g = [], d = 0, e = a.faces.length; d < e; d++)
      (f = a.faces[d]), f.materialIndex in c || g.push(f);
    a.faces = g;
  },
  randomPointInTriangle: function (a, b, c) {
    var d,
      e,
      f,
      g = new THREE.Vector3(),
      h = THREE.GeometryUtils.__v1;
    d = THREE.GeometryUtils.random();
    e = THREE.GeometryUtils.random();
    1 < d + e && ((d = 1 - d), (e = 1 - e));
    f = 1 - d - e;
    g.copy(a);
    g.multiplyScalar(d);
    h.copy(b);
    h.multiplyScalar(e);
    g.addSelf(h);
    h.copy(c);
    h.multiplyScalar(f);
    g.addSelf(h);
    return g;
  },
  randomPointInFace: function (a, b, c) {
    var d, e, f;
    if (a instanceof THREE.Face3)
      return (
        (d = b.vertices[a.a]),
        (e = b.vertices[a.b]),
        (f = b.vertices[a.c]),
        THREE.GeometryUtils.randomPointInTriangle(d, e, f)
      );
    if (a instanceof THREE.Face4) {
      d = b.vertices[a.a];
      e = b.vertices[a.b];
      f = b.vertices[a.c];
      var b = b.vertices[a.d],
        g;
      c
        ? a._area1 && a._area2
          ? ((c = a._area1), (g = a._area2))
          : ((c = THREE.GeometryUtils.triangleArea(d, e, b)),
            (g = THREE.GeometryUtils.triangleArea(e, f, b)),
            (a._area1 = c),
            (a._area2 = g))
        : ((c = THREE.GeometryUtils.triangleArea(d, e, b)),
          (g = THREE.GeometryUtils.triangleArea(e, f, b)));
      return THREE.GeometryUtils.random() * (c + g) < c
        ? THREE.GeometryUtils.randomPointInTriangle(d, e, b)
        : THREE.GeometryUtils.randomPointInTriangle(e, f, b);
    }
  },
  randomPointsInGeometry: function (a, b) {
    function c(a) {
      function b(c, d) {
        if (d < c) return c;
        var e = c + Math.floor((d - c) / 2);
        return j[e] > a ? b(c, e - 1) : j[e] < a ? b(e + 1, d) : e;
      }
      return b(0, j.length - 1);
    }
    var d,
      e,
      f = a.faces,
      g = a.vertices,
      h = f.length,
      i = 0,
      j = [],
      l,
      m,
      n,
      p;
    for (e = 0; e < h; e++)
      (d = f[e]),
        d instanceof THREE.Face3
          ? ((l = g[d.a]),
            (m = g[d.b]),
            (n = g[d.c]),
            (d._area = THREE.GeometryUtils.triangleArea(l, m, n)))
          : d instanceof THREE.Face4 &&
            ((l = g[d.a]),
            (m = g[d.b]),
            (n = g[d.c]),
            (p = g[d.d]),
            (d._area1 = THREE.GeometryUtils.triangleArea(l, m, p)),
            (d._area2 = THREE.GeometryUtils.triangleArea(m, n, p)),
            (d._area = d._area1 + d._area2)),
        (i += d._area),
        (j[e] = i);
    d = [];
    for (e = 0; e < b; e++)
      (g = THREE.GeometryUtils.random() * i),
        (g = c(g)),
        (d[e] = THREE.GeometryUtils.randomPointInFace(f[g], a, !0));
    return d;
  },
  triangleArea: function (a, b, c) {
    var d,
      e = THREE.GeometryUtils.__v1;
    e.sub(a, b);
    d = e.length();
    e.sub(a, c);
    a = e.length();
    e.sub(b, c);
    c = e.length();
    b = 0.5 * (d + a + c);
    return Math.sqrt(b * (b - d) * (b - a) * (b - c));
  },
  center: function (a) {
    a.computeBoundingBox();
    var b = a.boundingBox,
      c = new THREE.Vector3();
    c.add(b.min, b.max);
    c.multiplyScalar(-0.5);
    a.applyMatrix(new THREE.Matrix4().makeTranslation(c.x, c.y, c.z));
    a.computeBoundingBox();
    return c;
  },
  normalizeUVs: function (a) {
    for (var a = a.faceVertexUvs[0], b = 0, c = a.length; b < c; b++)
      for (var d = a[b], e = 0, f = d.length; e < f; e++)
        if ((1 !== d[e].u && (d[e].u -= Math.floor(d[e].u)), 1 !== d[e].v))
          d[e].v -= Math.floor(d[e].v);
  },
  triangulateQuads: function (a) {
    var b,
      c,
      d,
      e,
      f = [],
      g = [],
      h = [];
    b = 0;
    for (c = a.faceUvs.length; b < c; b++) g[b] = [];
    b = 0;
    for (c = a.faceVertexUvs.length; b < c; b++) h[b] = [];
    b = 0;
    for (c = a.faces.length; b < c; b++)
      if (((d = a.faces[b]), d instanceof THREE.Face4)) {
        e = d.a;
        var i = d.b,
          j = d.c,
          l = d.d,
          m = new THREE.Face3(),
          n = new THREE.Face3();
        m.color.copy(d.color);
        n.color.copy(d.color);
        m.materialIndex = d.materialIndex;
        n.materialIndex = d.materialIndex;
        m.a = e;
        m.b = i;
        m.c = l;
        n.a = i;
        n.b = j;
        n.c = l;
        4 === d.vertexColors.length &&
          ((m.vertexColors[0] = d.vertexColors[0].clone()),
          (m.vertexColors[1] = d.vertexColors[1].clone()),
          (m.vertexColors[2] = d.vertexColors[3].clone()),
          (n.vertexColors[0] = d.vertexColors[1].clone()),
          (n.vertexColors[1] = d.vertexColors[2].clone()),
          (n.vertexColors[2] = d.vertexColors[3].clone()));
        f.push(m, n);
        d = 0;
        for (e = a.faceVertexUvs.length; d < e; d++)
          a.faceVertexUvs[d].length &&
            ((m = a.faceVertexUvs[d][b]),
            (i = m[1]),
            (j = m[2]),
            (l = m[3]),
            (m = [m[0].clone(), i.clone(), l.clone()]),
            (i = [i.clone(), j.clone(), l.clone()]),
            h[d].push(m, i));
        d = 0;
        for (e = a.faceUvs.length; d < e; d++)
          a.faceUvs[d].length && ((i = a.faceUvs[d][b]), g[d].push(i, i));
      } else {
        f.push(d);
        d = 0;
        for (e = a.faceUvs.length; d < e; d++) g[d].push(a.faceUvs[d][b]);
        d = 0;
        for (e = a.faceVertexUvs.length; d < e; d++)
          h[d].push(a.faceVertexUvs[d][b]);
      }
    a.faces = f;
    a.faceUvs = g;
    a.faceVertexUvs = h;
    a.computeCentroids();
    a.computeFaceNormals();
    a.computeVertexNormals();
    a.hasTangents && a.computeTangents();
  },
  explode: function (a) {
    for (var b = [], c = 0, d = a.faces.length; c < d; c++) {
      var e = b.length,
        f = a.faces[c];
      if (f instanceof THREE.Face4) {
        var g = f.a,
          h = f.b,
          i = f.c,
          g = a.vertices[g],
          h = a.vertices[h],
          i = a.vertices[i],
          j = a.vertices[f.d];
        b.push(g.clone());
        b.push(h.clone());
        b.push(i.clone());
        b.push(j.clone());
        f.a = e;
        f.b = e + 1;
        f.c = e + 2;
        f.d = e + 3;
      } else
        (g = f.a),
          (h = f.b),
          (i = f.c),
          (g = a.vertices[g]),
          (h = a.vertices[h]),
          (i = a.vertices[i]),
          b.push(g.clone()),
          b.push(h.clone()),
          b.push(i.clone()),
          (f.a = e),
          (f.b = e + 1),
          (f.c = e + 2);
    }
    a.vertices = b;
    delete a.__tmpVertices;
  },
  tessellate: function (a, b) {
    var c,
      d,
      e,
      f,
      g,
      h,
      i,
      j,
      l,
      m,
      n,
      p,
      o,
      s,
      t,
      r,
      z,
      w,
      q,
      E = [],
      A = [];
    c = 0;
    for (d = a.faceVertexUvs.length; c < d; c++) A[c] = [];
    c = 0;
    for (d = a.faces.length; c < d; c++)
      if (((e = a.faces[c]), e instanceof THREE.Face3))
        if (
          ((f = e.a),
          (g = e.b),
          (h = e.c),
          (j = a.vertices[f]),
          (l = a.vertices[g]),
          (m = a.vertices[h]),
          (p = j.distanceTo(l)),
          (o = l.distanceTo(m)),
          (n = j.distanceTo(m)),
          p > b || o > b || n > b)
        ) {
          i = a.vertices.length;
          w = e.clone();
          q = e.clone();
          p >= o && p >= n
            ? ((j = j.clone()),
              j.lerpSelf(l, 0.5),
              (w.a = f),
              (w.b = i),
              (w.c = h),
              (q.a = i),
              (q.b = g),
              (q.c = h),
              3 === e.vertexNormals.length &&
                ((f = e.vertexNormals[0].clone()),
                f.lerpSelf(e.vertexNormals[1], 0.5),
                w.vertexNormals[1].copy(f),
                q.vertexNormals[0].copy(f)),
              3 === e.vertexColors.length &&
                ((f = e.vertexColors[0].clone()),
                f.lerpSelf(e.vertexColors[1], 0.5),
                w.vertexColors[1].copy(f),
                q.vertexColors[0].copy(f)),
              (e = 0))
            : o >= p && o >= n
            ? ((j = l.clone()),
              j.lerpSelf(m, 0.5),
              (w.a = f),
              (w.b = g),
              (w.c = i),
              (q.a = i),
              (q.b = h),
              (q.c = f),
              3 === e.vertexNormals.length &&
                ((f = e.vertexNormals[1].clone()),
                f.lerpSelf(e.vertexNormals[2], 0.5),
                w.vertexNormals[2].copy(f),
                q.vertexNormals[0].copy(f),
                q.vertexNormals[1].copy(e.vertexNormals[2]),
                q.vertexNormals[2].copy(e.vertexNormals[0])),
              3 === e.vertexColors.length &&
                ((f = e.vertexColors[1].clone()),
                f.lerpSelf(e.vertexColors[2], 0.5),
                w.vertexColors[2].copy(f),
                q.vertexColors[0].copy(f),
                q.vertexColors[1].copy(e.vertexColors[2]),
                q.vertexColors[2].copy(e.vertexColors[0])),
              (e = 1))
            : ((j = j.clone()),
              j.lerpSelf(m, 0.5),
              (w.a = f),
              (w.b = g),
              (w.c = i),
              (q.a = i),
              (q.b = g),
              (q.c = h),
              3 === e.vertexNormals.length &&
                ((f = e.vertexNormals[0].clone()),
                f.lerpSelf(e.vertexNormals[2], 0.5),
                w.vertexNormals[2].copy(f),
                q.vertexNormals[0].copy(f)),
              3 === e.vertexColors.length &&
                ((f = e.vertexColors[0].clone()),
                f.lerpSelf(e.vertexColors[2], 0.5),
                w.vertexColors[2].copy(f),
                q.vertexColors[0].copy(f)),
              (e = 2));
          E.push(w, q);
          a.vertices.push(j);
          f = 0;
          for (g = a.faceVertexUvs.length; f < g; f++)
            a.faceVertexUvs[f].length &&
              ((j = a.faceVertexUvs[f][c]),
              (q = j[0]),
              (h = j[1]),
              (w = j[2]),
              0 === e
                ? ((l = q.clone()),
                  l.lerpSelf(h, 0.5),
                  (j = [q.clone(), l.clone(), w.clone()]),
                  (h = [l.clone(), h.clone(), w.clone()]))
                : 1 === e
                ? ((l = h.clone()),
                  l.lerpSelf(w, 0.5),
                  (j = [q.clone(), h.clone(), l.clone()]),
                  (h = [l.clone(), w.clone(), q.clone()]))
                : ((l = q.clone()),
                  l.lerpSelf(w, 0.5),
                  (j = [q.clone(), h.clone(), l.clone()]),
                  (h = [l.clone(), h.clone(), w.clone()])),
              A[f].push(j, h));
        } else {
          E.push(e);
          f = 0;
          for (g = a.faceVertexUvs.length; f < g; f++)
            A[f].push(a.faceVertexUvs[f][c]);
        }
      else if (
        ((f = e.a),
        (g = e.b),
        (h = e.c),
        (i = e.d),
        (j = a.vertices[f]),
        (l = a.vertices[g]),
        (m = a.vertices[h]),
        (n = a.vertices[i]),
        (p = j.distanceTo(l)),
        (o = l.distanceTo(m)),
        (s = m.distanceTo(n)),
        (t = j.distanceTo(n)),
        p > b || o > b || s > b || t > b)
      ) {
        r = a.vertices.length;
        z = a.vertices.length + 1;
        w = e.clone();
        q = e.clone();
        (p >= o && p >= s && p >= t) || (s >= o && s >= p && s >= t)
          ? ((p = j.clone()),
            p.lerpSelf(l, 0.5),
            (l = m.clone()),
            l.lerpSelf(n, 0.5),
            (w.a = f),
            (w.b = r),
            (w.c = z),
            (w.d = i),
            (q.a = r),
            (q.b = g),
            (q.c = h),
            (q.d = z),
            4 === e.vertexNormals.length &&
              ((f = e.vertexNormals[0].clone()),
              f.lerpSelf(e.vertexNormals[1], 0.5),
              (g = e.vertexNormals[2].clone()),
              g.lerpSelf(e.vertexNormals[3], 0.5),
              w.vertexNormals[1].copy(f),
              w.vertexNormals[2].copy(g),
              q.vertexNormals[0].copy(f),
              q.vertexNormals[3].copy(g)),
            4 === e.vertexColors.length &&
              ((f = e.vertexColors[0].clone()),
              f.lerpSelf(e.vertexColors[1], 0.5),
              (g = e.vertexColors[2].clone()),
              g.lerpSelf(e.vertexColors[3], 0.5),
              w.vertexColors[1].copy(f),
              w.vertexColors[2].copy(g),
              q.vertexColors[0].copy(f),
              q.vertexColors[3].copy(g)),
            (e = 0))
          : ((p = l.clone()),
            p.lerpSelf(m, 0.5),
            (l = n.clone()),
            l.lerpSelf(j, 0.5),
            (w.a = f),
            (w.b = g),
            (w.c = r),
            (w.d = z),
            (q.a = z),
            (q.b = r),
            (q.c = h),
            (q.d = i),
            4 === e.vertexNormals.length &&
              ((f = e.vertexNormals[1].clone()),
              f.lerpSelf(e.vertexNormals[2], 0.5),
              (g = e.vertexNormals[3].clone()),
              g.lerpSelf(e.vertexNormals[0], 0.5),
              w.vertexNormals[2].copy(f),
              w.vertexNormals[3].copy(g),
              q.vertexNormals[0].copy(g),
              q.vertexNormals[1].copy(f)),
            4 === e.vertexColors.length &&
              ((f = e.vertexColors[1].clone()),
              f.lerpSelf(e.vertexColors[2], 0.5),
              (g = e.vertexColors[3].clone()),
              g.lerpSelf(e.vertexColors[0], 0.5),
              w.vertexColors[2].copy(f),
              w.vertexColors[3].copy(g),
              q.vertexColors[0].copy(g),
              q.vertexColors[1].copy(f)),
            (e = 1));
        E.push(w, q);
        a.vertices.push(p, l);
        f = 0;
        for (g = a.faceVertexUvs.length; f < g; f++)
          a.faceVertexUvs[f].length &&
            ((j = a.faceVertexUvs[f][c]),
            (q = j[0]),
            (h = j[1]),
            (w = j[2]),
            (j = j[3]),
            0 === e
              ? ((l = q.clone()),
                l.lerpSelf(h, 0.5),
                (m = w.clone()),
                m.lerpSelf(j, 0.5),
                (q = [q.clone(), l.clone(), m.clone(), j.clone()]),
                (h = [l.clone(), h.clone(), w.clone(), m.clone()]))
              : ((l = h.clone()),
                l.lerpSelf(w, 0.5),
                (m = j.clone()),
                m.lerpSelf(q, 0.5),
                (q = [q.clone(), h.clone(), l.clone(), m.clone()]),
                (h = [m.clone(), l.clone(), w.clone(), j.clone()])),
            A[f].push(q, h));
      } else {
        E.push(e);
        f = 0;
        for (g = a.faceVertexUvs.length; f < g; f++)
          A[f].push(a.faceVertexUvs[f][c]);
      }
    a.faces = E;
    a.faceVertexUvs = A;
  },
};
THREE.GeometryUtils.random = THREE.Math.random16;
THREE.GeometryUtils.__v1 = new THREE.Vector3();
THREE.ImageUtils = {
  crossOrigin: "anonymous",
  loadTexture: function (a, b, c, d) {
    var e = new Image(),
      f = new THREE.Texture(e, b),
      b = new THREE.ImageLoader();
    b.addEventListener("load", function (a) {
      f.image = a.content;
      f.needsUpdate = !0;
      c && c(f);
    });
    b.addEventListener("error", function (a) {
      d && d(a.message);
    });
    b.crossOrigin = this.crossOrigin;
    b.load(a, e);
    f.sourceFile = a;
    return f;
  },
  loadCompressedTexture: function (a, b, c, d) {
    var e = new THREE.CompressedTexture();
    e.mapping = b;
    var f = new XMLHttpRequest();
    f.onload = function () {
      var a = THREE.ImageUtils.parseDDS(f.response, !0);
      e.format = a.format;
      e.mipmaps = a.mipmaps;
      e.image.width = a.width;
      e.image.height = a.height;
      e.generateMipmaps = !1;
      e.needsUpdate = !0;
      c && c(e);
    };
    f.onerror = d;
    f.open("GET", a, !0);
    f.responseType = "arraybuffer";
    f.send(null);
    return e;
  },
  loadTextureCube: function (a, b, c, d) {
    var e = [];
    e.loadCount = 0;
    var f = new THREE.Texture();
    f.image = e;
    void 0 !== b && (f.mapping = b);
    f.flipY = !1;
    for (var b = 0, g = a.length; b < g; ++b) {
      var h = new Image();
      e[b] = h;
      h.onload = function () {
        e.loadCount = e.loadCount + 1;
        if (e.loadCount === 6) {
          f.needsUpdate = true;
          c && c();
        }
      };
      h.onerror = d;
      h.crossOrigin = this.crossOrigin;
      h.src = a[b];
    }
    return f;
  },
  loadCompressedTextureCube: function (a, b, c, d) {
    var e = [];
    e.loadCount = 0;
    var f = new THREE.CompressedTexture();
    f.image = e;
    void 0 !== b && (f.mapping = b);
    f.flipY = !1;
    f.generateMipmaps = !1;
    for (
      var b = function (a, b) {
          return function () {
            var d = THREE.ImageUtils.parseDDS(a.response, true);
            b.format = d.format;
            b.mipmaps = d.mipmaps;
            b.width = d.width;
            b.height = d.height;
            e.loadCount = e.loadCount + 1;
            if (e.loadCount === 6) {
              f.format = d.format;
              f.needsUpdate = true;
              c && c();
            }
          };
        },
        g = 0,
        h = a.length;
      g < h;
      ++g
    ) {
      var i = {};
      e[g] = i;
      var j = new XMLHttpRequest();
      j.onload = b(j, i);
      j.onerror = d;
      j.open("GET", a[g], !0);
      j.responseType = "arraybuffer";
      j.send(null);
    }
    return f;
  },
  parseDDS: function (a, b) {
    function c(a) {
      return (
        a.charCodeAt(0) +
        (a.charCodeAt(1) << 8) +
        (a.charCodeAt(2) << 16) +
        (a.charCodeAt(3) << 24)
      );
    }
    var d = {
        mipmaps: [],
        width: 0,
        height: 0,
        format: null,
        mipmapCount: 1,
      },
      e = c("DXT1"),
      f = c("DXT3"),
      g = c("DXT5"),
      h = new Int32Array(a, 0, 31);
    if (542327876 !== h[0])
      return (
        console.error(
          "ImageUtils.parseDDS(): Invalid magic number in DDS header"
        ),
        d
      );
    if (!h[20] & 4)
      return (
        console.error(
          "ImageUtils.parseDDS(): Unsupported format, must contain a FourCC code"
        ),
        d
      );
    var i = h[21];
    switch (i) {
      case e:
        e = 8;
        d.format = THREE.RGB_S3TC_DXT1_Format;
        break;
      case f:
        e = 16;
        d.format = THREE.RGBA_S3TC_DXT3_Format;
        break;
      case g:
        e = 16;
        d.format = THREE.RGBA_S3TC_DXT5_Format;
        break;
      default:
        return (
          console.error(
            "ImageUtils.parseDDS(): Unsupported FourCC code: ",
            String.fromCharCode(
              i & 255,
              (i >> 8) & 255,
              (i >> 16) & 255,
              (i >> 24) & 255
            )
          ),
          d
        );
    }
    d.mipmapCount = 1;
    h[2] & 131072 && !1 !== b && (d.mipmapCount = Math.max(1, h[7]));
    d.width = h[4];
    d.height = h[3];
    h = h[1] + 4;
    f = d.width;
    g = d.height;
    for (i = 0; i < d.mipmapCount; i++) {
      var j = (((Math.max(4, f) / 4) * Math.max(4, g)) / 4) * e,
        l = {
          data: new Uint8Array(a, h, j),
          width: f,
          height: g,
        };
      d.mipmaps.push(l);
      h += j;
      f = Math.max(0.5 * f, 1);
      g = Math.max(0.5 * g, 1);
    }
    return d;
  },
  getNormalMap: function (a, b) {
    var c = function (a) {
        var b = Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
        return [a[0] / b, a[1] / b, a[2] / b];
      },
      b = b | 1,
      d = a.width,
      e = a.height,
      f = document.createElement("canvas");
    f.width = d;
    f.height = e;
    var g = f.getContext("2d");
    g.drawImage(a, 0, 0);
    for (
      var h = g.getImageData(0, 0, d, e).data,
        i = g.createImageData(d, e),
        j = i.data,
        l = 0;
      l < d;
      l++
    )
      for (var m = 0; m < e; m++) {
        var n = 0 > m - 1 ? 0 : m - 1,
          p = m + 1 > e - 1 ? e - 1 : m + 1,
          o = 0 > l - 1 ? 0 : l - 1,
          s = l + 1 > d - 1 ? d - 1 : l + 1,
          t = [],
          r = [0, 0, (h[4 * (m * d + l)] / 255) * b];
        t.push([-1, 0, (h[4 * (m * d + o)] / 255) * b]);
        t.push([-1, -1, (h[4 * (n * d + o)] / 255) * b]);
        t.push([0, -1, (h[4 * (n * d + l)] / 255) * b]);
        t.push([1, -1, (h[4 * (n * d + s)] / 255) * b]);
        t.push([1, 0, (h[4 * (m * d + s)] / 255) * b]);
        t.push([1, 1, (h[4 * (p * d + s)] / 255) * b]);
        t.push([0, 1, (h[4 * (p * d + l)] / 255) * b]);
        t.push([-1, 1, (h[4 * (p * d + o)] / 255) * b]);
        n = [];
        o = t.length;
        for (p = 0; p < o; p++) {
          var s = t[p],
            z = t[(p + 1) % o],
            s = [s[0] - r[0], s[1] - r[1], s[2] - r[2]],
            z = [z[0] - r[0], z[1] - r[1], z[2] - r[2]];
          n.push(
            c([
              s[1] * z[2] - s[2] * z[1],
              s[2] * z[0] - s[0] * z[2],
              s[0] * z[1] - s[1] * z[0],
            ])
          );
        }
        t = [0, 0, 0];
        for (p = 0; p < n.length; p++)
          (t[0] += n[p][0]), (t[1] += n[p][1]), (t[2] += n[p][2]);
        t[0] /= n.length;
        t[1] /= n.length;
        t[2] /= n.length;
        r = 4 * (m * d + l);
        j[r] = (255 * ((t[0] + 1) / 2)) | 0;
        j[r + 1] = (255 * ((t[1] + 1) / 2)) | 0;
        j[r + 2] = (255 * t[2]) | 0;
        j[r + 3] = 255;
      }
    g.putImageData(i, 0, 0);
    return f;
  },
  generateDataTexture: function (a, b, c) {
    for (
      var d = a * b,
        e = new Uint8Array(3 * d),
        f = Math.floor(255 * c.r),
        g = Math.floor(255 * c.g),
        c = Math.floor(255 * c.b),
        h = 0;
      h < d;
      h++
    )
      (e[3 * h] = f), (e[3 * h + 1] = g), (e[3 * h + 2] = c);
    a = new THREE.DataTexture(e, a, b, THREE.RGBFormat);
    a.needsUpdate = !0;
    return a;
  },
};
THREE.SceneUtils = {
  createMultiMaterialObject: function (a, b) {
    for (var c = new THREE.Object3D(), d = 0, e = b.length; d < e; d++)
      c.add(new THREE.Mesh(a, b[d]));
    return c;
  },
  detach: function (a, b, c) {
    a.applyMatrix(b.matrixWorld);
    b.remove(a);
    c.add(a);
  },
  attach: function (a, b, c) {
    var d = new THREE.Matrix4();
    d.getInverse(c.matrixWorld);
    a.applyMatrix(d);
    b.remove(a);
    c.add(a);
  },
};
THREE.ShaderUtils = {
  lib: {
    fresnel: {
      uniforms: {
        mRefractionRatio: {
          type: "f",
          value: 1.02,
        },
        mFresnelBias: {
          type: "f",
          value: 0.1,
        },
        mFresnelPower: {
          type: "f",
          value: 2,
        },
        mFresnelScale: {
          type: "f",
          value: 1,
        },
        tCube: {
          type: "t",
          value: null,
        },
      },
      fragmentShader:
        "uniform samplerCube tCube;\nvarying vec3 vReflect;\nvarying vec3 vRefract[3];\nvarying float vReflectionFactor;\nvoid main() {\nvec4 reflectedColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );\nvec4 refractedColor = vec4( 1.0 );\nrefractedColor.r = textureCube( tCube, vec3( -vRefract[0].x, vRefract[0].yz ) ).r;\nrefractedColor.g = textureCube( tCube, vec3( -vRefract[1].x, vRefract[1].yz ) ).g;\nrefractedColor.b = textureCube( tCube, vec3( -vRefract[2].x, vRefract[2].yz ) ).b;\ngl_FragColor = mix( refractedColor, reflectedColor, clamp( vReflectionFactor, 0.0, 1.0 ) );\n}",
      vertexShader:
        "uniform float mRefractionRatio;\nuniform float mFresnelBias;\nuniform float mFresnelScale;\nuniform float mFresnelPower;\nvarying vec3 vReflect;\nvarying vec3 vRefract[3];\nvarying float vReflectionFactor;\nvoid main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\nvec4 worldPosition = modelMatrix * vec4( position, 1.0 );\nvec3 worldNormal = normalize( mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * normal );\nvec3 I = worldPosition.xyz - cameraPosition;\nvReflect = reflect( I, worldNormal );\nvRefract[0] = refract( normalize( I ), worldNormal, mRefractionRatio );\nvRefract[1] = refract( normalize( I ), worldNormal, mRefractionRatio * 0.99 );\nvRefract[2] = refract( normalize( I ), worldNormal, mRefractionRatio * 0.98 );\nvReflectionFactor = mFresnelBias + mFresnelScale * pow( 1.0 + dot( normalize( I ), worldNormal ), mFresnelPower );\ngl_Position = projectionMatrix * mvPosition;\n}",
    },
    normal: {
      uniforms: THREE.UniformsUtils.merge([
        THREE.UniformsLib.fog,
        THREE.UniformsLib.lights,
        THREE.UniformsLib.shadowmap,
        {
          enableAO: {
            type: "i",
            value: 0,
          },
          enableDiffuse: {
            type: "i",
            value: 0,
          },
          enableSpecular: {
            type: "i",
            value: 0,
          },
          enableReflection: {
            type: "i",
            value: 0,
          },
          enableDisplacement: {
            type: "i",
            value: 0,
          },
          tDisplacement: {
            type: "t",
            value: null,
          },
          tDiffuse: {
            type: "t",
            value: null,
          },
          tCube: {
            type: "t",
            value: null,
          },
          tNormal: {
            type: "t",
            value: null,
          },
          tSpecular: {
            type: "t",
            value: null,
          },
          tAO: {
            type: "t",
            value: null,
          },
          uNormalScale: {
            type: "v2",
            value: new THREE.Vector2(1, 1),
          },
          uDisplacementBias: {
            type: "f",
            value: 0,
          },
          uDisplacementScale: {
            type: "f",
            value: 1,
          },
          uDiffuseColor: {
            type: "c",
            value: new THREE.Color(16777215),
          },
          uSpecularColor: {
            type: "c",
            value: new THREE.Color(1118481),
          },
          uAmbientColor: {
            type: "c",
            value: new THREE.Color(16777215),
          },
          uShininess: {
            type: "f",
            value: 30,
          },
          uOpacity: {
            type: "f",
            value: 1,
          },
          useRefract: {
            type: "i",
            value: 0,
          },
          uRefractionRatio: {
            type: "f",
            value: 0.98,
          },
          uReflectivity: {
            type: "f",
            value: 0.5,
          },
          uOffset: {
            type: "v2",
            value: new THREE.Vector2(0, 0),
          },
          uRepeat: {
            type: "v2",
            value: new THREE.Vector2(1, 1),
          },
          wrapRGB: {
            type: "v3",
            value: new THREE.Vector3(1, 1, 1),
          },
        },
      ]),
      fragmentShader: [
        "uniform vec3 uAmbientColor;\nuniform vec3 uDiffuseColor;\nuniform vec3 uSpecularColor;\nuniform float uShininess;\nuniform float uOpacity;\nuniform bool enableDiffuse;\nuniform bool enableSpecular;\nuniform bool enableAO;\nuniform bool enableReflection;\nuniform sampler2D tDiffuse;\nuniform sampler2D tNormal;\nuniform sampler2D tSpecular;\nuniform sampler2D tAO;\nuniform samplerCube tCube;\nuniform vec2 uNormalScale;\nuniform bool useRefract;\nuniform float uRefractionRatio;\nuniform float uReflectivity;\nvarying vec3 vTangent;\nvarying vec3 vBinormal;\nvarying vec3 vNormal;\nvarying vec2 vUv;\nuniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_HEMI_LIGHTS > 0\nuniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];\nuniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];\nuniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#endif\n#if MAX_SPOT_LIGHTS > 0\nuniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\nuniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];\nuniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\nuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\n#endif\n#ifdef WRAP_AROUND\nuniform vec3 wrapRGB;\n#endif\nvarying vec3 vWorldPosition;\nvarying vec3 vViewPosition;",
        THREE.ShaderChunk.shadowmap_pars_fragment,
        THREE.ShaderChunk.fog_pars_fragment,
        "void main() {\ngl_FragColor = vec4( vec3( 1.0 ), uOpacity );\nvec3 specularTex = vec3( 1.0 );\nvec3 normalTex = texture2D( tNormal, vUv ).xyz * 2.0 - 1.0;\nnormalTex.xy *= uNormalScale;\nnormalTex = normalize( normalTex );\nif( enableDiffuse ) {\n#ifdef GAMMA_INPUT\nvec4 texelColor = texture2D( tDiffuse, vUv );\ntexelColor.xyz *= texelColor.xyz;\ngl_FragColor = gl_FragColor * texelColor;\n#else\ngl_FragColor = gl_FragColor * texture2D( tDiffuse, vUv );\n#endif\n}\nif( enableAO ) {\n#ifdef GAMMA_INPUT\nvec4 aoColor = texture2D( tAO, vUv );\naoColor.xyz *= aoColor.xyz;\ngl_FragColor.xyz = gl_FragColor.xyz * aoColor.xyz;\n#else\ngl_FragColor.xyz = gl_FragColor.xyz * texture2D( tAO, vUv ).xyz;\n#endif\n}\nif( enableSpecular )\nspecularTex = texture2D( tSpecular, vUv ).xyz;\nmat3 tsb = mat3( normalize( vTangent ), normalize( vBinormal ), normalize( vNormal ) );\nvec3 finalNormal = tsb * normalTex;\n#ifdef FLIP_SIDED\nfinalNormal = -finalNormal;\n#endif\nvec3 normal = normalize( finalNormal );\nvec3 viewPosition = normalize( vViewPosition );\n#if MAX_POINT_LIGHTS > 0\nvec3 pointDiffuse = vec3( 0.0 );\nvec3 pointSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 pointVector = lPosition.xyz + vViewPosition.xyz;\nfloat pointDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\npointDistance = 1.0 - min( ( length( pointVector ) / pointLightDistance[ i ] ), 1.0 );\npointVector = normalize( pointVector );\n#ifdef WRAP_AROUND\nfloat pointDiffuseWeightFull = max( dot( normal, pointVector ), 0.0 );\nfloat pointDiffuseWeightHalf = max( 0.5 * dot( normal, pointVector ) + 0.5, 0.0 );\nvec3 pointDiffuseWeight = mix( vec3 ( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );\n#else\nfloat pointDiffuseWeight = max( dot( normal, pointVector ), 0.0 );\n#endif\npointDiffuse += pointDistance * pointLightColor[ i ] * uDiffuseColor * pointDiffuseWeight;\nvec3 pointHalfVector = normalize( pointVector + viewPosition );\nfloat pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );\nfloat pointSpecularWeight = specularTex.r * max( pow( pointDotNormalHalf, uShininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( uShininess + 2.0001 ) / 8.0;\nvec3 schlick = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( pointVector, pointHalfVector ), 5.0 );\npointSpecular += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * pointDistance * specularNormalization;\n#else\npointSpecular += pointDistance * pointLightColor[ i ] * uSpecularColor * pointSpecularWeight * pointDiffuseWeight;\n#endif\n}\n#endif\n#if MAX_SPOT_LIGHTS > 0\nvec3 spotDiffuse = vec3( 0.0 );\nvec3 spotSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\nvec3 spotVector = lPosition.xyz + vViewPosition.xyz;\nfloat spotDistance = 1.0;\nif ( spotLightDistance[ i ] > 0.0 )\nspotDistance = 1.0 - min( ( length( spotVector ) / spotLightDistance[ i ] ), 1.0 );\nspotVector = normalize( spotVector );\nfloat spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - vWorldPosition ) );\nif ( spotEffect > spotLightAngleCos[ i ] ) {\nspotEffect = max( pow( spotEffect, spotLightExponent[ i ] ), 0.0 );\n#ifdef WRAP_AROUND\nfloat spotDiffuseWeightFull = max( dot( normal, spotVector ), 0.0 );\nfloat spotDiffuseWeightHalf = max( 0.5 * dot( normal, spotVector ) + 0.5, 0.0 );\nvec3 spotDiffuseWeight = mix( vec3 ( spotDiffuseWeightFull ), vec3( spotDiffuseWeightHalf ), wrapRGB );\n#else\nfloat spotDiffuseWeight = max( dot( normal, spotVector ), 0.0 );\n#endif\nspotDiffuse += spotDistance * spotLightColor[ i ] * uDiffuseColor * spotDiffuseWeight * spotEffect;\nvec3 spotHalfVector = normalize( spotVector + viewPosition );\nfloat spotDotNormalHalf = max( dot( normal, spotHalfVector ), 0.0 );\nfloat spotSpecularWeight = specularTex.r * max( pow( spotDotNormalHalf, uShininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( uShininess + 2.0001 ) / 8.0;\nvec3 schlick = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( spotVector, spotHalfVector ), 5.0 );\nspotSpecular += schlick * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * spotDistance * specularNormalization * spotEffect;\n#else\nspotSpecular += spotDistance * spotLightColor[ i ] * uSpecularColor * spotSpecularWeight * spotDiffuseWeight * spotEffect;\n#endif\n}\n}\n#endif\n#if MAX_DIR_LIGHTS > 0\nvec3 dirDiffuse = vec3( 0.0 );\nvec3 dirSpecular = vec3( 0.0 );\nfor( int i = 0; i < MAX_DIR_LIGHTS; i++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\n#ifdef WRAP_AROUND\nfloat directionalLightWeightingFull = max( dot( normal, dirVector ), 0.0 );\nfloat directionalLightWeightingHalf = max( 0.5 * dot( normal, dirVector ) + 0.5, 0.0 );\nvec3 dirDiffuseWeight = mix( vec3( directionalLightWeightingFull ), vec3( directionalLightWeightingHalf ), wrapRGB );\n#else\nfloat dirDiffuseWeight = max( dot( normal, dirVector ), 0.0 );\n#endif\ndirDiffuse += directionalLightColor[ i ] * uDiffuseColor * dirDiffuseWeight;\nvec3 dirHalfVector = normalize( dirVector + viewPosition );\nfloat dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );\nfloat dirSpecularWeight = specularTex.r * max( pow( dirDotNormalHalf, uShininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( uShininess + 2.0001 ) / 8.0;\nvec3 schlick = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( dirVector, dirHalfVector ), 5.0 );\ndirSpecular += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;\n#else\ndirSpecular += directionalLightColor[ i ] * uSpecularColor * dirSpecularWeight * dirDiffuseWeight;\n#endif\n}\n#endif\n#if MAX_HEMI_LIGHTS > 0\nvec3 hemiDiffuse  = vec3( 0.0 );\nvec3 hemiSpecular = vec3( 0.0 );\nfor( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( hemisphereLightDirection[ i ], 0.0 );\nvec3 lVector = normalize( lDirection.xyz );\nfloat dotProduct = dot( normal, lVector );\nfloat hemiDiffuseWeight = 0.5 * dotProduct + 0.5;\nvec3 hemiColor = mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );\nhemiDiffuse += uDiffuseColor * hemiColor;\nvec3 hemiHalfVectorSky = normalize( lVector + viewPosition );\nfloat hemiDotNormalHalfSky = 0.5 * dot( normal, hemiHalfVectorSky ) + 0.5;\nfloat hemiSpecularWeightSky = specularTex.r * max( pow( hemiDotNormalHalfSky, uShininess ), 0.0 );\nvec3 lVectorGround = -lVector;\nvec3 hemiHalfVectorGround = normalize( lVectorGround + viewPosition );\nfloat hemiDotNormalHalfGround = 0.5 * dot( normal, hemiHalfVectorGround ) + 0.5;\nfloat hemiSpecularWeightGround = specularTex.r * max( pow( hemiDotNormalHalfGround, uShininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat dotProductGround = dot( normal, lVectorGround );\nfloat specularNormalization = ( uShininess + 2.0001 ) / 8.0;\nvec3 schlickSky = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( lVector, hemiHalfVectorSky ), 5.0 );\nvec3 schlickGround = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( lVectorGround, hemiHalfVectorGround ), 5.0 );\nhemiSpecular += hemiColor * specularNormalization * ( schlickSky * hemiSpecularWeightSky * max( dotProduct, 0.0 ) + schlickGround * hemiSpecularWeightGround * max( dotProductGround, 0.0 ) );\n#else\nhemiSpecular += uSpecularColor * hemiColor * ( hemiSpecularWeightSky + hemiSpecularWeightGround ) * hemiDiffuseWeight;\n#endif\n}\n#endif\nvec3 totalDiffuse = vec3( 0.0 );\nvec3 totalSpecular = vec3( 0.0 );\n#if MAX_DIR_LIGHTS > 0\ntotalDiffuse += dirDiffuse;\ntotalSpecular += dirSpecular;\n#endif\n#if MAX_HEMI_LIGHTS > 0\ntotalDiffuse += hemiDiffuse;\ntotalSpecular += hemiSpecular;\n#endif\n#if MAX_POINT_LIGHTS > 0\ntotalDiffuse += pointDiffuse;\ntotalSpecular += pointSpecular;\n#endif\n#if MAX_SPOT_LIGHTS > 0\ntotalDiffuse += spotDiffuse;\ntotalSpecular += spotSpecular;\n#endif\n#ifdef METAL\ngl_FragColor.xyz = gl_FragColor.xyz * ( totalDiffuse + ambientLightColor * uAmbientColor + totalSpecular );\n#else\ngl_FragColor.xyz = gl_FragColor.xyz * ( totalDiffuse + ambientLightColor * uAmbientColor ) + totalSpecular;\n#endif\nif ( enableReflection ) {\nvec3 vReflect;\nvec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );\nif ( useRefract ) {\nvReflect = refract( cameraToVertex, normal, uRefractionRatio );\n} else {\nvReflect = reflect( cameraToVertex, normal );\n}\nvec4 cubeColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );\n#ifdef GAMMA_INPUT\ncubeColor.xyz *= cubeColor.xyz;\n#endif\ngl_FragColor.xyz = mix( gl_FragColor.xyz, cubeColor.xyz, specularTex.r * uReflectivity );\n}",
        THREE.ShaderChunk.shadowmap_fragment,
        THREE.ShaderChunk.linear_to_gamma_fragment,
        THREE.ShaderChunk.fog_fragment,
        "}",
      ].join("\n"),
      vertexShader: [
        "attribute vec4 tangent;\nuniform vec2 uOffset;\nuniform vec2 uRepeat;\nuniform bool enableDisplacement;\n#ifdef VERTEX_TEXTURES\nuniform sampler2D tDisplacement;\nuniform float uDisplacementScale;\nuniform float uDisplacementBias;\n#endif\nvarying vec3 vTangent;\nvarying vec3 vBinormal;\nvarying vec3 vNormal;\nvarying vec2 vUv;\nvarying vec3 vWorldPosition;\nvarying vec3 vViewPosition;",
        THREE.ShaderChunk.skinning_pars_vertex,
        THREE.ShaderChunk.shadowmap_pars_vertex,
        "void main() {",
        THREE.ShaderChunk.skinbase_vertex,
        THREE.ShaderChunk.skinnormal_vertex,
        "#ifdef USE_SKINNING\nvNormal = normalize( normalMatrix * skinnedNormal.xyz );\nvec4 skinnedTangent = skinMatrix * vec4( tangent.xyz, 0.0 );\nvTangent = normalize( normalMatrix * skinnedTangent.xyz );\n#else\nvNormal = normalize( normalMatrix * normal );\nvTangent = normalize( normalMatrix * tangent.xyz );\n#endif\nvBinormal = normalize( cross( vNormal, vTangent ) * tangent.w );\nvUv = uv * uRepeat + uOffset;\nvec3 displacedPosition;\n#ifdef VERTEX_TEXTURES\nif ( enableDisplacement ) {\nvec3 dv = texture2D( tDisplacement, uv ).xyz;\nfloat df = uDisplacementScale * dv.x + uDisplacementBias;\ndisplacedPosition = position + normalize( normal ) * df;\n} else {\n#ifdef USE_SKINNING\nvec4 skinVertex = vec4( position, 1.0 );\nvec4 skinned  = boneMatX * skinVertex * skinWeight.x;\nskinned \t  += boneMatY * skinVertex * skinWeight.y;\ndisplacedPosition  = skinned.xyz;\n#else\ndisplacedPosition = position;\n#endif\n}\n#else\n#ifdef USE_SKINNING\nvec4 skinVertex = vec4( position, 1.0 );\nvec4 skinned  = boneMatX * skinVertex * skinWeight.x;\nskinned \t  += boneMatY * skinVertex * skinWeight.y;\ndisplacedPosition  = skinned.xyz;\n#else\ndisplacedPosition = position;\n#endif\n#endif\nvec4 mvPosition = modelViewMatrix * vec4( displacedPosition, 1.0 );\nvec4 worldPosition = modelMatrix * vec4( displacedPosition, 1.0 );\ngl_Position = projectionMatrix * mvPosition;\nvWorldPosition = worldPosition.xyz;\nvViewPosition = -mvPosition.xyz;\n#ifdef USE_SHADOWMAP\nfor( int i = 0; i < MAX_SHADOWS; i ++ ) {\nvShadowCoord[ i ] = shadowMatrix[ i ] * worldPosition;\n}\n#endif\n}",
      ].join("\n"),
    },
    cube: {
      uniforms: {
        tCube: {
          type: "t",
          value: null,
        },
        tFlip: {
          type: "f",
          value: -1,
        },
      },
      vertexShader:
        "varying vec3 vWorldPosition;\nvoid main() {\nvec4 worldPosition = modelMatrix * vec4( position, 1.0 );\nvWorldPosition = worldPosition.xyz;\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
      fragmentShader:
        "uniform samplerCube tCube;\nuniform float tFlip;\nvarying vec3 vWorldPosition;\nvoid main() {\ngl_FragColor = textureCube( tCube, vec3( tFlip * vWorldPosition.x, vWorldPosition.yz ) );\n}",
    },
  },
};
THREE.FontUtils = {
  faces: {},
  face: "helvetiker",
  weight: "normal",
  style: "normal",
  size: 150,
  divisions: 10,
  getFace: function () {
    return this.faces[this.face][this.weight][this.style];
  },
  loadFace: function (a) {
    var b = a.familyName.toLowerCase();
    this.faces[b] = this.faces[b] || {};
    this.faces[b][a.cssFontWeight] = this.faces[b][a.cssFontWeight] || {};
    this.faces[b][a.cssFontWeight][a.cssFontStyle] = a;
    return (this.faces[b][a.cssFontWeight][a.cssFontStyle] = a);
  },
  drawText: function (a) {
    for (
      var b = this.getFace(),
        c = this.size / b.resolution,
        d = 0,
        e = String(a).split(""),
        f = e.length,
        g = [],
        a = 0;
      a < f;
      a++
    ) {
      var h = new THREE.Path(),
        h = this.extractGlyphPoints(e[a], b, c, d, h),
        d = d + h.offset;
      g.push(h.path);
    }
    return {
      paths: g,
      offset: d / 2,
    };
  },
  extractGlyphPoints: function (a, b, c, d, e) {
    var f = [],
      g,
      h,
      i,
      j,
      l,
      m,
      n,
      p,
      o,
      s,
      t,
      r = b.glyphs[a] || b.glyphs["?"];
    if (r) {
      if (r.o) {
        b = r._cachedOutline || (r._cachedOutline = r.o.split(" "));
        j = b.length;
        for (a = 0; a < j; )
          switch (((i = b[a++]), i)) {
            case "m":
              i = b[a++] * c + d;
              l = b[a++] * c;
              e.moveTo(i, l);
              break;
            case "l":
              i = b[a++] * c + d;
              l = b[a++] * c;
              e.lineTo(i, l);
              break;
            case "q":
              i = b[a++] * c + d;
              l = b[a++] * c;
              p = b[a++] * c + d;
              o = b[a++] * c;
              e.quadraticCurveTo(p, o, i, l);
              if ((g = f[f.length - 1])) {
                m = g.x;
                n = g.y;
                g = 1;
                for (h = this.divisions; g <= h; g++) {
                  var z = g / h;
                  THREE.Shape.Utils.b2(z, m, p, i);
                  THREE.Shape.Utils.b2(z, n, o, l);
                }
              }
              break;
            case "b":
              if (
                ((i = b[a++] * c + d),
                (l = b[a++] * c),
                (p = b[a++] * c + d),
                (o = b[a++] * -c),
                (s = b[a++] * c + d),
                (t = b[a++] * -c),
                e.bezierCurveTo(i, l, p, o, s, t),
                (g = f[f.length - 1]))
              ) {
                m = g.x;
                n = g.y;
                g = 1;
                for (h = this.divisions; g <= h; g++)
                  (z = g / h),
                    THREE.Shape.Utils.b3(z, m, p, s, i),
                    THREE.Shape.Utils.b3(z, n, o, t, l);
              }
          }
      }
      return {
        offset: r.ha * c,
        path: e,
      };
    }
  },
};
THREE.FontUtils.generateShapes = function (a, b) {
  var b = b || {},
    c = void 0 !== b.curveSegments ? b.curveSegments : 4,
    d = void 0 !== b.font ? b.font : "helvetiker",
    e = void 0 !== b.weight ? b.weight : "normal",
    f = void 0 !== b.style ? b.style : "normal";
  THREE.FontUtils.size = void 0 !== b.size ? b.size : 100;
  THREE.FontUtils.divisions = c;
  THREE.FontUtils.face = d;
  THREE.FontUtils.weight = e;
  THREE.FontUtils.style = f;
  c = THREE.FontUtils.drawText(a).paths;
  d = [];
  e = 0;
  for (f = c.length; e < f; e++) Array.prototype.push.apply(d, c[e].toShapes());
  return d;
};
(function (a) {
  var b = function (a) {
    for (var b = a.length, e = 0, f = b - 1, g = 0; g < b; f = g++)
      e += a[f].x * a[g].y - a[g].x * a[f].y;
    return 0.5 * e;
  };
  a.Triangulate = function (a, d) {
    var e = a.length;
    if (3 > e) return null;
    var f = [],
      g = [],
      h = [],
      i,
      j,
      l;
    if (0 < b(a)) for (j = 0; j < e; j++) g[j] = j;
    else for (j = 0; j < e; j++) g[j] = e - 1 - j;
    var m = 2 * e;
    for (j = e - 1; 2 < e; ) {
      if (0 >= m--) {
        console.log("Warning, unable to triangulate polygon!");
        break;
      }
      i = j;
      e <= i && (i = 0);
      j = i + 1;
      e <= j && (j = 0);
      l = j + 1;
      e <= l && (l = 0);
      var n;
      a: {
        n = a;
        var p = i,
          o = j,
          s = l,
          t = e,
          r = g,
          z = void 0,
          w = void 0,
          q = void 0,
          E = void 0,
          A = void 0,
          v = void 0,
          u = void 0,
          D = void 0,
          C = void 0,
          w = n[r[p]].x,
          q = n[r[p]].y,
          E = n[r[o]].x,
          A = n[r[o]].y,
          v = n[r[s]].x,
          u = n[r[s]].y;
        if (1e-10 > (E - w) * (u - q) - (A - q) * (v - w)) n = !1;
        else {
          for (z = 0; z < t; z++)
            if (!(z == p || z == o || z == s)) {
              var D = n[r[z]].x,
                C = n[r[z]].y,
                G = void 0,
                P = void 0,
                B = void 0,
                K = void 0,
                H = void 0,
                I = void 0,
                N = void 0,
                O = void 0,
                R = void 0,
                ga = void 0,
                M = void 0,
                J = void 0,
                G = (B = H = void 0),
                G = v - E,
                P = u - A,
                B = w - v,
                K = q - u,
                H = E - w,
                I = A - q,
                N = D - w,
                O = C - q,
                R = D - E,
                ga = C - A,
                M = D - v,
                J = C - u,
                G = G * ga - P * R,
                H = H * O - I * N,
                B = B * J - K * M;
              if (0 <= G && 0 <= B && 0 <= H) {
                n = !1;
                break a;
              }
            }
          n = !0;
        }
      }
      if (n) {
        f.push([a[g[i]], a[g[j]], a[g[l]]]);
        h.push([g[i], g[j], g[l]]);
        i = j;
        for (l = j + 1; l < e; i++, l++) g[i] = g[l];
        e--;
        m = 2 * e;
      }
    }
    return d ? h : f;
  };
  a.Triangulate.area = b;
  return a;
})(THREE.FontUtils);
self._typeface_js = {
  faces: THREE.FontUtils.faces,
  loadFace: THREE.FontUtils.loadFace,
};
THREE.Curve = function () {};
THREE.Curve.prototype.getPoint = function () {
  console.log("Warning, getPoint() not implemented!");
  return null;
};
THREE.Curve.prototype.getPointAt = function (a) {
  a = this.getUtoTmapping(a);
  return this.getPoint(a);
};
THREE.Curve.prototype.getPoints = function (a) {
  a || (a = 5);
  var b,
    c = [];
  for (b = 0; b <= a; b++) c.push(this.getPoint(b / a));
  return c;
};
THREE.Curve.prototype.getSpacedPoints = function (a) {
  a || (a = 5);
  var b,
    c = [];
  for (b = 0; b <= a; b++) c.push(this.getPointAt(b / a));
  return c;
};
THREE.Curve.prototype.getLength = function () {
  var a = this.getLengths();
  return a[a.length - 1];
};
THREE.Curve.prototype.getLengths = function (a) {
  a || (a = this.__arcLengthDivisions ? this.__arcLengthDivisions : 200);
  if (
    this.cacheArcLengths &&
    this.cacheArcLengths.length == a + 1 &&
    !this.needsUpdate
  )
    return this.cacheArcLengths;
  this.needsUpdate = !1;
  var b = [],
    c,
    d = this.getPoint(0),
    e,
    f = 0;
  b.push(0);
  for (e = 1; e <= a; e++)
    (c = this.getPoint(e / a)), (f += c.distanceTo(d)), b.push(f), (d = c);
  return (this.cacheArcLengths = b);
};
THREE.Curve.prototype.updateArcLengths = function () {
  this.needsUpdate = !0;
  this.getLengths();
};
THREE.Curve.prototype.getUtoTmapping = function (a, b) {
  var c = this.getLengths(),
    d = 0,
    e = c.length,
    f;
  f = b ? b : a * c[e - 1];
  for (var g = 0, h = e - 1, i; g <= h; )
    if (((d = Math.floor(g + (h - g) / 2)), (i = c[d] - f), 0 > i)) g = d + 1;
    else if (0 < i) h = d - 1;
    else {
      h = d;
      break;
    }
  d = h;
  if (c[d] == f) return d / (e - 1);
  g = c[d];
  return (c = (d + (f - g) / (c[d + 1] - g)) / (e - 1));
};
THREE.Curve.prototype.getNormalVector = function (a) {
  a = this.getTangent(a);
  return new THREE.Vector2(-a.y, a.x);
};
THREE.Curve.prototype.getTangent = function (a) {
  var b = a - 1e-4,
    a = a + 1e-4;
  0 > b && (b = 0);
  1 < a && (a = 1);
  b = this.getPoint(b);
  return this.getPoint(a).clone().subSelf(b).normalize();
};
THREE.Curve.prototype.getTangentAt = function (a) {
  a = this.getUtoTmapping(a);
  return this.getTangent(a);
};
THREE.LineCurve = function (a, b) {
  this.v1 = a;
  this.v2 = b;
};
THREE.LineCurve.prototype = Object.create(THREE.Curve.prototype);
THREE.LineCurve.prototype.getPoint = function (a) {
  var b = this.v2.clone().subSelf(this.v1);
  b.multiplyScalar(a).addSelf(this.v1);
  return b;
};
THREE.LineCurve.prototype.getPointAt = function (a) {
  return this.getPoint(a);
};
THREE.LineCurve.prototype.getTangent = function () {
  return this.v2.clone().subSelf(this.v1).normalize();
};
THREE.QuadraticBezierCurve = function (a, b, c) {
  this.v0 = a;
  this.v1 = b;
  this.v2 = c;
};
THREE.QuadraticBezierCurve.prototype = Object.create(THREE.Curve.prototype);
THREE.QuadraticBezierCurve.prototype.getPoint = function (a) {
  var b;
  b = THREE.Shape.Utils.b2(a, this.v0.x, this.v1.x, this.v2.x);
  a = THREE.Shape.Utils.b2(a, this.v0.y, this.v1.y, this.v2.y);
  return new THREE.Vector2(b, a);
};
THREE.QuadraticBezierCurve.prototype.getTangent = function (a) {
  var b;
  b = THREE.Curve.Utils.tangentQuadraticBezier(
    a,
    this.v0.x,
    this.v1.x,
    this.v2.x
  );
  a = THREE.Curve.Utils.tangentQuadraticBezier(
    a,
    this.v0.y,
    this.v1.y,
    this.v2.y
  );
  b = new THREE.Vector2(b, a);
  b.normalize();
  return b;
};
THREE.CubicBezierCurve = function (a, b, c, d) {
  this.v0 = a;
  this.v1 = b;
  this.v2 = c;
  this.v3 = d;
};
THREE.CubicBezierCurve.prototype = Object.create(THREE.Curve.prototype);
THREE.CubicBezierCurve.prototype.getPoint = function (a) {
  var b;
  b = THREE.Shape.Utils.b3(a, this.v0.x, this.v1.x, this.v2.x, this.v3.x);
  a = THREE.Shape.Utils.b3(a, this.v0.y, this.v1.y, this.v2.y, this.v3.y);
  return new THREE.Vector2(b, a);
};
THREE.CubicBezierCurve.prototype.getTangent = function (a) {
  var b;
  b = THREE.Curve.Utils.tangentCubicBezier(
    a,
    this.v0.x,
    this.v1.x,
    this.v2.x,
    this.v3.x
  );
  a = THREE.Curve.Utils.tangentCubicBezier(
    a,
    this.v0.y,
    this.v1.y,
    this.v2.y,
    this.v3.y
  );
  b = new THREE.Vector2(b, a);
  b.normalize();
  return b;
};
THREE.SplineCurve = function (a) {
  this.points = void 0 == a ? [] : a;
};
THREE.SplineCurve.prototype = Object.create(THREE.Curve.prototype);
THREE.SplineCurve.prototype.getPoint = function (a) {
  var b = new THREE.Vector2(),
    c = [],
    d = this.points,
    e;
  e = (d.length - 1) * a;
  a = Math.floor(e);
  e -= a;
  c[0] = 0 == a ? a : a - 1;
  c[1] = a;
  c[2] = a > d.length - 2 ? d.length - 1 : a + 1;
  c[3] = a > d.length - 3 ? d.length - 1 : a + 2;
  b.x = THREE.Curve.Utils.interpolate(
    d[c[0]].x,
    d[c[1]].x,
    d[c[2]].x,
    d[c[3]].x,
    e
  );
  b.y = THREE.Curve.Utils.interpolate(
    d[c[0]].y,
    d[c[1]].y,
    d[c[2]].y,
    d[c[3]].y,
    e
  );
  return b;
};
THREE.EllipseCurve = function (a, b, c, d, e, f, g) {
  this.aX = a;
  this.aY = b;
  this.xRadius = c;
  this.yRadius = d;
  this.aStartAngle = e;
  this.aEndAngle = f;
  this.aClockwise = g;
};
THREE.EllipseCurve.prototype = Object.create(THREE.Curve.prototype);
THREE.EllipseCurve.prototype.getPoint = function (a) {
  var b = this.aEndAngle - this.aStartAngle;
  this.aClockwise || (a = 1 - a);
  b = this.aStartAngle + a * b;
  a = this.aX + this.xRadius * Math.cos(b);
  b = this.aY + this.yRadius * Math.sin(b);
  return new THREE.Vector2(a, b);
};
THREE.ArcCurve = function (a, b, c, d, e, f) {
  THREE.EllipseCurve.call(this, a, b, c, c, d, e, f);
};
THREE.ArcCurve.prototype = Object.create(THREE.EllipseCurve.prototype);
THREE.Curve.Utils = {
  tangentQuadraticBezier: function (a, b, c, d) {
    return 2 * (1 - a) * (c - b) + 2 * a * (d - c);
  },
  tangentCubicBezier: function (a, b, c, d, e) {
    return (
      -3 * b * (1 - a) * (1 - a) +
      3 * c * (1 - a) * (1 - a) -
      6 * a * c * (1 - a) +
      6 * a * d * (1 - a) -
      3 * a * a * d +
      3 * a * a * e
    );
  },
  tangentSpline: function (a) {
    return (
      6 * a * a -
      6 * a +
      (3 * a * a - 4 * a + 1) +
      (-6 * a * a + 6 * a) +
      (3 * a * a - 2 * a)
    );
  },
  interpolate: function (a, b, c, d, e) {
    var a = 0.5 * (c - a),
      d = 0.5 * (d - b),
      f = e * e;
    return (
      (2 * b - 2 * c + a + d) * e * f +
      (-3 * b + 3 * c - 2 * a - d) * f +
      a * e +
      b
    );
  },
};
THREE.Curve.create = function (a, b) {
  a.prototype = Object.create(THREE.Curve.prototype);
  a.prototype.getPoint = b;
  return a;
};
THREE.LineCurve3 = THREE.Curve.create(
  function (a, b) {
    this.v1 = a;
    this.v2 = b;
  },
  function (a) {
    var b = new THREE.Vector3();
    b.sub(this.v2, this.v1);
    b.multiplyScalar(a);
    b.addSelf(this.v1);
    return b;
  }
);
THREE.QuadraticBezierCurve3 = THREE.Curve.create(
  function (a, b, c) {
    this.v0 = a;
    this.v1 = b;
    this.v2 = c;
  },
  function (a) {
    var b, c;
    b = THREE.Shape.Utils.b2(a, this.v0.x, this.v1.x, this.v2.x);
    c = THREE.Shape.Utils.b2(a, this.v0.y, this.v1.y, this.v2.y);
    a = THREE.Shape.Utils.b2(a, this.v0.z, this.v1.z, this.v2.z);
    return new THREE.Vector3(b, c, a);
  }
);
THREE.CubicBezierCurve3 = THREE.Curve.create(
  function (a, b, c, d) {
    this.v0 = a;
    this.v1 = b;
    this.v2 = c;
    this.v3 = d;
  },
  function (a) {
    var b, c;
    b = THREE.Shape.Utils.b3(a, this.v0.x, this.v1.x, this.v2.x, this.v3.x);
    c = THREE.Shape.Utils.b3(a, this.v0.y, this.v1.y, this.v2.y, this.v3.y);
    a = THREE.Shape.Utils.b3(a, this.v0.z, this.v1.z, this.v2.z, this.v3.z);
    return new THREE.Vector3(b, c, a);
  }
);
THREE.SplineCurve3 = THREE.Curve.create(
  function (a) {
    this.points = void 0 == a ? [] : a;
  },
  function (a) {
    var b = new THREE.Vector3(),
      c = [],
      d = this.points,
      e,
      a = (d.length - 1) * a;
    e = Math.floor(a);
    a -= e;
    c[0] = 0 == e ? e : e - 1;
    c[1] = e;
    c[2] = e > d.length - 2 ? d.length - 1 : e + 1;
    c[3] = e > d.length - 3 ? d.length - 1 : e + 2;
    e = d[c[0]];
    var f = d[c[1]],
      g = d[c[2]],
      c = d[c[3]];
    b.x = THREE.Curve.Utils.interpolate(e.x, f.x, g.x, c.x, a);
    b.y = THREE.Curve.Utils.interpolate(e.y, f.y, g.y, c.y, a);
    b.z = THREE.Curve.Utils.interpolate(e.z, f.z, g.z, c.z, a);
    return b;
  }
);
THREE.ClosedSplineCurve3 = THREE.Curve.create(
  function (a) {
    this.points = void 0 == a ? [] : a;
  },
  function (a) {
    var b = new THREE.Vector3(),
      c = [],
      d = this.points,
      e;
    e = (d.length - 0) * a;
    a = Math.floor(e);
    e -= a;
    a += 0 < a ? 0 : (Math.floor(Math.abs(a) / d.length) + 1) * d.length;
    c[0] = (a - 1) % d.length;
    c[1] = a % d.length;
    c[2] = (a + 1) % d.length;
    c[3] = (a + 2) % d.length;
    b.x = THREE.Curve.Utils.interpolate(
      d[c[0]].x,
      d[c[1]].x,
      d[c[2]].x,
      d[c[3]].x,
      e
    );
    b.y = THREE.Curve.Utils.interpolate(
      d[c[0]].y,
      d[c[1]].y,
      d[c[2]].y,
      d[c[3]].y,
      e
    );
    b.z = THREE.Curve.Utils.interpolate(
      d[c[0]].z,
      d[c[1]].z,
      d[c[2]].z,
      d[c[3]].z,
      e
    );
    return b;
  }
);
THREE.CurvePath = function () {
  this.curves = [];
  this.bends = [];
  this.autoClose = !1;
};
THREE.CurvePath.prototype = Object.create(THREE.Curve.prototype);
THREE.CurvePath.prototype.add = function (a) {
  this.curves.push(a);
};
THREE.CurvePath.prototype.checkConnection = function () {};
THREE.CurvePath.prototype.closePath = function () {
  var a = this.curves[0].getPoint(0),
    b = this.curves[this.curves.length - 1].getPoint(1);
  a.equals(b) || this.curves.push(new THREE.LineCurve(b, a));
};
THREE.CurvePath.prototype.getPoint = function (a) {
  for (
    var b = a * this.getLength(), c = this.getCurveLengths(), a = 0;
    a < c.length;

  ) {
    if (c[a] >= b)
      return (
        (b = c[a] - b),
        (a = this.curves[a]),
        (b = 1 - b / a.getLength()),
        a.getPointAt(b)
      );
    a++;
  }
  return null;
};
THREE.CurvePath.prototype.getLength = function () {
  var a = this.getCurveLengths();
  return a[a.length - 1];
};
THREE.CurvePath.prototype.getCurveLengths = function () {
  if (this.cacheLengths && this.cacheLengths.length == this.curves.length)
    return this.cacheLengths;
  var a = [],
    b = 0,
    c,
    d = this.curves.length;
  for (c = 0; c < d; c++) (b += this.curves[c].getLength()), a.push(b);
  return (this.cacheLengths = a);
};
THREE.CurvePath.prototype.getBoundingBox = function () {
  var a = this.getPoints(),
    b,
    c,
    d,
    e,
    f,
    g;
  b = c = Number.NEGATIVE_INFINITY;
  e = f = Number.POSITIVE_INFINITY;
  var h,
    i,
    j,
    l,
    m = a[0] instanceof THREE.Vector3;
  l = m ? new THREE.Vector3() : new THREE.Vector2();
  i = 0;
  for (j = a.length; i < j; i++)
    (h = a[i]),
      h.x > b ? (b = h.x) : h.x < e && (e = h.x),
      h.y > c ? (c = h.y) : h.y < f && (f = h.y),
      m && (h.z > d ? (d = h.z) : h.z < g && (g = h.z)),
      l.addSelf(h);
  a = {
    minX: e,
    minY: f,
    maxX: b,
    maxY: c,
    centroid: l.divideScalar(j),
  };
  m && ((a.maxZ = d), (a.minZ = g));
  return a;
};
THREE.CurvePath.prototype.createPointsGeometry = function (a) {
  a = this.getPoints(a, !0);
  return this.createGeometry(a);
};
THREE.CurvePath.prototype.createSpacedPointsGeometry = function (a) {
  a = this.getSpacedPoints(a, !0);
  return this.createGeometry(a);
};
THREE.CurvePath.prototype.createGeometry = function (a) {
  for (var b = new THREE.Geometry(), c = 0; c < a.length; c++)
    b.vertices.push(new THREE.Vector3(a[c].x, a[c].y, a[c].z || 0));
  return b;
};
THREE.CurvePath.prototype.addWrapPath = function (a) {
  this.bends.push(a);
};
THREE.CurvePath.prototype.getTransformedPoints = function (a, b) {
  var c = this.getPoints(a),
    d,
    e;
  b || (b = this.bends);
  d = 0;
  for (e = b.length; d < e; d++) c = this.getWrapPoints(c, b[d]);
  return c;
};
THREE.CurvePath.prototype.getTransformedSpacedPoints = function (a, b) {
  var c = this.getSpacedPoints(a),
    d,
    e;
  b || (b = this.bends);
  d = 0;
  for (e = b.length; d < e; d++) c = this.getWrapPoints(c, b[d]);
  return c;
};
THREE.CurvePath.prototype.getWrapPoints = function (a, b) {
  var c = this.getBoundingBox(),
    d,
    e,
    f,
    g,
    h,
    i;
  d = 0;
  for (e = a.length; d < e; d++)
    (f = a[d]),
      (g = f.x),
      (h = f.y),
      (i = g / c.maxX),
      (i = b.getUtoTmapping(i, g)),
      (g = b.getPoint(i)),
      (h = b.getNormalVector(i).multiplyScalar(h)),
      (f.x = g.x + h.x),
      (f.y = g.y + h.y);
  return a;
};
THREE.Gyroscope = function () {
  THREE.Object3D.call(this);
};
THREE.Gyroscope.prototype = Object.create(THREE.Object3D.prototype);
THREE.Gyroscope.prototype.updateMatrixWorld = function (a) {
  this.matrixAutoUpdate && this.updateMatrix();
  if (this.matrixWorldNeedsUpdate || a)
    this.parent
      ? (this.matrixWorld.multiply(this.parent.matrixWorld, this.matrix),
        this.matrixWorld.decompose(
          this.translationWorld,
          this.rotationWorld,
          this.scaleWorld
        ),
        this.matrix.decompose(
          this.translationObject,
          this.rotationObject,
          this.scaleObject
        ),
        this.matrixWorld.compose(
          this.translationWorld,
          this.rotationObject,
          this.scaleWorld
        ))
      : this.matrixWorld.copy(this.matrix),
      (this.matrixWorldNeedsUpdate = !1),
      (a = !0);
  for (var b = 0, c = this.children.length; b < c; b++)
    this.children[b].updateMatrixWorld(a);
};
THREE.Gyroscope.prototype.translationWorld = new THREE.Vector3();
THREE.Gyroscope.prototype.translationObject = new THREE.Vector3();
THREE.Gyroscope.prototype.rotationWorld = new THREE.Quaternion();
THREE.Gyroscope.prototype.rotationObject = new THREE.Quaternion();
THREE.Gyroscope.prototype.scaleWorld = new THREE.Vector3();
THREE.Gyroscope.prototype.scaleObject = new THREE.Vector3();
THREE.Path = function (a) {
  THREE.CurvePath.call(this);
  this.actions = [];
  a && this.fromPoints(a);
};
THREE.Path.prototype = Object.create(THREE.CurvePath.prototype);
THREE.PathActions = {
  MOVE_TO: "moveTo",
  LINE_TO: "lineTo",
  QUADRATIC_CURVE_TO: "quadraticCurveTo",
  BEZIER_CURVE_TO: "bezierCurveTo",
  CSPLINE_THRU: "splineThru",
  ARC: "arc",
  ELLIPSE: "ellipse",
};
THREE.Path.prototype.fromPoints = function (a) {
  this.moveTo(a[0].x, a[0].y);
  for (var b = 1, c = a.length; b < c; b++) this.lineTo(a[b].x, a[b].y);
};
THREE.Path.prototype.moveTo = function (a, b) {
  var c = Array.prototype.slice.call(arguments);
  this.actions.push({
    action: THREE.PathActions.MOVE_TO,
    args: c,
  });
};
THREE.Path.prototype.lineTo = function (a, b) {
  var c = Array.prototype.slice.call(arguments),
    d = this.actions[this.actions.length - 1].args,
    d = new THREE.LineCurve(
      new THREE.Vector2(d[d.length - 2], d[d.length - 1]),
      new THREE.Vector2(a, b)
    );
  this.curves.push(d);
  this.actions.push({
    action: THREE.PathActions.LINE_TO,
    args: c,
  });
};
THREE.Path.prototype.quadraticCurveTo = function (a, b, c, d) {
  var e = Array.prototype.slice.call(arguments),
    f = this.actions[this.actions.length - 1].args,
    f = new THREE.QuadraticBezierCurve(
      new THREE.Vector2(f[f.length - 2], f[f.length - 1]),
      new THREE.Vector2(a, b),
      new THREE.Vector2(c, d)
    );
  this.curves.push(f);
  this.actions.push({
    action: THREE.PathActions.QUADRATIC_CURVE_TO,
    args: e,
  });
};
THREE.Path.prototype.bezierCurveTo = function (a, b, c, d, e, f) {
  var g = Array.prototype.slice.call(arguments),
    h = this.actions[this.actions.length - 1].args,
    h = new THREE.CubicBezierCurve(
      new THREE.Vector2(h[h.length - 2], h[h.length - 1]),
      new THREE.Vector2(a, b),
      new THREE.Vector2(c, d),
      new THREE.Vector2(e, f)
    );
  this.curves.push(h);
  this.actions.push({
    action: THREE.PathActions.BEZIER_CURVE_TO,
    args: g,
  });
};
THREE.Path.prototype.splineThru = function (a) {
  var b = Array.prototype.slice.call(arguments),
    c = this.actions[this.actions.length - 1].args,
    c = [new THREE.Vector2(c[c.length - 2], c[c.length - 1])];
  Array.prototype.push.apply(c, a);
  c = new THREE.SplineCurve(c);
  this.curves.push(c);
  this.actions.push({
    action: THREE.PathActions.CSPLINE_THRU,
    args: b,
  });
};
THREE.Path.prototype.arc = function (a, b, c, d, e, f) {
  var g = this.actions[this.actions.length - 1].args;
  this.absarc(a + g[g.length - 2], b + g[g.length - 1], c, d, e, f);
};
THREE.Path.prototype.absarc = function (a, b, c, d, e, f) {
  this.absellipse(a, b, c, c, d, e, f);
};
THREE.Path.prototype.ellipse = function (a, b, c, d, e, f, g) {
  var h = this.actions[this.actions.length - 1].args;
  this.absellipse(a + h[h.length - 2], b + h[h.length - 1], c, d, e, f, g);
};
THREE.Path.prototype.absellipse = function (a, b, c, d, e, f, g) {
  var h = Array.prototype.slice.call(arguments),
    i = new THREE.EllipseCurve(a, b, c, d, e, f, g);
  this.curves.push(i);
  i = i.getPoint(g ? 1 : 0);
  h.push(i.x);
  h.push(i.y);
  this.actions.push({
    action: THREE.PathActions.ELLIPSE,
    args: h,
  });
};
THREE.Path.prototype.getSpacedPoints = function (a) {
  a || (a = 40);
  for (var b = [], c = 0; c < a; c++) b.push(this.getPoint(c / a));
  return b;
};
THREE.Path.prototype.getPoints = function (a, b) {
  if (this.useSpacedPoints)
    return console.log("tata"), this.getSpacedPoints(a, b);
  var a = a || 12,
    c = [],
    d,
    e,
    f,
    g,
    h,
    i,
    j,
    l,
    m,
    n,
    p,
    o,
    s;
  d = 0;
  for (e = this.actions.length; d < e; d++)
    switch (((f = this.actions[d]), (g = f.action), (f = f.args), g)) {
      case THREE.PathActions.MOVE_TO:
        c.push(new THREE.Vector2(f[0], f[1]));
        break;
      case THREE.PathActions.LINE_TO:
        c.push(new THREE.Vector2(f[0], f[1]));
        break;
      case THREE.PathActions.QUADRATIC_CURVE_TO:
        h = f[2];
        i = f[3];
        m = f[0];
        n = f[1];
        0 < c.length
          ? ((g = c[c.length - 1]), (p = g.x), (o = g.y))
          : ((g = this.actions[d - 1].args),
            (p = g[g.length - 2]),
            (o = g[g.length - 1]));
        for (f = 1; f <= a; f++)
          (s = f / a),
            (g = THREE.Shape.Utils.b2(s, p, m, h)),
            (s = THREE.Shape.Utils.b2(s, o, n, i)),
            c.push(new THREE.Vector2(g, s));
        break;
      case THREE.PathActions.BEZIER_CURVE_TO:
        h = f[4];
        i = f[5];
        m = f[0];
        n = f[1];
        j = f[2];
        l = f[3];
        0 < c.length
          ? ((g = c[c.length - 1]), (p = g.x), (o = g.y))
          : ((g = this.actions[d - 1].args),
            (p = g[g.length - 2]),
            (o = g[g.length - 1]));
        for (f = 1; f <= a; f++)
          (s = f / a),
            (g = THREE.Shape.Utils.b3(s, p, m, j, h)),
            (s = THREE.Shape.Utils.b3(s, o, n, l, i)),
            c.push(new THREE.Vector2(g, s));
        break;
      case THREE.PathActions.CSPLINE_THRU:
        g = this.actions[d - 1].args;
        s = [new THREE.Vector2(g[g.length - 2], g[g.length - 1])];
        g = a * f[0].length;
        s = s.concat(f[0]);
        s = new THREE.SplineCurve(s);
        for (f = 1; f <= g; f++) c.push(s.getPointAt(f / g));
        break;
      case THREE.PathActions.ARC:
        h = f[0];
        i = f[1];
        n = f[2];
        j = f[3];
        g = f[4];
        m = !!f[5];
        p = g - j;
        o = 2 * a;
        for (f = 1; f <= o; f++)
          (s = f / o),
            m || (s = 1 - s),
            (s = j + s * p),
            (g = h + n * Math.cos(s)),
            (s = i + n * Math.sin(s)),
            c.push(new THREE.Vector2(g, s));
        break;
      case THREE.PathActions.ELLIPSE:
        h = f[0];
        i = f[1];
        n = f[2];
        l = f[3];
        j = f[4];
        g = f[5];
        m = !!f[6];
        p = g - j;
        o = 2 * a;
        for (f = 1; f <= o; f++)
          (s = f / o),
            m || (s = 1 - s),
            (s = j + s * p),
            (g = h + n * Math.cos(s)),
            (s = i + l * Math.sin(s)),
            c.push(new THREE.Vector2(g, s));
    }
  d = c[c.length - 1];
  1e-10 > Math.abs(d.x - c[0].x) &&
    1e-10 > Math.abs(d.y - c[0].y) &&
    c.splice(c.length - 1, 1);
  b && c.push(c[0]);
  return c;
};
THREE.Path.prototype.toShapes = function () {
  var a,
    b,
    c,
    d,
    e = [],
    f = new THREE.Path();
  a = 0;
  for (b = this.actions.length; a < b; a++)
    (c = this.actions[a]),
      (d = c.args),
      (c = c.action),
      c == THREE.PathActions.MOVE_TO &&
        0 != f.actions.length &&
        (e.push(f), (f = new THREE.Path())),
      f[c].apply(f, d);
  0 != f.actions.length && e.push(f);
  if (0 == e.length) return [];
  var g;
  d = [];
  a = !THREE.Shape.Utils.isClockWise(e[0].getPoints());
  if (1 == e.length)
    return (
      (f = e[0]),
      (g = new THREE.Shape()),
      (g.actions = f.actions),
      (g.curves = f.curves),
      d.push(g),
      d
    );
  if (a) {
    g = new THREE.Shape();
    a = 0;
    for (b = e.length; a < b; a++)
      (f = e[a]),
        THREE.Shape.Utils.isClockWise(f.getPoints())
          ? ((g.actions = f.actions),
            (g.curves = f.curves),
            d.push(g),
            (g = new THREE.Shape()))
          : g.holes.push(f);
  } else {
    a = 0;
    for (b = e.length; a < b; a++)
      (f = e[a]),
        THREE.Shape.Utils.isClockWise(f.getPoints())
          ? (g && d.push(g),
            (g = new THREE.Shape()),
            (g.actions = f.actions),
            (g.curves = f.curves))
          : g.holes.push(f);
    d.push(g);
  }
  return d;
};
THREE.Shape = function () {
  THREE.Path.apply(this, arguments);
  this.holes = [];
};
THREE.Shape.prototype = Object.create(THREE.Path.prototype);
THREE.Shape.prototype.extrude = function (a) {
  return new THREE.ExtrudeGeometry(this, a);
};
THREE.Shape.prototype.makeGeometry = function (a) {
  return new THREE.ShapeGeometry(this, a);
};
THREE.Shape.prototype.getPointsHoles = function (a) {
  var b,
    c = this.holes.length,
    d = [];
  for (b = 0; b < c; b++)
    d[b] = this.holes[b].getTransformedPoints(a, this.bends);
  return d;
};
THREE.Shape.prototype.getSpacedPointsHoles = function (a) {
  var b,
    c = this.holes.length,
    d = [];
  for (b = 0; b < c; b++)
    d[b] = this.holes[b].getTransformedSpacedPoints(a, this.bends);
  return d;
};
THREE.Shape.prototype.extractAllPoints = function (a) {
  return {
    shape: this.getTransformedPoints(a),
    holes: this.getPointsHoles(a),
  };
};
THREE.Shape.prototype.extractPoints = function (a) {
  return this.useSpacedPoints
    ? this.extractAllSpacedPoints(a)
    : this.extractAllPoints(a);
};
THREE.Shape.prototype.extractAllSpacedPoints = function (a) {
  return {
    shape: this.getTransformedSpacedPoints(a),
    holes: this.getSpacedPointsHoles(a),
  };
};
THREE.Shape.Utils = {
  removeHoles: function (a, b) {
    var c = a.concat(),
      d = c.concat(),
      e,
      f,
      g,
      h,
      i,
      j,
      l,
      m,
      n,
      p,
      o = [];
    for (i = 0; i < b.length; i++) {
      j = b[i];
      Array.prototype.push.apply(d, j);
      f = Number.POSITIVE_INFINITY;
      for (e = 0; e < j.length; e++) {
        n = j[e];
        p = [];
        for (m = 0; m < c.length; m++)
          (l = c[m]),
            (l = n.distanceToSquared(l)),
            p.push(l),
            l < f && ((f = l), (g = e), (h = m));
      }
      e = 0 <= h - 1 ? h - 1 : c.length - 1;
      f = 0 <= g - 1 ? g - 1 : j.length - 1;
      var s = [j[g], c[h], c[e]];
      m = THREE.FontUtils.Triangulate.area(s);
      var t = [j[g], j[f], c[h]];
      n = THREE.FontUtils.Triangulate.area(t);
      p = h;
      l = g;
      h += 1;
      g += -1;
      0 > h && (h += c.length);
      h %= c.length;
      0 > g && (g += j.length);
      g %= j.length;
      e = 0 <= h - 1 ? h - 1 : c.length - 1;
      f = 0 <= g - 1 ? g - 1 : j.length - 1;
      s = [j[g], c[h], c[e]];
      s = THREE.FontUtils.Triangulate.area(s);
      t = [j[g], j[f], c[h]];
      t = THREE.FontUtils.Triangulate.area(t);
      m + n > s + t &&
        ((h = p),
        (g = l),
        0 > h && (h += c.length),
        (h %= c.length),
        0 > g && (g += j.length),
        (g %= j.length),
        (e = 0 <= h - 1 ? h - 1 : c.length - 1),
        (f = 0 <= g - 1 ? g - 1 : j.length - 1));
      m = c.slice(0, h);
      n = c.slice(h);
      p = j.slice(g);
      l = j.slice(0, g);
      f = [j[g], j[f], c[h]];
      o.push([j[g], c[h], c[e]]);
      o.push(f);
      c = m.concat(p).concat(l).concat(n);
    }
    return {
      shape: c,
      isolatedPts: o,
      allpoints: d,
    };
  },
  triangulateShape: function (a, b) {
    var c = THREE.Shape.Utils.removeHoles(a, b),
      d = c.allpoints,
      e = c.isolatedPts,
      c = THREE.FontUtils.Triangulate(c.shape, !1),
      f,
      g,
      h,
      i,
      j = {};
    f = 0;
    for (g = d.length; f < g; f++)
      (i = d[f].x + ":" + d[f].y),
        void 0 !== j[i] && console.log("Duplicate point", i),
        (j[i] = f);
    f = 0;
    for (g = c.length; f < g; f++) {
      h = c[f];
      for (d = 0; 3 > d; d++)
        (i = h[d].x + ":" + h[d].y), (i = j[i]), void 0 !== i && (h[d] = i);
    }
    f = 0;
    for (g = e.length; f < g; f++) {
      h = e[f];
      for (d = 0; 3 > d; d++)
        (i = h[d].x + ":" + h[d].y), (i = j[i]), void 0 !== i && (h[d] = i);
    }
    return c.concat(e);
  },
  isClockWise: function (a) {
    return 0 > THREE.FontUtils.Triangulate.area(a);
  },
  b2p0: function (a, b) {
    var c = 1 - a;
    return c * c * b;
  },
  b2p1: function (a, b) {
    return 2 * (1 - a) * a * b;
  },
  b2p2: function (a, b) {
    return a * a * b;
  },
  b2: function (a, b, c, d) {
    return this.b2p0(a, b) + this.b2p1(a, c) + this.b2p2(a, d);
  },
  b3p0: function (a, b) {
    var c = 1 - a;
    return c * c * c * b;
  },
  b3p1: function (a, b) {
    var c = 1 - a;
    return 3 * c * c * a * b;
  },
  b3p2: function (a, b) {
    return 3 * (1 - a) * a * a * b;
  },
  b3p3: function (a, b) {
    return a * a * a * b;
  },
  b3: function (a, b, c, d, e) {
    return (
      this.b3p0(a, b) + this.b3p1(a, c) + this.b3p2(a, d) + this.b3p3(a, e)
    );
  },
};
THREE.AnimationHandler = (function () {
  var a = [],
    b = {},
    c = {
      update: function (b) {
        for (var c = 0; c < a.length; c++) a[c].update(b);
      },
      addToUpdate: function (b) {
        -1 === a.indexOf(b) && a.push(b);
      },
      removeFromUpdate: function (b) {
        b = a.indexOf(b);
        -1 !== b && a.splice(b, 1);
      },
      add: function (a) {
        void 0 !== b[a.name] &&
          console.log(
            "THREE.AnimationHandler.add: Warning! " +
              a.name +
              " already exists in library. Overwriting."
          );
        b[a.name] = a;
        if (!0 !== a.initialized) {
          for (var c = 0; c < a.hierarchy.length; c++) {
            for (var d = 0; d < a.hierarchy[c].keys.length; d++)
              if (
                (0 > a.hierarchy[c].keys[d].time &&
                  (a.hierarchy[c].keys[d].time = 0),
                void 0 !== a.hierarchy[c].keys[d].rot &&
                  !(a.hierarchy[c].keys[d].rot instanceof THREE.Quaternion))
              ) {
                var h = a.hierarchy[c].keys[d].rot;
                a.hierarchy[c].keys[d].rot = new THREE.Quaternion(
                  h[0],
                  h[1],
                  h[2],
                  h[3]
                );
              }
            if (
              a.hierarchy[c].keys.length &&
              void 0 !== a.hierarchy[c].keys[0].morphTargets
            ) {
              h = {};
              for (d = 0; d < a.hierarchy[c].keys.length; d++)
                for (
                  var i = 0;
                  i < a.hierarchy[c].keys[d].morphTargets.length;
                  i++
                ) {
                  var j = a.hierarchy[c].keys[d].morphTargets[i];
                  h[j] = -1;
                }
              a.hierarchy[c].usedMorphTargets = h;
              for (d = 0; d < a.hierarchy[c].keys.length; d++) {
                var l = {};
                for (j in h) {
                  for (
                    i = 0;
                    i < a.hierarchy[c].keys[d].morphTargets.length;
                    i++
                  )
                    if (a.hierarchy[c].keys[d].morphTargets[i] === j) {
                      l[j] = a.hierarchy[c].keys[d].morphTargetsInfluences[i];
                      break;
                    }
                  i === a.hierarchy[c].keys[d].morphTargets.length &&
                    (l[j] = 0);
                }
                a.hierarchy[c].keys[d].morphTargetsInfluences = l;
              }
            }
            for (d = 1; d < a.hierarchy[c].keys.length; d++)
              a.hierarchy[c].keys[d].time === a.hierarchy[c].keys[d - 1].time &&
                (a.hierarchy[c].keys.splice(d, 1), d--);
            for (d = 0; d < a.hierarchy[c].keys.length; d++)
              a.hierarchy[c].keys[d].index = d;
          }
          d = parseInt(a.length * a.fps, 10);
          a.JIT = {};
          a.JIT.hierarchy = [];
          for (c = 0; c < a.hierarchy.length; c++)
            a.JIT.hierarchy.push(Array(d));
          a.initialized = !0;
        }
      },
      get: function (a) {
        if ("string" === typeof a) {
          if (b[a]) return b[a];
          console.log(
            "THREE.AnimationHandler.get: Couldn't find animation " + a
          );
          return null;
        }
      },
      parse: function (a) {
        var b = [];
        if (a instanceof THREE.SkinnedMesh)
          for (var c = 0; c < a.bones.length; c++) b.push(a.bones[c]);
        else d(a, b);
        return b;
      },
    },
    d = function (a, b) {
      b.push(a);
      for (var c = 0; c < a.children.length; c++) d(a.children[c], b);
    };
  c.LINEAR = 0;
  c.CATMULLROM = 1;
  c.CATMULLROM_FORWARD = 2;
  return c;
})();
THREE.Animation = function (a, b, c) {
  this.root = a;
  this.data = THREE.AnimationHandler.get(b);
  this.hierarchy = THREE.AnimationHandler.parse(a);
  this.currentTime = 0;
  this.timeScale = 1;
  this.isPlaying = !1;
  this.loop = this.isPaused = !0;
  this.interpolationType = void 0 !== c ? c : THREE.AnimationHandler.LINEAR;
  this.points = [];
  this.target = new THREE.Vector3();
};
THREE.Animation.prototype.play = function (a, b) {
  if (!1 === this.isPlaying) {
    this.isPlaying = !0;
    this.loop = void 0 !== a ? a : !0;
    this.currentTime = void 0 !== b ? b : 0;
    var c,
      d = this.hierarchy.length,
      e;
    for (c = 0; c < d; c++) {
      e = this.hierarchy[c];
      this.interpolationType !== THREE.AnimationHandler.CATMULLROM_FORWARD &&
        (e.useQuaternion = !0);
      e.matrixAutoUpdate = !0;
      void 0 === e.animationCache &&
        ((e.animationCache = {}),
        (e.animationCache.prevKey = {
          pos: 0,
          rot: 0,
          scl: 0,
        }),
        (e.animationCache.nextKey = {
          pos: 0,
          rot: 0,
          scl: 0,
        }),
        (e.animationCache.originalMatrix =
          e instanceof THREE.Bone ? e.skinMatrix : e.matrix));
      var f = e.animationCache.prevKey;
      e = e.animationCache.nextKey;
      f.pos = this.data.hierarchy[c].keys[0];
      f.rot = this.data.hierarchy[c].keys[0];
      f.scl = this.data.hierarchy[c].keys[0];
      e.pos = this.getNextKeyWith("pos", c, 1);
      e.rot = this.getNextKeyWith("rot", c, 1);
      e.scl = this.getNextKeyWith("scl", c, 1);
    }
    this.update(0);
  }
  this.isPaused = !1;
  THREE.AnimationHandler.addToUpdate(this);
};
THREE.Animation.prototype.pause = function () {
  !0 === this.isPaused
    ? THREE.AnimationHandler.addToUpdate(this)
    : THREE.AnimationHandler.removeFromUpdate(this);
  this.isPaused = !this.isPaused;
};
THREE.Animation.prototype.stop = function () {
  this.isPaused = this.isPlaying = !1;
  THREE.AnimationHandler.removeFromUpdate(this);
};
THREE.Animation.prototype.update = function (a) {
  if (!1 !== this.isPlaying) {
    var b = ["pos", "rot", "scl"],
      c,
      d,
      e,
      f,
      g,
      h,
      i,
      j,
      l;
    l = this.currentTime += a * this.timeScale;
    j = this.currentTime %= this.data.length;
    parseInt(Math.min(j * this.data.fps, this.data.length * this.data.fps), 10);
    for (var m = 0, n = this.hierarchy.length; m < n; m++) {
      a = this.hierarchy[m];
      i = a.animationCache;
      for (var p = 0; 3 > p; p++) {
        c = b[p];
        g = i.prevKey[c];
        h = i.nextKey[c];
        if (h.time <= l) {
          if (j < l)
            if (this.loop) {
              g = this.data.hierarchy[m].keys[0];
              for (h = this.getNextKeyWith(c, m, 1); h.time < j; )
                (g = h), (h = this.getNextKeyWith(c, m, h.index + 1));
            } else {
              this.stop();
              return;
            }
          else {
            do (g = h), (h = this.getNextKeyWith(c, m, h.index + 1));
            while (h.time < j);
          }
          i.prevKey[c] = g;
          i.nextKey[c] = h;
        }
        a.matrixAutoUpdate = !0;
        a.matrixWorldNeedsUpdate = !0;
        d = (j - g.time) / (h.time - g.time);
        e = g[c];
        f = h[c];
        if (0 > d || 1 < d)
          console.log(
            "THREE.Animation.update: Warning! Scale out of bounds:" +
              d +
              " on bone " +
              m
          ),
            (d = 0 > d ? 0 : 1);
        if ("pos" === c)
          if (
            ((c = a.position),
            this.interpolationType === THREE.AnimationHandler.LINEAR)
          )
            (c.x = e[0] + (f[0] - e[0]) * d),
              (c.y = e[1] + (f[1] - e[1]) * d),
              (c.z = e[2] + (f[2] - e[2]) * d);
          else {
            if (
              this.interpolationType === THREE.AnimationHandler.CATMULLROM ||
              this.interpolationType ===
                THREE.AnimationHandler.CATMULLROM_FORWARD
            )
              (this.points[0] = this.getPrevKeyWith("pos", m, g.index - 1).pos),
                (this.points[1] = e),
                (this.points[2] = f),
                (this.points[3] = this.getNextKeyWith(
                  "pos",
                  m,
                  h.index + 1
                ).pos),
                (d = 0.33 * d + 0.33),
                (e = this.interpolateCatmullRom(this.points, d)),
                (c.x = e[0]),
                (c.y = e[1]),
                (c.z = e[2]),
                this.interpolationType ===
                  THREE.AnimationHandler.CATMULLROM_FORWARD &&
                  ((d = this.interpolateCatmullRom(this.points, 1.01 * d)),
                  this.target.set(d[0], d[1], d[2]),
                  this.target.subSelf(c),
                  (this.target.y = 0),
                  this.target.normalize(),
                  (d = Math.atan2(this.target.x, this.target.z)),
                  a.rotation.set(0, d, 0));
          }
        else
          "rot" === c
            ? THREE.Quaternion.slerp(e, f, a.quaternion, d)
            : "scl" === c &&
              ((c = a.scale),
              (c.x = e[0] + (f[0] - e[0]) * d),
              (c.y = e[1] + (f[1] - e[1]) * d),
              (c.z = e[2] + (f[2] - e[2]) * d));
      }
    }
  }
};
THREE.Animation.prototype.interpolateCatmullRom = function (a, b) {
  var c = [],
    d = [],
    e,
    f,
    g,
    h,
    i,
    j;
  e = (a.length - 1) * b;
  f = Math.floor(e);
  e -= f;
  c[0] = 0 === f ? f : f - 1;
  c[1] = f;
  c[2] = f > a.length - 2 ? f : f + 1;
  c[3] = f > a.length - 3 ? f : f + 2;
  f = a[c[0]];
  h = a[c[1]];
  i = a[c[2]];
  j = a[c[3]];
  c = e * e;
  g = e * c;
  d[0] = this.interpolate(f[0], h[0], i[0], j[0], e, c, g);
  d[1] = this.interpolate(f[1], h[1], i[1], j[1], e, c, g);
  d[2] = this.interpolate(f[2], h[2], i[2], j[2], e, c, g);
  return d;
};
THREE.Animation.prototype.interpolate = function (a, b, c, d, e, f, g) {
  a = 0.5 * (c - a);
  d = 0.5 * (d - b);
  return (2 * (b - c) + a + d) * g + (-3 * (b - c) - 2 * a - d) * f + a * e + b;
};
THREE.Animation.prototype.getNextKeyWith = function (a, b, c) {
  for (
    var d = this.data.hierarchy[b].keys,
      c =
        this.interpolationType === THREE.AnimationHandler.CATMULLROM ||
        this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD
          ? c < d.length - 1
            ? c
            : d.length - 1
          : c % d.length;
    c < d.length;
    c++
  )
    if (void 0 !== d[c][a]) return d[c];
  return this.data.hierarchy[b].keys[0];
};
THREE.Animation.prototype.getPrevKeyWith = function (a, b, c) {
  for (
    var d = this.data.hierarchy[b].keys,
      c =
        this.interpolationType === THREE.AnimationHandler.CATMULLROM ||
        this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD
          ? 0 < c
            ? c
            : 0
          : 0 <= c
          ? c
          : c + d.length;
    0 <= c;
    c--
  )
    if (void 0 !== d[c][a]) return d[c];
  return this.data.hierarchy[b].keys[d.length - 1];
};
THREE.KeyFrameAnimation = function (a, b, c) {
  this.root = a;
  this.data = THREE.AnimationHandler.get(b);
  this.hierarchy = THREE.AnimationHandler.parse(a);
  this.currentTime = 0;
  this.timeScale = 0.001;
  this.isPlaying = !1;
  this.loop = this.isPaused = !0;
  this.JITCompile = void 0 !== c ? c : !0;
  a = 0;
  for (b = this.hierarchy.length; a < b; a++) {
    var c = this.data.hierarchy[a].sids,
      d = this.hierarchy[a];
    if (this.data.hierarchy[a].keys.length && c) {
      for (var e = 0; e < c.length; e++) {
        var f = c[e],
          g = this.getNextKeyWith(f, a, 0);
        g && g.apply(f);
      }
      d.matrixAutoUpdate = !1;
      this.data.hierarchy[a].node.updateMatrix();
      d.matrixWorldNeedsUpdate = !0;
    }
  }
};
THREE.KeyFrameAnimation.prototype.play = function (a, b) {
  if (!this.isPlaying) {
    this.isPlaying = !0;
    this.loop = void 0 !== a ? a : !0;
    this.currentTime = void 0 !== b ? b : 0;
    this.startTimeMs = b;
    this.startTime = 1e7;
    this.endTime = -this.startTime;
    var c,
      d = this.hierarchy.length,
      e,
      f;
    for (c = 0; c < d; c++)
      if (
        ((e = this.hierarchy[c]),
        (f = this.data.hierarchy[c]),
        (e.useQuaternion = !0),
        void 0 === f.animationCache &&
          ((f.animationCache = {}),
          (f.animationCache.prevKey = null),
          (f.animationCache.nextKey = null),
          (f.animationCache.originalMatrix =
            e instanceof THREE.Bone ? e.skinMatrix : e.matrix)),
        (e = this.data.hierarchy[c].keys),
        e.length)
      )
        (f.animationCache.prevKey = e[0]),
          (f.animationCache.nextKey = e[1]),
          (this.startTime = Math.min(e[0].time, this.startTime)),
          (this.endTime = Math.max(e[e.length - 1].time, this.endTime));
    this.update(0);
  }
  this.isPaused = !1;
  THREE.AnimationHandler.addToUpdate(this);
};
THREE.KeyFrameAnimation.prototype.pause = function () {
  this.isPaused
    ? THREE.AnimationHandler.addToUpdate(this)
    : THREE.AnimationHandler.removeFromUpdate(this);
  this.isPaused = !this.isPaused;
};
THREE.KeyFrameAnimation.prototype.stop = function () {
  this.isPaused = this.isPlaying = !1;
  THREE.AnimationHandler.removeFromUpdate(this);
  for (var a = 0; a < this.data.hierarchy.length; a++) {
    var b = this.hierarchy[a],
      c = this.data.hierarchy[a];
    if (void 0 !== c.animationCache) {
      var d = c.animationCache.originalMatrix;
      b instanceof THREE.Bone
        ? (d.copy(b.skinMatrix), (b.skinMatrix = d))
        : (d.copy(b.matrix), (b.matrix = d));
      delete c.animationCache;
    }
  }
};
THREE.KeyFrameAnimation.prototype.update = function (a) {
  if (this.isPlaying) {
    var b,
      c,
      d,
      e,
      f = this.data.JIT.hierarchy,
      g,
      h,
      i;
    h = this.currentTime += a * this.timeScale;
    g = this.currentTime %= this.data.length;
    g < this.startTimeMs && (g = this.currentTime = this.startTimeMs + g);
    e = parseInt(
      Math.min(g * this.data.fps, this.data.length * this.data.fps),
      10
    );
    if ((i = g < h) && !this.loop) {
      for (var a = 0, j = this.hierarchy.length; a < j; a++) {
        var l = this.data.hierarchy[a].keys,
          f = this.data.hierarchy[a].sids;
        d = l.length - 1;
        e = this.hierarchy[a];
        if (l.length) {
          for (l = 0; l < f.length; l++)
            (g = f[l]), (h = this.getPrevKeyWith(g, a, d)) && h.apply(g);
          this.data.hierarchy[a].node.updateMatrix();
          e.matrixWorldNeedsUpdate = !0;
        }
      }
      this.stop();
    } else if (!(g < this.startTime)) {
      a = 0;
      for (j = this.hierarchy.length; a < j; a++) {
        d = this.hierarchy[a];
        b = this.data.hierarchy[a];
        var l = b.keys,
          m = b.animationCache;
        if (this.JITCompile && void 0 !== f[a][e])
          d instanceof THREE.Bone
            ? ((d.skinMatrix = f[a][e]), (d.matrixWorldNeedsUpdate = !1))
            : ((d.matrix = f[a][e]), (d.matrixWorldNeedsUpdate = !0));
        else if (l.length) {
          this.JITCompile &&
            m &&
            (d instanceof THREE.Bone
              ? (d.skinMatrix = m.originalMatrix)
              : (d.matrix = m.originalMatrix));
          b = m.prevKey;
          c = m.nextKey;
          if (b && c) {
            if (c.time <= h) {
              if (i && this.loop) {
                b = l[0];
                for (c = l[1]; c.time < g; ) (b = c), (c = l[b.index + 1]);
              } else if (!i)
                for (var n = l.length - 1; c.time < g && c.index !== n; )
                  (b = c), (c = l[b.index + 1]);
              m.prevKey = b;
              m.nextKey = c;
            }
            c.time >= g ? b.interpolate(c, g) : b.interpolate(c, c.time);
          }
          this.data.hierarchy[a].node.updateMatrix();
          d.matrixWorldNeedsUpdate = !0;
        }
      }
      if (this.JITCompile && void 0 === f[0][e]) {
        this.hierarchy[0].updateMatrixWorld(!0);
        for (a = 0; a < this.hierarchy.length; a++)
          f[a][e] =
            this.hierarchy[a] instanceof THREE.Bone
              ? this.hierarchy[a].skinMatrix.clone()
              : this.hierarchy[a].matrix.clone();
      }
    }
  }
};
THREE.KeyFrameAnimation.prototype.getNextKeyWith = function (a, b, c) {
  b = this.data.hierarchy[b].keys;
  for (c %= b.length; c < b.length; c++) if (b[c].hasTarget(a)) return b[c];
  return b[0];
};
THREE.KeyFrameAnimation.prototype.getPrevKeyWith = function (a, b, c) {
  b = this.data.hierarchy[b].keys;
  for (c = 0 <= c ? c : c + b.length; 0 <= c; c--)
    if (b[c].hasTarget(a)) return b[c];
  return b[b.length - 1];
};
THREE.CubeCamera = function (a, b, c) {
  THREE.Object3D.call(this);
  var d = new THREE.PerspectiveCamera(90, 1, a, b);
  d.up.set(0, -1, 0);
  d.lookAt(new THREE.Vector3(1, 0, 0));
  this.add(d);
  var e = new THREE.PerspectiveCamera(90, 1, a, b);
  e.up.set(0, -1, 0);
  e.lookAt(new THREE.Vector3(-1, 0, 0));
  this.add(e);
  var f = new THREE.PerspectiveCamera(90, 1, a, b);
  f.up.set(0, 0, 1);
  f.lookAt(new THREE.Vector3(0, 1, 0));
  this.add(f);
  var g = new THREE.PerspectiveCamera(90, 1, a, b);
  g.up.set(0, 0, -1);
  g.lookAt(new THREE.Vector3(0, -1, 0));
  this.add(g);
  var h = new THREE.PerspectiveCamera(90, 1, a, b);
  h.up.set(0, -1, 0);
  h.lookAt(new THREE.Vector3(0, 0, 1));
  this.add(h);
  var i = new THREE.PerspectiveCamera(90, 1, a, b);
  i.up.set(0, -1, 0);
  i.lookAt(new THREE.Vector3(0, 0, -1));
  this.add(i);
  this.renderTarget = new THREE.WebGLRenderTargetCube(c, c, {
    format: THREE.RGBFormat,
    magFilter: THREE.LinearFilter,
    minFilter: THREE.LinearFilter,
  });
  this.updateCubeMap = function (a, b) {
    var c = this.renderTarget,
      n = c.generateMipmaps;
    c.generateMipmaps = !1;
    c.activeCubeFace = 0;
    a.render(b, d, c);
    c.activeCubeFace = 1;
    a.render(b, e, c);
    c.activeCubeFace = 2;
    a.render(b, f, c);
    c.activeCubeFace = 3;
    a.render(b, g, c);
    c.activeCubeFace = 4;
    a.render(b, h, c);
    c.generateMipmaps = n;
    c.activeCubeFace = 5;
    a.render(b, i, c);
  };
};
THREE.CubeCamera.prototype = Object.create(THREE.Object3D.prototype);
THREE.CombinedCamera = function (a, b, c, d, e, f, g) {
  THREE.Camera.call(this);
  this.fov = c;
  this.left = -a / 2;
  this.right = a / 2;
  this.top = b / 2;
  this.bottom = -b / 2;
  this.cameraO = new THREE.OrthographicCamera(
    a / -2,
    a / 2,
    b / 2,
    b / -2,
    f,
    g
  );
  this.cameraP = new THREE.PerspectiveCamera(c, a / b, d, e);
  this.zoom = 1;
  this.toPerspective();
};
THREE.CombinedCamera.prototype = Object.create(THREE.Camera.prototype);
THREE.CombinedCamera.prototype.toPerspective = function () {
  this.near = this.cameraP.near;
  this.far = this.cameraP.far;
  this.cameraP.fov = this.fov / this.zoom;
  this.cameraP.updateProjectionMatrix();
  this.projectionMatrix = this.cameraP.projectionMatrix;
  this.inPerspectiveMode = !0;
  this.inOrthographicMode = !1;
};
THREE.CombinedCamera.prototype.toOrthographic = function () {
  var a = this.cameraP.aspect,
    b = (this.cameraP.near + this.cameraP.far) / 2,
    b = Math.tan(this.fov / 2) * b,
    a = (2 * b * a) / 2,
    b = b / this.zoom,
    a = a / this.zoom;
  this.cameraO.left = -a;
  this.cameraO.right = a;
  this.cameraO.top = b;
  this.cameraO.bottom = -b;
  this.cameraO.updateProjectionMatrix();
  this.near = this.cameraO.near;
  this.far = this.cameraO.far;
  this.projectionMatrix = this.cameraO.projectionMatrix;
  this.inPerspectiveMode = !1;
  this.inOrthographicMode = !0;
};
THREE.CombinedCamera.prototype.setSize = function (a, b) {
  this.cameraP.aspect = a / b;
  this.left = -a / 2;
  this.right = a / 2;
  this.top = b / 2;
  this.bottom = -b / 2;
};
THREE.CombinedCamera.prototype.setFov = function (a) {
  this.fov = a;
  this.inPerspectiveMode ? this.toPerspective() : this.toOrthographic();
};
THREE.CombinedCamera.prototype.updateProjectionMatrix = function () {
  this.inPerspectiveMode
    ? this.toPerspective()
    : (this.toPerspective(), this.toOrthographic());
};
THREE.CombinedCamera.prototype.setLens = function (a, b) {
  void 0 === b && (b = 24);
  var c = 2 * Math.atan(b / (2 * a)) * (180 / Math.PI);
  this.setFov(c);
  return c;
};
THREE.CombinedCamera.prototype.setZoom = function (a) {
  this.zoom = a;
  this.inPerspectiveMode ? this.toPerspective() : this.toOrthographic();
};
THREE.CombinedCamera.prototype.toFrontView = function () {
  this.rotation.x = 0;
  this.rotation.y = 0;
  this.rotation.z = 0;
  this.rotationAutoUpdate = !1;
};
THREE.CombinedCamera.prototype.toBackView = function () {
  this.rotation.x = 0;
  this.rotation.y = Math.PI;
  this.rotation.z = 0;
  this.rotationAutoUpdate = !1;
};
THREE.CombinedCamera.prototype.toLeftView = function () {
  this.rotation.x = 0;
  this.rotation.y = -Math.PI / 2;
  this.rotation.z = 0;
  this.rotationAutoUpdate = !1;
};
THREE.CombinedCamera.prototype.toRightView = function () {
  this.rotation.x = 0;
  this.rotation.y = Math.PI / 2;
  this.rotation.z = 0;
  this.rotationAutoUpdate = !1;
};
THREE.CombinedCamera.prototype.toTopView = function () {
  this.rotation.x = -Math.PI / 2;
  this.rotation.y = 0;
  this.rotation.z = 0;
  this.rotationAutoUpdate = !1;
};
THREE.CombinedCamera.prototype.toBottomView = function () {
  this.rotation.x = Math.PI / 2;
  this.rotation.y = 0;
  this.rotation.z = 0;
  this.rotationAutoUpdate = !1;
};
THREE.AsteriskGeometry = function (a, b) {
  THREE.Geometry.call(this);
  for (
    var c = 0.707 * a,
      d = 0.707 * b,
      c = [
        [a, 0, 0],
        [b, 0, 0],
        [-a, 0, 0],
        [-b, 0, 0],
        [0, a, 0],
        [0, b, 0],
        [0, -a, 0],
        [0, -b, 0],
        [0, 0, a],
        [0, 0, b],
        [0, 0, -a],
        [0, 0, -b],
        [c, c, 0],
        [d, d, 0],
        [-c, -c, 0],
        [-d, -d, 0],
        [c, -c, 0],
        [d, -d, 0],
        [-c, c, 0],
        [-d, d, 0],
        [c, 0, c],
        [d, 0, d],
        [-c, 0, -c],
        [-d, 0, -d],
        [c, 0, -c],
        [d, 0, -d],
        [-c, 0, c],
        [-d, 0, d],
        [0, c, c],
        [0, d, d],
        [0, -c, -c],
        [0, -d, -d],
        [0, c, -c],
        [0, d, -d],
        [0, -c, c],
        [0, -d, d],
      ],
      d = 0,
      e = c.length;
    d < e;
    d++
  )
    this.vertices.push(new THREE.Vector3(c[d][0], c[d][1], c[d][2]));
};
THREE.AsteriskGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.CircleGeometry = function (a, b, c, d) {
  THREE.Geometry.call(this);
  var a = a || 50,
    c = void 0 !== c ? c : 0,
    d = void 0 !== d ? d : 2 * Math.PI,
    b = void 0 !== b ? Math.max(3, b) : 8,
    e,
    f = [];
  e = new THREE.Vector3();
  var g = new THREE.UV(0.5, 0.5);
  this.vertices.push(e);
  f.push(g);
  for (e = 0; e <= b; e++) {
    var h = new THREE.Vector3();
    h.x = a * Math.cos(c + (e / b) * d);
    h.y = a * Math.sin(c + (e / b) * d);
    this.vertices.push(h);
    f.push(new THREE.UV((h.x / a + 1) / 2, -(h.y / a + 1) / 2 + 1));
  }
  c = new THREE.Vector3(0, 0, -1);
  for (e = 1; e <= b; e++)
    this.faces.push(new THREE.Face3(e, e + 1, 0, [c, c, c])),
      this.faceVertexUvs[0].push([f[e], f[e + 1], g]);
  this.computeCentroids();
  this.computeFaceNormals();
  this.boundingSphere = {
    radius: a,
  };
};
THREE.CircleGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.CubeGeometry = function (a, b, c, d, e, f) {
  function g(a, b, c, d, e, f, g, s) {
    var t,
      r = h.widthSegments,
      z = h.heightSegments,
      w = e / 2,
      q = f / 2,
      E = h.vertices.length;
    if (("x" === a && "y" === b) || ("y" === a && "x" === b)) t = "z";
    else if (("x" === a && "z" === b) || ("z" === a && "x" === b))
      (t = "y"), (z = h.depthSegments);
    else if (("z" === a && "y" === b) || ("y" === a && "z" === b))
      (t = "x"), (r = h.depthSegments);
    var A = r + 1,
      v = z + 1,
      u = e / r,
      D = f / z,
      C = new THREE.Vector3();
    C[t] = 0 < g ? 1 : -1;
    for (e = 0; e < v; e++)
      for (f = 0; f < A; f++) {
        var G = new THREE.Vector3();
        G[a] = (f * u - w) * c;
        G[b] = (e * D - q) * d;
        G[t] = g;
        h.vertices.push(G);
      }
    for (e = 0; e < z; e++)
      for (f = 0; f < r; f++)
        (a = new THREE.Face4(
          f + A * e + E,
          f + A * (e + 1) + E,
          f + 1 + A * (e + 1) + E,
          f + 1 + A * e + E
        )),
          a.normal.copy(C),
          a.vertexNormals.push(C.clone(), C.clone(), C.clone(), C.clone()),
          (a.materialIndex = s),
          h.faces.push(a),
          h.faceVertexUvs[0].push([
            new THREE.UV(f / r, 1 - e / z),
            new THREE.UV(f / r, 1 - (e + 1) / z),
            new THREE.UV((f + 1) / r, 1 - (e + 1) / z),
            new THREE.UV((f + 1) / r, 1 - e / z),
          ]);
  }
  THREE.Geometry.call(this);
  var h = this;
  this.width = a;
  this.height = b;
  this.depth = c;
  this.widthSegments = d || 1;
  this.heightSegments = e || 1;
  this.depthSegments = f || 1;
  a = this.width / 2;
  b = this.height / 2;
  c = this.depth / 2;
  g("z", "y", -1, -1, this.depth, this.height, a, 0);
  g("z", "y", 1, -1, this.depth, this.height, -a, 1);
  g("x", "z", 1, 1, this.width, this.depth, b, 2);
  g("x", "z", 1, -1, this.width, this.depth, -b, 3);
  g("x", "y", 1, -1, this.width, this.height, c, 4);
  g("x", "y", -1, -1, this.width, this.height, -c, 5);
  this.computeCentroids();
  this.mergeVertices();
};
THREE.CubeGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.CylinderGeometry = function (a, b, c, d, e, f) {
  THREE.Geometry.call(this);
  var a = void 0 !== a ? a : 20,
    b = void 0 !== b ? b : 20,
    c = void 0 !== c ? c : 100,
    g = c / 2,
    d = d || 8,
    e = e || 1,
    h,
    i,
    j = [],
    l = [];
  for (i = 0; i <= e; i++) {
    var m = [],
      n = [],
      p = i / e,
      o = p * (b - a) + a;
    for (h = 0; h <= d; h++) {
      var s = h / d,
        t = new THREE.Vector3();
      t.x = o * Math.sin(2 * s * Math.PI);
      t.y = -p * c + g;
      t.z = o * Math.cos(2 * s * Math.PI);
      this.vertices.push(t);
      m.push(this.vertices.length - 1);
      n.push(new THREE.UV(s, 1 - p));
    }
    j.push(m);
    l.push(n);
  }
  c = (b - a) / c;
  for (h = 0; h < d; h++) {
    0 !== a
      ? ((m = this.vertices[j[0][h]].clone()),
        (n = this.vertices[j[0][h + 1]].clone()))
      : ((m = this.vertices[j[1][h]].clone()),
        (n = this.vertices[j[1][h + 1]].clone()));
    m.setY(Math.sqrt(m.x * m.x + m.z * m.z) * c).normalize();
    n.setY(Math.sqrt(n.x * n.x + n.z * n.z) * c).normalize();
    for (i = 0; i < e; i++) {
      var p = j[i][h],
        o = j[i + 1][h],
        s = j[i + 1][h + 1],
        t = j[i][h + 1],
        r = m.clone(),
        z = m.clone(),
        w = n.clone(),
        q = n.clone(),
        E = l[i][h].clone(),
        A = l[i + 1][h].clone(),
        v = l[i + 1][h + 1].clone(),
        u = l[i][h + 1].clone();
      this.faces.push(new THREE.Face4(p, o, s, t, [r, z, w, q]));
      this.faceVertexUvs[0].push([E, A, v, u]);
    }
  }
  if (!f && 0 < a) {
    this.vertices.push(new THREE.Vector3(0, g, 0));
    for (h = 0; h < d; h++)
      (p = j[0][h]),
        (o = j[0][h + 1]),
        (s = this.vertices.length - 1),
        (r = new THREE.Vector3(0, 1, 0)),
        (z = new THREE.Vector3(0, 1, 0)),
        (w = new THREE.Vector3(0, 1, 0)),
        (E = l[0][h].clone()),
        (A = l[0][h + 1].clone()),
        (v = new THREE.UV(A.u, 0)),
        this.faces.push(new THREE.Face3(p, o, s, [r, z, w])),
        this.faceVertexUvs[0].push([E, A, v]);
  }
  if (!f && 0 < b) {
    this.vertices.push(new THREE.Vector3(0, -g, 0));
    for (h = 0; h < d; h++)
      (p = j[i][h + 1]),
        (o = j[i][h]),
        (s = this.vertices.length - 1),
        (r = new THREE.Vector3(0, -1, 0)),
        (z = new THREE.Vector3(0, -1, 0)),
        (w = new THREE.Vector3(0, -1, 0)),
        (E = l[i][h + 1].clone()),
        (A = l[i][h].clone()),
        (v = new THREE.UV(A.u, 1)),
        this.faces.push(new THREE.Face3(p, o, s, [r, z, w])),
        this.faceVertexUvs[0].push([E, A, v]);
  }
  this.computeCentroids();
  this.computeFaceNormals();
};
THREE.CylinderGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.ExtrudeGeometry = function (a, b) {
  "undefined" !== typeof a &&
    (THREE.Geometry.call(this),
    (a = a instanceof Array ? a : [a]),
    (this.shapebb = a[a.length - 1].getBoundingBox()),
    this.addShapeList(a, b),
    this.computeCentroids(),
    this.computeFaceNormals());
};
THREE.ExtrudeGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.ExtrudeGeometry.prototype.addShapeList = function (a, b) {
  for (var c = a.length, d = 0; d < c; d++) this.addShape(a[d], b);
};
THREE.ExtrudeGeometry.prototype.addShape = function (a, b) {
  function c(a, b, c) {
    b || console.log("die");
    return b.clone().multiplyScalar(c).addSelf(a);
  }
  function d(a, b, c) {
    var d = THREE.ExtrudeGeometry.__v1,
      e = THREE.ExtrudeGeometry.__v2,
      f = THREE.ExtrudeGeometry.__v3,
      g = THREE.ExtrudeGeometry.__v4,
      h = THREE.ExtrudeGeometry.__v5,
      i = THREE.ExtrudeGeometry.__v6;
    d.set(a.x - b.x, a.y - b.y);
    e.set(a.x - c.x, a.y - c.y);
    d = d.normalize();
    e = e.normalize();
    f.set(-d.y, d.x);
    g.set(e.y, -e.x);
    h.copy(a).addSelf(f);
    i.copy(a).addSelf(g);
    if (h.equals(i)) return g.clone();
    h.copy(b).addSelf(f);
    i.copy(c).addSelf(g);
    f = d.dot(g);
    g = i.subSelf(h).dot(g);
    0 === f &&
      (console.log("Either infinite or no solutions!"),
      0 === g
        ? console.log("Its finite solutions.")
        : console.log("Too bad, no solutions."));
    g /= f;
    return 0 > g
      ? ((b = Math.atan2(b.y - a.y, b.x - a.x)),
        (a = Math.atan2(c.y - a.y, c.x - a.x)),
        b > a && (a += 2 * Math.PI),
        (c = (b + a) / 2),
        (a = -Math.cos(c)),
        (c = -Math.sin(c)),
        new THREE.Vector2(a, c))
      : d.multiplyScalar(g).addSelf(h).subSelf(a).clone();
  }
  function e(c, d) {
    var e, f;
    for (J = c.length; 0 <= --J; ) {
      e = J;
      f = J - 1;
      0 > f && (f = c.length - 1);
      for (var g = 0, h = n + 2 * l, g = 0; g < h; g++) {
        var i = R * g,
          j = R * (g + 1),
          m = d + e + i,
          i = d + f + i,
          o = d + f + j,
          j = d + e + j,
          p = c,
          s = g,
          q = h,
          t = e,
          u = f,
          m = m + G,
          i = i + G,
          o = o + G,
          j = j + G;
        C.faces.push(new THREE.Face4(m, i, o, j, null, null, r));
        m = z.generateSideWallUV(C, a, p, b, m, i, o, j, s, q, t, u);
        C.faceVertexUvs[0].push(m);
      }
    }
  }
  function f(a, b, c) {
    C.vertices.push(new THREE.Vector3(a, b, c));
  }
  function g(c, d, e, f) {
    c += G;
    d += G;
    e += G;
    C.faces.push(new THREE.Face3(c, d, e, null, null, t));
    c = f
      ? z.generateBottomUV(C, a, b, c, d, e)
      : z.generateTopUV(C, a, b, c, d, e);
    C.faceVertexUvs[0].push(c);
  }
  var h = void 0 !== b.amount ? b.amount : 100,
    i = void 0 !== b.bevelThickness ? b.bevelThickness : 6,
    j = void 0 !== b.bevelSize ? b.bevelSize : i - 2,
    l = void 0 !== b.bevelSegments ? b.bevelSegments : 3,
    m = void 0 !== b.bevelEnabled ? b.bevelEnabled : !0,
    n = void 0 !== b.steps ? b.steps : 1,
    p = b.extrudePath,
    o,
    s = !1,
    t = b.material,
    r = b.extrudeMaterial,
    z =
      void 0 !== b.UVGenerator
        ? b.UVGenerator
        : THREE.ExtrudeGeometry.WorldUVGenerator,
    w,
    q,
    E,
    A;
  p &&
    ((o = p.getSpacedPoints(n)),
    (s = !0),
    (m = !1),
    (w =
      void 0 !== b.frames
        ? b.frames
        : new THREE.TubeGeometry.FrenetFrames(p, n, !1)),
    (q = new THREE.Vector3()),
    (E = new THREE.Vector3()),
    (A = new THREE.Vector3()));
  m || (j = i = l = 0);
  var v,
    u,
    D,
    C = this,
    G = this.vertices.length,
    p = a.extractPoints(),
    P = p.shape,
    p = p.holes,
    B = !THREE.Shape.Utils.isClockWise(P);
  if (B) {
    P = P.reverse();
    u = 0;
    for (D = p.length; u < D; u++)
      (v = p[u]), THREE.Shape.Utils.isClockWise(v) && (p[u] = v.reverse());
    B = !1;
  }
  var K = THREE.Shape.Utils.triangulateShape(P, p),
    B = P;
  u = 0;
  for (D = p.length; u < D; u++) (v = p[u]), (P = P.concat(v));
  var H,
    I,
    N,
    O,
    R = P.length,
    ga = K.length,
    M = [],
    J = 0,
    Q = B.length;
  H = Q - 1;
  for (I = J + 1; J < Q; J++, H++, I++)
    H === Q && (H = 0), I === Q && (I = 0), (M[J] = d(B[J], B[H], B[I]));
  var Z = [],
    L,
    oa = M.concat();
  u = 0;
  for (D = p.length; u < D; u++) {
    v = p[u];
    L = [];
    J = 0;
    Q = v.length;
    H = Q - 1;
    for (I = J + 1; J < Q; J++, H++, I++)
      H === Q && (H = 0), I === Q && (I = 0), (L[J] = d(v[J], v[H], v[I]));
    Z.push(L);
    oa = oa.concat(L);
  }
  for (H = 0; H < l; H++) {
    v = H / l;
    N = i * (1 - v);
    I = j * Math.sin((v * Math.PI) / 2);
    J = 0;
    for (Q = B.length; J < Q; J++) (O = c(B[J], M[J], I)), f(O.x, O.y, -N);
    u = 0;
    for (D = p.length; u < D; u++) {
      v = p[u];
      L = Z[u];
      J = 0;
      for (Q = v.length; J < Q; J++) (O = c(v[J], L[J], I)), f(O.x, O.y, -N);
    }
  }
  I = j;
  for (J = 0; J < R; J++)
    (O = m ? c(P[J], oa[J], I) : P[J]),
      s
        ? (E.copy(w.normals[0]).multiplyScalar(O.x),
          q.copy(w.binormals[0]).multiplyScalar(O.y),
          A.copy(o[0]).addSelf(E).addSelf(q),
          f(A.x, A.y, A.z))
        : f(O.x, O.y, 0);
  for (v = 1; v <= n; v++)
    for (J = 0; J < R; J++)
      (O = m ? c(P[J], oa[J], I) : P[J]),
        s
          ? (E.copy(w.normals[v]).multiplyScalar(O.x),
            q.copy(w.binormals[v]).multiplyScalar(O.y),
            A.copy(o[v]).addSelf(E).addSelf(q),
            f(A.x, A.y, A.z))
          : f(O.x, O.y, (h / n) * v);
  for (H = l - 1; 0 <= H; H--) {
    v = H / l;
    N = i * (1 - v);
    I = j * Math.sin((v * Math.PI) / 2);
    J = 0;
    for (Q = B.length; J < Q; J++) (O = c(B[J], M[J], I)), f(O.x, O.y, h + N);
    u = 0;
    for (D = p.length; u < D; u++) {
      v = p[u];
      L = Z[u];
      J = 0;
      for (Q = v.length; J < Q; J++)
        (O = c(v[J], L[J], I)),
          s ? f(O.x, O.y + o[n - 1].y, o[n - 1].x + N) : f(O.x, O.y, h + N);
    }
  }
  if (m) {
    i = 0 * R;
    for (J = 0; J < ga; J++) (h = K[J]), g(h[2] + i, h[1] + i, h[0] + i, !0);
    i = R * (n + 2 * l);
    for (J = 0; J < ga; J++) (h = K[J]), g(h[0] + i, h[1] + i, h[2] + i, !1);
  } else {
    for (J = 0; J < ga; J++) (h = K[J]), g(h[2], h[1], h[0], !0);
    for (J = 0; J < ga; J++)
      (h = K[J]), g(h[0] + R * n, h[1] + R * n, h[2] + R * n, !1);
  }
  h = 0;
  e(B, h);
  h += B.length;
  u = 0;
  for (D = p.length; u < D; u++) (v = p[u]), e(v, h), (h += v.length);
};
THREE.ExtrudeGeometry.WorldUVGenerator = {
  generateTopUV: function (a, b, c, d, e, f) {
    b = a.vertices[e].x;
    e = a.vertices[e].y;
    c = a.vertices[f].x;
    f = a.vertices[f].y;
    return [
      new THREE.UV(a.vertices[d].x, a.vertices[d].y),
      new THREE.UV(b, e),
      new THREE.UV(c, f),
    ];
  },
  generateBottomUV: function (a, b, c, d, e, f) {
    return this.generateTopUV(a, b, c, d, e, f);
  },
  generateSideWallUV: function (a, b, c, d, e, f, g, h) {
    var b = a.vertices[e].x,
      c = a.vertices[e].y,
      e = a.vertices[e].z,
      d = a.vertices[f].x,
      i = a.vertices[f].y,
      f = a.vertices[f].z,
      j = a.vertices[g].x,
      l = a.vertices[g].y,
      g = a.vertices[g].z,
      m = a.vertices[h].x,
      n = a.vertices[h].y,
      a = a.vertices[h].z;
    return 0.01 > Math.abs(c - i)
      ? [
          new THREE.UV(b, 1 - e),
          new THREE.UV(d, 1 - f),
          new THREE.UV(j, 1 - g),
          new THREE.UV(m, 1 - a),
        ]
      : [
          new THREE.UV(c, 1 - e),
          new THREE.UV(i, 1 - f),
          new THREE.UV(l, 1 - g),
          new THREE.UV(n, 1 - a),
        ];
  },
};
THREE.ExtrudeGeometry.__v1 = new THREE.Vector2();
THREE.ExtrudeGeometry.__v2 = new THREE.Vector2();
THREE.ExtrudeGeometry.__v3 = new THREE.Vector2();
THREE.ExtrudeGeometry.__v4 = new THREE.Vector2();
THREE.ExtrudeGeometry.__v5 = new THREE.Vector2();
THREE.ExtrudeGeometry.__v6 = new THREE.Vector2();
THREE.ShapeGeometry = function (a, b) {
  THREE.Geometry.call(this);
  !1 === a instanceof Array && (a = [a]);
  this.shapebb = a[a.length - 1].getBoundingBox();
  this.addShapeList(a, b);
  this.computeCentroids();
  this.computeFaceNormals();
};
THREE.ShapeGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.ShapeGeometry.prototype.addShapeList = function (a, b) {
  for (var c = 0, d = a.length; c < d; c++) this.addShape(a[c], b);
  return this;
};
THREE.ShapeGeometry.prototype.addShape = function (a, b) {
  void 0 === b && (b = {});
  var c = b.material,
    d =
      void 0 === b.UVGenerator
        ? THREE.ExtrudeGeometry.WorldUVGenerator
        : b.UVGenerator,
    e,
    f,
    g,
    h = this.vertices.length;
  e = a.extractPoints();
  var i = e.shape,
    j = e.holes;
  if (!THREE.Shape.Utils.isClockWise(i)) {
    i = i.reverse();
    e = 0;
    for (f = j.length; e < f; e++)
      (g = j[e]), THREE.Shape.Utils.isClockWise(g) && (j[e] = g.reverse());
  }
  var l = THREE.Shape.Utils.triangulateShape(i, j);
  e = 0;
  for (f = j.length; e < f; e++) (g = j[e]), (i = i.concat(g));
  j = i.length;
  f = l.length;
  for (e = 0; e < j; e++)
    (g = i[e]), this.vertices.push(new THREE.Vector3(g.x, g.y, 0));
  for (e = 0; e < f; e++)
    (j = l[e]),
      (i = j[0] + h),
      (g = j[1] + h),
      (j = j[2] + h),
      this.faces.push(new THREE.Face3(i, g, j, null, null, c)),
      this.faceVertexUvs[0].push(d.generateBottomUV(this, a, b, i, g, j));
};
THREE.LatheGeometry = function (a, b, c) {
  THREE.Geometry.call(this);
  for (
    var b = b || 12,
      c = c || 2 * Math.PI,
      d = [],
      e = new THREE.Matrix4().makeRotationZ(c / b),
      f = 0;
    f < a.length;
    f++
  )
    (d[f] = a[f].clone()), this.vertices.push(d[f]);
  for (var g = b + 1, c = 0; c < g; c++)
    for (f = 0; f < d.length; f++)
      (d[f] = e.multiplyVector3(d[f].clone())), this.vertices.push(d[f]);
  for (c = 0; c < b; c++) {
    d = 0;
    for (e = a.length; d < e - 1; d++)
      this.faces.push(
        new THREE.Face4(
          c * e + d,
          ((c + 1) % g) * e + d,
          ((c + 1) % g) * e + ((d + 1) % e),
          c * e + ((d + 1) % e)
        )
      ),
        this.faceVertexUvs[0].push([
          new THREE.UV(1 - c / b, d / e),
          new THREE.UV(1 - (c + 1) / b, d / e),
          new THREE.UV(1 - (c + 1) / b, (d + 1) / e),
          new THREE.UV(1 - c / b, (d + 1) / e),
        ]);
  }
  this.computeCentroids();
  this.computeFaceNormals();
  this.computeVertexNormals();
};
THREE.LatheGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.PlaneGeometry = function (a, b, c, d) {
  THREE.Geometry.call(this);
  this.width = a;
  this.height = b;
  this.widthSegments = c || 1;
  this.heightSegments = d || 1;
  for (
    var c = a / 2,
      e = b / 2,
      d = this.widthSegments,
      f = this.heightSegments,
      g = d + 1,
      h = f + 1,
      i = this.width / d,
      j = this.height / f,
      l = new THREE.Vector3(0, 0, 1),
      a = 0;
    a < h;
    a++
  )
    for (b = 0; b < g; b++)
      this.vertices.push(new THREE.Vector3(b * i - c, -(a * j - e), 0));
  for (a = 0; a < f; a++)
    for (b = 0; b < d; b++)
      (c = new THREE.Face4(
        b + g * a,
        b + g * (a + 1),
        b + 1 + g * (a + 1),
        b + 1 + g * a
      )),
        c.normal.copy(l),
        c.vertexNormals.push(l.clone(), l.clone(), l.clone(), l.clone()),
        this.faces.push(c),
        this.faceVertexUvs[0].push([
          new THREE.UV(b / d, 1 - a / f),
          new THREE.UV(b / d, 1 - (a + 1) / f),
          new THREE.UV((b + 1) / d, 1 - (a + 1) / f),
          new THREE.UV((b + 1) / d, 1 - a / f),
        ]);
  this.computeCentroids();
};
THREE.PlaneGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.SphereGeometry = function (a, b, c, d, e, f, g) {
  THREE.Geometry.call(this);
  this.radius = a || 50;
  this.widthSegments = Math.max(3, Math.floor(b) || 8);
  this.heightSegments = Math.max(2, Math.floor(c) || 6);
  for (
    var d = void 0 !== d ? d : 0,
      e = void 0 !== e ? e : 2 * Math.PI,
      f = void 0 !== f ? f : 0,
      g = void 0 !== g ? g : Math.PI,
      c = [],
      h = [],
      b = 0;
    b <= this.heightSegments;
    b++
  ) {
    for (var i = [], j = [], a = 0; a <= this.widthSegments; a++) {
      var l = a / this.widthSegments,
        m = b / this.heightSegments,
        n = new THREE.Vector3();
      n.x = -this.radius * Math.cos(d + l * e) * Math.sin(f + m * g);
      n.y = this.radius * Math.cos(f + m * g);
      n.z = this.radius * Math.sin(d + l * e) * Math.sin(f + m * g);
      this.vertices.push(n);
      i.push(this.vertices.length - 1);
      j.push(new THREE.UV(l, 1 - m));
    }
    c.push(i);
    h.push(j);
  }
  for (b = 0; b < this.heightSegments; b++)
    for (a = 0; a < this.widthSegments; a++) {
      var d = c[b][a + 1],
        e = c[b][a],
        f = c[b + 1][a],
        g = c[b + 1][a + 1],
        i = this.vertices[d].clone().normalize(),
        j = this.vertices[e].clone().normalize(),
        l = this.vertices[f].clone().normalize(),
        m = this.vertices[g].clone().normalize(),
        n = h[b][a + 1].clone(),
        p = h[b][a].clone(),
        o = h[b + 1][a].clone(),
        s = h[b + 1][a + 1].clone();
      Math.abs(this.vertices[d].y) === this.radius
        ? (this.faces.push(new THREE.Face3(d, f, g, [i, l, m])),
          this.faceVertexUvs[0].push([n, o, s]))
        : Math.abs(this.vertices[f].y) === this.radius
        ? (this.faces.push(new THREE.Face3(d, e, f, [i, j, l])),
          this.faceVertexUvs[0].push([n, p, o]))
        : (this.faces.push(new THREE.Face4(d, e, f, g, [i, j, l, m])),
          this.faceVertexUvs[0].push([n, p, o, s]));
    }
  this.computeCentroids();
  this.computeFaceNormals();
  this.boundingSphere = {
    radius: this.radius,
  };
};
THREE.SphereGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.TextGeometry = function (a, b) {
  var c = THREE.FontUtils.generateShapes(a, b);
  b.amount = void 0 !== b.height ? b.height : 50;
  void 0 === b.bevelThickness && (b.bevelThickness = 10);
  void 0 === b.bevelSize && (b.bevelSize = 8);
  void 0 === b.bevelEnabled && (b.bevelEnabled = !1);
  THREE.ExtrudeGeometry.call(this, c, b);
};
THREE.TextGeometry.prototype = Object.create(THREE.ExtrudeGeometry.prototype);
THREE.TorusGeometry = function (a, b, c, d, e) {
  THREE.Geometry.call(this);
  this.radius = a || 100;
  this.tube = b || 40;
  this.radialSegments = c || 8;
  this.tubularSegments = d || 6;
  this.arc = e || 2 * Math.PI;
  e = new THREE.Vector3();
  a = [];
  b = [];
  for (c = 0; c <= this.radialSegments; c++)
    for (d = 0; d <= this.tubularSegments; d++) {
      var f = (d / this.tubularSegments) * this.arc,
        g = ((2 * c) / this.radialSegments) * Math.PI;
      e.x = this.radius * Math.cos(f);
      e.y = this.radius * Math.sin(f);
      var h = new THREE.Vector3();
      h.x = (this.radius + this.tube * Math.cos(g)) * Math.cos(f);
      h.y = (this.radius + this.tube * Math.cos(g)) * Math.sin(f);
      h.z = this.tube * Math.sin(g);
      this.vertices.push(h);
      a.push(new THREE.UV(d / this.tubularSegments, c / this.radialSegments));
      b.push(h.clone().subSelf(e).normalize());
    }
  for (c = 1; c <= this.radialSegments; c++)
    for (d = 1; d <= this.tubularSegments; d++) {
      var e = (this.tubularSegments + 1) * c + d - 1,
        f = (this.tubularSegments + 1) * (c - 1) + d - 1,
        g = (this.tubularSegments + 1) * (c - 1) + d,
        h = (this.tubularSegments + 1) * c + d,
        i = new THREE.Face4(e, f, g, h, [b[e], b[f], b[g], b[h]]);
      i.normal.addSelf(b[e]);
      i.normal.addSelf(b[f]);
      i.normal.addSelf(b[g]);
      i.normal.addSelf(b[h]);
      i.normal.normalize();
      this.faces.push(i);
      this.faceVertexUvs[0].push([
        a[e].clone(),
        a[f].clone(),
        a[g].clone(),
        a[h].clone(),
      ]);
    }
  this.computeCentroids();
};
THREE.TorusGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.TorusKnotGeometry = function (a, b, c, d, e, f, g) {
  function h(a, b, c, d, e, f) {
    var g = Math.cos(a);
    Math.cos(b);
    b = Math.sin(a);
    a *= c / d;
    c = Math.cos(a);
    g *= 0.5 * e * (2 + c);
    b = 0.5 * e * (2 + c) * b;
    e = 0.5 * f * e * Math.sin(a);
    return new THREE.Vector3(g, b, e);
  }
  THREE.Geometry.call(this);
  this.radius = a || 200;
  this.tube = b || 40;
  this.radialSegments = c || 64;
  this.tubularSegments = d || 8;
  this.p = e || 2;
  this.q = f || 3;
  this.heightScale = g || 1;
  this.grid = Array(this.radialSegments);
  c = new THREE.Vector3();
  d = new THREE.Vector3();
  e = new THREE.Vector3();
  for (a = 0; a < this.radialSegments; ++a) {
    this.grid[a] = Array(this.tubularSegments);
    for (b = 0; b < this.tubularSegments; ++b) {
      var i = 2 * (a / this.radialSegments) * this.p * Math.PI,
        g = 2 * (b / this.tubularSegments) * Math.PI,
        f = h(i, g, this.q, this.p, this.radius, this.heightScale),
        i = h(i + 0.01, g, this.q, this.p, this.radius, this.heightScale);
      c.sub(i, f);
      d.add(i, f);
      e.cross(c, d);
      d.cross(e, c);
      e.normalize();
      d.normalize();
      i = -this.tube * Math.cos(g);
      g = this.tube * Math.sin(g);
      f.x += i * d.x + g * e.x;
      f.y += i * d.y + g * e.y;
      f.z += i * d.z + g * e.z;
      this.grid[a][b] =
        this.vertices.push(new THREE.Vector3(f.x, f.y, f.z)) - 1;
    }
  }
  for (a = 0; a < this.radialSegments; ++a)
    for (b = 0; b < this.tubularSegments; ++b) {
      var e = (a + 1) % this.radialSegments,
        f = (b + 1) % this.tubularSegments,
        c = this.grid[a][b],
        d = this.grid[e][b],
        e = this.grid[e][f],
        f = this.grid[a][f],
        g = new THREE.UV(a / this.radialSegments, b / this.tubularSegments),
        i = new THREE.UV(
          (a + 1) / this.radialSegments,
          b / this.tubularSegments
        ),
        j = new THREE.UV(
          (a + 1) / this.radialSegments,
          (b + 1) / this.tubularSegments
        ),
        l = new THREE.UV(
          a / this.radialSegments,
          (b + 1) / this.tubularSegments
        );
      this.faces.push(new THREE.Face4(c, d, e, f));
      this.faceVertexUvs[0].push([g, i, j, l]);
    }
  this.computeCentroids();
  this.computeFaceNormals();
  this.computeVertexNormals();
};
THREE.TorusKnotGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.TubeGeometry = function (a, b, c, d, e, f) {
  THREE.Geometry.call(this);
  this.path = a;
  this.segments = b || 64;
  this.radius = c || 1;
  this.radiusSegments = d || 8;
  this.closed = e || !1;
  f && (this.debug = new THREE.Object3D());
  this.grid = [];
  var g,
    h,
    f = this.segments + 1,
    i,
    j,
    l,
    m = new THREE.Vector3(),
    n,
    p,
    o,
    b = new THREE.TubeGeometry.FrenetFrames(a, b, e);
  n = b.tangents;
  p = b.normals;
  o = b.binormals;
  this.tangents = n;
  this.normals = p;
  this.binormals = o;
  for (b = 0; b < f; b++) {
    this.grid[b] = [];
    d = b / (f - 1);
    l = a.getPointAt(d);
    d = n[b];
    g = p[b];
    h = o[b];
    this.debug &&
      (this.debug.add(new THREE.ArrowHelper(d, l, c, 255)),
      this.debug.add(new THREE.ArrowHelper(g, l, c, 16711680)),
      this.debug.add(new THREE.ArrowHelper(h, l, c, 65280)));
    for (d = 0; d < this.radiusSegments; d++)
      (i = 2 * (d / this.radiusSegments) * Math.PI),
        (j = -this.radius * Math.cos(i)),
        (i = this.radius * Math.sin(i)),
        m.copy(l),
        (m.x += j * g.x + i * h.x),
        (m.y += j * g.y + i * h.y),
        (m.z += j * g.z + i * h.z),
        (this.grid[b][d] =
          this.vertices.push(new THREE.Vector3(m.x, m.y, m.z)) - 1);
  }
  for (b = 0; b < this.segments; b++)
    for (d = 0; d < this.radiusSegments; d++)
      (f = e ? (b + 1) % this.segments : b + 1),
        (m = (d + 1) % this.radiusSegments),
        (a = this.grid[b][d]),
        (c = this.grid[f][d]),
        (f = this.grid[f][m]),
        (m = this.grid[b][m]),
        (n = new THREE.UV(b / this.segments, d / this.radiusSegments)),
        (p = new THREE.UV((b + 1) / this.segments, d / this.radiusSegments)),
        (o = new THREE.UV(
          (b + 1) / this.segments,
          (d + 1) / this.radiusSegments
        )),
        (g = new THREE.UV(b / this.segments, (d + 1) / this.radiusSegments)),
        this.faces.push(new THREE.Face4(a, c, f, m)),
        this.faceVertexUvs[0].push([n, p, o, g]);
  this.computeCentroids();
  this.computeFaceNormals();
  this.computeVertexNormals();
};
THREE.TubeGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.TubeGeometry.FrenetFrames = function (a, b, c) {
  new THREE.Vector3();
  var d = new THREE.Vector3();
  new THREE.Vector3();
  var e = [],
    f = [],
    g = [],
    h = new THREE.Vector3(),
    i = new THREE.Matrix4(),
    b = b + 1,
    j,
    l,
    m;
  this.tangents = e;
  this.normals = f;
  this.binormals = g;
  for (j = 0; j < b; j++)
    (l = j / (b - 1)), (e[j] = a.getTangentAt(l)), e[j].normalize();
  f[0] = new THREE.Vector3();
  g[0] = new THREE.Vector3();
  a = Number.MAX_VALUE;
  j = Math.abs(e[0].x);
  l = Math.abs(e[0].y);
  m = Math.abs(e[0].z);
  j <= a && ((a = j), d.set(1, 0, 0));
  l <= a && ((a = l), d.set(0, 1, 0));
  m <= a && d.set(0, 0, 1);
  h.cross(e[0], d).normalize();
  f[0].cross(e[0], h);
  g[0].cross(e[0], f[0]);
  for (j = 1; j < b; j++)
    (f[j] = f[j - 1].clone()),
      (g[j] = g[j - 1].clone()),
      h.cross(e[j - 1], e[j]),
      1e-4 < h.length() &&
        (h.normalize(),
        (d = Math.acos(e[j - 1].dot(e[j]))),
        i.makeRotationAxis(h, d).multiplyVector3(f[j])),
      g[j].cross(e[j], f[j]);
  if (c) {
    d = Math.acos(f[0].dot(f[b - 1]));
    d /= b - 1;
    0 < e[0].dot(h.cross(f[0], f[b - 1])) && (d = -d);
    for (j = 1; j < b; j++)
      i.makeRotationAxis(e[j], d * j).multiplyVector3(f[j]),
        g[j].cross(e[j], f[j]);
  }
};
THREE.PolyhedronGeometry = function (a, b, c, d) {
  function e(a) {
    var b = a.normalize().clone();
    b.index = i.vertices.push(b) - 1;
    var c = Math.atan2(a.z, -a.x) / 2 / Math.PI + 0.5,
      a = Math.atan2(-a.y, Math.sqrt(a.x * a.x + a.z * a.z)) / Math.PI + 0.5;
    b.uv = new THREE.UV(c, 1 - a);
    return b;
  }
  function f(a, b, c, d) {
    1 > d
      ? ((d = new THREE.Face3(a.index, b.index, c.index, [
          a.clone(),
          b.clone(),
          c.clone(),
        ])),
        d.centroid.addSelf(a).addSelf(b).addSelf(c).divideScalar(3),
        (d.normal = d.centroid.clone().normalize()),
        i.faces.push(d),
        (d = Math.atan2(d.centroid.z, -d.centroid.x)),
        i.faceVertexUvs[0].push([h(a.uv, a, d), h(b.uv, b, d), h(c.uv, c, d)]))
      : ((d -= 1),
        f(a, g(a, b), g(a, c), d),
        f(g(a, b), b, g(b, c), d),
        f(g(a, c), g(b, c), c, d),
        f(g(a, b), g(b, c), g(a, c), d));
  }
  function g(a, b) {
    m[a.index] || (m[a.index] = []);
    m[b.index] || (m[b.index] = []);
    var c = m[a.index][b.index];
    void 0 === c &&
      (m[a.index][b.index] =
        m[b.index][a.index] =
        c =
          e(new THREE.Vector3().add(a, b).divideScalar(2)));
    return c;
  }
  function h(a, b, c) {
    0 > c && 1 === a.u && (a = new THREE.UV(a.u - 1, a.v));
    0 === b.x && 0 === b.z && (a = new THREE.UV(c / 2 / Math.PI + 0.5, a.v));
    return a;
  }
  THREE.Geometry.call(this);
  for (var c = c || 1, d = d || 0, i = this, j = 0, l = a.length; j < l; j++)
    e(new THREE.Vector3(a[j][0], a[j][1], a[j][2]));
  for (var m = [], a = this.vertices, j = 0, l = b.length; j < l; j++)
    f(a[b[j][0]], a[b[j][1]], a[b[j][2]], d);
  this.mergeVertices();
  j = 0;
  for (l = this.vertices.length; j < l; j++) this.vertices[j].multiplyScalar(c);
  this.computeCentroids();
  this.boundingSphere = {
    radius: c,
  };
};
THREE.PolyhedronGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.IcosahedronGeometry = function (a, b) {
  var c = (1 + Math.sqrt(5)) / 2;
  THREE.PolyhedronGeometry.call(
    this,
    [
      [-1, c, 0],
      [1, c, 0],
      [-1, -c, 0],
      [1, -c, 0],
      [0, -1, c],
      [0, 1, c],
      [0, -1, -c],
      [0, 1, -c],
      [c, 0, -1],
      [c, 0, 1],
      [-c, 0, -1],
      [-c, 0, 1],
    ],
    [
      [0, 11, 5],
      [0, 5, 1],
      [0, 1, 7],
      [0, 7, 10],
      [0, 10, 11],
      [1, 5, 9],
      [5, 11, 4],
      [11, 10, 2],
      [10, 7, 6],
      [7, 1, 8],
      [3, 9, 4],
      [3, 4, 2],
      [3, 2, 6],
      [3, 6, 8],
      [3, 8, 9],
      [4, 9, 5],
      [2, 4, 11],
      [6, 2, 10],
      [8, 6, 7],
      [9, 8, 1],
    ],
    a,
    b
  );
};
THREE.IcosahedronGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.OctahedronGeometry = function (a, b) {
  THREE.PolyhedronGeometry.call(
    this,
    [
      [1, 0, 0],
      [-1, 0, 0],
      [0, 1, 0],
      [0, -1, 0],
      [0, 0, 1],
      [0, 0, -1],
    ],
    [
      [0, 2, 4],
      [0, 4, 3],
      [0, 3, 5],
      [0, 5, 2],
      [1, 2, 5],
      [1, 5, 3],
      [1, 3, 4],
      [1, 4, 2],
    ],
    a,
    b
  );
};
THREE.OctahedronGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.TetrahedronGeometry = function (a, b) {
  THREE.PolyhedronGeometry.call(
    this,
    [
      [1, 1, 1],
      [-1, -1, 1],
      [-1, 1, -1],
      [1, -1, -1],
    ],
    [
      [2, 1, 0],
      [0, 3, 2],
      [1, 3, 0],
      [2, 3, 1],
    ],
    a,
    b
  );
};
THREE.TetrahedronGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.ParametricGeometry = function (a, b, c, d) {
  THREE.Geometry.call(this);
  var e = this.vertices,
    f = this.faces,
    g = this.faceVertexUvs[0],
    d = void 0 === d ? !1 : d,
    h,
    i,
    j,
    l,
    m = b + 1;
  for (h = 0; h <= c; h++) {
    l = h / c;
    for (i = 0; i <= b; i++) (j = i / b), (j = a(j, l)), e.push(j);
  }
  var n, p, o, s;
  for (h = 0; h < c; h++)
    for (i = 0; i < b; i++)
      (a = h * m + i),
        (e = h * m + i + 1),
        (l = (h + 1) * m + i),
        (j = (h + 1) * m + i + 1),
        (n = new THREE.UV(i / b, h / c)),
        (p = new THREE.UV((i + 1) / b, h / c)),
        (o = new THREE.UV(i / b, (h + 1) / c)),
        (s = new THREE.UV((i + 1) / b, (h + 1) / c)),
        d
          ? (f.push(new THREE.Face3(a, e, l)),
            f.push(new THREE.Face3(e, j, l)),
            g.push([n, p, o]),
            g.push([p, s, o]))
          : (f.push(new THREE.Face4(a, e, j, l)), g.push([n, p, s, o]));
  this.computeCentroids();
  this.computeFaceNormals();
  this.computeVertexNormals();
};
THREE.ParametricGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.ConvexGeometry = function (a) {
  function b(a) {
    var b = a.length();
    return new THREE.UV(a.x / b, a.y / b);
  }
  THREE.Geometry.call(this);
  for (
    var c = [
        [0, 1, 2],
        [0, 2, 1],
      ],
      d = 3;
    d < a.length;
    d++
  ) {
    var e = d,
      f = a[e].clone(),
      g = f.length();
    f.x += g * 2e-6 * (Math.random() - 0.5);
    f.y += g * 2e-6 * (Math.random() - 0.5);
    f.z += g * 2e-6 * (Math.random() - 0.5);
    for (var g = [], h = 0; h < c.length; ) {
      var i = c[h],
        j = f,
        l = a[i[0]],
        m;
      m = l;
      var n = a[i[1]],
        p = a[i[2]],
        o = new THREE.Vector3(),
        s = new THREE.Vector3();
      o.sub(p, n);
      s.sub(m, n);
      o.crossSelf(s);
      o.normalize();
      m = o;
      l = m.dot(l);
      if (m.dot(j) >= l) {
        for (j = 0; 3 > j; j++) {
          l = [i[j], i[(j + 1) % 3]];
          m = !0;
          for (n = 0; n < g.length; n++)
            if (g[n][0] === l[1] && g[n][1] === l[0]) {
              g[n] = g[g.length - 1];
              g.pop();
              m = !1;
              break;
            }
          m && g.push(l);
        }
        c[h] = c[c.length - 1];
        c.pop();
      } else h++;
    }
    for (n = 0; n < g.length; n++) c.push([g[n][0], g[n][1], e]);
  }
  e = 0;
  f = Array(a.length);
  for (d = 0; d < c.length; d++) {
    g = c[d];
    for (h = 0; 3 > h; h++)
      void 0 === f[g[h]] && ((f[g[h]] = e++), this.vertices.push(a[g[h]])),
        (g[h] = f[g[h]]);
  }
  for (d = 0; d < c.length; d++)
    this.faces.push(new THREE.Face3(c[d][0], c[d][1], c[d][2]));
  for (d = 0; d < this.faces.length; d++)
    (g = this.faces[d]),
      this.faceVertexUvs[0].push([
        b(this.vertices[g.a]),
        b(this.vertices[g.b]),
        b(this.vertices[g.c]),
      ]);
  this.computeCentroids();
  this.computeFaceNormals();
  this.computeVertexNormals();
};
THREE.ConvexGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.AxisHelper = function (a) {
  var b = new THREE.Geometry();
  b.vertices.push(
    new THREE.Vector3(),
    new THREE.Vector3(a || 1, 0, 0),
    new THREE.Vector3(),
    new THREE.Vector3(0, a || 1, 0),
    new THREE.Vector3(),
    new THREE.Vector3(0, 0, a || 1)
  );
  b.colors.push(
    new THREE.Color(16711680),
    new THREE.Color(16755200),
    new THREE.Color(65280),
    new THREE.Color(11206400),
    new THREE.Color(255),
    new THREE.Color(43775)
  );
  a = new THREE.LineBasicMaterial({
    vertexColors: THREE.VertexColors,
  });
  THREE.Line.call(this, b, a, THREE.LinePieces);
};
THREE.AxisHelper.prototype = Object.create(THREE.Line.prototype);
THREE.ArrowHelper = function (a, b, c, d) {
  THREE.Object3D.call(this);
  void 0 === d && (d = 16776960);
  void 0 === c && (c = 20);
  var e = new THREE.Geometry();
  e.vertices.push(new THREE.Vector3(0, 0, 0));
  e.vertices.push(new THREE.Vector3(0, 1, 0));
  this.line = new THREE.Line(
    e,
    new THREE.LineBasicMaterial({
      color: d,
    })
  );
  this.add(this.line);
  e = new THREE.CylinderGeometry(0, 0.05, 0.25, 5, 1);
  this.cone = new THREE.Mesh(
    e,
    new THREE.MeshBasicMaterial({
      color: d,
    })
  );
  this.cone.position.set(0, 1, 0);
  this.add(this.cone);
  b instanceof THREE.Vector3 && (this.position = b);
  this.setDirection(a);
  this.setLength(c);
};
THREE.ArrowHelper.prototype = Object.create(THREE.Object3D.prototype);
THREE.ArrowHelper.prototype.setDirection = function (a) {
  var b = new THREE.Vector3(0, 1, 0).crossSelf(a),
    a = Math.acos(new THREE.Vector3(0, 1, 0).dot(a.clone().normalize()));
  this.matrix = new THREE.Matrix4().makeRotationAxis(b.normalize(), a);
  this.rotation.setEulerFromRotationMatrix(this.matrix, this.eulerOrder);
};
THREE.ArrowHelper.prototype.setLength = function (a) {
  this.scale.set(a, a, a);
};
THREE.ArrowHelper.prototype.setColor = function (a) {
  this.line.material.color.setHex(a);
  this.cone.material.color.setHex(a);
};
THREE.CameraHelper = function (a) {
  function b(a, b, d) {
    c(a, d);
    c(b, d);
  }
  function c(a, b) {
    d.geometry.vertices.push(new THREE.Vector3());
    d.geometry.colors.push(new THREE.Color(b));
    void 0 === d.pointMap[a] && (d.pointMap[a] = []);
    d.pointMap[a].push(d.geometry.vertices.length - 1);
  }
  THREE.Line.call(this);
  var d = this;
  this.geometry = new THREE.Geometry();
  this.material = new THREE.LineBasicMaterial({
    color: 16777215,
    vertexColors: THREE.FaceColors,
  });
  this.type = THREE.LinePieces;
  this.matrixWorld = a.matrixWorld;
  this.matrixAutoUpdate = !1;
  this.pointMap = {};
  b("n1", "n2", 16755200);
  b("n2", "n4", 16755200);
  b("n4", "n3", 16755200);
  b("n3", "n1", 16755200);
  b("f1", "f2", 16755200);
  b("f2", "f4", 16755200);
  b("f4", "f3", 16755200);
  b("f3", "f1", 16755200);
  b("n1", "f1", 16755200);
  b("n2", "f2", 16755200);
  b("n3", "f3", 16755200);
  b("n4", "f4", 16755200);
  b("p", "n1", 16711680);
  b("p", "n2", 16711680);
  b("p", "n3", 16711680);
  b("p", "n4", 16711680);
  b("u1", "u2", 43775);
  b("u2", "u3", 43775);
  b("u3", "u1", 43775);
  b("c", "t", 16777215);
  b("p", "c", 3355443);
  b("cn1", "cn2", 3355443);
  b("cn3", "cn4", 3355443);
  b("cf1", "cf2", 3355443);
  b("cf3", "cf4", 3355443);
  this.camera = a;
  this.update(a);
};
THREE.CameraHelper.prototype = Object.create(THREE.Line.prototype);
THREE.CameraHelper.prototype.update = function () {
  function a(a, d, e, f) {
    THREE.CameraHelper.__v.set(d, e, f);
    THREE.CameraHelper.__projector.unprojectVector(
      THREE.CameraHelper.__v,
      THREE.CameraHelper.__c
    );
    a = b.pointMap[a];
    if (void 0 !== a) {
      d = 0;
      for (e = a.length; d < e; d++)
        b.geometry.vertices[a[d]].copy(THREE.CameraHelper.__v);
    }
  }
  var b = this;
  THREE.CameraHelper.__c.projectionMatrix.copy(this.camera.projectionMatrix);
  a("c", 0, 0, -1);
  a("t", 0, 0, 1);
  a("n1", -1, -1, -1);
  a("n2", 1, -1, -1);
  a("n3", -1, 1, -1);
  a("n4", 1, 1, -1);
  a("f1", -1, -1, 1);
  a("f2", 1, -1, 1);
  a("f3", -1, 1, 1);
  a("f4", 1, 1, 1);
  a("u1", 0.7, 1.1, -1);
  a("u2", -0.7, 1.1, -1);
  a("u3", 0, 2, -1);
  a("cf1", -1, 0, 1);
  a("cf2", 1, 0, 1);
  a("cf3", 0, -1, 1);
  a("cf4", 0, 1, 1);
  a("cn1", -1, 0, -1);
  a("cn2", 1, 0, -1);
  a("cn3", 0, -1, -1);
  a("cn4", 0, 1, -1);
  this.geometry.verticesNeedUpdate = !0;
};
THREE.CameraHelper.__projector = new THREE.Projector();
THREE.CameraHelper.__v = new THREE.Vector3();
THREE.CameraHelper.__c = new THREE.Camera();
THREE.DirectionalLightHelper = function (a, b, c) {
  THREE.Object3D.call(this);
  this.light = a;
  this.position = a.position;
  this.direction = new THREE.Vector3();
  this.direction.sub(a.target.position, a.position);
  this.color = a.color.clone();
  var d = THREE.Math.clamp(a.intensity, 0, 1);
  this.color.r *= d;
  this.color.g *= d;
  this.color.b *= d;
  var d = this.color.getHex(),
    e = new THREE.SphereGeometry(b, 16, 8),
    f = new THREE.AsteriskGeometry(1.25 * b, 2.25 * b),
    g = new THREE.MeshBasicMaterial({
      color: d,
      fog: !1,
    }),
    h = new THREE.LineBasicMaterial({
      color: d,
      fog: !1,
    });
  this.lightArrow = new THREE.ArrowHelper(this.direction, null, c, d);
  this.lightSphere = new THREE.Mesh(e, g);
  this.lightArrow.cone.material.fog = !1;
  this.lightArrow.line.material.fog = !1;
  this.lightRays = new THREE.Line(f, h, THREE.LinePieces);
  this.add(this.lightArrow);
  this.add(this.lightSphere);
  this.add(this.lightRays);
  this.lightSphere.properties.isGizmo = !0;
  this.lightSphere.properties.gizmoSubject = a;
  this.lightSphere.properties.gizmoRoot = this;
  this.targetSphere = null;
  a.target.properties.targetInverse &&
    ((b = new THREE.SphereGeometry(b, 8, 4)),
    (c = new THREE.MeshBasicMaterial({
      color: d,
      wireframe: !0,
      fog: !1,
    })),
    (this.targetSphere = new THREE.Mesh(b, c)),
    (this.targetSphere.position = a.target.position),
    (this.targetSphere.properties.isGizmo = !0),
    (this.targetSphere.properties.gizmoSubject = a.target),
    (this.targetSphere.properties.gizmoRoot = this.targetSphere),
    (a = new THREE.LineDashedMaterial({
      color: d,
      dashSize: 4,
      gapSize: 4,
      opacity: 0.75,
      transparent: !0,
      fog: !1,
    })),
    (d = new THREE.Geometry()),
    d.vertices.push(this.position.clone()),
    d.vertices.push(this.targetSphere.position.clone()),
    d.computeLineDistances(),
    (this.targetLine = new THREE.Line(d, a)),
    (this.targetLine.properties.isGizmo = !0));
  this.properties.isGizmo = !0;
};
THREE.DirectionalLightHelper.prototype = Object.create(
  THREE.Object3D.prototype
);
THREE.DirectionalLightHelper.prototype.update = function () {
  this.direction.sub(this.light.target.position, this.light.position);
  this.lightArrow.setDirection(this.direction);
  this.color.copy(this.light.color);
  var a = THREE.Math.clamp(this.light.intensity, 0, 1);
  this.color.r *= a;
  this.color.g *= a;
  this.color.b *= a;
  this.lightArrow.setColor(this.color.getHex());
  this.lightSphere.material.color.copy(this.color);
  this.lightRays.material.color.copy(this.color);
  this.targetSphere.material.color.copy(this.color);
  this.targetLine.material.color.copy(this.color);
  this.targetLine.geometry.vertices[0].copy(this.light.position);
  this.targetLine.geometry.vertices[1].copy(this.light.target.position);
  this.targetLine.geometry.computeLineDistances();
  this.targetLine.geometry.verticesNeedUpdate = !0;
};
THREE.HemisphereLightHelper = function (a, b, c) {
  THREE.Object3D.call(this);
  this.light = a;
  this.position = a.position;
  var d = THREE.Math.clamp(a.intensity, 0, 1);
  this.color = a.color.clone();
  this.color.r *= d;
  this.color.g *= d;
  this.color.b *= d;
  var e = this.color.getHex();
  this.groundColor = a.groundColor.clone();
  this.groundColor.r *= d;
  this.groundColor.g *= d;
  this.groundColor.b *= d;
  for (
    var d = this.groundColor.getHex(),
      f = new THREE.SphereGeometry(b, 16, 8, 0, 2 * Math.PI, 0, 0.5 * Math.PI),
      g = new THREE.SphereGeometry(
        b,
        16,
        8,
        0,
        2 * Math.PI,
        0.5 * Math.PI,
        Math.PI
      ),
      h = new THREE.MeshBasicMaterial({
        color: e,
        fog: !1,
      }),
      i = new THREE.MeshBasicMaterial({
        color: d,
        fog: !1,
      }),
      j = 0,
      l = f.faces.length;
    j < l;
    j++
  )
    f.faces[j].materialIndex = 0;
  j = 0;
  for (l = g.faces.length; j < l; j++) g.faces[j].materialIndex = 1;
  THREE.GeometryUtils.merge(f, g);
  this.lightSphere = new THREE.Mesh(f, new THREE.MeshFaceMaterial([h, i]));
  this.lightArrow = new THREE.ArrowHelper(
    new THREE.Vector3(0, 1, 0),
    new THREE.Vector3(0, 1.1 * (b + c), 0),
    c,
    e
  );
  this.lightArrow.rotation.x = Math.PI;
  this.lightArrowGround = new THREE.ArrowHelper(
    new THREE.Vector3(0, 1, 0),
    new THREE.Vector3(0, -1.1 * (b + c), 0),
    c,
    d
  );
  b = new THREE.Object3D();
  b.rotation.x = 0.5 * -Math.PI;
  b.add(this.lightSphere);
  b.add(this.lightArrow);
  b.add(this.lightArrowGround);
  this.add(b);
  this.lightSphere.properties.isGizmo = !0;
  this.lightSphere.properties.gizmoSubject = a;
  this.lightSphere.properties.gizmoRoot = this;
  this.properties.isGizmo = !0;
  this.target = new THREE.Vector3();
  this.lookAt(this.target);
};
THREE.HemisphereLightHelper.prototype = Object.create(THREE.Object3D.prototype);
THREE.HemisphereLightHelper.prototype.update = function () {
  var a = THREE.Math.clamp(this.light.intensity, 0, 1);
  this.color.copy(this.light.color);
  this.groundColor.copy(this.light.groundColor);
  this.color.r *= a;
  this.color.g *= a;
  this.color.b *= a;
  this.groundColor.r *= a;
  this.groundColor.g *= a;
  this.groundColor.b *= a;
  this.lightSphere.material.materials[0].color.copy(this.color);
  this.lightSphere.material.materials[1].color.copy(this.groundColor);
  this.lightArrow.setColor(this.color.getHex());
  this.lightArrowGround.setColor(this.groundColor.getHex());
  this.lookAt(this.target);
};
THREE.PointLightHelper = function (a, b) {
  THREE.Object3D.call(this);
  this.light = a;
  this.position = a.position;
  this.color = a.color.clone();
  var c = THREE.Math.clamp(a.intensity, 0, 1);
  this.color.r *= c;
  this.color.g *= c;
  this.color.b *= c;
  var d = this.color.getHex(),
    c = new THREE.SphereGeometry(b, 16, 8),
    e = new THREE.AsteriskGeometry(1.25 * b, 2.25 * b),
    f = new THREE.IcosahedronGeometry(1, 2),
    g = new THREE.MeshBasicMaterial({
      color: d,
      fog: !1,
    }),
    h = new THREE.LineBasicMaterial({
      color: d,
      fog: !1,
    }),
    d = new THREE.MeshBasicMaterial({
      color: d,
      fog: !1,
      wireframe: !0,
      opacity: 0.1,
      transparent: !0,
    });
  this.lightSphere = new THREE.Mesh(c, g);
  this.lightRays = new THREE.Line(e, h, THREE.LinePieces);
  this.lightDistance = new THREE.Mesh(f, d);
  c = a.distance;
  0 === c
    ? (this.lightDistance.visible = !1)
    : this.lightDistance.scale.set(c, c, c);
  this.add(this.lightSphere);
  this.add(this.lightRays);
  this.add(this.lightDistance);
  this.lightSphere.properties.isGizmo = !0;
  this.lightSphere.properties.gizmoSubject = a;
  this.lightSphere.properties.gizmoRoot = this;
  this.properties.isGizmo = !0;
};
THREE.PointLightHelper.prototype = Object.create(THREE.Object3D.prototype);
THREE.PointLightHelper.prototype.update = function () {
  this.color.copy(this.light.color);
  var a = THREE.Math.clamp(this.light.intensity, 0, 1);
  this.color.r *= a;
  this.color.g *= a;
  this.color.b *= a;
  this.lightSphere.material.color.copy(this.color);
  this.lightRays.material.color.copy(this.color);
  this.lightDistance.material.color.copy(this.color);
  a = this.light.distance;
  0 === a
    ? (this.lightDistance.visible = !1)
    : ((this.lightDistance.visible = !0),
      this.lightDistance.scale.set(a, a, a));
};
THREE.SpotLightHelper = function (a, b, c) {
  THREE.Object3D.call(this);
  this.light = a;
  this.position = a.position;
  this.direction = new THREE.Vector3();
  this.direction.sub(a.target.position, a.position);
  this.color = a.color.clone();
  var d = THREE.Math.clamp(a.intensity, 0, 1);
  this.color.r *= d;
  this.color.g *= d;
  this.color.b *= d;
  var d = this.color.getHex(),
    e = new THREE.SphereGeometry(b, 16, 8),
    f = new THREE.AsteriskGeometry(1.25 * b, 2.25 * b),
    g = new THREE.CylinderGeometry(1e-4, 1, 1, 8, 1, !0),
    h = new THREE.Matrix4();
  h.rotateX(-Math.PI / 2);
  h.translate(new THREE.Vector3(0, -0.5, 0));
  g.applyMatrix(h);
  var i = new THREE.MeshBasicMaterial({
      color: d,
      fog: !1,
    }),
    h = new THREE.LineBasicMaterial({
      color: d,
      fog: !1,
    }),
    j = new THREE.MeshBasicMaterial({
      color: d,
      fog: !1,
      wireframe: !0,
      opacity: 0.3,
      transparent: !0,
    });
  this.lightArrow = new THREE.ArrowHelper(this.direction, null, c, d);
  this.lightSphere = new THREE.Mesh(e, i);
  this.lightCone = new THREE.Mesh(g, j);
  c = a.distance ? a.distance : 1e4;
  e = 2 * c * Math.tan(0.5 * a.angle);
  this.lightCone.scale.set(e, e, c);
  this.lightArrow.cone.material.fog = !1;
  this.lightArrow.line.material.fog = !1;
  this.lightRays = new THREE.Line(f, h, THREE.LinePieces);
  this.gyroscope = new THREE.Gyroscope();
  this.gyroscope.add(this.lightArrow);
  this.gyroscope.add(this.lightSphere);
  this.gyroscope.add(this.lightRays);
  this.add(this.gyroscope);
  this.add(this.lightCone);
  this.lookAt(a.target.position);
  this.lightSphere.properties.isGizmo = !0;
  this.lightSphere.properties.gizmoSubject = a;
  this.lightSphere.properties.gizmoRoot = this;
  this.targetSphere = null;
  a.target.properties.targetInverse &&
    ((b = new THREE.SphereGeometry(b, 8, 4)),
    (f = new THREE.MeshBasicMaterial({
      color: d,
      wireframe: !0,
      fog: !1,
    })),
    (this.targetSphere = new THREE.Mesh(b, f)),
    (this.targetSphere.position = a.target.position),
    (this.targetSphere.properties.isGizmo = !0),
    (this.targetSphere.properties.gizmoSubject = a.target),
    (this.targetSphere.properties.gizmoRoot = this.targetSphere),
    (a = new THREE.LineDashedMaterial({
      color: d,
      dashSize: 4,
      gapSize: 4,
      opacity: 0.75,
      transparent: !0,
      fog: !1,
    })),
    (d = new THREE.Geometry()),
    d.vertices.push(this.position.clone()),
    d.vertices.push(this.targetSphere.position.clone()),
    d.computeLineDistances(),
    (this.targetLine = new THREE.Line(d, a)),
    (this.targetLine.properties.isGizmo = !0));
  this.properties.isGizmo = !0;
};
THREE.SpotLightHelper.prototype = Object.create(THREE.Object3D.prototype);
THREE.SpotLightHelper.prototype.update = function () {
  this.direction.sub(this.light.target.position, this.light.position);
  this.lightArrow.setDirection(this.direction);
  this.lookAt(this.light.target.position);
  var a = this.light.distance ? this.light.distance : 1e4,
    b = 2 * a * Math.tan(0.5 * this.light.angle);
  this.lightCone.scale.set(b, b, a);
  this.color.copy(this.light.color);
  a = THREE.Math.clamp(this.light.intensity, 0, 1);
  this.color.r *= a;
  this.color.g *= a;
  this.color.b *= a;
  this.lightArrow.setColor(this.color.getHex());
  this.lightSphere.material.color.copy(this.color);
  this.lightRays.material.color.copy(this.color);
  this.lightCone.material.color.copy(this.color);
  this.targetSphere.material.color.copy(this.color);
  this.targetLine.material.color.copy(this.color);
  this.targetLine.geometry.vertices[0].copy(this.light.position);
  this.targetLine.geometry.vertices[1].copy(this.light.target.position);
  this.targetLine.geometry.computeLineDistances();
  this.targetLine.geometry.verticesNeedUpdate = !0;
};
THREE.SubdivisionModifier = function (a) {
  this.subdivisions = void 0 === a ? 1 : a;
  this.useOldVertexColors = !1;
  this.supportUVs = !0;
  this.debug = !1;
};
THREE.SubdivisionModifier.prototype.modify = function (a) {
  for (var b = this.subdivisions; 0 < b--; ) this.smooth(a);
};
THREE.GeometryUtils.orderedKey = function (a, b) {
  return Math.min(a, b) + "_" + Math.max(a, b);
};
THREE.GeometryUtils.computeEdgeFaces = function (a) {
  function b(a, b) {
    void 0 === g[a] && (g[a] = []);
    g[a].push(b);
  }
  var c,
    d,
    e,
    f,
    g = {},
    h = THREE.GeometryUtils.orderedKey;
  c = 0;
  for (d = a.faces.length; c < d; c++)
    (e = a.faces[c]),
      e instanceof THREE.Face3
        ? ((f = h(e.a, e.b)),
          b(f, c),
          (f = h(e.b, e.c)),
          b(f, c),
          (f = h(e.c, e.a)),
          b(f, c))
        : e instanceof THREE.Face4 &&
          ((f = h(e.a, e.b)),
          b(f, c),
          (f = h(e.b, e.c)),
          b(f, c),
          (f = h(e.c, e.d)),
          b(f, c),
          (f = h(e.d, e.a)),
          b(f, c));
  return g;
};
THREE.SubdivisionModifier.prototype.smooth = function (a) {
  function b() {
    l.debug &&
      console &&
      console.assert &&
      console.assert.apply(console, arguments);
  }
  function c() {
    l.debug && console.log.apply(console, arguments);
  }
  function d() {
    console && console.log.apply(console, arguments);
  }
  function e(a, b, d, e, g, h, m) {
    var n = new THREE.Face4(a, b, d, e, null, g.color, g.materialIndex);
    if (l.useOldVertexColors) {
      n.vertexColors = [];
      for (var o, p, q, r = 0; 4 > r; r++) {
        q = h[r];
        o = new THREE.Color();
        o.setRGB(0, 0, 0);
        for (var s = 0; s < q.length; s++)
          (p = g.vertexColors[q[s] - 1]),
            (o.r += p.r),
            (o.g += p.g),
            (o.b += p.b);
        o.r /= q.length;
        o.g /= q.length;
        o.b /= q.length;
        n.vertexColors[r] = o;
      }
    }
    i.push(n);
    l.supportUVs &&
      ((g = [f(a, ""), f(b, m), f(d, m), f(e, m)]),
      g[0]
        ? g[1]
          ? g[2]
            ? g[3]
              ? j.push(g)
              : c("d :( ", e + ":" + m)
            : c("c :( ", d + ":" + m)
          : c("b :( ", b + ":" + m)
        : c("a :( ", a + ":" + m));
  }
  function f(a, b) {
    var e = a + ":" + b,
      f = w[e];
    return !f
      ? (a >= s && a < s + o.length ? c("face pt") : c("edge pt"),
        d("warning, UV not found for", e),
        null)
      : f;
  }
  function g(a, b, c) {
    var e = a + ":" + b;
    e in w
      ? d("dup vertexNo", a, "oldFaceNo", b, "value", c, "key", e, w[e])
      : (w[e] = c);
  }
  var h = [],
    i = [],
    j = [],
    l = this,
    m = THREE.GeometryUtils.orderedKey,
    n = THREE.GeometryUtils.computeEdgeFaces,
    p = a.vertices,
    o = a.faces,
    s = p.length,
    h = p.concat(),
    t = [],
    r = {},
    z = {},
    w = {},
    q,
    E,
    A,
    v,
    u,
    D = a.faceVertexUvs[0],
    C;
  c("originalFaces, uvs, originalVerticesLength", o.length, D.length, s);
  if (l.supportUVs) {
    q = 0;
    for (E = D.length; q < E; q++) {
      A = 0;
      for (v = D[q].length; A < v; A++)
        (C = o[q]["abcd".charAt(A)]), g(C, q, D[q][A]);
    }
  }
  0 == D.length && (l.supportUVs = !1);
  q = 0;
  for (var G in w) q++;
  q || ((l.supportUVs = !1), c("no uvs"));
  q = 0;
  for (E = o.length; q < E; q++)
    (u = o[q]),
      t.push(u.centroid),
      h.push(u.centroid),
      l.supportUVs &&
        ((v = new THREE.UV()),
        u instanceof THREE.Face3
          ? ((v.u = f(u.a, q).u + f(u.b, q).u + f(u.c, q).u),
            (v.v = f(u.a, q).v + f(u.b, q).v + f(u.c, q).v),
            (v.u /= 3),
            (v.v /= 3))
          : u instanceof THREE.Face4 &&
            ((v.u = f(u.a, q).u + f(u.b, q).u + f(u.c, q).u + f(u.d, q).u),
            (v.v = f(u.a, q).v + f(u.b, q).v + f(u.c, q).v + f(u.d, q).v),
            (v.u /= 4),
            (v.v /= 4)),
        g(s + q, "", v));
  var n = n(a),
    P;
  E = 0;
  var B, K;
  G = {};
  D = {};
  for (q in n) {
    C = n[q];
    B = q.split("_");
    K = B[0];
    B = B[1];
    A = K;
    u = [K, B];
    void 0 === G[A] && (G[A] = []);
    G[A].push(u);
    A = B;
    u = [K, B];
    void 0 === G[A] && (G[A] = []);
    G[A].push(u);
    A = 0;
    for (v = C.length; A < v; A++) {
      u = C[A];
      P = K;
      var H = u,
        I = q;
      void 0 === D[P] && (D[P] = {});
      D[P][H] = I;
      P = B;
      H = q;
      void 0 === D[P] && (D[P] = {});
      D[P][u] = H;
    }
    2 > C.length && (z[q] = !0);
  }
  for (q in n)
    if (
      ((C = n[q]),
      (u = C[0]),
      (P = C[1]),
      (B = q.split("_")),
      (K = B[0]),
      (B = B[1]),
      (v = new THREE.Vector3()),
      b(0 < C.length, "an edge without faces?!"),
      1 == C.length
        ? (v.addSelf(p[K]), v.addSelf(p[B]), v.multiplyScalar(0.5))
        : (v.addSelf(t[u]),
          v.addSelf(t[P]),
          v.addSelf(p[K]),
          v.addSelf(p[B]),
          v.multiplyScalar(0.25)),
      (r[q] = s + o.length + E),
      h.push(v),
      E++,
      l.supportUVs)
    )
      (v = new THREE.UV()),
        (v.u = f(K, u).u + f(B, u).u),
        (v.v = f(K, u).v + f(B, u).v),
        (v.u /= 2),
        (v.v /= 2),
        g(r[q], u, v),
        2 <= C.length &&
          (b(2 == C.length, "did we plan for more than 2 edges?"),
          (v = new THREE.UV()),
          (v.u = f(K, P).u + f(B, P).u),
          (v.v = f(K, P).v + f(B, P).v),
          (v.u /= 2),
          (v.v /= 2),
          g(r[q], P, v));
  c("-- Step 2 done");
  var N, O;
  v = ["123", "12", "2", "23"];
  P = ["123", "23", "3", "31"];
  var H = ["123", "31", "1", "12"],
    I = ["1234", "12", "2", "23"],
    R = ["1234", "23", "3", "34"],
    ga = ["1234", "34", "4", "41"],
    M = ["1234", "41", "1", "12"];
  q = 0;
  for (E = t.length; q < E; q++)
    (u = o[q]),
      (C = s + q),
      u instanceof THREE.Face3
        ? ((K = m(u.a, u.b)),
          (B = m(u.b, u.c)),
          (N = m(u.c, u.a)),
          e(C, r[K], u.b, r[B], u, v, q),
          e(C, r[B], u.c, r[N], u, P, q),
          e(C, r[N], u.a, r[K], u, H, q))
        : u instanceof THREE.Face4
        ? ((K = m(u.a, u.b)),
          (B = m(u.b, u.c)),
          (N = m(u.c, u.d)),
          (O = m(u.d, u.a)),
          e(C, r[K], u.b, r[B], u, I, q),
          e(C, r[B], u.c, r[N], u, R, q),
          e(C, r[N], u.d, r[O], u, ga, q),
          e(C, r[O], u.a, r[K], u, M, q))
        : c("face should be a face!", u);
  r = new THREE.Vector3();
  u = new THREE.Vector3();
  q = 0;
  for (E = p.length; q < E; q++)
    if (void 0 !== G[q]) {
      r.set(0, 0, 0);
      u.set(0, 0, 0);
      B = new THREE.Vector3(0, 0, 0);
      C = 0;
      for (A in D[q]) r.addSelf(t[A]), C++;
      P = 0;
      K = G[q].length;
      v = C != K;
      for (A = 0; A < K; A++) z[m(G[q][A][0], G[q][A][1])] && P++;
      r.divideScalar(C);
      P = 0;
      if (v) {
        for (A = 0; A < K; A++)
          if (((C = G[q][A]), (H = 1 == n[m(C[0], C[1])].length)))
            (C = p[C[0]].clone().addSelf(p[C[1]]).divideScalar(2)),
              u.addSelf(C),
              P++;
        u.divideScalar(4);
        b(2 == P, "should have only 2 boundary edges");
      } else {
        for (A = 0; A < K; A++)
          (C = G[q][A]),
            (C = p[C[0]].clone().addSelf(p[C[1]]).divideScalar(2)),
            u.addSelf(C);
        u.divideScalar(K);
      }
      B.addSelf(p[q]);
      v
        ? (B.divideScalar(2), B.addSelf(u))
        : (B.multiplyScalar(K - 3),
          B.addSelf(r),
          B.addSelf(u.multiplyScalar(2)),
          B.divideScalar(K));
      h[q] = B;
    }
  a.vertices = h;
  a.faces = i;
  a.faceVertexUvs[0] = j;
  delete a.__tmpVertices;
  a.computeCentroids();
  a.computeFaceNormals();
  a.computeVertexNormals();
};
THREE.ImmediateRenderObject = function () {
  THREE.Object3D.call(this);
  this.render = function () {};
};
THREE.ImmediateRenderObject.prototype = Object.create(THREE.Object3D.prototype);
THREE.LensFlare = function (a, b, c, d, e) {
  THREE.Object3D.call(this);
  this.lensFlares = [];
  this.positionScreen = new THREE.Vector3();
  this.customUpdateCallback = void 0;
  void 0 !== a && this.add(a, b, c, d, e);
};
THREE.LensFlare.prototype = Object.create(THREE.Object3D.prototype);
THREE.LensFlare.prototype.add = function (a, b, c, d, e, f) {
  void 0 === b && (b = -1);
  void 0 === c && (c = 0);
  void 0 === f && (f = 1);
  void 0 === e && (e = new THREE.Color(16777215));
  void 0 === d && (d = THREE.NormalBlending);
  c = Math.min(c, Math.max(0, c));
  this.lensFlares.push({
    texture: a,
    size: b,
    distance: c,
    x: 0,
    y: 0,
    z: 0,
    scale: 1,
    rotation: 1,
    opacity: f,
    color: e,
    blending: d,
  });
};
THREE.LensFlare.prototype.updateLensFlares = function () {
  var a,
    b = this.lensFlares.length,
    c,
    d = 2 * -this.positionScreen.x,
    e = 2 * -this.positionScreen.y;
  for (a = 0; a < b; a++)
    (c = this.lensFlares[a]),
      (c.x = this.positionScreen.x + d * c.distance),
      (c.y = this.positionScreen.y + e * c.distance),
      (c.wantedRotation = 0.25 * c.x * Math.PI),
      (c.rotation += 0.25 * (c.wantedRotation - c.rotation));
};
THREE.MorphBlendMesh = function (a, b) {
  THREE.Mesh.call(this, a, b);
  this.animationsMap = {};
  this.animationsList = [];
  var c = this.geometry.morphTargets.length;
  this.createAnimation("__default", 0, c - 1, c / 1);
  this.setAnimationWeight("__default", 1);
};
THREE.MorphBlendMesh.prototype = Object.create(THREE.Mesh.prototype);
THREE.MorphBlendMesh.prototype.createAnimation = function (a, b, c, d) {
  b = {
    startFrame: b,
    endFrame: c,
    length: c - b + 1,
    fps: d,
    duration: (c - b) / d,
    lastFrame: 0,
    currentFrame: 0,
    active: !1,
    time: 0,
    direction: 1,
    weight: 1,
    directionBackwards: !1,
    mirroredLoop: !1,
  };
  this.animationsMap[a] = b;
  this.animationsList.push(b);
};
THREE.MorphBlendMesh.prototype.autoCreateAnimations = function (a) {
  for (
    var b = /([a-z]+)(\d+)/,
      c,
      d = {},
      e = this.geometry,
      f = 0,
      g = e.morphTargets.length;
    f < g;
    f++
  ) {
    var h = e.morphTargets[f].name.match(b);
    if (h && 1 < h.length) {
      var i = h[1];
      d[i] ||
        (d[i] = {
          start: Infinity,
          end: -Infinity,
        });
      h = d[i];
      f < h.start && (h.start = f);
      f > h.end && (h.end = f);
      c || (c = i);
    }
  }
  for (i in d) (h = d[i]), this.createAnimation(i, h.start, h.end, a);
  this.firstAnimation = c;
};
THREE.MorphBlendMesh.prototype.setAnimationDirectionForward = function (a) {
  if ((a = this.animationsMap[a]))
    (a.direction = 1), (a.directionBackwards = !1);
};
THREE.MorphBlendMesh.prototype.setAnimationDirectionBackward = function (a) {
  if ((a = this.animationsMap[a]))
    (a.direction = -1), (a.directionBackwards = !0);
};
THREE.MorphBlendMesh.prototype.setAnimationFPS = function (a, b) {
  var c = this.animationsMap[a];
  c && ((c.fps = b), (c.duration = (c.end - c.start) / c.fps));
};
THREE.MorphBlendMesh.prototype.setAnimationDuration = function (a, b) {
  var c = this.animationsMap[a];
  c && ((c.duration = b), (c.fps = (c.end - c.start) / c.duration));
};
THREE.MorphBlendMesh.prototype.setAnimationWeight = function (a, b) {
  var c = this.animationsMap[a];
  c && (c.weight = b);
};
THREE.MorphBlendMesh.prototype.setAnimationTime = function (a, b) {
  var c = this.animationsMap[a];
  c && (c.time = b);
};
THREE.MorphBlendMesh.prototype.getAnimationTime = function (a) {
  var b = 0;
  if ((a = this.animationsMap[a])) b = a.time;
  return b;
};
THREE.MorphBlendMesh.prototype.getAnimationDuration = function (a) {
  var b = -1;
  if ((a = this.animationsMap[a])) b = a.duration;
  return b;
};
THREE.MorphBlendMesh.prototype.playAnimation = function (a) {
  var b = this.animationsMap[a];
  b
    ? ((b.time = 0), (b.active = !0))
    : console.warn("animation[" + a + "] undefined");
};
THREE.MorphBlendMesh.prototype.stopAnimation = function (a) {
  if ((a = this.animationsMap[a])) a.active = !1;
};
THREE.MorphBlendMesh.prototype.update = function (a) {
  for (var b = 0, c = this.animationsList.length; b < c; b++) {
    var d = this.animationsList[b];
    if (d.active) {
      var e = d.duration / d.length;
      d.time += d.direction * a;
      if (d.mirroredLoop) {
        if (d.time > d.duration || 0 > d.time)
          if (
            ((d.direction *= -1),
            d.time > d.duration &&
              ((d.time = d.duration), (d.directionBackwards = !0)),
            0 > d.time)
          )
            (d.time = 0), (d.directionBackwards = !1);
      } else (d.time %= d.duration), 0 > d.time && (d.time += d.duration);
      var f =
          d.startFrame +
          THREE.Math.clamp(Math.floor(d.time / e), 0, d.length - 1),
        g = d.weight;
      f !== d.currentFrame &&
        ((this.morphTargetInfluences[d.lastFrame] = 0),
        (this.morphTargetInfluences[d.currentFrame] = 1 * g),
        (this.morphTargetInfluences[f] = 0),
        (d.lastFrame = d.currentFrame),
        (d.currentFrame = f));
      e = (d.time % e) / e;
      d.directionBackwards && (e = 1 - e);
      this.morphTargetInfluences[d.currentFrame] = e * g;
      this.morphTargetInfluences[d.lastFrame] = (1 - e) * g;
    }
  }
};
THREE.LensFlarePlugin = function () {
  function a(a) {
    var c = b.createProgram(),
      d = b.createShader(b.FRAGMENT_SHADER),
      e = b.createShader(b.VERTEX_SHADER);
    b.shaderSource(d, a.fragmentShader);
    b.shaderSource(e, a.vertexShader);
    b.compileShader(d);
    b.compileShader(e);
    b.attachShader(c, d);
    b.attachShader(c, e);
    b.linkProgram(c);
    return c;
  }
  var b, c, d, e, f, g, h, i, j, l, m, n, p;
  this.init = function (o) {
    b = o.context;
    c = o;
    d = new Float32Array(16);
    e = new Uint16Array(6);
    o = 0;
    d[o++] = -1;
    d[o++] = -1;
    d[o++] = 0;
    d[o++] = 0;
    d[o++] = 1;
    d[o++] = -1;
    d[o++] = 1;
    d[o++] = 0;
    d[o++] = 1;
    d[o++] = 1;
    d[o++] = 1;
    d[o++] = 1;
    d[o++] = -1;
    d[o++] = 1;
    d[o++] = 0;
    d[o++] = 1;
    o = 0;
    e[o++] = 0;
    e[o++] = 1;
    e[o++] = 2;
    e[o++] = 0;
    e[o++] = 2;
    e[o++] = 3;
    f = b.createBuffer();
    g = b.createBuffer();
    b.bindBuffer(b.ARRAY_BUFFER, f);
    b.bufferData(b.ARRAY_BUFFER, d, b.STATIC_DRAW);
    b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, g);
    b.bufferData(b.ELEMENT_ARRAY_BUFFER, e, b.STATIC_DRAW);
    h = b.createTexture();
    i = b.createTexture();
    b.bindTexture(b.TEXTURE_2D, h);
    b.texImage2D(
      b.TEXTURE_2D,
      0,
      b.RGB,
      16,
      16,
      0,
      b.RGB,
      b.UNSIGNED_BYTE,
      null
    );
    b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.CLAMP_TO_EDGE);
    b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.CLAMP_TO_EDGE);
    b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, b.NEAREST);
    b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, b.NEAREST);
    b.bindTexture(b.TEXTURE_2D, i);
    b.texImage2D(
      b.TEXTURE_2D,
      0,
      b.RGBA,
      16,
      16,
      0,
      b.RGBA,
      b.UNSIGNED_BYTE,
      null
    );
    b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.CLAMP_TO_EDGE);
    b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.CLAMP_TO_EDGE);
    b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, b.NEAREST);
    b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, b.NEAREST);
    0 >= b.getParameter(b.MAX_VERTEX_TEXTURE_IMAGE_UNITS)
      ? ((j = !1), (l = a(THREE.ShaderFlares.lensFlare)))
      : ((j = !0), (l = a(THREE.ShaderFlares.lensFlareVertexTexture)));
    m = {};
    n = {};
    m.vertex = b.getAttribLocation(l, "position");
    m.uv = b.getAttribLocation(l, "uv");
    n.renderType = b.getUniformLocation(l, "renderType");
    n.map = b.getUniformLocation(l, "map");
    n.occlusionMap = b.getUniformLocation(l, "occlusionMap");
    n.opacity = b.getUniformLocation(l, "opacity");
    n.color = b.getUniformLocation(l, "color");
    n.scale = b.getUniformLocation(l, "scale");
    n.rotation = b.getUniformLocation(l, "rotation");
    n.screenPosition = b.getUniformLocation(l, "screenPosition");
    p = !1;
  };
  this.render = function (a, d, e, r) {
    var a = a.__webglFlares,
      z = a.length;
    if (z) {
      var w = new THREE.Vector3(),
        q = r / e,
        E = 0.5 * e,
        A = 0.5 * r,
        v = 16 / r,
        u = new THREE.Vector2(v * q, v),
        D = new THREE.Vector3(1, 1, 0),
        C = new THREE.Vector2(1, 1),
        G = n,
        v = m;
      b.useProgram(l);
      p ||
        (b.enableVertexAttribArray(m.vertex),
        b.enableVertexAttribArray(m.uv),
        (p = !0));
      b.uniform1i(G.occlusionMap, 0);
      b.uniform1i(G.map, 1);
      b.bindBuffer(b.ARRAY_BUFFER, f);
      b.vertexAttribPointer(v.vertex, 2, b.FLOAT, !1, 16, 0);
      b.vertexAttribPointer(v.uv, 2, b.FLOAT, !1, 16, 8);
      b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, g);
      b.disable(b.CULL_FACE);
      b.depthMask(!1);
      var P, B, K, H, I;
      for (P = 0; P < z; P++)
        if (
          ((v = 16 / r),
          u.set(v * q, v),
          (H = a[P]),
          w.set(
            H.matrixWorld.elements[12],
            H.matrixWorld.elements[13],
            H.matrixWorld.elements[14]
          ),
          d.matrixWorldInverse.multiplyVector3(w),
          d.projectionMatrix.multiplyVector3(w),
          D.copy(w),
          (C.x = D.x * E + E),
          (C.y = D.y * A + A),
          j || (0 < C.x && C.x < e && 0 < C.y && C.y < r))
        ) {
          b.activeTexture(b.TEXTURE1);
          b.bindTexture(b.TEXTURE_2D, h);
          b.copyTexImage2D(b.TEXTURE_2D, 0, b.RGB, C.x - 8, C.y - 8, 16, 16, 0);
          b.uniform1i(G.renderType, 0);
          b.uniform2f(G.scale, u.x, u.y);
          b.uniform3f(G.screenPosition, D.x, D.y, D.z);
          b.disable(b.BLEND);
          b.enable(b.DEPTH_TEST);
          b.drawElements(b.TRIANGLES, 6, b.UNSIGNED_SHORT, 0);
          b.activeTexture(b.TEXTURE0);
          b.bindTexture(b.TEXTURE_2D, i);
          b.copyTexImage2D(
            b.TEXTURE_2D,
            0,
            b.RGBA,
            C.x - 8,
            C.y - 8,
            16,
            16,
            0
          );
          b.uniform1i(G.renderType, 1);
          b.disable(b.DEPTH_TEST);
          b.activeTexture(b.TEXTURE1);
          b.bindTexture(b.TEXTURE_2D, h);
          b.drawElements(b.TRIANGLES, 6, b.UNSIGNED_SHORT, 0);
          H.positionScreen.copy(D);
          H.customUpdateCallback
            ? H.customUpdateCallback(H)
            : H.updateLensFlares();
          b.uniform1i(G.renderType, 2);
          b.enable(b.BLEND);
          B = 0;
          for (K = H.lensFlares.length; B < K; B++)
            (I = H.lensFlares[B]),
              0.001 < I.opacity &&
                0.001 < I.scale &&
                ((D.x = I.x),
                (D.y = I.y),
                (D.z = I.z),
                (v = (I.size * I.scale) / r),
                (u.x = v * q),
                (u.y = v),
                b.uniform3f(G.screenPosition, D.x, D.y, D.z),
                b.uniform2f(G.scale, u.x, u.y),
                b.uniform1f(G.rotation, I.rotation),
                b.uniform1f(G.opacity, I.opacity),
                b.uniform3f(G.color, I.color.r, I.color.g, I.color.b),
                c.setBlending(
                  I.blending,
                  I.blendEquation,
                  I.blendSrc,
                  I.blendDst
                ),
                c.setTexture(I.texture, 1),
                b.drawElements(b.TRIANGLES, 6, b.UNSIGNED_SHORT, 0));
        }
      b.enable(b.CULL_FACE);
      b.enable(b.DEPTH_TEST);
      b.depthMask(!0);
    }
  };
};
THREE.ShadowMapPlugin = function () {
  var a,
    b,
    c,
    d,
    e,
    f,
    g = new THREE.Frustum(),
    h = new THREE.Matrix4(),
    i = new THREE.Vector3(),
    j = new THREE.Vector3();
  this.init = function (g) {
    a = g.context;
    b = g;
    var g = THREE.ShaderLib.depthRGBA,
      h = THREE.UniformsUtils.clone(g.uniforms);
    c = new THREE.ShaderMaterial({
      fragmentShader: g.fragmentShader,
      vertexShader: g.vertexShader,
      uniforms: h,
    });
    d = new THREE.ShaderMaterial({
      fragmentShader: g.fragmentShader,
      vertexShader: g.vertexShader,
      uniforms: h,
      morphTargets: !0,
    });
    e = new THREE.ShaderMaterial({
      fragmentShader: g.fragmentShader,
      vertexShader: g.vertexShader,
      uniforms: h,
      skinning: !0,
    });
    f = new THREE.ShaderMaterial({
      fragmentShader: g.fragmentShader,
      vertexShader: g.vertexShader,
      uniforms: h,
      morphTargets: !0,
      skinning: !0,
    });
    c._shadowPass = !0;
    d._shadowPass = !0;
    e._shadowPass = !0;
    f._shadowPass = !0;
  };
  this.render = function (a, c) {
    b.shadowMapEnabled && b.shadowMapAutoUpdate && this.update(a, c);
  };
  this.update = function (l, m) {
    var n,
      p,
      o,
      s,
      t,
      r,
      z,
      w,
      q,
      E = [];
    s = 0;
    a.clearColor(1, 1, 1, 1);
    a.disable(a.BLEND);
    a.enable(a.CULL_FACE);
    a.frontFace(a.CCW);
    b.shadowMapCullFrontFaces ? a.cullFace(a.FRONT) : a.cullFace(a.BACK);
    b.setDepthTest(!0);
    n = 0;
    for (p = l.__lights.length; n < p; n++)
      if (((o = l.__lights[n]), o.castShadow))
        if (o instanceof THREE.DirectionalLight && o.shadowCascade)
          for (t = 0; t < o.shadowCascadeCount; t++) {
            var A;
            if (o.shadowCascadeArray[t]) A = o.shadowCascadeArray[t];
            else {
              q = o;
              z = t;
              A = new THREE.DirectionalLight();
              A.isVirtual = !0;
              A.onlyShadow = !0;
              A.castShadow = !0;
              A.shadowCameraNear = q.shadowCameraNear;
              A.shadowCameraFar = q.shadowCameraFar;
              A.shadowCameraLeft = q.shadowCameraLeft;
              A.shadowCameraRight = q.shadowCameraRight;
              A.shadowCameraBottom = q.shadowCameraBottom;
              A.shadowCameraTop = q.shadowCameraTop;
              A.shadowCameraVisible = q.shadowCameraVisible;
              A.shadowDarkness = q.shadowDarkness;
              A.shadowBias = q.shadowCascadeBias[z];
              A.shadowMapWidth = q.shadowCascadeWidth[z];
              A.shadowMapHeight = q.shadowCascadeHeight[z];
              A.pointsWorld = [];
              A.pointsFrustum = [];
              w = A.pointsWorld;
              r = A.pointsFrustum;
              for (var v = 0; 8 > v; v++)
                (w[v] = new THREE.Vector3()), (r[v] = new THREE.Vector3());
              w = q.shadowCascadeNearZ[z];
              q = q.shadowCascadeFarZ[z];
              r[0].set(-1, -1, w);
              r[1].set(1, -1, w);
              r[2].set(-1, 1, w);
              r[3].set(1, 1, w);
              r[4].set(-1, -1, q);
              r[5].set(1, -1, q);
              r[6].set(-1, 1, q);
              r[7].set(1, 1, q);
              A.originalCamera = m;
              r = new THREE.Gyroscope();
              r.position = o.shadowCascadeOffset;
              r.add(A);
              r.add(A.target);
              m.add(r);
              o.shadowCascadeArray[t] = A;
              console.log("Created virtualLight", A);
            }
            z = o;
            w = t;
            q = z.shadowCascadeArray[w];
            q.position.copy(z.position);
            q.target.position.copy(z.target.position);
            q.lookAt(q.target);
            q.shadowCameraVisible = z.shadowCameraVisible;
            q.shadowDarkness = z.shadowDarkness;
            q.shadowBias = z.shadowCascadeBias[w];
            r = z.shadowCascadeNearZ[w];
            z = z.shadowCascadeFarZ[w];
            q = q.pointsFrustum;
            q[0].z = r;
            q[1].z = r;
            q[2].z = r;
            q[3].z = r;
            q[4].z = z;
            q[5].z = z;
            q[6].z = z;
            q[7].z = z;
            E[s] = A;
            s++;
          }
        else (E[s] = o), s++;
    n = 0;
    for (p = E.length; n < p; n++) {
      o = E[n];
      o.shadowMap ||
        ((o.shadowMap = new THREE.WebGLRenderTarget(
          o.shadowMapWidth,
          o.shadowMapHeight,
          {
            minFilter: THREE.LinearFilter,
            magFilter: THREE.LinearFilter,
            format: THREE.RGBAFormat,
          }
        )),
        (o.shadowMapSize = new THREE.Vector2(
          o.shadowMapWidth,
          o.shadowMapHeight
        )),
        (o.shadowMatrix = new THREE.Matrix4()));
      if (!o.shadowCamera) {
        if (o instanceof THREE.SpotLight)
          o.shadowCamera = new THREE.PerspectiveCamera(
            o.shadowCameraFov,
            o.shadowMapWidth / o.shadowMapHeight,
            o.shadowCameraNear,
            o.shadowCameraFar
          );
        else if (o instanceof THREE.DirectionalLight)
          o.shadowCamera = new THREE.OrthographicCamera(
            o.shadowCameraLeft,
            o.shadowCameraRight,
            o.shadowCameraTop,
            o.shadowCameraBottom,
            o.shadowCameraNear,
            o.shadowCameraFar
          );
        else {
          console.error("Unsupported light type for shadow");
          continue;
        }
        l.add(o.shadowCamera);
        b.autoUpdateScene && l.updateMatrixWorld();
      }
      o.shadowCameraVisible &&
        !o.cameraHelper &&
        ((o.cameraHelper = new THREE.CameraHelper(o.shadowCamera)),
        o.shadowCamera.add(o.cameraHelper));
      if (o.isVirtual && A.originalCamera == m) {
        t = m;
        s = o.shadowCamera;
        r = o.pointsFrustum;
        q = o.pointsWorld;
        i.set(Infinity, Infinity, Infinity);
        j.set(-Infinity, -Infinity, -Infinity);
        for (z = 0; 8 > z; z++)
          if (
            ((w = q[z]),
            w.copy(r[z]),
            THREE.ShadowMapPlugin.__projector.unprojectVector(w, t),
            s.matrixWorldInverse.multiplyVector3(w),
            w.x < i.x && (i.x = w.x),
            w.x > j.x && (j.x = w.x),
            w.y < i.y && (i.y = w.y),
            w.y > j.y && (j.y = w.y),
            w.z < i.z && (i.z = w.z),
            w.z > j.z)
          )
            j.z = w.z;
        s.left = i.x;
        s.right = j.x;
        s.top = j.y;
        s.bottom = i.y;
        s.updateProjectionMatrix();
      }
      s = o.shadowMap;
      r = o.shadowMatrix;
      t = o.shadowCamera;
      t.position.copy(o.matrixWorld.getPosition());
      t.lookAt(o.target.matrixWorld.getPosition());
      t.updateMatrixWorld();
      t.matrixWorldInverse.getInverse(t.matrixWorld);
      o.cameraHelper && (o.cameraHelper.visible = o.shadowCameraVisible);
      o.shadowCameraVisible && o.cameraHelper.update();
      r.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1);
      r.multiplySelf(t.projectionMatrix);
      r.multiplySelf(t.matrixWorldInverse);
      t._viewMatrixArray || (t._viewMatrixArray = new Float32Array(16));
      t._projectionMatrixArray ||
        (t._projectionMatrixArray = new Float32Array(16));
      t.matrixWorldInverse.flattenToArray(t._viewMatrixArray);
      t.projectionMatrix.flattenToArray(t._projectionMatrixArray);
      h.multiply(t.projectionMatrix, t.matrixWorldInverse);
      g.setFromMatrix(h);
      b.setRenderTarget(s);
      b.clear();
      q = l.__webglObjects;
      o = 0;
      for (s = q.length; o < s; o++)
        if (
          ((z = q[o]),
          (r = z.object),
          (z.render = !1),
          r.visible &&
            r.castShadow &&
            (!(r instanceof THREE.Mesh || r instanceof THREE.ParticleSystem) ||
              !r.frustumCulled ||
              g.contains(r)))
        )
          r._modelViewMatrix.multiply(t.matrixWorldInverse, r.matrixWorld),
            (z.render = !0);
      o = 0;
      for (s = q.length; o < s; o++)
        (z = q[o]),
          z.render &&
            ((r = z.object),
            (z = z.buffer),
            (v =
              r.material instanceof THREE.MeshFaceMaterial
                ? r.material.materials[0]
                : r.material),
            (w = 0 < r.geometry.morphTargets.length && v.morphTargets),
            (v = r instanceof THREE.SkinnedMesh && v.skinning),
            (w = r.customDepthMaterial
              ? r.customDepthMaterial
              : v
              ? w
                ? f
                : e
              : w
              ? d
              : c),
            z instanceof THREE.BufferGeometry
              ? b.renderBufferDirect(t, l.__lights, null, w, z, r)
              : b.renderBuffer(t, l.__lights, null, w, z, r));
      q = l.__webglObjectsImmediate;
      o = 0;
      for (s = q.length; o < s; o++)
        (z = q[o]),
          (r = z.object),
          r.visible &&
            r.castShadow &&
            (r._modelViewMatrix.multiply(t.matrixWorldInverse, r.matrixWorld),
            b.renderImmediateObject(t, l.__lights, null, c, r));
    }
    n = b.getClearColor();
    p = b.getClearAlpha();
    a.clearColor(n.r, n.g, n.b, p);
    a.enable(a.BLEND);
    b.shadowMapCullFrontFaces && a.cullFace(a.BACK);
  };
};
THREE.ShadowMapPlugin.__projector = new THREE.Projector();
THREE.SpritePlugin = function () {
  function a(a, b) {
    return a.z !== b.z ? b.z - a.z : b.id - a.id;
  }
  var b, c, d, e, f, g, h, i, j, l;
  this.init = function (a) {
    b = a.context;
    c = a;
    d = new Float32Array(16);
    e = new Uint16Array(6);
    a = 0;
    d[a++] = -1;
    d[a++] = -1;
    d[a++] = 0;
    d[a++] = 0;
    d[a++] = 1;
    d[a++] = -1;
    d[a++] = 1;
    d[a++] = 0;
    d[a++] = 1;
    d[a++] = 1;
    d[a++] = 1;
    d[a++] = 1;
    d[a++] = -1;
    d[a++] = 1;
    d[a++] = 0;
    d[a++] = 1;
    a = 0;
    e[a++] = 0;
    e[a++] = 1;
    e[a++] = 2;
    e[a++] = 0;
    e[a++] = 2;
    e[a++] = 3;
    f = b.createBuffer();
    g = b.createBuffer();
    b.bindBuffer(b.ARRAY_BUFFER, f);
    b.bufferData(b.ARRAY_BUFFER, d, b.STATIC_DRAW);
    b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, g);
    b.bufferData(b.ELEMENT_ARRAY_BUFFER, e, b.STATIC_DRAW);
    var a = THREE.ShaderSprite.sprite,
      n = b.createProgram(),
      p = b.createShader(b.FRAGMENT_SHADER),
      o = b.createShader(b.VERTEX_SHADER);
    b.shaderSource(p, a.fragmentShader);
    b.shaderSource(o, a.vertexShader);
    b.compileShader(p);
    b.compileShader(o);
    b.attachShader(n, p);
    b.attachShader(n, o);
    b.linkProgram(n);
    h = n;
    i = {};
    j = {};
    i.position = b.getAttribLocation(h, "position");
    i.uv = b.getAttribLocation(h, "uv");
    j.uvOffset = b.getUniformLocation(h, "uvOffset");
    j.uvScale = b.getUniformLocation(h, "uvScale");
    j.rotation = b.getUniformLocation(h, "rotation");
    j.scale = b.getUniformLocation(h, "scale");
    j.alignment = b.getUniformLocation(h, "alignment");
    j.color = b.getUniformLocation(h, "color");
    j.map = b.getUniformLocation(h, "map");
    j.opacity = b.getUniformLocation(h, "opacity");
    j.useScreenCoordinates = b.getUniformLocation(h, "useScreenCoordinates");
    j.affectedByDistance = b.getUniformLocation(h, "affectedByDistance");
    j.screenPosition = b.getUniformLocation(h, "screenPosition");
    j.modelViewMatrix = b.getUniformLocation(h, "modelViewMatrix");
    j.projectionMatrix = b.getUniformLocation(h, "projectionMatrix");
    j.fogType = b.getUniformLocation(h, "fogType");
    j.fogDensity = b.getUniformLocation(h, "fogDensity");
    j.fogNear = b.getUniformLocation(h, "fogNear");
    j.fogFar = b.getUniformLocation(h, "fogFar");
    j.fogColor = b.getUniformLocation(h, "fogColor");
    l = !1;
  };
  this.render = function (d, e, p, o) {
    var s = d.__webglSprites,
      t = s.length;
    if (t) {
      var r = i,
        z = j,
        w = o / p,
        p = 0.5 * p,
        q = 0.5 * o,
        E = !0;
      b.useProgram(h);
      l ||
        (b.enableVertexAttribArray(r.position),
        b.enableVertexAttribArray(r.uv),
        (l = !0));
      b.disable(b.CULL_FACE);
      b.enable(b.BLEND);
      b.depthMask(!0);
      b.bindBuffer(b.ARRAY_BUFFER, f);
      b.vertexAttribPointer(r.position, 2, b.FLOAT, !1, 16, 0);
      b.vertexAttribPointer(r.uv, 2, b.FLOAT, !1, 16, 8);
      b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, g);
      b.uniformMatrix4fv(z.projectionMatrix, !1, e._projectionMatrixArray);
      b.activeTexture(b.TEXTURE0);
      b.uniform1i(z.map, 0);
      var A = (r = 0),
        v = d.fog;
      v
        ? (b.uniform3f(z.fogColor, v.color.r, v.color.g, v.color.b),
          v instanceof THREE.Fog
            ? (b.uniform1f(z.fogNear, v.near),
              b.uniform1f(z.fogFar, v.far),
              b.uniform1i(z.fogType, 1),
              (A = r = 1))
            : v instanceof THREE.FogExp2 &&
              (b.uniform1f(z.fogDensity, v.density),
              b.uniform1i(z.fogType, 2),
              (A = r = 2)))
        : (b.uniform1i(z.fogType, 0), (A = r = 0));
      for (var u, D = [], v = 0; v < t; v++)
        (u = s[v]),
          u.visible &&
            0 !== u.opacity &&
            (u.useScreenCoordinates
              ? (u.z = -u.position.z)
              : (u._modelViewMatrix.multiply(
                  e.matrixWorldInverse,
                  u.matrixWorld
                ),
                (u.z = -u._modelViewMatrix.elements[14])));
      s.sort(a);
      for (v = 0; v < t; v++)
        if (
          ((u = s[v]),
          u.visible &&
            0 !== u.opacity &&
            u.map &&
            u.map.image &&
            u.map.image.width)
        )
          u.useScreenCoordinates
            ? (b.uniform1i(z.useScreenCoordinates, 1),
              b.uniform3f(
                z.screenPosition,
                (u.position.x - p) / p,
                (q - u.position.y) / q,
                Math.max(0, Math.min(1, u.position.z))
              ))
            : (b.uniform1i(z.useScreenCoordinates, 0),
              b.uniform1i(z.affectedByDistance, u.affectedByDistance ? 1 : 0),
              b.uniformMatrix4fv(
                z.modelViewMatrix,
                !1,
                u._modelViewMatrix.elements
              )),
            (e = d.fog && u.fog ? A : 0),
            r !== e && (b.uniform1i(z.fogType, e), (r = e)),
            (e = 1 / (u.scaleByViewport ? o : 1)),
            (D[0] = e * w * u.scale.x),
            (D[1] = e * u.scale.y),
            b.uniform2f(z.uvScale, u.uvScale.x, u.uvScale.y),
            b.uniform2f(z.uvOffset, u.uvOffset.x, u.uvOffset.y),
            b.uniform2f(z.alignment, u.alignment.x, u.alignment.y),
            b.uniform1f(z.opacity, u.opacity),
            b.uniform3f(z.color, u.color.r, u.color.g, u.color.b),
            b.uniform1f(z.rotation, u.rotation),
            b.uniform2fv(z.scale, D),
            u.mergeWith3D && !E
              ? (b.enable(b.DEPTH_TEST), (E = !0))
              : !u.mergeWith3D && E && (b.disable(b.DEPTH_TEST), (E = !1)),
            c.setBlending(u.blending, u.blendEquation, u.blendSrc, u.blendDst),
            c.setTexture(u.map, 0),
            b.drawElements(b.TRIANGLES, 6, b.UNSIGNED_SHORT, 0);
      b.enable(b.CULL_FACE);
      b.enable(b.DEPTH_TEST);
      b.depthMask(!0);
    }
  };
};
THREE.DepthPassPlugin = function () {
  this.enabled = !1;
  this.renderTarget = null;
  var a,
    b,
    c,
    d,
    e,
    f,
    g = new THREE.Frustum(),
    h = new THREE.Matrix4();
  this.init = function (g) {
    a = g.context;
    b = g;
    var g = THREE.ShaderLib.depthRGBA,
      h = THREE.UniformsUtils.clone(g.uniforms);
    c = new THREE.ShaderMaterial({
      fragmentShader: g.fragmentShader,
      vertexShader: g.vertexShader,
      uniforms: h,
    });
    d = new THREE.ShaderMaterial({
      fragmentShader: g.fragmentShader,
      vertexShader: g.vertexShader,
      uniforms: h,
      morphTargets: !0,
    });
    e = new THREE.ShaderMaterial({
      fragmentShader: g.fragmentShader,
      vertexShader: g.vertexShader,
      uniforms: h,
      skinning: !0,
    });
    f = new THREE.ShaderMaterial({
      fragmentShader: g.fragmentShader,
      vertexShader: g.vertexShader,
      uniforms: h,
      morphTargets: !0,
      skinning: !0,
    });
    c._shadowPass = !0;
    d._shadowPass = !0;
    e._shadowPass = !0;
    f._shadowPass = !0;
  };
  this.render = function (a, b) {
    this.enabled && this.update(a, b);
  };
  this.update = function (i, j) {
    var l, m, n, p, o, s;
    a.clearColor(1, 1, 1, 1);
    a.disable(a.BLEND);
    b.setDepthTest(!0);
    b.autoUpdateScene && i.updateMatrixWorld();
    j._viewMatrixArray || (j._viewMatrixArray = new Float32Array(16));
    j._projectionMatrixArray ||
      (j._projectionMatrixArray = new Float32Array(16));
    j.matrixWorldInverse.getInverse(j.matrixWorld);
    j.matrixWorldInverse.flattenToArray(j._viewMatrixArray);
    j.projectionMatrix.flattenToArray(j._projectionMatrixArray);
    h.multiply(j.projectionMatrix, j.matrixWorldInverse);
    g.setFromMatrix(h);
    b.setRenderTarget(this.renderTarget);
    b.clear();
    s = i.__webglObjects;
    l = 0;
    for (m = s.length; l < m; l++)
      if (
        ((n = s[l]),
        (o = n.object),
        (n.render = !1),
        o.visible &&
          (!(o instanceof THREE.Mesh || o instanceof THREE.ParticleSystem) ||
            !o.frustumCulled ||
            g.contains(o)))
      )
        o._modelViewMatrix.multiply(j.matrixWorldInverse, o.matrixWorld),
          (n.render = !0);
    var t;
    l = 0;
    for (m = s.length; l < m; l++)
      if (
        ((n = s[l]),
        n.render &&
          ((o = n.object),
          (n = n.buffer),
          !(o instanceof THREE.ParticleSystem) || o.customDepthMaterial))
      )
        (t =
          o.material instanceof THREE.MeshFaceMaterial
            ? o.material.materials[0]
            : o.material) && b.setMaterialFaces(o.material),
          (p = 0 < o.geometry.morphTargets.length && t.morphTargets),
          (t = o instanceof THREE.SkinnedMesh && t.skinning),
          (p = o.customDepthMaterial
            ? o.customDepthMaterial
            : t
            ? p
              ? f
              : e
            : p
            ? d
            : c),
          n instanceof THREE.BufferGeometry
            ? b.renderBufferDirect(j, i.__lights, null, p, n, o)
            : b.renderBuffer(j, i.__lights, null, p, n, o);
    s = i.__webglObjectsImmediate;
    l = 0;
    for (m = s.length; l < m; l++)
      (n = s[l]),
        (o = n.object),
        o.visible &&
          (o._modelViewMatrix.multiply(j.matrixWorldInverse, o.matrixWorld),
          b.renderImmediateObject(j, i.__lights, null, c, o));
    l = b.getClearColor();
    m = b.getClearAlpha();
    a.clearColor(l.r, l.g, l.b, m);
    a.enable(a.BLEND);
  };
};
THREE.ShaderFlares = {
  lensFlareVertexTexture: {
    vertexShader:
      "uniform vec3 screenPosition;\nuniform vec2 scale;\nuniform float rotation;\nuniform int renderType;\nuniform sampler2D occlusionMap;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvarying float vVisibility;\nvoid main() {\nvUV = uv;\nvec2 pos = position;\nif( renderType == 2 ) {\nvec4 visibility = texture2D( occlusionMap, vec2( 0.1, 0.1 ) ) +\ntexture2D( occlusionMap, vec2( 0.5, 0.1 ) ) +\ntexture2D( occlusionMap, vec2( 0.9, 0.1 ) ) +\ntexture2D( occlusionMap, vec2( 0.9, 0.5 ) ) +\ntexture2D( occlusionMap, vec2( 0.9, 0.9 ) ) +\ntexture2D( occlusionMap, vec2( 0.5, 0.9 ) ) +\ntexture2D( occlusionMap, vec2( 0.1, 0.9 ) ) +\ntexture2D( occlusionMap, vec2( 0.1, 0.5 ) ) +\ntexture2D( occlusionMap, vec2( 0.5, 0.5 ) );\nvVisibility = (       visibility.r / 9.0 ) *\n( 1.0 - visibility.g / 9.0 ) *\n(       visibility.b / 9.0 ) *\n( 1.0 - visibility.a / 9.0 );\npos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\npos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\n}\ngl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n}",
    fragmentShader:
      "precision mediump float;\nuniform sampler2D map;\nuniform float opacity;\nuniform int renderType;\nuniform vec3 color;\nvarying vec2 vUV;\nvarying float vVisibility;\nvoid main() {\nif( renderType == 0 ) {\ngl_FragColor = vec4( 1.0, 0.0, 1.0, 0.0 );\n} else if( renderType == 1 ) {\ngl_FragColor = texture2D( map, vUV );\n} else {\nvec4 texture = texture2D( map, vUV );\ntexture.a *= opacity * vVisibility;\ngl_FragColor = texture;\ngl_FragColor.rgb *= color;\n}\n}",
  },
  lensFlare: {
    vertexShader:
      "uniform vec3 screenPosition;\nuniform vec2 scale;\nuniform float rotation;\nuniform int renderType;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvoid main() {\nvUV = uv;\nvec2 pos = position;\nif( renderType == 2 ) {\npos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\npos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\n}\ngl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n}",
    fragmentShader:
      "precision mediump float;\nuniform sampler2D map;\nuniform sampler2D occlusionMap;\nuniform float opacity;\nuniform int renderType;\nuniform vec3 color;\nvarying vec2 vUV;\nvoid main() {\nif( renderType == 0 ) {\ngl_FragColor = vec4( texture2D( map, vUV ).rgb, 0.0 );\n} else if( renderType == 1 ) {\ngl_FragColor = texture2D( map, vUV );\n} else {\nfloat visibility = texture2D( occlusionMap, vec2( 0.5, 0.1 ) ).a +\ntexture2D( occlusionMap, vec2( 0.9, 0.5 ) ).a +\ntexture2D( occlusionMap, vec2( 0.5, 0.9 ) ).a +\ntexture2D( occlusionMap, vec2( 0.1, 0.5 ) ).a;\nvisibility = ( 1.0 - visibility / 4.0 );\nvec4 texture = texture2D( map, vUV );\ntexture.a *= opacity * visibility;\ngl_FragColor = texture;\ngl_FragColor.rgb *= color;\n}\n}",
  },
};
THREE.ShaderSprite = {
  sprite: {
    vertexShader:
      "uniform int useScreenCoordinates;\nuniform int affectedByDistance;\nuniform vec3 screenPosition;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform float rotation;\nuniform vec2 scale;\nuniform vec2 alignment;\nuniform vec2 uvOffset;\nuniform vec2 uvScale;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvoid main() {\nvUV = uvOffset + uv * uvScale;\nvec2 alignedPosition = position + alignment;\nvec2 rotatedPosition;\nrotatedPosition.x = ( cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y ) * scale.x;\nrotatedPosition.y = ( sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y ) * scale.y;\nvec4 finalPosition;\nif( useScreenCoordinates != 0 ) {\nfinalPosition = vec4( screenPosition.xy + rotatedPosition, screenPosition.z, 1.0 );\n} else {\nfinalPosition = projectionMatrix * modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\nfinalPosition.xy += rotatedPosition * ( affectedByDistance == 1 ? 1.0 : finalPosition.z );\n}\ngl_Position = finalPosition;\n}",
    fragmentShader:
      "precision mediump float;\nuniform vec3 color;\nuniform sampler2D map;\nuniform float opacity;\nuniform int fogType;\nuniform vec3 fogColor;\nuniform float fogDensity;\nuniform float fogNear;\nuniform float fogFar;\nvarying vec2 vUV;\nvoid main() {\nvec4 texture = texture2D( map, vUV );\ngl_FragColor = vec4( color * texture.xyz, texture.a * opacity );\nif ( fogType > 0 ) {\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\nfloat fogFactor = 0.0;\nif ( fogType == 1 ) {\nfogFactor = smoothstep( fogNear, fogFar, depth );\n} else {\nconst float LOG2 = 1.442695;\nfloat fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );\nfogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );\n}\ngl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n}\n}",
  },
};
