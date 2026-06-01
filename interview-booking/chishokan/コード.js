/**
 * 面談予約システム - Google Apps Script (GAS同居・動作確認版)
 *
 * URL末尾に ?admin=1 を付けると職員用管理画面が表示される
 *
 * 配置:
 * - コード.gs (このファイル)
 * - index.html (保護者用HTML)
 * - admin.html (職員用HTML)
 */

// ========== 校舎マスタ ==========
const SCHOOLS = [
  { id: 'sasebo',  name: '佐世保駅前校' },
  { id: 'hino',    name: '日野校' },
  { id: 'ono',     name: '大野校' },
  { id: 'hiu',     name: '日宇校' },
];

function slotsSheetName(school) { return school.name + '予約枠'; }
function bookingsSheetName(school) { return school.name + '予約データ'; }
function findSchoolById(id) { return SCHOOLS.find(s => s.id === id); }

// 列番号(1-indexed)
const COL = {
  ID: 1, DATE: 2, TIME: 3, CHILD: 4, PARENT: 5, EMAIL: 6,
  GRADE: 7, NOTE: 8, STATUS: 9, CREATED: 10, STAFF_NOTE: 11,
  REMINDER_SENT: 12,
};
const BOOKING_COL_COUNT = 12;

// 枠データ列(1-indexed)
const SLOT_COL = {
  DATE: 1, TIME: 2, LABEL: 3, PUBLISHED: 4, CAPACITY: 5,
};
const SLOT_COL_COUNT = 5;
const DEFAULT_CAPACITY = 1;

// rowデータを予約オブジェクトに変換するヘルパー
function rowToBooking(r, school) {
  return {
    id: r[0],
    schoolId: school.id,
    schoolName: school.name,
    date: formatDate(r[1]),
    time: formatTime(r[2]),
    childName: r[3],
    parentName: r[4],
    email: r[5],
    grade: r[6],
    note: r[7],
    status: r[8],
    createdAt: r[9] ? r[9].toString() : '',
    staffNote: r[10] || '',
    reminderSent: r[11] ? String(r[11]) : '',
  };
}

// ========== ウェブアプリのエントリーポイント ==========

function doGet(e) {
  const isAdmin = e && e.parameter && e.parameter.admin === '1';
  const htmlFile = isAdmin ? 'admin' : 'index';
  return HtmlService.createTemplateFromFile(htmlFile)
    .evaluate()
    .setTitle(isAdmin ? '面談予約 管理画面' : '面談予約')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// ========== google.script.run から呼ぶラッパー ==========

function getSchoolsForClient() {
  try { return { ok: true, schools: SCHOOLS }; }
  catch (err) { return { ok: false, error: String(err) }; }
}

function getSlotsForClient(schoolId) {
  try { return { ok: true, slots: getAvailableSlots(schoolId) }; }
  catch (err) { return { ok: false, error: String(err) }; }
}

function getMyBookingsForClient(email) {
  try { return { ok: true, bookings: getMyBookings(email) }; }
  catch (err) { return { ok: false, error: String(err) }; }
}

function createBookingForClient(payload) {
  try { return createBooking(payload); }
  catch (err) { return { ok: false, error: String(err) }; }
}

function updateBookingForClient(payload) {
  try { return updateBooking(payload); }
  catch (err) { return { ok: false, error: String(err) }; }
}

function cancelBookingForClient(payload) {
  try { return cancelBooking(payload); }
  catch (err) { return { ok: false, error: String(err) }; }
}

// 管理画面用
function admin_getAllSlotsForClient(schoolId) {
  try { return { ok: true, slots: getAllSlots(schoolId) }; }
  catch (err) { return { ok: false, error: String(err) }; }
}
function admin_getAllBookingsForClient(schoolId) {
  try { return { ok: true, bookings: getAllBookings(schoolId) }; }
  catch (err) { return { ok: false, error: String(err) }; }
}
function admin_addSlotsForClient(payload) {
  try { return adminAddSlots(payload); }
  catch (err) { return { ok: false, error: String(err) }; }
}
function admin_updateSlotForClient(payload) {
  try { return adminUpdateSlot(payload); }
  catch (err) { return { ok: false, error: String(err) }; }
}
function admin_bulkUpdateCapacityForClient(payload) {
  try { return adminBulkUpdateCapacity(payload); }
  catch (err) { return { ok: false, error: String(err) }; }
}
function admin_deleteSlotForClient(payload) {
  try { return adminDeleteSlot(payload); }
  catch (err) { return { ok: false, error: String(err) }; }
}
function admin_deleteSlotsForClient(payload) {
  try { return adminDeleteSlots(payload); }
  catch (err) { return { ok: false, error: String(err) }; }
}
function admin_cancelBookingForClient(payload) {
  try { return adminCancelBooking(payload); }
  catch (err) { return { ok: false, error: String(err) }; }
}

function admin_updateBookingForClient(payload) {
  try { return adminUpdateBooking(payload); }
  catch (err) { return { ok: false, error: String(err) }; }
}

// ========== 初期化 ==========

function 初期化() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const today = new Date();

  SCHOOLS.forEach(school => {
    let slots = ss.getSheetByName(slotsSheetName(school));
    if (!slots) slots = ss.insertSheet(slotsSheetName(school));
    slots.clear();
    slots.getRange(1, 1, 1, 5).setValues([['日付', '時刻', '枠ラベル(任意)', '公開(TRUE/FALSE)', '定員']]);
    slots.getRange(1, 1, 1, 5).setFontWeight('bold').setBackground('#e8f0fe');
    slots.setColumnWidth(1, 110);
    slots.setColumnWidth(2, 90);
    slots.setColumnWidth(3, 180);
    slots.setColumnWidth(4, 160);
    slots.setColumnWidth(5, 70);
    const sample = [];
    for (let i = 1; i <= 2; i++) {
      const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
      sample.push([d, '14:00', '', true, 1]);
      sample.push([d, '14:30', '', true, 1]);
    }
    slots.getRange(2, 1, sample.length, 5).setValues(sample);
    slots.getRange(2, 1, sample.length, 1).setNumberFormat('yyyy/mm/dd');
    slots.getRange(2, 2, sample.length, 1).setNumberFormat('hh:mm');

    let bookings = ss.getSheetByName(bookingsSheetName(school));
    if (!bookings) bookings = ss.insertSheet(bookingsSheetName(school));
    bookings.clear();
    bookings.getRange(1, 1, 1, 12).setValues([[
      '予約ID', '日付', '時刻', 'お子様名', '保護者名', 'メールアドレス', '学年', '相談内容', '状態', '予約日時', '職員メモ', 'リマインド送信済'
    ]]);
    bookings.getRange(1, 1, 1, 12).setFontWeight('bold').setBackground('#e8f0fe');
    bookings.setColumnWidth(1, 180);
    bookings.setColumnWidth(2, 100);
    bookings.setColumnWidth(3, 80);
    bookings.setColumnWidth(4, 120);
    bookings.setColumnWidth(5, 120);
    bookings.setColumnWidth(6, 200);
    bookings.setColumnWidth(7, 90);
    bookings.setColumnWidth(8, 280);
    bookings.setColumnWidth(9, 90);
    bookings.setColumnWidth(10, 150);
    bookings.setColumnWidth(11, 250);
    bookings.setColumnWidth(12, 150);
  });

  SpreadsheetApp.getUi().alert(
    '初期化が完了しました。\n\n' +
    '以下のシートが作成されました:\n' +
    SCHOOLS.map(s => '・' + slotsSheetName(s) + '\n・' + bookingsSheetName(s)).join('\n')
  );
}

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('面談予約システム')
    .addItem('初期化(初回のみ)', '初期化')
    .addItem('職員メモ列を追加(既存シートの更新)', '職員メモ列を追加')
    .addItem('定員列を追加(既存シートの更新)', '定員列を追加')
    .addItem('リマインド送信済列を追加(既存シートの更新)', 'リマインド送信済列を追加')
    .addSeparator()
    .addItem('▶ リマインドメールを手動送信(テスト/復旧用)', 'sendReminders')
    .addItem('🔧 リマインドトリガーを設定', 'setupReminderTriggers')
    .addItem('🔧 リマインドトリガーを解除', 'removeReminderTriggers')
    .addToUi();
}

/**
 * 既存のBookingsシートに「リマインド送信済」列(L列)を追加する移行関数
 */
function リマインド送信済列を追加() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let updated = 0;
  let skipped = 0;
  SCHOOLS.forEach(school => {
    const sheet = ss.getSheetByName(bookingsSheetName(school));
    if (!sheet) return;
    const lastCol = sheet.getLastColumn();
    const headerRow = sheet.getRange(1, 1, 1, Math.max(lastCol, 1)).getValues()[0];
    if (lastCol >= 12 && headerRow[11] === 'リマインド送信済') {
      skipped++;
      return;
    }
    sheet.getRange(1, 12).setValue('リマインド送信済');
    sheet.getRange(1, 12).setFontWeight('bold').setBackground('#e8f0fe');
    sheet.setColumnWidth(12, 150);
    updated++;
  });
  SpreadsheetApp.getUi().alert(
    'リマインド送信済列の追加が完了しました。\n\n' +
    '更新: ' + updated + 'シート\n' +
    'スキップ(既に追加済): ' + skipped + 'シート'
  );
}

/**
 * 既存のSlotsシートに「定員」列を追加する移行関数
 * 既存の枠は全て定員1で初期化
 */
function 定員列を追加() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let updated = 0;
  let skipped = 0;
  SCHOOLS.forEach(school => {
    const sheet = ss.getSheetByName(slotsSheetName(school));
    if (!sheet) return;
    const lastCol = sheet.getLastColumn();
    const headerRow = sheet.getRange(1, 1, 1, Math.max(lastCol, 1)).getValues()[0];
    if (lastCol >= 5 && headerRow[4] === '定員') {
      skipped++;
      return;
    }
    sheet.getRange(1, 5).setValue('定員');
    sheet.getRange(1, 5).setFontWeight('bold').setBackground('#e8f0fe');
    sheet.setColumnWidth(5, 70);
    // 既存の各行に定員1を埋める
    const lastRow = sheet.getLastRow();
    if (lastRow >= 2) {
      const fillValues = [];
      for (let i = 0; i < lastRow - 1; i++) fillValues.push([DEFAULT_CAPACITY]);
      sheet.getRange(2, 5, lastRow - 1, 1).setValues(fillValues);
    }
    updated++;
  });
  SpreadsheetApp.getUi().alert(
    '定員列の追加が完了しました。\n\n' +
    '更新: ' + updated + 'シート(既存の枠は全て定員1で初期化)\n' +
    'スキップ(既に追加済): ' + skipped + 'シート'
  );
}

/**
 * 既存のBookingsシートに「職員メモ」列を追加する移行関数
 * (シートのデータを保持したまま列のみ追加)
 */
function 職員メモ列を追加() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let updated = 0;
  let skipped = 0;
  SCHOOLS.forEach(school => {
    const sheet = ss.getSheetByName(bookingsSheetName(school));
    if (!sheet) return;
    const lastCol = sheet.getLastColumn();
    const headerRow = sheet.getRange(1, 1, 1, Math.max(lastCol, 1)).getValues()[0];
    // すでに11列目に「職員メモ」があればスキップ
    if (lastCol >= 11 && headerRow[10] === '職員メモ') {
      skipped++;
      return;
    }
    // 11列目に「職員メモ」見出しを追加
    sheet.getRange(1, 11).setValue('職員メモ');
    sheet.getRange(1, 11).setFontWeight('bold').setBackground('#e8f0fe');
    sheet.setColumnWidth(11, 250);
    updated++;
  });
  SpreadsheetApp.getUi().alert(
    '職員メモ列の追加が完了しました。\n\n' +
    '更新: ' + updated + 'シート\n' +
    'スキップ(既に追加済): ' + skipped + 'シート'
  );
}

// ========== データ取得(保護者用) ==========

function getAvailableSlots(schoolId) {
  const school = findSchoolById(schoolId);
  if (!school) return [];
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const slotsSheet = ss.getSheetByName(slotsSheetName(school));
  const bookingsSheet = ss.getSheetByName(bookingsSheetName(school));
  if (!slotsSheet) return [];

  // 各枠ごとの予約数をカウント
  const bookedCount = new Map();
  if (bookingsSheet && bookingsSheet.getLastRow() >= 2) {
    const lastCol = Math.max(bookingsSheet.getLastColumn(), BOOKING_COL_COUNT);
    const bRows = bookingsSheet.getRange(2, 1, bookingsSheet.getLastRow() - 1, lastCol).getValues();
    bRows.forEach(r => {
      if (r[8] !== 'cancelled') {
        const key = makeKey(r[1], r[2]);
        bookedCount.set(key, (bookedCount.get(key) || 0) + 1);
      }
    });
  }

  if (slotsSheet.getLastRow() < 2) return [];
  // 定員列がまだない既存シートでも動くように、列数を可変に
  const slotsLastCol = Math.max(slotsSheet.getLastColumn(), SLOT_COL_COUNT);
  const rows = slotsSheet.getRange(2, 1, slotsSheet.getLastRow() - 1, slotsLastCol).getValues();
  // 保護者は「現在時刻 + 1時間」以降の枠しか予約できない
  const cutoff = new Date(Date.now() + 60 * 60 * 1000);
  const result = [];
  rows.forEach(r => {
    const dateVal = r[0], timeVal = r[1], label = r[2], published = r[3];
    // 定員(列5)を取得、未設定なら1
    const capacityRaw = r[4];
    const capacity = (typeof capacityRaw === 'number' && capacityRaw > 0)
      ? capacityRaw : DEFAULT_CAPACITY;
    if (!dateVal || !timeVal) return;
    if (published === false) return;
    const date = formatDate(dateVal);
    const time = formatTime(timeVal);
    if (!date || !time) return;
    const key = makeKey(date, time);
    const cnt = bookedCount.get(key) || 0;
    if (cnt >= capacity) return; // 定員に達している
    const slotDate = new Date(date + 'T' + time + ':00');
    if (slotDate.getTime() < cutoff.getTime()) return; // 1時間以内は除外
    result.push({
      date: date, time: time,
      label: label ? String(label) : '',
      capacity: capacity,
      booked: cnt,
      remaining: capacity - cnt,
    });
  });
  return result;
}

function getMyBookings(email) {
  if (!email) return [];
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const normEmail = String(email).trim().toLowerCase();
  const result = [];

  SCHOOLS.forEach(school => {
    const sheet = ss.getSheetByName(bookingsSheetName(school));
    if (!sheet || sheet.getLastRow() < 2) return;
    const lastCol = Math.max(sheet.getLastColumn(), BOOKING_COL_COUNT);
    const rows = sheet.getRange(2, 1, sheet.getLastRow() - 1, lastCol).getValues();
    rows.forEach(r => {
      if (String(r[5]).trim().toLowerCase() === normEmail) {
        result.push(rowToBooking(r, school));
      }
    });
  });
  return result;
}

// ========== 予約操作 ==========

function createBooking(body) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const { schoolId, email, date, time, childName, parentName, grade, note } = body;
    if (!schoolId || !email || !date || !time || !childName || !parentName) {
      return { ok: false, error: 'パラメータが不足しています' };
    }
    const school = findSchoolById(schoolId);
    if (!school) return { ok: false, error: '校舎が見つかりません' };
    const available = getAvailableSlots(schoolId);
    const found = available.find(s => s.date === date && s.time === time);
    if (!found) return { ok: false, error: 'その枠はすでに予約されているか、公開されていません' };
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(bookingsSheetName(school));
    const id = 'b_' + new Date().getTime() + '_' + Math.random().toString(36).slice(2, 7);
    sheet.appendRow([
      id, date, time, childName, parentName, email,
      grade || '', note || '', 'confirmed', new Date(), '', ''
    ]);
    const row = sheet.getLastRow();
    sheet.getRange(row, 2).setNumberFormat('yyyy/mm/dd');
    sheet.getRange(row, 3).setNumberFormat('hh:mm');
    sheet.getRange(row, 10).setNumberFormat('yyyy/mm/dd hh:mm');
    // TODO: 新規予約通知(メール等)が必要になったらここで送信する
    //       (旧版はLINE WORKS通知を行っていたが、機密情報を含むため本リポジトリでは廃止)
    return { ok: true, id: id };
  } finally {
    lock.releaseLock();
  }
}

function cancelBooking(body) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const { schoolId, email, id } = body;
    const school = findSchoolById(schoolId);
    if (!school) return { ok: false, error: '校舎が見つかりません' };
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(bookingsSheetName(school));
    if (!sheet || sheet.getLastRow() < 2) return { ok: false, error: '予約が見つかりません' };
    const lastCol = Math.max(sheet.getLastColumn(), BOOKING_COL_COUNT);
    const rows = sheet.getRange(2, 1, sheet.getLastRow() - 1, lastCol).getValues();
    const normEmail = String(email || '').trim().toLowerCase();
    for (let i = 0; i < rows.length; i++) {
      if (rows[i][0] === id && String(rows[i][5]).trim().toLowerCase() === normEmail) {
        sheet.getRange(i + 2, COL.STATUS).setValue('cancelled');
        return { ok: true };
      }
    }
    return { ok: false, error: '予約が見つかりません' };
  } finally {
    lock.releaseLock();
  }
}

function updateBooking(body) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const { schoolId, email, id, date, time, childName, parentName, grade, note } = body;
    const school = findSchoolById(schoolId);
    if (!school) return { ok: false, error: '校舎が見つかりません' };
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(bookingsSheetName(school));
    if (!sheet || sheet.getLastRow() < 2) return { ok: false, error: '予約が見つかりません' };
    const lastCol = Math.max(sheet.getLastColumn(), BOOKING_COL_COUNT);
    const rows = sheet.getRange(2, 1, sheet.getLastRow() - 1, lastCol).getValues();
    const normEmail = String(email || '').trim().toLowerCase();
    for (let i = 0; i < rows.length; i++) {
      if (rows[i][0] === id && String(rows[i][5]).trim().toLowerCase() === normEmail) {
        const oldDate = formatDate(rows[i][1]);
        const oldTime = formatTime(rows[i][2]);
        if (oldDate !== date || oldTime !== time) {
          const available = getAvailableSlots(schoolId);
          const found = available.find(s => s.date === date && s.time === time);
          if (!found) return { ok: false, error: '変更先の枠はすでに予約されているか、公開されていません' };
        }
        const rowNum = i + 2;
        sheet.getRange(rowNum, COL.DATE).setValue(date).setNumberFormat('yyyy/mm/dd');
        sheet.getRange(rowNum, COL.TIME).setValue(time).setNumberFormat('hh:mm');
        sheet.getRange(rowNum, COL.CHILD).setValue(childName);
        sheet.getRange(rowNum, COL.PARENT).setValue(parentName);
        sheet.getRange(rowNum, COL.GRADE).setValue(grade || '');
        sheet.getRange(rowNum, COL.NOTE).setValue(note || '');
        return { ok: true };
      }
    }
    return { ok: false, error: '予約が見つかりません' };
  } finally {
    lock.releaseLock();
  }
}

// ========== 管理画面用 ==========

function getAllSlots(schoolId) {
  const school = findSchoolById(schoolId);
  if (!school) return [];
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const slotsSheet = ss.getSheetByName(slotsSheetName(school));
  const bookingsSheet = ss.getSheetByName(bookingsSheetName(school));
  if (!slotsSheet) return [];

  // 各枠ごとの予約一覧(複数あれば配列で)
  const bookingsMap = new Map();
  if (bookingsSheet && bookingsSheet.getLastRow() >= 2) {
    const lastCol = Math.max(bookingsSheet.getLastColumn(), BOOKING_COL_COUNT);
    const bRows = bookingsSheet.getRange(2, 1, bookingsSheet.getLastRow() - 1, lastCol).getValues();
    bRows.forEach(r => {
      if (r[8] !== 'cancelled') {
        const key = makeKey(r[1], r[2]);
        const list = bookingsMap.get(key) || [];
        list.push({
          childName: r[3], parentName: r[4], email: r[5], grade: r[6],
        });
        bookingsMap.set(key, list);
      }
    });
  }

  if (slotsSheet.getLastRow() < 2) return [];
  const slotsLastCol = Math.max(slotsSheet.getLastColumn(), SLOT_COL_COUNT);
  const rows = slotsSheet.getRange(2, 1, slotsSheet.getLastRow() - 1, slotsLastCol).getValues();
  const now = new Date();
  const result = [];
  rows.forEach((r, idx) => {
    const dateVal = r[0], timeVal = r[1], label = r[2], published = r[3];
    const capacityRaw = r[4];
    const capacity = (typeof capacityRaw === 'number' && capacityRaw > 0)
      ? capacityRaw : DEFAULT_CAPACITY;
    if (!dateVal || !timeVal) return;
    const date = formatDate(dateVal);
    const time = formatTime(timeVal);
    if (!date || !time) return;
    const key = makeKey(date, time);
    const slotDate = new Date(date + 'T' + time + ':00');
    const isPast = slotDate.getTime() < now.getTime();
    const bookings = bookingsMap.get(key) || [];
    result.push({
      rowNum: idx + 2,
      date: date,
      time: time,
      label: label ? String(label) : '',
      published: published !== false,
      isPast: isPast,
      capacity: capacity,
      booked: bookings.length,
      bookings: bookings,    // 全予約者
      booking: bookings[0] || null,  // 旧API互換(先頭1件)
    });
  });
  result.sort((a, b) => makeKey(a.date, a.time).localeCompare(makeKey(b.date, b.time)));
  return result;
}

function getAllBookings(schoolId) {
  const school = findSchoolById(schoolId);
  if (!school) return [];
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(bookingsSheetName(school));
  if (!sheet || sheet.getLastRow() < 2) return [];
  const lastCol = Math.max(sheet.getLastColumn(), BOOKING_COL_COUNT);
  const rows = sheet.getRange(2, 1, sheet.getLastRow() - 1, lastCol).getValues();
  return rows.map((r, idx) => {
    const b = rowToBooking(r, school);
    b.rowNum = idx + 2;
    return b;
  }).sort((a, b) => makeKey(a.date, a.time).localeCompare(makeKey(b.date, b.time)));
}

function adminAddSlots(body) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const { schoolId, slots } = body;
    const school = findSchoolById(schoolId);
    if (!school) return { ok: false, error: '校舎が見つかりません' };
    if (!slots || slots.length === 0) return { ok: false, error: '追加する枠がありません' };
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(slotsSheetName(school));
    if (!sheet) return { ok: false, error: 'シートが見つかりません' };

    const existing = new Set();
    if (sheet.getLastRow() >= 2) {
      const rows = sheet.getRange(2, 1, sheet.getLastRow() - 1, 2).getValues();
      rows.forEach(r => {
        if (r[0] && r[1]) existing.add(formatDate(r[0]) + ' ' + formatTime(r[1]));
      });
    }

    const toAdd = [];
    let skipped = 0;
    slots.forEach(s => {
      const key = s.date + ' ' + s.time;
      if (existing.has(key)) { skipped++; return; }
      const [y, m, d] = s.date.split('-').map(Number);
      const dateObj = new Date(y, m - 1, d);
      // 定員: 指定がなければ1。1以上の整数のみ受け付け
      let cap = parseInt(s.capacity, 10);
      if (!cap || cap < 1) cap = DEFAULT_CAPACITY;
      toAdd.push([dateObj, s.time, s.label || '', true, cap]);
      existing.add(key);
    });

    if (toAdd.length > 0) {
      const startRow = sheet.getLastRow() + 1;
      sheet.getRange(startRow, 1, toAdd.length, SLOT_COL_COUNT).setValues(toAdd);
      sheet.getRange(startRow, 1, toAdd.length, 1).setNumberFormat('yyyy/mm/dd');
      sheet.getRange(startRow, 2, toAdd.length, 1).setNumberFormat('hh:mm');
    }
    return { ok: true, added: toAdd.length, skipped: skipped };
  } finally {
    lock.releaseLock();
  }
}

function adminUpdateSlot(body) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const { schoolId, rowNum } = body;
    const school = findSchoolById(schoolId);
    if (!school) return { ok: false, error: '校舎が見つかりません' };
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(slotsSheetName(school));
    if (!sheet) return { ok: false, error: 'シートが見つかりません' };
    if (rowNum < 2 || rowNum > sheet.getLastRow()) return { ok: false, error: '行番号が不正です' };
    if (body.published !== undefined) sheet.getRange(rowNum, SLOT_COL.PUBLISHED).setValue(body.published);
    if (body.label !== undefined) sheet.getRange(rowNum, SLOT_COL.LABEL).setValue(body.label || '');
    if (body.capacity !== undefined) {
      const cap = parseInt(body.capacity, 10);
      if (!cap || cap < 1) return { ok: false, error: '定員は1以上の数字を指定してください' };
      sheet.getRange(rowNum, SLOT_COL.CAPACITY).setValue(cap);
    }
    return { ok: true };
  } finally {
    lock.releaseLock();
  }
}

/**
 * 複数の枠の定員を一括変更
 * body: { schoolId, rowNums: [行番号配列], capacity: 1|2 }
 */
function adminBulkUpdateCapacity(body) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const { schoolId, rowNums, capacity } = body;
    const school = findSchoolById(schoolId);
    if (!school) return { ok: false, error: '校舎が見つかりません' };
    if (!rowNums || rowNums.length === 0) return { ok: false, error: '対象の枠が選択されていません' };
    const cap = parseInt(capacity, 10);
    if (!cap || cap < 1) return { ok: false, error: '定員は1以上の数字を指定してください' };

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(slotsSheetName(school));
    if (!sheet) return { ok: false, error: 'シートが見つかりません' };

    // 既存予約数のチェック: 定員を予約数より下にはできない
    const bookingsSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(bookingsSheetName(school));
    const bookedCount = new Map();
    if (bookingsSheet && bookingsSheet.getLastRow() >= 2) {
      const lastCol = Math.max(bookingsSheet.getLastColumn(), BOOKING_COL_COUNT);
      const bRows = bookingsSheet.getRange(2, 1, bookingsSheet.getLastRow() - 1, lastCol).getValues();
      bRows.forEach(r => {
        if (r[8] !== 'cancelled') {
          const key = makeKey(r[1], r[2]);
          bookedCount.set(key, (bookedCount.get(key) || 0) + 1);
        }
      });
    }

    let updated = 0;
    let skipped = 0;
    const skipReasons = [];
    rowNums.forEach(rowNum => {
      if (rowNum < 2 || rowNum > sheet.getLastRow()) { skipped++; return; }
      const rowVals = sheet.getRange(rowNum, 1, 1, SLOT_COL_COUNT).getValues()[0];
      const key = makeKey(rowVals[0], rowVals[1]);
      const cnt = bookedCount.get(key) || 0;
      if (cnt > cap) {
        skipped++;
        skipReasons.push(formatDate(rowVals[0]) + ' ' + formatTime(rowVals[1]) +
          ' (予約' + cnt + '件あり、定員' + cap + '未満にできず)');
        return;
      }
      sheet.getRange(rowNum, SLOT_COL.CAPACITY).setValue(cap);
      updated++;
    });
    return {
      ok: true, updated: updated, skipped: skipped,
      skipReasons: skipReasons,
    };
  } finally {
    lock.releaseLock();
  }
}

function adminDeleteSlot(body) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const { schoolId, rowNum } = body;
    const school = findSchoolById(schoolId);
    if (!school) return { ok: false, error: '校舎が見つかりません' };
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(slotsSheetName(school));
    if (!sheet) return { ok: false, error: 'シートが見つかりません' };
    if (rowNum < 2 || rowNum > sheet.getLastRow()) return { ok: false, error: '行番号が不正です' };
    sheet.deleteRow(rowNum);
    return { ok: true };
  } finally {
    lock.releaseLock();
  }
}

/**
 * 複数の枠を一括削除する
 * body: { schoolId, rowNums: [行番号の配列] }
 * - 予約が入っている枠は削除せずスキップ(安全策)
 * - 行番号は大きい順に削除して行ズレを防ぐ
 */
function adminDeleteSlots(body) {
  const lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    const { schoolId, rowNums } = body;
    const school = findSchoolById(schoolId);
    if (!school) return { ok: false, error: '校舎が見つかりません' };
    if (!rowNums || rowNums.length === 0) return { ok: false, error: '削除対象が指定されていません' };
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const slotsSheet = ss.getSheetByName(slotsSheetName(school));
    if (!slotsSheet) return { ok: false, error: 'シートが見つかりません' };

    // 予約が入っている日時を集計(キャンセル以外)
    const bookingsSheet = ss.getSheetByName(bookingsSheetName(school));
    const bookedKeys = new Set();
    if (bookingsSheet && bookingsSheet.getLastRow() >= 2) {
      const lastCol = Math.max(bookingsSheet.getLastColumn(), BOOKING_COL_COUNT);
      const bRows = bookingsSheet.getRange(2, 1, bookingsSheet.getLastRow() - 1, lastCol).getValues();
      bRows.forEach(r => {
        if (r[8] !== 'cancelled') bookedKeys.add(makeKey(r[1], r[2]));
      });
    }

    const lastRow = slotsSheet.getLastRow();
    // 削除対象の行を検証し、予約済みはスキップ
    const validRows = [];
    let skippedBooked = 0;
    rowNums.forEach(rowNum => {
      if (rowNum < 2 || rowNum > lastRow) return;
      const rowVals = slotsSheet.getRange(rowNum, 1, 1, SLOT_COL_COUNT).getValues()[0];
      const key = makeKey(rowVals[0], rowVals[1]);
      if (bookedKeys.has(key)) { skippedBooked++; return; } // 予約済みは削除しない
      validRows.push(rowNum);
    });

    // 行ズレ防止のため、大きい行番号から削除
    validRows.sort((a, b) => b - a);
    let deleted = 0;
    validRows.forEach(rowNum => {
      slotsSheet.deleteRow(rowNum);
      deleted++;
    });

    return { ok: true, deleted: deleted, skippedBooked: skippedBooked };
  } finally {
    lock.releaseLock();
  }
}

function adminCancelBooking(body) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const { schoolId, id } = body;
    const school = findSchoolById(schoolId);
    if (!school) return { ok: false, error: '校舎が見つかりません' };
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(bookingsSheetName(school));
    if (!sheet || sheet.getLastRow() < 2) return { ok: false, error: '予約が見つかりません' };
    const lastCol = Math.max(sheet.getLastColumn(), BOOKING_COL_COUNT);
    const rows = sheet.getRange(2, 1, sheet.getLastRow() - 1, lastCol).getValues();
    for (let i = 0; i < rows.length; i++) {
      if (rows[i][0] === id) {
        sheet.getRange(i + 2, COL.STATUS).setValue('cancelled');
        return { ok: true };
      }
    }
    return { ok: false, error: '予約が見つかりません' };
  } finally {
    lock.releaseLock();
  }
}

/**
 * 職員による予約変更
 * 任意のフィールドを部分更新できる(送られてきたフィールドのみ更新)
 * body: { schoolId, id, date?, time?, childName?, parentName?, grade?, note?, staffNote? }
 */
function adminUpdateBooking(body) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const { schoolId, id } = body;
    const school = findSchoolById(schoolId);
    if (!school) return { ok: false, error: '校舎が見つかりません' };
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(bookingsSheetName(school));
    if (!sheet || sheet.getLastRow() < 2) return { ok: false, error: '予約が見つかりません' };
    const lastCol = Math.max(sheet.getLastColumn(), BOOKING_COL_COUNT);
    const rows = sheet.getRange(2, 1, sheet.getLastRow() - 1, lastCol).getValues();
    for (let i = 0; i < rows.length; i++) {
      if (rows[i][0] === id) {
        const rowNum = i + 2;
        // 日時変更の場合、変更先の空き枠チェック
        const newDate = body.date !== undefined ? body.date : formatDate(rows[i][1]);
        const newTime = body.time !== undefined ? body.time : formatTime(rows[i][2]);
        const oldDate = formatDate(rows[i][1]);
        const oldTime = formatTime(rows[i][2]);
        if (oldDate !== newDate || oldTime !== newTime) {
          // 別の有効予約が同じ枠を埋めていないかチェック
          const isDup = rows.some((r, idx) =>
            idx !== i && r[8] !== 'cancelled' &&
            formatDate(r[1]) === newDate && formatTime(r[2]) === newTime
          );
          if (isDup) return { ok: false, error: '変更先の枠はすでに予約されています' };
        }
        // 各フィールドの更新(送られてきたものだけ)
        if (body.date !== undefined) {
          sheet.getRange(rowNum, COL.DATE).setValue(newDate).setNumberFormat('yyyy/mm/dd');
        }
        if (body.time !== undefined) {
          sheet.getRange(rowNum, COL.TIME).setValue(newTime).setNumberFormat('hh:mm');
        }
        if (body.childName !== undefined) sheet.getRange(rowNum, COL.CHILD).setValue(body.childName);
        if (body.parentName !== undefined) sheet.getRange(rowNum, COL.PARENT).setValue(body.parentName);
        if (body.grade !== undefined) sheet.getRange(rowNum, COL.GRADE).setValue(body.grade || '');
        if (body.note !== undefined) sheet.getRange(rowNum, COL.NOTE).setValue(body.note || '');
        if (body.staffNote !== undefined) sheet.getRange(rowNum, COL.STAFF_NOTE).setValue(body.staffNote || '');
        return { ok: true };
      }
    }
    return { ok: false, error: '予約が見つかりません' };
  } finally {
    lock.releaseLock();
  }
}

// ========== ユーティリティ ==========

function formatDate(val) {
  if (val instanceof Date) {
    const y = val.getFullYear();
    const m = String(val.getMonth() + 1).padStart(2, '0');
    const d = String(val.getDate()).padStart(2, '0');
    return y + '-' + m + '-' + d;
  }
  const s = String(val).trim();
  const m = s.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})$/);
  if (m) return m[1] + '-' + String(m[2]).padStart(2,'0') + '-' + String(m[3]).padStart(2,'0');
  return null;
}

function formatTime(val) {
  if (val instanceof Date) {
    const h = String(val.getHours()).padStart(2, '0');
    const m = String(val.getMinutes()).padStart(2, '0');
    return h + ':' + m;
  }
  const s = String(val).trim();
  const m = s.match(/^(\d{1,2}):(\d{2})/);
  if (m) return String(m[1]).padStart(2,'0') + ':' + m[2];
  return null;
}

function makeKey(date, time) {
  return formatDate(date) + ' ' + formatTime(time);
}

// ========== リマインドメール機能 ==========

/**
 * 翌日に面談予約がある保護者へリマインドメールを送信する
 * - 全校舎を横断
 * - 「予約状態が confirmed」かつ「翌日の予約」かつ「リマインド送信済が空」のものが対象
 * - 送信成功したらL列に送信日時を記録
 * - 失敗してもログに残し、他の送信を継続
 *
 * トリガーから10:00と19:00に呼ばれる想定。1日2回呼ばれるが、
 * 送信済みフラグがあるため、1予約あたり1通のみ送信される。
 */
function sendReminders() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = formatDate(tomorrow);

  let sentCount = 0;
  let errorCount = 0;
  const errors = [];

  SCHOOLS.forEach(school => {
    const sheet = ss.getSheetByName(bookingsSheetName(school));
    if (!sheet || sheet.getLastRow() < 2) return;
    const lastCol = Math.max(sheet.getLastColumn(), BOOKING_COL_COUNT);
    const rows = sheet.getRange(2, 1, sheet.getLastRow() - 1, lastCol).getValues();

    rows.forEach((r, idx) => {
      const rowNum = idx + 2;
      const date = formatDate(r[1]);
      const status = r[8];
      const email = String(r[5] || '').trim();
      const reminderSent = r[11];

      // 条件: 翌日の予約 / confirmed / メールあり / 未送信
      if (date !== tomorrowStr) return;
      if (status === 'cancelled') return;
      if (!email) return;
      if (reminderSent) return; // すでに送信済

      try {
        const booking = rowToBooking(r, school);
        sendOneReminder(booking);
        // 送信済みマークを書き込む
        sheet.getRange(rowNum, COL.REMINDER_SENT).setValue(new Date());
        sentCount++;
      } catch (err) {
        errorCount++;
        errors.push(school.name + ' / ' + r[3] + ' (' + email + '): ' + err);
        console.error('リマインド送信失敗:', school.name, email, err);
      }
    });
  });

  const result = '✉️ リマインドメール送信結果\n\n' +
    '送信成功: ' + sentCount + '件\n' +
    '送信失敗: ' + errorCount + '件' +
    (errors.length > 0 ? '\n\n【失敗詳細】\n' + errors.join('\n') : '');
  console.log(result);
  return result;
}

/**
 * 個別の予約に対してリマインドメールを1通送信
 */
function sendOneReminder(booking) {
  const subject = '【面談のご案内】明日の面談についてのリマインド';
  const dateLabel = formatJapaneseDate(booking.date);
  const body =
    booking.parentName + ' 様\n' +
    '\n' +
    'いつもお世話になっております。\n' +
    '明日の面談についてリマインドのご連絡です。\n' +
    '\n' +
    '────────────────────\n' +
    '【面談予定】\n' +
    '  日時:' + dateLabel + ' ' + booking.time + '\n' +
    '  校舎:' + booking.schoolName + '\n' +
    '  お子様:' + booking.childName + ' 様\n' +
    '────────────────────\n' +
    '\n' +
    'お忙しい中とは存じますが、お気をつけてお越しください。\n' +
    'お待ちしております。\n' +
    '\n' +
    '\n' +
    '────────────────────\n' +
    '※ ご変更・キャンセルの際は、お通いの校舎まで直接お電話にてご連絡ください。\n' +
    '※ このメールは送信専用です。返信されてもご対応できかねます。\n' +
    '────────────────────\n';

  MailApp.sendEmail({
    to: booking.email,
    subject: subject,
    body: body,
    name: '面談予約システム',
  });
}

/**
 * 日付文字列(YYYY-MM-DD)を「○月○日(○)」形式に変換
 */
function formatJapaneseDate(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
  return y + '年' + m + '月' + d + '日(' + weekdays[date.getDay()] + ')';
}

/**
 * 10:00 と 19:00 のトリガーを設定する(初回セットアップ用)
 */
function setupReminderTriggers() {
  // 既存のリマインド系トリガーを削除してから作り直す
  removeReminderTriggersInternal();

  ScriptApp.newTrigger('sendReminders')
    .timeBased()
    .everyDays(1)
    .atHour(10)
    .create();

  ScriptApp.newTrigger('sendReminders')
    .timeBased()
    .everyDays(1)
    .atHour(19)
    .create();

  SpreadsheetApp.getUi().alert(
    'リマインドトリガーを設定しました。\n\n' +
    '・毎日 10:00頃 と 19:00頃 に自動実行されます\n' +
    '・同じ予約には1通だけ送信されます(重複防止)\n' +
    '・10:00が失敗しても19:00で拾える保険になります'
  );
}

function removeReminderTriggers() {
  const removed = removeReminderTriggersInternal();
  SpreadsheetApp.getUi().alert(
    'リマインドトリガーを解除しました。\n\n' +
    '解除数: ' + removed + '件'
  );
}

function removeReminderTriggersInternal() {
  const triggers = ScriptApp.getProjectTriggers();
  let count = 0;
  triggers.forEach(t => {
    if (t.getHandlerFunction() === 'sendReminders') {
      ScriptApp.deleteTrigger(t);
      count++;
    }
  });
  return count;
}

