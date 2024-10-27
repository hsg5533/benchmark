!(function () {
  $("#velocimetro").speedometer({
    maxVal: 100,
    dangerLevel: 90,
    gagueLabel: "<small>CPU Usage</small>",
  }),
    d(0);
  let o = 1e4,
    t = navigator.hardwareConcurrency,
    r = document.querySelector(".progress-bar > div");
  $(".detected span").html(t || "No");
  let n = [],
    s = [],
    i;
  function l() {
    let e = 0;
    return (
      s.forEach((o) => {
        e += o;
      }),
      e
    );
  }
  function a() {
    let e = new Worker("js/thread.js");
    n.push(e);
    let o = s.length;
    s.push(0),
      (e.onmessage = function () {
        s[o]++;
      });
  }
  function c() {
    n[0].terminate(), n.shift();
  }
  function d(e) {
    $("#velocimetro").val(e), $("#velocimetro").trigger("change");
  }
  $("#start, .restart").on("click", function () {
    (s = []),
      $(".restart,form,.start,#thanks").hide(),
      $(".progress-bar").addClass("visible"),
      $("#single-core .score, #multi-core .score").html(""),
      $("#single-core .loading,#multi-core .loading, .scores").show(),
      a(),
      d(Math.floor(100 / t + 8)),
      (function e(o) {
        setTimeout(function () {
          var n, m;
          if (((r.innerHTML = `${o}%`), 37 == o)) {
            (i = n = s[0]),
              $("#single-core .loading").hide(),
              $("#single-core .score").html(i);
            for (let h = 1; h < t; h++) a();
            d(100);
          }
          if (o < 100) e(++o);
          else {
            $("form").show(),
              $(".restart").css("display", "inline-block"),
              $(".progress-bar").removeClass("visible");
            for (let u = 0; u < t; u++) c();
            d(0),
              (m = l()),
              $("#multi-core .loading").hide(),
              $("#multi-core .score").html(m);
          }
        }, 200);
      })(0);
  }),
    $(".show-scores").click(function () {
      $(".table-container").addClass("modal");
    }),
    $(".table-container").click(function () {
      $(this).removeClass("modal");
    }),
    $(".table").click(function (e) {
      e.stopPropagation();
    }),
    $("#btn-save-score").click(function (o) {
      let r = $("#nombre").val().trim(),
        n = $("#cpu").val().trim();
      "" != r &&
        "" != n &&
        (o.preventDefault(),
        fetch("score", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre: r,
            cpu: n,
            cores: t,
            mono: i,
            multi: l(),
          }),
        })
          .then((e) => e.json())
          .then((o) => {
            "ok" == o.status
              ? ($("form").hide(), $("#thanks").show(), e(o.id))
              : alert("Please try again");
          }));
    });
})();
