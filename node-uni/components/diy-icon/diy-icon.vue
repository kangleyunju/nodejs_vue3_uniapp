<template>
	<view class="diy-icon">
		<move-handle @choose="choose" :dat="dat">
			<view class="diy-iconBox" :style="{paddingTop:dat.paddingTop+'upx',paddingBottom:dat.paddingBottom+'upx'}">
				<view class="iconBox" v-if="iconShow==1">
					<view class="icon" @click="goIcon(item.url)" v-for="(item,index) in iconList" :key="index" :style="{width:100/(group/2)+'%'}">
						<image :src="item.img||'/static/icon/entrance.png'" mode="aspectFit"/>
						<view>{{item.name||'名称'}}</view>
					</view>
				</view>
				
				<swiper  :indicator-dots="false" :autoplay="false" circular @change="changeSwiper" v-if="iconShow==2">
					<swiper-item class="iconBox" v-for="(item,index) in iconList" :key="index">
						<view class="icon" v-for="(item2,index2) in item" :key="index2" @click="goIcon(item2.url)"  :style="{width:100/(group/2)+'%'}">
							<image :src="item2.img||'/static/icon/entrance.png'" mode="aspectFit"/>
							<view>{{item2.name||'名称'}}</view>
						</view>
					</swiper-item>
				</swiper>
				<view class="swiperLine" v-if="iconShow==2">
					<view :class="{active:activeIndex==index}" v-for="(item,index) in iconList" :key="index"></view>
				</view>
			</view>
		</move-handle>
	</view>
</template>

<script>
	export default {
		props: {
			dat: {},
			index: ''
		},
		data() {
			return {
				iconList:[],
				iconShow:0,
				activeIndex:0
			}
		},
		methods: {
			choose() {
				this.$emit('getUnique', this.dat,this.index)
			},
			changeSwiper(e){
				this.activeIndex=e.detail.current
			},
			solve(){
				var arr=this.dat.iconArr
				if(arr.length%8==0){
					this.group=8
				}else{
					this.group=10
				}
				if(arr.length>this.group&&this.dat.page){
					this.iconList=[]
					for(var i=0;i<arr.length;i+=this.group){
						this.iconList.push(arr.slice(i,i+this.group))
					}
					this.iconShow=2
				}else{
					this.iconList=arr
					this.iconShow=1
				}
			}
		},
		watch:{
			'dat.iconArr': {
				handler:function(n,o){
					this.solve()
				}
			}
		},
		created(){
			this.solve()
		}
	}
</script>

<style lang="scss" scoped>
	.diy-iconBox{
		.iconBox{
			display: flex;
			flex-wrap: wrap;
			.icon{
				width: 20%;
				height: 140upx;
				text-align: center;
				font-size: 22upx;
				box-sizing: border-box;
				margin: 0;
				image{
					display: block;
					height: 50upx;
					width: 50upx;
					margin: 20upx auto 14upx;
				}
			}
		}
		.swiperLine{
			margin: 10upx auto 20upx;
			display: flex;
			align-items: center;
			justify-content: center;
			view{
				height: 6upx;
				width: 36upx;
				background-color: #d8d8d8;
				border-radius: 20upx;
				&.active{
					background-color: $mainColor;
				}
			}
		}
	}
</style>
