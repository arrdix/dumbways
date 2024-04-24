const express = require('express')
const path = require('path')
const initialProjects = require('./public/scripts/data/data.js')
const { prepareProject } = require('./public/scripts/helpers/helper.js')

let projects = initialProjects.map((project) => prepareProject(project))
const app = express()
const port = 8989

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, './views'))

app.use(express.static(path.join(__dirname, './public')))

// routes
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
    res.render('showcase', { projects })
})

app.get('/detail/:id', (req, res) => {
    const { id } = req.params
    const project = projects.find((project) => project.id == id)

    res.render('detail', project)
})

app.get('/testimonials', (req, res) => {
    res.render('testimonials')
})

app.get('/contact', (req, res) => {
    res.render('contact')
})

// indicators
app.listen(port, () => {
    console.log(`App is lestening on port: ${port}`)
})
