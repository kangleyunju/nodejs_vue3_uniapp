<template>
  <div class="error-page">
    <div class="error-code">4<span>0</span>4</div>
    <div class="error-desc">啊哦~ 你所访问的页面不存在</div>
    <div class="error-handle">
      <el-button type="primary" size="large" @click="goIndex">返回首页</el-button>
      <el-button type="info" size="large" @click="goBack">返回上一页</el-button>
    </div>
  </div>
</template>
<script>
  import { useRouter } from "vue-router";
  export default {
    setup() {
      const router = useRouter();
      const goIndex = () => {
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
  }
</script>
<style lang="scss" scoped>
  .error-page {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    .error-code {
      line-height: 1;
      font-size: 250px;
      font-weight: bolder;
      color: #2d8cf0;
    }
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
