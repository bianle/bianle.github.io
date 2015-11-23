title: 自动更新变灰
tags: [windows,自动更新]
categories: 系统
date: 2013-01-10 18:09:17
---
win xp控制面板中系统自动更新变成灰色不能选择
解决办法如下：

开始-运行-regedit,打开注册表编辑器,在注册表里找:
`HKEY_LOCAL_MACHINE/SOFTWARE/Policies/Microsoft/Windows`,展开Windows,将其下的
WindowsUpdate删除掉

另：还有很多方法参见http://hi.baidu.com/xxcxz/item/0e318fb9194495e84ec7fd2f
