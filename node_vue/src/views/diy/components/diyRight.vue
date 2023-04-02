<template>
	<div class="rightMenu">
		<h2>{{isPage?'页面':'属性'}}设置</h2>
		<!-- 页面设置 -->
		<div class="attributes" v-if="isPage">
			<el-form label-width="80px" label-position="right">
				<el-form-item label="页面名称" required>
					<el-input v-model="pageInfo.name" placeholder="仅后台可见" maxlength="10" clearable />
				</el-form-item>
				<el-form-item label="页面标题">
					<el-input v-model="pageInfo.page_name" placeholder="手机端顶部标题" maxlength="15" clearable />
				</el-form-item>
				<el-form-item label="页面路径">
					<el-input v-model="pageInfo.path" placeholder="请输入页面路径" maxlength="20" clearable />
				</el-form-item>
				<el-form-item label="背景颜色">
					<el-color-picker v-model="pageInfo.background_color" />
					<div style="margin-left:12px">{{pageInfo.background_color}}</div>
				</el-form-item>
			</el-form>
		</div>
		<!-- 组件属性 -->
		<div class="attributes" v-else>
			<div class="subTitle">{{attrObj.name}}</div>
			<el-form label-width="80px" label-position="left">
				<template v-for="(item,index) in attrObj">
					<!-- 公共属性 -->
					<el-form-item label="显示模块" :key="index" v-if="index=='show'">
						<el-radio v-model="attrObj.show" :label="true">是</el-radio>
						<el-radio v-model="attrObj.show" :label="false">否</el-radio>
					</el-form-item>
					<el-form-item label="显示标题" :key="index" v-if="index=='titleShow'&&attrObj.show">
						<el-radio v-model="attrObj.titleShow" :label="true">是</el-radio>
						<el-radio v-model="attrObj.titleShow" :label="false">否</el-radio>
					</el-form-item>
					<el-form-item label="模块标题" :key="index" v-if="index=='title'&&attrObj.titleShow&&attrObj.show">
						<el-input v-model="attrObj.title" maxlength="10" clearable placeholder="请输入模块标题" />
					</el-form-item>
					<el-form-item label="主题类型" :key="index" v-if="index=='theme'&&attrObj.show">
						<el-radio v-model="attrObj.theme" label="default">黑色</el-radio>
						<el-radio v-model="attrObj.theme" label="primary">蓝色</el-radio>
						<el-radio v-model="attrObj.theme" label="error">红色</el-radio>
						<el-radio v-model="attrObj.theme" label="warning">橙色</el-radio>
						<el-radio v-model="attrObj.theme" label="success">绿色</el-radio>
						<el-radio v-model="attrObj.theme" label="info">灰色</el-radio>
					</el-form-item>
					<el-form-item label="背景色" :key="index" v-if="index=='bgColor'&&attrObj.show">
						<el-color-picker v-model="attrObj.bgColor"></el-color-picker>
					</el-form-item>
					<el-form-item label="模块高度" :key="index" v-if="index=='height'&&attrObj.show">
						<el-slider size="small" v-model="attrObj.height" :step="1" :min="attrObj.min||10" :max="attrObj.max||500" />
					</el-form-item>
					<el-form-item label="上间距" :key="index" v-if="index=='paddingTop'&&attrObj.show">
						<el-slider size="small" v-model="attrObj.paddingTop" :step="1" :min="0" :max="100" />
					</el-form-item>
					<el-form-item label="下间距" :key="index" v-if="index=='paddingBottom'&&attrObj.show">
						<el-slider size="small" v-model="attrObj.paddingBottom" :step="1" :min="0" :max="100" />
					</el-form-item>
					<el-form-item label="圆角" :key="index" v-if="index=='radius'&&attrObj.show">
						<el-slider size="small" v-model="attrObj.radius" :step="1" :min="0" :max="100" />
					</el-form-item>
					<!-- 公告 -->
					<el-form-item label="方向" :key="index" v-if="index=='notice_direction'&&attrObj.show">
						<el-radio v-model="attrObj.notice_direction" label="column">垂直</el-radio>
						<el-radio v-model="attrObj.notice_direction" label="row">水平</el-radio>
					</el-form-item>
					<el-form-item label="显示喇叭" :key="index" v-if="index=='notice_icon'&&attrObj.show">
						<el-radio v-model="attrObj.notice_icon" :label="true">是</el-radio>
						<el-radio v-model="attrObj.notice_icon" :label="false">否</el-radio>
					</el-form-item>
					<el-form-item label="显示更多" :key="index" v-if="index=='notice_more'&&attrObj.show">
						<el-radio v-model="attrObj.notice_more" :label="true">是</el-radio>
						<el-radio v-model="attrObj.notice_more" :label="false">否</el-radio>
					</el-form-item>
					<!-- 轮播图 -->
					<el-form-item label="自动轮播" :key="index" v-if="index=='swiper_auto'&&attrObj.show">
						<el-radio v-model="attrObj.swiper_auto" :label="true">是</el-radio>
						<el-radio v-model="attrObj.swiper_auto" :label="false">否</el-radio>
					</el-form-item>
					<el-form-item label="3D切换" :key="index" v-if="index=='swiper_type'&&attrObj.show">
						<el-radio v-model="attrObj.swiper_type" :label="1">关闭</el-radio>
						<el-radio v-model="attrObj.swiper_type" :label="2">开启</el-radio>
					</el-form-item>
					<el-form-item label="指示点" :key="index" v-if="index=='swiper_dot'&&attrObj.show">
						<el-radio v-model="attrObj.swiper_dot" :label="1">块状</el-radio>
						<el-radio v-model="attrObj.swiper_dot" :label="2">圆点</el-radio>
						<el-radio v-model="attrObj.swiper_dot" :label="3">数字</el-radio>
						<el-radio v-model="attrObj.swiper_dot" :label="4">隐藏</el-radio>
					</el-form-item>
					<el-form-item :key="index" v-if="index=='swiperArr'&&attrObj.show" label-width="0" class="imgAddBox">
						<div class="itemTitle">
							<div class="label">上传图片</div>
							<span class="tip">最多5张</span>
							<el-button type="primary" size="mini" @click="addSwiper" v-if="attrObj.swiperArr.length<5">添加图片</el-button>
						</div>
						<div class="imgItem" v-for="(item2,index2) in attrObj.swiperArr" :key="index2" @click="chooseItem(index2)">
							<i class="el-icon-error" v-if="index2>0" @click="removeSwiper(index2)"></i>
							<el-upload class="itemLeft" action="#" :show-file-list="false" :limit="1" accept="image/*" :before-upload="uploadSwiper">
								<div class="img" v-if="item2.img==''">
									<i class="el-icon-circle-plus" />
									<div class="word">选择图片</div>
									<div class="word2">355*{{attrObj.height}}</div>
								</div>
								<el-image :src="item2.img" v-else fit="cover" />
							</el-upload>
							<div class="itemRight">
								<el-input placeholder="请输入跳转链接" v-model="item2.url" clearable @blur="update()" />
							</div>
						</div>
					</el-form-item>
					<!-- 图片 -->
					<el-form-item label="排列样式" :key="index" v-if="index=='imgType'&&attrObj.show" class="img_typeBox">
						<el-radio v-model="attrObj.imgType" :label="1">
							<img src="@/assets/diy/right_img_type1.png" />
						</el-radio>
						<el-radio v-model="attrObj.imgType" :label="2">
							<img src="@/assets/diy/right_img_type2.png" />
						</el-radio>
						<el-radio v-model="attrObj.imgType" :label="3">
							<img src="@/assets/diy/right_img_type3.png" />
						</el-radio>
						<el-radio v-model="attrObj.imgType" :label="4">
							<img src="@/assets/diy/right_img_type4.png" />
						</el-radio>
					</el-form-item>
					<el-form-item :key="index" v-if="index=='imgArr'&&attrObj.show" label-width="0" class="imgAddBox">
						<div class="itemTitle">
							<div class="label">上传图片</div>
							<el-button type="primary" size="mini" @click="addImg" v-if="attrObj.imgType==1&attrObj.imgArr.length==1">添加图片</el-button>
							<div class="tip" v-if="attrObj.imgType==1">最多2张</div>
							<div class="tip" v-if="attrObj.imgType==2">左1右1</div>
							<div class="tip" v-if="attrObj.imgType==3">左1右2</div>
							<div class="tip" v-if="attrObj.imgType==4">左2右1</div>
						</div>
						<div class="imgItem" v-for="(item2,index2) in attrObj.imgArr" :key="index2" @click="chooseItem(index2)">
							<i class="el-icon-error" v-if="attrObj.imgType==1&index2==1" @click="removeImg(index2)" />
							<el-upload class="itemLeft" action="#" :show-file-list="false" :limit="1" accept="image/*" :before-upload="uploadImg">
								<div class="img" v-if="item2.img==''">
									<i class="el-icon-circle-plus" />
									<div class="word">选择图片</div>
									<div class="word2" v-if="attrObj.imgType==1">355*{{attrObj.height}}</div>
									<div class="word2" v-if="attrObj.imgType==2">175*{{attrObj.height}}</div>
									<div class="word2" v-if="(attrObj.imgType==3&index2==0)||(attrObj.imgType==4&index2==2)">175*{{attrObj.height}}</div>
									<div class="word2" v-if="(attrObj.imgType==3&index2!=0)||(attrObj.imgType==4&index2!=2)">175*{{(attrObj.height-5)/2}}</div>
								</div>
								<el-image :src="item2.img" v-else fit="cover" />
							</el-upload>
							<div class="itemRight">
								<el-input placeholder="请输入跳转链接" v-model="item2.url" clearable @blur="update" />
							</div>
						</div>
					</el-form-item>
					<!-- 快捷入口 -->
					<el-form-item label="是否分页" :key="index" v-if="index=='page'&&attrObj.show">
						<el-radio v-model="attrObj.page" :label="true">是</el-radio>
						<el-radio v-model="attrObj.page" :label="false">否</el-radio>
					</el-form-item>
					<el-form-item :key="index" v-if="index=='iconArr'&&attrObj.show" label-width="0" class="imgAddBox">
						<div class="itemTitle">
							<div class="label">添加入口</div>
							<div class="tip">最多20个</div>
							<el-button type="primary" v-if="attrObj.iconArr.length<20" size="mini" @click="addIcon">添加入口</el-button>
						</div>
						<div class="imgItem" v-for="(item2,index2) in attrObj.iconArr" :key="index2" @click="chooseItem(index2)">
							<i class="el-icon-error" v-if="index2>0" @click="removeIcon(index2)" />
							<el-upload class="itemLeft" action="#" :show-file-list="false" :limit="1" accept="image/*" :before-upload="uploadIcon">
								<div class="img" v-if="item2.img==''">
									<i class="el-icon-circle-plus" />
									<div class="word">选择图片</div>
									<div class="word2">50*50</div>
								</div>
								<el-image :src="item2.img" v-else fit="cover" />
							</el-upload>
							<div class="itemRight">
								<el-input placeholder="请输入名称" v-model="item2.name" clearable @blur="update" maxlength="5" />
								<el-input placeholder="请输入跳转链接" v-model="item2.url" clearable @blur="update" maxlength="100" />
							</div>
						</div>
					</el-form-item>
					<!-- 商品列表 -->
					<el-form-item label="排列样式" :key="index" v-if="index=='goodsType'&&attrObj.show">
						<el-radio-group v-model="attrObj.goodsType" size="mini">
							<el-radio-button :label="1" border>
								<svg-icon iconClass="cate1" />
							</el-radio-button>
							<el-radio-button :label="2" border>
								<svg-icon iconClass="cate2" />
							</el-radio-button>
						</el-radio-group>
					</el-form-item>
					<el-form-item :key="index" v-if="index=='goodsArr'&&attrObj.show" label-width="0" class="goodsAddBox">
						<div class="itemTitle">
							<div class="label">添加商品</div>
							<el-button type="primary" size="mini" @click="toSearch(3)">添加</el-button>
							<div class="tip">最多20个</div>
						</div>
						<el-table :data="attrObj.goodsArr" style="width: 100%" border size="small" class="goodsTable" v-if="attrObj.goodsArr.length>0">
							<el-table-column type="index" label="序号" width="46" align="center" />
							<el-table-column label="商品信息" header-align="center">
								<template #default="scope">
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
								<template #default="scope">
									<el-icons name="Delete" @click="deleteItem(scope)" />
								</template>
							</el-table-column>
						</el-table>
					</el-form-item>
					<!-- 商品分类 -->
					<el-form-item :key="index" v-if="index=='cateArr'&&attrObj.show" label-width="0" class="goodsAddBox">
						<div class="itemTitle">
							<div class="label">添加分类</div>
							<el-button type="primary" size="mini" @click="addCate">添加</el-button>
							<div class="tip">最多4个</div>
						</div>
						<div class="cateBlock" v-for="(item2,index2) in attrObj.cateArr" :key="index2">
							<i class="el-icon-error" v-if="index2>0" @click="removeCate(index2)"></i>
							<div class="itemTitle">
								<div class="label">分类名称</div>
								<el-input placeholder="请输入分类名称" v-model="item2.name" clearable @blur="blur" maxlength="5" />
							</div>
							<div class="itemTitle">
								<div class="label">副标题</div>
								<el-input placeholder="请输入副标题" v-model="item2.desc" clearable @blur="blur" maxlength="5" />
							</div>
							<div class="itemTitle">
								<div class="label">添加商品</div>
								<el-button type="primary" @click="toSearch(3,index2)" size="mini">添加</el-button>
								<div class="tip">最多20个</div>
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
							<el-input @keyup.enter.native="toSearch(1)" placeholder="请输入商品名称" maxlength="50" v-model="keyword" clearable />
							<el-cascader :options="cateList" :props="{ checkStrictly: true ,emitPath:false}" clearable @change="cascaderChange" placeholder="请选择商品分类" />
						</div>
						<div class="headerRight">
							<el-button type="primary" size="mini" @click="toSearch(1)">搜索</el-button>
							<el-button size="mini" @click="toSearch(2)">重置</el-button>
						</div>
					</div>
					<div class="popupCenter">
						<div class="goodsBox" @scroll="scrollEvent">
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
							<el-icons name="Right" />
						</div>
						<div class="goodsBox">
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
						<el-button type="primary" size="mini" @click.stop="confirmGood()">确定</el-button>
						<el-button size="mini" @click.stop="popupShow=false">取消</el-button>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>
<script>
	export default {
		props: {
			pageInfo: {}, //页面信息
			attrObj: {} //组件属性
		},
		data() {
			return {
				isPage: true, //是否设置页面属性
				index: '', //点击的键
				popupShow: false,
				keyword: '',
				page: 1,
				goodsList: [],
				selectIds: [],
				goodsArr: [], //选中的商品
				recods: 1,
				pageSize: 16,
				isReachBottom: true,
				cateList: [],
				cate_id: '' //分类id
			}
		},
		watch: {
			attrObj(n, o) {
				this.isPage = n.name ? false : true
			},
			// 监听组件属性值改变
			attr_change(n, o) {
				let old_data = JSON.stringify(o);
				let new_data = JSON.stringify(n);
				if (o.unique && n.unique == o.unique && old_data != new_data) {
					if (n.imgType == 1 & o.imgType != 1) {
						this.attrObj.imgArr = [{ img: '', url: '' }]
					}
					if (n.imgType == 2 & o.imgType != 2) {
						this.attrObj.imgArr = [{ img: '', url: '' }, { img: '', url: '' }]
					}
					if ((n.imgType == 3 & o.imgType != 3) || (n.imgType == 4 & o.imgType != 4)) {
						this.attrObj.imgArr = [{ img: '', url: '' }, { img: '', url: '' }, { img: '', url: '' }]
					}
					this.update();
				}
			},
			"pageInfo.background_color": {
				handler: function(n, o) {
					if (o) {
						this.$emit('setPageInfo', this.pageInfo)
					}
				}
			}
		},
		computed: {
			attr_change() {
				let attrObj = {};
				for (let k in this.attrObj) {
					attrObj[k] = this.attrObj[k];
				}
				return attrObj;
			}
		},
		methods: {
			chooseItem(e) {
				this.index = e
			},
			// 图片相关
			uploadImg(file) {
				this.fileToBase64(file).then(res => {
					this.attrObj.imgArr[this.index].img = res
					this.update()
				})
				return false
			},
			addImg() {
				this.attrObj.imgArr.push({
					img: '',
					url: ''
				})
				this.update()
			},
			removeImg(index) {
				this.attrObj.imgArr.splice(index, 1)
				this.update()
			},
			// 轮播图相关
			uploadSwiper(file) {
				this.fileToBase64(file).then(res => {
					this.attrObj.swiperArr[this.index].img = res
					this.update()
				})
				return false
			},
			addSwiper() {
				this.attrObj.swiperArr.push({
					img: '',
					url: ''
				})
				this.update()
			},
			removeSwiper(index) {
				this.attrObj.swiperArr.splice(index, 1)
				this.update()
			},
			// 快捷入口相关
			uploadIcon(file) {
				this.fileToBase64(file).then(res => {
					this.attrObj.iconArr[this.index].img = res
					this.update()
				})
				return false
			},
			addIcon() {
				this.attrObj.iconArr.push({
					img: '',
					url: '',
					name: ''
				})
				this.update()
			},
			removeIcon(index) {
				this.attrObj.iconArr.splice(index, 1)
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
					this.cate_id = ''
					if (this.attrObj.goodsArr) {
						this.goodsArr = JSON.parse(JSON.stringify(this.attrObj.goodsArr))
					} else {
						this.goodsArr = JSON.parse(JSON.stringify(this.attrObj.cateArr[index].subArr))
					}
					for (var i in this.goodsArr) {
						this.selectIds.push(this.goodsArr[i].sku_id)
					}
					this.popupShow = true
				}
				if (this.cateList.length == 0) {
					this.getCate()
				}
				if (this.isApi) {
					this.$get('/goods/list', {
						keyword: this.keyword,
						page: this.page,
						pageSize: this.pageSize,
						cate_id: this.cate_id
					}).then((res) => {
						this.isReachBottom = true
						this.recods = res.data.pagination.totalCount
						this.goodsList = this.goodsList.concat(res.data.data)
					})
				} else {
					let res = {
						data: [{
							name: 'Apple iPhone 13 (A2634) 128GB 午夜色 支持移动联通电信5G 双卡双待手机',
							sale_price: 5999.00,
							sku_id: 1,
							picture: 'https://img10.360buyimg.com/n1/s450x450_jfs/t1/128930/6/25398/106509/62286809Ecde9efc5/16e8ebc319a86f4c.jpg'
						}, {
							name: '新疆阿克苏冰糖心苹果新鲜水果时令红富士苹果生鲜礼盒 10斤精选大果 80-85mm普通装',
							sale_price: 64.00,
							sku_id: 2,
							picture: 'https://img13.360buyimg.com/n1/jfs/t1/68734/2/21512/117408/63199212Ec5d6c6fb/b4c90c1305cf043a.jpg'
						}],
						recods: 1
					}
					this.isReachBottom = true
					this.recods = res.recods
					this.goodsList = this.goodsList.concat(res.data)
				}
			},
			// 商品分类切换
			cascaderChange(e) {
				this.cate_id = e
			},
			getCate() {
				if (this.isApi) {
					this.$get('/api/index.php/v1/product-category/get-tree').then((res) => {
						var list = []
						for (var i in res.data) {
							list[i] = {}
							list[i].label = res.data[i].name
							list[i].value = res.data[i].items[0].category_value
							list[i].children = []
							for (var j in res.data[i].items) {
								for (var k in res.data[i].items[j].children) {
									list[i].children.push({
										label: res.data[i].items[j].children[k].category_name,
										value: res.data[i].items[j].children[k].category_value,
										children: []
									})
									for (var o in res.data[i].items[j].children[k].children) {
										list[i].children[k].children.push({
											label: res.data[i].items[j].children[k].children[o].category_name,
											value: res.data[i].items[j].children[k].children[o].category_value,
										})
									}
								}
							}
						}
						this.cateList = list
					})
				} else {
					this.cateList = []
				}
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
				if (this.attrObj.goodsArr) {
					this.attrObj.goodsArr = this.goodsArr
				} else {
					this.attrObj.cateArr[this.index].subArr = this.goodsArr
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
				if (this.attrObj.goodsArr) {
					this.attrObj.goodsArr.splice(index, 1)
					this.goodsArr = JSON.parse(JSON.stringify(this.attrObj.goodsArr))
				} else {
					this.attrObj.cateArr[index2].subArr.splice(index, 1)
					this.goodsArr = JSON.parse(JSON.stringify(this.attrObj.cateArr[index2].subArr))
				}
				this.update()
			},
			// 商品分类相关
			addCate() {
				if (this.attrObj.cateArr.length > 3) {
					this.$message.warning("最多添加4个分类")
					return
				}
				this.attrObj.cateArr.push({
					name: '分类名称',
					desc: '副标题',
					subArr: []
				})
				this.update()
			},
			removeCate(index) {
				this.attrObj.cateArr.splice(index, 1)
				this.update()
			},
			blur() {
				for (var i in this.attrObj.cateArr) {
					this.attrObj.cateArr[i].name = this.attrObj.cateArr[i].name.replace(/\s/g, "")
					this.attrObj.cateArr[i].desc = this.attrObj.cateArr[i].desc.replace(/\s/g, "")
					if (this.attrObj.cateArr[i].name == '') {
						this.attrObj.cateArr[i].name = '分类'
					}
					if (this.attrObj.cateArr[i].desc == '') {
						this.attrObj.cateArr[i].desc = '副标题'
					}
				}
				this.update()
			},
			// 更新数据
			update() {
				this.$emit('update', this.attrObj)
			}
		}
	}
</script>
<style lang="scss">
	.rightMenu {
		width: 380px;
		background-color: #fff;
		h2 {
			text-align: center;
			color: #777;
			font-size: 20px;
			line-height: 60px;
		}
		.attributes {
			.subTitle {
				text-align: center;
				color: #777;
				font-size: 16px;
				margin-bottom: 14px;
			}
			.el-form {
				padding: 0 16px;
				max-height: calc(100vh - 160px);
				overflow-y: auto;
				overflow-x: hidden;
				.el-form-item {
					margin-bottom: 14px;
					.itemTitle {
						font-size: 14px;
						display: flex;
						align-items: center;
						margin-bottom: 14px;
						.label {
							color: #606266;
							width: 80px;
						}
						.tip {
							color: #999;
							margin-right: 14px;
						}
						.el-button {
							margin-right: 14px;
						}
						.el-input {
							flex: 1;
							input {
								height: 32px;
							}
						}
					}
					.el-icon-error {
						position: absolute;
						right: -10px;
						top: -10px;
						color: #666;
						font-size: 20px;
						cursor: pointer;
						&:hover {
							color: var(--color-danger);
						}
					}
				}
				// 上传图片
				.imgAddBox {
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
						.itemLeft {
							width: 94px;
							line-height: 16px;
							.el-upload--text {
								width: 100%;
								.img {
									font-size: 12px;
									text-align: center;
									i {
										font-size: 34px;
										color: var(--color-primary);
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
								.el-image {
									height: 76px;
									width: 76px;
								}
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
				//排列样式
				.img_typeBox {
					.el-form-item__content {
						margin: 10px 0 0;
						display: flex;
						flex-wrap: wrap;
						.el-radio {
							margin: 0 20px 20px 0;
							border: 1px solid transparent;
							height: 80px;
							width: 80px;
							padding: 0;
							display: flex;
							align-items: center;
							justify-content: center;
							.el-radio__label {
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
								border: 1px solid var(--color-primary);
							}
							&:nth-child(3), &:nth-child(4) {
								margin-bottom: 0;
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
									color: var(--color-danger);
								}
							}
						}
						.el-icon {
							color: var(--color-primary);
							font-size: 16px;
							cursor: pointer;
							&:hover {
								color: var(--color-danger);
							}
						}
					}
					.cateBlock {
						border: 1px solid #eee;
						border-radius: 4px;
						background-color: #f1f1f1;
						padding: 10px;
						margin-bottom: 10px;
						position: relative;
						.itemTitle {
							margin: 0;
						}
					}
				}
			}
		}
		// 添加商品弹窗
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
				border-radius: 4px;
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
					padding: 12px;
					border-bottom: 1px solid #d8d8d8;
					box-sizing: border-box;
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
							font-size: 12px;
						}
					}
				}
				.popupCenter {
					flex: 1;
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin: 0 16px;
					box-sizing: border-box;
					.goodsBox {
						display: flex;
						align-content: flex-start;
						flex-wrap: wrap;
						padding: 8px;
						box-sizing: border-box;
						border: 1px solid #ddd;
						width: 400px;
						background-color: #F1F1F1;
						height: 420px;
						overflow-y: auto;
						.good {
							cursor: pointer;
							width: 180px;
							height: 64px;
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
								border: 1px solid var(--color-primary);
							}
							&.active::before {
								position: absolute;
								content: "";
								right: 0;
								bottom: 0;
								border-left: 17px solid transparent;
								border-bottom: 17px solid var(--color-primary);
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
								height: 100%;
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
									color: var(--color-danger);
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
						border-radius: 4px;
						height: 26px;
						width: 26px;
						background-color: var(--color-primary);
						i {
							color: #fff;
						}
					}
				}
				.popupBottom {
					padding: 12px;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					justify-content: flex-end;
					border-top: 1px solid #d8d8d8;
					.el-button {
						font-size: 12px;
					}
				}
			}
		}
	}
</style>