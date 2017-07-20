title: securecrt+vps+SwitchySharp+科学上网
date: 2016-05-16 11:13:13
tags: ssh
categories: linux
---

>Some birds aren't meant to be caged, that's all. Their feathers are just too bright.

使用securecrt,国外vps,SwitchySharp{% ruby 科学上网|翻墙 %}

## 准备
+ 1个国外vps(同事推荐了日本的[conoha](https://www.conoha.jp/referral/?token=UCxjSDVBJ3ufA7nesvy062HlfC7qQRtF0UHsujfuVcxV7J2Rz28-LHH))
+ securecrt
+ Chrome+SwitchSharp插件

## 步骤

+ SecureCrt连接vps
+ 配置SecureCrt端口转发
![securecrt-vps](http://7xlbo3.com1.z0.glb.clouddn.com/2016/05/16/securecrt+vps.png)
+ 配置Chrome浏览器代理
![securecrt-vps](http://7xlbo3.com1.z0.glb.clouddn.com/2016/05/16/securecrt+vps2.png)
+ 愉快的玩耍
![securecrt-vps](http://7xlbo3.com1.z0.glb.clouddn.com/2016/05/16/securecrt+vps3.png)


## ssh 隧道

不指定ip则默认本地ip

```
ssh -qTfnN -D 7000 root@133.130.120.157
```


```
ssh -qTfnN -D 172.19.137.29:7000 root@133.130.120.157
```
