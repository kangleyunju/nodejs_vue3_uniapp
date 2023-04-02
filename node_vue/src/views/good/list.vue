<template>
	<div class="goodsListcontainer">
		<div class="topBox">
			<el-input v-model="keyword" placeholder="搜索商品名称" clearable maxlength="50" @clear="getList(2)">
				<template #prepend>
					<el-select v-model="searchType" placeholder="Select" @change="getList(2)">
						<el-option label="全部" value="-1" />
						<el-option label="审核中" value="0" />
						<el-option label="审核失败" value="1" />
						<el-option label="销售中" value="2" />
						<el-option label="下架" value="3" />
						<el-option label="删除" value="4" />
					</el-select>
				</template>
				<template #append>
					<el-button icon="Search" type="primary" @click="getList(2)" />
				</template>
			</el-input>
		</div>
		<el-table :data="list" border>
			<el-table-column prop="product_id" label="商品id" align="center" min-width="80"></el-table-column>
			<el-table-column prop="product_name" label="商品名称" align="center" min-width="140" show-overflow-tooltip></el-table-column>
			<el-table-column prop="store_name" label="店铺" align="center" min-width="100"></el-table-column>
			<el-table-column prop="like" label="收藏" align="center" min-width="100"></el-table-column>
			<el-table-column label="状态" align="center" min-width="100">
				<template #default="scope">
					<el-tag :type="scope.row.status==2?'success':scope.row.status==0?'info':scope.row.status==1?'warning':'danger'">
						{{ scope.row.status==0?'审核中':scope.row.status==1?'审核失败':scope.row.status==2?'销售中':scope.row.status==3?'下架':'删除'}}
					</el-tag>
				</template>
			</el-table-column>
			<el-table-column prop="create_time" label="发布时间" align="center" min-width="180"></el-table-column>
			<el-table-column prop="update_time" label="更新时间" align="center" min-width="180"></el-table-column>
			<el-table-column label="操作" min-width="180" align="center">
				<template #default="scope">
					<el-button type="text" icon="Edit" @click="handleEdit(scope.row)">编辑</el-button>
					<el-button type="text" icon="Setting" @click="examine(scope.row,scope.$index)" style="color:#5c9a2c" v-if="scope.row.status==0">审核</el-button>
					<el-button type="text" icon="Setting" @click="change(scope.row,scope.$index,2)" style="color:#5c9a2c" v-if="scope.row.status==3">上架</el-button>
					<el-button type="text" icon="Setting" @click="change(scope.row,scope.$index,3)" style="color:#5c9a2c" v-if="scope.row.status==4">恢复</el-button>
					<el-button type="text" icon="Delete" @click="handleDelete(scope.row.product_id,scope.$index)" class="red" v-if="scope.row.status!=4">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="pagination">
			<el-pagination background layout="total, prev, pager, next,jumper" :current-page="page" :page-size="row" :total="records" :page-count="total" @current-change="handlePageChange" />
		</div>
		<!-- 审核 -->
		<el-dialog title="审核" v-model="shenHe" width="380px">
			<div class="option">
				<el-radio v-model="isable" :label="true" size="default" border>通过</el-radio>
				<el-radio v-model="isable" :label="false" size="default" border>不通过</el-radio>
			</div>
			<template #footer>
				<div class="el-dialog__footer">
					<el-button @click="shenHe = false">取 消</el-button>
					<el-button type="primary" @click="confirm">确 定</el-button>
				</div>
			</template>
		</el-dialog>
	</div>
</template>
<script lang="ts">
	import { defineComponent, getCurrentInstance, ref } from "vue";
	import { useRouter } from "vue-router";
	import { ElMessage, ElMessageBox } from "element-plus";
	import { Search } from '@element-plus/icons-vue'
	export default defineComponent({
		setup() {
			const that = getCurrentInstance().appContext.config.globalProperties
			const router = useRouter();
			let searchType = ref('-1')
			let list = ref([])
			let page = ref(1)
			let row = ref(10)
			let records = ref(1)
			let total = ref(1)
			let keyword = ref('')
			let value = ref('')
			let shenHe = ref(false)
			let isable = ref(true)
			let activeObj = ref({
				index: 0,
				data: {}
			})
			const getList = (e) => {
				if (e == 2) {
					page.value = 1
				}
				let data = {
					page: page.value,
					row: row.value,
					keyword: keyword.value
				}
				if (searchType.value > -1) {
					data.status = searchType.value
				}
				that.$get('good/list', data).then((res) => {
					if (res.code == 200) {
						list.value = res.data
						records.value = res.records
						total.value = res.total
					} else {
						ElMessage.error(res.msg)
					}
				})
			}
			const handleEdit = (item) => {
				router.push('/good/add?id=' + item.product_id)
			}
			const examine = (item, index) => {
				activeObj.value.item = item,
					activeObj.value.index = index
				shenHe.value = true
			}
			const handlePageChange = (val) => {
				page.value = val
				getList()
			}
			const change = (item, index, type) => {
				that.$post('good/status', {
					product_id: item.product_id,
					status: type
				}).then((res) => {
					if (res.code == 200) {
						list.value[index].status = res.data.status
					} else {
						ElMessage.error(res.msg);
					}
				})
			}
			const confirm = () => {
				that.$post('good/status', {
					product_id: activeObj.value.item.product_id,
					status: isable.value ? 2 : 1
				}).then((res) => {
					if (res.code == 200) {
						list.value[activeObj.value.index].status = res.data.status
						shenHe.value = false
					} else {
						ElMessage.error(res.msg);
					}
				})
			}
			const handleDelete = (id, index) => {
				ElMessageBox.confirm('确定要删除吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					buttonSize: 'default'
				}).then(() => {
					that.$post('good/status', {
						product_id: id,
						status: 4
					}).then((res) => {
						if (res.code == 200) {
							list.value[index].status = res.data.status
						} else {
							ElMessage.error(res.msg);
						}
					})
				}).catch(() => {})
			}
			getList()
			return {
				searchType,
				shenHe,
				isable,
				activeObj,
				keyword,
				page,
				row,
				records,
				total,
				list,
				getList,
				handleEdit,
				handlePageChange,
				examine,
				confirm,
				handleDelete,
				change
			}
		}
	})
</script>
<style lang="scss">
	.goodsListcontainer {
		.topBox {
			display: flex;
			align-items: center;
			margin: 0 0 15px;
			.el-input {
				width: 400px;
			}
			.el-input__inner {
				border-radius: 0;
			}
			.el-button {
				border-radius: 0 3px 3px 0;
			}
			.el-select {
				width: 100px;
				.el-input {
					width: 100px;
					input {
						border-radius: 3px 0 0 3px;
					}
				}
			}
		}
	}
</style>
