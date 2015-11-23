title: js禁用只读文本框获得焦点时的回格键
tags: [html,js]
categories: web前端
date: 2012-08-16 18:09:17
---
只读的文本框,当鼠标焦点在文本框里面的时候按回退键(backSpace),会退回到前一个页面,将以下的脚本放入页面中即可。
```
<script>


document.documentElement.onkeydown = function(evt){
  
var b = !!evt, oEvent = evt || window.event;

  
if (oEvent.keyCode == 8) {

  
var node = b ? oEvent.target : oEvent.srcElement;

  
var reg = /^(input|textarea)$/i, regType = /^(text|textarea)$/i;

  
if (!reg.test(node.nodeName) || !regType.test(node.type) || node.readOnly || node.disabled) {

  
if (b)

  
{

  
oEvent.stopPropagation();

  
} 

  
else

  
{

  
oEvent.cancelBubble = true;

  
oEvent.keyCode = 0;

  
oEvent.returnValue = false;

  
}

  
}

  
}

  
}


</script>
```
