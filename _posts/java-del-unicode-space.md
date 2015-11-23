title: 删除unicode空格
date: 2014-09-12 15:24:23
tags: [js]
categories: web前端
---
```
<script> 
alert('unicode空格-> <-'.match(/^S+$/)); 
alert('普通空格-> <-'.match(/^S+$/)); 


if('删unicode空格-> '.charCodeAt('删unicode空格-> '.length-1) == 160){     alert('111 '.substr(0,'111 '.length-1)+""); 
} 
</script>
```
