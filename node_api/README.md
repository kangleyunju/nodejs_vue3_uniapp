### 简介
nodejs+express+mysql操作数据库，简单实用，包括增删改查、图片上传、分页、模糊查询、排序、接口路由等

### 技术栈
nodejs，express，mysql

### 邮箱
有问题可以提Issue，或者发邮件：249042680@qq.com，觉得不错可以点个赞

### 仓库
| gitee | github |
| --- | --- |
| [nodejs_vue3_uniapp](https://gitee.com/kangleyunju/nodejs_vue3_uniapp) | [nodejs_vue3_uniapp](https://github.com/kangleyunju/nodejs_vue3_uniapp) |

### 步骤
* 先把test.sql导入mysql数据库，可以用Navicat或phpMyAdmin运行sql文件，如果报错，可能是node版本不是最新版
* 下载
```
npm install
```
* 运行
```
npm start
```
* 接口调试, 便于热更新
```
npm i supervisor -g
supervisor app.js
```

### 目录
- api  接口
- node_modules 依赖文件
- upload 图片上传文件夹
- app.js  入口文件
- db.js  数据库配置文件
- package.json 
- package-lock.json 
- test.sql 数据库表

### 接口文档
https://www.apizza.net/project/c73ee57ebaf1fa26b653e2f2823f01da/browse

## 接口示例
```
//查询某个用户信息
router.get("/person",(req,res) => {
	db.query('select * from user where user_id = ?', req.query.user_id, (err, result)=>{
		if(err){
			throw new Error(err)
		}else{
			if(!result[0]){
				res.json({
					code:250,
					msg:"用户不存在"
				})
			}else{
				res.json({
					code:200,
					msg:'ok',
					data:result[0]
				})
			}
		}
	})
})
```

## 接口调用示例
``` 
//查询某个用户信息,get请求
http://localhost:3000/user/person?user_id=10001

//结果
{
  "code": 200,
  "msg": "ok",
  "data": {
    "user_id": 10001,
    "name": "孙权",
    "password": "123456",
    "age": 18,
    "sex": 1,
    "face": "https://i2.hdslb.com/bfs/face/a143f44d3ab7a226de9c506cb1930a60ecb121c1.jpg@96w_96h_1c_1s.webp",
    "other": "",
    "create_time": 1641550942859
  }
}
```
