title: eclipse开发maven项目
date: 2015-12-10 22:27:53
tags: [eclipse,maven]
categories: maven
layout: flow
---

1. ![eclipse-maven](http://7xlbo3.com1.z0.glb.clouddn.com/2015/12/11/eclipse-maven-1.png)`New`-`Maven Project` 打开向导
2. ![eclipse-maven](http://7xlbo3.com1.z0.glb.clouddn.com/2015/12/11/eclipse-maven-2.png)选择默认工作空间
3. ![eclipse-maven](http://7xlbo3.com1.z0.glb.clouddn.com/2015/12/11/eclipse-maven-3.png)Filter输入web,选择`maven-archetype-webapp`
4. ![eclipse-maven](http://7xlbo3.com1.z0.glb.clouddn.com/2015/12/11/eclipse-maven-4.png)输入groupid,artifactid,点击`Finish`
5. `index.jsp`报错
>The superclass "javax.servlet.http.HttpServlet" was not found on the Java Build Path
6. ![eclipse-maven](http://7xlbo3.com1.z0.glb.clouddn.com/2015/12/11/eclipse-maven-5.png)![eclipse-maven](http://7xlbo3.com1.z0.glb.clouddn.com/2015/12/11/eclipse-maven-6.png)![eclipse-maven](http://7xlbo3.com1.z0.glb.clouddn.com/2015/12/11/eclipse-maven-7.png)添加Server Runtime
7. ![eclipse-maven](http://7xlbo3.com1.z0.glb.clouddn.com/2015/12/11/eclipse-maven-8.png)启动项目测试



