title: DIV背景半透明，DIV中的字不半透明
tags: [css,半透明]
categories: web前端
date: 2012-07-11 18:09:17
---
```
<div style="filter:alpha(opacity=50);background:#ffffff;width:600;">
  
     <span style="color:yellow">图层背景半透明，字体颜色也半透明</span>

  
</div> 


<div style="filter:alpha(opacity=50);background:#ffffff;width:600"> 


 <span style="position:relative;color:yellow">图层背景半透明，字体颜色不半透明</span> 


</div>
```
