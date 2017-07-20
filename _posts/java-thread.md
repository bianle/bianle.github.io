---
title: "java多线程"
date: 2017-05-16 17:13:52
tags: java
categories: java
---

## tips

### 不要对基本类型加锁

### 案例
来自[iteye](http://www.iteye.com/problems/81127):
```
public class Test {

    public static void main(String[] args) {

        final TestRun run = new TestRun();

        Thread thread = new Thread(run);
        Thread thread2 = new Thread(run);
        thread.start();
        thread2.start();

    }
}

class TestRun implements Runnable {

    public Integer i    = 0;
    public Object  lock = new Object();

    @Override
    public void run() {
        synchronized (i) {
            i++;
            System.out.println("step1:" + i);
            i++;
            System.out.println("step2:" + i);
        }
    }
}
```

>运行的结果。按理说，锁住了i对象，同步快中的内容顺序执行，结果为： 
>step1:1 
>step2:2 
>step1:3 
>step2:4 
>
>但结果却是： 
>step1:1 
>step1:2 
>step2:3 
>step2:4 
>或者 
>step1:1 
>step2:3 
>step1:2 
>step2:4 
>
>貌似没有锁住。 
>当改为synchronized （lock）{ 
>       …… 
>} 
>结果就正常了！ 
>
>
>为什么？？？？锁住对象了，不能对对象进行操作吗？ 

>原因是Java的自动封箱和解箱操作在作怪。 
>这里的i++实际上是i = new Integer(i+1)，所以执行完i++后，i已经不是原来的对象了，同步块自然就无效了。 
>其它基本类型的封装类，如Short、Long等等也不能作为同步对象
