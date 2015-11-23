title: oracle视图传参数
tags:
  - oracle
categories:
  - db
date: 2014-09-25 15:17:00
---
创建包
```
create or replace package p_view_param  is
   function set_param(num number) return number;
   function get_param  return number;
 
   end p_view_param;
  
   create or replace package body p_view_param is
       paramValue number;
       function set_param(num number) return number is
       begin
         paramValue:=num;
         return num;
        end; 
      
       function get_param return number is
       begin
         return paramValue;
       end;
      
   end p_view_param; 
```

创建视图
```
create or replace view p_view_user as
     select id,realName,address from tbl_info where id=p_view_param.get_param();
```
PL/SQL调用
```
select * from p_view_user where p_view_param.set_param(2781)=2781
```
