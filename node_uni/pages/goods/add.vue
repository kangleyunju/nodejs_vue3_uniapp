<template>
	<view class="container">
		<view class="main">
			<view class="line"><view class="label">{{$t('goodName')}}</view><textarea type="text" maxlength="50" auto-height v-model="product.product_name" placeholder="1-50字"/></view>
			<view class="line"><view class="label">{{$t('goodDesc')}}</view><textarea type="text" maxlength="50" auto-height v-model="product.product_desc" placeholder="0-50字"/></view>
			<view class="line">
				<view class="label">{{$t('goodMainImage')}}</view>
				<view class="upBox">
					<view class="img" v-if="product.product_image!=''">
						<image :src="product.product_image" mode="aspectFill" @click="previewImg(product.product_image)"/>
						<view class="close" @click="product.product_image=''"><uni-icons type="clear" size="20"/></view>
					</view>
					<view class="item xzw_center" @click="uploadImage" v-else>+</view>
				</view>
			</view>
			<view class="line"><view class="label">{{$t('originPrice')}}</view><input type="digit" maxlength="8" v-model="product.origin_price" @input="checkInput($event,1)" @blur="blur($event,1)"/></view>
			<view class="line"><view class="label">{{$t('salePrice')}}</view><input type="digit" maxlength="8" v-model="product.sale_price" @input="checkInput($event,2)" @blur="blur($event,2)"/></view>
			<view class="line">
				<view class="label">{{$t('goodDetail')}}</view>
				<view class="upBox">
					<view class="img" v-for="(item,index) in detailList" :key="index">
						<image :src="item" mode="aspectFill" @click="previewImg(detailList,index)"/>
						<view class="close" @click="detailList.splice(index,1)"><uni-icons type="clear" size="20"/></view>
					</view>
					<view class="item xzw_center" @click="upload" v-if="detailList.length<8">+</view>
				</view>
			</view>
			<view class="xzwBtn_dark" @click="save">{{$t('save')}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				product:{
					product_image:'',
					product_name:'',
					product_desc:'',
					origin_price:0,
					sale_price:0,
					product_detail:[]
				},
				detailList:[],//详情图片数组
				tmp:[],
				product_id:0
			}
		},
		methods: {
			blur(e,type){
				let val = e.target.value.replace(/(^\s*)|(\s*$)/g, "")
				if (val=='') {
					if(type==1){
						this.product.origin_price = 0;
					}else{
						this.product.sale_price = 0;
					}
					return
				}
			},
			checkInput(e,type){
				let val = e.target.value.replace(/(^\s*)|(\s*$)/g, "")
				if (!val) {
					if(type==1){
						this.product.origin_price = '';
					}else{
						this.product.sale_price = '';
					}
					return
				}
				var reg = /[^\d.]/g
				// 只能是数字和小数点，不能是其他输入
				val = val.replace(reg, "")
				// // 保证第一位只能是数字，不能是点
				val = val.replace(/^\./g, "");
				// // 小数只能出现1位
				val = val.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
				// // 小数点后面保留2位
				val = val.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
				this.$nextTick(() => {
					if(type==1){
						this.product.origin_price = val;
					}else{
						this.product.sale_price = val;
					}
				})
			},
			uploadImage(){
				uni.chooseImage({
					count: 1,
					success: (res) => {
						uni.showLoading({
							title:"上传中...",
							mask:true
						})
						this.$upload(res.tempFilePaths[0]).then((res)=>{
							this.product.product_image=res.path
							uni.hideLoading()
						})
					}
				})
			},
			upload(){
				uni.chooseImage({
					count: 8,
					success: (res) => {
						uni.showLoading({
							title:"上传中...",
							mask:true
						})
						let arr=res.tempFilePaths.splice(0,8-this.detailList.length)
						this.tmp=[]
						this.uploadImg(arr)
					}
				})
			},
			uploadImg(arr){
				let index=this.tmp.length
				this.$upload(arr[index]).then((res)=>{
					this.tmp.push(res.path)
					if(arr.length>this.tmp.length){
						this.uploadImg(arr)
					}else{
						 this.detailList= this.detailList.concat(this.tmp)
						 uni.hideLoading()
					}
				})
			},
			getDetail(){
				this.$get("goods/detail",{
					product_id:this.product_id
				}).then((res)=>{
					if(res.code==200){
						this.product=res.data
						this.detailList=res.data.product_detail
					}else{
						this.toast(res.msg)
					}
				})
			},
			save() {
				if(this.product.product_name==''){
					this.toast(this.$t('enterGoodName'))
				}else if(this.product.product_image==''){
					this.toast(this.$t('uploadGoodMainImage'))
				}else{
					this.product.product_detail= this.detailList
					this.$post(this.product_id==0?"goods/add":"goods/edit",this.product).then((res)=>{
						if(res.code==200){
							this.toast('保存成功!')
							this.jump('/goods/my',2)
						}else{
							this.toast(res.msg)
						}
					})
				}
			},
		},
		onLoad(e){
			if(e.product_id){
				uni.setNavigationBarTitle({
					title:'编辑商品'
				})
				this.product_id=e.product_id
				this.getDetail()
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #fff;
	}
	.container{
		.main{
			padding: 20upx 20upx;
			.label{
				font-size: 28upx;
				font-weight: bold;
				line-height: 60upx;
				margin: 0 0 10upx;
			}
			textarea{
				border: 1upx solid #d8d8d8;
				font-size: 28upx;
				padding: 15upx;
			}
			input{
				border: 1upx solid #d8d8d8;
				font-size: 28upx;
				padding: 15upx;
				width: 300upx;
			}
			.line{
				.upBox{
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					.img{
						height: 160upx;
						width: 160upx;
						margin: 0 20upx 30upx 0;
						position: relative;
						&:nth-child(4n){
							margin: 0 0 20upx;
						}
						image{
							height: 160upx;
							width: 160upx;
						}
						.close{
							position: absolute;
							right: -14upx;
							top:-14upx;
							background-color: #fff;
							border-radius: 50%;
							width: 30upx;
							height: 30upx;
							display: flex;
							align-items: center;
							justify-content: center;
						}
					}
					.item{
						height: 160upx;
						width: 160upx;
						border: 1upx solid #d8d8d8;
						font-size: 80upx;
						margin: 0 0 30upx;
						box-sizing: border-box;
					}
				}
			}
			.xzwBtn_dark{
				width: 200upx;
				border-radius: 32upx;
				margin: 50upx auto 0;
				height: 60upx;
			}
		}
	}
</style>
