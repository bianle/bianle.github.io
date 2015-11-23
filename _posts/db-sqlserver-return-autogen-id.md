title: 在SQL Server 2000中insert的时候返回自动编号的id 存储过程示例
tags: [sql server]
categories: db
date: 2013-01-05 18:09:17
---
SQL Server 2000中，insert数据的时候返回自动编号的id，有三种方法实现S`COPE_IDENTITY、IDENT_CURRENT` 和 `@@IDENTITY`，它们都返回插入到 IDENTITY 列中的值。

`IDENT_CURRENT `：返回为任何会话和任何作用域中的特定表最后生成的标识值。IDENT_CURRENT 不受作用域和会话的限制，而受限于指定的表。IDENT_CURRENT 返回为任何会话和作用域中的特定表所生成的值。

`@@IDENTITY`： 返回为当前会话的所有作用域中的任何表最后生成的标识值。

`SCOPE_IDENTITY` ：返回为当前会话和当前作用域中的任何表最后生成的标识值

`SCOPE_IDENTITY` 和 `@@IDENTITY` 返回在当前会话中的任何表内所生成的最后一个标识值。但是，SCOPE_IDENTITY 只返回插入到当前作用域中的值；@@IDENTITY 不受限于特定的作用域。

使用示例：
```
set @NewID=SCOPE_IDENTITY()

set @NewID=@@IDENTITY

set @NewID=IDENT_CURRENT(‘表名’)
```

例如，有两个表 T1 和 T2，在 T1 上定义了一个 INSERT 触发器。当将某行插入 T1 时，触发器被激发，并在 T2 中插入一行。此例说明了两个作用域：一个是在 T1 上的插入，另一个是作为触发器的结果在 T2 上的插入。假设 T1 和 T2 都有 IDENTITY 列，@@IDENTITY 和 SCOPE_IDENTITY 将在 T1 上的 INSERT 语句的最后返回不同的值。@@IDENTITY 返回插入到当前会话中任何作用域内的最后一个 IDENTITY 列值，该值是插入 T2 中的值。SCOPE_IDENTITY() 返回插入 T1 中的 IDENTITY 值，该值是发生在相同作用域中的最后一个 INSERT。如果在作用域中发生插入语句到标识列之前唤醒调用 SCOPE_IDENTITY() 函数，则该函数将返回 NULL 值。而IDENT_CURRENT(‘T1′) 和 IDENT_CURRENT(‘T2′) 返回的值分别是这两个表最后自增的值。

ajqc的实验:(40条本地线程,40+40条远程线程同时并发测试,插入1200W行),得出的结论是:

1. 在典型的级联应用中.不能用@@IDENTITY,在CII850,256M SD的机器上1W多行时就会并发冲突.在P42.8C,512M DDR上,才6000多行时就并发冲突.

2. SCOPE_IDENTITY()是绝对可靠的,可以用在存储过程中,连触发器也不用建,没并发冲突
```
–创建存储过程 
CREATE PROCEDURE prc_insertfacecontrol 
@controltype nvarchar (10), 
@controlwidth nvarchar (10), 
@controlheight nvarchar (10), 
@controlsize int , 
@controldata nvarchar (255), 
@contenttype nvarchar (255), 
@kjid int , 
@userid int, 
@controlid int output 
AS 
 
BEGIN 
INSERT INTO facecontrol ( 
controltype, 
controlwidth, 
controlheight, 
controlsize, 
controldata, 
contenttype, 
kjid, 
userid 
) 
VALUES 
( 
@controltype, 
@controlwidth, 
@controlheight, 
@controlsize , 
@controldata , 
@contenttype , 
@kjid , 
@userid 
) 
select @controlid=IDENT_CURRENT(‘facecontrol’) —返回自动编号的id 
END 
GO 
 
–执行存储过程: 
declare @controlid int 
exec prc_insertfacecontrol ’1′,’800′,’600′,71189,’asdfadfadfasdfadfafd’,'image/pjpeg’,2,1,@controlid=@controlid output 
–打印输出参数: 
print @controlid
```
