<template>
	<div class="sidebar noCopy">
		<el-menu class="sidebar-el-menu" :collapse="collapse" :default-active="onRoutes" background-color="#324157" text-color="#fff" active-text-color="#20a0ff" unique-opened router>
			<template v-for="item in list">
				<template v-if="item.subs&&(!item.permission||(item.permission&&is_admin==1))">
					<el-sub-menu :index="item.index" :key="item.index">
						<template #title>
							<div class="iconBox">
								<el-icons :name="item.icon" />
							</div>
							<span>{{ item.title }}</span>
						</template>
						<div v-for="item2 in item.subs" :key="item2.index">
							<el-menu-item :index="item2.index">
								<div class="empty"></div>
								<span>{{ item2.title }}</span>
							</el-menu-item>
						</div>
					</el-sub-menu>
				</template>
				<template v-if="!item.subs&&(!item.permission||(item.permission&&is_admin==1))">
					<el-menu-item :index="item.index" :key="item.index">
						<div class="iconBox">
							<el-icons :name="item.icon" />
						</div>
						<span>{{ item.title }}</span>
					</el-menu-item>
				</template>
			</template>
		</el-menu>
	</div>
</template>
<script>
	import { computed, watch } from "vue"
	import { useStore } from "vuex"
	import { useRoute } from "vue-router"
	export default {
		setup() {
			const list = [{
				icon: "HomeFilled",
				index: "/home",
				title: "首页",
				permission: false
			}, {
				icon: "UserFilled",
				index: "user",
				title: "用户管理",
				permission: true,
				subs: [{
					index: "/user/list",
					title: "用户列表",
				}]
			}, {
				icon: "Goods",
				index: "good",
				title: "商品管理",
				subs: [{
					index: "/good/list",
					title: "商品列表"
				}, {
					index: "/good/add",
					title: "添加商品"
				}]
			}, {
				icon: "Cellphone",
				index: "diy",
				title: "装修管理",
				permission: true,
				subs: [{
					index: "/diy/list",
					title: "手机端装修"
				}]
			}, {
				icon: "Notebook",
				index: "article",
				title: "文章管理",
				permission: true,
				subs: [{
					index: "/article/list",
					title: "文章列表"
				}]
			}, {
				icon: "List",
				index: "order",
				title: "订单管理",
				permission: true,
				subs: [{
					index: "/order/list",
					title: "订单列表"
				}]
			}, {
				icon: "Setting",
				index: "/set",
				title: "系统设置",
				permission: true
			}]
			const route = useRoute();
			const onRoutes = computed(() => {
				return route.path;
			});
			const store = useStore();
			const is_admin = store.state.userInfo.is_admin
			const collapse = computed(() => store.state.collapse);
			return {
				is_admin,
				list,
				onRoutes,
				collapse
			}
		}
	}
</script>
<style lang="scss" scoped>
	.sidebar {
		display: block;
		position: fixed;
		left: 0;
		top: 70px;
		bottom: 0;
		overflow-y: scroll;
		z-index: 90;
		&::-webkit-scrollbar {
			width: 0;
		}
		.sidebar-el-menu:not(.el-menu--collapse) {
			width: 200px;
		}
		ul {
			height: 100%;
		}
		.empty {
			width: 10px;
		}
		.iconBox {
			width: 30px;
			transform: translateY(-2px);
		}
	}
</style>
