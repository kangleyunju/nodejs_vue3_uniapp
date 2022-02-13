<template>
	<div class="container">
		<el-button type="primary" @click="add">新增</el-button>
		<el-table :data="list" border header-cell-class-name="table-header">
			<el-table-column prop="id" label="ID" align="center" min-width="80"></el-table-column>
			<el-table-column prop="title" label="标题" align="center" min-width="100" show-overflow-tooltip></el-table-column>
			<el-table-column prop="author" label="作者" align="center" min-width="100"></el-table-column>
			<el-table-column prop="view" label="浏览" align="center" min-width="100"></el-table-column>
			<el-table-column prop="like" label="收藏" align="center" min-width="100"></el-table-column>
			<el-table-column label="状态" align="center">
				<template #default="scope">
					<el-tag :type="scope.row.status==1?'success':'danger'">
						{{ scope.row.status==1?'开启':'禁用'}}
					</el-tag>
				</template>
			</el-table-column>
			<el-table-column prop="create_time" label="创建时间" align="center" min-width="180"></el-table-column>
			<el-table-column prop="update_time" label="更新时间" align="center" min-width="180"></el-table-column>
			<el-table-column label="操作" min-width="100" align="center">
				<template #default="scope">
					<el-button type="text" icon="Edit" @click="handleEdit(scope.row)">编辑</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="pagination">
			<el-pagination hide-on-single-page background layout="total, prev, pager, next" :current-page="page" :page-size="row" :total="records" :page-count="total" @current-change="handlePageChange"/>
		</div>
	</div>
</template>
<script lang="ts">
	import {defineComponent,getCurrentInstance,ref} from "vue";
	import { useRouter } from "vue-router";
	export default defineComponent({
		setup() {
			const that=getCurrentInstance().appContext.config.globalProperties
			const router = useRouter();
			let list=ref([])
			let page=ref(1)
			let row=ref(10)
			let records=ref(1)
			let total=ref(1)
			const getList=()=>{
				that.$get('article/list',{
					page:page.value,
					row:row.value
				}).then((res)=>{
					if(res.code==200){
						list.value= res.data
						records.value=res.records
						total.value=res.total
					}else{
						ElMessage.error(res.msg);
					}
				})
			}
			const handleEdit=(item)=>{
				router.push('/article/add?id='+item.id)
			}
			const handlePageChange=(val)=>{
				page.value=val
				getList()
			}
			//添加页面
			const add=()=>{
				router.push('/article/add')
			}
			getList()
			
			return {
				page,
				row,
				records,
				total,
				list,
				getList,
				handleEdit,
				handlePageChange,
				add
			}
		}
	})
</script>
<style lang="scss" scoped>
	.container {
		.el-table{
			margin:20px 0 0;
		}
	}
</style>
