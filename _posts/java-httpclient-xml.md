title: httpclient发送xml字符串（推送）
tags: [httpclient,java]
categories: java
date: 2013-01-05 18:09:17
---
```
package test;

import java.io.IOException; 
import java.rmi.UnexpectedException;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.httpclient.HttpClient; 
import org.apache.commons.httpclient.HttpException; 
import org.apache.commons.httpclient.methods.PostMethod; 
import org.jdom.Document; 
import org.jdom.JDOMException; 
import org.jdom.input.SAXBuilder; 
import org.xml.sax.InputSource;

public class HttpClientDemo { 
    public static void main(String[] args) { 
        String xml = "<?xml version=" 
                + ""1.0"" 
                + " encoding=" 
                + ""UTF-8"" 
                + "?><SDRequest><TransactionName>CreateDataFileComplete</TransactionName><IdentityInfo><Code>" 
                + 1 + "</Code><Description></Description><Timestamp>" 
                + "20100315140542" + "</Timestamp></IdentityInfo></SDRequest>";// 新接的一个项目接口，非要用xml请求，找不到别的post方式，最终选用这种方式，将参数拼成xml字符串

        // File input = new File("test.xml");//如果是xml文件，可以这样写 
        PostMethod post = new PostMethod("http://localhost/site/forXls.do");// 请求地址

        // 设置请求的内容直接从文件中读取 
        // post.setRequestBody( new FileInputStream(input)); 
        // if (input.length() < Integer.MAX_VALUE) 
        // post.setRequestContentLength(input.length()); 
        // else 
        // post.setRequestContentLength(EntityEnclosingMethod.CONTENT_LENGTH_CHUNKED);

        post.setRequestBody(xml);// 这里添加xml字符串

        // 指定请求内容的类型 
        post.setRequestHeader("Content-type", "text/xml; charset=GBK"); 
        HttpClient httpclient = new HttpClient();// 创建 HttpClient 的实例 
        int result; 
        try { 
            result = httpclient.executeMethod(post); 
            System.out.println("Response status code: " + result);// 返回200为成功 
            System.out.println("Response body: "); 
            System.out.println(post.getResponseBodyAsString());// 返回的内容 
            post.releaseConnection();// 释放连接 
        } catch (HttpException e) { 
            // TODO Auto-generated catch block 
            e.printStackTrace(); 
        } catch (IOException e) { 
            // TODO Auto-generated catch block 
            e.printStackTrace(); 
        }

    }

    // 以上就是发送请求的代码，对方接收到数据可以直接解析成xml

    // 读取xml 
    private Document getClientRequestMessage(HttpServletRequest _request) 
            throws UnexpectedException { 
        try { 
            SAXBuilder builder = new SAXBuilder(); 
            InputSource is = new InputSource(); // create an input 
            // source 
            is.setByteStream(_request.getInputStream()); // set the input 
            // stream mandated 
            // to UTF-8 
            is.setEncoding("UTF-8"); // set the mandate 
            // encoding to the input 
            // source 
            Document document = builder.build(is); 
            return document; 
        } catch (IOException e) { 
            e.printStackTrace(); 
            throw new UnexpectedException( 
                    "IOException exception when getInputStream from http request", 
                    e); 
        } catch (JDOMException e) { 
            e.printStackTrace(); 
            throw new UnexpectedException( 
                    "JDOMException when build document form inputstream", e); 
        } catch (NullPointerException e) { 
            e.printStackTrace(); 
            throw new UnexpectedException( 
                    "NullPointerException when build document form inputstream", 
                    e); 
        } catch (ClassCastException e) { 
            e.printStackTrace(); 
            throw new UnexpectedException( 
                    "ClassCastException when build document form inputstream", 
                    e); 
        } 
    } 
}
```
需要jar包：

1. jdom.jar

2. commons-httpclient.jar
