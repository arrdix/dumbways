import { testimonials } from '../data/data.js'

window.addEventListener('DOMContentLoaded', () => {
    renderTestimonials(testimonials)
})

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

    return (
        `
        <div class="card">
            <img src="${image}" class="testi-image" alt="testimony image">
            <p class="testi-text">${testimony}</p>
            <h3 class="testi-name">${name}</h3>
            <div class="stars">
                ${starsCreator(rating)}
            </div>
        </div>
        `
    )
}

function starsCreator(rating) {
    const stars = []
    
    for (let i = 0; i < rating; i++) {
        stars.push('<i class="fa-solid fa-star"></i>')
    }

    console.log(stars)

    return stars.join('')
}