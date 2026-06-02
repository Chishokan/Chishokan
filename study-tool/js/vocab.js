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
    g3: {
      label: "中3",
      sets: {
        r1: {
          label: "Trick Your Eyes Part1・2",
          words: [
            { en: "do-did-done", ja: "〜をする[原形-過去形-過去分詞形]" },
            { en: "come-came-come", ja: "来る[原形-過去形-過去分詞形]" },
            { en: "just", ja: "ちょうど" },
            { en: "I've", ja: "I haveの短縮形" },
            { en: "haven't", ja: "have notの短縮形" },
            { en: "hasn't", ja: "has notの短縮形" },
            { en: "trick", ja: "〜をだます" },
            { en: "pack", ja: "〜を荷造りする" },
            { en: "we've", ja: "we haveの短縮形" },
            { en: "closely", ja: "じっくりと" },
            { en: "from now on", ja: "これからずっと、今後は" },
            { en: "next time", ja: "次回(に)" },
            { en: "all of 〜", ja: "〜のすべて" },
            { en: "take-took-taken", ja: "持っていく[原形-過去形-過去分詞形]" },
            { en: "become-became-become", ja: "〜になる[原形-過去形-過去分詞形]" },
            { en: "yet", ja: "[疑問文で]もう" },
            { en: "clear", ja: "〜を片づける" },
            { en: "mirror", ja: "鏡" },
            { en: "isn't 〜?", ja: "〜ではないですか。" },
            { en: "have a haircut", ja: "髪を切る" },
          ],
        },
        r2: {
          label: "Trick Your Eyes Part3",
          words: [
            { en: "been", ja: "[beの過去分詞形]" },
            { en: "ever", ja: "今までに" },
            { en: "never", ja: "1度も〜したことがない" },
            { en: "How many times 〜?", ja: "何回〜ですか。" },
            { en: "ride-rode-ridden", ja: "乗る[原形-過去形-過去分詞形]" },
            { en: "swim-swam-swum", ja: "泳ぐ[原形-過去形-過去分詞形]" },
            { en: "sleep-slept", ja: "眠る[原形-過去形]" },
            { en: "go-went-gone", ja: "行く[原形-過去形-過去分詞形]" },
            { en: "celebrity", ja: "有名人" },
            { en: "tent", ja: "テント" },
            { en: "surfing", ja: "サーフィン" },
            { en: "must", ja: "〜に違いない" },
            { en: "take a look", ja: "見てみる" },
            { en: "hear of 〜", ja: "〜のことを聞く" },
          ],
        },
        r3: {
          label: "Trick Your Eyes 本文",
          words: [
            { en: "3-D Art Museum", ja: "3Dアート美術館" },
            { en: "get here", ja: "ここに着く" },
            { en: "entrance hall", ja: "玄関ホール" },
            { en: "reflect", ja: "〜を映す、反射する" },
            { en: "painful", ja: "痛い" },
            { en: "become crazy about 〜", ja: "〜に夢中になる" },
            { en: "trompe l'oeil", ja: "トロンプ・ルイユ" },
            { en: "optical illusion", ja: "だまし絵" },
          ],
        },
        r4: {
          label: "Trick Your Eyes R&T・T&S",
          words: [
            { en: "century", ja: "世紀" },
            { en: "possible", ja: "可能な" },
            { en: "someone", ja: "だれか" },
            { en: "compose", ja: "〜を組み立てる、構成する" },
            { en: "print", ja: "版画" },
            { en: "Pozzo", ja: "ポッツ[人の姓]" },
            { en: "portrait", ja: "肖像画" },
            { en: "lady", ja: "婦人" },
            { en: "dome", ja: "ドーム" },
            { en: "church", ja: "教会" },
            { en: "ceiling", ja: "天井" },
            { en: "Arcimboldo", ja: "アルチンボルド[人の姓]" },
            { en: "Spanish", ja: "スペイン(人)の" },
            { en: "flat", ja: "平らな" },
            { en: "turn A upside down", ja: "Aを上下さかさまにする" },
            { en: "usage", ja: "使い方" },
            { en: "sculpture", ja: "彫刻" },
            { en: "painter", ja: "画家" },
            { en: "pond", ja: "池" },
            { en: "photograph", ja: "写真" },
            { en: "French", ja: "フランス(人)の" },
          ],
        },
        r5: {
          label: "Passing Down Memories Part1・2",
          words: [
            { en: "since", ja: "〜からずっと、〜して以来" },
            { en: "known", ja: "〜を知っている[knowの過去分詞形]" },
            { en: "pass away", ja: "亡くなる" },
            { en: "more and more 〜", ja: "ますます〜に" },
            { en: "kill", ja: "〜を殺す" },
            { en: "injure", ja: "〜を傷つける" },
            { en: "ground", ja: "地面" },
            { en: "most", ja: "大多数(の)" },
            { en: "lately", ja: "最近、この頃" },
            { en: "itself", ja: "それ自身" },
            { en: "suffer from 〜", ja: "〜で苦しむ" },
            { en: "pass down 〜", ja: "〜を(次の世代へ)渡す" },
            { en: "move to 〜", ja: "〜へ引っ越す" },
            { en: "be into 〜", ja: "〜に熱中する" },
            { en: "move", ja: "〜を感動させる" },
            { en: "before 〜ing", ja: "〜をする前に" },
            { en: "survive", ja: "〜を切り抜けて生き残る" },
            { en: "blow-blew-blown", ja: "吹き飛ばす[原形-過去形-過去分詞形]" },
            { en: "volunteer", ja: "ボランティア活動" },
            { en: "〜 or so", ja: "〜かそこら" },
            { en: "the following 〜", ja: "次の〜" },
          ],
        },
        r6: {
          label: "Passing Down Memories Part3",
          words: [
            { en: "collect", ja: "〜を集める" },
            { en: "would", ja: "[willの過去形]" },
            { en: "over there", ja: "向こうに" },
            { en: "be affected by 〜", ja: "〜の影響を受ける" },
            { en: "keep", ja: "〜を保存する" },
            { en: "recovery", ja: "回復" },
            { en: "injury", ja: "けが" },
            { en: "half", ja: "30分" },
            { en: "figure", ja: "人物の像" },
            { en: "case", ja: "箱、ケース" },
            { en: "apparent", ja: "明白な" },
            { en: "thousands of 〜", ja: "何千もの〜" },
            { en: "model A after B", ja: "BをモデルとしてAをつくる" },
            { en: "Good luck.", ja: "幸運を。" },
            { en: "die from 〜", ja: "〜(が原因)で死ぬ" },
          ],
        },
        r7: {
          label: "Passing Down Memories 本文",
          words: [
            { en: "explode", ja: "爆発する" },
            { en: "structure", ja: "建物" },
            { en: "survivor", ja: "生存者" },
            { en: "southeast", ja: "南東(の)" },
            { en: "power", ja: "力" },
            { en: "destruction", ja: "破壊" },
            { en: "Brazil", ja: "ブラジル[国名]" },
            { en: "aftereffect", ja: "後遺症" },
            { en: "silent", ja: "無言の" },
            { en: "permanent", ja: "永久の" },
            { en: "memorial", ja: "記念の" },
            { en: "destructive", ja: "破壊的な" },
            { en: "complete", ja: "完全な" },
            { en: "instantly", ja: "一瞬にして" },
            { en: "enormously", ja: "非常に" },
            { en: "around", ja: "約〜、およそ〜" },
            { en: "be dropped on 〜", ja: "〜に投下される" },
            { en: "Atomic Bomb Dome", ja: "原爆ドーム" },
            { en: "transplant", ja: "〜を植え替える" },
            { en: "tragedy", ja: "悲劇" },
            { en: "bud", ja: "芽" },
            { en: "bombing", ja: "爆撃" },
            { en: "postwar", ja: "戦後の" },
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

  // 単語に出自（学年・範囲）を付けたコピーを返す
  function tagWords(gradeId, setId) {
    return GRADES[gradeId].sets[setId].words.map(function (w) {
      return { en: w.en, ja: w.ja, gradeId: gradeId, setId: setId };
    });
  }

  // 指定範囲の単語配列。setId が "all" のときは学年内の全範囲を結合。
  function wordsFor(gradeId, setId) {
    var grade = GRADES[gradeId];
    if (!grade) throw new Error("unknown grade: " + gradeId);
    if (setId === "all") {
      var merged = [];
      Object.keys(grade.sets).forEach(function (id) { merged = merged.concat(tagWords(gradeId, id)); });
      return merged;
    }
    if (!grade.sets[setId]) throw new Error("unknown set: " + gradeId + "/" + setId);
    return tagWords(gradeId, setId);
  }

  // 全学年・全範囲の単語（復習の選択肢プール用）
  function allWords() {
    var out = [];
    Object.keys(GRADES).forEach(function (gid) {
      Object.keys(GRADES[gid].sets).forEach(function (sid) {
        out = out.concat(tagWords(gid, sid));
      });
    });
    return out;
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

  // pool から答え(answerVal)以外の値を、重複なく最大 num 個選ぶ
  function pickDistractors(pool, keyA, answerVal, num) {
    var seen = {};
    seen[answerVal] = true;
    var out = [];
    var shuffled = shuffle(pool);
    for (var i = 0; i < shuffled.length && out.length < num; i++) {
      var v = shuffled[i][keyA];
      if (!seen[v]) { seen[v] = true; out.push(v); }
    }
    return out;
  }

  // 単語配列から問題を作る共通処理。distractorPool は選択肢のダミー供給源。
  function makeQuestions(words, dir, count, format, distractorPool) {
    var isType = format === "type";
    var keyQ = isType ? "ja" : (dir === "j2e" ? "ja" : "en");
    var keyA = isType ? "en" : (dir === "j2e" ? "en" : "ja");

    var pool = shuffle(words);
    var n = count === "all" ? pool.length : Math.min(count, pool.length);
    var picked = pool.slice(0, n);

    var numChoices = Math.min(format === "choice8" ? 8 : 4, distractorPool.length);

    return picked.map(function (w) {
      var q = {
        question: w[keyQ],
        answer: w[keyA],
        word: { gradeId: w.gradeId, setId: w.setId, en: w.en, ja: w.ja },
      };
      if (isType) {
        q.accepts = "text";
      } else {
        var distractors = pickDistractors(distractorPool, keyA, w[keyA], numChoices - 1);
        q.choices = shuffle(distractors.concat([w[keyA]]));
        q.accepts = "choice";
      }
      return q;
    });
  }

  function dirLabelOf(dir, isType) {
    return isType ? "意味→英語" : (dir === "j2e" ? "意味→英語" : "英語→意味");
  }
  function fmtLabelOf(format) {
    return format === "choice8" ? "8択" : (format === "type" ? "記述" : "4択");
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
    var questions = makeQuestions(words, dir, count, format, words);

    return {
      questions: questions,
      meta: {
        mode: "vocab",
        groupId: "vocab:" + gradeId + ":" + setId + ":" + (isType ? "type" : dir) + ":" + format,
        label: "英単語 / " + rangeLabel(gradeId, setId) + " / " + dirLabelOf(dir, isType) + " / " + fmtLabelOf(format),
        gradeId: gradeId,
        setId: setId,
        dir: dir,
        format: format,
      },
    };
  }

  /**
   * 任意の単語配列（＝苦手単語）から復習問題を作る。
   * ダミー選択肢は全収録単語から供給するので、苦手が少なくても選択肢が揃う。
   * @param {Array} words 各要素 { gradeId, setId, en, ja }
   */
  function buildFromWords(words, dir, count, format) {
    format = format || "choice4";
    var isType = format === "type";
    var questions = makeQuestions(words, dir, count, format, allWords());

    return {
      questions: questions,
      meta: {
        mode: "vocab",
        groupId: "vocab:review:" + (isType ? "type" : dir) + ":" + format,
        label: "苦手復習 / " + dirLabelOf(dir, isType) + " / " + fmtLabelOf(format),
        isReview: true,
        dir: dir,
        format: format,
      },
    };
  }

  // 収録単語を元の並び順で平坦に書き出す（CSVエクスポート用）
  function dump() {
    var rows = [];
    Object.keys(GRADES).forEach(function (gid) {
      var grade = GRADES[gid];
      Object.keys(grade.sets).forEach(function (sid) {
        grade.sets[sid].words.forEach(function (w) {
          rows.push({
            gradeId: gid,
            gradeLabel: grade.label,
            setId: sid,
            setLabel: grade.sets[sid].label,
            en: w.en,
            ja: w.ja,
          });
        });
      });
    });
    return rows;
  }

  global.VocabQuiz = {
    gradeList: gradeList,
    setList: setList,
    build: build,
    buildFromWords: buildFromWords,
    dump: dump,
  };
})(window);
