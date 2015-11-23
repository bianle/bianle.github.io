title: 'win7安装maven nexus'
date: 2015-09-02 11:26:03
categories: java
tags: [maven, nexus, sonatype]
---

# 下载
[官网最新版(可能被墙)](http://www.sonatype.org/nexus/go/)
[百度云:nexus-latest-bundle.zip(2.6.4-02)](http://pan.baidu.com/s/1pJL1tCR)
# 解压
解压后俩文件夹`nexus-x.x.x-xx`,`sonatype-work`,将`nexus-x.x.x-xx/bin`加到环境变量
# 安装
cmd下执行`nexus install`
报错
>wrapper | OpenSCManager failed - 拒绝访问。 (0x5)

以管理员身份运行cmd
1. 临时:右键->以管理员身份运行
![nexus](http://7xlbo3.com1.z0.glb.clouddn.com/2015/09/02/nexus1.jpg)
2. 永久:开始->命令提示符->属性->快捷方式->高级->用管理员身份运行
![nexus](http://7xlbo3.com1.z0.glb.clouddn.com/2015/09/02/nexus2.jpg)

# 启动
cmd下执行`nexus start`仍然报错

控制台
>wrapper  | Starting the nexus service...
wrapper  | The nexus service was launched, but failed to start.
请按任意键继续. . .

日志
>wrapper  | Unable to execute Java command.  系统找不到指定的文件。 (0x2)
wrapper  |     "java" -Djava.io.tmpdir=./tmp -Djava.net.preferIPv4Stack=true 
wrapper  | Critical error: wait for JVM process failed
wrapper  | The nexus service was launched, but failed to start.

解决
nexus-x.x.x-xx/bin/jsw/conf/wrapper.conf

```
# Set the JVM executable
# (modify this to absolute path if you need a Java that is not on the OS path)
wrapper.java.command=C:\Program Files\Java\jre\bin\java.exe
```

# 使用
访问地址http://localhost:8081/nexus
用户名`admin`密码`admin123`
