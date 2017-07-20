---
title: "emacs-mobileorg"
date: 2016-12-20 11:01:40
tags: emacs
categories: emacs
---

>MobileOrg is a FREE (open-source) iPhone and iPod Touch application for storing, searching, viewing and editing your Org-mode files. MobileOrg works offline. Although you may not always be online, you can always access your data. You can even capture notes while offline and sync the next time you have connectivity.
> -- 这是官方的介绍，大概意思就是MobileOrg是个很拽的东西，让你在手机上也能玩的起Org，不管你有没有3G，4G信号。
<!-- more -->

## 准备工作
1. 一台安装了eamcs的电脑（电脑）
2. 一部安装了mobileorg的手机（手机）
3. 电脑和手机同时可以访问的服务器（服务器）

## 服务器配置

登录服务器新建一文件夹用于存放要同步的文件
```
mkdir org
```

## 电脑配置

### emacs配置(2016-12-28 20:44:20更新去掉几个文件)

将以下代码添加到emacs的配置文件`~/.emacs`或者`~/.emacs.d/init.el`

```
;; This is just an example.  The way you do it might be
;; completely different, and that's fine, as long as you wind up
;; with `org-agenda-files' set usefully.
(setq org-directory "~/org/") ;;org主目录
(custom-set-variables
 '(org-agenda-files (quote ("todo.org"
                            "private/personal.org"))));;上边定义了org主目录这里可以写相对路径
;;这里设置MobileOrg同步的文件如果不配置则默认同步org-agenda-files列表
;;(setq org-mobile-files (list "office.org"
;;                 "home.org"
;;                 ))

(setq org-mobile-directory "/bl@tunnel.ink:org") ;;服务器路径，格式： /[用户名@]<服务器>:<电脑的org文件将同步到的目录>。
(setq org-mobile-inbox-for-pull "~/org/index.org");;手机同步用。注：这个地址要写绝对路径！
```

### 建立相关文件和文件夹

```
cd Documents
touch work.org 
mkdir private
touch private/personal.org
```

## 手机配置

### 选择ssh

![mobileorg手机配置示意](http://7xlbo3.com1.z0.glb.clouddn.com/2016/12/20/Screenshot_2016-12-20-11-29-53.png)

### 填写服务器信息

![mobileorg手机配置示意](http://7xlbo3.com1.z0.glb.clouddn.com/2016/12/20/Screenshot_2016-12-20-11-30-15.png)

## 开始同步

1. 随便写点东西
![电脑写内容展示](http://7xlbo3.com1.z0.glb.clouddn.com/2016/12/20/20161220114454.png)
2. {% kbd M-x %} org-mobile-push 然后输入密码，emacs会通过scp命令自动将文件传到服务器
3. 手机点击同步按钮（就是右上角那个圈圈）
![手机同步内容展示](http://7xlbo3.com1.z0.glb.clouddn.com/2016/12/20/Screenshot_2016-12-20-11-41-38.png)

## 参考

http://svn.red-bean.com/repos/main/3bits/mobile_org_3bits.txt
