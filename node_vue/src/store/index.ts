import { createStore } from 'vuex'
import methods from "@/utils/methods.js"

const state = {
    userInfo: {},
	hasLogin:false,
    collapse: false,// 侧边导航折叠
    tagsList: []// 顶部导航标签
}

// state的类型
export type State = typeof state;

// 创建一个新的 store 实例
export default createStore<State>({
    state() {
        return state;
    },
    mutations: {
        // 登录
        login(state, userInfo,type=1) {
            state.userInfo = userInfo;
			state.hasLogin = true;
			if(type==1){
				methods.setStorage("userInfo",userInfo)
			}
        },
		//登出
		logout(state) {
			methods.removeStorage('userInfo')
		    state.userInfo = {};
			state.hasLogin = false;
		},
        // 点击侧边导航栏调用方法
        handleCollapse(state, data) {
            state.collapse = data;
        },
        // 设置顶部导航标签
        setTagsListItem(state, data) {
			let path=data.path.split('?')[0]
			let index=-1
			for(let i in state.tagsList){
				if(state.tagsList[i].path.indexOf(path)>-1){
					index=i
				}
			}
			if(index<0){
				state.tagsList.push(data)
			}else{
				state.tagsList.splice(index,1)
				state.tagsList.push(data)
			}
            
        },
        // 关闭标签
        delTagsListItem(state, data) {
            state.tagsList.splice(data.index, 1)
        },
        // 关闭所有
        closeAll(state) {
            state.tagsList = [{
				name: "Home",
				path: "/home",
				title: "系统首页"
			}]
        },
		// 关闭其他
		closeOther(state, data) {
		    state.tagsList = data;
		}
    },
    actions: {},
    getters: {}
})