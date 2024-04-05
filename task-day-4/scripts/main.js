import { projects } from "./data.js";
import { getDuration, getImageURL, getTechs } from './helpers/helper.js'

window.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector('.form-new-project')

    form.addEventListener('submit', (event) => {
        event.preventDefault()
        formHandler(projects)
    })

    projects.forEach((project) => {
        renderProject(project)
    })
})

function formHandler(projects) {
    const inputName = document.getElementById('input-project-name').value
    const inputStartDate = document.getElementById('input-start-date').value
    const inputEndDate = document.getElementById('input-end-date').value
    const inputSummary = document.getElementById('input-summary').value
    const inputDescription = document.getElementById('input-description').value
    const inputImage = document.getElementById('input-image').files[0]
    const inputCheckboxes = document.querySelectorAll('.checkbox')

    const project = {
        id: projects.length + 1,
        name: inputName,
        startDate: inputStartDate,
        endDate: inputEndDate,
        summary: inputSummary,
        description: inputDescription,
        image: getImageURL(inputImage),
        technologies: getTechs(inputCheckboxes)
    }

    renderProject(project)
}

function renderProject(project) {
    const showcase = document.querySelector('.showcase')

    const duration = getDuration(project.startDate, project.endDate)
    const cardTemplate = cardCreator({
        ...project,
        duration: duration
    })

    showcase.innerHTML += cardTemplate
}

function cardCreator(project) {
    const { id, name, duration, summary, technologies, image } = project

    return (
        `
        <div class="project-card">
            <a href="/task-day-4/detail.html?id=${id}" class="project-detail-link">
                <img src="${image}" class="project-image" alt="Project image">
                <h2 class="project-title">${name}</h2>
            </a>
            <p class="project-duration">Durasi: ${duration}</p>
            <p class="project-summary">
                ${summary}
            </p>
            <div class="tech-group">
                ${technologies.map((tech) => `<i class="fa-brands fa-${tech}"></i>`).join('')}
            </div>
            <div class="button-group">
                <div class="edit-btn">Edit</div>
                <div class="delete-btn">Delete</div>
            </div>
        </div>
        `
    )
}