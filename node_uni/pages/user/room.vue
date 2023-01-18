<template>
	<view class="container">
		<view class="messageBox">
			<view class="num">{{$t('onlineNumber')}}：{{number}}</view>
			<view v-for="(item,index) in list" :key="index" class="line"><text>{{item.type=='system'?$t('system')+'：':item.nickname+'：'}}</text>{{item.data}}</view>
		</view>
		<view class="bottomContainer">
			<textarea type="text" auto-height maxlength="100" v-model="text"/>
			<view @click="send" class="xzwBtn" :class="{active:text.replace(/\s+/g,'')!=''}">{{$t('send')}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				number:0,
				userInfo:{},
				text:''
			}
		},
		methods: {
			send(){
				this.text=this.text.replace(/\s+/g,"")
				if(this.text!=''){
					let send={
						type:"say",
						data:this.text,
						nickname:this.userInfo.nickname
					}
					this.text=''
					uni.sendSocketMessage({
						data:JSON.stringify(send),
						complete() {
							uni.pageScrollTo({
								scrollTop:9999,
								duration:100
							})
						}
					})
				}
			},
			getList(){
				const that=this
				this.userInfo=this.getUserInfo()
				uni.connectSocket({
				    url: this.baseWs, 
				    complete: (res)=> {
						console.log('WebSocket创建成功！');
					}
				});
				uni.onSocketOpen(()=>{
					console.log('WebSocket连接已打开！');
					var data={
						type:'login',
						nickname:this.userInfo.nickname
					}
					uni.sendSocketMessage({
						data:JSON.stringify(data)
					})
				})
				uni.onSocketClose(()=>{
					console.log('WebSocket连接已关闭！');
				})
				uni.onSocketError(()=>{
					that.toast('WebSocket连接打开失败')
					console.log('WebSocket连接打开失败');
				})
				uni.onSocketMessage((res)=>{
					var result=JSON.parse(res.data)
					this.number=result.onLine
					this.list=this.list.concat(result)
					uni.pageScrollTo({
						scrollTop:9999,
						duration:100
					})
				})
			}
		},
		onUnload() {
			var data={
				type:'logout',
				nickname:this.userInfo.nickname
			}
			uni.sendSocketMessage({
				data:JSON.stringify(data),
				complete() {
					uni.closeSocket()
				}
			})
		},
		onLoad() {
			this.getList()
		}
	}
</script>

<style lang="scss">
	.container{
		.messageBox{
			padding: 0 20upx 100upx;
			.num{
				text-align: center;
				height: 100upx;
				line-height: 100upx;
				font-size: 30upx;
			}
			.line{
				font-size: 30upx;
				word-break: break-all;
				line-height: 46upx;
				text{
					color: $mainColor;
				}
			}
		}
		.bottomContainer{
			padding: 15upx 20upx;
			box-sizing: border-box;
			display: flex;
			align-items: flex-start;
			textarea{
				background-color: #e8e8e8;
				min-height: 44upx;
				max-height: 300upx;
				border-radius: 8upx;
				flex:1;
				padding: 10upx 10upx;
				box-sizing: border-box;
			}
			.xzwBtn{
				margin: 0 0 0 20upx;
				height: 64upx;
				border-radius: 10upx;
				font-size: 24upx;
				width: 100upx;
				color: #fff;
				background-color: $lightColor;
				&.active{
					background-color: $mainColor;
				}
			}
		}
	}
</style>
