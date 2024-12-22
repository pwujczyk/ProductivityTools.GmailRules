//https://docs.google.com/spreadsheets/d/1-qb1wmRiDWJTq5n5T3ItkWJmHjU-BhGYFe9e439MFtc/edit#gid=0

const packetName = ".PT.GmailRules"
const unprocessed = ".PT.GmailRules/Unprocessed"

function doGet() {
  ExecuteForUnprocessed()
}


function ExecuteForUnprocessed() {
  craeteRequiredLabels();
  var threads = getUnprocessedThreads();
  ExecuteScript(threads);
}

function ExecuteForInbox() {
  craeteRequiredLabels();
  var threads = GmailApp.getInboxThreads();
  ExecuteScript(threads);
}

function craeteRequiredLabels() {
  var labels = [packetName, unprocessed]
  labels.forEach((label) => {
    GmailApp.createLabel(label);

  })
}

function ExecuteScript(threads) {
  var configuration = LoadConfiguration();

  var log = ""
  for (var i = 0; i < threads.length; i++) {
    var thread = threads[i]
    var subject = thread.getFirstMessageSubject();

    result = DoOperatorOnThread(thread, configuration, log)
    if (result == false) {
      thread.moveToInbox();
      removeUnprocessed(thread);
    }
  }
  console.log(log);
  //return ContentService.createTextOutput(result);
}

function getUnprocessedThreads() {
  var label = GmailApp.getUserLabelByName(unprocessed);
  var threads = label.getThreads();
  return threads;
}

function LoadConfiguration() {
  //var configuration = SpreadsheetApp.openById("1-qb1wmRiDWJTq5n5T3ItkWJmHjU-BhGYFe9e439MFtc");
  var configuration = SpreadsheetApp.getActiveSpreadsheet();
  //var vacations = configuration.getSheetByName("Vacations");
  var daily = configuration.getSheetByName("Daily");
  var SheetPlaces = daily;

  var data = SheetPlaces.getDataRange().getValues();
  data.shift();// Remove header 
  var items = [];

  data.forEach(function (row) {
    var element = { 'Mask': row[0], 'Operator': row[1], 'Action': row[2], 'Label': row[3] }
    items.push(element);
  });
  return items;
}

function removeUnprocessed(thread) {
  var labelUnprocessed = GmailApp.getUserLabelByName(unprocessed);
  if (labelUnprocessed) {
    thread.removeLabel(labelUnprocessed)
  }
}

function DoActionOnThread(thread, configurationItem) {

  var subject = thread.getFirstMessageSubject();
  if (configurationItem.Label) {
    var labelString = packetName + "/" + configurationItem.Label
    GmailApp.createLabel(labelString);
    let label = GmailApp.getUserLabelByName(labelString);
    label.addToThread(thread);
    removeUnprocessed(thread);

  }

  switch (configurationItem.Action) {
    case 'Archive':
      thread.moveToArchive();
      return;
    case 'Delete':
      thread.moveToTrash();
      return;
  }

}

function DoEqualsWork(thread, configurationItem) {
  var subject = thread.getFirstMessageSubject();
  if (subject == configurationItem.Mask) {
    DoActionOnThread(thread, configurationItem);
    Logger.log("Did *Equals* operation on " + subject + "\n\r");
    return true;
  }
  return false;
}

function DoStartsWithWork(thread, configurationItem) {
  var subject = thread.getFirstMessageSubject();
  if (subject.startsWith(configurationItem.Mask)) {
    DoActionOnThread(thread, configurationItem);
    Logger.log("Did *DoStartsWithWork* operation on" + subject + "\n\r")
    return true;
  }
  return false;
}

function DoContainsWork(thread, configurationItem) {
  var subject = thread.getFirstMessageSubject();
  if (subject.includes(configurationItem.Mask)) {
    DoActionOnThread(thread, configurationItem);
    Logger.log("Did *DoContainsWork* operation on" + subject + "\n\r")
    return true;
  }
  return false;
}


function DoFromWork(thread, configurationItem) {
  var messages = thread.getMessages();
  var from = messages[0].getFrom();
  Logger.log(from);
  if (from.includes(configurationItem.Mask)) {
    DoActionOnThread(thread, configurationItem);
    Logger.log("Did *DoFromWork* operation on" + from)
    return true;
  }
  return false;
}

function DoOperatorOnThread(thread, configuration, log) {
  var result = false
  for (var i = 0; i < configuration.length; i++) {
    switch (configuration[i].Operator) {
      case 'Equals':
        result = DoEqualsWork(thread, configuration[i]);
        if (result) return true
        break;
      case 'StartsWith':
        result = DoStartsWithWork(thread, configuration[i]);
        if (result) return true
        break;
      case 'Contains':
        result = DoContainsWork(thread, configuration[i]);
        if (result) return true
        break;
      case 'From':
        result = DoFromWork(thread, configuration[i]);
        if (result) return true
        break;


    }
  }
  return false;
}


