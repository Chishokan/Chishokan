# 自社ドメインへの埋め込み（エックスサーバー）

GASのWebアプリを自社ドメインのページに **iframe で埋め込み**、アドレスバーに
自社ドメインを表示したまま面談予約フォームを表示するための一式です。

> GAS側は `コード.js` の `doGet` で `setXFrameOptionsMode(ALLOWALL)` を設定済みのため、
> フレーム埋め込みが許可されています（追加のコード変更は不要）。

## 手順

### 1. GASのWebアプリ exec URL を用意する
- 既存の本番デプロイURL、または `clasp create-deployment` で発行した新URLを使う。
- 形式：`https://script.google.com/macros/s/<デプロイID>/exec`

### 2. `index.html` の src を差し替える
- `index.html` 内の `__GAS_WEBAPP_EXEC_URL__` を、上記 exec URL に置き換える。
- 管理画面を埋め込む場合は末尾に `?admin=1` を付ける。

### 3. エックスサーバーに設置する
1. サーバーパネル → **サブドメイン設定** で例 `yoyaku` を追加（例：`yoyaku.example.jp`）。
   - 反映に数分〜数十分かかる場合あり。SSL（無料独自SSL）も有効化しておく。
2. ファイルマネージャまたはFTPで、対象サブドメインの公開フォルダ
   （例：`/example.jp/public_html/yoyaku/`）に `index.html` をアップロード。
3. ブラウザで `https://yoyaku.example.jp/` を開き、予約フォームが表示されることを確認。

## 注意点
- iframe 内のGASアプリは別ドメイン（script.google.com）で動くため、ブラウザの
  サードパーティ Cookie 制限の影響を受けることがある。本アプリはログイン不要
  （`ANYONE_ANONYMOUS`）のため通常は問題ないが、まれにスマホの一部ブラウザで
  表示・操作に不具合が出た場合は、入口リンクを exec URL 直リンク（転送方式）に
  切り替える運用も検討する。
- スマホでアドレスバーの増減により高さが変わるため、`height:100%` + `position:fixed`
  で全画面表示にしている。
