title: alert
date: 2014-09-12 15:23:28
tags: [js]
categories: web前端
---
```
<script>
  
//改写alert

  
window.alert = function(txt)

  
{

  
    var shield = document.createElement("DIV");

  
    shield.id = "shield";

  
    shield.style.position = "absolute";

  
    shield.style.left = "0px";

  
    shield.style.top = "0px";

  
    shield.style.width = "100%";

  
    shield.style.height = document.body.scrollHeight+"px";

  
    shield.style.background = "#333";

  
    shield.style.textAlign = "center";

  
    shield.style.zIndex = "10000";

  
    shield.style.filter = "alpha(opacity=0)";

  
    var alertFram = document.createElement("DIV");

  
    alertFram.id="alertFram";

  
    alertFram.style.position = "absolute";

  
    alertFram.style.left = "50%";

  
    alertFram.style.top = "50%";

  
    alertFram.style.marginLeft = "-225px";

  
    alertFram.style.marginTop = "-75px";

  
    alertFram.style.width = "450px";

  
    alertFram.style.height = "150px";

  
    alertFram.style.background = "#ccc";

  
    alertFram.style.textAlign = "center";

  
    alertFram.style.lineHeight = "150px";

  
    alertFram.style.zIndex = "10001";

  
    strHtml = "<ul style="list-style:none;margin:0px;padding:0px;width:100%">n";

  
    strHtml += " <li style="background:#DD828D;text-align:left;padding-left:20px;font-size:14px;font-weight:bold;height:25px;line-height:25px;border:1px solid #F9CADE;">[倍儿忙网系统提示]</li>n";

  
    strHtml += " <li style="background:#fff;text-align:center;font-size:12px;height:120px;line-height:120px;border-left:1px solid #F9CADE;border-right:1px solid #F9CADE;">"+txt+"</li>n";

  
    strHtml += " <li style="background:#FDEEF4;text-align:center;font-weight:bold;height:25px;line-height:25px; border:1px solid #F9CADE;"><input type="button" value="确 定" onclick="doOk()" /></li>n";

  
    strHtml += "</ul>n";

  
    alertFram.innerHTML = strHtml;

  
    document.body.appendChild(alertFram);

  
    document.body.appendChild(shield);

  
    var c = 0;

  
    this.doAlpha = function(){

  
        if (c++ > 20){clearInterval(ad);return 0;}

  
        shield.style.filter = "alpha(opacity="+c+");";

  
    }

  
    var ad = setInterval("doAlpha()",5);

  
    this.doOk = function(){

  
        alertFram.style.display = "none";

  
        shield.style.display = "none";

  
    }

  
    alertFram.focus();

  
    document.body.onselectstart = function(){return false;};

  
} 



</script> 



<div class="grsz_bottomyuan">
  
</div>

  
</div>    
</div>

  
<div class="main_right">

  
<script>

  
function chkpwd(){

  
if(document.getElementById('title').value==""){

  
alert('标题不能为空');

  
return false;

  
}else if(document.getElementById('up_changeimg').value==""){

  
alert('图片上传不能为空');

  
return false;

  
}

  
}

  
</script>

  
<div class="basic_biaoqian">

  
<a href="http://192.168.0.10">倍儿忙网</a>&nbsp;>&nbsp;<a href="http://192.168.0.10/cp.php?do=control">个人设置</a>&nbsp;>&nbsp;<a href="http://192.168.0.10/cp.php?do=control&op=changeimg">图片轮换</a>

  
</div>

  
           <form action="http://192.168.0.10/cp.php?do=control&op=changeimg" enctype="multipart/form-data" method="post" name="form_img" id="form_img" onsubmit="return chkpwd();">

  
            <div class="grsz_contant emial_contant">

  
<div class="emial lunbojieshi">

  
<div class="lunbo_title">

  
使用必读:

  
</div>

  
<div class="lunbo_zizi">

  
1.请填写您想展示的信息标题。<br />

  
2.请填写此信息的地址，务必为站内地址，否则将不予审核。<br />

  
3.图片大小限制为400*300像素的jpg或gif图片。【图片制作指南】<br />

  
4.你所提交的广告图片钭在24小时之内 审核，审核结果将通过站内信息告知您<br />

  
</div>

  
</div>

  
<div class="lunhun_ming">

  
<div class="nicheng">

  
<div class="username c">标题：

  
</div>

  
<div class="web">

  
<input type="text" name="title" id="title"  value="" class="grsz_wek qianming biankuang"/>

  
</div>

  
</div>

  
<div class="nicheng">

  
<div class="username c">链接：

  
</div>

  
<div class="web">

  
<input type="text" name="url" id="url" value="http://" class="grsz_wek qianming biankuang" />

  
</div>

  
</div>

  
<div class="nicheng">

  
<div class="username c">图片：

  
</div>

  
<div class="web">

  
<input type="file" name="up_changeimg" value="" id="up_changeimg" class="lunhuan_youlan biankuang"/>

  
</div>

  
</div>

  
</div> 



<div class="basic_bar">
  
<input type="submit" name="savesubmit" id="savesubmit" class="bar" value="确 认"/>

  
</div>

  
           </div>

  
          </form>

  
   </div>

  
</div>

  
</div>
```
