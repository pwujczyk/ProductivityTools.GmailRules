function LoadConfiguration() {
  var configuration = SpreadsheetApp.openById("1-qb1wmRiDWJTq5n5T3ItkWJmHjU-BhGYFe9e439MFtc");
  var SheetPlaces = configuration.getSheetByName("Vacations");

  var data = SheetPlaces.getDataRange().getValues();
  data.shift();// Remove header 
  var items = [];

  data.forEach(function (row) {
    var element={ 'Mask': row[0], 'Operator': row[1], 'Action': row[2] }
    items.push(element);
  });
  return items;
}

function DoEqualsWork(subject, configurationItem) {
  if (subject == configurationItem.Mask) {
    Logger.Log("Wooho")
  }
}

function DoActionOnThread(subject, configuration) {
  for (var i = 0; i < configuration.length; i++) {
    switch (configuration[i].Operator) {
      case 'Equals':
        DoEqualsWork(subject, configuration[i]);
        break;
    }
  }
}

function myFunction() {
  var configuration = LoadConfiguration();

  var threads = GmailApp.getInboxThreads();
  for (var i = 0; i < threads.length; i++) {
    DoActionOnThread(threads[i].getFirstMessageSubject(),configuration)
    // var subject = threads[i].getFirstMessageSubject()
    // Logger.log(subject);
    // if (subjectsToArchive.includes(subject)) {
    //   //threads[i].moveToArchive();
    // }
    // for (var j = 0; j < subjectsStartToArchive.length; j++) {
    //   if (subject.startsWith(subjectsStartToArchive[j])) {
    //     threads[i].moveToArchive();
    //   }
    // }
  }

}
