---
title: "solr相关"
date: 2017-05-19 21:57:54
tags: solr
categories: solr
---

## ik添加到maven
1. 下载源码[IK-Analyzer-2012FF](https://git.oschina.net/wltea/IK-Analyzer-2012FF.git)
2. 新建空的maven项目
3. src目录下文件拷贝到src java目录
3. pom.xml添加依赖
```
<properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <lucene.version>4.10.4</lucene.version>
</properties>
<dependencies>
    <dependency>
        <groupId>org.apache.lucene</groupId>
        <artifactId>lucene-core</artifactId>
        <version>${lucene.version}</version>
    </dependency>
    <dependency>
        <groupId>org.apache.lucene</groupId>
        <artifactId>lucene-queryparser</artifactId>
        <version>${lucene.version}</version>
    </dependency>
    <dependency>
        <groupId>org.apache.lucene</groupId>
        <artifactId>lucene-analyzers-common</artifactId>
        <version>${lucene.version}</version>
    </dependency>
    <dependency>
        <groupId>org.apache.solr</groupId>
        <artifactId>solr-test-framework</artifactId>
        <version>${lucene.version}</version>
        <exclusions>
            <exclusion>
                <artifactId>jdk.tools</artifactId>
                <groupId>jdk.tools</groupId>
            </exclusion>
        </exclusions>
    </dependency>

    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>4.10</version>
    </dependency>
</dependencies>
```

## solr添加到maven
1. 下载源码[solr-4.10.4-src.tgz](http://archive.apache.org/dist/lucene/solr/4.10.4/)
2. `ant generate-maven-artifacts`
Ivy is not available
[解决ivy is not available](http://www.hankcs.com/program/java/solve-the-ivy-is-not-available.html)


