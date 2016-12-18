---
title: "git"
date: 2016-11-02 16:59:59
tags: git 
categories: git
---

## 搭建git服务器

http://developer.51cto.com/art/201507/483448.htm


## Git Stash用法

http://www.cppblog.com/deercoder/archive/2011/11/13/160007.aspx


## 覆盖更新本地已经修改的代码

http://stackoverflow.com/questions/1125968/how-to-force-git-pull-to-overwrite-local-files

```
git fetch --all
git reset --hard origin/master
```

## Gource 一个神奇的软件

先看视频[org-mode git history](http://v.youku.com/v_show/id_XMjQxMjMzNjI4.html)

http://my.oschina.net/softshellhero/blog/176460



## 解决git clone时报错：The requested URL returned error: 401 Unauthorized while accessing

版本问题，最直接的解决办法就是重新编辑安装git吧：
1. 下载：

```
wget -O git.zip https://github.com/git/git/archive/master.zip
```

2. 解压:

```
unzip git.zip
```

3. 进入git目录:

```
cd git-master
```

4. 编译安装：

```
autoconf
./configure --prefix=/usr/local
make && make install
```

5. 最后别忘了删掉旧的git，并把新版本的git建立软链接到/usr/bin/git

```
rm /usr/bin/git
ln -s /usr/local/bin/git /usr/bin/git
```
