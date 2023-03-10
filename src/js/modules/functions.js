/* Проверка поддержки webp, добавление класса для html */
export function isWebp() {
    //проверка поддержки webp
    function testWebP(callback) {
        let webP = new Image();
        webP.onload = webP.onerror = function() {
            callback(webP.height == 2);
        };
        webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }
    //добавление класса _webp или _no-webp для HTML
    testWebP(function(support) {
        let className = support === true ? 'webp' : 'no-webp';
        document.documentElement.classList.add(className);
    });
}
import Swiper, { Navigation, Pagination } from 'swiper';

//============
// слайдер верхний
//============
const swiper = new Swiper('.offer__slider', {
    modules: [Navigation, Pagination],
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

//============
// слайдер portfolio
//============
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
    breakpoints: {
        320: {
            slidesPerView: 1,
        },
        740: {
            slidesPerView: 1.3,
        },
        960: {
            slidesPerView: 2.2,
        },
    },
});
//============
// слайдер products
//============
// const w = window.innerWidth;
// const cont = document.querySelector('.products__title').clientWidth;
// const gap = (w - cont) / 1.5;
// console.dir(gap);
const swiper3 = new Swiper('.products__slider-img--inner', {
    modules: [Navigation, Pagination],
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    wrapperClass: 'products__slider-img--wrapper',
    slideClass: 'products__slider-img--slide',
    loop: true,
    slidesPerView: 1,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    effect: 'cards',
});
//============
// табы "выполненные работы"
//============

class Tabs {
    constructor(selector, options) {
        let defaultOptions = {
            isChanged: () => {}
        }
        this.options = Object.assign(defaultOptions, options);
        this.selector = selector;
        this.tabs = document.querySelector(`[data-tabs="${selector}"]`);
        if (this.tabs) {
            this.tabList = this.tabs.querySelector('.tabs__nav');
            this.tabsBtns = this.tabList.querySelectorAll('.tabs__nav-btn');
            this.tabsPanels = this.tabs.querySelectorAll('.tabs__panel');
        } else {
            console.error('Селектор data-tabs не существует!');
            return;
        }

        this.check();
        this.init();
        this.events();
    }

    check() {
        if (document.querySelectorAll(`[data-tabs="${this.selector}"]`).length > 1) {
            console.error('Количество элементов с одинаковым data-tabs больше одного!');
            return;
        }

        if (this.tabsBtns.length !== this.tabsPanels.length) {
            console.error('Количество кнопок и элементов табов не совпадает!');
            return;
        }
    }

    init() {
        this.tabList.setAttribute('role', 'tablist');

        this.tabsBtns.forEach((el, i) => {
            el.setAttribute('role', 'tab');
            el.setAttribute('tabindex', '-1');
            el.setAttribute('id', `${this.selector}-${i + 1}`);
            el.classList.remove('tabs__nav-btn--active');
        });

        this.tabsPanels.forEach((el, i) => {
            el.setAttribute('role', 'tabpanel');
            el.setAttribute('tabindex', '-1');
            el.setAttribute('aria-labelledby', this.tabsBtns[i].id);
            el.classList.remove('tabs__panel--active');
        });

        this.tabsBtns[0].classList.add('tabs__nav-btn--active');
        this.tabsBtns[0].removeAttribute('tabindex');
        this.tabsBtns[0].setAttribute('aria-selected', 'true');
        this.tabsPanels[0].classList.add('tabs__panel--active');
    }

    events() {
        this.tabsBtns.forEach((el, i) => {
            el.addEventListener('click', (e) => {
                let currentTab = this.tabList.querySelector('[aria-selected]');

                if (e.currentTarget !== currentTab) {
                    this.switchTabs(e.currentTarget, currentTab);
                }
            });

            el.addEventListener('keydown', (e) => {
                let index = Array.prototype.indexOf.call(this.tabsBtns, e.currentTarget);

                let dir = null;

                if (e.which === 37) {
                    dir = index - 1;
                } else if (e.which === 39) {
                    dir = index + 1;
                } else if (e.which === 40) {
                    dir = 'down';
                } else {
                    dir = null;
                }

                if (dir !== null) {
                    if (dir === 'down') {
                        this.tabsPanels[i].focus();
                    } else if (this.tabsBtns[dir]) {
                        this.switchTabs(this.tabsBtns[dir], e.currentTarget);
                    }
                }
            });
        });
    }

    switchTabs(newTab, oldTab = this.tabs.querySelector('[aria-selected]')) {
        newTab.focus();
        newTab.removeAttribute('tabindex');
        newTab.setAttribute('aria-selected', 'true');

        oldTab.removeAttribute('aria-selected');
        oldTab.setAttribute('tabindex', '-1');

        let index = Array.prototype.indexOf.call(this.tabsBtns, newTab);
        let oldIndex = Array.prototype.indexOf.call(this.tabsBtns, oldTab);

        this.tabsPanels[oldIndex].classList.remove('tabs__panel--active');
        this.tabsPanels[index].classList.add('tabs__panel--active');

        this.tabsBtns[oldIndex].classList.remove('tabs__nav-btn--active');
        this.tabsBtns[index].classList.add('tabs__nav-btn--active');

        this.options.isChanged(this);
    }
}

const tabs1 = new Tabs('tab', {
    isChanged: (tabs) => {
        // console.log(tabs);
    }
});