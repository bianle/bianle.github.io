title: IE工具栏上添加自己的按钮
tags: [ie]
categories: 系统
date: 2013-01-07 18:09:17
---
# 问题提出
金山词霸、网络蚂蚁等软件安装后会向IE的工具条添加自己的按钮。按下按钮后还会作出相应的动作，这种功能是如何实现的呢？读完本文，您也可以将自己应用程序的按钮添加到IE的工具条中。
# 基本原理
从IE5开始便允许我们向工具栏添加自己的按钮，其本质就是修改注册表，添加创建此按钮所需的信息。 
# 实现步骤 
1. 创建此按钮的GUID(globally unique identifier) 
你可以通过`Visual Studio`中的`Guidgen.exe`来产生GUID。 
例如我生成的GUID是`{1FBA04EE-3024-11D2-8F1F-0000F87ABD16} `
以下的例子中我都使用这个GUID来作说明。 
2. 创建子键HKEY_LOCAL_MACHINE\Software\Microsoft\Internet Explorer\Extensions\{1FBA04EE-3024-11D2-8F1F-0000F87ABD16} 
3. 在此子键下创建如下字串值。 
（1）CLSID 
这是IE的CLSID，其值必须为{1FBA04EE-3024-11D2-8F1F-0000F87ABD16} 
（2）Default Visible 
指明此按钮默认状态下是否可见，Yes表示可见,No为不可见 
（3）ButtonText 
按钮文字 
（4）Icon 
默认状态下的图标全路径，例如c:\vckbase.ico。也可以是EXE文件中包含的图标，例如：C:\PROGRA~1\NETANTS\NetAnts.exe,1000 
（5）HotIcon 
鼠标移到按钮上时的图标全路径 
如下子键为按下按钮后需要执行的相应动作：可以是COM对象、浏览条Explorer Bar、脚本Script、可执行文件。 
下面我们逐个进行介绍。 
①COM对象 
你需要建立名为ClsidExtension的字串值，其值应该为此COM对象的GUID 
例如金山词霸就使用ClsidExtension来调用自己的COM对象。 
②浏览条Explorer Bar 
所谓浏览条就是类似我们按下往IE历史按钮后打开的历史记录列表，其本质好比MFC中的CReBar对象。 浏览条也可以自己制作， 
因为超出了本文的范围，暂不作讲解。 
为了在按下按钮后打开一个浏览条，你需要建立名为BandCLSID的字串值，其值为浏览条的CLSID 
③脚本Script 
按下按钮后执行的脚本，例如："%SystemRoot%\web\related.htm" 
你可以在这个HTML文件里面加上脚本来得到IE当前的许多信息，需要注意的是假如你想通过Script打开非脚本的HTML文件是不可行的。 
请参考如下NetAnts取得当前页所有链接的脚本代码 
<script language="VBScript"> 
－－On Error Resume Next 
－－set NetAntsApi = CreateObject( "NetAnts.API" ) 
－－if err<>0 then 
－－ －－Alert("NetAnts not properly installed on this PC!") 
－－else 
－－ －－set links = external.menuArguments.document.links 
－－ －－ReDim params(links.length*2) 
－－ －－params(0)=external.menuArguments.document.Url 
－－ －－for i = 0 to links.length-1 
－－ －－ －－params(i*2+1)=links(i).href 
－－ －－ －－params(i*2+2)=links(i).innerText 
－－ －－next 
－－ －－NetAntsApi.AddUrlList params 
－－end if 
< /script> 
我们再看一个比较有用的脚本,这段脚本的作用是得到当前地址，并打开此网址的首页。 
<script> 
－－//userURL得到的是当前地址,例如是http://www.vckbase.com/article/controls/index.html 
－－userURL=external.menuArguments.location.href; 
－－protocolIndex=userURL.indexOf("://",4); 
－－serverIndex=userURL.indexOf("/",protocolIndex + 3); 
－－finalURL=userURL.substring(0,serverIndex); 
－－external.menuArguments.open(finalURL, "_blank");///打开网址http://www.vckbase.com/ 
< /script> 
关于external等对象的具体使用方法请参阅微软的《动态HTML开发参考大全》–人民邮电出版社出版 
④可执行文件 
假如我们想让IE在按下按钮后执行一个可执行文件, 你可以增加名为Exec的字串值，其值为此可执行文件的全路径， 
例如c:\windows\notepad.exe或者是一个网址http://www.vckbase.com/index.html 
下面我们介绍一个简单的例子。 
void CIEButtonDlg::OnAdd() 
{ 
－－///这是由GUIDGEN产生的GUID：{06926B30-424E-4f1c-8EE3-543CD96573DC} 
－－CRegKey reg; 
－－char KeyName[]="Software\\Microsoft\\Internet Explorer\\Extensions\\{06926B30-424E-4f1c-8EE3-543CD96573DC}"; 
－－TCHAR PathName[MAX_PATH]; 
－－TCHAR IconPathName[MAX_PATH]; ///正常时的图标全路径 
－－TCHAR HotIconPathName[MAX_PATH]; ///鼠标覆盖时的图标全路径 
－－GetModuleFileName(0,PathName,MAX_PATH); ///得到本可执行文件的路径 
－－strcpy(IconPathName,PathName); 
－－strcpy(HotIconPathName,PathName); 
－－strcat(HotIconPathName,",131"); ///131是图标的ID，你可以以资源方式打开EXE文件就可以看到所有资源及其ID 
－－strcat(IconPathName,",129"); 
－－reg.Create(HKEY_LOCAL_MACHINE,KeyName); 
－－reg.SetValue("{1FBA04EE-3024-11D2-8F1F-0000F87ABD16}","CLSID"); 
－－reg.SetValue("Yes","Default Visible"); 
－－reg.SetValue("VC知识库","ButtonText"); 
－－reg.SetValue(IconPathName,"Icon"); 
－－reg.SetValue(HotIconPathName,"HotIcon"); 
－－/////假如是执行脚本，可以是reg.SetValue("c:\\test.html","Script"); ///在test.html 存放你的脚本代码
－－reg.SetValue("http://www.vckbase.com/","Exec");///打开网页 
}
