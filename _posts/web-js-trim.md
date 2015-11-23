title: 自定义js的trim()方法
tags: [js,trim]
categories: web前端
date: 2013-01-10 18:09:17
---
去除字符串左右两端的空格，在vbscript里面可以轻松地使用 trim、ltrim 或 rtrim，但在js中却没有这3个内置方法，需要手工编写。下面的实现方法是用到了正则表达式，效率不错，并把这三个方法加入String对象的内置方法中去。

写成类的方法格式如下：（str.trim();）
```
<script language="javascript">
 String.prototype.trim=function(){
     return this.replace(/(^s*)|(s*$)/g, "");
 }
 String.prototype.ltrim=function(){
     return this.replace(/(^s*)/g,"");
 }
 String.prototype.rtrim=function(){
     return this.replace(/(s*$)/g,"");
 }
 </script>
```
 写成函数可以这样：(trim(str))
```
<script type="text/javascript">
 function trim(str){ //删除左右两端的空格
      return str.replace(/(^s*)|(s*$)/g, "");
 }
 function ltrim(str){ //删除左边的空格
      return str.replace(/(^s*)/g,"");
 }
 function rtrim(str){ //删除右边的空格
      return str.replace(/(s*$)/g,"");
 }
 </script>

```
