title: Css3 transition动画效果
date: 2012-06-04 09:44:56
categories: web前端
tags: [html5,css3,web]
---
曾经也尝试过css3的一些新属性，比如圆角、多边框、文字投影、边框阴影，在很大程度上加快了前端开发的速度（—_—如果不考虑IE的话），今天见到了一个新东东，transition，试了一下，太强大了，几行简单的css，就实现了酷炫的动画效果，真是cool！关于transition的更多，请点击http://www.w3.org/TR/css3-transitions/

1. 先看圆角、阴影（Border-radius）
Border-radius：Apx Bpx Cpx Dpx;分别是左上角，右上角，右下角，左下角的圆角半径！
Border-shadow: <length> <length> <length> <length> || <color>;分别代表阴影水平偏移值（可取正负值）；阴影垂直偏移值（可取正负值）；阴影模糊值；阴影颜色
例子：（圆角，阴影）
```
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
 <head>
   <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
   <title>css3圆角，阴影</title>
   <style type="text/css">
   body{background-color:#E9E9E9;}
		.div2{width:100px;height:100px;border:1px solid red;border-radius:2px 4px 6px 20px;
		-moz-border-radius: 2px 4px 6px 20px;-khtml-border-radius: 2px 4px 6px 20px;-webkit-border-radius: 2px 4px 6px 20px;
		/*border-radius：四个参数分别为四个角的圆角度数*/
		-webkit-box-shadow:5px 3px 6px #999;-moz-box-shadow:5px 3px 6px #999;
		/*box-shadow：四个参数:阴影水平偏移量｛可取正负值｝，阴影垂直偏移量（可取正负值）；阴影模糊值；阴影颜色*/
		text-shadow:5px 2px 6px #000;
		text-overflow:ellipsis;
		}
	</style>
 </head>
 <body>
<div>不同的圆角</div>
  </body>
</html>
```

2. 下面就一步一步实现图片墙动画效果，这里说明一下，对于此transition，IE浏览器可以直接放弃了，firefox虽然平时挺那个的，这里貌似也靠边站了，这个效果最好的浏览器是chrome，safari4，也就是webkit，firefox3.5勉强凑合，有盒阴影和旋转效果，但是没有动画！
先看例子：(css3倾斜的图片)

```
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
 <head>
   <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
   <title> transition动画效果</title>
   <style type="text/css">
   body{background-color:#E9E9E9;}
		.div3{border:1px solid #bfbfbf;padding:2px;width:120px;height:120px;margin:50px;-webkit-transform:rotate(10deg); -moz-transform:rotate(10deg); transform:rotate(10deg);-webkit-box-shadow:5px 3px 3px #999; -moz-box-shadow:5px 3px 3px #999; box-shadow:5px 3px 3px #999; }
	</style>
 </head>
 <body>
<div>
	<img src="http://www.qdway.com/wp-content/uploads/2011/12/aab.jpg" title="头像" alt="头像"/>
</div>
  </body>
</html>
```

主要运用到的代码是：
```
-webkit-transform:rotate(10deg); -moz-transform:rotate(10deg); transform:rotate(10deg);-webkit-box-shadow:5px 3px 3px #999; -moz-box-shadow:5px 3px 3px #999; box-shadow:5px 3px 3px #999;
```
首先应该知道的是webkit表示webkit核心的浏览器，是其私有属性，作用于chrome和Safari浏览器，moz是Firefox浏览器的私有属性。
transform中文意思转换，含有多个属性值，其中rotate表示旋转，其他一些属性如scale-尺寸放大缩小（本文将会用到），skew表示倾斜角度，translate表移动距离。例如，本例中，rotate(10deg)表示顺时针旋转10度，如果要逆时针旋转，使用负值就可以了。
box-shadow表示盒阴影，其有四个参数，第一个参数表示水平偏移，例如2px表示投影右偏移2像素，第二个参数表示垂直偏移，2px表示投影向下偏移2像素，第三个参数表示模糊的大小，第四个参数为rgba颜色值
3. 使用transition给单个图片添加悬停动画
有别于上面基础效果CSS代码，这里需要添加一个transition的样式，告诉浏览器，这里要有动画效果。先看一下此相关的CSS代码：
```
.div3{border:1px solid red;width:150px;height:150px;margin:50px;-webkit-transform:rotate(10deg); -moz-transform:rotate(10deg); transform:rotate(10deg);-webkit-box-shadow:5px 3px 3px #999; -moz-box-shadow:5px 3px 3px #999; box-shadow:5px 3px 3px #999;-webkit-transition:all 0.5s ease-in;}
.div3:hover{border-color:#9a9a9a; -webkit-transform:rotate(-50deg); -moz-transform:rotate(-50deg); transform:rotate(-50deg);}
```

代码部分最关键的就是：`-webkit-transition:all 0.5s ease-in`;目前而言，transition仅webkit核心的浏览器支持，所以此效果仅在chrome或是Safari下有。
transiton属性有这几个值：
```
transition-property :* //指定过渡的性质，比如transition-property:backgrond 就是只指定backgound参与这个过渡
transition-duration:*//指定这个过渡的持续时间
transition-delay:* //延迟过渡时间
transition-timing-function:*//指定过渡类型，有ease | linear | ease-in | ease-out | ease-in-out | cubic-bezier
```
熟悉flash显示与动画编程的应该知道，这里的过渡类型的含义与flash中缓动类型（远不及flash丰富）是一致的：
```
linear //线性过度
ease-in //由慢到快
ease-out //由快到慢
ease-in-out //由慢到快在到慢
```
额外的些知识：timing-funciton的几种过度类型都是基于cubic-bezier的某些特定数值。比如ease-in-out的类型它也可以写成cubic-bezier(0.42, 0, 0.58, 1.0)。
transition还支持CSS伪类。
所以，-webkit-transition:all 0.5s ease-in表示的意思就是所有的属性都执行过渡效果，像角度啊，投影大小，边框色或是下面要讲到的比例啦等，执行时间为0.5秒，过渡动画类型为先慢后快。
单张图片的旋转拉近动画效果
鼠标经过图片，图片不仅旋转，而且图片的投影拉长，图片比例变大，于是形成了图片从墙面上浮起来的炫酷效果。
```
.div4{width:130px;height:130px;padding:5px;margin:40px;border:1px solid #bfbfbf;
-webkit-transform:rotate(10deg);
-moz-transform:rotate(10deg);
transform:rotate(10deg);
-webkit-box-shadow:2px 2px 3px rgba(135, 139, 144, 0.4);
-moz-box-shadow:2px 2px 3px rgba(135, 139, 144, 0.4); 
box-shadow:2px 2px 3px rgba(135, 139, 144, 0.4);
-webkit-transition:all 0.5s ease-in;
    }
.div4:hover{
border-color:#9a9a9a;
-webkit-box-shadow:15px 15px 20px rgba(50, 50, 50, 0.4);
-moz-box-shadow:15px 15px 20px rgba(50, 50, 50, 0.4); 
box-shadow:15px 15px 20px rgba(50, 50, 50, 0.4);
-webkit-transform:rotate(0deg) scale(1.05);
-moz-transform:rotate(0deg) scale(1.05); 
transform:rotate(0deg) scale(1.05);
}
```
对比三和五部分的CSS代码，您会发现，这里的CSS的hover部分发生了些变化，首先增加的盒阴影样式，box-shadow:15px 15px 20px rgba(50, 50, 50, 0.4);加大了投影的偏移，以及模糊的大小，同时投影的颜色也加深了。另外就是transform:rotate(0deg) scale(1.05);增加了scale属性，scale(1.05)表示1.05倍于原来的尺寸显示。而这些变化在webkit核心的浏览器下都是动画显示的，于是就有了图片的拉伸悬浮效果。
————————————————-华丽丽的昏割线————————————————-
例子：（Css3 transition动画效果，建议使用chrome，safari4浏览器观看）
```
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
 <head>
   <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
   <title>Css3 transition动画效果</title>
   <style type="text/css">
   body{background-color:#E9E9E9;}
		.div4{padding:2px;width:120px;height:120px;margin:40px;border:1px solid #bfbfbf;
		-webkit-transform:rotate(10deg);-moz-transform:rotate(10deg); transform:rotate(10deg);
		-webkit-box-shadow:2px 2px 3px rgba(135, 139, 144, 0.4); -moz-box-shadow:2px 2px 3px rgba(135, 139, 144, 0.4); box-shadow:2px 2px 3px rgba(135, 139, 144, 0.4);
    -webkit-transition:all 0.5s ease-in;
		}
		.div4:hover{
    border-color:#9a9a9a;
    -webkit-box-shadow:15px 15px 20px rgba(50, 50, 50, 0.4); -moz-box-shadow:15px 15px 20px rgba(50, 50, 50, 0.4); box-shadow:15px 15px 20px rgba(50, 50, 50, 0.4);
    -webkit-transform:rotate(0deg) scale(1.05); -moz-transform:rotate(0deg) scale(1.05); transform:rotate(0deg) scale(1.05);
}
	</style>
 </head>
 <body>
<div>
	<img src="http://www.qdway.com/wp-content/uploads/2011/12/aab.jpg" title="头像" alt="头像"/>
</div>
  </body>
</html>
```
