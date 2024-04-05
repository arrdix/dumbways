import { projects } from "./data.js"

window.addEventListener("DOMContentLoaded", () => {
    const urlParam = new URLSearchParams(window.location.search)
    const projectId = urlParam.get('id')
    console.log(projectId)
    console.log(projects)
})