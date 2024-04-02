window.addEventListener("DOMContentLoaded", () => {
    initRoutes()
})

function initRoutes() {
    const routes = document.getElementById("routes")

    for (let i = 1; i <= 30; i++) {
        const route = document.createElement("a")
        route.textContent = `TASK DAY ${i}`
        route.setAttribute("href", `task-day-${i}`)

        routes.append(route)
    }
}