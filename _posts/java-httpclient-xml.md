title: httpclient����xml�ַ��������ͣ�
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
                + "20100315140542" + "</Timestamp></IdentityInfo></SDRequest>";// �½ӵ�һ����Ŀ�ӿڣ���Ҫ��xml�����Ҳ������post��ʽ������ѡ�����ַ�ʽ��������ƴ��xml�ַ���

        // File input = new File("test.xml");//�����xml�ļ�����������д 
        PostMethod post = new PostMethod("http://localhost/site/forXls.do");// �����ַ

        // �������������ֱ�Ӵ��ļ��ж�ȡ 
        // post.setRequestBody( new FileInputStream(input)); 
        // if (input.length() < Integer.MAX_VALUE) 
        // post.setRequestContentLength(input.length()); 
        // else 
        // post.setRequestContentLength(EntityEnclosingMethod.CONTENT_LENGTH_CHUNKED);

        post.setRequestBody(xml);// �������xml�ַ���

        // ָ���������ݵ����� 
        post.setRequestHeader("Content-type", "text/xml; charset=GBK"); 
        HttpClient httpclient = new HttpClient();// ���� HttpClient ��ʵ�� 
        int result; 
        try { 
            result = httpclient.executeMethod(post); 
            System.out.println("Response status code: " + result);// ����200Ϊ�ɹ� 
            System.out.println("Response body: "); 
            System.out.println(post.getResponseBodyAsString());// ���ص����� 
            post.releaseConnection();// �ͷ����� 
        } catch (HttpException e) { 
            // TODO Auto-generated catch block 
            e.printStackTrace(); 
        } catch (IOException e) { 
            // TODO Auto-generated catch block 
            e.printStackTrace(); 
        }

    }

    // ���Ͼ��Ƿ�������Ĵ��룬�Է����յ����ݿ���ֱ�ӽ�����xml

    // ��ȡxml 
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
��Ҫjar����

1. jdom.jar

2. commons-httpclient.jar
