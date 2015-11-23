title: Hibernate 使用 SQL 查询时报错 “对象名 XX 无效”的解决办法
tags: [hibernate,java]
categories: java
date: 2012-12-05 18:09:17
---
Hibernate提供3种检索数据的方式，HQL，QBC，SQL。前2者为Hibernate框架自带的查
询语言。后者是Hibernate支持的底层数据库查询语言，说白了就是支持以前我们使用
的SQL语句。
前2天试着用Hibernate提供的SQL查询数据库，得到的确实不友好的错误提示。
错误信息如下：
Caused by: java.sql.SQLException: [Microsoft][SQLServer 2000 Driver for
JDBC][SQLServer]对象名 ‘ 实际操作的表名 ‘ 无效。
Hibernate提供的SQL查询语句格式及我检索的条件如下：
SQLQuery sQuery = session.createSQLQuery(“select * from Classes”);
sQuery.addEntity(Classes.class);
分析：
1、查看自己写的语句，没有丝毫的错误。放到SQL查询分析器执行。也能检索出数据。
这确保了这条语句是没错的。
提示：Hibernate中的SQL语句是不区分大小写的，即便是你查询的表名。比如你写成这
样也是合法的 “SEleCt * fRoM ClaSSes “。那么Hibernate怎样操作对象？问题的关键
是这里sQuery.addEntity(Classes.class);这条语句， 你要正确填写你要检索的表的
实体，它必须是你存在的POJO。
2、使用Hibernate官方推荐的HQL查询，同样的数据库，同样的表。结果是正确的。这
确保了数据库链接是绝对没有问题的。
3、仔细检查我写的SQL查询方法，没有发现什么语法错误。
4、检查我查询表的POJO对象的映射文件.XXX.hbm.xml ，主键生成方式是 native 。似
乎也没有错误。
5、检查数据库检索表的主键，也已经设成自动增长。
疑问：
既然上面都有保证，为什么Hibernate还是检索不到我查询的对象（表）呢，记起POJO
对象映射文件的class元素中，有这么一段 schema=”dbo” catalog=”HibernateTest”
。
提示：schema：数据库所有者。catalog：目录，也就是此对象映射的表属于那个数据
库。
和它有关吗？
修改
SQLQuery sQuery = session.createSQLQuery("select * from Classes");
为
SQLQuery sQuery = session.createSQLQuery("select * from Classes [hibernatetest].[dbo].Classes");
执行查询类，OK了。问题解决了。
