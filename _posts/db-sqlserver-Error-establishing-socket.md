title: Error_establishing_socket的解决方法
tags: [sql-server]
categories: db
date: 2012-01-10 18:09:17
---

Error establishing socket的解决方法

如果你在测试连接SQL Server 2000 JDBC连接时出现错误Error establishing socket.请参考如下：

用 CMD 命令NETSTAT查1433(这是默认的端口,可能被占用,你可以重新设一个新的端口)的端口可是居然没有没有打开,先看看你的服务器有没有打开,如果都大开了那就说明你没有装SQL的sp3或sp4的补丁.

还有一个方法看你是不是要打补丁,那就是看看你的版本号:

可以用如下的方式查看MSSQL的版本：

打开企业管理器-〉工具-〉SQL查询分析器-〉帮助-〉关于

查看MSSQL的详细版本号

如果 是 8.00.194 就是还没打补丁

8.00.760 就是SP3

8.00.2039 就是SP4

如果你的版本号是对的,但NETSTAT查1433没有,那可能你的1433端口被占了,换一个端口应该就可以了.

换端口的方法是:
1.  打开企业管理器，依次在控制台根目录 ->Microsoft SQL Servers->SQL Server 组，列出一部分数据库服务器。

2.  右击我们要连接的数据库服务器，选择属性，在常规选项卡点击网络配置弹出新窗口。

3.  在启用的协议区域我们选择 TCP/IP ，点击属性按钮，弹出新窗口。在这个窗口有网络协议默认值设置，一般默认端口是：1433。

另有一篇网上的方法，供参考：

如运行程序时出现 "Error establishing socket" 错误,则应进行如下调试:

1.  检查SQL SERVER 是否允许远程访问.具体步骤:

  + 打开"企业管理器",打开控制台根目录>SQL Server 组>数据库
  + 在相应"数据库"上单击右键,选择"属性"
  + 选择"连接"选项卡,检查"远程服务器连接"下,RPC服务是否选择.

2.  使用telnet IP地址 1433,系统是否提示连接出错,如系统提示出错

检查是否防火墙屏蔽了SQL SERVER 或 java IDE 的网络访问端口

如果是,关闭防火墙,重新启动SQL SERVER和java IDE,进行测试,

如果系统仍提示上述错误,尝试下列步骤

3.  检查SQL SERVER 端口号及是否启用了TCP/IP协议,具体步骤:

+ 打开"企业管理器",打开控制台根目录>SQL Server 组>数据库

+ 在相应"数据库"上单击右键,选择"属性"

+ 选择"常规"选项卡,点击"网络配置",如启用的协议中无"TCP/IP协议"将其加入

+ 选择"TCP/IP协议",点击"属性",检查其端口号是否为1433

+ 如端口号为1433将其修改为其它端口号,修改jdbc连接语句,将端口号同样改为新启用的端口号,如jdbc:microsoft:sqlserver://server_name:1400(假设新端口号为 1400)

以下的方法你每种的去试试:

1. 检查一下sql server的connection有没有full.

2. 如果是认证的问题.

可到sql enterprice manager->指定server->内容->安全性.

把验证改为 SQL server 及 windows.

3. 点选属性检查一下port是否正确.

4. 执行%MSSQL_HOME%/80/Tools/Binn/SVRNETCN.exe

把TCP/IP启用.

5. 关掉防火墙.

6. 把SQL server update到sp3:

http://www.microsoft.com/sql/downloads/2000/sp3.asp

经我验证，一般升级到sp3就好用了！
