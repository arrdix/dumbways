import helpers from '../helpers/helpers.js'

document
    .querySelector('.form-edit-project')
    .addEventListener('submit', async (event) => {
        event.preventDefault()

        const spinner = document.querySelector('.spinner')
        const baseUrl = window.location.origin
        const id = window.location.pathname.split('/')[2]
        const project = helpers.projectFormHandler()

        if (project) {
            try {
                spinner.classList.remove('d-none')

                await fetch(`${baseUrl}/edit-project/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(project),
                })

                window.location.assign('/index')
            } catch (err) {
                throw new Error(err)
            } finally {
                spinner.classList.add('d-none')
            }
        }
    })
