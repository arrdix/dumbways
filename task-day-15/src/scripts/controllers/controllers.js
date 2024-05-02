const config = require('../../../../config/config.json')
const { Sequelize, QueryTypes } = require('sequelize')
const utils = require('../utils/utils.js')
const projectsModel = require('../../../../models').projects
const usersModel = require('../../../../models').users
const bcrypt = require('bcrypt')
const saltRounds = 10

const sequelize = new Sequelize(config.development)

const controllers = {
    // views
    async homeView(req, res) {
        const responses = await projectsModel.findAll()

        const projects = responses.map((response) => {
            return utils.prepareProject(response.dataValues)
        })

        res.render('index', { projects })
    },

    async editProjectView(req, res) {
        const { id } = req.params

        const response = await projectsModel.findOne({
            where: {
                id: id,
            },
        })
        const requestedProject = response.dataValues
        const technologies = response.dataValues.technologies

        technologies.forEach((tech) => {
            requestedProject[tech] = 'checked'
        })

        res.render('edit-project', requestedProject)
    },

    async detailView(req, res) {
        const { id } = req.params

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

    async login(req, res) {
        const { username, password } = req.body

        const user = await usersModel.findOne({
            where: {
                username: username,
            },
        })

        // use 'default' as alternative value if user isn't exist to avoid redundant condition
        const isPasswordMatch = await bcrypt.compare(
            password,
            user?.password || 'default'
        )

        if (!user || !isPasswordMatch) {
            res.json({ message: 'Username/password was incorrect!' })
        }

        // storing session data
        req.session.isLoggedIn = true
        req.session.user = {
            username: user.username,
        }

        res.json({ message: 'Logged in!' })
    },

    async signup(req, res) {
        const { username, email, password } = req.body

        try {
            await usersModel.create({
                username,
                email,
                password: await bcrypt.hash(password, saltRounds),
            })

            res.json({ message: 'Account created!' })
        } catch (err) {
            const errorMessage = err.errors[0].message
            res.json({ message: `${errorMessage}` })
        }
    },
}

module.exports = controllers
