---
title: "http升级https"
date: 2016-12-26 15:53:36
tags: https
categories: web
---

## 背景

nginx + centos6 

## 生成证书

```
wget https://dl.eff.org/certbot-auto
chmod a+x certbot-auto
./certbot-auto certonly
```

## nginx配置

```
server{
	listen 443;
	server_name vpn.le.im test.le.im;
	ssl on;
	ssl_certificate /etc/letsencrypt/live/vpn.le.im/cert.pem;
	ssl_certificate_key /etc/letsencrypt/live/vpn.le.im/privkey.pem;
	location /{
        root   /usr/share/nginx/html/test;
        index  index.html index.htm;
    }
}
```

## 参考

https://certbot.eff.org/#centos6-nginx
