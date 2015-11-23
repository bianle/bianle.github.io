title: 如何启动ubuntu下的telnet服务
tags: [linux,ubuntu,telnet]
categories: linux
date: 2012-07-04 18:09:17
---
以一般用户登录系统
执行命令 sudo apt-get install xinetd
系统提示输入用户密码，输入密码后安装xinet软件包
执行命令 sudo apt-get install telnetd
系统提示输入用户密码，输入密码后安装telnet软件包
执行命令 sudo touch /etc/xinetd.d/telnet新
建一个文件内容如下，并保存
执行命令 sudo nano -w /etc/xinetd.d/telnet
```
# default: on

# description: The telnet server serves telnet sessions; it uses \

# unencrypted username/password pairs for authentication.

service telnet

{

disable = no

flags = REUSE

socket_type = stream

wait = no

user = root

server = /usr/sbin/in.telnetd

log_on_failure += USERID

}


```
执行如下命令：sudo nano -w /etc/xinetd.conf 并加入如下内容：
```
instances = 60
log_type = SYSLOG authpriv

log_on_success = HOST PID

log_on_failure = HOST

cps = 25 30


```
