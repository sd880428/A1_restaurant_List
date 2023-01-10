const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../../models/user')
const bcrypt = require('bcryptjs')

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const name = req.body.name.trim() || "匿名" //如果使用者註冊時沒填寫名字則預設為'匿名'
  const { email, password, confirmPassword } = req.body
  let error = []
  if (!email || !password || !confirmPassword) {
    error.push({ message: '請填寫必填欄位' })
  }
  if (password !== confirmPassword) {
    error.push({ message: '密碼與確認密碼不符' })
  }
  if (error.length) {
    return res.render('register', {
      name,
      email,
      password,
      confirmPassword,
      error
    })
  }

  User.findOne({ email })
    .then(user => {
      if (user) {
        error.push({ message: "此使用者已存在" })
        return res.render('register', {
          name,
          email,
          password,
          confirmPassword,
          error
        })
      }
      bcrypt.genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({
          name,
          email,
          password: hash
        }))
        .then(() => res.redirect('/'))
    })
})

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureMessage: true,
  failureRedirect: '/users/login'
}))

router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) { return next(err) }
    req.flash('successMsg', '你已成功登出')
    res.redirect('/users/login')
  })
})
module.exports = router