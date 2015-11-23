title: could not initialize proxy – no Session
tags: [hibernate,java]
categories: java
date: 2013-01-07 18:09:17
---
在`<many-to-on>`中这错误很常见，字面意义就是不能被初始化，因为`session`已经关闭了。 
简单理解就是因为，你使用了`lazy=true`，这样hibernate在从数据库中调数据的时候是不会把关联的对象查出来的，而是保存一个获取值得方法，在你使用getXXX()调用的时候，hiberante会利用这个保存的方法去从数据库中取数据。而往往我们在jsp页面中使用getXXX()准备展示数据的时候，session早已经在dao中就关闭了，我们该如何解决这种异常呢？ 
简单的说有三种： 
1. 把lazy设成false,最简单。 
2. 我没试过，但听说过

在web.xml中加入
```
<filter> 
     <filter-name>hibernateFilter</filter-name> 
     <filter-class> 
     org.springframework.orm.hibernate3.support.OpenSessionInViewFilter 
     </filter-class> 
</filter> 
<filter-mapping> 
     <filter-name>hibernateFilter</filter-name> 
     <url-pattern>*.do</url-pattern> 
</filter-mapping>
```
3. 我用的方法，也是我认为比较不错的方法，灵活性更好。用left join fetch或inner join fetch语法。 
例如：from Item i left join fetch i.parentItem ii 
解释一下Item表是一个自关联的表，它的关联关系在hbm.xml中配置好了。 
如下：

程序代码
```
<many-to-one name="parentItem" lazy="false" fetch="join" class="cn.sports.matchs.model.Item"> 
             <column name="PARENT_ID"></column> 
</many-to-one>
```
在Item类中

程序代码
```
private Item parentItem;
```
 

关于lazy机制： 
延迟初始化错误是运用Hibernate开发项目时最常见的错误。如果对一个类或者集合配置了延迟检索策略，那么必须当代理类实例或代理集合处于持久化状态（即处于Session范围内）时，才能初始化它。如果在游离状态时才初始化它，就会产生延迟初始化错误。

下面把Customer.hbm.xml文件的<class>元素的lazy属性设为true，表示使用延迟检索策略： 
```
<class name="mypack.Customer" table="CUSTOMERS" lazy="true">
```
当执行Session的load()方法时，Hibernate不会立即执行查询CUSTOMERS表的select语句，仅仅返回Customer类的代理类的实例，这个代理类具由以下特征： 
（1）由Hibernate在运行时动态生成，它扩展了Customer类，因此它继承了Customer类的所有属性和方法，但它的实现对于应用程序是透明的。 
（2）当Hibernate创建Customer代理类实例时，仅仅初始化了它的OID属性，其他属性都为null，因此这个代理类实例占用的内存很少。 
（3）当应用程序第一次访问Customer代理类实例时（例如调用customer.getXXX()或customer.setXXX()方法）， Hibernate会初始化代理类实例，在初始化过程中执行select语句，真正从数据库中加载Customer对象的所有数据。但有个例外，那就是当应用程序访问Customer代理类实例的getId()方法时，Hibernate不会初始化代理类实例，因为在创建代理类实例时OID就存在了，不必到数据库中去查询。 
提示：Hibernate采用CGLIB工具来生成持久化类的代理类。CGLIB是一个功能强大的Java字节码生成工具，它能够在程序运行时动态生成扩展 Java类或者实现Java接口的代理类。关于CGLIB的更多知识，请参考：http://cglib.sourceforge.net/。 
以下代码先通过Session的load()方法加载Customer对象，然后访问它的name属性：
```
tx = session.beginTransaction(); 
Customer customer=(Customer)session.load(Customer.class,new Long(1)); 
customer.getName(); 
tx.commit(); 
```
在运行session.load()方法时Hibernate不执行任何select语句，仅仅返回Customer类的代理类的实例，它的OID为1，这是由load()方法的第二个参数指定的。当应用程序调用customer.getName()方法时，Hibernate会初始化Customer代理类实例，从数据库中加载Customer对象的数据，执行以下select语句： 
```
select * from CUSTOMERS where ID=1; 
select * from orDERS where CUSTOMER_ID=1; 
```
当<class>元素的lazy属性为true，会影响Session的load()方法的各种运行时行为，下面举例说明。 
1．如果加载的Customer对象在数据库中不存在，Session的load()方法不会抛出异常，只有当运行customer.getName()方法时才会抛出以下异常： 
>ERROR LazyInitializer:63 -Exception initializing proxy 
>net.sf.hibernate.ObjectNotFoundException: No row with thegiven identifier exists: 1, of class: 
>mypack.Customer 
2．如果在整个Session范围内，应用程序没有访问过Customer对象，那么Customer代理类的实例一直不会被初始化，Hibernate不会执行任何select语句。以下代码试图在关闭Session后访问Customer游离对象：
```
tx = session.beginTransaction(); 
Customer customer=(Customer)session.load(Customer.class,new Long(1)); 
tx.commit(); 
session.close(); 
customer.getName();
```
由于引用变量customer引用的Customer代理类的实例在Session范围内始终没有被初始化，因此在执行customer.getName()方法时，Hibernate会抛出以下异常： 
ERROR LazyInitializer:63 -Exception initializing proxy 
net.sf.hibernate.HibernateException: Couldnotinitializeproxy-theowningSessionwasclosed 
由此可见，Customer代理类的实例只有在当前Session范围内才能被初始化。

3．net.sf.hibernate.Hibernate类的initialize()静态方法用于在Session范围内显式初始化代理类实例，isInitialized()方法用于判断代理类实例是否已经被初始化。例如：
```
tx = session.beginTransaction(); 
Customer customer=(Customer)session.load(Customer.class,new Long(1)); 
if(!Hibernate.isInitialized(customer)) 
Hibernate.initialize(customer); 
tx.commit(); 
session.close(); 
customer.getName();
```
以上代码在Session范围内通过Hibernate类的initialize()方法显式初始化了Customer代理类实例，因此当Session关闭后，可以正常访问Customer游离对象。

4．当应用程序访问代理类实例的getId()方法时，不会触发Hibernate初始化代理类实例的行为，例如：
```
tx = session.beginTransaction(); 
Customer customer=(Customer)session.load(Customer.class,new Long(1)); 
customer.getId(); 
tx.commit(); 
session.close(); 
customer.getName();
```
当应用程序访问customer.getId()方法时，该方法直接返回Customer代理类实例的OID值，无需查询数据库。由于引用变量 customer始终引用的是没有被初始化的Customer代理类实例，因此当Session关闭后再执行customer.getName()方法， Hibernate会抛出以下异常： 
>ERROR LazyInitializer:63 -Exception initializing proxy 
>net.sf.hibernate.HibernateException: Couldnotinitializeproxy-theowningSessionwasclosed

解决方法： 
由于hibernate采用了lazy=true,这样当你用hibernate查询时,返回实际为利用cglib增强的代理类,但其并没有实际填充;当你在前端,利用它来取值(getXXX)时,这时Hibernate才会到数据库执行查询,并填充对象,但此时如果和这个代理类相关的session已关闭掉,就会产生种错误. 
在做一对多时，有时会出现"could not initialize proxy – clothe owning Session was sed,这个好像是hibernate的缓存问题.问题解决:需要在<many-to-one>里设置lazy="false". 但有可能会引发另一个异常叫 
failed to lazily initialize a collection of role: XXXXXXXX, no session or session was closed 
解决方法:在web.xml中加入
```
<filter> 
     <filter-name>hibernateFilter</filter-name> 
     <filter-class> 
     org.springframework.orm.hibernate3.support.OpenSessionInViewFilter 
     </filter-class> 
</filter > 
<filter-mapping> 
     <filter-name>hibernateFilter</filter-name> 
     <url-pattern>*.do</url-pattern> 
</filter-mapping>
```
就可以了;

参考了: 
Hibernate与延迟加载： 
Hibernate对象关系映射提供延迟的与非延迟的对象初始化。非延迟加载在读取一个对象的时候会将与这个对象所有相关的其他对象一起读取出来。这有时会导致成百的（如果不是成千的话）select语句在读取对象的时候执行。这个问题有时出现在使用双向关系的时候，经常会导致整个数据库都在初始化的阶段被读出来了。当然，你可以不厌其烦地检查每一个对象与其他对象的关系，并把那些最昂贵的删除，但是到最后，我们可能会因此失去了本想在ORM工具中获得的便利。 
一个明显的解决方法是使用Hibernate提供的延迟加载机制。这种初始化策略只在一个对象调用它的一对多或多对多关系时才将关系对象读取出来。这个过程对开发者来说是透明的，而且只进行了很少的数据库操作请求，因此会得到比较明显的性能提升。这项技术的一个缺陷是延迟加载技术要求一个Hibernate会话要在对象使用的时候一直开着。这会成为通过使用DAO模式将持久层抽象出来时的一个主要问题。为了将持久化机制完全地抽象出来，所有的数据库逻辑，包括打开或关闭会话，都不能在应用层出现。最常见的是，一些实现了简单接口的DAO实现类将数据库逻辑完全封装起来了。一种快速但是笨拙的解决方法是放弃DAO模式，将数据库连接逻辑加到应用层中来。这可能对一些小的应用程序有效，但是在大的系统中，这是一个严重的设计缺陷，妨碍了系统的可扩展性。 
在Web层进行延迟加载 
幸运的是，Spring框架为Hibernate延迟加载与DAO模式的整合提供了一种方便的解决方法。对那些不熟悉Spring与Hibernate集成使用的人，我不会在这里讨论过多的细节，但是我建议你去了解Hibernate与Spring集成的数据访问。以一个Web应用为例，Spring提供了OpenSessionInViewFilter和OpenSessionInViewInterceptor。我们可以随意选择一个类来实现相同的功能。两种方法唯一的不同就在于interceptor在Spring容器中运行并被配置在web应用的上下文中，而Filter在Spring之前运行并被配置在web.xml中。不管用哪个，他们都在请求将当前会话与当前（数据库）线程绑定时打开Hibernate会话。一旦已绑定到线程，这个打开了的Hibernate会话可以在DAO实现类中透明地使用。这个会话会为延迟加载数据库中值对象的视图保持打开状态。一旦这个逻辑视图完成了，Hibernate会话会在Filter的doFilter方法或者Interceptor的postHandle方法中被关闭。下面是每个组件的配置示例： 
Interceptor的配置:
```
<bean name="openSessionInViewInterceptor" 
class="org.springframework.orm.hibernate.support.OpenSessionInViewInterceptor"> 
<property name="sessionFactory"><ref bean="sessionFactory"/></property> 
</bean> 
</beans>
```
Filter的配置
```
<web-app>

<filter> 
<filter-name>hibernateFilter</filter-name> 
<filter-class> 
org.springframework.orm.hibernate.support.OpenSessionInViewFilter 
</filter-class> 
</filter>

<filter-mapping> 
<filter-name>hibernateFilter</filter-name> 
<url-pattern>*. spring </url-pattern> 
</filter-mapping>

</web-app>
```
实现Hibernate的Dao接口来使用打开的会话是很容易的。事实上，如果你已经使用了Spring框架来实现你的Hibernate Dao,很可能你不需要改变任何东西。方便的HibernateTemplate公用组件使访问数据库变成小菜一碟，而DAO接口只有通过这个组件才可以访问到数据库。下面是一个示例的DAO：
```
public class HibernateProductDAO extends HibernateDaoSupport implements ProductDAO {

public Product getProduct(Integer productId) { 
       return (Product)getHibernateTemplate().load(Product.class, productId); 
}

public Integer saveProduct(Product product) { 
       return (Integer) getHibernateTemplate().save(product); 
}

public void updateProduct(Product product) { 
       getHibernateTemplate().update(product); 
} 
}
```
在业务逻辑层中使用延迟加载 
即使在视图外面，Spring框架也通过使用AOP 拦截器 HibernateInterceptor来使得延迟加载变得很容易实现。这个Hibernate 拦截器透明地将调用配置在Spring应用程序上下文中的业务对象中方法的请求拦截下来，在调用方法之前打开一个Hibernate会话，然后在方法执行完之后将会话关闭。让我们来看一个简单的例子，假设我们有一个接口BussinessObject：
```
public     interface     BusinessObject     { 
public     void     doSomethingThatInvolvesDaos(); 
}
```
类BusinessObjectImpl实现了BusinessObject接口:
```
public     class     BusinessObjectImpl     implements     BusinessObject     { 
public     void     doSomethingThatInvolvesDaos()     { 
//     lots of logic that calls 
//     DAO classes Which access 
//     data objects lazily  
}  
} 
```
通过在Spring应用程序上下文中的一些配置，我们可以让将调用BusinessObject的方法拦截下来，再令它的方法支持延迟加载。看看下面的一个程序片段：
```
<beans> 
<bean id="hibernateInterceptor" class="org.springframework.orm.hibernate.HibernateInterceptor"> 
<property name="sessionFactory"> 
<ref bean="sessionFactory"/> 
</property> 
</bean> 
<bean id="businessObjectTarget" class="com.acompany.BusinessObjectImpl"> 
<property name="someDAO"><ref bean="someDAO"/></property> 
</bean> 
<bean id="businessObject" class="org.springframework.aop.framework.ProxyFactoryBean"> 
<property name="target"><ref bean="businessObjectTarget"/></property> 
<property name="proxyInterfaces"> 
<value>com.acompany.BusinessObject</value> 
</property> 
<property name="interceptorNames"> 
<list> 
<value>hibernateInterceptor</value> 
</list> 
</property> 
</bean> 
</beans>
```
当businessObject被调用的时候，HibernateInterceptor打开一个Hibernate会话，并将调用请求传递给BusinessObjectImpl对象。当BusinessObjectImpl执行完成后，HibernateInterceptor透明地关闭了会话。应用层的代码不用了解任何持久层逻辑，还是实现了延迟加载。 
在单元测试中测试延迟加载 
最后，我们需要用J-Unit来测试我们的延迟加载程序。我们可以轻易地通过重写TestCase类中的setUp和tearDown方法来实现这个要求。我比较喜欢用这个方便的抽象类作为我所有测试类的基类。
```
public abstract class MyLazyTestCase extends TestCase {

private SessionFactory sessionFactory; 
private Session session;

public void setUp() throws Exception { 
super.setUp(); 
SessionFactory sessionFactory = (SessionFactory) getBean("sessionFactory"); 
session = SessionFactoryUtils.getSession(sessionFactory, true); 
Session s = sessionFactory.openSession(); 
TransactionSynchronizationManager.bindResource(sessionFactory, new SessionHolder(s));

}

protected Object getBean(String beanName) { 
//Code to get objects from Spring application context 
}

public void tearDown() throws Exception { 
super.tearDown(); 
SessionHolder holder = (SessionHolder) TransactionSynchronizationManager.getResource(sessionFactory); 
Session s = holder.getSession(); 
s.flush(); 
TransactionSynchronizationManager.unbindResource(sessionFactory); 
SessionFactoryUtils.closeSessionIfNecessary(s, sessionFactory); 
} 
}
```
我们首先说利用lazy=false来解决问题，这种方法是很好用，但是在实际的过程并不实用，如果你某个对象关联好几个甚至十几个自对象，那么每次加载一个的话要执行很多HQL语句，可想而知这个效率问题啦，特别是在使用列表的时候。所以不实用，而在上述所说的“在业务逻辑层中使用延迟加载” 也是这种情况吧。 
很多使用WEB的朋友都喜欢利用openSessionView来加载这个问题。不错我也喜欢用，简单方便。但是说几种情况： 
1. 在quartz中总不能使用openSessionView模式吧 
2. 在spring后拦截的过程中，如果取拦截对象中的子对象利用openSessionView也不行 
还有很多情况是不能用的，那么怎么解决呢。有人说那就lazy=False吧，你想在单纯的解决一个quartz的时候调整整个WEB工程的加载好像不合适吧。 
那怎么办呢，我觉得这个时候就可以考虑利用SQL语句使用这个重新加载一遍这个代理类，这样在想调用的时候才手动加载比较合适和方便吧，但是估计要多几行代码，好好考虑
