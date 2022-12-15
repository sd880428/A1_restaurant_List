const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
if (process.env.NODE_ENV !== 'production') { //僅在非正式環境時, 載入 dotenv
  require('dotenv').config()
}

const routes = require('./routes/')

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) //連線到mongoose資料庫

const app = express()
const port = 3000
const db = mongoose.connection // 取得資料庫連線狀態
db.on('error', () => { // 連線異常
  console.log('mongodb error!')
})

db.once('open', () => { // 連線成功
  console.log('mongodb connected!')
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

app.listen(port, () => {
  console.log(`the server is now running on [http://localhost:${port}/]!`)
})
