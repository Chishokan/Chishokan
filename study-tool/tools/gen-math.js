// 連立方程式の類似問題ジェネレータ → data/math_source.csv（5列）
// 使い方: node tools/gen-math.js  （生成後 node tools/build-data.js で js に反映）
// 解(x0,y0)を先に決め、そこから係数・定数を作るので必ず整数解・正答になる。
const fs = require("fs");
const path = require("path");
const OUT = path.resolve(__dirname, "..", "data", "math_source.csv");

function randint(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { [a, b] = [b, a % b]; } return a || 1; }

// 「a x + b y」の整形（a,b は整数、片方0可）
function lin(a, b) {
  const parts = [];
  function term(c, v, first) {
    if (c === 0) return;
    let s;
    if (first) s = (c < 0 ? "-" : "");
    else s = (c < 0 ? " - " : " + ");
    const m = Math.abs(c);
    parts.push(s + (m === 1 ? "" : m) + v);
  }
  term(a, "x", true);
  term(b, "y", parts.length === 0);
  return parts.length ? parts.join("") : "0";
}
function eq(a, b, c) { return lin(a, b) + " = " + c; }

// 答え・誤答の (x,y) 文字列
function pairStr(x, y) { return "x=" + x + ", y=" + y; }
function distractors(x0, y0) {
  const cands = [
    [-x0, y0], [x0, -y0], [-x0, -y0], [y0, x0],
    [x0 + 1, y0 - 1], [x0 - 1, y0 + 1], [x0 + 2, y0], [x0, y0 + 2],
    [x0 - 2, y0], [x0, y0 - 2], [y0, -x0], [-y0, x0],
  ];
  const seen = { [pairStr(x0, y0)]: true };
  const out = [];
  for (const [a, b] of cands) {
    const s = pairStr(a, b);
    if (!seen[s]) { seen[s] = true; out.push(s); }
    if (out.length >= 4) break;
  }
  return out;
}
function det(a1, b1, a2, b2) { return a1 * b2 - a2 * b1; }

// 標準形の独立な第2式 a x + b y = c を作る（第1式の係数 (pa,pb) と非平行）
function secondEq(x0, y0, pa, pb) {
  for (let t = 0; t < 400; t++) {
    const a = randint(-4, 4), b = randint(-4, 4);
    if (a === 0 || b === 0) continue;        // 両方の文字を含む式にする
    if (det(pa, pb, a, b) === 0) continue;
    return { a, b, c: a * x0 + b * y0 };
  }
  return { a: 1, b: 1, c: x0 + y0 };
}

const TYPES = {
  daikyu: {
    label: "代入法",
    gen() {
      const x0 = randint(-6, 6), y0 = randint(-6, 6);
      let q;
      if (Math.random() < 0.5) {
        // x = m y (+k)
        const m = pick([-3, -2, -1, 2, 3]); const k = x0 - m * y0;
        const e1 = "x = " + lin(m, 0).replace("x", "y") + (k === 0 ? "" : (k < 0 ? " - " + (-k) : " + " + k));
        const s2 = secondEq(x0, y0, 1, -m);
        q = e1 + ", " + eq(s2.a, s2.b, s2.c);
      } else {
        // y = m x (+k)
        const m = pick([-3, -2, -1, 2, 3]); const k = y0 - m * x0;
        const e1 = "y = " + (m === 1 ? "x" : (m === -1 ? "-x" : m + "x")) + (k === 0 ? "" : (k < 0 ? " - " + (-k) : " + " + k));
        const s2 = secondEq(x0, y0, -m, 1);
        q = e1 + ", " + eq(s2.a, s2.b, s2.c);
      }
      return { q, x0, y0 };
    },
  },
  kagen: {
    label: "加減法",
    gen() {
      const x0 = randint(-6, 6), y0 = randint(-6, 6);
      let a1, b1;
      do { a1 = randint(-4, 4); b1 = randint(-4, 4); } while (a1 === 0 || b1 === 0);
      const e1 = { a: a1, b: b1, c: a1 * x0 + b1 * y0 };
      const e2 = secondEq(x0, y0, a1, b1);
      return { q: eq(e1.a, e1.b, e1.c) + ", " + eq(e2.a, e2.b, e2.c), x0, y0 };
    },
  },
  kakko: {
    label: "かっこを含む式",
    gen() {
      const x0 = randint(-5, 5), y0 = randint(-5, 5);
      // A(x + P) = B y + Q  → 展開すると A x - B y = Q - A P
      const A = pick([2, 3, 4]); const P = pick([-3, -2, -1, 1, 2, 3]); const B = pick([-3, -2, 2, 3]);
      const Q = A * (x0 + P) - B * y0;
      const left = A + "(" + lin(1, 0).replace("x", "x") + (P === 0 ? "" : (P < 0 ? " - " + (-P) : " + " + P)) + ")";
      const right = (B === 1 ? "y" : (B === -1 ? "-y" : B + "y")) + (Q === 0 ? "" : (Q < 0 ? " - " + (-Q) : " + " + Q));
      // 第2式（標準・独立）。展開後 e1: A x - B y = ...
      const s2 = secondEq(x0, y0, A, -B);
      return { q: left + " = " + right + ", " + eq(s2.a, s2.b, s2.c), x0, y0 };
    },
  },
  shosu: {
    label: "小数をふくむ式",
    gen() {
      const x0 = randint(-5, 5), y0 = randint(-5, 5);
      // 0.a x + 0.b y = c（係数は0.1刻み）, c は1桁小数
      let A, B;
      do { A = randint(-6, 6); B = randint(-6, 6); } while (A === 0 || B === 0);
      const c10 = A * x0 + B * y0; // ×10 した整数
      const dec = (v) => (v / 10).toString();
      // 整形：0.Ax + 0.By = c
      function decTerm(coef, v, first) {
        const sign = coef < 0 ? (first ? "-" : " - ") : (first ? "" : " + ");
        return sign + "0." + Math.abs(coef) + v;
      }
      const lhs = decTerm(A, "x", true) + decTerm(B, "y", false);
      const s2 = secondEq(x0, y0, A, B);
      return { q: lhs + " = " + dec(c10) + ", " + eq(s2.a, s2.b, s2.c), x0, y0 };
    },
  },
  bunsu: {
    label: "分数をふくむ式",
    gen() {
      const x0 = randint(-6, 6), y0 = randint(-6, 6);
      const m = pick([2, 3, 4, 6]); const n = pick([2, 3, 4, 6]);
      const sx = pick([1, -1]); const sy = pick([1, -1]);
      // (sx) x/m + (sy) y/n = value
      let num = sx * x0 * n + sy * y0 * m; let den = m * n;
      const g = gcd(num, den); num /= g; den /= g;
      if (den < 0) { den = -den; num = -num; }
      const rhs = den === 1 ? String(num) : (num + "/" + den);
      const t1 = (sx < 0 ? "-" : "") + "x/" + m;
      const t2 = (sy < 0 ? " - " : " + ") + "y/" + n;
      const s2 = secondEq(x0, y0, sx * n, sy * m);
      return { q: t1 + t2 + " = " + rhs + ", " + eq(s2.a, s2.b, s2.c), x0, y0 };
    },
  },
  abc: {
    label: "A＝B＝C の形",
    gen() {
      const x0 = randint(-5, 5), y0 = randint(-5, 5);
      const k = randint(-6, 6);
      // L1 = L2 = k （L1,L2 は (x0,y0) で k になる一次式、独立）
      let a1, b1, a2, b2;
      do {
        a1 = randint(-3, 3); b1 = randint(-3, 3);
        a2 = randint(-3, 3); b2 = randint(-3, 3);
      } while (a1 === 0 || a2 === 0 || det(a1, b1, a2, b2) === 0);
      const c1 = k - a1 * x0 - b1 * y0;
      const c2 = k - a2 * x0 - b2 * y0;
      const L = (a, b, c) => {
        let s = lin(a, b);
        if (c !== 0) s += (c < 0 ? " - " + (-c) : " + " + c);
        return s;
      };
      return { q: L(a1, b1, c1) + " = " + L(a2, b2, c2) + " = " + k, x0, y0 };
    },
  },
};

const PER = 20;
const rows = [["学年", "範囲", "問題", "答え", "誤答候補"]];
let total = 0;
Object.keys(TYPES).forEach((key) => {
  const T = TYPES[key];
  const seen = {};
  let made = 0, guard = 0;
  while (made < PER && guard < 5000) {
    guard++;
    const p = T.gen();
    const ds = distractors(p.x0, p.y0);
    if (ds.length < 4) continue;
    if (seen[p.q]) continue;
    seen[p.q] = true;
    rows.push(["連立方程式", T.label, p.q, pairStr(p.x0, p.y0), ds.join(";")]);
    made++; total++;
  }
  console.log("  " + T.label + ": " + made + "問");
});

function cell(v) { return '"' + String(v).replace(/"/g, '""') + '"'; }
const csv = "﻿" + rows.map((r) => r.map(cell).join(",")).join("\r\n") + "\r\n";
fs.writeFileSync(OUT, csv);
console.log("data/math_source.csv:", total, "問");
