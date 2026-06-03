/**
 * shakai.js（県立中 確認テスト：社会）
 * study-tool/js/shakai.js を雛形にした一問一答モジュール。
 * 単元（GRADES）→ 項目（sets）の階層で問題を内蔵し、4択 / 8択を生成する。
 * 問題文（q）→ 答え（a）形式。各問題は任意で d:[...]（間違いやすい誤答候補）を持てる。
 *
 *   ★誤答選択肢の仕組み（study-tool と同じ）
 *     出題時はまず d からランダムに選び、足りない分だけ同項目→同単元→全体の
 *     実在の答えで補う。d が無い問題は、同項目などの他の答えから自動で誤答を作る。
 *
 *   データは data/shakai_source.csv から tools/build-data.js が生成する
 *   （学年列=単元, 範囲列=項目, 問題, 答え, 誤答候補）。直接編集せず CSV を編集すること。
 */
(function (global) {
  "use strict";

  /* AUTO-GENERATED:shakai — data/shakai_source.csv から tools/build-data.js が生成。ここを直接編集せず CSV を編集して取り込む */
  var GRADES = {
    g1e35bca: {
      label: "世界と日本の姿",
      sets: {
        sisidti: {
          label: "地球の姿",
          items: [
            { q: "面積が世界最大の大陸を何というか。", a: "ユーラシア大陸", d: ["アフリカ大陸", "北アメリカ大陸", "南アメリカ大陸", "オーストラリア大陸"] },
            { q: "世界最大の海洋を何というか。", a: "太平洋", d: ["大西洋", "インド洋", "北極海", "地中海"] },
            { q: "緯度が0度である線を特に何というか。", a: "赤道", d: ["本初子午線", "日付変更線", "北回帰線", "標準時子午線"] },
          ],
        },
        skleq2y: {
          label: "日本の姿",
          items: [
            { q: "兵庫県明石市を通る日本の標準時子午線の経度は東経何度か。", a: "東経135度", d: ["東経140度", "東経130度", "東経150度", "東経120度"] },
            { q: "日本の最北端に位置する、千島列島にふくまれる島を何というか。", a: "択捉島", d: ["南鳥島", "沖ノ鳥島", "与那国島", "歯舞群島"] },
          ],
        },
      },
    },
    g1v66ygn: {
      label: "気候とくらし",
      sets: {
        s1mcorpg: {
          label: "日本の気候",
          items: [
            { q: "次の資料は、ある都市の月別降水量です。この都市が属する気候を何というか。", a: "瀬戸内の気候", d: ["太平洋側の気候", "日本海側の気候", "中央高地の気候"], p: "ある都市の月別降水量（mm）\n　1月：38\n　6月：150\n　9月：130\n　12月：46\n※ 年間を通して降水量が少ない" },
            { q: "資料の信号機は、雪の多い地域で多く見られる縦型の信号機です。この形が使われる主な理由として正しいものはどれか。", a: "雪が積もりにくくするため", d: ["製造費を安くするため", "歩行者から見やすくするため", "LEDの数を増やすため"], img: "assets/shingo-tate.svg" },
          ],
        },
      },
    },
  };
  /* /AUTO-GENERATED:shakai */

  function gradeList() {
    return Object.keys(GRADES).map(function (id) {
      return { id: id, label: GRADES[id].label };
    });
  }

  // 指定単元に含まれる項目一覧（並びは取り込み順）
  function setList(gradeId) {
    var grade = GRADES[gradeId];
    if (!grade) return [];
    return Object.keys(grade.sets).map(function (sid) {
      return { id: sid, label: grade.sets[sid].label, count: grade.sets[sid].items.length };
    });
  }

  // 問題に出自（単元・項目）を付けたコピーを返す
  function tagItems(gradeId, setId) {
    return GRADES[gradeId].sets[setId].items.map(function (it) {
      return { q: it.q, a: it.a, d: it.d || [], p: it.p || "", img: it.img || "", gradeId: gradeId, setId: setId };
    });
  }

  // 指定項目の問題配列。setId が "all" のときは単元内の全項目を結合。
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
    if (setId === "all") return prefix + "全項目";
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

  // 優先順位つきプール群（answer 配列の配列）から、answer と重複しない誤答を num 個集める。
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
   * @param {string} setId   項目ID（"all" で単元内の全項目）
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
        passage: it.p || "",
        image: it.img || "",
        src: { gradeId: it.gradeId, setId: it.setId },
      };
    });

    return {
      questions: questions,
      meta: {
        mode: "shakai",
        groupId: "shakai:" + gradeId + ":" + setId + ":" + format,
        label: "社会 / " + rangeLabel(gradeId, setId) + " / " + fmtLabelOf(format),
        gradeId: gradeId,
        setId: setId,
        format: format,
      },
    };
  }

  // 収録問題を元の並び順で平坦に書き出す（CSVエクスポート用）
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
            p: it.p || "",
            img: it.img || "",
          });
        });
      });
    });
    return rows;
  }

  global.ShakaiQuiz = {
    gradeList: gradeList,
    setList: setList,
    build: build,
    dump: dump,
  };
})(window);
