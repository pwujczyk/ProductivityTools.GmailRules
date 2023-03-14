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
  }
}

function DoStartsWithWork(thread, configurationItem) {
  var subject = thread.getFirstMessageSubject();
  if (subject.startsWith(configurationItem.Mask)) {
    Logger.log("Found matching rule")
    DoActionOnThread(thread, configurationItem);
  }
}

function DoOperatorOnThread(subject, configuration) {
  for (var i = 0; i < configuration.length; i++) {
    switch (configuration[i].Operator) {
      case 'Equals':
        DoEqualsWork(subject, configuration[i]);
        break;
      case 'StartsWith':
        DoStartsWithWork(subject, configuration[i]);
        break;
    }
  }
}

function myFunction() {
  var configuration = LoadConfiguration();

  var threads = GmailApp.getInboxThreads();
  for (var i = 0; i < threads.length; i++) {
    DoOperatorOnThread(threads[i], configuration)
  }
}
