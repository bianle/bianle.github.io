title: linux配置环境变量
tags: [linux,环境变量]
categories: web前端
date: 2014-03-25 18:09:17
---
```
\#vi  /etc/profile
```
在该profile文件中添加：

>JAVA_HOME=/usr/java/jdk1.6.0_10
JRE_HOME=/usr/java/jdk1.6.0_10/jre
PATH=$PATH:$JAVA_HOME/bin:$JRE_HOME/bin
CLASSPATH=.:$JAVA_HOME/lib/jt.jar:$JAVA_HOME/lib/tools.jar:$JRE_HOME/lib(注意：前面的.: ，linux中的；号为：号)
export JAVA_HOME JRE_HOME PATH CLASSPATH

添加完毕保存退出
```
\#source /etc/profile
```
