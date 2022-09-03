<template>
	<view class="container">
		<view class="main" v-if="show">
			<view class="faceBox">
				<image :src="userInfo.face||'/static/icon/face.jpg'" mode="aspectFill" @click="previewImg(userInfo.face||'/static/icon/face.jpg')"/>
				<view class="xzwBtn_light" @click="uploadImg">更换头像</view>
			</view>
			<view class="line"><view class="left">账号</view><view class="right"><input type="text" disabled v-model="userInfo.name"></view></view>
			<view class="line"><view class="left">等级</view><view class="right">V{{userInfo.level}}</view></view>
			<view class="line"><view class="left">昵称</view><view class="right"><input @blur="save()" type="text" maxlength="11" v-model="userInfo.nickname"/><uni-icons type="forward" color="#999"/></view></view>
			<picker mode="date" @change="change" :end="endDate">
				<view class="line"><view class="left">生日</view><view class="right"><input type="text" disabled v-model="userInfo.birthday"></view><uni-icons type="forward" color="#999"/></view>
			</picker>
			<picker mode="selector" :range="gender" @change="changeGender">
				<view class="line" ><view class="left">性别</view><view class="right">{{userInfo.sex==0?'未知':userInfo.sex==1?'男':'女'}}<uni-icons type="forward" color="#999"/></view></view>
			</picker>
			<view class="line no"><view class="left">注册时间</view><view class="right">{{changeTime(userInfo.create_time)}}</view></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user_id:'',
				userInfo:{},
				endDate:'',
				gender:['男','女'],
				show:false
			}
		},
		methods: {
			save(){
				let data={
					user_id:this.user_id,
					nickname:this.userInfo.nickname,
					birthday:this.userInfo.birthday,
					sex:this.userInfo.sex
				}
				if(this.userInfo.face&&this.userInfo.face!=''){
					data.face=this.userInfo.face
				}
				this.$post('user/edit', data).then(res => {
					if (res.code == 250) {
						this.toast(res.msg)
					}
				})
			},
			changeGender(e){
				this.userInfo.sex=e.detail.value+1
				this.save()
			},
			change(e){
				this.userInfo.birthday=e.detail.value
				this.save()
			},
			getUser(){
				this.$get('user/person', {
					user_id:this.user_id
				}).then(res => {
					if (res.code == 200) {
						this.show=true
						this.userInfo=res.data
					}else{
						this.toast(res.msg)
					}
				})
			},
			uploadImg(res) {
				const crop = {
					quality: 100,
					width: 600,
					height: 600,
					resize: true
				};
				uni.chooseImage({
					count: 1,
					crop,
					success: async (res) => {
						let  filePath = res.tempFilePaths[0]
						// #ifndef APP-PLUS
						filePath = await new Promise((callback) => {
							uni.navigateTo({
								url: '/pages/user/cropImage?path=' + filePath +`&options=${JSON.stringify(crop)}`,
								animationType: "fade-in",
								events: {
									success: url => {
										callback(url)
									}
								}
							});
						})
						// #endif
						this.$upload(filePath).then((res)=>{
							this.userInfo.face=res.path
							this.save()
						})
					}
				})
			}
		},
		onLoad() {
			this.endDate=this.changeTime()
			if(this.hasLogin(2)){
				this.user_id=this.getUserInfo().user_id
				this.getUser()
			}
		}
	}
</script>

<style lang="scss">
.container{
	background-color: #fff;
	.faceBox{
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		height: 320upx;
		image{
			height: 180upx;
			width: 180upx;
			border-radius: 50%;
		}
		.xzwBtn_light{
			width: 150upx;
			height: 60upx;
			font-size: 28upx;
			border-radius: 30upx;
			margin: 20upx auto 0;
		}
	}
	.line{
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 0 30upx;
		font-size: 28upx;
		height:90upx;
		border-bottom: 1upx solid #e1e1e1;
		&.no{
			border: none;
		}
		.left{
			width: 200upx;
		}
		.right{
			display: flex;
			align-items: center;
			justify-content: space-between;
			flex:1;
			input{
				flex:1;
				font-size: 28upx;
			}
		}
	}
}
</style>
