title: java-web系统查看jvm内存使用情况
tags: [java,web]
categories: java
date: 2012-12-11 18:09:17
---
```
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>JVM memory</title>
</head>
<body>
<%
double total = (Runtime.getRuntime().totalMemory()) / (1024.0 * 1024);
double max = (Runtime.getRuntime().maxMemory()) / (1024.0 * 1024);
double free = (Runtime.getRuntime().freeMemory()) / (1024.0 * 1024);
double useable = max - total + free;
%>
<table border="1">
	<tr>
		<td colspan="3">JVM信息</td>
	<tr>
		<td>参数</td>
		<td>值</td>
		<td>描述</td>
	</tr>
	<tr>
		<td>maxMemory()</td>
		<td><%=max %>MB</td>
		<td>Java 虚拟机试图使用的最大内存量(当前JVM的最大可用内存)</td>
	</tr>
	<tr>
		<td>totalMemory()</td>
		<td><%=total %>MB</td>
		<td>Java 虚拟机中的内存总量(当前JVM占用的内存总数)</td>
	</tr>
	<tr>
		<td>freeMemory()</td>
		<td><%=free %>MB</td>
		<td>Java 虚拟机中的空闲内存量(当前JVM空闲内存)</td>
	</tr>
	<tr>
		<td> maxMemory()-totalMemory()+freeMemory()</td>
		<td><%=useable %>MB</td>
		<td>因为JVM只有在需要内存时才占用物理内存使用，所以freeMemory()的值一般情况下都很小，而JVM实际可用内存并不等于freeMemory()，而应该等于 maxMemory()-totalMemory()+freeMemory()。</td>
	</tr>
</table>
</body>
</html>
```
