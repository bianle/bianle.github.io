title: IE中样式表、选择符的数量限制记录
tags: [ie,css]
categories: web前端
date: 2013-02-03 18:09:17
---
项目中css样式过多之前前面引入的样式“生效”，后面的无效
[有关IE浏览器中对样式表的最大量的限制内容](http://blogs.msdn.com/b/ieinternals/archive/2011/05/14/10164546.aspx)

>KB 262161 outlines the maximum number of stylesheets and rules supported by Internet Explorer 6 to 9.

> + A sheet may contain up to 4095 rules
> + A sheet may @import up to 31 sheets
> + @import nesting supports up to 4 levels deep
>Some folks have wondered about the math that underlies these numbers. The root of the limitations is that Internet Explorer uses a 32bit integer to identify, sort, and apply the cascading rules. The integer’s 32bits are split into five fields: four sheetIDs of 5 bits each, and one 12bit ruleID. The 5 bit sheetIDs results in the 31 @import limit, and the 12 bit ruleID results in the 4095 rules-per-sheet limitation. While these limits are entirely sufficient for most sites, there are some sites (particularly when using frameworks and controls) that can encounter the limits, requiring workarounds.

>There’s a simple test page for the limits here.

>-Eric

>Update: IE10 Platform Preview #2 significantly raises the limits described above. In IE10 (any browser/document mode):

> + A sheet may contain up to 65534 rules
> + A document may use up to 4095 stylesheets
> + @import nesting is limited to 4095 levels (due to the 4095 stylesheet limit)
