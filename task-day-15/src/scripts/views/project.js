import helpers from '../helpers/helpers.js'

document
    .querySelector('.form-new-project')
    .addEventListener('submit', async (event) => {
        event.preventDefault()

        const baseUrl = window.location.origin
        const project = helpers.projectFormHandler()

        if (project) {
            await fetch(`${baseUrl}/project`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(project),
            })

            window.location.assign('/index')
        }
    })
