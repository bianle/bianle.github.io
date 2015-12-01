title: error
date: 2015-11-19 10:05:32
tags: error
categories: error
---

## git

### disconnected no supported authentication methods available(server sent: publickey，keyboard interae）

>因为TortoiseGit和Git的冲突 我们需要把TortoiseGit设置改正如下。
1.找到TortoiseGit -> Settings -> Network
2.将SSH client指向~\Git\bin\ssh.exe(Git安装路径下)
然后便可正确push和pull

[http://blog.csdn.net/lifuxiangcaohui/article/details/40820097](http://blog.csdn.net/lifuxiangcaohui/article/details/40820097)


### fatal: Not a valid object name: 'master'

背景:git刚初始化完,新建分支,即:

```
git init
git branch src
```

原因:

>Until you commit, there is no master branch.

解决:

```
git add .
git commit -am 'init'
```

[http://stackoverflow.com/questions/9162271/fatal-not-a-valid-object-name-master](http://stackoverflow.com/questions/9162271/fatal-not-a-valid-object-name-master)
