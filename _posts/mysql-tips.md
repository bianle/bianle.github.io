---
title: "小技巧 - mysql篇"
date: 2016-11-22 15:42:37
tags: mysql
categories: mysql
---

## mysql 查询行号

```
select @rowno:=@rowno+1 as rowno,t.* from test t,(select @rowno:=0) r
```

## mysql里int字段插入float会四舍五入


