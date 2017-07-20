---
title: "ik分词器学习总结"
date: 2017-05-19 15:37:00
tags: ik analzyer
categories: lucese
---

## 主要类及类的作用


### core包

![ik-core](http://7xlbo3.com1.z0.glb.clouddn.com/2017/05/22/20170522154250.png)

#### IKSegmenter 
IK分词器主类  
主要方法`init() `初始化分词器：
1. 初始化词典
2. 初始化分词上下文
3. 加载子分词器
4. 加载歧义裁决器

#### LetterSegmenter
子分词器，英文分词器  
主要方法`analyze()`处理三种类型的词：
1. 纯英文单词或字母"this is a dog"
2. 纯阿拉伯数字"500"
3. 字母数字混合词"Nikon D90"

#### CN_QuantifierSegmente
子分词器，中文量词分词器
主要方法`analyze()`处理中文数量词：
1. 中文数词（一二两三四五六七八九十零壹贰叁肆伍陆柒捌玖拾百千万亿拾佰仟萬億兆卅廿）
2. 中文数词（或阿拉伯数字）+量词；如"21寸电脑","二十架飞机"

#### CJKSegmenter
子分词器，中文分词器(CJK,中日韩统一表意文字)
主要方法`analyze()`
主要是通过主词典对中文进行切分，如：“我不愿意”->"我|不愿意|愿意"

#### IKArbitrator
IK分词歧义裁决器
主要方法`process()`:  
歧义裁决原则：匹配的长度越长越好，词的数量越少越好，路径跨度越长越好
如“我|不愿意|愿意”经过歧义裁决后“我|不愿意”

#### Lexeme 
词元

### cfg包
![ik-cfg](http://7xlbo3.com1.z0.glb.clouddn.com/2017/05/22/20170522154228.png?imageView2/2/w/200)
#### Configuration
配置文件接口
主要方法：  
1. getMainDictionary() //获取主词典路径
2. getQuantifierDicionary() //获取量词词典路径
3. getExtDictionarys() //获取扩展词典路径
4. getExtStopWordDictionarys() //获取停止词词典路径

#### DefaultConfig
Configuration的默认实现

### dict 包
![ik-dict](http://7xlbo3.com1.z0.glb.clouddn.com/2017/05/22/20170522154312.png)
#### Dictionary
字典类，提供字典相关的方法（感觉叫DictionaryUtil更贴切）
主要方法：  
loadMainDict() //加载主词典  
loadExtDict() //加载扩展词典  
loadStopWordDict() //加载用户扩展的停止词词典
loadQuantifierDict() //加载量词词典

#### DictSegment
字典树分段，代表字典树的一个分支（这才是真正意义上的字典）
主要方法：
match() //匹配字段，返回这次匹配的命中对象`Hit`

#### Hit
表示匹配字段的命中
主要方法：  
isMatch() //是否匹配

>字典树数据结构前缀树

### lucene包
![ik-lucene](http://7xlbo3.com1.z0.glb.clouddn.com/2017/05/22/20170522154329.png?imageView2/2/w/200)

#### IKAnalyzer 
IK分词器的主类是IK分词器的 Lucene Analyzer 类实现
IKAnalyzer(boolean useSmart) useSmart 为true时智能切词，false时最细粒度切词
#### IKTokenizer 
Lucene Tokenizer的适配器类，重写了构造分词组件方法createComponents()




## 基本流程
1.	分词器初始化
实例化IKAnalyzer->调用父类Analyzer（来自lucene）的tokenStream()方法->tokenStream()中调用IKAnalyzer类重写的抽象方法createComponents()->实例化IKTokenizer->IKTokenizer构造中实例化IKSegmenter->IKSegmenter中调用init()方法初始化词典单例，初始化分词上下文，加载子分词器，加载歧义裁决器  
主要代码：  
lucene Analyzer抽象类
```
public final TokenStream tokenStream(String fieldName, Reader reader) throws IOException {
        Analyzer.TokenStreamComponents components = this.reuseStrategy.getReusableComponents(this, fieldName);
        Reader r = this.initReader(fieldName, reader);
        if(components == null) {
            components = this.createComponents(fieldName, r);
            this.reuseStrategy.setReusableComponents(this, fieldName, components);
        } else {
            components.setReader(r);
        }

        return components.getTokenStream();
    }
```
IKAnalyzer 部分代码
```
/**
	 * 重载Analyzer接口，构造分词组件
	 */
@Override
	protected TokenStreamComponents createComponents(String fieldName, final Reader in) {
		Tokenizer _IKTokenizer = new IKTokenizer(in , this.useSmart());
		return new TokenStreamComponents(_IKTokenizer);
	}
```
IKTokenizer 构造器
```
/**
	 * Lucene 4.0 Tokenizer适配器类构造函数
	 * @param in 输入流
	 * @param useSmart 智能切词
	 */
public IKTokenizer(Reader in , boolean useSmart){
	    super(in);
	    offsetAtt = addAttribute(OffsetAttribute.class);
	    termAtt = addAttribute(CharTermAttribute.class);
	    typeAtt = addAttribute(TypeAttribute.class);
		_IKImplement = new IKSegmenter(input , useSmart);
	}
```
IKSegmenter 部分代码
```
/**
	 * IK分词器构造函数
	 * @param input 
	 * @param useSmart 为true，使用智能分词策略
	 * 
	 * 非智能分词：细粒度输出所有可能的切分结果
	 * 智能分词： 合并数词和量词，对分词结果进行歧义判断
	 */
	public IKSegmenter(Reader input , boolean useSmart){
		this.input = input;
		this.cfg = DefaultConfig.getInstance();
		this.cfg.setUseSmart(useSmart);
		this.init();
	}
```
```
/**
	 * 初始化
	 */
	private void init(){
		//初始化词典单例
		Dictionary.initial(this.cfg);
		//初始化分词上下文
		this.context = new AnalyzeContext(this.cfg);
		//加载子分词器
		this.segmenters = this.loadSegmenters();
		//加载歧义裁决器
		this.arbitrator = new IKArbitrator();
	}
```


2.	预处理
3.	英文分词
4.	中文量词分词
5.	中文分词
6.	歧义处理
7.	善后

## 参考

[IK analyser源码解析](http://blog.163.com/liaoxiangui@126/blog/static/7956964020130299518177/)

[IK分词源代码分析学习——总体流程](http://www.cnblogs.com/sunshineKID/p/3437958.html)

[IK中文分词扩展自定义词典！！！](http://blog.csdn.net/iamaboyy/article/details/7569977)

