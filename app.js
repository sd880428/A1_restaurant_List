const express = require('express')
const exphbs = require('express-handlebars')
const restaurants = require('./restaurant.json')
const app = express()
const port = 3000

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
