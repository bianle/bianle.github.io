title: js渐变效果
tags: [js,渐变]
categories: web前端
date: 2012-07-04 18:09:17
---

```
<!DOCTYPE html xmlns="<a href="http://www.w3.org/1999/xhtml">   
<head>   
<title> new document </title>   
<meta http-equiv="Content-Type" content="text/html; charset=gb2312">   
</head>   
<body>   
<center>   
<input type="button" name="fx" value="宽度渐变" id="wt-cg"/>   
<input type="button" name="fx" value="高度渐变" id="hi-cg"/>   
<input type="button" name="fx" value="透明度渐变" id="op-cg"/>   
<input type="button" name="fx" value="边框渐变" id="bd-cg"/>   
<input type="button" name="fx" value="综合渐变" id="zh-cg"/>   
<div id="demo" style="width:370px;height:100px;background-color:#00CC33;border:2px solid #990033; font-size:12px;"></div>   
</center>   
<script>   
function Animate(el, prop, opts) {   
this.el = el;   
this.prop = prop;   
this.from = opts.from;   
this.to = opts.to;   
this.time = opts.time;   
this.callback = opts.callback;   
this.animDiff = this.to - this.from;   
}   
Animate.prototype._setStyle = function(val) {   
switch(this.prop) {   
case 'opacity':   
this.el.style[this.prop] = val;   
this.el.style.filter = 'alpha(opacity=' + val * 100 + ')';   
break;   
default:   
this.el.style[this.prop] = val + 'px';   
break;   
}   
}   
Animate.prototype._animate = function() {   
var that = this;   
this.now = new Date();   
this.diff = this.now - this.startTime;   
if (this.diff > this.time) {   
this._setStyle(this.to);   
if (this.callback) {   
this.callback.call(this);   
}   
clearInterval(this.timer);   
return;   
}   
this.percentage = (Math.floor((this.diff / this.time) * 100) / 100);   
this.val = (this.animDiff * this.percentage) + this.from;   
this._setStyle(this.val);   
}   
Animate.prototype.start = function() {   
var that = this;   
this.startTime = new Date();   
clearInterval(this.timer);   
this.timer = setInterval(function() {   
that._animate.call(that);   
}, 4);   
}   
Animate.canTransition = function() {   
var el = document.createElement('foo');   
el.style.cssText = '-webkit-transition: all .5s linear;';   
return !!el.style.webkitTransitionProperty;   
}();   
window.onload = function() {   
var T$ = function(id) { return document.getElementById(id); }   
var T$$ = function(n) { return document.getElementsByName(n); }   
var demo = T$('demo'); var btns = T$$('fx');   
function disableButton() {   
for (var i = 0, len = btns.length; i < len; ++i) {   
btns[i].disabled = 'disabled';   
}   
}   
function resetButton() {   
for (var i = 0, len = btns.length; i < len; ++i) {   
btns[i].disabled = '';   
}   
}   
// 宽度渐变   
function changeWidth() {   
var fx = 'width', from = demo.clientWidth, to = from - 270, time = 1000;   
var callback = function() {   
from = demo.clientWidth; to = from + 270;   
new Animate(demo, fx, { from: from, to: to, time: time, callback: resetButton }).start();   
}   
new Animate(demo, fx, {   
from: from,   
to: to,   
time: time,   
callback: callback   
}).start();   
}   
// 高度渐变   
function changeHeight() {   
var fx = 'height', from = demo.clientHeight, to = from + 100, time = 1000;   
var callback = function() {   
from = demo.clientHeight; to = from - 100;   
new Animate(demo, fx, { from: from, to: to, time: time, callback: resetButton}).start();   
}   
new Animate(demo, fx, {   
from: from,   
to: to,   
time: time,   
callback: callback   
}).start();   
}   
// 透明度渐变   
function changeOpacity() {   
var fx = 'opacity', from = 1, to = 0, time = 1000;   
var callback = function() {   
from = 0; to = 1;   
new Animate(demo, fx, { from: from, to: to, time: time, callback: resetButton}).start();   
}   
new Animate(demo, fx, {   
from: from,   
to: to,   
time: time,   
callback: callback   
}).start();   
}   
// 边框渐变   
function changeBorderWidth() {   
var fx = 'borderWidth', from = 2, to = 10, time = 1000;   
var callback = function() {   
from = 10; to = 2;   
new Animate(demo, fx, { from: from, to: to, time: time, callback: resetButton }).start();   
}   
new Animate(demo, fx, {   
from: from,   
to: to,   
time: time,   
callback: callback   
}).start();   
}   
T$('wt-cg').onclick = function() {   
disableButton(); changeWidth();   
}   
T$('hi-cg').onclick = function() {   
disableButton(); changeHeight();   
}   
T$('op-cg').onclick = function() {   
disableButton(); changeOpacity();   
}   
T$('bd-cg').onclick = function() {   
disableButton(); changeBorderWidth();   
}   
T$('zh-cg').onclick = function() {   
disableButton(); changeWidth(); changeHeight(); changeOpacity();   
}   
//if (Animate.canTransition) {   
//demo.style.webkitTransition = 'opacity 3s ease-in';   
//demo.style.opacity = 0;   
//} else {   
//}   
}   
</script>   
</body>   
</html>    
```
