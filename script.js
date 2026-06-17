document.addEventListener('DOMContentLoaded', () => {

    // 1. Initial Loader (Typing effect)
    const loaderText = document.querySelector('.js-typing');
    const fullText = loaderText.textContent;
    loaderText.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < fullText.length) {
            loaderText.textContent += fullText.charAt(i);
            i++;
            setTimeout(typeWriter, 60);
        } else {
            setTimeout(() => {
                document.body.classList.add('is-loaded');
            }, 500);
        }
    }
    typeWriter();

    // 2. Smooth Fade In (Intersection Observer)
    const fadeItems = document.querySelectorAll('.js-fadein');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -10% 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('is-show');
                }, delay * 1000);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeItems.forEach(item => observer.observe(item));

    // 3. Lightweight Parallax (RequestAnimationFrame)
    const heroImg = document.querySelector('.hero__img-wrapper');
    let lastScrollY = 0;
    let ticking = false;

    function updateParallax() {
        heroImg.style.transform = `translateY(${window.scrollY * 0.15}px)`;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });

});