/**
 * Code.gs — 智翔館 学習ドリル「データを送信」の受け口（Google Apps Script）
 *
 * 役割：アプリから送られてきた生徒の得点データを、
 *       「校舎ごとのシート」（駅前校 / 日宇校 / 大野校 / 日野校 …）に1行ずつ追記する。
 *       校舎名と同じ名前のシートが無ければ自動で作成する。
 *
 * 使い方（セットアップ）：
 *  1. 記録用の Google スプレッドシートを開く（新規でOK）。
 *  2. 拡張機能 → Apps Script を開き、このコードを貼り付けて保存。
 *  3. 右上「デプロイ」→「新しいデプロイ」→種類「ウェブアプリ」。
 *       - 次のユーザーとして実行：自分
 *       - アクセスできるユーザー：全員
 *  4. 発行された「ウェブアプリ URL（…/exec）」を study-tool/js/config.js の
 *     SHEET_ENDPOINT に貼り付ける（既に設定済みなら不要）。
 *  5. アプリの「学習記録 → データを送信」から送ると、選んだ校舎のシートに追記される。
 *
 * ※ 既にこのスクリプトをデプロイ済みの場合は、内容を貼り替えて保存したあと
 *   「デプロイ → デプロイを管理 → 編集（鉛筆）→ バージョン：新バージョン → デプロイ」
 *   で更新してください（URL は変わりません）。
 */

var HEADERS = [
  "送信日時", "学年", "校舎", "名前",
  "テスト", "モード", "ベスト得点", "満点", "正答率(%)",
  "受験回数", "直近得点", "直近満点", "直近受験日",
];
var FALLBACK_SHEET = "未設定";

// 校舎名のシートを取得（無ければ作成し、見出し行を入れる）
function getCampusSheet(ss, campus) {
  var name = (campus && String(campus).trim()) ? String(campus).trim() : FALLBACK_SHEET;
  var sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.appendRow(HEADERS);
    sh.setFrozenRows(1);
  } else if (sh.getLastRow() === 0) {
    sh.appendRow(HEADERS);
    sh.setFrozenRows(1);
  }
  return sh;
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    var s = data.student || {};
    var sentAt = data.sentAt ? new Date(data.sentAt) : new Date();
    var rows = data.rows || [];

    // 校舎ごとのシートに振り分けて追記
    var sh = getCampusSheet(ss, s.campus);
    rows.forEach(function (r) {
      sh.appendRow([
        sentAt, s.grade || "", s.campus || "", s.name || "",
        r.test || "", r.mode || "", r.bestScore, r.bestTotal, r.bestRate,
        r.attempts, r.lastScore, r.lastTotal,
        r.lastAt ? new Date(r.lastAt) : "",
      ]);
    });

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true, sheet: sh.getName(), count: rows.length }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// 動作確認用（ブラウザで /exec を開くと表示される）
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, message: "智翔館 学習ドリル 受信エンドポイント稼働中（校舎別シート対応）" }))
    .setMimeType(ContentService.MimeType.JSON);
}
