const config = require('../../../../config/config.json')
const { Sequelize, QueryTypes } = require('sequelize')
const utils = require('../utils/utils.js')
const projectsModel = require('../../../../models').projects

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

        const query = `SELECT * FROM projects WHERE id = ${id}`
        const requestedProject = await sequelize.query(query, {
            type: QueryTypes.SELECT,
        })

        requestedProject[0].technologies.forEach((tech) => {
            requestedProject[0][tech] = 'checked'
        })

        res.render('edit-project', requestedProject[0])
    },

    async detailView(req, res) {
        const { id } = req.params

        const query = `SELECT * FROM projects WHERE id = ${id}`
        const rawRequestedProject = await sequelize.query(query, {
            type: QueryTypes.SELECT,
        })
        const requestedProject = utils.prepareProject(rawRequestedProject[0])

        res.render('detail', requestedProject)
    },

    addProjectView(req, res) {
        res.render('project')
    },

    testimonialView(req, res) {
        res.render('testimonials')
    },

    contactView(req, res) {
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

        const query = `DELETE FROM projects WHERE id = ${id}`
        await sequelize.query(query, { type: QueryTypes.DELETE })

        res.send({ status: 'Ok!' })
    },

    async editProject(req, res) {
        const { id } = req.params
        const { name, start, end, summary, description, technologies, image } =
            req.body
        const strTechnologies = technologies.join(',')

        const query = `UPDATE projects SET name = '${name}', start = '${start}', "end" = '${end}', summary = '${summary}', description = '${description}', technologies = '{${strTechnologies}}', image = '/assets/images/jennie.jpg' WHERE id = ${id}`
        await sequelize.query(query, { type: QueryTypes.UPDATE })

        res.send({ status: 'Ok!' })
    },
}

module.exports = controllers
