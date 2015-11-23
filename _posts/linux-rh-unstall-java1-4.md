title: linux(red hat 5)卸载自带java1.4
tags: [linux,red hat]
categories: linux
date: 2014-03-25 08:09:17
---
1.打开终端输入`#rpm -qa | grep gcj` ，其显示内容有：

  >java-1.4.2-gci-compat………
  >java-1.4.2-gcj-compat-devel…..(具体忘了是什么了，反正有两个java开头的文件)

2.卸载

'#rpm -e –nodeps java-1.4.2-gci…` (利用rpm -e –nodeps 命令删除上面查找的内容)

此时jdk1.4已被卸了。
