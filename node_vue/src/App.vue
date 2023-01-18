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
	
	.noCopy{
		scrollbar-color:#ccc;
		scrollbar-width:thin;
		-moz-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
		-khtml-user-select: none;
		user-select: none;
	}
	/* 滚动条样式 */
	.scrollbar::-webkit-scrollbar {
		width: 5px;
	}
	.scrollbar::-webkit-scrollbar-thumb {
		width: 3px;
		background-color: #ccc;
		border-radius: 35px;
	}
	.scrollbar::-webkit-scrollbar-track {
		border: 1px solid #f1f1f1;
		box-shadow: 0 0 2px #eee inset;
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
</style>
