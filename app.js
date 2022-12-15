const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')

require('./config/mongooes')

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
