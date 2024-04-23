import { projects } from '../data/data.js'
import { getDuration, getTechName, formatDate } from '../helpers/helper.js'

window.addEventListener('DOMContentLoaded', () => {
    const urlParam = new URLSearchParams(window.location.search)
    const projectId = urlParam.get('id')

    const requestedProject = projects.find(
        (project) => project.id === parseInt(projectId)
    )

    if (requestedProject) {
        renderDetail(requestedProject)
    } else {
        render404()
    }
})

function renderDetail(project) {
    const wrapper = document.querySelector('.wrapper.project-detail')
    const duration = getDuration(project.start, project.end)
    const startDate = formatDate(project.start)
    const endDate = formatDate(project.end)

    const detailTemplate = detailCreator({
        ...project,
        startDate: startDate,
        endDate: endDate,
        duration: duration,
    })

    wrapper.innerHTML += detailTemplate
}

function detailCreator(project) {
    const {
        name,
        startDate,
        endDate,
        duration,
        description,
        technologies,
        image,
    } = project
    const techHTML = technologies.map((tech) => {
        return `
            <div class="tech-icon-group">
                <i class="fa-brands fa-${tech}"></i>
                <p>${getTechName(tech)}</p>
            </div>
            `
    })

    return `
            <h1>${name.toUpperCase()}</h1>
            <div class="detail-header">
                <img src="${image}" class="detail-image" alt="">
                <div class="detail-info">
                    <h2>Duration</h2>
                    <div class="detail-date-group">
                        <i class="fa-solid fa-calendar"></i>
                        <p>${startDate} - ${endDate}</p>
                    </div>
                    <div class="detail-duration-group">
                        <i class="fa-solid fa-clock"></i>
                        <p>${duration}</p>
                    </div>
                    <h2>Technologies</h2>
                    <div class="detail-tech-group">
                        ${techHTML.join('')}
                    </div>
                </div>
            </div>
            <div class="detail-body">
                <h2>Description</h2>
                <div class="detail-desc">
                    ${description}
                </div>
            </div>
        `
}

function render404() {
    const wrapper = document.querySelector('.wrapper.project-detail')
    const notFoundTemplate = notFoundCreator()

    wrapper.innerHTML = notFoundTemplate
}

function notFoundCreator() {
    return `
            <div class="empty-message-group">
                <h1>Oh, no! I am sorry.</h1>
                <p>Unfortunately, at this moment this website can only display the details of the existing projects, not the new one.</p>
                <i class="fa-regular fa-face-frown"></i>
                <a href="/task-day-11/project.html">Go Back</a>
            </div>
        `
}
