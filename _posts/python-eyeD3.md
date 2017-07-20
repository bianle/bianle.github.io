---
title: "python-eyeD3"
date: 2016-12-06 17:16:55
tags: python
categories: python
---

用python都去mp3文件内嵌的封面
<!-- more -->



## 背景

读取mp3封面

## 指路人

>You can use eyed3 which is a great utility for handling id3 tags. To extract all images from an mp3 file you can use:
>```
>eyeD3 --write-images=DIR mp3_file
>```
>This will write all embedded images from the mp3 file to the specified directory.

>I just found out that ffmpeg will do the trick!
>```
>ffmpeg -i file.mp3 file.jpg
>```
http://unix.stackexchange.com/questions/41287/how-to-extract-album-cover-image-from-mp3-file

## eyeD3试用

### 安装

eyeD3是个python模块可以通过`pip`安装，命令为：

```
pip install eyeD3
```

如果没安装`pip`，提前安装`sudo easy_install pip`


## 参考

[官网](http://eyed3.nicfit.net/)

