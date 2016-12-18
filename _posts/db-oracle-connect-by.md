title: CONNECT BY 行转列
tags: [oracle]
categories: db
date: 2014-09-25 15:13:00
---

```
SELECT max(a) FROM (SELECT sys_connect_by_path(outer_name,'    ') a FROM (SELECT * FROM Sys_Io_Table_Column t where t.table_id = '00000000000000000526512180550341') 
START WITH NO = 1  CONNECT BY NO = PRIOR NO+1)
```
