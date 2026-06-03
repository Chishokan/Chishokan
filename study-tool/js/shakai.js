/**
 * shakai.js
 * 社会（地理・歴史・公民）の小テスト。単元 → 項目の階層で一問一答を内蔵し、
 * 4択 / 8択 の問題を生成する。問題文（q）→ 答え（a）形式。
 *
 * ★誤答選択肢について（理科と同じ仕組み）
 *   各問題は任意で d:[...]（その問題で「間違いやすい」誤答候補のプール）を持てる。
 *   出題時はまず d からランダムに選び、足りない分だけ同項目→同単元→全体の
 *   実在の答えで補う。d が無い問題は、同項目などの他の答えから自動で誤答を作る。
 *
 *   データは社会_一問一答スプレッドシートから取り込み（学年=単元, 範囲=項目, 問題, 答え, 誤答候補）。
 */
(function (global) {
  "use strict";

  /* AUTO-GENERATED:shakai — data/shakai_source.csv から tools/build-data.js が生成。ここを直接編集せず CSV を編集して取り込む */
  var GRADES = {
    goiw0at: {
      label: "地理１ 世界と日本の姿",
      sets: {
        srxxu2j: {
          label: "地球の姿",
          items: [
            { q: "アジア州とヨーロッパ州がふくまれる、面積が世界最大の大陸を何というか。", a: "ユーラシア大陸", d: ["アフリカ大陸", "北アメリカ大陸", "南アメリカ大陸", "オーストラリア大陸"] },
            { q: "面積が世界最小の大陸を何というか。", a: "オーストラリア大陸", d: ["南極大陸", "ユーラシア大陸", "アフリカ大陸", "南アメリカ大陸"] },
            { q: "世界最大の海洋を何というか。", a: "太平洋", d: ["大西洋", "インド洋", "北極海", "地中海"] },
            { q: "オーストラリア大陸とその周辺の島々を合わせた州を何というか。", a: "オセアニア州", d: ["アジア州", "アフリカ州", "ヨーロッパ州", "南アメリカ州"] },
            { q: "国土が海に面していない国を何というか。", a: "内陸国", d: ["島国", "沿岸国", "半島国", "連邦国"] },
            { q: "地球を南北にそれぞれ90度ずつに分けたものを何というか。", a: "緯度", d: ["経度", "緯線", "経線", "赤道"] },
            { q: "緯度を示す線を何というか。", a: "緯線", d: ["経線", "緯度", "経度", "本初子午線"] },
            { q: "緯度が0度である線を特に何というか。", a: "赤道", d: ["本初子午線", "日付変更線", "北回帰線", "南回帰線"] },
            { q: "ロンドンを通る線を0度として、地球を東西にそれぞれ180度ずつに分けたものを何というか。", a: "経度", d: ["緯度", "経線", "緯線", "標準時子午線"] },
            { q: "経度を示す、北極点と南極点を結ぶ線を何というか。", a: "経線", d: ["緯線", "経度", "緯度", "赤道"] },
            { q: "経度が0度である線を特に何というか。", a: "本初子午線", d: ["赤道", "日付変更線", "標準時子午線", "東経135度"] },
            { q: "地球上のある地点から、地球の中心を通った反対側の地点を何というか。", a: "対せき点", d: ["対極点", "反対点", "対称点", "中心点"] },
            { q: "地球上の面積・距離・方位・角度・陸地の形などのすべてをほぼ正確に表現できる、地球を縮めた模型を何というか。", a: "地球儀", d: ["世界地図", "地形図", "メルカトル図法", "平面地図"] },
            { q: "緯線と経線が直角に交わる地図は、何図法でえがかれたものか。", a: "メルカトル図法", d: ["モルワイデ図法", "正距方位図法", "グード図法", "サンソン図法"] },
            { q: "面積が正しい地図は、何図法でえがかれたものか。", a: "モルワイデ図法", d: ["メルカトル図法", "正距方位図法", "グード図法", "ボンヌ図法"] },
            { q: "中心からの各地への距離と方位が正しい地図は、何図法でえがかれたものか。", a: "正距方位図法", d: ["メルカトル図法", "モルワイデ図法", "グード図法", "サンソン図法"] },
          ],
        },
        stqu6bz: {
          label: "日本の姿",
          items: [
            { q: "兵庫県明石市を通る日本の標準時子午線の経度は東経何度か。", a: "東経135度", d: ["東経140度", "東経130度", "東経150度", "東経120度"] },
            { q: "世界の国々が、それぞれ基準になる経線に合わせて決めた時刻を何というか。", a: "標準時", d: ["時差", "グリニッジ標準時", "協定世界時", "地方時"] },
            { q: "地域による標準時の差を何というか。", a: "時差", d: ["標準時", "時間帯", "経度差", "日付変更線"] },
            { q: "180度の経線にほぼ沿って引かれている、地球上の1日の始まりと終わりを示す線を何というか。", a: "日付変更線", d: ["本初子午線", "赤道", "標準時子午線", "経度0度線"] },
            { q: "その国の主権がおよぶ範囲の陸地を何というか。", a: "領土", d: ["領海", "領空", "排他的経済水域", "公海"] },
            { q: "領土の沿岸から一定の周囲にあり、その国の主権がおよぶ範囲の海を何というか。", a: "領海", d: ["領土", "領空", "排他的経済水域", "公海"] },
            { q: "領土と領海の上空にあたる、その国の主権がおよぶ範囲の空を何というか。", a: "領空", d: ["領土", "領海", "排他的経済水域", "宇宙空間"] },
            { q: "領海の外側に設定され、沿岸国に水産資源や鉱産資源の領有権が認められる範囲の海を何というか。", a: "排他的経済水域", d: ["領海", "公海", "領土", "領空"] },
            { q: "どの国も自由に船の航行や漁業ができる、排他的経済水域の外側の海を何というか。", a: "公海", d: ["領海", "排他的経済水域", "領空", "領土"] },
            { q: "千島列島にふくまれる、日本の最北端に位置する島を何というか。", a: "択捉島", d: ["南鳥島", "沖ノ鳥島", "与那国島", "歯舞群島"] },
            { q: "小笠原諸島の父島から約1300km東方にある、日本の最東端に位置する島を何というか。", a: "南鳥島", d: ["択捉島", "沖ノ鳥島", "与那国島", "父島"] },
            { q: "水没のおそれがあるために護岸工事が行われた、日本の最南端に位置するサンゴ礁の島を何というか。", a: "沖ノ鳥島", d: ["南鳥島", "択捉島", "与那国島", "沖縄島"] },
            { q: "南西諸島のうちの先島諸島にふくまれる、日本の最西端に位置する島を何というか。", a: "与那国島", d: ["沖ノ鳥島", "南鳥島", "択捉島", "石垣島"] },
            { q: "ロシアによる占拠が続いている、国後島、択捉島、歯舞群島、色丹島の島々は、合わせて何と呼ばれるか。", a: "北方領土", d: ["竹島", "尖閣諸島", "千島列島", "樺太"] },
            { q: "韓国が不法に占拠する、日本海の島を何というか。", a: "竹島", d: ["尖閣諸島", "北方領土", "隠岐諸島", "対馬"] },
            { q: "中国などが領有権を主張している、東シナ海の島々を何というか。", a: "尖閣諸島", d: ["竹島", "北方領土", "南西諸島", "与那国島"] },
            { q: "都道府県庁舎が置かれている都市を何というか。", a: "県庁所在地［都道府県庁所在地］", d: ["政令指定都市", "城下町", "中核市", "都道府県名"] },
            { q: "日本の７地方区分のうち、青森県や秋田県が属する地方を何というか。", a: "東北地方", d: ["北海道地方", "関東地方", "中部地方", "近畿地方"] },
          ],
        },
      },
    },
    gq6blkw: {
      label: "地理２ 人々の生活と環境",
      sets: {
        srx4ahq: {
          label: "世界の気候",
          items: [
            { q: "１年を通して気温が高い赤道周辺の地域の気候帯を何というか。", a: "熱帯", d: ["乾燥帯", "温帯", "亜寒帯(冷帯)", "寒帯"] },
            { q: "熱帯のうち、1年中高温多雨で密林が広がる地域の気候を何というか。", a: "熱帯雨林気候", d: ["サバナ気候", "砂漠気候", "ステップ気候", "温暖湿潤気候"] },
            { q: "１年を通して雨の少ない地域の気候帯を何というか。", a: "乾燥帯", d: ["熱帯", "温帯", "寒帯", "亜寒帯(冷帯)"] },
            { q: "乾燥帯のうち、雨の非常に少ない地域の気候を何というか。", a: "砂漠気候", d: ["ステップ気候", "サバナ気候", "熱帯雨林気候", "地中海性気候"] },
            { q: "はっきりとした四季の区別がみられる地域の気候帯を何というか。", a: "温帯", d: ["熱帯", "乾燥帯", "亜寒帯(冷帯)", "寒帯"] },
            { q: "温帯のうち、主に大陸の東側に分布する、夏に高温多雨となり、冬に低温となる気候を何というか。", a: "温暖湿潤気候", d: ["西岸海洋性気候", "地中海性気候", "熱帯雨林気候", "砂漠気候"] },
            { q: "温帯のうち、主に大陸の西側に分布する、高緯度のわりに冬が暖かく、１年を通して雨が降る気候を何というか。", a: "西岸海洋性気候", d: ["温暖湿潤気候", "地中海性気候", "亜寒帯気候", "ステップ気候"] },
            { q: "西岸海洋性気候に影響をあたえる、中緯度地域で西から東に向かって1年中吹く風を何というか。", a: "偏西風", d: ["季節風(モンスーン)", "貿易風", "偏東風", "北大西洋海流"] },
            { q: "温帯のうち、地中海沿岸などでみられる、夏に乾燥する気候を何というか。", a: "地中海性気候", d: ["西岸海洋性気候", "温暖湿潤気候", "ステップ気候", "サバナ気候"] },
            { q: "夏と冬の気温差が大きい地域の気候帯を何というか。", a: "亜寒帯［冷帯］", d: ["寒帯", "温帯", "熱帯", "乾燥帯"] },
            { q: "１年を通して気温が低い地域の気候帯を何というか。", a: "寒帯", d: ["亜寒帯(冷帯)", "温帯", "乾燥帯", "熱帯"] },
            { q: "気温が低く農作物が育ちにくい、赤道付近の標高が高い地域の気候を何というか。", a: "高山気候", d: ["寒帯", "亜寒帯(冷帯)", "ツンドラ気候", "氷雪気候"] },
          ],
        },
        srx1lni: {
          label: "世界の宗教",
          items: [
            { q: "紀元前後にイエスが説いた宗教は何か。", a: "キリスト教", d: ["イスラーム(イスラム教)", "仏教", "ヒンドゥー教", "ユダヤ教"] },
            { q: "７世紀にムハンマドが開いた宗教は何か。", a: "イスラーム（イスラム教）", d: ["キリスト教", "仏教", "ヒンドゥー教", "ユダヤ教"] },
            { q: "紀元前６～５世紀ごろ、シャカ(釈迦)によって開かれた宗教を何というか。", a: "仏教", d: ["キリスト教", "イスラーム(イスラム教)", "ヒンドゥー教", "儒教"] },
            { q: "インドの多くの国民が信仰する宗教を何というか。", a: "ヒンドゥー教", d: ["仏教", "イスラーム(イスラム教)", "キリスト教", "シク教"] },
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
      return { q: it.q, a: it.a, d: it.d || [], gradeId: gradeId, setId: setId };
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
        shakai: { gradeId: it.gradeId, setId: it.setId },
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
