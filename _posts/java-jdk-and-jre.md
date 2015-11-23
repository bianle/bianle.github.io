title: jdk与jre的区别
tags: [java,jdk,jre]
categories: java
date: 2012-07-11 18:09:17
---
很多程序员已经干了一段时间java了依然不明白jdk与jre的区别。 
JDK就是Java Development Kit.简单的说JDK是面向开发人员使用的SDK，它提供了Java的开发环境和运行环境。SDK是Software Development Kit 一般指软件开发包，可以包括函数库、编译程序等。 
JRE是Java Runtime Enviroment是指Java的运行环境，是面向Java程序的使用者，而不是开发者。 
如果安装了JDK，会发同你的电脑有两套JRE，一套位于 \jre 另外一套位于 C:\Program Files\Java\jre1.5.0_15 目录下，后面这套比前面那套少了Server端的Java虚拟机，不过直接将前面那套的Server端Java虚拟机复制过来就行了。而且在安装JDK可以选择是否安装这个位于 C:\Program Files\Java 目录下的JRE。如果你只安装JRE，而不是JDK，那么只会在 C:\Program Files\Java 目录下安装唯一的一套JRE。 
JRE的地位就象一台PC机一样，我们写好的Win32应用程序需要操作系统帮我们运行，同样的，我们编写的Java程序也必须要JRE才能运行。所以当你装完JDK后，如果分别在硬盘上的两个不同地方安装了两套JRE，那么你可以想象你的电脑有两台虚拟的Java PC机，都具有运行Java程序的功能。所以我们可以说，只要你的电脑安装了JRE，就可以正确运行Java应用程序。 
1、为什么Sun要让JDK安装两套相同的JRE？ 
这是因为JDK里面有很多用Java所编写的开发工具（如javac.exe、jar.exe等），而且都放置在 \lib\tools.jar 里。从下面例子可以看出，先将tools.jar改名为tools1.jar，然后运行javac.exe，显示如下结果： Exception in thread "main" java.lang.NoClassDefFoundError: com/sun/tools/javac /Main 这个意思是说，你输入javac.exe与输入 java -cp c:\jdk\lib\tools.jar com.sun.tools.javac.Main 是一样的，会得到相同的结果。从这里我们可以证明javac.exe只是一个包装器（Wrapper），而制作的目的是为了让开发者免于输入太长的指命。而且可以发现\lib目录下的程序都很小，不大于2 9K，从这里我们可以得出一个结论。就是JDK里的工具几乎是用Java所编写，所以也是Java应用程序，因此要使用JDK所附的工具来开发Java程序，也必须要自行附一套JRE才行，所以位于C:\Program Files\Java目录下的那套JRE就是用来运行一般Java程序用的。 
2、如果一台电脑安装两套以上的JRE，谁来决定呢？ 
这个重大任务就落在java.exe身上。Java.exe的工作就是找到合适的JRE来运行Java程序。 Java.exe依照底下的顺序来查找JRE：自己的目录下有没有JRE；父目录有没有JRE；查询注册表： [HKEY_LOCAL_MACHINE\SOFTWARE\JavaSoft\Java Runtime Environment] 所以java.exe的运行结果与你的电脑里面哪个JRE被执行有很大的关系。 
ADD： 
1.JVM — java virtual machineJVM就是我们常说的java虚拟机，它是整个java实现跨平台的最核心的部分，所有的java程序会首先被编译为.class的类文件，这种类文件可以在虚拟机上执行，也就是说class并不直接与机器的操作系统相对应，而是经过虚拟机间接与操作系统交互，由虚拟机将程序解释给本地系统执行。2.JRE — java runtime environmentJRE是指java运行环境。光有JVM还不能成class的执行，因为在解释class的时候JVM需要调用解释所需要的类库lib。在JDK的安装目录里你可以找到jre目录，里面有两个文件夹bin和lib,在这里可以认为bin里的就是jvm，lib中则是jvm工作所需要的类库，而jvm和 lib和起来就称为jre。所以，在你写完java程序编译成.class之后，你可以把这个.class文件和jre一起打包发给朋友，这样你的朋友就可以运行你写程序了。（jre里有运行.class的java.exe）3.JDK — java development kitJDK是java开发工具包，基本上每个学java的人都会先在机器上装一个JDK，那他都包含哪几部分呢？让我们看一下JDK的安装目录。在目录下面有六个文件夹、一个src类库源码压缩包、和其他几个声明文件。其中，真正在运行java时起作用的是以下四个文件夹：bin、include、lib、 jre。现在我们可以看出这样一个关系，JDK包含JRE，而JRE包含JVM。bin:最主要的是编译器(javac.exe)include:java和JVM交互用的头文件lib：类库jre:java运行环境（注意：这里的bin、lib文件夹和jre里的bin、lib是不同的）总的来说JDK是用于java程序的开发,而jre则是只能运行class而没有编译的功能。 
eclipse、idea等其他IDE有自己的编译器而不是用JDK bin目录中自带的，所以在安装时你会发现他们只要求你选中jre路径就ok了。
