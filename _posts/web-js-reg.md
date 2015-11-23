title: js正则
tags: [js,正则]
categories: web前端
date: 2013-01-10 18:09:17
---

# 正则表达式符号说明
```
“+”元字符规定其前导字符必须在目标对象中连续出现一次或多次。=={1,} 
“*”元字符规定其前导字符必须在目标对象中出现零次或连续多次。=={0,} 
“?”元字符规定其前导对象必须在目标对象中连续出现零次或一次。=={0,1} 
 
n,m为非负整数,n<m 
{n} 确定匹配n次 如p{2} pp才匹配 
{n,} 至少匹配n次 如p{2,} pp,ppp,pppp都匹配,p不匹配 
{n,m} 匹配>=n,<=m次, 如p{2,4} pp,ppp,pppp都匹配, p,ppppp都不匹配 
 
 
s：用于匹配单个空格符，包括tab键和换行符； 
S：用于匹配除单个空格符之外的所有字符； 
d：用于匹配从0到9的数字； 
w：用于匹配字母，数字或下划线字符； 
W：用于匹配所有与w不匹配的字符； 
. ：用于匹配除换行符之外的所有字符。 
 
 
“^”定位符规定匹配模式必须出现在目标字符串的开头 
/^hell/ 匹配“hell”, “hello”或“hellhound”开头的字符串 
 
“$”定位符规定匹配模式必须出现在目标对象的结尾 
/ar$/　匹配“car”, “bar”或 “ar” 结尾的字符串 
 
“b”定位符规定匹配模式必须出现在目标字符串的开头或结尾的两个边界之一(代表着单词的开头或结尾) 
/bbom/　以“b”定位符开头，匹配以 “bomb”, 或 “bom”开头的字符串。 
/manb/　以“b”定位符结尾，匹配以 “human”, “woman”或 “man”结尾的字符串相 
 
“B”匹配不是单词开头或结束的位置 
 
()符号包含的内容必须同时出现在目标对象中。 
如:/([a-z][A-Z][0-9])+/  abc不匹配 aA9才匹配 
 
|符号表示:或 
如:/to|too|2/ 与目标对象中的 “to”, “too”, 或 “2” 相匹配 
 
[^]符号表示:否定符号(必须放在[]中) 
如:/[^A-C]/　上述字符串将会与目标对象中除A，B，和C之外的任何字符相匹配 
 
符号表示:转义符号
```
# 正则表达式应用模式参数
```
语法 1 re = /pattern/[flags] 
语法 2 re = new RegExp("pattern",["flags"]) 
 
g （全文查找出现的所有 pattern） 
i （忽略大小写） 
m （多行查找） 
 
语法1:var pattern = /Java/g; (用 "/" 字符分隔模式) 
语法2:var re = new RegExp("ain","g"); (用引号将模式引起来)
```
# 一次匹配多少个符合条件的子元素(匹配最大量和最小量)
```
Greedy: 在能匹配的前提下，取量词的最大值。 
Reluctant: 在匹配的前提下，取量词的最小值。 
Possessive: 取量词的最大值，无论匹配与否。 
如： 
Pattern.compile("^.*B").matcher("AABAABAA") : "AABAAB" 
Pattern.compile("^.*?B").matcher("AABAABAA") : "AAB" 
Pattern.compile("^.*+B").matcher("AABAABAA") : null 
```
# 处理多个匹配
```
//第一种

var text = "maybe JavaSript is more fun than Java!";

var pattern = new RegExp("Java","g");//一定要有g不然会死循环

//初始化result数组

var result = null;

//多次使用RegExp对象pattern2指定的正则表达式匹配不表字符串text,如果返回null,则不再循环下去

while((result = pattern.exec(text)) != null){

   alert("返回结果为: "+result);

   //显示本次匹配的子串的开始位置和下一次匹配开始的位置(result[0]为匹配的字符串)

   alert("Matched '"+ result[0] +"'"+"at Position "+result.index+"; next Search begins at "+ pattern2.lastIndex);

}
```
# replace使用正则
```
//实例化RegExp对象pattern2， 使用g选项匹配所有符合正则表达式的子串

var pattern2 = new RegExp("Java", "g");

//对目标子串调用replace调用replace方法用另一个字符串替换匹配给定的正则表达式的子串

result = text.replace(pattern2, "VB");

//显示替换后的字符串

alert("替换后的新串为： "+result);

 
 
//使用方法处理找到匹配的字符串

function test($1){

   var gyear=(new Date()).getYear()-parseInt($1)+1;

   return $1+"("+gyear+"年出生)";

}

var reg=new RegExp("(d+)岁","g");

var newstr=str.replace(reg,test);//使用方法作为要替代的字符串

alert(str);

alert(newstr);
```
# split使用正则
```
var text = "maybe JavaSript is more fun than Java!";

var pattern2 = new RegExp("Java", "g");

//对目标字符串调用split方法

result = text.split(pattern2);

//遍历结果集

for(var i=0; i<result.length; i++){

   //显示拆分后的每一个子串

   alert("拆分后的每一个子串: "+"' "+result+" '");

}

```

# 找到首次匹配的子串的开始位置
```
var text = "maybe JavaSript is more fun than Java!";

var pattern2 = new RegExp("Java", "g");

result = text.search(pattern);

//显示首次匹配子串的开始位置

alert("匹配子串的开始位置: "+result);
```
# exec方法详解
```
exec方法返回的其实并不是匹配结果字符串，而是一个对象 
 
它的属性: index input 0。其中index是表示匹配在原字符串中的索引；而input则是表示输入的字符串； 
 
至于0则是表示只有一个匹配结果，可以用下标0来引用这个匹配结果，这个数量可能改变。我们可以通过返回值的length属性来得知匹配结果的总数量。 
```

```
function  execReg(reg,str){

var result =  reg.exec(str);

document.write('index:'+result.index+'<br  />'+'input:'+result.input+'<br  />');

for(i=0;i<result.length;i++){

document.write('result['+i+']:'+result[i]+'<br  />')

}

}

var reg = /w/;

var  str='bbs.bblueidea.com';

execReg(reg,str);
```
结果如下：
>index:0 input:bbs.bblueidea.com result[0]:b

输入字符串为bbs.bblueidea.com； 匹配的b在原字符串的索引是0。 正则的匹配结果为一个，b；

```
var reg =  /(w)(w)(.+)/;

var  str='bbs.bblueidea.com';

execReg(reg,str);
```

结果为：

> index:0 input:bbs.bblueidea.com result[0]:bbs.bblueidea.com result[1]:b result[2]:b result[3]:s.bblueidea.com

由上面两个例子可见，返回对象[0]就是整个正则表达式所匹配的内容。后续的元素则是各个子正则表达式的匹配内容。 //g修饰的区别 exec方法在返回结果对象的同时，还可能会更新原来的正则表达式，这就要看正则表达式是否设置了g修饰符。先来看两个例子吧：
```
var reg = /b/;

var str =  'bbs.blueidea.com';

execReg(reg,str);

execReg(reg,str);
```
结果如下：
>index:0 input:bbs.blueidea.com result[0]:b index:0 input:bbs.blueidea.com result[0]:b 
也就是说，两次匹配的结果完全一样，从索引可以看出来，匹配的都是字符串首的b字符。 下面看看设置了g的正则表达式表现如何：
```
var reg = /b/g;

var str =  'bbs.blueidea.com';

execReg(reg,str);

execReg(reg,str);
```
结果如下：
>index:0 input:bbs.blueidea.com result[0]:b index:1 input:bbs.blueidea.com result[0]:b
可以看得出来，第二次匹配的是字符串的字符串的第二个b。这也就是g修饰符的作用了，下面来看exec是如何区别对待g和非g正则表达式的。  如果正则表达式没有设置g，那么exec方法不会对正则表达式有任何的影响，如果设置了g，那么exec执行之后会更新正则表达式的lastIndex属性，表示本次匹配后，所匹配字符串的下一个字符的索引，下一次再用这个正则表达式匹配字符串的时候就会从上次的lastIndex属性开始匹配，也就是上面两个例子结果不同的原因了。


# test方法
test方法仅仅检查是否能够匹配str，并且返回布尔值以表示是否成功

# match方法

与正则表达式的exec方法类似，该方法同样返回一个类似数组的对象，也有input和index属性。我们定义如下一个函数用来测试：
```
function  matchReg(reg,str){

 var result =  str.match(reg);

if(result ){

document.write('index:'+result.index+'<br  />'

+'input:'+result.input+'<br  />'

);

for(i=0;i<result.length;i++){

document.write('result['+i+']:'+result[i]+'<br  />')

}

}else{

alert('null：匹配失败！')

}

}

var reg = /b/;

var str =  'bbs.blueidea.com';

matchReg(reg,str);
```
结果如下：
>index:0 input:bbs.blueidea.com result[0]:b
可见，和exec的结果一样。 但是如果正则表达式设置了g修饰符，exec和match的行为可就不一样了，见下例： index:undefined input:undefined result[0]:b result[1]:b result[2]:b 设置了g修饰符的正则表达式在完成一次成功匹配后不会停止，而是继续找到所有可以匹配到的字符。返回的结果包括了三个b。不过没有提供input和index这些信息。
