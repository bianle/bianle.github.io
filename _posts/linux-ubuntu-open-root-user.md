title: 如何开启Ubuntu 的 root 用户
tags: [linux,ubuntu,root]
categories: linux
date: 2012-07-04 18:09:17
---

Ubuntu安装后，root用户默认是被锁定了的，不允许登录，也不允许“su”到 root。有人说这是个不好的实践，特别是对于服务器来说。我觉得对于桌面用户来说，这样安全性更高一些，是应该的；但对于服务器可以设置成“允许 su 到root，但不允许root用户直接登录”。而我为了开发时的方便，则在桌面和服务器上都采用这种方式。
允许 su 到 root
非常简单，下面是设置的方法：
me@tipfoo:~$ sudo passwd
Password: <— 输入安装时那个用户的密码
Enter new UNIX password: <— 新的Root用户密码
Retype new UNIX password: <— 重复新的Root用户密码
passwd：已成功更新密码
允许root登录 
如果要允许root登录（不推荐），则这样操作：
me@tipfoo:~$ gksu /usr/sbin/gdmsetup
（或者使用桌面菜单：系统＞系统管理＞登录窗口）
点“安全”选项页，选择“允许本地管理员登录”。
注：这一步依赖上一步
不输入密码直接登录 
在论坛上也看见有人抱怨，家中的Ubuntu不能像Window$那样──不用输入密码就能登录。其实同样能做到：
就在上一步的“安全”选项页中，勾选：
“启用自动登录”，“用户”选择（如：“me”）;
注意：公共用的计算机千万不能这么设置！
SSH登录远程服务器 
如果远程服务器只允许root用户SSH到服务器时，在Ubuntu下，必须“su 到root”用户才能登录成功(具体是看服务器端的配置)。
首先，复制密钥到“/root/.ssh/”目录，
me@tipfoo:~$ su
  
Password:
  
root@tipfoo:/home/me# chmod 600 -R /root/.ssh/
  
root@tipfoo:/home/me# ssh -p 27482 11.22.33.44
  
Enter passphrase for key '/root/.ssh/id_rsa':
  
Last login: Thu Jun 21 14:29:00 2007 from 11.22.33.45
