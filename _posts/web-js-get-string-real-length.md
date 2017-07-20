title: js获取String的实际长度
tags: [js,string]
categories: web前端
date: 2012-01-10 18:09:17
---
有时候我们需要知道字符串的实际占用长度，比如汉字“一”实际占用两个阿拉伯“1”的长度
```
var getStrSize = function(str) {
    var realLength = 0, len = str.length, charCode = -1;
    for (var i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) realLength += 1;
        else realLength += 2;
    }
    return realLength;
};
```
则“123四五六”实际长度为9.

