<template>
	<div class="rightMenu">
		<h2>{{is_set_page?'页面':'属性'}}设置</h2>
		<!-- 页面设置 -->
		<div class="attributes" v-if="is_set_page">
			<el-form label-width="80px" class="form scrollbar" label-position="left">
				<el-form-item label="页面名称">
					<el-input v-model="page_info.name" placeholder="仅后台可见" maxlength="10" clearable></el-input>
				</el-form-item>
				<el-form-item label="页面标题">
					<el-input v-model="page_info.page_name" placeholder="手机端顶部标题" maxlength="15" clearable></el-input>
				</el-form-item>
				<el-form-item label="页面路径">
					<el-input v-model="page_info.path" placeholder="请输入页面路径" maxlength="20" clearable>
					</el-input>
				</el-form-item>
				<el-form-item label="背景颜色">
					<el-radio v-model="page_info.background_color" label="#FFFFFF">#FFFFFF</el-radio>
					<el-radio v-model="page_info.background_color" label="#F8F8F8">#F8F8F8</el-radio>
				</el-form-item>
			</el-form>
		</div>

		<!-- 组件属性 -->
		<div class="attributes" v-else>
			<div class="subTitle">{{attr_obj.name}}</div>
			<el-form label-width="80px" class="form scrollbar" label-position="left">
				<template v-for="(item,index) in attr_obj">
					<!-- 公共属性 -->
					<el-form-item label="显示模块" :key="index" v-if="index=='show'">
						<el-radio v-model="attr_obj.show" :label="true">是</el-radio>
						<el-radio v-model="attr_obj.show" :label="false">否</el-radio>
					</el-form-item>
					<el-form-item label="显示标题" :key="index" v-if="index=='titleShow'&&attr_obj.show">
						<el-radio v-model="attr_obj.titleShow" :label="true">是</el-radio>
						<el-radio v-model="attr_obj.titleShow" :label="false">否</el-radio>
					</el-form-item>
					<el-form-item label="模块标题" :key="index" v-if="index=='title'&&attr_obj.titleShow&&attr_obj.show">
						<el-input v-model="attr_obj.title" maxlength="10" clearable placeholder="请输入模块标题" />
					</el-form-item>
					<el-form-item label="主题类型" :key="index" v-if="index=='theme'&&attr_obj.show">
						<el-radio v-model="attr_obj.theme" label="default">黑色</el-radio>
						<el-radio v-model="attr_obj.theme" label="primary">蓝色</el-radio>
						<el-radio v-model="attr_obj.theme" label="error">红色</el-radio>
						<el-radio v-model="attr_obj.theme" label="warning">橙色</el-radio>
						<el-radio v-model="attr_obj.theme" label="success">绿色</el-radio>
						<el-radio v-model="attr_obj.theme" label="info">灰色</el-radio>
					</el-form-item>
					<el-form-item label="背景色" :key="index" v-if="index=='bgColor'&&attr_obj.show">
						<el-color-picker v-model="attr_obj.bgColor"></el-color-picker>
					</el-form-item>
					<el-form-item label="模块高度" :key="index" v-if="index=='height'&&attr_obj.show">
						<el-slider size="small" v-model="attr_obj.height" :step="1" :min="attr_obj.min||10" :max="attr_obj.max||500"></el-slider>
					</el-form-item>
					<el-form-item label="上间距" :key="index" v-if="index=='paddingTop'&&attr_obj.show">
						<el-slider size="small" v-model="attr_obj.paddingTop" :step="1" :min="0" :max="100"></el-slider>
					</el-form-item>
					<el-form-item label="下间距" :key="index" v-if="index=='paddingBottom'&&attr_obj.show">
						<el-slider size="small" v-model="attr_obj.paddingBottom" :step="1" :min="0" :max="100">
						</el-slider>
					</el-form-item>
					<el-form-item label="圆角" :key="index" v-if="index=='radius'&&attr_obj.show">
						<el-slider size="small" v-model="attr_obj.radius" :step="1" :min="0" :max="100"></el-slider>
					</el-form-item>

					<!-- 公告 -->
					<el-form-item label="方向" :key="index" v-if="index=='notice_direction'&&attr_obj.show">
						<el-radio v-model="attr_obj.notice_direction" label="column">垂直</el-radio>
						<el-radio v-model="attr_obj.notice_direction" label="row">水平</el-radio>
					</el-form-item>
					<el-form-item label="显示喇叭" :key="index" v-if="index=='notice_icon'&&attr_obj.show">
						<el-radio v-model="attr_obj.notice_icon" :label="true">是</el-radio>
						<el-radio v-model="attr_obj.notice_icon" :label="false">否</el-radio>
					</el-form-item>
					<el-form-item label="显示更多" :key="index" v-if="index=='notice_more'&&attr_obj.show">
						<el-radio v-model="attr_obj.notice_more" :label="true">是</el-radio>
						<el-radio v-model="attr_obj.notice_more" :label="false">否</el-radio>
					</el-form-item>

					<!-- 轮播图 -->
					<el-form-item label="自动轮播" :key="index" v-if="index=='swiper_auto'&&attr_obj.show">
						<el-radio v-model="attr_obj.swiper_auto" :label="true">是</el-radio>
						<el-radio v-model="attr_obj.swiper_auto" :label="false">否</el-radio>
					</el-form-item>
					<el-form-item label="3D切换" :key="index" v-if="index=='swiper_type'&&attr_obj.show">
						<el-radio v-model="attr_obj.swiper_type" :label="1">关闭</el-radio>
						<el-radio v-model="attr_obj.swiper_type" :label="2">开启</el-radio>
					</el-form-item>
					<el-form-item label="指示点" :key="index" v-if="index=='swiper_dot'&&attr_obj.show">
						<el-radio v-model="attr_obj.swiper_dot" :label="1">块状</el-radio>
						<el-radio v-model="attr_obj.swiper_dot" :label="2">圆点</el-radio>
						<el-radio v-model="attr_obj.swiper_dot" :label="3">数字</el-radio>
						<el-radio v-model="attr_obj.swiper_dot" :label="4">隐藏</el-radio>
					</el-form-item>
					<el-form-item :key="index" v-if="index=='swiperArr'&&attr_obj.show" label-width="0"
						class="imgAddBox">
						<div class="itemTitle">
							<div class="label">上传图片</div><span class="tip">最多5张</span>
						</div>
						<div class="imgItem" v-for="(item2,index2) in attr_obj.swiperArr" :key="index2" @click="chooseItem(index2)">
							<el-icons name="CircleCloseFilled" v-if="index2>0" @click="removeSwiper(index2)" class="close"/>
							<el-upload class="itemLeft" action="" :show-file-list="false" :before-upload="uploadSwiper" :limit="1" accept="image/*">
								<div class="img">
									<el-icons name="CirclePlusFilled" v-if="item2.img==''"/>
									<el-image :src="item2.img" v-else fit="cover" />
								</div>
								<div class="word">选择图片</div>
								<div class="word2">355*{{attr_obj.height}}</div>
							</el-upload>
							<div class="itemRight">
								<el-input placeholder="请输入链接" v-model="item2.url" clearable @blur="update()" />
							</div>
						</div>
						<el-button type="primary" class="addButton" @click="addSwiper" v-if="attr_obj.swiperArr.length<5">添加图片</el-button>
					</el-form-item>

					<!-- 图片 -->
					<el-form-item label="排列样式" :key="index" v-if="index=='imgType'&&attr_obj.show" class="img_typeBox">
						<el-radio v-model="attr_obj.imgType" :label="1">
							<img src="../assets/img/right_img_type1.png">
						</el-radio>
						<el-radio v-model="attr_obj.imgType" :label="2">
							<img src="../assets/img/right_img_type2.png">
						</el-radio>
						<el-radio v-model="attr_obj.imgType" :label="3">
							<img src="../assets/img/right_img_type3.png">
						</el-radio>
						<el-radio v-model="attr_obj.imgType" :label="4">
							<img src="../assets/img/right_img_type4.png">
						</el-radio>
					</el-form-item>
					<el-form-item :key="index" v-if="index=='imgArr'&&attr_obj.show" label-width="0" class="imgAddBox">
						<div class="itemTitle">
							<div class="label">上传图片</div>
						</div>
						<div class="imgItem" v-for="(item2,index2) in attr_obj.imgArr" :key="index2" @click="chooseItem(index2)">
							<el-icons name="CircleCloseFilled" v-if="attr_obj.imgType==1&index2==1" @click="removeImg(index2)" class="close"/>
							<el-upload class="itemLeft" action="" :show-file-list="false" :before-upload="uploadImg" :limit="1" accept="image/*">
								<div class="img">
									<el-icons name="CirclePlusFilled" v-if="item2.img==''"/>
									<el-image :src="item2.img" v-else fit="cover" />
								</div>
								<div class="word">选择图片</div>
								<div class="word2" v-if="attr_obj.imgType==1">355*{{attr_obj.height}}</div>
								<div class="word2" v-if="attr_obj.imgType==2">175*{{attr_obj.height}}</div>
								<div class="word2" v-if="(attr_obj.imgType==3&index2==0)||(attr_obj.imgType==4&index2==2)">175*{{attr_obj.height}}</div>
								<div class="word2" v-if="(attr_obj.imgType==3&index2!=0)||(attr_obj.imgType==4&index2!=2)">175*{{(attr_obj.height-5)/2}}</div>
							</el-upload>
							<div class="itemRight">
								<el-input placeholder="请输入链接" v-model="item2.url" clearable @blur="update"/>
							</div>
						</div>
						<el-button type="primary" class="addButton" @click="addImg" v-if="attr_obj.imgType==1&attr_obj.imgArr.length==1">添加图片</el-button>
					</el-form-item>

					<!-- 快捷入口 -->
					<el-form-item label="是否分页" :key="index" v-if="index=='page'&&attr_obj.show">
						<el-radio v-model="attr_obj.page" :label="true">是</el-radio>
						<el-radio v-model="attr_obj.page" :label="false">否</el-radio>
					</el-form-item>
					<el-form-item :key="index" v-if="index=='iconArr'&&attr_obj.show" label-width="0" class="imgAddBox">
						<div class="itemTitle">
							<div class="label">上传图片</div>
							<div class="tip">最多20个</div>
						</div>
						<div class="imgItem" v-for="(item2,index2) in attr_obj.iconArr" :key="index2" @click="chooseItem(index2)">
							<el-icons name="CircleCloseFilled" v-if="index2>0" @click="removeIcon(index2)" class="close"/>
							<el-upload class="itemLeft" action="" :show-file-list="false" :before-upload="uploadIcon" :limit="1" accept="image/*">
								<div class="img">
									<el-icons name="CirclePlusFilled" v-if="item2.img==''"/>
									<el-image :src="item2.img" v-else fit="cover" />
								</div>
								<div class="word">选择图片</div>
								<div class="word2">50*50</div>
							</el-upload>
							<div class="itemRight">
								<el-input placeholder="请输入名称" v-model="item2.name" clearable @blur="update" maxlength="5"/>
								<el-input placeholder="请输入链接" v-model="item2.url" clearable @blur="update" maxlength="100"/>
							</div>
						</div>
						<el-button type="primary" class="addButton" @click="addIcon" v-if="attr_obj.iconArr.length<20">添加入口</el-button>
					</el-form-item>

					<!-- 商品列表 -->
					<el-form-item label="排列样式" :key="index" v-if="index=='goodsType'&&attr_obj.show">
						<el-radio-group v-model="attr_obj.goodsType" fill="#9bcdff" size="small">
							<el-radio-button :label="1" border>
								<img class="cateIcon" src="../assets/img/right_cate.png">
							</el-radio-button>
							<el-radio-button :label="2" border>
								<img class="cateIcon" src="../assets/img/right_cate2.png">
							</el-radio-button>
						</el-radio-group>
					</el-form-item>
					<el-form-item :key="index" v-if="index=='goodsArr'&&attr_obj.show" label-width="0" class="goodsAddBox">
						<div class="itemTitle">
							<div class="label">添加商品</div>
							<el-button type="primary" @click="toSearch(3)">添加</el-button>
							<div class="tip">最多添加20个商品</div>
						</div>
						<el-table :data="attr_obj.goodsArr" style="width: 100%" border size="small" class="goodsTable" v-if="attr_obj.goodsArr.length>0">
							<el-table-column type="index" label="序号" width="46" align="center" />
							<el-table-column label="商品信息" header-align="center">
								<template slot-scope="scope">
									<div class="detail">
										<el-image :src="scope.row.picture" />
										<div class="info">
											<div class="xzw_word1">{{scope.row.name}}</div>
											<div>¥{{scope.row.sale_price}}</div>
										</div>
									</div>
								</template>
							</el-table-column>
							<el-table-column label="操作" align="center" width="46">
								<template slot-scope="scope">
									<i class="el-icon-delete-solid" @click="deleteItem(scope)" />
								</template>
							</el-table-column>
						</el-table>
					</el-form-item>

					<!-- 商品分类 -->
					<el-form-item :key="index" v-if="index=='cateArr'&&attr_obj.show" label-width="0"
						class="goodsAddBox">
						<div class="cateBlock" v-for="(item2,index2) in attr_obj.cateArr" :key="index2">
							<el-icons name="CircleCloseFilled" v-if="index2>0" @click="removeCate(index2)" class="close"/>
							<div class="itemTitle">
								<div class="label">分类名称</div>
								<el-input placeholder="请输入分类名称" v-model="item2.name" clearable @blur="blur" maxlength="5"/>
							</div>
							<div class="itemTitle">
								<div class="label">副标题</div>
								<el-input placeholder="请输入副标题" v-model="item2.desc" clearable @blur="blur" maxlength="5"/>
							</div>
							<div class="itemTitle">
								<div class="label">添加商品</div>
								<el-button type="primary" @click="toSearch(3,index2)">添加</el-button>
								<div class="tip">最多添加20个商品</div>
							</div>
							<el-table :data="item2.subArr" style="width: 100%" border size="small" class="goodsTable" v-if="item2.subArr.length>0">
								<el-table-column type="index" label="序号" width="46" align="center" />
								<el-table-column label="商品信息" header-align="center">
									<template slot-scope="scope">
										<div class="detail">
											<el-image :src="scope.row.picture" />
											<div class="info">
												<div class="xzw_word1">{{scope.row.name}}</div>
												<div>¥{{scope.row.sale_price}}</div>
											</div>
										</div>
									</template>
								</el-table-column>
								<el-table-column label="操作" align="center" width="46">
									<template slot-scope="scope">
										<i class="el-icon-delete-solid" @click="deleteItem(scope,index2)" />
									</template>
								</el-table-column>
							</el-table>
						</div>
						<el-button type="primary" class="addButton" @click="addCate" v-if="attr_obj.cateArr.length<4">添加分类</el-button>
					</el-form-item>
				</template>
			</el-form>
		</div>
		
		<!-- 商品弹窗 -->
		<transition name="el-zoom-in-center">
			<div class="popupBox" v-if="popupShow">
				<div class="popupBoxIn" @click.stop="popupShow=true">
					<div class="popupHeader">
						<div class="headerLeft">
							商品名称
							<el-input @keyup.enter.native="toSearch(1)" placeholder="请输入商品名称" maxlength="50" v-model="keyword" clearable />
							<el-cascader :options="cateList" :props="{ checkStrictly: true ,emitPath:false}" clearable @change="cascaderChange" placeholder="请选择商品分类"/>
						</div>
						<div class="headerRight">
							<el-button type="primary" @click="toSearch(1)">搜索</el-button>
							<el-button @click="toSearch(2)">重置</el-button>
						</div>
					</div>
					<div class="popupCenter">
						<div class="goodsBox scrollbar" @scroll="scrollEvent">
							<div @click="chooseGood(item,1)" class="good" :class="{active:selectIds.indexOf(item.sku_id)>-1}" v-for="(item,index) in goodsList" :key="index">
								<el-image :src="item.picture" fit="cover" />
								<div class="info">
									<div class="name xzw_word2">{{item.name}}</div>
									<div>¥{{item.sale_price}}</div>
								</div>
							</div>
							<div class="empty" v-if="recods==0">商品空空的</div>
						</div>
						<div class="forward">
							<img src="../assets/icon/right_forward.png">
						</div>
						<div class="goodsBox scrollbar">
							<div @click="chooseGood(item,2)" class="good select" v-for="(item,index) in goodsArr" :key="index">
								<el-image :src="item.picture" fit="cover" />
								<div class="info">
									<div class="name xzw_word2">{{item.name}}</div>
									<div>¥{{item.sale_price}}</div>
								</div>
							</div>
							<div class="empty" v-if="goodsArr.length==0">已选商品</div>
						</div>
					</div>
					<div class="popupBottom">
						<el-button type="primary" @click.stop="confirmGood()">确定</el-button>
						<el-button @click.stop="popupShow=false">取消</el-button>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	export default {
		props: {
			is_set_page: Boolean,//是否设置页面属性
			page_info: {} ,//页面信息
			//初始化属性面板
			componentInit:{
				type:Boolean,
				default:false
			},
			//右侧属性书否变化
			componentChange:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				index: '', //点击的键
				attr_obj: {},
				popupShow: false,
				keyword: '',
				page: 1,
				goodsList: [],
				selectIds: [],
				goodsArr: [], //选中的商品
				recods: 1,
				pageSize: 16,
				isReachBottom: true,
				cateList:[],
				cate_id:''//分类id
			}
		},
		watch: {
			componentChange: function() {
				this.attr_obj = JSON.parse(localStorage.getItem('attr_obj'));
			},
			componentInit: function() {
				this.attr_obj = {}
			},
			// 监听组件属性值改变
			attr_change(n, o) {
				let old_data = JSON.stringify(o);
				let new_data = JSON.stringify(n);
				if (o.unique && n.unique == o.unique && old_data != new_data) {
					if (n.imgType == 1 & o.imgType != 1) {
						this.attr_obj.imgArr = [{ img: '', url: '' }]
					}
					if (n.imgType == 2 & o.imgType != 2) {
						this.attr_obj.imgArr = [{ img: '', url: '' }, { img: '', url: '' }]
					}
					if ((n.imgType == 3 & o.imgType != 3) || (n.imgType == 4 & o.imgType != 4)) {
						this.attr_obj.imgArr = [{ img: '', url: '' }, { img: '', url: '' },{ img: '', url: ''}]
					}
					this.update();
				}
			},
			"page_info.background_color": {
				handler: function(n, o) {
					if (o) {
						this.$emit('setPageInfo', this.page_info)
					}
				}
			}
		},
		computed: {
			attr_change() {
				let attr_obj = {};
				for (let k in this.attr_obj) {
					attr_obj[k] = this.attr_obj[k];
				}
				return attr_obj;
			}
		},
		methods: {
			chooseItem(e) {
				this.index = e
			},
			// 图片相关
			uploadImg(file) {
				this.$uploadImg(file)
				.then(res => {
					this.attr_obj.imgArr[this.index].img = res.data.path
					this.update()
				})
				return false
			},
			addImg() {
				this.attr_obj.imgArr.push({
					img: '',
					url: ''
				})
				this.update()
			},
			removeImg(index) {
				this.attr_obj.imgArr.splice(index, 1)
				this.update()
			},
			// 轮播图相关
			uploadSwiper(file) {
				this.$uploadImg(file)
				.then(res => {
					this.attr_obj.swiperArr[this.index].img = res.data.path
					this.update()
				})
				return false
			},
			addSwiper() {
				this.attr_obj.swiperArr.push({
					img: '',
					url: ''
				})
				this.update()
			},
			removeSwiper(index) {
				this.attr_obj.swiperArr.splice(index, 1)
				this.update()
			},
			// 快捷入口相关
			uploadIcon(file) {
				this.$uploadImg(file)
				.then(res => {
					this.attr_obj.iconArr[this.index].img = res.data.path
					this.update()
				})
				return false
			},
			addIcon() {
				this.attr_obj.iconArr.push({
					img: '',
					url: '',
					name: ''
				})
				this.update()
			},
			removeIcon(index) {
				this.attr_obj.iconArr.splice(index, 1)
				this.update()
			},
			// 商品相关
			toSearch(e, index) {
				if (e == 2 || e == 3) {
					this.keyword = ''
				}
				if (e < 4) {
					this.page = 1
					this.goodsList = []
				}
				if (e == 3) {
					this.index = index
					this.selectIds = []
					this.cate_id=''
					if (this.attr_obj.goodsArr) {
						this.goodsArr = JSON.parse(JSON.stringify(this.attr_obj.goodsArr))
					} else {
						this.goodsArr = JSON.parse(JSON.stringify(this.attr_obj.cateArr[index].subArr))
					}
					for (var i in this.goodsArr) {
						this.selectIds.push(this.goodsArr[i].sku_id)
					}
					this.popupShow = true
				}
				if(this.cateList.length==0){
					this.getCate()
				}
				this.$get('/goods/list', {
					shop_keywords: this.keyword,
					page: this.page,
					pageSize: this.pageSize,
					cate_id:this.cate_id
				}).then((res) => {
					this.isReachBottom = true
					this.recods = res.data.pagination.totalCount
					this.goodsList = this.goodsList.concat(res.data.data)
				})
			},
			// 商品分类切换
			cascaderChange(e){
				this.cate_id=e
			},
			getCate(){
				this.$get('/api/index.php/v1/product-category/get-tree')
				.then((res) => {
					var list=[]
					for(var i in res.data){
						list[i]={}
						list[i].label=res.data[i].name
						list[i].value=res.data[i].items[0].category_value
						list[i].children=[]
						for(var j in res.data[i].items){
							for(var k in res.data[i].items[j].children){
								list[i].children.push({
									label:res.data[i].items[j].children[k].category_name,
									value:res.data[i].items[j].children[k].category_value,
									children:[]
								})
								for(var o in res.data[i].items[j].children[k].children){
									list[i].children[k].children.push({
										label:res.data[i].items[j].children[k].children[o].category_name,
										value:res.data[i].items[j].children[k].children[o].category_value,
									})
								}
							}
						}
					}
					this.cateList=list
				})
			},
			chooseGood(item, k) {
				var index = this.selectIds.indexOf(item.sku_id)
				if (index < 0 & k == 1) {
					if (this.selectIds.length < 20) {
						this.selectIds.push(item.sku_id)
						this.goodsArr.push(item)
					} else {
						this.$message.warning('最多添加20个商品！')
					}
				} else {
					this.selectIds.splice(index, 1)
					for (var i in this.goodsArr) {
						if (this.goodsArr[i].sku_id == item.sku_id) {
							this.goodsArr.splice(i, 1)
						}
					}
				}
			},
			confirmGood() {
				this.popupShow = false
				if (this.attr_obj.goodsArr) {
					this.attr_obj.goodsArr = this.goodsArr
				} else {
					this.attr_obj.cateArr[this.index].subArr = this.goodsArr
				}
				this.update()
			},
			// 下拉加载更多商品
			scrollEvent(e) {
				if (e.srcElement.scrollTop + e.srcElement.offsetHeight > e.srcElement.scrollHeight - 30) {
					if (this.page < this.recods / this.pageSize && this.isReachBottom) {
						this.isReachBottom = false
						this.page++
						this.toSearch(4)

					}
				}
			},
			deleteItem(item, index2) {
				var index = item.$index
				this.selectIds.splice(this.selectIds.indexOf(item.row.sku_id), 1)
				if (this.attr_obj.goodsArr) {
					this.attr_obj.goodsArr.splice(index, 1)
					this.goodsArr = JSON.parse(JSON.stringify(this.attr_obj.goodsArr))
				} else {
					this.attr_obj.cateArr[index2].subArr.splice(index, 1)
					this.goodsArr = JSON.parse(JSON.stringify(this.attr_obj.cateArr[index2].subArr))
				}
				this.update()
			},
			// 商品分类相关
			addCate() {
				this.attr_obj.cateArr.push({
					name: '分类名称',
					desc: '副标题',
					subArr: []
				})
				this.update()
			},
			removeCate(index) {
				this.attr_obj.cateArr.splice(index, 1)
				this.update()
			},
			blur() {
				for (var i in this.attr_obj.cateArr) {
					this.attr_obj.cateArr[i].name = this.attr_obj.cateArr[i].name.replace(/\s/g, "")
					this.attr_obj.cateArr[i].desc = this.attr_obj.cateArr[i].desc.replace(/\s/g, "")
					if (this.attr_obj.cateArr[i].name == '') {
						this.attr_obj.cateArr[i].name = '分类'
					}
					if (this.attr_obj.cateArr[i].desc == '') {
						this.attr_obj.cateArr[i].desc = '副标题'
					}
				}
				this.update()
			},
			// 更新数据
			update() {
				localStorage.setItem('attr_obj', JSON.stringify(this.attr_obj));
				this.$emit('save', 1)
			}
		}
	}
</script>

<style lang="scss">
	.rightMenu {
		position: relative;
		width: 400px;
		padding: 20px 0 10px;

		h2 {
			margin-bottom: 20px;
			text-align: center;
			color: #777;
			font-size: 20px;
			width: 400px;
		}

		.attributes {
			.subTitle {
				text-align: center;
				color: #777;
				font-size: 16px;
				margin-bottom: 14px;
			}

			.form {
				padding: 0 25px;
				max-height: calc(100vh - 200px);
				overflow-y: auto;
				overflow-x: hidden;

				.el-form-item {
					margin-bottom: 14px;
				}

				.cateIcon {
					width: 20px;
					max-height: 100%;
				}
			}
		}

		// 上传图片
		.imgAddBox {
			.itemTitle {
				font-size: 14px;
				display: flex;
				align-items: center;

				.label {
					width: 80px;
					color: #606266;
				}

				.tip {
					color: #999;
				}
			}

			.imgItem {
				display: flex;
				align-items: center;
				border: 1px solid #eee;
				border-radius: 4px;
				height: 100px;
				background-color: #f1f1f1;
				position: relative;
				margin-bottom: 16px;
				width: 100%;

				.close {
					position: absolute;
					right: -10px;
					top: -10px;
					color: #666;
					font-size: 20px;
				}

				.itemLeft {
					width: 94px;
					text-align: center;
					font-size: 12px;
					line-height: 16px;

					.img {
						height: 36px;
						height: 36px;

						i {
							font-size: 34px;
							color: #409EFF;
						}

						img {
							height: 34px;
							width: 34px;
						}
					}

					.word {
						color: #666;
						margin: 2px 0;
					}

					.word2 {
						color: #999;
						font-size: 10px;
					}
				}

				.itemRight {
					padding: 6px 10px 6px 0;
					flex: 1;
					height: 100%;
					display: flex;
					flex-direction: column;
					justify-content: center;

					.el-input {
						height: 36px;

						input {
							height: 36px;
						}

						&:nth-child(2) {
							margin-top: 4px;
						}
					}
				}
			}
		}

		.addButton {
			margin: 0 auto;
		}

		//排列样式
		.img_typeBox {
			.el-form-item__content {
				margin: 10px 0 0;

				.el-radio {
					margin: 0 20px 20px 0;
					border: 1px solid transparent;
					height: 80px;
					width: 80px;
					padding: 0;
					display: flex;
					align-items: center;
					justify-content: center;
					.el-radio__label{
						height: 80px;
						width: 80px;
						padding: 0;
						display: flex;
						align-items: center;
						justify-content: center;
					}
					.el-radio__inner {
						display: none;
					}

					&.is-checked {
						border: 1px solid #487FFC;
					}

					img {
						height: 80px;
						width: 80px;
						margin: 0;
					}
				}
			}
		}

		// 添加商品
		.goodsAddBox {
			.itemTitle {
				font-size: 14px;
				color: #606266;
				display: flex;
				align-items: center;
				margin-bottom: 10px;

				.el-button {
					padding: 6px 12px;
				}

				.tip {
					margin-left: 14px;
					color: #999;
				}

				.label {
					width: 80px;
				}

				.el-input {
					flex: 1;

					input {
						height: 32px;
					}
				}
			}

			.goodsTable {
				.el-table__cell {
					padding: 4px 0;
				}

				.detail {
					display: flex;
					align-items: center;

					.el-image {
						height: 44px;
						width: 44px;
					}

					.info {
						height: 100%;
						flex: 1;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						box-sizing: border-box;
						padding: 1px 4px;

						div {
							font-size: 10px;
							transform: scale(0.9);
						}

						div:nth-child(2) {
							color: #FC4E48;
						}
					}
				}

				.el-icon-delete-solid {
					color: #409EFF;
					font-size: 16px;
					cursor: pointer;
				}
			}

			.cateBlock {
				border: 1px solid #eee;
				border-radius: 4px;
				background-color: #f1f1f1;
				padding: 10px;
				margin-bottom: 10px;
				position: relative;

				.close {
					position: absolute;
					right: -10px;
					top: -10px;
					color: #666;
					font-size: 20px;
				}
			}
		}

		// 添加商品
		.popupBox {
			position: fixed;
			z-index: 1001;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: rgba(0, 0, 0, 0.5);
			display: flex;
			align-items: center;
			justify-content: center;

			.popupBoxIn {
				border-radius: 2px;
				width: 870px;
				height: 560px;
				background-color: #fff;
				display: flex;
				justify-content: space-between;
				flex-direction: column;

				.popupHeader {
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 14px 14px;

					.headerLeft {
						display: flex;
						align-items: center;
						width: 700px;
						font-size: 12px;
						.el-input {
							width: 300px;
							margin-left: 16px;

							input {
								font-size: 12px;
								height: 32px;
							}

							i {
								line-height: 32px;
							}
						}
					}

					.headerRight {
						display: flex;
						justify-content: flex-end;
						flex: 1;

						.el-button {
							padding: 8px 16px;
							font-size: 12px;
						}
					}
				}

				.popupCenter {
					flex: 1;
					display: flex;
					justify-content: space-between;
					margin: 0 14px 14px;
					box-sizing: border-box;
					height: 430px;

					.goodsBox {
						display: flex;
						align-content: flex-start;
						flex-wrap: wrap;
						padding: 10px 0 10px 10px;
						border: 1px solid #ddd;
						width: 400px;
						background-color: #F1F1F1;
						overflow-y: auto;
						overflow-x: hidden;

						.good {
							cursor: pointer;
							width: 184px;
							height: 60px;
							display: flex;
							align-items: center;
							margin: 0 8px 8px 0;
							background-color: #fff;
							border-radius: 4px;
							overflow: hidden;
							position: relative;
							border: 1px solid #F1F1F1;

							&:nth-child(2n) {
								margin: 0 0 8px;
							}

							&:hover {
								border: 1px solid #409EFF;
							}

							&.active::before {
								position: absolute;
								content: "";
								right: 0;
								bottom: 0;
								border-left: 17px solid transparent;
								border-bottom: 17px solid #409EFF;
							}

							&.active::after {
								content: "\2714";
								position: absolute;
								color: #fff;
								right: 0;
								bottom: -2px;
								font-size: 12px;
								transform: scale(0.7);
							}

							&.select:hover::before {
								position: absolute;
								z-index: 1;
								top: 0;
								left: 0;
								content: '';
								height: 60px;
								width: 100%;
								background-color: rgba(0, 0, 0, 0.5);
							}

							&.select:hover::after {
								position: absolute;
								z-index: 2;
								content: '\2716';
								left: 50%;
								top: 50%;
								transform: translate(-50%, -50%);
								color: #fff;
								font-size: 20px;
							}

							.el-image {
								height: 60px;
								width: 60px;
								border-radius: 2px 0 0 2px;
							}

							.info {
								height: 100%;
								flex: 1;
								display: flex;
								flex-direction: column;
								justify-content: space-between;
								box-sizing: border-box;
								padding: 2px 6px;

								div {
									font-size: 10px;
									transform: scale(0.9);
								}

								div:nth-child(2) {
									color: #FC4E48;
								}
							}

							.check {
								position: absolute;
								right: 0;
								height: 20px;
							}
						}

						.empty {
							font-size: 16px;
							color: #333;
							text-align: center;
							display: flex;
							align-items: center;
							justify-content: center;
							width: 100%;
							height: 100%;
						}
					}

					.forward {
						display: flex;
						align-items: center;
						justify-content: center;
						height: 100%;
						flex: 1;

						img {
							height: 26px;
							width: 26px;
						}
					}
				}

				.popupBottom {
					padding: 0 14px;
					height: 50px;
					display: flex;
					align-items: center;
					justify-content: flex-end;
					border-top: 1px solid #d8d8d8;

					.el-button {
						padding: 8px 16px;
						font-size: 12px;
					}
				}
			}
		}
	}
</style>
