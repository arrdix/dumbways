const { getDuration } = require('../helpers/helper.js')

function prepareProject(project) {
    const duration = getDuration(project.start, project.end)
    const techHTML = project.technologies
        .map((tech) => {
            return `<i class="fa-brands fa-${tech}"></i>`
        })
        .join('')

    return {
        ...project,
        duration: duration,
        technologies: techHTML,
    }
}

module.exports = prepareProject

// import { projects } from '../data/data.js'
// import {
//     formValidation,
//     getDuration,
//     getImageURL,
//     getTechs,
// } from '../helpers/helper.js'

// const form = document.querySelector('.form-new-project')

// form.addEventListener('submit', (event) => {
//     event.preventDefault()
//     formHandler(projects)
// })

// projects.forEach((project) => {
//     renderProject(project)
// })

// function formHandler(projects) {
//     const inputName = document.getElementById('input-name-project')
//     const inputStartDate = document.getElementById('input-start-date')
//     const inputEndDate = document.getElementById('input-end-date')
//     const inputSummary = document.getElementById('input-summary')
//     const inputDescription = document.getElementById('input-description')
//     const inputImage = document.getElementById('input-image').files[0]
//     const inputCheckboxes = document.querySelectorAll('.checkbox')

//     const inputs = [
//         inputName,
//         inputStartDate,
//         inputEndDate,
//         inputSummary,
//         inputDescription,
//     ]

//     const validatedInputs = formValidation(inputs)
//     const techs = getTechs(inputCheckboxes)
//     const image = getImageURL(inputImage)

//     if (validatedInputs && image && techs.length) {
//         renderProject({
//             ...validatedInputs,
//             id: projects.length + 1,
//             technologies: techs,
//             image: image,
//         })
//     }
// }

// function cardCreator(project) {
//     const { id, name, duration, summary, technologies, image } = project

//     return `
//         <div class="project-card">
//             <a href="/detail/${id}" class="project-detail-link">
//                 <img src="${image}" class="project-image" alt="Project image">
//                 <h2 class="project-title">${name}</h2>
//             </a>
//             <p class="project-duration">Duration: ${duration}</p>
//             <p class="project-summary">
//                 ${summary}
//             </p>
//             <div class="tech-group">
//                 ${technologies
//                     .map((tech) => `<i class="fa-brands fa-${tech}"></i>`)
//                     .join('')}
//             </div>
//             <div class="button-group">
//                 <div class="edit-btn">Edit</div>
//                 <div class="delete-btn">Delete</div>
//             </div>
//         </div>
//         `
// }
