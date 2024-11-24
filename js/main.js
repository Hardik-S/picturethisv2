document.addEventListener("DOMContentLoaded", function () {
    const productBox = document.querySelector('.product-box');
    const flyingCards = document.querySelectorAll('.fly-card');

    productBox.addEventListener('mouseover', () => {
        flyingCards.forEach((card, index) => {
            setTimeout(() => {
                // Add staggered animation effect
                card.style.opacity = '1';
                card.style.transform = `translate(0, -20px) scale(${1.1 - index * 0.1})`;
            }, index * 200); // Delay animation based on index
        });
    });

    productBox.addEventListener('mouseleave', () => {
        flyingCards.forEach((card) => {
            card.style.opacity = '0';
            card.style.transform = 'translate(0, 0) scale(1)';
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const cardWrapper = document.getElementById("card-wrapper");

    // Generate a random set of even numbers from 1 to 52
    function getRandomEvenCards(count) {
        const evenNumbers = Array.from({ length: 26 }, (_, i) => (i + 1) * 2); // [2, 4, 6, ..., 52]
        const randomSet = [];
        while (randomSet.length < count && evenNumbers.length > 0) {
            const randomIndex = Math.floor(Math.random() * evenNumbers.length);
            randomSet.push(evenNumbers.splice(randomIndex, 1)[0]);
        }
        return randomSet;
    }

    // Add Swiper slides for the random cards
    function addRandomCardsToSwiper() {
        const randomCards = getRandomEvenCards(6); // Get 6 random cards
        randomCards.forEach((cardNumber) => {
            const slide = document.createElement("div");
            slide.classList.add("swiper-slide");
            const img = document.createElement("img");
            img.src = `images/${cardNumber}.png`; // Assuming card images are named "card2.png", "card4.png", etc.
            img.alt = `Card ${cardNumber}`;
            slide.appendChild(img);
            cardWrapper.appendChild(slide);
        });
    }

    // Initialize Swiper after adding the slides
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

    // Add cards and initialize Swiper
    addRandomCardsToSwiper();
    initializeSwiper();
});
