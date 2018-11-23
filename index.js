const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

const checkParamExist = (req, res, next) => {
  const age = req.query.age
  if (!age || age % 1 !== 0) {
    return res.redirect('/')
  } else {
    return next()
  }
}

app.get('/', (req, res) => {
  return res.render('index')
})

app.get('/major', checkParamExist, (req, res) => {
  const age = req.query.age
  return res.render('major', { age })
})

app.get('/minor', checkParamExist, (req, res) => {
  const age = req.query.age
  return res.render('minor', { age })
})

app.post('/check', (req, res) => {
  const age = req.body.age
  if (age > 18) {
    return res.redirect(`/major?age=${age}`)
  } else {
    return res.redirect(`/minor?age=${age}`)
  }
})

app.listen(3000)
