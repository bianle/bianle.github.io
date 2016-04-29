title: 安装kubuntu后
date: 2015-12-06 01:36:41
tags: linux
categories: linux
---


## 安装中文包
```
sudo apt-get install language-pack-kde-zh-hans 
```

## 安装pidgin
```
Sudo apt-get install pidgin
sudo add-apt-repository ppa:lainme/pidgin-lwqq
sudo apt-get update
Sudo apt-get install pidgin-lwqq
```

## 安装finch

## 安装yakuake

## 安装fcitx
```
sudo apt-get install fcitx-pinyin
sudo apt-get install fcitx-table-wbpy
reboot
```

## ssh
安装
```
sudo apt-get install openssh-server
```
查看是否启动
```
sudo ps -e |grep ssh
```
有sshd证明已启动
```
sudo service ssh start
```
配置文件

`/etc/ssh/sshd_config`


## Emacs
`~/.profile`加入
`emacs --daemon&`
开机自动启动server
安装输入法
http://www.cnblogs.com/guyufei/p/3536133.html
https://github.com/wenbinye/emacs-eim
C-spac 冲突
http://blog.sina.com.cn/s/blog_a04f0d1c0101bwk1.html
## secureCRT 
选项 ->  会话选项 -> 仿真 -> 映射键； 勾上backspace发送delete。	
## git
```
Sudo apt-get install git
git config --global user.email "229371515@qq.com"
git config --global user.name "bianle"
```
```
ssh-keygen -t rsa -C "229371515@qq.com"
```



##  hexo
```
sudo apt-get install nodejs
sudo apt-get install npm
sudo npm install hexo-cli -g 
```
将包安装到全局环境中
```
npm install hexo --save
```
进入一个目录

```
hexo init <folder>
```
>/usr/bin/env: node: No such file or directory
>(ubuntu :ln -s /usr/bin/nodejs /usr/bin/node )
http://stackoverflow.com/questions/20886217/browserify-error-usr-bin-env-node-no-such-file-or-directory
```
npm install
```
```
hexo generate
```
```
hexo server
```

```
sudo npm install hexo-renderer-ejs --save
sudo npm install hexo-renderer-stylus --save
sudo npm install hexo-renderer-marked --save
```

```
sudo npm install hexo-generator-feed --save
```

```
sudo npm install hexo-ruby-character --save
sudo npm install nodejieba --save
```
```
sudo npm install hexo-math --save
```

```
sudo npm install hexo-deployer-git
```

cat ./ssh/id_rsa.pub
加到github 

>deploy:
>  type: git
>  repository: git@github.com:bianle/bianle.github.io.git
>  branch: master

>feed:
>  type: atom
>  path: atom.xml
>  limit: 20

## rz sz
```
Sudo apt-get install lrzsz
```

## 
```
sudo apt-get install tree
```

##  chrome
```
Wget https://dl.google.com/linux/direct/google-chrome-stable_current_i386.deb
sudo dpkg -i *.deb 
```
缺包
```
sudo apt-get install libappindicator1
```
缺依赖
```
apt-get -f install
```

chromeos-apk
```
sudo apt-get install lib32stdc++6-s390x-cross
```


## yakuake

## zsh
## Oh my zsh
```
sudo apt-get install url
```
```
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

修改字体

~/.kde/share/apps/konsole/
xxx.profile

`Fantasque sans mono`

```
git clone git://github.com/zsh-users/zsh-syntax-highlighting.git ~/.oh-my-zsh/plugins/zsh-syntax-highlighting
```
http://www.v2ex.com/t/156997

git下载单个文件夹
https://github.com/bianle/oh-my-zsh/tree/master/themes
https://github.com/bianle/oh-my-zsh/trunk/themes

