// ==UserScript==
// @name        监控-Redis
// @author      边乐
// @description 监控-Redis
// @namespace   http://2le.me
// @updateURL   http://2le.me/static/monitor_redis.user.js
// @downloadURL http://2le.me/static/monitor_redis.user.js
// @icon        http://2le.me/static/mokey.png
// @license     GPL version 3
// @encoding    utf-8
// @date        28/09/2015
// @modified    28/09/2015
// @include     http://monitor.cnsuning.com/monitor-portal/redis/redisReport
// @match       http://monitor.cnsuning.com/monitor-portal/redis/redisReport
// @grant       none
// @run-at      document-end
// @version     1.0.0
// ==/UserScript==

var mySearchBtn = '<input type="\"button\"" id="\"mySearchBtn\"" class="\'span3" btn="" grey="" left2\'="" style="\"margin-left:" 20px\"="" onclick="\"\"" value="\"闪拍\"">';
$("#query").after(mySearchBtn);
$("#query").css({width:'11%',padding:'7px 2px 7px 2px'});
$("#mySearchBtn").css({width:'11%',padding:'7px 2px 7px 2px'});
$("#mySearchBtn").click(function(){
    $("#systemNameField").val('苏宁闪拍');
    $("#systemNameField_chzn a span").text('苏宁闪拍');
    $("#query").click();
});

