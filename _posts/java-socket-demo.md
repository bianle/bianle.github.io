title: java socket小demo
tags: [java,socket]
categories: java
date: 2012-10-16 18:09:17
---
```
import java.net.ServerSocket;
import java.net.Socket;
import java.io.*;
public class TestServer {
	public static void main(String[] args) {
		try{
			ServerSocket ss = new ServerSocket(2222);
			System.out.println("Server已经启动。。。");
			while(true){
				Socket so = ss.accept();//等待客户连接
				new ServerThread(so).start();
			}
		}catch(Exception ee){
			ee.printStackTrace();
		}
	}

}
import java.net.Socket;
import java.io.*;
public class TestClient {
	public static void main(String[] args) {
		try{
			Socket so = new Socket("127.0.0.1",2222);
			DataInputStream dis = new 
			  DataInputStream(so.getInputStream());
			DataOutputStream dos = new 
			  DataOutputStream(so.getOutputStream());
			InputStreamReader isr = new 
			  InputStreamReader(System.in);
			BufferedReader br = new BufferedReader(isr);
			while(true){
			    String str = br.readLine();
			    //1 没有通知服务器
			    dos.writeUTF(str);
			    if("bye".equalsIgnoreCase(str)) break;
			    String s = dis.readUTF();
			    System.out.println(s);
			}
			dis.close();dos.close();
			so.close();
		}catch(Exception ee){
			ee.printStackTrace();
		}
	}

}
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.net.ServerSocket;
import java.net.Socket;

public class ServerThread extends Thread{
	private Socket so;
	public ServerThread(Socket so){
		this.so = so;
	}
	public void run(){
		try{		   
		    DataInputStream dis = new 
		      DataInputStream(so.getInputStream());
		    DataOutputStream dos = new 
		      DataOutputStream(so.getOutputStream());
		    while(true){
		        String s = dis.readUTF();
		        if("bye".equalsIgnoreCase(s)) break;
		        dos.writeUTF("from server:"+s);
		    }
		    dis.close();dos.close();
		    so.close();
		}catch(Exception ee){
			ee.printStackTrace();
		}
	} 
}

```
