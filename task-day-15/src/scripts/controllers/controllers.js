const config = require('../../../../config/config.json')
const { Sequelize, QueryTypes } = require('sequelize')
const utils = require('../utils/utils.js')
const projectsModel = require('../../../../models').projects

const sequelize = new Sequelize(config.development)

const controllers = {
    // views
    async homeView(req, res) {
        // const query = `SELECT * FROM projects`
        // const responses = await sequelize.query(query, {
        //     type: QueryTypes.SELECT,
        // })

        const responses = await projectsModel.findAll()

        const projects = responses.map((response) => {
            return utils.prepareProject(response.dataValues)
        })

        res.render('index', { projects })
    },

    async editProjectView(req, res) {
        const { id } = req.params

        // const query = `SELECT * FROM projects WHERE id = ${id}`
        // const requestedProject = await sequelize.query(query, {
        //     type: QueryTypes.SELECT,
        // })

        const response = await projectsModel.findOne({
            where: {
                id: id,
            },
        })
        const requestedProject = response.dataValues

        requestedProject.technologies.forEach((tech) => {
            requestedProject[tech] = 'checked'
        })

        res.render('edit-project', requestedProject)
    },

    async detailView(req, res) {
        const { id } = req.params

        // const query = `SELECT * FROM projects WHERE id = ${id}`
        // const rawRequestedProject = await sequelize.query(query, {
        //     type: QueryTypes.SELECT,
        // })

        const response = await projectsModel.findOne({
            where: {
                id: id,
            },
        })

        const requestedProject = utils.prepareProject(response.dataValues)

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

    loginView(req, res) {
        res.render('login')
    },

    signupView(req, res) {
        res.render('signup')
    },

    // services
    async createProject(req, res) {
        const { name, start, end, summary, description, technologies, image } =
            req.body
        // const strTechnologies = technologies.join(',')

        // const query = `INSERT INTO projects (name, start, "end", summary, description, technologies, image) VALUES ('${name}', '${start}', '${end}', '${summary}', '${description}', '{${strTechnologies}}', '/assets/images/jennie.jpg')`
        // await sequelize.query(query, { type: QueryTypes.INSERT })

        await projectsModel.create({
            name,
            start,
            end,
            summary,
            description,
            technologies,
            image: '/assets/images/jennie.jpg',
        })

        res.send({ status: 'Ok!' })
    },

    async deleteProject(req, res) {
        const { id } = req.params

        // const query = `DELETE FROM projects WHERE id = ${id}`
        // await sequelize.query(query, { type: QueryTypes.DELETE })

        await projectsModel.destroy({
            where: {
                id: id,
            },
        })

        res.send({ status: 'Ok!' })
    },

    async editProject(req, res) {
        const { id } = req.params
        const { name, start, end, summary, description, technologies, image } =
            req.body
        // const strTechnologies = technologies.join(',')

        // const query = `UPDATE projects SET name = '${name}', start = '${start}', "end" = '${end}', summary = '${summary}', description = '${description}', technologies = '{${strTechnologies}}', image = '/assets/images/jennie.jpg' WHERE id = ${id}`
        // await sequelize.query(query, { type: QueryTypes.UPDATE })

        await projectsModel.update(
            {
                name,
                start,
                end,
                summary,
                description,
                technologies,
                image: '/assets/images/jennie.jpg',
            },
            {
                where: {
                    id: id,
                },
            }
        )

        res.send({ status: 'Ok!' })
    },

    login(req, res) {
        const { username, password } = req.body
        console.log(username, password)
    },
}

module.exports = controllers
