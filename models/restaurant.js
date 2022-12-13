const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurantSchema = new Schema({
  name: String,
  rate: Number,
  category: String,
  image: String,
  location: String,
  phone: Number,
  google_map: String,
  description: String
})
module.exports = mongoose.model('Restaurant', todoSchema)