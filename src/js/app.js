import * as flsFunctions from "./modules/functions.js";
import Swiper, { Navigation, Pagination } from 'swiper';



flsFunctions.isWebp();


const swiper = new Swiper('.offer-slider', {
    modules: [Navigation, Pagination],

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

const swiper2 = new Swiper('.portfolio__container', {
    modules: [Navigation, Pagination],
    centeredSlides: true,
    loop: true,
    slidesPerView: 2.6,
    spaceBetween: 0,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
    },
})