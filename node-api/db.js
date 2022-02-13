const mysql = require('mysql');

const db = mysql.createConnection({
	host: '127.0.0.1',
	user: 'root',
	password: 'root',
	database: 'test',
	// port:3306
})


db.connect((err) => {
	if (err) {
		console.log('数据库连接失败, 错误信息:',err.sqlMessage||err)
	} else {
		console.log('数据库连接成功!')
	}
})

module.exports = db
