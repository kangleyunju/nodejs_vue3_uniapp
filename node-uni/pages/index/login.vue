<template>
	<view class="container">
		<view class="title">{{$t('baseName')}}</view>
		<uni-forms ref="form1" :rules="rules1" :value="formData1" validate-trigger="submit" class="formBox">
			<uni-forms-item name="phone">
				<uni-easyinput type="text" v-model="formData1.name" :placeholder="$t('enterAccount')" maxlength="11"/>
			</uni-forms-item>
			<uni-forms-item name="code">
				<uni-easyinput type="password"  v-model="formData1.password" :placeholder="$t('enterPassword')" maxlength="18" :clearable="false"/>
			</uni-forms-item>
		</uni-forms>
		<view class="xzwBtn_dark" @click="submit">{{type==1?$t('login'):$t('register')}}</view>
		<view class="tip">{{type==1?$t('noAccount'):$t('haveAccount')}}<text @click="change">{{type==1?$t('toRegister'):$t('toLogin')}}</text></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type:1,
				formData1:{
					name:'',
					password:''
				},
				rules1: {
					phone: {
						rules: [{
							required: true,
							errorMessage: this.$t('enterAccount')
						}]
					},
					code: {
						rules: [{
							required: true,
							errorMessage: this.$t('enterPassword')
						},{
                            minLength: 6,
                            maxLength: 18,
                            errorMessage: '密码长度在 {minLength} 到 {maxLength} 个字符'
                        }]
					}
				}
			}
		},
		methods: {
			change(){
				this.formData1.name=""
				this.formData1.password=""
				this.type=this.type==1?2:1
			},
			submit(){
				this.$refs.form1.validate()
				.then(res => {
					if(this.type==1){
						this.$post('user/login',{
							name:this.formData1.name,
							password:this.formData1.password
						}).then(res => {
							if(res.code==200){
								this.$login(res.data)
								this.jump('/user/user')
							}else{
								this.toast(res.msg)
							}
						})
					}else{
						this.$post('user/add',{
							name:this.formData1.name,
							password:this.formData1.password
						}).then(res => {
							if(res.code==200){
								this.$login(res.data)
								this.jump('/user/user')
							}else{
								this.toast(res.msg)
							}
						})
					}
				}).catch(err=>{
					
				})
			}
		},
		onLoad() {
			
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #fff;
	}
	.container{
		.title{
			font-size: 40upx;
			font-weight: bold;
			padding:100upx 75upx 0;
		}
		.formBox{
			margin: 100upx 75upx 20upx;
			/deep/.is-input-border{
				// border: none;
				// border-bottom: 1upx solid #c8c7cc;
			}
		}
		.xzwBtn_dark{
			height: 76upx;
			font-size: 32upx;
			border-radius: 36upx;
			margin: 0 75upx 30upx;
		}
		.tip{
			color: #999;
			font-size: 26upx;
			text-align: center;
			text{
				color: $mainColor;
				margin: 0 0 0 10upx;
			}
		}
	}
</style>
