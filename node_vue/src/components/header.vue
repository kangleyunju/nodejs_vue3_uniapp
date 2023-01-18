<template>
	<div class="headerContainer noCopy">
		<div class="header-left">
			<div class="switch-btn" @click="collapseChage">
				<el-icons name="expand" v-if="collapse"/>
				<el-icons name="fold" v-else/>
			</div>
			<div class="logo">后台管理系统</div>
		</div>

		<div class="header-right">
			<el-dropdown class="user-name" trigger="hover">
				<div class="info">
					<el-image :src="userInfo.face" fit="cover"/>
					{{ userInfo.nickname }}
					<el-icon><caret-bottom/></el-icon>
				</div>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item @click="goUser">个人中心</el-dropdown-item>
						<el-dropdown-item @click="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>
	</div>
</template>
<script lang="ts">
	import {defineComponent,ref,computed,onMounted ,getCurrentInstance,watch} from "vue";
	import {useRouter} from "vue-router";
	import {useStore} from "vuex";
	import face from '@/assets/img/face.jpg'
	export default defineComponent({
		setup() {
			const that=getCurrentInstance().appContext.config.globalProperties
			const router = useRouter();
			const store = useStore();
			let userInfo = store.state.userInfo
			
			watch(()=>store.state.userInfo,(n,o)=>{
				userInfo.nickname=n.nickname
				userInfo.face=n.face
			},{deep:true})
			
			const goUser=()=>{
				router.push('/user/center')
			}

			const logout=()=>{
				router.push('/login')
				store.commit("logout");
			}

			const collapse = computed(() => store.state.collapse);

			// vuex点击侧边栏折叠
			const collapseChage = () => {
				const data = !collapse.value;
				store.commit("handleCollapse", data);
			};
			//宽度小于1200,默认折叠
			onMounted(() => {
				if (document.body.clientWidth < 1200) {
					collapseChage();
				}
			});

			return {
				goUser,
				logout,
				userInfo,
				collapse,
				collapseChage
			}
		}
	});
</script>
<style lang="scss" scoped>
	.headerContainer {
		width: 100%;
		height: 70px;
		min-width: 400px;
		font-size: 22px;
		color: #fff;
		position: fixed;
		top:0;
		left: 0;
		right: 0;
		z-index: 100;
		box-sizing: border-box;
		background-color: #242f42;
		display: flex;
		justify-content: space-between;
		padding: 0 25px;
		.header-left {
			display: flex;
			align-items: center;
			.switch-btn {
				cursor: pointer;
				display: flex;
				align-items: center;
				margin: 0 12px 0 0;
			}
		}
		.header-right {
			.user-name {
				color: #fff;
				cursor: pointer;
				height: 70px;
				display: flex;
				align-items: center;
				.info{
					display: flex;
					align-items: center;
				}
				.el-image {
					display: block;
					width: 40px;
					height: 40px;
					border-radius: 50%;
					margin: 0 10px 0 0;
				}
			}
		}
	}
</style>
