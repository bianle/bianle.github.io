title: jquery 渐变效果
date: 2012-06-02 13:55:37
categories: web前端
tags: [jquery,web,js]
---

```
<script type="text/javascript" src="jquery.js"></script>
 <script>
 function show(){
 $("#pop").animate({
 left:200,
 top:150,
 height:400,
 width:600,
 opacity:1
 },500,function(){});
 }
 function hide(){
 $("#pop").animate({
 left:0,
 top:0,
 height:0,
 width:0,
 opacity:0
 },500,function(){});
 }
 </script>
 <input type="button" onclick="show()" value="show"/>
 <input type="button" onclick="hide()" value="hide"/>
 <div id="pop" style="display:block;width:600px ;height:400px;position:absolute;left:200px;top:150px;border:0px solid red;background:blue;z-index:-1;color:#FFFFFF">
 <h3>a demo of jquery animate</h3>
 function show(){</br>
 $("#pop").animate({</br>
 left:200,</br>
 top:200,</br>
 height:400,</br>
 width:600,</br>
 opacity:1</br>
 },500,function(){});</br>
 }</br>
 function hide(){</br>
 $("#pop").animate({</br>
 left:0,</br>
 top:0,</br>
 height:0,</br>
 width:0,</br>
 opacity:0</br>
 },500,function(){});</br>
 }</br>
 </div>

```
