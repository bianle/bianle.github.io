---
title: "小技巧 - linux篇"
date: 2016-11-17 09:36:24
tags: linux
categories: linux
---

## linux定时任务配置文件位置

1. `/var/spool/cron/` 存放的每个用户的任务以创建者名字命名，就是执行`crontab -e`保存的目录 
2. `/etc/crontab` 系统任务
3. `/etc/cron.d/` 存放脚本

http://blog.csdn.net/hi_kevin/article/details/8983746

## linux定时任务精确到秒

我们知道linux的crontab精确到分钟，如果想精确到秒怎么办，可以变通一下，通过sleep解决  
如：每隔10秒执行一次`/root/sh/remind_yumidai.sh`脚本

```
* * * * * /root/sh/remind_yumidai.sh
* * * * * sleep 10;/root/sh/remind_yumidai.sh
* * * * * sleep 20;/root/sh/remind_yumidai.sh
* * * * * sleep 30;/root/sh/remind_yumidai.sh
* * * * * sleep 40;/root/sh/remind_yumidai.sh
* * * * * sleep 50;/root/sh/remind_yumidai.sh
```

但是，每隔一秒就略坑了，得写60次

## 监测进程定时重启

### 阿里云512小鸡ngrokd服务老挂，写了个程序定时监测，如果挂了，重启之

```
#!/bin/bash
PROCESS_NUM=`ps -ef | grep "ngrokd" | grep -v "grep" | wc -l`
if [ "$PROCESS_NUM" == "1" ]
then
     echo 'running'
else
     cd /usr/local/src/ngrok/bin/
     ./start.sh
fi
```

## 查看当前正在运行的`nginx`使用哪个配置文件

1. 查看`PID`
```
netstat -anop | grep 0.0.0.0:80
```

2. 通过相应的进程ID(比如：31305）查询当前运行的nginx路径
```
ll /proc/31305/exe
```
![linux](http://7xlbo3.com1.z0.glb.clouddn.com/2016/12/29/20161229130602.png)

3. 获取到nginx的执行路径后，使用-t参数即可获取该进程对应的配置文件路径，如：
```
/opt/nginx-1.10.0/sbin/nginx -t
```
![linux](http://7xlbo3.com1.z0.glb.clouddn.com/2016/12/29/20161229130743.png)

