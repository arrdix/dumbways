
import { endpoints } from '../configs/endpoints.js'

export function getTesimonialData() {
    return new Promise((resolve, rejected) => {
        const xhr = new XMLHttpRequest()

        xhr.open('GET', endpoints.GET_TESTIMONIALS, true)
        xhr.send()

        xhr.onload = function() {
            resolve(JSON.parse(xhr.response))
        }

        xhr.onerror = function() {
            rejected("Fetching data failed!")
        }
    })
}