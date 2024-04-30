const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const { Sequelize, QueryTypes } = require('sequelize')
const config = require('../config/config.json')
const sequelize = new Sequelize(config.development)
const initialProjects = require('./src/data/data.js')

let projects = initialProjects
const app = express()
const port = 8989

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, './src/views'))

// middleware
app.use(express.static(path.join(__dirname, './src')))
app.use(bodyParser.json())

// routes
app.get('/', (req, res) => {
    res.render('index', { projects })
})

app.get('/index', (req, res) => {
    res.render('index', { projects })
})

app.get('/project', (req, res) => {
    res.render('project')
})

app.post('/project', async (req, res) => {
    const { name, start, end, summary, description, technologies, image } =
        req.body
    const strTechnologies = technologies.join(',')

    const query = `INSERT INTO projects (name, start_date, end_date, summary, description, technologies, image) VALUES ('${name}', '${start}', '${end}', '${summary}', '${description}', '{${strTechnologies}}', '/assets/images/jennie.jpg')`
    await sequelize.query(query, { type: QueryTypes.INSERT })

    res.send({ status: 'Ok!' })
})

app.delete('/project/:id', (req, res) => {
    const { id } = req.params

    projects = projects.filter((project) => project.id != id)

    res.send({ status: 'Ok!' })
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
