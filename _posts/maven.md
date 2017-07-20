---
title: "maven"
date: 2016-11-02 17:10:55
tags: maven
categories: java
---

## 国内maven镜像

http://nexus.hsweb.me/content/groups/public/

http://maven.aliyun.com/nexus/content/groups/public/

http://mvnrepo.tae.taobao.com/content/groups/public/

http://maven.mofasuidao.xyz/nexus/content/groups/public/


## Nexus环境搭建及简单介绍

http://blog.csdn.net/wang379275614/article/details/43940259

默认密码admin/admin123

[Maven nexus 安装nexus : wrapper | OpenSCManager failed - 拒绝访问。 (0x5)](http://blog.csdn.net/longxia1987/article/details/8902830)

[maven Nexus入门指南（图文）](http://aijezdm915.iteye.com/blog/1335025)

## 常用命令

```
maven install -Dmaven.test.skip=true
```

### 从模板构建项目
```
Projects mvn archetype:generate -DgroupId=<groupId> -DartifactId=<artifactId> -DarchetypeGroupId=<archetypeGroupId> -DarchetypeArtifactId=<archetypeArtifactId> -DarchetypeVersion=<archetypeVersion> -Dfile.encoding=UTF-8 -DarchetypeCatalog=internal

mvn archetype:generate -DgroupId=lu.panpan -DartifactId=yhb -DarchetypeGroupId=org.gy.archetype -DarchetypeArtifactId=gy-archetype-parent -DarchetypeVersion=1.0-SNAPSHOT -Dfile.encoding=UTF-8 -DarchetypeCatalog=internal

```

## 参数

### -T 多线程

maven3.x支持并发
```
mvn -T 4 clean install ## 4线程并发构建
mvn -T 1C clean install ## 每个cpu内核1个线程
mvn -T 1.5C clean install ## 每个cpu内核1.5个线程
```
参考：https://cwiki.apache.org/confluence/display/MAVEN/Parallel+builds+in+Maven+3
