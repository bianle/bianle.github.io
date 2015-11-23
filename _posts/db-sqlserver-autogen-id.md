title: SQL清空数据后自增ID重新设置为1的方法
tags: [sql server,db]
categories: db
date: 2012-12-27 18:09:17
---

在SQLSERVER 2000中ID字段怎样在数据库中设为自动编号，sql语句该怎么写？
```
CREATE TABLE [test] ( 
[id] [int] IDENTITY (1, 1) NOT NULL , 
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY] 
GO
```
怎样清除数据后,可以把ID再从1开始计算呢?

如把数据表users中的自增ID改成从1开始的记录
```
DBCC CHECKIDENT (‘users’, RESEED,1)
```
