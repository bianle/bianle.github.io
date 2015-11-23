title: oracle sql整理
tags: [oracle,sql]
categories: db
date: 2014-03-25 18:09:17
---

# oracle 分页查询

```
SELECT * FROM ( SELECT A.*, ROWNUM RN FROM ([sql语句]) A WHERE ROWNUM <= [lineSize*currentPage] ) WHERE RN >=[((currentPage-1)*lineSize+1)];
```

```
WITH t AS

        (SELECT ‘remoteAddr:10.176.27.94,protocol:HTTP/1.1,localAddr:10.176.27.94,mac:44-37-E6-86-C4-6A,Cookie:%2Fclient6%2F=1361081051064;logoin=1361081051064;’ id

            FROM dual),

        t1 AS

        (SELECT REPLACE(id, ‘logoin=’, ‘logoin:’) id1 FROM t),

        t2 AS

        (SELECT ’1′ num0,

                 rownum num1,

                 regexp_substr(id1, ‘[^,|;|:]+’, 1, LEVEL) t1a

            FROM t1

          CONNECT BY LEVEL <= regexp_count(id1, ‘,’) + regexp_count(id1, ‘;’) +

                     regexp_count(id1, ‘:’))

        SELECT *

          FROM t2 pivot(MAX(t1a) FOR num1 IN(

                                             
                                             2 remoteaddr,

                                             4 protocol,

                                             6 localaddr,

                                             8 mac,

                                             10 cookie,

12 logoin))

```

# oracle 正则表达式

关键字`REGEXP_SUBSTR`
```
SELECT REGEXP_SUBSTR(‘在#12d’, ‘#[[:digit:]]+’) FROM DUAL

```
参考：http://www.jb51.net/article/31227.htm

