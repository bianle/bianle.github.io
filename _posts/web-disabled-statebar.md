title: 禁止状态栏显示链接
tags: [ie,状态栏]
categories: web前端
date: 2013-01-10 18:09:17
---

```
<html>
<head>
<title>禁止状态栏显示链接</title>
</head>
<body onMouseOver="window.status='你看不到我看不到我';return true">
<a href="/">不知道写什么</a>
</body>
</html>
```
