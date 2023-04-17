<template>
	<view class="container" @click="$refs.video.play()">
		<view class="main">
			<view class="title">{{$t('baseName')}}</view>
			<uni-forms ref="form1" :rules="rules1" :value="formData1" validate-trigger="submit" class="formBox">
				<uni-forms-item name="phone">
					<uni-easyinput placeholder-style="color: #fff" autocomplete="off" type="text" v-model="formData1.name" :placeholder="$t('enterAccount')" maxlength="11" />
				</uni-forms-item>
				<uni-forms-item name="code">
					<uni-easyinput placeholder-style="color: #fff" type="password" autocomplete="off" v-model="formData1.password" :placeholder="$t('enterPassword')" maxlength="18" :clearable="false" />
				</uni-forms-item>
			</uni-forms>
			<view class="xzwBtn_dark" @click="submit">{{type==1?$t('login'):$t('register')}}</view>
			<view class="tip">{{type==1?$t('noAccount'):$t('haveAccount')}}<text @click="change">{{type==1?$t('toRegister'):$t('toLogin')}}</text></view>
		</view>
		<video id="video" :style="{height:clientHight+'px'}" src="@/static/video/rizhao.mp4" :controls="false" loop :muted="false" ref="video" class="video" />
	</view>
</template>
<script>
	export default {
		data() {
			return {
				clientHight: 0,
				type: 1,
				formData1: {
					name: '',
					password: ''
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
						}, {
							minLength: 6,
							maxLength: 18,
							errorMessage: '密码长度在 {minLength} 到 {maxLength} 个字符'
						}]
					}
				}
			}
		},
		onLoad() {
			const that = this
			setTimeout(() => {
				this.clientHight = window.innerHeight
				this.$refs.video.play()
				document.addEventListener("WeixinJSBridgeReady", function() {
					this.$refs.video.play()
				}, false)
			}, 0)
		},
		methods: {
			change() {
				this.formData1.name = ""
				this.formData1.password = ""
				this.type = this.type == 1 ? 2 : 1
			},
			submit() {
				this.$refs.form1.validate().then(res => {
					if (this.type == 1) {
						this.$post('user/login', {
							name: this.formData1.name,
							password: this.formData1.password
						}).then(res => {
							if (res.code == 200) {
								this.$login(res.data)
								this.jump('/user/user')
							} else {
								this.toast(res.msg)
							}
						})
					} else {
						this.$post('user/add', {
							name: this.formData1.name,
							password: this.formData1.password
						}).then(res => {
							if (res.code == 200) {
								this.$login(res.data)
								this.jump('/user/user')
							} else {
								this.toast(res.msg)
							}
						})
					}
				}).catch(err => {})
			}
		}
	}
</script>
<style lang="scss">
	.container {
		overflow: hidden;
		.title {
			font-size: 40upx;
			font-weight: bold;
			padding: 100upx 75upx 0;
			color: #fff;
		}
		.formBox {
			margin: 100upx 75upx 20upx;
			/deep/ input {
				color: #fff;
			}
		}
		.xzwBtn_dark {
			height: 76upx;
			font-size: 32upx;
			border-radius: 36upx;
			margin: 0 75upx 30upx;
		}
		.tip {
			color: #fff;
			font-size: 26upx;
			text-align: center;
			text {
				color: $mainColor;
				margin: 0 0 0 10upx;
			}
		}
	}
	.main {
		position: absolute;
		z-index: 3;
		width: 100%;
	}
	video {
		margin: 0 auto;
		position: fixed;
		width: 100%;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 1;
		min-height: 100vh;
		background-color: #fff;
		transform: scaleY(1.3);
		&::before {
			position: absolute;
			content: '';
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			z-index: 2;
			background-color: rgba(0, 0, 0, 0.5);
		}
		/deep/ .uni-video-cover {
			display: none;
		}
	}
</style>