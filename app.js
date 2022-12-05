const express = require('express')
const exphbs = require('express-handlebars')
const restaurant = require('./restaurant.json')
const app = express()
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.get('/', (req, res) => { //首頁
  res.render('index', { restaurant: restaurant.results })
})

app.get('/restaurants/:restaurant', (req, res) => { //各餐廳路由
  const target_restaurant = restaurant.results.find(restaurant => restaurant.id.toString() === req.params.restaurant)
  res.render('show', { restaurant: target_restaurant })
})

app.get('/search', (req, res) => { //搜尋
  const keyword = req.query.keyword.toLowerCase()
  const filter_restaurant = restaurant.results.filter(restaurant => {
    return `${restaurant.name.toLowerCase() + restaurant.category}`.includes(keyword)
  })
  res.render('index', { restaurant: filter_restaurant, keyword: keyword })
})


app.listen(port, () => {
  console.log(`the server is now running on [http://localhost:${port}/]!`)
})
