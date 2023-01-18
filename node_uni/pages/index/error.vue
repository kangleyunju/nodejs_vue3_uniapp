<template>
	<view class="container">
		<view class="big"><text>4</text>0<text>4</text></view>
		<view class="tip">页面迷路了, 请确认访问地址是否有误</view>
		<view class="xzwBtn_dark" @click="jump('/index/index')">返回首页</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{

			}
		},
		methods:{

		}
	}
</script>	
<style lang="scss">
	page{
		background-color: #fff;
	}
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		.big{
			font-size: 200upx;
			margin: 30vh 0 0;
			color: #aaa;
			text{
				color: #0090d8;
			}
		}
		.tip{
			color: #666;
			font-size: 30upx;
			margin: 30upx 0 40upx;
		}
		.xzwBtn_dark{
			font-size: 30upx;
			padding: 15upx 30upx;
			border-radius: 36upx;
		}
	}
</style>
