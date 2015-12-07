// ==UserScript==
// @name        监控-Mysql
// @author      边乐
// @description 监控-Mysql
// @namespace   http://2le.me
// @updateURL   http://2le.me/static/monitor_mysql.user.js
// @downloadURL http://2le.me/static/monitor_mysql.user.js
// @icon        http://2le.me/static/mokey.png
// @license     GPL version 3
// @encoding    utf-8
// @date        28/09/2015
// @modified    28/09/2015
// @include     http://db.monitor.cnsuning.com/monitor-db/mysqlSummary/serverIndex?param=indexOfServer
// @match       http://db.monitor.cnsuning.com/monitor-db/mysqlSummary/serverIndex?param=indexOfServer
// @grant       none
// @run-at      document-end
// @version     1.0.0
// ==/UserScript==


var mySearchBtn = '<input type="\"button\"" id="\"mySearchBtn\"" style="\"margin-left:" 10px;width:35px\"="" onclick="\"\"" value="\"244\"">';
var mySearchBtn2 = '<input type="\"button\"" id="\"mySearchBtn2\"" style="\"margin-left:" 10px;width:35px\"="" onclick="\"\"" value="\"245\"">';
var $qBtn = $("#queryDiv input[type='button']");
$qBtn.after(mySearchBtn2);
$qBtn.after(mySearchBtn);
$qBtn.css({marginLeft:'10px'});
$("#mySearchBtn").click(function(){
    myQuery('192.168.212.244');
});

$("#mySearchBtn2").click(function(){
    myQuery('192.168.212.245');
});

function myQuery(ip){
    $("#dataBaseIp").val(ip);
    $("#dataBaseIp_chzn a span").text(ip);
    $("#dataBaseIp").trigger("change");
    $("#dataBaseServer").trigger("change");
    $qBtn.click();
}
