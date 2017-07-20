---
title: "java小提示"
date: 2016-11-01 15:06:33
tags: [java]
---

- 非静态方法不要修改静态变量
![sonar](http://7xlbo3.com1.z0.glb.clouddn.com/2016/11/01/20161101151208.png)

- 判断集合不为空isEmpty()

```
productList == null||productList.size()==0

productList == null||productList.isEmpty()
```

- new BigDecimal(0.1) -> BigDecimal.valueOf(0.1)

- p.getTotalPerformancePay().equals(BigDecimal.ZERO)

- 注意运算符的优先级

```
response.setMsg("未查询到商品价格信息：" + rst == null ? null : rst.getErrorMessage());
```

>Condition '"未查询到商品价格信息：" + rst == null' is always 'false'

```
response.setMsg("未查询到商品价格信息：" + (rst == null ? null : rst.getErrorMessage()));
```


## java数组为什么没有泛型

http://blog.csdn.net/orzlzro/article/details/7017435
http://docs.oracle.com/javase/tutorial/extra/generics/fineprint.html


