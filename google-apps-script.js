// ============================================
// PASTE THIS INTO GOOGLE APPS SCRIPT EDITOR
// Then: Deploy → Manage Deployments → Edit (pencil) → Version: New version → Deploy
// ============================================

function doPost(e) {
  var ss = SpreadsheetApp.openById('1NHCKx6_Kh8asruszdTcN-ZwmO10XfWtZim4kxMzW-Bk');
  var sheet = ss.getSheets()[0];

  // Parse data - handle both form POST and JSON POST
  var data = {};
  try {
    if (e.parameter && e.parameter.payload) {
      data = JSON.parse(e.parameter.payload);
    } else if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    }
  } catch(err) {
    data = { email: 'parse error', source: err.toString() };
  }

  // Write to sheet
  sheet.appendRow([
    new Date(),
    data.name || '',
    data.email || '',
    data.company || '',
    data.message || '',
    data.source || 'Unknown'
  ]);
  SpreadsheetApp.flush();

  // Email notifications
  try {
    if (data.source === 'contact') {
      MailApp.sendEmail(
        'brooke@letsbsocial.co',
        '🚀 New Lead — ' + (data.name || 'Unknown'),
        'Name: ' + (data.name || '') + '\nEmail: ' + (data.email || '') + '\nCompany: ' + (data.company || '') + '\nMessage: ' + (data.message || '')
      );
    }
    if (data.source === 'checklist') {
      MailApp.sendEmail(
        'brooke@letsbsocial.co',
        '📋 New Checklist Download — ' + (data.email || 'Unknown'),
        'Email: ' + (data.email || '')
      );
    }
  } catch(err) {}

  return ContentService.createTextOutput('ok');
}

function doGet(e) {
  var ss = SpreadsheetApp.openById('1NHCKx6_Kh8asruszdTcN-ZwmO10XfWtZim4kxMzW-Bk');
  var sheet = ss.getSheets()[0];
  sheet.appendRow([new Date(), 'TEST', 'test@test.com', '', '', 'test']);
  SpreadsheetApp.flush();
  return ContentService.createTextOutput('Test row added! Check your sheet.');
}
