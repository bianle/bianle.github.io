---
title: "mysql主从配置"
date: 2017-01-07 00:04:44
tags: mysql
categories: mysql
---

## 背景
今天（哦不00点04分了，应该说是昨天），打算自己配置一个主从mysql实践一把学习学习，于是倒腾了一下午公司电脑里的东西，腾出了40g硬盘，删了N个游戏（心疼呀！），虚了俩台centos6.6，找了同事极力推荐的`oneinstack`,装了mysql5.6，开整！记下步骤，兴许哪天就能用上呢！

## 环境
0. 虚一台centos
主机名`db01`,为了快速安装，最小化安装就好了（其实并不好）
0. 安装mysql
我想顺便试下`oneinstack`(有点大材小用)，刚想`wget`发现木网（最小化安装的），修改网络配置后启动`network`服务连上网`yum`又慢的想吐道路曲折跌跌撞撞但最终也装上了，不赘述！
1. 再虚一台centos
这时注意3点：
    - 改下hostname(修改`/etc/sysconfig/network`文件`HOSTNAME`)，我改成`db02`了
    - 拷贝虚拟机会自动添加一个网卡，造成连不上网，修改下网卡配置[看这里](http://www.01happy.com/vmware-copy-centos-device-eth0-does-not-seem-to-be-present/)
    - 修改mysql的uuid（`/data/mysql/auto.cnf`修改下uuid值）

## 配置

### master端
1. 创建用户，执行sql命令
```
create user repl;
```
2. 给repl用户授权
```
GRANT REPLICATION SLAVE ON *.* TO 'repl'@'172.19.136.%' IDENTIFIED BY '123zxc=-0/.,';
```
3. 修改配置文件(`/etc/my.cnf`)
在[mysqld]下面增加（或修改）下面几行代码
```
server-id=1   //给数据库服务的唯一标识，一般为大家设置服务器Ip的末尾号
log_bin=master-bin
log_bin_index=master-bin.index
```
4. 查看master日志
```
show master status;
```
![master status](http://7xlbo3.com1.z0.glb.clouddn.com/2017/01/07/20170107004223.png)
5. 重启mysql

### slaver端

1. 修改配置文件后重启服务
[mysqld]下增加（或修改）以下几行
```
server-id=2 //不要和master重复了
relay-log-index=slave-relay-bin.index
relay-log=slave-relay-bin
```

2. 连接master,执行以下sql命令
```
change master to master_host='172.19.136.241',
master_user='repl',
master_port=3306,
master_password='123zxc=-0/.,',
master_log_file='master-bin.000001',
master_log_pos=0;
```
3. 启动slave
```
start slave;
```

4. 查看slave状态
```
show slave status\G;
```

  - 报错1：
  >The slave I/O thread stops because master and slave have equal MySQL server UUIDs; these UUIDs must be different for replication to work.  
  
  ![uuid](http://7xlbo3.com1.z0.glb.clouddn.com/2017/01/07/20170107004817.png)  
  解决：修改下uuid
  - 报错2：网不通  
  解决：修改防火墙配置，终端命令为：`/sbin/iptables -I INPUT -p tcp --dport 3306 -j ACCEPT`


## 效果

1. 在master建一个表
![在主库创建一个表](http://7xlbo3.com1.z0.glb.clouddn.com/2017/01/06/20170106235111.png)

2. 在slaver上`show tables`
![查看从库](http://7xlbo3.com1.z0.glb.clouddn.com/2017/01/06/20170106235153.png)

## 参考

http://www.cnblogs.com/alvin_xp/p/4162249.html



