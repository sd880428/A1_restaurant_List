const mongoose = require('mongoose')
if (process.env.NODE_ENV !== 'production') { //僅在非正式環境時, 載入 dotenv
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) //連線到mongoose資料庫

const db = mongoose.connection // 取得資料庫連線狀態
db.on('error', () => { // 連線異常
  console.log('mongodb error!')
})

db.once('open', () => { // 連線成功
  console.log('mongodb connected!')
})

module.exports = db