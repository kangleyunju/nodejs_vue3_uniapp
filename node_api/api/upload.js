const express = require('express')
const router = express.Router()
const multer = require('multer') //文件上传
const path = require('path') //路径
const moment = require('moment') //时间
const fs = require('fs') //判断文件夹

// 创建存储对象
const storage = multer.diskStorage({
  // 配置保存文件的路径
  destination: function(req, file, cb) {
    let today = moment().format('YYYYMMDD')
    let imageDir = path.join(__dirname, '../upload/', today)
    // 判断目录是否可以访问
    fs.access(imageDir, (err) => {
      //没有目录创建目录
      if (err) {
        fs.mkdir(imageDir, err => {
          if (err) return
        })
      }
      // 返回文件目录
      cb(null, imageDir)
    })
  },
  filename: function(req, file, cb) {
    let newName = Date.now() + '.' + file.originalname.substr(file.originalname.lastIndexOf('.') + 1)
    cb(null, newName)
  }
})
const upload = multer({
  storage,
  limits: {
    fileSize: 500 * 1000, //最大500KB
    files: 5
  },
  // 自定义上传过滤器
  fileFilter: (req, file, cb) => {
    // 文件类型
    if (['image/png', 'image/jpeg', 'image/jpg', 'image/gif'].indexOf(file.mimetype) < 0) {
      cb(null, false)
    } else {
      cb(null, true)
    }
  }
})
router.post('/', (req, res) => {
  let singleUpload = upload.single('file');
  singleUpload(req, res, (err) => {
    console.log(err)
    if (err) {
      res.send({
        data: err,
        code: 250,
        msg: '图片最大500KB'
      })
    } else if (req.file) {
      req.file.destination = req.file.destination.replace(/\\/g, "/")
      req.file.path = baseUrl + "/" + req.file.path.replace(/\\/g, "/").match(/upload(\S*)/)[0]
      res.send({
        code: 200,
        data: req.file,
        msg: '上传成功'
      })
    } else {
      res.send({
        code: 250,
        msg: '不允许上传的类型'
      })
    }
  })
})
module.exports = router
