title: Here is a tutorial on how to whip up a simple web server in Java? with working runnable code; sourcecode and bytecode files.
tags: [java,web server]
categories: java
date: 2013-01-05 18:09:17

---
This is the window that comes up when you run the program, just a little motivator so you can see what¡¯s in the end of the tunnel.

Note to get the maximum out of this tutorial it is recommended that you have a basic grasp on how HTTP works. If the little man inside your head says what tha H is HTTP, you should go to the bottom and check some of the pointers. There you will find some nice text to explain the basic concept.

Let¡¯s get started! 
When making a program nowadays the first thing you should think about is the GUI (graphical user interface). If the program dosen¡¯t look fancy, you can just press all the cancel buttons on the project. Ok that was meant as a joke, but there is some truth in it. People tend to judge a program a lot on its look, even though the real coding job is in making the stuff that goes on behind the scenes.

The good news is that we are making this in Java, and since Java is such a friendly programming language it¡¯s real easy to get some interface going. Comments are in green.

//file: webserver_starter.java 
//declare a class wich inherit JFrame 
public classwebserver_starter 
extendsJFrame { 
//declare some panel, scrollpanel, textarea for gui 
JPanel jPanel1 = newJPanel(); 
JScrollPane jScrollPane1 = newJScrollPane(); 
JTextArea jTextArea2 = newJTextArea(); 
staticInteger listen_port = null; 
//basic class constructor 
publicwebserver_starter() { 
try{ 
jbInit(); 
} 
catch(Exception e) { 
e.printStackTrace(); 
} 
} 
//the JavaAPI entry point 
//where it starts this class if run 
public staticvoidmain(String[] args) { 
//start server on port x, default 80 
//use argument to main for what port to start on 
try{ 
listen_port = newInteger(args[0]); 
//catch parse error 
} 
catch(Exception e) { 
listen_port = newInteger(80); 
} 
//create an instance of this class 
webserver_starter webserver = newwebserver_starter(); 
} 
//set up the user interface 
privatevoidjbInit() throwsException { 
//oh the pretty colors 
jTextArea2.setBackground(newColor(16, 12, 66)); 
jTextArea2.setForeground(newColor(151, 138, 255)); 
jTextArea2.setBorder(BorderFactory.createLoweredBevelBorder()); 
jTextArea2.setToolTipText(""); 
jTextArea2.setEditable(false); 
jTextArea2.setColumns(30); 
jTextArea2.setRows(15); 
//change this to impress your friends 
this.setTitle("Jon¡¯s fancy prancy webserver"); 
//ugly inline listener, it¡¯s for handling closing of the window 
this.addWindowListener(newjava.awt.event.WindowAdapter() { 
publicvoidwindowClosing(WindowEvent e) { 
this_windowClosed(e); 
} 
}); 
//add the various to the proper containers 
jScrollPane1.getViewport().add(jTextArea2); 
jPanel1.add(jScrollPane1); 
this.getContentPane().add(jPanel1, BorderLayout.EAST); 
//tveak the apearance 
this.setVisible(true); 
this.setSize(420, 350); 
this.setResizable(false); 
//make sure it is drawn 
this.validate(); 
//create the actual serverstuff, 
//all that is implemented in another class 
newserver(listen_port.intValue(), this); 
} 
//exit program when "X" is pressed. 
voidthis_windowClosed(WindowEvent e) { 
System.exit(1); 
} 
//this is a method to get messages from the actual 
//server to the window 
publicvoidsend_message_to_window(String s) { 
jTextArea2.append(s); 
} 
} //class end

In a nutshell this code sets up the window and makes everything look good. If you look at the picture of the program on top of this page. This code makes that!

Ok, enough time wasted on the look. Lets get down with the fun stuff, making the actual httpserver.

//file: server.java 
//the real (http) serverclass 
//it extends thread so the server is run in a different 
//thread than the gui, that is to make it responsive. 
//it¡¯s really just a macho coding thing. 
public classserver 
extendsThread { 
//the constructor method 
//the parameters it takes is what port to bind to, the default tcp port 
//for a httpserver is port 80. the other parameter is a reference to 
//the gui, this is to pass messages to our nice interface 
publicserver(intlisten_port, webserver_starter to_send_message_to) { 
message_to = to_send_message_to; 
port = listen_port; 
//this makes a new thread, as mentioned before,it¡¯s to keep gui in 
//one thread, server in another. You may argue that this is totally 
//unnecessary, but we are gonna have this on the web so it needs to 
//be a bit macho! Another thing is that real pro webservers handles 
//each request in a new thread. This server dosen¡¯t, it handles each 
//request one after another in the same thread. This can be a good 
//assignment!! To redo this code so that each request to the server 
//is handled in its own thread. The way it is now it blocks while 
//one client access the server, ex if it transferres a big file the 
//client have to wait real long before it gets any response. 
this.start(); 
} 
privatevoids(String s2) { //an alias to avoid typing so much! 
message_to.send_message_to_window(s2); 
} 
privatewebserver_starter message_to; //the starter class, needed for gui 
privateintport; //port we are going to listen to 
//this is a overridden method from the Thread class we extended from 
publicvoidrun() { 
//we are now inside our own thread separated from the gui. 
ServerSocket serversocket = null; 
//To easily pick up lots of girls, change this to your name!!! 
s("The simple httpserver v. 0000000000nCoded by Jon Berg" + 
"<jon.berg[on server]turtlemeat.com>nn"); 
//Pay attention, this is where things starts to cook! 
try{ 
//print/send message to the guiwindow 
s("Trying to bind to localhost on port " + Integer.toString(port) + "¡­"); 
//make a ServerSocket and bind it to given port, 
serversocket = newServerSocket(port); 
} 
catch(Exception e) { //catch any errors and print errors to gui 
s("nFatal Error:" + e.getMessage()); 
return; 
} 
s("OK!n"); 
//go in a infinite loop, wait for connections, process request, send response 
while(true) { 
s("nReady, Waiting for requests¡­n"); 
try{ 
//this call waits/blocks until someone connects to the port we 
//are listening to 
Socket connectionsocket = serversocket.accept(); 
//figure out what ipaddress the client commes from, just for show! 
InetAddress client = connectionsocket.getInetAddress(); 
//and print it to gui 
s(client.getHostName() + " connected to server.n"); 
//Read the http request from the client from the socket interface 
//into a buffer. 
BufferedReader input = 
newBufferedReader(newInputStreamReader(connectionsocket. 
getInputStream())); 
//Prepare a outputstream from us to the client, 
//this will be used sending back our response 
//(header + requested file) to the client. 
DataOutputStream output = 
newDataOutputStream(connectionsocket.getOutputStream()); 
//as the name suggest this method handles the http request, see further down. 
//abstraction rules 
http_handler(input, output); 
} 
catch(Exception e) { //catch any errors, and print them 
s("nError:" + e.getMessage()); 
} 
} //go back in loop, wait for next request 
} 
//our implementation of the hypertext transfer protocol 
//its very basic and stripped down 
privatevoidhttp_handler(BufferedReader input, DataOutputStream output) { 
intmethod = 0; //1 get, 2 head, 0 not supported 
String http = newString(); //a bunch of strings to hold 
String path = newString(); //the various things, what http v, what path, 
String file = newString(); //what file 
String user_agent = newString(); //what user_agent 
try{ 
//This is the two types of request we can handle 
//GET /index.html HTTP/1.0 
//HEAD /index.html HTTP/1.0 
String tmp = input.readLine(); //read from the stream 
String tmp2 = newString(tmp); 
tmp.toUpperCase(); //convert it to uppercase 
if(tmp.startsWith("GET")) { //compare it is it GET 
method = 1; 
} //if we set it to method 1 
if(tmp.startsWith("HEAD")) { //same here is it HEAD 
method = 2; 
} //set method to 2 
if(method == 0) { // not supported 
try{ 
output.writeBytes(construct_http_header(501, 0)); 
output.close(); 
return; 
} 
catch(Exception e3) { //if some error happened catch it 
s("error:" + e3.getMessage()); 
} //and display error 
} 
//} 
//tmp contains "GET /index.html HTTP/1.0 ¡­¡­." 
//find first space 
//find next space 
//copy whats between minus slash, then you get "index.html" 
//it¡¯s a bit of dirty code, but bear with me¡­ 
intstart = 0; 
intend = 0; 
for(inta = 0; a < tmp2.length(); a++) { 
if(tmp2.charAt(a) == ¡® ¡® && start != 0) { 
end = a; 
break; 
} 
if(tmp2.charAt(a) == ¡® ¡® && start == 0) { 
start = a; 
} 
} 
path = tmp2.substring(start + 2, end); //fill in the path 
} 
catch(Exception e) { 
s("errorr" + e.getMessage()); 
} //catch any exception 
//path do now have the filename to what to the file it wants to open 
s("nClient requested:" + newFile(path).getAbsolutePath() + "n"); 
FileInputStream requestedfile = null; 
try{ 
//NOTE that there are several security consideration when passing 
//the untrusted string "path" to FileInputStream. 
//You can access all files the current user has read access to!!! 
//current user is the user running the javaprogram. 
//you can do this by passing "../" in the url or specify absoulute path 
//or change drive (win) 
//try to open the file, 
requestedfile = newFileInputStream(path); 
} 
catch(Exception e) { 
try{ 
//if you could not open the file send a 404 
output.writeBytes(construct_http_header(404, 0)); 
//close the stream 
output.close(); 
} 
catch(Exception e2) {} 
; 
s("error" + e.getMessage()); 
} //print error to gui 
//happy day scenario 
try{ 
inttype_is = 0; 
//find out what the filename ends with, 
//so you can construct a the right content type 
if(path.endsWith(".zip" 
) { 
type_is = 3; 
} 
if(path.endsWith(".jpg") || path.endsWith(".jpeg")) { 
type_is = 1; 
} 
if(path.endsWith(".gif")) { 
type_is = 2; 
//write out the header, 200 ->everything is ok we are all happy. 
} 
output.writeBytes(construct_http_header(200, 5)); 
//if it was a HEAD request, we don¡¯t print any BODY 
if(method == 1) { //1 is GET 2 is head and skips the body 
while(true) { 
//read the file from filestream, and print out through the 
//client-outputstream on a byte per byte base. 
intb = requestedfile.read(); 
if(b == -1) { 
break; //end of file 
} 
output.write(b); 
} 
} 
//clean up the files, close open handles 
output.close(); 
requestedfile.close(); 
} 
catch(Exception e) {} 
} 
//this method makes the HTTP header for the response 
//the headers job is to tell the browser the result of the request 
//among if it was successful or not. 
privateString construct_http_header(intreturn_code, intfile_type) { 
String s = "HTTP/1.0 "; 
//you probably have seen these if you have been surfing the web a while 
switch(return_code) { 
case200: 
s = s + "200 OK"; 
break; 
case400: 
s = s + "400 Bad Request"; 
break; 
case403: 
s = s + "403 Forbidden"; 
break; 
case404: 
s = s + "404 Not Found"; 
break; 
case500: 
s = s + "500 Internal Server Error"; 
break; 
case501: 
s = s + "501 Not Implemented"; 
break; 
} 
s = s + "rn"; //other header fields, 
s = s + "Connection: closern"; //we can¡¯t handle persistent connections 
s = s + "Server: SimpleHTTPtutorial v0rn"; //server name 
//Construct the right Content-Type for the header. 
//This is so the browser knows what to do with the 
//file, you may know the browser dosen¡¯t look on the file 
//extension, it is the servers job to let the browser know 
//what kind of file is being transmitted. You may have experienced 
//if the server is miss configured it may result in 
//pictures displayed as text! 
switch(file_type) { 
//plenty of types for you to fill in 
case0: 
break; 
case1: 
s = s + "Content-Type: image/jpegrn"; 
break; 
case2: 
s = s + "Content-Type: image/gifrn"; 
case3: 
s = s + "Content-Type: application/x-zip-compressedrn"; 
default: 
s = s + "Content-Type: text/htmlrn"; 
break; 
} 
////so on and so on¡­¡­ 
s = s + "rn"; //this marks the end of the httpheader 
//and the start of the body 
//ok return our newly created header! 
returns; 
} 
} //class phhew caffeine yes please!

BEWARE! When you run the web server you are potentially opening for all your files to be red by the entire Internet! The httpserver is only ment to be used for testing. If you absoulutely want to run this httpserver for longer periods of time; consider creating a new user with only read access to the files you want to share and running it only with this user!

Download the tutorial files! this zipfile contains both sourcecode and compiled javabytecode files. So you can test the program without having the javacompiler. It also contains a sample index.html and a jpg file.

How to run the program? Get into commandline, cd to the dir where you extracted the files (webserver_starter.class and the other files). Then type: java webserver_starter

Then the window you see on top of this page should pop up. To test if this httpserver is really functioning, you open your browser, and in the location line you type: http://localhost/index.html ,this will bring up a sample html file that is in the zipfile.

If you want to test the httpserver from another machine on the Internet, then you need to know the ip-address or hostname the httpserver is running on, then you type that in the location line in the browser, like http://123.123.123.123/index.html .Note, it may not work if you are behind a firewall or a NAT router, but that¡¯s not the programs¡¯ fault!

Update: Oct 2011. This code is not actively updated, but I changed a few things mainly due to many people are referencing this. The switch (file_type) was missing breaks. requestedfile.read() and output.write() now reads and writes a byte array which speeds things up. And added favicon support since somebody asked about it.

How to compile: Open command line. cd to directory where you unpacked it. javac *.java 
How to run: Open command line. cd to directory where you unpacked it. java -cp . webserver_starter

Pointers to related stuff on the hypertext transfer protocol (http) and web servers:

HowStuffWorks This is a very basic introduction for the novice on how web servers works. Has also other text about Internet and Routers, in easy to understandable language. Nice if you are starting out learning.

HTTP Made Really Easy Here is some nice text that goes through the main points in HTTP. A little more technical. It¡¯s recommended that you know these things to understand the above tutorial. 
Apache the best and most widely used web server on the Internet today, check it out. If you want to run your own web server this is the one to get, you can get binaries for both Windows and Unix. You can download the entire sourcecode if you want to check how it was made.

Mozilla / Netscape is a nice web browser. Get rid of the Explorer, there are some rumors that Internet Explorer secretly collects all the pages you are visiting and sends it to microsoft.com.

RFC-1945 RFC describing Hypertext Transfer Protocol ¡ª HTTP/1.0

RFC-2616 RFC describing Hypertext Transfer Protocol ¡ª HTTP/1.1

RFC webpage The Request For Comment webpage, RFC are technical documents describing all sorts of protocols on the Internet.

Java2 Runtime / SDK Download site for the Java Runtime (needed for running Java programs) and Java Software Development Kit (needed for making Java programs).
