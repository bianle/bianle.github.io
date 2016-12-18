---
title: emacs
date: 2016-11-02 17:57:22
tags: emacs
categories: eamcs
---

>Emacs = Esc + Meta + Alt + Ctrl + Super

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

### org-capture

[使用Org Capture来收集灵感](http://www.jianshu.com/p/d308e17a48d1)  
[使用org-capture记录密码](http://alpha-blog.wanglianghome.org/2010/08/20/append-table-row-with-org-capture/)  
[Capture mode and Date Trees in org-mode](http://members.optusnet.com.au/~charles57/GTD/datetree.html)  

## github上emacs相关

[githup上stars过20扩展类型为el编程语言为elisp的项目](https://github.com/search?p=1&q=stars:%3E20+extension:el+language:elisp&ref=searchresults&type=Repositories)

## emacs Advising Emacs List Functions

https://www.gnu.org/software/emacs/manual/html_node/elisp/Advising-Functions.html

## 其他

[Emacs Power_ Can your editor do THIS](http://v.youku.com/v_show/id_XMjA4Mzg2MjAw.html)

