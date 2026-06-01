/**
 * vocab.js
 * 英単語テスト。中学レベルの単語リストを内蔵し、4択問題を生成する。
 * 出題方向：英語→意味(e2j) / 意味→英語(j2e)
 */
(function (global) {
  "use strict";

  // 出題範囲ごとの単語リスト（en: 英語, ja: 日本語の意味）
  var SETS = {
    u1p1: {
      label: "Unit1 Part1",
      words: [
        { en: "I'm", ja: "I amの短縮形" },
        { en: "you're", ja: "you areの短縮形" },
        { en: "love", ja: "～が大好きである" },
        { en: "call", ja: "呼ぶ、名づける" },
        { en: "club", ja: "クラブ、部" },
        { en: "Japanese", ja: "日本の" },
        { en: "from ~", ja: "～から、～出身の" },
        { en: "want to ~", ja: "～したい" },
        { en: "the", ja: "その" },
        { en: "me", ja: "私を（に）" },
        { en: "A and B", ja: "AとB" },
        { en: "Call me ~ .", ja: "私を～と呼んでください。" },
        { en: "join", ja: "～に加わる、参加する" },
        { en: "sweet", ja: "甘い菓子" },
        { en: "number", ja: "数字" },
        { en: "~, too", ja: "～もまた" },
        { en: "everyone", ja: "みなさん" },
        { en: "South Africa", ja: "南アフリカ共和国" },
      ],
    },
    u1p2: {
      label: "Unit1 Part2",
      words: [
        { en: "not ~", ja: "～でない" },
        { en: "no", ja: "いいえ" },
        { en: "don't", ja: "do notの短縮形" },
        { en: "watch", ja: "～を（注意して）見る" },
        { en: "friend", ja: "友達" },
        { en: "fan", ja: "ファン" },
        { en: "often", ja: "しばしば、よく" },
        { en: "with ~", ja: "～といっしょに" },
        { en: "but", ja: "しかし" },
        { en: "rugby", ja: "ラグビー" },
        { en: "great", ja: "すばらしい" },
        { en: "oh", ja: "あら" },
      ],
    },
    u1p3: {
      label: "Unit1 Part3",
      words: [
        { en: "take", ja: "～を利用する、～を受ける" },
        { en: "draw", ja: "（線や絵）をかく" },
        { en: "swimming", ja: "水泳" },
        { en: "school", ja: "学校" },
        { en: "art", ja: "芸術、美術" },
        { en: "a, an", ja: "１つの、1人の" },
        { en: "now", ja: "今" },
        { en: "in ~", ja: "～に所属して" },
        { en: "about ~", ja: "～について" },
        { en: "How about you ?", ja: "あなたはどうですか。" },
        { en: "lesson", ja: "授業" },
        { en: "comic", ja: "マンガ" },
        { en: "anime", ja: "（日本の）アニメ" },
        { en: "so", ja: "だから" },
        { en: "wow", ja: "うわあ" },
      ],
    },
  };

  function setList() {
    return Object.keys(SETS).map(function (id) {
      return { id: id, label: SETS[id].label, count: SETS[id].words.length };
    });
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  // 指定範囲の単語配列を返す。"all" は全範囲を結合。
  function wordsFor(setId) {
    if (setId === "all") {
      var merged = [];
      Object.keys(SETS).forEach(function (id) { merged = merged.concat(SETS[id].words); });
      return merged;
    }
    var set = SETS[setId];
    if (!set) throw new Error("unknown vocab set: " + setId);
    return set.words;
  }

  function labelFor(setId) {
    return setId === "all" ? "全範囲" : SETS[setId].label;
  }

  /**
   * 問題セットを生成する。
   * @param {string} setId  範囲ID（"all" で全範囲）
   * @param {string} dir    "e2j"（英語→意味）/ "j2e"（意味→英語）
   * @param {number|"all"} count 問題数
   * @param {string} format "choice4" / "choice8" / "type"（記述・英語入力）
   */
  function build(setId, dir, count, format) {
    format = format || "choice4";
    var words = wordsFor(setId);
    var isType = format === "type";

    // 記述は「意味→英語（つづり入力）」固定。選択式は dir に従う。
    var keyQ = isType ? "ja" : (dir === "j2e" ? "ja" : "en");
    var keyA = isType ? "en" : (dir === "j2e" ? "en" : "ja");

    var pool = shuffle(words);
    var n = count === "all" ? pool.length : Math.min(count, pool.length);
    var picked = pool.slice(0, n);

    // 選択肢の数（正解を含む）。プールが足りなければ可能な数まで。
    var numChoices = Math.min(format === "choice8" ? 8 : 4, words.length);

    var questions = picked.map(function (w) {
      var q = { question: w[keyQ], answer: w[keyA] };
      if (isType) {
        q.accepts = "text";
      } else {
        var distractors = shuffle(
          words.filter(function (x) { return x[keyA] !== w[keyA]; })
        ).slice(0, numChoices - 1).map(function (x) { return x[keyA]; });
        q.choices = shuffle(distractors.concat([w[keyA]]));
        q.accepts = "choice";
      }
      return q;
    });

    var dirLabel = isType ? "意味→英語" : (dir === "j2e" ? "意味→英語" : "英語→意味");
    var fmtLabel = format === "choice8" ? "8択" : (isType ? "記述" : "4択");
    return {
      questions: questions,
      meta: {
        mode: "vocab",
        groupId: "vocab:" + setId + ":" + (isType ? "type" : dir) + ":" + format,
        label: "英単語 / " + labelFor(setId) + " / " + dirLabel + " / " + fmtLabel,
        setId: setId,
        dir: dir,
        format: format,
      },
    };
  }

  global.VocabQuiz = { setList: setList, build: build };
})(window);
