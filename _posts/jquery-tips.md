---
title: "jquery-tips"
date: 2016-11-09 09:59:48
tags: jquery
categories: jquery
---

## jquery ajax

1. post请求 ，浏览器不会进行缓存；
2. get请求,若dateType属性 为“script”/“jsonp”时，浏览器也不会进行缓存（此时其cache属性默认为false）；
3. get请求，dateType（default: Intelligent Guess (xml, json, script, or html)），若为text/xml/html/json时，可以设置 cache属性为 false来避免缓存


