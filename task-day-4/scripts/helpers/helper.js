export function getDuration(startDate, endDate) {
    // getDuration implementation will be available on Task Day 5
    return '3 months'
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