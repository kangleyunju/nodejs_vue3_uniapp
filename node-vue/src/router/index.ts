import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import methods from "@/utils/methods.js"
import store from '@/store';


const routes: RouteRecordRaw[] = [
    {
        path: "/",
        redirect: "/home"
    },
	{
	    path: "/",
	    name: "admin",
	    component: () => import("@/views/index/admin.vue"),
	    children: [
			{
			    path: "/home",
			    name: "Home",
			    meta: {
			        title: '系统首页'
			    },
			    component: () => import("@/views/index/home.vue")
			},
			{
			    path: "/set",
			    name: "Set",
			    meta: {
			        title: '系统设置',
					permission: true
			    },
			    component: () => import("@/views/index/set.vue")
			},
	        {
	            path: "/user/list",
	            name: "userList",
	            meta: {
	                title: '用户列表',
					permission: true
	            },
	            component: () => import("@/views/user/list.vue")
	        },
			{
			    path: "/user/center",
			    name: "userCenter",
			    meta: {
			        title: '个人中心'
			    },
			    component: () => import("@/views/user/center.vue")
			},
			{
			    path: "/goods/list",
			    name: "goodsList",
			    meta: {
			        title: '商品列表'
			    },
			    component: () => import("@/views/goods/list.vue")
			},
			{
			    path: "/goods/add",
			    name: "goodsAdd",
			    meta: {
			        title: '编辑商品'
			    },
			    component: () => import("@/views/goods/add.vue")
			},
			{
			    path: "/diy/list",
			    name: "DiyList",
			    meta: {
			        title: '手机端装修',
					permission: true
			    },
			    component: () => import("@/views/diy/list.vue")
			},
			{
			    path: "/article/list",
			    name: "ArticleList",
			    meta: {
			        title: '文章管理',
					permission: true
			    },
			    component: () => import("@/views/article/list.vue")
			},
			{
			    path: "/article/add",
			    name: "ArticleDetail",
			    meta: {
			        title: '编辑文章',
					permission: true
			    },
			    component: () => import("@/views/article/add.vue")
			}
	    ]
	},
	{
	    path: "/login",
	    name: "Login",
	    meta: {
	        title: '登录'
	    },
	    component: () => import("@/views/index/login.vue")
	},
	{
	    path: "/test",
	    name: "Test",
	    meta: {
	        title: '测试'
	    },
	    component: () => import("@/views/index/test.vue")
	},
	{
	    path: "/diy/detail",
	    name: "DiyDetail",
	    meta: {
	        title: '手机端装修'
	    },
	    component: () => import("@/views/diy/detail.vue")
	},
	{
	    path: "/403",
	    name: "403",
	    meta: {
	        title: '没有权限'
	    },
	    component: () => import("@/views/index/403.vue")
	},
	{
	    path: "/:catchAll(.*)",
	    name: "404",
	    meta: {
	        title: '找不到页面'
	    },
	    component: () => import("@/views/index/404.vue")
	}
]


// 通过 createRouter 创建路由实例，history 属性作为控制路由模式的参数，createWebHashHistory 方法返回的是 hash 模式，createWebHistory 返回的是 history 模式，本项目采用 hash 模式
const router = createRouter({
    history: createWebHashHistory(),
    routes
});

// 导航守卫
router.beforeEach((to, from, next) => {
    document.title = to.meta.title || methods.baseName;
	const userInfo= methods.getStorage('userInfo')
	 if (to.path === '/login') {
		 next()
	 } else {
		 if(userInfo){
		 	store.commit("login", userInfo,2);
		 	if(to.meta.permission){
		 		if(userInfo.is_admin==1){
		 			next()
		 		}else{
		 			next('/403');
		 		}
		 	}else{
		 		next();
		 	}
		 }else{
		 	next('/login');
		 }
	 }
})

export default router;