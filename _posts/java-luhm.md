title: 银行卡号Luhm校验算法
tags: [java,算法]
categories: java
date: 2012-09-18 18:09:17
---

1. 将未带校验位的 15（或18）位卡号从右依次编号 1 到 15（18），位于奇数位号上的数字乘以 2。
2. 将奇位乘积的个十位全部相加，再加上所有偶数位上的数字。
3. 将加法和加上校验位能被 10 整除。
```
/**
	 * luhm校验算法
	 * @param cardNo 卡号15位或18位
	 * @return 校验位
	 */
	public static String luhm(String cardNo){
		int sum = 0;
		boolean bl = true;
		for (int i = cardNo.length() - 1; i >= 0; i--) {
			if (bl) {//奇数位乘2后个位与十位相加
				int temp = Integer.parseInt(cardNo.charAt(i) + "");
				temp *= 2;
				if (temp > 9)
					temp -= 9;
				sum += temp;
			} else {//偶数位
				sum += Integer.parseInt(cardNo.charAt(i) + "");
			}
			bl = !bl;
		}
		int checkDigit = (10 - sum % 10) % 10;//和的10的“补数”
		return checkDigit+"";
	}
```
