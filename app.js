const express = require('express')
const exphbs = require('express-handlebars') 
const mongoose = require('mongoose')
if (process.env.NODE_ENV !== 'production') { //僅在非正式環境時, 載入 dotenv
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true } ) //連線到mongoose資料庫

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

app.get('/', (req, res) => { //首頁
  res.render('index', { restaurants: restaurants.results })
})

app.get('/restaurants/:restaurant', (req, res) => { //各餐廳路由
  const targetRestaurant = restaurants.results.find(restaurant => restaurant.id.toString() === req.params.restaurant)
  res.render('show', { restaurant: targetRestaurant })
})

app.get('/search', (req, res) => { //搜尋
  const keyword = req.query.keyword.toLowerCase()
  const filterRestaurants = restaurants.results.filter(restaurant => {
    return `${restaurant.name.toLowerCase() + restaurant.category}`.includes(keyword)
  })
  res.render('index', { restaurants: filterRestaurants, keyword: keyword })
})


app.listen(port, () => {
  console.log(`the server is now running on [http://localhost:${port}/]!`)
})
