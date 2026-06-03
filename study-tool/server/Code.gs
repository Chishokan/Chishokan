/**
 * Code.gs — 智翔館 学習ドリル「データを送信」の受け口（Google Apps Script）
 *
 * 役割：アプリから送られてきた生徒の得点データを、スプレッドシートに1行ずつ追記する。
 *
 * 使い方（セットアップ）：
 *  1. 記録用の Google スプレッドシートを開く（新規でOK）。
 *  2. 拡張機能 → Apps Script を開き、このコードを貼り付けて保存。
 *  3. 右上「デプロイ」→「新しいデプロイ」→種類「ウェブアプリ」。
 *       - 次のユーザーとして実行：自分
 *       - アクセスできるユーザー：全員
 *  4. 発行された「ウェブアプリ URL（…/exec）」をコピーし、
 *     study-tool/js/config.js の SHEET_ENDPOINT に貼り付ける。
 *  5. アプリの「学習記録 → データを送信」から送ると、シート「得点データ」に追記される。
 */

var SHEET_NAME = "得点データ";
var HEADERS = [
  "送信日時", "学年", "校舎", "名前",
  "テスト", "モード", "ベスト得点", "満点", "正答率(%)",
  "受験回数", "直近得点", "直近満点", "直近受験日",
];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sh.getLastRow() === 0) sh.appendRow(HEADERS);

    var s = data.student || {};
    var sentAt = data.sentAt ? new Date(data.sentAt) : new Date();
    var rows = data.rows || [];

    rows.forEach(function (r) {
      sh.appendRow([
        sentAt, s.grade || "", s.campus || "", s.name || "",
        r.test || "", r.mode || "", r.bestScore, r.bestTotal, r.bestRate,
        r.attempts, r.lastScore, r.lastTotal,
        r.lastAt ? new Date(r.lastAt) : "",
      ]);
    });

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true, count: rows.length }))
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
    .createTextOutput(JSON.stringify({ ok: true, message: "智翔館 学習ドリル 受信エンドポイント稼働中" }))
    .setMimeType(ContentService.MimeType.JSON);
}
