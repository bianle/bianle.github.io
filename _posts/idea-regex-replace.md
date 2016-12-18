---
title: "idea正则替换"
date: 2016-11-28 13:14:39
tags: idea
categories: idea
---

idea正则替换功能
<!-- more -->



## 背景

最近在改sonar上扫描出的代码缺陷有一条建议用isEmpty()代替size()>0
![idea](http://7xlbo3.com1.z0.glb.clouddn.com/2016/11/28/20161128131620.png)

## idea中正则替换

1. {% kbd Command %} + {% kbd r %} 打开替换框,勾选`Regex`
![idea](http://7xlbo3.com1.z0.glb.clouddn.com/2016/11/28/20161128131811.png)

2. 查找串`([a-zA-Z]*).size\(\)>0`替换为`!$1.isEmpty()`
3. 点击`Replace all`
