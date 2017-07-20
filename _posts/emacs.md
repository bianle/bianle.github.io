---
title: emacs
date: 2016-11-02 17:57:22
tags: emacs
categories: eamcs
---

## Emacs 是什么

>Emacs Makes A Computer Slow  
>Escape Meta Alt Control Shift  
>Emacs Makers Are Crazy Sickos  
>Emacs Makes All Computing Simple  
>Emacs Makefiles Annihilate C-Shells  
>Emacs Manuals Always Cause Senility  
>Emacs May Allow Customized Screwups  
>Emacs Manuals Are Cryptic and Surreal  
>Eventually Munches All Computer Storage  
>Eight Megabytes And Constantly Swapping  
>Elsewhere Maybe All Commands are Simple  
>Excellent Manuals Are Clearly Suppressed  
>Emacs May Alienate Clients and Supporters  
>Except by Middle Aged Computer Scientists  
>Extended Macros Are Considered Superfluous  
>Every Mode Accelerates Creation of Software  
>Each Manual's Audience is Completely Stupefied  
>Exceptionally Mediocre Algorithm for Computer Scientists  
>Easily Maintained with the Assistance of Chemical Solutions  
>Eradication of Memory Accomplished with Complete Simplicity  

<!-- more -->


## 文件编码

- 打开文件出现乱码时，可以尝试修改字符的编码
{% kbd M-x %} revert-buffer-with-coding-system 输入编码后回车 {% kbd enter %}

- 指定文件的保存编码
{% kbd M-x %} set-buffer-file-coding-system 输入编码后回车 {% kbd enter %}

## 矩形选择

http://blog.sina.com.cn/s/blog_88b165d301017djg.html

>emacs以C-x r开头的命令来进行矩形操作。先用C-space或者C-@设一个mark，移动光标到另一点，用以下命令进行列操作：
>C-x r k 剪切一个矩形块  
>C-x r y 粘贴一个矩形块  
>C-x r o 插入一个矩形块  
>C-x r c 清除一个矩形块(使其变成空白)  
>C-x r t 在选定区域的所有列前插入样的字符

## ido

>你如果要创建一个新的文件叫 "ab"，而你的目录里有匹配前缀的文件 或目录，RET 就会打开部分匹配的文件。所以这个时候你必须按 C-j 来创建这 样一个文件。如果没有匹配的文件，那么RET也会创建一个新的文件

http://docs.huihoo.com/homepage/shredderyin/emacs_elisp.html

## org-mode

### 快捷键（参考：http://blog.csdn.net/u014801157/article/details/24372485）
M-LEFT/RIGHT	升级/降级当前标题，不允许有子标题的存在
M-S-LEFT/RIGHT	升级/降级标题树，即标题树内的各级标题相应升/降级
M-UP/DOWN	在同级标题间上/下移标题树，不能跨级别移动
M-RET	在当前标题后插入同级标题符号（即换行符和星号）
C-RET	在当前标题树后插入同级标题符号
M-S-RET	在当前标题后插入同级TODO标题
C-S-RET	在当前标题树后插入同级TODO标题
C-c *	把光标所在行转成标题
C-c -	把光标所在行转成列表

### org-capture
[使用Org Capture来收集灵感](http://www.jianshu.com/p/d308e17a48d1)  
[使用org-capture记录密码](http://alpha-blog.wanglianghome.org/2010/08/20/append-table-row-with-org-capture/)  
[Capture mode and Date Trees in org-mode](http://members.optusnet.com.au/~charles57/GTD/datetree.html)  
### org-pomodoro
[给 org-pomodoro 增加桌面通知功能](http://guleilab.com/2016/05/05/OrgPomodoroNotifier/)

### 表格列计算
http://stackoverflow.com/questions/6688075/permanently-summing-a-column-in-an-org-mode-table

## dired
[必備的 Dired 設定與簡易教學](https://kuanyui.github.io/2014/06/21/dired-tutorial-and-essential-configs/)

## github上emacs相关

[githup上stars过20扩展类型为el编程语言为elisp的项目](https://github.com/search?p=1&q=stars:%3E20+extension:el+language:elisp&ref=searchresults&type=Repositories)

## emacs Advising Emacs List Functions

https://www.gnu.org/software/emacs/manual/html_node/elisp/Advising-Functions.html

## emacs 替换掉^M
从`windows`平台拷过来的文件带^M，如何去掉
{% kbd M-x %} replace-string {% kbd ret %} {% kbd c-q %} {% kbd c-m %} {% kbd ret %} {% kbd ret %}

## macos brew 安装 emacs
```
rm /usr/bin/emacs
rm -rf /usr/share/emacs
##brew install emacs --cocoa --srgb --with-x
brew install emacs --with-cocoa 
ln -s /usr/local/Cellar/emacs/24.3/Emacs.app /Applications/
```
其中--cocoa选项为编译cocoa版本的emacs（即带有GUI），--srgb选项为启用sRGB颜色支持，--with-x选项用于启用对于X11环境的支持。

## 其他

[Emacs Power_ Can your editor do THIS](http://v.youku.com/v_show/id_XMjA4Mzg2MjAw.html)

