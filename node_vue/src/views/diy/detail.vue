<template>
	<div class="container">
		<div class="topBox">
			<div class="topBox_left">
				<el-button :type="leftSide?'primary':''" :icon="leftSide?'CaretRight':'CaretLeft'" @click="leftSide=!leftSide">组件</el-button>
			</div>
			<div class="topBox_right">
				<el-button type="info" icon="Setting" @click="setPage()">页面设置</el-button>
				<el-button type="success" icon="View" @click="toView()">预览</el-button>
				<el-button type="primary" icon="Download" @click="save()">保存</el-button>
				<el-button type="danger" icon="FullScreen" @click="full()">全屏</el-button>
			</div>
		</div>

		<div class="mainBox">
			<div class="leftTool" :class="{'leftTool-hide':!leftSide}">
				<h2 class="title">组件</h2>
				<sortable class="sortable scrollbar" :list="compList" item-key="id" :animation="100" :sort="false" :group="{name: 'sort',pull:'clone'}" @start="isStMask = true" @end="isStMask = false">
					<template  #item="{ element }">
						<div :data-sorts="element.sorts"  class="comp">
							<img :src="element.img_url" alt="无图片"/>
							<span>{{ element.name }}</span>
						</div>
					</template>
				</sortable>
			</div>

			<div class="centerPhone">
				<div class="iframeBox">
					<div class="iframeIn">
						<div class="header">
							<div class="time">{{time}}</div>
							<div class="battery">{{battery}}%<div><span :style="{width:battery+'%'}"></span></div></div>
						</div>
						<iframe v-if="show_iframe" name="iframe_name" ref="iframe" class="iframe" :src="iframe_url" frameborder="0"/>
						<div class="sortableBox" v-show="isStMask">
							<sortable class="sortable" item-key="id" :sort="false" :group="{name: 'sort'}"  @add="sortableEnd">
								<template  #item="{ element }">
									<div></div>
								</template>
							</sortable>
						</div>
					</div>
				</div>
	
				<div class="buttonBox">
					<div class="menu" @click="refreshPhone">
						<img class="img-icon" src="@/assets/img/center_refresh.png">
						<span class="tip">刷新</span>
					</div>
					<div class="menu" @click="deleteComp">
						<img class="img-icon" src="@/assets/img/center_delete.png" v-if="activeComponent.unique>0">
						<img class="img-icon" src="@/assets/img/center_delete2.png" v-else>
						<span class="tip">删除</span>
					</div>
					<div class="menu" @click="topComp">
						<img class="img-icon" src="@/assets/img/center_up.png" v-if="activeComponent.unique>0&&activeComponent.index>0">
						<img class="img-icon" src="@/assets/img/center_up2.png" v-else>
						<span class="tip">上移</span>
					</div>
					<div class="menu" @click="downComp">
						<img class="img-icon" src="@/assets/img/center_down.png" v-if="activeComponent.unique>0&&(activeComponent.index+1<activeComponent.length&&this.activeComponent.length>1)">
						<img class="img-icon" src="@/assets/img/center_down2.png" v-else>
						<span class="tip">下移</span>
					</div>
				</div>
			</div>

			<DiyRight 
				:componentChange="componentChange" 
				:componentInit="componentInit" 
				:is_set_page="is_set_page" 
				:page_info="page_info" 
				@save="save"
				@setPageInfo="setPageInfo" 
			/>
		</div>
	</div>
</template>
<script>
	import screenfull from "screenfull"
	import compList from '@/utils/components.js'
	import DiyRight from '@/components/diy-right.vue'

	export default {
		components: {
			DiyRight
		},
		data() {
			return {
				compList: [],//左侧组件数组
				leftSide: true, //是否显示左侧组件
				is_set_page: false, // 是否是页面设置
				activeComponent: {unique:0,index:0,length:0}, //选中的模块
				page_info: {}, //完整页面数据
				battery:'',//电量
				time:'',//时间
				componentInit: false,//初始化右侧组件属性
				componentChange: true,// 控制右侧属性改变
				show_iframe: true,//是否显示ifram
				iframe_url: '',
				isStMask: false,//蒙板
				is_page_change: false// 标识iframe当前页面是否改变
			}
		},
		mounted() {
			window.addEventListener('message', this.acceptMessage, false);
		},
		methods: {
			// 监听 iframe 中方法
			acceptMessage(event) {
				let dat = event.data;
				switch (dat.method) {
					case 'saveSuccess'://保存成功
						this.saveSuccess();
						break;
					case 'saveFail'://保存失败
						this.saveFail();
						break;
					case 'parentGetUnique'://点击某个模块
						this.parentGetUnique(dat.data);
						break;
					case 'sendPageData':
						this.sendPageData(dat.data);
						break;
				}
			},
			// 保存成功回调
			saveSuccess() {
				if (this.is_page_change) {
					this.is_page_change = false;
				}
				this.$message({
					message: '保存成功',
					type: 'success',
					offset: 20
				})
				this.refreshPhone()
			},
			// 保存失败回调
			saveFail() {
				this.$message({
					message: '保存失败',
					type: 'error',
					offset: 20
				})
				this.refreshPhone();
			},
			// 刷新页面
			refreshPhone() {
				this.show_iframe = false;
				this.initRightAttr();
				this.activeComponent = {unique:0,index:0,length:0}
				setTimeout(() => {
					this.show_iframe = true;
				}, 10)
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
					localStorage.setItem('attr_obj', JSON.stringify(item));
					this.componentChange = !this.componentChange;
				}
				
				this.activeComponent.index=data.index
				this.activeComponent.length=data.length
				this.is_set_page = false;
			},
			//获取页面信息
			sendPageData(e) {
				this.page_info = e
			},
			//全屏
			full(){
				screenfull.toggle()
			},
			// 设置页面信息
			setPageInfo(){
				this.$refs.iframe.contentWindow.postMessage({
					method: 'setPageInfo',
					data: JSON.parse(JSON.stringify(this.page_info))
				}, '*');
			},
			//预览
			toView(){
				window.open(this.phoneUrl,"_blank");      
			},

			save(flag) {
				let dat = {};
				if (flag == 1) {
					//更新布局,不调用接口
					dat = JSON.parse(localStorage.getItem('attr_obj'));
					this.$refs.iframe.contentWindow.postMessage({
						method: 'update',
						data: dat,
					}, '*');
				} else {
					// 保存布局,调用接口
					this.$refs.iframe.contentWindow.postMessage({
						method: 'layoutSave',
						data: JSON.parse(JSON.stringify(this.page_info)),
					}, '*');
				}
			},
			// 监听组件被拉入 iframe 中
			sortableEnd(evt) {
				let sorts = evt.clone.dataset.sorts;//被拖入的组件名称
				let attr_obj = {};
				for (let i in compList) {
					if (compList[i].sorts == sorts) {
						attr_obj = compList[i];
					}
				}
				this.is_page_change = true;
				this.$refs.iframe.contentWindow.postMessage({
					method: 'addComponent',
					data: { attr_obj}
				}, '*');
			},
			// 通过 unique 删除 iframe 组件
			deleteComp() {
				if(this.activeComponent.unique>0){
					this.initRightAttr();
					this.$refs.iframe.contentWindow.postMessage({
						method: 'deleteComp'
					}, '*');
					this.activeComponent.unique = 0
					this.activeComponent.length--
					localStorage.setItem('attr_obj', {});
				}
			},
			// 初始化右侧属性
			initRightAttr() {
				this.componentInit = !this.componentInit;
			},

			//上移
			topComp() {
				if(this.activeComponent.unique>0&&this.activeComponent.index>0){
					this.$refs.iframe.contentWindow.postMessage({
						method: 'topComp'
					}, '*');
				}
			},
			//下移
			downComp() {
				if(this.activeComponent.unique>0&&(this.activeComponent.index+1<this.activeComponent.length)&&this.activeComponent.length>1){
					this.$refs.iframe.contentWindow.postMessage({
						method: 'downComp'
					}, '*');
				}
			},
			// 设置页面属性
			setPage() {
				this.is_set_page = !this.is_set_page;
				this.activeComponent = {unique:0,index:0,length:0}
				localStorage.setItem('attr_obj', {});
				this.initRightAttr();
				this.$refs.iframe.contentWindow.postMessage({
					method: 'noComp'
				}, '*');
			},
			//手机时间
			gettTime(){
				var hour=new Date().getHours()
				var minite=new Date().getMinutes()
				hour=hour>9?hour:'0'+hour
				minite=minite>9?minite:'0'+minite
				this.time=hour+":"+minite
				navigator.getBattery().then(res=>{
					this.battery=Math.ceil(res.level*100)
				})
				setInterval(()=>{
					this.gettTime()
				},60000)
			}
		},
		created() {
			let id=this.$route.query.id?this.$route.query.id:1
			this.iframe_url=this.phoneUrl+'&id='+id
			this.compList = compList;
			this.gettTime()
		}
	}
</script>
<style lang="scss">
	.container {
		.topBox {
			box-shadow: 0 0 10px #ddd;
			display: flex;
			justify-content: space-between;
			height: 60px;
			padding: 0 20px;
			box-sizing: border-box;
			.topBox_left{
				display: flex;
				align-items: center;
				.el-button{
					padding: 8px 10px;
				}
			}
			.topBox_right{
				display: flex;
				align-items: center;
				.el-button{
					padding: 8px 10px;
				}
			}
		}
		.mainBox {
			display: flex;
			height: calc(100vh - 60px);
			overflow: hidden;
			.leftTool {
				width: 330px;
				flex-shrink: 0;
				height: 100%;
				position: relative;
				padding: 20px 0;
				transition: width 0.2s;
				&-hide{
					width: 0;
					transition: width 0.2s;
				}
				h2 {
					margin-bottom: 20px;
					text-align: center;
					color: #777;
					font-size: 20px;
					width: 330px;
				}
				.sortable {
					max-height: calc(100% - 120px);
					display: flex;
					flex-wrap: wrap;
					align-content: flex-start;
					overflow-y: auto;
					width: 330px;
					padding: 0 25px;
					box-sizing: border-box;
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
							border: 1px solid rgba(64, 158, 255, 0.5);
							background-color: rgba(64, 158, 255, 0.1);
						}
						img {
							height: 22px;
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
				padding: 14px 20px;
				position: relative;
				flex: 1;
				height: 100%;
				min-width: 420px;
				overflow: hidden;
				background-color: #ddd;
				box-shadow: 0 0 10px #999 inset;
				.iframeBox {
					width: 402px;
					height: 760px;
					border: 8px solid #e1e1e1;
					position: absolute;
					box-shadow: 0 0 10px #999;
					position: absolute;
					z-index: 10;
					left: 50%;
					transform: translateX(-50%);
					.iframeIn {
						position: relative;
						width: 400px;
						.header {
							height: 25px;
							width: 100%;
							display: flex;
							align-items: center;
							justify-content: space-between;
							padding: 0 10px;
							box-sizing: border-box;
							font-size: 10px;
							background-color: #e1e1e1;
							.battery{
								display: flex;
								align-items: center;
								div{
									width: 24px;
									height: 12px;
									border: 1px solid #666;
									border-radius: 4px;
									margin-left: 4px;
									span{
										height: 100%;
										display: block;
										background-color: #666;
									}
								}
							}
						}
						.iframe {
							width: 402px;
							height: 736px;
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
				}
				.buttonBox {
					position: absolute;
					top: 150px;
					right: 30px;
					width: 100px;
					display: flex;
					flex-direction: column;
					align-items: center;
					.menu {
						position: relative;
						border-radius: 50%;
						width: 45px;
						height: 45px;
						transition: all 0.5s;
						background-color: #fff;
						box-shadow: 0 0 10px #999;
						cursor: pointer;
						margin-bottom: 15px;
						&:hover {
							.tip {
								animation: tipEff 1.5s ease-in;
								animation-fill-mode: forwards;
								display: block;
							}
						}
						.img-icon {
							width: 100%;
							height: 100%;
							color: #409EFF;
						}
						
						.tip {
							position: absolute;
							display: none;
							left: -40px;
							top: 50%;
							transform: translateY(-50%);
							z-index: 9999;
							color: #777;
						}
						@keyframes tipEff {
							0% {
								opacity: 0;
								left: -60px;
							}
							50% {
								opacity: 1;
								left: -40px;
							}
							100% {
								opacity: 0;
								left: -60px;
								display: none;
							}
						}
					}
				}
			}
		}
	}
	.el-loading-spinner i{
		font-size: 30px;
	}
</style>
