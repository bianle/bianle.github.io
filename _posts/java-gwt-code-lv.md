title: GWT 项目中代码分四级概念
tags: [gwt]
categories: java
date: 2013-01-10 18:09:17
---
GWT 项目中代码分四级概念：Application, Host Page, Module 和 EntryPoint。理论上讲：一个 Application, 有多个 Host Page, 一个 Host Page 有多个 Module，则一个 Module 有多个 EntryPoint,但是，实际上基本就是一个页面一个应用，也就是一个 GWT 工程。一般在 Hello World 应用中，整个一个工程是：一个页面，一个 Module，在一个EntryPoint。当然实际应用中，一般还是一个页面，而为个复用，就会为多个 Module， 而一个Module 也会有多个 EntryPoint。 
使用多个 Module 和 EntryPoint 相对都是非常简单的。创建过程同官方的新建一个Module 和 EntryPoint 没什么两样。那么我们，还有一种需求就是需要一些额外的关注：一个 application , 多个 hostpage， 因为 GWT 默认项目就只是一个 Single Host Page 的 Application。其实，我们有很多人已经注意到了这一点，并且有人 open 了一个 gwt module 来帮助大家实现这一点，它就是 gwtmultipage 。 
gwtmultipage 使用起来相当简单，简单三步就可以了： 
1.加载 org.gwtmultipage.gwtmultipage 这个 GWT module java 包到项目中 
2.修改主 Module 的 gwt.xml， EntryPoint 改成<entry -point class=’org.gwtmultipage.client.EntrypointDispatcher’/> 
当然要先加上它所在的 module<inherits name=’org.gwtmultipage.gwtmultipage’/> 
3.在你的 EntryPoint 类名前加 annotation:@UrlPatternEntryPoint(value=”module.html”) 
就可把 前端 jsp 或者 html 文件与 某个 EntryPoint 对应起来了。gwtmultipage 通过 org.gwtmultipage.client.EntrypointDispatcher 把 host page与 EntryPoint 一一对应。 
EntrypointDispatcher 在这里就是一个单入口分发器。
