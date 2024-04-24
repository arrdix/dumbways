import { getTesimonialData } from '../network/testimonialsSource.js'

window.addEventListener('DOMContentLoaded', () => {
    getTestimonials()
})

async function getTestimonials() {
    try {
        const response = await getTesimonialData()
        initTestimonials(response)
    } catch (err) {
        throw new Error(err)
    }
}

function initTestimonials(testimonials) {
    const filterButtons = document.querySelectorAll('.filter-btn')

    filterButtons.forEach((filterButton) => {
        filterHandler(filterButton, testimonials)
    })

    renderTestimonials(testimonials)
}

function filterHandler(btn, testimonials) {
    btn.addEventListener('click', () => {
        // parse to int because attribute is string
        const requestedRating = parseInt(btn.getAttribute('rating'))
        const filteredTestimonial = testimonials.filter(
            (testimonials) => testimonials.rating == requestedRating
        )

        if (!requestedRating) {
            return renderTestimonials(testimonials)
        }

        if (!filteredTestimonial.length) {
            return renderEmptyMessage()
        }

        return renderTestimonials(filteredTestimonial)
    })
}

function renderEmptyMessage() {
    const emptyMessage = emptyMessageCreator()

    const testimonialsWrapper = document.querySelector('.testimonials')
    testimonialsWrapper.innerHTML = emptyMessage
}

function emptyMessageCreator() {
    return `
        <div class="empty-message">
            <h2>Oops! I'm sorry.</h2>
            <p>It looks like I don't have testimonial for selected star(s).</p>
        </div>
        `
}

function renderTestimonials(testimonials) {
    const testimonialCards = testimonials.map((testimonial) => {
        const testimonialCard = cardCreator(testimonial)

        return testimonialCard
    })

    const testimonialsWrapper = document.querySelector('.testimonials')
    testimonialsWrapper.innerHTML = testimonialCards.join('')
}

function cardCreator(testimonial) {
    const { name, rating, testimony, image } = testimonial

    return `
        <div class="card">
            <img src="/assets/images/jennie.jpg" class="testi-image" alt="testimony image">
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
