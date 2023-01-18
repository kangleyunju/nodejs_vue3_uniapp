<template>
	<div class="tagsContainer">
		<view class="containerIn">
			<div class="tagItem" v-for="(item, index) in tagsList" :key="index" :class="{ 'active': isActive(item.path) }">
				<router-link :to="item.path" class="tagTitle">{{ item.title }}</router-link>
				<el-icons name="Close" @click="closeTags(index)" v-show="item.path != '/home'"/>
			</div>
			<div class="tag_right" v-if="tagsList.length>1">
				<el-dropdown>
				    <el-button type="primary">标签选项<el-icons name="ArrowDown"/></el-button>
				    <template #dropdown>
				        <el-dropdown-menu size="small">
				            <el-dropdown-item command="other"  @click="closeOther">关闭其他</el-dropdown-item>
				            <el-dropdown-item command="all" @click="closeAll">关闭所有</el-dropdown-item>
				        </el-dropdown-menu>
				    </template>
				</el-dropdown>
			</div>
		</view>
	</div>
</template>
<script lang="ts">
	import {defineComponent,computed} from "vue";
	import {useStore} from "vuex";
	import {useRoute,useRouter,onBeforeRouteUpdate,RouteLocationNormalizedLoaded,} from "vue-router";
	export default defineComponent({
		setup() {
			const store = useStore();
			const route = useRoute();
			const router = useRouter();

			const isActive = (path: string) => {
				return path === route.fullPath;
			};

			const tagsList = computed(() => store.state.tagsList);

			// 关闭标签
			const closeTags = (index: number) => {
				// 当前点击关闭前标签的路由数据
				const delItem = tagsList.value[index];
				store.commit("delTagsListItem", {
					index
				});
				// 当前点击关闭后标签的路由数据
				const item = tagsList.value[index] ?tagsList.value[index] :tagsList.value[index - 1];
				if (item) {
					delItem.path == route.fullPath && router.push(item.path);
				} else {
					// 当没有标签的时候默认跳转到首页
					router.push("/");
				}
			}

			// 设置标签
			const setTags = (route: RouteLocationNormalizedLoaded) => {
				const isExist = tagsList.value.some(
					(item: RouteLocationNormalizedLoaded) => item.path === route.fullPath
				);
				if (!isExist) {
					store.commit("setTagsListItem", {
						name: route.name,
						title: route.meta.title,
						path: route.fullPath,
					});
				}
			}
			
			// 关闭全部标签
			const closeAll = () => {
				store.commit("closeAll");
				router.push("/");
			}
			// 关闭其他标签
			const closeOther = () => {
				const curItem = tagsList.value.filter((item) => {
					return item.path === route.fullPath;
				});
				store.commit("closeOther", curItem);
			}

			setTags(route);

			onBeforeRouteUpdate((to) => {
				setTags(to);
			})

			return {
				tagsList,
				isActive,
				closeTags,
				closeAll,
				closeOther
			}
		}
	})
</script>
<style lang="scss" scoped>
	.tagsContainer {
		height: 40px;
		.containerIn{
			height: 40px;
			background: #fff;
			box-shadow: 0 4px 10px #ddd;
			display: flex;
			align-items: center;
			top:0;
			left: 0;
			right: 0;
			z-index: 10;
			padding: 0 10px;
			box-sizing: border-box;
			position: absolute;
			z-index: 80;
			.tagItem {
				margin: 0 5px 0 0;
				border-radius: 3px;
				font-size: 12px;
				height: 23px;
				overflow: hidden;
				cursor: pointer;
				border: 1px solid #e9eaec;
				background: #fff;
				padding: 0 5px 0 12px;
				color: #666;
				background-color: #f3f3f3;
				display: flex;
				align-items: center;
				-webkit-transition: all 0.2s ease-in;
				-moz-transition: all 0.2s ease-in;
				transition: all 0.2s ease-in;
				&:hover{
					border: 1px solid #409EFF;
					color: #409EFF;
					.tagTitle{
						color: #409EFF;
					}
				}
				.tagTitle {
					float: left;
					max-width: 80px;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					margin-right: 5px;
					color:#666;
					text-decoration: none;
				}
				.el-icon {
					&:hover {
						background-color: #ff120a;
						border-radius: 50%;
						color: #fff;
					}
				}
				&.active {
					background-color: #409EFF;
					.tagTitle{
						color:#f1f1f1;
					}
					.el-icon{
						color:#f1f1f1;
					}
				}
			}
			.tag_right {
			    position: absolute;
			    right: 0;
			    text-align: center;
			    box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
			    z-index: 10;
				height: 100%;
				padding: 0 10px;
				display: flex;
				align-items: center;
				background-color: #fff;
				.el-button{
					padding: 0 5px;
					height: 23px;
					font-size: 12px;
					border-radius: 3px;
				}
			}
		}
	}
</style>
