---
title: "chrome安装安装应用"
date: 2016-11-22 10:53:41
tags: chrome
categories: chrome
---

## 如何流畅得在所有linux发行版上跑android的apk程序。

http://tieba.baidu.com/p/3308520670


## chrome运行apk问题：无法加载以下来源的扩展程序： There is no "message" element for key extName.

>打开你转换apk后的文件夹，找到\_locales\en目录下的messages.json文件，用txt或word打开，在"description": "Extension name"后加英文逗号，回车，添加"message": "XXXX"   XXXX为转换apk后的文件夹名，比如你这个应该就是"message": "com.xiaoji.emulator"  保存后重新加载应该就可以了， 我遇到跟你一样的问题，多方查证尝试已解决

https://zhidao.baidu.com/question/553546877343977732.html
