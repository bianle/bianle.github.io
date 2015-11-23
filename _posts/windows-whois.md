title: windows-whois
date: 2015-11-23 09:40:40
tags: whois
categories: windows
---

## 安装

1. [百度云下载](http://pan.baidu.com/s/1qWDxIsG)
2. 解压后将whois.exe拷贝到`C:\Windows\System32`(win7以上)或任意路径并加到环境变量
3. `cmd` -> `hwois 2le.me`

## 批量whois bat脚本

目录树
│  domains.txt
│  mywhois.bat
│
└─rst
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2le.me.txt

1. myshois.bat

```
echo off
for /f "usebackq tokens=1* delims=:" %%a in ("domains.txt") do (
set filename=%date:~0,4%%date:~5,2%%date:~8,2%%time:~0,2%%time:~3,2%%time:~6,2%
::echo %filename%
whois "%%a" > rst\"%%a".txt
)
pause
```

2. domains.txt

```
2le.me
```


