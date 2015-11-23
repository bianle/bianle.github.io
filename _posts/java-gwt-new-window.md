title: gwt新窗口打开url设置
tags: [gwt]
categories: java
date: 2012-12-05 18:09:17
---
在gwt项目中，需要在新窗口打开url时，最简单的就是使用window对象的open方法。
在项目开发中，遇到这样一个问题，以新窗口打开的页面缺少菜单、地址栏、工具栏等，简单的说法就是模态窗口。
由于一直是在firefox中进行测试，导致这个问题没有被察觉，firefox是将新窗口在新标签中打开，因此不存在模态的情况，
但是在ie下此问题就浮出水面了。
原始代码是类似这个样子的：
Window.open(newURL, "_blank", null);
就是null参数控制新窗口为模态的，改为下面的样子就没有问题了
Window.open(newURL, "_blank", "");
参考一下open方法的文档就什么都明白了

>void com.google.gwt.user.client.Window.open(String url, String name, String features)
Opens a new browser window. The “name” and “features” arguments are specified here.
Parameters:
url the URL that the new window will display
name the name of the window (e.g. “_blank”)
features the features to be enabled/disabled on this window

window.open (‘page.html’, ‘newwindow’, ‘height=100, width=400, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no’)
 
window.open 弹出新窗口的命令；
‘page.html’ 弹出窗口的文件名；
‘newwindow’ 弹出窗口的名字（不是文件名），非必须，可用空”代替；
height=100 窗口高度；
width=400 窗口宽度；
top=0 窗口距离屏幕上方的象素值；
left=0 窗口距离屏幕左侧的象素值；
toolbar=no 是否显示工具栏，yes为显示；
menubar，scrollbars 表示菜单栏和滚动栏。
resizable=no 是否允许改变窗口大小，yes为允许；
location=no 是否显示地址栏，yes为允许；
status=no 是否显示状态栏内的信息，yes为允许；
