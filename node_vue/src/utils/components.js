/**公共属性
* @param show 是否显示模块
* @param titleShow 是否显示模块名称
* @param title 模块名称
* @param sorts 组件名
* @param name 组件名
* @param img_url 组件图标
* @param paddingTop 上间距
* @param paddingBottom 下间距
* @param theme 主题,default|primary|error|warning|success|info
* @param bgColor 背景色
* @param height 模块高度
* @param max 最大值
* @param min 最小值
* @param radius 圆角
* @param goodsType 商品排列样式
* @param swiper_auto 轮播图自动轮播
* @param swiper_dot 轮播图指示点
* @param swiper_type 轮播图类型
* @param notice_icon 公告是否显示喇叭
* @param notice_direction 公告方向
* @param notice_more 是否有查看更多
* @param imgType 图片排列样式
* @param imgArr 图片数组
* @param goodsArr 商品数组
* @param page 快捷入口是否分页
* @param iconArr 入口数组 
*/

let list = [
	{	
		id:1,
		sorts: 'diy-icon',
		name: '快捷入口',
		img_url: '../src/assets/img/left_entrance.png',
		show:true,
		page:true,
		paddingTop:10,
		paddingBottom:10,
		iconArr: [{img:'',url:'',name:''},{img:'',url:'',name:''},{img:'',url:'',name:''},{img:'',url:'',name:''},{img:'',url:'',name:''}]
	},
	{
		id:2,
		sorts: 'diy-image',
		name: '图片',
		img_url: '../src/assets/img/left_img.png',
		show:true,
		titleShow:false,
		title:'',
		paddingTop:10,
		paddingBottom:10,
		height:175,
		radius:10,
		imgType:1,
		max:355,
		min:50,
		imgArr:[{img:'',url:''}]
	},
	{
		id:3,
		sorts: 'diy-swiper',
		name: '轮播图',
		img_url: '../src/assets/img/left_banner.png',
		show:true,
		titleShow:false,
		title:'',
		swiper_auto:true,
		swiper_dot:1,
		swiper_type:1,
		paddingTop:10,
		paddingBottom:10,
		height:140,
		radius:10,
		max:200,
		min:100,
		swiperArr:[{img:'',url:''}]
	},
	{
		id:4,
		sorts: 'diy-notice',
		name: '公告',
		img_url: '../src/assets/img/left_notice.png',
		show:true,
		theme: "primary",
		notice_direction:'column',
		notice_icon:true,
		notice_more:true,
		marginTop:0,
		marginBottom:0
	},
	{
		id:5,
		sorts: 'diy-goods',
		name: '商品',
		img_url: '../src/assets/img/left_goods.png',
		show:true,
		titleShow:false,
		title:'',
		paddingTop:0,
		paddingBottom:0,
		max:30,
		min:0,
		goodsType:1,
		goodsArr:[]
	},
	{
		id:6,
		sorts: 'diy-cate',
		name: '商品分类',
		img_url: '../src/assets/img/left_tab.png',
		show:true,
		paddingTop:0,
		paddingBottom:0,
		goodsType:1,
		max:30,
		min:0,
		cateArr:[{name:'分类名称',desc:'副标题',subArr:[]}]
	},
	{
		id:7,
		sorts: 'diy-empty',
		name: '空白',
		img_url: '../src/assets/img/left_empty.png',
		show:true,
		bgColor:'#fff',
		height:40
	}
]

export default list