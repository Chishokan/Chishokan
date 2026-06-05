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
  /* AUTO-GENERATED:vocab — data/vocab_source.csv から tools/build-data.js が生成。ここを直接編集せず CSV を編集して取り込む */
  var GRADES = {
    g1: {
      label: "中1",
      sets: {
        u1p1: {
          label: "Unit1 Part1",
          words: [
            { en: "I'm", ja: "I amの短縮形", kana: "アイム", dj: ["you areの短縮形", "do notの短縮形", "I willの短縮形", "I haveの短縮形"], de: ["I'll", "I've", "it'll", "the"] },
            { en: "you're", ja: "you areの短縮形", kana: "ユア", dj: ["I amの短縮形", "do notの短縮形", "it willの短縮形", "we willの短縮形"], de: ["don't", "won't", "we've", "love"] },
            { en: "love", ja: "～が大好きである", kana: "ラブ", dj: ["南アフリカ共和国", "呼ぶ、名づける", "クラブ、部", "私を（に）"], de: ["low", "lady", "move", "dome"] },
            { en: "call", ja: "呼ぶ、名づける", kana: "コール", dj: ["～が大好きである", "南アフリカ共和国", "クラブ、部", "私を（に）"], de: ["case", "club", "carry", "will"] },
            { en: "club", ja: "クラブ、部", kana: "クラブ", dj: ["私を（に）", "甘い菓子", "～もまた", "みなさん"], de: ["call", "clear", "cloudy", "case"] },
            { en: "Japanese", ja: "日本の", kana: "ジャパニーズ", dj: ["その", "～から、～出身の", "１つの、1人の", "曇りの"], de: ["Spanish", "join", "apparent", "just"] },
            { en: "from ~", ja: "～から、～出身の", kana: "フロム", dj: ["日本の", "その", "１つの、1人の", "スペイン(人)の"], de: ["from now on", "French", "friend", "not ~"] },
            { en: "want to ~", ja: "～したい", kana: "ウォントゥ", dj: ["～でない", "すばらしい", "お互い", "重い"], de: ["with ~", "hand in ~", "not ~", "watch"] },
            { en: "the", ja: "その", kana: "ザ", dj: ["日本の", "～から、～出身の", "１つの、1人の", "曇りの"], de: ["they'll", "take", "me", "tent"] },
            { en: "me", ja: "私を（に）", kana: "ミー", dj: ["クラブ、部", "甘い菓子", "～もまた", "みなさん"], de: ["move", "most", "no", "oh"] },
            { en: "A and B", ja: "AとB", kana: "エー アンド ビー", dj: ["甘い菓子", "数字", "～もまた", "みなさん"], de: ["about ~", "a, an", "all of 〜", "around"] },
            { en: "Call me ~ .", ja: "私を～と呼んでください。", kana: "コール ミー", dj: ["あなたはどうですか。", "（あなたは）～ですよね?", "〜ではないですか。", "何回〜ですか。"], de: ["call", "want to ~", "all of 〜", "hand in ~"] },
            { en: "join", ja: "～に加わる、参加する", kana: "ジョイン", dj: ["Aを上下さかさまにする", "演ずる、披露する", "～に参加する", "〜に熱中する"], de: ["just", "JHS", "love", "call"] },
            { en: "sweet", ja: "甘い菓子", kana: "スウィート", dj: ["～もまた", "みなさん", "クラブ、部", "私を（に）"], de: ["step", "sunny", "skill", "study"] },
            { en: "number", ja: "数字", kana: "ナンバー", dj: ["AとB", "甘い菓子", "～もまた", "みなさん"], de: ["never", "me", "now", "no"] },
            { en: "~, too", ja: "～もまた", kana: "トゥー", dj: ["甘い菓子", "みなさん", "クラブ、部", "私を（に）"], de: ["a, an", "in ~", "~, don't you?", "in total"] },
            { en: "everyone", ja: "みなさん", kana: "エブリワン", dj: ["甘い菓子", "～もまた", "クラブ、部", "私を（に）"], de: ["ever", "explode", "end", "someone"] },
            { en: "South Africa", ja: "南アフリカ共和国", kana: "サウス アフリカ", dj: ["～が大好きである", "呼ぶ、名づける", "クラブ、部", "私を（に）"], de: ["southeast", "surfing", "suffer from 〜", "sign up"] },
          ],
        },
        u1p2: {
          label: "Unit1 Part2",
          words: [
            { en: "not ~", ja: "～でない", kana: "ノット", dj: ["すばらしい", "～したい", "お互い", "重い"], de: ["no", "now", "with ~", "never"] },
            { en: "no", ja: "いいえ", kana: "ノー", dj: ["ファン", "しかし", "友達", "ラグビー"], de: ["now", "oh", "so", "not ~"] },
            { en: "don't", ja: "do notの短縮形", kana: "ドント", dj: ["you areの短縮形", "I amの短縮形", "I willの短縮形", "I haveの短縮形"], de: ["won't", "dome", "hasn't", "draw"] },
            { en: "watch", ja: "～を（注意して）見る", kana: "ウォッチ", dj: ["～を利用する、～を受ける", "～を通して、～によって", "〜を映す、反射する", "〜を(次の世代へ)渡す"], de: ["pack", "won't", "we'll", "we've"] },
            { en: "friend", ja: "友達", kana: "フレンド", dj: ["あら", "いいえ", "ファン", "しかし"], de: ["French", "fan", "ground", "around"] },
            { en: "fan", ja: "ファン", kana: "ファン", dj: ["いいえ", "しかし", "友達", "ラグビー"], de: ["flat", "friend", "but", "no"] },
            { en: "often", ja: "しばしば、よく", kana: "オーフン", dj: ["～といっしょに", "ラグビー", "いいえ", "ファン"], de: ["oh", "fan", "online", "friend"] },
            { en: "with ~", ja: "～といっしょに", kana: "ウィズ", dj: ["しばしば、よく", "ラグビー", "いいえ", "ファン"], de: ["will", "not ~", "in ~", "watch"] },
            { en: "but", ja: "しかし", kana: "バット", dj: ["いいえ", "ファン", "友達", "ラグビー"], de: ["bud", "fan", "art", "yet"] },
            { en: "rugby", ja: "ラグビー", kana: "ラグビー", dj: ["いいえ", "ファン", "しかし", "友達"], de: ["reach", "sunny", "but", "recipe"] },
            { en: "great", ja: "すばらしい", kana: "グレート", dj: ["～でない", "～したい", "〜に違いない", "お互い"], de: ["ground", "sweet", "don't", "heavy"] },
            { en: "oh", ja: "あら", kana: "オー", dj: ["友達", "いいえ", "ファン", "しかし"], de: ["no", "often", "me", "so"] },
          ],
        },
        u1p3: {
          label: "Unit1 Part3",
          words: [
            { en: "take", ja: "～を利用する、～を受ける", kana: "テイク", dj: ["～を（注意して）見る", "〜を組み立てる、構成する", "～を通して、～によって", "〜を(次の世代へ)渡す"], de: ["the", "tent", "title", "trick"] },
            { en: "draw", ja: "（線や絵）をかく", kana: "ドロー", dj: ["（日本の）アニメ", "～に所属して", "芸術、美術", "～について"], de: ["dome", "art", "now", "wow"] },
            { en: "swimming", ja: "水泳", kana: "スイミング", dj: ["学校", "授業", "今", "マンガ"], de: ["surfing", "sweet", "someone", "ceiling"] },
            { en: "school", ja: "学校", kana: "スクール", dj: ["水泳", "授業", "今", "マンガ"], de: ["so", "skill", "sweet", "sunny"] },
            { en: "art", ja: "芸術、美術", kana: "アート", dj: ["～について", "～に所属して", "マンガ", "だから"], de: ["around", "anime", "but", "now"] },
            { en: "a, an", ja: "１つの、1人の", kana: "ア、アン", dj: ["～から、～出身の", "日本の", "その", "スペイン(人)の"], de: ["A and B", "anime", "in ~", "art"] },
            { en: "now", ja: "今", kana: "ナウ", dj: ["水泳", "学校", "授業", "マンガ"], de: ["no", "wow", "low", "so"] },
            { en: "in ~", ja: "～に所属して", kana: "イン", dj: ["芸術、美術", "～について", "（線や絵）をかく", "（日本の）アニメ"], de: ["in total", "injury", "with ~", "now"] },
            { en: "about ~", ja: "～について", kana: "アバウト", dj: ["芸術、美術", "～に所属して", "マンガ", "だから"], de: ["A and B", "around", "not ~", "in ~"] },
            { en: "How about you ?", ja: "あなたはどうですか。", kana: "ハウ アバウト ユー", dj: ["私を～と呼んでください。", "〜ではないですか。", "（あなたは）～ですよね?", "何回〜ですか。"], de: ["How many times 〜?", "~, don't you?", "about ~", "hear of 〜"] },
            { en: "lesson", ja: "授業", kana: "レッスン", dj: ["水泳", "学校", "今", "マンガ"], de: ["low", "so", "lately", "love"] },
            { en: "comic", ja: "マンガ", kana: "コミック", dj: ["だから", "うわあ", "水泳", "学校"], de: ["compose", "complete", "collect", "call"] },
            { en: "anime", ja: "（日本の）アニメ", kana: "アニメ", dj: ["（線や絵）をかく", "～に所属して", "芸術、美術", "～について"], de: ["art", "online", "dome", "now"] },
            { en: "so", ja: "だから", kana: "ソー", dj: ["マンガ", "うわあ", "水泳", "学校"], de: ["no", "now", "wow", "step"] },
            { en: "wow", ja: "うわあ", kana: "ワオ", dj: ["マンガ", "だから", "水泳", "学校"], de: ["now", "low", "so", "won't"] },
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
            { en: "will", ja: "～するでしょう、～するつもりです", kana: "ウィル", dj: ["ウェブサイト、ホームページ", "ネットで、オンラインで", "（目標に）手が届く", "ステップ、段階"], de: ["we'd", "wow", "we'll", "call"] },
            { en: "won't", ja: "will notの短縮形", kana: "ウォント", dj: ["we wouldの短縮形", "it willの短縮形", "I willの短縮形", "we willの短縮形"], de: ["we'd", "don't", "would", "wow"] },
            { en: "it'll", ja: "it willの短縮形", kana: "イトゥル", dj: ["will notの短縮形", "I willの短縮形", "we wouldの短縮形", "we willの短縮形"], de: ["I'll", "itself", "I've", "I'm"] },
            { en: "I'll", ja: "I willの短縮形", kana: "アイル", dj: ["it willの短縮形", "will notの短縮形", "we wouldの短縮形", "we willの短縮形"], de: ["it'll", "I've", "I'm", "will"] },
            { en: "forget-forgot", ja: "～を忘れる[原形-過去形]", kana: "フォーゲット・フォーゴット", dj: ["来る[原形-過去形-過去分詞形]", "[beの過去分詞形]", "乗る[原形-過去形-過去分詞形]", "泳ぐ[原形-過去形-過去分詞形]"], de: ["go-went-gone", "portrait", "friend", "information"] },
            { en: "send", ja: "～を送る", kana: "センド", dj: ["～を運ぶ", "～を移動する", "～を招待する", "～を決める"], de: ["step", "sunny", "we'd", "end"] },
            { en: "carry", ja: "～を運ぶ", kana: "キャリー", dj: ["～を送る", "～を移動する", "～を招待する", "～を決める"], de: ["call", "case", "clear", "cloudy"] },
            { en: "sunny", ja: "晴れた", kana: "サニー", dj: ["最低値", "最高値", "激しく", "情報"], de: ["surfing", "study", "since", "send"] },
            { en: "heavy", ja: "重い", kana: "ヘビー", dj: ["お互い", "痛い", "～したい", "～でない"], de: ["hear", "health", "hard", "high"] },
            { en: "cloudy", ja: "曇りの", kana: "クラウディ", dj: ["日本の", "可能な", "平らな", "明白な"], de: ["closely", "club", "clear", "carry"] },
            { en: "reach", ja: "（目標に）手が届く", kana: "リーチ", dj: ["ステップ、段階", "ネットで、オンラインで", "摂氏～度（℃）", "ウェブサイト、ホームページ"], de: ["recipe", "reflect", "rugby", "heavy"] },
            { en: "move", ja: "～を移動する", kana: "ムーブ", dj: ["～を招待する", "～を送る", "～を運ぶ", "～を提出する"], de: ["most", "me", "love", "move to 〜"] },
            { en: "invite", ja: "～を招待する", kana: "インバイト", dj: ["～を移動する", "～を送る", "～を運ぶ", "～を提出する"], de: ["injure", "injury", "I've", "online"] },
            { en: "website", ja: "ウェブサイト、ホームページ", kana: "ウェブサイト", dj: ["ネットで、オンラインで", "～するでしょう、～するつもりです", "（目標に）手が届く", "ステップ、段階"], de: ["weather", "we've", "we'd", "will"] },
            { en: "step", ja: "ステップ、段階", kana: "ステップ", dj: ["摂氏～度（℃）", "（目標に）手が届く", "申し込む", "晴れた"], de: ["study", "stage", "send", "sweet"] },
            { en: "low", ja: "最低値", kana: "ロー", dj: ["晴れた", "最高値", "激しく", "情報"], de: ["love", "now", "wow", "lady"] },
            { en: "information", ja: "情報", kana: "インフォメーション", dj: ["天気", "動画", "晴れた", "最低値"], de: ["interview", "instantly", "invite", "injury"] },
            { en: "high", ja: "最高値", kana: "ハイ", dj: ["晴れた", "最低値", "激しく", "情報"], de: ["hard", "hear", "half", "will"] },
            { en: "weather", ja: "天気", kana: "ウェザー", dj: ["情報", "動画", "晴れた", "最低値"], de: ["website", "we've", "we'd", "reach"] },
            { en: "online", ja: "ネットで、オンラインで", kana: "オンライン", dj: ["（目標に）手が届く", "ウェブサイト、ホームページ", "ステップ、段階", "摂氏～度（℃）"], de: ["often", "invite", "anime", "oh"] },
            { en: "hard", ja: "激しく", kana: "ハード", dj: ["晴れた", "最低値", "最高値", "情報"], de: ["half", "high", "hear", "heavy"] },
            { en: "we'd", ja: "we wouldの短縮形", kana: "ウィド", dj: ["will notの短縮形", "it willの短縮形", "I willの短縮形", "we willの短縮形"], de: ["we'll", "we've", "won't", "will"] },
            { en: "sign up", ja: "申し込む", kana: "サイン アップ", dj: ["晴れた", "最低値", "最高値", "激しく"], de: ["since", "sunny", "in ~", "step"] },
            { en: "~, don't you?", ja: "（あなたは）～ですよね?", kana: "ドント ユー", dj: ["私を～と呼んでください。", "あなたはどうですか。", "〜ではないですか。", "何回〜ですか。"], de: ["~, too", "How about you ?", "isn't 〜?", "be going to ~"] },
            { en: "degree", ja: "摂氏～度（℃）", kana: "ディグリー", dj: ["ステップ、段階", "（目標に）手が届く", "申し込む", "晴れた"], de: ["decide", "draw", "dome", "online"] },
            { en: "video clip", ja: "動画", kana: "ビデオ クリップ", dj: ["情報", "天気", "晴れた", "最低値"], de: ["sign up", "move to 〜", "in total", "get here"] },
          ],
        },
        u1p2: {
          label: "Unit1 Talent Show Part2",
          words: [
            { en: "be going to ~", ja: "～するつもり", kana: "ビー ゴーイング トゥ", dj: ["スキル、腕前", "パートナー、相棒", "～まで（ずっと）", "髪を切る"], de: ["be ready to ~", "be able to ~", "be into 〜", "be dropped on 〜"] },
            { en: "partner", ja: "パートナー、相棒", kana: "パートナー", dj: ["～まで（ずっと）", "～するつもり", "スキル、腕前", "髪を切る"], de: ["painter", "participant", "print", "power"] },
            { en: "take part in ~", ja: "～に参加する", kana: "テイク パート イン", dj: ["演ずる、披露する", "〜に熱中する", "爆発する", "～に加わる、参加する"], de: ["take a look", "take", "take-took-taken", "hand in ~"] },
            { en: "skill", ja: "スキル、腕前", kana: "スキル", dj: ["～するつもり", "パートナー、相棒", "～まで（ずっと）", "髪を切る"], de: ["will", "kill", "sweet", "sunny"] },
            { en: "end", ja: "終わり", kana: "エンド", dj: ["髪を切る", "～するつもり", "スキル、腕前", "パートナー、相棒"], de: ["ever", "bud", "no", "send"] },
            { en: "until", ja: "～まで（ずっと）", kana: "アンティル", dj: ["パートナー、相棒", "～するつもり", "スキル、腕前", "髪を切る"], de: ["usage", "skill", "end", "often"] },
            { en: "hand in ~", ja: "～を提出する", kana: "ハンド イン", dj: ["～を移動する", "～を招待する", "～を紹介する", "～を計画する"], de: ["want to ~", "hear of 〜", "haven't", "hasn't"] },
            { en: "get a haircut", ja: "髪を切る", kana: "ゲット ア ヘアカット", dj: ["終わり", "～するつもり", "スキル、腕前", "パートナー、相棒"], de: ["get here", "have a haircut", "end A with B", "Good luck."] },
          ],
        },
        u1p3: {
          label: "Unit1 Talent Show Part3",
          words: [
            { en: "introduce", ja: "～を紹介する", kana: "イントロデュース", dj: ["～を移動する", "～を招待する", "～を提出する", "～を計画する"], de: ["injure", "interview", "invite", "injury"] },
            { en: "history", ja: "歴史", kana: "ヒストリー", dj: ["健康", "レシピ、調理法", "情報", "天気"], de: ["high", "health", "hard", "hear"] },
            { en: "health", ja: "健康", kana: "ヘルス", dj: ["歴史", "レシピ、調理法", "情報", "天気"], de: ["hear", "heavy", "half", "high"] },
            { en: "recipe", ja: "レシピ、調理法", kana: "レシピ", dj: ["歴史", "健康", "ステップ、段階", "摂氏～度（℃）"], de: ["recovery", "reach", "decide", "reflect"] },
          ],
        },
        u1rt: {
          label: "Unit1 Talent Show R&T・T&S",
          words: [
            { en: "hear", ja: "～ということを耳にする、～だそうだ", kana: "ヒア", dj: ["（クラスなどの）総代", "AをBとともに終える", "ミーティング、会議", "～する準備が整う"], de: ["heavy", "health", "hard", "hear of 〜"] },
            { en: "meeting", ja: "ミーティング、会議", kana: "ミーティング", dj: ["～する準備が整う", "（クラスなどの）総代", "ミラー[人の姓]", "AをBとともに終える"], de: ["me", "ceiling", "behind", "memorial"] },
            { en: "through", ja: "～を通して、～によって", kana: "スルー", dj: ["～を楽しみにする", "～を計画する", "～を提案する", "～を決める"], de: ["they'll", "thousand", "the", "trick"] },
            { en: "in total", ja: "総計で", kana: "イン トータル", dj: ["初めて", "参加者", "～できる", "題、演目"], de: ["in ~", "instantly", "interview", "invite"] },
            { en: "be ready to ~", ja: "～する準備が整う", kana: "ビー レディ トゥ", dj: ["ミラー[人の姓]", "ミーティング、会議", "舞台、ステージ", "（クラスなどの）総代"], de: ["be able to ~", "be going to ~", "be into 〜", "be dropped on 〜"] },
            { en: "look forward to ~", ja: "～を楽しみにする", kana: "ルック フォワード トゥ", dj: ["～を計画する", "～を提案する", "～を通して、～によって", "～を決める"], de: ["be ready to ~", "be going to ~", "be able to ~", "want to ~"] },
            { en: "each other", ja: "お互い", kana: "イーチ アザー", dj: ["重い", "～したい", "～でない", "痛い"], de: ["end A with B", "over there", "want to ~", "weather"] },
            { en: "be able to ~", ja: "～できる", kana: "ビー エイブル トゥ", dj: ["題、演目", "千（の）", "総計で", "初めて"], de: ["be ready to ~", "be going to ~", "be into 〜", "be affected by 〜"] },
            { en: "for the first time", ja: "初めて", kana: "フォー ザ ファースト タイム", dj: ["総計で", "参加者", "～できる", "題、演目"], de: ["forget-forgot", "next time", "South Africa", "over there"] },
            { en: "plan", ja: "～を計画する", kana: "プラン", dj: ["～を提案する", "～を決める", "～を楽しみにする", "～を通して、～によって"], de: ["pack", "pond", "print", "hear"] },
            { en: "perform", ja: "演ずる、披露する", kana: "パフォーム", dj: ["～に参加する", "～に加わる、参加する", "〜に熱中する", "Aを上下さかさまにする"], de: ["permanent", "partner", "print", "Pozzo"] },
            { en: "title", ja: "題、演目", kana: "タイトル", dj: ["～できる", "千（の）", "総計で", "初めて"], de: ["Miller", "take", "tent", "the"] },
            { en: "thousand", ja: "千（の）", kana: "サウザンド", dj: ["～できる", "題、演目", "総計で", "初めて"], de: ["thousands of 〜", "through", "they'll", "ground"] },
            { en: "success", ja: "成功", kana: "サクセス", dj: ["勉強", "総計で", "初めて", "参加者"], de: ["suggest", "surfing", "sunny", "stage"] },
            { en: "behind", ja: "～の後ろに", kana: "ビハインド", dj: ["聴衆、観客", "～できる", "題、演目", "千（の）"], de: ["been", "bombing", "bud", "meeting"] },
            { en: "study", ja: "勉強", kana: "スタディ", dj: ["成功", "総計で", "初めて", "参加者"], de: ["stage", "step", "sunny", "sweet"] },
            { en: "stage", ja: "舞台、ステージ", kana: "ステージ", dj: ["～する準備が整う", "ミラー[人の姓]", "インタビュー", "ミーティング、会議"], de: ["study", "step", "since", "usage"] },
            { en: "president", ja: "（クラスなどの）総代", kana: "プレジデント", dj: ["AをBとともに終える", "ミーティング、会議", "～する準備が整う", "ミラー[人の姓]"], de: ["print", "participant", "permanent", "meeting"] },
            { en: "Miller", ja: "ミラー[人の姓]", kana: "ミラー", dj: ["～する準備が整う", "ミーティング、会議", "舞台、ステージ", "（クラスなどの）総代"], de: ["mirror", "title", "me", "will"] },
            { en: "JHS", ja: "Junior High Schoolの略", kana: "ジェイ エイチ エス", dj: ["High Schoolの略", "～ということを耳にする、～だそうだ", "they willの短縮形", "～を通して、～によって"], de: ["HS", "just", "join", "the"] },
            { en: "interview", ja: "インタビュー", kana: "インタビュー", dj: ["～の後ろに", "舞台、ステージ", "聴衆、観客", "～する準備が整う"], de: ["introduce", "invite", "injure", "injury"] },
            { en: "HS", ja: "High Schoolの略", kana: "エイチ エス", dj: ["Junior High Schoolの略", "they willの短縮形", "～を通して、～によって", "we willの短縮形"], de: ["JHS", "hear", "high", "hard"] },
            { en: "we'll", ja: "we willの短縮形", kana: "ウィル", dj: ["they willの短縮形", "it willの短縮形", "will notの短縮形", "I willの短縮形"], de: ["we've", "we'd", "will", "it'll"] },
            { en: "end A with B", ja: "AをBとともに終える", kana: "エンド エー ウィズ ビー", dj: ["（クラスなどの）総代", "ミーティング、会議", "～する準備が整う", "ミラー[人の姓]"], de: ["entrance hall", "each other", "end", "with ~"] },
            { en: "decide", ja: "～を決める", kana: "ディサイド", dj: ["～を計画する", "～を提案する", "～を楽しみにする", "～を通して、～によって"], de: ["degree", "recipe", "dome", "invite"] },
            { en: "suggest", ja: "～を提案する", kana: "サジェスト", dj: ["～を計画する", "～を決める", "～を楽しみにする", "～を通して、～によって"], de: ["success", "survive", "stage", "surfing"] },
            { en: "participant", ja: "参加者", kana: "パーティシパント", dj: ["総計で", "初めて", "～できる", "題、演目"], de: ["partner", "president", "portrait", "print"] },
            { en: "audience", ja: "聴衆、観客", kana: "オーディエンス", dj: ["～の後ろに", "～できる", "題、演目", "千（の）"], de: ["anime", "since", "around", "success"] },
            { en: "they'll", ja: "they willの短縮形", kana: "ゼイル", dj: ["we willの短縮形", "will notの短縮形", "we wouldの短縮形", "it willの短縮形"], de: ["the", "through", "we'll", "thousand"] },
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
            { en: "do-did-done", ja: "〜をする[原形-過去形-過去分詞形]", kana: "ドゥー・ディド・ダン", dj: ["〜になる[原形-過去形-過去分詞形]", "持っていく[原形-過去形-過去分詞形]", "来る[原形-過去形-過去分詞形]", "〜を知っている[knowの過去分詞形]"], de: ["go-went-gone", "dome", "decide", "don't"] },
            { en: "come-came-come", ja: "来る[原形-過去形-過去分詞形]", kana: "カム・ケイム・カム", dj: ["〜をする[原形-過去形-過去分詞形]", "〜になる[原形-過去形-過去分詞形]", "持っていく[原形-過去形-過去分詞形]", "乗る[原形-過去形-過去分詞形]"], de: ["become-became-become", "complete", "compose", "comic"] },
            { en: "just", ja: "ちょうど", kana: "ジャスト", dj: ["髪を切る", "じっくりと", "次回(に)", "〜のすべて"], de: ["JHS", "must", "most", "but"] },
            { en: "I've", ja: "I haveの短縮形", kana: "アイブ", dj: ["has notの短縮形", "we haveの短縮形", "have notの短縮形", "do notの短縮形"], de: ["I'll", "I'm", "we've", "it'll"] },
            { en: "haven't", ja: "have notの短縮形", kana: "ハブント", dj: ["has notの短縮形", "we haveの短縮形", "I haveの短縮形", "will notの短縮形"], de: ["hasn't", "hard", "half", "don't"] },
            { en: "hasn't", ja: "has notの短縮形", kana: "ハズント", dj: ["we haveの短縮形", "I haveの短縮形", "have notの短縮形", "you areの短縮形"], de: ["haven't", "hard", "half", "don't"] },
            { en: "trick", ja: "〜をだます", kana: "トリック", dj: ["〜を片づける", "〜を荷造りする", "〜を集める", "〜を殺す"], de: ["pack", "take", "tragedy", "title"] },
            { en: "pack", ja: "〜を荷造りする", kana: "パック", dj: ["〜を片づける", "〜をだます", "〜を感動させる", "〜を植え替える"], de: ["plan", "trick", "pond", "take"] },
            { en: "we've", ja: "we haveの短縮形", kana: "ウィーブ", dj: ["has notの短縮形", "I haveの短縮形", "have notの短縮形", "you areの短縮形"], de: ["we'll", "we'd", "I've", "website"] },
            { en: "closely", ja: "じっくりと", kana: "クロースリー", dj: ["次回(に)", "〜のすべて", "ちょうど", "髪を切る"], de: ["cloudy", "clear", "club", "case"] },
            { en: "from now on", ja: "これからずっと、今後は", kana: "フロム ナウ オン", dj: ["[疑問文で]もう", "じっくりと", "次回(に)", "〜のすべて"], de: ["from ~", "friend", "all of 〜", "French"] },
            { en: "next time", ja: "次回(に)", kana: "ネクスト タイム", dj: ["じっくりと", "〜のすべて", "ちょうど", "髪を切る"], de: ["get here", "not ~", "never", "want to ~"] },
            { en: "all of 〜", ja: "〜のすべて", kana: "オール オブ", dj: ["じっくりと", "次回(に)", "ちょうど", "髪を切る"], de: ["hear of 〜", "A and B", "about ~", "a, an"] },
            { en: "take-took-taken", ja: "持っていく[原形-過去形-過去分詞形]", kana: "テイク・トゥック・テイクン", dj: ["〜をする[原形-過去形-過去分詞形]", "〜になる[原形-過去形-過去分詞形]", "来る[原形-過去形-過去分詞形]", "〜を知っている[knowの過去分詞形]"], de: ["take a look", "take", "take part in ~", "come-came-come"] },
            { en: "become-became-become", ja: "〜になる[原形-過去形-過去分詞形]", kana: "ビカム・ビケイム・ビカム", dj: ["〜をする[原形-過去形-過去分詞形]", "持っていく[原形-過去形-過去分詞形]", "来る[原形-過去形-過去分詞形]", "〜を知っている[knowの過去分詞形]"], de: ["come-came-come", "become crazy about 〜", "blow-blew-blown", "swim-swam-swum"] },
            { en: "yet", ja: "[疑問文で]もう", kana: "イェット", dj: ["じっくりと", "これからずっと、今後は", "次回(に)", "〜のすべて"], de: ["but", "art", "me", "just"] },
            { en: "clear", ja: "〜を片づける", kana: "クリア", dj: ["〜をだます", "〜を荷造りする", "〜を傷つける", "〜をする前に"], de: ["club", "closely", "cloudy", "carry"] },
            { en: "mirror", ja: "鏡", kana: "ミラー", dj: ["ちょうど", "髪を切る", "じっくりと", "次回(に)"], de: ["Miller", "most", "me", "history"] },
            { en: "isn't 〜?", ja: "〜ではないですか。", kana: "イズント", dj: ["何回〜ですか。", "幸運を。", "あなたはどうですか。", "私を～と呼んでください。"], de: ["in ~", "in total", "not ~", "I've"] },
            { en: "have a haircut", ja: "髪を切る", kana: "ハブ ア ヘアカット", dj: ["ちょうど", "じっくりと", "次回(に)", "〜のすべて"], de: ["get a haircut", "haven't", "hand in ~", "take a look"] },
          ],
        },
        r2: {
          label: "Trick Your Eyes Part3",
          words: [
            { en: "been", ja: "[beの過去分詞形]", kana: "ビーン", dj: ["眠る[原形-過去形]", "乗る[原形-過去形-過去分詞形]", "泳ぐ[原形-過去形-過去分詞形]", "行く[原形-過去形-過去分詞形]"], de: ["behind", "but", "bud", "ever"] },
            { en: "ever", ja: "今までに", kana: "エバー", dj: ["見てみる", "有名人", "テント", "サーフィン"], de: ["everyone", "never", "end", "love"] },
            { en: "never", ja: "1度も〜したことがない", kana: "ネバー", dj: ["〜に違いない", "痛い", "すばらしい", "～したい"], de: ["ever", "number", "been", "now"] },
            { en: "How many times 〜?", ja: "何回〜ですか。", kana: "ハウ メニー タイムズ", dj: ["〜ではないですか。", "幸運を。", "あなたはどうですか。", "私を～と呼んでください。"], de: ["How about you ?", "more and more 〜", "hand in ~", "hear of 〜"] },
            { en: "ride-rode-ridden", ja: "乗る[原形-過去形-過去分詞形]", kana: "ライド・ロード・リドゥン", dj: ["泳ぐ[原形-過去形-過去分詞形]", "行く[原形-過去形-過去分詞形]", "[beの過去分詞形]", "眠る[原形-過去形]"], de: ["take-took-taken", "come-came-come", "recovery", "do-did-done"] },
            { en: "swim-swam-swum", ja: "泳ぐ[原形-過去形-過去分詞形]", kana: "スイム・スワム・スワム", dj: ["乗る[原形-過去形-過去分詞形]", "行く[原形-過去形-過去分詞形]", "[beの過去分詞形]", "眠る[原形-過去形]"], de: ["swimming", "sleep-slept", "sweet", "come-came-come"] },
            { en: "sleep-slept", ja: "眠る[原形-過去形]", kana: "スリープ・スレプト", dj: ["[beの過去分詞形]", "乗る[原形-過去形-過去分詞形]", "泳ぐ[原形-過去形-過去分詞形]", "行く[原形-過去形-過去分詞形]"], de: ["silent", "sweet", "sculpture", "suggest"] },
            { en: "go-went-gone", ja: "行く[原形-過去形-過去分詞形]", kana: "ゴー・ウェント・ゴーン", dj: ["乗る[原形-過去形-過去分詞形]", "泳ぐ[原形-過去形-過去分詞形]", "[beの過去分詞形]", "眠る[原形-過去形]"], de: ["do-did-done", "someone", "forget-forgot", "great"] },
            { en: "celebrity", ja: "有名人", kana: "セレブリティ", dj: ["テント", "今までに", "見てみる", "サーフィン"], de: ["century", "ceiling", "closely", "clear"] },
            { en: "tent", ja: "テント", kana: "テント", dj: ["有名人", "今までに", "見てみる", "サーフィン"], de: ["end", "yet", "take", "the"] },
            { en: "surfing", ja: "サーフィン", kana: "サーフィン", dj: ["今までに", "見てみる", "有名人", "テント"], de: ["survive", "survivor", "sunny", "success"] },
            { en: "must", ja: "〜に違いない", kana: "マスト", dj: ["1度も〜したことがない", "痛い", "すばらしい", "～したい"], de: ["most", "just", "move", "me"] },
            { en: "take a look", ja: "見てみる", kana: "テイク ア ルック", dj: ["今までに", "有名人", "テント", "サーフィン"], de: ["take part in ~", "take", "take-took-taken", "trompe l'oeil"] },
            { en: "hear of 〜", ja: "〜のことを聞く", kana: "ヒア オブ", dj: ["サーフィン", "今までに", "見てみる", "有名人"], de: ["hear", "health", "all of 〜", "heavy"] },
          ],
        },
        r3: {
          label: "Trick Your Eyes 本文",
          words: [
            { en: "3-D Art Museum", ja: "3Dアート美術館", kana: "スリーディー アート ミュージアム", dj: ["トロンプ・ルイユ", "〜に夢中になる", "ここに着く", "玄関ホール"], de: ["more and more 〜", "end A with B", "get here", "〜 or so"] },
            { en: "get here", ja: "ここに着く", kana: "ゲット ヒア", dj: ["玄関ホール", "だまし絵", "〜に夢中になる", "3Dアート美術館"], de: ["get a haircut", "over there", "next time", "weather"] },
            { en: "entrance hall", ja: "玄関ホール", kana: "エントランス ホール", dj: ["ここに着く", "だまし絵", "〜に夢中になる", "3Dアート美術館"], de: ["end A with B", "enormously", "trompe l'oeil", "get here"] },
            { en: "reflect", ja: "〜を映す、反射する", kana: "リフレクト", dj: ["〜を荷造りする", "〜を(次の世代へ)渡す", "〜を感動させる", "〜を切り抜けて生き残る"], de: ["reach", "collect", "recipe", "recovery"] },
            { en: "painful", ja: "痛い", kana: "ペインフル", dj: ["〜に違いない", "1度も〜したことがない", "重い", "お互い"], de: ["painter", "partner", "pack", "print"] },
            { en: "become crazy about 〜", ja: "〜に夢中になる", kana: "ビカム クレイジー アバウト", dj: ["3Dアート美術館", "トロンプ・ルイユ", "ここに着く", "玄関ホール"], de: ["become-became-become", "be ready to ~", "be affected by 〜", "be dropped on 〜"] },
            { en: "trompe l'oeil", ja: "トロンプ・ルイユ", kana: "トロンプ ルイユ", dj: ["3Dアート美術館", "〜に夢中になる", "ここに着く", "玄関ホール"], de: ["take a look", "entrance hall", "tragedy", "from now on"] },
            { en: "optical illusion", ja: "だまし絵", kana: "オプティカル イリュージョン", dj: ["ここに着く", "玄関ホール", "〜に夢中になる", "3Dアート美術館"], de: ["3-D Art Museum", "trompe l'oeil", "take a look", "video clip"] },
          ],
        },
        r4: {
          label: "Trick Your Eyes R&T・T&S",
          words: [
            { en: "century", ja: "世紀", kana: "センチュリー", dj: ["版画", "婦人", "教会", "天井"], de: ["ceiling", "celebrity", "church", "injury"] },
            { en: "possible", ja: "可能な", kana: "ポッシブル", dj: ["平らな", "スペイン(人)の", "フランス(人)の", "明白な"], de: ["postwar", "portrait", "Pozzo", "pond"] },
            { en: "someone", ja: "だれか", kana: "サムワン", dj: ["肖像画", "ドーム", "使い方", "世紀"], de: ["so", "compose", "southeast", "dome"] },
            { en: "compose", ja: "〜を組み立てる、構成する", kana: "コンポーズ", dj: ["〜を(次の世代へ)渡す", "〜を切り抜けて生き残る", "〜を映す、反射する", "〜を荷造りする"], de: ["complete", "comic", "collect", "someone"] },
            { en: "print", ja: "版画", kana: "プリント", dj: ["世紀", "婦人", "教会", "天井"], de: ["pond", "painter", "president", "Pozzo"] },
            { en: "Pozzo", ja: "ポッツ[人の姓]", kana: "ポッツォ", dj: ["アルチンボルド[人の姓]", "だれか", "肖像画", "ドーム"], de: ["pond", "power", "print", "portrait"] },
            { en: "portrait", ja: "肖像画", kana: "ポートレート", dj: ["だれか", "ドーム", "使い方", "世紀"], de: ["postwar", "Pozzo", "power", "pond"] },
            { en: "lady", ja: "婦人", kana: "レディ", dj: ["世紀", "版画", "教会", "天井"], de: ["lately", "love", "low", "call"] },
            { en: "dome", ja: "ドーム", kana: "ドーム", dj: ["だれか", "肖像画", "使い方", "世紀"], de: ["don't", "draw", "love", "pond"] },
            { en: "church", ja: "教会", kana: "チャーチ", dj: ["世紀", "版画", "婦人", "天井"], de: ["comic", "century", "club", "carry"] },
            { en: "ceiling", ja: "天井", kana: "シーリング", dj: ["世紀", "版画", "婦人", "教会"], de: ["century", "meeting", "celebrity", "church"] },
            { en: "Arcimboldo", ja: "アルチンボルド[人の姓]", kana: "アルチンボルド", dj: ["ポッツ[人の姓]", "だれか", "肖像画", "ドーム"], de: ["around", "art", "anime", "audience"] },
            { en: "Spanish", ja: "スペイン(人)の", kana: "スパニッシュ", dj: ["フランス(人)の", "可能な", "平らな", "破壊的な"], de: ["Japanese", "French", "success", "suggest"] },
            { en: "flat", ja: "平らな", kana: "フラット", dj: ["可能な", "スペイン(人)の", "フランス(人)の", "明白な"], de: ["fan", "French", "plan", "lady"] },
            { en: "turn A upside down", ja: "Aを上下さかさまにする", kana: "ターン エー アップサイド ダウン", dj: ["〜に熱中する", "爆発する", "～に加わる、参加する", "演ずる、披露する"], de: ["take part in ~", "take a look", "thousands of 〜", "trompe l'oeil"] },
            { en: "usage", ja: "使い方", kana: "ユーセージ", dj: ["だれか", "肖像画", "ドーム", "世紀"], de: ["stage", "until", "lady", "dome"] },
            { en: "sculpture", ja: "彫刻", kana: "スカルプチャー", dj: ["世紀", "版画", "婦人", "教会"], de: ["structure", "century", "school", "someone"] },
            { en: "painter", ja: "画家", kana: "ペインター", dj: ["世紀", "版画", "婦人", "教会"], de: ["painful", "partner", "print", "power"] },
            { en: "pond", ja: "池", kana: "ポンド", dj: ["世紀", "版画", "婦人", "教会"], de: ["Pozzo", "power", "print", "dome"] },
            { en: "photograph", ja: "写真", kana: "フォトグラフ", dj: ["世紀", "版画", "婦人", "教会"], de: ["portrait", "partner", "painter", "print"] },
            { en: "French", ja: "フランス(人)の", kana: "フレンチ", dj: ["スペイン(人)の", "可能な", "平らな", "破壊的な"], de: ["friend", "from ~", "flat", "reach"] },
          ],
        },
        r5: {
          label: "Passing Down Memories Part1・2",
          words: [
            { en: "since", ja: "〜からずっと、〜して以来", kana: "シンス", dj: ["ボランティア活動", "ますます〜に", "大多数(の)", "最近、この頃"], de: ["sunny", "stage", "silent", "sweet"] },
            { en: "known", ja: "〜を知っている[knowの過去分詞形]", kana: "ノウン", dj: ["吹き飛ばす[原形-過去形-過去分詞形]", "持っていく[原形-過去形-過去分詞形]", "〜をする[原形-過去形-過去分詞形]", "〜になる[原形-過去形-過去分詞形]"], de: ["kill", "now", "keep", "join"] },
            { en: "pass away", ja: "亡くなる", kana: "パス アウェイ", dj: ["それ自身", "〜で苦しむ", "〜かそこら", "次の〜"], de: ["pass down 〜", "partner", "painter", "postwar"] },
            { en: "more and more 〜", ja: "ますます〜に", kana: "モア アンド モア", dj: ["大多数(の)", "最近、この頃", "〜へ引っ越す", "〜で苦しむ"], de: ["move to 〜", "model A after B", "thousands of 〜", "hear of 〜"] },
            { en: "kill", ja: "〜を殺す", kana: "キル", dj: ["〜を傷つける", "〜をする前に", "〜を感動させる", "〜を(次の世代へ)渡す"], de: ["keep", "will", "skill", "known"] },
            { en: "injure", ja: "〜を傷つける", kana: "インジャー", dj: ["〜をする前に", "〜を感動させる", "〜を殺す", "〜を(次の世代へ)渡す"], de: ["injury", "invite", "introduce", "interview"] },
            { en: "ground", ja: "地面", kana: "グラウンド", dj: ["次の〜", "亡くなる", "それ自身", "〜で苦しむ"], de: ["around", "great", "friend", "pond"] },
            { en: "most", ja: "大多数(の)", kana: "モースト", dj: ["ますます〜に", "最近、この頃", "〜へ引っ越す", "〜で苦しむ"], de: ["move", "must", "me", "just"] },
            { en: "lately", ja: "最近、この頃", kana: "レイトリー", dj: ["ますます〜に", "大多数(の)", "〜へ引っ越す", "〜で苦しむ"], de: ["lady", "love", "itself", "closely"] },
            { en: "itself", ja: "それ自身", kana: "イットセルフ", dj: ["亡くなる", "〜で苦しむ", "〜かそこら", "次の〜"], de: ["it'll", "lately", "injure", "injury"] },
            { en: "suffer from 〜", ja: "〜で苦しむ", kana: "サファー フロム", dj: ["〜かそこら", "亡くなる", "ますます〜に", "大多数(の)"], de: ["die from 〜", "move to 〜", "survivor", "surfing"] },
            { en: "pass down 〜", ja: "〜を(次の世代へ)渡す", kana: "パス ダウン", dj: ["〜を切り抜けて生き残る", "〜を感動させる", "〜を傷つける", "〜をする前に"], de: ["pass away", "hand in ~", "move to 〜", "all of 〜"] },
            { en: "move to 〜", ja: "〜へ引っ越す", kana: "ムーブ トゥ", dj: ["ますます〜に", "大多数(の)", "最近、この頃", "〜で苦しむ"], de: ["move", "most", "more and more 〜", "be into 〜"] },
            { en: "be into 〜", ja: "〜に熱中する", kana: "ビー イントゥ", dj: ["爆発する", "Aを上下さかさまにする", "～に参加する", "演ずる、披露する"], de: ["be going to ~", "be able to ~", "be ready to ~", "behind"] },
            { en: "move", ja: "〜を感動させる", kana: "ムーブ", dj: ["〜を傷つける", "〜をする前に", "〜を殺す", "〜を(次の世代へ)渡す"], de: ["most", "move to 〜", "me", "love"] },
            { en: "before 〜ing", ja: "〜をする前に", kana: "ビフォー", dj: ["〜を傷つける", "〜を感動させる", "〜を殺す", "〜を(次の世代へ)渡す"], de: ["be into 〜", "be able to ~", "behind", "be going to ~"] },
            { en: "survive", ja: "〜を切り抜けて生き残る", kana: "サバイブ", dj: ["〜を(次の世代へ)渡す", "〜を感動させる", "〜を傷つける", "〜をする前に"], de: ["survivor", "surfing", "suggest", "success"] },
            { en: "blow-blew-blown", ja: "吹き飛ばす[原形-過去形-過去分詞形]", kana: "ブロー・ブルー・ブローン", dj: ["〜を知っている[knowの過去分詞形]", "持っていく[原形-過去形-過去分詞形]", "〜をする[原形-過去形-過去分詞形]", "〜になる[原形-過去形-過去分詞形]"], de: ["be able to ~", "go-went-gone", "do-did-done", "sleep-slept"] },
            { en: "volunteer", ja: "ボランティア活動", kana: "ボランティア", dj: ["ますます〜に", "大多数(の)", "最近、この頃", "〜へ引っ越す"], de: ["painter", "lately", "weather", "partner"] },
            { en: "〜 or so", ja: "〜かそこら", kana: "オア ソー", dj: ["〜で苦しむ", "亡くなる", "ますます〜に", "大多数(の)"], de: ["most", "A and B", "about ~", "sign up"] },
            { en: "the following 〜", ja: "次の〜", kana: "ザ フォローイング", dj: ["亡くなる", "地面", "それ自身", "〜で苦しむ"], de: ["thousands of 〜", "they'll", "before 〜ing", "die from 〜"] },
          ],
        },
        r6: {
          label: "Passing Down Memories Part3",
          words: [
            { en: "collect", ja: "〜を集める", kana: "コレクト", dj: ["〜を保存する", "〜をだます", "〜を片づける", "〜を殺す"], de: ["compose", "complete", "comic", "clear"] },
            { en: "would", ja: "[willの過去形]", kana: "ウッド", dj: ["[beの過去分詞形]", "眠る[原形-過去形]", "来る[原形-過去形-過去分詞形]", "乗る[原形-過去形-過去分詞形]"], de: ["won't", "wow", "we'll", "will"] },
            { en: "over there", ja: "向こうに", kana: "オーバー ゼア", dj: ["人物の像", "30分", "箱、ケース", "何千もの〜"], de: ["get here", "move to 〜", "weather", "each other"] },
            { en: "be affected by 〜", ja: "〜の影響を受ける", kana: "ビー アフェクテッド バイ", dj: ["〜(が原因)で死ぬ", "箱、ケース", "何千もの〜", "向こうに"], de: ["be able to ~", "be dropped on 〜", "be ready to ~", "be going to ~"] },
            { en: "keep", ja: "〜を保存する", kana: "キープ", dj: ["〜を集める", "〜を片づける", "〜を傷つける", "〜をする前に"], de: ["kill", "send", "step", "been"] },
            { en: "recovery", ja: "回復", kana: "リカバリー", dj: ["けが", "30分", "向こうに", "人物の像"], de: ["recipe", "reflect", "reach", "ever"] },
            { en: "injury", ja: "けが", kana: "インジャリー", dj: ["回復", "30分", "向こうに", "人物の像"], de: ["injure", "invite", "in ~", "figure"] },
            { en: "half", ja: "30分", kana: "ハーフ", dj: ["向こうに", "回復", "けが", "人物の像"], de: ["hard", "high", "hear", "health"] },
            { en: "figure", ja: "人物の像", kana: "フィギュア", dj: ["向こうに", "30分", "箱、ケース", "何千もの〜"], de: ["injury", "friend", "fan", "degree"] },
            { en: "case", ja: "箱、ケース", kana: "ケース", dj: ["何千もの〜", "向こうに", "人物の像", "30分"], de: ["call", "carry", "club", "half"] },
            { en: "apparent", ja: "明白な", kana: "アパレント", dj: ["可能な", "平らな", "無言の", "永久の"], de: ["Japanese", "art", "permanent", "silent"] },
            { en: "thousands of 〜", ja: "何千もの〜", kana: "サウザンズ オブ", dj: ["箱、ケース", "向こうに", "人物の像", "30分"], de: ["thousand", "hear of 〜", "the following 〜", "all of 〜"] },
            { en: "model A after B", ja: "BをモデルとしてAをつくる", kana: "モデル エー アフター ビー", dj: ["〜(が原因)で死ぬ", "〜の影響を受ける", "箱、ケース", "何千もの〜"], de: ["more and more 〜", "move to 〜", "end A with B", "over there"] },
            { en: "Good luck.", ja: "幸運を。", kana: "グッド ラック", dj: ["何回〜ですか。", "〜ではないですか。", "あなたはどうですか。", "私を～と呼んでください。"], de: ["get here", "ground", "collect", "over there"] },
            { en: "die from 〜", ja: "〜(が原因)で死ぬ", kana: "ダイ フロム", dj: ["〜の影響を受ける", "箱、ケース", "何千もの〜", "BをモデルとしてAをつくる"], de: ["suffer from 〜", "hear of 〜", "move to 〜", "all of 〜"] },
          ],
        },
        r7: {
          label: "Passing Down Memories 本文",
          words: [
            { en: "explode", ja: "爆発する", kana: "エクスプロード", dj: ["〜に熱中する", "Aを上下さかさまにする", "～に参加する", "演ずる、披露する"], de: ["everyone", "end", "complete", "power"] },
            { en: "structure", ja: "建物", kana: "ストラクチャー", dj: ["破壊", "悲劇", "爆撃", "生存者"], de: ["sculpture", "study", "stage", "survivor"] },
            { en: "survivor", ja: "生存者", kana: "サバイバー", dj: ["後遺症", "非常に", "建物", "破壊"], de: ["survive", "surfing", "success", "sunny"] },
            { en: "southeast", ja: "南東(の)", kana: "サウスイースト", dj: ["一瞬にして", "原爆ドーム", "生存者", "後遺症"], de: ["South Africa", "someone", "success", "suggest"] },
            { en: "power", ja: "力", kana: "パワー", dj: ["芽", "建物", "破壊", "悲劇"], de: ["Pozzo", "pond", "postwar", "portrait"] },
            { en: "destruction", ja: "破壊", kana: "デストラクション", dj: ["建物", "悲劇", "爆撃", "生存者"], de: ["destructive", "structure", "degree", "decide"] },
            { en: "Brazil", ja: "ブラジル[国名]", kana: "ブラジル", dj: ["約〜、およそ〜", "〜に投下される", "南東(の)", "一瞬にして"], de: ["bombing", "bud", "behind", "but"] },
            { en: "aftereffect", ja: "後遺症", kana: "アフターエフェクト", dj: ["生存者", "非常に", "建物", "破壊"], de: ["reflect", "audience", "apparent", "around"] },
            { en: "silent", ja: "無言の", kana: "サイレント", dj: ["永久の", "記念の", "完全な", "戦後の"], de: ["since", "sweet", "send", "sunny"] },
            { en: "permanent", ja: "永久の", kana: "パーマネント", dj: ["無言の", "記念の", "完全な", "戦後の"], de: ["perform", "president", "partner", "print"] },
            { en: "memorial", ja: "記念の", kana: "メモリアル", dj: ["無言の", "永久の", "完全な", "戦後の"], de: ["meeting", "me", "mirror", "move"] },
            { en: "destructive", ja: "破壊的な", kana: "デストラクティブ", dj: ["無言の", "永久の", "記念の", "完全な"], de: ["destruction", "structure", "decide", "degree"] },
            { en: "complete", ja: "完全な", kana: "コンプリート", dj: ["無言の", "永久の", "記念の", "戦後の"], de: ["compose", "comic", "collect", "clear"] },
            { en: "instantly", ja: "一瞬にして", kana: "インスタントリー", dj: ["南東(の)", "原爆ドーム", "生存者", "後遺症"], de: ["injury", "in total", "interview", "invite"] },
            { en: "enormously", ja: "非常に", kana: "イノーマスリー", dj: ["生存者", "後遺症", "建物", "破壊"], de: ["everyone", "end", "instantly", "around"] },
            { en: "around", ja: "約〜、およそ〜", kana: "アラウンド", dj: ["〜に投下される", "ブラジル[国名]", "南東(の)", "一瞬にして"], de: ["ground", "art", "friend", "pond"] },
            { en: "be dropped on 〜", ja: "〜に投下される", kana: "ビー ドロップト オン", dj: ["約〜、およそ〜", "ブラジル[国名]", "南東(の)", "一瞬にして"], de: ["be affected by 〜", "be going to ~", "be ready to ~", "be able to ~"] },
            { en: "Atomic Bomb Dome", ja: "原爆ドーム", kana: "アトミック ボム ドーム", dj: ["南東(の)", "一瞬にして", "生存者", "後遺症"], de: ["from now on", "Arcimboldo", "all of 〜", "about ~"] },
            { en: "transplant", ja: "〜を植え替える", kana: "トランスプラント", dj: ["〜を荷造りする", "〜を感動させる", "〜を片づける", "〜を傷つける"], de: ["tragedy", "trick", "thousand", "silent"] },
            { en: "tragedy", ja: "悲劇", kana: "トラジェディ", dj: ["建物", "破壊", "爆撃", "生存者"], de: ["transplant", "trick", "title", "take"] },
            { en: "bud", ja: "芽", kana: "バッド", dj: ["力", "建物", "破壊", "悲劇"], de: ["but", "end", "been", "behind"] },
            { en: "bombing", ja: "爆撃", kana: "ボミング", dj: ["建物", "破壊", "悲劇", "生存者"], de: ["behind", "Brazil", "bud", "meeting"] },
            { en: "postwar", ja: "戦後の", kana: "ポストウォー", dj: ["無言の", "永久の", "記念の", "完全な"], de: ["power", "possible", "portrait", "Pozzo"] },
          ],
        },
      },
    },
  };
  /* /AUTO-GENERATED:vocab */

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
      return { en: w.en, ja: w.ja, kana: w.kana, dj: w.dj, de: w.de, gradeId: gradeId, setId: setId };
    });
  }

  // 指定範囲の単語配列。setId が "all" のときは学年内の全範囲を結合。
  // gradeId が "all" のときは全学年・全範囲を結合。
  function wordsFor(gradeId, setId) {
    if (gradeId === "all") return allWords();
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
    if (gradeId === "all") return "全学年・全範囲";
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

  // pool から答え(answerVal)以外の値を、重複なく最大 num 個選ぶ。
  // exclude に入っている値（既に選んだ誤答など）も避ける。
  function pickDistractors(pool, keyA, answerVal, num, exclude) {
    var seen = {};
    seen[answerVal] = true;
    (exclude || []).forEach(function (v) { seen[v] = true; });
    var out = [];
    var shuffled = shuffle(pool);
    for (var i = 0; i < shuffled.length && out.length < num; i++) {
      var v = shuffled[i][keyA];
      if (v != null && v !== "" && !seen[v]) { seen[v] = true; out.push(v); }
    }
    return out;
  }

  // 文字列リスト（その単語専用の誤答候補）から、答え以外を重複なく最大 num 個選ぶ
  function pickFromList(list, answerVal, num) {
    var seen = {};
    seen[answerVal] = true;
    var out = [];
    var shuffled = shuffle(list || []);
    for (var i = 0; i < shuffled.length && out.length < num; i++) {
      var v = shuffled[i];
      if (v != null && v !== "" && !seen[v]) { seen[v] = true; out.push(v); }
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

    var target = format === "choice8" ? 8 : 4;

    return picked.map(function (w) {
      var q = {
        question: w[keyQ],
        answer: w[keyA],
        word: { gradeId: w.gradeId, setId: w.setId, en: w.en, ja: w.ja, kana: w.kana },
      };
      // 問題文が英語のとき（英語→意味）は、その読みを問題側の補助として持たせる
      if (keyQ === "en" && w.kana) q.questionKana = w.kana;
      if (isType) {
        q.accepts = "text";
      } else {
        var answer = w[keyA];
        var need = target - 1;
        // ① その単語専用の誤答候補を優先（意味の答え→dj、英語の答え→de）
        var curated = keyA === "ja" ? w.dj : w.de;
        var distractors = pickFromList(curated, answer, need);
        // ② 足りなければ他の単語の値で補う
        if (distractors.length < need) {
          distractors = distractors.concat(
            pickDistractors(distractorPool, keyA, answer, need - distractors.length, distractors)
          );
        }
        q.choices = shuffle(distractors.concat([answer]));
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

  // 複数範囲の単語を結合する。pairs = [{ gradeId, setId }, ...]
  function wordsForSelection(pairs) {
    var merged = [];
    pairs.forEach(function (p) { merged = merged.concat(tagWords(p.gradeId, p.setId)); });
    return merged;
  }
  function selectionLabel(pairs) {
    if (!pairs || pairs.length === 0) return "（範囲未選択）";
    if (pairs.length === 1) return rangeLabel(pairs[0].gradeId, pairs[0].setId);
    return rangeLabel(pairs[0].gradeId, pairs[0].setId) + " ほか" + (pairs.length - 1) + "範囲";
  }

  /**
   * 選んだ複数範囲から問題を作る（Unit1 Part1・Part2 などの組み合わせ）。
   * @param {Array} pairs [{ gradeId, setId }, ...]
   */
  function buildSelection(pairs, dir, count, format) {
    format = format || "choice4";
    var isType = format === "type";
    var words = wordsForSelection(pairs);
    var questions = makeQuestions(words, dir, count, format, words);
    var key = pairs.map(function (p) { return p.gradeId + "/" + p.setId; }).sort().join(",");

    return {
      questions: questions,
      meta: {
        mode: "vocab",
        groupId: "vocab:sel:" + key + ":" + (isType ? "type" : dir) + ":" + format,
        label: "英単語 / " + selectionLabel(pairs) + " / " + dirLabelOf(dir, isType) + " / " + fmtLabelOf(format),
        pairs: pairs,
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
            kana: w.kana,
            dj: (w.dj || []).join(";"),
            de: (w.de || []).join(";"),
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
    buildSelection: buildSelection,
    buildFromWords: buildFromWords,
    dump: dump,
  };
})(window);
