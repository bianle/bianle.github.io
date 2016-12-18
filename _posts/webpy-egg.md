---
title: webpy打包egg
date: 2016-10-31 13:19:35
tags: [python]
categories: python
---

## 背景

写了个webpy小应用，为了方便安装，将依赖一起打包

## 步骤

- 下载[webpy源码](https://github.com/webpy/webpy)
- 进入到源码目录
![webpy](http://7xlbo3.com1.z0.glb.clouddn.com/2016/10/31/20161031151308.png)
- 修改setup包 [^fn1]
![web06](http://7xlbo3.com1.z0.glb.clouddn.com/2016/10/31/20161031151335.png)
- 执行打包命令`python setup.py bdist_egg`

[^fn1]:0.40+版本无需修改
