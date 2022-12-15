const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant') //載入restarunant models

router.get('/', (req, res) => { //搜尋
  const keyword = req.query.keyword.toLowerCase()
  const sort = req.query.sort || ''
  let sortBy = ''
  switch (sort) {
    case "asc":
      sortBy = { name: 'asc' }
      break
    case "desc":
      sortBy = { name: 'desc' }
      break
    case "category":
      sortBy = { category: 'asc' }
      break
    case "location":
      sortBy = { loaction: 'asc' }
      break
    default:
      sortBy = { name: 'asc' }
      break
  }

  Restaurant.find()
    .lean()
    .sort(sortBy)
    .then((restaurant) => {
      const filterRestaurants = restaurant.filter(restaurant => {
        return `${restaurant.name.toLowerCase() + restaurant.category}`.includes(keyword)
      })
      res.render('index', { Restaurants: filterRestaurants, keyword, sortBy })
    })
})

module.exports = router