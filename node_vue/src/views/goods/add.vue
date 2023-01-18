<template>
	<div class="container">
		<div class="cont">
			<div class="label">商品名称</div>
			<el-input v-model="form.product_name" clearable maxlength="30"/>
		</div>
		<div class="cont">
			<div class="label">商品描述</div>
			<el-input v-model="form.product_desc" clearable maxlength="30"/>
		</div>
		<div class="cont">
			<div class="label">商品图片</div>
			<div class="imgBox">
				<div v-for="(item,index) in form.product_imgs" :key="index" class="item" :class="{active:index==0}">
					<el-image :src="item" fit="cover"/>
					<el-icons name="CircleCloseFilled" @click="deleteItem(index)" class="close"/>
					<div class="tag" @click="beMain(index)">{{index==0?'主图':'设为主图'}}</div>
				</div>
				<el-upload action="" :show-file-list="false" :before-upload="uploadFace" :limit="1" accept="image/*" v-if="form.product_imgs.length<5">
					<view class="item"><el-icons name="plus"/></view>
				</el-upload>
			</div>
		</div>
		<div class="cont">
			<div class="label">原价</div>
			<el-input v-model="form.origin_price" clearable maxlength="8"/>
		</div>
		<div class="cont">
			<div class="label">销售价</div>
			<el-input v-model="form.sale_price" clearable maxlength="8"/>
		</div>
		<div class="cont">
			<div class="label">商品详情</div>
			<div ref="editor" class="editor"></div>
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
			const product_id= ref('')
			let div = ref('')
			let editor= ref(null)
			const form = reactive({
				product_name:'',
				product_desc:'',
				product_detail:'',
				origin_price:0,
				sale_price:0,
				product_image:'',
				product_imgs:[]
			});
			const deleteItem=(index)=>{
				form.product_imgs.splice(index,1)
			}

			const beMain=(e)=>{
				if(e>0){
					let tmp=form.product_imgs[e]
					form.product_imgs.splice(e,1)
					form.product_imgs.unshift(tmp)
				}
			}
			const uploadFace = (file) => {
				that.$uploadImg(file)
				.then(res => {
					if(res.code==200){
						form.product_imgs.push(res.data.path)
					}else{
						ElMessage.error(res.msg)
					}
				})
				return false//加上这个，不用走到action的自动上传
			}
			const save=()=>{
				form.product_detail=editor.txt.html()
				if(form.product_name==''){
					ElMessage.error('商品名称必填')
				}else if(form.product_imgs.length==0){
					ElMessage.error('请上传商品图片')
				}else{
					if(product_id.value>0){
						that.$post('goods/edit',{
							product_id:product_id.value,
							product_name:form.product_name,
							product_desc:form.product_desc,
							product_detail:form.product_detail,
							origin_price:form.origin_price,
							sale_price:form.sale_price,
							product_imgs:form.product_imgs
						}).then(res => {
							if (res.code == 200) {
								ElMessage.success(res.msg)
								router.push('/goods/list')
							}else{
								ElMessage.error(res.msg)
							}
						})
					}else{
						that.$post('goods/add',{
							product_name:form.product_name,
							product_desc:form.product_desc,
							product_detail:form.product_detail,
							origin_price:form.origin_price,
							sale_price:form.sale_price,
							product_imgs:form.product_imgs
						}).then(res => {
							if (res.code == 200) {
								ElMessage.success(res.msg)
								router.push('/goods/list')
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
					// 'head', // 标题  
					// 'bold', // 粗体  
					// 'fontSize', // 字号  
					// 'fontName', // 字体  
					// 'italic', // 斜体  
					// 'underline', // 下划线  
					// 'strikeThrough', // 删除线  
					// 'foreColor', // 文字颜色  
					// 'backColor', // 背景颜色  
					// 'link', // 插入链接  
					// 'list', // 列表  
					// 'justify', // 对齐方式  
					// 'quote', // 引用  
					// 'emoticon', // 表情  
					'image', // 插入图片  
					// 'table', // 表格
					// 'video', // 插入视频  
					// 'code', // 插入代码  
					// 'undo', // 撤销  
					// 'redo', // 重复
					// 'fullscreen' // 全屏
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
					product_id.value=route.query.id
					that.$get('goods/detail',{
						product_id:product_id.value
					}).then(res => {
						if (res.code == 200) {
							form.product_name= res.data.product_name
							form.product_desc= res.data.product_desc
							form.product_detail= res.data.product_detail
							form.product_imgs= res.data.product_imgs
							form.origin_price= res.data.origin_price
							form.sale_price= res.data.sale_price
							initEidtor(res.data.product_detail)
						}else{
							ElMessage.error(res.msg)
						}
					})
				}else{
					initEidtor()
				}
			})

			return {
				product_id,
				div,
				editor,
				form,
				save,
				initEidtor,
				uploadFace,
				deleteItem,
				beMain
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
				width: 100px;
				font-weight: bold;
				line-height: 40px;
				margin: 0 0 0 4px;
			}
			.el-input{
				width: 100%;
			}
			.imgBox{
				display: flex;
				align-items: center;
				.item{
					width: 104px;
					height: 104px;
					display: flex;
					align-items: center;
					justify-content: center;
					border: 2px solid #d9d9d9;
					font-size: 20px;
					box-sizing: border-box;
					margin: 0 10px 0 0;
					position: relative;
					.close{
						position: absolute;
						right: -10px;
						top:-10px;
						z-index: 1;
						color:#bbb;
						background-color: #fff;
						border-radius: 50%;
						display: none;
						&:hover{
							display: block;
							color: #555;
						}
					}
					.tag{
						position: absolute;
						bottom: 0;
						left: 0;
						right: 0;
						background-color: #559fff;
						color: #fff;
						font-size: 10px;
						height: 0;
						line-height: 18px;
						text-align: center;	
						transition: all 0.2s ease-in;
					}
					&.active{
						border-color: #ff4545 !important;
						.tag{
							background-color: #ff4545;
						}	
					}
					.el-image{
						width: 98px;
						height: 98px;
					}
					&:hover{
						border-color: #559fff;
						.close{
							display: block;
						}
						.tag{
							height: 18px;
							transition: all 0.2s ease-in;
						}
					}
				}
			}
		}
		.el-button{
			margin: 20px 0 0 50%;
			transform: translateX(-50%);
		}
	}
</style>
