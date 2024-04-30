import helpers from '../helpers/helpers.js'

document
    .querySelector('.form-new-project')
    .addEventListener('submit', async (event) => {
        event.preventDefault()

        const baseUrl = window.location.origin
        const project = formHandler()

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

function formHandler() {
    const inputName = document.getElementById('input-name-project')
    const inputStartDate = document.getElementById('input-start-date')
    const inputEndDate = document.getElementById('input-end-date')
    const inputSummary = document.getElementById('input-summary')
    const inputDescription = document.getElementById('input-description')
    const inputImage = document.getElementById('input-image').files[0]
    const inputCheckboxes = document.querySelectorAll('.checkbox')

    const inputs = [
        inputName,
        inputStartDate,
        inputEndDate,
        inputSummary,
        inputDescription,
    ]

    const validatedInputs = helpers.formValidation(inputs)
    const techs = helpers.getTechs(inputCheckboxes)
    const image = helpers.getImageURL(inputImage)

    if (validatedInputs && image && techs.length) {
        return {
            ...validatedInputs,
            technologies: techs,
            image: image,
        }
    }
}
