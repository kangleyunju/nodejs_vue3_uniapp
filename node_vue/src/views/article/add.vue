<template>
	<div class="container">
		<div class="cont">
			<div class="label">标题</div>
			<el-input v-model="form.title" clearable maxlength="30"/>
		</div>
		<div class="cont">
			<div class="label">内容</div>
			<div ref="editor" class="editor"></div>
		</div>
		<div class="cont last">
			<div>是否开启</div>
			<el-switch v-model="form.status" active-text="是" inactive-text="否" inline-prompt @change="change"/>
		</div>
		<el-button type="primary" @click="save">保存</el-button>
	</div>
</template>
<script lang="ts">
	import {ref, reactive ,onMounted,getCurrentInstance} from "vue";
	import { useRoute ,useRouter} from 'vue-router'
	import { ElMessage } from "element-plus";
	import wangeditor from "wangeditor";
	export default({
		setup() {
			const that=getCurrentInstance().appContext.config.globalProperties
			const route = useRoute()
			const router = useRouter()
			const id= ref('')
			let div = ref('')
			let editor= ref(null)
			const form = reactive({
				title:'',
				content:'',
				status:true
			});
				
			const change=(e)=>{
				form.status=e
			}
			const save=()=>{
				form.content=editor.txt.html()
				if(form.title==''){
					ElMessage.error('标题必填')
				}else{
					if(id.value>0){
						that.$post('article/edit',{
							id:id.value,
							title:form.title,
							content:form.content,
							status:form.status?1:2
						}).then(res => {
							if (res.code == 200) {
								ElMessage.success(res.msg)
								router.push('/article/list')
							}else{
								ElMessage.error(res.msg)
							}
						})
					}else{
						that.$post('article/add',{
							title:form.title,
							content:form.content,
							status:form.status?1:2
						}).then(res => {
							if (res.code == 200) {
								ElMessage.success(res.msg)
								router.push('/article/list')
							}else{
								ElMessage.error(res.msg)
							}
						})
					}
				}
			}
			const initEidtor=(content)=>{
				editor = new wangeditor(editor.value)

				editor.config.menus = [
					'head', // 标题  
					'bold', // 粗体  
					'fontSize', // 字号  
					'fontName', // 字体  
					'italic', // 斜体  
					'underline', // 下划线  
					'strikeThrough', // 删除线  
					'foreColor', // 文字颜色  
					'backColor', // 背景颜色  
					'link', // 插入链接  
					'list', // 列表  
					'justify', // 对齐方式  
					'quote', // 引用  
					// 'emoticon', // 表情,插入会报错,先注释
					'image', // 插入图片  
					'table', // 表格
					'video', // 插入视频  
					'code', // 插入代码  
					'undo', // 撤销  
					'redo', // 重复
					'fullscreen' // 全屏
				]
				editor.config.zIndex = 1// 改变层级
				editor.config.uploadImgServer = that.baseUrl+'/upload'// 填写配置服务器端地址  
				editor.config.uploadFileName = 'file' // 后端接受上传文件的参数名  
				editor.config.showLinkImg = false// 隐藏网络图片
				editor.config.uploadImgMaxLength = 1 // 限制一次最多上传 1 张图片 
				editor.config.uploadImgMaxSize = 0.5 * 1024 * 1024 // 将图片大小限制为 500kb
				editor.config.uploadImgHooks = {
					fail: (xhr, editor, result) => {   
						console.log('插入图片失败回调')
					},  
					success: (xhr, editor, result) => {  
						console.log('图片上传成功回调')
					},  
					timeout: (xhr, editor) => {   
						console.log('网络超时的回调')
					},  
					error: (xhr, editor) => {  
						console.log('图片上传错误的回调')
					},  
					customInsert: (insertImg, result, editor) => {  
						if(result.code==200){
							insertImg(result.data.path)  
						}else{
							ElMessage.error(result.msg)
						}
					} 
				}
				editor.create()
				if(content){
					editor.txt.html(content)
				}
			}
			onMounted(() => {
				if(route.query.id){
					id.value=route.query.id
					that.$get('article/detail',{
						id:id.value
					}).then(res => {
						if (res.code == 200) {
							form.title= res.data.title
							form.status= res.data.status==1?true:false
							initEidtor(res.data.content)
						}else{
							ElMessage.error(res.msg)
						}
					})
				}else{
					initEidtor()
				}
			})

			return {
				div,
				editor,
				form,
				change,
				save,
				initEidtor
			}
		}
	})
</script>
<style lang="scss" scoped>
	.container {
		background-color: #fff;
		padding: 10px 20px 20px;
		box-sizing: border-box;
		.cont{
			font-size: 15px;
			.label{
				width: 120px;
				font-weight: bold;
				line-height: 40px;
				margin: 0 0 0 4px;
			}
			.el-input{
				width: 100%;
			}
			&.last{
				display: flex;
				align-items: center;
				font-weight: bold;
				margin: 10px 0 30px;
				.el-switch{
					margin: 0 0 0 20px;
				}
			}
		}
		.el-button{
			margin: 0 0 0 50%;
			transform: translateX(-50%);
		}
	}
</style>
