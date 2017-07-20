---
title: "linux命令"
date: 2016-12-22 09:10:19
tags: linux
categories: linux
---

一些常用的linux命令
<!-- more -->

## linux查看系统信息
```
uname -a #电脑以及操作系统的相关信息
cat /proc/version #内核版本
cat /etc/issue #发行版信息
lsb_release -a #适用于所有的linux，包括Redhat、SuSE、Debian等发行版，但是在debian下要安装lsb

```

## 下载

```
scp [-P <端口号>] <用户名>@<远程服务器地址>:<文件目录> <本地文件目录>
scp -P 28639 root@vpn.le.im:/usr/local/ngrok/bin/darwin_amd64/ngrok ~/ 
```

## 查看文件修改时间

```
stat <File>
```

## set -e

```
#!/bin/bash
set -e
command 1
command 2
...
exit 0
```
每个脚本都应该在文件开头加上set -e,这句语句告诉bash如果任何语句的执行结果不是true则应该退出

## centos6上安装`samba`服务时需要关闭`selinux`

### 查看状态

```
sestatus
SELinux status:                 enabled  
SELinuxfs mount:                /sys/fs/selinux  
SELinux root directory:         /etc/selinux  
Loaded policy name:             targeted  
Current mode:                   enforcing  
Mode from config file:          enforcing  
Policy MLS status:              enabled  
Policy deny_unknown status:     allowed  
Max kernel policy version:      28 
```

### 临时关闭

```
setenforce 0 
```

### 永久关闭

将`SELINUX`值设为`disabled`

```
cat /etc/selinux/config
# This file controls the state of SELinux on the system.  
# SELINUX= can take one of these three values:  
#     enforcing - SELinux security policy is enforced.  
#     permissive - SELinux prints warnings instead of enforcing.  
#     disabled - No SELinux policy is loaded.  
#SELINUX=enforcing  
SELINUX=disabled  
# SELINUXTYPE= can take one of three two values:  
#     targeted - Targeted processes are protected,  
#     minimum - Modification of targeted policy. Only selected processes are protected.   
#     mls - Multi Level Security protection.  
SELINUXTYPE=targeted
```
或者直接执行以下命令修改
```
sed -i '/SELINUX/s/enforcing/disabled/' /etc/selinux/config
```

### 参考

http://www.centoscn.com/CentOS/config/2015/0618/5681.html
