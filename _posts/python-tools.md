---
title: "python小工具"
date: 2016-11-05 15:02:13
tags: python
categories: python
---

# python智能剪贴板

## 场景

个人在整理一个word文档时，碰到了类似a102,a103,a104.....a<不确定多少>的输入，敲的手疼，何不用Python脚本写一个自动输入。

## 思路

复制a102到剪贴板，执行脚本[^1]修改剪贴板为a103，粘贴，执行脚本修改剪贴板为a104,以此类推...


以下是替换字符串中数字加1:

```
import re
input = 'a102'
output = re.sub('\\d+',lambda m: str(int(m.group(0))+1),input)
print output
```
>a103
![python-re](http://7xlbo3.com1.z0.glb.clouddn.com/2016/11/05/20161105114401.png)



## 参考
[python正则表达式](http://www.cnblogs.com/sevenyuan/archive/2010/12/06/1898075.html)
[python键盘事件](http://www.cnblogs.com/vincent-lee/articles/2354361.html)


[^1]: 执行脚本通过python监听事件实现
