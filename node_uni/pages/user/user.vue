<template>
	<view class="container">
		<view class="topBg"></view>
		<view class="userBox box">
			<view class="userBoxIn" v-if="state==1" @click="jump('/index/login')">
				<image src="/static/icon/face.jpg" class="face"/>
				<view class="right">
					<view class="name">{{$t('tourist')}}</view>
					<view class="other"><text>{{$t('toLogin')}}</text></view>
				</view>
			</view>
			<view class="userBoxIn" v-if="state==2" @click="navTo('/user/info')">
				<image :src="userInfo.face||'/static/icon/face.jpg'" class="face"/>
				<view class="right">
					<view class="name">{{userInfo.nickname}}</view>
					<view class="other">
						<text>{{$t('level')}}:V{{userInfo.level||'未知'}}</text>
						<text>{{$t('balance')}}:{{userInfo.money||0}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="line box" @click="navTo('/user/list')" v-if="state==2&&userInfo.is_admin==1">{{$t('userList')}}<uni-icons type="forward"/></view>
		<view class="line box" @click="navTo('/goods/my')" v-if="state==2">{{$t('myGood')}}<uni-icons type="forward"/></view>
		<view class="line box" @click="navTo('/goods/examine')" v-if="state==2">{{$t('goodReview')}}<uni-icons type="forward"/></view>
		<view class="line box" @click="navTo('/user/room')" v-if="state==2">{{$t('chatRoom')}}<uni-icons type="forward"/></view>
		<view class="line box" @click="jump('/user/set')">{{$t('set')}}<uni-icons type="forward"/></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user_id:'',
				userInfo:{},
				state:0//1未登录2已登录
			}
		},
		methods: {
			getUser(){
        if(this.isApi){
          this.$get('user/person', {
          	user_id:this.user_id
          }).then(res => {
          	if (res.code == 200) {
          		this.userInfo=res.data
          		this.state=2
          	}else if(res.code==400){
              this.toast(res.msg)
              setTimeout(()=>{
                this.$logout('/index/login')
              },2000)
            }else{
          		this.toast(res.msg)
          	}
          })
        }else{
          this.userInfo=this.getUserInfo()
          this.state=2
        }
			}
		},
		onShow(){
			if(this.hasLogin()){
				this.user_id=this.getUserInfo().user_id
				this.getUser()
			}else{
				this.state=1
			}
		}
	}
</script>

<style lang="scss">
	.container{
		.topBg{
			height: 100upx;
			background-color: $mainColor;
		}
		.box{
			background-color: #fff;
			box-shadow: 0 0 4upx 4upx rgba(0,0,0,0.04);
			border-radius: 10upx;
			padding: 0 30upx;
			box-sizing: border-box;
		}
		.userBox{
			margin: -80upx 25upx 0;
			height: 200upx;
			.userBoxIn{
				height: 200upx;
				display: flex;
				align-items: center;
				.face{
					border-radius: 50%;
					height: 130upx;
					width: 130upx;
				}
				.right{
					margin: 0 0 0 20upx;
					height: 80upx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					.name{
						font-size: 30upx;
						font-weight: bold;
					}
					.other{
						color: #999;
						font-size: 24upx;
						text{
							margin: 0 10upx 0 0;
						}
					}
				}
			}
		}
		.line{
			margin: 25upx 25upx 0;
			height: 100upx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 28upx;
		}
	}
</style>
