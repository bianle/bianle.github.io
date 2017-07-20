---
title: "ghost集成disqus评论"
date: 2016-11-09 08:27:56
tags: disqus
categories: ghost
---

## 注册disqus获取插件代码

## 修改`content/themes/casper`下`post.hbs`,在最后一个`<footer>`里追加



```
<!--disqus plugin begin-->

<div id="disqus_thread"></div>
<script>
/**
* RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
* LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables
*/
/*
var disqus_config = function () {
this.page.url = PAGE_URL; // Replace PAGE_URL with your page's canonical URL variable
this.page.identifier = PAGE_IDENTIFIER; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
};
*/
(function() { // DON'T EDIT BELOW THIS LINE
var d = document, s = d.createElement('script');

s.src = '//leim.disqus.com/embed.js';

s.setAttribute('data-timestamp', +new Date());
(d.head || d.body).appendChild(s);
})();
</script>
<noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript" rel="nofollow">comments powered by Disqus.</a></noscript>

<script id="dsq-count-scr" src="//leim.disqus.com/count.js" async></script>

<!--disqus plugin ended-->
```

![ghost-disqus](http://7xlbo3.com1.z0.glb.clouddn.com/2016/11/09/20161109084206.png)

![ghost-disqus](http://7xlbo3.com1.z0.glb.clouddn.com/2016/11/09/20161109084300.png)

## 参考

http://blog.christophvoigt.com/enable-comments-on-ghost-with-disqus/


