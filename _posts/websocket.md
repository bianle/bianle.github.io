title: websocket
date: 2015-12-02 18:57:39
categories: websocket
tags: websocket
---

## 概述

WebSocket是HTML5开始提供的一种在单个 TCP 连接上进行全双工通讯的协议。WebSocket通讯协议于2011年被IETF定为标准RFC 6455，WebSocketAPI被W3C定为标准。
在WebSocket API中，浏览器和服务器只需要做一个握手的动作，然后，浏览器和服务器之间就形成了一条快速通道。两者之间就直接可以数据互相传送。


## 背景

现在，很多网站为了实现推送技术，所用的技术都是轮询。轮询是在特定的的时间间隔（如每1秒），由浏览器对服务器发出HTTP request，然后由服务器返回最新的数据给客户端的浏览器。这种传统的模式带来很明显的缺点，即浏览器需要不断的向服务器发出请求，然而HTTP request的header是非常长的，里面包含的数据可能只是一个很小的值，这样会占用很多的带宽和服务器资源。
而比较新的技术去做轮询的效果是Comet，使用了AJAX。但这种技术虽然可达到双向通信，但依然需要发出请求，而且在Comet中，普遍采用了长链接，这也会大量消耗服务器带宽和资源。

面对这种状况，HTML5定义了WebSocket协议，能更好的节省服务器资源和带宽并达到实时通讯。

## 优点

和现在主流web通信方式对比websocket优势

### 轮询

客户端定时向服务器发送Ajax请求，服务器接到请求后马上返回响应信息并关闭连接。 
优点：后端程序编写比较容易。 
缺点：请求中有大半是无用，浪费带宽和服务器资源。 
实例：适于小型应用。
A:我是xxx的机主我想查一下当月的花费
B:暂无当月话费请稍后查询挂机
A:我是xxx的机主查话费
B:暂无
A:我是
B:200

### 长轮询

客户端向服务器发送Ajax请求，服务器接到请求后hold住连接，直到有新消息才返回响应信息并关闭连接，客户端处理完响应信息后再向服务器发送新的请求。 
优点：在无消息的情况下不会频繁的请求，耗费资源小。 
缺点：服务器hold连接会消耗资源，返回数据顺序无保证，难于管理维护。 
实例：WebQQ、Hi网页版、Facebook IM。
A:我是xxx机主查话费
B:请不要挂机查询中
...
B:200挂机
A:请查一下上个月话费
B:不要挂机
B:300

### 长连接

在页面里嵌入一个隐蔵iframe，将这个隐蔵iframe的src属性设为对一个长连接的请求或是采用xhr请求，服务器端就能源源不断地往客户端输入数据。 
优点：消息即时到达，不发无用请求；管理起来也相对方便。 
缺点：服务器维护一个长连接会增加开销。 没有方法可用来实现可靠的错误处理或是跟踪连接的状态，因为所有的连接和数据都是由浏览器通过HTML标签来处理的，因此你没有办法知道连接何时在哪一端已被断开了。
实例：Gmail聊天
A:查话费
B:当月200
B:上月300
B:积分50000
B:这是广告
B:你好啊
B:xxxx
B:balabala

### Flash Socket

在页面中内嵌入一个使用了Socket类的 Flash 程序JavaScript通过调用此Flash程序提供的Socket接口与服务器端的Socket接口进行通信，JavaScript在收到服务器端传送的信息后控制页面的显示。 
优点：实现真正的即时通信，而不是伪即时。 
缺点：客户端必须安装Flash插件；非HTTP协议，无法自动穿越防火墙。 
实例：网络互动游戏。

### Websocket

优点:
1.	相比轮询，只需要握手一次，不用客户端每次都请求(建立http协议,关闭http协议)，不需要每次都在head中包含无效信息，减少网络资源消耗。
2.	相比长连接，websocket经过一次握手后,物理层建立一个tcp连接,不用在网络层维护一个长连接从而减少开销。
3.	相比flashsocket，websocket是独立的基于tcp的协议，通过80端口通信可绕过应用防火墙。
4.	服务器可以主动传送数据给客户端。而不是“请求-响应”模式。
缺点:
1.	WebSocket 规范目前还处于草案阶段，也就是它的规范和 API 还是有变动的可能
2.	另外的一个风险就是微软的 IE 作为占市场份额最大的浏览器，和其他的主流浏览器相比，对 HTML5 的支持是比较差的，这是我们在构建企业级的 Web 应用的时候必须要考虑的一个问题

## 握手协议

在实现websocket连线过程中，需要透过浏览器发出websocket连线请求，然后服务器发出回应，这个过程通常称为“握手”（handshaking）。
PS:后期的版本大多属于功能上的扩充，例如使用第7版的握手协议同样也适用于第8版的握手协议。

1. 例子
浏览器请求

>GET / HTTP/1.1
Upgrade: websocket
Connection: Upgrade
Host: example.com
Origin: null
Sec-WebSocket-Key: sN9cRrP/n9NdMgdcy2VJFQ==
Sec-WebSocket-Version: 13

服务器回应

>HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: fFBooB7FAkLlXgRSz0BT3v4hq5s=
Sec-WebSocket-Origin: null
Sec-WebSocket-Location: ws://example.com/


2. 原理

在请求中的“Sec-WebSocket-Key”是随机的，服务器端会用这些数据来构造出一个SHA-1的信息摘要。

把“Sec-WebSocket-Key”加上一个魔幻字符串“258EAFA5-E914-47DA-95CA-C5AB0DC85B11”。使用SHA-1加密，之后进行BASE-64编码，将结果做为“Sec-WebSocket-Accept”头的值，返回给客户端。

## 浏览器

实现websocket的协议，浏览器扮演着一个很重要的角色。所有最新的浏览器支持最新规范（RFC 6455）的WebSocket协议。一个详细的测试报告[1]列出了这些浏览器支持的Websocket版本。

浏览器支持现状

协议               | 发布日期                     | IE | Firefox[2]（个人电脑） | Firefox (Android) | Chrome（个人电脑，手机） | Safari（Mac, iOS） | Opera（个人电脑，手机） | Android浏览器
---|---|---|---|---|---|---|---|---
hixie-75           | 2010年2月4日                 |    |                        |                   |                        4 |              5.0.0 |                         |
hixie-76 hybi-00   | 2010年5月10日，2010年5月23日 |    |        4.0（已被禁用） |                   |                        6 |              5.0.1 | 11.00(已被禁用)         |
7 hybi-07          | 2011年4月22日                |    |                      6 |                   |                          |                    |                         |
8 hybi-10          | 2011年7月11日                |    |                      7 |                 7 |                       14 |                    |                         |
13 RFC 6455        | 2011年12月                   | 10 |                     11 |                11 |                       16 |                  6 | 12.10                   |   4.4

## 服务器
在服务器方面，网上都有不同对websocket支持的服务器：

php - http://code.google.com/p/phpwebsocket/
jetty - http://jetty.codehaus.org/jetty/（版本7开始支持websocket）
netty - http://www.jboss.org/netty
ruby - http://github.com/gimite/web-socket-ruby
Kaazing - http://www.kaazing.org/confluence/display/KAAZING/Home
Tomcat - http://tomcat.apache.org/（7.0.27支持websocket，建议用tomcat8，7.0.27中的接口已经过时）
WebLogic - http://www.oracle.com/us/products/middleware/cloud-app-foundation/weblogic/overview/index.html（12.1.2開始支持）
node.js - https://github.com/Worlize/WebSocket-Node
node.js - http://socket.io
nginx - http://nginx.com/
mojolicious - http://mojolicio.us/
python - https://github.com/abourget/gevent-socketio
Django - https://github.com/stephenmcd/django-socketio

## Spring-websocket
Spring-websocket作为websocket的java服务器实现的继承websocket优势外自身的一些特点
1.	java标准
与 JSR-356 Java WebSocket API 兼容。
2.	浏览器兼容性
为那些不支持或者不允许使用Websocket的浏览器和网络提供了一些候选项,基于 SockJS（对 WebSocket 的模拟）的回调方案。
3.	服务器松耦合
服务器端对WebSocket的处理要稍加复杂一些，现在还没有某个Java规范以一种标准的方式来支持WebSocket。要使用web容器（例如Tomcat或是Jetty）的WebSocket功能的话，你得把应用代码和容器特定的库紧密耦合在一起才能访问WebSocket的功能。Spring-websocket很好的屏蔽web容器间的差异性。

## 参考资料

维基百科https://zh.wikipedia.org/wiki/WebSocket 
Web 通信 之 长连接、长轮询（long polling） http://www.cnblogs.com/hoojo/p/longPolling_comet_jquery_iframe_ajax.html/ 
反向Ajax，第1部分：Comet介绍 http://kb.cnblogs.com/page/112185/ 
反向Ajax，第2部分：WebSocket  http://kb.cnblogs.com/page/112616/
Spring WebSocket详解http://www.lxway.net/445162.html
Spring 4.0 中的 WebSocket 架构 http://developer.51cto.com/art/201311/418069.htm
Spring源码整体架构http://blog.javachen.com/2014/09/29/spring-source-codes.html 
spring+websocket整合（springMVC+spring+MyBatis即SSM框架和websocket技术的整合）http://blog.csdn.net/gisredevelopment/article/details/38392629 
使用 HTML5 WebSocket 构建实时 Web 应用 http://www.ibm.com/developerworks/cn/web/1112_huangxa_websocket/ 
WebSocket 是什么原理？为什么可以实现持久连接？ http://www.zhihu.com/question/20215561 
