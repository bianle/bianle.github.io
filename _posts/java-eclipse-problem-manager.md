title: 解决eclipse中Flex的ProblemManager 错误
tags: [flex,eclipse]
categories: web前端
date: 2012-12-27 18:09:17
---
每次在eclipse中保存Flex源文件是就弹出报错框“The attribute value type is com.adobe.flexbuilder.project.compiler.internal.ProblemManager and expected is one of java.lang.String, Boolean, Integer”，原来是ProblemManager补丁没打上。

解决办法：

1. 下载补丁包[ProblemManager]

2. 解压下载的文件 
3. 到 Flex Builder安装目录 
4. 用winrar打开eclipse安装目录下/plugins/com.adobe.flexbuilder.project_3.0.204732/zornproject.jar文件 
5. 如果eclipse已经打开的话先关掉，将刚才下载解压的文件目录 com拖到winrar中完成压缩
