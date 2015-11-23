title: TOMCAT-SSL双向认证-配置实例
tags: [java,tomcat,ssl]
categories: java
date: 2012-12-06 18:09:17
---
SSL (Secure Socket Layer – 安全套接字层)
功能：保障在Internet上数据传输之安全，利用数据加密(Encryption)技术，确保数据在网络上之传输过程中不会被截取及窃听，防止篡改。
如何让我们的WEB应用程序应用SSL安全保障？经过几天摸索，终于实现 TOMCAT+SSL 双向认证，也就是说，首先，客户端将要认证服务器的安全性，确保访问的是正确的服务器，而非假冒的钓鱼网站；其次，服务器也要认证客户端的安全性，只有那些拥有服务器授权证书的客户端才可以访问。
下面请遵循详细步骤
1.在D盘建立目录：mykeys
2.启动命令行，并转移到 d:/mykeys
a)创建服务器密钥，其密钥库为 d:/mykeys/server.ks，注意keypass和storepass保持一致，它们分别代表 密钥密码和密钥库密码，注意 CN=localhost 中，localhost表示要配置SSL的主机名，不能任意指定
D:/mykeys>keytool -genkey -v -alias serverKey -dname "CN=localhost" -keyalg RSA -keypass rwm258 -keystore server.ks -storepass rwm258
b)创建客户端密钥，其密钥库为 d:/mykeys/client.p12，注意这个密钥库的后缀名，注意密钥库类型PKCS12
D:/mykeys>keytool -genkey -v -alias clientKey -dname "CN=SomeOne" -keyalg RSA -keypass lyl147 -keystore client.p12 -storepass lyl147 -storetype PKCS12
c)        将客户端密钥导出为证书文件
D:/mykeys>keytool -export -alias clientKey -file clientKey.cer -keystore client.p12 -storepass lyl147 -storetype PKCS12
d)        将上述客户端密钥文件导入服务器证书库，并设置为信任证书；注意会问你是否信任该证书，回答 y 即可
D:/mykeys>keytool -import -v -alias clientKey -file clientKey.cer -keystore server.ks -storepass rwm258
3.为了在本机浏览器中进行SSL访问，请：双击 d:/mykeys/client.p12 ，将启动证书向导
a)要导入的文件 文件名  D:/mykeys/client.p12
b)为私钥键入密码lyl147 ，勾选：标志此密钥为可导出的
c)证书存储，选：将所有的证书放入下列存储区，然后，浏览-个人
d)现在，打开IE，查看证书：工具-Internet选项-内容-证书-个人，可以看到 SomeOne 证书已被安装
4. 配置TOMCAT服务器，以支持SSL认证，编辑文件：%tomcat_home%/conf/server.xml，下面这段配置代码本来是被屏蔽的，现在请取消其屏蔽，并相应增加密钥库的配置，其中clientAuth="true" 用以启动双向认证，否则，只有客户端认证服务器-单向
<Connector port="8443" protocol="HTTP/1.1" SSLEnabled="true"

maxThreads="150" scheme="https" secure="true"

clientAuth="true" sslProtocol="TLS"

keystoreFile="D:/mykeys/server.ks" keystorePass="rwm258"

truststoreFile="D:/mykeys/server.ks " truststorePass=" rwm258" />
5. 启动 TOMCAT，然后在IE浏览器中访问：https://localhost:8443/
a) 将弹出一个消息框，这是要客户端认证服务器，查看证书可看到服务器证书为 localhost ，回顾前面的步骤，正是我们创建的那个服务器证书；这里点 是
b) 页面出现，说明客户端被允许访问
6. 现在，再次打开IE，工具-Internet选项-内容-证书-个人 ，删除那个 SomeOne 证书
a) 现在，再次在IE浏览器中访问：https://localhost:8443/ 你会发现，回顾前面的 3 步骤，你会明白为什么要将客户端证书导入 IE 浏览器；
7.请再次重复 3 步骤，之后再尝试访问
OK，至此，我们在本机上SSL双向配置已经成功，那么，换另一台电脑来访问本机服务器如何处理呢？很简单，把 d:/mykeys/client.p12 复制到该机器，然后执行 3 步骤，将这个证书导入到该机器的 IE 浏览器个人证书中，记得密码是：lyl147；当然，在那台电脑上访问时，要将localhost修改为本机主机名或IP地址
——————————————————————-
要使你自己的WEB程序应用SSL安全访问，请遵循如下配置
在你应用的 web.xml 文件的 <web-app></web-app> 中加入如下配置

```
<login-config> 
    <!-- Authorization setting for SSL --> 
    <auth-method>CLIENT-CERT</auth-method> 
    <realm-name>Client Cert Users-only Area</realm-name>
 </login-config> 

<security-constraint> 
    <!-- Authorization setting for SSL --> 
    <web-resource-collection > 
        <web-resource-name >SSL</web-resource-name> 
        <url-pattern>/*</url-pattern>
     </web-resource-collection> 
    <user-data-constraint> 
        <transport-guarantee>CONFIDENTIAL</transport-guarantee>
     </user-data-constraint> 
</security-constraint>
```
你会发现，即使使用 http://….:8080 来访问你的应用程序，它也会重定向为 https://….8443 访问，也就是说，你的应用已经强制使用SSL安全访问层
