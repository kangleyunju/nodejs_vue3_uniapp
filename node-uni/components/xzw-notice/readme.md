### 安装方式

本组件符合[easycom](https://uniapp.dcloud.io/collocation/pages?id=easycom)规范，`HBuilderX 2.5.5`起，只需将本组件导入项目，在页面`template`中即可直接使用，无需在页面中`import`和注册`components`。

### 说明
由于官方公告组件uni-notice-bar没有垂直滚动的功能, 所以利用swiper加入了垂直滚动, 加入了常用主题色, 可以自己去添加, 需要用到uni-icons

```html
<template>
	<view class="container">
		<!-- 默认垂直滚动 -->
		<xzw-notice/>
		<!-- 水平滚动,取数组第一条 -->
		<xzw-notice theme="info" direction="row"/>
		<!-- theme主题色,default|primary|error|warning|success|info -->
		<xzw-notice theme="error" direction="row"/>
		<!-- 点击公告,点击更多 -->
		<xzw-notice theme="warning" @goItem="goItem" @goMore="goMore"/>
		<!-- 绑定公告数组,默认取每一项的title字段,可以通过theKey改变读取的字段 -->
		<xzw-notice theme="success" :list="list2" theKey="name"/>
		<!-- 是否显示左侧喇叭,是否显示更多 -->
		<xzw-notice theme="primary" :list="list2" theKey="name" :showIcon="false" :showMore="false"/>
	</view>
</template>

```

```javascript
	export default {
		data() {
			return {
				list:[{id:1,title:'公告1'},{id:2,title:'公告2'}]
				list2:[{id:1,name:'公告3'},{id:2,name:'公告4'}]
			}
		},
		methods: {
			goItem(item){
				uni.showToast({
					title:'你点击的公告id是'+item.id,
					icon:'none'
				})
			},
			goMore(){
				uni.showToast({
					title:'点击更多',
					icon:'none'
				})
			}
		}
	}
```



## API

### Tag Props

|属性名		  |类型		 |默认值	    |说明				|							
|:-:		  |:-:		 |:-:		|:-:				|								
|list		  |Array	 |			|公告数组			|										
|theme	  	  |String	 |default   |主题			    |	
|showIcon	  |Boolean	 |true      |是否显示左侧icon	|
|showMore     |Boolean   |true      |是否显示更多		|						
|theKey	      |String    |title	    |公告数组的键名	    |													
|direction    |String    |column	|滚动的方向          |


### Tag Events

|事件称名		|说明				|返回值	|
|:-:			|:-:				|:-:	|
|@goItem		|点击公告			|-		|
|@goMore	    |点击更多			|-		|

