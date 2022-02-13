<template>
	<div class="container">
		<div class="cont">
			<div class="label">标题</div>
			<el-input v-model="form.title" clearable/>
		</div>
		<div class="cont">
			<div class="label">内容</div>
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
	export default ({
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
			
			
			// const editor = ref(null);
			let aaa = ref('');
			const content = reactive({
				html: "",
				text: "",
			});

			let instance;
			onMounted(() => {
				instance = new wangeditor(editor.value);
				instance.config.zIndex = 1;
				instance.create();
			});
			// onBeforeUnmount(() => {
			//     instance.destroy();
			//     instance = null;
			// });
			const save = () => {
				form.content = instance.txt.html();
				console.log(form.content);
			};
			return {
				form,
				editor,
				content,
				aaa,
				save
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

