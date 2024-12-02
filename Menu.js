function onOpen(e) {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('CleanInbox')
      .addItem('PWExecute', 'ExecuteScript')
      .addItem('Validate rules', 'checkRules')
      .addSeparator()
      .addItem('Set up and start auto processing', 'configureTriggers')
      .addSeparator()
      .addItem('Stop automatic processing', 'removeTriggers')
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
