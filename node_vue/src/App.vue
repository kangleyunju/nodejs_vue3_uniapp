<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
</script>

<style lang="scss">
	body{
		margin: 0;
		padding: 0;
		color:#333333;
	}
	//禁复制
	.noCopy{
		scrollbar-color:#ccc;
		scrollbar-width:thin;
		-moz-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
		-khtml-user-select: none;
		user-select: none;
	}
	//谷歌滚动条样式
	::-webkit-scrollbar {
		height: 6px;
		width: 6px;
	}
	//内条
	::-webkit-scrollbar-thumb {
		background: #d7d7d7;
		border-radius: 10px;
	}
	//外条
	::-webkit-scrollbar-track {
		background-color: #f2f2f2;
	}
	//火狐滚动条样式
	* {
		scrollbar-color: #d7d7d7 #f2f2f2; //滑块颜色  滚动条背景颜色
		scrollbar-width: thin; // 滚动条宽度有三种：thin、auto、none
	}
	.xzw_word1{
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}
	.xzw_word2{
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.pagination{
		text-align: center;
		margin: 10px 0 0;
	}
  .el-table{
    .red:hover{
      color: #f00;
    }
  }
</style>
