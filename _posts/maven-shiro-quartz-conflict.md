---
title: "shiro和quartz冲突"
date: 2016-11-01 21:45:44
tags: maven
categories: java
---

## 背景
maven项目中同时配置了shiro和quartz，shiro本身引用了quartz造成jar包冲突

## 解决办法
排除shiro里的quartz依赖：

```
<dependency>
<groupId>org.apache.shiro</groupId>
<artifactId>shiro-quartz</artifactId>
<version>1.0.0-incubating</version>
<exclusions>
<exclusion>
<groupId>quartz</groupId>
<artifactId>quartz</artifactId>
</exclusion>
</exclusions>
</dependency>
<dependency>
<groupId>org.quartz-scheduler</groupId>
<artifactId>quartz</artifactId>
<version>1.7.3</version>
</dependency>
```

## 参考

http://stackoverflow.com/questions/3821339/shiro-plugin-conflicting-with-quartz-framework-in-grails

## 扩展

[Maven类包冲突终极解决小技若干](http://stamen.iteye.com/blog/2030552)

>mvn dependency:tree -Dverbose -Dincludes=asm:asm
