title: "emacs在win7上导入purcell的配置时出错"
date: 2016-02-25 15:17:12
tags: emacs
categories: emacs
---

window7安装emacs24.5后导入[purcell的配置](https://github.com/purcell/emacs.d)后打开emacs报错

>Warning (initialization): An error occurred while loading `c:/HOME/.emacs.d/init.el':

>error: Package `fullframe-' is unavailable

在这个讨论中找到答案[https://github.com/purcell/emacs.d/issues/303
](https://github.com/purcell/emacs.d/issues/303)

具体解决方案参考[http://xn--9dbdkw.se/diary/how_to_enable_GnuTLS_for_Emacs_24_on_Windows/index.en.html](http://xn--9dbdkw.se/diary/how_to_enable_GnuTLS_for_Emacs_24_on_Windows/index.en.html)

下载安装[gnutls-3.2.18-w32.exe](http://pan.baidu.com/s/1boigMZX)，解压后把bin目录下的文件拷到emacs的bin目录重启emacs。
