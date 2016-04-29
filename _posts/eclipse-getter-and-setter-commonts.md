title: eclipse自动生成getter和setter的注释
date: 2016-03-11 11:48:25
tags: eclipse
categories: eclipse
---

- 下载修改后的class文件[get set方法生成注释和字段注释](http://pan.baidu.com/s/1pKnn5Xp)

- eclipse安装目录进入plugins文件夹搜索`org.eclipse.jdt.ui_*.jar`

- 替换对应class文件

- Window->Preferences->Java->CodeStyle->Code Templates->Comments->Getters/Setters 

Getters:

```
/**  
 * 获取${bare_field_name}  
 * @return ${bare_field_name} ${bare_field_name}  
 */  
```

Setters:

```
/**  
 * 设置${bare_field_name}  
 * @param ${bare_field_name} ${bare_field_name}  
 */ 
```

[http://yaku2688.iteye.com/blog/1164640](http://yaku2688.iteye.com/blog/1164640)
