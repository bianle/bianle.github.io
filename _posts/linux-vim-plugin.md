title: Vim插件：增加模糊查找和智能补全功能
tags: [linux,vim,插件]
categories: linux
date: 2012-07-12 18:09:17
---
这里给大家推荐一个Vim配置工具，本工具由fisadev个人开发，并且遵循GPL开源协议，所以你可以放心地使用它！因为这是作者个人使用，所以设置都是按照作者自己的习惯来的，如有不适应，你可以自己修改源代码。废话不多说，先看预览图：

智能的自动提示

右侧是“类浏览器 ”

代码错误检查

代码模糊匹配
这里推荐使用Vundle管理插件，安装和卸载插件都非常简单！插件的安装位置在 .Vim/bundle/。更多信息点击[这里](https://github.com/VundleVim/Vundle.vim)。
智能的自动填充功能。可以自动填充模块名、实例方法和属性，有时还会提示使用过的文本（比如常用命名）。
模糊文件和代码查找功能
,e = 打开文件（就像:e一样）但是增加了递归查询和模糊匹配。例如：如果你输入“mopy”，它匹配到一个分目录下的“models.py”文件，你可以直接使用Ctrl+T打开文件。
,g = 模糊服务查找 （类、方法、变量、函数，以及等等……）例如：如果你输入“usr”，它可以找到当前文件里的User类定义。
,f = 模糊文本查找，并且打开文件。 例如：如果你输入“ctm=6”，它能匹配到“current_time = 16”。
,d = 和 ,g相同 (symbol finder) 但是搜索的是指针下的单词 (sort of "fuzzy go to definition")。
,E = 和 ,e相同 (file finder)不过搜索的是光标下的文件 (sort of "fuzzy go to file")。
类/模块浏览器。类/模块浏览器里列出了类、函数、方法以及类似文件，敲回车键就可以导航过去。使用F4切换它的状态。 
F2挂起任务浏览器。这会从读取当前文件开始，并且搜索“TODO”和“FIXME”等注释，然后在列表里显示。导航方法和类浏览器类似。
使用Pyflakes对Python代码进行错误检查。它可以检测出代码里未使用的变量和引用，以及语法错误等等。
在当前Python文件上运行PEP8验证器，输入“,8” ，就会显示Pyflakes检测出来的Python错误。
它同时还是一个相当优秀的Python和PHP调试器。这里有一个小教程，我增加了几个键盘快捷键方便使用（这只有在调试器启动后才可以使用）。
F5 = 单步执行（step over）
F6 = 插入（step into）
F7 = 跳出（step out）
F8 = 执行到断点处停止
F9 = 设置断点
F10 = 在表达式窗口计算表达式结果
F11 = go down on the stack
F12 = go up on the stack
推荐你看看视频教程，在这里我无法给出所有用法举例。 
安装步骤
首先你需要Vim Python编译支持，并且保证安装目录下没有.Vim文件夹。（你可以运行Vim –version | grep +Python来检查你的Vim是否支持Python。）
软件依赖：

sudo apt-get install exuberant-ctags git 
sudo pip install dbgp Vim-debug pep8 flake8 pyflakes 
如果你没有安装pip，可以在[这里](https://pypi.python.org/pypi/pip)下载。
配置好安装文件
把下载的.Vimrc文件放到Linux home文件夹下。
例如我的用户名是fisa，那就把它放到/home/fisa/目录下。
打开Vim
在终端打开Vim，它将会自动安装插件到.Vim/bundle目录下。你所需要做的就是等待安装完成，然后就会看到崭新的闪亮的Vim！
可选：
如果你喜欢，可以查看[README](https://github.com/fisadev/fisa-Vim-config/blob/master/README.rst)文件结尾的使用指南。
项目[GitHub地址](https://github.com/fisadev/fisa-Vim-config)
