$.fn.speedometer = function (e) {
  var t = this;
  if (
    ((this.defaultProperty = {
      maxVal: 180,
      divFact: 10,
      dangerLevel: 120,
      initDeg: -45,
      maxDeg: 270,
      edgeRadius: 150,
      speedNobeH: 4,
      speedoNobeW: 95,
      speedoNobeL: 13,
      indicatorRadius: 125,
      indicatorNumbRadius: 90,
      speedPositionTxtWH: 80,
      nobW: 20,
      nobH: 4,
      numbW: 30,
      numbH: 16,
      midNobW: 10,
      midNobH: 3,
      noOfSmallDiv: 2,
      eventListenerType: "change",
      multiplier: 1,
      gagueLabel: "km/h",
    }),
    "object" == typeof e)
  )
    for (var r in e) this.defaultProperty[r] = e[r];
  var i,
    a,
    o,
    d,
    s,
    p = this.defaultProperty.maxVal / this.defaultProperty.divFact,
    n = this.defaultProperty.maxDeg / p,
    l = 2 * this.defaultProperty.edgeRadius,
    h = this.defaultProperty.edgeRadius - this.defaultProperty.speedNobeH / 2,
    f = this.defaultProperty.initDeg,
    u =
      this.defaultProperty.edgeRadius -
      this.defaultProperty.speedPositionTxtWH / 2,
    m = "";
  return (
    (this.setCssProperty = function () {
      var e = [
        "<style>",
        "#" + this.parentElemId + " .envelope{",
        "width  :" + l + "px;",
        "height :" + l + "px;",
        "}",
        "#" + this.parentElemId + " .speedNobe{",
        "height            :" + this.defaultProperty.speedNobeH + "px;",
        "top               :" + h + "px;",
        "transform         :rotate(" + f + "deg);",
        "-webkit-transform :rotate(" + f + "deg);",
        "-moz-transform    :rotate(" + f + "deg);",
        "-o-transform      :rotate(" + f + "deg);",
        "}",
        "#" + this.parentElemId + " .speedPosition{",
        "width  :" + this.defaultProperty.speedPositionTxtWH + "px;",
        "height :" + this.defaultProperty.speedPositionTxtWH + "px;",
        "top  :" + u + "px;",
        "left :" + u + "px;",
        "}",
        "#" + this.parentElemId + " .speedNobe div{",
        "width  :" + this.defaultProperty.speedoNobeW + "px;",
        "left :" + this.defaultProperty.speedoNobeL + "px;",
        "}",
        "#" + this.parentElemId + " .nob{",
        "width  :" + this.defaultProperty.nobW + "px;",
        "height :" + this.defaultProperty.nobH + "px;",
        "}",
        "#" + this.parentElemId + " .numb{",
        "width  :" + this.defaultProperty.numbW + "px;",
        "height :" + this.defaultProperty.numbH + "px;",
        "}",
        "#" + this.parentElemId + " .midNob{",
        "width  :" + this.defaultProperty.midNobW + "px;",
        "height :" + this.defaultProperty.midNobH + "px;",
        "}",
        "</style>",
      ].join("");
      this.parentElem.append(e);
    }),
    (this.creatHtmlsElecments = function () {
      (this.parentElemId = "speedometerWraper-" + $(this).attr("id")),
        $(this).wrap('<div id="' + this.parentElemId + '">'),
        (this.parentElem = $(this).parent()),
        this.setCssProperty(),
        this.createIndicators();
    }),
    (this.createIndicators = function () {
      for (var e = 0; e <= p; e++) {
        var t = this.defaultProperty.initDeg + e * n,
          r = e * this.defaultProperty.divFact,
          i = "";
        r >= this.defaultProperty.dangerLevel && (i = "danger");
        var l = this.defaultProperty.indicatorRadius * Math.cos(0.01746 * t),
          h = this.defaultProperty.indicatorRadius * Math.sin(0.01746 * t),
          f = this.defaultProperty.indicatorNumbRadius * Math.cos(0.01746 * t),
          u = this.defaultProperty.indicatorNumbRadius * Math.sin(0.01746 * t);
        if (e % this.defaultProperty.noOfSmallDiv == 0) {
          (a = this.defaultProperty.edgeRadius - h - 2),
            (o = this.defaultProperty.edgeRadius - l - 10);
          var P = [
            "transform         :rotate(" + t + "deg)",
            "-webkit-transform :rotate(" + t + "deg)",
            "-o-transform      :rotate(" + t + "deg)",
            "-moz-transform    :rotate(" + t + "deg)",
          ].join("");
          (m +=
            '<div class="nob ' +
            i +
            '" style="left:' +
            o +
            "px;top:" +
            a +
            "px;" +
            P +
            '"></div>'),
            (d =
              this.defaultProperty.edgeRadius -
              u -
              this.defaultProperty.numbW / 2),
            (m +=
              '<div class="numb' +
              i +
              '"style="left:' +
              (s =
                this.defaultProperty.edgeRadius -
                f -
                this.defaultProperty.numbH / 2) +
              "px;top:" +
              d +
              'px;"></div>');
        } else {
          (a =
            this.defaultProperty.edgeRadius -
            h -
            this.defaultProperty.midNobH / 2),
            (o =
              this.defaultProperty.edgeRadius -
              l -
              this.defaultProperty.midNobW / 2);
          var P = [
            "transform         :rotate(" + t + "deg)",
            "-webkit-transform :rotate(" + t + "deg)",
            "-o-transform      :rotate(" + t + "deg)",
            "-moz-transform    :rotate(" + t + "deg)",
          ].join(";");
          (m +=
            '<div class="nob ' +
            i +
            'midNob" style="left:' +
            o +
            "px;top:" +
            a +
            "px;" +
            P +
            '"></div>'),
            (m += '<div class="numb"></div>');
        }
      }
      this.parentElem.append('<div class="envelope">'),
        this.parentElem
          .find(".envelope")
          .append(
            '<div class="speedNobe"><div></div></div><div class="speedPosition"></div>' +
              m
          );
    }),
    (this.changePosition = function () {
      var e = $(this).val();
      e > t.defaultProperty.maxVal && (e = t.defaultProperty.maxVal),
        (e < 0 || isNaN(e)) && (e = 0),
        (i =
          (t.defaultProperty.maxDeg / t.defaultProperty.maxVal) * e +
          t.defaultProperty.initDeg),
        t.parentElem
          .find(".speedNobe")
          .css({
            "-webkit-transform": "rotate(" + i + "deg)",
            "-webkit-transform": "rotate(" + i + "deg)",
            "-moz-transform": "rotate(" + i + "deg)",
            "-o-transform": "rotate(" + i + "deg)",
          });
      var r = e * t.defaultProperty.multiplier;
      t.parentElem
        .find(".speedPosition")
        .html(
          "<strong>" + r + "%</strong><br />" + t.defaultProperty.gagueLabel
        ),
        t.parentElem
          .find(".envelope .nob,.envelope .numb")
          .removeClass("bright");
      for (var a = 0; a <= p; a++)
        if (e >= a * t.defaultProperty.divFact)
          t.parentElem.find(".envelope .nob").eq(a).addClass("bright"),
            t.parentElem.find(".envelope .numb").eq(a).addClass("bright");
        else break;
    }),
    this.creatHtmlsElecments(),
    $(this).bind(this.defaultProperty.eventListenerType, this.changePosition),
    this
  );
};
