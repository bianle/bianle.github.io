---
title: "boot2docker"
date: 2016-12-13 08:31:44
tags: docker
categories: docker
---

osx下安装boot2docker
<!-- more -->


## 下载安装包

[github](https://github.com/boot2docker/osx-installer/releases/)

## 安装

## 命令行启动

```
boot2docker init #只需要执行一次
boot2docker start
boot2docker shellinit
eval "$(boot2docker shellinit)" #只对当前会话生效
```

## 验证是否安装成功

```
docker run hello-world
```

## 基本练习

```
boot2docker status
docker version
```

### 在docker上启动一个nginx容器

```
docker run -d -P --name web nginx
```

使用`docker ps`查看运行的容器

使用`docker port web`查看容器端口

获取boot2docker主机地址

```
boot2docker ip
```

停止并删除容器

```
docker stop web
docker rm web
```

## 安装compose

```
curl -L https://github.com/docker/compose/releases/download/1.3.1/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
```

## 参考

http://www.widuu.com/docker/compose/install.html
http://www.widuu.com/docker/installation/mac.html

