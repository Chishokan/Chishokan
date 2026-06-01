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

  global.StudyStore = {
    record: record,
    all: all,
    clear: clear,
  };
})(window);
