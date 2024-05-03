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

        try {
            const response = await fetch(`${baseUrl}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(validatedData),
            })

            if (!response.ok) return window.location.assign('/signup')

            return window.location.assign('/login')
        } catch (err) {
            console.log(err)
        }
    }
}

function passwordExposer() {
    const exposerBtn = document.querySelector('.password-exposer')

    exposerBtn.addEventListener('click', () => {
        const exposerIcon = document.querySelector('.password-exposer-icon')
        const inputPassword = document.getElementById('input-password')

        exposerIcon.classList.toggle('fa-eye')

        if (inputPassword.type === 'text') {
            return (inputPassword.type = 'password')
        }

        return (inputPassword.type = 'text')
    })
}

passwordExposer()
