title: VMWare虚拟机下安装RedHat Enterprise Linux 5 网络配置过程
tags: [vmware,linux]
categories: linux
date: 2013-01-10 21:26
---

本操作参考VMWare虚拟机下安装RedHat 9.0linux联网教程
http://blog.csdn.net/Charistain_huang/archive/2009/12/14/5006861.aspx
1.网上邻居-属性-可以看到在你安装好 VM虚拟机后又多了两个网络连接
![rhl](http://7xlbo3.com1.z0.glb.clouddn.com/2013/01/10/rhl1.png)
(vmnet1是host-only，也就是说，选择用vmnet1的话就相当于VMware给你提供了一个虚拟交换机，仅将虚拟机和真实系统连上了，虚拟机可以与真实系统相互共享文件，但是虚拟机无法访问外部互联网，而vmnet8是NAT，就是网络地址转换，相当于给你一个虚拟交换机，将虚拟机和真实系统连上去了，同时这台虚拟交换机又和外部互联网相连，这样虚拟机和真是系统可以相互共享，同时又都能访问外部互联网，而且虚拟机是借用真实系统的IP上网的，不会受到IP-MAC绑定的限制。)
右键VMnet8-属性-tcp/ip协议
![rhl](http://7xlbo3.com1.z0.glb.clouddn.com/2013/01/10/rhl2.png)
-双击打开 -勾选使用下面的IP地址， 
把IP地址改为192.168.132(这个自己随便设1-224内的数字）.1 /255.255.255.0 网关以及DNS不用设置，点确定。
![rhl](http://7xlbo3.com1.z0.glb.clouddn.com/2013/01/10/rhl3.png)
2.打开vm虚拟机，点左上方的编辑-虚拟网络设置-nat
![rhl](http://7xlbo3.com1.z0.glb.clouddn.com/2013/01/10/rhl4.png)
edit—>virtual network editor
![rhl](http://7xlbo3.com1.z0.glb.clouddn.com/2013/01/10/rhl5.png)
NAT Settings
![rhl](http://7xlbo3.com1.z0.glb.clouddn.com/2013/01/10/rhl6.png)
OK
虚拟机的DNS就是这里的网关IP地址192.168.132.2,这个vmnet8相当于局域网里的网关。
3.编辑-虚拟网络设置-主机虚拟网络映射,在vmnet0下拉框勾选自己的网卡，其余的一般默认即可。 
![rhl](http://7xlbo3.com1.z0.glb.clouddn.com/2013/01/10/rhl7.png)
4.回到win主机,开始-运行-CMD,打开DOS，输入命令ipconfig/all，可以看到相关的IP配置
![rhl](http://7xlbo3.com1.z0.glb.clouddn.com/2013/01/10/rhl8.png)
5.进入VM虚拟机中的linux系统，主菜单-系统设置-网络-勾选下面的设备eth0-进入以太网设备编辑状态
system —->administration—–>network
![rhl](http://7xlbo3.com1.z0.glb.clouddn.com/2013/01/10/rhl9.png)
![rhl](http://7xlbo3.com1.z0.glb.clouddn.com/2013/01/10/rhl10.png)
设置完成保存后 主菜单-系统工具-终端 打开后输入：service network restart (重启网络命令)
