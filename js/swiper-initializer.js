
document.addEventListener("DOMContentLoaded", function () {
    function initializeSwiper() {
        new Swiper(".swiper-container", {
            slidesPerView: 1, // Individual cards handled manually
            loop: true,
            autoplay: {
                delay: 3000, // Auto-cycle every 3 seconds
                disableOnInteraction: false,
            },
            fadeEffect: {
                crossFade: true,
            },
            effect: 'fade', // Smooth fade-in/out effect
        });
    }

    // Initialize Swiper
    initializeSwiper();
});
