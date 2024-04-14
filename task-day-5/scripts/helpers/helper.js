export function getDuration(startDate, endDate) {
    const startDateMs = new Date(startDate).getTime()
    const endDateMs = new Date(endDate).getTime()
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

export function getImageURL(image) {
    return URL.createObjectURL(image)
}

export function getTechs(checkboxes) {
    const techs = []
    
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            techs.push(checkbox.value)
        }
    })

    return techs
}

export function getTechName(tech) {
    switch(tech) {
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