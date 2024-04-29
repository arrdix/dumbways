const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const initialProjects = require('./public/scripts/data/data.js')

let projects = initialProjects
const app = express()
const port = 8989

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, './views'))

app.use(express.static(path.join(__dirname, './public')))

// middleware
app.use(bodyParser.json())

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

app.post('/project', (req, res) => {
    const project = req.body

    projects.push({
        ...project,
        id: projects.length + 1,
        image: '/assets/images/jennie.jpg',
    })

    res.send({ status: 'Ok!' })
})

app.delete('/project/:id', (req, res) => {
    const { id } = req.params

    projects = projects.filter((project) => project.id != id)

    res.send({ status: 'Ok!' })
})

app.get('/showcase', (req, res) => {
    res.render('showcase', { projects })
})

app.get('/edit-project/:id', (req, res) => {
    const { id } = req.params
    const requestedProject = projects.find((project) => project.id == id)

    requestedProject.technologies.forEach((tech) => {
        requestedProject[tech] = 'checked'
    })

    res.render('edit-project', requestedProject)
})

app.put('/edit-project/:id', (req, res) => {
    const { id } = req.params
    const editedProject = req.body

    projects = projects.map((project) => {
        if (project.id == id) {
            return {
                id: parseInt(id),
                ...editedProject,
                image: '/assets/images/jennie.jpg',
            }
        }

        return project
    })

    res.send({ status: 'Ok!' })
})

app.get('/detail/:id', (req, res) => {
    const { id } = req.params
    const requestedProject = projects.find((project) => project.id == id)

    res.render('detail', requestedProject)
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
