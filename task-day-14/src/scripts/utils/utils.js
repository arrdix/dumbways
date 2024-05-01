const utils = {
    prepareProject(project) {
        const duration = this.getDuration(project.start, project.end)
        const startDate = this.formatDate(project.start)
        const endDate = this.formatDate(project.end)
        const techHTML = this.techHTMLCreator(project.technologies)
        const techDetailHTML = this.techDetailHTMLCreator(project.technologies)

        return {
            ...project,
            startDate: startDate,
            endDate: endDate,
            duration: duration,
            techHTML: techHTML,
            techDetailHTML: techDetailHTML,
        }
    },

    techHTMLCreator(technologies) {
        return technologies
            .map((tech) => {
                return `<i class="fa-brands fa-${tech}"></i>`
            })
            .join('')
    },

    techDetailHTMLCreator(technologies) {
        return technologies
            .map((tech) => {
                return `<div class="tech-icon-group"><i class="fa-brands fa-${tech}"></i><p>${this.getTechName(
                    tech
                )}</p></div>`
            })
            .join('')
    },

    getDuration(startDate, endDate) {
        const startDateMs = new Date(startDate)
        const endDateMs = new Date(endDate)
        const diff = endDateMs - startDateMs

        const day = Math.floor(diff / (1000 * 60 * 60 * 24))
        const year = Math.floor(day / 365)
        const month = Math.floor(day / 30.44)

        if (year) {
            return `${year} years`
        } else if (month) {
            return `${month} months`
        } else {
            return `${day} days`
        }
    },

    formatDate(date) {
        const dateInstance = new Date(date)
        const monthStr = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ]

        const day = dateInstance.getDate()
        const month = monthStr[dateInstance.getMonth()]
        const year = dateInstance.getFullYear()

        return `${day} ${month} ${year}`
    },

    getTechName(tech) {
        switch (tech) {
            case 'node-js':
                return 'Node JS'
            case 'react':
                return 'React'
            case 'vuejs':
                return 'Vue JS'
            case 'js':
                return 'JavaScript'
        }
    },
}

module.exports = utils
