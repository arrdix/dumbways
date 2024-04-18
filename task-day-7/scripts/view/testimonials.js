import { testimonials } from '../data/data.js'

class TestimonialCreator {
    constructor({id, name, rating, testimony, image}) {
        this.id = id
        this.name = name
        this.rating = rating
        this.testimony = testimony
        this.image = image
    }

    createCard() {
        return (
            `
            <div class="card">
                <img src="${this.image}" class="testi-image" alt="testimony image">
                <p class="testi-text">${this.testimony}</p>
                <h3 class="testi-name">${this.name}</h3>
                <div class="stars">
                    ${this.createStars(this.rating)}
                </div>
            </div>
            `
        )
    }

    createStars(rating) {
        const stars = []

        for (let i = 0; i < rating; i++) {
            stars.push('<i class="fa-solid fa-star"></i>')
        }

        return stars.join('')
    }
}

const testimonyCards = testimonials.map((testimony) => {
    const testimonyCard = new TestimonialCreator({
        id: testimony.id,
        name: testimony.name,
        rating: testimony.rating,
        testimony: testimony.testimony,
        image: testimony.image
    })

    return testimonyCard.createCard()
})

const testimonialsWrapper = document.querySelector('.testimonials')
testimonialsWrapper.innerHTML += testimonyCards.join('')