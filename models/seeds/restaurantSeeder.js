const mongoose = require('mongoose')
const restaurant = require('../restaurant') // 載入 restaurant model
const restaurantJSON = require('./restaurant.json').results
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
// 與資料庫連線
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
//成功連進資料庫後，新增種子進資料庫
db.once('open', () => {
  restaurantJSON.forEach(restaurants => {
    restaurant.create({
      id: restaurants.id,
      name: restaurants.name,
      name_en: restaurants.name_en,
      category: restaurants.category,
      image: restaurants.image,
      location: restaurants.location,
      phone: restaurants.phone,
      google_map: restaurants.google_map,
      rating: restaurants.rating,
      description: restaurants.description
    })
  });  
})

