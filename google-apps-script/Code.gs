const SHEET_NAME = 'DS_DK';
const DEFAULT_SPREADSHEET_ID = '11yS-o8hZZXwz9JbMoPOOFTXxw5Lr3-qN2UPVKE46ic0';
const DEFAULT_NOTIFY_EMAIL = 'chansgoidauduongsinh@gmail.com';
const CONFIG_KEYS = {
  spreadsheetId: 'SPREADSHEET_ID',
  notifyEmail: 'NOTIFY_EMAIL'
};

function doPost(e) {
  let debugNote = '';
  try {
    const data = parseRequestData(e);
    const timestamp = new Date();

    validateBookingData(data);

    const ss = SpreadsheetApp.openById(getSpreadsheetId());
    let sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    }

    const expectedHeaders = [
      'Timestamp',
      'HoVaTen',
      'SoDienThoai',
      'Email',
      'GioiTinh',
      'Tuoi',
      'DichVu',
      'Ngay',
      'Gio',
      'GhiChu',
      'EmailStatus',
      'DebugNote'
    ];

    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, expectedHeaders.length).setValues([expectedHeaders]);
    }

    const emailStatus = sendBookingNotification(data, timestamp);

    const rowData = [
      timestamp,
      data.name || '',
      data.phone || '',
      data.email || '',
      data.gender || '',
      data.age || '',
      data.service || '',
      data.date || '',
      data.time || '',
      data.note || '',
      emailStatus,
      debugNote + 'Dữ liệu được ghi lúc: ' + new Date().toISOString()
    ];

    const lastRow = sheet.getLastRow() + 1;
    sheet.getRange(lastRow, 1, 1, rowData.length).setValues([rowData]);
    SpreadsheetApp.flush();
    sheet.getRange(lastRow, 1).setBackground('yellow');

    let rawSheet = ss.getSheetByName('RAW_DEBUG');
    if (!rawSheet) {
      rawSheet = ss.insertSheet('RAW_DEBUG');
      rawSheet.getRange(1, 1, 1, 3).setValues([['Timestamp', 'Payload', 'Note']]);
    }
    rawSheet.getRange(rawSheet.getLastRow() + 1, 1, 1, 3).setValues([[
      new Date(),
      JSON.stringify(rowData),
      'Written by doPost'
    ]]);
    SpreadsheetApp.flush();

    Logger.log('doPost - Dữ liệu đã ghi vào sheet: ' + JSON.stringify(rowData));

    return jsonResponse({
      result: 'success',
      message: 'Đặt lịch thành công',
      emailStatus: emailStatus
    });
  } catch (error) {
    console.error('Lỗi trong doPost: ' + error.message);
    return jsonResponse({
      result: 'error',
      message: String(error && error.message ? error.message : error)
    });
  }
}

function parseRequestData(e) {
  if (!e) throw new Error('Không nhận được request');

  if (e.postData && e.postData.contents) {
    const contents = e.postData.contents;
    const contentType = String(e.postData.type || '').toLowerCase();

    if (contentType.indexOf('application/json') !== -1 || looksLikeJson(contents)) {
      return JSON.parse(contents);
    }

    if (contentType.indexOf('text/plain') !== -1 && looksLikeJson(contents)) {
      return JSON.parse(contents);
    }
  }

  if (e.parameter && Object.keys(e.parameter).length > 0) {
    return e.parameter;
  }

  throw new Error('Không đọc được dữ liệu đặt lịch');
}

function looksLikeJson(value) {
  const text = String(value || '').trim();
  return text.charAt(0) === '{' && text.charAt(text.length - 1) === '}';
}

function validateBookingData(data) {
  const requiredFields = ['name', 'phone', 'service', 'date', 'time'];
  const missingFields = requiredFields.filter(function (field) {
    return !String(data[field] || '').trim();
  });

  if (missingFields.length > 0) {
    throw new Error('Thiếu thông tin bắt buộc: ' + missingFields.join(', '));
  }
}

function sendBookingNotification(data, timestamp) {
  const subject = '📩 Có khách hàng mới đặt lịch spa';
  const body =
    'Có khách hàng vừa đặt lịch mới:\n\n' +
    'Họ tên: ' + (data.name || '') + '\n' +
    'Số điện thoại: ' + (data.phone || '') + '\n' +
    'Email: ' + (data.email || '') + '\n' +
    'Giới tính: ' + formatGender(data.gender) + '\n' +
    'Tuổi: ' + (data.age || '') + '\n' +
    'Dịch vụ: ' + formatService(data.service) + '\n' +
    'Ngày: ' + (data.date || '') + '\n' +
    'Giờ: ' + (data.time || '') + '\n' +
    'Ghi chú: ' + (data.note || '') + '\n\n' +
    'Thời gian ghi nhận: ' + timestamp;

  try {
    MailApp.sendEmail({
      to: getNotifyEmail(),
      subject: subject,
      body: body,
      name: 'Chans Booking'
    });

    return 'Sent';
  } catch (mailError) {
    return 'Failed: ' + String(mailError && mailError.message ? mailError.message : mailError);
  }
}

function formatGender(value) {
  const map = {
    nam: 'Nam',
    nu: 'Nữ',
    khac: 'Khác'
  };

  return map[value] || value || '';
}

function formatService(value) {
  const map = {
    'co-ban': 'Gói Cơ Bản - 39.000đ',
    'chuyen-dung': 'Gói Chuyên Dùng - 79.000đ',
    vip: 'Gói VIP - 199.000đ'
  };

  return map[value] || value || '';
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function getSpreadsheetId() {
  return PropertiesService.getScriptProperties().getProperty(CONFIG_KEYS.spreadsheetId) || DEFAULT_SPREADSHEET_ID;
}

function getNotifyEmail() {
  return PropertiesService.getScriptProperties().getProperty(CONFIG_KEYS.notifyEmail) || DEFAULT_NOTIFY_EMAIL;
}

function setupConfig() {
  PropertiesService.getScriptProperties().setProperties({
    [CONFIG_KEYS.spreadsheetId]: DEFAULT_SPREADSHEET_ID,
    [CONFIG_KEYS.notifyEmail]: DEFAULT_NOTIFY_EMAIL
  }, true);
  Logger.log('Đã lưu cấu hình vào Script Properties');
}

function testDoPost() {
  try {
    const mockEvent = {
      postData: {
        type: 'text/plain',
        contents: JSON.stringify({
          name: 'Khách Test',
          phone: '0900000000',
          email: 'test@example.com',
          gender: 'nu',
          age: '25',
          service: 'co-ban',
          date: '2026-06-30',
          time: '09:00',
          note: 'Test đặt lịch'
        })
      }
    };

    const response = doPost(mockEvent);
    Logger.log('doPost Response: ' + response.getContent());

    const ss = SpreadsheetApp.openById(getSpreadsheetId());
    Logger.log('URL của Spreadsheet đang ghi: ' + ss.getUrl());
    const sheet = ss.getSheetByName(SHEET_NAME);
    if (sheet) {
      const lastRow = sheet.getLastRow();
      const lastData = sheet.getRange(lastRow, 1, 1, sheet.getLastColumn()).getValues();
      Logger.log('Dữ liệu cuối cùng trong sheet: ' + JSON.stringify(lastData));
    } else {
      Logger.log("Sheet '" + SHEET_NAME + "' không tồn tại sau khi doPost chạy.");
    }
  } catch (error) {
    Logger.log('Lỗi trong testDoPost: ' + error.message);
  }
}

function checkSheetHeaders() {
  const expectedHeaders = [
    'Timestamp',
    'HoVaTen',
    'SoDienThoai',
    'Email',
    'GioiTinh',
    'Tuoi',
    'DichVu',
    'Ngay',
    'Gio',
    'GhiChu',
    'EmailStatus',
    'DebugNote'
  ];

  const ss = SpreadsheetApp.openById(getSpreadsheetId());
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(expectedHeaders);
    sheet.autoResizeColumns(1, expectedHeaders.length);
    Logger.log("Sheet '" + SHEET_NAME + "' đã được tạo với các tiêu đề.");
    return;
  }

  const currentHeaders = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

  if (currentHeaders.length !== expectedHeaders.length || JSON.stringify(currentHeaders) !== JSON.stringify(expectedHeaders)) {
    sheet.getRange(1, 1, 1, sheet.getLastColumn()).clearContent();
    sheet.getRange(1, 1, 1, expectedHeaders.length).setValues([expectedHeaders]);
    sheet.autoResizeColumns(1, expectedHeaders.length);
    Logger.log("Tiêu đề của sheet '" + SHEET_NAME + "' đã được cập nhật.");
  } else {
    Logger.log("Tiêu đề của sheet '" + SHEET_NAME + "' đã khớp.");
  }
}

// Chạy một lần để lưu cấu hình vào Script Properties
function initBookingConfig() {
  setupConfig();
}