const express = require('express')
const router = express.Router()
const { db, checkLogin } = require('../db.js')
const moment = require('moment')
// 查询订单列表,page页码,row每页几条数据,keyword查询的商品名称
router.get("/list", (req, res) => {
	const page = req.query.page || 1
	const row = req.query.row || 10
	const keyword = req.query.keyword || ''
	const params = ['%' + keyword + '%', (parseInt(page) - 1) * parseInt(row), parseInt(row)]
	db.query("select * from  orders  where product_name like ? limit ?,?", params, (err, result) => {
		if (err) {
			throw new Error(err)
		} else {
			db.query('select count(*) as records from orders where product_name like ?', ['%' + keyword + '%'], (error, results) => {
				if (error) {
					throw new Error(error)
				} else {
					for (let i in result) {
						result[i].create_time = moment(result[i].create_time).format('YYYY-MM-DD HH:mm:ss')
						result[i].send_time = moment(result[i].send_time).format('YYYY-MM-DD HH:mm:ss')
					}
					res.json({
						code: 200,
						msg: "ok",
						data: result,
						page: parseInt(page),
						row: parseInt(row),
						records: results[0]['records'],
						total: Math.ceil(results[0]['records'] / row) || 1
					})
				}
			})
		}
	})
})
module.exports = router