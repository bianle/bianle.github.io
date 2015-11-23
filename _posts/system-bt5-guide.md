title: BackTrack5(BT5)硬盘安装完美教程
tags: [linux,bt5]
categories: linux
date: 2012-12-25 21:01:00
---

BackTrack5的硬盘安装分两步走，第一步是BT5的硬盘引导，第二步是BT5的硬盘安装。过程中用到BT5的LIVE镜像，可以在这里下载BackTrack5发布，提供多种镜像下载 。
 
第一部分 BackTrack5(BT5)硬盘引导
BackTrack5 （BT5）的硬盘引导我们是借助grub4dos来完成的，grub跟grub2下还木有测试。grub4dos在xp跟win7下可以都用 boot.ini的方法来完成，win7也认识boot.ini，如果你是xp，直接修改boot.ini，如果你是win7，在系统盘根目录下新建 boot.ini。
写入内容：
c:\grldr="GRUB4DOS Menu"
xp是在文件最后加上上面这行，win7在空白文件中只写这行就可以了。当然，win7也可以用easyBCD来安装grub4dos，可以参考的文章ubuntu11.04硬盘安装详细教程，xp、win7完美支持
下面你需要下载grub4dos的配置文件：点此下载配置文件 将此文件解压缩到系统盘根目录即可。
其实如果你对grub的menu.lst比较熟悉的话，可以看下menu.lst引导BT5的内容
title BackTrack5 Text - Default Boot Text Mode
  root (hd0,0)
  kernel /casper/vmlinuz file=/preseed/custom.seed boot=casper text splash vga=791--
  initrd /casper/initrd.gz
  boot
下载好CD镜像后，用UltraISO将全部文件解压缩到系统盘根目录（你的系统盘）下即可。
重启时选择引导，会进入BackTrack5的引导。这一步完成后你就已经完成了硬盘引导工作，可以正常进入BT5的LIVE了。默认账户是root，密码是toor，进入图形化桌面是startx。
 
第二部分 BackTrack5(BT5)硬盘安装
这一部分，说说missing filesystem.size错误的产生原因，missing filesystem.size是因为install.sh那个文件无法找到安装所需要的filesystem.size，而这个文件就在/cdrom中，而当你运行了umount -l /cdrom之后，该目录变成了空目录，所以系统无法找到原来我们拷贝过去的文件filesystem.size，因此会报错。那么如何解决呢？方案有两个，一个是将iso镜像中的所有文件都重新拷贝到/cdrom文件夹中，当然，这是不太可行的，至少2G内存是木有搞定，呵呵，说不定你是4G内存可以搞定呢~~~这个方法我们pass掉，现在说说真正的方法，用loop将iso文件挂载到/cdrom目录下。具体做法：
1.准备好你的bt5的安装iso，最好是放在你的系统盘也就是sda1中，如果放不开当然放别的盘里也可以的，命名全部用英文，免得有不必要的麻烦。打开一个终端，终端在程序的附件中。
在终端中运行
cd /
sudo mkdir nenew
sudo umount -l /cdrom
sudo mount /dev/sda1 /nenew
ls /nenew | grep iso
运行到这一步的时候，看看回显的结果中是否有你的镜像文件，如果你放到了第一个分区中，应该可以看到你的镜像名称，可以继续第二步了。如果你没有放到系统根目录下，就执行下面的命令，将sda的数字依次递增，直到ls 的结果有你的镜像为止。
sudo umount -l /nenew
sudo mount /dev/sda2 /nenew
ls /nenew | grep iso
好了，到此我们假设你已经看到了你的BackTrack5的iso镜像文件，如果你没有看到，自己找找原因吧，不解释。
2.执行下列命令
sudo modprobe loop
sudo mount -o loop /nenew/BT5-GNOME-32.iso /cdrom
这里的BT5-GNOME-32.iso为你的BT5的镜像名称。
sudo umount -l /nenew
ls /cdrom
这时候会回显cdrom目录下的文件，自己确定下跟iso文件中是否一致，如果一致，ok，你的操作正确了，可以进行安装了，如果不一致，sorry，回头继续看教程找原因。
3.运行桌面上的install来安装即可，安装过程可以参考ubuntu的安装过程，这里就不熬述了。最后安装结束，提示是否重启，选择reboot重启，当出现提示让输入enter的时候回车，这个地方没法过去，当然这并没有什么影响，直接关掉电源就可以了，因为该关闭的东东已经都关闭了。如果你是笔记本就长按开机按钮就可以关机的。重新开机就可以进入系统了。当然，你没有看到windows的启动项。启动正常后，用户名root密码toor进入系统，startx进入图形，打开终端，sudo update-grub就有windows的启动项了。
