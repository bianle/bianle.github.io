title: Jquery的$命名冲突
tags: [jquery]
categories: web前端
date: 2012-10-16 18:09:17
---
在Jquery中，$是JQuery的别名，所有使用$的地方也都可以使用JQuery来替换，如$(‘#msg’)等同于JQuery(‘#msg’)的写法。然而，当我们引入多个js库后，在另外一个js库中也定义了$符号的话，那么我们在使用$符号时就发生了冲突。下面以引入两个库文件jquery.js和prototype.js为例来进行说明。
第一种情况：jquery.js在prototype.js之后进行引入,如：
<script src="prototype.js" type="text/javascript"/><script src="jquery.js" type="text/javascript"/>
 
在这种情况下,我们在自己的js代码中如下写的话：
$('#msg').hide(); 
 
$永远代表的是jquery中定义的$符号，也可以写成JQuery(‘#msg’).hide();如果想要使用prototype.js中定义的$,我们在后面再介绍。
第二种情况：jquery.js在prototype.js之前进行引入,如：
<script src="jquery.js" type="text/javascript"/><script src="prototype.js" type="text/javascript"/>
 
在这种情况下,我们在自己的js代码中如下写的话：
$('#msg').hide(); 
 
$此时代表的prototype.js中定义的$符号，如果我们想要调用jquery.js中的工厂选择函数功能的话，只能用全称写法JQuery(‘#msg’).hide().
下面先介绍在第一种引入js库文件顺序的情况下，如何正确的使用不同的js库中定义的$符号。
一.使用JQuery.noConflict()
该方法的作用就是让Jquery放弃对$的所有权，将$的控制权交还给prototype.js,因为jquery.js是后引入的，所以最后拥有$控制权的是jquery。它的返回值是JQuery。当在代码中调用了该 方法以后，我们就不可以使用$来调用jquery的方法了，此时$就代表在prototype.js库中定义的$了。如下：
JQuery.noConflict(); //此处不可以再写成$('#msg').hide(),此时的$代表prototype.js中定义的$符号。 
JQuey('#msg').hide(); 
 
自此以后$就代表prototype.js中定义的$,jquery.js中的$无法再使用,只能使用jquery.js中$的全称JQuery了。
二.自定义JQuery的别名 
如果觉得第一种方法中使用了JQuery.noConflict()方法以后,只能使用JQuery全称比较麻烦的话，我们还可以为JQuery重定义别名。如下：
var $j=JQuery.noConflict(); $j('#msg').hide();//此处$j就代表JQuery 
 
自此以后$就代表prototype.js中定义的$,jquey.js中的$无法再使用,只能使用$j来作为jquey.js中JQuery的别名了。
三.使用语句块，在语句块中仍然使用jquery.js中定义的$，如下：
JQuery.noConflict(); JQuery(document).ready(function($){ $('#msg').hide();//此时在整个ready事件的方法中使用的$都是jquery.js中定义的$. 
});
 
 
或者使用如下语句块：
(function($){ ..... $('#msg').hide();//此时在这个语句块中使用的都是jquery.js中定义的$. 
})(JQuery)
 
如果在第二种引入js库文件顺序的情况下,如何使用jquery.js中的$,我们还是可以使用上面介绍的语句块的方法，如：
<script src="jquery.js" type="text/javascript"/><script src="prototype.js" type="text/javascript"/><script type="text/javascript"> (function($){ ..... $('#msg').hide();//此时在这个语句块中使用的都是jquery.js中定义的$. 
})(JQuery) </script>
 
 
这种使用语句块的方法非常有用，在我们自己写jquery插件时,应该都使用这种写法，因为我们不知道具体工作过程中是如何顺序引入各种js库的,而这种语句块的写法却能屏蔽冲突。
