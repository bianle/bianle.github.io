title: 安装Ubuntu后找不到windows sudo update-grub
tags: [linux,grub]
categories: linux
date: 2013-01-05 18:09:17
---
我已经在Ubuntu 9.10里通过终端sudo update-grub两次了，结果还是一样不能启动XP和Windows 7。以下是在一位好心的网友的热心帮助下，经过本人亲身试验，而且行之有效的解决方法：

原因是采用了硬盘安装方式安装Ubuntu后，把那个引导工具grldr破坏了

修改Ubuntu 9.10里的/boot/grub/grub.cfg文件中Windows 7的启动选项，或者直接复制增加以下这个Windows 7选项吧。

menuentry "Windows 7" { 
insmod ntfs 
set root=(hd0,1) 
drivemap -s (hd0) ${root}

chainloader +1 
}

这个应该就可以进入grub4dos 的菜单，然后按 C 进入GRUB的DOS状态 ，在grub>提示符下输入以下三条命令来修复引导工具grldr即可

grub>root (hd0,0) 
grub>chainloader /bootmgr 
grub>boot

进入Windows 7后要重新激活Windows 7，然后就正式恢复了Ubuntu 9.10和Windows 7的双系统启动菜单了，至于XP是在Windows 7的启动菜单里的，一样正常了。哈哈！
