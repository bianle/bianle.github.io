title: jdbc连接demo
tags: [java,jdbc]
categories: web前端
date: 2012-07-04 18:09:17
---

jdbc连接参数

>oracle 
driver="oracle.jdbc.driver.OracleDriver" 
url="jdbc:oracle:thin:@localhost:1521:数据库名" 
sqlserver 
driver="com.microsoft.jdbc.sqlserver.SQLServerDriver" 
url="jdbc:microsoft:sqlserver://localhost:1433;DatabaseName=数据库名" 
mysql 
driver="com.mysql.jdbc.Driver" 
url="jdbc:mysql://localhost/数据库名?[后接参数]" 
db2 
driver="com.ibm.db2.jdbc.app.DB2Driver" 
url="jdbc:db2://localhost:5000/数据库名" 
sybase 
driver="com.sybase.jdbc.SybDriver" 
url="jdbc:sybase:Tds:localhost:5007/数据库名"


```
package test;

import java.sql.*;

public class JdbcDemo {
	/**
	 * 加载驱动
	 * */
	static {
		try {
			Class.forName("com.mysql.jdbc.Driver");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 获取数据库连接
	 * */
	public static Connection getConnection() {
		String url = "jdbc:mysql:172.0.0.1:3306/test";
		String username = "root";
		String password = "1234";
		Connection con = null;
		try {
			con = DriverManager.getConnection(url, username, password);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return con;
	}

	/**
	 * 获取statement对象，操作数据库，处理返回结果
	 * */
	public static void process() {
		Connection con = getConnection();
		PreparedStatement ps = null;
		ResultSet rs = null;
		String sql = "";
		try {
			ps = con.prepareStatement(sql);
			if (ps.execute()) {
				rs = ps.getResultSet();
			} else {
				int i = ps.getUpdateCount();
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			close(rs, ps, con);
		}
	}

	/**
	 * 处理返回结果集
	 * */
	public static void printResultSet(ResultSet rs) {
		if (rs == null) {
			return;
		}
		try {
			ResultSetMetaData meta = rs.getMetaData();
			int cols = meta.getColumnCount();
			StringBuffer b = new StringBuffer();
			while (rs.next()) {
				for (int i = 1; i <= cols; i++) {
					b.append(meta.getColumnName(i) + "=");
					b.append(rs.getString(i) + "/t");
				}
				b.append("/n");
			}
			System.out.print(b.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 关闭连接
	 * */
	public static void close(ResultSet rs, Statement stm, Connection con) {
		try {
			if (rs != null) {
				rs.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		try {
			if (stm != null) {
				rs.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		try {
			if (con != null) {
				rs.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
```
