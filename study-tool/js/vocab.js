/**
 * vocab.js
 * 英単語テスト。学年 → 出題範囲（Unit/Part）の階層で単語を内蔵し、
 * 4択 / 8択 / 記述の問題を生成する。
 * 出題方向：英語→意味(e2j) / 意味→英語(j2e)
 */
(function (global) {
  "use strict";

  // 学年ごとの単語データ。各 set が画面の「出題範囲」になる。
  // word: { en: 英語, ja: 日本語の意味 }
  var GRADES = {
    g1: {
      label: "中1",
      sets: {
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
      },
    },
    g2: {
      label: "中2",
      sets: {
        u1p1: {
          label: "Unit1 Talent Show Part1",
          words: [
            { en: "will", ja: "～するでしょう、～するつもりです" },
            { en: "won't", ja: "will notの短縮形" },
            { en: "it'll", ja: "it willの短縮形" },
            { en: "I'll", ja: "I willの短縮形" },
            { en: "forget-forgot", ja: "～を忘れる[原形-過去形]" },
            { en: "send", ja: "～を送る" },
            { en: "carry", ja: "～を運ぶ" },
            { en: "sunny", ja: "晴れた" },
            { en: "heavy", ja: "重い" },
            { en: "cloudy", ja: "曇りの" },
            { en: "reach", ja: "（目標に）手が届く" },
            { en: "move", ja: "～を移動する" },
            { en: "invite", ja: "～を招待する" },
            { en: "website", ja: "ウェブサイト、ホームページ" },
            { en: "step", ja: "ステップ、段階" },
            { en: "low", ja: "最低値" },
            { en: "information", ja: "情報" },
            { en: "high", ja: "最高値" },
            { en: "weather", ja: "天気" },
            { en: "online", ja: "ネットで、オンラインで" },
            { en: "hard", ja: "激しく" },
            { en: "we'd", ja: "we wouldの短縮形" },
            { en: "sign up", ja: "申し込む" },
            { en: "~, don't you?", ja: "（あなたは）～ですよね?" },
            { en: "degree", ja: "摂氏～度（℃）" },
            { en: "video clip", ja: "動画" },
          ],
        },
        u1p2: {
          label: "Unit1 Talent Show Part2",
          words: [
            { en: "be going to ~", ja: "～するつもり" },
            { en: "partner", ja: "パートナー、相棒" },
            { en: "take part in ~", ja: "～に参加する" },
            { en: "skill", ja: "スキル、腕前" },
            { en: "end", ja: "終わり" },
            { en: "until", ja: "～まで（ずっと）" },
            { en: "hand in ~", ja: "～を提出する" },
            { en: "get a haircut", ja: "髪を切る" },
          ],
        },
        u1p3: {
          label: "Unit1 Talent Show Part3",
          words: [
            { en: "introduce", ja: "～を紹介する" },
            { en: "history", ja: "歴史" },
            { en: "health", ja: "健康" },
            { en: "recipe", ja: "レシピ、調理法" },
          ],
        },
        u1rt: {
          label: "Unit1 Talent Show R&T・T&S",
          words: [
            { en: "hear", ja: "～ということを耳にする、～だそうだ" },
            { en: "meeting", ja: "ミーティング、会議" },
            { en: "through", ja: "～を通して、～によって" },
            { en: "in total", ja: "総計で" },
            { en: "be ready to ~", ja: "～する準備が整う" },
            { en: "look forward to ~", ja: "～を楽しみにする" },
            { en: "each other", ja: "お互い" },
            { en: "be able to ~", ja: "～できる" },
            { en: "for the first time", ja: "初めて" },
            { en: "plan", ja: "～を計画する" },
            { en: "perform", ja: "演ずる、披露する" },
            { en: "title", ja: "題、演目" },
            { en: "thousand", ja: "千（の）" },
            { en: "success", ja: "成功" },
            { en: "behind", ja: "～の後ろに" },
            { en: "study", ja: "勉強" },
            { en: "stage", ja: "舞台、ステージ" },
            { en: "president", ja: "（クラスなどの）総代" },
            { en: "Miller", ja: "ミラー[人の姓]" },
            { en: "JHS", ja: "Junior High Schoolの略" },
            { en: "interview", ja: "インタビュー" },
            { en: "HS", ja: "High Schoolの略" },
            { en: "we'll", ja: "we willの短縮形" },
            { en: "end A with B", ja: "AをBとともに終える" },
            { en: "decide", ja: "～を決める" },
            { en: "suggest", ja: "～を提案する" },
            { en: "participant", ja: "参加者" },
            { en: "audience", ja: "聴衆、観客" },
            { en: "they'll", ja: "they willの短縮形" },
          ],
        },
      },
    },
  };

  // 学年の一覧（出題画面の「学年」チップ用）
  function gradeList() {
    return Object.keys(GRADES).map(function (id) {
      return { id: id, label: GRADES[id].label };
    });
  }

  // 指定学年の出題範囲一覧（「出題範囲」チップ用）
  function setList(gradeId) {
    var grade = GRADES[gradeId];
    if (!grade) return [];
    return Object.keys(grade.sets).map(function (id) {
      return { id: id, label: grade.sets[id].label, count: grade.sets[id].words.length };
    });
  }

  // 指定範囲の単語配列。setId が "all" のときは学年内の全範囲を結合。
  function wordsFor(gradeId, setId) {
    var grade = GRADES[gradeId];
    if (!grade) throw new Error("unknown grade: " + gradeId);
    if (setId === "all") {
      var merged = [];
      Object.keys(grade.sets).forEach(function (id) { merged = merged.concat(grade.sets[id].words); });
      return merged;
    }
    var set = grade.sets[setId];
    if (!set) throw new Error("unknown set: " + gradeId + "/" + setId);
    return set.words;
  }

  function rangeLabel(gradeId, setId) {
    var grade = GRADES[gradeId];
    var prefix = grade ? grade.label + " " : "";
    if (setId === "all") return prefix + "全範囲";
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

  /**
   * 問題セットを生成する。
   * @param {string} gradeId 学年ID
   * @param {string} setId   範囲ID（"all" で学年内の全範囲）
   * @param {string} dir     "e2j"（英語→意味）/ "j2e"（意味→英語）
   * @param {number|"all"} count 問題数
   * @param {string} format  "choice4" / "choice8" / "type"（記述・英語入力）
   */
  function build(gradeId, setId, dir, count, format) {
    format = format || "choice4";
    var words = wordsFor(gradeId, setId);
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
        groupId: "vocab:" + gradeId + ":" + setId + ":" + (isType ? "type" : dir) + ":" + format,
        label: "英単語 / " + rangeLabel(gradeId, setId) + " / " + dirLabel + " / " + fmtLabel,
        gradeId: gradeId,
        setId: setId,
        dir: dir,
        format: format,
      },
    };
  }

  global.VocabQuiz = {
    gradeList: gradeList,
    setList: setList,
    build: build,
  };
})(window);
