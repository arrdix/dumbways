import helpers from '../helpers/helpers.js'

document.querySelector('.form-login').addEventListener('submit', (event) => {
    event.preventDefault()
    formHandler()
})

async function formHandler() {
    const username = document.getElementById('input-username')
    const password = document.getElementById('input-password')

    const inputs = [username, password]
    const data = helpers.formValidation(inputs)

    if (data) {
        const baseUrl = window.location.origin

        await fetch(`${baseUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        window.location.assign('/index')
    }
}
