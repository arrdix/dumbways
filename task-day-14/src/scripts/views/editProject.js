import helpers from '../helpers/helpers.js'

document
    .querySelector('.form-edit-project')
    .addEventListener('submit', async (event) => {
        event.preventDefault()

        const baseUrl = window.location.origin
        const id = window.location.pathname.split('/')[2]
        const project = helpers.formHandler()

        if (project) {
            await fetch(`${baseUrl}/edit-project/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(project),
            })

            window.location.assign('/index')
        }
    })
