const config = require('../../../../config/config.json')
const { Sequelize, QueryTypes } = require('sequelize')
const utils = require('../utils/utils.js')

const sequelize = new Sequelize(config.development)

const controllers = {
    // views
    async homeView(req, res) {
        const query = `SELECT * FROM projects`
        const responses = await sequelize.query(query, {
            type: QueryTypes.SELECT,
        })

        const projects = responses.map((response) => {
            return utils.prepareProject(response)
        })

        res.render('index', { projects })
    },

    async editProjectView(req, res) {
        const { id } = req.params
        const requestedProject = projects.find((project) => project.id == id)

        requestedProject.technologies.forEach((tech) => {
            requestedProject[tech] = 'checked'
        })

        res.render('edit-project', requestedProject)
    },

    async detailView(req, res) {
        const { id } = req.params
        const requestedProject = projects.find((project) => project.id == id)

        res.render('detail', requestedProject)
    },

    async addProjectView(req, res) {
        res.render('project')
    },

    async testimonialView(req, res) {
        res.render('testimonials')
    },

    async contactView(req, res) {
        res.render('contact')
    },

    // services
    async createProject(req, res) {
        const { name, start, end, summary, description, technologies, image } =
            req.body
        const strTechnologies = technologies.join(',')

        const query = `INSERT INTO projects (name, start, "end", summary, description, technologies, image) VALUES ('${name}', '${start}', '${end}', '${summary}', '${description}', '{${strTechnologies}}', '/assets/images/jennie.jpg')`
        await sequelize.query(query, { type: QueryTypes.INSERT })

        res.send({ status: 'Ok!' })
    },

    async deleteProject(req, res) {
        const { id } = req.params

        projects = projects.filter((project) => project.id != id)

        res.send({ status: 'Ok!' })
    },

    async editProject(req, res) {
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
    },
}

module.exports = controllers
