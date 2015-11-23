title: python VideoCapture
date: 2015-10-14 15:38:04
tags: [python]
categories: [python]
---

# 环境
win10(64),python2.7

# 下载安装`VideoCapture`
官网:[http://videocapture.sourceforge.net/](http://videocapture.sourceforge.net/)
百度云:[http://pan.baidu.com/s/1eQBDqJw](http://pan.baidu.com/s/1eQBDqJw)
解压`VideoCapture`,将`pythonXX`覆盖`python`安装目录

官方提供了一个拍照例子:

```
from VideoCapture import Device

if __name__ == "__main__":
	cam = Device()
	cam.saveSnapshot('image.jpg')
```

# 下载安装PIL
官网:[http://www.pythonware.com/products/pil/](http://www.pythonware.com/products/pil/)
百度云:[http://pan.baidu.com/s/1pJEIFYb](http://pan.baidu.com/s/1pJEIFYb)
只找到了32位的,安装后报错
>ImportError: The _imaging C module is not installed

[http://www.lfd.uci.edu/~gohlke/pythonlibs/#pillow](http://www.lfd.uci.edu/~gohlke/pythonlibs/#pillow)查找pillow,pil的替代软件,下载对应64位版本whl文件
通过pip安装
```
pip install xxx.whl
```
安装pip参考[Windows下Python,setuptools,pip,virtualenv的安装](http://blog.useasp.net/archive/2014/01/16/install-python-setuptools-pip-and-virtualenv-in-windows.aspx)

接着报错:

>Traceback (most recent call last):
>  File "C:\Users\bl\Desktop\python\cam (2).py", line 4, in <module>
>    cam.saveSnapshot('image.jpg')
>  File "D:\bl\app\Python27\lib\VideoCapture.py", line 200, in saveSnapshot
>    self.getImage(timestamp, boldfont, textpos).save(filename, **keywords)
>  File "D:\bl\app\Python27\lib\VideoCapture.py", line 138, in getImage
>    im = Image.fromstring('RGB', (width, height), buffer, 'raw', 'BGR', 0, -1)
>  File "D:\bl\app\Python27\lib\site-packages\PIL\Image.py", line 2053, in fromstring
>    "Please call frombytes() instead.")
>Exception: fromstring() has been removed. Please call frombytes() instead.

明显找到`fromstring`方法改成`frombytes`

# 执行`VideoCapture`官方例子会调用本地摄像头抓取图片保存到`image.jpg`

参考:[python的50个模块满足你各种需求](http://2le.me/2015/06/05/python-50-modules/)
