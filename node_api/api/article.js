const express = require('express')
const router = express.Router()
const {db,checkLogin} = require('../db.js')
const moment = require('moment')

//列表
router.get("/list", (req, res) => {
  const page = parseInt(req.query.page || 1)
  const row = parseInt(req.query.row || 10)
  db.query("select * from article limit ?,?", [(page - 1) * row, row], (err, result) => {
    if (err) {
      throw new Error(err)
    } else {
      db.query("select count(*) as records from article", (error, results) => {
        if (error) {
          throw new Error(error)
        } else {
          for (let i in result) {
            result[i].create_time = moment(result[i].create_time).format('YYYY-MM-DD HH:mm:ss')
            result[i].update_time = moment(result[i].update_time).format('YYYY-MM-DD HH:mm:ss')
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
//详情
router.get("/detail", (req, res) => {
  if (!req.query.id) {
    res.json({
      code: 250,
      msg: "缺少id"
    })
  } else {
    db.query('select * from article where id = ?', req.query.id, (err, result) => {
      if (err) {
        throw new Error(err)
      } else {
        if (!result[0]) {
          res.json({
            code: 250,
            msg: "不存在该文章"
          })
        } else {
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
// 编辑
router.post("/edit", (req, res) => {
  req.body.author = "平台"
  req.body.update_time = moment().valueOf()
  db.query('update article set ? where id = ?', [req.body, req.body.id], (err, result) => {
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
//添加
router.post("/add", (req, res) => {
  checkLogin(req)
  req.body.author = "平台"
  req.body.create_time = moment().valueOf()
  req.body.update_time = moment().valueOf()
  db.query("insert into article set ?", req.body, (err, result) => {
    if (err) {
      throw new Error(err)
    } else {
      db.query('select * from article order by id DESC limit 1', (err, result) => {
        res.json({
          code: 200,
          msg: 'ok',
          data: result[0]
        })
      })
    }
  })
})
module.exports = router
