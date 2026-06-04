/**
 * math.js
 * 数学の小テスト。単元 → 種類（解法タイプ）の階層で問題を内蔵し、4択 / 8択 を生成する。
 * 連立方程式では問題文（連立式）→ 答え（x, y の組）形式。
 *
 * ★誤答選択肢について（理科・社会と同じ仕組み）
 *   各問題は任意で d:[...]（その問題で「間違いやすい」誤答候補のプール）を持てる。
 *   出題時はまず d からランダムに選び、足りない分だけ同種類→同単元→全体の答えで補う。
 *
 *   データは data/math_source.csv から取り込み（学年=単元, 範囲=種類, 問題, 答え, 誤答候補）。
 */
(function (global) {
  "use strict";

  /* AUTO-GENERATED:math — data/math_source.csv から tools/build-data.js が生成。ここを直接編集せず CSV を編集して取り込む */
  var GRADES = {
    gb8pn85: {
      label: "連立方程式",
      sets: {
        selkzw: {
          label: "代入法",
          items: [
            { q: "x = 3y - 7, -2x - y = -14", a: "x=5, y=4", d: ["x=-5, y=4", "x=5, y=-4", "x=-5, y=-4", "x=4, y=5"] },
            { q: "x = -y + 2, -2x - y = -8", a: "x=6, y=-4", d: ["x=-6, y=-4", "x=6, y=4", "x=-6, y=4", "x=-4, y=6"] },
            { q: "x = 3y + 3, -x - 3y = 9", a: "x=-3, y=-2", d: ["x=3, y=-2", "x=-3, y=2", "x=3, y=2", "x=-2, y=-3"] },
            { q: "y = -x - 2, x - 2y = -5", a: "x=-3, y=1", d: ["x=3, y=1", "x=-3, y=-1", "x=3, y=-1", "x=1, y=-3"] },
            { q: "y = -3x - 6, -4x + y = -6", a: "x=0, y=-6", d: ["x=0, y=6", "x=-6, y=0", "x=1, y=-7", "x=-1, y=-5"] },
            { q: "y = -2x + 7, 3x - 3y = 6", a: "x=3, y=1", d: ["x=-3, y=1", "x=3, y=-1", "x=-3, y=-1", "x=1, y=3"] },
            { q: "x = 2y + 3, -3x - y = 12", a: "x=-3, y=-3", d: ["x=3, y=-3", "x=-3, y=3", "x=3, y=3", "x=-2, y=-4"] },
            { q: "x = -2y, 4x + y = -14", a: "x=-4, y=2", d: ["x=4, y=2", "x=-4, y=-2", "x=4, y=-2", "x=2, y=-4"] },
            { q: "x = -2y - 2, 4x + 2y = -20", a: "x=-6, y=2", d: ["x=6, y=2", "x=-6, y=-2", "x=6, y=-2", "x=2, y=-6"] },
            { q: "y = -2x + 4, -x + y = -5", a: "x=3, y=-2", d: ["x=-3, y=-2", "x=3, y=2", "x=-3, y=2", "x=-2, y=3"] },
            { q: "y = 2x - 6, 4x + 3y = 2", a: "x=2, y=-2", d: ["x=-2, y=-2", "x=2, y=2", "x=-2, y=2", "x=3, y=-3"] },
            { q: "y = -3x + 13, 2x + y = 9", a: "x=4, y=1", d: ["x=-4, y=1", "x=4, y=-1", "x=-4, y=-1", "x=1, y=4"] },
            { q: "x = 3y - 10, 3x - 2y = -16", a: "x=-4, y=2", d: ["x=4, y=2", "x=-4, y=-2", "x=4, y=-2", "x=2, y=-4"] },
            { q: "y = -2x + 3, 3x + 3y = 12", a: "x=-1, y=5", d: ["x=1, y=5", "x=-1, y=-5", "x=1, y=-5", "x=5, y=-1"] },
            { q: "y = -x - 1, x - 4y = 9", a: "x=1, y=-2", d: ["x=-1, y=-2", "x=1, y=2", "x=-1, y=2", "x=-2, y=1"] },
            { q: "x = 2y + 8, 4x - y = -3", a: "x=-2, y=-5", d: ["x=2, y=-5", "x=-2, y=5", "x=2, y=5", "x=-5, y=-2"] },
            { q: "y = -3x - 21, -x - y = 11", a: "x=-5, y=-6", d: ["x=5, y=-6", "x=-5, y=6", "x=5, y=6", "x=-6, y=-5"] },
            { q: "y = 3x - 9, -2x + 4y = -26", a: "x=1, y=-6", d: ["x=-1, y=-6", "x=1, y=6", "x=-1, y=6", "x=-6, y=1"] },
            { q: "y = -3x - 16, -x - y = 8", a: "x=-4, y=-4", d: ["x=4, y=-4", "x=-4, y=4", "x=4, y=4", "x=-3, y=-5"] },
            { q: "y = -x - 4, -3x + y = 8", a: "x=-3, y=-1", d: ["x=3, y=-1", "x=-3, y=1", "x=3, y=1", "x=-1, y=-3"] },
          ],
        },
        sfa6fn: {
          label: "加減法",
          items: [
            { q: "3x - 4y = 12, x - y = 4", a: "x=4, y=0", d: ["x=-4, y=0", "x=0, y=4", "x=5, y=-1", "x=3, y=1"] },
            { q: "4x + y = 22, -3x + 3y = -9", a: "x=5, y=2", d: ["x=-5, y=2", "x=5, y=-2", "x=-5, y=-2", "x=2, y=5"] },
            { q: "-3x - 3y = -3, 3x + 4y = 8", a: "x=-4, y=5", d: ["x=4, y=5", "x=-4, y=-5", "x=4, y=-5", "x=5, y=-4"] },
            { q: "x + 4y = -15, -3x + 3y = -15", a: "x=1, y=-4", d: ["x=-1, y=-4", "x=1, y=4", "x=-1, y=4", "x=-4, y=1"] },
            { q: "4x + y = -18, -3x + 4y = 23", a: "x=-5, y=2", d: ["x=5, y=2", "x=-5, y=-2", "x=5, y=-2", "x=2, y=-5"] },
            { q: "-3x - 2y = -4, -2x - 3y = 4", a: "x=4, y=-4", d: ["x=-4, y=-4", "x=4, y=4", "x=-4, y=4", "x=5, y=-5"] },
            { q: "-x + 4y = 15, x - y = -3", a: "x=1, y=4", d: ["x=-1, y=4", "x=1, y=-4", "x=-1, y=-4", "x=4, y=1"] },
            { q: "-4x - 4y = 32, x - 3y = 4", a: "x=-5, y=-3", d: ["x=5, y=-3", "x=-5, y=3", "x=5, y=3", "x=-3, y=-5"] },
            { q: "2x - y = -10, -4x - 4y = 8", a: "x=-4, y=2", d: ["x=4, y=2", "x=-4, y=-2", "x=4, y=-2", "x=2, y=-4"] },
            { q: "x + 2y = 8, 4x + y = 4", a: "x=0, y=4", d: ["x=0, y=-4", "x=4, y=0", "x=1, y=3", "x=-1, y=5"] },
            { q: "4x - y = -20, 4x - 4y = -32", a: "x=-4, y=4", d: ["x=4, y=4", "x=-4, y=-4", "x=4, y=-4", "x=-3, y=3"] },
            { q: "3x - 3y = -6, -x - 3y = 14", a: "x=-5, y=-3", d: ["x=5, y=-3", "x=-5, y=3", "x=5, y=3", "x=-3, y=-5"] },
            { q: "-x + y = 1, 2x - 3y = 1", a: "x=-4, y=-3", d: ["x=4, y=-3", "x=-4, y=3", "x=4, y=3", "x=-3, y=-4"] },
            { q: "-x + y = -7, -2x - y = -2", a: "x=3, y=-4", d: ["x=-3, y=-4", "x=3, y=4", "x=-3, y=4", "x=-4, y=3"] },
            { q: "-4x - 3y = -32, x - 4y = -11", a: "x=5, y=4", d: ["x=-5, y=4", "x=5, y=-4", "x=-5, y=-4", "x=4, y=5"] },
            { q: "-3x + 3y = 9, -4x - y = -18", a: "x=3, y=6", d: ["x=-3, y=6", "x=3, y=-6", "x=-3, y=-6", "x=6, y=3"] },
            { q: "-x - 3y = 8, -4x - 3y = -4", a: "x=4, y=-4", d: ["x=-4, y=-4", "x=4, y=4", "x=-4, y=4", "x=5, y=-5"] },
            { q: "3x + y = -3, 3x + 2y = -9", a: "x=1, y=-6", d: ["x=-1, y=-6", "x=1, y=6", "x=-1, y=6", "x=-6, y=1"] },
            { q: "-4x + 2y = -16, -3x + 3y = -9", a: "x=5, y=2", d: ["x=-5, y=2", "x=5, y=-2", "x=-5, y=-2", "x=2, y=5"] },
            { q: "-2x + y = 2, 4x + 3y = 26", a: "x=2, y=6", d: ["x=-2, y=6", "x=2, y=-6", "x=-2, y=-6", "x=6, y=2"] },
          ],
        },
        s1jftly4: {
          label: "かっこを含む式",
          items: [
            { q: "3(x + 2) = 2y - 16, 4x + 2y = -6", a: "x=-4, y=5", d: ["x=4, y=5", "x=-4, y=-5", "x=4, y=-5", "x=5, y=-4"] },
            { q: "2(x - 3) = -2y - 8, -3x + 2y = 18", a: "x=-4, y=3", d: ["x=4, y=3", "x=-4, y=-3", "x=4, y=-3", "x=3, y=-4"] },
            { q: "3(x + 3) = 2y + 22, 2x - y = 9", a: "x=5, y=1", d: ["x=-5, y=1", "x=5, y=-1", "x=-5, y=-1", "x=1, y=5"] },
            { q: "4(x + 3) = 2y - 10, -4x - 3y = 7", a: "x=-4, y=3", d: ["x=4, y=3", "x=-4, y=-3", "x=4, y=-3", "x=3, y=-4"] },
            { q: "4(x - 3) = 3y - 41, x - 3y = -14", a: "x=-5, y=3", d: ["x=5, y=3", "x=-5, y=-3", "x=5, y=-3", "x=3, y=-5"] },
            { q: "2(x - 2) = -3y - 7, x + 4y = -4", a: "x=0, y=-1", d: ["x=0, y=1", "x=-1, y=0", "x=1, y=-2", "x=2, y=-1"] },
            { q: "3(x + 1) = -2y - 9, 4x - y = -5", a: "x=-2, y=-3", d: ["x=2, y=-3", "x=-2, y=3", "x=2, y=3", "x=-3, y=-2"] },
            { q: "3(x + 1) = -2y - 5, 3x + 3y = -6", a: "x=-4, y=2", d: ["x=4, y=2", "x=-4, y=-2", "x=4, y=-2", "x=2, y=-4"] },
            { q: "4(x - 3) = 3y - 4, -4x - y = -8", a: "x=2, y=0", d: ["x=-2, y=0", "x=0, y=2", "x=3, y=-1", "x=1, y=1"] },
            { q: "2(x + 1) = 2y + 8, -x - y = -3", a: "x=3, y=0", d: ["x=-3, y=0", "x=0, y=3", "x=4, y=-1", "x=2, y=1"] },
            { q: "3(x - 1) = 2y - 15, 4x + y = -16", a: "x=-4, y=0", d: ["x=4, y=0", "x=0, y=-4", "x=-3, y=-1", "x=-5, y=1"] },
            { q: "3(x + 3) = -2y + 16, -4x - 4y = -16", a: "x=-1, y=5", d: ["x=1, y=5", "x=-1, y=-5", "x=1, y=-5", "x=5, y=-1"] },
            { q: "3(x + 2) = 2y + 17, 4x + 3y = 9", a: "x=3, y=-1", d: ["x=-3, y=-1", "x=3, y=1", "x=-3, y=1", "x=-1, y=3"] },
            { q: "3(x - 2) = -3y + 12, -x + 4y = 9", a: "x=3, y=3", d: ["x=-3, y=3", "x=3, y=-3", "x=-3, y=-3", "x=4, y=2"] },
            { q: "2(x - 3) = -3y - 19, -4x - y = 1", a: "x=1, y=-5", d: ["x=-1, y=-5", "x=1, y=5", "x=-1, y=5", "x=-5, y=1"] },
            { q: "2(x - 2) = 2y - 8, 4x + 4y = 8", a: "x=0, y=2", d: ["x=0, y=-2", "x=2, y=0", "x=1, y=1", "x=-1, y=3"] },
            { q: "2(x - 2) = 3y - 14, -x + y = 3", a: "x=1, y=4", d: ["x=-1, y=4", "x=1, y=-4", "x=-1, y=-4", "x=4, y=1"] },
            { q: "2(x - 1) = -2y - 8, -3x + 2y = -11", a: "x=1, y=-4", d: ["x=-1, y=-4", "x=1, y=4", "x=-1, y=4", "x=-4, y=1"] },
            { q: "3(x + 2) = 2y - 4, 3x - 3y = -9", a: "x=-4, y=-1", d: ["x=4, y=-1", "x=-4, y=1", "x=4, y=1", "x=-1, y=-4"] },
            { q: "4(x + 1) = 2y + 28, -x - 2y = -1", a: "x=5, y=-2", d: ["x=-5, y=-2", "x=5, y=2", "x=-5, y=2", "x=-2, y=5"] },
          ],
        },
        syy3wb7: {
          label: "小数をふくむ式",
          items: [
            { q: "0.2x + 0.4y = -1.4, -x + 3y = 2", a: "x=-5, y=-1", d: ["x=5, y=-1", "x=-5, y=1", "x=5, y=1", "x=-1, y=-5"] },
            { q: "0.3x + 0.3y = 0.3, 3x - 3y = -21", a: "x=-3, y=4", d: ["x=3, y=4", "x=-3, y=-4", "x=3, y=-4", "x=4, y=-3"] },
            { q: "0.6x + 0.6y = 0, -4x - y = 15", a: "x=-5, y=5", d: ["x=5, y=5", "x=-5, y=-5", "x=5, y=-5", "x=-4, y=4"] },
            { q: "-0.1x - 0.2y = -0.3, x - 3y = -17", a: "x=-5, y=4", d: ["x=5, y=4", "x=-5, y=-4", "x=5, y=-4", "x=4, y=-5"] },
            { q: "0.5x + 0.5y = -2.5, 2x - 4y = -10", a: "x=-5, y=0", d: ["x=5, y=0", "x=0, y=-5", "x=-4, y=-1", "x=-6, y=1"] },
            { q: "0.4x - 0.1y = -0.4, -x - 4y = 1", a: "x=-1, y=0", d: ["x=1, y=0", "x=0, y=-1", "x=-2, y=1", "x=-1, y=2"] },
            { q: "0.4x - 0.6y = -2.8, -4x + y = 8", a: "x=-1, y=4", d: ["x=1, y=4", "x=-1, y=-4", "x=1, y=-4", "x=4, y=-1"] },
            { q: "-0.6x - 0.3y = 0.6, 3x - 2y = -3", a: "x=-1, y=0", d: ["x=1, y=0", "x=0, y=-1", "x=-2, y=1", "x=-1, y=2"] },
            { q: "0.4x + 0.2y = 0.8, -3x + 4y = 5", a: "x=1, y=2", d: ["x=-1, y=2", "x=1, y=-2", "x=-1, y=-2", "x=2, y=1"] },
            { q: "0.2x + 0.4y = 0.6, -x + 2y = -3", a: "x=3, y=0", d: ["x=-3, y=0", "x=0, y=3", "x=4, y=-1", "x=2, y=1"] },
            { q: "0.4x + 0.1y = 2.1, -4x + 3y = -1", a: "x=4, y=5", d: ["x=-4, y=5", "x=4, y=-5", "x=-4, y=-5", "x=5, y=4"] },
            { q: "-0.5x - 0.1y = -0.8, -3x - 4y = 2", a: "x=2, y=-2", d: ["x=-2, y=-2", "x=2, y=2", "x=-2, y=2", "x=3, y=-3"] },
            { q: "0.1x - 0.5y = -1.7, 3x + y = -3", a: "x=-2, y=3", d: ["x=2, y=3", "x=-2, y=-3", "x=2, y=-3", "x=3, y=-2"] },
            { q: "-0.1x - 0.6y = 0.3, -3x - 2y = -7", a: "x=3, y=-1", d: ["x=-3, y=-1", "x=3, y=1", "x=-3, y=1", "x=-1, y=3"] },
            { q: "-0.2x + 0.5y = -0.7, x - 2y = 2", a: "x=-4, y=-3", d: ["x=4, y=-3", "x=-4, y=3", "x=4, y=3", "x=-3, y=-4"] },
            { q: "0.1x - 0.5y = -0.4, 4x + 2y = 6", a: "x=1, y=1", d: ["x=-1, y=1", "x=1, y=-1", "x=-1, y=-1", "x=2, y=0"] },
            { q: "-0.3x - 0.1y = 0.4, -x + 2y = -8", a: "x=0, y=-4", d: ["x=0, y=4", "x=-4, y=0", "x=1, y=-5", "x=-1, y=-3"] },
            { q: "-0.2x - 0.5y = 0.7, 3x - 3y = 0", a: "x=-1, y=-1", d: ["x=1, y=-1", "x=-1, y=1", "x=1, y=1", "x=0, y=-2"] },
            { q: "0.5x + 0.3y = 1.4, -x - 2y = -7", a: "x=1, y=3", d: ["x=-1, y=3", "x=1, y=-3", "x=-1, y=-3", "x=3, y=1"] },
            { q: "-0.4x - 0.1y = -0.1, -3x + y = 8", a: "x=-1, y=5", d: ["x=1, y=5", "x=-1, y=-5", "x=1, y=-5", "x=5, y=-1"] },
          ],
        },
        s19dlibu: {
          label: "分数をふくむ式",
          items: [
            { q: "-x/2 - y/3 = -19/6, -2x + 2y = 4", a: "x=3, y=5", d: ["x=-3, y=5", "x=3, y=-5", "x=-3, y=-5", "x=5, y=3"] },
            { q: "x/4 - y/2 = -1, -x - y = -11", a: "x=6, y=5", d: ["x=-6, y=5", "x=6, y=-5", "x=-6, y=-5", "x=5, y=6"] },
            { q: "x/3 - y/3 = 10/3, -2x - 4y = 10", a: "x=5, y=-5", d: ["x=-5, y=-5", "x=5, y=5", "x=-5, y=5", "x=6, y=-6"] },
            { q: "-x/3 - y/2 = -1/2, 4x - 4y = -4", a: "x=0, y=1", d: ["x=0, y=-1", "x=1, y=0", "x=-1, y=2", "x=2, y=1"] },
            { q: "x/6 - y/3 = 2, 4x - y = 6", a: "x=0, y=-6", d: ["x=0, y=6", "x=-6, y=0", "x=1, y=-7", "x=-1, y=-5"] },
            { q: "x/4 - y/4 = -1, 2x - 3y = -11", a: "x=-1, y=3", d: ["x=1, y=3", "x=-1, y=-3", "x=1, y=-3", "x=3, y=-1"] },
            { q: "-x/3 - y/2 = -1, 2x + y = -6", a: "x=-6, y=6", d: ["x=6, y=6", "x=-6, y=-6", "x=6, y=-6", "x=-5, y=5"] },
            { q: "x/2 + y/2 = 9/2, x - 2y = -9", a: "x=3, y=6", d: ["x=-3, y=6", "x=3, y=-6", "x=-3, y=-6", "x=6, y=3"] },
            { q: "x/4 - y/2 = 4, -2x - y = -2", a: "x=4, y=-6", d: ["x=-4, y=-6", "x=4, y=6", "x=-4, y=6", "x=-6, y=4"] },
            { q: "-x/3 + y/2 = 1/3, -2x - 4y = 16", a: "x=-4, y=-2", d: ["x=4, y=-2", "x=-4, y=2", "x=4, y=2", "x=-2, y=-4"] },
            { q: "-x/3 + y/4 = 11/12, x + y = -8", a: "x=-5, y=-3", d: ["x=5, y=-3", "x=-5, y=3", "x=5, y=3", "x=-3, y=-5"] },
            { q: "-x/4 + y/3 = -5/3, -2x + 4y = -16", a: "x=4, y=-2", d: ["x=-4, y=-2", "x=4, y=2", "x=-4, y=2", "x=-2, y=4"] },
            { q: "-x/3 - y/3 = 2/3, 4x + 3y = -10", a: "x=-4, y=2", d: ["x=4, y=2", "x=-4, y=-2", "x=4, y=-2", "x=2, y=-4"] },
            { q: "-x/6 + y/3 = 1/3, -4x + 2y = -16", a: "x=6, y=4", d: ["x=-6, y=4", "x=6, y=-4", "x=-6, y=-4", "x=4, y=6"] },
            { q: "x/3 - y/6 = -3/2, -2x - 2y = 18", a: "x=-6, y=-3", d: ["x=6, y=-3", "x=-6, y=3", "x=6, y=3", "x=-3, y=-6"] },
            { q: "-x/4 - y/3 = -5/4, 3x + 3y = 12", a: "x=1, y=3", d: ["x=-1, y=3", "x=1, y=-3", "x=-1, y=-3", "x=3, y=1"] },
            { q: "-x/6 - y/2 = 11/6, -3x - 2y = -2", a: "x=4, y=-5", d: ["x=-4, y=-5", "x=4, y=5", "x=-4, y=5", "x=-5, y=4"] },
            { q: "x/2 + y/4 = -3/2, -x + 4y = -24", a: "x=0, y=-6", d: ["x=0, y=6", "x=-6, y=0", "x=1, y=-7", "x=-1, y=-5"] },
            { q: "x/6 + y/6 = -5/3, 3x + 4y = -36", a: "x=-4, y=-6", d: ["x=4, y=-6", "x=-4, y=6", "x=4, y=6", "x=-6, y=-4"] },
            { q: "x/6 - y/4 = -17/12, -3x - 4y = -17", a: "x=-1, y=5", d: ["x=1, y=5", "x=-1, y=-5", "x=1, y=-5", "x=5, y=-1"] },
          ],
        },
        s1lo6g7j: {
          label: "A＝B＝C の形",
          items: [
            { q: "-3x - 3y - 30 = 3x - 3y = 0", a: "x=-5, y=-5", d: ["x=5, y=-5", "x=-5, y=5", "x=5, y=5", "x=-4, y=-6"] },
            { q: "x - 2y + 2 = x + y - 1 = 5", a: "x=5, y=1", d: ["x=-5, y=1", "x=5, y=-1", "x=-5, y=-1", "x=1, y=5"] },
            { q: "-3x + 10 = -2x + y + 3 = 1", a: "x=3, y=4", d: ["x=-3, y=4", "x=3, y=-4", "x=-3, y=-4", "x=4, y=3"] },
            { q: "-3x + y + 14 = -3x + 3y + 18 = 3", a: "x=3, y=-2", d: ["x=-3, y=-2", "x=3, y=2", "x=-3, y=2", "x=-2, y=3"] },
            { q: "2x - 3y + 13 = -3x - y - 7 = -6", a: "x=-2, y=5", d: ["x=2, y=5", "x=-2, y=-5", "x=2, y=-5", "x=5, y=-2"] },
            { q: "2x - 2y + 12 = -2x - y - 4 = -2", a: "x=-3, y=4", d: ["x=3, y=4", "x=-3, y=-4", "x=3, y=-4", "x=4, y=-3"] },
            { q: "x + 2y + 1 = -2x + 2y + 7 = -5", a: "x=2, y=-4", d: ["x=-2, y=-4", "x=2, y=4", "x=-2, y=4", "x=-4, y=2"] },
            { q: "-3x - y + 6 = x - 2y - 17 = -6", a: "x=5, y=-3", d: ["x=-5, y=-3", "x=5, y=3", "x=-5, y=3", "x=-3, y=5"] },
            { q: "-2x - 2y + 8 = 3x - 2y - 12 = 6", a: "x=4, y=-3", d: ["x=-4, y=-3", "x=4, y=3", "x=-4, y=3", "x=-3, y=4"] },
            { q: "-2x + 3y - 3 = -x + y - 3 = -2", a: "x=-2, y=-1", d: ["x=2, y=-1", "x=-2, y=1", "x=2, y=1", "x=-1, y=-2"] },
            { q: "-3x - 3y - 17 = 2x + 3y + 12 = -2", a: "x=-1, y=-4", d: ["x=1, y=-4", "x=-1, y=4", "x=1, y=4", "x=-4, y=-1"] },
            { q: "x - 2y - 14 = x - y - 9 = -3", a: "x=1, y=-5", d: ["x=-1, y=-5", "x=1, y=5", "x=-1, y=5", "x=-5, y=1"] },
            { q: "-3x - 7 = -x + y + 2 = 2", a: "x=-3, y=-3", d: ["x=3, y=-3", "x=-3, y=3", "x=3, y=3", "x=-2, y=-4"] },
            { q: "3x - 3y - 9 = -x + 8 = 6", a: "x=2, y=-3", d: ["x=-2, y=-3", "x=2, y=3", "x=-2, y=3", "x=-3, y=2"] },
            { q: "x + 3y - 8 = 3x + 2y + 3 = 4", a: "x=-3, y=5", d: ["x=3, y=5", "x=-3, y=-5", "x=3, y=-5", "x=5, y=-3"] },
            { q: "-3x - 2y + 15 = 2x + y - 9 = 0", a: "x=3, y=3", d: ["x=-3, y=3", "x=3, y=-3", "x=-3, y=-3", "x=4, y=2"] },
            { q: "x + 2y - 3 = 3x - y - 11 = 1", a: "x=4, y=0", d: ["x=-4, y=0", "x=0, y=4", "x=5, y=-1", "x=3, y=1"] },
            { q: "-x - 3y + 14 = -2x - 2y + 11 = 1", a: "x=1, y=4", d: ["x=-1, y=4", "x=1, y=-4", "x=-1, y=-4", "x=4, y=1"] },
            { q: "-x - 2y + 5 = -3x + 3y - 1 = -1", a: "x=2, y=2", d: ["x=-2, y=2", "x=2, y=-2", "x=-2, y=-2", "x=3, y=1"] },
            { q: "x + 2y - 2 = -x - 3y - 7 = -3", a: "x=5, y=-3", d: ["x=-5, y=-3", "x=5, y=3", "x=-5, y=3", "x=-3, y=5"] },
          ],
        },
      },
    },
  };
  /* /AUTO-GENERATED:math */

  function gradeList() {
    return Object.keys(GRADES).map(function (id) {
      return { id: id, label: GRADES[id].label };
    });
  }

  // 指定単元に含まれる種類一覧（並びは取り込み順）
  function setList(gradeId) {
    var grade = GRADES[gradeId];
    if (!grade) return [];
    return Object.keys(grade.sets).map(function (sid) {
      return { id: sid, label: grade.sets[sid].label, count: grade.sets[sid].items.length };
    });
  }

  function tagItems(gradeId, setId) {
    return GRADES[gradeId].sets[setId].items.map(function (it) {
      return { q: it.q, a: it.a, d: it.d || [], gradeId: gradeId, setId: setId };
    });
  }

  // 指定種類の問題配列。setId が "all" のときは単元内の全種類を結合。
  function itemsFor(gradeId, setId) {
    var grade = GRADES[gradeId];
    if (!grade) throw new Error("unknown grade: " + gradeId);
    if (setId === "all") {
      var merged = [];
      Object.keys(grade.sets).forEach(function (sid) { merged = merged.concat(tagItems(gradeId, sid)); });
      return merged;
    }
    if (!grade.sets[setId]) throw new Error("unknown set: " + gradeId + "/" + setId);
    return tagItems(gradeId, setId);
  }

  function allItems() {
    var out = [];
    Object.keys(GRADES).forEach(function (gid) {
      Object.keys(GRADES[gid].sets).forEach(function (sid) {
        out = out.concat(tagItems(gid, sid));
      });
    });
    return out;
  }

  function rangeLabel(gradeId, setId) {
    var grade = GRADES[gradeId];
    var prefix = grade ? grade.label + " " : "";
    if (setId === "all") return prefix + "全種類";
    return prefix + (grade && grade.sets[setId] ? grade.sets[setId].label : setId);
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function collectDistractors(answer, pools, num) {
    var seen = {};
    seen[answer] = true;
    var out = [];
    for (var p = 0; p < pools.length && out.length < num; p++) {
      var shuffled = shuffle(pools[p]);
      for (var i = 0; i < shuffled.length && out.length < num; i++) {
        var v = shuffled[i];
        if (v != null && v !== "" && !seen[v]) { seen[v] = true; out.push(v); }
      }
    }
    return out;
  }

  function fmtLabelOf(format) {
    return format === "choice8" ? "8択" : "4択";
  }

  /**
   * 問題セットを生成する。
   * @param {string} gradeId 単元ID
   * @param {string} setId   種類ID（"all" で単元内の全種類）
   * @param {string} format  "choice4" / "choice8"
   * @param {number|"all"} count 問題数
   */
  function build(gradeId, setId, format, count) {
    format = format || "choice4";

    var gradeItems = itemsFor(gradeId, "all");
    var strandAnswers = {};
    gradeItems.forEach(function (it) {
      (strandAnswers[it.setId] = strandAnswers[it.setId] || []).push(it.a);
    });
    var gradeAnswers = gradeItems.map(function (it) { return it.a; });
    var globalAnswers = allItems().map(function (it) { return it.a; });

    var targetChoices = format === "choice8" ? 8 : 4;

    var pool = shuffle(itemsFor(gradeId, setId));
    var n = count === "all" ? pool.length : Math.min(count, pool.length);
    var picked = pool.slice(0, n);

    var questions = picked.map(function (it) {
      var pools = [it.d || [], strandAnswers[it.setId] || [], gradeAnswers, globalAnswers];
      var distractors = collectDistractors(it.a, pools, targetChoices - 1);
      return {
        question: it.q,
        answer: it.a,
        choices: shuffle(distractors.concat([it.a])),
        accepts: "choice",
        math: { gradeId: it.gradeId, setId: it.setId },
      };
    });

    return {
      questions: questions,
      meta: {
        mode: "math",
        groupId: "math:" + gradeId + ":" + setId + ":" + format,
        label: "数学 / " + rangeLabel(gradeId, setId) + " / " + fmtLabelOf(format),
        gradeId: gradeId,
        setId: setId,
        format: format,
      },
    };
  }

  function dump() {
    var rows = [];
    Object.keys(GRADES).forEach(function (gid) {
      var grade = GRADES[gid];
      Object.keys(grade.sets).forEach(function (sid) {
        grade.sets[sid].items.forEach(function (it) {
          rows.push({
            gradeId: gid,
            gradeLabel: grade.label,
            setId: sid,
            setLabel: grade.sets[sid].label,
            q: it.q,
            a: it.a,
            d: (it.d || []).join(";"),
          });
        });
      });
    });
    return rows;
  }

  global.MathQuiz = {
    gradeList: gradeList,
    setList: setList,
    build: build,
    dump: dump,
  };
})(window);
