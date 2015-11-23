title: 校园网使用Dr.com上网
tags: [Dr.com,校园网]
categories: 系统
date: 2012-07-06 18:09:17
---
很多校园都是使用上网客户端验证的，其中，drcom是比较常见的一种。 
对于初学者来说硬盘安装ubuntu8.04使用drcom上网验证确实是比较痛苦的。 
我当初就是深受其害的一员，这里分享下我使用drcom的一些经验。 
以下是以ubuntu8.04下安装drcom-1.4.4为列
PS:这个编译安装过程，其实可以全程用命令进行， 
当然，如果要使用下列命令，你需要要足够的经验。
 
sudo mount -o loop ubuntu-*.iso /cdrom ##挂载iso
sudo apt-cdrom -m -d /cdrom add ##添加cdrom为源
sudo apt-get update ##刷新列表
sudo apt-get install build-essential ##安装编译环境
tar -xzf drcom-1.4.5.tar.gz ##解压命令
cd drcom-1.4.5
make
sudo make install #编译安装
ifconfig ##查看链接信息
sudo gedit /etc/drcom.conf
sudo drcomd
drcomc login ##登入
drcomc logout ##登出
如果你想了解更详细的操作，请请看下文
首先，我们当然要下载个linux下的drcom源代码，在这里可以下载最新版本的drcom点击进入下载页面
 
不建议在windows下解压drcom-1.4.5.tar.gz，最好回到ubuntu解压，以防出错。
然後就要安装drcom了，但是安装drcom需要编译工具，ubuntuliveCD默认又是不安装的。

很多人就难倒在这里了，其实，这个编译工具是ISO里面自带的。如果你有CD，直接插上CD就可以使用命令：
sudo aptitude install build-essential
 
安装编译环境。

如果你是硬盘安装，又没有CDRom的话，可以挂载iso
 
sudo mount -o loop ubuntu-*.iso /cdrom
 
其中"ubuntu-*.iso”是你下载的镜像位置，你可以用拖动的方法来拉到终端里都可以。
挂载好镜像後，要在系统管理-软件源，

那里把下面的CDrom打上勾，
clip_image002
然後close，重新加载源。
clip_image003
这时提示找不到源，
clip_image004
这个可以不用理，因为你没有上网，不能加载网上的源，能加载cdrom就行。
或者 使用命令加载和更新：
sudo apt-cdrom -m -d /cdrom add && sudo apt-get update
这样就可以顺利用命令安装编译环境
sudo apt-get install build-essential
或者，你可以选择在新立得里查找安装

clip_image005
clip_image006
clip_image007
编译环境安装完毕，接着就可以把你下载的drcom源代码解压，

解压方法有很多种，可以图形，可以命令，不过个人偏好把下载的drcom-1.4.4.tar.gz放在桌面，右键解压到此处。
clip_image008
clip_image009
解压完毕後，cd进你解压的目录编译安装
clip_image010
make
sudo make install
clip_image011
安装完毕後，就需要编辑/etc/drcom.conf填写你的上网信息。
clip_image012
sudo gedit /etc/drcom.conf
clip_image013
clip_image014
clip_image015
clip_image016
username=myusername ##填入你登陆的帐号 
password=mypassword ##填入你的密码 
device=eth0 ##指明通往外网的网卡的名字。 
except= ##用“网络地址/网络掩码”的形式列出内网的地址。(不是内网地址就删除)
dnsp= ##你的首要DNS 
dnss= ##你的次要DNS，如果没有的话，请和首要DNS填的一样 
dhcp= ##你的DHCP服务器，一般不填
hostip= 
servip=192.168.252.1 ##你的登陆IP，就是在XP下填写登陆服务器那个IP，一般是没有登陆时自动转向的那个页面，就是那个web登陆页面。
hostport= 
servport=
hostname= 
winver= 
winbuild= 
servicepack= 
autologout=0
里面除了帐号密码，其他信息都可以在右上角网卡信息那里看到。

关于"servip="地址说明可以参考下面图片，就是网页登录的那个地址IP
如，下图就要填servip=10.254.200.252
clip_image017
感谢xu_connery提供图片
特别注意的是从1.4.0开始，"/etc/drcom.con"里增加了"device="和"except="两项,取消"mac"和"nic"两项。
配置好帐号信息後，记得保存。
这样就可以立刻上网了。

连接命令：
sudo drcomd ##启动drcom
drcomc login ##登录
由于我是用虚拟机截图，以上命令成功应该显示
Login succeeded
登出命令：
drcomc logout
Logout succeeded


