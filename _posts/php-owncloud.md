title: nginx+owncloud搭建私有云盘
date: 2016-04-29 14:50:46
tags: php
categories: php
---

## 准备

- vps (阿里云等)
- php
- mysql
- nginx

## 安装

- 下载安装包[官网](https://owncloud.org/)

- 上传到vps(操作系统为Ubuntu的阿里云为例)

- 配置nginx [https://github.com/owncloud/documentation/wiki/ownCloud-9.x-nginx-config](https://github.com/owncloud/documentation/wiki/ownCloud-9.x-nginx-config)

- 制作自签名SSL证书 [给Nginx配置一个自签名的SSL证书](http://www.liaoxuefeng.com/article/0014189023237367e8d42829de24b6eaf893ca47df4fb5e000)

- 启动php-cgi(需要安装php5-curl模块`sudo apt-get install php5-curl`),mysql(新建一个库)和nginx

- 浏览器访问owncloud应用进行安装

## 问题

-[ ] 配置文件直接参考别人的,直接输入域名访问404,访问地址需要增加/index.php,nginx不熟,待后续解决


