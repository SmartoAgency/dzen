import Swiper, { EffectFade, Mousewheel, Navigation, Autoplay } from 'swiper';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from "gsap/SplitText";
import { pad, useState } from './modules/helpers/helpers';
import splitToLinesAndFadeUp from './modules/effects/splitLinesAndFadeUp';
import Accordion from "accordion-js";
import googleMap from './modules/map/map';
import './modules/gallery/gallerySlider';
import { debounce } from 'lodash';
import { Fancybox } from '@fancyapps/ui';
import './modules/HeatDistortion/HeatDistortion.js';
import './modules/HeatDistortion/HeatDistortionScreen2.js';
import Swal from 'sweetalert2';
// const header = document.querySelector('.header');

// const headroom = new Headroom(header, {});
// headroom.init();

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);
gsap.core.globals('ScrollTrigger', ScrollTrigger);
gsap.core.globals('SplitText', SplitText);


document.querySelectorAll('[data-split-lines-new-animation]').forEach((el) => {

    let split = SplitText.create(el, { type: "lines", mask: 'lines', linesClass: "line", });
    
    gsap.set(split.lines, {
        y: 100,
    });
    gsap.timeline({
        scrollTrigger: {
            trigger: el,
            once: true,
            start: '50% bottom',
        }
    })
        .fromTo(split.lines, {
            y: 100,
            opacity: 0,
        }, {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: "power4.out",
            stagger: {
                amount: 0.15,
            }
        })
        .add(() => {
            split.revert();
        })
})


googleMap();

Swiper.use([Mousewheel, Navigation]);


function planningsSliders() {
    function pad(num) {
        return (num < 10 ? '0' : '') + num;
    }
    
    document.querySelectorAll('[data-planning-item-slider]').forEach((slider) => {
        const container = slider.querySelector('.swiper-wrapper');
        container.addEventListener('click',function(evt){
            const slides = Array.from(container.querySelectorAll('.swiper-slide img'))
                .map(el => {
                    return {
                        src: el.getAttribute('data-src') || el.src,
                        thumb: el.getAttribute('data-thumb') || el.src,
                        type: 'image',
                        opts: {
                            caption: el.getAttribute('alt') || '',
                            thumb: el.getAttribute('data-thumb') || el.src
                        }
                    }
                });
            Fancybox.show(
                slides,
                // clas
                {
                    on: {
                        initLayout: (fancybox) => {
                            fancybox.getContainer().setAttribute('data-lenis-prevent', '');
                            
                        }
                    },
                }
            );
        });
        // new Swiper(slider, {
        //     loop: true,
        //     navigation: {
        //         nextEl: slider.querySelector('[data-planning-item-slider-next]'),
        //         prevEl: slider.querySelector('[data-planning-item-slider-prev]'),
        //     },
        //     on: {
        //         'activeIndexChange': (swiper) => {
        //             const currentIndex = swiper.realIndex;
        //             const totalSlides = swiper.slides.length; // Exclude looped slides
        //             const currentSlideNumber = pad(currentIndex + 1);
        //             const totalSlidesNumber = pad(totalSlides);
                    
        //             slider.querySelector('[data-planning-item-slider-current]').textContent = currentSlideNumber;
        //             slider.querySelector('[data-planning-item-slider-all]').textContent = totalSlidesNumber;
        //         }
        //     }
        // });
    })
}
planningsSliders();


function planningsBigSlider() {
    new Swiper('[data-plannings-slider]', {
        spaceBetween: 15,
        slidesPerView: 2.85,
        navigation: {
            nextEl: '[data-plannings-slider-next]',
            prevEl: '[data-plannings-slider-prev]',
        },
        breakpoints: {
            320: {
                slidesPerView: 1.05,
                spaceBetween: 6,
            },
            1025: {
                slidesPerView: 2.85,
                spaceBetween: 15,
            }
        },
    })
}
planningsBigSlider();


function projectsSlider() {
    new Swiper('[data-projects-swiper]', {
        slidesPerView: 3.05,

        navigation: {
            nextEl: '[data-projects-swiper-next]',
            prevEl: '[data-projects-swiper-prev]',
        },
        breakpoints: {
            320: {
                slidesPerView: 1.01,
                spaceBetween: 7,
            },
            1025: {
                slidesPerView: 3.05,
                spaceBetween: 1,
            }
        },
    })
}
projectsSlider();


function faqHandler() {
    new Accordion(".accordion-container", {
        triggerClass: 'faq__item-question',
        showMultiple: true,
    });
}

faqHandler();

function locationInfrastructureAnimation() {
    document.querySelectorAll('.location-infrastructure__item').forEach((el) => {
        const elHeight = el.offsetHeight;
        gsap.set(Array.from(el.children), {
            y: elHeight,
            autoAlpha: 0,
        })
        gsap.timeline({
            scrollTrigger: {
                trigger: el,
                once: true,
            }
        })
        .fromTo(Array.from(el.children), {
            autoAlpha: 0,
            y: elHeight,
        }, {
            autoAlpha: 1,
            y: 0,
            duration: 1.25,
            stagger: 0.15,
            ease: "power4.out",
        })
    })
}

locationInfrastructureAnimation();

function managmetnScreenAnimation() {
    document.querySelectorAll('.managment__item').forEach((el) => {
        gsap.set(Array.from(el.children), {
            y: 50,
            autoAlpha: 0,
        })
        gsap.timeline({
            scrollTrigger: {
                trigger: el,
                start: '20% 100%',
                once: true,
            }
        })
        .fromTo(Array.from(el.children), {
            autoAlpha: 0,
            y: 50,
        }, {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            stagger: {
                amount: 0.15,
            },
            ease: "power4.out",
        })
    })
}

managmetnScreenAnimation();

function teamParalax() {
    const trigger = document.querySelector('.team__bg');
    const img = document.querySelector('.team__bg img');
    if (!trigger || !img) return;
    gsap.set(img, {
        scale: 1.2,
    })
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: trigger,
            scrub: true,
            invalidateOnRefresh: true,
        }
    })
    tl.fromTo(img, {
        y: -100,
    }, {
        y: 100,
        ease: 'none',
    });


    document.querySelectorAll('.team__item').forEach((el) => {
        gsap.set(Array.from(el.children), {
            y: 30,
            autoAlpha: 0,
        })
        gsap.timeline({
            scrollTrigger: {
                trigger: el,
                once: true,
            }
        })
        .fromTo(Array.from(el.children), {
            autoAlpha: 0,
        }, {
            autoAlpha: 1,
            y: 0,
            duration: 1.25,
            stagger: 0.15,
            ease: "power4.out",
        })
    })
}

teamParalax();


function homeFrontScreenAnimation() {
    // const splitTitle = SplitText.create('.home-front-screen__title', { type: "lines", linesClass: "line" });
    const splitDescription = SplitText.create('.home-front-screen__description', { type: "lines", linesClass: "line" });
    gsap.set(splitDescription.lines, {
        yPercent: 100,
        autoAlpha: 0,
    });
    gsap.set('.home-front-screen__title, .home-front-screen__content>.button-small, .home-front-screen__card1, .home-front-screen__card2', {
        autoAlpha: 0,
    });

    const tl = gsap.timeline({
        paused: true,
    })
    
    .fromTo(splitDescription.lines, {
        yPercent: 100,
        autoAlpha: 0,
    }, {
        yPercent: 0,
        autoAlpha: 1,
        duration: 1.25,
        ease: "power4.out",
        stagger: {
            amount: 0.15,
        }
    })
    tl.fromTo('.home-front-screen__title', {
        // yPercent: 100,
        autoAlpha: 0,
    }, {
        // yPercent: 0,
        autoAlpha: 1,
        duration: 1.25,
        ease: "power4.out",
    })
    .fromTo('.home-front-screen__content>.button-small, .home-front-screen__card1, .home-front-screen__card2', {
        autoAlpha: 0,
    }, {
        autoAlpha: 1,
        duration: 1.25,
        ease: "power4.out",
        stagger: {
            amount: 0.15,
        }
    }, '<')
    .add(() => {
        // splitTitle.revert();
        splitDescription.revert();
    })



    window.addEventListener('loaderComplete', () => {
        tl.play();
        
     });
}

homeFrontScreenAnimation();


document.querySelectorAll('.down-arrow').forEach((el) => {
    el.addEventListener('click', (evt) => {
        evt.preventDefault();
        document.querySelector('.screen2').scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    });
})



function openFullscreenIframe(url) {
    Swal.fire({
        html: `<iframe src="${url}" style="width:100%;height:100%;border:none;"></iframe>`,
        width: '100vw',
        padding: 0,
        background: 'transparent',
        showConfirmButton: false,
        showCloseButton: true,
        animation: false,
        customClass: {
            popup: 'fullscreen-swal'
        }
});
}

document.body.addEventListener('click', (evt) => {
    const target = evt.target.closest('[data-popup-href]');
    if (target) {
        evt.preventDefault();
        const url = target.getAttribute('data-popup-href');
        openFullscreenIframe(url);
    }
})