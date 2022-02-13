const express = require('express')
const router = express.Router()
const db = require('../db.js')
const moment = require('moment')

router.get("/list", (req, res) => {
	const page = parseInt(req.query.page || 1)
	const row = parseInt(req.query.row || 10)
	db.query("select * from diy limit ?,?",[(page - 1) * row, row], (err, result) => {
		if (err) {
			throw new Error(err)
		} else {
			db.query("select count(*) as records from diy" ,(error, results)=> {
				if (error) {
					throw new Error(error)
				} else {
					for(let i in result){
						result[i].create_time=moment(result[i].create_time).format('YYYY-MM-DD HH:mm:ss')
						result[i].update_time=moment(result[i].update_time).format('YYYY-MM-DD HH:mm:ss')
					}
					res.json({
						code: 200,
						msg: "ok",
						data: result,
						page: page,
						row: row,
						records: results[0]['records'],
						total:  Math.ceil(results[0]['records']/row)
					})
				}
			})
		}
	})
})

router.get("/detail", (req, res) => {
	if(!req.query.id){
		res.json({
			code: 250,
			msg: "缺少页面id"
		})
	}else{
		db.query('select * from diy where id = ?', req.query.id, (err, result) => {
			if (err) {
				throw new Error(err)
			} else {
				if (!result[0]) {
					res.json({
						code: 250,
						msg: "不存在该页面"
					})
				} else {
					result[0].sorts=result[0].sorts!=''&&result[0].sorts?JSON.parse(result[0].sorts):[]
					res.json({
						code: 200,
						msg: 'ok',
						data: result[0]
					})
				}
			}
		})
	}
})

router.post("/edit", (req, res) => {
	req.body.update_time = moment().valueOf()
	db.query('update diy set ? where id = ?', [req.body, req.body.id], (err, result) => {
		if (err) {
			throw new Error(err)
		} else {
			res.json({
				code: 200,
				msg: '修改成功'
			})
		}
	})
})

router.post("/add", (req, res) => {
	if(!req.body.per_id){
		throw new Error('请登录')
	} else {
		req.body.name = '页面名称'
		req.body.page_name = '页面标题'
		req.body.path = '/index/index'
		req.body.create_time = moment().valueOf()
		req.body.update_time = moment().valueOf()
		delete req.body.per_id
		db.query("insert into diy set ?", req.body, (err, result) => {
			if (err) {
				throw new Error(err)
			} else {
				db.query('select * from diy order by id DESC limit 1', (err, result) => {
					res.json({
						code: 200,
						msg: 'ok',
						data: result[0]
					})
				})
			}
		})	
	}
})


module.exports = router
