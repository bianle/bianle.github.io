title: RSA加密算法原理及RES签名算法
date: 2015-11-16 13:29:58
tags: 算法
categories: 算法
---


# RSA算法原理与加密解密
## RSA加密过程简述

A和B进行加密通信时,B首先要生成一对密钥。一个是公钥，给A，B自己持有私钥。A使用B的公钥加密要加密发送的内容，然后B在通过自己的私钥解密内容。


## RSA加密算法基础

整个RSA加密算法的安全性基于大数不能分解质因数。

## 数学原理

###  互质关系：

两个数a和b没有除1外的其他公约数，则a与b互质

1. 任意两个质数构成互质关系
2. 两个数中，如果大数为质数，则两数必定互质
3. 1和任意整数互质
4. 当p>1时，p与p-1互质(相邻两数互质)
5. 当$p=2n+1$(n>0且n为整数)时，p与p+2互质(相连的两个奇数互质)

### 求欧拉函数：

定义：与正整数n互质且小于正整数n的正整数的个数。通常使用ψ(n)表示。

求取与正整数n互质的正整数的个数ψ(n),且ψ(n)满足ψ(n)∈(2,n)

1. 如果n=1,则ψ(n)=1
2. 如果n是质数,则ψ(n)=n-1
3. 如果n是质数p的次方,则：ψ(p^k)=p^k-p^(k-1) = p^k*(1-1/p)
4. 若p1和p2互质,$n=p1*p2$,则$ψ(n)= ψ(p1*p2)= ψ(p1) ψ(p2)$
5. 任意一个大于1的正整数都可以写成一系列质数的积
6. 根据定理5，推导欧拉定理：

因为
$n = (p1^{k1})\cdot (p2^{k2})\cdot……(pr^{kr})$(p1~pr都是质数)

所以
$\psi(n)= \psi((p1^{k1})) \psi(p2^{k2}) ……\psi(pr^{kr})$ 定理4

$\psi(n)= (p1^{k1})\cdot(1-\frac{1}{p1}) \cdot (p2^{k2})(1-\frac{1}{p2})……(pr^{kr})\cdot(1-\frac{1}{pr})$   定理3

$\psi(n)= (p1^{k1})\cdot (p2^{k2})\cdot……(pr^{kr}) \cdot (1-\frac{1}{p1}) (1-\frac{1}{p2})…… (1-\frac{1}{pr})$

$\psi(n)=n (1-\frac{1}{p1}) (1-\frac{1}{p2})…… (1-\frac{1}{pr})$  

###  欧拉定理：

正整数a与n互质，则下式恒成立

$$a^{\psi(n)} \equiv {1(mod　n)}$$

即：

a的ψ(n)次幂除以n,余数恒为1

###  模反元素

如果两个正整数a和n互质,则必定存在整数b使得a*b-1被n除余数为1

$$ab \equiv 1(mod　n)$$

其中b被称为a的模反元素

 

## RSA算法详解：

假设A和B要通信

###  生成密钥

#### 公钥

1. 随机生成两个不相等的质数p和q(质数越大越安全)

2. 计算n,n=p*q 则n的二进制位数就是密钥的长度。

3. 计算n的欧拉函数ψ(n)        

因为

$n=p \cdot q$

所以

$\psi(n) =\psi(p)\cdot \psi(q)$    定理4

又p和q为质数

所以

$\psi(p)=p-1$    定理2

$\psi(q)=q-1$    定理2

所以

$\psi(n) = (p-1)(q-1)$

4. 获取随机正整数e,e满足  e∈(1, ψ(n))且e与ψ(n)互质(通常选择65537)

将n和e封装成公钥

        

#### 私钥

1. 计算e对于ψ(n)的模反元素d

$e*d=1(mod　\psi(n))$;

设正整数k, $e*d = k\psi(n)+1$;

则$ed-k\psi(n)=1$

  $d = (k\psi(n)+1) / e$;

对于不定方程$ax+by=c$，设$gcd(a,b)=d$，如果$ax+by=c$有解，则d|c----->也就是说如果$ed-k\psi(n)=1$ 有解,则gcd(d,-k)能够整除1,而1显然可以被任何整数整除,所以该二元一次方程必定有解(d,k)

 

 (欧几里得定理和扩展欧几里得定理计算二元一次方程)

2. 将n和d封装成私钥

 

 

## RSA算法可靠性论证

从上文可以统计出整个算法涉及到的量有6个，其中三个为由私钥持有者生成，三个是私钥持有者推导出来的

生成量：p,q,e

推导量：n, ψ(n),d

 

密钥中只有公钥被发布,所有人都可以获取。而公钥由n和e封装起来,因此,如果要破解一份RSA加密过的密文,我们必须使用私钥(私钥由n和d封装而成)

n可以从公钥获取。

 

(假设mc为明文，c为密文，则公钥由n和e封装则意味着求取密文的运算中，n，e和mc是已知数，只有c是未知数；私钥由n和d封装，同上，解密密文的运算中，n，d和c是已知的，只有mc是未知数。)

 

因此,破解私钥的关键就是破解e对于ψ(n)的模反元素d。

其数学关系是：  e*d=1(modψ(n));

因此需需要先求出ψ(n),而求出ψ(n)需要知道ψ(p)和ψ(q)(因为ψ(n)= ψ(p* ψ(q))

 

而p和q只能通过分解n的质因数获得。所以,整个RSA算法都基于n这个大数不能分解质因数这个基础上。

        

因此，只要n够大，私钥就不会被破解

 

 

## 加解密过程：假设明文是m,c是密文

###  加密：使用公钥(n,e)

先将其换算成asc码或者unicode等其他数值。且m必须小于n

则加密算法是

m^e=c(mod n)

推出

m^e / n = k ……c这里c就是密文，k我们不关心

###  解密：使用私钥(n,d)

1. 简单的说解密就是通过下式求m。(一定可以求解出m)

c^d = m(mod n)

推出
c^d / n = k … … m    m就是明文编码，不关心k

 

查表得出明文

 

# RSA算法签名与验签
 

假设A要想B发送消息，A会先计算出消息的消息摘要，然后使用自己的私钥加密这段摘要加密，最后将加密后的消息摘要和消息一起发送给B，被加密的消息摘要就是“签名”。

B收到消息后，也会使用和A相同的方法提取消息摘要，然后使用A的公钥解密A发送的来签名，并与自己计算出来的消息摘要进行比较。如果相同则说明消息是A发送给B的，同时，A也无法否认自己发送消息给B的事实。

其中，A用自己的私钥给消息摘要加密成为“签名”；B使用A的公钥解密签名文件的过程，就叫做“验签”。

 

数字签名的作用是保证数据完整性，机密性和发送方角色的不可抵赖性

 

下面是对签名和验签过程的简要描述：

 

## 签名过程：

1.        A计算消息m的消息摘要,记为 h(m)

2.        A使用私钥(n,d)对h(m)加密，生成签名s ,s满足：

s=(h(m))^d mod n;

由于A是用自己的私钥对消息摘要加密，所以只用使用s的公钥才能解密该消息摘要，这样A就不可否认自己发送了该消息给B。

3.        A发送消息和签名(m,s)给B。

 

##  验签过程：

1.        B计算消息m的消息摘要,记为h(m);

2.        B使用A的公钥(n,e)解密s,得到

H(m) = s^e mod n;

3.        B比较H(m)与h(m),相同则证明

 

# 总结
 

下面简单总结加密和解密的完整过程。

 

##  签名过程：

1.        A提取消息m的消息摘要h(m),并使用自己的私钥对摘要h(m)进行加密,生成签名s

2.        A将签名s和消息m一起,使用B的公钥进行加密,生成密文c,发送给B。

##  验证过程：

1.        B接收到密文c,使用自己的私钥解密c得到明文m和数字签名s

2.        B使用A的公钥解密数字签名s解密得到H(m).

3.        B使用相同的方法提取消息m的消息摘要h(m)

4.        B比较两个消息摘要。相同则验证成功;不同则验证失败。

 

## java Demo

EnAndDe.java

```
package com.joe.main;

import java.io.*;
import java.math.BigInteger;
import java.util.ArrayList;

/**
 * <p>
 * Company: 建工学院
 * </p>
 * 
 * @author 04信息（1）程晟
 * @modify Joe
 * @Description Demo说明：
 *              1、按照加密解密和签名验签的逻辑,编写简单的demo,不涉及java中继承的RSA相关类和Sigesture签名类
 *              2、只能对数字和字母进行加密, 不涉及编码和解码问题 。 3、不做数字签名和验证了,涉及到提取信息摘要。
 */
public class EnAndDe {
	private long p = 0;
	private long q = 0;
	private long n = 0;
	private long t = 0; // 欧拉函数

	private long e = 0; // 公匙
	private long d = 0; // 密匙

	private String mc; // 明文
	private long c = 0; // 密文
	private long word = 0; // 解密后明文

	// 判断是一个数 x 否为素数素数就是判断在 (2,√x)范围内有没有除1外的因数,如果没有则x数素数
	public boolean isPrime(long t) {
		long k = 0;
		k = (long) Math.sqrt((double) t);
		for (int i = 2; i <= k; i++) {
			if ((t % i) == 0) {
				return false;
			}
		}
		return true;
	}

	// 随机产生大素数(1e6数量级，注意，太大了要超出范围)
	public void bigprimeRandom() {
		do {
			p = (long) (Math.random() * 1000000);
		} while (!this.isPrime(p));
		do {
			q = (long) (Math.random() * 1000000);
		} while (p == q || !this.isPrime(q));
	}

	// 输入PQ
	public void inputPQ() throws Exception {

		this.bigprimeRandom();
		System.out.println("自动生成两个大素数p,q分别为:" + this.p + " " + this.q);

		this.n = (long) p * q;
		this.t = (long) (p - 1) * (q - 1);

		System.out.println("这两个素数的乘积为p*q：" + this.n);
		System.out.println("所得的t=(p-1)(q-1)：" + this.t);
	}

	// 求最大公约数
	public long gcd(long a, long b) {
		long gcd;
		if (b == 0)
			gcd = a;
		else
			gcd = gcd(b, a % b);
		return gcd;

	}

	// 生成公匙
	public void getPublic_key() throws Exception {
		do {

			this.e = (long) (Math.random() * 100000);
			// e满足 e∈(1, ψ(n))且e与ψ(n)最大公约数为1,即 e与t互质
		} while ((this.e >= this.t) || (this.gcd(this.t, this.e) != 1));
		System.out.println("生成的公钥为：" + "(" + this.n + "," + this.e + ")");
	}

	// 生成私钥 e*d=1(modψ(n))==> d = (kψ(n)+1) / e
	public void getPrivate_key() {
		long value = 1; // value 是e和d的乘积
		outer: for (long k = 1;; k++) {
			value = k * this.t + 1;
			if ((value % this.e == 0)) {
				this.d = value / this.e;
				break outer;
			}
		}
		System.out.println("产生的一个私钥为：" + "(" + this.n + "," + this.d + ")");
	}

	// 输入明文
	public void getText() throws Exception {
		System.out.println("请输入明文：");
		BufferedReader stdin = new BufferedReader(new InputStreamReader(
				System.in));
		mc = stdin.readLine();

	}

	// 解密密文
	public void pascolum() throws Exception {
		this.getText();
		System.out.println("输入明文为: " + this.mc);
		// 加密
		ArrayList cestr = new ArrayList();
		for (int i = 0; i < mc.length(); i++) {
			this.c = this.colum((long) mc.charAt(i), this.n, this.e);
			cestr.add(c);
		}
		System.out.println("加密后所得的密文为：" + cestr);
		// 解密
		StringBuffer destr = new StringBuffer();
		for (int j = 0; j < cestr.size(); j++) {
			this.word = this.colum(Long.parseLong(cestr.get(j).toString()),
					this.n, this.d);
			destr.append((char) word);
		}
		System.out.println("解密后所得的明文为：" + destr);

	}

	// 加密、解密计算
	public long colum(long mc, long n, long key) {
		BigInteger bigy = new BigInteger(String.valueOf(mc));
		BigInteger bign = new BigInteger(String.valueOf(n));
		BigInteger bigkey = new BigInteger(String.valueOf(key));
		return Long.parseLong(bigy.modPow(bigkey, bign).toString());// 备注1
	}

	public static void main(String[] args) {
		try {
			EnAndDe t = new EnAndDe();
			t.inputPQ();
			t.getPublic_key();
			t.getPrivate_key();
			t.pascolum();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
```


备注1：modPow(a,b)是java类BigInteger中的一个方法，返回结果是：调用该方法的对象的a次幂,模b的结果
