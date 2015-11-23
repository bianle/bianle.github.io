title: Oracle trunc()函数的用法
date: 2014-03-25 15:25:59
tags: [oracle,trunc]
categories: db
---
```
/**************日期********************/ 
select trunc(sysdate) from dual  –2011-3-18  今天的日期为2011-3-18 
select trunc(sysdate, ‘mm’)   from   dual  –2011-3-1    返回当月第一天. 
select trunc(sysdate,’yy’) from dual  –2011-1-1       返回当年第一天 
select trunc(sysdate,’dd’) from dual  –2011-3-18    返回当前年月日 
select trunc(sysdate,’yyyy’) from dual  –2011-1-1   返回当年第一天 
select trunc(sysdate,’d’) from dual  –2011-3-13 (星期天)返回当前星期的第一天 
select trunc(sysdate, ‘hh’) from dual   –2011-3-18 14:00:00   当前时间为14:41   
select trunc(sysdate, ‘mi’) from dual  –2011-3-18 14:41:00   TRUNC()函数没有秒的精确 
/***************数字********************/ 
/* 
TRUNC（number,num_digits） 
Number 需要截尾取整的数字。 
Num_digits 用于指定取整精度的数字。Num_digits 的默认值为 0。 
TRUNC()函数截取时不进行四舍五入 
*/ 
select trunc(123.458) from dual –123 
select trunc(123.458,0) from dual –123 
select trunc(123.458,1) from dual –123.4 
select trunc(123.458,-1) from dual –120 
select trunc(123.458,-4) from dual –0 
select trunc(123.458,4) from dual  –123.458 
select trunc(123) from dual  –123 
select trunc(123,1) from dual –123 
select trunc(123,-1) from dual –120
```
