---
title: "nginx"
date: 2016-11-02 15:08:19
tags: nginx
categories: nginx
---

- No input file specified

配置文件里
SCRIPT_FILENAME
配置问题

## nginx添加ssl模块

1. 进入nginx的sbin目录（这里是/opt/nginx-1.10.0/sbin）查看nginx当前配置
```
./nginx -V
```
![nginx](http://7xlbo3.com1.z0.glb.clouddn.com/2016/12/29/20161229130953.png)

2. 进入nginx的源码包(这里是/opt/download/nginx-1.10.0)重新编译

```
./configure --prefix=/opt/nginx-1.10.0 --with-http_stub_status_module --with-http_ssl_module

make ##这一步之后千万不要`make install`!!!
```

3. 进入nginx的sbin目录备份原来的nginx二进制文件

```
cp nginx nginx.bak
```

4. 停止nginx服务，回到源码目录把重新编译的二进制文件拷贝到nginx的sbin目录替换旧的
```
cp objs/nginx /opt/nginx-1.10.0/sbin/
```

5. 执行第1步，验证一下
