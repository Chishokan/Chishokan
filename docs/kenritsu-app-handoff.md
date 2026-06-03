# 県立中アプリ 開発引き継ぎメモ（新セッション用）

このメモは、**県立中（県立中学校・適性検査）向けの新しいテストアプリ**を、新しい Claude Code セッションでゼロから立ち上げるための引き継ぎ資料です。
既存の `study-tool/`（智翔館 学習ドリル）の設計・資産を再利用して、効率よく作ることを想定しています。

> 決定済みの方針（このメモの前提）
> - **同じリポジトリ `chishokan/chishokan` の別フォルダ**に作る（既存パターン：`study-tool/`・`interview-booking/` と並べる）
> - **同じ塾だが別プロダクト／別ブランド**として扱う（見た目・配布URL・保存データは独立させる）

---

## 0. 最初にやること（新セッションのキックオフ）

新セッションを開き、最初に次の趣旨を伝えるとスムーズです（コピペ用は末尾「付録A」）。

1. このメモ `docs/kenritsu-app-handoff.md` を読む
2. `study-tool/` の構造（特に `js/app.js`・`js/shakai.js`・`tools/build-data.js`・`data/README.md`）を読む
3. 新フォルダ（例 `kenritsu-tool/`）に study-tool のエンジンを**コピーして**ブランド調整し、コンテンツを差し替える

---

## 1. 推奨フォルダ構成

```
chishokan/                      ← リポジトリ直下（モノレポ）
├─ study-tool/                  ← 既存（智翔館 学習ドリル）
├─ interview-booking/           ← 既存
└─ kenritsu-tool/               ← ★新規（名前は自由。例：kenritsu / kenritsu-drill）
   ├─ index.html
   ├─ css/style.css
   ├─ js/
   │  ├─ storage.js   ← study-tool からコピー＋保存キーを変更（後述2-D）
   │  ├─ app.js       ← 共通の出題フロー（ほぼ流用）
   │  ├─ <subject>.js ← 科目モジュール（shakai.js を雛形に）
   │  └─ calc.js 等   ← 必要なら流用
   ├─ data/
   │  ├─ <subject>_source.csv  ← 正本CSV（スプレッドシート書き出し）
   │  └─ README.md
   └─ tools/build-data.js      ← study-tool のものを科目に合わせて流用
```

公開URL（GitHub Pages）は `https://chishokan.github.io/Chishokan/kenritsu-tool/` のようになります（study-tool と並ぶ別ページ）。

---

## 2. 再利用できる資産（study-tool の仕組み）

科目に依存しない共通基盤がそろっているので、**フォルダごとコピー → コンテンツ差し替え**が基本戦略です。

### A. 出題エンジンの共通インターフェース
各科目モジュール（`vocab.js` / `rika.js` / `shakai.js` / `calc.js`）は **同じ形の問題セット**を返します。`app.js` はこの形だけを知っていれば動きます。

```js
build(...) → {
  questions: [
    {
      question: "問題文",
      answer:   "正解",
      // 選択式のとき
      choices: ["...", "...", "正解", "..."],
      accepts: "choice",        // "choice" | "number" | "text"
      // モード固有のタグ（任意）
    },
    ...
  ],
  meta: {
    mode:    "shakai",          // モード名（記録の分類に使う）
    groupId: "shakai:g:set:fmt",// 学習記録のキー（ユニークに）
    label:   "社会 / ... / 4択", // 画面・記録の表示名
    // build に渡した設定（retry 用）
  }
}
```

- `accepts: "choice"` … 選択肢ボタン。`choices` に正解を含める。
- `accepts: "number"` … 数値入力（計算ドリル）。
- `accepts: "text"` … 文字入力。**記述採点は `app.js` の `normalizeText` が英数字以外を除去**するので、日本語の記述採点には向かない（後述「県立中の注意」）。

### B. app.js（画面遷移と出題フロー）
- `show(viewId)` で画面切替、`startSession(set)` → `renderQuestion()` → `submitAnswer()` → `finishSession()`。
- セットアップ画面の「学年/範囲」チップは `build◯◯GradeOptions` / `build◯◯SetOptions` で動的生成。
- 新モジュールを足す手順は **`rika`→`shakai` を追加したときと同じ**：メニューカード／設定セクション／`start◯◯`／`retry` 分岐／`init` 配線／`show()` の stopTimer 一覧。

### C. 誤答候補（間違いやすい選択肢）の仕組み — そのまま使える
`rika.js` / `shakai.js` の `collectDistractors()`：**問題ごとの誤答候補 `d` → 同項目 → 同単元 → 全体**の優先順で選択肢を構成。CSV の `誤答候補` 列（`;` 区切り）に書いた語が優先採用されます。

### D. storage.js（記録・バックアップ）★要変更
記録は localStorage に保存。**GitHub Pages は同一オリジン**なので、別ブランドでも放置すると study-tool と保存が混ざります。**新アプリでは保存キーとバックアップ識別子を必ず変更**してください。

```js
// study-tool の値（コピー後に必ず変える）
var KEY        = "chishokan-study-tool:v1";
var MKEY       = "chishokan-study-tool:mistakes:v1";
var BACKUP_APP = "chishokan-study-tool";
// ↓ 例：県立中アプリ
var KEY        = "chishokan-kenritsu:v1";
var MKEY       = "chishokan-kenritsu:mistakes:v1";
var BACKUP_APP = "chishokan-kenritsu";
```

- 記録のベストスコア・履歴、JSONエクスポート/インポート（端末間 merge 統合）はそのまま使えます。
- 「マイ単語帳」は英単語専用機能（`en` キー依存）。県立中で不要なら外す、必要なら一般化する。

### E. データパイプライン（スプレッドシート → CSV → js 自動反映）
- 正本は `data/◯◯_source.csv`（5列：`学年, 範囲, 問題, 答え, 誤答候補`）。
- `tools/build-data.js` が CSV を読み、`js/◯◯.js` の `/* AUTO-GENERATED:name */ … /* /AUTO-GENERATED:name */` ブロックを生成。
  - **学年ID・範囲IDはラベル一致で引き継ぐ**ので、記録キー（groupId）が安定。
- `.github/workflows/build-data.yml` が `*_source.csv` の push で自動ビルド＆コミット。
  → **新フォルダの source CSV も paths に追加**すること（例 `study-tool/...` と並べて `kenritsu-tool/data/◯◯_source.csv`）。build-data.js は新フォルダ用に複製 or ROOT を切り替え。
- xlsx は `python3`（zipfile + 標準ライブラリ）でCSV化できる（openpyxl不要）。`libreoffice` も利用可。

### F. キャッシュ対策
`index.html` の CSS/JS は `?v=N` でバージョン管理。**データ更新時は N を上げる**と確実に再読み込みされる。

---

## 3. 県立中アプリ特有の検討事項（設計判断）

県立中の適性検査は、知識の一問一答だけでなく **資料読み取り・記述・作文・思考問題**が中心です。最初に「何を出題形式にするか」を決めるのが重要。

- **一問一答（4択/8択）で足りる範囲**（用語・知識確認）→ 既存エンジンをそのまま流用、最速。
- **記述（短答・日本語）**を入れる場合 → `app.js` の `normalizeText` は日本語を消してしまうので、**日本語対応の採点関数**（空白・記号だけ除去し、かな/漢字は残す。必要なら別解リスト `accepts:"jtext"`）を新設する。
- **資料・図表・長文**を伴う問題 → 問題に画像/補足テキストを持たせる拡張（`question` に加えて `passage` / `image` フィールド、`renderQuestion` で表示）を検討。
- **作文・記述添削**はこのドリル方式とは別物。やるなら別画面・別設計（スコープを切る）。

> まずは「知識の一問一答（4択）」でMVPを作り、データを `◯◯_source.csv` に集める運用を回すのが現実的。記述・資料対応は次フェーズ。

---

## 4. 立ち上げチェックリスト

- [ ] 新ブランチを作成（例 `claude/kenritsu-tool-init`）
- [ ] `kenritsu-tool/` を作成し、`study-tool/` から `index.html` / `css/style.css` / `js/{storage,app}.js` / `tools/build-data.js` をコピー
- [ ] ブランド調整：タイトル・ヘッダー・メニュー文言・配色（必要なら）
- [ ] **storage.js の保存キー3つを新namespaceに変更**（2-D）
- [ ] 科目モジュールを `shakai.js` を雛形に作成（単元→項目→一問一答＋誤答候補）
- [ ] `data/◯◯_source.csv` を用意（スプレッドシート書き出し／提供xlsxをCSV化）
- [ ] `tools/build-data.js` を新フォルダ用に調整して実行 → js 生成
- [ ] `app.js` にメニュー/設定/start/retry/init を配線（rika→shakai 追加と同じ手順）
- [ ] `?v=1` から開始、記録バックアップの `BACKUP_APP` 変更を確認
- [ ] GitHub Actions の `paths` に新 source CSV を追加（自動ビルド対象に）
- [ ] 生成テスト（全組合せで「正解が選択肢に含まれる／重複なし」）でエラー0を確認
- [ ] README（`kenritsu-tool/data/README.md`）整備

---

## 5. 注意・落とし穴

- **localStorage は同一オリジン共有**：保存キーを必ず分ける（最重要）。
- **build-data.js の ROOT**：`path.resolve(__dirname, "..")` 前提。新フォルダ内に置けばそのフォルダ基準で動く。GitHub Actions のコマンドも新フォルダ向けに追加する。
- **誤答候補CSVの `;` 区切り**・UTF-8(BOM)・全セル `"` 囲みの形式を踏襲すると取り込みが安定。
- コミットメッセージにモデル識別子等は入れない（リポジトリ規約）。PRはユーザー明示時のみ。

---

## 付録A：新セッションへ貼る最初の指示（例）

```
県立中向けの新しいテストアプリを作ります。方針は docs/kenritsu-app-handoff.md の通りです。
まず docs/kenritsu-app-handoff.md と study-tool/（特に js/app.js, js/shakai.js,
tools/build-data.js, data/README.md）を読み、kenritsu-tool/ フォルダに
study-tool のエンジンをコピーしてブランド調整（保存キーの分離を含む）した
土台を用意してください。コンテンツ（問題データ）は別途CSV/スプレッドシートで渡します。
作業は新ブランチで行ってください。
```

## 付録B：study-tool の現状サマリ（参考）
- 機能：計算ドリル / 英単語（4択・8択・記述, 学年→Unit, 234語）/ 理科（4択・8択, 学年→分野, 380問・全問誤答候補）/ 社会（地理, 単元→項目, 50問・全問誤答候補）/ マイ単語帳 / 学習記録（ベスト・履歴, JSONバックアップ）。
- データ正本：`data/vocab_source.csv` `rika_source.csv` `shakai_source.csv` → `tools/build-data.js` → 各 `js/*.js` の AUTO-GENERATED ブロック。GitHub Actions で自動反映。
- 公開：`https://chishokan.github.io/Chishokan/study-tool/`
