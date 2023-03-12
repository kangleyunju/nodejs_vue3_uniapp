<template>
	<div class="container">
		<div class="cont">
			<div class="label">ID</div>
			<div>{{userInfo.user_id}}</div>
		</div>
		<div class="cont">
			<div class="label">账号</div>
			<div>{{userInfo.name}}</div>
		</div>
		<div class="cont">
			<div class="label">昵称</div>
			<el-input v-model="userInfo.nickname" maxlength="11" clearable/>
		</div>
		<div class="cont">
			<div class="label">生日</div>
			<el-date-picker v-model="userInfo.birthday" type="date" placeholder="选择日期" :default-value="new Date(2010, 9, 1)"/>
		</div>
		<div class="cont">
			<div class="label">性别</div>
			<el-select v-model="userInfo.sex" placeholder="Select">
				<el-option label="男" value="1"/>
				<el-option label="女" value="2"/>
			</el-select>
		</div>
		<div class="cont cont2">
			<div class="label">头像</div>
			<el-upload action="" :show-file-list="false" :before-upload="uploadFace" :limit="1" accept="image/*">
				<img v-if="userInfo.face&&userInfo.face!=''" :src="userInfo.face" class="avatar" />
				<view class="uploader" v-else><el-icons name="plus"/></view>
			</el-upload>
		</div>
		<el-button @click="save" type="primary">保存</el-button>
	</div>
</template>
<script lang="ts">
	import {reactive ,onMounted,getCurrentInstance } from "vue";
	import { ElMessage } from "element-plus";
	import { useStore } from "vuex";
	export default({
		setup() {
			const that=getCurrentInstance().appContext.config.globalProperties
			const store = useStore();
			let userInfo = reactive({
				user_id:'',
				name:'',
				nickname:'',
				face:'',
				sex:'',
				birthday:''
			})
				
			const save=()=>{
				that.$post('user/edit',{
					user_id:userInfo.user_id,
					name:userInfo.name,
					nickname:userInfo.nickname,
					face:userInfo.face,
					birthday:that.changeTime(userInfo.birthday),
					sex:userInfo.sex=='未知'?0:userInfo.sex=='男'?1:2
				}).then(res => {
					if (res.code == 200) {
						ElMessage.success(res.msg)
						store.commit("login", res.data);
					}else{
						ElMessage.error(res.msg)
					}
				})
			}

			const uploadFace = (file) => {
				that.$uploadImg(file)
				.then(res => {
					if(res.code==200){
						userInfo.face=res.data.path
					}else{
						ElMessage.error(res.msg)
					}
				})
				return false//加上这个，不用走到action的自动上传
			}
			onMounted(() => {
				that.$get('user/person',{
					user_id:store.state.userInfo.user_id
				}).then(res => {
          console.log(1111,res)
					if (res.code == 200) {
						userInfo.user_id=res.data.user_id
						userInfo.face=res.data.face
						userInfo.name=res.data.name
						userInfo.nickname=res.data.nickname
						userInfo.birthday=res.data.birthday
						userInfo.sex=res.data.sex==0?'未知':res.data.sex==1?'男':'女'
					}else{
						ElMessage.error(res.msg)
					}
				})
			})
			
			return {
				userInfo,
				uploadFace,
				save
			}
		}
	})
</script>
<style lang="scss">
	.container {
		background-color: #fff;
		padding: 0 20px 20px;
		box-sizing: border-box;
		.cont{
			display: flex;
			align-items: center;
			font-size: 15px;
			padding: 15px 0;
			.label{
				width: 60px;
				text-align: right;
				margin: 0 30px 0 0;
				font-weight: bold;
			}
			.el-input,.el-date-editor.el-input{
				width: 250px;
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
			&.cont2{
				align-items: flex-start;
			}
		}
		.el-button{
			margin: 0 0 0 50%;
			transform: translateX(-50%);
		}
	}
</style>
