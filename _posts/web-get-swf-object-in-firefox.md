title: 在Firefox中如何获取网页里的SWF对象
date: 2012-06-04 18:09:17
categories: web前端
tags: [swf,flash,firefox]
---
我们经常会碰到flash和网页中的js脚本交互的的情况，一般的flash中使用ExternalInterface就可以让as脚本和html容器中的js脚本互相调用。但由于不同浏览器对DOM解析不同，导致有时候无法获取网页中的SWF对象。
下面是网页中插入flash的代码，应该再熟悉不过了：
```
<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
 codebase="http://download.macromedia.com/pub/shockwave/cabs/
 flash/swflash.cab#version=7,0,19,0" name="flashrek" width="285" height="200" id="flashrek">

<param name="movie" value="flashrek.swf" />

<param name="quality" value="high" />

<embed src="flashrek.swf" width="285" height="200" quality="high"
 pluginspage=http://www.macromedia.com/go/getflashplayer type="application/x-shockwave-flash"></embed>

</object>


```

如果用document.getElementById方法来获取flash对象的话，IE中正常而firefox中却不行。这主要是firefox与IE解析DOM的差异导致的，下面给出一种解决方法，同时满足不同浏览器的需求：

```
function getSWF(name){

var e=document.getElementById(name);

return (navigator.appName.indexOf("Microsoft") != -1)?e:e.
 getElementsByTagName("embed")[0];

}


```

使用方法：getSWF("flashrek")。其中的参数是插入时设置的flash的ID。
