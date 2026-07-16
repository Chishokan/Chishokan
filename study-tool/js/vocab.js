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
            { en: "I'm", ja: "I amの短縮形", kana: "アイム", dj: ["you areの短縮形", "he isの短縮形", "it isの短縮形", "do notの短縮形"], de: ["I'll", "I've", "it's", "it"] },
            { en: "you're", ja: "you areの短縮形", kana: "ユア", dj: ["I amの短縮形", "that isの短縮形", "what isの短縮形", "do notの短縮形"], de: ["your", "You're welcome.", "don't", "won't"] },
            { en: "love", ja: "～が大好きである", kana: "ラブ", dj: ["南アフリカ共和国", "呼ぶ、名づける", "クラブ、部", "私を（に）"], de: ["low", "live", "lie", "luck"] },
            { en: "call", ja: "呼ぶ、名づける", kana: "コール", dj: ["～が大好きである", "南アフリカ共和国", "クラブ、部", "私を（に）"], de: ["cafe", "case", "can", "club"] },
            { en: "club", ja: "クラブ、部", kana: "クラブ", dj: ["私を（に）", "甘い菓子", "～もまた", "みなさん"], de: ["class", "call", "clear", "cloudy"] },
            { en: "Japanese", ja: "日本の", kana: "ジャパニーズ", dj: ["その", "～から、～出身の", "英語の", "中国の"], de: ["Chinese", "January", "Spanish", "join"] },
            { en: "from ~", ja: "～から、～出身の", kana: "フロム", dj: ["日本の", "その", "あなた(たち)の", "１つの、1人の"], de: ["from now on", "for ~", "French", "friend"] },
            { en: "want to ~", ja: "～したい", kana: "ウォントゥ", dj: ["～でない", "かわいい", "すばらしい", "かっこいい"], de: ["with ~", "hand in ~", "into ~", "not ~"] },
            { en: "the", ja: "その", kana: "ザ", dj: ["日本の", "～から、～出身の", "英語の", "中国の"], de: ["that", "they'll", "thank", "third"] },
            { en: "me", ja: "私を（に）", kana: "ミー", dj: ["クラブ、部", "甘い菓子", "～もまた", "みなさん"], de: ["Mr.", "Ms.", "May", "make"] },
            { en: "A and B", ja: "AとB", kana: "エー アンド ビー", dj: ["甘い菓子", "数字", "～もまた", "みなさん"], de: ["around ~", "about ~", "after ~", "a, an"] },
            { en: "Call me ~ .", ja: "私を～と呼んでください。", kana: "コール ミー", dj: ["あなたはどうですか。", "彼女は[が]～です。", "彼は[が]～です。", "どういたしまして。"], de: ["call", "want to ~", "She is ~.", "He is ~."] },
            { en: "join", ja: "～に加わる、参加する", kana: "ジョイン", dj: ["～に感謝する", "～に相当する", "勉強する", "練習する"], de: ["June", "July", "just", "JHS"] },
            { en: "sweet", ja: "甘い菓子", kana: "スウィート", dj: ["～もまた", "みなさん", "クラブ、部", "私を（に）"], de: ["street", "see", "step", "sunset"] },
            { en: "number", ja: "数字", kana: "ナンバー", dj: ["AとB", "甘い菓子", "～もまた", "みなさん"], de: ["November", "never", "me", "now"] },
            { en: "~, too", ja: "～もまた", kana: "トゥー", dj: ["甘い菓子", "みなさん", "クラブ、部", "私を（に）"], de: ["into ~", "a, an", "in ~", "on ~"] },
            { en: "everyone", ja: "みなさん", kana: "エブリワン", dj: ["甘い菓子", "～もまた", "クラブ、部", "私を（に）"], de: ["ever", "explode", "end", "welcome"] },
            { en: "South Africa", ja: "南アフリカ共和国", kana: "サウス アフリカ", dj: ["～が大好きである", "呼ぶ、名づける", "クラブ、部", "私を（に）"], de: ["southeast", "station", "surfing", "suffer from 〜"] },
          ],
        },
        u1p2: {
          label: "Unit1 Part2",
          words: [
            { en: "not ~", ja: "～でない", kana: "ノット", dj: ["すばらしい", "～したい", "かわいい", "かっこいい"], de: ["no", "near ~", "now", "for ~"] },
            { en: "no", ja: "いいえ", kana: "ノー", dj: ["ファン", "しかし", "友達", "ラグビー"], de: ["now", "oh", "so", "do"] },
            { en: "don't", ja: "do notの短縮形", kana: "ドント", dj: ["she isの短縮形", "cannotの短縮形", "who isの短縮形", "you areの短縮形"], de: ["won't", "dome", "do", "can't"] },
            { en: "watch", ja: "～を（注意して）見る", kana: "ウォッチ", dj: ["～を利用する、～を受ける", "～を作る", "～を許す", "～を通して、～によって"], de: ["waste", "walk", "war", "what"] },
            { en: "friend", ja: "友達", kana: "フレンド", dj: ["あら", "いいえ", "ファン", "しかし"], de: ["Friday", "French", "fan", "forest"] },
            { en: "fan", ja: "ファン", kana: "ファン", dj: ["いいえ", "しかし", "友達", "ラグビー"], de: ["can", "father", "family", "food"] },
            { en: "often", ja: "しばしば、よく", kana: "オーフン", dj: ["～といっしょに", "ラグビー", "いいえ", "ファン"], de: ["oh", "fan", "oops", "online"] },
            { en: "with ~", ja: "～といっしょに", kana: "ウィズ", dj: ["しばしば、よく", "ラグビー", "いいえ", "ファン"], de: ["will", "win", "into ~", "not ~"] },
            { en: "but", ja: "しかし", kana: "バット", dj: ["いいえ", "ファン", "友達", "ラグビー"], de: ["bud", "burn", "bird", "fan"] },
            { en: "rugby", ja: "ラグビー", kana: "ラグビー", dj: ["いいえ", "ファン", "しかし", "友達"], de: ["rule", "rag", "reach", "river"] },
            { en: "great", ja: "すばらしい", kana: "グレート", dj: ["～でない", "かっこいい", "おもしろい", "～したい"], de: ["ground", "good", "read", "area"] },
            { en: "oh", ja: "あら", kana: "オー", dj: ["友達", "いいえ", "ファン", "しかし"], de: ["no", "our", "oops", "often"] },
          ],
        },
        u1p3: {
          label: "Unit1 Part3",
          words: [
            { en: "take", ja: "～を利用する、～を受ける", kana: "テイク", dj: ["～を（注意して）見る", "～を作る", "～を許す", "～を発射する、打ち上げる"], de: ["make", "the", "Taiwan", "team"] },
            { en: "draw", ja: "（線や絵）をかく", kana: "ドロー", dj: ["（日本の）アニメ", "～に所属して", "芸術、美術", "～について"], de: ["date", "dome", "do", "pray"] },
            { en: "swimming", ja: "水泳", kana: "スイミング", dj: ["学校", "授業", "今", "マンガ"], de: ["surfing", "sweet", "someone", "skin"] },
            { en: "school", ja: "学校", kana: "スクール", dj: ["水泳", "授業", "今", "マンガ"], de: ["symbol", "shoot", "so", "second"] },
            { en: "art", ja: "芸術、美術", kana: "アート", dj: ["～について", "～に所属して", "マンガ", "だから"], de: ["area", "around", "also", "anime"] },
            { en: "a, an", ja: "１つの、1人の", kana: "ア、アン", dj: ["次の、となりの", "～から、～出身の", "あなた(たち)の", "お気に入りの"], de: ["A and B", "anime", "in ~", "area"] },
            { en: "now", ja: "今", kana: "ナウ", dj: ["水泳", "学校", "授業", "マンガ"], de: ["no", "wow", "how", "low"] },
            { en: "in ~", ja: "～に所属して", kana: "イン", dj: ["芸術、美術", "～について", "（線や絵）をかく", "（日本の）アニメ"], de: ["into ~", "in total", "on ~", "by ~"] },
            { en: "about ~", ja: "～について", kana: "アバウト", dj: ["芸術、美術", "～に所属して", "マンガ", "だから"], de: ["about", "above", "around ~", "after ~"] },
            { en: "How about you ?", ja: "あなたはどうですか。", kana: "ハウ アバウト ユー", dj: ["彼女は[が]～です。", "彼は[が]～です。", "どういたしまして。", "私を～と呼んでください。"], de: ["How many times 〜?", "~, don't you?", "Here you are.", "about ~"] },
            { en: "lesson", ja: "授業", kana: "レッスン", dj: ["水泳", "学校", "今", "マンガ"], de: ["low", "mission", "so", "lately"] },
            { en: "comic", ja: "マンガ", kana: "コミック", dj: ["だから", "うわあ", "水泳", "学校"], de: ["come", "compose", "cool", "complete"] },
            { en: "anime", ja: "（日本の）アニメ", kana: "アニメ", dj: ["（線や絵）をかく", "～に所属して", "芸術、美術", "～について"], de: ["answer", "above", "art", "ancient"] },
            { en: "so", ja: "だから", kana: "ソー", dj: ["マンガ", "うわあ", "水泳", "学校"], de: ["some", "see", "no", "do"] },
            { en: "wow", ja: "うわあ", kana: "ワオ", dj: ["マンガ", "だから", "水泳", "学校"], de: ["now", "who", "why", "win"] },
          ],
        },
        s105gdqs: {
          label: "Unit2 Part1",
          words: [
            { en: "She is ~.", ja: "彼女は[が]～です。", kana: "シー イズ", dj: ["彼は[が]～です。", "あなたはどうですか。", "どういたしまして。", "私を～と呼んでください。"], de: ["He is ~.", "she's", "I see.", "sign up"] },
            { en: "He is ~.", ja: "彼は[が]～です。", kana: "ヒー イズ", dj: ["彼女は[が]～です。", "どういたしまして。", "あなたはどうですか。", "幸運を祈ります。"], de: ["She is ~.", "he's", "hear of 〜", "hand in ~"] },
            { en: "she's", ja: "she isの短縮形", kana: "シーズ", dj: ["he isの短縮形", "do notの短縮形", "cannotの短縮形", "who isの短縮形"], de: ["he's", "shoot", "who's", "She is ~."] },
            { en: "he's", ja: "he isの短縮形", kana: "ヒーズ", dj: ["she isの短縮形", "it isの短縮形", "I amの短縮形", "do notの短縮形"], de: ["here", "hear", "hell", "she's"] },
            { en: "team", ja: "チーム", kana: "ティーム", dj: ["クラス", "カナダ", "先生", "～の一員で"], de: ["teacher", "tent", "that", "town"] },
            { en: "teacher", ja: "先生", kana: "ティーチャー", dj: ["チーム", "クラス", "カナダ", "～の一員で"], de: ["team", "weather", "tent", "father"] },
            { en: "good", ja: "じょうずな、よい", kana: "グッド", dj: ["かっこいい", "かわいい", "～することができない", "すばらしい"], de: ["go", "cool", "glow", "food"] },
            { en: "English", ja: "英語の", kana: "イングリッシュ", dj: ["私たちの", "日本の", "中国の", "親切な"], de: ["end", "Spanish", "explode", "excuse"] },
            { en: "cute", ja: "かわいい", kana: "キュート", dj: ["かっこいい", "じょうずな、よい", "～したい", "～でない"], de: ["cool", "Cusco", "culture", "come"] },
            { en: "cool", ja: "かっこいい", kana: "クール", dj: ["かわいい", "じょうずな、よい", "すばらしい", "おもしろい"], de: ["come", "cute", "good", "comic"] },
            { en: "on ~", ja: "～の一員で", kana: "オン", dj: ["チーム", "クラス", "カナダ", "先生"], de: ["in ~", "by ~", "online", "oops"] },
            { en: "our", ja: "私たちの", kana: "アウア", dj: ["英語の", "勇かんな", "日本の", "いくつかの"], de: ["your", "oh", "oops", "the"] },
            { en: "be good at ~ing", ja: "～することが得意だ", kana: "ビー グッド アット イング", dj: ["アメリカ(合衆国)", "～の一員で", "チーム", "（男性をさして）～さん、～先生"], de: ["be going to ~", "be ready to ~", "be able to ~", "be on fire"] },
            { en: "Mr.", ja: "（男性をさして）～さん、～先生", kana: "ミスター", dj: ["（女性をさして）～さん、～先生", "～することが得意だ", "アメリカ(合衆国)", "～の一員で"], de: ["Ms.", "May", "me", "most"] },
            { en: "Ms.", ja: "（女性をさして）～さん、～先生", kana: "ミズ", dj: ["（男性をさして）～さん、～先生", "～することが得意だ", "アメリカ(合衆国)", "～の一員で"], de: ["Mr.", "May", "me", "most"] },
            { en: "class", ja: "クラス", kana: "クラス", dj: ["チーム", "カナダ", "先生", "～の一員で"], de: ["club", "case", "clear", "climax"] },
            { en: "Canada", ja: "カナダ", kana: "キャナダ", dj: ["チーム", "クラス", "先生", "～の一員で"], de: ["can", "cannot", "can't", "call"] },
            { en: "America", ja: "アメリカ(合衆国)", kana: "アメリカ", dj: ["～することが得意だ", "～の一員で", "チーム", "（男性をさして）～さん、～先生"], de: ["April", "area", "anime", "art"] },
          ],
        },
        s105gdqt: {
          label: "Unit2 Part2",
          words: [
            { en: "can", ja: "～することができる", kana: "キャン", dj: ["本当に、本当ですか", "じょうずに", "そのこと", "食べ物"], de: ["can't", "Canada", "cannot", "call"] },
            { en: "cannot", ja: "～することができない", kana: "キャナット", dj: ["非常に、[否定文で]あまり～でない", "じょうずな、よい", "すばらしい", "かっこいい"], de: ["can't", "can", "Canada", "carry"] },
            { en: "can't", ja: "cannotの短縮形", kana: "キャント", dj: ["that isの短縮形", "do notの短縮形", "she isの短縮形", "who isの短縮形"], de: ["cannot", "can", "Canada", "carry"] },
            { en: "read", ja: "読む", kana: "リード", dj: ["中国", "親", "食べ物", "父"], de: ["reach", "really", "relax", "rag"] },
            { en: "make", ja: "～を作る", kana: "メイク", dj: ["～を許す", "～を（注意して）見る", "～を利用する、～を受ける", "～を送る"], de: ["May", "move", "take", "March"] },
            { en: "parent", ja: "親", kana: "ペアレント", dj: ["父", "読む", "中国", "食べ物"], de: ["partner", "park", "parade", "print"] },
            { en: "food", ja: "食べ物", kana: "フード", dj: ["読む", "そのこと", "中国", "親"], de: ["follow", "forest", "fan", "float"] },
            { en: "father", ja: "父", kana: "ファーザァ", dj: ["親", "読む", "中国", "食べ物"], de: ["family", "fan", "weather", "flash"] },
            { en: "some", ja: "いくつかの", kana: "サム", dj: ["中国の", "あれ、あの", "私たちの", "お気に入りの"], de: ["someone", "so", "see", "come"] },
            { en: "Chinese", ja: "中国の", kana: "チャイニーズ", dj: ["いくつかの", "日本の", "英語の", "親切な"], de: ["China", "church", "compose", "cannot"] },
            { en: "well", ja: "じょうずに", kana: "ウェル", dj: ["そのこと", "食べ物", "読む", "中国"], de: ["week", "we'll", "will", "welcome"] },
            { en: "very", ja: "非常に、[否定文で]あまり～でない", kana: "ヴェリィ", dj: ["～することができない", "じょうずな、よい", "すばらしい", "かっこいい"], de: ["read", "well", "here", "Peru"] },
            { en: "really", ja: "本当に、本当ですか", kana: "リーアリィ", dj: ["～することができる", "じょうずに", "そのこと", "食べ物"], de: ["read", "reach", "relax", "recipe"] },
            { en: "that", ja: "そのこと", kana: "ザット", dj: ["食べ物", "じょうずに", "読む", "中国"], de: ["that's", "thank", "the", "third"] },
            { en: "that's", ja: "that isの短縮形", kana: "ザッツ", dj: ["cannotの短縮形", "you areの短縮形", "what isの短縮形", "do notの短縮形"], de: ["that", "thank", "what's", "they'll"] },
            { en: "China", ja: "中国", kana: "チャイナ", dj: ["読む", "親", "食べ物", "父"], de: ["Chinese", "can", "church", "climax"] },
            { en: "I see.", ja: "なるほど。", kana: "アイ スィー", dj: ["すみません。", "ありがとう。", "はい、どうぞ。", "幸運を祈ります。"], de: ["itself", "into ~", "in ~", "He is ~."] },
          ],
        },
        s105gdqu: {
          label: "Unit2 Part3",
          words: [
            { en: "that", ja: "あれ、あの", kana: "ザット", dj: ["あなた(たち)の", "いくつかの", "私たちの", "お気に入りの"], de: ["that's", "thank", "the", "third"] },
            { en: "it", ja: "それ[が]", kana: "イット", dj: ["歓迎される", "おっと", "鳥", "クラブ、部"], de: ["it's", "it'll", "itself", "I'm"] },
            { en: "it's", ja: "it isの短縮形", kana: "イッツ", dj: ["he isの短縮形", "I amの短縮形", "do notの短縮形", "she isの短縮形"], de: ["it'll", "it", "I'm", "I'll"] },
            { en: "your", ja: "あなた(たち)の", kana: "ユア", dj: ["あれ、あの", "～から、～出身の", "１つの、1人の", "次の、となりの"], de: ["you're", "our", "yet", "some"] },
            { en: "Here you are.", ja: "はい、どうぞ。", kana: "ヒア ユー アー", dj: ["すみません。", "ありがとう。", "どういたしまして。", "幸運を祈ります。"], de: ["He is ~.", "here", "hear of 〜", "Thank you."] },
            { en: "Excuse me.", ja: "すみません。", kana: "イクスキューズ ミー", dj: ["ありがとう。", "はい、どうぞ。", "どういたしまして。", "なるほど。"], de: ["excuse", "I see.", "each other", "explode"] },
            { en: "thank", ja: "～に感謝する", kana: "サンク", dj: ["～に相当する", "勉強する", "練習する", "～に加わる、参加する"], de: ["that", "Thank you.", "that's", "third"] },
            { en: "excuse", ja: "～を許す", kana: "イクスキューズ", dj: ["～を作る", "～を（注意して）見る", "～を利用する、～を受ける", "～を送る"], de: ["Excuse me.", "explode", "decide", "injure"] },
            { en: "bird", ja: "鳥", kana: "バード", dj: ["おっと", "それ[が]", "歓迎される", "今"], de: ["bud", "burn", "but", "behind"] },
            { en: "welcome", ja: "歓迎される", kana: "ウェルカム", dj: ["それ[が]", "おっと", "鳥", "クラブ、部"], de: ["well", "website", "weather", "we've"] },
            { en: "oops", ja: "おっと", kana: "ウプス", dj: ["それ[が]", "鳥", "歓迎される", "AとB"], de: ["oh", "hope", "often", "our"] },
            { en: "Thank you.", ja: "ありがとう。", kana: "サンキュー", dj: ["すみません。", "はい、どうぞ。", "どういたしまして。", "なるほど。"], de: ["thank", "that", "that's", "hang down"] },
            { en: "You're welcome.", ja: "どういたしまして。", kana: "ユア ウェルカム", dj: ["はい、どうぞ。", "すみません。", "ありがとう。", "彼は[が]～です。"], de: ["you're", "your", "Here you are.", "Excuse me."] },
          ],
        },
        s1spippr: {
          label: "Unit3 Our School Part1",
          words: [
            { en: "who", ja: "だれ、だれが", kana: "フー", dj: ["一族、家族", "シンボル、象徴", "登場人物", "～もまた、そのうえ"], de: ["why", "who's", "what", "when"] },
            { en: "what", ja: "何、どんなもの[こと]", kana: "ワット", dj: ["～もまた、そのうえ", "シンボル、象徴", "だれ、だれが", "一族、家族"], de: ["what's", "who", "why", "what're"] },
            { en: "who's", ja: "who isの短縮形", kana: "フーズ", dj: ["what isの短縮形", "do notの短縮形", "she isの短縮形", "cannotの短縮形"], de: ["who", "what's", "what", "why"] },
            { en: "what's", ja: "what isの短縮形", kana: "ワッツ", dj: ["who isの短縮形", "you areの短縮形", "that isの短縮形", "do notの短縮形"], de: ["what're", "what", "who's", "that's"] },
            { en: "family", ja: "一族、家族", kana: "ファミリィ", dj: ["だれ、だれが", "登場人物", "シンボル、象徴", "なぜ"], de: ["father", "fan", "favorite", "Friday"] },
            { en: "kind", ja: "親切な", kana: "カインド", dj: ["勇かんな", "お気に入りの", "日本の", "英語の"], de: ["kill", "keep", "bird", "send"] },
            { en: "interesting", ja: "おもしろい", kana: "インタレスティング", dj: ["すばらしい", "かっこいい", "～したい", "～でない"], de: ["interview", "introduce", "information", "Inti Raymi"] },
            { en: "favorite", ja: "お気に入りの", kana: "フェイバリット", dj: ["勇かんな", "親切な", "１つの、1人の", "いくつかの"], de: ["family", "father", "fan", "forest"] },
            { en: "why", ja: "なぜ", kana: "ワイ", dj: ["登場人物", "一族、家族", "だれ、だれが", "シンボル、象徴"], de: ["who", "what", "when", "who's"] },
            { en: "also", ja: "～もまた、そのうえ", kana: "オールソウ", dj: ["何、どんなもの[こと]", "シンボル、象徴", "だれ、だれが", "一族、家族"], de: ["area", "art", "who", "so"] },
            { en: "symbol", ja: "シンボル、象徴", kana: "スィンボル", dj: ["だれ、だれが", "一族、家族", "～もまた、そのうえ", "登場人物"], de: ["school", "skill", "someone", "so"] },
            { en: "character", ja: "登場人物", kana: "キャラクタァ", dj: ["一族、家族", "だれ、だれが", "なぜ", "シンボル、象徴"], de: ["church", "China", "craft", "Chinese"] },
            { en: "brave", ja: "勇かんな", kana: "ブレイヴ", dj: ["親切な", "お気に入りの", "私たちの", "日本の"], de: ["Brazil", "bird", "been", "burn"] },
            { en: "for ~", ja: "～に相当する", kana: "フォー", dj: ["～に感謝する", "勉強する", "練習する", "～に加わる、参加する"], de: ["forest", "from ~", "food", "not ~"] },
          ],
        },
        s1spipps: {
          label: "Unit3 Our School Part2",
          words: [
            { en: "how", ja: "どのようにして", kana: "ハウ", dj: ["日本語、日本人", "住む、生きる", "放課後(に)", "する、行う"], de: ["hope", "here", "now", "wow"] },
            { en: "when", ja: "いつ", kana: "ウェン", dj: ["歩く", "来る", "月曜日", "火曜日"], de: ["where", "what", "who", "why"] },
            { en: "walk", ja: "歩く", kana: "ウォーク", dj: ["いつ", "来る", "月曜日", "火曜日"], de: ["war", "week", "well", "when"] },
            { en: "study", ja: "勉強する", kana: "スタディ", dj: ["練習する", "～に感謝する", "～に相当する", "～に加わる、参加する"], de: ["stage", "step", "Sunday", "Saturday"] },
            { en: "live", ja: "住む、生きる", kana: "リヴ", dj: ["放課後(に)", "どのようにして", "する、行う", "週、1週間"], de: ["lie", "love", "lighted", "luck"] },
            { en: "do", ja: "する、行う", kana: "ドゥー", dj: ["週、1週間", "～によって", "～のあとに", "住む、生きる"], de: ["dome", "no", "so", "go"] },
            { en: "come", ja: "来る", kana: "カム", dj: ["いつ", "歩く", "月曜日", "火曜日"], de: ["comic", "compose", "cool", "cafe"] },
            { en: "week", ja: "週、1週間", kana: "ウィーク", dj: ["する、行う", "～によって", "～のあとに", "住む、生きる"], de: ["well", "when", "walk", "we'd"] },
            { en: "Monday", ja: "月曜日", kana: "マンディ", dj: ["火曜日", "水曜日", "木曜日", "金曜日"], de: ["month", "Sunday", "most", "May"] },
            { en: "Tuesday", ja: "火曜日", kana: "チューズディ", dj: ["月曜日", "水曜日", "木曜日", "金曜日"], de: ["Thursday", "Sunday", "team", "Monday"] },
            { en: "Wednesday", ja: "水曜日", kana: "ウェンズディ", dj: ["月曜日", "火曜日", "木曜日", "金曜日"], de: ["week", "Tuesday", "website", "Thursday"] },
            { en: "Thursday", ja: "木曜日", kana: "サーズディ", dj: ["月曜日", "火曜日", "水曜日", "金曜日"], de: ["Tuesday", "third", "thousand", "that"] },
            { en: "Friday", ja: "金曜日", kana: "フライディ", dj: ["月曜日", "火曜日", "水曜日", "木曜日"], de: ["friend", "Monday", "Sunday", "French"] },
            { en: "Saturday", ja: "土曜日", kana: "サタディ", dj: ["月曜日", "火曜日", "水曜日", "木曜日"], de: ["Sunday", "study", "Thursday", "Tuesday"] },
            { en: "Sunday", ja: "日曜日", kana: "サンディ", dj: ["月曜日", "火曜日", "水曜日", "木曜日"], de: ["sunny", "sunset", "Saturday", "Monday"] },
            { en: "Japanese", ja: "日本語、日本人", kana: "ジャパニーズ", dj: ["どのようにして", "住む、生きる", "放課後(に)", "する、行う"], de: ["January", "June", "happiness", "just"] },
            { en: "here", ja: "ここで", kana: "ヒア", dj: ["月曜日", "火曜日", "水曜日", "木曜日"], de: ["hear", "hell", "he's", "hard"] },
            { en: "by ~", ja: "～によって", kana: "バイ", dj: ["する、行う", "週、1週間", "～のあとに", "住む、生きる"], de: ["in ~", "on ~", "bird", "but"] },
            { en: "around ~", ja: "～のまわりで[に]", kana: "アラウンド", dj: ["オンラインで(に)", "どのようにして", "日本語、日本人", "住む、生きる"], de: ["around", "about ~", "A and B", "after ~"] },
            { en: "after ~", ja: "～のあとに", kana: "アフター", dj: ["する、行う", "週、1週間", "～によって", "住む、生きる"], de: ["after school", "aftereffect", "about ~", "around ~"] },
            { en: "after school", ja: "放課後(に)", kana: "アフター スクール", dj: ["住む、生きる", "どのようにして", "する、行う", "週、1週間"], de: ["after ~", "aftereffect", "around ~", "school"] },
            { en: "online", ja: "オンラインで(に)", kana: "オンライン", dj: ["～のまわりで[に]", "どのようにして", "日本語、日本人", "住む、生きる"], de: ["live", "often", "on ~", "anime"] },
          ],
        },
        s1spippt: {
          label: "Unit3 Our School Part3",
          words: [
            { en: "where", ja: "どこに[で、へ]", kana: "ウェア", dj: ["～の近くに[で]", "(暦上での)月", "1番目(の)、1日", "2番目(の)、2日"], de: ["when", "what", "who", "why"] },
            { en: "win", ja: "勝つ", kana: "ウィン", dj: ["行く", "1月", "2月", "3月"], de: ["will", "wow", "who", "why"] },
            { en: "see", ja: "～が見える、～を見る", kana: "スィー", dj: ["1番目(の)、1日", "2番目(の)、2日", "3番目(の)、3日", "～(の中)に[で、の]"], de: ["serve", "send", "second", "so"] },
            { en: "practice", ja: "練習する", kana: "プラクティス", dj: ["勉強する", "～に感謝する", "～に相当する", "～に加わる、参加する"], de: ["prayer", "pray", "print", "picnic"] },
            { en: "go", ja: "行く", kana: "ゴウ", dj: ["勝つ", "1月", "2月", "3月"], de: ["good", "game", "glow", "no"] },
            { en: "station", ja: "駅", kana: "ステイション", dj: ["運", "勝つ", "行く", "1月"], de: ["stage", "street", "study", "step"] },
            { en: "park", ja: "公園、遊園地", kana: "パーク", dj: ["試合、競技会", "(暦上での)月", "一生懸命に", "～のそばに"], de: ["parent", "path", "pack", "parade"] },
            { en: "game", ja: "試合、競技会", kana: "ゲイム", dj: ["公園、遊園地", "(暦上での)月", "一生懸命に", "～のそばに"], de: ["go", "date", "glow", "come"] },
            { en: "January", ja: "1月", kana: "ジャニュアリィ", dj: ["勝つ", "行く", "2月", "3月"], de: ["July", "June", "Japanese", "February"] },
            { en: "February", ja: "2月", kana: "フェブルアリィ", dj: ["勝つ", "行く", "1月", "3月"], de: ["January", "Friday", "figure", "first"] },
            { en: "March", ja: "3月", kana: "マーチ", dj: ["勝つ", "行く", "1月", "2月"], de: ["May", "month", "make", "Mr."] },
            { en: "April", ja: "4月", kana: "エイプリル", dj: ["勝つ", "行く", "1月", "2月"], de: ["appear", "area", "art", "anime"] },
            { en: "May", ja: "5月", kana: "メイ", dj: ["勝つ", "行く", "1月", "2月"], de: ["March", "make", "Mr.", "Ms."] },
            { en: "June", ja: "6月", kana: "ジューン", dj: ["勝つ", "行く", "1月", "2月"], de: ["July", "just", "game", "date"] },
            { en: "July", ja: "7月", kana: "ジュライ", dj: ["勝つ", "行く", "1月", "2月"], de: ["June", "just", "January", "luck"] },
            { en: "August", ja: "8月", kana: "オーガスト", dj: ["勝つ", "行く", "1月", "2月"], de: ["about", "around", "April", "also"] },
            { en: "September", ja: "9月", kana: "セプテンバー", dj: ["勝つ", "行く", "1月", "2月"], de: ["December", "see", "November", "second"] },
            { en: "October", ja: "10月", kana: "オクトーバー", dj: ["11月", "12月", "ろうか", "勝つ"], de: ["often", "November", "December", "online"] },
            { en: "November", ja: "11月", kana: "ノヴェンバー", dj: ["10月", "12月", "ろうか", "勝つ"], de: ["number", "December", "September", "October"] },
            { en: "December", ja: "12月", kana: "ディセンバー", dj: ["10月", "11月", "ろうか", "勝つ"], de: ["decrease", "decide", "November", "September"] },
            { en: "month", ja: "(暦上での)月", kana: "マンス", dj: ["～の下に[で]", "どこに[で、へ]", "公園、遊園地", "試合、競技会"], de: ["Monday", "most", "March", "move"] },
            { en: "first", ja: "1番目(の)、1日", kana: "ファースト", dj: ["2番目(の)、2日", "3番目(の)、3日", "どこに[で、へ]", "～が見える、～を見る"], de: ["forest", "firework", "figure", "float"] },
            { en: "second", ja: "2番目(の)、2日", kana: "セカンド", dj: ["1番目(の)、1日", "3番目(の)、3日", "どこに[で、へ]", "～が見える、～を見る"], de: ["send", "see", "serve", "school"] },
            { en: "third", ja: "3番目(の)、3日", kana: "サード", dj: ["1番目(の)、1日", "2番目(の)、2日", "どこに[で、へ]", "～が見える、～を見る"], de: ["that", "thank", "hard", "the"] },
            { en: "hard", ja: "一生懸命に", kana: "ハード", dj: ["～のそばに", "公園、遊園地", "試合、競技会", "10月"], de: ["half", "harvest", "here", "hear"] },
            { en: "in ~", ja: "～(の中)に[で、の]", kana: "イン", dj: ["～が見える、～を見る", "1番目(の)、1日", "2番目(の)、2日", "3番目(の)、3日"], de: ["into ~", "in total", "on ~", "by ~"] },
            { en: "by ~", ja: "～のそばに", kana: "バイ", dj: ["一生懸命に", "公園、遊園地", "試合、競技会", "10月"], de: ["in ~", "on ~", "bird", "but"] },
            { en: "under ~", ja: "～の下に[で]", kana: "アンダー", dj: ["(暦上での)月", "どこに[で、へ]", "公園、遊園地", "試合、競技会"], de: ["near ~", "after ~", "in ~", "until"] },
            { en: "date", ja: "日付", kana: "デイト", dj: ["勝つ", "行く", "1月", "2月"], de: ["damage", "dome", "game", "draw"] },
            { en: "next", ja: "次の、となりの", kana: "ネクスト", dj: ["１つの、1人の", "～から、～出身の", "あなた(たち)の", "お気に入りの"], de: ["never", "next time", "now", "no"] },
            { en: "near ~", ja: "～の近くに[で]", kana: "ニア", dj: ["どこに[で、へ]", "(暦上での)月", "1番目(の)、1日", "2番目(の)、2日"], de: ["under ~", "not ~", "next", "in ~"] },
            { en: "luck", ja: "運", kana: "ラック", dj: ["駅", "勝つ", "行く", "1月"], de: ["love", "live", "lady", "low"] },
            { en: "hallway", ja: "ろうか", kana: "ホールウェイ", dj: ["10月", "11月", "12月", "勝つ"], de: ["half", "hard", "harvest", "happen"] },
            { en: "Good luck.", ja: "幸運を祈ります。", kana: "グッド ラック", dj: ["彼は[が]～です。", "はい、どうぞ。", "どういたしまして。", "あなたはどうですか。"], de: ["good", "go", "get here", "She is ~."] },
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
            { en: "will", ja: "～するでしょう、～するつもりです", kana: "ウィル", dj: ["ウェブサイト、ホームページ", "ネットで、オンラインで", "（目標に）手が届く", "ステップ、段階"], de: ["win", "well", "walk", "what"] },
            { en: "won't", ja: "will notの短縮形", kana: "ウォント", dj: ["we wouldの短縮形", "it willの短縮形", "I willの短縮形", "what areの短縮形"], de: ["we'd", "don't", "would", "wow"] },
            { en: "it'll", ja: "it willの短縮形", kana: "イトゥル", dj: ["will notの短縮形", "I willの短縮形", "we wouldの短縮形", "we willの短縮形"], de: ["it's", "I'll", "itself", "it"] },
            { en: "I'll", ja: "I willの短縮形", kana: "アイル", dj: ["it willの短縮形", "will notの短縮形", "we wouldの短縮形", "we willの短縮形"], de: ["it'll", "I've", "I'm", "it's"] },
            { en: "forget-forgot", ja: "～を忘れる[原形-過去形]", kana: "フォーゲット・フォーゴット", dj: ["書く[原形-過去形]", "来る[原形-過去形-過去分詞形]", "[beの過去分詞形]", "乗る[原形-過去形-過去分詞形]"], de: ["forest", "firework", "follow", "for ~"] },
            { en: "send", ja: "～を送る", kana: "センド", dj: ["～を運ぶ", "～を移動する", "～を招待する", "～を決める"], de: ["see", "second", "serve", "step"] },
            { en: "carry", ja: "～を運ぶ", kana: "キャリー", dj: ["～を送る", "～を移動する", "～を招待する", "～を決める"], de: ["can't", "call", "cafe", "case"] },
            { en: "sunny", ja: "晴れた", kana: "サニー", dj: ["最低値", "最高値", "激しく", "情報"], de: ["Sunday", "sunset", "surfing", "study"] },
            { en: "heavy", ja: "重い", kana: "ヘビー", dj: ["お互い", "力強い", "痛い", "～したい"], de: ["hear", "health", "he's", "here"] },
            { en: "cloudy", ja: "曇りの", kana: "クラウディ", dj: ["西方の", "壮大な", "古代の", "不可能な"], de: ["closely", "club", "climax", "class"] },
            { en: "reach", ja: "（目標に）手が届く", kana: "リーチ", dj: ["ステップ、段階", "ネットで、オンラインで", "摂氏～度（℃）", "ウェブサイト、ホームページ"], de: ["read", "really", "relax", "recipe"] },
            { en: "move", ja: "～を移動する", kana: "ムーブ", dj: ["～を招待する", "～を送る", "～を運ぶ", "～を提出する"], de: ["most", "make", "month", "me"] },
            { en: "invite", ja: "～を招待する", kana: "インバイト", dj: ["～を移動する", "～を送る", "～を運ぶ", "～を提出する"], de: ["injure", "injury", "I've", "online"] },
            { en: "website", ja: "ウェブサイト、ホームページ", kana: "ウェブサイト", dj: ["ネットで、オンラインで", "～するでしょう、～するつもりです", "（目標に）手が届く", "ステップ、段階"], de: ["welcome", "weather", "western", "we've"] },
            { en: "step", ja: "ステップ、段階", kana: "ステップ", dj: ["摂氏～度（℃）", "（目標に）手が届く", "申し込む", "晴れた"], de: ["study", "stage", "street", "see"] },
            { en: "low", ja: "最低値", kana: "ロー", dj: ["晴れた", "最高値", "激しく", "情報"], de: ["love", "lie", "now", "wow"] },
            { en: "information", ja: "情報", kana: "インフォメーション", dj: ["天気", "動画", "晴れた", "最低値"], de: ["interesting", "interview", "instantly", "invite"] },
            { en: "high", ja: "最高値", kana: "ハイ", dj: ["晴れた", "最低値", "激しく", "情報"], de: ["hard", "here", "hear", "hope"] },
            { en: "weather", ja: "天気", kana: "ウェザー", dj: ["情報", "動画", "晴れた", "最低値"], de: ["website", "western", "week", "teacher"] },
            { en: "online", ja: "ネットで、オンラインで", kana: "オンライン", dj: ["（目標に）手が届く", "ウェブサイト、ホームページ", "ステップ、段階", "摂氏～度（℃）"], de: ["often", "on ~", "invite", "anime"] },
            { en: "hard", ja: "激しく", kana: "ハード", dj: ["晴れた", "最低値", "最高値", "情報"], de: ["half", "harvest", "here", "high"] },
            { en: "we'd", ja: "we wouldの短縮形", kana: "ウィド", dj: ["will notの短縮形", "it willの短縮形", "I willの短縮形", "what areの短縮形"], de: ["we'll", "we've", "well", "week"] },
            { en: "sign up", ja: "申し込む", kana: "サイン アップ", dj: ["晴れた", "最低値", "最高値", "激しく"], de: ["since", "sunny", "in ~", "step"] },
            { en: "~, don't you?", ja: "（あなたは）～ですよね?", kana: "ドント ユー", dj: ["私を～と呼んでください。", "あなたはどうですか。", "彼女は[が]～です。", "彼は[が]～です。"], de: ["~, too", "How about you ?", "Thank you.", "isn't 〜?"] },
            { en: "degree", ja: "摂氏～度（℃）", kana: "ディグリー", dj: ["ステップ、段階", "（目標に）手が届く", "申し込む", "晴れた"], de: ["decide", "detail", "decrease", "destroy"] },
            { en: "video clip", ja: "動画", kana: "ビデオ クリップ", dj: ["情報", "天気", "晴れた", "最低値"], de: ["victim", "sign up", "under ~", "into ~"] },
          ],
        },
        u1p2: {
          label: "Unit1 Talent Show Part2",
          words: [
            { en: "be going to ~", ja: "～するつもり", kana: "ビー ゴーイング トゥ", dj: ["スキル、腕前", "パートナー、相棒", "～まで（ずっと）", "髪を切る"], de: ["be ready to ~", "be able to ~", "be good at ~ing", "be into 〜"] },
            { en: "partner", ja: "パートナー、相棒", kana: "パートナー", dj: ["～まで（ずっと）", "～するつもり", "スキル、腕前", "髪を切る"], de: ["parent", "parade", "park", "painter"] },
            { en: "take part in ~", ja: "～に参加する", kana: "テイク パート イン", dj: ["演ずる、披露する", "行進する、パレードする", "～に感謝する", "～に相当する"], de: ["take a look", "take", "take-took-taken", "hand in ~"] },
            { en: "skill", ja: "スキル、腕前", kana: "スキル", dj: ["～するつもり", "パートナー、相棒", "～まで（ずっと）", "髪を切る"], de: ["skin", "will", "kill", "sweet"] },
            { en: "end", ja: "終わり", kana: "エンド", dj: ["髪を切る", "～するつもり", "スキル、腕前", "パートナー、相棒"], de: ["ever", "bud", "no", "read"] },
            { en: "until", ja: "～まで（ずっと）", kana: "アンティル", dj: ["パートナー、相棒", "～するつもり", "スキル、腕前", "髪を切る"], de: ["usage", "April", "skill", "detail"] },
            { en: "hand in ~", ja: "～を提出する", kana: "ハンド イン", dj: ["～を移動する", "～を招待する", "～を紹介する", "～を計画する"], de: ["hang down", "He is ~.", "want to ~", "happiness"] },
            { en: "get a haircut", ja: "髪を切る", kana: "ゲット ア ヘアカット", dj: ["終わり", "～するつもり", "スキル、腕前", "パートナー、相棒"], de: ["get here", "have a haircut", "end A with B", "be on fire"] },
          ],
        },
        u1p3: {
          label: "Unit1 Talent Show Part3",
          words: [
            { en: "introduce", ja: "～を紹介する", kana: "イントロデュース", dj: ["～を移動する", "～を招待する", "～を提出する", "～を計画する"], de: ["injure", "interview", "invite", "into ~"] },
            { en: "history", ja: "歴史", kana: "ヒストリー", dj: ["健康", "レシピ、調理法", "情報", "天気"], de: ["high", "hallway", "health", "here"] },
            { en: "health", ja: "健康", kana: "ヘルス", dj: ["歴史", "レシピ、調理法", "情報", "天気"], de: ["hear", "heavy", "hell", "here"] },
            { en: "recipe", ja: "レシピ、調理法", kana: "レシピ", dj: ["歴史", "健康", "ステップ、段階", "摂氏～度（℃）"], de: ["recovery", "really", "reach", "relax"] },
          ],
        },
        u1rt: {
          label: "Unit1 Talent Show R&T・T&S",
          words: [
            { en: "hear", ja: "～ということを耳にする、～だそうだ", kana: "ヒア", dj: ["（クラスなどの）総代", "AをBとともに終える", "ミーティング、会議", "～する準備が整う"], de: ["heavy", "health", "here", "hell"] },
            { en: "meeting", ja: "ミーティング、会議", kana: "ミーティング", dj: ["～する準備が整う", "（クラスなどの）総代", "ミラー[人の姓]", "AをBとともに終える"], de: ["meaning", "me", "ceiling", "behind"] },
            { en: "through", ja: "～を通して、～によって", kana: "スルー", dj: ["～を楽しみにする", "～を計画する", "～を提案する", "～を決める"], de: ["they'll", "thousand", "truth", "that's"] },
            { en: "in total", ja: "総計で", kana: "イン トータル", dj: ["初めて", "参加者", "～できる", "題、演目"], de: ["in ~", "into ~", "instantly", "Inti Raymi"] },
            { en: "be ready to ~", ja: "～する準備が整う", kana: "ビー レディ トゥ", dj: ["ミラー[人の姓]", "ミーティング、会議", "舞台、ステージ", "（クラスなどの）総代"], de: ["be able to ~", "be going to ~", "be into 〜", "be good at ~ing"] },
            { en: "look forward to ~", ja: "～を楽しみにする", kana: "ルック フォワード トゥ", dj: ["～を計画する", "～を提案する", "～を通して、～によって", "～を決める"], de: ["be ready to ~", "in order to ~", "be going to ~", "be able to ~"] },
            { en: "each other", ja: "お互い", kana: "イーチ アザー", dj: ["力強い", "重い", "～したい", "～でない"], de: ["Excuse me.", "earthquake", "end A with B", "over there"] },
            { en: "be able to ~", ja: "～できる", kana: "ビー エイブル トゥ", dj: ["題、演目", "千（の）", "総計で", "初めて"], de: ["be ready to ~", "be going to ~", "be into 〜", "be affected by 〜"] },
            { en: "for the first time", ja: "初めて", kana: "フォー ザ ファースト タイム", dj: ["総計で", "参加者", "～できる", "題、演目"], de: ["forest", "for ~", "forget-forgot", "next time"] },
            { en: "plan", ja: "～を計画する", kana: "プラン", dj: ["～を提案する", "～を決める", "～を楽しみにする", "～を通して、～によって"], de: ["pray", "pack", "park", "path"] },
            { en: "perform", ja: "演ずる、披露する", kana: "パフォーム", dj: ["～に参加する", "行進する、パレードする", "～に加わる、参加する", "～に感謝する"], de: ["Peru", "permanent", "peace", "parade"] },
            { en: "title", ja: "題、演目", kana: "タイトル", dj: ["～できる", "千（の）", "総計で", "初めて"], de: ["Miller", "third", "truth", "take"] },
            { en: "thousand", ja: "千（の）", kana: "サウザンド", dj: ["～できる", "題、演目", "総計で", "初めて"], de: ["thousands of 〜", "Thursday", "through", "thank"] },
            { en: "success", ja: "成功", kana: "サクセス", dj: ["勉強", "総計で", "初めて", "参加者"], de: ["successor", "suggest", "sunset", "surfing"] },
            { en: "behind", ja: "～の後ろに", kana: "ビハインド", dj: ["聴衆、観客", "～できる", "題、演目", "千（の）"], de: ["been", "bird", "bombing", "bud"] },
            { en: "study", ja: "勉強", kana: "スタディ", dj: ["成功", "総計で", "初めて", "参加者"], de: ["stage", "step", "street", "sunny"] },
            { en: "stage", ja: "舞台、ステージ", kana: "ステージ", dj: ["～する準備が整う", "ミラー[人の姓]", "インタビュー", "ミーティング、会議"], de: ["study", "station", "step", "street"] },
            { en: "president", ja: "（クラスなどの）総代", kana: "プレジデント", dj: ["AをBとともに終える", "ミーティング、会議", "～する準備が整う", "ミラー[人の姓]"], de: ["presentation", "print", "prayer", "participant"] },
            { en: "Miller", ja: "ミラー[人の姓]", kana: "ミラー", dj: ["～する準備が整う", "ミーティング、会議", "舞台、ステージ", "（クラスなどの）総代"], de: ["million", "mirror", "title", "mission"] },
            { en: "JHS", ja: "Junior High Schoolの略", kana: "ジェイ エイチ エス", dj: ["High Schoolの略", "～ということを耳にする、～だそうだ", "they willの短縮形", "～を通して、～によって"], de: ["HS", "just", "join", "June"] },
            { en: "interview", ja: "インタビュー", kana: "インタビュー", dj: ["～の後ろに", "舞台、ステージ", "聴衆、観客", "～する準備が整う"], de: ["interesting", "introduce", "Inti Raymi", "invite"] },
            { en: "HS", ja: "High Schoolの略", kana: "エイチ エス", dj: ["Junior High Schoolの略", "they willの短縮形", "～を通して、～によって", "we willの短縮形"], de: ["JHS", "how", "he's", "hear"] },
            { en: "we'll", ja: "we willの短縮形", kana: "ウィル", dj: ["they willの短縮形", "it willの短縮形", "will notの短縮形", "I willの短縮形"], de: ["we've", "we'd", "well", "week"] },
            { en: "end A with B", ja: "AをBとともに終える", kana: "エンド エー ウィズ ビー", dj: ["（クラスなどの）総代", "ミーティング、会議", "～する準備が整う", "ミラー[人の姓]"], de: ["entrance hall", "each other", "end", "remind A of B"] },
            { en: "decide", ja: "～を決める", kana: "ディサイド", dj: ["～を計画する", "～を提案する", "～を楽しみにする", "～を通して、～によって"], de: ["December", "decrease", "degree", "detail"] },
            { en: "suggest", ja: "～を提案する", kana: "サジェスト", dj: ["～を計画する", "～を決める", "～を楽しみにする", "～を通して、～によって"], de: ["success", "sunset", "survive", "stage"] },
            { en: "participant", ja: "参加者", kana: "パーティシパント", dj: ["総計で", "初めて", "～できる", "題、演目"], de: ["partner", "parent", "president", "parade"] },
            { en: "audience", ja: "聴衆、観客", kana: "オーディエンス", dj: ["～の後ろに", "～できる", "題、演目", "千（の）"], de: ["August", "ancient", "anime", "since"] },
            { en: "they'll", ja: "they willの短縮形", kana: "ゼイル", dj: ["we willの短縮形", "will notの短縮形", "we wouldの短縮形", "what areの短縮形"], de: ["the", "that's", "through", "we'll"] },
          ],
        },
        sdgerro: {
          label: "Unit2 Festivals in the World Part1",
          words: [
            { en: "win", ja: "（試合など）に勝つ", kana: "ウィン", dj: ["詳細、詳しい内容", "コンビニエンスストア", "ミュージシャン", "100万(の)"], de: ["will", "wow", "who", "why"] },
            { en: "hope", ja: "～だとよいと思う、～を望む", kana: "ホウプ", dj: ["発表、プレゼン(テーション)", "コンビニエンスストア", "（試合など）に勝つ", "詳細、詳しい内容"], de: ["how", "here", "rose", "hard"] },
            { en: "town", ja: "町", kana: "タウン", dj: ["駅", "通り", "バラ", "花火"], de: ["team", "that", "tent", "Taiwan"] },
            { en: "street", ja: "通り", kana: "ストリート", dj: ["バラ", "花火", "町", "駅"], de: ["stage", "step", "sweet", "structure"] },
            { en: "station", ja: "駅", kana: "ステイション", dj: ["町", "通り", "バラ", "花火"], de: ["stage", "street", "study", "step"] },
            { en: "about", ja: "約、おおよそ", kana: "アバウト", dj: ["競技会、大会", "点、小数点", "ミュージシャン", "100万(の)"], de: ["about ~", "above", "August", "around"] },
            { en: "~ and so on", ja: "～など", kana: "アンド ソー オン", dj: ["通り", "バラ", "人間、人", "ランタン"], de: ["~, too", "hang down", "A and B", "from now on"] },
            { en: "rose", ja: "バラ", kana: "ロウズ", dj: ["通り", "花火", "町", "駅"], de: ["rule", "hope", "read", "river"] },
            { en: "presentation", ja: "発表、プレゼン(テーション)", kana: "プレゼンテーション", dj: ["～だとよいと思う、～を望む", "コンビニエンスストア", "（試合など）に勝つ", "詳細、詳しい内容"], de: ["president", "station", "competition", "print"] },
            { en: "point", ja: "点、小数点", kana: "ポイント", dj: ["約、おおよそ", "人間、人", "競技会、大会", "ランタン"], de: ["pond", "print", "Pozzo", "power"] },
            { en: "musician", ja: "ミュージシャン", kana: "ミューズィシャン", dj: ["100万(の)", "約、おおよそ", "詳細、詳しい内容", "競技会、大会"], de: ["must", "million", "mission", "human"] },
            { en: "million", ja: "100万(の)", kana: "ミリオン", dj: ["ミュージシャン", "約、おおよそ", "詳細、詳しい内容", "競技会、大会"], de: ["Miller", "mission", "mirror", "musician"] },
            { en: "human", ja: "人間、人", kana: "ヒューマン", dj: ["ランタン", "～など", "点、小数点", "通り"], de: ["human-shaped", "hear", "hope", "here"] },
            { en: "detail", ja: "詳細、詳しい内容", kana: "ディーテイル", dj: ["（試合など）に勝つ", "ミュージシャン", "100万(の)", "約、おおよそ"], de: ["degree", "decide", "destroy", "damage"] },
            { en: "competition", ja: "競技会、大会", kana: "コンペティション", dj: ["約、おおよそ", "点、小数点", "ミュージシャン", "100万(の)"], de: ["complete", "compose", "comic", "come"] },
            { en: "what're", ja: "what areの短縮形", kana: "ワター", dj: ["will notの短縮形", "we wouldの短縮形", "it willの短縮形", "we willの短縮形"], de: ["what's", "what", "who's", "where"] },
            { en: "lantern", ja: "ランタン", kana: "ランタン", dj: ["人間、人", "～など", "点、小数点", "通り"], de: ["lately", "lady", "painter", "lighted"] },
            { en: "firework", ja: "花火", kana: "ファイアワーク", dj: ["通り", "バラ", "町", "駅"], de: ["first", "figure", "forest", "mirror"] },
            { en: "convenience store", ja: "コンビニエンスストア", kana: "コンビニエンス ストア", dj: ["（試合など）に勝つ", "詳細、詳しい内容", "～だとよいと思う、～を望む", "ミュージシャン"], de: ["continue ~ ing", "competition", "come to an end", "come-came-come"] },
          ],
        },
        sdgerrp: {
          label: "Unit2 Festivals in the World Part2",
          words: [
            { en: "write-wrote", ja: "書く[原形-過去形]", kana: "ライト・ロウト", dj: ["～を忘れる[原形-過去形]", "[beの過去分詞形]", "眠る[原形-過去形]", "[willの過去形]"], de: ["western", "welcome", "website", "what're"] },
            { en: "serve", ja: "（食事・飲み物を）出す", kana: "サーヴ", dj: ["リラックスする、くつろぐ", "～の中へ、～に向けて", "ピクニック", "小道、細道"], de: ["see", "second", "send", "stage"] },
            { en: "pray", ja: "祈る", kana: "プレイ", dj: ["地域", "日没", "祈り", "幸福"], de: ["prayer", "print", "path", "park"] },
            { en: "river", ja: "川", kana: "リバー", dj: ["森", "竹", "祈る", "地域"], de: ["relax", "rose", "rule", "live"] },
            { en: "area", ja: "地域", kana: "エリア", dj: ["祈る", "日没", "祈り", "幸福"], de: ["art", "around", "also", "April"] },
            { en: "release", ja: "～を解放する", kana: "リリース", dj: ["～を無駄にする", "～を移動する", "～を招待する", "～を提出する"], de: ["relax", "repeat", "reflect", "recipe"] },
            { en: "relax", ja: "リラックスする、くつろぐ", kana: "リラックス", dj: ["（食事・飲み物を）出す", "～の中へ、～に向けて", "ピクニック", "小道、細道"], de: ["release", "read", "reach", "really"] },
            { en: "glow", ja: "光り輝く", kana: "グロー", dj: ["浮かぶ", "ピクニック", "小道、細道", "カフェ"], de: ["go", "low", "good", "game"] },
            { en: "float", ja: "浮かぶ", kana: "フロート", dj: ["カフェ", "完全に", "祈る", "地域"], de: ["flat", "flash", "first", "food"] },
            { en: "waste", ja: "～を無駄にする", kana: "ウェイスト", dj: ["～を解放する", "～を移動する", "～を招待する", "～を提出する"], de: ["watch", "walk", "war", "western"] },
            { en: "sunset", ja: "日没", kana: "サンセット", dj: ["祈る", "地域", "祈り", "幸福"], de: ["Sunday", "sunny", "success", "suggest"] },
            { en: "prayer", ja: "祈り", kana: "プレイヤー", dj: ["祈る", "地域", "日没", "幸福"], de: ["pray", "print", "phrase", "partner"] },
            { en: "picnic", ja: "ピクニック", kana: "ピクニック", dj: ["小道、細道", "光り輝く", "浮かぶ", "カフェ"], de: ["prayer", "point", "print", "pray"] },
            { en: "path", ja: "小道、細道", kana: "パス", dj: ["ピクニック", "光り輝く", "浮かぶ", "カフェ"], de: ["park", "pack", "pray", "parent"] },
            { en: "happiness", ja: "幸福", kana: "ハピネス", dj: ["祈る", "地域", "日没", "祈り"], de: ["happen", "harvest", "Japanese", "hallway"] },
            { en: "forest", ja: "森", kana: "フォレスト", dj: ["川", "竹", "祈る", "地域"], de: ["first", "follow", "for ~", "food"] },
            { en: "cafe", ja: "カフェ", kana: "キャフェイ", dj: ["浮かぶ", "完全に", "祈る", "地域"], de: ["case", "call", "can", "come"] },
            { en: "bamboo", ja: "竹", kana: "バンブー", dj: ["川", "森", "祈る", "地域"], de: ["bombing", "symbol", "behind", "Brazil"] },
            { en: "western", ja: "西方の", kana: "ウェスターン", dj: ["壮大な", "曇りの", "古代の", "不可能な"], de: ["weather", "waste", "website", "we've"] },
            { en: "magnificent", ja: "壮大な", kana: "マグニフィセント", dj: ["西方の", "曇りの", "古代の", "不可能な"], de: ["ancient", "March", "make", "musician"] },
            { en: "absolutely", ja: "完全に", kana: "アブソルートリィ", dj: ["浮かぶ", "カフェ", "祈る", "地域"], de: ["about", "above", "about ~", "lately"] },
            { en: "into ~", ja: "～の中へ、～に向けて", kana: "イントゥ", dj: ["（食事・飲み物を）出す", "リラックスする、くつろぐ", "ピクニック", "小道、細道"], de: ["in ~", "in total", "Inti Raymi", "injury"] },
          ],
        },
        s1eufexn: {
          label: "Unit2 Festivals in the World Part3・L&T・T&S",
          words: [
            { en: "remind A of B", ja: "AにBを思い出させる", kana: "リマインド エー オブ ビー", dj: ["～に位置する、ある", "言い回し、フレーズ", "～に従う、守る", "犠牲者、被災者"], de: ["remarkable", "end A with B", "hear of 〜", "be going to ~"] },
            { en: "rule", ja: "ルール、規則", kana: "ルール", dj: ["正解、答え", "～に従う、守る", "犠牲者、被災者", "災害、天災"], de: ["rugby", "rose", "read", "river"] },
            { en: "culture", ja: "文化", kana: "カルチャー", dj: ["意味", "戦争", "平和", "地震"], de: ["cute", "century", "Cusco", "sculpture"] },
            { en: "lie", ja: "～に位置する、ある", kana: "ライ", dj: ["言い回し、フレーズ", "AにBを思い出させる", "～に従う、守る", "犠牲者、被災者"], de: ["live", "low", "love", "lighted"] },
            { en: "meaning", ja: "意味", kana: "ミーニング", dj: ["文化", "戦争", "平和", "地震"], de: ["meeting", "me", "ceiling", "memorial"] },
            { en: "answer", ja: "正解、答え", kana: "アンサー", dj: ["災害、天災", "被害、損害", "ルール、規則", "～の上に"], de: ["anime", "appear", "above", "ancient"] },
            { en: "various", ja: "さまざまな、多種多様の", kana: "ヴァリアス", dj: ["色とりどりの、色彩豊かな", "大規模な、大きな", "不可能な", "曇りの"], de: ["victim", "very", "around", "about"] },
            { en: "impossible", ja: "不可能な", kana: "インポッスィブル", dj: ["大規模な、大きな", "さまざまな、多種多様の", "色とりどりの、色彩豊かな", "曇りの"], de: ["possible", "invite", "itself", "favorite"] },
            { en: "colorful", ja: "色とりどりの、色彩豊かな", kana: "カラフル", dj: ["さまざまな、多種多様の", "大規模な、大きな", "不可能な", "曇りの"], de: ["collect", "cool", "powerful", "complete"] },
            { en: "above", ja: "～の上に", kana: "アバヴ", dj: ["正解、答え", "起きる", "現れる", "災害、天災"], de: ["about", "about ~", "anime", "answer"] },
            { en: "happen", ja: "起きる", kana: "ハプン", dj: ["現れる", "文化", "意味", "～の上に"], de: ["happiness", "harvest", "hard", "half"] },
            { en: "follow", ja: "～に従う、守る", kana: "フォロウ", dj: ["犠牲者、被災者", "ルール、規則", "～に位置する、ある", "正解、答え"], de: ["food", "forest", "float", "flash"] },
            { en: "appear", ja: "現れる", kana: "アピア", dj: ["起きる", "文化", "意味", "～の上に"], de: ["apparent", "April", "answer", "area"] },
            { en: "shoot", ja: "～を発射する、打ち上げる", kana: "シュート", dj: ["～を通して、～によって", "～を楽しみにする", "～を無駄にする", "～を移動する"], de: ["she's", "school", "sweet", "some"] },
            { en: "war", ja: "戦争", kana: "ウォー", dj: ["文化", "意味", "平和", "地震"], de: ["walk", "wow", "who", "why"] },
            { en: "victim", ja: "犠牲者、被災者", kana: "ヴィクティム", dj: ["～に従う、守る", "ルール、規則", "～に位置する、ある", "正解、答え"], de: ["picnic", "until", "title", "lie"] },
            { en: "peace", ja: "平和", kana: "ピース", dj: ["文化", "意味", "戦争", "地震"], de: ["peacefully", "Peru", "phrase", "park"] },
            { en: "earthquake", ja: "地震", kana: "アースクエイク", dj: ["文化", "意味", "戦争", "平和"], de: ["culture", "damage", "phrase", "each other"] },
            { en: "disaster", ja: "災害、天災", kana: "ディザスター", dj: ["正解、答え", "被害、損害", "ルール、規則", "～の上に"], de: ["damage", "date", "December", "answer"] },
            { en: "damage", ja: "被害、損害", kana: "ダミッジ", dj: ["正解、答え", "災害、天災", "ルール、規則", "～の上に"], de: ["date", "dome", "degree", "detail"] },
            { en: "great", ja: "大規模な、大きな", kana: "グレイト", dj: ["さまざまな、多種多様の", "不可能な", "色とりどりの、色彩豊かな", "曇りの"], de: ["ground", "read", "that", "next"] },
            { en: "phrase", ja: "言い回し、フレーズ", kana: "フレイズ", dj: ["～に位置する、ある", "AにBを思い出させる", "～に従う、守る", "犠牲者、被災者"], de: ["peace", "prayer", "parade", "pray"] },
            { en: "powerful", ja: "力強い", kana: "パウアフル", dj: ["お互い", "重い", "～したい", "～でない"], de: ["power", "painful", "colorful", "portrait"] },
          ],
        },
        sscerd1: {
          label: "Unit2 Festivals in the World 本文",
          words: [
            { en: "parade", ja: "行進する、パレードする", kana: "パレイド", dj: ["演ずる、披露する", "～に参加する", "Aを上下さかさまにする", "～に加わる、参加する"], de: ["parent", "partner", "park", "phrase"] },
            { en: "float", ja: "山車(だし)", kana: "フロート", dj: ["クライマックス", "明かりのついた", "ペルー[国名]", "クスコ[地名]"], de: ["flat", "flash", "first", "food"] },
            { en: "climax", ja: "クライマックス", kana: "クライマックス", dj: ["明かりのついた", "ペルー[国名]", "クスコ[地名]", "山車(だし)"], de: ["class", "clear", "club", "China"] },
            { en: "remarkable", ja: "すばらしい、注目すべき", kana: "リマーカブル", dj: ["インティ・ライミ[祭]", "人型の、人の形をした", "平渓天燈節[祭り]", "クライマックス"], de: ["really", "release", "recipe", "reach"] },
            { en: "lighted", ja: "明かりのついた", kana: "ライテッド", dj: ["クライマックス", "ペルー[国名]", "クスコ[地名]", "山車(だし)"], de: ["live", "lie", "lantern", "lately"] },
            { en: "human-shaped", ja: "人型の、人の形をした", kana: "ヒューマン シェイプト", dj: ["すばらしい、注目すべき", "平渓天燈節[祭り]", "インティ・ライミ[祭]", "クライマックス"], de: ["human", "happen", "hallway", "harvest"] },
            { en: "Taiwan", ja: "台湾", kana: "タイワン", dj: ["収穫", "海抜", "山車(だし)", "クライマックス"], de: ["town", "take", "third", "title"] },
            { en: "Pingxi Sky Lantern Festival", ja: "平渓天燈節[祭り]", kana: "ピンシィ スカイ ランタン フェスティバル", dj: ["人型の、人の形をした", "クライマックス", "すばらしい、注目すべき", "明かりのついた"], de: ["one after another", "above sea level", "model A after B", "in order to ~"] },
            { en: "Peru", ja: "ペルー[国名]", kana: "ペルー", dj: ["クライマックス", "明かりのついた", "クスコ[地名]", "山車(だし)"], de: ["peace", "park", "perform", "pray"] },
            { en: "Inti Raymi", ja: "インティ・ライミ[祭]", kana: "インティ ライミ", dj: ["すばらしい、注目すべき", "人型の、人の形をした", "平渓天燈節[祭り]", "クライマックス"], de: ["into ~", "interview", "in total", "in ~"] },
            { en: "harvest", ja: "収穫", kana: "ハーベスト", dj: ["台湾", "海抜", "山車(だし)", "クライマックス"], de: ["hard", "haven't", "happen", "hallway"] },
            { en: "Cusco", ja: "クスコ[地名]", kana: "クスコ", dj: ["クライマックス", "明かりのついた", "ペルー[国名]", "山車(だし)"], de: ["cute", "church", "case", "culture"] },
            { en: "ancient", ja: "古代の", kana: "エンシャント", dj: ["曇りの", "西方の", "壮大な", "不可能な"], de: ["answer", "anime", "apparent", "audience"] },
            { en: "above sea level", ja: "海抜", kana: "アバヴ シー レベル", dj: ["台湾", "収穫", "山車(だし)", "クライマックス"], de: ["above", "about ~", "absolutely", "after school"] },
          ],
        },
      },
    },
    g3: {
      label: "中3",
      sets: {
        s1u7ckcu: {
          label: "Unit1 Trick Your Eyes Part1・2",
          words: [
            { en: "do-did-done", ja: "〜をする[原形-過去形-過去分詞形]", kana: "ドゥー・ディド・ダン", dj: ["〜になる[原形-過去形-過去分詞形]", "持っていく[原形-過去形-過去分詞形]", "来る[原形-過去形-過去分詞形]", "～を襲う[原形-過去形-過去分詞形]"], de: ["go-went-gone", "dome", "decide", "don't"] },
            { en: "come-came-come", ja: "来る[原形-過去形-過去分詞形]", kana: "カム・ケイム・カム", dj: ["〜をする[原形-過去形-過去分詞形]", "〜になる[原形-過去形-過去分詞形]", "持っていく[原形-過去形-過去分詞形]", "乗る[原形-過去形-過去分詞形]"], de: ["become-became-become", "come", "complete", "compose"] },
            { en: "just", ja: "ちょうど", kana: "ジャスト", dj: ["髪を切る", "じっくりと", "次回(に)", "〜のすべて"], de: ["June", "July", "JHS", "must"] },
            { en: "I've", ja: "I haveの短縮形", kana: "アイブ", dj: ["has notの短縮形", "we haveの短縮形", "have notの短縮形", "do notの短縮形"], de: ["I'll", "I'm", "we've", "it's"] },
            { en: "haven't", ja: "have notの短縮形", kana: "ハブント", dj: ["has notの短縮形", "we haveの短縮形", "I haveの短縮形", "will notの短縮形"], de: ["hasn't", "harvest", "happen", "he's"] },
            { en: "hasn't", ja: "has notの短縮形", kana: "ハズント", dj: ["we haveの短縮形", "I haveの短縮形", "have notの短縮形", "you areの短縮形"], de: ["haven't", "happen", "can't", "harvest"] },
            { en: "trick", ja: "〜をだます", kana: "トリック", dj: ["〜を片づける", "〜を荷造りする", "〜を集める", "〜を殺す"], de: ["truth", "pack", "thank", "third"] },
            { en: "pack", ja: "〜を荷造りする", kana: "パック", dj: ["〜を片づける", "〜をだます", "〜を感動させる", "〜を植え替える"], de: ["park", "path", "plan", "peace"] },
            { en: "we've", ja: "we haveの短縮形", kana: "ウィーブ", dj: ["has notの短縮形", "I haveの短縮形", "have notの短縮形", "you areの短縮形"], de: ["we'll", "we'd", "well", "week"] },
            { en: "closely", ja: "じっくりと", kana: "クロースリー", dj: ["次回(に)", "〜のすべて", "ちょうど", "髪を切る"], de: ["cloudy", "class", "clear", "climax"] },
            { en: "from now on", ja: "これからずっと、今後は", kana: "フロム ナウ オン", dj: ["[疑問文で]もう", "じっくりと", "次回(に)", "〜のすべて"], de: ["from ~", "friend", "~ and so on", "hang down"] },
            { en: "next time", ja: "次回(に)", kana: "ネクスト タイム", dj: ["じっくりと", "〜のすべて", "ちょうど", "髪を切る"], de: ["next", "near ~", "get here", "not ~"] },
            { en: "all of 〜", ja: "〜のすべて", kana: "オール オブ", dj: ["じっくりと", "次回(に)", "ちょうど", "髪を切る"], de: ["also", "hear of 〜", "around ~", "A and B"] },
            { en: "take-took-taken", ja: "持っていく[原形-過去形-過去分詞形]", kana: "テイク・トゥック・テイクン", dj: ["〜をする[原形-過去形-過去分詞形]", "〜になる[原形-過去形-過去分詞形]", "来る[原形-過去形-過去分詞形]", "〜を知っている[knowの過去分詞形]"], de: ["take a look", "take", "take part in ~", "Taiwan"] },
            { en: "become-became-become", ja: "〜になる[原形-過去形-過去分詞形]", kana: "ビカム・ビケイム・ビカム", dj: ["〜をする[原形-過去形-過去分詞形]", "持っていく[原形-過去形-過去分詞形]", "来る[原形-過去形-過去分詞形]", "～を襲う[原形-過去形-過去分詞形]"], de: ["come-came-come", "become crazy about 〜", "blow-blew-blown", "swim-swam-swum"] },
            { en: "yet", ja: "[疑問文で]もう", kana: "イェット", dj: ["じっくりと", "これからずっと、今後は", "次回(に)", "〜のすべて"], de: ["but", "art", "see", "me"] },
            { en: "clear", ja: "〜を片づける", kana: "クリア", dj: ["〜をだます", "〜を荷造りする", "〜を傷つける", "〜をする前に"], de: ["class", "club", "climax", "closely"] },
            { en: "mirror", ja: "鏡", kana: "ミラー", dj: ["ちょうど", "髪を切る", "じっくりと", "次回(に)"], de: ["Miller", "million", "mission", "March"] },
            { en: "isn't 〜?", ja: "〜ではないですか。", kana: "イズント", dj: ["何回〜ですか。", "幸運を。", "彼は[が]～です。", "どういたしまして。"], de: ["into ~", "in ~", "in total", "I see."] },
            { en: "have a haircut", ja: "髪を切る", kana: "ハブ ア ヘアカット", dj: ["ちょうど", "じっくりと", "次回(に)", "〜のすべて"], de: ["get a haircut", "haven't", "hand in ~", "hang down"] },
          ],
        },
        s12cthyx: {
          label: "Unit1 Trick Your Eyes Part3",
          words: [
            { en: "been", ja: "[beの過去分詞形]", kana: "ビーン", dj: ["眠る[原形-過去形]", "乗る[原形-過去形-過去分詞形]", "泳ぐ[原形-過去形-過去分詞形]", "行く[原形-過去形-過去分詞形]"], de: ["behind", "burn", "bird", "but"] },
            { en: "ever", ja: "今までに", kana: "エバー", dj: ["見てみる", "有名人", "テント", "サーフィン"], de: ["everyone", "never", "end", "river"] },
            { en: "never", ja: "1度も〜したことがない", kana: "ネバー", dj: ["〜に違いない", "痛い", "～することができない", "じょうずな、よい"], de: ["next", "ever", "number", "river"] },
            { en: "How many times 〜?", ja: "何回〜ですか。", kana: "ハウ メニー タイムズ", dj: ["〜ではないですか。", "幸運を。", "はい、どうぞ。", "すみません。"], de: ["How about you ?", "more and more 〜", "hand in ~", "hear of 〜"] },
            { en: "ride-rode-ridden", ja: "乗る[原形-過去形-過去分詞形]", kana: "ライド・ロード・リドゥン", dj: ["泳ぐ[原形-過去形-過去分詞形]", "行く[原形-過去形-過去分詞形]", "[beの過去分詞形]", "眠る[原形-過去形]"], de: ["take-took-taken", "river", "come-came-come", "recovery"] },
            { en: "swim-swam-swum", ja: "泳ぐ[原形-過去形-過去分詞形]", kana: "スイム・スワム・スワム", dj: ["乗る[原形-過去形-過去分詞形]", "行く[原形-過去形-過去分詞形]", "[beの過去分詞形]", "眠る[原形-過去形]"], de: ["swimming", "sleep-slept", "sweet", "come-came-come"] },
            { en: "sleep-slept", ja: "眠る[原形-過去形]", kana: "スリープ・スレプト", dj: ["[beの過去分詞形]", "乗る[原形-過去形-過去分詞形]", "泳ぐ[原形-過去形-過去分詞形]", "行く[原形-過去形-過去分詞形]"], de: ["street", "sunset", "silent", "sweet"] },
            { en: "go-went-gone", ja: "行く[原形-過去形-過去分詞形]", kana: "ゴー・ウェント・ゴーン", dj: ["乗る[原形-過去形-過去分詞形]", "泳ぐ[原形-過去形-過去分詞形]", "[beの過去分詞形]", "眠る[原形-過去形]"], de: ["do-did-done", "good", "someone", "go"] },
            { en: "celebrity", ja: "有名人", kana: "セレブリティ", dj: ["テント", "今までに", "見てみる", "サーフィン"], de: ["century", "ceiling", "culture", "closely"] },
            { en: "tent", ja: "テント", kana: "テント", dj: ["有名人", "今までに", "見てみる", "サーフィン"], de: ["team", "that", "town", "truth"] },
            { en: "surfing", ja: "サーフィン", kana: "サーフィン", dj: ["今までに", "見てみる", "有名人", "テント"], de: ["survive", "survivor", "sunny", "success"] },
            { en: "must", ja: "〜に違いない", kana: "マスト", dj: ["1度も〜したことがない", "痛い", "すばらしい", "かっこいい"], de: ["most", "Ms.", "musician", "just"] },
            { en: "take a look", ja: "見てみる", kana: "テイク ア ルック", dj: ["今までに", "有名人", "テント", "サーフィン"], de: ["take part in ~", "take", "take-took-taken", "Taiwan"] },
            { en: "hear of 〜", ja: "〜のことを聞く", kana: "ヒア オブ", dj: ["サーフィン", "今までに", "見てみる", "有名人"], de: ["hear", "health", "He is ~.", "all of 〜"] },
          ],
        },
        s12asurm: {
          label: "Unit1 Trick Your Eyes 本文",
          words: [
            { en: "3-D Art Museum", ja: "3Dアート美術館", kana: "スリーディー アート ミュージアム", dj: ["トロンプ・ルイユ", "〜に夢中になる", "ここに着く", "玄関ホール"], de: ["more and more 〜", "end A with B", "get here", "〜 or so"] },
            { en: "get here", ja: "ここに着く", kana: "ゲット ヒア", dj: ["玄関ホール", "だまし絵", "〜に夢中になる", "3Dアート美術館"], de: ["get a haircut", "over there", "next time", "teacher"] },
            { en: "entrance hall", ja: "玄関ホール", kana: "エントランス ホール", dj: ["ここに着く", "だまし絵", "〜に夢中になる", "3Dアート美術館"], de: ["end A with B", "enormously", "trompe l'oeil", "after school"] },
            { en: "reflect", ja: "〜を映す、反射する", kana: "リフレクト", dj: ["〜を荷造りする", "〜を(次の世代へ)渡す", "〜を感動させる", "〜を切り抜けて生き残る"], de: ["repeat", "release", "really", "reach"] },
            { en: "painful", ja: "痛い", kana: "ペインフル", dj: ["〜に違いない", "1度も〜したことがない", "重い", "お互い"], de: ["painter", "powerful", "partner", "parent"] },
            { en: "become crazy about 〜", ja: "〜に夢中になる", kana: "ビカム クレイジー アバウト", dj: ["3Dアート美術館", "トロンプ・ルイユ", "ここに着く", "玄関ホール"], de: ["become-became-become", "be ready to ~", "be affected by 〜", "be dropped on 〜"] },
            { en: "trompe l'oeil", ja: "トロンプ・ルイユ", kana: "トロンプ ルイユ", dj: ["3Dアート美術館", "〜に夢中になる", "ここに着く", "玄関ホール"], de: ["take a look", "entrance hall", "tragedy", "from now on"] },
            { en: "optical illusion", ja: "だまし絵", kana: "オプティカル イリュージョン", dj: ["ここに着く", "玄関ホール", "〜に夢中になる", "3Dアート美術館"], de: ["3-D Art Museum", "continue ~ ing", "trompe l'oeil", "million"] },
          ],
        },
        s290crj: {
          label: "Unit1 Trick Your Eyes R&T・T&S",
          words: [
            { en: "century", ja: "世紀", kana: "センチュリー", dj: ["版画", "婦人", "教会", "天井"], de: ["ceiling", "culture", "celebrity", "church"] },
            { en: "possible", ja: "可能な", kana: "ポッシブル", dj: ["平らな", "スペイン(人)の", "フランス(人)の", "明白な"], de: ["postwar", "impossible", "portrait", "point"] },
            { en: "someone", ja: "だれか", kana: "サムワン", dj: ["肖像画", "ドーム", "使い方", "世紀"], de: ["some", "so", "symbol", "second"] },
            { en: "compose", ja: "〜を組み立てる、構成する", kana: "コンポーズ", dj: ["〜を(次の世代へ)渡す", "〜を切り抜けて生き残る", "〜を映す、反射する", "〜を荷造りする"], de: ["complete", "come", "comic", "collect"] },
            { en: "print", ja: "版画", kana: "プリント", dj: ["世紀", "婦人", "教会", "天井"], de: ["point", "pray", "parent", "pond"] },
            { en: "Pozzo", ja: "ポッツ[人の姓]", kana: "ポッツォ", dj: ["アルチンボルド[人の姓]", "だれか", "肖像画", "ドーム"], de: ["pond", "point", "power", "print"] },
            { en: "portrait", ja: "肖像画", kana: "ポートレート", dj: ["だれか", "ドーム", "使い方", "世紀"], de: ["postwar", "point", "Pozzo", "power"] },
            { en: "lady", ja: "婦人", kana: "レディ", dj: ["世紀", "版画", "教会", "天井"], de: ["lately", "love", "live", "luck"] },
            { en: "dome", ja: "ドーム", kana: "ドーム", dj: ["だれか", "肖像画", "使い方", "世紀"], de: ["do", "date", "come", "don't"] },
            { en: "church", ja: "教会", kana: "チャーチ", dj: ["世紀", "版画", "婦人", "天井"], de: ["China", "Cusco", "character", "comic"] },
            { en: "ceiling", ja: "天井", kana: "シーリング", dj: ["世紀", "版画", "婦人", "教会"], de: ["century", "China", "meeting", "meaning"] },
            { en: "Arcimboldo", ja: "アルチンボルド[人の姓]", kana: "アルチンボルド", dj: ["ポッツ[人の姓]", "だれか", "肖像画", "ドーム"], de: ["around", "area", "art", "anime"] },
            { en: "Spanish", ja: "スペイン(人)の", kana: "スパニッシュ", dj: ["フランス(人)の", "可能な", "平らな", "木造の、木製の"], de: ["station", "English", "Japanese", "French"] },
            { en: "flat", ja: "平らな", kana: "フラット", dj: ["可能な", "スペイン(人)の", "フランス(人)の", "明白な"], de: ["flash", "float", "fan", "that"] },
            { en: "turn A upside down", ja: "Aを上下さかさまにする", kana: "ターン エー アップサイド ダウン", dj: ["〜に熱中する", "爆発する", "減少する", "行進する、パレードする"], de: ["take part in ~", "take a look", "~ and so on", "thousands of 〜"] },
            { en: "usage", ja: "使い方", kana: "ユーセージ", dj: ["だれか", "肖像画", "ドーム", "世紀"], de: ["stage", "until", "peace", "game"] },
            { en: "sculpture", ja: "彫刻", kana: "スカルプチャー", dj: ["世紀", "版画", "婦人", "教会"], de: ["culture", "structure", "century", "school"] },
            { en: "painter", ja: "画家", kana: "ペインター", dj: ["世紀", "版画", "婦人", "教会"], de: ["painful", "partner", "print", "parent"] },
            { en: "pond", ja: "池", kana: "ポンド", dj: ["世紀", "版画", "婦人", "教会"], de: ["point", "Pozzo", "power", "print"] },
            { en: "photograph", ja: "写真", kana: "フォトグラフ", dj: ["世紀", "版画", "婦人", "教会"], de: ["phrase", "portrait", "partner", "painter"] },
            { en: "French", ja: "フランス(人)の", kana: "フレンチ", dj: ["スペイン(人)の", "可能な", "平らな", "木造の、木製の"], de: ["friend", "Friday", "from ~", "flat"] },
          ],
        },
        s1kc1al7: {
          label: "Unit2 Passing Down Memories Part1・2",
          words: [
            { en: "since", ja: "〜からずっと、〜して以来", kana: "シンス", dj: ["ボランティア活動", "ますます〜に", "大多数(の)", "最近、この頃"], de: ["sunny", "stage", "serve", "sunset"] },
            { en: "known", ja: "〜を知っている[knowの過去分詞形]", kana: "ノウン", dj: ["吹き飛ばす[原形-過去形-過去分詞形]", "持っていく[原形-過去形-過去分詞形]", "～を投げる[原形-過去形-過去分詞形]", "〜をする[原形-過去形-過去分詞形]"], de: ["kill", "town", "now", "kind"] },
            { en: "pass away", ja: "亡くなる", kana: "パス アウェイ", dj: ["それ自身", "〜で苦しむ", "〜かそこら", "次の〜"], de: ["pass down 〜", "partner", "painter", "parent"] },
            { en: "more and more 〜", ja: "ますます〜に", kana: "モア アンド モア", dj: ["大多数(の)", "最近、この頃", "〜へ引っ越す", "〜で苦しむ"], de: ["move to 〜", "model A after B", "thousands of 〜", "remind A of B"] },
            { en: "kill", ja: "〜を殺す", kana: "キル", dj: ["〜を傷つける", "〜をする前に", "〜を感動させる", "〜を(次の世代へ)渡す"], de: ["kind", "keep", "will", "skill"] },
            { en: "injure", ja: "〜を傷つける", kana: "インジャー", dj: ["〜をする前に", "〜を感動させる", "〜を殺す", "〜を(次の世代へ)渡す"], de: ["injury", "invite", "introduce", "interview"] },
            { en: "ground", ja: "地面", kana: "グラウンド", dj: ["次の〜", "亡くなる", "それ自身", "〜で苦しむ"], de: ["around", "great", "good", "glow"] },
            { en: "most", ja: "大多数(の)", kana: "モースト", dj: ["ますます〜に", "最近、この頃", "〜へ引っ越す", "〜で苦しむ"], de: ["move", "month", "must", "Ms."] },
            { en: "lately", ja: "最近、この頃", kana: "レイトリー", dj: ["ますます〜に", "大多数(の)", "〜へ引っ越す", "〜で苦しむ"], de: ["lantern", "lady", "love", "live"] },
            { en: "itself", ja: "それ自身", kana: "イットセルフ", dj: ["亡くなる", "〜で苦しむ", "〜かそこら", "次の〜"], de: ["it'll", "it", "it's", "lately"] },
            { en: "suffer from 〜", ja: "〜で苦しむ", kana: "サファー フロム", dj: ["〜かそこら", "亡くなる", "ますます〜に", "大多数(の)"], de: ["die from 〜", "move to 〜", "successor", "survivor"] },
            { en: "pass down 〜", ja: "〜を(次の世代へ)渡す", kana: "パス ダウン", dj: ["〜を切り抜けて生き残る", "〜を感動させる", "〜を傷つける", "〜をする前に"], de: ["pass away", "hang down", "hand in ~", "move to 〜"] },
            { en: "move to 〜", ja: "〜へ引っ越す", kana: "ムーブ トゥ", dj: ["ますます〜に", "大多数(の)", "最近、この頃", "〜で苦しむ"], de: ["move", "most", "more and more 〜", "month"] },
            { en: "be into 〜", ja: "〜に熱中する", kana: "ビー イントゥ", dj: ["爆発する", "減少する", "Aを上下さかさまにする", "～に感謝する"], de: ["be going to ~", "be on fire", "be able to ~", "be ready to ~"] },
            { en: "move", ja: "〜を感動させる", kana: "ムーブ", dj: ["〜を傷つける", "〜をする前に", "〜を殺す", "〜を(次の世代へ)渡す"], de: ["most", "make", "move to 〜", "month"] },
            { en: "before 〜ing", ja: "〜をする前に", kana: "ビフォー", dj: ["〜を傷つける", "〜を感動させる", "〜を殺す", "〜を(次の世代へ)渡す"], de: ["be on fire", "be into 〜", "be able to ~", "be good at ~ing"] },
            { en: "survive", ja: "〜を切り抜けて生き残る", kana: "サバイブ", dj: ["〜を(次の世代へ)渡す", "〜を感動させる", "〜を傷つける", "〜をする前に"], de: ["survivor", "surfing", "suggest", "serve"] },
            { en: "blow-blew-blown", ja: "吹き飛ばす[原形-過去形-過去分詞形]", kana: "ブロー・ブルー・ブローン", dj: ["〜を知っている[knowの過去分詞形]", "持っていく[原形-過去形-過去分詞形]", "～を投げる[原形-過去形-過去分詞形]", "〜をする[原形-過去形-過去分詞形]"], de: ["throw-threw-thrown", "be able to ~", "go-went-gone", "write-wrote"] },
            { en: "volunteer", ja: "ボランティア活動", kana: "ボランティア", dj: ["ますます〜に", "大多数(の)", "最近、この頃", "〜へ引っ越す"], de: ["lantern", "painter", "lately", "victim"] },
            { en: "〜 or so", ja: "〜かそこら", kana: "オア ソー", dj: ["〜で苦しむ", "亡くなる", "ますます〜に", "大多数(の)"], de: ["near ~", "for ~", "on ~", "forest"] },
            { en: "the following 〜", ja: "次の〜", kana: "ザ フォローイング", dj: ["亡くなる", "地面", "それ自身", "〜で苦しむ"], de: ["the moment A, B", "thousands of 〜", "they'll", "before 〜ing"] },
          ],
        },
        s141neiu: {
          label: "Unit2 Passing Down Memories Part3",
          words: [
            { en: "collect", ja: "〜を集める", kana: "コレクト", dj: ["〜を保存する", "〜をだます", "〜を片づける", "〜を殺す"], de: ["colorful", "compose", "complete", "comic"] },
            { en: "would", ja: "[willの過去形]", kana: "ウッド", dj: ["[beの過去分詞形]", "眠る[原形-過去形]", "来る[原形-過去形-過去分詞形]", "乗る[原形-過去形-過去分詞形]"], de: ["won't", "wow", "wooden", "we'll"] },
            { en: "over there", ja: "向こうに", kana: "オーバー ゼア", dj: ["人物の像", "30分", "箱、ケース", "何千もの〜"], de: ["get here", "move to 〜", "weather", "each other"] },
            { en: "be affected by 〜", ja: "〜の影響を受ける", kana: "ビー アフェクテッド バイ", dj: ["〜(が原因)で死ぬ", "箱、ケース", "何千もの〜", "向こうに"], de: ["be able to ~", "be dropped on 〜", "be ready to ~", "be going to ~"] },
            { en: "keep", ja: "〜を保存する", kana: "キープ", dj: ["〜を集める", "〜を片づける", "〜を傷つける", "〜をする前に"], de: ["kill", "kind", "week", "send"] },
            { en: "recovery", ja: "回復", kana: "リカバリー", dj: ["けが", "30分", "向こうに", "人物の像"], de: ["recipe", "really", "river", "reflect"] },
            { en: "injury", ja: "けが", kana: "インジャリー", dj: ["回復", "30分", "向こうに", "人物の像"], de: ["injure", "invite", "into ~", "in ~"] },
            { en: "half", ja: "30分", kana: "ハーフ", dj: ["向こうに", "回復", "けが", "人物の像"], de: ["hard", "hallway", "hell", "happen"] },
            { en: "figure", ja: "人物の像", kana: "フィギュア", dj: ["向こうに", "30分", "箱、ケース", "何千もの〜"], de: ["first", "firework", "injury", "friend"] },
            { en: "case", ja: "箱、ケース", kana: "ケース", dj: ["何千もの〜", "向こうに", "人物の像", "30分"], de: ["cafe", "call", "can", "come"] },
            { en: "apparent", ja: "明白な", kana: "アパレント", dj: ["可能な", "平らな", "無言の", "永久の"], de: ["appear", "ancient", "parent", "April"] },
            { en: "thousands of 〜", ja: "何千もの〜", kana: "サウザンズ オブ", dj: ["箱、ケース", "向こうに", "人物の像", "30分"], de: ["thousand", "Thank you.", "hear of 〜", "the following 〜"] },
            { en: "model A after B", ja: "BをモデルとしてAをつくる", kana: "モデル エー アフター ビー", dj: ["〜(が原因)で死ぬ", "〜の影響を受ける", "箱、ケース", "何千もの〜"], de: ["more and more 〜", "move to 〜", "end A with B", "over there"] },
            { en: "Good luck.", ja: "幸運を。", kana: "グッド ラック", dj: ["何回〜ですか。", "〜ではないですか。", "なるほど。", "すみません。"], de: ["good", "get here", "She is ~.", "He is ~."] },
            { en: "die from 〜", ja: "〜(が原因)で死ぬ", kana: "ダイ フロム", dj: ["〜の影響を受ける", "箱、ケース", "何千もの〜", "BをモデルとしてAをつくる"], de: ["suffer from 〜", "hear of 〜", "move to 〜", "all of 〜"] },
          ],
        },
        samlnth: {
          label: "Unit2 Passing Down Memories 本文",
          words: [
            { en: "explode", ja: "爆発する", kana: "エクスプロード", dj: ["減少する", "〜に熱中する", "Aを上下さかさまにする", "勉強する"], de: ["excuse", "English", "everyone", "end"] },
            { en: "structure", ja: "建物", kana: "ストラクチャー", dj: ["破壊", "悲劇", "爆撃", "生存者"], de: ["street", "sculpture", "station", "study"] },
            { en: "survivor", ja: "生存者", kana: "サバイバー", dj: ["後遺症", "非常に", "建物", "破壊"], de: ["survive", "surfing", "successor", "success"] },
            { en: "southeast", ja: "南東(の)", kana: "サウスイースト", dj: ["一瞬にして", "原爆ドーム", "生存者", "後遺症"], de: ["South Africa", "someone", "success", "suggest"] },
            { en: "power", ja: "力", kana: "パワー", dj: ["芽", "建物", "破壊", "悲劇"], de: ["powerful", "point", "Pozzo", "pond"] },
            { en: "destruction", ja: "破壊", kana: "デストラクション", dj: ["建物", "悲劇", "爆撃", "生存者"], de: ["destructive", "destroy", "structure", "detail"] },
            { en: "Brazil", ja: "ブラジル[国名]", kana: "ブラジル", dj: ["約〜、およそ〜", "〜に投下される", "南東(の)", "一瞬にして"], de: ["brave", "bombing", "bud", "behind"] },
            { en: "aftereffect", ja: "後遺症", kana: "アフターエフェクト", dj: ["生存者", "非常に", "建物", "破壊"], de: ["after ~", "after school", "America", "reflect"] },
            { en: "silent", ja: "無言の", kana: "サイレント", dj: ["永久の", "記念の", "完全な", "戦後の"], de: ["since", "street", "sweet", "some"] },
            { en: "permanent", ja: "永久の", kana: "パーマネント", dj: ["無言の", "記念の", "完全な", "戦後の"], de: ["perform", "Peru", "peace", "parent"] },
            { en: "memorial", ja: "記念の", kana: "メモリアル", dj: ["無言の", "永久の", "完全な", "戦後の"], de: ["meeting", "meaning", "musician", "me"] },
            { en: "destructive", ja: "破壊的な", kana: "デストラクティブ", dj: ["無言の", "永久の", "記念の", "完全な"], de: ["destruction", "destroy", "structure", "decide"] },
            { en: "complete", ja: "完全な", kana: "コンプリート", dj: ["無言の", "永久の", "記念の", "戦後の"], de: ["compose", "come", "competition", "comic"] },
            { en: "instantly", ja: "一瞬にして", kana: "インスタントリー", dj: ["南東(の)", "原爆ドーム", "生存者", "後遺症"], de: ["injury", "in total", "interview", "invite"] },
            { en: "enormously", ja: "非常に", kana: "イノーマスリー", dj: ["生存者", "後遺症", "建物", "破壊"], de: ["English", "everyone", "end", "instantly"] },
            { en: "around", ja: "約〜、およそ〜", kana: "アラウンド", dj: ["〜に投下される", "ブラジル[国名]", "南東(の)", "一瞬にして"], de: ["around ~", "ground", "area", "art"] },
            { en: "be dropped on 〜", ja: "〜に投下される", kana: "ビー ドロップト オン", dj: ["約〜、およそ〜", "ブラジル[国名]", "南東(の)", "一瞬にして"], de: ["be affected by 〜", "be going to ~", "be ready to ~", "be able to ~"] },
            { en: "Atomic Bomb Dome", ja: "原爆ドーム", kana: "アトミック ボム ドーム", dj: ["南東(の)", "一瞬にして", "生存者", "後遺症"], de: ["from now on", "above sea level", "Arcimboldo", "all of 〜"] },
            { en: "transplant", ja: "〜を植え替える", kana: "トランスプラント", dj: ["〜を荷造りする", "〜を感動させる", "〜を片づける", "〜を傷つける"], de: ["tragedy", "trick", "thousand", "Taiwan"] },
            { en: "tragedy", ja: "悲劇", kana: "トラジェディ", dj: ["建物", "破壊", "爆撃", "生存者"], de: ["truth", "transplant", "trick", "teacher"] },
            { en: "bud", ja: "芽", kana: "バッド", dj: ["力", "建物", "破壊", "悲劇"], de: ["but", "burn", "bird", "end"] },
            { en: "bombing", ja: "爆撃", kana: "ボミング", dj: ["建物", "破壊", "悲劇", "生存者"], de: ["behind", "bamboo", "Brazil", "bird"] },
            { en: "postwar", ja: "戦後の", kana: "ポストウォー", dj: ["無言の", "永久の", "記念の", "完全な"], de: ["power", "possible", "portrait", "point"] },
          ],
        },
        s1ret4z4: {
          label: "Unit2 Passing Down Memories R&T・T&W",
          words: [
            { en: "hit-hit-hit", ja: "～を襲う[原形-過去形-過去分詞形]", kana: "ヒット・ヒット・ヒット", dj: ["～を投げる[原形-過去形-過去分詞形]", "〜をする[原形-過去形-過去分詞形]", "〜になる[原形-過去形-過去分詞形]", "持っていく[原形-過去形-過去分詞形]"], de: ["history", "high", "health", "truth"] },
            { en: "will", ja: "意志、決意", kana: "ウィル", dj: ["真実、事実", "使命、任務", "垂れ下がる", "燃えている"], de: ["win", "well", "walk", "hell"] },
            { en: "truth", ja: "真実、事実", kana: "トゥルース", dj: ["意志、決意", "使命、任務", "垂れ下がる", "燃えている"], de: ["trick", "that", "tent", "tragedy"] },
            { en: "in order to ~", ja: "～するために", kana: "イン オーダー トゥ", dj: ["次から次へと", "意志、決意", "真実、事実", "後継者、継承者"], de: ["into ~", "in total", "in ~", "be able to ~"] },
            { en: "throw-threw-thrown", ja: "～を投げる[原形-過去形-過去分詞形]", kana: "スロウ・スルー・スロウン", dj: ["～を襲う[原形-過去形-過去分詞形]", "持っていく[原形-過去形-過去分詞形]", "〜を知っている[knowの過去分詞形]", "吹き飛ばす[原形-過去形-過去分詞形]"], de: ["through", "blow-blew-blown", "take-took-taken", "write-wrote"] },
            { en: "one after another", ja: "次から次へと", kana: "ワン アフタァ アナザァ", dj: ["～するために", "意志、決意", "真実、事実", "後継者、継承者"], de: ["over there", "come to an end", "in order to ~", "each other"] },
            { en: "repeat", ja: "～をくり返す", kana: "リピート", dj: ["～を破壊する", "～を焼く", "〜を片づける", "〜を傷つける"], de: ["release", "reflect", "relax", "read"] },
            { en: "destroy", ja: "～を破壊する", kana: "ディストロイ", dj: ["～をくり返す", "～を焼く", "〜を片づける", "〜を傷つける"], de: ["destruction", "destructive", "degree", "decide"] },
            { en: "decrease", ja: "減少する", kana: "ディクリース", dj: ["爆発する", "〜に熱中する", "Aを上下さかさまにする", "勉強する"], de: ["December", "decide", "degree", "destroy"] },
            { en: "burn", ja: "～を焼く", kana: "バーン", dj: ["～をくり返す", "～を破壊する", "〜を殺す", "〜をだます"], de: ["but", "bud", "bird", "been"] },
            { en: "successor", ja: "後継者、継承者", kana: "サクセサー", dj: ["～するために", "次から次へと", "意志、決意", "真実、事実"], de: ["success", "survivor", "suggest", "sunset"] },
            { en: "storyteller", ja: "語り部", kana: "ストーリーテラー", dj: ["平和に", "終わる", "ぼろ切れ", "地獄"], de: ["street", "structure", "September", "station"] },
            { en: "skin", ja: "肌", kana: "スキン", dj: ["地獄", "閃光", "工芸", "語り部"], de: ["skill", "step", "see", "sunny"] },
            { en: "rag", ja: "ぼろ切れ", kana: "ラグ", dj: ["意志、決意", "真実、事実", "語り部", "使命、任務"], de: ["read", "rose", "rule", "rugby"] },
            { en: "mission", ja: "使命、任務", kana: "ミッション", dj: ["意志、決意", "真実、事実", "垂れ下がる", "燃えている"], de: ["million", "mirror", "Miller", "musician"] },
            { en: "hell", ja: "地獄", kana: "ヘル", dj: ["閃光", "工芸", "語り部", "肌"], de: ["here", "hear", "he's", "health"] },
            { en: "flash", ja: "閃光", kana: "フラッシュ", dj: ["地獄", "工芸", "語り部", "肌"], de: ["flat", "float", "first", "fan"] },
            { en: "peacefully", ja: "平和に", kana: "ピースフリィ", dj: ["語り部", "終わる", "ぼろ切れ", "地獄"], de: ["peace", "Peru", "painful", "perform"] },
            { en: "the moment A, B", ja: "Aするとすぐ、Bした", kana: "ザ モーメント", dj: ["後継者、継承者", "～するために", "次から次へと", "意志、決意"], de: ["the following 〜", "thousands of 〜", "be going to ~", "Thank you."] },
            { en: "hang down", ja: "垂れ下がる", kana: "ハング ダウン", dj: ["意志、決意", "真実、事実", "使命、任務", "燃えている"], de: ["hand in ~", "happen", "hard", "happiness"] },
            { en: "be on fire", ja: "燃えている", kana: "ビー オン ファイア", dj: ["意志、決意", "真実、事実", "使命、任務", "垂れ下がる"], de: ["be into 〜", "be going to ~", "be able to ~", "before 〜ing"] },
            { en: "come to an end", ja: "終わる", kana: "カム トゥ アン エンド", dj: ["語り部", "平和に", "ぼろ切れ", "地獄"], de: ["continue ~ ing", "competition", "come", "come-came-come"] },
            { en: "continue ~ ing", ja: "～し続ける", kana: "コンティニュー イング", dj: ["意志、決意", "真実、事実", "使命、任務", "垂れ下がる"], de: ["convenience store", "come to an end", "Call me ~ .", "competition"] },
            { en: "wooden", ja: "木造の、木製の", kana: "ウドゥン", dj: ["スペイン(人)の", "フランス(人)の", "破壊的な", "可能な"], de: ["won't", "would", "wow", "western"] },
            { en: "craft", ja: "工芸", kana: "クラフト", dj: ["地獄", "閃光", "語り部", "肌"], de: ["cafe", "class", "call", "case"] },
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
