const express = require('express')
const router = express.Router()
const { db, checkLogin } = require('../db.js')
const moment = require('moment')
// 查询用户列表,page页码,row每页几条数据,keyword查询用户名字,order年龄升序asc和降序desc
router.get("/list", (req, res) => {
	const page = parseInt(req.query.page || 1)
	const row = parseInt(req.query.row || 10)
	const keyword = req.query.keyword || ''
	const sort = req.query.sort || 'user_id'
	const order = req.query.order || 'asc'
	const params = ['%' + keyword + '%', sort, (page - 1) * row, row]
	db.query("select * from user where name like ? order by ? " + order + " limit ?,?", params, (err, result) => {
		if (err) {
			throw new Error(err)
		} else {
			db.query('select count(*) as records from user where name like ?', '%' + keyword + '%', (error, results) => {
				if (error) {
					throw new Error(error)
				} else {
					for (let i in result) {
						result[i].birthday = moment(result[i].birthda).format('YYYY-MM-DD')
						result[i].create_time = moment(result[i].create_time).format('YYYY-MM-DD')
						result[i].login_time = moment(result[i].login_time).format('YYYY-MM-DD HH:mm:ss')
						delete result[i].password
					}
					res.json({
						code: 200,
						msg: "ok",
						data: result,
						page: page,
						row: row,
						records: results[0]['records'],
						total: Math.ceil(results[0]['records'] / row)
					})
				}
			})
		}
	})
})
//查询某个用户信息
router.get("/person", (req, res) => {
	db.query('select * from user where user_id = ?', req.query.user_id, (err, result) => {
		if (err) {
			throw new Error(err)
		} else {
			if (!result[0]) {
				res.json({
					code: 250,
					msg: "用户不存在"
				})
			} else {
				delete result[0].password
				result[0].birthday = moment(result[0].birthday).format('YYYY-MM-DD')
				res.json({
					code: 200,
					msg: 'ok',
					data: result[0]
				})
			}
		}
	})
})
//用户登录
router.post("/login", (req, res) => {
	if (!req.body.name) {
		throw new Error('请填写账号')
	} else if (!req.body.password) {
		throw new Error('请填写密码')
	} else {
		db.query('select * from user where name = ?', req.body.name, (err, result) => {
			if (err) {
				throw new Error(err)
			} else {
				if (result[0]) {
					if (req.body.password == result[0].password) {
						if (result[0].status == 1) {
							db.query("update user set login_time = ? where name = ?", [moment().valueOf(), req.body.name], (err, results) => {
								result[0].login_time = moment().valueOf()
								result[0].birthday = moment().format('YYYY-MM-DD')
								res.json({
									code: 200,
									msg: '登录成功',
									data: result[0]
								})
							})
						} else {
							res.json({
								code: 250,
								msg: '你已被封号,请联系管理员!'
							})
						}
					} else {
						res.json({
							code: 250,
							msg: "密码错误"
						})
					}
				} else {
					res.json({
						code: 250,
						msg: "账号不存在"
					})
				}
			}
		})
	}
})
// 用户注册
router.post("/add", (req, res) => {
	if (!req.body.name) {
		throw new Error('请填写账号')
	} else if (!req.body.password) {
		throw new Error('请填写密码')
	} else if (req.body.password.length < 6 || req.body.password.length > 18) {
		throw new Error('密码长度6-18位')
	} else {
		db.query('select * from user where name = ?', req.body.name, (err, result) => {
			if (result[0]) {
				res.json({
					code: 250,
					msg: "账号已存在"
				})
			} else {
				db.query("select * from sys", (err, result) => {
					req.body.face = result[0].avatar
					req.body.create_time = moment().valueOf()
					req.body.login_time = moment().valueOf()
					req.body.nickName = req.body.name
					db.query("insert into user set ?", req.body, (err, result) => {
						if (err) {
							throw new Error(err)
						} else {
							db.query('select * from user where name = ?', req.body.name, (err, result) => {
								delete result[0].password
								result[0].birthday = moment(result[0].birthday).format('YYYY-MM-DD')
								res.json({
									code: 200,
									msg: 'ok',
									data: result[0]
								})
							})
						}
					})
				})
			}
		})
	}
})
// 用户注销
router.post("/delete", (req, res) => {
	checkLogin(req)
	db.query("delete from user where user_id = ?", req.body.user_id, (err, result) => {
		if (err) {
			throw new Error(err)
		} else {
			res.json({
				code: 200,
				msg: 'ok'
			})
		}
	})
})
// 修改用户信息
router.post('/edit', (req, res) => {
	checkLogin(req)
	if (!req.body.user_id) {
		throw new Error('用户信息有误')
	} else {
		db.query('select * from user where user_id = ?', req.body.user_id, (err, results) => {
			if (results.length == 0) {
				res.json({
					code: 250,
					msg: '用户不存在'
				})
			} else {
				db.query('update user set ? where user_id=?', [req.body, req.body.user_id], (err, results) => {
					if (err) {
						throw new Error(err)
					} else {
						db.query('select * from user where user_id = ?', req.body.user_id, (err, results) => {
							if (err) {
								throw new Error(err)
							} else {
								delete results[0].password
								results[0].birthday = moment(results[0].birthday).format('YYYY-MM-DD')
								res.json({
									code: 200,
									msg: '修改成功',
									data: results[0]
								})
							}
						})
					}
				})
			}
		})
	}
})
module.exports = router
