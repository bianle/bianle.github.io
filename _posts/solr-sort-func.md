---
title: solr排序中使用函数
date: 2017-06-20 10:28:18
tags: solr
categories: solr
---

## 需求

### 价格升序

1. 有库存有价格，价格升序
2. 无库存有价格，价格升序
3. 有库存无价格，自然排序
4. 无库存无价格，自然排序

### 实现方案

1. 根据需求确定商品有无库存和有无价格的权重：有库存>有价格>无库存>无价格

2. 为每个商品标签设置权重如下：

标签|权重
----|----
有库存| 0
有价格| 1
无库存| 2
无价格| 4

3. 组合后商品权重为每个标签求和：

标签|权重
----|----
有库存有价格|1
无库存有价格|3
有库存无价格|4
无库存无价格|6


4. 根据排序权重确定排序参数如下：

```
{!func}sum(product(sum(map(query($aaa),0,0,4,1),map(zsPrice,0,0,2,0)),100000),zsPrice) asc&aaa=inventory:000001000173
```

`query($aaa)`,其中$aaa为变量,`aaa=inventory:000001000173`是为aaa赋值，等同于`query(inventory:000001000173)`,返回搜索得分，搜不到（无库存）返回0
`map(x,min,max,target,default)`,如果`x`在`min`和`max`之间映射成`target`，否则`default`

### 价格降序

有库存有价格 6
无库存有价格 4
有库存无价格 3
无库存无价格 1

```
{!func}sum(product(sum(map(query($aaa),0,0,1,4),map(zsPrice,0,0,0,2)),100000),zsPrice) desc&aaa=inventory:000001000173
```
