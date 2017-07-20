---
title: "linux-centos"
date: 2017-01-06 15:58:57
tags: linux
categories: linux
---

## 最小化安装后需要做的事情
### 联网
`vi /etc/sysconfig/network-script/ifcfg-eth0`
>NM_CONTROLLED="no"   ##取消Network Manager托管
>ONBOOT="yes"   ##开机启动
>BOOTPROTO="dhcp"  ##ip获取方式
`service network start`

## 开启sshd
```
service sshd start
```

## 下载wget
```
yum install wget
```

## 修改为国内源（阿里云为例）
1. 备份你的原镜像文件，以免出错后可以恢复。
```
mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup
```
2. 下载新的CentOS-Base.repo 到/etc/yum.repos.d/
CentOS 5
`wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-5.repo`
CentOS 6
`wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-6.repo`
3. 运行yum makecache生成缓存
```
yum clean all
yum makecache
```

## 安装openssh-clients(scp在这个包)

```
yum install openssh-clients
```


## 源码安装node



https://www.cppfans.org/1719.html


## 
netStart.sh
```
iptables -P INPUT ACCEPT
iptables -P OUTPUT ACCEPT
```
netStop.sh
```
iptables -P INPUT DROP
iptables -P OUTPUT DROP
```

```
server {
        listen       80;
        server_name  blog.bovod.org panpan.lu;

        location / {
            proxy_pass   http://localhost:2368;
            client_max_body_size 50m;
        }
    }
```
