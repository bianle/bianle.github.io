title: log4j.properties
tags: [java,log4j]
categories: java
date: 2012-03-25 18:09:17
---

```
log4j.rootCategory=DEBUG, stdout, R

#Console config 
log4j.appender.stdout=org.apache.log4j.ConsoleAppender 
log4j.appender.stdout.layout=org.apache.log4j.PatternLayout 
log4j.appender.stdout.layout.ConversionPattern=<%d> <%-5p> <%c> – %n%m(%F:%M:%L)%n

#File config 
log4j.appender.R=org.apache.log4j.RollingFileAppender 
log4j.appender.R.File=c:/jmsLog.log 
#log4j.appender.R.File=//oracle/icdc/instance/lib/jmsLog.log 
log4j.appender.R.MaxFileSize=100KB 
log4j.appender.R.MaxBackupIndex=0 
log4j.appender.R.layout=org.apache.log4j.PatternLayout 
log4j.appender.R.layout.ConversionPattern=<%d> <%-5p> <%c> – %n%m(%F:%M:%L)%n
```
