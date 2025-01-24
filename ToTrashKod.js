// //https://docs.google.com/spreadsheets/d/1-qb1wmRiDWJTq5n5T3ItkWJmHjU-BhGYFe9e439MFtc/edit#gid=0

// function doGet() {
//   ExecuteScript();
// }

// function ExecuteScript()
// {
//   var configuration = LoadConfiguration();

//   //var threads = GmailApp.getInboxThreads();
//   var threads=getThreads();
//   var result = "Result:\n\r"
//   for (var i = 0; i < threads.length; i++) {
//     result = DoOperatorOnThread(threads[i], configuration, result)
//   }
//   console.log(result);
//   //return ContentService.createTextOutput(result);
// }

// function getThreads(){
//   var label = GmailApp.getUserLabelByName("AppScript/Unprocessed");
//   var threads=label.getThreads();
//   return threads;
// }

// function LoadConfiguration() {
//   var configuration = SpreadsheetApp.openById("1-qb1wmRiDWJTq5n5T3ItkWJmHjU-BhGYFe9e439MFtc");
//   //var vacations = configuration.getSheetByName("Vacations");
//   var daily = configuration.getSheetByName("Daily");
//   var SheetPlaces = daily;

//   var data = SheetPlaces.getDataRange().getValues();
//   data.shift();// Remove header 
//   var items = [];

//   data.forEach(function (row) {
//     var element = { 'Mask': row[0], 'Operator': row[1], 'Action': row[2], 'Label':row[3] }
//     items.push(element);
//   });
//   return items;
// }

// function DoActionOnThread(thread, configurationItem) {

//   var subject = thread.getFirstMessageSubject();
//   if (configurationItem.Label)
//   { 
//         var labelString="AppScriptAuto/" + configurationItem.Label
//         GmailApp.createLabel(labelString);
//         let label = GmailApp.getUserLabelByName(labelString);
//         label.addToThread(thread);

//          var labelStringUnprocessed="AppScript/Unprocessed"
//          var labelUnprocessed = GmailApp.getUserLabelByName(labelStringUnprocessed);
//          thread.removeLabel(labelUnprocessed)
//   }

//   switch (configurationItem.Action) {
//     case 'Archive':
//       thread.moveToArchive();
//       return;
//     case 'Delete':
//       thread.moveToTrash();
//       return;
//   }



// }

// function DoEqualsWork(thread, configurationItem) {
//   var subject = thread.getFirstMessageSubject();
//   if (subject == configurationItem.Mask) {
//     DoActionOnThread(thread, configurationItem);
//     return "Did *Equals* operation on " + subject + "\n\r";
//   }
//   return "";
// }

// function DoStartsWithWork(thread, configurationItem) {
//   var subject = thread.getFirstMessageSubject();
//   if (subject.startsWith(configurationItem.Mask)) {
//     DoActionOnThread(thread, configurationItem);
//     return "Did *DoStartsWithWork* operation on" + subject + "\n\r";
//   }
//   return "";
// }

// function DoContainsWork(thread, configurationItem) {
//   var subject = thread.getFirstMessageSubject();
//   if (subject.includes(configurationItem.Mask)) {
//     DoActionOnThread(thread, configurationItem);
//     return "Did *DoContainsWork* operation on" + subject;
//   }
//   return "";
// }


// function DoFromWork(thread, configurationItem) {
//   var messages = thread.getMessages();
//   var from=messages[0].getFrom();
//   Logger.log(from);
//   if (from.includes(configurationItem.Mask)) {
//     DoActionOnThread(thread, configurationItem);
//     return "Did *DoFromWork* operation on" + from;
//   }
//   return "";
// }

// function DoOperatorOnThread(thread, configuration, result) {
//   for (var i = 0; i < configuration.length; i++) {
//     switch (configuration[i].Operator) {
//       case 'Equals':
//         result += DoEqualsWork(thread, configuration[i]);
//         break;
//       case 'StartsWith':
//         result += DoStartsWithWork(thread, configuration[i]);
//         break;
//       case 'Contains':
//         result += DoContainsWork(thread, configuration[i]);
//         break;
//       case 'From':
//         result += DoFromWork(thread, configuration[i]);
//         break;
      

//     }
//   }
//   return result;
// }


