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
            { en: "I'm", ja: "I amの短縮形", kana: "アイム" },
            { en: "you're", ja: "you areの短縮形", kana: "ユア" },
            { en: "love", ja: "～が大好きである", kana: "ラブ" },
            { en: "call", ja: "呼ぶ、名づける", kana: "コール" },
            { en: "club", ja: "クラブ、部", kana: "クラブ" },
            { en: "Japanese", ja: "日本の", kana: "ジャパニーズ" },
            { en: "from ~", ja: "～から、～出身の", kana: "フロム" },
            { en: "want to ~", ja: "～したい", kana: "ウォントゥ" },
            { en: "the", ja: "その", kana: "ザ" },
            { en: "me", ja: "私を（に）", kana: "ミー" },
            { en: "A and B", ja: "AとB", kana: "エー アンド ビー" },
            { en: "Call me ~ .", ja: "私を～と呼んでください。", kana: "コール ミー" },
            { en: "join", ja: "～に加わる、参加する", kana: "ジョイン" },
            { en: "sweet", ja: "甘い菓子", kana: "スウィート" },
            { en: "number", ja: "数字", kana: "ナンバー" },
            { en: "~, too", ja: "～もまた", kana: "トゥー" },
            { en: "everyone", ja: "みなさん", kana: "エブリワン" },
            { en: "South Africa", ja: "南アフリカ共和国", kana: "サウス アフリカ" },
          ],
        },
        u1p2: {
          label: "Unit1 Part2",
          words: [
            { en: "not ~", ja: "～でない", kana: "ノット" },
            { en: "no", ja: "いいえ", kana: "ノー" },
            { en: "don't", ja: "do notの短縮形", kana: "ドント" },
            { en: "watch", ja: "～を（注意して）見る", kana: "ウォッチ" },
            { en: "friend", ja: "友達", kana: "フレンド" },
            { en: "fan", ja: "ファン", kana: "ファン" },
            { en: "often", ja: "しばしば、よく", kana: "オーフン" },
            { en: "with ~", ja: "～といっしょに", kana: "ウィズ" },
            { en: "but", ja: "しかし", kana: "バット" },
            { en: "rugby", ja: "ラグビー", kana: "ラグビー" },
            { en: "great", ja: "すばらしい", kana: "グレート" },
            { en: "oh", ja: "あら", kana: "オー" },
          ],
        },
        u1p3: {
          label: "Unit1 Part3",
          words: [
            { en: "take", ja: "～を利用する、～を受ける", kana: "テイク" },
            { en: "draw", ja: "（線や絵）をかく", kana: "ドロー" },
            { en: "swimming", ja: "水泳", kana: "スイミング" },
            { en: "school", ja: "学校", kana: "スクール" },
            { en: "art", ja: "芸術、美術", kana: "アート" },
            { en: "a, an", ja: "１つの、1人の", kana: "ア、アン" },
            { en: "now", ja: "今", kana: "ナウ" },
            { en: "in ~", ja: "～に所属して", kana: "イン" },
            { en: "about ~", ja: "～について", kana: "アバウト" },
            { en: "How about you ?", ja: "あなたはどうですか。", kana: "ハウ アバウト ユー" },
            { en: "lesson", ja: "授業", kana: "レッスン" },
            { en: "comic", ja: "マンガ", kana: "コミック" },
            { en: "anime", ja: "（日本の）アニメ", kana: "アニメ" },
            { en: "so", ja: "だから", kana: "ソー" },
            { en: "wow", ja: "うわあ", kana: "ワオ" },
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
            { en: "will", ja: "～するでしょう、～するつもりです", kana: "ウィル" },
            { en: "won't", ja: "will notの短縮形", kana: "ウォント" },
            { en: "it'll", ja: "it willの短縮形", kana: "イトゥル" },
            { en: "I'll", ja: "I willの短縮形", kana: "アイル" },
            { en: "forget-forgot", ja: "～を忘れる[原形-過去形]", kana: "フォーゲット・フォーゴット" },
            { en: "send", ja: "～を送る", kana: "センド" },
            { en: "carry", ja: "～を運ぶ", kana: "キャリー" },
            { en: "sunny", ja: "晴れた", kana: "サニー" },
            { en: "heavy", ja: "重い", kana: "ヘビー" },
            { en: "cloudy", ja: "曇りの", kana: "クラウディ" },
            { en: "reach", ja: "（目標に）手が届く", kana: "リーチ" },
            { en: "move", ja: "～を移動する", kana: "ムーブ" },
            { en: "invite", ja: "～を招待する", kana: "インバイト" },
            { en: "website", ja: "ウェブサイト、ホームページ", kana: "ウェブサイト" },
            { en: "step", ja: "ステップ、段階", kana: "ステップ" },
            { en: "low", ja: "最低値", kana: "ロー" },
            { en: "information", ja: "情報", kana: "インフォメーション" },
            { en: "high", ja: "最高値", kana: "ハイ" },
            { en: "weather", ja: "天気", kana: "ウェザー" },
            { en: "online", ja: "ネットで、オンラインで", kana: "オンライン" },
            { en: "hard", ja: "激しく", kana: "ハード" },
            { en: "we'd", ja: "we wouldの短縮形", kana: "ウィド" },
            { en: "sign up", ja: "申し込む", kana: "サイン アップ" },
            { en: "~, don't you?", ja: "（あなたは）～ですよね?", kana: "ドント ユー" },
            { en: "degree", ja: "摂氏～度（℃）", kana: "ディグリー" },
            { en: "video clip", ja: "動画", kana: "ビデオ クリップ" },
          ],
        },
        u1p2: {
          label: "Unit1 Talent Show Part2",
          words: [
            { en: "be going to ~", ja: "～するつもり", kana: "ビー ゴーイング トゥ" },
            { en: "partner", ja: "パートナー、相棒", kana: "パートナー" },
            { en: "take part in ~", ja: "～に参加する", kana: "テイク パート イン" },
            { en: "skill", ja: "スキル、腕前", kana: "スキル" },
            { en: "end", ja: "終わり", kana: "エンド" },
            { en: "until", ja: "～まで（ずっと）", kana: "アンティル" },
            { en: "hand in ~", ja: "～を提出する", kana: "ハンド イン" },
            { en: "get a haircut", ja: "髪を切る", kana: "ゲット ア ヘアカット" },
          ],
        },
        u1p3: {
          label: "Unit1 Talent Show Part3",
          words: [
            { en: "introduce", ja: "～を紹介する", kana: "イントロデュース" },
            { en: "history", ja: "歴史", kana: "ヒストリー" },
            { en: "health", ja: "健康", kana: "ヘルス" },
            { en: "recipe", ja: "レシピ、調理法", kana: "レシピ" },
          ],
        },
        u1rt: {
          label: "Unit1 Talent Show R&T・T&S",
          words: [
            { en: "hear", ja: "～ということを耳にする、～だそうだ", kana: "ヒア" },
            { en: "meeting", ja: "ミーティング、会議", kana: "ミーティング" },
            { en: "through", ja: "～を通して、～によって", kana: "スルー" },
            { en: "in total", ja: "総計で", kana: "イン トータル" },
            { en: "be ready to ~", ja: "～する準備が整う", kana: "ビー レディ トゥ" },
            { en: "look forward to ~", ja: "～を楽しみにする", kana: "ルック フォワード トゥ" },
            { en: "each other", ja: "お互い", kana: "イーチ アザー" },
            { en: "be able to ~", ja: "～できる", kana: "ビー エイブル トゥ" },
            { en: "for the first time", ja: "初めて", kana: "フォー ザ ファースト タイム" },
            { en: "plan", ja: "～を計画する", kana: "プラン" },
            { en: "perform", ja: "演ずる、披露する", kana: "パフォーム" },
            { en: "title", ja: "題、演目", kana: "タイトル" },
            { en: "thousand", ja: "千（の）", kana: "サウザンド" },
            { en: "success", ja: "成功", kana: "サクセス" },
            { en: "behind", ja: "～の後ろに", kana: "ビハインド" },
            { en: "study", ja: "勉強", kana: "スタディ" },
            { en: "stage", ja: "舞台、ステージ", kana: "ステージ" },
            { en: "president", ja: "（クラスなどの）総代", kana: "プレジデント" },
            { en: "Miller", ja: "ミラー[人の姓]", kana: "ミラー" },
            { en: "JHS", ja: "Junior High Schoolの略", kana: "ジェイ エイチ エス" },
            { en: "interview", ja: "インタビュー", kana: "インタビュー" },
            { en: "HS", ja: "High Schoolの略", kana: "エイチ エス" },
            { en: "we'll", ja: "we willの短縮形", kana: "ウィル" },
            { en: "end A with B", ja: "AをBとともに終える", kana: "エンド エー ウィズ ビー" },
            { en: "decide", ja: "～を決める", kana: "ディサイド" },
            { en: "suggest", ja: "～を提案する", kana: "サジェスト" },
            { en: "participant", ja: "参加者", kana: "パーティシパント" },
            { en: "audience", ja: "聴衆、観客", kana: "オーディエンス" },
            { en: "they'll", ja: "they willの短縮形", kana: "ゼイル" },
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
            { en: "do-did-done", ja: "〜をする[原形-過去形-過去分詞形]", kana: "ドゥー・ディド・ダン" },
            { en: "come-came-come", ja: "来る[原形-過去形-過去分詞形]", kana: "カム・ケイム・カム" },
            { en: "just", ja: "ちょうど", kana: "ジャスト" },
            { en: "I've", ja: "I haveの短縮形", kana: "アイブ" },
            { en: "haven't", ja: "have notの短縮形", kana: "ハブント" },
            { en: "hasn't", ja: "has notの短縮形", kana: "ハズント" },
            { en: "trick", ja: "〜をだます", kana: "トリック" },
            { en: "pack", ja: "〜を荷造りする", kana: "パック" },
            { en: "we've", ja: "we haveの短縮形", kana: "ウィーブ" },
            { en: "closely", ja: "じっくりと", kana: "クロースリー" },
            { en: "from now on", ja: "これからずっと、今後は", kana: "フロム ナウ オン" },
            { en: "next time", ja: "次回(に)", kana: "ネクスト タイム" },
            { en: "all of 〜", ja: "〜のすべて", kana: "オール オブ" },
            { en: "take-took-taken", ja: "持っていく[原形-過去形-過去分詞形]", kana: "テイク・トゥック・テイクン" },
            { en: "become-became-become", ja: "〜になる[原形-過去形-過去分詞形]", kana: "ビカム・ビケイム・ビカム" },
            { en: "yet", ja: "[疑問文で]もう", kana: "イェット" },
            { en: "clear", ja: "〜を片づける", kana: "クリア" },
            { en: "mirror", ja: "鏡", kana: "ミラー" },
            { en: "isn't 〜?", ja: "〜ではないですか。", kana: "イズント" },
            { en: "have a haircut", ja: "髪を切る", kana: "ハブ ア ヘアカット" },
          ],
        },
        r2: {
          label: "Trick Your Eyes Part3",
          words: [
            { en: "been", ja: "[beの過去分詞形]", kana: "ビーン" },
            { en: "ever", ja: "今までに", kana: "エバー" },
            { en: "never", ja: "1度も〜したことがない", kana: "ネバー" },
            { en: "How many times 〜?", ja: "何回〜ですか。", kana: "ハウ メニー タイムズ" },
            { en: "ride-rode-ridden", ja: "乗る[原形-過去形-過去分詞形]", kana: "ライド・ロード・リドゥン" },
            { en: "swim-swam-swum", ja: "泳ぐ[原形-過去形-過去分詞形]", kana: "スイム・スワム・スワム" },
            { en: "sleep-slept", ja: "眠る[原形-過去形]", kana: "スリープ・スレプト" },
            { en: "go-went-gone", ja: "行く[原形-過去形-過去分詞形]", kana: "ゴー・ウェント・ゴーン" },
            { en: "celebrity", ja: "有名人", kana: "セレブリティ" },
            { en: "tent", ja: "テント", kana: "テント" },
            { en: "surfing", ja: "サーフィン", kana: "サーフィン" },
            { en: "must", ja: "〜に違いない", kana: "マスト" },
            { en: "take a look", ja: "見てみる", kana: "テイク ア ルック" },
            { en: "hear of 〜", ja: "〜のことを聞く", kana: "ヒア オブ" },
          ],
        },
        r3: {
          label: "Trick Your Eyes 本文",
          words: [
            { en: "3-D Art Museum", ja: "3Dアート美術館", kana: "スリーディー アート ミュージアム" },
            { en: "get here", ja: "ここに着く", kana: "ゲット ヒア" },
            { en: "entrance hall", ja: "玄関ホール", kana: "エントランス ホール" },
            { en: "reflect", ja: "〜を映す、反射する", kana: "リフレクト" },
            { en: "painful", ja: "痛い", kana: "ペインフル" },
            { en: "become crazy about 〜", ja: "〜に夢中になる", kana: "ビカム クレイジー アバウト" },
            { en: "trompe l'oeil", ja: "トロンプ・ルイユ", kana: "トロンプ ルイユ" },
            { en: "optical illusion", ja: "だまし絵", kana: "オプティカル イリュージョン" },
          ],
        },
        r4: {
          label: "Trick Your Eyes R&T・T&S",
          words: [
            { en: "century", ja: "世紀", kana: "センチュリー" },
            { en: "possible", ja: "可能な", kana: "ポッシブル" },
            { en: "someone", ja: "だれか", kana: "サムワン" },
            { en: "compose", ja: "〜を組み立てる、構成する", kana: "コンポーズ" },
            { en: "print", ja: "版画", kana: "プリント" },
            { en: "Pozzo", ja: "ポッツ[人の姓]", kana: "ポッツォ" },
            { en: "portrait", ja: "肖像画", kana: "ポートレート" },
            { en: "lady", ja: "婦人", kana: "レディ" },
            { en: "dome", ja: "ドーム", kana: "ドーム" },
            { en: "church", ja: "教会", kana: "チャーチ" },
            { en: "ceiling", ja: "天井", kana: "シーリング" },
            { en: "Arcimboldo", ja: "アルチンボルド[人の姓]", kana: "アルチンボルド" },
            { en: "Spanish", ja: "スペイン(人)の", kana: "スパニッシュ" },
            { en: "flat", ja: "平らな", kana: "フラット" },
            { en: "turn A upside down", ja: "Aを上下さかさまにする", kana: "ターン エー アップサイド ダウン" },
            { en: "usage", ja: "使い方", kana: "ユーセージ" },
            { en: "sculpture", ja: "彫刻", kana: "スカルプチャー" },
            { en: "painter", ja: "画家", kana: "ペインター" },
            { en: "pond", ja: "池", kana: "ポンド" },
            { en: "photograph", ja: "写真", kana: "フォトグラフ" },
            { en: "French", ja: "フランス(人)の", kana: "フレンチ" },
          ],
        },
        r5: {
          label: "Passing Down Memories Part1・2",
          words: [
            { en: "since", ja: "〜からずっと、〜して以来", kana: "シンス" },
            { en: "known", ja: "〜を知っている[knowの過去分詞形]", kana: "ノウン" },
            { en: "pass away", ja: "亡くなる", kana: "パス アウェイ" },
            { en: "more and more 〜", ja: "ますます〜に", kana: "モア アンド モア" },
            { en: "kill", ja: "〜を殺す", kana: "キル" },
            { en: "injure", ja: "〜を傷つける", kana: "インジャー" },
            { en: "ground", ja: "地面", kana: "グラウンド" },
            { en: "most", ja: "大多数(の)", kana: "モースト" },
            { en: "lately", ja: "最近、この頃", kana: "レイトリー" },
            { en: "itself", ja: "それ自身", kana: "イットセルフ" },
            { en: "suffer from 〜", ja: "〜で苦しむ", kana: "サファー フロム" },
            { en: "pass down 〜", ja: "〜を(次の世代へ)渡す", kana: "パス ダウン" },
            { en: "move to 〜", ja: "〜へ引っ越す", kana: "ムーブ トゥ" },
            { en: "be into 〜", ja: "〜に熱中する", kana: "ビー イントゥ" },
            { en: "move", ja: "〜を感動させる", kana: "ムーブ" },
            { en: "before 〜ing", ja: "〜をする前に", kana: "ビフォー" },
            { en: "survive", ja: "〜を切り抜けて生き残る", kana: "サバイブ" },
            { en: "blow-blew-blown", ja: "吹き飛ばす[原形-過去形-過去分詞形]", kana: "ブロー・ブルー・ブローン" },
            { en: "volunteer", ja: "ボランティア活動", kana: "ボランティア" },
            { en: "〜 or so", ja: "〜かそこら", kana: "オア ソー" },
            { en: "the following 〜", ja: "次の〜", kana: "ザ フォローイング" },
          ],
        },
        r6: {
          label: "Passing Down Memories Part3",
          words: [
            { en: "collect", ja: "〜を集める", kana: "コレクト" },
            { en: "would", ja: "[willの過去形]", kana: "ウッド" },
            { en: "over there", ja: "向こうに", kana: "オーバー ゼア" },
            { en: "be affected by 〜", ja: "〜の影響を受ける", kana: "ビー アフェクテッド バイ" },
            { en: "keep", ja: "〜を保存する", kana: "キープ" },
            { en: "recovery", ja: "回復", kana: "リカバリー" },
            { en: "injury", ja: "けが", kana: "インジャリー" },
            { en: "half", ja: "30分", kana: "ハーフ" },
            { en: "figure", ja: "人物の像", kana: "フィギュア" },
            { en: "case", ja: "箱、ケース", kana: "ケース" },
            { en: "apparent", ja: "明白な", kana: "アパレント" },
            { en: "thousands of 〜", ja: "何千もの〜", kana: "サウザンズ オブ" },
            { en: "model A after B", ja: "BをモデルとしてAをつくる", kana: "モデル エー アフター ビー" },
            { en: "Good luck.", ja: "幸運を。", kana: "グッド ラック" },
            { en: "die from 〜", ja: "〜(が原因)で死ぬ", kana: "ダイ フロム" },
          ],
        },
        r7: {
          label: "Passing Down Memories 本文",
          words: [
            { en: "explode", ja: "爆発する", kana: "エクスプロード" },
            { en: "structure", ja: "建物", kana: "ストラクチャー" },
            { en: "survivor", ja: "生存者", kana: "サバイバー" },
            { en: "southeast", ja: "南東(の)", kana: "サウスイースト" },
            { en: "power", ja: "力", kana: "パワー" },
            { en: "destruction", ja: "破壊", kana: "デストラクション" },
            { en: "Brazil", ja: "ブラジル[国名]", kana: "ブラジル" },
            { en: "aftereffect", ja: "後遺症", kana: "アフターエフェクト" },
            { en: "silent", ja: "無言の", kana: "サイレント" },
            { en: "permanent", ja: "永久の", kana: "パーマネント" },
            { en: "memorial", ja: "記念の", kana: "メモリアル" },
            { en: "destructive", ja: "破壊的な", kana: "デストラクティブ" },
            { en: "complete", ja: "完全な", kana: "コンプリート" },
            { en: "instantly", ja: "一瞬にして", kana: "インスタントリー" },
            { en: "enormously", ja: "非常に", kana: "イノーマスリー" },
            { en: "around", ja: "約〜、およそ〜", kana: "アラウンド" },
            { en: "be dropped on 〜", ja: "〜に投下される", kana: "ビー ドロップト オン" },
            { en: "Atomic Bomb Dome", ja: "原爆ドーム", kana: "アトミック ボム ドーム" },
            { en: "transplant", ja: "〜を植え替える", kana: "トランスプラント" },
            { en: "tragedy", ja: "悲劇", kana: "トラジェディ" },
            { en: "bud", ja: "芽", kana: "バッド" },
            { en: "bombing", ja: "爆撃", kana: "ボミング" },
            { en: "postwar", ja: "戦後の", kana: "ポストウォー" },
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
      return { en: w.en, ja: w.ja, kana: w.kana, gradeId: gradeId, setId: setId };
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
        word: { gradeId: w.gradeId, setId: w.setId, en: w.en, ja: w.ja, kana: w.kana },
      };
      // 問題文が英語のとき（英語→意味）は、その読みを問題側の補助として持たせる
      if (keyQ === "en" && w.kana) q.questionKana = w.kana;
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
            kana: w.kana,
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
