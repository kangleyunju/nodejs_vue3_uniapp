<template>
	<view class="diy-image">
		<move-handle @choose="choose" :dat="dat">
			<view class="diy-imageBox" :style="{paddingTop:dat.paddingTop+'upx',paddingBottom:dat.paddingBottom+'upx'}">
				<view class="blockTitle" v-if="dat.titleShow&&dat.title!=''"><text></text>{{dat.title}}</view>
				<view v-if="dat.imgType==1" class="type1">
					<view v-for="(item,index) in dat.imgArr" :key="index" :style="{backgroundImage:'url(' + item.img+ ')',height:dat.height*2+'upx',borderRadius:dat.radius+'upx'}" :class="{empty:item.img==''}" class="item" @click="goIcon(item.url)">
						<text v-if="item.img==''&&show">355*{{dat.height}}</text>
					</view>
				</view>
				<view v-if="dat.imgType==2" class="type2">
					<view v-for="(item,index) in dat.imgArr" :key="index" :style="{backgroundImage:'url(' + item.img+ ')',height:dat.height*2+'upx',borderRadius:dat.radius+'upx'}" :class="{empty:item.img==''}" class="item" @click="goIcon(item.url)">
						<text v-if="item.img==''&&show">175*{{dat.height}}</text>
					</view>
				</view>
				<view v-if="dat.imgType==3" class="type3">
					<view class="left item" v-if="index==0" v-for="(item,index) in dat.imgArr" :key="index" :style="{backgroundImage:'url(' + item.img+ ')',height:dat.height*2+'upx',borderRadius:dat.radius+'upx'}" :class="{empty:item.img==''}" @click="goIcon(item.url)">
						<text v-if="item.img==''&&show">175*{{dat.height}}</text>
					</view>
					<view class="right">
						<view v-if="index>0" v-for="(item,index) in dat.imgArr" :key="index" :style="{backgroundImage:'url(' + item.img+ ')',height:(dat.height*2-10)/2+'upx',borderRadius:dat.radius+'upx'}" :class="{empty:item.img==''}" class="item" @click="goIcon(item.url)">
							<text v-if="item.img==''&&show">175*{{(dat.height*2-10)/4}}</text>
						</view>
					</view>
				</view>
				<view v-if="dat.imgType==4" class="type4">
					<view class="right">
						<view v-if="index<2" v-for="(item,index) in dat.imgArr" :key="index" :style="{backgroundImage:'url(' + item.img+ ')',height:(dat.height*2-10)/2+'upx',borderRadius:dat.radius+'upx'}" :class="{empty:item.img==''}" class="item" @click="goIcon(item.url)">
							<text v-if="item.img==''&&show">175*{{(dat.height*2-10)/4}}</text>
						</view>
					</view>
					<view v-if="index==2" class="left item" v-for="(item,index) in dat.imgArr" :key="index" :style="{backgroundImage:'url(' + item.img+ ')',height:dat.height*2+'upx',borderRadius:dat.radius+'upx'}" :class="{empty:item.img==''}" @click="goIcon(item.url)">
						<text v-if="item.img==''&&show">175*{{dat.height}}</text>
					</view>
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
		data(){
			return{
				show:false
			}

		},
		methods: {
			choose() {
				this.$emit('getUnique', this.dat,this.index)
			}
		},
		created() {
			if(this.$state.editStatus){
				this.show=true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.diy-imageBox{
		width: 710upx;
		margin: 0 20upx;
		.blockTitle{
			display: flex;
			align-items: center;
			font-size: 30upx;
			font-weight: bold;
			padding: 15upx 20upx;
			text {
				height: 30upx;
				width: 8upx;
				border-radius: 10upx;
				background-color: $mainColor;
				margin: 0 15upx 0 0;
			}
		}
		.type1,.type2,.type3,.type4{
			.item{
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 26upx;
				background-position: center;
				background-size: 100% auto;
				background-repeat: no-repeat;
				&.empty{
					background-color: #e8f3fe;
				}
			}
		}
		.type1{
			view{
				width: 710upx;
				margin-bottom: 10upx;
				&:last-child{
					margin: 0;
				}
			}
		}
		.type2{
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			view{
				width: 350upx;
			}
		}
		.type3,.type4{
			display: flex;
			justify-content: space-between;
			view{
				width: 350upx;
			}
			.right{
				display: flex;
				justify-content: space-between;
				flex-direction: column;
				view:nth-child(1){
					margin-bottom: 10upx;
				}
			}
		}
	}
</style>
