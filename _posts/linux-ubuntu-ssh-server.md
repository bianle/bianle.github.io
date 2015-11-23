title: ubuntu开启ssh服务
tags: [linux,ubuntu,ssh]
categories: linux
date: 2013-01-05 20:56:00
---
网上有很多介绍在Ubuntu下开启SSH服务的文章，但大多数介绍的方法测试后都不太理想，均不能实现远程登录到Ubuntu上，最后分析原因是都没有真正开启ssh-server服务。最终成功的方法如下：
sudo apt-get install openssh-server
Ubuntu缺省安装了openssh-client,所以在这里就不安装了，如果你的系统没有安装的话，再用apt-get安装上即可。
然后确认sshserver是否启动了：
ps -e |grep ssh
如果只有ssh-agent那ssh-server还没有启动，需要/etc/init.d/ssh start，如果看到sshd那说明ssh-server已经启动了。
ssh-server配置文件位于/ etc/ssh/sshd_config，在这里可以定义SSH的服务端口，默认端口是22，你可以自己定义成其他端口号，如222。然后重启SSH服务：
sudo /etc/init.d/ssh resar
ssh连接：ssh xjtu129@202.117.15.165
————————————————-
1. 首先在服务器上安装ssh的服务器端。 
$ sudo aptitude install openssh-server
2. 启动ssh-server。 
$ /etc/init.d/ssh restart
3. 确认ssh-server已经正常工作。 
$ netstat -tlp 
tcp6 0 0 *:ssh *:* LISTEN – 
看到上面这一行输出说明ssh-server已经在运行了。
4. 在客户端通过ssh登录服务器。假设服务器的IP地址是192.168.0.103，登录的用户名是hyx。 
$ ssh -l hyx 192.168.0.103 
接下来会提示输入密码，然后就能成功登录到服务器上了
