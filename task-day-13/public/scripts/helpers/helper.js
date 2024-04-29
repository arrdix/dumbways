export function prepareProject(project) {
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

export function techHTMLCreator(technologies) {
    return technologies
        .map((tech) => {
            return `<i class="fa-brands fa-${tech}"></i>`
        })
        .join('')
}

export function techDetailHTMLCreator(technologies) {
    return technologies
        .map((tech) => {
            return `<div class="tech-icon-group"><i class="fa-brands fa-${tech}"></i><p>${getTechName(
                tech
            )}</p></div>`
        })
        .join('')
}

export function getDuration(startDate, endDate) {
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

export function formatDate(date) {
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

export function getImageURL(image) {
    const labelWarning = document.querySelector('.input-image-warning')

    if (!image) {
        labelWarning.classList.remove('invisible')
        return
    }

    labelWarning.classList.add('invisible')
    return URL.createObjectURL(image)
}

export function getTechs(checkboxes) {
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

export function getTechName(tech) {
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

export function formValidation(inputs) {
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

export function inputValidation(input) {
    if (input === '') {
        return null
    }

    return input
}
