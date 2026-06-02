/**
 * storage.js
 * localStorage への学習記録の保存・読み出しをまとめたモジュール。
 * 記録はこの端末（ブラウザ）にのみ保存される。
 */
(function (global) {
  "use strict";

  var KEY = "chishokan-study-tool:v1";
  var MAX_HISTORY = 20; // モードごとに残す履歴件数

  function load() {
    try {
      var raw = global.localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function save(data) {
    try {
      global.localStorage.setItem(KEY, JSON.stringify(data));
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * 1回の演習結果を記録する。
   * @param {string} groupId  モード識別子（例 "calc:add:normal"）
   * @param {object} result   { label, score, total, seconds }
   * @returns {object} { best: number|null, isNewBest: boolean }
   */
  function record(groupId, result) {
    var data = load();
    var group = data[groupId] || { label: result.label, history: [], best: null };
    group.label = result.label;

    var entry = {
      score: result.score,
      total: result.total,
      seconds: result.seconds,
      at: Date.now(),
    };

    group.history.unshift(entry);
    if (group.history.length > MAX_HISTORY) {
      group.history.length = MAX_HISTORY;
    }

    // ベストは正答率（同率なら短時間）で判定
    var isNewBest = false;
    var rate = result.total > 0 ? result.score / result.total : 0;
    if (group.best == null) {
      group.best = { rate: rate, score: result.score, total: result.total, seconds: result.seconds, at: entry.at };
      isNewBest = true;
    } else {
      var better = rate > group.best.rate ||
        (rate === group.best.rate && result.seconds < group.best.seconds);
      if (better) {
        group.best = { rate: rate, score: result.score, total: result.total, seconds: result.seconds, at: entry.at };
        isNewBest = true;
      }
    }

    data[groupId] = group;
    save(data);
    return { best: group.best, isNewBest: isNewBest };
  }

  function all() {
    return load();
  }

  function clear() {
    try {
      global.localStorage.removeItem(KEY);
    } catch (e) { /* noop */ }
  }

  // ===== 苦手単語（間違えた問題）の保存 =====
  var MKEY = "chishokan-study-tool:mistakes:v1";

  function loadMistakes() {
    try {
      var raw = global.localStorage.getItem(MKEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }
  function saveMistakes(m) {
    try {
      global.localStorage.setItem(MKEY, JSON.stringify(m));
    } catch (e) { /* noop */ }
  }
  function mistakeKey(w) {
    return w.gradeId + "|" + w.en;
  }

  // 間違えた単語を登録（×回数を加算）
  function addMistake(w) {
    if (!w || !w.en) return;
    var m = loadMistakes();
    var k = mistakeKey(w);
    var e = m[k] || { gradeId: w.gradeId, setId: w.setId, en: w.en, ja: w.ja, count: 0, firstAt: Date.now() };
    e.count += 1;
    e.lastAt = Date.now();
    e.ja = w.ja;        // 表記更新に追随
    e.setId = w.setId;
    m[k] = e;
    saveMistakes(m);
  }

  // 正解できた単語を苦手リストから外す
  function resolveMistake(w) {
    if (!w || !w.en) return;
    var m = loadMistakes();
    var k = mistakeKey(w);
    if (m[k]) { delete m[k]; saveMistakes(m); }
  }

  // 苦手単語の一覧（最近間違えた順）
  function listMistakes() {
    var m = loadMistakes();
    return Object.keys(m).map(function (k) { return m[k]; })
      .sort(function (a, b) { return (b.lastAt || 0) - (a.lastAt || 0); });
  }

  // 指定1語を削除
  function removeMistake(gradeId, en) {
    var m = loadMistakes();
    delete m[gradeId + "|" + en];
    saveMistakes(m);
  }

  function clearMistakes() {
    try { global.localStorage.removeItem(MKEY); } catch (e) { /* noop */ }
  }

  global.StudyStore = {
    record: record,
    all: all,
    clear: clear,
    addMistake: addMistake,
    resolveMistake: resolveMistake,
    listMistakes: listMistakes,
    removeMistake: removeMistake,
    clearMistakes: clearMistakes,
  };
})(window);
