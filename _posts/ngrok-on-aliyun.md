title: 阿里云上搭建ngrok服务器
date: 2015-12-28 12:30:41
tags: ngrok
categories: ngrok
---

## 环境
阿里云+centos7(x64)

## 安装vpn客户端pptp

go安装地址被墙(为啥?问方校长)!需要安装vpn客户端翻墙下载,[centos安装vpn客户端pptp](http://blog.le.im/2015/12/28/centos-vpn/)
或者用我已经下载好的[go1.4.1.linux-amd64.tar.gz](http://pan.baidu.com/s/1c2uglmK)

## 安装golang

### ~~yum安装~~

~~刚开始yum安装,后来在交叉编译window客户端时失败后改为源码安装)~~

```
yum install golang
```

### 源码安装

```
wget https://storage.googleapis.com/golang/go1.4.1.linux-amd64.tar.gz
tar -C /usr/local -xzf go1.4.1.linux-amd64.tar.gz
mkdir $HOME/go
echo 'export GOROOT=/usr/local/go' >> ~/.bashrc 
echo 'export GOPATH=$HOME/go' >> ~/.bashrc 
echo 'export PATH=$PATH:$GOROOT/bin:$GOPATH/bin' >> ~/.bashrc 
source $HOME/.bashrc 
```
[参考:Windows/Centos安装GO语言环境](http://www.haiyun.me/archives/1009.html)

## 安装

### 下载ngrok源码并设置环境变量
```
cd /usr/local/src/
git clone https://github.com/inconshreveable/ngrok.git
export GOPATH=/usr/local/src/ngrok/
export NGROK_DOMAIN="tunnel.ink"
```

### 生成自签名SSL证书

```
cd /usr/local/src/ngrok
openssl genrsa -out rootCA.key 2048
openssl req -x509 -new -nodes -key rootCA.key -subj "/CN=tunnel.ink" -days 5000 -out rootCA.pem
openssl genrsa -out device.key 2048
openssl req -new -key device.key -subj "/CN=tunnel.ink" -out device.csr
openssl x509 -req -in device.csr -CA rootCA.pem -CAkey rootCA.key -CAcreateserial -out device.crt -days 5000
```
ngrok通过bindata将ngrok源码目录下的assets目录（资源文件）打包到可执行文件(ngrokd和ngrok)中 去，assets/client/tls和assets/server/tls下分别存放着用于ngrok和ngrokd的默认证书文件，我们需要将它们替换成我们自己生成的,***因此这一步务必放在编译可执行文件之前***
```
cp rootCA.pem assets/client/tls/ngrokroot.crt
cp device.crt assets/server/tls/snakeoil.crt 
cp device.key assets/server/tls/snakeoil.key

```

### 编译客户端和服务端

```
GOOS=linux GOARCH=amd64
make clean
make release-server release-client
```

### 启动服务端
```
bin/ngrokd -domain="tunnel.ink" -httpAddr=":80" 
```
可以在后台启动
```
nohup bin/ngrokd -domain="tunnel.ink" -httpAddr=":80"   > /dev/null 2>&1 &
```


### 编译windows客户端

```
cd /usr/local/go/src/
GOOS=windows GOARCH=amd64 CGO_ENABLED=0 ./make.bash
cd -
GOOS=windows GOARCH=amd64 make release-server release-client
```

### 客户端配置文件ngrok.conf
>server_addr: "tunnel.ink:4443"
>trust_host_root_certs: false

### 启动客户端

```
ngrok -subdomain dev -config=ngrok.conf 80
```


## 参考
[官方文档](https://github.com/inconshreveable/ngrok/blob/master/docs/SELFHOSTING.md)
[Sebastian的博客](http://www.svenbit.com/2014/09/run-ngrok-on-your-own-server/)
[海运博客](http://www.haiyun.me/archives/1012.html)
[Run Ngrok on Your Own Server Using Self-Signed SSL Certificate](https://www.svenbit.com/2014/09/run-ngrok-on-your-own-server/)

## 它山之石

[ngrok一键安装脚本，适于centos版本服务器](https://www.sunnyos.com/article-show-66.html)


