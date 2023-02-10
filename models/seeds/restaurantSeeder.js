const db = require('../../config/mongoose')
const Restaurant = require('../restaurant') // 載入 restaurant model
const restaurantJSON = require('./restaurant.json').results
const User = require('../../models/user')
const bcrypt = require('bcryptjs')
const restaurant = require('../restaurant')

const seedUser = [
  {
    email: 'user1@example.com',
    password: '12345678',
    //擁有 #1, #2, #3 號餐廳
    restaurantIndex: [0, 1, 2]
  },
  {
    email: 'user2@example.com',
    password: '12345678',
    //擁有 #4, #5, #6 號餐廳
    restaurantIndex: [3, 4, 5]
  }
]

// db.once('open', () => {
//   seedUser.forEach(users => {
//     User.findOne({ email: users.email })
//       .then(user => {
//         if (user) {
//           console.log('種子使用者已存在!')
//           return process.exit()
//         }
//         bcrypt.genSalt(10)
//           .then(salt => bcrypt.hash(users.password, salt))
//           .then(hash => {
//             User.create({ name: 'Seeder', email: users.email, password: hash })
//               .then(user => {
//                 const userId = user._id
//                 return Promise.all(Array.from(
//                   { length: 3 },
//                   (_, i) => Restaurant.create({ ...restaurantJSON[users.restaurantIndex[i]], userId })
//                 ))
//                   .then(() => {
//                     console.log('done')
//                     process.exit()
//                   })
//               })
//           })
//       })
//   })
// })

db.once('open', async () => {
  await Promise.all( //參考教案寫法
    seedUser.map(async users => { 
      //檢查是否已創建
      let user = await User.findOne({ email: users.email })
      if (user) {
        console.log('種子使用者已存在!')
        return process.exit()
      }
      //--創建使用者
      const hash = bcrypt.hashSync(users.password, 10)
      user = await User.create({ name: 'Seeder', email: users.email, password: hash })
      const userId = user._id
      //過濾出使用者擁有的餐廳
      const filtedRestaurant = restaurantJSON.filter((_, i) => users.restaurantIndex.includes(i))
      //塞入userId
      filtedRestaurant.forEach(restaurant => restaurant.userId = userId)
      await Restaurant.create(filtedRestaurant)
    })
  )

  console.log('done')
  process.exit()
})