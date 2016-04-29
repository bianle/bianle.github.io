title: Discuz! X系列远程代码执行漏洞分析
date: 2016-04-29 11:19:11
tags: php
categories: php
---

阿里云上部了个小[博客程序](http://bovod.org),安骑士漏洞检查报了好几天的异常了,也没空理,今儿个度娘了下,找到[Discuz! X系列远程代码执行漏洞分析](http://drops.wooyun.org/papers/7830)
PO主讲的症状和我的程序一致,可惜没能给出具体解决方案(可能是解决方案太简单不值一提)!下面附上解决方案:

>这个问题的根源在于api/uc.php文件中的updatebadwords方法，代码如下：
>```
function updatebadwords($get, $post) {
        global $_G;
 
        if(!API_UPDATEBADWORDS) {
            return API_RETURN_FORBIDDEN;
        }
 
        $data = array();
        if(is_array($post)) {
            foreach($post as $k => $v) {
                $data['findpattern'][$k] = $v['findpattern'];
                $data['replace'][$k] = $v['replacement'];
            }
        }
        $cachefile = DISCUZ_ROOT.'./uc_client/data/cache/badwords.php';
        $fp = fopen($cachefile, 'w');
        $s = "<?php\r\n";
        $s .= '$_CACHE[\'badwords\'] = '.var_export($data, TRUE).";\r\n";
        fwrite($fp, $s);
        fclose($fp);
 
        return API_RETURN_SUCCEED;
    }
```

修改后:

```
function updatebadwords($get, $post) {
		if(!API_UPDATEBADWORDS) {
			return API_RETURN_FORBIDDEN;
		}
		$cachefile = $this->appdir.'./uc_client/data/cache/badwords.php';
		$fp = fopen($cachefile, 'w');
		$data = array();
		if(is_array($post)) {
			foreach($post as $k => $v) {
				//修复代码执行漏洞补丁
				if(substr($v['findpattern'], 0, 1) != '/' || substr($v['findpattern'], -3) != '/is') {
					$v['findpattern'] = '/' . preg_quote($v['findpattern'], '/') . '/is';
				}
				$data['findpattern'][$k] = $v['findpattern'];
				$data['replace'][$k] = $v['replacement'];
			}
		}
		$s = "<?php\r\n";
		$s .= '$_CACHE[\'badwords\'] = '.var_export($data, TRUE).";\r\n";
		fwrite($fp, $s);
		fclose($fp);
		return API_RETURN_SUCCEED;
	}
```
