<template>
	<div class="container">
		<el-table :data="list" border header-cell-class-name="table-header">
			<el-table-column prop="order_id" label="ID" align="center" min-width="80" />
			<el-table-column prop="order_no" label="订单编号" align="center" min-width="100" />
			<el-table-column prop="product_name" label="商品名称" align="center" min-width="100" />
			<el-table-column prop="pay_money" label="金额" align="center" min-width="100" />
			<el-table-column prop="create_time" label="下单时间" align="center" min-width="140" />
			<el-table-column prop="send_time" label="发货时间" align="center" min-width="140" />
			<el-table-column label="操作" min-width="100" align="center" fixed="right">
				<template #default="scope">
					<el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="pagination">
			<el-pagination background layout="total, prev, pager, next" :current-page="page" :page-size="row" :total="records" :page-count="total" @current-change="handlePageChange" />
		</div>
	</div>
</template>
<script lang="ts">
	import { defineComponent, getCurrentInstance, ref } from "vue"
	import { useRouter } from "vue-router"
	import { ElMessage, ElMessageBox } from "element-plus"
	export default defineComponent({
		setup() {
			const that = getCurrentInstance().appContext.config.globalProperties
			const router = useRouter();
			let list = ref([])
			let page = ref(1)
			let row = ref(10)
			let records = ref(1)
			let total = ref(1)
			const getList = () => {
				that.$get('order/list', {
					page: page.value,
					row: row.value
				}).then((res) => {
					if (res.code == 200) {
						list.value = res.data
						records.value = res.records
						total.value = res.total
					} else {
						ElMessage.error(res.msg);
					}
				})
			}
			const handleEdit = (item) => {
				ElMessage.warning('暂不支持');
			}
			const handlePageChange = (val) => {
				page.value = val
				getList()
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
				handlePageChange
			}
		}
	})
</script>
