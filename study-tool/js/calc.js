/**
 * calc.js
 * 計算ドリルの問題を自動生成するモジュール。
 * 答えは入力式（数値）。
 */
(function (global) {
  "use strict";

  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // レベルごとの数値レンジ。op によって使うレンジを変える。
  var RANGES = {
    easy:   { add: [1, 20],  sub: [1, 20],  mul: [1, 9],   divQ: [1, 9],  divD: [2, 9] },
    normal: { add: [10, 99], sub: [10, 99], mul: [2, 12],  divQ: [2, 12], divD: [2, 12] },
    hard:   { add: [50, 999], sub: [50, 999], mul: [11, 99], divQ: [11, 50], divD: [3, 19] },
  };

  var OP_LABEL = { add: "たし算", sub: "ひき算", mul: "かけ算", div: "わり算", mix: "ミックス" };
  var LEVEL_LABEL = { easy: "やさしい", normal: "ふつう", hard: "むずかしい" };

  function makeOne(op, level) {
    var r = RANGES[level];
    var a, b, q, ans, sym;

    if (op === "add") {
      a = randInt(r.add[0], r.add[1]);
      b = randInt(r.add[0], r.add[1]);
      ans = a + b; sym = "＋";
      q = a + " " + sym + " " + b;
    } else if (op === "sub") {
      a = randInt(r.sub[0], r.sub[1]);
      b = randInt(r.sub[0], r.sub[1]);
      if (b > a) { var t = a; a = b; b = t; } // 答えが負にならないよう入れ替え
      ans = a - b; sym = "−";
      q = a + " " + sym + " " + b;
    } else if (op === "mul") {
      a = randInt(r.mul[0], r.mul[1]);
      b = randInt(r.mul[0], r.mul[1]);
      ans = a * b; sym = "×";
      q = a + " " + sym + " " + b;
    } else if (op === "div") {
      // わり切れる問題のみ生成（商×除数＝被除数）
      var quotient = randInt(r.divQ[0], r.divQ[1]);
      var divisor = randInt(r.divD[0], r.divD[1]);
      a = quotient * divisor; b = divisor;
      ans = quotient; sym = "÷";
      q = a + " " + sym + " " + b;
    } else {
      // mix: add/sub/mul/div からランダムに1つ
      var ops = ["add", "sub", "mul", "div"];
      return makeOne(ops[randInt(0, ops.length - 1)], level);
    }

    return { question: q + " = ?", answer: ans, accepts: "number" };
  }

  /**
   * 問題セットを生成する。
   * @returns {{ questions: Array, meta: object }}
   */
  function build(op, level, count) {
    var questions = [];
    for (var i = 0; i < count; i++) {
      questions.push(makeOne(op, level));
    }
    return {
      questions: questions,
      meta: {
        mode: "calc",
        groupId: "calc:" + op + ":" + level,
        label: "計算ドリル / " + (OP_LABEL[op] || op) + " / " + (LEVEL_LABEL[level] || level),
        op: op,
        level: level,
      },
    };
  }

  global.CalcDrill = { build: build };
})(window);
