title: python 小写转大写
tags: [python,大小写]
categories: python
date: 2013-02-03 18:09:17
---
```
-*- coding: gbk -*- 
import win32clipboard as wincb 
import win32con

running = True 
while running: 
    s=raw_input("输入小写英文：") 
    ss = s.upper() 
    print ss 
    wincb.OpenClipboard() 
    wincb.EmptyClipboard() 
    wincb.SetClipboardData(win32con.CF_TEXT, ss) 
    running = "q"!=s
```
