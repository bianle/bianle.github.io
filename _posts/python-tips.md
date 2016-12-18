---
title: "小技巧 - python篇"
date: 2016-11-16 17:18:10
tags: python
categories: python
---

## list获取最后一个元素

```
li = [1,2,3]
print li[-1]
```

>3


## 数字数组转字符串

我们知道`join()`可以将字符串数组转字符串，数字数组怎么转呢？

```
a = [1,2,3]
b="-".join(str(i) for i in a)
print b
```

>'1-2-3'


```
a = [1,2,3]
b = "-".join(imap(str,a))
print b
```

>'1-2-3'
