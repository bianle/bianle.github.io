---
title: emacs从剪贴板粘贴图片
date: 2016-10-26 11:39:15
tags: emacs
categories: eamcs
---

## 背景

emacs写日志时插入图片链接一般步骤：
1. 准备图片（截图或下载）
2. 上传图床(我一般用[七牛](https://portal.qiniu.com/signup?code=3l7qkpblwkspe))
3. 获取外链
4. 粘贴到emacs

超级繁琐！

## 前车之鉴

接着就是在网上搜到了[这篇文章](http://everet.org/screenshot-and-image-paste-in-emacs-when-writing-markdown.html)

讲述了两种插入图片的方法：
1. emacs调用截图命令保存图片到指定目录然后插入图片链接
2. 拷贝本地图片（文件）然后获取剪贴板中文件地址，拷贝文件到指定目录插入图片链接

方法1基本能满足现在的需求:
问题1：我用的mac，截图用的scrot为linux版本，这个好解决，替换成`screencapture`
```
(call-process "screencapture" nil nil nil "-i" filename)
```
问题2：截图时emacs一直保持在屏幕中，截图emacs之外的应用有点复杂

## 造轮子

既然如此，花费一晚上,稍加改造就有了如下代码：

```
;;------------------------------------------------------------------
;; 粘贴图片到七牛服务器
;;------------------------------------------------------------------
(defun paste-image()
  "paste image from clipboard"
  (interactive)
  (setq localBaseDir "~/.qiniu/bianle/")
  (call-process-shell-command (concat "mkdir -p " (concat localBaseDir "$(date +%Y/%m/%d)")) )
  (setq relFilename (format-time-string "%Y/%m/%d/%Y%m%d%H%M%S.png" (current-time)) )
  (setq filename (concat localBaseDir relFilename ))
  (message (concat "/usr/local/bin/pngpaste " filename))
  (call-process-shell-command (concat "/usr/local/bin/pngpaste " filename))
  (call-process-shell-command "~/sh/sync.sh")
  (insert (concat "![](http://7xlbo3.com1.z0.glb.clouddn.com/" relFilename ")"))
  )

```

## 怎么跑起来

### 安装
1. 安装[pngpaste](https://github.com/jcsalterego/pngpaste)
```
brew install pngpaste
```
2. 安装[七牛命令行同步工具](http://docs.qiniu.com/tools/v6/qrsync.html)
3. emacs配置文件添加上边的脚本

### 使用
使用任意截图软件截图，然后`M-x`输入`paste-image`然后`RET`

### 效果
我要在这之后插入一张截图：![](http://7xlbo3.com1.z0.glb.clouddn.com/2016/10/26/20161026125447.png)

## 图片文件拖拽到emacs(2016-12-01 14:13:40)

```
(defun md-dnd-func (event)
  (interactive "e")
  (goto-char (nth 1 (event-start event)))
  (x-focus-frame nil)
  (let* ((payload (car (last event)))
         (type (car payload))
         (fname (cadr payload))
         (img-regexp "\\(gif\\|png\\|jp[e]?g\\)\\>")
	 (localBaseDir "~/.qiniu/bianle/")
	 (relFilename (concat (format-time-string "%Y/%m/%d/" (current-time)) (nth 0 (last (split-string fname "/"))))))
    (cond
     ;; insert image link
     ((and  (eq 'drag-n-drop (car event))
            (eq 'file type)
            (string-match img-regexp fname))
      (call-process-shell-command (concat "mkdir -p " (concat localBaseDir "$(date +%Y/%m/%d)")) )
      (call-process-shell-command (format "cp %s %s" fname (concat localBaseDir "$(date +%Y/%m/%d)" "/") ))
      (call-process-shell-command "~/sh/sync.sh")
      (insert (format "![](http://7xlbo3.com1.z0.glb.clouddn.com/%s)" relFilename))
      (beginning-of-line)
      (forward-char 2)
      ;;(org-display-inline-images t t))
      ;; regular drag and drop on file
     ((eq 'file type)
      (insert (format "[[%s]]\n" fname)))
     (t
      (error "I am not equipped for dnd on %s" payload))))))
(require 'markdown-mode)
(define-key markdown-mode-map (kbd "<drag-n-drop>") 'md-dnd-func)
```

### 效果

![emacs-dnd](http://7xlbo3.com1.z0.glb.clouddn.com/2016/12/01/300001373817132306239057513_950.jpg)

![emacs-dnd](http://7xlbo3.com1.z0.glb.clouddn.com/2016/12/01/emac-dnd.gif)
