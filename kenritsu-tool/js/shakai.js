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
    g1yzbenw: {
      label: "テストデータ１",
      sets: {
        se54mu: {
          label: "大問1 国土と領土",
          items: [
            { q: "日本の最南端に位置する、護岸工事が行われたサンゴ礁の島は何か。", a: "沖ノ鳥島", d: ["南鳥島", "与那国島", "択捉島"] },
            { q: "日本の最東端に位置する島は何か。", a: "南鳥島", d: ["沖ノ鳥島", "与那国島", "択捉島"] },
            { q: "日本の最西端に位置する島は何か。", a: "与那国島", d: ["沖ノ鳥島", "南鳥島", "択捉島"] },
            { q: "日本の最北端に位置する、千島列島にふくまれる島は何か。", a: "択捉島", d: ["南鳥島", "沖ノ鳥島", "与那国島"] },
            { q: "排他的経済水域は、海岸からおよそ何海里以内に設定されるか。", a: "200海里", d: ["12海里", "100海里", "370海里"] },
            { q: "排他的経済水域で、沿岸国が利用する権利をもつものは何か。", a: "水産資源や鉱産資源", d: ["他国の漁業権", "航空路", "標準時"] },
            { q: "国が沖ノ鳥島の周りをコンクリートブロックで囲む工事を行った理由として正しいものはどれか。", a: "島が水没すると広い排他的経済水域を失うから", d: ["観光客を増やすため", "漁港をつくるため", "軍事拠点にするため"] },
          ],
        },
        s1pi86vm: {
          label: "大問2 沖縄の伝統的な家",
          items: [
            { q: "沖縄の伝統的な家で戸口を広くとっているのは、風通しをよくして何のためか。", a: "夏の暑さをやわらげるため", d: ["冬の寒さを防ぐため", "雪の侵入を防ぐため", "湿気をためるため"] },
            { q: "沖縄の伝統的な家で、屋根がわらをしっくいで固めたり石垣をめぐらせたりするのは何のためか。", a: "台風（強い風）から家を守るため", d: ["地震から家を守るため", "雪の重みに備えるため", "日光を取り入れるため"] },
          ],
        },
        syp4cnk: {
          label: "大問3 農業",
          items: [
            { q: "小さく不規則な田を大きく整える耕地整理を行うと、米づくりの作業はどう変わるか。", a: "大型機械が使いやすくなり作業が効率的になる", d: ["手作業が増えて時間がかかる", "田が小さくなる", "水が引きにくくなる"] },
            { q: "よりよい性質をもつ新しい品種をつくり出すことを何というか。", a: "品種改良", d: ["耕地整理", "二期作", "輪作"] },
            { q: "「はえぬき」は親品種のよい性質を受けついでいる。あてはまる説明はどれか。", a: "たおれにくく、つぶの形がきれいで味もよい", d: ["たおれやすく味も悪い", "つぶの形がそろわない", "寒さに弱く育てにくい"] },
          ],
        },
        sbj4vf: {
          label: "大問4 気候とくらし",
          items: [
            { q: "長野市と高松市に共通する、降水量から読み取れる気候の特色はどれか。", a: "一年を通して降水量が少ない", d: ["一年を通して降水量が多い", "夏に降水量が特に多い", "冬に降水量が特に多い"] },
            { q: "長野市や高松市で降水量が少ない理由として正しいものはどれか。", a: "まわりを山地に囲まれ、湿った季節風がさえぎられるから", d: ["海に面し季節風の影響が強いから", "標高が低く台風が多いから", "赤道に近く乾燥しているから"] },
            { q: "雪の多い地域で信号機を縦型にしているのはなぜか。", a: "雪が積もりにくくするため", d: ["製造費を安くするため", "歩行者から見やすくするため", "LEDの数を増やすため"] },
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
