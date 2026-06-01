/**
 * vocab.js
 * 英単語テスト。中学レベルの単語リストを内蔵し、4択問題を生成する。
 * 出題方向：英語→意味(e2j) / 意味→英語(j2e)
 */
(function (global) {
  "use strict";

  // 出題範囲ごとの単語リスト（en: 英語, ja: 日本語の意味）
  var SETS = {
    basic: {
      label: "基礎（中1）",
      words: [
        { en: "apple", ja: "りんご" },
        { en: "book", ja: "本" },
        { en: "dog", ja: "犬" },
        { en: "cat", ja: "ねこ" },
        { en: "school", ja: "学校" },
        { en: "teacher", ja: "先生" },
        { en: "friend", ja: "友だち" },
        { en: "water", ja: "水" },
        { en: "morning", ja: "朝" },
        { en: "night", ja: "夜" },
        { en: "city", ja: "都市・市" },
        { en: "country", ja: "国・いなか" },
        { en: "family", ja: "家族" },
        { en: "music", ja: "音楽" },
        { en: "color", ja: "色" },
        { en: "season", ja: "季節" },
        { en: "answer", ja: "答え・答える" },
        { en: "question", ja: "質問" },
        { en: "letter", ja: "手紙・文字" },
        { en: "language", ja: "言語" },
      ],
    },
    verb: {
      label: "動詞（中2）",
      words: [
        { en: "make", ja: "作る" },
        { en: "bring", ja: "持ってくる" },
        { en: "buy", ja: "買う" },
        { en: "sell", ja: "売る" },
        { en: "learn", ja: "学ぶ" },
        { en: "teach", ja: "教える" },
        { en: "remember", ja: "覚えている・思い出す" },
        { en: "forget", ja: "忘れる" },
        { en: "understand", ja: "理解する" },
        { en: "decide", ja: "決める" },
        { en: "build", ja: "建てる" },
        { en: "carry", ja: "運ぶ" },
        { en: "catch", ja: "つかまえる" },
        { en: "choose", ja: "選ぶ" },
        { en: "explain", ja: "説明する" },
        { en: "improve", ja: "改善する・上達する" },
        { en: "introduce", ja: "紹介する" },
        { en: "receive", ja: "受け取る" },
        { en: "borrow", ja: "借りる" },
        { en: "return", ja: "返す・もどる" },
      ],
    },
    adj: {
      label: "形容詞・副詞（中3）",
      words: [
        { en: "important", ja: "重要な" },
        { en: "difficult", ja: "難しい" },
        { en: "easy", ja: "簡単な" },
        { en: "famous", ja: "有名な" },
        { en: "different", ja: "ちがう・別の" },
        { en: "popular", ja: "人気のある" },
        { en: "expensive", ja: "高価な" },
        { en: "dangerous", ja: "危険な" },
        { en: "necessary", ja: "必要な" },
        { en: "useful", ja: "役に立つ" },
        { en: "careful", ja: "注意深い" },
        { en: "quickly", ja: "すばやく" },
        { en: "slowly", ja: "ゆっくりと" },
        { en: "usually", ja: "ふつうは" },
        { en: "suddenly", ja: "突然" },
        { en: "almost", ja: "ほとんど" },
        { en: "finally", ja: "ついに・最後に" },
        { en: "probably", ja: "たぶん" },
        { en: "especially", ja: "特に" },
        { en: "recently", ja: "最近" },
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

  /**
   * 4択問題セットを生成する。
   * @param {string} setId  範囲ID
   * @param {string} dir    "e2j" または "j2e"
   * @param {number|"all"} count 問題数
   */
  function build(setId, dir, count) {
    var set = SETS[setId];
    if (!set) throw new Error("unknown vocab set: " + setId);

    var keyQ = dir === "j2e" ? "ja" : "en";
    var keyA = dir === "j2e" ? "en" : "ja";

    var pool = shuffle(set.words);
    var n = count === "all" ? pool.length : Math.min(count, pool.length);
    var picked = pool.slice(0, n);

    var questions = picked.map(function (w) {
      // 正解以外から3つダミーを選ぶ
      var distractors = shuffle(
        set.words.filter(function (x) { return x[keyA] !== w[keyA]; })
      ).slice(0, 3).map(function (x) { return x[keyA]; });

      var choices = shuffle(distractors.concat([w[keyA]]));
      return {
        question: w[keyQ],
        answer: w[keyA],
        choices: choices,
        accepts: "choice",
      };
    });

    var dirLabel = dir === "j2e" ? "意味→英語" : "英語→意味";
    return {
      questions: questions,
      meta: {
        mode: "vocab",
        groupId: "vocab:" + setId + ":" + dir,
        label: "英単語 / " + set.label + " / " + dirLabel,
        setId: setId,
        dir: dir,
      },
    };
  }

  global.VocabQuiz = { setList: setList, build: build };
})(window);
