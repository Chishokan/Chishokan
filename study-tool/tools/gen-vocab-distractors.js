// 各単語に「意味の誤答(dj)」「英語の誤答(de)」を付与し vocab_source.csv（7列）を生成
// 入力の en/ja/kana（5列）から決定的に算出する。
const fs = require("fs");

function parseCSV(text) {
  text = text.replace(/^﻿/, "");
  const rows = []; let row = [], f = "", q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) { if (c === '"') { if (text[i + 1] === '"') { f += '"'; i++; } else q = false; } else f += c; }
    else { if (c === '"') q = true; else if (c === ",") { row.push(f); f = ""; } else if (c === "\n" || c === "\r") { if (f !== "" || row.length) { row.push(f); rows.push(row); row = []; f = ""; } if (c === "\r" && text[i + 1] === "\n") i++; } else f += c; }
  }
  if (f !== "" || row.length) { row.push(f); rows.push(row); }
  return rows;
}

const path = require("path");
const SRC = path.resolve(__dirname, "..", "data", "vocab_source.csv");
const rows = parseCSV(fs.readFileSync(SRC, "utf8"));
rows.shift();
// 各行: [学年, 範囲, 英語, 日本語, カナ]
const items = rows.map((r, i) => ({ idx: i, grade: r[0], range: r[1], en: r[2], ja: r[3], kana: r[4] }));

// ---- 意味（日本語）の語形シグネチャ ----
function sig(ja) {
  if (/短縮形/.test(ja)) return "contraction";
  if (/原形|過去形|過去分詞/.test(ja)) return "verbform";
  if (/の略/.test(ja)) return "abbrev";
  if (/^～を|^〜を/.test(ja)) return "verb-wo";
  if (/する$|する[。、]?$/.test(ja)) return "verb-suru";
  if (/い$/.test(ja)) return "adj-i";
  if (/な$|の$/.test(ja)) return "adj-na";
  if (/[。？?]$/.test(ja)) return "phrase";
  return "noun";
}

// ---- 英語スペルの編集距離 ----
function lev(a, b) {
  a = a.toLowerCase(); b = b.toLowerCase();
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++)
    dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return dp[m][n];
}
function commonPrefix(a, b) {
  a = a.toLowerCase(); b = b.toLowerCase();
  let k = 0; while (k < a.length && k < b.length && a[k] === b[k]) k++; return k;
}
const hasSpace = (s) => /\s/.test(s);

const N = 4; // 各方向の誤答数

function meaningDistractors(it) {
  const mySig = sig(it.ja);
  const scored = items.filter((o) => o.idx !== it.idx && o.ja !== it.ja).map((o) => {
    let s = 0;
    if (sig(o.ja) === mySig) s += 3;
    if (o.range === it.range) s += 1.5;
    if (o.grade === it.grade) s += 0.5;
    // 文字数が近い意味を少し優先（見た目の紛らわしさ）
    s -= Math.abs(o.ja.length - it.ja.length) * 0.05;
    return { ja: o.ja, s, idx: o.idx };
  });
  // 決定的に並べる（スコア降順→元の並び順）
  scored.sort((a, b) => (b.s - a.s) || (a.idx - b.idx));
  const out = [], seen = {};
  for (const c of scored) { if (seen[c.ja]) continue; seen[c.ja] = true; out.push(c.ja); if (out.length >= N) break; }
  return out;
}

function englishDistractors(it) {
  const scored = items.filter((o) => o.idx !== it.idx && o.en !== it.en).map((o) => {
    let s = 0;
    s += commonPrefix(o.en, it.en) * 1.5;
    s -= lev(o.en, it.en) * 1.0;
    if (hasSpace(o.en) === hasSpace(it.en)) s += 1.5; // 単語/連語の形をそろえる
    if (o.range === it.range) s += 1.0;
    if (sig(o.ja) === sig(it.ja)) s += 1.0; // 同じ品詞系（短縮形・動詞変化など）
    s -= Math.abs(o.en.length - it.en.length) * 0.1;
    return { en: o.en, s, idx: o.idx };
  });
  scored.sort((a, b) => (b.s - a.s) || (a.idx - b.idx));
  const out = [], seen = {};
  for (const c of scored) { if (seen[c.en]) continue; seen[c.en] = true; out.push(c.en); if (out.length >= N) break; }
  return out;
}

function cell(v) { return '"' + String(v).replace(/"/g, '""') + '"'; }
const header = ["学年", "範囲", "英語", "日本語", "カナ", "誤答(意味)", "誤答(英語)"];
const out = [header.map(cell).join(",")];
items.forEach((it) => {
  const dj = meaningDistractors(it).join(";");
  const de = englishDistractors(it).join(";");
  out.push([it.grade, it.range, it.en, it.ja, it.kana, dj, de].map(cell).join(","));
});
fs.writeFileSync(SRC, "﻿" + out.join("\r\n") + "\r\n");
console.log("生成:", items.length, "語に dj/de を付与");

// サンプル表示
const show = ["I'm", "often", "do-did-done", "sunny", "audience", "reach", "since"];
show.forEach((en) => {
  const it = items.find((x) => x.en === en);
  if (it) console.log("\n[" + en + "] (" + it.ja + ")\n  意味の誤答:", meaningDistractors(it).join(" / "), "\n  英語の誤答:", englishDistractors(it).join(" / "));
});
