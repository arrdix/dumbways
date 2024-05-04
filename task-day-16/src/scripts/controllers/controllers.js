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
        const isLoggedIn = req.session.isLoggedIn
        const user = req.session.user

        const responses = await projectsModel.findAll({
            include: {
                model: usersModel,
                as: 'author',
            },
        })

        const projects = responses.map((response) => {
            return utils.prepareProject(response.dataValues)
        })

        res.render('index', {
            projects,
            auth: {
                isLoggedIn,
                user,
            },
        })
    },

    async editProjectView(req, res) {
        const { id } = req.params
        const isLoggedIn = req.session.isLoggedIn
        const user = req.session.user

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

        res.render('edit-project', {
            project: requestedProject,
            auth: {
                isLoggedIn,
                user,
            },
        })
    },

    async detailView(req, res) {
        const { id } = req.params
        const isLoggedIn = req.session.isLoggedIn
        const user = req.session.user

        const response = await projectsModel.findOne({
            where: {
                id: id,
            },
            include: {
                model: usersModel,
                as: 'author',
            },
        })

        const requestedProject = utils.prepareProject(response.dataValues)

        res.render('detail', {
            project: requestedProject,
            auth: {
                isLoggedIn,
                user,
            },
        })
    },

    addProjectView(req, res) {
        const isLoggedIn = req.session.isLoggedIn
        const user = req.session.user

        res.render('project', {
            auth: {
                isLoggedIn,
                user,
            },
        })
    },

    testimonialView(req, res) {
        const isLoggedIn = req.session.isLoggedIn
        const user = req.session.user

        res.render('testimonials', {
            auth: {
                isLoggedIn,
                user,
            },
        })
    },

    contactView(req, res) {
        const isLoggedIn = req.session.isLoggedIn
        const user = req.session.user

        res.render('contact', {
            auth: {
                isLoggedIn,
                user,
            },
        })
    },

    loginView(req, res) {
        res.render('login')
    },

    signupView(req, res) {
        res.render('signup')
    },

    // services
    async createProject(req, res) {
        const { name, start, end, summary, description, technologies } =
            req.body
        const userId = req.session.user.userId

        await projectsModel.create({
            name,
            start,
            end,
            summary,
            description,
            technologies: technologies.split(','),
            image: req.file.filename,
            userId: userId,
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
                technologies: technologies.split(','),
                image: req.file.filename,
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
            req.flash('auth', 'Sorry, your username/password was incorrect!')
            return res.status(500).send({ success: true })
        }

        // storing session data
        req.session.isLoggedIn = true
        req.session.user = {
            userId: user.id,
            username: user.username,
            email: user.email,
        }

        return res.status(200).send({ success: false })
    },

    async signup(req, res) {
        const { username, email, password } = req.body

        try {
            await usersModel.create({
                username,
                email,
                password: await bcrypt.hash(password, saltRounds),
            })

            return res.status(200).json({ success: true })
        } catch (err) {
            req.flash('auth', `Sorry, the ${err.errors[0].message}!`)
            return res.status(500).json({ success: false })
        }
    },

    logout(req, res) {
        req.session.destroy()
        res.redirect('/index')
    },
}

module.exports = controllers
