function onOpen(e) {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('PT.GmailRules')
      .addItem('Execute for Unprocessed', 'ExecuteForUnprocessed')
      .addItem('Execute for Inbox', 'ExecuteForInbox')
      .addItem('Execute for Inbox after vacations', 'ExecuteForInboxAfterVacations')
      .addSeparator()
      .addItem('Doing nothing', 'dd')
      .addSeparator()
      .addSubMenu(
          ui.createMenu('Debug')
              .addItem('Run processing now', 'autoProcessMail3')
              .addItem('Start debug processing run', 'debugAutoProcessMail'))
      .addSubMenu(ui.createMenu('Logs')
                      .addItem('Cleanup logs', 'cleanupLogs')
                      .addItem('Delete all logs', 'deleteLogs'))
      .addSubMenu(
          ui.createMenu('Experimental')
              .addItem('Disable non-matching rules', 'disableNonMatchingRules'))
      .addToUi();
}
