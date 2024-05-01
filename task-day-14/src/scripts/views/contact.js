import helpers from '../helpers/helpers.js'

const form = document.querySelector('.form-contact')

form.addEventListener('submit', (event) => {
    event.preventDefault()
    formHandler()
})

function formHandler() {
    const inputName = document.getElementById('input-name')
    const inputEmail = document.getElementById('input-email')
    const inputPhone = document.getElementById('input-phone')
    const inputSubject = document.getElementById('input-subject')
    const inputMessage = document.getElementById('input-message')

    const inputs = [
        inputName,
        inputEmail,
        inputPhone,
        inputSubject,
        inputMessage,
    ]
    const data = helpers.formValidation(inputs)

    if (data) {
        const mail = 'mail.ardix@gmail.com'
        const subject = data.subject
        const message = data.message

        window.open(
            `https://mail.google.com/mail?view=cm&fs-1&to=${mail}&su=${subject}&body=${message}`,
            '_blank'
        )
    }
}
