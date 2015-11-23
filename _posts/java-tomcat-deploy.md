title: Tomcat部署Web应用方法总结
tags: [java,tomcat]
categories: java
date: 2013-01-17 21:30:00
---

Tomcat部署Web应用方法总结
在Tomcat中部署Java Web应用程序有两种方式：静态部署和动态部署。
在下文中$CATALINA_HOME指的是Tomcat根目录。
一、静态部署
静态部署指的是我们在服务器启动之前部署我们的程序，只有当服务器启动之后，我们的Web应用程序才能访问。
以下3种方式都可以部署：（以PetWeb项目为例说明，PetWeb目录假设是F:/PetWeb）
1.利用Tomcat自动部署
将PetWeb目录拷贝到$CATALINA_HOME/webapps下，然后启动服务器就可以了，Tomcat启动时将自动加载应用。
访问地址如下：http://localhost:8080/PetWeb/
这种方式比较简单，但是web应用程序必须在webapps目录下。Tomcat的Webapps目录是Tomcat默认的应用目录，当服务器启动时，会加载所有这个目录下的应用。
2.修改Server.xml文件部署
这种方式可以不必将PetWeb目录拷贝到webapps下，直接在F:/部署。方法如下，更改$CATALINA_HOME/conf/server.xml文件，
找到以下内容：
Xml代码：
<Context path="/Pet" reloadable="false" docBase="F:/PetWeb" workDir="d:/Mywebapps/emp" />
path：是访问时的根地址，表示访问的路径；如上述例子中，访问该应用程序地址如下：http://localhost:8080/Pet/
reloadable：表示可以在运行时在classes与lib文件夹下自动加载类包。其中reloadable="false"表示当应用程序 中的内容发生更改之后服务器不会自动加载，这个属性在开发阶段通常都设为true，方便开发，在发布阶段应该设置为false，提高应用程序的访问速度。
docbase：表示应用程序的路径，注意斜杠的方向“/”。docBase可以使用绝对路径，也可以使用相对路径，相对路径相对于webapps。
workdir：表示缓存文件的放置地址
3.增加自定义web部署文件(推荐使用，不需要重启Tomcat)
这种方式和方法2差不多，但不是在Server.xml文件中添加Context标签，而是在$CATALINA_HOME/conf /Catalina/localhost中添加一个xml文件，如Pet.xml.在Tomcat安装目录conf/Catalina /localhost下，里面有Tomcat自带的三个应用，随意复制其中的一个XML文件，然后修改docbase指向你自己的应用程序，并把文件名改 名，各参数参见方法2中的<Context>标签的参数，或者你也可以自己新建一个XML文件。(注意此文件名将作为Context中的path属性值,不管文件里的path属性值如何设置也是无效的)，将以下内容复制过去，修改相应路径即可。
Xml代码：
<Context path="/Pet" docBase="F:/PetWeb" debug="0" privileged="true" reloadable="false" ></Context>
访问地址如下：http://localhost:8080/Pet/
注：Web应用以.war文件的形式部署
可以将JSP程序打包成一个war包放在目录下，服务器会自动解开这个war包，并在这个目录下生成一个同名的文件夹。一个war包就是有特性格式的jar包，它是将一个Web程序的所有内容进行压缩得到。
我们刚才是将PetWeb文件夹部署在了服务器中，我们知道可以将Web应用程序的内容打成.war包，然后在部署在服务器上。打包请参考如下步骤： 
1、打开命令提示符（cmd） 
2、设置jdk环境变量 
3、在命令提示符中进入项目文件夹F:/PetWeb后，键入如下命令：jar cvf Pet.war */ . （注意最后有个“.”）。这样在F:/PetWeb下应该有Pet.war文件。 （也可以打包到指定的地方，命令如下：jar cvf d:/Pet.war */ .）
部署Pet.war文件非常简单，将刚才xml文件中的docBase="F:/PetWeb"更改为docBase="F:/Pet.war"或者直接将其拷贝到webapps目录下就可以。然后重新启动服务器就可以将Pet.war部署为一个Web应用程序了。
如果你够细心的话你会发现，服务器将Pet.war文件解开，并且在webapps下面又生成了一个Pet文件夹，然后把Pet.war的内容拷贝到里面去了。我们可以通过以下方式取消自动解压缩，将xml配置文件中的unpackWAR属性设置为"false" 即可。
二、动态部署
动态部署是指可以在服务器启动之后部署web应用程序，而不用重新启动服务器。动态部署要用到服务器提供的manager.war文件，如果 在$CATALINA_HOME/webapps/下没有该文件，你必须去重新下载tomcat，否则不能完成以下的功能。要想使用该管理程序必须首先编 辑$CATALINA_HOME/conf/tomcat-users.xml文件，内容如下：（关于这个文件的更多内容，请参考 Java Web应用程序的安全模型二 ）
<tomcat-users> 
< role rolename="tomcat"/> 
< role rolename="role1"/> 
<role rolename="manager"/> 
< user username="coresun" password="coresun" roles="manager"/> 
< user username="tomcat" password="tomcat" roles="tomcat"/> 
< user username="both" password="tomcat" roles="tomcat,role1"/> 
< user username="role1" password="tomcat" roles="role1"/> 
< /tomcat-users>
然后在浏览器中键入如下地址：http://localhost:8080/，应该看到一个tom猫了吧。点击左边的Tomcat Manager链接，提示输入用户名和密码，本文都是coresun，然后可以看到以下页面：
![tomcat](http://7xlbo3.com1.z0.glb.clouddn.com/2013/01/17/tomcat1.png)
(1)Context Path(option):中输入/Pet
(2)XML Configration file URL中要指定一个.xml文件，比如我们在F:/下建立一个Pet.xml文件，内容如下：<Context reloadable="false" />。docBase不用写了，因为要在下一个文本框中填入。或者更简单点，这个文本框什么都不填。
(3)WAR or Directory URL:中键入F:/PetWet或者F:/Pet.war都可以，然后点击Deploy按钮，看看上面是不是已经看到了你web应用程序，名字就是你Context Path(option):中的名字。
(4)如果你部署.war文件还有更加简单的方式，下面还有个Select WAR file upload点击浏览选择.war文件，然后点击Deploy也可以。
让tomcat只运行conf/server.xml中指定的web应用
可以有以下2种办法：
实现一:
1)将要部署的WEB应用放在webapps以外的路径, 并在server.xml相应的Context 中的docBase指定.
2)删除webapps中的所有文件夹, 以及conf/catalina/localhost下所有xml文件. 
注: webapps是server.xml中的Host 元素的appBase属性的值.
实现二:
修改server.xml中Host 元素的属性, 添加或修改: deployXML="false" deployOnStartup="false" autoDeploy="false"
含义: 
deployXML="false" : 不部署conf/catalina/localhost下的xml相应的WEB应用
deployOnStartup="false" :tomcat启动时, 不部署webapps下的所有web应用
autoDeploy="false" :避免tomcat在扫描改动时, 再次把webapps下的web应用给部署进来.
注：
Tomcat中webapps目录下不能直接存放网页格式的文件，否则无法访问到该文件，必须有子目录才能访问该网页文件。 
例如：我们直接将index.html放在webapps目录中，通过浏览器http://localhost:8080/index.html是无法访问到index.html的。而必须要webapps/petweb/index.html才可以通过http://localhost:8080/petweb/index.html访问到index.html页面。
