const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const controllers = require('./src/scripts/controllers/controllers')

const app = express()
const port = 8989

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, './src/views'))

// middlewares
app.use(express.static(path.join(__dirname, './src')))
app.use(bodyParser.json())

// views
app.get('/', controllers.homeView)
app.get('/index', controllers.homeView)
app.get('/project', controllers.addProjectView)
app.get('/edit-project/:id', controllers.editProjectView)
app.get('/detail/:id', controllers.detailView)
app.get('/testimonials', controllers.testimonialView)
app.get('/contact', controllers.contactView)
app.get('/login', controllers.loginView)
app.get('/signup', controllers.signupView)

// services
app.post('/project', controllers.createProject)
app.delete('/project/:id', controllers.deleteProject)
app.put('/edit-project/:id', controllers.editProject)

// server
app.listen(port, () => {
    console.log(`App is lestening on port: ${port}`)
})
