title: 查询本月天数
tags: [oracle]
categories: db
date: 2014-03-25 18:09:17
---
```
SELECT ROWNUM rn 
  FROM DUAL 
CONNECT BY ROWNUM <= TO_CHAR(TRUNC(ADD_MONTHS(SYSDATE, 1), ‘mm’) – 1, ‘dd’)
```
