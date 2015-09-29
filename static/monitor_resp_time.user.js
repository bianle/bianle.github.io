// ==UserScript==
// @name        监控-响应时间
// @author      边乐
// @description 监控-响应时间
// @namespace   http://2le.me
// @updateURL   http://2le.me/static/monitor_resp_time.user.js
// @downloadURL http://2le.me/static/monitor_resp_time.user.js
// @icon        http://2le.me/static/mokey.png
// @license     GPL version 3
// @encoding    utf-8
// @date        28/09/2015
// @modified    28/09/2015
// @include     http://log.monitor.cnsuning.com/monitor-log/ihs/myPage/myRealTimePage
// @match       http://log.monitor.cnsuning.com/monitor-log/ihs/myPage/myRealTimePage
// @require     http://2le.me/static/jquery.js
// @grant       none
// @run-at      document-end
// @version     1.0.0
// ==/UserScript==

var conf = {'http://pai.suning.com/shanpai/myCart/toPayDeposit.htm':150
,'http://pai.suning.com/shanpai/orderConfirm/createOrder.htm':400
,'http://pai.suning.cn/shanpai/server/push':3
,'http://pai.suning.com/shanpai/bid/changePrice.htm':150
,'http://pai.suning.com/shanpai/orderConfirm/shop.htm':150
,'http://pai.suning.com/shanpai/bond/order.htm':150
,'http://pai.suning.com/shanpai/orderConfirm/getMemInfo.htm':150
,'http://pai.suning.com/shanpai/orderConfirm/getfreight.htm':100
,'http://pai.suning.com/shanpai/detail/d/{itemId}-{f}.htm':120
,'http://m.pai.suning.com/shanpai/bid/changePrice.htm':150
,'http://m.pai.suning.com/shanpai/detail/{itemId}_{f}.html':120
}
function diff(){
    $("#added").remove();
    var $div = $("<div id="added" style="position:absolute;top:0;left:0px;margin:0 0 0px 0;padding:0 3px 0px 3px;overflow:hidden;background: rgba(52, 52, 52, 0.5);box-shadow: 3px 3px 3px; "></div>");
    var cont ='';
    $("#pageMyform tr").each(function(ind){
        if(ind!=0){
            var url = $(this).find("td[aria-describedby='pageMyform_url']").text();
            var respTime = $(this).find("td[aria-describedby='pageMyform_responseTime']").text();
            var max = conf[url];
            var color='black',msg = '--',result='--',ok='<font style="\'\'">ok!</font>',warn='<font style="\'\'">warn!</font>';
            if(max){
                if(respTime>=max*2){
                    color = 'red';
                    result=warn;
                    msg = '>'+max+'*2';
                }else{
                    color = 'green';
                    result=ok;
                    msg = '<'+max+'*2'; }="" cont="" +="<div width=\"100\" height=\"23\" role=\"gridcell\" style=\"color:" +color+';text-align:left;font-weight:bold;height:20px;margin-top:3px\"="" title="\"\"" aria-describedby="\"added\"">'+result+'&nbsp;'+msg+'';
        }    
    });
    $div.append(cont);
    $div.click(function(){
        $(this).hide();
    });
    $('#pageMyform').after($div);
}



var mySearchBtn = '<input type="\"button\"" id="mySearchBtn" style="\"margin-left:" 20px\"="" onclick="\"\"" value="\"PAIApache\"">';
var diffBtn = '<input type="\"button\"" id="diffButton" style="\"margin-left:" 20px\"="" onclick="\"\"" value="\"对比\"">';
$("#queryPageStatusButton").after(diffBtn);
$("#queryPageStatusButton").after(mySearchBtn);

$("#diffButton").click(function(){
    diff();
});
$("#mySearchBtn").click(function(){
    $("#systemNameField").val('PAIApache');
    $("#queryPageStatusButton").click();
});

</'+max+'*2';>