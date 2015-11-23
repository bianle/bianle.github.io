title: js拖动
tags: [js]
categories: web前端
date: 2012-06-20 18:09:17
---
```
<html xmlns="<a href="http://www.w3.org/1999/xhtml">http://www.w3.org/1999/xhtml</a>">

<head runat="server">

<title></title>

<script language=javascript>

var intX;

var intY;

var blnDrag = false; //鼠标是否已经按下

//鼠标按下

function MouseDown(event,id) {

//鼠标按下

blnDrag = true;

intX = event.clientX - GetDiv(id).style.pixelLeft;

intY = event.clientY - GetDiv(id).style.pixelTop;

}

//鼠标拖动

function DragDiv(event,id) {

//判断鼠标是否已经按下

if (!blnDrag) {

return false;

}

else {

GetDiv(id).style.pixelLeft = event.clientX - intX;

GetDiv(id).style.pixelTop = event.clientY - intY;

}

}

//鼠标松开时

function mouseUp() {

//鼠标没有按下

blnDrag = false;

}

//得到DIV

function GetDiv(id) {

return document.getElementById(id);

}

</script>

</head>

<body >

<form id="form1" runat="server">

<div id="div1" style="CURSOR: move; POSITION: absolute;  WIDTH: 140px; HEIGHT: 112px; background-color:Red"     onmousemove="DragDiv(event,this.id)"     onmousedown="MouseDown(event,this.id)"     onmouseup="mouseUp()"></div>

</form>

</body>

</html>


```
