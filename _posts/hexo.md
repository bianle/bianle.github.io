title: hexo
date: 2015-11-19 10:15:36
tags: hexo 
categories: hexo
---

## hexo 安装
[hexo你的博客](http://ibruce.info/2013/11/22/hexo-your-blog/)

## hexo 插件

### 安装方法 
```
[sudo] npm install --save <插件名>
```
如：
```
<<<<<<< HEAD
npm install --save hexo-deployer-git
=======
npm install --save hexo-deployer-get
>>>>>>> 6db12a9147e2e19ad77c1dd9325ac3b6c6cfcd90
```

### 常用插件

1. `hexo-deployer-git` 部署到github
2. `hexo-ruby-character` （依赖nodejieba）效果如下：
>{%raw%}
{% ruby Base|top %}
{%endraw%}
>{% ruby Base|top %}
3. `nodejieba` 拼音
4. `hexo-math` 数学公式
5. `hexo-generator-feed` rss订阅
6. `hexo-tag-demo`
6. `hexo-tag-kbd`
7. `hexo-image-caption`
8. `hexo-pdf`
### 所有插件

https://hexo.io/plugins/

<<<<<<< HEAD
## 主题

### 自己写个主题
[Hexo 主题制作指南](http://chensd.com/2016-06/hexo-theme-guide.html)

=======
>>>>>>> 6db12a9147e2e19ad77c1dd9325ac3b6c6cfcd90
## 常见错误

1. `ERROR Deployer not found: github`  
hexo 更新到3.0之后，deploy的type 的github需要改成git

2. `ERROR Deployer not found: git`  
安装`hexo-deployer-git`插件`npm install hexo-deployer-git –-save`

3. `Error: spawn git ENOENT`  
[hexo部署问题：Error: spawn git ENOENT](http://blog.csdn.net/rainloving/article/details/46595559)


## hexo站内搜索

[利用swiftype为hexo添加站内搜索v2.0](http://www.jerryfu.net/post/search-engine-for-hexo-with-swiftype-v2.html)

## hexo seo

[动动手指，不限于NexT主题的Hexo优化（SEO篇）](http://www.arao.me/2015/hexo-next-theme-optimize-seo/)


## hexo脚注

- 安装[hexo-renderer-markdown-it](https://github.com/celsomiranda/hexo-renderer-markdown-it)
```
npm un hexo-renderer-marked --save
npm i hexo-renderer-markdown-it --save
```

- 配置
```
markdown:
  render:
    html: true
    xhtmlOut: false
    breaks: false
    linkify: true
    typographer: true
    quotes: '“”‘’'
  plugins:
    - markdown-it-footnote
    - markdown-it-sup
    - markdown-it-sub
    - markdown-it-abbr
#    - markdown-it-emoji
  anchors:
    level: 1
    collisionSuffix: 'v'
    permalink: true
    permalinkClass: header-anchor
    permalinkSymbol: ' '
```
