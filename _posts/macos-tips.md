---
title: "macos小技巧"
date: 2016-11-08 14:08:23
tags: macos
categories: macos
---

## Spotlight

{% kbd Command %}
{% kbd Command %} + {% kbd Space %}快速搜索应用，文件，基本告别dock

## finder中打开终端

### 添加右键快捷键

1. Finder -> 服务 -> 服务偏好设置 -> 快捷键 -> 勾选`新建位于文件夹位置的终端标签`、`新建位于文件夹位置的终端窗口`
2. 选中文件夹，右键->服务->新建...
3. *注意：这里是用系统默认的终端打开如果想用iterm2打开，看下这个[go2shell](http://zipzapmac.com/Go2Shell),这里有[介绍](http://www.tuicool.com/articles/yeyIfuu)*

### 打开finder直接把文件夹拖拽到终端窗口然后回车

## 终端中打开finder

`cd`到目标目录`open .`

## vpn

### Mac OSX 无共享的密钥情况下连接基于L2TP协议的VPN

1. /etc/ppp/ 下 创建 options 文件
```
sudo vim /etc/ppp/options
```
2. 输入以下内容
>plugin L2TP.ppp  
>l2tpnoipsec

3. 把高级设置里面”通过VPN连接发送所有流量“勾上

4. 连接
<<<<<<< HEAD

## 更改顶部托盘图标顺序

按住{% kbd Command %},拖动图标即可

![macos-tips-tray](http://7xlbo3.com1.z0.glb.clouddn.com/2017/06/29/macos-tips-tray.gif)

## 升级10.12后office2016崩溃了

重装[office 2016 for mac 更新](https://support.microsoft.com/en-us/help/3179163/ms16-099-description-of-the-security-update-for-office-2016-for-mac-au)

参考[这](http://www.cnprint.org/bbs/thread/80/266058/)

=======
>>>>>>> 6db12a9147e2e19ad77c1dd9325ac3b6c6cfcd90
