---
title: "solr"
date: 2017-01-12 09:08:30
tags: solr
categories: solr
---

## solr相关

<!-- more -->

## solr安装

### 下载安装包
```
wget http://mirrors.hust.edu.cn/apache/lucene/solr/6.3.0/solr-6.3.0.tgz
tar zxf solr*
```
### 创建solr用户并以solr用户启动solr
```
useradd -M -s /bin/bash solr
chown -R solr.solr solr*
cd solr*
su solr -c "bin/solr start"
```
或：
```
useradd -M -s /sbin/nologin solr
chown -R solr.solr solr*
cd solr*
su solr -s /bin/bash -c "bin/solr start"

```
### 几个常用的启动参数
1. `-f` 前台运行
2. `-p <port>` 指定端口

## 几个主要配置文件
### schema.xml(5以后改为managed-schema)
field节点
required属性默认为false

## solr控制台
修改schema.xml后控制台->Core Admin->Reload后生效

## solrj
### 局部更新
set – set or replace a particular value, or remove the value if null is specified as the new valueadd – adds an additional value to a list

remove – removes a value (or a list of values) from a list

removeregex – removes from a list that match the given Java regular expression

inc – increments a numeric value by a specific amount (use a negative value to decrement)

## facet search 分面搜索

翻译过来有点绕，一图了然

![facet search](http://7xlbo3.com1.z0.glb.clouddn.com/2017/01/19/facetedsearch.jpg)

来自[这](http://www.chepoo.com/elasticsearch-facet-search-example.html)

## solr cloud

以下是创建cloud示例执行日志

```
bash-4.1$ ./solr start -e cloud

Welcome to the SolrCloud example!

This interactive session will help you launch a SolrCloud cluster on your local workstation.
To begin, how many Solr nodes would you like to run in your local cluster? (specify 1-4 nodes) [2]:
4
Ok, let's start up 4 Solr nodes for your example SolrCloud cluster.
Please enter the port for node1 [8983]:

Please enter the port for node2 [7574]:

Please enter the port for node3 [8984]:

Please enter the port for node4 [7575]:

Creating Solr home directory /opt/solr-6.3.0/example/cloud/node1/solr
Cloning /opt/solr-6.3.0/example/cloud/node1 into
   /opt/solr-6.3.0/example/cloud/node2
Cloning /opt/solr-6.3.0/example/cloud/node1 into
   /opt/solr-6.3.0/example/cloud/node3
Cloning /opt/solr-6.3.0/example/cloud/node1 into
   /opt/solr-6.3.0/example/cloud/node4

Starting up Solr on port 8983 using command:
/opt/solr-6.3.0/bin/solr start -cloud -p 8983 -s "/opt/solr-6.3.0/example/cloud/node1/solr"

NOTE: Please install lsof as this script needs it to determine if Solr is listening on port 8983.

Started Solr server on port 8983 (pid=7722). Happy searching!


Starting up Solr on port 7574 using command:
/opt/solr-6.3.0/bin/solr start -cloud -p 7574 -s "/opt/solr-6.3.0/example/cloud/node2/solr" -z localhost:9983

NOTE: Please install lsof as this script needs it to determine if Solr is listening on port 7574.

Started Solr server on port 7574 (pid=7873). Happy searching!


Starting up Solr on port 8984 using command:
/opt/solr-6.3.0/bin/solr start -cloud -p 8984 -s "/opt/solr-6.3.0/example/cloud/node3/solr" -z localhost:9983

NOTE: Please install lsof as this script needs it to determine if Solr is listening on port 8984.

Started Solr server on port 8984 (pid=8018). Happy searching!


Starting up Solr on port 7575 using command:
/opt/solr-6.3.0/bin/solr start -cloud -p 7575 -s "/opt/solr-6.3.0/example/cloud/node4/solr" -z localhost:9983

NOTE: Please install lsof as this script needs it to determine if Solr is listening on port 7575.

Started Solr server on port 7575 (pid=8164). Happy searching!


Now let's create a new collection for indexing documents in your 4-node cluster.
Please provide a name for your new collection: [gettingstarted]

How many shards would you like to split gettingstarted into? [2]

How many replicas per shard would you like to create? [2]

Please choose a configuration for the gettingstarted collection, available options are:
basic_configs, data_driven_schema_configs, or sample_techproducts_configs [data_driven_schema_configs]


Connecting to ZooKeeper at localhost:9983 ...
Uploading /opt/solr-6.3.0/server/solr/configsets/data_driven_schema_configs/conf for config gettingstarted to ZooKeeper at localhost:9983

Creating new collection 'gettingstarted' using command:
http://localhost:8983/solr/admin/collections?action=CREATE&name=gettingstarted&numShards=2&replicationFactor=2&maxShardsPerNode=1&collection.configName=gettingstarted

{
  "responseHeader":{
    "status":0,
    "QTime":20418},
  "success":{
    "172.19.136.171:8984_solr":{
      "responseHeader":{
        "status":0,
        "QTime":19553},
      "core":"gettingstarted_shard2_replica2"},
    "172.19.136.171:7575_solr":{
      "responseHeader":{
        "status":0,
        "QTime":19391},
      "core":"gettingstarted_shard1_replica2"},
    "172.19.136.171:7574_solr":{
      "responseHeader":{
        "status":0,
        "QTime":19801},
      "core":"gettingstarted_shard2_replica1"},
    "172.19.136.171:8983_solr":{
      "responseHeader":{
        "status":0,
        "QTime":19853},
      "core":"gettingstarted_shard1_replica1"}}}

Enabling auto soft-commits with maxTime 3 secs using the Config API

POSTing request to Config API: http://localhost:8983/solr/gettingstarted/config
{"set-property":{"updateHandler.autoSoftCommit.maxTime":"3000"}}
Successfully set-property updateHandler.autoSoftCommit.maxTime to 3000


SolrCloud example running, please visit: http://localhost:8983/solr
```

执行完毕后创建了如下cloud

```
+-------+     +-------+           +-------+     +-------+
| node1 |     | node2 |           | node3 |     | node4 |
| 8983  |     | 7574  |           | 8984  |     | 7575  |
+---+---+     +---+---+           +---+---+     +---+---+
    |             |                   |             |
    +------+------+                   +-------+-----+
           |                                  |
      +----+----+                        +----+----+
      | shard1  |                        | shard2  |
      |         |                        |         |
      +----+----+                        +----+----+
           |                                  |
           +---------------+------------------+
                           |
                  +--------+---------+
                  | collection       |
                  |                  |
                  +------------------+

```


## solr常用查询参数

### `q`:查询条件表达式。
提供`AND`,`OR`,`*`,`?`等关键字，模糊匹配。

举个栗子:
1. `name:Jim AND age:18`,查询名字类似Jim年龄18的小伙伴
2. 范围查询`startDate:[* TO 2017-01-01T00:00:00Z]`，查询开始时间在17年1月1日之前的
*注意：solr要求的时间格式为`yyyy-MM-dd'T'HH:mm:ss'Z'`，对于日期索引solr里以标准时间存储，所以我们查询时需要将日期转成格林威治时间，参考以下代码:*
```
SimpleDateFormat sdf = new  SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
sdf.setTimeZone(TimeZone.getTimeZone("GMT"));//将北京时间转成标准时间
String dateStr = sdf.format(someDate);
```
公元前日期用负数表示如`-0009`代表公元前10年（为什么是10？因为没有0000年，在solr里或者说在java里0000代表公元前1年）

```
Date _d1 = new SimpleDateFormat("yyyy").parse("-0001");
Date d0 = new SimpleDateFormat("yyyy").parse("0000");
Date d1 = new SimpleDateFormat("yyyy").parse("0001");
System.out.println(_d1);
System.out.println(d0);
System.out.println(d1);
```
>Wed Jan 01 00:00:00 CST 2
>Thu Jan 01 00:00:00 CST 1
>Sat Jan 01 00:00:00 CST 1

### `fq(filter query)`:过滤查询表达式,对查询结果过滤,在分页之前

### `sort`:排序表达式。

默认按`score`排序。提供`ASC`,`DESC`关键字且必填，不区分大小写

举个栗子：
`age desc`按年龄倒序排序

### `start`,`rows`:分页参数。

start：开始的位置，rows：返回条数

### `df`:默认的查询字段。

这个参数会覆盖在schema里定义的默认查询字段

### `Raw Query Parameters`:原始查询参数。

比如：开启debug，可以页面勾选，或者直接添加参数：debugQuery=on

### `wt(writer type)`:指定输出格式

可以有 xml, json, php, python,csv,ruby。

### `indent`:返回的结果是否缩进

默认关闭，用 indent=true|on 开启，一般调试json,php,python,ruby输出才有必要用这个参数。

### `debugQuery`:调试数据时可能会用到，有四个可选参数值。
1. timing – 提供调试对于组件时间耗费等信息
2. query — 提供调试关于查询信息
3. results — 提供调试关于结果信息
4. true – 设置为true，相当于&debugQuery=true
### `q.op`: 指定默认的连接符AND还是OR，将会覆盖schema.xml的defaultOperator配置。
### `qt(query type)`，指定那个类型来处理查询请求
一般不用指定，默认是standard
1. Transformers 结果放回前处理document中的字段。如[docid] Luence document id 值。
2. verbose 获得中间步骤的详细信息.
### `version`:查询语法的版本，建议不使用它，由服务器指定默认值。
### `defType`: 指定query parser
常用defType=lucene, defType=dismax, defType=edismax。
自定义查询类型可参考:http://blog.chenlb.com/2009/02/use-custom-solr-queryparser.html

### 参考资料：
http://wiki.apache.org/solr/CommonQueryParameters
http://wiki.apache.org/solr/SolrQuerySyntax


## [ ] dismax(Disjunction Max)

## [ ] edismax(Extended DisMax)

## [ ] hl(highlight):高亮参数

## [ ] facet参数

## [ ] spatial参数

## [ ] spellcheck 拼写检查

## [ ] Solr的检索运算符


## q 和 fq 的区别

q 一般是用户输入的关键字如`keyword:海尔空调`
fq 一般是其他过滤条件如`category:电器` `onsale:1`

q参数只有1个
fq参数可以有多个如：
```
fq=category:电器&fq=onsale:1
```
结果等价于
```
fq=category:电器 AND onsale:1
```
但是缓存不同上边的写法solr会分别缓存`category:电器`和`onsale:1`的结果

关闭缓存:
fq={!cache false}id:111

过滤顺序：

添加执行成本，执行成本越低越先执行,成本大于等于100的过滤器被solr视为后置过滤器
```
fq={!cost=1}category:电器
fq={!cost=2}onsale:1
fq={!cost=100}star:[5 TO 9]
```


q为搜索条件影响搜索结果评分
fq为筛选查询，只搜索q的查询结果，不会影响搜索结果的评分

![solr](http://7xlbo3.com1.z0.glb.clouddn.com/2017/05/11/20170511162702.png)

![solr](http://7xlbo3.com1.z0.glb.clouddn.com/2017/05/11/20170511162750.png)

## q

q=keyword:iphone 4s
q=keyword:"iphone 4s"
q=keyword:(iphone 4s)

df:keyword

必备词
海尔 + 空调
海尔 AND 空调
海尔 && 空调
+海尔 +空调
海尔 空调 （默认运算符是AND时）

可选词

海尔 OR 空调
海尔 || 空调
海尔 空调 （默认运算符是OR时）

词项临近度

"海尔空调"~3
![solr-q](http://7xlbo3.com1.z0.glb.clouddn.com/2017/07/20/solr-q.gif)

字符临近度

海尔
![solr-q](http://7xlbo3.com1.z0.glb.clouddn.com/2017/07/20/solr-q.gif)

排除词项
keyword:(海尔 -兄弟)
keyword:(海尔 NOT 兄弟)

区间搜索
age:[0 TO 100] 闭区间如果字段类型为整数表示1到99
age:{0 TO 100} 开区间如果字段类型为整数表示0到100

通配符搜索
* 1个或多个
? 1个

权重表达式
海尔空调^10

特殊字符转义
+-&&||!(){}[]^"~*?:/
我&&你
我\&\&你

eDisMax 扩展析取最大化查询解析器

qf查询字段
q=海尔&qf=cmmdtyName^10 categoryName

[ ] pf短语字段
[ ] ps短语间隔

qs查询短语间隔
tie决胜局 0.0 1.0

bq提升查询
仅影响排序
bq=onsale:1
bf提升函数
```
bf=product(rord(starLevel),rord(saleNum),rord(onsaleTime))
```

mm 最小匹配


