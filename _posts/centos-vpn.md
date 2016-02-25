title: centos-vpn
date: 2015-12-28 11:52:00
tags: [vpn,centos]
categories: linux
---

## 安装ppp和pptp  
```
yum -y install ppp pptp pptp-setup
```

## 配置pptp  
```
pptpsetup --create wjvpn --server 192.200.194.142 --username bianle
```
`wjvpn`为自定义连接名  
`bianle`为vpn用户名  
`192.200.194.142`为vpn服务器地址  
执行命令系统会提示输入vpn的密码

## 编辑` /etc/ppp/peers/wjvpn`  
```
vim  /etc/ppp/peers/wjvpn
```
改为:  
>\# written by pptpsetup  
pty "pptp 192.200.194.142 --nolaunchpppd"  
lock  
\#noauth  
nobsdcomp  
nodeflate  
name bianle  
remotename wjvpn  
ipparam wjvpn2  
require-mppe-128  
refuse-pap  
refuse-chap  
refuse-eap  
refuse-mschap

## 编辑`chap-secrets`
```
vim /etc/ppp/chap-secrets
```
改为:  

>\# Secrets for authentication using CHAP  
>\# client        server  secret                  IP addresses  
  
>\# added by pptpsetup for wjvpn
>bianle wjvpn "xxxxx" *


## 把`pon`和`poff`命令拷贝(或者链接)到系统path目录  
```
cp /usr/share/doc/ppp-2.4.5/scripts/pon /usr/sbin/
cp /usr/share/doc/ppp-2.4.5/scripts/poff /usr/sbin/
chmod +x /usr/sbin/pon /usr/sbin/poff
```

## 拨号  
```
pon wjvpn
```

## 查看是否连接

```
ifconfig
```
正常情况话会提示如下信息:  
>ppp0: flags=4305<UP,POINTOPOINT,RUNNING,NOARP,MULTICAST>  mtu 1456  
inet 172.16.21.77  netmask 255.255.255.255  destination 172.16.20.208  
ppp  txqueuelen 3  (Point-to-Point Protocol)  
RX packets 9  bytes 106 (106.0 B)  
RX errors 0  dropped 0  overruns 0  frame 0  
TX packets 7  bytes 82 (82.0 B)  
TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

## 断开连接  
```
poff wjvpn
```

## 调试模式


~~vi /etc/ppp/options.pptpd~~


`/var/log/message`查看日志


## 添加路由
添加路由后才能用ppp上网
```
sudo route add default dev ppp0
```


