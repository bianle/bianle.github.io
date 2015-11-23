title: web-flex-music-player
tags: [flex,播放器]
categories: web前端
date: 2013-02-04 18:09:17
---

```
<?xml version="1.0" encoding="utf-8"?>
<mx:Application xmlns:mx="http://www.adobe.com/2006/mxml" layout="absolute" initialize="init()" backgroundColor="#ffffff">
	<mx:Script>
		<![CDATA[
			import mx.skins.halo.ProgressIndeterminateSkin;
			import mx.controls.Alert;
			private var sud:Sound;
			private var scn:SoundChannel;
			private var position:Number = 0;
			private var running:Boolean = false;
			public function init():void{
				var lab:String = Application.application.parameters.label;
				var url:String = Application.application.parameters.url;
				if(lab==null){
					lab = "default";//默认Label
				}
				if(url==null){
					url = "http://le5u.net/sound/1.mp3";//默认播放路径
				}
				sud = new Sound(new URLRequest(url));
				pb.label=lab;
				
			}
			private function pl():void{
				if(!running){
					scn = sud.play(position);
					scn.addEventListener(Event.SOUND_COMPLETE,sdComplete);
					pb.addEventListener(Event.ENTER_FRAME,ud);
					running = true;
				}else{
					position = scn.position;
					scn.stop();
					running = false;
				}
				
			}
			private function sdComplete(event:Event):void{
				running = false;
				position = 0;
			}
			//更新进度条
			private function ud(event:Event):void{
				var pos:Number = scn.position;
				var len:Number = sud.length;
				var percent:Number = Math.round(pos*100/len);
				if(isNaN(percent)){
					percent = 0;
				}
				//trace("position is "+pos +"n" +"length is " + len + "n" +"percent is  "+percent);
				pb.setProgress(pos,len);
			}
			private function pbInit():void{
      			//pb.setStyle("barSkin", ProgressIndeterminateSkin);
      			pb.setStyle("trackColors", [ 0xffffff, 0xf3efee ]);
      			pb.setStyle("barColor", 0x66FF66);
      			//pb.setStyle("borderColor", 0xf3efee);
			}
		]]>
	</mx:Script>
	<mx:Style>
		ProgressBar{
			font-size:14px;
			font-weight:normal;
			
		}
	</mx:Style>
	
	<mx:ProgressBar id="pb" useHandCursor="true" buttonMode="true" mouseChildren="false" initialize="pbInit()" click="pl()" minimum="0" maximum="100" width="100%" height="100%" labelPlacement="center" mode="manual">
	</mx:ProgressBar>
</mx:Application>
```
