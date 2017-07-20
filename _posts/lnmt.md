---
title: "简单的LNMT环境搭建"
date: 2017-01-14 21:50:09
tags: java
categories: java
---

**l**inux + **n**ginx + **m**ysql + **t**omcat

<!-- more -->

## 架构

1. 负载均衡服务器x1
2. web服务器x2
3. 应用服务器x2
3. 数据库服务器x2
4. 文件服务器x1
5. 缓存服务器x1

简化安装2个web服务器和2个应用服务器部署在2台物理机，主数据库服务器和缓存服务器部署在1台服务器，文件服务器不单独部署，搭了4台2c4g的centos7系统机器（*实际应用中不同角色的服务器对硬件资源要求各不相同，应用服务器需要处理大量的业务逻辑， 因此需要更快更强大的CPU；数据库服务器需要快速磁盘检索和数据缓存，因此需要更快的硬盘和更大的内存；文件服务器需要存储大量用户上传的文件，因此需要更大的硬盘*）。

## 部署图

```
                                              +-----------------------+
                                              |dsn-db01(10.1.0.6)     |
                                              |                       |
                                              |    +-------------+    |
                                session manage|    |             |    |
                                         +---------> redis3.2.6  |    |
+-----------------------------------+    |    |    |             |    |
| dsn-app01(10.1.0.8)               |    |    |    +-------------+    |
|                                   |    |    |                       |
| +-------------+   +-------------+ |    |    |    +-------------+    |
| |             |   |             | |    |persist  |             |    |
| | nginx1.10.2 +-+-> tomcat7     +------+---------> mysql5.7(m) |    |
| |             | | |             | |    |    |    |             |    |
| +-------------+ | +-------------+ |    |    |    +-----+-^-----+    |
|                 |                 |    |    |          | |          |
+-----------------------------------+    |    +-----------------------+
                  |                      |               | | sync
                  |proxy_pass            |               | |
                  |                      |               | |
                  |                      |               | |
+-----------------------------------+    |    +-----------------------+
| dsn-app02(10.1.0.9)               |    |    |dsn-db02  | |          |
|                 |                 |    |    |(10.1.0.7)| |          |
| +-------------+ | +-------------+ |    |    |    +-----v-+-----+    |
| |             | | |             | |    |    |    |             |    |
| | nginx1.10.2 +-+-> tomcat7     +------+    |    | mysql5.7(s) |    |
| |             |   |             | |         |    |             |    |
| +-------------+   +-------------+ |         |    +-------------+    |
|                                   |         |                       |
+-----------------------------------+         +-----------------------+

```

## 准备介质

openssl-1.0.2j.tar.gz  
nginx-1.10.2.tar.gz  
pcre-8.39.tar.gz  
jemalloc-4.4.0.tar.bz2  
apache-tomcat-7.0.69.tar.gz  
[百度云密码bian](https://pan.baidu.com/s/1dEO54zv)

## 安装步骤

### **l**inux安装

centos6或7

### nginx安装

0. 安装编译环境
```
yum install gcc gcc-c++ perl zlib-devel
```

1. 解压源码包
```
tar xzf openssl-1.0.2j.tar.gz
tar xzf nginx-1.10.2.tar.gz
tar xzf pcre-8.39.tar.gz
```

2. 安装jemalloc
```
yum install bzip2
tar xjf jemalloc-4.4.0.tar.bz2
cd jemaloc-4.4.0
./configure
make && make install
ln -s /usr/local/lib/libjemalloc.so.2 /usr/lib64/libjemalloc.so.1
echo '/usr/local/lib' > /etc/ld.so.conf.d/local.conf
ldconfig
```

3. 添加用户
```
groupadd www ##创建用户组
useradd -s /sbin/nologin -g www -M www ##创建一个用户，不允许登录不创建主目录
```

4. 编译安装
```
cd nginx-1.10.2

./configure \
--prefix=/opt/nginx-1.10.2 \
--user=www --group=www \
--with-http_stub_status_module \
--with-http_v2_module \
--with-http_ssl_module \
--with-http_gzip_static_module \
--with-http_realip_module \
--with-http_flv_module \
--with-http_mp4_module \
--with-openssl=../openssl-1.0.2j \
--with-pcre=../pcre-8.39 \
--with-pcre-jit \
--with-ld-opt='-ljemalloc'

make && make install
```

### mysql安装

0. 新建用户
```
useradd -M -s /sbin/nologin mysql
mkdir /usr/local/mysql
chown -R mysql.mysql /usr/local/mysql
mkdir -p /data/mysql
chown -R mysql.mysql /data/mysql
```
0. 安装依赖
```
yum install cmake ncurses-devel bison
```
1. 下载mysql5.7源码
```
wget https://mirrors.tuna.tsinghua.edu.cn/mysql/downloads/MySQL-5.7/mysql-5.7.17.tar.gz
```

2. 阿里云ecs安装mysql的话需要提前挂载数据盘，这有个自动挂载的脚本
```
wget http://mirrors.linuxeye.com/scripts/auto_fdisk.sh
```

3. 安装boost
```
wget http://downloads.sourceforge.net/project/boost/boost/1.59.0/boost_1_59_0.tar.gz ##下载源码
tar xvf boost*.tar.gz
cd boost*
./bootstrap.sh
./bjam --prefix=/usr/local
./b2 install
echo '/usr/local/lib' > /etc/ld.so.conf.d/local.conf
ldconfig
```

4. 安装mysql
```
cmake . -DCMAKE_INSTALL_PREFIX=/usr/local/mysql \
    -DMYSQL_DATADIR=/data/mysql \
    -DSYSCONFDIR=/etc \
    -DWITH_INNOBASE_STORAGE_ENGINE=1 \
    -DWITH_PARTITION_STORAGE_ENGINE=1 \
    -DWITH_FEDERATED_STORAGE_ENGINE=1 \
    -DWITH_BLACKHOLE_STORAGE_ENGINE=1 \
    -DWITH_MYISAM_STORAGE_ENGINE=1 \
    -DWITH_EMBEDDED_SERVER=1 \
    -DENABLE_DTRACE=0 \
    -DENABLED_LOCAL_INFILE=1 \
    -DDEFAULT_CHARSET=utf8mb4 \
    -DDEFAULT_COLLATION=utf8mb4_general_ci \
    -DEXTRA_CHARSETS=all \
    -DCMAKE_EXE_LINKER_FLAGS='-ljemalloc'

make && make install

```
5. 加到系统服务


```
cp support-files/mysql.server /etc/init.d/mysqld
sed -i "s@^basedir=.*@basedir=/usr/local/mysql@" /etc/init.d/mysqld
sed -i "s@^datadir=.*@datadir=/data/mysql@" /etc/init.d/mysqld
chmod +x /etc/init.d/mysqld

chkconfig --add mysqld; 
chkconfig mysqld on;

```
6. 修改配置文件
```
[client]
port = 3306
socket = /tmp/mysql.sock
default-character-set = utf8mb4

[mysql]
prompt="MySQL [\\d]> "
no-auto-rehash

[mysqld]
port = 3306
socket = /tmp/mysql.sock

basedir=/usr/local/mysql
datadir=/data/mysql
pid-file=/data/mysql/mysql.pid
user = mysql
bind-address = 0.0.0.0
server-id = 9
init-connect = 'SET NAMES utf8mb4'
character-set-server = utf8mb4

skip-name-resolve
#skip-networking
back_log = 300

max_connections = 1000
max_connect_errors = 6000
open_files_limit = 65535
table_open_cache = 128
max_allowed_packet = 500M
binlog_cache_size = 1M
max_heap_table_size = 8M
tmp_table_size = 16M

read_buffer_size = 2M
read_rnd_buffer_size = 8M
sort_buffer_size = 8M
join_buffer_size = 8M
key_buffer_size = 4M

thread_cache_size = 8

query_cache_type = 1
query_cache_size = 8M
query_cache_limit = 2M

ft_min_word_len = 4

log_bin = mysql-bin
binlog_format = mixed
expire_logs_days = 7

log_error = /data/mysql/mysql-error.log
slow_query_log = 1
long_query_time = 1
slow_query_log_file = /data/mysql/mysql-slow.log

performance_schema = 0
explicit_defaults_for_timestamp

#lower_case_table_names = 1

skip-external-locking

default_storage_engine = InnoDB
#default-storage-engine = MyISAM
innodb_file_per_table = 1
innodb_open_files = 500
innodb_buffer_pool_size = 64M
innodb_write_io_threads = 4
innodb_read_io_threads = 4
innodb_thread_concurrency = 0
innodb_purge_threads = 1
innodb_flush_log_at_trx_commit = 2
innodb_log_buffer_size = 2M
innodb_log_file_size = 32M
innodb_log_files_in_group = 3
innodb_max_dirty_pages_pct = 90
innodb_lock_wait_timeout = 120

bulk_insert_buffer_size = 8M
myisam_sort_buffer_size = 8M
myisam_max_sort_file_size = 10G
myisam_repair_threads = 1

interactive_timeout = 28800
wait_timeout = 28800

[mysqldump]
quick
max_allowed_packet = 500M

[myisamchk]
key_buffer_size = 8M
sort_buffer_size = 8M
read_buffer = 4M
write_buffer = 4M

# include all files from the config directory
#
!includedir /etc/my.cnf.d
```

5. 初始化
```
/usr/local/mysql/bin/mysqld --initialize-insecure --user=mysql --basedir=/usr/local/mysql --datadir=/data/mysql
chown mysql.mysql -R /data/mysql

echo "export PATH=/usr/local/mysql/bin:\$PATH" >> /etc/profile

service mysql start

mysql -e "grant all privileges on *.* to root@'127.0.0.1' identified by \"<password>\" with grant option;"
mysql -e "grant all privileges on *.* to root@'localhost' identified by \"<password>\" with grant option;"

```



### redis安装

1. 安装
```
tar xzf redis*
cd redis*
make
mkdir -p /usr/local/redis/{bin,etc,var}
cp src/{redis-benchmark,redis-check-aof,redis-check-rdb,redis-cli,redis-sentinel,redis-server} /usr/local/redis/bin/
cp redis.conf /usr/local/redis/etc/
ln -s /usr/local/redis/bin/* /usr/local/bin/
sed -i 's@pidfile.*@pidfile /var/run/redis.pid@' /usr/local/redis/etc/redis.conf
sed -i "s@logfile.*@logfile /usr/local/redis/var/redis.log@" /usr/local/redis/etc/redis.conf
sed -i "s@^dir.*@dir /usr/local/redis/var@" /usr/local/redis/etc/redis.conf
sed -i 's@daemonize no@daemonize yes@' /usr/local/redis/etc/redis.conf
sed -i "s@^# bind 127.0.0.1@bind 127.0.0.1@" /usr/local/redis/etc/redis.conf
```
2. 加到服务
```
vi /etc/init.d/redis-server
```

```
#! /bin/sh
### BEGIN INIT INFO
# Provides:     redis-server
# Required-Start:   $syslog
# Required-Stop:    $syslog
# Should-Start:     $local_fs
# Should-Stop:      $local_fs
# Default-Start:    2 3 4 5
# Default-Stop:     0 1 6
# Short-Description:    redis-server - Persistent key-value db
# Description:      redis-server - Persistent key-value db
### END INIT INFO

PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin
DAEMON=/usr/local/redis/bin/redis-server
DAEMON_ARGS=/usr/local/redis/etc/redis.conf
NAME=redis-server
DESC=redis-server
PIDFILE=/var/run/redis.pid

test -x $DAEMON || exit 0
test -x $DAEMONBOOTSTRAP || exit 0

set -e

case "$1" in
  start)
    echo -n "Starting $DESC: "
    touch $PIDFILE
    chown redis:redis $PIDFILE
    if start-stop-daemon --start --quiet --pidfile $PIDFILE --chuid redis:redis --exec $DAEMON -- $DAEMON_ARGS
    then
      echo "[OK]"
    else
      echo "failed"
    fi
    ;;
  stop)
    echo -n "Stopping $DESC: "
    if start-stop-daemon --stop --retry 10 --quiet --oknodo --pidfile $PIDFILE --exec $DAEMON
    then
      echo "[OK]"
    else
      echo "failed"
    fi
    rm -f $PIDFILE
    ;;

  restart|force-reload)
    ${0} stop
    ${0} start
    ;;
  *)
    echo "Usage: /etc/init.d/$NAME {start|stop|restart|force-reload}" >&2
    exit 1
    ;;
esac

exit 0
```

```
chmod +x redis-server
cc start-stop-daemon.c -o /sbin/start-stop-daemon
chkconfig --add redis-server
chkconfig redis-server on
```
3. 修改权限
```
useradd -M -s /sbin/nologin redis
chown -R redis:redis /usr/local/redis/var
```


### tomcat安装

0. 安装jdk
```
yum install java-1.8.0-openjdk-devel
```
1. 解压`apache-tomcat-7.0.69.tar.gz`到/opt/apache-tomcat-7.0.69
```
tar xzf apache-tomcat-7.0.69.tar.gz -C /opt/
```
2. 添加软连接tomcat7
```
ln -s apache-tomcat-7.0.69 tomcat7
```
3. 创建用户
```
useradd -M -s /bin/bash app
```
3. 添加到服务
```
vi /etc/init.d/tomcat
```
添加以下内容：
```
#!/bin/bash
# description: tomcat Start Stop Restart
# processname: tomcat
# chkconfig: 2345 20 80

export JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk
export PATH=$JAVA_HOME/bin:$PATH
export CATALINA_HOME=/opt/tomcat7
export CATALINA_PID="$CATALINA_HOME/logs/tomcat.pid"
export JAVA_OPTS="-Xmx1536M"
export LANG="zh_CN.UTF-8"

RUN_AS=app
RUN="su $RUN_AS -c "

case $1 in
start)
	$RUN "cd $CATALINA_HOME && bin/startup.sh"
;;
stop)
	$RUN "cd $CATALINA_HOME && bin/shutdown.sh"
	$RUN "test -f $CATALINA_PID && kill -9 `cat $CATALINA_PID`"
;;
restart)
	$RUN "cd $CATALINA_HOME && bin/shutdown.sh"
	$RUN "cd $CATALINA_HOME && bin/startup.sh"
;;
esac

exit 0
```
添加执行权限
```
chmod +x tomcat
```
4. 自动启动
```
chkconfig --add tomcat
chkconfig tomcat on
```

## 集群配置
### redis 反向代理
### tomcat session共享
[tomcat+reids+session共享](/2017/01/13/tomcat-reids-session-share/)
### mysql主从配置
[mysql主从配置](/2017/01/07/mysql-master-slaver/)
