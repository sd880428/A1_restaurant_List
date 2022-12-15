const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant') //載入restarunant models

router.get('/', (req, res) => { //首頁
  return Restaurant.find() //從資料庫取出所有餐廳
    .lean() //過濾成javascript成資料陣列
    .then(Restaurants => res.render('index', { Restaurants })) //將過濾資料傳給index
    .catch(error => console.error(error)) //錯誤處理
})

module.exports = router