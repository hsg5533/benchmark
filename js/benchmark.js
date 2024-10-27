!(function () {
  var e,
    o,
    s,
    i,
    t,
    n,
    r,
    a,
    p,
    d,
    h = h || {};
  (h.meshes = []),
    (h.direction = {}),
    (h.direction.x = 7),
    (h.direction.y = 14),
    (h.direction.z = -6);
  var m,
    w,
    c,
    _,
    l,
    f,
    u = 0,
    v = 0,
    y = 100,
    x = new Date() * 1 - 1,
    M = 0,
    b = 0,
    z = 0,
    g = 0;
  function S() {
    $(".starttest, .score, .comparison, .donate").hide(),
      Modernizr.canvas
        ? ($(".pleasewait")
            .html(
              "Test 1/4: Canvas3D Test 1, please wait and keep this window focused for optimal results..."
            )
            .show(),
          $(".extrainfo")
            .html(
              "This is a stress test. Moving blocks will be added to the scene until you drop below 10fps. The score is determined by the amount of blocks."
            )
            .show(),
          $(".front"),
          (o = 800),
          (s = 600),
          (t = 0),
          ((m = new THREE.PerspectiveCamera(
            50,
            o / s,
            1,
            1e4
          )).position.z = 2e3),
          (m.position.y = 0),
          (m.position.x = 0),
          (w = new THREE.Scene()),
          (c = new THREE.CanvasRenderer()).setSize(o, s),
          $(".renderwindow").prepend($(c.domElement).addClass("renderer")),
          (_ = window.setInterval(R, 1)),
          (x = new Date() * 1 - 1),
          (function e() {
            if (y > 10 || t < 100) {
              for (u = 0, v = h.meshes.length; u < v; u++)
                (h.meshes[u].rotation.x += 0.01),
                  (h.meshes[u].rotation.y += 0.02),
                  (h.meshes[u].position.x += h.direction.x),
                  (h.meshes[u].position.y += h.direction.y),
                  (h.meshes[u].position.z += h.direction.z),
                  h.meshes[u].position.x >= 2500
                    ? (h.meshes[u].position.x = -1500)
                    : h.meshes[u].position.x <= -2500 &&
                      (h.meshes[u].position.x = 1500),
                  h.meshes[u].position.y >= 2500
                    ? (h.meshes[u].position.y = -1500)
                    : h.meshes[u].position.y <= -2500 &&
                      (h.meshes[u].position.y = 1500),
                  h.meshes[u].position.z >= 2500
                    ? (h.meshes[u].position.z = -1500)
                    : h.meshes[u].position.z <= -2500 &&
                      (h.meshes[u].position.z = 1500);
              (y = 1e3 / ((f = new Date()) - x)),
                (x = f),
                c.render(w, m),
                t++,
                setTimeout(e, 0);
            } else
              G(),
                (M = Math.ceil((i = h.meshes.length) / 10)),
                O(),
                setTimeout(P, 500);
          })(),
          T())
        : $(".pleasewait")
            .html(
              'Your browser does not support canvas, maybe you should use <a href="https://www.google.com/intl/nl/chrome/browser/">Google Chrome</a>'
            )
            .show();
  }
  function T() {
    $(".fps").show(), (l = setInterval(C, 1e3));
  }
  function C() {
    $(".fps").get(0).innerHTML = "Current FPS: " + Math.round(y);
  }
  function G() {
    $(".fps").hide(), clearInterval(l);
  }
  function P() {
    var i, t, r;
    $(".pleasewait")
      .html(
        "Test 2/4: Canvas3D Test 2, please wait and keep this window focused for optimal results..."
      )
      .show(),
      $(".extrainfo").html(
        "This test renders 2 sphere wireframes. The score of this test is determined by the average fps."
      ),
      (n = 0),
      (e = !0),
      $(".front"),
      (o = 800),
      (s = 600),
      ((m = new THREE.PerspectiveCamera(50, o / s, 1, 1e4)).position.z = 2e3),
      (m.position.y = 0),
      (m.position.x = 0),
      (w = new THREE.Scene()),
      (c = new THREE.CanvasRenderer()).setSize(o, s),
      $(".renderwindow").prepend($(c.domElement).addClass("renderer")),
      (i = new THREE.SphereGeometry(1e3, 50, 50)),
      (t = new THREE.MeshBasicMaterial({
        color: Math.floor(16777215 * Math.random()),
        wireframe: !0,
      })),
      ((r = new THREE.Mesh(i, t)).position.x = 0),
      (r.position.y = 0),
      (r.position.z = 0),
      w.add(r),
      h.meshes.push(r),
      (i = new THREE.SphereGeometry(300, 40, 40)),
      (t = new THREE.MeshBasicMaterial({
        color: Math.floor(16777215 * Math.random()),
        wireframe: !0,
      })),
      ((r = new THREE.Mesh(i, t)).position.x = -500),
      (r.position.y = -500),
      (r.position.z = 500),
      w.add(r),
      h.meshes.push(r),
      (x = new Date() * 1 - 1),
      (function o() {
        e &&
          ((y = 1e3 / ((f = new Date()) - x)),
          (x = f),
          (n += y),
          (h.meshes[0].rotation.y += 0.001),
          (h.meshes[1].rotation.y -= 0.002),
          c.render(w, m),
          setTimeout(o, 0));
      })(),
      T(),
      setTimeout(L, 15e3);
  }
  function L() {
    G(),
      (b = Math.ceil(n / 100)),
      (e = !1),
      setTimeout(function () {
        O(), setTimeout(B, 500);
      }, 50);
  }
  function B() {
    Modernizr.webgl
      ? ($(".pleasewait").html(
          "Test 3/4: WebGL Test 1, please wait and keep this window focused for optimal results..."
        ),
        $(".extrainfo").html(
          "Rendering some extra elements here such as lights, particles, shadows and opacity. The score of this test is determined by the avarage fps."
        ),
        (r = 0),
        (e = !0),
        (function e() {
          $(".front"),
            (o = 800),
            (s = 600),
            ((m = new THREE.PerspectiveCamera(
              50,
              o / s,
              1,
              1e4
            )).position.z = 2e3),
            (m.position.y = 0),
            (m.position.x = 0),
            (w = new THREE.Scene()),
            (c = new THREE.WebGLRenderer()).setSize(o, s),
            $(".renderwindow").prepend($(c.domElement).addClass("renderer"));
          var i = new THREE.SphereGeometry(1e3, 50, 50),
            t = new THREE.MeshLambertMaterial({
              color: 6689075,
              wireframe: !1,
            });
          t.opacity = 0.8;
          var n = new THREE.Mesh(i, t);
          (n.position.x = 0),
            (n.position.y = 0),
            (n.position.z = 0),
            w.add(n),
            h.meshes.push(n);
          var i = new THREE.SphereGeometry(300, 40, 40),
            t = new THREE.MeshLambertMaterial({
              color: 7807556,
              wireframe: !1,
            });
          t.opacity = 0.95;
          var n = new THREE.Mesh(i, t);
          (n.position.x = -500),
            (n.position.y = -500),
            (n.position.z = 500),
            w.add(n),
            h.meshes.push(n);
          var i = new THREE.SphereGeometry(50, 100, 100),
            t = new THREE.MeshLambertMaterial({
              color: 8926037,
              wireframe: !1,
            }),
            n = new THREE.Mesh(i, t);
          (n.position.x = -700),
            (n.position.y = -400),
            (n.position.z = 750),
            w.add(n);
          var r = new THREE.PointLight(16777215);
          (r.position.x = 0),
            (r.position.y = 0),
            (r.position.z = 2e3),
            w.add(r);
          var a = new THREE.SpotLight(16777215);
          a.position.set(-2e3, 0, 2e3),
            (a.castShadow = !0),
            (a.shadowMapWidth = 1024),
            (a.shadowMapHeight = 1024),
            (a.shadowCameraNear = 200),
            (a.shadowCameraFar = 2e3),
            (a.shadowCameraFov = 30),
            w.add(a);
          for (
            var p = 1e4,
              d = new THREE.Geometry(),
              _ = new THREE.ParticleBasicMaterial({
                color: 10027263,
                size: 3,
                blending: THREE.AdditiveBlending,
                transparent: !0,
              }),
              l = 0;
            l < p;
            l++
          ) {
            var f = 2e3 * Math.random() - 1e3,
              u = 2e3 * Math.random() - 1e3,
              v = 2e3 * Math.random() - 1e3,
              y = new THREE.Vector3(f, u, v);
            d.vertices.push(y);
          }
          var M = new THREE.ParticleSystem(d, _);
          (M.sortParticles = !0),
            w.add(M),
            h.meshes.push(M),
            (p = 1e4),
            (d = new THREE.Geometry()),
            (_ = new THREE.ParticleBasicMaterial({
              color: 14540032,
              size: 3,
              blending: THREE.AdditiveBlending,
              transparent: !0,
            }));
          for (var l = 0; l < p; l++) {
            var f = 2e3 * Math.random() - 1e3,
              u = 2e3 * Math.random() - 1e3,
              v = 2e3 * Math.random() - 1e3,
              y = new THREE.Vector3(f, u, v);
            d.vertices.push(y);
          }
          var M = new THREE.ParticleSystem(d, _);
          (M.sortParticles = !0),
            w.add(M),
            h.meshes.push(M),
            (x = new Date() * 1 - 1);
        })(),
        (function o() {
          e &&
            ((y = 1e3 / ((f = new Date()) - x)),
            (x = f),
            (r += y),
            (h.meshes[0].rotation.y += 0.001),
            (h.meshes[1].rotation.y -= 0.002),
            (h.meshes[2].rotation.y -= 0.001),
            (h.meshes[2].rotation.x -= 0.001),
            (h.meshes[3].rotation.y += 0.001),
            (h.meshes[3].rotation.z -= 0.001),
            (h.meshes[3].rotation.x += 0.001),
            c.render(w, m),
            setTimeout(o, 0));
        })(),
        T(),
        setTimeout(k, 15e3))
      : Y();
  }
  function k() {
    G(),
      (z = Math.ceil(r / 100)),
      (e = !1),
      setTimeout(function () {
        O(), setTimeout(A, 500);
      }, 50);
  }
  function A() {
    Modernizr.webgl
      ? ($(".pleasewait").html(
          "Test 4/4: WebGL Test 2, please wait and keep this window focused for optimal results..."
        ),
        $(".extrainfo").html(
          "This test uses lights, particles, opacity, reflections and antialiasing. The score of this test is determined by the avarage fps."
        ),
        (a = 0),
        (e = !0),
        (function e() {
          $(".front"),
            (o = 800),
            (s = 600),
            ((m = new THREE.PerspectiveCamera(
              50,
              o / s,
              1,
              1e4
            )).position.z = 2e3),
            (m.position.y = 0),
            (m.position.x = 0),
            (w = new THREE.Scene()),
            (c = new THREE.WebGLRenderer({ antialias: !0 })).setSize(o, s),
            $(".renderwindow").prepend($(c.domElement).addClass("renderer"));
          var i = new THREE.CubeGeometry(100, 100, 100),
            t = new THREE.CubeGeometry(200, 200, 200),
            n = new THREE.CubeGeometry(2e3, 2e3, 2e3),
            r = new THREE.MeshLambertMaterial({
              color: 6689075,
              wireframe: !1,
            }),
            a = new THREE.MeshLambertMaterial({
              color: 6689075,
              wireframe: !1,
            });
          a.opacity = 0.8;
          var p = new THREE.MeshLambertMaterial({
              color: 16777215,
              wireframe: !1,
            }),
            d = new THREE.Mesh(t, r);
          (d.position.x = -1e3),
            (d.position.y = -400),
            (d.position.z = 1e3),
            w.add(d);
          var _ = new THREE.Mesh(i, a);
          (_.position.x = -800),
            (_.position.y = -400),
            (_.position.z = 1e3),
            w.add(_),
            h.meshes.push(_);
          var l = new THREE.Mesh(i, r);
          (l.position.x = -600),
            (l.position.y = -400),
            (l.position.z = 1e3),
            w.add(l);
          var f = new THREE.Mesh(i, a);
          (f.position.x = -400),
            (f.position.y = -400),
            (f.position.z = 1e3),
            w.add(f),
            h.meshes.push(f);
          var u = new THREE.Mesh(i, r);
          (u.position.x = -200),
            (u.position.y = -400),
            (u.position.z = 1e3),
            w.add(u);
          var v = new THREE.Mesh(i, a);
          (v.position.x = 0),
            (v.position.y = -400),
            (v.position.z = 1e3),
            w.add(v),
            h.meshes.push(v);
          var y = new THREE.Mesh(i, r);
          (y.position.x = 200),
            (y.position.y = -400),
            (y.position.z = 1e3),
            w.add(y);
          var M = new THREE.Mesh(i, a);
          (M.position.x = 400),
            (M.position.y = -400),
            (M.position.z = 1e3),
            w.add(M),
            h.meshes.push(M);
          var b = new THREE.Mesh(i, r);
          (b.position.x = 600),
            (b.position.y = -400),
            (b.position.z = 1e3),
            w.add(b);
          var z = new THREE.Mesh(i, a);
          (z.position.x = 800),
            (z.position.y = -400),
            (z.position.z = 1e3),
            w.add(z),
            h.meshes.push(z);
          var g = new THREE.Mesh(i, r);
          (g.position.x = 1e3),
            (g.position.y = -400),
            (g.position.z = 1e3),
            w.add(g);
          var S = new THREE.Mesh(n, p);
          (S.position.x = -3e3),
            (S.position.y = 0),
            (S.position.z = 4100),
            w.add(S);
          var T = new THREE.Mesh(n, p);
          (T.position.x = 0),
            (T.position.y = 0),
            (T.position.z = 4100),
            w.add(T);
          var C = new THREE.Mesh(n, p);
          (C.position.x = 3e3),
            (C.position.y = 0),
            (C.position.z = 4100),
            w.add(C);
          var G = new THREE.Mesh(n, p);
          (G.position.x = -1500),
            (G.position.y = 2500),
            (G.position.z = 4100),
            w.add(G);
          var P = new THREE.Mesh(n, p);
          (P.position.x = 1500),
            (P.position.y = 2500),
            (P.position.z = 4100),
            w.add(P);
          var L = new THREE.PointLight(16777215);
          (L.position.x = 0), (L.position.y = 0), (L.position.z = 0), w.add(L);
          var B = new THREE.SphereGeometry(400, 32, 16);
          (mirrorSphereCamera = new THREE.CubeCamera(0.1, 5e3, 512)),
            w.add(mirrorSphereCamera);
          var k = new THREE.MeshBasicMaterial({
            envMap: mirrorSphereCamera.renderTarget,
          });
          (mirrorSphere = new THREE.Mesh(B, k)).position.set(-300, -200, 500),
            (mirrorSphereCamera.position = mirrorSphere.position),
            w.add(mirrorSphere),
            h.meshes.push(mirrorSphere),
            h.meshes.push(mirrorSphereCamera);
          for (
            var A = 20,
              W = new THREE.Geometry(),
              Y = new THREE.ParticleBasicMaterial({
                color: 16737792,
                size: 50,
                blending: THREE.AdditiveBlending,
                transparent: !1,
              }),
              O = 0;
            O < A;
            O++
          ) {
            var R = 2e3 * Math.random() - 1e3,
              E = 250 * Math.random() - 800,
              H = 500 * Math.random() + 500,
              V = new THREE.Vector3(R, E, H);
            W.vertices.push(V);
          }
          var F = new THREE.ParticleSystem(W, Y);
          F.position.set(0, 0, 400),
            (F.sortParticles = !0),
            w.add(F),
            h.meshes.push(F),
            (A = 3e3),
            (W = new THREE.Geometry()),
            (Y = new THREE.ParticleBasicMaterial({
              color: 6737151,
              size: 10,
              blending: THREE.AdditiveBlending,
              transparent: !1,
            }));
          for (var O = 0; O < A; O++) {
            var R = 2e3 * Math.random() - 1e3,
              E = 250 * Math.random() - 150,
              H = 500 * Math.random() - 250,
              V = new THREE.Vector3(R, E, H);
            W.vertices.push(V);
          }
          var F = new THREE.ParticleSystem(W, Y);
          F.position.set(0, -600, 800),
            (F.sortParticles = !0),
            w.add(F),
            h.meshes.push(F),
            (x = new Date() * 1 - 1);
        })(),
        (function o() {
          e &&
            ((y = 1e3 / ((f = new Date()) - x)),
            (x = f),
            (a += y),
            (h.meshes[0].rotation.x += 0.005),
            (h.meshes[1].rotation.x -= 0.003),
            (h.meshes[2].rotation.x += 0.005),
            (h.meshes[3].rotation.x -= 0.003),
            (h.meshes[4].rotation.x += 0.005),
            (h.meshes[5].visible = !1),
            (h.meshes[5].position.x += 1),
            (h.meshes[6].position = h.meshes[5].position),
            h.meshes[6].updateCubeMap(c, w),
            (h.meshes[5].visible = !0),
            (h.meshes[7].rotation.x += 0.01),
            (h.meshes[7].rotation.x += 0.04),
            c.render(w, m),
            setTimeout(o, 0));
        })(),
        T(),
        setTimeout(W, 15e3))
      : Y();
  }
  function W() {
    G(),
      (g = Math.ceil(a / 100)),
      (e = !1),
      setTimeout(function () {
        O(), Y();
      }, 50);
  }
  function Y() {
    setTimeout(function () {
      $(".extrainfo").hide(),
        ($(".score").show().get(0).innerHTML =
          "<p>Canvas score - Test 1: " +
          M +
          " - Test 2: " +
          b +
          "</p>" +
          (Modernizr.webgl
            ? "<p>WebGL score - Test 1: " + z + " - Test 2: " + g + "</p>"
            : "<p>Your browser does not support WebGL</p>") +
          "<p>Total score: " +
          (M + b + z + g) +
          "</p>"),
        $(".starttest, .donate").show(),
        $(".pleasewait").hide(),
        (function e() {
          if (M + b + z + g > 0) {
            var o = JSON.stringify({
              serviceName: "bmark",
              methodName: "submitScore",
              parameters: [
                {
                  TotalScore: M + b + z + g,
                  Score1: M,
                  Score2: b,
                  Score3: z,
                  Score4: g,
                  OS: d,
                  Browser: p,
                },
              ],
            });
            try {
              $.post(
                "../amfphp/Amfphp/?contentType=application/json",
                o,
                function (e) {
                  if ((console.log(e), e && e.succes)) {
                    var o = e.totalTests["count(*)"],
                      s = e.worseTests["count(*)"],
                      i = e.totalTestsSameBrowserAndOS["count(*)"],
                      t = e.worseTestsSameBrowserAndOS["count(*)"],
                      n = -1,
                      r = -1;
                    0 != o && (n = (s / o) * 100),
                      0 != i && (r = (t / i) * 100);
                    var a = "<p>Your results compared to other users:</p>";
                    n >= 0
                      ? (a +=
                          "<p>You score better than " +
                          Math.round(n) +
                          "% of all users so far!</p>")
                      : (a +=
                          "<p>You are the first user! Thanks for that!</p>"),
                      r >= 0
                        ? (a +=
                            "<p>You score better than " +
                            Math.round(r) +
                            "% of the people who use the same browser and OS!</p>")
                        : (a +=
                            "<p>You are the first person to use this browser and OS combination!</p>"),
                      ($(".comparison").show().get(0).innerHTML = a);
                  }
                }
              );
            } catch (s) {}
          }
        })();
    }, 1e3);
  }
  function O() {
    window.clearInterval(_),
      c.clear(),
      (m = w = c = null),
      (h.meshes = []),
      (u = 0),
      (v = 0),
      setTimeout(function () {
        $(".renderer").hide().remove();
      }, 0);
  }
  function R() {
    var e,
      o,
      s,
      i,
      t,
      n,
      r = 50,
      a = 50,
      p = 50;
    (e = 500 - Math.floor(1e3 * Math.random())),
      (o = 500 - Math.floor(1e3 * Math.random())),
      (s = 500 - Math.floor(1e3 * Math.random())),
      (i = new THREE.CubeGeometry(50, 50, 50, 1, 1)),
      (t = new THREE.MeshBasicMaterial({
        color: Math.floor(16777215 * Math.random()),
        wireframe: !1,
      })),
      (n = new THREE.Mesh(i, t)),
      (n.position.x = e),
      (n.position.y = o),
      (n.position.z = s),
      w.add(n),
      h.meshes.push(n);
  }
  $(document).ready(function () {
    var e, o;
    $(".starttest").click(S),
      (e = "unknown"),
      (o = $.browser).webkit && (e = "webkit"),
      window.chrome && (e = "chrome"),
      o.msie && (e = "msie"),
      o.mozilla && (e = "firefox"),
      window.opera && (e = "opera"),
      (p = e),
      (d = navigator.platform);
  });
})();
