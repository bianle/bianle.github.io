title: Eclipse 的控制台console乱码
tags: [eclipse,乱码]
categories: java
date: 2013-01-10 18:09:17
---

Eclipse 的控制台必须用GBK编码。
条件1，Window | Preferences | Workspace | Text file encoding | GBK编码。
这样定义的是整个工作区间的编码。
这样就把整个工作空间的编码格式定死了，但是如果某一个工程用的是不同的编码格式的话这样单独再解决。如下：
条件2，工程上 右键 | Properties | Resource | Text file encoding | UTF-8编码。或者适合的编码格式。这样定义的是整个工程的编码。
这样就把整个工程的编码格式定死了，但是如果某一个文件用的是不同的编码格式的话这样单独再解决。如下：
条件3，在某个文件上 右键| Properties | Resource | Text file encoding | UTF-8编码。或者适合的编码格式。这样定义的是单独某个文件的编码。
这里要说的是文件的实际编码格式优先用的是：第3个，其次再用2，最后先用1。有时候是123，必须满足条件。无论怎样这几种编码格式试一试就全知道了。
条件4，还有运行时编码设置如下：菜单：Run Configuration | 右侧的选项卡Common 的 Console Encoding 选择GBK编码。这个是用来控制console控制台显示，必须是GBK，就不会乱码。尽管1，2，3条件都不是GBK，只要4是GBK。控制台就不会乱码。

这样保证了工作空间和工程代码编程方式和工程里的单独文件的编码格式的不冲突。

我们想改变别人的代码的编码格式的话用如下方法：1：用记事本打开，2:改变下面的编码格式如UTF-8，3：另存为xxx.java。这样另存的编码格式就变成自己想要的编码格式了。
