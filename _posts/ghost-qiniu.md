---
title: "ghost集成七牛"
date: 2016-11-09 08:11:07
tags: ghost
categories: ghost
---

## 安装七牛插件

```
npm install qiniu --save
```

## 拷贝[qiniu.js](https://pan.baidu.com/s/1pKUmRNX)到`/core/server/storage/`目录下

## 修改`/core/server/storage/index.js`

![ghost-qiniu](http://7xlbo3.com1.z0.glb.clouddn.com/2016/11/09/20161109081831.png)

## ghost配置

![ghost-qiniu](http://7xlbo3.com1.z0.glb.clouddn.com/2016/11/09/20161109081438.png)



```
storage: {
    provider: 'qiniu',
    bucketname: 'bianle',
    ACCESS_KEY: 'xxx',
    SECRET_KEY: 'xxx',
    root: '/image/',
    prefix: 'http://bianle.qiniudn.com'
}
```

<<<<<<< HEAD
## github 
https://github.com/Minwe/qn-store
=======
>>>>>>> 6db12a9147e2e19ad77c1dd9325ac3b6c6cfcd90
