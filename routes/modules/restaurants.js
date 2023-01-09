const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant') //載入restarunant models

router.get('/create', (req, res) => { //詳細資訊
  res.render('create')
})

router.post('/create', (req, res) => {
  const userId = req.user._id
  return Restaurant.create({ ...req.body, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error)) //錯誤處理
})

router.get('/:restaurant', (req, res) => { //詳細資訊
  const _id = req.params.restaurant //餐廳ID
  const userId = req.user._id
  return Restaurant.findOne({ _id, userId }) //從資料庫抓出與該ID相同的餐廳
    .lean() //過濾成javascript成資料陣列
    .then(restaurant => res.render('show', { restaurant })) //帶入show頁面
    .catch(error => console.error(error)) //錯誤處理
})

router.get('/edit/:restaurant', (req, res) => { //編輯頁面
  const _id = req.params.restaurant //餐廳ID
  const userId = req.user._id
  return Restaurant.findOne({ _id, userId }) //從資料庫抓出與該ID相同的餐廳
    .lean() //過濾成javascript成資料陣列
    .then(restaurant => {
      res.render('edit', { restaurant })
    }) //帶入show頁面
    .catch(error => console.error(error)) //錯誤處理
})

router.put('/:restaurant', (req, res) => { //編輯資訊
  const _id = req.params.restaurant
  const userId = req.user._id

  return Restaurant.findOne({ _id, userId }) //從資料庫抓出與該ID相同的餐廳
    .then((restaurant) => { //更改資訊
      restaurant = Object.assign(restaurant, req.body)
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))//導回Detail頁面
    .catch(error => console.error(error)) //錯誤處理
})

router.delete('/:restaurant', (req, res) => { //刪除餐廳
  const _id = req.params.restaurant
  const userId = req.user._id
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.error(error)) //錯誤處理
})

module.exports = router
