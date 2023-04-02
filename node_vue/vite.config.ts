import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 引入nodejs的模块
import { resolve } from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export default defineConfig({
	plugins: [
		vue(),
		createSvgIconsPlugin({
			iconDirs: [resolve(process.cwd(), 'src/assets/svg')],// 指定需要缓存的图标文件夹
			symbolId: 'icon-[dir]-[name]'// 指定symbolId格式
		})
	],
	// 定义别名
	resolve: {
		alias: {
			"@": resolve(__dirname, "./src")
		}
	},
	server: {
		host: '0.0.0.0',
		port: 9001,
		https: false
	}
})