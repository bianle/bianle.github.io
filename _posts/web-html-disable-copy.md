title: 网页防止复制
tags: [html,js]
categories: web前端
date: 2012-07-04 18:09:17
---
在body标签内加上一段代码，禁用右键菜单
```
<body oncontextmenu="return false"
onselectstart="return false"
ondragstart="return false"
onbeforecopy="return false"
oncopy=document.selection.empty() 
onselect=document.selection.empty()>
```

```
<input type="text" id="username" name="username" value="禁止复制" onpaste="return false" oncontextmenu="return false" oncopy="return false" oncut="return false" >
```
