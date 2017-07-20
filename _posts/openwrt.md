---
title: openwrt本地dns
date: 2016-10-30 21:41:06
tags: openwrt
categories: linux
---

## 背景

家里搭了个小服务器（192.168.1.119），部署了个[owncloud](https://owncloud.org/)方便管理计划将域名yun.hp.cn解析到服务器上，开始偷懒只修改了笔记本电脑host文件将就着也用了几周，后来发现手机是真不好改，得亏路由刷的openwrt，治病还是治根

## 开工

- 登录路由器，修改`/etc/hosts/`增加一条记录指向192.168.1.119
![openwrt](http://7xlbo3.com1.z0.glb.clouddn.com/2016/10/30/20161030215658.png)

- 重启路由器




