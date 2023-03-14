<!--Category:GAS--> 
 <p align="right">
    <a href="http://productivitytools.tech/"><img src="Images/Header/ProductivityTools_green_40px_2.png" /><a> 
    <a href="https://github.com/pwujczyk/ProductivityTools.GmailRules"><img src="Images/Header/Github_border_40px.png" /></a>
</p>
<p align="center">
    <a href="http://http://productivitytools.tech/">
        <img src="Images/Header/LogoTitle_green_500px.png" />
    </a>
</p>

# ProductivityTools.GmailRules

Google App Script which I created to clear the Gmail inbox after vacations. 

Every day I am receiving a lot of emails which are handy on given day. If I am out and come back after time off, those emails are not important anymore. This script is archiving or removing emails which were valid in the past but not anymore.

## How it is working

Google sheet should contain 3 columns 
- Mask - pattern which we will compare the subject of the thread
- Operator 
  - Equals
  - StartsWith
  - Contains
- Action
  - Archive
  - Delete

![](Images/2023-03-14-16-24-27.png)

