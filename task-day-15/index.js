const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const controllers = require('./src/scripts/controllers/controllers')
const session = require('express-session')

const app = express()
const port = 8989

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, './src/views'))

// middlewares
app.use(express.static(path.join(__dirname, './src')))
app.use(bodyParser.json())
app.use(
    session({
        secret: 'personal_web_secret_recipe',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false, maxAge: 60000 },
    })
)

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
app.post('/login', controllers.login)
app.post('/signup', controllers.signup)

// server
app.listen(port, () => {
    console.log(`App is lestening on port: ${port}`)
})
