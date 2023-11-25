### 说明
1. 本组件符合[easycom](https://uniapp.dcloud.io/collocation/pages?id=easycom)规范，`HBuilderX 2.5.5`起，只需将本组件导入项目，在页面`template`中即可直接使用，无需在页面中`import`和注册`components`。
2. 由于官方公告组件uni-notice-bar没有垂直滚动的功能，所以利用swiper加入了垂直滚动，加入了常用主题色，可以自己去添加，需要用到uni-icons

### 优势
简单实用，代码就100行，支持扩展，小巧美观，滚动速度有快中慢三档，如果不满意可以自行调整

### 预览地址
[http://kangleyunju.gitee.io/uniapp](http://kangleyunju.gitee.io/uniapp)

### 使用方法

1. 默认垂直滚动
```
<xzw-notice :list="list"/>
```
2. 不同主题色theme
```
<xzw-notice theme="error" direction="row" speed="slow" :list="list"/>
```
3. 水平滚动
```
<xzw-notice theme="info" direction="row" :list="list"/>
```
4. 滚动速度，快中慢三档，fast，normal，slow
```
<xzw-notice theme="primary" :list="list" theKey="title" speed="fast" direction="row"/>
```
5. 点击公告，点击更多触发事件
```
<xzw-notice theme="warning" :list="list" @goItem="goItem" @goMore="goMore" />
```
6. 绑定公告数组，默认取每一项的title字段，可以通过theKey改变读取的字段
```
<xzw-notice theme="success" :list="list" theKey="title" speed="fast"/>
```
7. 是否显示左侧喇叭，是否显示右侧更多
```
<xzw-notice theme="primary" :list="list" theKey="title" :showIcon="false" :showMore="false" speed="slow"/>
```

### 属性

|属性名		    |类型		   |默认值	    |说明				    |							
|:-:		      |:-:		   |:-:		    |:-:				    |								
|list		      |Array	   |[]			  |公告数组			  |										
|theme	  	  |String	   |default   |主题色			    |	
|showIcon	    |Boolean	 |true      |是否显示左侧喇叭	|
|showMore     |Boolean   |true      |是否显示右侧更多	|						
|theKey	      |String    |title	    |公告数组的键名	  |													
|direction    |String    |column	  |滚动的方向      |
|speed        |String    |normal	  |滚动速度        |


### 事件

|事件称名		|说明				|返回值	|
|:-:			  |:-:				|:-:   	|
|@goItem		|点击公告		|-		  |
|@goMore	  |点击更多		|-		  |

