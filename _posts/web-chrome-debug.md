title: Chrome开发工具支持远程调试
tags: [chrome,debug]
categories: web前端
date: 2012-07-12 18:09:17
---
Google Chrome开发工具（简称 DevTools）前端界面是作为HTML + CSS + JavaScript的web应用实现的。它采用序列化的信息通道与被审查页面通讯。开发团队建立这个序列化异步交互通道是为了将DevTools前端移出被审查页面的进程。但实现了才发现，甚至能将DevTools前端移出浏览器运行。下面是尝试远程调试的步骤：

1.使用远程调试命令行开关运行要远程调试的 Chrome 实例：chrome.exe --remote-debugging-port=9222 --user-data-dir=remote-profile。远程会话必须使用不同的 Chrome 实例，所以运行时要加 --user-data-dir 参数。

2.转到要调试的页面。

3.现在运行正常的 (客户端) Chrome 实例并转到 http://localhost:9222 那里。

您将能看到一些链接，指向相应页面的远程调试会话。点击即可开始远程调试Chrome页面：

![chrome](http://7xlbo3.com1.z0.glb.clouddn.com/2012/07/12/chrome1.png)
