const express = require('express')
const router = express.Router()
const { db, checkLogin } = require('../db.js')
const moment = require('moment')
// 用户添加商品
router.post("/add", (req, res) => {
	checkLogin(req)
	if (!req.body.product_name) {
		throw new Error('请填写商品名称')
	} else if (req.body.product_imgs.length == 0) {
		throw new Error('请上传商品图片')
	} else {
		db.query("select * from sys", (err, result) => {
			req.body.create_time = moment().valueOf()
			req.body.update_time = moment().valueOf()
			req.body.product_image = req.body.product_imgs[0]
			req.body.product_imgs = req.body.product_imgs.join(',')
			req.body.status = result[0].isReview == 1 ? 0 : 3
			req.body.store_id = req.headers.token
			db.query("insert into good set ?", req.body, (err, result) => {
				if (err) {
					throw new Error(err)
				} else {
					db.query('select * from good order by product_id DESC limit 1', (err, result) => {
						res.json({
							code: 200,
							msg: '发布成功',
							data: result[0]
						})
					})
				}
			})
		})
	}
})
//商品详情
router.get("/detail", (req, res) => {
	db.query('select * from good where product_id = ?', req.query.product_id, (err, result) => {
		if (err) {
			throw new Error(err)
		} else {
			if (!result[0]) {
				res.send({
					code: 250,
					msg: "商品不存在"
				})
			} else {
				if (result[0].product_imgs) {
					result[0].product_imgs = result[0].product_imgs.split(',')
					result[0].product_image = result[0].product_imgs[0]
				} else {
					result[0].product_imgs = []
				}
				res.send({
					code: 200,
					msg: 'ok',
					data: result[0]
				})
			}
		}
	})
})
// 商品列表,page页码,row每页几条数据,keyword查询的商品名称
router.get("/list", (req, res) => {
	const page = parseInt(req.query.page || 1)
	const row = parseInt(req.query.row || 10)
	const keyword = req.query.keyword || ''
	const status = req.query.status ? '=' + req.query.status : '<5'
	const params = ['%' + keyword + '%', (page - 1) * row, row]
	db.query("select good.*,user.nickname as store_name from good inner join user where good.store_id = user.user_id and product_name like ? and good.status" + status + " limit ?,?", params, (err, result) => {
		if (err) {
			throw new Error(err)
		} else {
			db.query("select count(*) as records from good where product_name like ? and status" + status, params, (error, results) => {
				if (error) {
					throw new Error(error)
				} else {
					for (let i in result) {
						result[i].create_time = moment(result[i].login_time).format('YYYY-MM-DD HH:mm:ss')
						result[i].update_time = moment(result[i].update_time).format('YYYY-MM-DD HH:mm:ss')
					}
					res.json({
						code: 200,
						msg: "ok",
						data: result,
						page: page,
						row: row,
						records: results[0]['records'],
						total: Math.ceil(results[0]['records'] / row) || 1
					})
				}
			})
		}
	})
})
//我的商品
router.get("/my", (req, res) => {
	checkLogin(req)
	const page = parseInt(req.query.page || 1)
	const row = parseInt(req.query.row || 10)
	const keyword = req.query.keyword || ''
	const params = ['%' + keyword + '%', req.headers.token, (page - 1) * row, row]
	db.query("select * from good where product_name like ? and store_id = ? limit ?,?", params, (err, result) => {
		if (err) {
			throw new Error(err)
		} else {
			db.query('select count(*) as records from good where product_name like ? and store_id = ?', params, (error, results) => {
				if (error) {
					throw new Error(error)
				} else {
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
// 修改商品信息
router.post('/edit', (req, res) => {
	checkLogin(req)
	if (!req.body.product_id) {
		throw new Error('商品id不存在')
	} else if (!req.body.product_name) {
		throw new Error('请填写商品名称')
	} else if (req.body.product_imgs.length == 0) {
		throw new Error('请上传商品图片')
	} else {
		req.body.product_image = req.body.product_imgs[0]
		req.body.product_imgs = req.body.product_imgs.join(',')
		req.body.update_time = moment().valueOf()
		req.body.store_id = req.headers.token
		db.query("select * from sys", (err, result) => {
			req.body.status = result[0].isReview == 1 ? 0 : 3
			db.query('update good set ? where product_id = ?', [req.body, req.body.product_id], (err, result) => {
				if (err) {
					throw new Error(err)
				} else {
					db.query('select * from good where product_id = ?', req.body.product_id, (err, results) => {
						if (err) {
							throw new Error(err)
						} else {
							if (results[0]) {
								res.json({
									code: 200,
									msg: '修改成功',
									data: results[0]
								})
							} else {
								res.json({
									code: 250,
									msg: '商品id有误',
								})
							}
						}
					})
				}
			})
		})
	}
})
// 修改商品状态
router.post('/status', (req, res) => {
	checkLogin(req)
	if (!req.body.product_id) {
		throw new Error('商品id不存在')
	} else {
		req.body.update_time = moment().valueOf()
		db.query('update good set ? where product_id = ?', [req.body, req.body.product_id], (err, result) => {
			if (err) {
				throw new Error(err)
			} else {
				db.query('select * from good where product_id = ?', req.body.product_id, (err, results) => {
					if (err) {
						throw new Error(err)
					} else {
						if (results[0]) {
							res.json({
								code: 200,
								msg: '修改成功',
								data: results[0]
							})
						} else {
							res.json({
								code: 250,
								msg: '商品id有误',
							})
						}
					}
				})
			}
		})
	}
})
module.exports = router
