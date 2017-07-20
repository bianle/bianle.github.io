---
title: "联通HG220GU-WO36光猫管理员权限破解"
date: 2017-01-06 12:57:53
tags: net
categories: net
layout: flow
---

1. 访问 http://192.168.1.1/logoffaccount.html，隐藏用户改为启用，  
这样就可以用工程账号登陆了。
![net](http://7xlbo3.com1.z0.glb.clouddn.com/2017/01/06/20170106130014.png)
2. 登录工程帐号用户名：fiberhomehg2x0 密码：hg2x0
3. 访问 http://192.168.1.1/backupsettings.html 下载 backupsettings.conf
4. backupsettings.conf 里找 AdminPassword我这台上是 <AdminPassword>MTIzcXdlYXNkenhjAA==</AdminPassword>base64解码拿到密码 123qweasdzxc 看这密码的长相估计这批设备上的都一样
5. 进服务设置，找到维护帐号开关，选开启后保存，这样就可以用管理员登录了
![net](http://7xlbo3.com1.z0.glb.clouddn.com/2017/01/06/20170106130258.png)
6. 用户名CUAdmin 注意大小写 密码123qweasdzxc 登录 http://192.168.1.1/cu.html 
7. 更改光猫为桥接方式，桥接路由器（折腾了两个晚上木搞定，留个坑吧）
8. 参考：http://blog.csdn.net/jtongfei/article/details/50405753

