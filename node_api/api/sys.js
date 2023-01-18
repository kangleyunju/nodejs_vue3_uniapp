const express = require('express')
const router = express.Router()
const db = require('../db.js')


router.get("/list", (req, res) => {
	db.query("select * from sys", (err, result) => {
		if (err) {
			throw new Error(err)
		} else {
			for(let i in result[0]){
				result[0].isReview=result[0].isReview==0?false:true
				result[0].isWxLogin=result[0].isWxLogin==0?false:true
			}
			res.json({
				code: 200,
				msg: 'ok',
				data: result[0]
			})
		}
	})
})

//首页统计
router.get("/statistics", (req, res) => {
	db.query('select count(*) as records from user',(err, results) => {
		if (err) {
			throw new Error(err)
		} else {
			let data={
				person:results[0]['records'],
				todayMoney:(Math.random()*10000).toFixed(2),
				todayOrder:(Math.random()*100).toFixed(0)
			}
			res.json({
				code: 200,
				msg: 'ok',
				data: data
			})
		}
	})
})

router.post("/edit", (req, res) => {
	checkLogin(req)
		req.body.isReview=req.body.isReview?1:0
		req.body.isWxLogin=req.body.isWxLogin?1:0
		db.query("update sys set ?",[req.body], (err, result) => {
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

router.post("/edit", (req, res) => {
	checkLogin(req)
		req.body.isReview=req.body.isReview?1:0
		req.body.isWxLogin=req.body.isWxLogin?1:0
		db.query("update sys set ?",[req.body], (err, result) => {
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

module.exports = router
