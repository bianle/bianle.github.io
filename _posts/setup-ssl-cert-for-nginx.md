---
title: "nginx安装ssl证书"
date: 2017-07-12 11:12:47
tags: nginx,ssl
categories: nginx
---

## 环境
1. 阿里云ecs + nginx + tomcat
2. 域名在阿里云申请，dns解析也是阿里云的（申请阿里云证书验证方便）


## 申请证书

登录阿里云左侧导航`安全`->`证书服务`，申请证书

![ssl](http://7xlbo3.com1.z0.glb.clouddn.com/2017/07/12/20170712111435.png)

申请后下载对应版本

![ssl](http://7xlbo3.com1.z0.glb.clouddn.com/2017/07/12/20170712111630.png)

## 上传到服务器

把下载的证书上传到服务器，最好是单独的目录，方便管理

![ssl](http://7xlbo3.com1.z0.glb.clouddn.com/2017/07/12/20170712111706.png)

## 配置nginx

开启ssl
```
ssl on;
ssl_certificate   /root/cert/ceshi.agoodwater.cn/ceshi.agoodwater.cn.pem;
ssl_certificate_key  /root/cert/ceshi.agoodwater.cn/ceshi.agoodwater.cn.key;
ssl_session_timeout 5m;
ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
ssl_prefer_server_ciphers on;
```
兼容http请求
```
server{
	listen	80;
	server_name ceshi.agoodwater.cn;
	rewrite ^(.*)$  https://$host$1 permanent;
}
```

完整配置如下

```
server{
	listen	80;
	server_name ceshi.agoodwater.cn;
	rewrite ^(.*)$  https://$host$1 permanent;
}
server {
    listen       443;
    server_name  ceshi.agoodwater.cn;
	
    ssl on;
    ssl_certificate   /root/cert/ceshi.agoodwater.cn/ceshi.agoodwater.cn.pem;
    ssl_certificate_key  /root/cert/ceshi.agoodwater.cn/ceshi.agoodwater.cn.key;
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;

    root /opt/www/m.agoodwater.cn/;
	access_log  /var/log/nginx/chcbkq.access.log  main;

    location / {
		# 内网ip:port
        proxy_pass http://219.142.236.81:4466;
        proxy_set_header X-Proxy nginx;
        proxy_read_timeout 50s;

        proxy_set_header Host $host;
        proxy_set_header X-Real-Ip $remote_addr;
        proxy_set_header X-Forwarded-For $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

```
