---
title: "jekyll安装"
date: 2016-11-06 21:30:33
tags: jekyll
categories: blog
---

## windows安装jekyll
1. 安装ruby
http://rubyinstaller.org/downloads/
2. 安装RubyDevKit

```
cd C:\RubyDevKit
ruby dk.rb init
ruby dk.rb install
```

```
gem install jekyll
```

参考：
http://jekyll-windows.juthilo.com/1-ruby-and-devkit/

## jekyll中转义jekyll代码

jekyll中使用的Liquid模板引擎，用`raw`标签可以转义
```
{% raw %} 
<此处为代码块> 
{% endraw %}
```
 
参见：
[http://stackoverflow.com/questions/22044488/jekyll-code-in-jekyll](http://stackoverflow.com/questions/22044488/jekyll-code-in-jekyll)

>The `{% raw %}{%...%}{% endraw %}` syntax used by Jekyll is part of the Liquid templating engine. To escape these tags, and so show them literally, you should use the raw tag.  
>You will probably want to combine this with the markdown syntax for code blocks. With Redcarpet you can use the triple backtick syntax. It doesn’t matter if you put the backticks inside the raw tags or the other way round:
>```
{%raw%}
{% for post in site.posts %}
{% if post.categories contains '<categoryname>' %}
    <h2>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </h2>
{% endif %}
{% endfor %}
{%endraw%}
```

## jekyll themes

http://jekyllthemes.org/

## jekyll 子模块

```
git submodule add  -b master   -- "https://github.com/bianle/HelloWorld.git"  "_post"
```
https://github.com/jekyll/jekyll/issues/679



