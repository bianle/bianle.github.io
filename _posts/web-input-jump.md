title: web-input-jump
tags: [html,js]
categories: web前端
date: 2012-07-04 18:09:17
---
输入序列号会将序列号分成好几段输入，模拟序列号输入方式，输入框自动跳转到下一个输入框。 下面是代码：
```
<HTML>  
  <HEAD>  
  <script   language=JavaScript>  
  function   toNext(obj,str){      
    if(obj.value.length==str&&obj.nextSibling.nextSibling.type=="text")  
    document.getElementById("yes2").select() 
  }
  function abc(){
    var c=window.clipboardData.getData('text'); 
    carray=c.split(" ");
    document.getElementById("yes1").value=carray[0];
    alert(carray[0]);
    document.getElementById("yes2").value=carray[1];
    window.clipboardData.clearData();
  }  
  </script>  
      <body>  
  <input   name="yes1"   type="text"   size="4"   maxlength="4"   onkeyup="toNext(this,4)" onbeforepaste="abc()">SN1  
  —  
      <input   name="yes2"   type="text"   size="4"   maxlength="4"   onkeyup="toNext(this,4)">SN2
      </body>  
  </html>
```
