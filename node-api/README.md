## node_demo
nodejs +express +mysql 写后端接口 ,包括增删改查, 图片上传, 分页, 模糊查询, 排序 ,简单实用, 实现了接口路由


## 步骤
```
//先把test.sql 导入mysql数据库, 可以用Navicat Premium 12
运行sql文件

//先下载依赖
npm install

//接口调试, 便于实时更新
npm i supervisor -g
supervisor app.js

//启动
npm start

//如果报错,可能是node版本不是最新版
```


## 目录
- api  接口
- node_modules 依赖文件
- upload 图片上传文件夹
- app.js  入口文件
- db.js  数据库配置文件
- package.json 
- package-lock.json 

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


## 联系我
邮箱249042680@qq.com
