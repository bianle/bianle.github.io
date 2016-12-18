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
