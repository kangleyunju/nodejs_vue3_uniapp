<template>
    <div class="error-page">
        <div class="error-code">4<span>0</span>3</div>
        <div class="error-desc">啊哦~ 你没有权限访问该页面</div>
        <div class="error-handle">
			<el-button  type="warning" size="large" @click="goIndex">返回首页</el-button>
            <el-button  type="info" size="large" @click="goBack">返回上一页</el-button>
        </div>
    </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
    setup() {
        const router = useRouter();
		const goIndex =()=>{
			router.push('/')
		}
        const goBack = () => {
            router.go(-1)
        }
        return {
			goIndex,
            goBack
        }
    }
};
</script>


<style lang="scss" scoped>
.error-page {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100vh;
	.error-code {		line-height: 1;		font-size: 250px;		font-weight: bolder;		color: #f02d2d;	}
	.error-code span {
	    color: #00a854;
	}
	.error-desc {
	    font-size: 30px;
	    color: #777;
	}
	.error-handle {
	    margin-top: 30px;
	}
}
</style>
