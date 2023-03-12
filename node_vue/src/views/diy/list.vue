<template>
	<div class="container">
		<el-button type="primary" @click="add" class="addButton">新增</el-button>
		<el-table :data="list" border header-cell-class-name="table-header">
			<el-table-column prop="id" label="ID" align="center" min-width="80"></el-table-column>
			<el-table-column prop="name" label="名称" align="center" min-width="100"></el-table-column>
			<el-table-column prop="page_name" label="页面标题" align="center" min-width="100"></el-table-column>
			<el-table-column prop="path" label="页面路径" align="center" min-width="100"></el-table-column>
			<el-table-column prop="create_time" label="创建时间" align="center" min-width="180"></el-table-column>
			<el-table-column prop="update_time" label="更新时间" align="center" min-width="180"></el-table-column>
			<el-table-column label="操作" min-width="100" align="center">
				<template #default="scope">
					<el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="text" @click="handleDelete(scope.row.id,scope.$index)" class="red">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="pagination">
			<el-pagination background layout="total, prev, pager, next" :current-page="page" :page-size="row" :total="records" :page-count="total" @current-change="handlePageChange"/>
		</div>
	</div>
</template>
<script lang="ts">
	import {defineComponent,getCurrentInstance,ref} from "vue"
	import { useRouter } from "vue-router"
	import { ElMessage ,ElMessageBox} from "element-plus"
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
				that.$get('diy/list',{
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
				router.push('/diy/detail?id='+item.id)
			}
			const handlePageChange=(val)=>{
				page.value=val
				getList()
			}
			//添加页面
			const add=()=>{
				that.$post('diy/add')
				.then((res)=>{
					if(res.code==200){
						router.push('/diy/detail?id='+res.data.id)
					}else{
						ElMessage.error(res.msg);
					}
				})
			}
      //删除
      const handleDelete=(id,index)=>{
      	ElMessageBox.confirm('确定要删除吗?','提示',{
      		confirmButtonText: '确定',
      		cancelButtonText: '取消',
      		type: 'warning',
      		buttonSize:'default'
      	}).then(() => {
          that.$post('diy/remove',{
            id:id
          }).then((res)=>{
      			if(res.code==200){
              list.value.splice(index,1)
      			}else{
      				ElMessage.error(res.msg)
      			}
      		})
      	}).catch(() => {
      	
      	})
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
        handleDelete,
				add
			}
		}
	})
</script>
<style lang="scss" scoped>
	.container {
		.addButton{
			height: 32px;
			border-radius: 3px;
		}
		.el-table{
			margin:16px 0 0;
		}
	}
</style>
