
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
