<template>
	<view class="xzwCenterPopup">
		<uni-popup type="center" ref="xzwCenterPopup" class="popup">
			<view class="centerPopupBox">
				<view class="title" :style="{fontSize:fontSize}" v-if="title!=''">{{title}}</view>
				<view class="subTitle">{{subTitle?subTitle:''}}</view>
				<view class="xzwButton">
					<view class="cancelButton" @click="leftClick" :style="{border:'1upx solid'+useColor,color:useColor,backgroundColor:'#fff'}">{{leftText}}</view>
					<view class="confirmButton" @click="rightClick" :style="{color:'#fff',backgroundColor:useColor}">{{rightText}}</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		name:"xzw-centerPopup",
		props: {
			title: '',
			subTitle:'',
			leftText: {
				type: String,
				default: '取消'
			},
			rightText: {
				type: String,
				default: '确定'
			},
			color:{
				type: String,
				default: ''
			},
			default: {
				type: Boolean,
				default:true
			},
			fontSize:{
				type: String,
				default: '32upx'
			}
		},
		data() {
			return {
				isShow: false,
				ani:false,
				useColor:''
			}
		},
		methods: {
			open() {
				this.$refs.xzwCenterPopup.open()
				if(this.color){
					this.useColor=this.color
				}else{
					this.useColor=this.mainColor
				}
			},
			close() {
				this.$refs.xzwCenterPopup.close()
			},
			leftClick(){
				if(this.default){
					this.close()
				}else{
					this.$emit("leftClick")
				}
			},
			rightClick() {
				this.$emit('confirmClick')
			}
		}
	}
</script>

<style lang="scss">
	.xzwCenterPopup {
		.popup{
			z-index: 1000;
		}
		.centerPopupBox {
			z-index: 1000;
			width: 586upx;
			background-color: #fff;
			border-radius: 20upx;
			position: absolute;
			left: 50%;
			top: 48%;
			transform: translate(-50%, -50%);
			.title {
				font-weight: bold;
				text-align: center;
				font-size: 32upx;
				padding: 74upx 20upx 20upx;
			}
			.subTitle{
				text-align: center;
				font-size: 24upx;
				padding: 0 20upx 20upx 20upx;
			}
			.xzwButton {
				display: flex;
				justify-content: space-between;
				padding: 20upx 70upx 54upx;
				view {
					width: 216upx;
					height: 60upx;
					display: flex;
					align-items: center;
					justify-content: center;
					border-radius: 44upx;
					font-size: 28upx;
					box-sizing: border-box;
				}
			}
		}
	}
</style>
