const db = require('../../config/mongooes')
const restaurant = require('../restaurant') // 載入 restaurant model
const restaurantJSON = require('./restaurant.json').results

db.once('open', () => {
  restaurantJSON.forEach(restaurants => {
    restaurant.create({ ...restaurants })
  });  
})

