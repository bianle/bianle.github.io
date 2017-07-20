---
title: "小技巧 - svn篇"
date: 2016-12-02 09:31:02
tags: svn
categories: svn
---

svn的一些小技巧
<!-- more -->



## svn部分检出

```
svn co --depth empty http://xxx.xxx.xxx.xxx/svn/RedMaster RedMaster
svn update --set-depth infinity RedMaster/1.3需求管理
```

>*--depth empty*  
>**Include only the immediate target of the operation, not any of its file or directory children.**  
>*--depth files*  
>**Include the immediate target of the operation and any of its immediate file children.**  
>*--depth immediates*  
>**Include the immediate target of the operation and any of its immediate file or directory children. The directory children will themselves be empty.**  
>*--depth infinity*  
>**Include the immediate target, its file and directory children, its children's children, and so on to full recursion.**  


>*--set-depth ARG*  
>**Sets the sticky depth on a directory in a working copy to one of empty, files, immediates,or infinit.**

### 参考
svn-book [百度云](https://pan.baidu.com/s/1kU7vD2Z) 密码: bian

## svn比较本地副本修改内容

```
svn diff
```

![svn diff](http://7xlbo3.com1.z0.glb.clouddn.com/2016/12/14/20161214112527.png)

可以指定diff客户端

```
svn diff --diff-cmd=meld
```

![svn diff meld](http://7xlbo3.com1.z0.glb.clouddn.com/2016/12/14/20161214112724.png)

也可以直接修改svn配置文件`~/.subversion/config`中`diff-cmd`选项,这样就不用每次都输入参数了

![svn config](http://7xlbo3.com1.z0.glb.clouddn.com/2016/12/14/20161214114317.png)


## centos svnserve

yum install -y subversion

svnserve --version

mkdir /var/svn
svnadmin create /var/svn/repo0

http://www.centoscn.com/CentosServer/ftp/2014/0306/2505.html
