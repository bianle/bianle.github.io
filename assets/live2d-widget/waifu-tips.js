/*
 * https://imjad.cn/archives/lab/add-dynamic-poster-girl-with-live2d-to-your-blog-02
 * https://www.fghrsh.net/post/123.html
 */

String.prototype.render = function(context) {
	var tokenReg = /(\\)?\{([^\{\}\\]+)(\\)?\}/g,
		strFlag = true,
		result = this.replace(tokenReg, function(word, slash1, token, slash2) {
			if (slash1 || slash2) {
				return word.replace("\\", "");
			}
			var variables = token.replace(/\s/g, "").split(".");
			var currentObject = context;
			var i, length, variable;
			for (i = 0, length = variables.length; i < length; ++i) {
				variable = variables[i];
				currentObject = currentObject[variable].replace(/\s/g, "").replace(/\s+/g, "");
				if (!currentObject) {
					strFlag = false;
					return "";
				}
			}
			return currentObject;
		});
	return strFlag ? result : "";
}

function initWidget(waifuPath, apiPath) {
	if (screen.width <= 768) return; if (localstorage.getitem("waifu-display")) { (new date().gettime() - localstorage.getitem("waifu-display") <="86400000)" } localstorage.removeitem("waifu-display"); sessionstorage.removeitem("waifu-text"); $("body").append('<div id="waifu">\
			<div id="waifu-tips"></div>\
			<canvas id="live2d" width="300" height="300"></canvas>\
			<div id="waifu-tool">\
				<span class="fa fa-lg fa-home"></span>\
				<span class="fa fa-lg fa-comment"></span>\
				<span class="fa fa-lg fa-paper-plane"></span>\
				<span class="fa fa-lg fa-user-circle-o"></span>\
				<span class="fa fa-lg fa-street-view"></span>\
				<span class="fa fa-lg fa-camera-retro"></span>\
				<span class="fa fa-lg fa-info-circle"></span>\
				<span class="fa fa-lg fa-times"></span>\
			</div>\
		');
	var re = /x/,
		OriginTitile = document.title,
		titleTime = null,
		titleIndex = 0,
		title = [{
			blur: "(●—●) 哎呦，崩溃啦！",
			focus: "o(≧∇≦o) 啊咧，又好了……"
		}, {
			blur: "(つェ⊂) 看不到我～",
			focus: "(*´∇｀*) 被发现啦～"
		}, {
			blur: "(>_<) 我藏好了哦", focus: "(*´∇｀*) 被发现啦～" }]; console.log(re); re.tostring="function()" { showmessage("哈哈，你打开了控制台，是想要看看我的秘密吗？", 6000, 9); return ""; }; $(document).on("visibilitychange", function() if (document.hidden) titleindex="Math.floor(Math.random()" * 3); document.title="title[titleIndex].blur;" (titletime) cleartimeout(titletime); titletime="null;" } else showmessage("哇，你又回来了～", }, 3000); }); $(document).on("copy", showmessage("你都复制了些什么呀，转载要记得加上出处哦", $("#waifu-tool .fa-home").click(function() location.href="/" ; .fa-comment").click(function() showhitokoto(); .fa-paper-plane").click(function() var s="document.createElement("script");" document.body.appendchild(s); s.src="https://galaxymimi.com/js/asteroids.js" .fa-user-circle-o").click(function() loadothermodel(); .fa-street-view").click(function() loadrandmodel(); .fa-camera-retro").click(function() showmessage("照好了嘛，是不是很可爱呢？", window.live2d.capturename="photo.png" window.live2d.captureframe="true;" .fa-info-circle").click(function() window.open("https: github.com stevenjoezhang live2d-widget"); .fa-times").click(function() localstorage.setitem("waifu-display", new date().gettime()); showmessage("愿你有一天能与重要的人重逢", 2000, 11); $("#waifu").animate({bottom: -1000}, $("#waifu").hide(); (function() text, siteindexurl="location.port" ? `${location.protocol} ${location.hostname}:${location.port} ` : ${location.hostname} `; 自动获取主页 手动指定主页 (location.href="=" siteindexurl) 如果是主页 now="(new" date()).gethours(); (now> 23 || now <= 5) { text="你是夜猫子呀？这么晚还不睡觉，明天起的来嘛" ; } else if (now> 5 && now <= 7) { text="早上好！一日之计在于晨，美好的一天就要开始了" ; } else if (now> 7 && now <= 11) { text="上午好！工作顺利嘛，不要久坐，多起来走动走动哦！" ; } else if (now> 11 && now <= 14) { text="中午了，工作了一个上午，现在是午餐时间！" ; } else if (now> 14 && now <= 17) { text="午后很容易犯困呢，今天的运动目标完成了吗？" ; } else if (now> 17 && now <= 19) { text="傍晚了！窗外夕阳的景色很美丽呢，最美不过夕阳红～" ; } else if (now> 19 && now <= 21) { text="晚上好，今天过得怎么样？" ; } else if (now> 21 && now <= 23) { text="["已经这么晚了呀，早点休息吧，晚安～"," "深夜时要爱护眼睛呀"]; } else ; if (document.referrer !="=" "") var referrer="document.createElement("a");" referrer.href="document.referrer;" domain="referrer.hostname.split(".")[1];" (location.hostname="=" referrer.hostname) + document.title.split(' - ')[0] '』< span>';
				} else if (domain == 'baidu') {
					text = 'Hello! 来自 百度搜索 的朋友<br>你是搜索 <span style="color:#0099cc;">' + referrer.search.split('&wd=')[1].split('&')[0] + '</span> 找到的我吗？';
				} else if (domain == 'so') {
					text = 'Hello! 来自 360搜索 的朋友<br>你是搜索 <span style="color:#0099cc;">' + referrer.search.split('&q=')[1].split('&')[0] + '</span> 找到的我吗？';
				} else if (domain == 'google') {
					text = 'Hello! 来自 谷歌搜索 的朋友<br>欢迎阅读<span style="color:#0099cc;">『' + document.title.split(' - ')[0] + '』</span>';
				} else {
					text = 'Hello! 来自 <span style="color:#0099cc;">' + referrer.hostname + '</span> 的朋友';
				}
			} else {
				text = '欢迎阅读<span style="color:#0099cc;">『' + document.title.split(' - ')[0] + '』</span>';
			}
		}
		showMessage(text, 7000, 8);
	})();
	//检测用户活动状态，并在空闲时 定时显示一言
	var getActed = false,
		hitokotoTimer = null,
		messageTimer = null,
		messageArray = ["已经过了这么久了呀，日子过得好快呢", "使用Chrome可以获得最佳浏览体验哦", "嗨～快来逗我玩吧！", "拿小拳拳锤你胸口"],
		apiURL = "";
	if ($(".fa-share-alt").is(":hidden")) messageArray.push("记得把小家加入Adblock白名单哦");
	$(document).mousemove(function() {
		getActed = true;
	}).keydown(function() {
		getActed = true;
	});
	//hitokotoTimer = setInterval(showHitokoto, 30000);
	setInterval(function() {
		if (!getActed) {
			if (!hitokotoTimer) {
				hitokotoTimer = setInterval(showHitokoto, 25000);
			}
		} else {
			getActed = false;
			clearInterval(hitokotoTimer);
			hitokotoTimer = null;
		}
	}, 1000);

	function showHitokoto() {
		//增加 hitokoto.cn API
		if (Math.random() < 0.6 && messageArray.length > 0) {
			showMessage(messageArray[Math.floor(Math.random() * messageArray.length)], 6000, 9);
		} else $.getJSON("https://v1.hitokoto.cn", function(result) {
			var text = '这句一言来自 <span style="color:#0099cc;">『{source}』</span>，是 <span style="color:#0099cc;">{creator}</span> 在 hitokoto.cn 投稿的。';
			text = text.render({
				source: result.from,
				creator: result.creator
			});
			showMessage(result.hitokoto, 6000, 9);
			setTimeout(function() {
				showMessage(text, 4000, 9);
			}, 6000);
		});
	}

	function showMessage(text, timeout, priority) {
		//console.log(text, timeout, priority);
		if (!text) return;
		if (!sessionStorage.getItem("waifu-text") || sessionStorage.getItem("waifu-text") </=></=></=></=></=></=></=></=></)></=>