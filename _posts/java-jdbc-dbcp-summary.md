title: java jdbc数据库连接池总结
date: 2012-05-30 17:30:12
categories: java
tags: [java,jdbc,dbcp]
---

# 引言

近年来，随着Internet/Intranet建网技术的飞速发展和在世界范围内的迅速普及，计算机应用程序已从传统的桌面应用转到Web应用。基于B/S（Browser/Server）架构的3层开发模式逐渐取代C/S（Client/Server）架构的开发模式，成为开发企业级应用和电子商务普遍采用的技术。在Web应用开发的早期，主要使用的技术是CGI﹑ASP﹑PHP等。之后，Sun公司推出了基于Java语言的Servlet+Jsp+JavaBean技术。相比传统的开发技术，它具有跨平台﹑安全﹑有效﹑可移植等特性，这使其更便于使用和开发。

# Java应用程序访问数据库的基本原理

在Java语言中，JDBC（Java DataBase Connection）是应用程序与数据库沟通的桥梁,即Java语言通过JDBC技术访问数据库。JDBC是一种“开放”的方案，它为数据库应用开发人员﹑数据库前台工具开发人员提供了一种标准的应用程序设计接口，使开发人员可以用纯Java语言编写完整的数据库应用程序。JDBC提供两种API，分别是面向开发人员的API和面向底层的JDBC驱动程序API，底层主要通过直接的JDBC驱动和JDBC-ODBC桥驱动实现与数据库的连接。

一般来说，Java应用程序访问数据库的过程（如图1所示）是：

1. 装载数据库驱动程序；
2. 通过JDBC建立数据库连接；
3. 访问数据库，执行SQL语句；
4. 断开数据库连接。

![图1Java数据库访问机制](http://7xlbo3.com1.z0.glb.clouddn.com/2015/08/27/javadbcp1.png)

JDBC作为一种数据库访问技术，具有简单易用的优点。但使用这种模式进行Web应用程序开发，存在很多问题：首先，每一次Web请求都要建立一次数据库连接。建立连接是一个费时的活动，每次都得花费0.05s～1s的时间，而且系统还要分配内存资源。这个时间对于一次或几次数据库操作，或许感觉不出系统有多大的开销。可是对于现在的Web应用，尤其是大型电子商务网站，同时有几百人甚至几千人在线是很正常的事。在这种情况下，频繁的进行数据库连接操作势必占用很多的系统资源，网站的响应速度必定下降，严重的甚至会造成服务器的崩溃。不是危言耸听，这就是制约某些电子商务网站发展的技术瓶颈问题。其次，对于每一次数据库连接，使用完后都得断开。否则，如果程序出现异常而未能关闭，将会导致数据库系统中的内存泄漏，最终将不得不重启数据库。还有，这种开发不能控制被创建的连接对象数，系统资源会被毫无顾及的分配出去，如连接过多，也可能导致内存泄漏，服务器崩溃。

# 数据库连接池（connection pool）的工作原理

## 基本概念及原理
由上面的分析可以看出，问题的根源就在于对数据库连接资源的低效管理。我们知道， 对于共享资源，有一个很著名的设计模式：资源池（Resource Pool）。该模式正是为了解决资源的频繁分配﹑释放所造成的问题。为解决上述问题，可以采用数据库连接池技术。数据库连接池的基本思想就是为数据库连接建立一个“缓冲池”。预先在缓冲池中放入一定数量的连接，当需要建立数据库连接时，只需从“缓冲池”中取出一个，使用完毕之后再放回去。我们可以通过设定连接池最大连接数来防止系统无尽的与数据库连接。更为重要的是我们可以通过连接池的管理机制监视数据库的连接的数量﹑使用情况，为系统开发﹑测试及性能调整提供依据。连接池的基本工作原理见下图2。

![图2连接池的基本工作原理](http://7xlbo3.com1.z0.glb.clouddn.com/2015/08/27/javadbcp2.png)

## 服务器自带的连接池
　　JDBC的API中没有提供连接池的方法。一些大型的WEB应用服务器如BEA的WebLogic和IBM的WebSphere等提供了连接池的机制，但是必须有其第三方的专用类方法支持连接池的用法。
## 连接池关键问题分析
### 并发问题
为了使连接管理服务具有最大的通用性，必须考虑多线程环境，即并发问题。这个问题相对比较好解决，因为Java语言自身提供了对并发管理的支持，使用`synchronized`关键字即可确保线程是同步的。使用方法为直接在类方法前面加上`synchronized`关键字，如：
`public synchronized Connection getConnection() `
### 多数据库服务器和多用户
对于大型的企业级应用，常常需要同时连接不同的数据库（如连接Oracle和Sybase）。如何连接不同的数据库呢？我们采用的策略是：设计一个符合单例模式的连接池管理类，在连接池管理类的唯一实例被创建时读取一个资源文件，其中资源文件中存放着多个数据库的url地址（`<poolName.url>`）﹑用户名（`<poolName.user>`）﹑密码（`<poolName.password>`）等信息。如`tx.url=192.168.1.123:5000/tx_it，tx.user=cyl，tx.password=123456`。根据资源文件提供的信息，创建多个连接池类的实例，每一个实例都是一个特定数据库的连接池。连接池管理类实例为每个连接池实例取一个名字，通过不同的名字来管理不同的连接池。
对于同一个数据库有多个用户使用不同的名称和密码访问的情况，也可以通过资源文件处理，即在资源文件中设置多个具有相同url地址，但具有不同用户名和密码的数据库连接信息。
### 事务处理
我们知道，事务具有原子性，此时要求对数据库的操作符合“ALL-ALL-NOTHING”原则,即对于一组SQL语句要么全做，要么全不做。
在Java语言中，Connection类本身提供了对事务的支持，可以通过设置Connection的AutoCommit属性为false,然后显式的调用commit或rollback方法来实现。但要高效的进行Connection复用，就必须提供相应的事务支持机制。可采用每一个事务独占一个连接来实现，这种方法可以大大降低事务管理的复杂性。
### 连接池的分配与释放
连接池的分配与释放，对系统的性能有很大的影响。合理的分配与释放，可以提高连接的复用度，从而降低建立新连接的开销，同时还可以加快用户的访问速度。
对于连接的管理可使用空闲池。即把已经创建但尚未分配出去的连接按创建时间存放到一个空闲池中。每当用户请求一个连接时，系统首先检查空闲池内有没有空闲连接。如果有就把建立时间最长（通过容器的顺序存放实现）的那个连接分配给他（实际是先做连接是否有效的判断，如果可用就分配给用户，如不可用就把这个连接从空闲池删掉，重新检测空闲池是否还有连接）；如果没有则检查当前所开连接池是否达到连接池所允许的最大连接数（maxConn）,如果没有达到，就新建一个连接，如果已经达到，就等待一定的时间（timeout）。如果在等待的时间内有连接被释放出来就可以把这个连接分配给等待的用户，如果等待时间超过预定时间timeout,则返回空值（null）。系统对已经分配出去正在使用的连接只做计数，当使用完后再返还给空闲池。对于空闲连接的状态，可开辟专门的线程定时检测，这样会花费一定的系统开销，但可以保证较快的响应速度。也可采取不开辟专门线程，只是在分配前检测的方法。
### 连接池的配置与维护
连接池中到底应该放置多少连接，才能使系统的性能最佳？系统可采取设置最小连接数（minConn）和最大连接数（maxConn）来控制连接池中的连接。最小连接数是系统启动时连接池所创建的连接数。如果创建过多，则系统启动就慢，但创建后系统的响应速度会很快；如果创建过少，则系统启动的很快，响应起来却慢。这样，可以在开发时，设置较小的最小连接数，开发起来会快，而在系统实际使用时设置较大的，因为这样对访问客户来说速度会快些。最大连接数是连接池中允许连接的最大数目，具体设置多少，要看系统的访问量，可通过反复测试，找到最佳点。
如何确保连接池中的最小连接数呢？有动态和静态两种策略。动态即每隔一定时间就对连接池进行检测，如果发现连接数量小于最小连接数，则补充相应数量的新连接,以保证连接池的正常运转。静态是发现空闲连接不够时再去检查。

## 连接池的实现

### 连接池模型

本文讨论的连接池包括一个连接池类（DBConnectionPool）和一个连接池管理类（DBConnetionPoolManager）和一个配置文件操作类(ParseDSConfig)。连接池类是对某一数据库所有连接的“缓冲池”，主要实现以下功能：
+ 从连接池获取或创建可用连接；
+ 使用完毕之后，把连接返还给连接池；
+ 在系统关闭前，断开所有连接并释放连接占用的系统资源；
+ 还能够处理无效连接（原来登记为可用的连接，由于某种原因不再可用，如超时，通讯问题），并能够限制连接池中的连接总数不低于某个预定值和不超过某个预定值。
+ 当多数据库时,且数据库是动态增加的话,将会加到配置文件中。

连接池管理类是连接池类的外覆类（wrapper）,符合单例模式，即系统中只能有一个连接池管理类的实例。其主要用于对多个连接池对象的管理，具有以下功能：
+ 装载并注册特定数据库的JDBC驱动程序；
+ 根据属性文件给定的信息，创建连接池对象；
+ 为方便管理多个连接池对象，为每一个连接池对象取一个名字，实现连接池名字与其实例之间的映射；
+ 跟踪客户使用连接情况，以便需要是关闭连接释放资源。连接池管理类的引入主要是为了方便对多个连接池的使用和管理，如系统需要连接不同的数据库，或连接相同的数据库但由于安全性问题，需要不同的用户使用不同的名称和密码。

### 连接池实现
可以适用多数据库类型的应用以及一种数据库类型多个数据库且数据库的数量可以动态增加的应用程序
#### 文件列表
+ DBConnectionPool.java     数据库连接池类
+ DBConnectionManager .java 数据库管理类
+ DSConfigBean .java        单个数据库连接信息Bean
+ ParseDSConfig.java        操作多(这个'多'包括不同的数据库和同一种数据库有多个数据库) 数据
+ ds.config.xml             数据库配置文件xml
#### 源代码
DBConnectionPool.java
```
/**
 * 数据库连接池类
 */
package com.chunkyo.db;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.Timer;
/**
 * @author chenyanlin
 *
 */
public class DBConnectionPool implements TimerListener {
 private Connection con=null;
 private int inUsed=0;    //使用的连接数
 private ArrayList freeConnections = new ArrayList();//容器，空闲连接
 private int minConn;     //最小连接数
 private int maxConn;     //最大连接
 private String name;     //连接池名字
 private String password; //密码
 private String url;      //数据库连接地址
 private String driver;   //驱动
 private String user;     //用户名
 public Timer timer;      //定时
 /**
  * 
  */
 public DBConnectionPool() {
  // TODO Auto-generated constructor stub
 }
 /**
  * 创建连接池
  * @param driver
  * @param name
  * @param URL
  * @param user
  * @param password
  * @param maxConn
  */
 public DBConnectionPool(String name, String driver,String URL, String user, String password, int maxConn)
 {
  this.name=name;
  this.driver=driver;
  this.url=URL;
  this.user=user;
  this.password=password;
  this.maxConn=maxConn;
 }
 /**
  * 用完，释放连接
  * @param con
  */
 public synchronized void freeConnection(Connection con) 
 {
  this.freeConnections.add(con);//添加到空闲连接的末尾
  this.inUsed--;
 }
 /**
  * timeout  根据timeout得到连接
  * @param timeout
  * @return
  */
 public synchronized Connection getConnection(long timeout)
 {
  Connection con=null;
  if(this.freeConnections.size()>0)
  {
   con=(Connection)this.freeConnections.get(0);
   if(con==null)con=getConnection(timeout); //继续获得连接
  }
  else
  {
   con=newConnection(); //新建连接
  }
  if(this.maxConn==0||this.maxConn<this.inUsed)
  {
   con=null;//达到最大连接数，暂时不能获得连接了。
  }
  if(con!=null)
  {
   this.inUsed++;
  }
  return con;
 }
 /**
  * 
  * 从连接池里得到连接
  * @return
  */
 public synchronized Connection getConnection()
 {
  Connection con=null;
  if(this.freeConnections.size()>0)
  {
   con=(Connection)this.freeConnections.get(0);
   this.freeConnections.remove(0);//如果连接分配出去了，就从空闲连接里删除
   if(con==null)con=getConnection(); //继续获得连接
  }
  else
  {
   con=newConnection(); //新建连接
  }
  if(this.maxConn==0||this.maxConn<this.inUsed)
  {
   con=null;//等待 超过最大连接时
  }
  if(con!=null)
  {
   this.inUsed++;
   System.out.println("得到　"+this.name+"　的连接，现有"+inUsed+"个连接在使用!");
  }
  return con;
 }
 /**
  *释放全部连接
  *
  */
 public synchronized void release()
 {
  Iterator allConns=this.freeConnections.iterator();
  while(allConns.hasNext())
  {
   Connection con=(Connection)allConns.next();
   try
   {
    con.close();
   }
   catch(SQLException e)
   {
    e.printStackTrace();
   }
   
  }
  this.freeConnections.clear();
   
 }
 /**
  * 创建新连接
  * @return
  */
 private Connection newConnection()
 {
  try {
   Class.forName(driver);
   con=DriverManager.getConnection(url, user, password);
  } catch (ClassNotFoundException e) {
   // TODO Auto-generated catch block
   e.printStackTrace();
   System.out.println("sorry can't find db driver!");
  } catch (SQLException e1) {
   // TODO Auto-generated catch block
   e1.printStackTrace();
   System.out.println("sorry can't create Connection!");
  }
  return con;
  
 }
 /**
  * 定时处理函数
  */
 public synchronized void TimerEvent() 
 {
     //暂时还没有实现以后会加上的
 }
 /**
  * @param args
  */
 public static void main(String[] args) {
  // TODO Auto-generated method stub
 }
 /**
  * @return the driver
  */
 public String getDriver() {
  return driver;
 }
 /**
  * @param driver the driver to set
  */
 public void setDriver(String driver) {
  this.driver = driver;
 }
 /**
  * @return the maxConn
  */
 public int getMaxConn() {
  return maxConn;
 }
 /**
  * @param maxConn the maxConn to set
  */
 public void setMaxConn(int maxConn) {
  this.maxConn = maxConn;
 }
 /**
  * @return the minConn
  */
 public int getMinConn() {
  return minConn;
 }
 /**
  * @param minConn the minConn to set
  */
 public void setMinConn(int minConn) {
  this.minConn = minConn;
 }
 /**
  * @return the name
  */
 public String getName() {
  return name;
 }
 /**
  * @param name the name to set
  */
 public void setName(String name) {
  this.name = name;
 }
 /**
  * @return the password
  */
 public String getPassword() {
  return password;
 }
 /**
  * @param password the password to set
  */
 public void setPassword(String password) {
  this.password = password;
 }
 /**
  * @return the url
  */
 public String getUrl() {
  return url;
 }
 /**
  * @param url the url to set
  */
 public void setUrl(String url) {
  this.url = url;
 }
 /**
  * @return the user
  */
 public String getUser() {
  return user;
 }
 /**
  * @param user the user to set
  */
 public void setUser(String user) {
  this.user = user;
 }
}

```

DBConnectionManager .java

```
/**
 * 数据库连接池管理类
 */
package com.chunkyo.db;
import java.sql.Connection;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.Properties;
import java.util.Vector;
import com.chunkyo.db.ParseDSConfig;
import com.chunkyo.db.DSConfigBean;
import com.chunkyo.db.DBConnectionPool;
/**
 * @author chenyanlin
 *
 */
public class DBConnectionManager {
 static private DBConnectionManager instance;//唯一数据库连接池管理实例类
 static private int clients;                 //客户连接数
 private Vector drivers  = new Vector();//驱动信息
 private Hashtable pools=new Hashtable();//连接池
 
 /**
  * 实例化管理类
  */
 public DBConnectionManager() {
  // TODO Auto-generated constructor stub
  this.init();
 }
 /**
  * 得到唯一实例管理类
  * @return
  */
 static synchronized public DBConnectionManager getInstance()
 {
  if(instance==null)
  {
   instance=new DBConnectionManager();
  }
  return instance;
  
 }
 /**
  * 释放连接
  * @param name
  * @param con
  */
 public void freeConnection(String name, Connection con)
 {
  DBConnectionPool pool=(DBConnectionPool)pools.get(name);//根据关键名字得到连接池
  if(pool!=null)
  pool.freeConnection(con);//释放连接 
 }
 /**
  * 得到一个连接根据连接池的名字name
  * @param name
  * @return
  */
 public Connection getConnection(String name)
 {
  DBConnectionPool pool=null;
  Connection con=null;
  pool=(DBConnectionPool)pools.get(name);//从名字中获取连接池
  con=pool.getConnection();//从选定的连接池中获得连接
  if(con!=null)
  System.out.println("得到连接。。。");
  return con;
 }
 /**
  * 得到一个连接，根据连接池的名字和等待时间
  * @param name
  * @param time
  * @return
  */
 public Connection getConnection(String name, long timeout)
 {
  DBConnectionPool pool=null;
  Connection con=null;
  pool=(DBConnectionPool)pools.get(name);//从名字中获取连接池
  con=pool.getConnection(timeout);//从选定的连接池中获得连接
  System.out.println("得到连接。。。");
  return con;
 }
 /**
  * 释放所有连接
  */
 public synchronized void release()
 {
  Enumeration allpools=pools.elements();
  while(allpools.hasMoreElements())
  {
   DBConnectionPool pool=(DBConnectionPool)allpools.nextElement();
   if(pool!=null)pool.release();
  }
  pools.clear();
 }
 /**
  * 创建连接池
  * @param props
  */
 private void createPools(DSConfigBean dsb)
 {
  DBConnectionPool dbpool=new DBConnectionPool();
  dbpool.setName(dsb.getName());
  dbpool.setDriver(dsb.getDriver());
  dbpool.setUrl(dsb.getUrl());
  dbpool.setUser(dsb.getUsername());
  dbpool.setPassword(dsb.getPassword());
  dbpool.setMaxConn(dsb.getMaxconn());
  System.out.println("ioio:"+dsb.getMaxconn());
  pools.put(dsb.getName(), dbpool);
 }
 /**
  * 初始化连接池的参数
  */
 private void init()
 {
  //加载驱动程序
  this.loadDrivers();
  //创建连接池
  Iterator alldriver=drivers.iterator();
  while(alldriver.hasNext())
  {
   this.createPools((DSConfigBean)alldriver.next());
   System.out.println("创建连接池。。。");
   
  }
  System.out.println("创建连接池完毕。。。");
 }
 /**
  * 加载驱动程序
  * @param props
  */
 private void loadDrivers()
 {
  ParseDSConfig pd=new ParseDSConfig();
 //读取数据库配置文件
  drivers=pd.readConfigInfo("ds.config.xml");
  System.out.println("加载驱动程序。。。");
 }
 /**
  * @param args
  */
 public static void main(String[] args) {
  // TODO Auto-generated method stub
 }
}

```

DSConfigBean.java

```
/**
 * 配置文件Bean类
 */
package com.chunkyo.db;
/**
 * @author chenyanlin
 *
 */
public class DSConfigBean {
 private String type     =""; //数据库类型
 private String name     =""; //连接池名字
 private String driver   =""; //数据库驱动
 private String url      =""; //数据库url
 private String username =""; //用户名
 private String password =""; //密码
 private int maxconn  =0; //最大连接数
 /**
  * 
  */
 public DSConfigBean() {
  // TODO Auto-generated constructor stub
 }
 /**
  * @param args
  */
 public static void main(String[] args) {
  // TODO Auto-generated method stub
 }
 /**
  * @return the driver
  */
 public String getDriver() {
  return driver;
 }
 /**
  * @param driver the driver to set
  */
 public void setDriver(String driver) {
  this.driver = driver;
 }
 /**
  * @return the maxconn
  */
 public int getMaxconn() {
  return maxconn;
 }
 /**
  * @param maxconn the maxconn to set
  */
 public void setMaxconn(int maxconn) {
  this.maxconn = maxconn;
 }
 /**
  * @return the name
  */
 public String getName() {
  return name;
 }
 /**
  * @param name the name to set
  */
 public void setName(String name) {
  this.name = name;
 }
 /**
  * @return the password
  */
 public String getPassword() {
  return password;
 }
 /**
  * @param password the password to set
  */
 public void setPassword(String password) {
  this.password = password;
 }
 /**
  * @return the type
  */
 public String getType() {
  return type;
 }
 /**
  * @param type the type to set
  */
 public void setType(String type) {
  this.type = type;
 }
 /**
  * @return the url
  */
 public String getUrl() {
  return url;
 }
 /**
  * @param url the url to set
  */
 public void setUrl(String url) {
  this.url = url;
 }
 /**
  * @return the username
  */
 public String getUsername() {
  return username;
 }
 /**
  * @param username the username to set
  */
 public void setUsername(String username) {
  this.username = username;
 }
}

```

ParseDSConfig.java

```
/**
 * 操作配置文件类 读  写 修改 删除等操作 
 */
package com.chunkyo.db;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Vector;
import java.util.Iterator;
import org.jdom.Document;
import org.jdom.Element;
import org.jdom.JDOMException;
import org.jdom.input.SAXBuilder;
import org.jdom.output.Format;
import org.jdom.output.XMLOutputter;
/**
 * @author chenyanlin
 *
 */
public class ParseDSConfig {
 /**
  * 构造函数
  */
 public ParseDSConfig() {
  // TODO Auto-generated constructor stub
 }
 /**
  * 读取xml配置文件
  * @param path
  * @return
  */
 public Vector readConfigInfo(String path)
 {
  String rpath=this.getClass().getResource("").getPath().substring(1)+path;
  Vector dsConfig=null;
  FileInputStream fi = null;
  try
  {
   fi=new FileInputStream(rpath);//读取路径文件
   dsConfig=new Vector();
   SAXBuilder sb=new SAXBuilder();
   Document doc=sb.build(fi);
   Element root=doc.getRootElement();
   List pools=root.getChildren();
   Element pool=null;
   Iterator allPool=pools.iterator();
   while(allPool.hasNext())
   {
    pool=(Element)allPool.next();
    DSConfigBean dscBean=new DSConfigBean();
    dscBean.setType(pool.getChild("type").getText());
    dscBean.setName(pool.getChild("name").getText());
    System.out.println(dscBean.getName());
    dscBean.setDriver(pool.getChild("driver").getText());
    dscBean.setUrl(pool.getChild("url").getText());
    dscBean.setUsername(pool.getChild("username").getText());
    dscBean.setPassword(pool.getChild("password").getText());
    dscBean.setMaxconn(Integer.parseInt(pool.getChild("maxconn").getText()));
    dsConfig.add(dscBean);
   }
   
  } catch (FileNotFoundException e) {
   // TODO Auto-generated catch block
   e.printStackTrace();
  } catch (JDOMException e) {
   // TODO Auto-generated catch block
   e.printStackTrace();
  } catch (IOException e) {
   // TODO Auto-generated catch block
   e.printStackTrace();
  }
  
  finally
  {
   try {
    fi.close();
   } catch (IOException e) {
    // TODO Auto-generated catch block
    e.printStackTrace();
   }
  }
  
  return dsConfig;
 }
/**
 *修改配置文件 没时间写 过段时间再贴上去 其实一样的 
 */
 public void modifyConfigInfo(String path,DSConfigBean dsb) throws Exception
 {
  String rpath=this.getClass().getResource("").getPath().substring(1)+path;
  FileInputStream fi=null; //读出
  FileOutputStream fo=null; //写入
  
 }
/**
 *增加配置文件
 *
 */
 public void addConfigInfo(String path,DSConfigBean dsb) 
 {
  String rpath=this.getClass().getResource("").getPath().substring(1)+path;
  FileInputStream fi=null;
  FileOutputStream fo=null;
  try
  {
   fi=new FileInputStream(rpath);//读取xml流
   
   SAXBuilder sb=new SAXBuilder();
   
   Document doc=sb.build(fi); //得到xml
   Element root=doc.getRootElement();
   List pools=root.getChildren();//得到xml子树
   
   Element newpool=new Element("pool"); //创建新连接池
   
   Element pooltype=new Element("type"); //设置连接池类型
   pooltype.setText(dsb.getType());
   newpool.addContent(pooltype);
   
   Element poolname=new Element("name");//设置连接池名字
   poolname.setText(dsb.getName());
   newpool.addContent(poolname);
   
   Element pooldriver=new Element("driver"); //设置连接池驱动
   pooldriver.addContent(dsb.getDriver());
   newpool.addContent(pooldriver);
   
   Element poolurl=new Element("url");//设置连接池url
   poolurl.setText(dsb.getUrl());
   newpool.addContent(poolurl);
   
   Element poolusername=new Element("username");//设置连接池用户名
   poolusername.setText(dsb.getUsername());
   newpool.addContent(poolusername);
   
   Element poolpassword=new Element("password");//设置连接池密码
   poolpassword.setText(dsb.getPassword());
   newpool.addContent(poolpassword);
   
   Element poolmaxconn=new Element("maxconn");//设置连接池最大连接
   poolmaxconn.setText(String.valueOf(dsb.getMaxconn()));
   newpool.addContent(poolmaxconn);
   pools.add(newpool);//将child添加到root
   Format format = Format.getPrettyFormat();
      format.setIndent("");
      format.setEncoding("utf-8");
      XMLOutputter outp = new XMLOutputter(format);
      fo = new FileOutputStream(rpath);
      outp.output(doc, fo);
  } catch (FileNotFoundException e) {
   // TODO Auto-generated catch block
   e.printStackTrace();
  } catch (JDOMException e) {
   // TODO Auto-generated catch block
   e.printStackTrace();
  } catch (IOException e) {
   // TODO Auto-generated catch block
   e.printStackTrace();
  }
  finally
  {
   
  }
 }
 /**
  *删除配置文件
  */
 public void delConfigInfo(String path,String name)
 {
  String rpath=this.getClass().getResource("").getPath().substring(1)+path;
  FileInputStream fi = null;
  FileOutputStream fo=null;
  try
  {
   fi=new FileInputStream(rpath);//读取路径文件
   SAXBuilder sb=new SAXBuilder();
   Document doc=sb.build(fi);
   Element root=doc.getRootElement();
   List pools=root.getChildren();
   Element pool=null;
   Iterator allPool=pools.iterator();
   while(allPool.hasNext())
   {
    pool=(Element)allPool.next();
    if(pool.getChild("name").getText().equals(name))
    {
     pools.remove(pool);
     break;
    }
   }
   Format format = Format.getPrettyFormat();
      format.setIndent("");
      format.setEncoding("utf-8");
      XMLOutputter outp = new XMLOutputter(format);
      fo = new FileOutputStream(rpath);
      outp.output(doc, fo);
   
  } catch (FileNotFoundException e) {
   // TODO Auto-generated catch block
   e.printStackTrace();
  } catch (JDOMException e) {
   // TODO Auto-generated catch block
   e.printStackTrace();
  } catch (IOException e) {
   // TODO Auto-generated catch block
   e.printStackTrace();
  }
  
  finally
  {
   try {
    fi.close();
   } catch (IOException e) {
    // TODO Auto-generated catch block
    e.printStackTrace();
   }
  }
 }
 /**
  * @param args
  * @throws Exception 
  */
 public static void main(String[] args) throws Exception {
  // TODO Auto-generated method stub
  ParseDSConfig pd=new ParseDSConfig();
  String path="ds.config.xml";
  pd.readConfigInfo(path);
  //pd.delConfigInfo(path, "tj012006");
  DSConfigBean dsb=new DSConfigBean();
  dsb.setType("oracle");
  dsb.setName("yyy004");
  dsb.setDriver("org.oracle.jdbc");
  dsb.setUrl("jdbc:oracle://localhost");
  dsb.setUsername("sa");
  dsb.setPassword("");
  dsb.setMaxconn(1000);
  pd.addConfigInfo(path, dsb);
  pd.delConfigInfo(path, "yyy001");
 }
}

```

ds.config.xml

```
<ds-config>
<pool>
<type>mysql</type>
<name>user</name>
<driver>com.mysql.jdbc.driver</driver>
<url>jdbc:mysql://localhost:3306/user</url>
<username>sa</username>
<password>123456</password>
<maxconn>100</maxconn>
</pool>
<pool>
<type>mysql</type>
<name>user2</name>
<driver>com.mysql.jdbc.driver</driver>
<url>jdbc:mysql://localhost:3306/user2</url>
<username>sa</username>
<password>1234</password>
<maxconn>10</maxconn>
</pool>
<pool>
<type>sql2000</type>
<name>books</name>
<driver>com.microsoft.sqlserver.driver</driver>
<url>jdbc:sqlserver://localhost:1433/books:databasename=books</url>
<username>sa</username>
<password></password>
<maxconn>100</maxconn>
</pool>
</ds-config>

```

### 连接池的使用

#### Connection的获得和释放
```
DBConnectionManager   connectionMan=DBConnectionManager .getInstance();//得到唯一实例
   //得到连接
   String name="mysql";//从上下文得到你要访问的数据库的名字
   Connection  con=connectionMan.getConnection(name);
  //使用
  。。。。。。。
  // 使用完毕
 connectionMan.freeConnection(name,con);//释放，但并未断开连接
```
#### 数据库连接的动态增加和连接池的动态增加
1. 调用xml操作增加类
2. 重新实例华连接池管理池类
