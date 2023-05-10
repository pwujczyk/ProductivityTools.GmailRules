function LoadConfiguration() {
  var configuration = SpreadsheetApp.openById("1-qb1wmRiDWJTq5n5T3ItkWJmHjU-BhGYFe9e439MFtc");
  var SheetPlaces = configuration.getSheetByName("Vacations");

  var data = SheetPlaces.getDataRange().getValues();
  data.shift();// Remove header 
  var items = [];

  data.forEach(function (row) {
    var element = { 'Mask': row[0], 'Operator': row[1], 'Action': row[2] }
    items.push(element);
  });
  return items;
}

function DoActionOnThread(thread, configurationItem) {
  switch (configurationItem.Action) {
    case 'Archive':
      Logger.log("Moving thread to Archive: " + thread.getFirstMessageSubject());
      thread.moveToArchive();
      return;
    case 'Delete':
      Logger.log("Removing thread: " + thread.getFirstMessageSubject());
      thread.moveToTrash();
      return;
  }
}

function DoEqualsWork(thread, configurationItem) {
  var subject = thread.getFirstMessageSubject();
  if (subject == configurationItem.Mask) {
    DoActionOnThread(thread, configurationItem);
    return "Did *Equals* operation on " + subject +"\n\r";
  }
  return "";
}

function DoStartsWithWork(thread, configurationItem) {
  var subject = thread.getFirstMessageSubject();
  if (subject.startsWith(configurationItem.Mask)) {
    DoActionOnThread(thread, configurationItem);
    return "Did *DoStartsWithWork* operation on" + subject +"\n\r";
  }
  return "";
}

function DoContainsWork(thread, configurationItem) {
  var subject = thread.getFirstMessageSubject();
  if (subject.includes(configurationItem.Mask)) {
    DoActionOnThread(thread, configurationItem);
    return "Did *DoContainsWork* operation on" + subject +"\n\r";
  }
    return "";
}

function DoOperatorOnThread(subject, configuration,result) { 
  for (var i = 0; i < configuration.length; i++) {
    switch (configuration[i].Operator) {
      case 'Equals':
        result+=DoEqualsWork(subject, configuration[i]);
        break;
      case 'StartsWith':
        result+=DoStartsWithWork(subject, configuration[i]);
        break;
      case 'Contains':
        result+=DoContainsWork(subject, configuration[i]);
        break;
         
    }
  }
  return result;
}

function doGet() {
  var configuration = LoadConfiguration();

  var threads = GmailApp.getInboxThreads();
  var result="Result:\n\r"
  for (var i = 0; i < threads.length; i++) {
    result= DoOperatorOnThread(threads[i], configuration,result)
  }
  return ContentService.createTextOutput(result);
}
