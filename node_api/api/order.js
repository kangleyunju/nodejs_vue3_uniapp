const express = require('express')
const router = express.Router()
const {db,checkLogin} = require('../db.js')

// 查询订单列表,page页码,row每页几条数据,keyword查询的商品名称
router.get("/list",(req,res) => {
	const page = req.query.page||1
	const row = req.query.row||10
	const keyword = req.query.keyword||''
	const params = ['%'+keyword+'%',(parseInt(page) - 1) * parseInt(row), parseInt(row)]
	console.log(keyword)
	db.query("select * from  orders  where product_name like ? limit ?,?",params,(err,result) => {
		if(err){
			throw new Error(err)
		}else{
			db.query('select count(*) as total from orders where product_name like ?', ['%'+keyword+'%'] ,(error, results)=> {
				if (error) {
					throw new Error(error)
				} else {
					res.json({
						code:200,
						msg:"ok",
						data: result,
						page: parseInt(page),
						row: parseInt(row),
						total: results[0]['total']
					})
				}
			})
		}
	})
})

module.exports = router