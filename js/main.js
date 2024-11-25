
document.documentElement.style.scrollBehavior = 'smooth';
document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.card');

    // Function to generate a random even number between 2 and 104
    function getRandomEvenNumber() {
        return Math.floor((Math.random() * 51) + 1) * 2;
    }

    cards.forEach((card, index) => {
        const img = card.querySelector('img');
        img.src = `/../images/${getRandomEvenNumber()}.png`;
        console.log(img.src);
        // Add click event listener for flipping the cards
        card.addEventListener('click', () => {
            card.querySelector('.card-inner').classList.toggle('is-flipped');
        });
    });
});