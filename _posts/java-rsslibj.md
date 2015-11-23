title: 利用RSSLibJ读取RSS
tags: [rss,java]
categories: java
date: 2013-02-01 18:09:17
---
RSS是一个标准的XML文件，Rss阅读器可以读取这个XML文件获得文章的信息，使用户可以通过Rss阅读器而非浏览器阅读Blog，我们只要动态生成这个XML文件便可以了。RSSLibJ是一个专门读取和生成RSS的小巧实用的Java库，大小仅25k，可以下载rsslibj-1_0RC2.jar和它需要的EXMLjar两个文件，然后复制到/WEB-INF/lib/下。
 
rsslibj-1_0RC2.jar下载地址：http://sourceforge.net/project/downloading.php?group_id=71153&use_mirror=nchc&filename=rsslibj-1_0RC2.jar&27763931
 
EXML.jar下载地址：http://rsslibj.cvs.sourceforge.net/rsslibj/rsslibj/lib/EXML.jar?view=log
 
读取新浪RSS的一个例子，结合Jsf。
 
页面：
```
<%@taglib uri="http://java.sun.com/jsf/core" prefix="f"%>
<%@taglib uri="http://java.sun.com/jsf/html" prefix="h"%>
<%@page contentType="text/html;charset=gb18030"%>
<f:view>
	<html>
	<body>
	<h:form>
		<h3>RSS Reader</h3>
 			请输入RSS地址：
 			<h:inputText value="#{rssReader.rssAddress }" id="rssAddress"
			converterMessage="请输入一个正确的Rss地址!" style="width:280px;">
		</h:inputText>
		<h:commandButton value="提交" action="#{rssReader.readRss }"></h:commandButton>
		<br>
		<br>
		<h:message for="rssAddress" style="color:red;"></h:message>
	</h:form>
	<br>
	<br>
	从
	<h:outputText value="#{rssReader.rssAddress }"></h:outputText>
	获取的内容：
	<br>
	<h:form>
	<h:dataTable value="#{rssReader.items }" var="item" style="font-size:13px;" border="1">
		<h:column>
			<h:outputText value="#{item.title }"></h:outputText>
		</h:column> 
		<h:column>
			<h:outputLink value="#{item.link }">
				<h:outputText value="#{item.link }"></h:outputText>
			</h:outputLink>
		</h:column>
	</h:dataTable>
	</h:form>
	</body>
	</html>
</f:view>
```
RSSReader.java

```
package com.rss;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;
import java.util.Properties;

import com.rsslibj.elements.Channel;
import com.rsslibj.elements.Item;
import com.rsslibj.elements.RSSReader;

import electric.xml.ParseException;

public class RssReader {
	private static final String urlString =  "http://rss.sina.com.cn/news/marquee/ddt.xml";
	private List<Item> items;
	private String rssAddress;
	private String proxyHost = "paicproxy2";
	private String proxyPort = "8080";
	
	public String getRssAddress() {
		return this.rssAddress;
	}

	public void setRssAddress(String rssAddress) {
		this.rssAddress = rssAddress;
	}

	public List<Item> getItems() {
		return this.items;
	}

	/**
	 * 设置代理
	 */
	public void setProxy(String proxyHost,String proxyPort) {
		
		// 设置代理
		Properties systemSettings = System.getProperties();
		systemSettings.put("http.proxyHost", proxyHost);
		systemSettings.put("http.proxyPort", proxyPort);
		System.setProperties(systemSettings);
	}
	 /**
     * 读取RSS。
     * @param url
     * @throws IOException 
     * @throws ParseException 
     */
    public void readRss() throws IOException, ParseException {
    	setProxy(proxyHost, proxyPort);
    	
    	URL __url = new URL(this.rssAddress);
    	HttpURLConnection conn = (HttpURLConnection) __url.openConnection();
    	InputStream in = conn.getInputStream();
    	BufferedReader bufReader = new BufferedReader(new InputStreamReader(in,"utf-8"));
    	RSSReader rssReader = new RSSReader(bufReader);
    	Channel channel = rssReader.getChannel();
    	this.items = channel.getItems();
    }
    
    /**
     * 打印获取的RSS内容。
     * @param urlString
     */
    public void test(String urlString) {
    	setProxy(urlString, urlString);	
		try {
			URL url = new URL(urlString);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			InputStream is = conn.getInputStream();
			StringBuilder sBuilder = new StringBuilder();
			String line = null;
			
			BufferedReader reader = new BufferedReader(new InputStreamReader(is,"utf-8"));
			
			while ((line = reader.readLine()) != null) {
				sBuilder.append(line).append("\n");
			}
			
			System.out.println(sBuilder.toString());
		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	
    }
}

```
faces-config.xml:
```
<?xml version="1.0"?>
 <!DOCTYPE faces-config PUBLIC
 "-//Sun Microsystems, Inc.//DTD JavaServer Faces Config 1.0//EN"
 "http://java.sun.com/dtd/web-facesconfig_1_0.dtd">

<faces-config>
	<managed-bean>
		<managed-bean-name>rssReader</managed-bean-name>
		<managed-bean-class>
			com.rss.RssReader
		</managed-bean-class>
		<managed-bean-scope>request</managed-bean-scope>
	</managed-bean>
</faces-config>
```
效果：

![rss](http://7xlbo3.com1.z0.glb.clouddn.com/2013/02/01/rss1.jpg)
