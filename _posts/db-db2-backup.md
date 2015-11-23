title: DB2备份表和删除表
tags: [db2,备份,还原]
categories: db
date: 2012-12-27 18:09:17
---
DB2跟ORACLE还是挺大的区别的.习惯了用ORACLE.用起DB2,觉得简直不可理喻.但是,实际上.DB2是很强大的.不过.这些可不是我要讨论的问题.现在.来看看DB2下ORACLE的一些命令如何实现.

1. DB2下`CREATE TABLE TableName AS`

前几天.用DB2,有一批数据.想创建数据的备份表.习惯性的用上了CREATE TABLE AS.

提示：

>DB21034E The command was processed as an SQL statement because it was not a
valid Command Line Processor command. During SQL processing it returned:
SQL0104N An unexpected token “create table kf2.tbl as” was found following
“BEGIN-OF-STATEMENT”. Expected tokens may include: “<space>”.
SQLSTATE=42601

一看傻眼了.马上找资料.花了不少时间.才发现.DB2不可以这样操作..郁闷到了.不过.可以用以下的方法:

先建表,再插数据.
```
create table TableName as (select * from TblName) definition only;
```
（或者：`create table A like B;`）

按原表的字段建个表.还好不用去查表的字段再慢慢敲建表的SQL..

然后.插数据就简单了.
```
insert into TableName select * from TblName;
```
用惯了CREATE TABLE AS的友友们是不是觉得很不爽啊?没办法..这是DB2..

2. DB2下的`TRUNCATE TABLE`

今天对一个临时表插完数据后才发现.数据插错了-。-要清表.习惯性的动作又来了.TRUNCATE TABLE.嗯.不用想了.又失败了.咋办捏.因为是省电信级别的用户数据.动不动就几百万的.DELETE FROM TABLE?我死你看..好吧..又是浪费大脑细胞的SEARCH IN BAIDU..最后发现.竟然是用IMPORT来代替了..

这方法简单了.

`VI NULL.DAT`

不用添加数据.直接保存,退出

然后执行

`db2 "import from NULL.DAT of del replace into TABLENAME"`
出现了:

>SQL3109N The utility is beginning to load data from file “NULL.DAT”.

>SQL3110N The utility has completed processing. “0″ rows were read from the
>input file.

>SQL3221W …Begin COMMIT WORK. Input Record Count = “0″.

>SQL3222W …COMMIT of any database changes was successful.

>SQL3149N “0″ rows were processed from the input file. “0″ rows were
>successfully inserted into the table. “0″ rows were rejected.

>Number of rows read = 0
>Number of rows skipped = 0
>Number of rows inserted = 0
>Number of rows updated = 0
>Number of rows rejected = 0
>Number of rows committed = 0

OK.完成了TRUNCATE TABLE的功能.虽然麻烦了点.总比你DELETE FROM TABLE快多了吧.
