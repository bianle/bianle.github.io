---
title: "idea宏"
date: 2016-11-25 17:17:48
tags: idea
categories: java
---

idea宏
<!-- more -->



## 背景

最近修改sonar上扫描的问题，有些重复问题（比如下边这个），本着『磨刀不误砍柴工』的精神学了下idea宏的录制方法。
>Local Variables should not be declared and then immediately returned or throw  
>本地变量不应该刚定义完就直接返回

![idea](http://7xlbo3.com1.z0.glb.clouddn.com/2016/11/25/20161125150047.png)


## 步骤

### 开始之前

光标在`new`关键字前

### 开始录制

菜单`Edit-Macros-Start Macros Recording`开始录制宏这时候右下角出现录制标志

![idea](http://7xlbo3.com1.z0.glb.clouddn.com/2016/11/25/20161125145858.png)

### 以下是录制的内容

1. {% kbd shift %}+{% kbd Command %}+{% kbd → %}，光标移动到选取并选中
2. {% kbd Command %}+{% kbd x %}，剪切
3. {% kbd Command %}+{% kbd y %}，删除这一行
4. 两次{% kbd shift %}+{% kbd alt %}+{% kbd ← %}，光标后退两个单词（分号和`mav`）
5. {% kbd Ctrl %}+{% kbd v %}，粘贴
6. {% kbd Ctrl %}+{% kbd s %}，保存

### 录制完毕后保存并绑定导快捷键

![idea](http://7xlbo3.com1.z0.glb.clouddn.com/2016/11/25/20161125150850.png)

### 回放

找到其他类，光标移到`new`关键字前，按{% kbd Option %}+{% kbd Command %}+{% kbd 1 %}

## 效果
![idea](http://7xlbo3.com1.z0.glb.clouddn.com/2016/11/25/idea-macros.gif)

