---
title: "ssh"
date: 2016-11-09 15:45:35
tags: ssh
categories: ssh
---

<<<<<<< HEAD
{% ruby ssh|Secure Shell %}相关的内容
<!-- more -->

## SSH免密码登录

```
vi /etc/ssh/sshd_config
```

```
RSAAuthentication yes
PubkeyAuthentication yes
AuthorizedKeysFile      .ssh/authorized_keys
```
SELinux会引起免密码登录失败,看了半天没搞明白到底为什么，我先关了，留坑
`setenforce 0`
参考：https://segmentfault.com/q/1010000000445726

tail /var/log/secure -n 20

Address 172.19.137.29 maps to localhost, but this does not map back to the address - POSSIBLE BREAK-IN ATTEMPT!

GSSAPIAuthentication no

## SSH无密码登入非root用户如何设置

### 客户机生成密钥对

```
ssh-keygen -t rsa
```

### 把公钥内容追加到服务器用户主目录`/home/bl/.ssh/authorized_keys`文件内

### 服务器权限设置
1. 主目录权限700
2. `.ssh`目录权限700
3. `authorized_keys`权限600

```
cd /home
chmod 700 bl
chmod 700 bl/.ssh
chmod 600 bl/.ssh/auhorized_keys
```

### 参考

=======
## SSH无密码登入非root用户如何设置

>>>>>>> 6db12a9147e2e19ad77c1dd9325ac3b6c6cfcd90
>1#:
>大家好，由于近期要管理大批机器，我在设置SSH登入的采用公钥无密码登入。但是只有ROOT用户才有效果
>客户机A 把id_rsa.pub内容拷贝到服务器主机B /root/.ssh/authorized_keys
>这时客户机A  ssh root@B
>不用输入密码直接登入
>然后我在设置无密码登入test账号
>客户机A 把id_rsa.pub内容拷贝到服务器主机B /home/test/.ssh/authorized_keys
>这时客户机A  ssh test@B
>这时提示还是要输入密码
>大家知道我哪里还需要设置吗？

>5#:
>多半是权限问题。
>
>.ssh目录的权限和authorized_keys的权限都要看， 权限大了是不行的
>
>.ssh的权限700， authorized_keys的权限600， 就够了，  属主要是登陆用户自己（root是不行的），组无所谓
>
>不管是什么原因， 查/var/log/secure就明白了

>6#:
>查看/var/log/secure
>报Authentication refused: bad ownership or modes for directory /home/test
>确实是用户主目录的权限问题造成的
>/home/test 之前是777
>后来改成755后就正常了
>只是感到困惑，权限改小确可以。。。。
>总之问题解决了
>谢了各位

原文：http://bbs.chinaunix.net/forum.php?mod=viewthread&tid=3554821


