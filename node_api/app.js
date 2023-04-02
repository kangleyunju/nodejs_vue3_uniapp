//导入express框架
const express = require("express");
const app = express();
//解决跨域问题
const cors = require('cors');
app.use(cors());
// 引入WebSocket 的ws模块
const WebSocketServer = require('ws').Server
const io = new WebSocketServer({ port: 8000 });
io.on('connection', function(socket) {
	socket.on('message', function(message) {
		broadcast(JSON.parse(message))
	})
	socket.on('close', (message) => {
		//刷新的时候也会走到这,返回数字,不知道是什么,这边过滤一下
		if (typeof(message) != 'number') {
			broadcast(JSON.parse(message))
		}
	})
})
// 定义一个广播方法
function broadcast(message) {
	let onLine = io._server._connections
	let send = {
		type: "system",
		onLine: onLine
	}
	switch (message.type) {
		case "login":
			send.data = message.nickname + '进入了聊天室'
			break;
		case "logout":
			send.data = message.nickname + '离开了聊天室'
			break;
		case "ping":
			send.type = "pong"
			break;
		case "say":
			send.type = "say"
			send.data = message.data
			send.nickname = message.nickname
			break;
	}
	setTimeout(() => {
		send.onLine = io._server._connections
		io.clients.forEach(function each(socket) {
			socket.send(JSON.stringify(send))
		})
	}, 100)
}
// 中间件,表单提交
const bodyParser = require('body-parser');
app.use(bodyParser.json()); //x-www-form-urlencoded方式提交
app.use(bodyParser.urlencoded({ extended: true })); //application/json方式提交
//引入os,获取本地ip
const os = require('os')
const network = os.networkInterfaces()
const ip = network[Object.keys(network)[0]][1].address
//设置静态资源路径, 直接访问上传的图片
const path = require('path')
app.use(express.static(path.join(__dirname, '/')))
//文章接口
app.use('/article', require('./api/article'))
//装修接口
app.use('/diy', require('./api/diy'))
//商品接口
app.use('/good', require('./api/good'))
//订单接口
app.use('/order', require('./api/orders'))
//系统接口
app.use('/sys', require('./api/sys'))
//图片上传接口
app.use('/upload', require('./api/upload'))
//用户相关接口
app.use('/user', require('./api/user'))
//统一错误处理
app.use(function(err, req, res, next) {
	res.json({
		code: 250,
		msg: err.message || err
	})
})
const nodeServer = app.listen(7000, function() {
	const host = nodeServer.address().address;
	const port = nodeServer.address().port;
	console.log("Localhost:", "http://localhost:" + port)
	console.log("Network:  ", "http://" + ip + ':' + port)
	global.baseUrl = "http://localhost:" + port //设置全局变量
})