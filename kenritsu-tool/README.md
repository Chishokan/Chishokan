# 県立中 確認テスト（kenritsu-tool）

県立中（県立中学校・適性検査対策）向けの **確認テストWebアプリ**。
**動画授業の内容を一問一答（4択・8択）で確認**するためのツールです。
ブラウザだけで動き、学習記録は各端末に保存されます。

> 同じリポジトリの `study-tool/`（智翔館 学習ドリル）のエンジンを再利用して作った別プロダクトです。
> 見た目・配布URL・保存データ（localStorage）は study-tool とは独立しています。

公開URL（GitHub Pages）：`https://chishokan.github.io/Chishokan/kenritsu-tool/`

## 現在の状態（テスト版）

- 科目：**理科 / 社会**（一問一答・4択／8択）。あとから科目を追加できる構成です。
- 出題形式：
  - **A 4択／8択**（知識確認の核）
  - **F 資料・図表つき**（問題文の上に「資料」枠＝補足テキストや画像を表示し、4択／8択で答える）
  - ※ 記述（自己採点・キーワード判定）は今回のテスト版には含めていません（次フェーズ候補）。
- 収録データは **動作確認用のサンプル**（理科5問／社会7問。うち社会2問が資料つきF）です。
  実データ（CSV／スプレッドシート）を受け取り次第、`data/rika_source.csv` /
  `data/shakai_source.csv` を差し替えてください。
- 資料画像は `assets/` に置きます（サンプルとして `assets/shingo-tate.svg`＝縦型信号機を同梱）。

## フォルダ構成

```
kenritsu-tool/
├─ index.html              保護者・生徒向け画面（メニュー → 設定 → 出題 → 結果 → 学習記録）
├─ css/style.css           スタイル（study-tool から流用・配色のみ変更）
├─ js/
│  ├─ storage.js           学習記録・バックアップ（保存キーは chishokan-kenritsu:* に分離）
│  ├─ app.js               画面遷移と出題フロー（共通エンジン）
│  ├─ rika.js              理科モジュール（単元→項目の一問一答。データは CSV から自動生成）
│  └─ shakai.js            社会モジュール（同上）
├─ assets/                 資料画像（例 shingo-tate.svg＝縦型信号機）
├─ data/
│  ├─ rika_source.csv      理科の正本CSV（単元, 項目, 問題, 答え, 誤答候補 ＋任意で 資料テキスト, 資料画像）
│  ├─ shakai_source.csv    社会の正本CSV
│  └─ README.md            データ運用の説明
└─ tools/build-data.js     CSV → js/*.js の AUTO-GENERATED ブロックを生成
```

## コンテンツの作り方・反映

正本は `data/*_source.csv`。スプレッドシートで編集 → CSV書き出し → 上書きコミットすると、
GitHub Actions（`.github/workflows/build-data.yml`）が `js/rika.js`・`js/shakai.js` を
自動生成し直します。手元で確認するときは次を実行：

```bash
cd kenritsu-tool
node tools/build-data.js
```

詳しい列の形式・誤答候補の仕組み・科目追加の手順は [`data/README.md`](data/README.md) を参照。

## 県立中アプリとしての今後（メモ）

適性検査は記述・資料読み取り・作文などが中心のため、本ツールはまず
「知識の一問一答（4択／8択）」のMVPです。記述（日本語採点）・資料/図表対応は次フェーズ。
方針の詳細は [`docs/kenritsu-app-handoff.md`](../docs/kenritsu-app-handoff.md) を参照。

## キャッシュ対策

`index.html` の CSS/JS は `?v=N` でバージョン管理しています。データ・コードを更新したら
`N` を上げると、利用者の端末で確実に再読み込みされます（現在 `v=2`）。
