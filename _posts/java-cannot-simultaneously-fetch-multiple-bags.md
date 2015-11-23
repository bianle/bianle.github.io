title: “cannot simultaneously fetch multiple bags”的解决方法
tags: [java,JPA]
categories: java
date: 2012-08-10 18:09:17
---
```
@OneToMany(mappedBy = "customer",cascade = {CascadeType.ALL},fetch = FetchType.LAZY)
private Collection<CartItem> cartItems;

@OneToMany(mappedBy = "customer",cascade = {CascadeType.ALL},fetch = FetchType.EAGER)
private Collection<BookOrder> orders ;
```
在用JPA进行注释时，如果一个实体里要映射多个集合实体时，我们不能把两个集合的的FetchType设置为EAGER,此时只能设置为LAZY,否则会报：cannot simultaneously fetch multiple bags。或者我们也可以借助:@IndexColumn
