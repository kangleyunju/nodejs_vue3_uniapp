<template>
	<div class="phoneContainer noCopy" v-loading="loading"  element-loading-text="保存中.." element-loading-background="rgba(255, 255, 255,0.9)">
		<div class="topBox">
			<div class="left">
				<el-button :type="fold?'primary':''" :icon="fold?'el-icon-caret-right':'el-icon-caret-left'" size="small" @click="fold=!fold">组件</el-button>
			</div>
			<div class="right">
				<el-button type="info" icon="el-icon-s-tools" size="small" @click="setPage()">页面设置</el-button>
				<el-button type="success" icon="el-icon-view" size="small" @click="toView()">预览</el-button>
				<el-button type="primary" icon="el-icon-download" size="small" @click="toSave()">保存</el-button>
				<el-button type="danger" icon="el-icon-full-screen" size="small" @click="full()">全屏</el-button>
			</div>
		</div>

		<div class="mainBox">
			<div class="leftTool" :class="{'hide':!fold}">
				<h2 class="title">组件</h2>
				<sortable class="sortableBox" :animation="100" :sort="false" :group="{name: 'sort',pull:'clone',put: false}" @start="isMask = true" @end="isMask = false">
					<template>
						<div :data-sorts="item.sorts" :key="index" v-for="(item, index) in compList" class="comp">
							<svg-icon :iconClass="item.icon"/>
							<span>{{ item.name }}</span>
						</div>
					</template>
				</sortable>
			</div>
			<div class="centerPhone">
				<div class="iframeBox">
					<div class="iframeIn" v-loading="iframeLoading" element-loading-text="加载中.." element-loading-background="rgba(255, 255, 255,0.9)">
						<div class="header">
							<div class="time">{{time}}</div>
							<div class="battery">{{battery}}%<div><span :style="{width:battery+'%'}"></span></div></div>
						</div>
						<iframe :class="{'hide':iframeLoading}" ref="iframe" :src="iframeUrl" frameborder="0"/>
						<div class="sortableBox" v-show="isMask">
							<sortable class="sortable" item-key="id" :sort="false" :group="{name: 'sort'}"  @add="sortableEnd">
								<template  #item="{ element }">
									<div></div>
								</template>
							</sortable>
						</div>
					</div>
					<div class="buttonBox">
						<div class="menu active" :class="{'refresh':isRefresh}" @click="refreshPhone">
							<i class="el-icon-refresh"/>
							<span class="btnTip">刷新</span>
						</div>
						<div class="menu" @click="deleteComp" :class="{'active':activeComponent.unique>0}">
							<i class="el-icon-delete"/>
							<span class="btnTip">删除</span>
						</div>
						<div class="menu" @click="topComp" :class="{'active':activeComponent.unique>0&&activeComponent.index>0}">
							<i class="el-icon-top" />
							<span class="btnTip">上移</span>
						</div>
						<div class="menu" @click="downComp" :class="{'active':activeComponent.unique>0&&(activeComponent.index+1<activeComponent.length&&activeComponent.length>1)}">
							<i class="el-icon-bottom"/>
							<span class="btnTip">下移</span>
						</div>
					</div>
				</div>
			</div>
			<diyRight :pageInfo="pageInfo" :attrObj="attrObj" @update="update" @setPageInfo="setPageInfo"/>
		</div>
		<!-- 预览弹窗 -->
		<el-dialog :visible.sync="viewShow" width="416px" center top="0" fullscreen custom-class="viewDialog">
			<i class="el-icon-close" @click="viewShow=false"/>
			<div class="screenBox">
				<div class="header">
					<div class="time">{{time}}</div>
					<div class="battery">{{battery}}%<div><span :style="{width:battery+'%'}"></span></div></div>
				</div>
				<div class="pageName">{{pageInfo.page_name||this.baseName}}</div>
				<iframe :src="phoneUrl" frameborder="0" v-if="viewShow"/>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import screenfull from "screenfull"
	import compList from "@/views/diy/mixin/diy.js"
	import diyRight from "@/views/diy/components/diyRight.vue"
	export default {
		components: {
			diyRight
		},
		data() {
			return {
				compList: compList,//左侧组件数组
				fold: true, //左侧组件是否折叠
				loading: false,
				activeComponent: {unique:0,index:0,length:0}, //选中的模块
				pageInfo: {}, //完整页面数据
				battery:50,//电量
				time:'',//时间
				iframeLoading: true,//是否显示ifram
				iframeUrl: '',
				isMask: false,//蒙板
				attrObj:{},//选中的组件
				isRefresh:false,//是否刷新中
				viewShow:false//预览
			}
		},
		mounted() {
			window.addEventListener('message', this.acceptMessage, false)
			setTimeout(()=>{
				this.iframeLoading=false
			},1500)
		},
		methods: {
			// 设置页面属性
			setPage() {
				this.activeComponent = {unique:0,index:0,length:0}
				this.$refs.iframe.contentWindow.postMessage({
					method: 'noComp'
				}, '*')
				this.setAttrObj()
			},
			//预览
			toView(){
				this.viewShow=true
			},
			// 保存布局
			toSave() {
				if(this.pageInfo.name==""){
					this.$message.warning("页面名称必填")
				}else{
					this.loading=true
					this.$refs.iframe.contentWindow.postMessage({
						method: 'layoutSave',
						data: JSON.parse(JSON.stringify(this.pageInfo))
					}, '*')
				}
			},
			// 保存回调
			saveResult(e) {
				this.loading=false
				this.$message({
					message: e==1?'保存成功':'保存失败',
					type: e==1?'success':'error',
					offset: 20
				})
			},
			//全屏
			full(){
				screenfull.toggle()
			},
			// 监听 iframe 中传过来的方法
			acceptMessage(event) {
				let dat = event.data;
				switch (dat.method) {
					case 'saveResult':
						this.saveResult(dat.data);
						break;
					case 'parentGetUnique'://点击某个模块
						this.parentGetUnique(dat.data);
						break;
					case 'sendPageData':
						this.sendPageData(dat.data);
						break;
				}
			},
			update(data={}){
				this.setAttrObj(data)
				this.$refs.iframe.contentWindow.postMessage({
					method: 'update',
					data: data
				}, '*')
			},
			// 点击某个模块
			parentGetUnique(data) {
				let item = data.item;
				if(data.state==1){
					if (this.activeComponent.unique == item.unique) {
						this.activeComponent.unique = 0
					} else {
						this.activeComponent.unique = item.unique
					}
					this.setAttrObj(item)
				}
				this.activeComponent.index=data.index
				this.activeComponent.length=data.length
			},
			//接收页面信息
			sendPageData(e) {
				this.pageInfo = e
			},
			// 监听组件被拉入 iframe 中
			sortableEnd(evt) {
				let sorts = evt.clone.dataset.sorts//被拖入的组件名称
				let data = this.compList.find((item)=>{
					return item.sorts==sorts
				})
				this.$refs.iframe.contentWindow.postMessage({
					method: 'addComponent',
					data: data
				}, '*')
			},
			// 设置页面信息
			setPageInfo(){
				this.$refs.iframe.contentWindow.postMessage({
					method: 'setPageInfo',
					data: JSON.parse(JSON.stringify(this.pageInfo))
				}, '*');
			},
			setAttrObj(data={}){
				localStorage.setItem('attrObj', JSON.stringify(data))
				this.attrObj = data
			},
			// 刷新页面
			refreshPhone() {
				if(!this.isRefresh){
					this.isRefresh=true
					this.iframeLoading=true
					this.activeComponent = {unique:0,index:0,length:0}
					this.setAttrObj()
					this.$refs.iframe.contentWindow.postMessage({
						method: 'getDiy',
						data:{
							id:1
						}
					}, '*');
					setTimeout(()=>{
						this.iframeLoading=false
						this.isRefresh=false
					},1000)
				}
			},
			// 通过 unique 删除 iframe 组件
			deleteComp() {
				if(this.activeComponent.unique>0){
					this.$refs.iframe.contentWindow.postMessage({
						method: 'deleteComp'
					}, '*')
					this.activeComponent.unique = 0
					this.activeComponent.length--
					this.setAttrObj()
				}
			},
			//上移
			topComp() {
				if(this.activeComponent.unique>0&&this.activeComponent.index>0){
					this.$refs.iframe.contentWindow.postMessage({
						method: 'topComp'
					}, '*')
				}
			},
			//下移
			downComp() {
				if(this.activeComponent.unique>0&&(this.activeComponent.index+1<this.activeComponent.length)&&this.activeComponent.length>1){
					this.$refs.iframe.contentWindow.postMessage({
						method: 'downComp'
					}, '*')
				}
			},
			//手机时间
			gettTime(){
				var hour=new Date().getHours()
				var minite=new Date().getMinutes()
				hour=hour>9?hour:'0'+hour
				minite=minite>9?minite:'0'+minite
				this.time=hour+":"+minite
				if(navigator.getBattery){
					navigator.getBattery().then(res=>{
						this.battery=Math.ceil(res.level*100)
					})
				}
				setInterval(()=>{
					this.gettTime()
				},60000)
			}
		},
		created() {
			let id=this.$route.query.id?this.$route.query.id:1
			this.iframeUrl=this.phoneUrl+"?edit=1&id="+id
			this.gettTime()
		}
	}
</script>
<style lang="scss">
	body{
		overflow: hidden;
	}
	.phoneContainer {
		min-width: 1150px;
		.topBox {
			border-bottom:1px solid #d8d8d8;
			display: flex;
			justify-content: space-between;
			height: 60px;
			padding: 0 20px;
			box-sizing: border-box;
			background-color: #fff;
			.left,.right{
				display: flex;
				align-items: center;
			}
		}
		.mainBox {
			display: flex;
			height: calc(100vh - 60px);
			overflow: hidden;
			min-height: 400px;
			.leftTool {
				background-color: #fff;
				width: 310px;
				flex-shrink: 0;
				height: 100%;
				position: relative;
				transition: all 0.2s;
				overflow: hidden;
				&.hide{
					width: 0;
				}
				h2 {
					text-align: center;
					color: #777;
					font-size: 20px;
					line-height:60px;
					width: 310px;
				}
				.sortableBox {
					width: 310px;
					max-height: calc(100% - 60px);
					display: flex;
					flex-wrap: wrap;
					align-content: flex-start;
					overflow-y: auto;
					padding: 0 16px 16px;
					box-sizing: border-box;
					.sortable {
						border: 1px solid red;
					}
					.comp {
						border: 1px solid #e8e8e8;
						width: 90px;
						height: 90px;
						color: #777;
						padding: 10px;
						cursor:move;
						transition: all 0.3s;
						overflow: hidden;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						box-sizing: border-box;
						font-size: 14px;
						&:hover {
							border: 1px solid var(--color-primary);
							background-color: #edeefb;
							* {
								color:var(--color-primary);
							}
						}
						.svg-icon {
							height: 24px;
							width: 24px;
							color: #999;
							margin-bottom: 10px;
						}
						span {
							display: inline-block;
							width: 100%;
							text-align: center;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
						}
					}
				}
			}
			.centerPhone {
				padding: 24px 16px;
				flex: 1;
				width: 416px;
				overflow: hidden;
				background-color: #ddd;
				box-shadow: 0 0 10px #999 inset;
				display: flex;
				align-items: center;
				justify-content: center;
				.iframeBox {
					border: 8px solid #e1e1e1;
					box-shadow: 0 0 10px #999;
					position: relative;
					z-index: 10;
					background-color: #e1e1e1;
					.iframeIn {
						position: relative;
						width: 400px;
						.header {
							height: 24px;
							width: 100%;
							display: flex;
							align-items: center;
							justify-content: space-between;
							padding: 0 10px;
							box-sizing: border-box;
							font-size: 10px;
							.battery{
								display: flex;
								align-items: center;
								div{
									width: 24px;
									height: 11px;	
									border-radius: 4px;
									margin-left: 4px;
									background-color: #fff;
									position:relative;
									overflow: hidden;
									&::after{
										content:"";
										position: absolute;
										left:0;
										right: 0;
										top:0;
										bottom: 0;
										border: 1px solid #666;
										border-radius: 4px;
									}
									span{
										border-radius:4px;
										height:100%;
										display: block;
										background-color: #666;
									}
								}
							}
						}
						iframe {
							width: 400px;
							height: calc(100vh - 152px);
							max-height: 1000px;
							&.hide{
								opacity: 0;
							}
						}
						.sortableBox {
							position: absolute;
							left: 0;
							top: 0;
							width: 100%;
							height: 100%;
							.sortable {
								width: 100%;
								height: 100%;
								>*{
									display: none;
								}
							}
						}
					}
					.buttonBox {
						position: absolute;
						top: 50%;
						transform: translateY(-50%);
						right:-110px;
						width: 100px;
						display: flex;
						flex-direction: column;
						align-items: center;
						.menu {
							position: relative;
							border-radius: 50%;
							width: 45px;
							height: 45px;
							transition: all 0.3s;
							box-shadow: 0 0 6px #999;
							background-color: #d8d8d8;
							cursor: pointer;
							margin-bottom: 15px;
							font-size: 0;
							display: flex;
							align-items: center;
							justify-content: center;
							&.refresh{
								.el-icon-refresh{
									animation: rotate 1s;
								}
							}
							@keyframes rotate {
								0%{
									transform: rotate(0);
								}
								100%{
									transform: rotate(360deg);
								}
							}
							&:last-child{
								margin:0;
							}
							&:hover {
								&.active{
									background-color: #7591fc;
								}
								.btnTip {
									animation: tipEnter 1.5s ease-in;
									display: block;
								}
							}
							&.active{
								background-color: var(--color-primary);
							}
							i{
								font-size: 24px;
								color:#fefefe;
							}
							.btnTip {
								position: absolute;
								display: none;
								right: -40px;
								top: 50%;
								transform: translateY(-50%);
								z-index: 9999;
								color: #418aff;
								font-size: 14px;
								
							}
							@keyframes tipEnter {
								0% {
									opacity: 0;
									right: -60px;
								}
								50% {
									opacity: 1;
									right: -40px;
								}
								100% {
									opacity: 0;
									right: -60px;
								}
							}
						}
					}
				}

			}
		}
		.viewDialog{
			border-radius: 0;
			overflow: hidden;
			.el-dialog__header{
				display: none;
			}
			.el-icon-close{
				position: absolute;
				right:20px;
				top:20px;
				font-size:24px;
				cursor:pointer;
				&:hover{
					color:var(--color-primary);
				}
			}
			.screenBox{
				border: 8px solid #666;
				width: 400px;
				height:calc(100vh - 16px);
				margin: 0 auto;
				background-color: #f8f8f8;
				border-radius: 12px;
				overflow: hidden;
				.header {
					height: 30px;
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 0 10px;
					box-sizing: border-box;
					font-size: 10px;
					.battery{
						display: flex;
						align-items: center;
						div{
							width: 24px;
							height: 11px;	
							border-radius: 4px;
							margin-left: 4px;
							background-color: #fff;
							position:relative;
							overflow: hidden;
							&::after{
								content:"";
								position: absolute;
								left:0;
								right: 0;
								top:0;
								bottom: 0;
								border: 1px solid #666;
								border-radius: 4px;
							}
							span{
								border-radius:4px;
								height:100%;
								display: block;
								background-color: #666;
							}
						}
					}
				}
				.pageName{
					line-height: 40px;
					text-align: center;
					font-size: 16px;
				}
				iframe{
					height: calc(100vh - 90px);
					width: 400px;
				}
			}
		}
	}
</style>
