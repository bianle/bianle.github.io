---
title: "小技巧 - mysql篇"
date: 2016-11-22 15:42:37
tags: mysql
categories: mysql
---

## mysql 查询行号

```
select @rowno:=@rowno+1 as rowno,t.* from test t,(select @rowno:=0) r
```

## mysql里int字段插入float会四舍五入

<<<<<<< HEAD
## 关于索引（2016-12-28 15:15:20补充）

1. 字符串类型索引字段，查询条件如果传数字，索引不生效
2. 联合索引，查询条件只有部分字段的话，索引不生效

以下忽略：
红掌柜项目优化sql
```
SELECT
	M.MEMBER_ID,
	M. NAME,
	M.MOBILE,
	M.CARD_DATE,
	M.MAINTAIN_DATE,
	M.EMPLOYEE_ID,
	M.BABY_NAME,
	M.BABY_BIRTHDAY,
	M.BABY_SEX,
	M.MEMBER_SEX,
	M.IS_OFFLINE,
	T.TOTAL_CONSUME_AMOUNT,
	T.TOTAL_ORDER_NUM,
	T.LAST_CONSUME_DATE,
	r.connect_status,
	CASE WHEN r.connect_status = 3 THEN 1 WHEN r.connect_status IS NULL THEN 3 ELSE r.connect_status END remark_type
FROM
	RM_MEMBER M
LEFT JOIN rm_contact_remark r ON r.employee_id = m.employee_id
AND r.member_id = m.member_id
AND act_id =- 1,
 RM_MEMBER_TAG T
WHERE
	M.MEMBER_ID = T.MEMBER_ID
AND M.EMPLOYEE_ID = '14082377'
ORDER BY
	remark_type DESC,
	M.UPDATE_TIME DESC,
	M.MEMBER_ID
LIMIT 0,
 20
```
=======

>>>>>>> 6db12a9147e2e19ad77c1dd9325ac3b6c6cfcd90
