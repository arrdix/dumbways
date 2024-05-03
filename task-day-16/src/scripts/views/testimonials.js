import { getTesimonialData } from '../network/testimonialsSource.js'

window.addEventListener('DOMContentLoaded', () => {
    getTestimonials()
})

async function getTestimonials() {
    const spinner = document.querySelector('.spinner')

    try {
        spinner.classList.remove('d-none')

        const response = await getTesimonialData()
        initTestimonials(response)
    } catch (err) {
        throw new Error(err)
    } finally {
        spinner.classList.add('d-none')
    }
}

function initTestimonials(testimonials) {
    const filterButtons = document.querySelectorAll('.filter-btn')
    filterButtons.forEach((filterButton) => {
        filterHandler(filterButton, testimonials)
    })

    const testimonialCard = testimonials.map((testimonial) =>
        cardCreator(testimonial)
    )
    render(testimonialCard.join(''))
}

function filterHandler(btn, testimonials) {
    btn.addEventListener('click', () => {
        // parse to int because attribute is string
        const requestedRating = parseInt(btn.getAttribute('rating'))
        const filteredTestimonial = testimonials.filter(
            (testimonials) => testimonials.rating === requestedRating
        )

        if (!requestedRating) {
            const testimonialCard = testimonials.map((testimonial) =>
                cardCreator(testimonial)
            )
            return render(testimonialCard.join(''))
        }

        if (!filteredTestimonial.length) {
            const emptyMessage = emptyMessageCreator()
            return render(emptyMessage)
        }

        const testimonialCard = filteredTestimonial.map((testimonial) =>
            cardCreator(testimonial)
        )
        return render(testimonialCard.join(''))
    })
}

function emptyMessageCreator() {
    return `
        <div class="empty-message">
            <h2>Oops! I'm sorry.</h2>
            <p>It looks like I don't have testimonial for selected star(s).</p>
        </div>
        `
}

function cardCreator(testimonial) {
    const { name, rating, testimony, image } = testimonial

    return `
        <div class="card shadow border-0">
            <img src="${image}" class="testi-image" alt="testimony image">
            <p class="testi-text">${testimony}</p>
            <h3 class="testi-name">${name}</h3>
            <div class="stars">
                ${starsCreator(rating)}
            </div>
        </div>
        `
}

function starsCreator(rating) {
    const stars = []

    for (let i = 0; i < rating; i++) {
        stars.push('<i class="fa-solid fa-star"></i>')
    }

    return stars.join('')
}

function render(html) {
    const testimonialsWrapper = document.querySelector('.testimonials')
    testimonialsWrapper.innerHTML = html
}
