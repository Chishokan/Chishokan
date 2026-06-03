/**
 * config.js
 * アプリの設定値。ここだけ書き換えれば送信先などを変更できます。
 */
(function (global) {
  "use strict";

  global.AppConfig = {
    // 学習記録の送信先（Google Apps Script の Web App URL）。
    // Apps Script を「ウェブアプリ」としてデプロイし、発行された
    // 「https://script.google.com/macros/s/........./exec」をここに貼り付けてください。
    // （未設定のままだと送信ボタンは「送信先が未設定です」と表示します）
    SHEET_ENDPOINT: "",
  };
})(window);
