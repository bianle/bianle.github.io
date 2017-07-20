---
title: "macos-charles"
date: 2016-12-20 17:15:51
tags: macos
categories: macos
layout: flow
---

>叫我查尔斯好了

<!-- more -->


## charles 抓包修改请求参数

1. 右键勾选breakpoints
![charles](http://7xlbo3.com1.z0.glb.clouddn.com/2016/12/20/20161220171729.png)

2. 修改请求参数
![charles](http://7xlbo3.com1.z0.glb.clouddn.com/2016/12/20/20161220172058.png)

3. 同理可以修改响应参数
![charles](http://7xlbo3.com1.z0.glb.clouddn.com/2016/12/20/20161220172149.png)

## mac上charles抓安卓https包

1. 更新`charles`到`>3.10`,百度云下载4.0.2(含破解补丁)链接: https://pan.baidu.com/s/1gf9htbt 密码: bian

2. `help`->`SSL proxying`->`Install Charles Root Certificate` 
![charles](http://7xlbo3.com1.z0.glb.clouddn.com/2016/12/26/20161226133619.png)

3. 右击根证书，点击`显示简介`，展开信任选项选择`始终信任`
![charles](http://7xlbo3.com1.z0.glb.clouddn.com/2016/12/26/20161226133747.png)
![charles](http://7xlbo3.com1.z0.glb.clouddn.com/2016/12/26/20161226133857.png)

4. `help`->`SSL proxying`->`Install Charles Root Certificate on a Mobile Device or Remote Browser`
![charles](http://7xlbo3.com1.z0.glb.clouddn.com/2016/12/26/20161226134144.png)

5. 手机浏览器(内置的)按提示打开`chls.pro/ssl`->`选择WLAN`->`确认`即可，其他浏览器（如uc）会下载证书然后手动安装即可
![charles](http://7xlbo3.com1.z0.glb.clouddn.com/2016/12/26/20161226134314.png)

6. （其他浏览器需要手动安装证书）安卓设备`设置`->`安全`-`从设备存储安装`-`选择WLAN`
![charles](http://7xlbo3.com1.z0.glb.clouddn.com/2016/12/26/Screenshot_2016-12-26-14-17-08.png)

7. 使用浏览器访问百度测试
