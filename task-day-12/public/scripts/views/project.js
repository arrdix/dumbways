import {
    formValidation,
    getImageURL,
    getTechs,
    prepareProject,
} from '../helpers/helper.js'

document
    .querySelector('.form-new-project')
    .addEventListener('submit', (event) => {
        event.preventDefault()

        const project = formHandler()
        const baseUrl = window.location.origin

        fetch(`${baseUrl}/project`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        })
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

    const validatedInputs = formValidation(inputs)
    const techs = getTechs(inputCheckboxes)
    const image = getImageURL(inputImage)

    if (validatedInputs && image && techs.length) {
        return prepareProject({
            ...validatedInputs,
            technologies: techs,
            image: image,
        })
    }
}
