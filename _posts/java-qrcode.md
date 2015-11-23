title: Java实现二维码QRCode的编码和解码
date: 2012-06-04 09:34:28
categories: java
tags: [java,QRCode,二维码]
---
涉及到的一些主要类库，方便大家下载：
编码lib：Qrcode_swetake.jar   （官网介绍– http://www.swetake.com/qr/index-e.html）
解码lib：qrcode.jar                 （官网介绍– http://sourceforge.jp/projects/qrcode/）
1. 编码：
QRCodeEncoderHandler.java
```
package michael.qrcode;

import java.awt.Color;

import java.awt.Graphics2D;

import java.awt.image.BufferedImage;

import java.io.File;

import javax.imageio.ImageIO;

import com.swetake.util.Qrcode;

/**

* 二维码生成器

*/

public class QRCodeEncoderHandler {

/**

* 生成二维码(QRCode)图片

* @param content

* @param imgPath

*/

public void encoderQRCode(String content, String imgPath) {

try {

Qrcode qrcodeHandler = new Qrcode();

qrcodeHandler.setQrcodeErrorCorrect('M');

qrcodeHandler.setQrcodeEncodeMode('B');

qrcodeHandler.setQrcodeVersion(7);

System.out.println(content);

byte[] contentBytes = content.getBytes("gb2312");

BufferedImage bufImg = new BufferedImage(140, 140,

BufferedImage.TYPE_INT_RGB);

Graphics2D gs = bufImg.createGraphics();

gs.setBackground(Color.WHITE);

gs.clearRect(0, 0, 140, 140);

// 设定图像颜色> BLACK

gs.setColor(Color.BLACK);

// 设置偏移量 不设置可能导致解析出错

int pixoff = 2;

// 输出内容> 二维码

if (contentBytes.length > 0 && contentBytes.length < 120) {

boolean[][] codeOut = qrcodeHandler.calQrcode(contentBytes);

for (int i = 0; i < codeOut.length; i++) {

for (int j = 0; j < codeOut.length; j++) {

if (codeOut[j][i]) {

gs.fillRect(j * 3 + pixoff, i * 3 + pixoff, 3, 3);

}

}

}

} else {

System.err.println("QRCode content bytes length = "

+ contentBytes.length + " not in [ 0,120 ]. ");

}

gs.dispose();

bufImg.flush();

File imgFile = new File(imgPath);

// 生成二维码QRCode图片

ImageIO.write(bufImg, "png", imgFile);

} catch (Exception e) {

e.printStackTrace();

}

}

/**

* @param args the command line arguments

*/

public static void main(String[] args) {

String imgPath = "D:/test/twocode/Michael_QRCode.png";

String content = "Hello 大大、小小,welcome to QRCode!"

+ "nMyblog [ http://sjsky.iteye.com ]"

+ "nEMail [ sjsky007@gmail.com ]" + "nTwitter [ @suncto ]";

QRCodeEncoderHandler handler = new QRCodeEncoderHandler();

handler.encoderQRCode(content, imgPath);

System.out.println("encoder QRcode success");

}

}


```

2. 解码：
QRCodeDecoderHandler.java

```
package michael.qrcode;


import java.awt.image.BufferedImage;

import java.io.File;

import java.io.IOException;


import javax.imageio.ImageIO;


import jp.sourceforge.qrcode.QRCodeDecoder;

import jp.sourceforge.qrcode.data.QRCodeImage;

import jp.sourceforge.qrcode.exception.DecodingFailedException;


/**

* @blog http://sjsky.iteye.com

* @author Michael

*/

public class QRCodeDecoderHandler {


/**

* 解码二维码

* @param imgPath

* @return String

*/

public String decoderQRCode(String imgPath) {


// QRCode 二维码图片的文件

File imageFile = new File(imgPath);


BufferedImage bufImg = null;

String decodedData = null;

try {

bufImg = ImageIO.read(imageFile);


QRCodeDecoder decoder = new QRCodeDecoder();

decodedData = new String(decoder.decode(new J2SEImage(bufImg)));


// try {

// System.out.println(new String(decodedData.getBytes("gb2312"),

// "gb2312"));

// } catch (Exception e) {

// // TODO: handle exception

// }

} catch (IOException e) {

System.out.println("Error: " + e.getMessage());

e.printStackTrace();

} catch (DecodingFailedException dfe) {

System.out.println("Error: " + dfe.getMessage());

dfe.printStackTrace();

}

return decodedData;

}


/**

* @param args the command line arguments

*/

public static void main(String[] args) {

QRCodeDecoderHandler handler = new QRCodeDecoderHandler();

String imgPath = "d:/test/twocode/Michael_QRCode.png";

String decoderContent = handler.decoderQRCode(imgPath);

System.out.println("解析结果如下：");

System.out.println(decoderContent);

System.out.println("========decoder success!!!");

}


class J2SEImage implements QRCodeImage {

BufferedImage bufImg;


public J2SEImage(BufferedImage bufImg) {

this.bufImg = bufImg;

}


public int getWidth() {

return bufImg.getWidth();

}


public int getHeight() {

return bufImg.getHeight();

}


public int getPixel(int x, int y) {

return bufImg.getRGB(x, y);

}


}

}


```

运行结果如下（解码出的内容和之前输入的内容一致 ）：
解析结果如下：
>Hello 大大、小小,welcome to QRCode!
>Myblog [ http://sjsky.iteye.com ]
>EMail [ sjsky007@gmail.com ]
>Twitter [ @suncto ]
>========decoder success!!!
