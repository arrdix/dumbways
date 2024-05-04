import helpers from '../helpers/helpers.js'

document
    .querySelector('.form-new-project')
    .addEventListener('submit', async (event) => {
        event.preventDefault()

        const spinner = document.querySelector('.spinner')
        const baseUrl = window.location.origin
        const project = helpers.projectFormHandler()

        if (project) {
            try {
                spinner.classList.remove('d-none')

                await fetch(`${baseUrl}/project`, {
                    method: 'POST',
                    // send the whole project as a multipart
                    body: helpers.createFormData(project),
                })

                window.location.assign('/index')
            } catch (err) {
                throw new Error(err)
            } finally {
                spinner.classList.add('d-none')
            }
        }
    })
