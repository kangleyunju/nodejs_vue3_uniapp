import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as elementIcon from '@element-plus/icons-vue'//移入图标
import ElIcons from '@/components/elIcons/elIcons.vue'//封装elIcons
import methods from '@/utils/methods'//引入公共方法
import VueDraggable from 'vuedraggable'//拖拽
import zhCn from 'element-plus/es/locale/lang/zh-cn'//国际化

const app = createApp(App);

//定义一些全局方法和变量
app.config.globalProperties.baseUrl = methods.baseUrl
app.config.globalProperties.$get = methods.$get
app.config.globalProperties.$post = methods.$post
app.config.globalProperties.getStorage = methods.getStorage
app.config.globalProperties.setStorage = methods.setStorage
app.config.globalProperties.removeStorage = methods.removeStorage
app.config.globalProperties.$uploadImg = methods.$uploadImg
app.config.globalProperties.changeTime = methods.changeTime
app.config.globalProperties.phoneUrl = methods.phoneUrl

// 统一注册el-icon图标
Object.keys(elementIcon).forEach(key => {
	app.component(key, elementIcon[key])
})

// 全局注册svg组件
import 'virtual:svg-icons-register'
import svgIcon from '@/components/svgIcon/svgIcon.vue'

app.use(router)
	.use(ElementPlus, { locale: zhCn })
	.use(store)
	.mixin(methods)
	.component('svg-icon', svgIcon)
	.component('ElIcons', ElIcons)
	.component('sortable', VueDraggable)
	.mount('#app')

export default app