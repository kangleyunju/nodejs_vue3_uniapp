<template>
	<div class="container">
		<div class="cont">
			<div class="label">是否开启商品审核</div>
			<el-switch v-model="form.isReview" active-text="是" inactive-text="否" inline-prompt @change="change"/>
		</div>
		<div class="cont">
			<div class="label">是否开启微信登录</div>
			<el-switch v-model="form.isWxLogin" active-text="是" inactive-text="否" inline-prompt @change="change"/>
		</div>
		<div class="cont">
			<div class="label">默认头像</div>
			<el-upload action="" :show-file-list="false" :before-upload="uploadFace" :limit="1" accept="image/*">
				<img v-if="form.avatar&&form.avatar!=''" :src="form.avatar" class="avatar" />
				<view class="uploader" v-else><el-icons name="plus"/></view>
			</el-upload>
		</div>
	</div>
</template>
<script lang="ts">
	import {reactive ,onMounted,getCurrentInstance} from "vue";
	import { ElMessage } from "element-plus";
	export default({
		setup() {
			const that=getCurrentInstance().appContext.config.globalProperties

			const form = reactive({
				isReview:false,
				isWxLogin:false,
				avatar:''
			});

				
			const change=(e,type)=>{
				that.$post('sys/edit',{
					isReview:form.isReview,
					isWxLogin:form.isWxLogin,
					avatar:form.avatar
				}).then(res => {
					if (res.code !== 200) {
						ElMessage.error(res.msg)
					}
				})
			}

			const uploadFace = (file) => {
				that.$uploadImg(file)
				.then(res => {
					if(res.code==200){
						form.avatar=res.data.path
						change()
					}else{
						ElMessage.error(res.msg)
					}
				})
				return false//加上这个，不用走到action的自动上传
			}
			onMounted(() => {
				that.$get('sys/list')
				.then(res => {
					if (res.code == 200) {
						form.isReview=res.data.isReview
						form.isWxLogin=res.data.isWxLogin
						form.avatar=res.data.avatar
					}else{
						ElMessage.error(res.msg)
					}
				})
			})
			
			return {
				change,
				form,
				uploadFace,
			}
		}
	})
</script>
<style lang="scss" scoped>
	.container {
		background-color: #fff;
		padding: 0 20px;
		box-sizing: border-box;
		.cont{
			display: flex;
			font-size: 15px;
			padding: 15px 0;
			.label{
				width: 120px;
				text-align: right;
				margin: 5px 20px 0 0;
			}
			.uploader{
				width: 100px;
				height: 100px;
				display: flex;
				align-items: center;
				justify-content: center;
				border: 1px solid #d9d9d9;
				font-size: 20px;
			}
			.avatar{
				width: 100px;
				height: 100px;
			}
		}
	}
</style>
