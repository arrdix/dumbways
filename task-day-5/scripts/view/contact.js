const form = document.querySelector('.form-contact')

form.addEventListener("submit", (event) => {
    event.preventDefault()
    formHandler()
})

function formHandler() {
    const inputName = document.getElementById("input-name")
    const inputEmail = document.getElementById("input-email")
    const inputPhone = document.getElementById("input-phone")
    const inputSubject = document.getElementById("input-subject")
    const inputMessage = document.getElementById("input-message")

    const inputs = [inputName, inputEmail, inputPhone, inputSubject, inputMessage]
    const data = formValidation(inputs)

    if (data) {
        const mail = 'mail.ardix@gmail.com'
        const subject = data.subject
        const message = data.message

        window.open(`https://mail.google.com/mail?view=cm&fs-1&to=${mail}&su=${subject}&body=${message}`, '_blank')
    }
}

function formValidation(inputs) {
    const validData = []

    inputs.forEach(input => {
        const inputValue = input.value
        const inputId = input.id
        const labelWarning = document.querySelector(`.${inputId}-warning`)
        const inputValidated = inputValidation(inputValue)

        if (!inputValidated) {
            labelWarning.classList.remove("invisible") 
        } else {
            labelWarning.classList.add("invisible")
            validData.push(inputValidated) 
        }
    })

    if (validData.length === inputs.length) {
        return {
            name: validData[0],
            email: validData[1],
            phone: validData[2],
            subject: validData[3],
            message: validData[4]
        }
    }
}

function inputValidation(input) {
    if (input === '') {
        return null
    }

    return input
}