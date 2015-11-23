title: Linux和Windows下的Tomcat JVM内存设置
tags: [java,tomcat]
categories: java
date: 2013-01-17 18:09:17
---
# Linux下修改Tomcat JVM内存设置:

要添加在Tomcat的bin下catalina.sh里，位置cygwin=false前。注意引号要带上,红色的为新添加的.

```
\#OSspecificsupport.$var_must_besettoeithertrueorfalse.

JAVA_OPTS="-Xms256m-Xmx512m-Xss1024K-XX:PermSize=128m-XX:MaxPermSize=256m"

cygwin=false 
```

# windows下修改Tomcat JVM内存设置:

情况一:

解压版本的Tomcat,要通过startup.bat启动Tomcat才能加载配置

要添加在Tomcat的bin下catalina.bat里

remGuessCATALINA_HOMEifnotdefined  

setCURRENT_DIR=%cd%后面添加,红色的为新添加的.

```
setJAVA_OPTS=-Xms256m-Xmx512m   
-XX:PermSize=128M-XX:MaxNewSize=256m  
-XX:MaxPermSize=256m-Djava.awt.headless=true 
```

情况二:

安装版的Tomcat下没有catalina.bat

windows服务执行的是binTomcat.exe.他读取注册表中的值,而不是catalina.bat的设置.

修改注册表

`HKEY_LOCAL_MACHINESOFTWARE  ApacheSoftwareFoundationTomcatServiceManager 
Tomcat5ParametersJavaOptions `

原值为

```
-Dcatalina.home="C:ApacheGroupTomcat5.0" 
-Djava.endorsed.dirs="C:ApacheGroup 
Tomcat5.0commonendorsed" 
-Xrs 
```

加入

```
-Xms300m
-Xmx350m   
```
重起Tomcat服务,设置生效
