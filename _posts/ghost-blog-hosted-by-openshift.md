title: 在openshift上搭建ghost博客系统
date: 2015-12-14 21:14:49
tags: [openshift,ghost]
categories: nodejs
layout: flow
---

1. ![openshift](http://7xlbo3.com1.z0.glb.clouddn.com/2015/12/15/openshift1.png)到[openshift网站](https://www.openshift.com/)免费注册一个账号。（貌似现在被墙了，得翻墙头过去）

2. ![openshift](http://7xlbo3.com1.z0.glb.clouddn.com/2015/12/15/openshift2.png)进入控制台`OPENSHIFT WEB CONSOLE`

3. ![openshift](http://7xlbo3.com1.z0.glb.clouddn.com/2015/12/15/openshift3.png)添加一个应用`Add Application...`

4. ![openshift](http://7xlbo3.com1.z0.glb.clouddn.com/2015/12/15/openshift4.png)选择应用类型,点击`Browse By Tag`按钮选择`Node Js`

5. ![openshift](http://7xlbo3.com1.z0.glb.clouddn.com/2015/12/15/openshift5.png)配置应用,点击标题`Nodejs0.10`进入配置页面

6. ![openshift](http://7xlbo3.com1.z0.glb.clouddn.com/2015/12/15/openshift6.png)填写`Public Url,需要补充两部分`格式为`http://<应用名称>-<命名空间>.rhcloud.com`,如我填写的`http://nodejs-bianle.rhcloud.com`,命名空间全网唯一,应用名称在本命名空间内唯一.源码填写Ghost的github仓库地址`https://github.com/developercorey/openshift-ghost-quickstart.git`

7. ![openshift](http://7xlbo3.com1.z0.glb.clouddn.com/2015/12/15/openshift7.png)openshift支持绑定域名,点击应用列表中应用右侧齿轮按钮可进入应用配置界面

8. ![openshift](http://7xlbo3.com1.z0.glb.clouddn.com/2015/12/15/openshift8.png)点`Change`(如果已经绑定过则为`change alias`),填写要绑定的域名,并且将该域名CNAME方式解析到默认应用路径(我的是http://nodejs-bianle.rhcloud.com)(这一步骤通常在域名注册商或域名解析服务商那完成)

8. ![openshift](http://7xlbo3.com1.z0.glb.clouddn.com/2015/12/15/openshift9.png)修改ghost配置,改成绑定的网址. 先添加ssh-key到openshift,点击`setting`-`add a new key`打开配置页面

9. ![openshift](http://7xlbo3.com1.z0.glb.clouddn.com/2015/12/15/openshift10.png)填写生成好的公钥

10. ![openshift](http://7xlbo3.com1.z0.glb.clouddn.com/2015/12/15/openshift11.png)拷贝源码路径`ssh://566ed2892d5271b18e0000e0@nodejs-bianle.rhcloud.com/~/git/nodejs.git/`

11. ![openshift](http://7xlbo3.com1.z0.glb.clouddn.com/2015/12/15/openshift12.png)SecureCRT（ssh客户端）远程登录`nodejs-bianle.rhcloud.com`，用户名`566ed2892d5271b18e0000e0`会提示加载私钥选择生成的私钥

12. ![openshift](http://7xlbo3.com1.z0.glb.clouddn.com/2015/12/15/openshift12.png)进入`app-root/runtime/repo`目录修改`config.js`文件

13. ![openshift](http://7xlbo3.com1.z0.glb.clouddn.com/2015/12/15/openshift13.png)将url改成自己的域名

14. ![openshift](http://7xlbo3.com1.z0.glb.clouddn.com/2015/12/15/openshift14.png)登录后台`/ghost`创建用户

15. ![openshift](http://7xlbo3.com1.z0.glb.clouddn.com/2015/12/15/openshift15.png)填写基本信息

16. ![openshift](http://7xlbo3.com1.z0.glb.clouddn.com/2015/12/15/openshift16.png)邀请你的好友一起用(ghost支持多用户)
