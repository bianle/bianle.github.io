title: 修改远程桌面服务的默认端口
tags: [远程桌面,端口]
categories: 系统
date: 2012-07-06 18:09:17
---
大家应该知道远程桌面连接默认使用的端口是3389，一旦公司在服务器或路由器上将3389端口进行了封锁，我们就没有一点办法了。其实远程桌面的使用端口是可以进行修改的，我们可以修改为公司没有禁止的端口，如21或80等。这样就可以再次轻松管理远程计算机了。将3389端口修改为80端口的方法如下：
第一步：在远程计算机（即被访问的计算机）上通过任务栏的“开始->运行->输入regedit”，打开注册表编辑器。 
第二步：在注册表中找到Hkey_local_machine\system\currentcontrolset\control\terminal server\wds\repwd\tds\tcp，将其下的portnumber值从3389修改为80，注意10进制和16进制数字的区别。 
第三步：还需要在注册表中找到hkey_local_machine\system\currentcontrolset\ 
control\terminal server\WINSTATIONS\RDP-TCP,将其下的portnumber值从3389修改为80，同样注意10进制和16进制数字的区别。全部修改后重新启动计算机就完成了被访问计算机上的设置。 
第四步：这样我们就可以在网络中任意一台安装了远程桌面登录器的计算机上连接刚刚设置的计算机了，使用的端口是80端口。值得注意的是在输入被访问计算机IP地址时需要使用类似ip:80的形式。
