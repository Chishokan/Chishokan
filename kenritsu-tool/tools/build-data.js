#!/usr/bin/env node
/**
 * build-data.js（県立中 確認テスト）
 * data/*_source.csv（スプレッドシートからの書き出し＝正本）を読み、
 * js/rika.js / js/shakai.js の AUTO-GENERATED ブロックを生成し直す。
 *
 *   使い方:  node tools/build-data.js   （kenritsu-tool/ 直下から）
 *
 * - CSV は 5列：「教科の中の単元」「単元の中の項目」「問題」「答え」「誤答候補」。
 *   r[0]=単元（GRADES の見出し）, r[1]=項目（sets の見出し）, r[2]=問題, r[3]=答え, r[4]=誤答候補(;区切り)。
 * - 既存の単元ID・項目IDは、ラベル一致で引き継ぐ（学習記録のキーが変わらないように）。
 * - 新しいラベルにはラベルから決まる安定IDを割り当てる。
 * - スプレッドシートを編集 → CSVで書き出して data/ に置く → このスクリプトで反映、が基本の流れ。
 *
 * ※ study-tool/tools/build-data.js と同じ仕組み。本ツールは理科・社会の2科目に対応。
 *    科目を増やすときは末尾の CONFIGS に1ブロック足す（js 側にも同名のモジュールを用意）。
 */
"use strict";

const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");

// ---- CSV パーサ（" 囲み・"" エスケープ対応） ----
function parseCSV(text) {
  text = text.replace(/^﻿/, "");
  const rows = [];
  let row = [], field = "", inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQ) {
      if (c === '"') { if (text[i + 1] === '"') { field += '"'; i++; } else inQ = false; }
      else field += c;
    } else {
      if (c === '"') inQ = true;
      else if (c === ",") { row.push(field); field = ""; }
      else if (c === "\n" || c === "\r") {
        if (field !== "" || row.length) { row.push(field); rows.push(row); row = []; field = ""; }
        if (c === "\r" && text[i + 1] === "\n") i++;
      } else field += c;
    }
  }
  if (field !== "" || row.length) { row.push(field); rows.push(row); }
  return rows;
}

// ---- 既存 js から ラベル→ID 対応を読む（ID安定化のため） ----
function loadExistingMaps(file, globalName) {
  const abs = path.join(ROOT, file);
  delete require.cache[require.resolve(abs)];
  global.window = {};
  require(abs);
  const Q = global.window[globalName];
  const gradeLabelToId = {};
  const setLabelToId = {};   // setLabelToId[gradeId][setLabel] = setId
  const usedGrade = {};
  const usedSet = {};        // usedSet[gradeId] = { setId: true }
  Q.gradeList().forEach((g) => {
    gradeLabelToId[g.label] = g.id;
    usedGrade[g.id] = true;
    setLabelToId[g.id] = {};
    usedSet[g.id] = {};
    Q.setList(g.id).forEach((s) => {
      setLabelToId[g.id][s.label] = s.id;
      usedSet[g.id][s.id] = true;
    });
  });
  return { gradeLabelToId, setLabelToId, usedGrade, usedSet };
}

// ラベルから決まる安定ID（既存と衝突したら連番を足す）
function mintId(label, prefix, used) {
  let h = 0;
  for (let i = 0; i < label.length; i++) h = (h * 31 + label.charCodeAt(i)) >>> 0;
  let id = prefix + h.toString(36);
  let n = 2;
  while (used[id]) { id = prefix + h.toString(36) + "_" + n++; }
  used[id] = true;
  return id;
}

// ---- シリアライザ（既存の手書きスタイルに合わせる） ----
function key(k) { return /^[A-Za-z_$][\w$]*$/.test(k) ? k : JSON.stringify(k); }
function str(s) { return JSON.stringify(String(s == null ? "" : s)); }

function serialize(grades, gradeOrder, itemsKey, serializeItem) {
  const lines = ["{"];
  gradeOrder.forEach((gid) => {
    const g = grades[gid];
    lines.push("    " + key(gid) + ": {");
    lines.push("      label: " + str(g.label) + ",");
    lines.push("      sets: {");
    g.setOrder.forEach((sid) => {
      const s = g.sets[sid];
      lines.push("        " + key(sid) + ": {");
      lines.push("          label: " + str(s.label) + ",");
      lines.push("          " + itemsKey + ": [");
      s.items.forEach((it) => { lines.push("            " + serializeItem(it) + ","); });
      lines.push("          ],");
      lines.push("        },");
    });
    lines.push("      },");
    lines.push("    },");
  });
  lines.push("  }");
  return lines.join("\n");
}

// ---- 1モジュール分を生成 ----
function buildModule(cfg) {
  const csvRows = parseCSV(fs.readFileSync(path.join(ROOT, cfg.csv), "utf8"));
  csvRows.shift(); // ヘッダ
  const maps = loadExistingMaps(cfg.file, cfg.globalName);

  const grades = {};
  const gradeOrder = [];
  let itemCount = 0;

  csvRows.forEach((r) => {
    const gLabel = (r[0] || "").trim();
    const sLabel = (r[1] || "").trim();
    if (!gLabel || !sLabel) return;
    let gid = maps.gradeLabelToId[gLabel];
    if (!gid) { gid = mintId(gLabel, "g", maps.usedGrade); maps.gradeLabelToId[gLabel] = gid; maps.setLabelToId[gid] = {}; maps.usedSet[gid] = {}; }
    if (!grades[gid]) { grades[gid] = { label: gLabel, sets: {}, setOrder: [] }; gradeOrder.push(gid); }

    let sid = maps.setLabelToId[gid][sLabel];
    if (!sid) { sid = mintId(gLabel + "|" + sLabel, "s", maps.usedSet[gid]); maps.setLabelToId[gid][sLabel] = sid; }
    if (!grades[gid].sets[sid]) { grades[gid].sets[sid] = { label: sLabel, items: [] }; grades[gid].setOrder.push(sid); }

    grades[gid].sets[sid].items.push(cfg.makeItem(r));
    itemCount++;
  });

  const literal = serialize(grades, gradeOrder, cfg.itemsKey, cfg.serializeItem);

  // AUTO-GENERATED ブロックを置き換える
  const abs = path.join(ROOT, cfg.file);
  let src = fs.readFileSync(abs, "utf8");
  const startTok = "/* AUTO-GENERATED:" + cfg.name;
  const endTok = "/* /AUTO-GENERATED:" + cfg.name + " */";
  const si = src.indexOf(startTok);
  const ei = src.indexOf(endTok);
  if (si < 0 || ei < 0) throw new Error(cfg.file + " に AUTO-GENERATED マーカーが見つかりません");
  const afterStartLine = src.indexOf("\n", si) + 1;
  const endLineStart = src.lastIndexOf("\n", ei) + 1;
  const newVar = "  var GRADES = " + literal + ";\n";
  src = src.slice(0, afterStartLine) + newVar + src.slice(endLineStart);
  fs.writeFileSync(abs, src);

  console.log("  " + cfg.file + ": " + gradeOrder.length + " 単元 / " + itemCount + " 件");
}

// 理科・社会で共通の一問一答フォーマット
//   5列（基本）   ：単元, 項目, 問題, 答え, 誤答候補
//   7列（資料つき）：…, 資料テキスト, 資料画像   ← どちらも任意（空欄なら通常の選択問題）
//     r[5]=資料テキスト（補足・データ表など。改行可）→ it.p
//     r[6]=資料画像（index.html からの相対パス。例 assets/foo.svg）→ it.img
function makeQAItem(r) {
  const it = { q: r[2], a: r[3] };
  if (r[4] && r[4].trim()) it.d = r[4].split(/[;；]/).map((s) => s.trim()).filter(Boolean);
  if (r[5] && r[5].trim()) it.p = r[5].replace(/\r\n/g, "\n").trim();
  if (r[6] && r[6].trim()) it.img = r[6].trim();
  return it;
}
function serializeQAItem(it) {
  let s = "{ q: " + str(it.q) + ", a: " + str(it.a);
  if (it.d && it.d.length) s += ", d: [" + it.d.map(str).join(", ") + "]";
  if (it.p) s += ", p: " + str(it.p);
  if (it.img) s += ", img: " + str(it.img);
  return s + " }";
}

const CONFIGS = [
  {
    name: "rika",
    csv: "data/rika_source.csv",
    file: "js/rika.js",
    globalName: "RikaQuiz",
    itemsKey: "items",
    makeItem: makeQAItem,
    serializeItem: serializeQAItem,
  },
  {
    name: "shakai",
    csv: "data/shakai_source.csv",
    file: "js/shakai.js",
    globalName: "ShakaiQuiz",
    itemsKey: "items",
    makeItem: makeQAItem,
    serializeItem: serializeQAItem,
  },
];

console.log("データ生成（県立中 確認テスト）:");
CONFIGS.forEach(buildModule);
console.log("完了。js/rika.js・js/shakai.js を更新しました。");
