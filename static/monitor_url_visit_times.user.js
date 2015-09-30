// ==UserScript==
// @name        监控-URL访问量
// @author      边乐
// @description 监控-URL访问量
// @namespace   http://2le.me
// @updateURL   http://2le.me/static/monitor_url_visit_times.user.js
// @downloadURL http://2le.me/static/monitor_url_visit_times.user.js
// @icon        http://2le.me/static/mokey.png
// @license     GPL version 3
// @encoding    utf-8
// @date        28/09/2015
// @modified    28/09/2015
// @include     http://log.monitor.cnsuning.com/monitor-log/ihs/ihsPerformance/urlVisitsByTime
// @match       http://log.monitor.cnsuning.com/monitor-log/ihs/ihsPerformance/urlVisitsByTime
// @grant       none
// @run-at      document-end
// @version     1.0.0
// ==/UserScript==

Date.prototype.format = function(format){ 
	var o = { 
	"M+" : this.getMonth()+1, //month 
	"d+" : this.getDate(), //day 
	"h+" : this.getHours(), //hour 
	"m+" : this.getMinutes(), //minute 
	"s+" : this.getSeconds(), //second 
	"q+" : Math.floor((this.getMonth()+3)/3), //quarter 
	"S" : this.getMilliseconds() //millisecond 
	} 

	if(/(y+)/.test(format)) { 
		format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
	} 

	for(var k in o) { 
		if(new RegExp("("+ k +")").test(format)) { 
			format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length)); 
		} 
	}
	return format; 
} 

var mySearchBtn = '<input type="\"button\"" id="\"mySearchBtn\"" style="\"margin-left:" 20px\"="" onclick="\"\"" value="\"PAIApache\"">';
var fiveMin = '<input type="\"button\"" id="\"fiveMin\"" style="\"margin-left:" 20px\"="" onclick="\"\"" value="\"前五分钟\"">';
var fiveMin2 = '<input type="\"button\"" id="\"fiveMin2\"" style="\"margin-left:" 20px\"="" onclick="\"\"" value="\"近五分钟\"">';
$("#query").after(fiveMin2);
$("#query").after(fiveMin);
$("#query").after(mySearchBtn);

$("#mySearchBtn").click(function(){
    $("#systemNameField").val('PAIApache');
    $("#query").click();
});

$("#fiveMin2").click(function(){
    $("#systemNameField").val('PAIApache');
    var d = new Date();
    var offset = -5;
    d.setMinutes(d.getMinutes() + offset, d.getSeconds(), 0);
    var start = d.format("yyyy-MM-dd hh:mm:ss");
    $("#begin_date").val(start);
    $("#query").click();
});
$("#fiveMin").click(function(){
    $("#systemNameField").val('PAIApache');
    var end = $("#end_date").val();
    var d = new Date(end.replace("-","/"));
    var offset = -5;
    d.setMinutes(d.getMinutes() + offset, d.getSeconds(), 0);
    var start = d.format("yyyy-MM-dd hh:mm:ss");
    $("#begin_date").val(start);
    $("#query").click();
});
