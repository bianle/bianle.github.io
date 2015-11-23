title: frameset固定宽度并且居中显示
tags: [frameset]
categories: web前端
date: 2012-12-27 18:09:17
---

```
其实就再套了一个框架，多了红色部分的代码而已；这样就可以使得框架居中了……..

<html> 
<head> 
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> 
<title></title> 
<head> 
</head>

<frameset cols="*,1024,*" frameborder="no" border="0" framespacing="0"> 
<frame src="about:blank"></frame>

<frameset rows="130,*,40" frameborder="no" border="0" framespacing="0"> 
<frame src="top.html" name="topFrame" scrolling="No" noresize="noresize" id="topFrame" /> 
<frame src="center.html" name="mainFrame" id="mainFrame" /> 
<frame src="bottom.html" name="bottomFrame" scrolling="No" noresize="noresize" id="bottomFrame" /> 
</frameset>

<frame src="about:blank"></frame> 
</frameset>

<noframes> 
<body></body> 
</noframes> 
</html>
```
