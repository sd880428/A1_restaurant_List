const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const restaurant = require('./models/restaurant')
const Restaurant = require('./models/restaurant') //載入restarunant models
const bodyParser = require('body-parser')
if (process.env.NODE_ENV !== 'production') { //僅在非正式環境時, 載入 dotenv
  require('dotenv').config()
}

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

app.get('/', (req, res) => { //首頁
  return Restaurant.find() //從資料庫取出所有餐廳
    .lean() //過濾成javascript成資料陣列
    .then(Restaurants => res.render('index', { Restaurants })) //將過濾資料傳給index
    .catch(error => console.error(error)) //錯誤處理
})

app.get('/restaurants/:restaurant', (req, res) => { //詳細資訊
  const id = req.params.restaurant //餐廳ID
  return Restaurant.findById(id) //從資料庫抓出與該ID相同的餐廳
    .lean() //過濾成javascript成資料陣列
    .then(restaurant => res.render('show', { restaurant })) //帶入show頁面
    .catch(error => console.error(error)) //錯誤處理
})

app.get('/restaurants/edit/:restaurant', (req, res) => { //編輯頁面
  const id = req.params.restaurant //餐廳ID
  return Restaurant.findById(id) //從資料庫抓出與該ID相同的餐廳
    .lean() //過濾成javascript成資料陣列
    .then(restaurant => res.render('edit', { restaurant })) //帶入show頁面
    .catch(error => console.error(error)) //錯誤處理
})

app.get('/search', (req, res) => { //搜尋
  const keyword = req.query.keyword.toLowerCase()
  Restaurant.find()
  .lean()
  .then((restaurant) => {
    const filterRestaurants = restaurant.filter(restaurant => {
      return `${restaurant.name.toLowerCase() + restaurant.category}`.includes(keyword)
    })
    res.render('index', { Restaurants: filterRestaurants, keyword: keyword })
  })
})

app.get('/create', (req, res) => {
  res.render('create')
})

app.post('/restaurants/create', (req, res) => {
  return Restaurant.create({
    name: req.body.name,
    name_en: req.body.nameEn,
    category: req.body.category,
    image: req.body.image,
    location: req.body.location,
    phone: req.body.phone,
    google_map: req.body.googleMap,
    rating: req.body.rating,
    description: req.body.description
  })
  .then(() => res.redirect('/'))
  .catch(error => console.error(error)) //錯誤處理
})

app.post('/restaurants/:restaurant/edit', (req, res) => { //編輯資訊
  const id = req.params.restaurant
  const name = req.body.name
  const nameEn = req.body.nameEn
  const category = req.body.category
  const location = req.body.location
  const googleMap = req.body.google_map
  const phone = req.body.phone
  const image = req.body.image
  const rating = req.body.rating
  const description = req.body.description

  return Restaurant.findById(id) //從資料庫抓出與該ID相同的餐廳
    .then((restaurant) => { //更改資訊
      restaurant.name = name
      restaurant.name_en = nameEn
      restaurant.category = category
      restaurant.image = image
      restaurant.location = location
      restaurant.phone = phone
      restaurant.google_map = googleMap
      restaurant.rating = rating
      restaurant.description = description
      return restaurant.save()
    }) 
    .then((restaurant) => res.redirect(`/restaurants/${id}`), { restaurant })//導回Detail頁面
    .catch(error => console.error(error)) //錯誤處理
})

app.post('/restaurants/delete/:restaurant', (req, res) => { //刪除餐廳
  const id = req.params.restaurant
  return Restaurant.findById(id)
  .then(restaurant => restaurant.remove())
  .then(() => res.redirect('/'))
  .catch(error => console.error(error)) //錯誤處理
})

app.listen(port, () => {
  console.log(`the server is now running on [http://localhost:${port}/]!`)
})
