<!--Category:GAS--> 
 <p align="right">
    <a href="http://productivitytools.top/gmail-rules/"><img src="Images/Header/ProductivityTools_green_40px_2.png" /><a> 
    <a href="https://github.com/pwujczyk/ProductivityTools.GmailRules"><img src="Images/Header/Github_border_40px.png" /></a>
</p>
<p align="center">
    <a href="http://http://productivitytools.tech/">
        <img src="Images/Header/LogoTitle_green_500px.png" />
    </a>
</p>

# Gmail Rules

Google App Script that allows to filter gmail emails in more flexible way. 
<!--more-->

## How to make it working

In Gmail rules one rule needs to be added:

![](Images/20250124190157.png)

Google sheet should contain columns 
- Mask - pattern which we will compare the subject of the thread
- Operator 
  - Equals
  - StartsWith
  - Contains
  - From
- Action
  - Archive
  - Delete
- Label

![](Images/2023-03-14-16-24-27.png)


## Important
Script supports two Google Sheets 
- Daily 
- Vacations 
Both of them could have different rules defined
  


## Direct invocation of CLASP

```
C:\Users\pwujczyk\AppData\Roaming\npm\clasp.cmd pull
```

git
```
cd C:\users\pwujczyk\.ssh
ssh-add.exe .\id_rsa

```
