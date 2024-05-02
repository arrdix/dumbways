import helpers from '../helpers/helpers.js'

document.querySelector('.form-signup').addEventListener('submit', (event) => {
    event.preventDefault()
    formHandler()
})

async function formHandler() {
    const username = document.getElementById('input-username')
    const email = document.getElementById('input-email')
    const password = document.getElementById('input-password')

    const inputs = [username, email, password]
    const validatedData = helpers.formValidation(inputs)

    if (validatedData) {
        const baseUrl = window.location.origin

        await fetch(`${baseUrl}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(validatedData),
        })
    }
}
