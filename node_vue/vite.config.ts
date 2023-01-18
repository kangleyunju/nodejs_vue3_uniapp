import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 引入nodejs的模块
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  // 定义别名
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@c": resolve(__dirname, "./src/components"),
    }
  },
  server:{
	  host:'0.0.0.0',
	  port:8888,
	  https:false
  }
})