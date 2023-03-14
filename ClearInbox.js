function myFunction() {

  var subjectsToArchive = ['80% of budget reached']
  var subjectsStartToArchive=['GCP CES Daily Report']

  var threads = GmailApp.getInboxThreads();
  for (var i = 0; i < threads.length; i++) {

    var subject = threads[i].getFirstMessageSubject()
    Logger.log(subject);
    if (subjectsToArchive.includes(subject)) {
      //threads[i].moveToArchive();
    }
    for(var j=0;j<subjectsStartToArchive.length;j++){
      if (subject.startsWith(subjectsStartToArchive[j])){
        threads[i].moveToArchive();
      }
    }
  }
}
