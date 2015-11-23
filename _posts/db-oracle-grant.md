title: ORACLE 创建视图时,提示用户权限不足
tags: [oracle]
categories: db
date: 2014-03-25 18:09:17
---
首先使用system帐户进行登录 
```
sqlplus system/pwd[@DB]
```

然后执行： 
```
grant create any view to scott
```
提示：授权成功。 
执行：
```
exit
```
退出当前system帐户。
