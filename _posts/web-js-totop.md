title: JS返回顶部
tags: [js]
categories: web前端
date: 2012-07-12 18:09:17
---
本文介绍三款简单的返回页面顶部代码，可以使用简单的HTML锚标记，也可使用Javascript Scroll函数动态返回，其它的还有悬浮脚本等有点复杂了，本文不再介绍，大家根据自己需要选择其中的一种即可，总之简约最美的，能减少代码就减少代码，能不调用的就别调用，要不是天缘博客的文章都是牛长也不会添加这个功能。
一、使用锚标记返回页面顶部
使用HTML锚标记最简单，就是看起来有点不好看，点击后会在地址栏显示这个锚标记，其它的倒没什么。
页面顶部放置：
<a name="top" id="top"></a>
放置位置在<body>标签之后随便找个地方放都可以，只要靠近顶部即可。
页面底部放置：
<a href="#top" target="_self">返回顶部</a>
二、使用Javascript Scroll函数返回顶部
scrooll函数用来控制滚动条的位置，有两种很简单的实现方式：
方式1：
1<a href="javascript:scroll(0,0)">返回顶部</a>
scroll第一个参数是水平位置，第二个参数是垂直位置，比如要想定位在垂直50像素处，改成scroll(0,50)就可以了。
方式2：
本方式是渐进式返回顶部，要好看一些，代码如下：
1functionpageScroll() { 2window.scrollBy(0,-10); 3scrolldelay = setTimeout(‘pageScroll()’,100); 4} 56<a href="pageScroll();">返回顶部</a>
这样就会动态返回顶部，不过虽然返回到顶部但是代码仍在运行，还需要在pageScroll函数加一句给停止掉。
1if(document.documentElement.scrollTop==0) clearTimeout(scrolldelay);三、使用Onload加上scroll功能实现动态返回顶部
1、首先在网页BODY标签结束之前加上：
<div id="gotop">返回顶部</div>
2、再调用以下JS脚本部分（本脚本非天缘原创，早前来源于Z-BLOG官方论坛上收集，源包未带作者链接，如果原作者看到敬请留言添加）：
01BackTop=function(btnId){ 02 varbtn=document.getElementById(btnId); 03 vard=document.documentElement; 04 window.onscroll=set; 05 btn.onclick=function(){ 06 btn.style.display="none"; 07 window.onscroll=null; 08 this.timer=setInterval(function(){ 09 d.scrollTop-=Math.ceil(d.scrollTop*0.1); 10 if(d.scrollTop==0) clearInterval(btn.timer,window.onscroll=set); 11 },10); 12 }; 13 functionset(){btn.style.display=d.scrollTop?’block':"none"} 14}; 15BackTop(‘gotop’);
对Z-BLOG而言，可以放到$(document).ready(function(){….函数中，也可以独立存成一个js文件，比如gotop.js，再通过：
<SCRIPT src="/js/gotop.js" type=text/javascript></SCRIPT>
来调用，当然了位置最好放在“返回顶部”标签的下面，该调用方法已假设路径为JS，其它位置请自行修改。
补充：
上述返回顶部代码都是文字式样的，也可以把文字更换为漂亮一点的图标，另外还有悬浮状的返回顶部代码（就是页面滚动时，返回顶部图标也会跟着跑的那种），需要使用到层等，搞的有点复杂了，本文暂不列出。
