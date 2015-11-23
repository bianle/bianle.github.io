title: myeclipse垃圾回收箱设置
date: 2015-03-26 11:58:05
categories: java
tags: eclipse
---

MyEclipse垃圾箱设置

1. 找到你的MyEclipse的工作空间。路径：`<workspace>/.metadata/.plugins/org.eclipse.core.runtime/.settings` 

2. 用记事本或写字板打开`org.eclipse.ui.prefs`添加：`SHOW_MEMORY_MONITOR=true` 
 
3. 重启MyEclipse就会看到下面有个小垃圾箱。这个是用来释放MyEclipse内存用的。 
