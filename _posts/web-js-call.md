title: 'js call'
tags: [js]
categories: web前端
date: 2012-06-20 18:09:17
---
```
<script>

function MyObj(){  }

MyObj.prototype.myMethod = function(){

alert(this);

}

function test(){

new MyObj().myMethod(1);

MyObj.prototype.myMethod(1);

MyObj.prototype.myMethod.call(1);

}

</script>
```
 
运行结果是：
>[object Object]
>[object Object]
>1
