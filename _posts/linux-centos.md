---
title: "linux-centos"
date: 2016-11-01 22:50:40
tags: linux
---

## centos 6.6 yum 安装 nginx

```
rpm -ivh http://nginx.org/packages/centos/6/noarch/RPMS/nginx-release-centos-6-0.el6.ngx.noarch.rpm
yum install nginx
```

## 安装nodejs
```
sudo yum install epel-release
sudo yum install nodejs
sudo yum install npm
```

## 安装mysql

```
yum install mysql-server
yum install mysql
service mysqld start
mysqladmin -u root password xxxx
mysql -u root -p
```

## 安装whois

```
yum install jwhois
```

## 安装ssh服务

```
yum install openssh-server
service sshd start
```
开机启动
```
chkconfig sshd on 
```

## ntfs支持

```
yum instal fuse-ntfs-3g
```



## 挂载LVM卷，提示mount: unknown filesystem type 'LVM2_member'的解决

http://blog.csdn.net/pengyouchuan/article/details/17578189

## 挂载到/media/2失败:结构需要清理
http://www.cnblogs.com/xiaoyu1005/archive/2013/05/20/3088586.html

```
xfs_repair /dev/centos/home
mkfs.ext4 /dev/centos/home /media/2
```

## CentOS 7 安装配置 NFS
http://www.linuxidc.com/Linux/2015-05/117378.htm

## 【Linux】nfs 服务的exportfs命令的简介
http://blog.itpub.net/22664653/viewspace-709839/

## Centos7安装配置NFS服务和挂载
http://blog.dreamlu.net/blog/67

>systemctl enable nfs-server.service

>yum install nfs-utils rpcbind
可能会报冲突：
file /usr/share/man/man8/blkdeactivate.8.gz from install of device-mapper-7:1.02.107-5.el7_2.2.x86_64 conflicts with file from package lvm2-7:2.02.105-14.el7.x86_64

解决：https://bugzilla.redhat.com/show_bug.cgi?id=1294128
![nfs](http://7xlbo3.com1.z0.glb.clouddn.com/2016/11/01/20161101230303.png)
先更新下lvm2
`yum update lvm2`

```
mount -t nfs 10.10.10.2:/opt/test ./test -o proto=tcp -o nolock
```

>mount.nfs: an incorrect mount option was specified
解决：http://blog.chinaunix.net/xmlrpc.php?id=3988881&r=blog/article&uid=26849186

```
mount -o nfsvers=3 10.10.10.2:/opt/test ./test
```

```
mount -t nfs -o nolock,nfsvers=3,vers=3  -o proto=tcp 10.10.10.2:/opt/test ./test
```


## 设置时间

http://www.3lian.com/edu/2015/04-17/205955.html

```
timedatectl set-time "2016-06-27 11:15:59"
```

## 基于 Samba 实现 NAS 系统

http://shumeipai.nxez.com/2013/08/24/install-nas-on-raspberrypi.html

setenforce 0 (切记关闭！！！)
