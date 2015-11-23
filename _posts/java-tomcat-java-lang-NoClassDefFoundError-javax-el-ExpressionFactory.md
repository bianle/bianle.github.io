title: '启动tomcat报java.lang.NoClassDefFoundError: javax/el/ExpressionFactory'
tags: [tomcat]
categories:
  java
date: 2014-03-25 18:09:17
---

java.lang.NoClassDefFoundError: javax/el/ExpressionFactory异常
如果你按照以上目录发布工程，抛出以下异常：
1. java.lang.NoClassDefFoundError: javax/el/ExpressionFactory
2. 或打开页面后显示： HTTP Status 404 – /xxx/xxx
报404错误
Tomcat/5.5.17
则将javaee.jar包再copy一份放在tomcat目录的common\lib下就不会了。
关于用到的javaee.jar、jsf-api.jar、jsf-impl.jar、jstl-1.2.jar这四个包可以通过myeclipse中获得，
如果你安装了myeclipse5.5的话，我安装的是MyEclipse，这四个包的所在的目录是：`MyEclipse\myeclipse\eclipse\plugins\com.genuitec.eclipse.j2eedt.core_6(目录下)\data\libraryset\EE_5`
