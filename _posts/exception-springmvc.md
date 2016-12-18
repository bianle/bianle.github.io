---
title: "好大的异常-springmvc篇"
date: 2016-11-02 17:50:43
tags: springmvc
categories: java
---

这一贴比较费流量！

<!-- more -->

## 关键字`call 'refresh' before multicasting events via the context`

>21:29:25.216 [localhost-startStop-1] WARN  o.s.w.c.s.XmlWebApplicationContext - Exception thrown from ApplicationListener handling ContextClosedEvent
>java.lang.IllegalStateException: ApplicationEventMulticaster not initialized - call 'refresh' before multicasting events via the context: Root WebApplicationContext: startup date [Thu Mar 24 21:29:24 CST 2016]; root of context hierarchy
>	at org.springframework.context.support.AbstractApplicationContext.getApplicationEventMulticaster(AbstractApplicationContext.java:347) [spring-context-3.2.13.RELEASE.jar:3.2.13.RELEASE]
>	at org.springframework.context.support.AbstractApplicationContext.publishEvent(AbstractApplicationContext.java:334) [spring-context-3.2.13.RELEASE.jar:3.2.13.RELEASE]
>	at org.springframework.context.support.AbstractApplicationContext.doClose(AbstractApplicationContext.java:1051) [spring-context-3.2.13.RELEASE.jar:3.2.13.RELEASE]
>	at org.springframework.context.support.AbstractApplicationContext.close(AbstractApplicationContext.java:1012) [spring-context-3.2.13.RELEASE.jar:3.2.13.RELEASE]
>	at org.springframework.web.context.ContextLoader.closeWebApplicationContext(ContextLoader.java:586) [spring-web-3.2.13.RELEASE.jar:3.2.13.RELEASE]
>	at org.springframework.web.context.ContextLoaderListener.contextDestroyed(ContextLoaderListener.java:143) [spring-web-3.2.13.RELEASE.jar:3.2.13.RELEASE]
>	at com.suning.pai.service.listener.SystemListener.contextDestroyed(SystemListener.java:76) [SystemListener.class:na]
>	at org.apache.catalina.core.StandardContext.listenerStop(StandardContext.java:5014) [catalina.jar:7.0.54]
>	at org.apache.catalina.core.StandardContext.stopInternal(StandardContext.java:5659) [catalina.jar:7.0.54]
>	at org.apache.catalina.util.LifecycleBase.stop(LifecycleBase.java:232) [catalina.jar:7.0.54]
>	at org.apache.catalina.util.LifecycleBase.start(LifecycleBase.java:160) [catalina.jar:7.0.54]
>	at org.apache.catalina.core.ContainerBase$StartChild.call(ContainerBase.java:1559) [catalina.jar:7.0.54]
>	at org.apache.catalina.core.ContainerBase$StartChild.call(ContainerBase.java:1549) [catalina.jar:7.0.54]
>	at java.util.concurrent.FutureTask.run(FutureTask.java:262) [na:1.7.0_45]
>	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1145) [na:1.7.0_45]
>	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:615) [na:1.7.0_45]
>at java.lang.Thread.run(Thread.java:744) [na:1.7.0_45]

bean id 重复了

## SpringMVC3.2+Mybatis3.2集成报错

>Exception in thread "main" java.lang.AbstractMethodError: org.mybatis.spring.transaction.SpringManagedTransactionFactory.newTransaction(Ljava/sql/Connection;)Lorg/apache/ibatis/transaction/Transaction;
>	at org.apache.ibatis.session.defaults.DefaultSqlSessionFactory.openSessionFromConnection(DefaultSqlSessionFactory.java:98)
>	at org.apache.ibatis.session.defaults.DefaultSqlSessionFactory.openSession(DefaultSqlSessionFactory.java:71)
>	at org.mybatis.spring.SqlSessionUtils.getSqlSession(SqlSessionUtils.java:135)
>	at org.mybatis.spring.SqlSessionTemplate$SqlSessionInterceptor.invoke(SqlSessionTemplate.java:345)
>	at com.sun.proxy.$Proxy1.selectOne(Unknown Source)
>	at org.mybatis.spring.SqlSessionTemplate.selectOne(SqlSessionTemplate.java:155)
>	at im.le.hello.dao.TestDao.select(TestDao.java:13)
>at im.le.hello.dao.TestDao.main(TestDao.java:19)

mybatis-spring插件升级到1.0.2->1.1.1

```
<dependency>
			<groupId>org.mybatis</groupId>
			<artifactId>mybatis-spring</artifactId>
			<version>1.1.1</version>
</dependency>
```

## quartz2+spring3

>Caused by: org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'runMeJob' defined in URL [jar:file:/D:/bl/git/cpx/cpx-admin/target/cpx-admin/WEB-INF/lib/cpx-business-1.0.0-SNAPSHOT.jar!/conf/spring/spring-job.xml]: Invocation of init method failed; nested exception is java.lang.IncompatibleClassChangeError: Implementing class
>	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.initializeBean(AbstractAutowireCapableBeanFactory.java:1514) ~[spring-beans-3.2.13.RELEASE.jar:3.2.13.RELEASE]
>	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.doCreateBean(AbstractAutowireCapableBeanFactory.java:521) ~[spring-beans-3.2.13.RELEASE.jar:3.2.13.RELEASE]
>	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBean(AbstractAutowireCapableBeanFactory.java:458) ~[spring-beans-3.2.13.RELEASE.jar:3.2.13.RELEASE]
>	at org.springframework.beans.factory.support.AbstractBeanFactory$1.getObject(AbstractBeanFactory.java:293) ~[spring-beans-3.2.13.RELEASE.jar:3.2.13.RELEASE]
>	at org.springframework.beans.factory.support.DefaultSingletonBeanRegistry.getSingleton(DefaultSingletonBeanRegistry.java:223) ~[spring-beans-3.2.13.RELEASE.jar:3.2.13.RELEASE]
>	at org.springframework.beans.factory.support.AbstractBeanFactory.doGetBean(AbstractBeanFactory.java:290) ~[spring-beans-3.2.13.RELEASE.jar:3.2.13.RELEASE]
>七月 29, 2016 8:41:51 上午 org.apache.catalina.core.StandardContext startInternal
>	at org.springframework.beans.factory.support.AbstractBeanFactory.getBean(AbstractBeanFactory.java:191) ~[spring-beans-3.2.13.RELEASE.jar:3.2.13.RELEASE]

spring3不兼容quartz2
http://www.mkyong.com/spring/incompatibleclasschangeerror-jobdetailbean-has-interface-org-quartz-jobdetail-as-super-class/

