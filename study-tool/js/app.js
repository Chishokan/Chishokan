/**
 * app.js
 * 画面遷移と出題フローの制御。calc.js / vocab.js が作った問題セットを
 * 共通の出題画面で回し、結果を storage.js に保存する。
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
  // 記述解答の照合用：小文字化し英数字以外（空白・記号・~ 等）を無視する
  function normalizeText(s) {
    return String(s == null ? "" : s).toLowerCase().replace(/[^a-z0-9]/g, "");
  }

  // ---- 画面遷移 ----
  function show(viewId) {
    $all(".view").forEach(function (v) { v.classList.remove("is-active"); });
    var el = doc.getElementById("view-" + viewId);
    if (el) el.classList.add("is-active");
    if (viewId === "records") renderRecords();
    if (viewId === "home" || viewId === "calc-setup" || viewId === "vocab-setup") {
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
    var inputForm = doc.getElementById("quiz-input-form");
    var choicesEl = doc.getElementById("quiz-choices");
    var feedback = doc.getElementById("quiz-feedback");

    doc.getElementById("quiz-index").textContent = String(session.index + 1);
    doc.getElementById("quiz-question").textContent = q.question;
    doc.getElementById("quiz-progress").style.width =
      (session.index / session.questions.length) * 100 + "%";

    feedback.textContent = "";
    feedback.className = "quiz-feedback";

    if (q.accepts === "number" || q.accepts === "text") {
      inputForm.hidden = false;
      choicesEl.hidden = true;
      var input = doc.getElementById("quiz-input");
      input.value = "";
      input.disabled = false;
      if (q.accepts === "text") {
        input.type = "text";
        input.setAttribute("inputmode", "latin");
        input.setAttribute("autocapitalize", "none");
        input.placeholder = "英語を入力";
      } else {
        input.type = "number";
        input.setAttribute("inputmode", "numeric");
        input.placeholder = "答え";
      }
      input.focus();
    } else {
      inputForm.hidden = true;
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
  }

  function submitAnswer(value, sourceBtn) {
    var q = session.questions[session.index];
    var feedback = doc.getElementById("quiz-feedback");
    var correct;

    if (q.accepts === "number") {
      correct = Number(value) === q.answer;
      doc.getElementById("quiz-input").disabled = true;
    } else if (q.accepts === "text") {
      correct = normalizeText(value) === normalizeText(q.answer);
      doc.getElementById("quiz-input").disabled = true;
    } else {
      correct = String(value) === String(q.answer);
      // 4択：正解/不正解を色付け、ボタンを無効化
      $all(".choice", doc.getElementById("quiz-choices")).forEach(function (b) {
        b.disabled = true;
        if (b.textContent === q.answer) b.classList.add("is-correct");
      });
      if (!correct && sourceBtn) sourceBtn.classList.add("is-wrong");
    }

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
      qSpan.textContent = r.question.replace(/ = \?$/, "");
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
      empty.textContent = "まだ記録がありません。ドリルに挑戦してみよう！";
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

  function buildVocabSetOptions() {
    var wrap = doc.getElementById("vocab-set");
    wrap.innerHTML = "";
    var list = global.VocabQuiz.setList();

    function addOption(id, text, checked) {
      var label = doc.createElement("label");
      label.className = "chip";
      var input = doc.createElement("input");
      input.type = "radio";
      input.name = "vocab-set";
      input.value = id;
      if (checked) input.checked = true;
      var span = doc.createElement("span");
      span.textContent = text;
      label.appendChild(input);
      label.appendChild(span);
      wrap.appendChild(label);
    }

    var total = 0;
    list.forEach(function (s, i) {
      total += s.count;
      addOption(s.id, s.label + "（" + s.count + "語）", i === 0);
    });
    // 収録単語の全範囲からまとめて出題（難易度アップ）
    addOption("all", "全範囲（" + total + "語）", false);
  }

  function startCalc() {
    var op = checkedValue("calc-op");
    var level = checkedValue("calc-level");
    var count = parseInt(checkedValue("calc-count"), 10);
    startSession(global.CalcDrill.build(op, level, count));
  }

  function startVocab() {
    var setId = checkedValue("vocab-set");
    var dir = checkedValue("vocab-dir");
    var format = checkedValue("vocab-format");
    var countRaw = checkedValue("vocab-count");
    var count = countRaw === "all" ? "all" : parseInt(countRaw, 10);
    startSession(global.VocabQuiz.build(setId, dir, count, format));
  }

  function retry() {
    if (!lastSetup) { show("home"); return; }
    if (lastSetup.mode === "calc") {
      startSession(global.CalcDrill.build(lastSetup.op, lastSetup.level, session.questions.length));
    } else {
      var count = session.questions.length;
      startSession(global.VocabQuiz.build(lastSetup.setId, lastSetup.dir, count, lastSetup.format));
    }
  }

  // ---- イベント配線 ----
  function init() {
    buildVocabSetOptions();

    // データ属性で画面遷移するボタンをまとめて配線
    $all("[data-goto]").forEach(function (btn) {
      btn.addEventListener("click", function () { show(btn.getAttribute("data-goto")); });
    });

    doc.getElementById("calc-start").addEventListener("click", startCalc);
    doc.getElementById("vocab-start").addEventListener("click", startVocab);

    doc.getElementById("quiz-input-form").addEventListener("submit", function (e) {
      e.preventDefault();
      var input = doc.getElementById("quiz-input");
      if (input.disabled) return;
      if (input.value === "") { input.focus(); return; }
      submitAnswer(input.value, null);
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

    show("home");
  }

  if (doc.readyState === "loading") {
    doc.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})(window);
