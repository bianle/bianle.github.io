---
title: "黑科技"
date: 2016-12-01 15:16:58
tags: tips
categories: tips
---

一些黑科技
<!-- more -->


## 自定义百度网盘分享密码 提取码

>点击分享按钮后会弹出一个模态框，先不管它，按 F12 打开开发者工具，切换至控制台（Console），将以下代码复制粘贴到控制台，然后回车；
```
javascript:require(["function-widget-1:share/util/service/createLinkShare.js"]).prototype.makePrivatePassword=function(){return prompt("老D的自定义百度网盘提取码","laod")}
```

https://laod.cn/black-technology/baidu-wangpan-tiquma.html


