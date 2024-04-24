function prepareProject(project) {
    const duration = getDuration(project.start, project.end)
    const startDate = formatDate(project.start)
    const endDate = formatDate(project.end)
    const techHTML = techHTMLCreator(project.technologies)
    const techDetailHTML = techDetailHTMLCreator(project.technologies)

    return {
        ...project,
        startDate: startDate,
        endDate: endDate,
        duration: duration,
        techHTML: techHTML,
        techDetailHTML: techDetailHTML,
    }
}

function techHTMLCreator(technologies) {
    return technologies
        .map((tech) => {
            return `<i class="fa-brands fa-${tech}"></i>`
        })
        .join('')
}

function techDetailHTMLCreator(technologies) {
    return technologies
        .map((tech) => {
            return `<div class="tech-icon-group"><i class="fa-brands fa-${tech}"></i><p>${getTechName(
                tech
            )}</p></div>`
        })
        .join('')
}

function getDuration(startDate, endDate) {
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
}

function formatDate(date) {
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
}

function getImageURL(image) {
    const labelWarning = document.querySelector('.input-image-warning')

    if (!image) {
        labelWarning.classList.remove('invisible')
        return
    }

    labelWarning.classList.add('invisible')
    return URL.createObjectURL(image)
}

function getTechs(checkboxes) {
    const techs = []
    const labelWarning = document.querySelector('.input-technologies-warning')

    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            techs.push(checkbox.value)
        }
    })

    if (!techs.length) {
        labelWarning.classList.remove('invisible')
        return
    }

    labelWarning.classList.add('invisible')
    return techs
}

function getTechName(tech) {
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
}

function formValidation(inputs) {
    const dataKey = []
    const validData = []

    inputs.forEach((input) => {
        const inputValue = input.value
        const inputId = input.id
        const inputName = inputId.split('-')[1]
        const labelWarning = document.querySelector(`.${inputId}-warning`)
        const inputValidated = inputValidation(inputValue)

        if (!inputValidated) {
            labelWarning.classList.remove('invisible')
        } else {
            labelWarning.classList.add('invisible')

            dataKey.push(inputName)
            validData.push(inputValidated)
        }
    })

    if (validData.length === inputs.length) {
        const data = {}

        for (let i = 0; i < validData.length; i++) {
            data[dataKey[i]] = validData[i]
        }

        return data
    }
}

function inputValidation(input) {
    if (input === '') {
        return null
    }

    return input
}

module.exports = {
    getDuration: getDuration,
    formatDate: formatDate,
    getImageURL: getImageURL,
    getTechs: getTechs,
    getTechName: getTechName,
    formValidation: formValidation,
    inputValidation: inputValidation,
    prepareProject,
    prepareProject,
}
