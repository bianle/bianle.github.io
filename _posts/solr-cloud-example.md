---
title: "solr cloud 示例"
date: 2017-01-19 17:04:10
tags: solr
categories: java
---

单机搭建solr集群示例(4节点)

<!-- more -->


## 环境
centos6.6
solr6.3.0

## 步骤
进到solr安装目录然后执行以下命令
```
##新建4个solr主目录（solr.solr.home）
mkdir -p test/cloud/node{1,2,3,4}/solr
##把配置文件拷贝到4个solr主目录
echo test/cloud/node{1,2,3,4}/solr/ | xargs -n 1 cp -v server/solr/{solr.xml,zoo.cfg} 
##启动第一个节点
bin/solr start -cloud -p 8983 -s "test/cloud/node1/solr" 
##启动第二个节点并加入到第一个节点启动的内置zookeeper
bin/solr start -cloud -p 7574 -s "test/cloud/node2/solr" -z localhost:9983 
##启动第三个节点并加入到第一个节点启动的内置zookeeper
bin/solr start -cloud -p 8984 -s "test/cloud/node3/solr" -z localhost:9983 
##启动第四个节点并加入到第一个节点启动的内置zookeeper
bin/solr start -cloud -p 7575 -s "test/cloud/node4/solr" -z localhost:9983 
##上传`data_driven_schema_configs`到zookeeper并创建testcloud collection
bin/solr create -c testcloud -d data_driven_schema_configs -n testcloud -s 2 -rf 2 
```

## 效果

![solr-cloud](http://7xlbo3.com1.z0.glb.clouddn.com/2017/01/19/20170119171658.png)
