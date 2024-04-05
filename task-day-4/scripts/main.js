import { projects } from "./data.js";

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

    const inputs = [inputName, inputStartDate, inputEndDate, inputSummary, inputDescription, inputImage, inputCheckboxes]
    
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

function getImageURL(image) {
    return URL.createObjectURL(image)
}

function getTechs(checkboxes) {
    const techs = []
    
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            techs.push(checkbox.value)
        }
    })

    return techs
}

function renderProject(project) {
    const showcase = document.querySelector('.showcase')

    const duration = getDuration(project.startDate, project.endDate)
    const cardTemplate = cardCreator({
        id: project.id,
        name: project.name,
        duration: duration,
        summary: project.summary,
        techs: project.technologies,
        image: project.image
    })

    showcase.innerHTML += cardTemplate
}

function getDuration(startDate, endDate) {
    // getDuration implementation will be available on Task Day 4
    return '3 bulan'
}

function cardCreator(project) {
    const { id, name, duration, summary, techs, image } = project

    return (
        `
        <div class="project-card">
            <a href="/task-day-4/detail/${id}" class="project-detail-link">
                <img src="${image}" class="project-image" alt="Project image">
                <h2 class="project-title">${name}</h2>
            </a>
            <p class="project-duration">Durasi: ${duration}</p>
            <p class="project-summary">
                ${summary}
            </p>
            <div class="tech-group">
                ${techs.map((tech) => `<i class="fa-brands fa-${tech}"></i>`).join('')}
            </div>
            <div class="button-group">
                <div class="edit-btn">Edit</div>
                <div class="delete-btn">Delete</div>
            </div>
        </div>
        `
    )
}