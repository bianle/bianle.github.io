title: WordPress如何更换域名
tags: [wordpress]
categories: php
date: 2012-02-01 18:09:17
---

wordpress后台更换域名但不换主机时，怎么才能使以前数据库中的地址变成新域名呢？下面将会介绍wordpress数据库新老域名批量替换的方法。

1. 修改数据库配置文件，如果你在同一主机同一空间上更改域名，这步可以省掉，如果数据库不同，还得要打开wp-config.php将数据库配置正确才可以正常访问新域名。

2. 更改博客的安装地址和博客地址，首先用phpmyadmin打开你的数据库，然后找到wp-options这个数据表，找到第一条记录也就是siteurl这条，还有第39条home，这两条将地址改成你更换后的最域名即可。只有完成这一步后，才可以顺利进入后台，否则即使你输入密码，也会自动跳转到原来的老域名。PHP My管理中选择数据库，—->点击 SQL 在输入栏中输入如下代码： 
```
UPDATE wp_options SET option_value = replace( option_value, ‘http://老域名’, ’http://新域名’) WHERE option_name = ‘home’ OR option_name =’siteurl’ ;
```


3. 修改文章内部所有的链接为新域名，相信大家在以前发表的文章中一定加了不少内链吧，域名更换了，老的内链也就没有意义了。此时得要将文章内链的旧域名修改为新域名。如果从后台文章编辑里一个一个找那是不现实的，方法有一个，通用phpmyadmin进入你所在的数据库，执行以下语句就可以把文章内的所有内链旧域名批量改为新域名： 
```
UPDATE wp_posts SET post_content = replace(post_content, ‘http://老域名’, ‘http://新域名’); 
UPDATE wp_posts SET guid = replace( guid, ‘http://老域名’ , ’http://新域名’ ) ;
```
好了进入后台用以前的账号密码登陆就好了。
