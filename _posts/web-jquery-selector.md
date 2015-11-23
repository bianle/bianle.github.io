title: jquery多选选择器
tags: [jquery]
categories: web前端
date: 2012-12-10 18:09:17
---
```
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
  <script src="jquery.js"></script>
	<script>

		(function(){
			//选中
			function doSelect(id){
				var name = $("#"+id).attr("name");
				var sel = $("#div"+name);
				sel.css("background","#FFFFFF");
				$("#a1"+name).hide();
				$("#a2"+name).show();
				$("#selected").append(sel);
			}
			//取消选中
			function doUnSelect(id){
				var name = $("#"+id).attr("name");
				var unSel = $("#div"+name);
				unSel.css("background","#FFFFFF");
				$("#a1"+name).show();
				$("#a2"+name).hide();
				$("#unselected").append(unSel);
			}
			//获得选中项
			function getSelectVals(){
				var selDiv = $("#selected");
				var ids = "";
				$("div",selDiv).each(function(){
					ids+=$(this).attr("name")+",";
				});

				alert("选中"+ids);
			}
			function hoverIt(id){
				$("#"+id).css("background","#E7EFFC");
			}
			function outIt(id){
				$("#"+id).css("background","#FFFFFF");
			}
			$(document).ready(function(){

				for(var i=0;i<10;i++){
					var v = "00"+i;
					var n = "北京"+i;
					var div = $("<div></div>");
					div.attr("id","div"+v);
					div.attr("name",v)
					var a1 = $("<a></a>");
					a1.attr("id","a1"+v);
					a1.attr("name",v);
					a1.html("<img src='add.png' />");
					a1.css({"width":"20px","display":"block","float":"left","cursor":"pointer"});
					var a2 = $("<a></a>");
					a2.attr("id","a2"+v);
					a2.attr("name",v);
					a2.html("<img src='delete.png' />");
					a2.css({"width":"20px","display":"block","float":"left","display":"none","cursor":"pointer"});
					var a0 = $("<a></a>");
					a0.html(n);
					a0.css({"width":"120px","display":"block","float":"left"});
					div.append(a0);
					div.append(a1);
					div.append(a2);
					div.css({"padding":"3","float":"left","margin":"0"});
					div.mouseover(function(){
						hoverIt(this.id);
					});
					div.mouseout(function(){
						outIt(this.id);
					});
					$("#unselected").append(div);
					a1.bind("click",function(){
						doSelect(this.id);
					});
					a2.bind("click",function(){
						doUnSelect(this.id);
					});

				}

				$("#selBtn").bind("click",getSelectVals);

			});
		})(jQuery)
	</script>
 </HEAD>

 <BODY>
  <div>
	<TABLE>
	<TR>
		<TD>已选择</TD>
		<TD>未选择</TD>
	</TR>
	<TR>
		<TD valign="top">
			<div id="selected" style="height:200px;width:200px;overflow-y:scroll;overflow-x:auto;border:1px solid #B5B8C8;padding:5px; ">	
			</div>
		</TD>
		<TD valign="top">
			<div id="unselected" style="height:200px;width:200px;overflow-y:scroll;overflow-x:auto;border:1px solid #B5B8C8;padding:5px; ">
			</div>
		</TD>
	</TR>
	<tr>
		<td><input type="button" id="selBtn" value="保存" /></td>
	</tr>
	</TABLE>
  </div>
 </BODY>
</HTML>
```
