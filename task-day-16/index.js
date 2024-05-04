const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const controllers = require('./src/scripts/controllers/controllers')
const session = require('express-session')
const flash = require('express-flash')
const multer = require('multer')

const app = express()
const port = 8989

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, './src/views'))

// middlewares
app.use(express.static(path.join(__dirname, './src')))
app.use(flash())
app.use(
    session({
        secret: 'personal_web_secret_recipe',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false, maxAge: 60000 * 60 },
    })
)
app.use((req, res, next) => {
    const isLoggedIn = req.session.isLoggedIn

    // prevent authorized user to access login/signup page
    if (isLoggedIn) {
        if (req.url === '/login' || req.url === '/signup') {
            return res.redirect('/index')
        }
    }

    // prevent unauthorized user to add, edit or delete project
    if (!isLoggedIn) {
        if (
            req.originalUrl.startsWith('/edit-project') ||
            req.originalUrl.startsWith('/project') ||
            req.url === '/logout'
        ) {
            req.flash('forbid', 'Please login to access the requested page.')
            return res.redirect('/login')
        }
    }

    return next()
})
const uploader = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './task-day-16/src/assets/uploads/')
        },
        filename: function (req, file, cb) {
            cb(
                null,
                file.fieldname +
                    '-' +
                    Date.now() +
                    path.extname(file.originalname)
            )
        },
    }),
})

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
app.post('/login', bodyParser.json(), controllers.login)
app.post('/signup', bodyParser.json(), controllers.signup)
app.post('/project', uploader.single('image'), controllers.createProject)
app.put('/edit-project/:id', uploader.single('image'), controllers.editProject)
app.delete('/project/:id', controllers.deleteProject)
app.get('/logout', controllers.logout)

// server
app.listen(port, () => {
    console.log(`App is lestening on port: ${port}`)
})
