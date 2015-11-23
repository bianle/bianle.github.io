title: SQL中CONVERT转化函数的用法
tags: [oracle]
categories: db
date: 2012-12-25 18:09:17
---

格式:
`CONVERT(data_type,expression[,style])`
说明:
此样式一般在时间类型(datetime,smalldatetime)与字符串类型(nchar,nvarchar,char,varchar)
相互转换的时候才用到.

例子:
`SELECT CONVERT(varchar(30),getdate(),101) now`
结果为:
>now
>—————————————
>|09/15/2001

style数字在转换时间时的含义如下:


STYLE(2位表示年份)|	STYLE(4位表示年份)|	输入输出格式
0|	100|	mon dd yyyy hh:miAM(或PM)
1|	101美国| 	mm/dd/yy
2|	102ANSI| 	yy-mm-dd
3|	103英法| 	dd/mm/yy
4|	104德国| 	dd.mm.yy
5|	105意大利| 	dd-mm-yy
6|	106|	dd mon yy
7|	107|	mon dd,yy
8|	108|	hh:mm:ss
9|	109|	mon dd yyyy hh:mi:ss:mmmmAM(或PM)
10|	110美国| 	mm-dd-yy
11|	111日本| 	yy/mm/dd
12|	112ISO| 	yymmdd
13|	113欧洲默认值| 	dd mon yyyy hh:mi:ss:mmm(24小时制)
14|	114|	hh:mi:ss:mmm(24小时制)
20|	120 ODBC 规范| 	yyyy-mm-dd hh:mi:ss(24小时制)
21|	121|	yyyy-mm-dd hh:mi:ss:mmm(24小时制)

语句及查询结果：
SELECT CONVERT(varchar(100), GETDATE(), 0): 05 16 2006 10:57AM
SELECT CONVERT(varchar(100), GETDATE(), 1): 05/16/06
SELECT CONVERT(varchar(100), GETDATE(), 2): 06.05.16
SELECT CONVERT(varchar(100), GETDATE(), 3): 16/05/06
SELECT CONVERT(varchar(100), GETDATE(), 4): 16.05.06
SELECT CONVERT(varchar(100), GETDATE(), 5): 16-05-06
SELECT CONVERT(varchar(100), GETDATE(), 6): 16 05 06
SELECT CONVERT(varchar(100), GETDATE(), 7): 05 16, 06
SELECT CONVERT(varchar(100), GETDATE(), 8): 10:57:46
SELECT CONVERT(varchar(100), GETDATE(), 9): 05 16 2006 10:57:46:827AM
SELECT CONVERT(varchar(100), GETDATE(), 10): 05-16-06
SELECT CONVERT(varchar(100), GETDATE(), 11): 06/05/16
SELECT CONVERT(varchar(100), GETDATE(), 12): 060516
SELECT CONVERT(varchar(100), GETDATE(), 13): 16 05 2006 10:57:46:937
SELECT CONVERT(varchar(100), GETDATE(), 14): 10:57:46:967
SELECT CONVERT(varchar(100), GETDATE(), 20): 2006-05-16 10:57:47
SELECT CONVERT(varchar(100), GETDATE(), 21): 2006-05-16 10:57:47.157
SELECT CONVERT(varchar(100), GETDATE(), 22): 05/16/06 10:57:47 AM
SELECT CONVERT(varchar(100), GETDATE(), 23): 2006-05-16
SELECT CONVERT(varchar(100), GETDATE(), 24): 10:57:47
SELECT CONVERT(varchar(100), GETDATE(), 25): 2006-05-16 10:57:47.250
SELECT CONVERT(varchar(100), GETDATE(), 100): 05 16 2006 10:57AM
SELECT CONVERT(varchar(100), GETDATE(), 101): 05/16/2006
SELECT CONVERT(varchar(100), GETDATE(), 102): 2006.05.16
SELECT CONVERT(varchar(100), GETDATE(), 103): 16/05/2006
SELECT CONVERT(varchar(100), GETDATE(), 104): 16.05.2006
SELECT CONVERT(varchar(100), GETDATE(), 105): 16-05-2006
SELECT CONVERT(varchar(100), GETDATE(), 106): 16 05 2006
SELECT CONVERT(varchar(100), GETDATE(), 107): 05 16, 2006
SELECT CONVERT(varchar(100), GETDATE(), 108): 10:57:49
SELECT CONVERT(varchar(100), GETDATE(), 109): 05 16 2006 10:57:49:437AM
SELECT CONVERT(varchar(100), GETDATE(), 110): 05-16-2006
SELECT CONVERT(varchar(100), GETDATE(), 111): 2006/05/16
SELECT CONVERT(varchar(100), GETDATE(), 112): 20060516
SELECT CONVERT(varchar(100), GETDATE(), 113): 16 05 2006 10:57:49:513
SELECT CONVERT(varchar(100), GETDATE(), 114): 10:57:49:547
SELECT CONVERT(varchar(100), GETDATE(), 120): 2006-05-16 10:57:49
SELECT CONVERT(varchar(100), GETDATE(), 121): 2006
