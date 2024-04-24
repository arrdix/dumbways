const express = require('express')
const path = require('path')

const app = express()
const port = 8989

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, './views'))

app.use(express.static(path.join(__dirname, './public')))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/index', (req, res) => {
    res.render('index')
})

app.get('/project', (req, res) => {
    res.render('project')
})

app.get('/showcase', (req, res) => {
    res.render('showcase')
})

app.get('/detail/:id', (req, res) => {
    res.render('detail', req.params)
})

app.get('/testimonials', (req, res) => {
    res.render('testimonials')
})

app.get('/contact', (req, res) => {
    res.render('contact')
})

app.listen(port, () => {
    console.log(`App is lestening on port: ${port}`)
})
