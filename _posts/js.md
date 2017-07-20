---
title: "js"
date: 2016-11-08 17:29:14
tags: js
categories: js
---

## YUI Compressor 2.4.8 failed on jQuery 2.2

https://github.com/yui/yuicompressor/issues/234


## js函数前面的加号叹号波浪号

如：
```
+function(){}(); 
```
这里的加号，也可以替换成!,~等其他一元操作符，其效果相当于：
```
(function() { console.log("Foo!"); })();  
// or  
(function() { console.log("Foo!"); }()); 
```
如果没有这个加号的话，解析器会认为function是一个函数声明的开始，而后面（）将会导致语法错误。在function前面加上+号时，就变成了一个函数表达式，而函数表达式后面又添加了一个()就变成了一个立即执行的函数了
参考：http://stackoverflow.com/questions/13341698/javascript-plus-sign-in-front-of-function-name
