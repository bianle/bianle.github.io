---
title: "bug修复记-solr排序函数"
date: 2017-07-11 20:09:58
tags: solr
categories: solr
---

```
q=custNo:6054575780 AND cmmdtyName:华为nova(4GB+64GB)CAZ-AL10香槟金(白)全网通&sort={!func}sum(product(sum(map(query($aaa),0,0,0,2),map(zsPrice,0,0,1,4)),100000),zsPrice) desc&aaa=inventory:010
```

### 不手动URL编码


```
CloseableHttpClient client = null;
client = HttpClients.createDefault();
URL url = new URL(urlStr);
URI uri = new URI(url.getProtocol(), url.getHost(), url.getPath(), url.getQuery(), null);
HttpGet httpget = new HttpGet(uri);
HttpResponse response = client.execute(httpget);
```


```
http://gcmssit.service.cnsuning.com/solr/fxnew/select?q=custNo:6054575780%20AND%20cmmdtyName:华为nova%5C(4GB%5C+64GB%5C)CAZ%5C-AL10香槟金%5C(白%5C)全网通&wt=json&indent=true&fl=zsPrice&aaa=inventory:000001000137&sort=%7B!func%7Dsum(product(sum(map(query($aaa),0,0,2,0),map(zsPrice,0,0,4,1)),100000),zsPrice)%20asc
```

>q:custNo:6054575780 AND cmmdtyName:华为nova\(4GB\ 64GB\)CAZ\-AL10香槟金\(白\)全网通  
>wt:json  
>indent:true  
>fl:zsPrice  
>aaa:inventory:000001000137  
>sort:{!func}sum(product(sum(map(query($aaa),0,0,2,0),map(zsPrice,0,0,4,1)),100000),zsPrice) asc  

### 手动对含特殊字符的查询串URL编码

```
String q = "cmmdtyName:华为nova\\(4GB\\+64GB\\)CAZ\\-AL10香槟金\\(白\\)全网通";
URLEncoder.encode(q,"utf-8");
...

String sort="{!func}sum(product(sum(map(query($aaa),0,0,0,2),map(zsPrice,0,0,1,4)),100000),zsPrice) desc";
URLEncoder.encode(sort,"utf-8");

```

```
CloseableHttpClient client = null;
client = HttpClients.createDefault();
HttpGet httpget = new HttpGet(urlStr);
HttpResponse response = client.execute(httpget);
```

```
http://gcmssit.service.cnsuning.com/solr/fxnew/select?q=custNo%3A6054575780+AND+cmmdtyName%3A%E5%8D%8E%E4%B8%BAnova%5C%284GB%5C%2B64GB%5C%29CAZ%5C-AL10%E9%A6%99%E6%A7%9F%E9%87%91%5C%28%E7%99%BD%5C%29%E5%85%A8%E7%BD%91%E9%80%9A&wt=json&indent=true&fl=zsPrice&aaa=inventory:000001000137&sort=%7B%21func%7Dsum%28product%28sum%28map%28query%28%24aaa%29%2C0%2C0%2C2%2C0%29%2Cmap%28zsPrice%2C0%2C0%2C4%2C1%29%29%2C100000%29%2CzsPrice%29+asc
```
>q:custNo:6054575780 AND cmmdtyName:华为nova\(4GB\+64GB\)CAZ\-AL10香槟金\(白\)全网通  
>wt:json  
>indent:true  
>fl:zsPrice  
>aaa:inventory:000001000137  
>sort:{!func}sum(product(sum(map(query($aaa),0,0,2,0),map(zsPrice,0,0,4,1)),100000),zsPrice) asc  


