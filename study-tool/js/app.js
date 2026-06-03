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
    if (viewId === "mistakes") renderMistakes();
    if (viewId === "home" || viewId === "calc-setup" || viewId === "vocab-setup" || viewId === "rika-setup" || viewId === "shakai-setup") {
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

    // 英単語：間違えたら苦手リストへ、正解できたら外す
    if (session.meta.mode === "vocab" && q.word) {
      if (correct) global.StudyStore.resolveMistake(q.word);
      else global.StudyStore.addMistake(q.word);
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

  // ---- 苦手な単語 ----
  // gradeId / setId からラベルを引くための対応表を作る
  function buildLabelMaps() {
    var gradeMap = {};
    var setMap = {};
    global.VocabQuiz.gradeList().forEach(function (g) {
      gradeMap[g.id] = g.label;
      global.VocabQuiz.setList(g.id).forEach(function (s) {
        setMap[g.id + "|" + s.id] = s.label;
      });
    });
    return { grade: gradeMap, set: setMap };
  }

  function renderMistakes() {
    var body = doc.getElementById("mistakes-body");
    var summary = doc.getElementById("mistakes-summary");
    var actions = doc.getElementById("mistakes-actions");
    var clearBtn = doc.getElementById("mistakes-clear");
    var words = global.StudyStore.listMistakes();

    body.innerHTML = "";
    if (words.length === 0) {
      summary.textContent = "マイ単語帳はまだ空です。英単語テストで間違えた単語がここに集まります。";
      actions.hidden = true;
      clearBtn.hidden = true;
      return;
    }
    summary.textContent = "まだ覚えきれていない単語：" + words.length + " 個（正解できると自動で消えます）";
    actions.hidden = false;
    clearBtn.hidden = false;

    var maps = buildLabelMaps();

    // 学年・範囲ごとにまとめて表示
    var groups = {};
    var order = [];
    words.forEach(function (w) {
      var gkey = w.gradeId + "|" + w.setId;
      if (!groups[gkey]) { groups[gkey] = []; order.push(gkey); }
      groups[gkey].push(w);
    });

    order.forEach(function (gkey) {
      var parts = gkey.split("|");
      var title = (maps.grade[parts[0]] || parts[0]) + " " + (maps.set[gkey] || parts[1]);

      var group = doc.createElement("div");
      group.className = "record-group";
      var head = doc.createElement("div");
      head.className = "record-group__head";
      var titleEl = doc.createElement("span");
      titleEl.className = "record-group__title";
      titleEl.textContent = title;
      var cnt = doc.createElement("span");
      cnt.className = "record-group__best";
      cnt.textContent = groups[gkey].length + " 語";
      head.appendChild(titleEl);
      head.appendChild(cnt);
      group.appendChild(head);

      groups[gkey].forEach(function (w) {
        var item = doc.createElement("div");
        item.className = "mistake-item";

        var en = doc.createElement("span");
        en.className = "mistake-item__en";
        en.textContent = w.en;
        var ja = doc.createElement("span");
        ja.className = "mistake-item__ja";
        ja.textContent = w.ja;
        var count = doc.createElement("span");
        count.className = "mistake-item__count";
        count.textContent = "✗" + w.count;
        var del = doc.createElement("button");
        del.className = "mistake-item__del";
        del.type = "button";
        del.textContent = "×";
        del.title = "この単語をリストから外す";
        del.addEventListener("click", function () {
          global.StudyStore.removeMistake(w.gradeId, w.en);
          renderMistakes();
        });

        item.appendChild(en);
        item.appendChild(ja);
        item.appendChild(count);
        item.appendChild(del);
        group.appendChild(item);
      });

      body.appendChild(group);
    });
  }

  function startMistakeReview(format) {
    var words = global.StudyStore.listMistakes();
    if (!words.length) return;
    // 記述は意味→英語固定。選択式は英語→意味で出題。
    var dir = format === "type" ? "j2e" : "e2j";
    startSession(global.VocabQuiz.buildFromWords(words, dir, "all", format));
  }

  // ---- 収録単語のCSVエクスポート ----
  // フィールドにカンマ・改行・引用符が含まれる場合に備えて必ずクォートする
  function csvCell(v) {
    return '"' + String(v == null ? "" : v).replace(/"/g, '""') + '"';
  }

  function exportWordsCSV() {
    var rows = global.VocabQuiz.dump();
    var header = ["学年", "範囲", "英語", "日本語"];
    var lines = [header.map(csvCell).join(",")];
    rows.forEach(function (r) {
      lines.push([r.gradeLabel, r.setLabel, r.en, r.ja].map(csvCell).join(","));
    });
    // Excelで文字化けしないよう UTF-8 BOM + CRLF
    var csv = "﻿" + lines.join("\r\n") + "\r\n";
    var blob = new global.Blob([csv], { type: "text/csv;charset=utf-8;" });
    var url = global.URL.createObjectURL(blob);
    var a = doc.createElement("a");
    var d = new Date();
    var pad = function (n) { return (n < 10 ? "0" : "") + n; };
    a.href = url;
    a.download = "智翔館_収録単語_" + d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate()) + ".csv";
    doc.body.appendChild(a);
    a.click();
    doc.body.removeChild(a);
    global.URL.revokeObjectURL(url);
  }

  function exportRikaCSV() {
    var rows = global.RikaQuiz.dump();
    var header = ["学年", "範囲", "問題", "答え", "誤答候補"];
    var lines = [header.map(csvCell).join(",")];
    rows.forEach(function (r) {
      lines.push([r.gradeLabel, r.setLabel, r.q, r.a, r.d].map(csvCell).join(","));
    });
    var csv = "﻿" + lines.join("\r\n") + "\r\n";
    var blob = new global.Blob([csv], { type: "text/csv;charset=utf-8;" });
    var url = global.URL.createObjectURL(blob);
    var a = doc.createElement("a");
    var d = new Date();
    var pad = function (n) { return (n < 10 ? "0" : "") + n; };
    a.href = url;
    a.download = "智翔館_理科問題_" + d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate()) + ".csv";
    doc.body.appendChild(a);
    a.click();
    doc.body.removeChild(a);
    global.URL.revokeObjectURL(url);
  }

  function exportShakaiCSV() {
    var rows = global.ShakaiQuiz.dump();
    var header = ["学年", "範囲", "問題", "答え", "誤答候補"];
    var lines = [header.map(csvCell).join(",")];
    rows.forEach(function (r) {
      lines.push([r.gradeLabel, r.setLabel, r.q, r.a, r.d].map(csvCell).join(","));
    });
    var csv = "﻿" + lines.join("\r\n") + "\r\n";
    var blob = new global.Blob([csv], { type: "text/csv;charset=utf-8;" });
    var url = global.URL.createObjectURL(blob);
    var a = doc.createElement("a");
    var d = new Date();
    var pad = function (n) { return (n < 10 ? "0" : "") + n; };
    a.href = url;
    a.download = "智翔館_社会問題_" + d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate()) + ".csv";
    doc.body.appendChild(a);
    a.click();
    doc.body.removeChild(a);
    global.URL.revokeObjectURL(url);
  }

  // ---- データ送信（得点をスプレッドシートへ）----

  // 「データを送信」の開閉
  function toggleSendForm() {
    var form = doc.getElementById("send-form");
    var btn = doc.getElementById("send-toggle");
    var open = form.hidden;
    form.hidden = !open;
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    if (open) doc.getElementById("send-status").textContent = "";
  }

  // 学習記録を、テスト（groupId）ごとの得点サマリ行に変換する
  function buildSendRows() {
    var data = global.StudyStore.exportAll();
    var records = data.records || {};
    return Object.keys(records).map(function (gid) {
      var g = records[gid];
      var best = g.best || {};
      var last = (g.history && g.history[0]) || {};
      return {
        groupId: gid,
        test: g.label || gid,
        mode: gid.split(":")[0],
        bestScore: best.score != null ? best.score : "",
        bestTotal: best.total != null ? best.total : "",
        bestRate: (best.total ? Math.round((best.score / best.total) * 100) : ""),
        attempts: g.history ? g.history.length : 0,
        lastScore: last.score != null ? last.score : "",
        lastTotal: last.total != null ? last.total : "",
        lastAt: last.at || "",
      };
    });
  }

  function setSendStatus(msg, kind) {
    var el = doc.getElementById("send-status");
    el.textContent = msg;
    el.className = "send__status" + (kind ? " is-" + kind : "");
  }

  // 入力された生徒情報＋得点サマリをスプレッドシート（Apps Script）へ送信する
  function sendData() {
    var grade = doc.getElementById("send-grade").value;
    var campus = doc.getElementById("send-campus").value;
    var name = doc.getElementById("send-name").value.trim();

    if (!grade || !campus || !name) {
      setSendStatus("学年・校舎・名前をすべて入力してください。", "bad");
      return;
    }
    var endpoint = (global.AppConfig && global.AppConfig.SHEET_ENDPOINT) || "";
    if (!endpoint) {
      setSendStatus("送信先が未設定です。先生に連絡してください。", "bad");
      return;
    }
    var rows = buildSendRows();
    if (!rows.length) {
      setSendStatus("送信できる学習記録がありません。まず問題を解いてください。", "bad");
      return;
    }

    var payload = {
      app: "chishokan-study-tool",
      sentAt: new Date().toISOString(),
      student: { grade: grade, campus: campus, name: name },
      rows: rows,
    };

    var btn = doc.getElementById("send-submit");
    btn.disabled = true;
    setSendStatus("送信中…", null);

    // Apps Script へは text/plain で送る（プリフライトを避けるため）。
    // 応答はクロスオリジンで読めないので no-cors の成功＝送信完了とみなす。
    global.fetch(endpoint, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    }).then(function () {
      setSendStatus("送信しました（" + rows.length + "件）。ありがとう！", "good");
      btn.disabled = false;
    }).catch(function () {
      setSendStatus("送信に失敗しました。通信環境を確認してもう一度お試しください。", "bad");
      btn.disabled = false;
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

  // 学年チップを生成（先頭を選択状態に）
  function buildVocabGradeOptions() {
    var wrap = doc.getElementById("vocab-grade");
    wrap.innerHTML = "";
    global.VocabQuiz.gradeList().forEach(function (g, i) {
      addChip(wrap, "vocab-grade", g.id, g.label, i === 0);
    });
  }

  // 選択中の学年に応じて出題範囲チップを作り直す
  function buildVocabSetOptions() {
    var gradeId = checkedValue("vocab-grade");
    var wrap = doc.getElementById("vocab-set");
    wrap.innerHTML = "";
    var list = global.VocabQuiz.setList(gradeId);

    var total = 0;
    list.forEach(function (s, i) {
      total += s.count;
      addChip(wrap, "vocab-set", s.id, s.label + "（" + s.count + "語）", i === 0);
    });
    // その学年の全範囲からまとめて出題
    addChip(wrap, "vocab-set", "all", "全範囲（" + total + "語）", false);
  }

  // 理科：学年チップを生成（先頭を選択状態に）
  function buildRikaGradeOptions() {
    var wrap = doc.getElementById("rika-grade");
    wrap.innerHTML = "";
    global.RikaQuiz.gradeList().forEach(function (g, i) {
      addChip(wrap, "rika-grade", g.id, g.label, i === 0);
    });
  }

  // 選択中の学年に応じて分野チップを作り直す
  function buildRikaSetOptions() {
    var gradeId = checkedValue("rika-grade");
    var wrap = doc.getElementById("rika-set");
    wrap.innerHTML = "";
    var list = global.RikaQuiz.setList(gradeId);

    var total = 0;
    list.forEach(function (s, i) {
      total += s.count;
      addChip(wrap, "rika-set", s.id, s.label + "（" + s.count + "問）", i === 0);
    });
    // その学年の全分野からまとめて出題
    addChip(wrap, "rika-set", "all", "全分野（" + total + "問）", false);
  }

  // 社会：単元チップを生成（先頭を選択状態に）
  function buildShakaiGradeOptions() {
    var wrap = doc.getElementById("shakai-grade");
    wrap.innerHTML = "";
    global.ShakaiQuiz.gradeList().forEach(function (g, i) {
      addChip(wrap, "shakai-grade", g.id, g.label, i === 0);
    });
  }

  // 選択中の単元に応じて項目チップを作り直す
  function buildShakaiSetOptions() {
    var gradeId = checkedValue("shakai-grade");
    var wrap = doc.getElementById("shakai-set");
    wrap.innerHTML = "";
    var list = global.ShakaiQuiz.setList(gradeId);

    var total = 0;
    list.forEach(function (s, i) {
      total += s.count;
      addChip(wrap, "shakai-set", s.id, s.label + "（" + s.count + "問）", i === 0);
    });
    // その単元の全項目からまとめて出題
    addChip(wrap, "shakai-set", "all", "全項目（" + total + "問）", false);
  }

  function startCalc() {
    var op = checkedValue("calc-op");
    var level = checkedValue("calc-level");
    var count = parseInt(checkedValue("calc-count"), 10);
    startSession(global.CalcDrill.build(op, level, count));
  }

  function startVocab() {
    var gradeId = checkedValue("vocab-grade");
    var setId = checkedValue("vocab-set");
    var dir = checkedValue("vocab-dir");
    var format = checkedValue("vocab-format");
    var countRaw = checkedValue("vocab-count");
    var count = countRaw === "all" ? "all" : parseInt(countRaw, 10);
    startSession(global.VocabQuiz.build(gradeId, setId, dir, count, format));
  }

  function startRika() {
    var gradeId = checkedValue("rika-grade");
    var setId = checkedValue("rika-set");
    var format = checkedValue("rika-format");
    var countRaw = checkedValue("rika-count");
    var count = countRaw === "all" ? "all" : parseInt(countRaw, 10);
    startSession(global.RikaQuiz.build(gradeId, setId, format, count));
  }

  function startShakai() {
    var gradeId = checkedValue("shakai-grade");
    var setId = checkedValue("shakai-set");
    var format = checkedValue("shakai-format");
    var countRaw = checkedValue("shakai-count");
    var count = countRaw === "all" ? "all" : parseInt(countRaw, 10);
    startSession(global.ShakaiQuiz.build(gradeId, setId, format, count));
  }

  function retry() {
    if (!lastSetup) { show("home"); return; }
    if (lastSetup.mode === "calc") {
      startSession(global.CalcDrill.build(lastSetup.op, lastSetup.level, session.questions.length));
    } else if (lastSetup.isReview) {
      // 苦手復習：その時点の苦手単語で作り直す（解けた分は減っている）
      startMistakeReview(lastSetup.format);
    } else if (lastSetup.mode === "rika") {
      startSession(global.RikaQuiz.build(lastSetup.gradeId, lastSetup.setId, lastSetup.format, session.questions.length));
    } else if (lastSetup.mode === "shakai") {
      startSession(global.ShakaiQuiz.build(lastSetup.gradeId, lastSetup.setId, lastSetup.format, session.questions.length));
    } else {
      var count = session.questions.length;
      startSession(global.VocabQuiz.build(lastSetup.gradeId, lastSetup.setId, lastSetup.dir, count, lastSetup.format));
    }
  }

  // ---- イベント配線 ----
  function init() {
    buildVocabGradeOptions();
    buildVocabSetOptions();
    // 学年を切り替えたら範囲チップを作り直す
    doc.getElementById("vocab-grade").addEventListener("change", buildVocabSetOptions);

    buildRikaGradeOptions();
    buildRikaSetOptions();
    doc.getElementById("rika-grade").addEventListener("change", buildRikaSetOptions);

    buildShakaiGradeOptions();
    buildShakaiSetOptions();
    doc.getElementById("shakai-grade").addEventListener("change", buildShakaiSetOptions);

    // データ属性で画面遷移するボタンをまとめて配線
    $all("[data-goto]").forEach(function (btn) {
      btn.addEventListener("click", function () { show(btn.getAttribute("data-goto")); });
    });

    doc.getElementById("calc-start").addEventListener("click", startCalc);
    doc.getElementById("vocab-start").addEventListener("click", startVocab);
    doc.getElementById("rika-start").addEventListener("click", startRika);
    doc.getElementById("shakai-start").addEventListener("click", startShakai);

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

    // 苦手だけ復習（4択 / 8択 / 記述）
    $all("[data-review]").forEach(function (btn) {
      btn.addEventListener("click", function () { startMistakeReview(btn.getAttribute("data-review")); });
    });

    doc.getElementById("mistakes-clear").addEventListener("click", function () {
      if (global.confirm("マイ単語帳をすべて消します。よろしいですか？")) {
        global.StudyStore.clearMistakes();
        renderMistakes();
      }
    });

    doc.getElementById("vocab-export").addEventListener("click", exportWordsCSV);
    doc.getElementById("rika-export").addEventListener("click", exportRikaCSV);
    doc.getElementById("shakai-export").addEventListener("click", exportShakaiCSV);

    // 学習記録の送信（スプレッドシートへ）
    doc.getElementById("send-toggle").addEventListener("click", toggleSendForm);
    doc.getElementById("send-submit").addEventListener("click", sendData);

    show("home");
  }

  if (doc.readyState === "loading") {
    doc.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})(window);
