<template>
	<view class="container">
		<view class="bgBox" :style="{background:background_color}"></view>
		<view class="headerBox">
			<view class="searchLineIn" @click="goIcon('/goods/search')">
				<uni-icons type="search" size="16" class="searchIcon" color="#999"/>
				<view class="word">搜索</view>
			</view>
		</view>
		<view class="main" id="xzw_sortable">
			<view v-for="(item,index) in list" :key="index" >
				<diy-swiper v-if="item.sorts=='diy-swiper'" :dat="item" :index="index" @getUnique="activeGetUnique"/>
				<diy-notice v-if="item.sorts == 'diy-notice'" :dat="item" :index="index" @getUnique="activeGetUnique"/>
				<diy-empty v-if="item.sorts == 'diy-empty'" :dat="item" :index="index" @getUnique="activeGetUnique"/>
				<diy-entry v-if="item.sorts == 'diy-entry'" :dat="item" :index="index" @getUnique="activeGetUnique"/>
				<diy-image v-if="item.sorts == 'diy-image'" :dat="item" :index="index" @getUnique="activeGetUnique"/>
				<diy-goods v-if="item.sorts == 'diy-goods'" :dat="item" :index="index" @getUnique="activeGetUnique"/>
				<diy-cate v-if="item.sorts == 'diy-cate'" :dat="item" :index="index" @getUnique="activeGetUnique"/>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background_color:'',
				list:[],
				id:1
			}
		},
		methods: {
			async getList(){
				await this.getDiy(this.id);
				this.list=this.diyData.sorts
				this.background_color=this.diyData.background_color
				// #ifdef H5
				window.addEventListener('message', this.acceptMessage)
				uni.setNavigationBarTitle({
					title:this.diyData.page_name||this.baseName
				})
				// #endif
			}
		},
		watch:{
			'diyData.sorts': {
				handler:function(n,o){
					this.list=[]
					this.$nextTick(function(){
						this.list=n
					})
				}
			},
			'diyData.background_color': {
				handler:function(n,o){
					this.background_color=n
				}
			}
		},
		onLoad(e) {
			if(e.edit==1){
				this.$change({
					name:'editStatus',
					value:true
				})
				uni.hideTabBar()
			}
			this.id=e.id?e.id:1
			this.getList()
		}
	}
</script>

<style lang="scss">
	.container{
		/* #ifdef APP-PLUS */
		padding-top: calc(var(--status-bar-height) + 190upx);
		/* #endif */
		/* #ifdef H5 */
		padding-top: 80upx;
		/* #endif */
		.bgBox{
			position: fixed;
			top:0;
			width: 100%;
			height: 100vh;
			z-index: -1;
		}
		.headerBox{
			background-color: $mainColor;
			/* #ifdef APP-PLUS */
			padding-top: var(--status-bar-height);
			/* #endif */
			position: fixed;
			top:0;
			width: 750upx;
			z-index: 10;
			height: 80upx;
			display: flex;
			align-items: center;
			justify-content: center;
			.searchLineIn{
				background-color: #fff;
				height: 56upx;
				font-size: 24upx;
				display: flex;
				align-items: center;
				margin: 0 20upx;
				padding: 0 20upx;
				color: #999;
				width: 100%;
				border-radius: 6upx;
				.word{
					margin: 0 0 0 14upx;
				}
			}
		}
	}
</style>
