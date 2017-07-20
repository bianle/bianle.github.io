---
title: "macos"
date: 2016-11-07 14:36:38
tags: macos
categories: macos
---

## alfred

[国人必备的30个Alfred Workflow](http://www.waerfa.com/alfred-workflow)

## iterm2

[http://blog.csdn.net/shenxin870409/article/details/41597307](http://blog.csdn.net/shenxin870409/article/details/41597307)

## oh-my-zsh
[Oh My Zsh 插件篇 - 实用工具](http://www.tuicool.com/articles/J3aIvuU)

## brew

### 安装

```
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

### brew 缓存位置`/Users/${UserName}/Library/Caches/Homebrew`
### brew 安装目录`/usr/local/Cellar/`

### 使用

brew安装jdk

```
brew cask install java
```

brew安装pip

```
brew install pip
```

安装redis
```
brew install redis
redis-server /usr/local/etc/redis.conf
```

### `Error: Unknown command: versions`

```
brew tap homebrew/boneyard
```
### brew 国内源
https://lug.ustc.edu.cn/wiki/mirrors/help/brew.git

>替换brew.git:
>cd "$(brew --repo)"
>git remote set-url origin https://mirrors.ustc.edu.cn/brew.git
>
>替换homebrew-core.git:
>cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
>git remote set-url origin https://mirrors.ustc.edu.cn/homebrew-core.git

## Cornerstone
svn客户端
链接: https://pan.baidu.com/s/1kVdQbTd 密码: bian
