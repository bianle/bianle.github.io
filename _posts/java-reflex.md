title: JAVA反射机制-class类的获取
tags: [java,反射]
categories: java
date: 2012-12-05 18:09:17
---
java.lang.Class 是一个比较特殊的类，它用于封装被装入到JVM 中的类（包括类和接口）的
信息。
当一个类或接口被装入的JVM 时便会产生一个与之关联的java.lang.Class 对象，可以通过
这个Class 对象对被装入类的详细信息进行访问。
简单的说，获取某一个类所对应的Class 对象可以通过如下三种途径：
1. Object 的getClass 方法
java.lang.Object 中定义有getClass 方法：
public final Class getClass()
所有Java 对象都具备这个方
法。该方法用于返回与调用该方法对象所属类关联的Class 对象，
例如：
```
Date date1 = new Date();
Date date2 = new Date();
Class c1 = date1.getClass();
Class c2 = date2.getClass();
System.out.println(c1.getName()); // java.util.Date
System.out.println(c1 == c2); // true
```
上面的代码中，调用Date 对象date1 的getClass 方法将返回用于封装Date 类信息的Class
对象。这里调用了Class 类的getName 方法：
```
public String getName()
```
这个方法的含义很直观，即返回所封装的类的名称。
需要注意的是，代码中的date1 和date2 的getClass 方法返回了相同的Class 对象（c1==c2
的值为true）。这是因为，对于相同的类，JVM 只会载入一次，而与该类对应的Class 对象
也只会存在一个，无论该类实例化了多少对象。
另外，需要强调的是，当一个对象被其父类的引用或其实现的接口类型的引用所指向的时，
getClass 方法返回的是与对象实际所属类关联的Class 对象。例如：
```
List list = new ArrayList();
System.out.println(list.getClass().getName()); // java.util.ArrayList
```
上面的代码中，语句list.getClass()方法返回的是list 所指向对象实际所属类java.util.ArrayList
对应的Class 对象而并未java.util.List 所对应的Class 对象。有些时候可以通过这个方法了解
一个对象的运行时类型，例如：
```
HashSet set = new HashSet();
Iterator it = set.iterator();
System.out.println(it.getClass().getName()); //java.util.HashMap$KeyIterator
```
从代码可以看出，HashSet 的iterator 方法返回的是实现了Iterator 接口的HashMap 内部类
（KeyIterator）对象。
因为抽象类和接口不可能实例化对象，因此不能通过Object 的getClass 方法获得与抽象类
和接口关联的Class 对象。
2. 使用.class 的方式
使用类名加“.class”的方式即会返回与该类对应的Class 对象。例如：
```
Class clazz = String.class;
System.out.println(clazz.getName()); // java.lang.String
```
这个方法可以直接获得与指定类关联的Class 对象，而并不需要有该类的对象存在。
3. 使用Class.forName 方法
Class 有一个著名的static 方法forName：
```
public static Class forName(String className) throws ClassNotFoundException
```
该方法可以根据字符串参数所指定的类名获取与该类关联的Class 对象。如果该类还没有被
装入，该方法会将该类装入JVM。
该方法声明抛出ClassNotFoundException 异常。顾名思义，当该方法无法获取需要装入的类
时（例如，在当前类路径中不存在这个类），就会抛出这个异常。
例如，如果当前类路径中存在Foo 类：
```
package org.whatisjava.reflect;
public class Foo {
public Foo() {
System.out.println("Foo()");
}
static {
System.out.println("Foo is initialized");
}
}
```
运行下面的代码：控制台会有如下输出：
Class clazz = Class.forName("org.whatisjava.reflect.Foo");
Foo is initialized
Class.forName(“org.whatisjava.reflect.Foo”)首先会将reflection.Foo 类装入JVM，并返回与之
关联的Class 对象。JVM 装入Foo 类后对其进行初始化，调用了其static 块中的代码。需要
注意的是：forName 方法的参数是类的完整限定名（即包含包名）。
区别于前面两种获取Class 对象的方法。使用Class.forName 方法所要获取的与之对应的Class
对象的类可以通过字符串的方式给定。该方法通常用于在程序运行时根据类名动态的载入该
类并获得与之对应的Class 对象。
