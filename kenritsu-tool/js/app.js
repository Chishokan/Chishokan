/**
 * app.js（県立中 確認テスト）
 * 画面遷移と出題フローの制御。各科目モジュール（rika.js / shakai.js）が作った
 * 問題セット {questions, meta} を共通の出題画面で回し、結果を storage.js に保存する。
 *
 * study-tool/js/app.js を雛形に、確認テスト（一問一答・4択/8択）用へ整理したもの。
 * 科目を増やすときは「メニューカード → 設定セクション → build◯◯GradeOptions /
 * build◯◯SetOptions → start◯◯ → retry 分岐 → init 配線」を1科目ぶん足す。
 */
(function (global) {
  "use strict";

  var doc = global.document;

  // ---- 小さなヘルパ ----
  function $(sel, root) { return (root || doc).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || doc).querySelectorAll(sel)); }
  function checkedValue(name) {
    var el = doc.querySelector('input[name="' + name + '"]:checked');
    return el ? el.value : null;
  }

  // ---- 画面遷移 ----
  function show(viewId) {
    $all(".view").forEach(function (v) { v.classList.remove("is-active"); });
    var el = doc.getElementById("view-" + viewId);
    if (el) el.classList.add("is-active");
    if (viewId === "records") renderRecords();
    if (viewId === "home" || viewId === "rika-setup" || viewId === "shakai-setup") {
      // home に戻る系では実行中セッションを止める
      stopTimer();
    }
    global.scrollTo(0, 0);
  }

  // ---- 出題セッションの状態 ----
  var session = null; // { questions, meta, index, score, review, startedAt }
  var timerId = null;

  function startTimer() {
    var timerEl = doc.getElementById("quiz-timer");
    stopTimer();
    timerId = global.setInterval(function () {
      if (!session) return;
      var sec = (Date.now() - session.startedAt) / 1000;
      timerEl.textContent = sec.toFixed(1) + "s";
    }, 100);
  }
  function stopTimer() {
    if (timerId) { global.clearInterval(timerId); timerId = null; }
  }

  function startSession(set) {
    session = {
      questions: set.questions,
      meta: set.meta,
      index: 0,
      score: 0,
      review: [],
      startedAt: Date.now(),
    };
    doc.getElementById("quiz-total").textContent = String(set.questions.length);
    show("quiz");
    startTimer();
    renderQuestion();
  }

  function renderQuestion() {
    var q = session.questions[session.index];
    var choicesEl = doc.getElementById("quiz-choices");
    var feedback = doc.getElementById("quiz-feedback");

    doc.getElementById("quiz-index").textContent = String(session.index + 1);
    doc.getElementById("quiz-question").textContent = q.question;
    doc.getElementById("quiz-progress").style.width =
      (session.index / session.questions.length) * 100 + "%";

    // 資料（補足テキスト・画像）。どちらか一方でもあれば資料ブロックを表示する。
    renderResource(q);

    feedback.textContent = "";
    feedback.className = "quiz-feedback";

    // 確認テストは選択式（4択 / 8択）のみ
    choicesEl.hidden = false;
    choicesEl.innerHTML = "";
    q.choices.forEach(function (c) {
      var btn = doc.createElement("button");
      btn.type = "button";
      btn.className = "choice";
      btn.textContent = c;
      btn.addEventListener("click", function () { submitAnswer(c, btn); });
      choicesEl.appendChild(btn);
    });
  }

  // 資料ブロック（passage / image）の表示・非表示を切り替える
  function renderResource(q) {
    var resourceEl = doc.getElementById("quiz-resource");
    var passageEl = doc.getElementById("quiz-passage");
    var imageEl = doc.getElementById("quiz-image");
    var hasPassage = !!(q.passage && q.passage.length);
    var hasImage = !!(q.image && q.image.length);

    if (!hasPassage && !hasImage) {
      resourceEl.hidden = true;
      passageEl.hidden = true;
      imageEl.hidden = true;
      imageEl.removeAttribute("src");
      return;
    }
    resourceEl.hidden = false;

    if (hasPassage) {
      passageEl.hidden = false;
      passageEl.textContent = q.passage;
    } else {
      passageEl.hidden = true;
      passageEl.textContent = "";
    }

    if (hasImage) {
      imageEl.hidden = false;
      imageEl.src = q.image;
      imageEl.alt = "資料";
    } else {
      imageEl.hidden = true;
      imageEl.removeAttribute("src");
    }
  }

  function submitAnswer(value, sourceBtn) {
    var q = session.questions[session.index];
    var feedback = doc.getElementById("quiz-feedback");
    var correct = String(value) === String(q.answer);

    // 選択式：正解/不正解を色付け、ボタンを無効化
    $all(".choice", doc.getElementById("quiz-choices")).forEach(function (b) {
      b.disabled = true;
      if (b.textContent === q.answer) b.classList.add("is-correct");
    });
    if (!correct && sourceBtn) sourceBtn.classList.add("is-wrong");

    if (correct) {
      session.score++;
      feedback.textContent = "せいかい！";
      feedback.className = "quiz-feedback is-good";
    } else {
      feedback.textContent = "せいかいは「" + q.answer + "」";
      feedback.className = "quiz-feedback is-bad";
    }

    session.review.push({
      question: q.question,
      yours: (value === "" || value == null) ? "(無回答)" : String(value),
      answer: String(q.answer),
      correct: correct,
    });

    global.setTimeout(nextQuestion, correct ? 650 : 1100);
  }

  function nextQuestion() {
    if (!session) return;
    session.index++;
    if (session.index >= session.questions.length) {
      finishSession();
    } else {
      renderQuestion();
    }
  }

  function finishSession() {
    stopTimer();
    var seconds = (Date.now() - session.startedAt) / 1000;
    var total = session.questions.length;

    var saved = global.StudyStore.record(session.meta.groupId, {
      label: session.meta.label,
      score: session.score,
      total: total,
      seconds: seconds,
    });

    // 結果画面
    doc.getElementById("result-score").textContent = String(session.score);
    doc.getElementById("result-total").textContent = String(total);
    doc.getElementById("result-meta").textContent =
      session.meta.label + " ／ " + seconds.toFixed(1) + "秒";

    var bestEl = doc.getElementById("result-best");
    if (saved.isNewBest) {
      bestEl.textContent = "★ ベスト更新！";
    } else if (saved.best) {
      bestEl.textContent = "ベスト記録：" + saved.best.score + " / " + saved.best.total;
    } else {
      bestEl.textContent = "";
    }

    // 復習リスト
    var review = doc.getElementById("result-review");
    review.innerHTML = "";
    session.review.forEach(function (r) {
      var item = doc.createElement("div");
      item.className = "review-item " + (r.correct ? "ok" : "ng");
      var mark = doc.createElement("span");
      mark.className = "review-item__mark";
      mark.textContent = r.correct ? "○" : "×";
      var qSpan = doc.createElement("span");
      qSpan.className = "review-item__q";
      qSpan.textContent = r.question;
      var aSpan = doc.createElement("span");
      aSpan.className = "review-item__a";
      aSpan.textContent = r.correct ? "→ " + r.answer : "あなた：" + r.yours + " ／ 正解：" + r.answer;
      item.appendChild(mark);
      item.appendChild(qSpan);
      item.appendChild(aSpan);
      review.appendChild(item);
    });

    // 「もう一回」用に直前の設定を保持
    lastSetup = session.meta;
    show("result");
  }

  // ---- 学習記録画面 ----
  function fmtDate(ts) {
    var d = new Date(ts);
    var p = function (n) { return (n < 10 ? "0" : "") + n; };
    return (d.getMonth() + 1) + "/" + d.getDate() + " " + p(d.getHours()) + ":" + p(d.getMinutes());
  }

  function renderRecords() {
    var body = doc.getElementById("records-body");
    var clearBtn = doc.getElementById("records-clear");
    var data = global.StudyStore.all();
    var ids = Object.keys(data);

    body.innerHTML = "";
    if (ids.length === 0) {
      var empty = doc.createElement("p");
      empty.className = "records-empty";
      empty.textContent = "まだ記録がありません。確認テストに挑戦してみよう！";
      body.appendChild(empty);
      clearBtn.hidden = true;
      return;
    }
    clearBtn.hidden = false;

    ids.forEach(function (id) {
      var g = data[id];
      var group = doc.createElement("div");
      group.className = "record-group";

      var head = doc.createElement("div");
      head.className = "record-group__head";
      var title = doc.createElement("span");
      title.className = "record-group__title";
      title.textContent = g.label;
      var best = doc.createElement("span");
      best.className = "record-group__best";
      best.textContent = g.best ? "★ ベスト " + g.best.score + "/" + g.best.total : "";
      head.appendChild(title);
      head.appendChild(best);
      group.appendChild(head);

      var ul = doc.createElement("ul");
      ul.className = "record-list";
      g.history.slice(0, 5).forEach(function (h) {
        var li = doc.createElement("li");
        var left = doc.createElement("span");
        left.textContent = fmtDate(h.at);
        var right = doc.createElement("span");
        right.textContent = h.score + "/" + h.total + " ・ " + h.seconds.toFixed(1) + "s";
        li.appendChild(left);
        li.appendChild(right);
        ul.appendChild(li);
      });
      group.appendChild(ul);
      body.appendChild(group);
    });
  }

  // ---- セットアップ画面のロジック ----
  var lastSetup = null;

  // チップ（ラジオ）を1つ追加する共通ヘルパ
  function addChip(wrap, name, value, text, checked) {
    var label = doc.createElement("label");
    label.className = "chip";
    var input = doc.createElement("input");
    input.type = "radio";
    input.name = name;
    input.value = value;
    if (checked) input.checked = true;
    var span = doc.createElement("span");
    span.textContent = text;
    label.appendChild(input);
    label.appendChild(span);
    wrap.appendChild(label);
  }

  // 単元チップを生成（先頭を選択状態に）／選択中の単元に応じて項目チップを作り直す。
  // 科目モジュール（VocabQuiz 風の gradeList/setList を持つ）を渡して共通化。
  function buildGradeOptions(quiz, name, wrapId) {
    var wrap = doc.getElementById(wrapId);
    wrap.innerHTML = "";
    quiz.gradeList().forEach(function (g, i) {
      addChip(wrap, name, g.id, g.label, i === 0);
    });
  }

  function buildSetOptions(quiz, gradeName, setName, wrapId) {
    var gradeId = checkedValue(gradeName);
    var wrap = doc.getElementById(wrapId);
    wrap.innerHTML = "";
    var list = quiz.setList(gradeId);

    var total = 0;
    list.forEach(function (s, i) {
      total += s.count;
      addChip(wrap, setName, s.id, s.label + "（" + s.count + "問）", i === 0);
    });
    // その単元の全項目からまとめて出題
    addChip(wrap, setName, "all", "全項目（" + total + "問）", false);
  }

  function startQuiz(quiz, gradeName, setName, formatName, countName) {
    var gradeId = checkedValue(gradeName);
    var setId = checkedValue(setName);
    var format = checkedValue(formatName);
    var countRaw = checkedValue(countName);
    var count = countRaw === "all" ? "all" : parseInt(countRaw, 10);
    startSession(quiz.build(gradeId, setId, format, count));
  }

  function retry() {
    if (!lastSetup) { show("home"); return; }
    var quiz = lastSetup.mode === "rika" ? global.RikaQuiz : global.ShakaiQuiz;
    startSession(quiz.build(lastSetup.gradeId, lastSetup.setId, lastSetup.format, session.questions.length));
  }

  // ---- 収録問題のCSVエクスポート ----
  // フィールドにカンマ・改行・引用符が含まれる場合に備えて必ずクォートする
  function csvCell(v) {
    return '"' + String(v == null ? "" : v).replace(/"/g, '""') + '"';
  }

  function exportQuizCSV(quiz, fileLabel) {
    var rows = quiz.dump();
    var header = ["単元", "項目", "問題", "答え", "誤答候補", "資料テキスト", "資料画像"];
    var lines = [header.map(csvCell).join(",")];
    rows.forEach(function (r) {
      lines.push([r.gradeLabel, r.setLabel, r.q, r.a, r.d, r.p || "", r.img || ""].map(csvCell).join(","));
    });
    // Excelで文字化けしないよう UTF-8 BOM + CRLF
    var csv = "﻿" + lines.join("\r\n") + "\r\n";
    var blob = new global.Blob([csv], { type: "text/csv;charset=utf-8;" });
    var url = global.URL.createObjectURL(blob);
    var a = doc.createElement("a");
    var d = new Date();
    var pad = function (n) { return (n < 10 ? "0" : "") + n; };
    a.href = url;
    a.download = "県立中確認テスト_" + fileLabel + "_" + d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate()) + ".csv";
    doc.body.appendChild(a);
    a.click();
    doc.body.removeChild(a);
    global.URL.revokeObjectURL(url);
  }

  // 学習記録を1つのJSONとして書き出す
  function exportBackup() {
    var payload = global.StudyStore.exportAll();
    var blob = new global.Blob([JSON.stringify(payload, null, 2)], { type: "application/json;charset=utf-8;" });
    var url = global.URL.createObjectURL(blob);
    var a = doc.createElement("a");
    var d = new Date();
    var pad = function (n) { return (n < 10 ? "0" : "") + n; };
    a.href = url;
    a.download = "県立中確認テスト_学習記録バックアップ_" + d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate()) + ".json";
    doc.body.appendChild(a);
    a.click();
    doc.body.removeChild(a);
    global.URL.revokeObjectURL(url);
  }

  // 選んだJSONファイルを読み込み、既存の記録に統合する
  function importBackupFile(file) {
    if (!file) return;
    var reader = new global.FileReader();
    reader.onload = function () {
      var payload;
      try {
        payload = JSON.parse(reader.result);
      } catch (e) {
        global.alert("読み込めませんでした。バックアップのJSONファイルを選んでください。");
        return;
      }
      var res = global.StudyStore.importAll(payload, "merge");
      if (!res.ok) {
        global.alert("このアプリのバックアップファイルではないようです。");
        return;
      }
      renderRecords();
      global.alert("読み込みました。記録 " + res.recordGroups + " 件（既存の記録に統合）。");
    };
    reader.readAsText(file);
  }

  // ---- イベント配線 ----
  function init() {
    // 理科
    buildGradeOptions(global.RikaQuiz, "rika-grade", "rika-grade");
    buildSetOptions(global.RikaQuiz, "rika-grade", "rika-set", "rika-set");
    doc.getElementById("rika-grade").addEventListener("change", function () {
      buildSetOptions(global.RikaQuiz, "rika-grade", "rika-set", "rika-set");
    });

    // 社会
    buildGradeOptions(global.ShakaiQuiz, "shakai-grade", "shakai-grade");
    buildSetOptions(global.ShakaiQuiz, "shakai-grade", "shakai-set", "shakai-set");
    doc.getElementById("shakai-grade").addEventListener("change", function () {
      buildSetOptions(global.ShakaiQuiz, "shakai-grade", "shakai-set", "shakai-set");
    });

    // データ属性で画面遷移するボタンをまとめて配線
    $all("[data-goto]").forEach(function (btn) {
      btn.addEventListener("click", function () { show(btn.getAttribute("data-goto")); });
    });

    doc.getElementById("rika-start").addEventListener("click", function () {
      startQuiz(global.RikaQuiz, "rika-grade", "rika-set", "rika-format", "rika-count");
    });
    doc.getElementById("shakai-start").addEventListener("click", function () {
      startQuiz(global.ShakaiQuiz, "shakai-grade", "shakai-set", "shakai-format", "shakai-count");
    });

    doc.getElementById("quiz-quit").addEventListener("click", function () {
      stopTimer();
      session = null;
      show("home");
    });

    doc.getElementById("result-retry").addEventListener("click", retry);

    doc.getElementById("records-clear").addEventListener("click", function () {
      if (global.confirm("この端末の学習記録をすべて消します。よろしいですか？")) {
        global.StudyStore.clear();
        renderRecords();
      }
    });

    doc.getElementById("rika-export").addEventListener("click", function () {
      exportQuizCSV(global.RikaQuiz, "理科");
    });
    doc.getElementById("shakai-export").addEventListener("click", function () {
      exportQuizCSV(global.ShakaiQuiz, "社会");
    });

    // 記録のバックアップ（書き出し／読み込み）
    doc.getElementById("backup-export").addEventListener("click", exportBackup);
    var backupFile = doc.getElementById("backup-file");
    doc.getElementById("backup-import").addEventListener("click", function () { backupFile.click(); });
    backupFile.addEventListener("change", function () {
      importBackupFile(backupFile.files && backupFile.files[0]);
      backupFile.value = ""; // 同じファイルを連続で選べるように
    });

    show("home");
  }

  if (doc.readyState === "loading") {
    doc.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})(window);
