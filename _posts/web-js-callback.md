title: js回调函数
tags:
  - js
categories:
  - web前端
date: 2012-06-20 10:26:00
---
```
<html>

<head>

<title>回调函数(callback)</title>

<script language="javascript" type="text/javascript">

function a(callback)  {

alert("我是parent函数a！");

alert("调用回调函数");

callback();

}

function b(){

alert("我是回调函数b");

}

function c(){

alert("我是回调函数c");

}

function test()  {

a(b);

a(c);

}

</script>

</head>

<body>

<h1>学习js回调函数</h1>

<button onClick=test()>click me</button>

<p>应该能看到调用了两个回调函数</p>

</body>

</html>


```
