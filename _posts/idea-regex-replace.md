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


## 批量(2017-07-17 13:45:56)

### 背景
还是改sonar问题:javabean的成员变量为对象类型如下警告：
>com.suning.md.bussiness.bo.MdActivityBo.getActiStartDate() may expose internal representation by returning MdActivityBo.actiStartDate

### 解决办法

参考[http://tuozixuan.iteye.com/blog/1702634](http://tuozixuan.iteye.com/blog/1702634)

### 正则替换
get方法：
```
public Date get(.*)\n(.*)return (\w*);
|
v
public Date get$1\n        if\($3!=null\)\{\n            return \(Date\) $3.clone\(\);\n\        }\n$2return null;
```
set方法
```
public void set(.*)\(Date (.*)\)(.*)\n(.*)this\.(\w*)(.*);
|
v
public void set$1(Date $2){\n        if($2!=null){\n            this.$2=(Date)$2.clone();\n            return;\n        }\n        this.$2=null; 
```


### 步骤

1. 选中一个包后{% kbd Ctrl %}+{% kbd Shift %}+{% kbd r %}
2. 点击`options`选项卡，勾选`Regular expression`
3. 输入`Text to find`和`Replace with`
4. 点击`Find`然后`Replace`单个替换或者`all files`全部替换

![idea-reg](http://7xlbo3.com1.z0.glb.clouddn.com/2017/07/17/idea-reg.gif)
