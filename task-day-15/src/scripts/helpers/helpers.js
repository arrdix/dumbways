const helpers = {
    formHandler() {
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

        const validatedInputs = this.formValidation(inputs)
        const techs = this.getTechs(inputCheckboxes)
        const image = this.getImageURL(inputImage)

        if (validatedInputs && image && techs.length) {
            return {
                ...validatedInputs,
                technologies: techs,
                image: image,
            }
        }
    },

    formValidation(inputs) {
        const dataKey = []
        const validData = []

        inputs.forEach((input) => {
            const inputValue = input.value
            const inputId = input.id
            const inputName = inputId.split('-')[1]
            const labelWarning = document.querySelector(`.${inputId}-warning`)
            const inputValidated = this.inputValidation(inputValue)

            if (!inputValidated) {
                labelWarning.classList.remove('invisible')
            } else {
                labelWarning.classList.add('invisible')

                dataKey.push(inputName)
                validData.push(inputValidated)
            }
        })

        if (validData.length === inputs.length) {
            const data = {}

            for (let i = 0; i < validData.length; i++) {
                data[dataKey[i]] = validData[i]
            }

            return data
        }
    },

    inputValidation(input) {
        if (input === '') {
            return null
        }

        return input
    },

    getTechs(checkboxes) {
        const techs = []
        const labelWarning = document.querySelector(
            '.input-technologies-warning'
        )

        checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                techs.push(checkbox.value)
            }
        })

        if (!techs.length) {
            labelWarning.classList.remove('invisible')
            return
        }

        labelWarning.classList.add('invisible')
        return techs
    },

    getImageURL(image) {
        const labelWarning = document.querySelector('.input-image-warning')

        if (!image) {
            labelWarning.classList.remove('invisible')
            return
        }

        labelWarning.classList.add('invisible')
        return URL.createObjectURL(image)
    },
}

export default helpers
