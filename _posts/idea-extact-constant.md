---
title: "idea抽取常量"
date: 2016-11-28 10:56:07
tags: idea
categories: idea
---

idea抽取常量
<!-- more -->



## 背景

这几天修改sonar上扫描出来的代码缺陷，其中一个`String literals should not be duplicated`让我
又学会了一个idea的快捷键`抽取常量`

## 症状

![idea](http://7xlbo3.com1.z0.glb.clouddn.com/2016/11/28/20161128112210.png)

```
mav.addObject("result", "balabala");
mav.addObject("result", "balabala");
mav.addObject("result", "balabala");
mav.addObject("result", "balabala");
...
```

## 快捷键

选中`"result"` , 按 {% kbd Option %} + {% kbd Command %} + {% kbd c %} , 弹出下图提示(~~此时再按下 {% kbd Option %} + {% kbd Command %} + {% kbd c %} 则弹出更多选项~~)

![idea](http://7xlbo3.com1.z0.glb.clouddn.com/2016/11/28/20161128112300.png)


选中Replac all occurrences, {% kbd enter %} 搞定

## 插曲

{% kbd Option %} + {% kbd Command %} + {% kbd c %} 和 alfred 的 snipper 冲突，懒得改键了我暂时把alfred关了
