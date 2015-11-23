title: 全屏屏蔽、自动居中的lightBox
tags: [js,html,lightbox]
categories: web前端
date: 2012-06-20 18:09:17
---
```
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="author" content="Chomo" />
<link rel="start" href="http://www.14px.com" title="Home" />
<title>全屏屏蔽、自动居中的lightBox</title>
<style type="text/css">
* { margin:0; padding:0; }
html,body { height:100%; overflow:hidden; font:12px/1.5 simsun;}
.myPage { line-height:3; overflow:auto; width:100%; height:100%;}
.lightBox,
.popupCover,
.popupIframe,
.popupComponent { position:absolute; left:0; top:0; width:100%; height:100%;}
.popupComponent { z-index:2; display:none;}
.popupIframe { display:none; _display:block; _filter:alpha(opacity=0);}
.popupCover { background:#000; opacity:0.7; *filter:alpha(opacity=70);}
.lightBox { text-align:center; overflow:auto;}
.lightBoxContent { display:inline-block; *display:inline; zoom:1; width:300px; padding:10px; background:#fff; border:5px solid #00b4ff; vertical-align:middle;}
.lightBoxMaxHeight { display:inline-block; vertical-align:middle; height:100%; *height:99.5%; width:1px; overflow:hidden; margin-left:-1px;}
.lightBoxWrapper { display:inline-block; *display:inline; zoom:1; text-align:left;}
.lightBoxClose { color:#f00;}
.lightBoxSubmit { margin-top:10px; padding-top:5px; border-top:1px solid #ccc;}
.lightBoxSubmit input { font-size:12px; padding:0 10px; overflow:visible; margin:0 5px;}
</style>
</head>
<body>
<div class="popupComponent" id="lightBox">
    <iframe class="popupIframe"></iframe>
    <div class="popupCover"></div>
    <div class="lightBox">
        <span class="lightBoxMaxHeight"></span>
        <div class="lightBoxContent">
            <div class="lightBoxWrapper">
                当提示小于一行时文字居中<br />
            </div>
            <div class="lightBoxSubmit">
                <input type="button" value="确定" onclick="hideLayer('lightBox')" />
                <input type="button" value="取消" onclick="hideLayer('lightBox')" />
            </div>
        </div>
    </div>
</div>
<div class="popupComponent" id="lightBox2">
    <iframe class="popupIframe"></iframe>
    <div class="popupCover"></div>
    <div class="lightBox">
        <div class="lightBoxContent">
            <div class="lightBoxWrapper">
                 当内容已经超过了一屏的高度 当内容已经超过了一屏的高度 当内容已经超过了一屏的高度 当内容已经超过了一屏的高度<br />
                 当内容已经超过了一屏的高度 当内容已经超过了一屏的高度 当内容已经超过了一屏的高度 当内容已经超过了一屏的高度<br />
                 当内容已经超过了一屏的高度 当内容已经超过了一屏的高度 当内容已经超过了一屏的高度 当内容已经超过了一屏的高度<br />
                 当内容已经超过了一屏的高度 当内容已经超过了一屏的高度 当内容已经超过了一屏的高度 当内容已经超过了一屏的高度<br />
                 当内容已经超过了一屏的高度 当内容已经超过了一屏的高度 当内容已经超过了一屏的高度 当内容已经超过了一屏的高度<br />
                 当内容已经超过了一屏的高度 当内容已经超过了一屏的高度 当内容已经超过了一屏的高度 当内容已经超过了一屏的高度<br />
                 当内容已经超过了一屏的高度 当内容已经超过了一屏的高度 当内容已经超过了一屏的高度 当内容已经超过了一屏的高度<br />
                 当内容已经超过了一屏的高度 当内容已经超过了一屏的高度 当内容已经超过了一屏的高度 当内容已经超过了一屏的高度<br />
                 当内容已经超过了一屏的高度 当内容已经超过了一屏的高度 当内容已经超过了一屏的高度 当内容已经超过了一屏的高度<br />
                 当内容已经超过了一屏的高度 当内容已经超过了一屏的高度 当内容已经超过了一屏的高度 当内容已经超过了一屏的高度<br />
                 当内容已经超过了一屏的高度 当内容已经超过了一屏的高度 当内容已经超过了一屏的高度 当内容已经超过了一屏的高度<br />
                 当内容已经超过了一屏的高度 当内容已经超过了一屏的高度 当内容已经超过了一屏的高度 当内容已经超过了一屏的高度<br />
                 当内容已经超过了一屏的高度 当内容已经超过了一屏的高度 当内容已经超过了一屏的高度 当内容已经超过了一屏的高度<br />
            </div>
            <div class="lightBoxSubmit">
                <input type="button" value="确定" onclick="hideLayer('lightBox2')" />
                <input type="button" value="取消" onclick="hideLayer('lightBox2')" />
            </div>
        </div>
        <span class="lightBoxMaxHeight"></span>
    </div>
</div>
<div class="myPage">
    假装很丰富的内容<br />假装很丰富的内容<br />假装很丰富的内容<br />假装很丰富的内容<br />
    <div style="text-align:center;"><input type="button" value="位于第一屏的按钮" onclick="showLayer('lightBox')" /></div>
    假装很丰富的内容<br />假装很丰富的内容<br />假装很丰富的内容<br />假装很丰富的内容<br />
    <select><option>一个用于测试IE6中是否能覆盖住的select</option></select><br />
    假装很丰富的内容<br />假装很丰富的内容<br />假装很丰富的内容<br />假装很丰富的内容<br />
    假装很丰富的内容<br />假装很丰富的内容<br />假装很丰富的内容<br />假装很丰富的内容<br />
    假装很丰富的内容<br />假装很丰富的内容<br />假装很丰富的内容<br />假装很丰富的内容<br />
    <select><option>又一个用于测试IE6中是否能覆盖住的select</option></select><br />
    假装很丰富的内容<br />假装很丰富的内容<br />假装很丰富的内容<br />假装很丰富的内容<br />
    <div style="text-align:center;"><input type="button" value="位于第二屏中的按钮" onclick="showLayer('lightBox')" /><input type="button" value="当内容已经超过了一屏的高度" onclick="showLayer('lightBox2')" /></div>
    假装很丰富的内容<br />假装很丰富的内容<br />假装很丰富的内容<br />假装很丰富的内容<br />
    假装很丰富的内容<br />假装很丰富的内容<br />假装很丰富的内容<br />假装很丰富的内容<br />
    假装很丰富的内容<br />假装很丰富的内容<br />假装很丰富的内容<br />假装很丰富的内容<br />
</div>
<script>
function showLayer(id) {
    document.getElementById(id).style.display = "block";
}
function hideLayer(id) {
    document.getElementById(id).style.display = "none";
}
</script>
</body>
</html>
```
