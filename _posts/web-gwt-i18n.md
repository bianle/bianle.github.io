title: gwt国际化
tags: [gwt,i18n]
categories: web前端
date: 2012-12-15 18:09:17
---
方法如下：
1、在.gwt.xml文件里加入
```
<inherits name=”com.google.gwt.i18n.I18N”/>
<extend-property name=”locale” values=”zh_CN”/>
<extend-property name=”locale” values=”en”/>
```
这里是在告诉gwt，现在需要使用中文和英文两种方法了
2、再在.html文件中加入
```
<meta name=”gwt:property” content=”locale=zh_CN”>
```
就可以了
