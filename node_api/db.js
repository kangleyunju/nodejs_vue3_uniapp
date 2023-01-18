const mysql = require('mysql');

//数据库账号密码需要改成自己的
const db = mysql.createConnection({
	host: '127.0.0.1',
	user: 'root',
	password: '111111',
	database: 'test',
	port:3306
})


db.connect((err) => {
	if (err) {
		console.log('数据库连接失败, 错误信息:',err.sqlMessage||err)
	} else {
		console.log('数据库连接成功!')
	}
})

// 数据库断开重连
function handleDisconnect() {
  connection = mysql.createConnection(db)
  connection.connect(function(err) {
    if(err) {
      console.log('error when connecting to db:', err)
      setTimeout(handleDisconnect, 2000)
    }
  })                        
  connection.on('error', function(err) {
    console.log('db error', err)
    if(err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect()                       
    } else {                              
      throw err;                            
    }
  })
}
handleDisconnect()
