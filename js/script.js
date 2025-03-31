// Set smooth scrolling behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Load shop cards with random images
document.addEventListener('DOMContentLoaded', function() {
    console.log('Script loaded and running');
    
    // Function to get random image pair
    const getRandomImage = () => {
        // Generate a random even number between 2 and 104
        const randomNumber = Math.floor(Math.random() * 52) * 2 + 1;
        const nextNumber = randomNumber + 1;
        return [
            `images/${randomNumber}.png`, 
            `images/${nextNumber}.png`
        ];
    };

    // Initialize shop cards
    initializeShopCards();
    
    // Setup animation triggers
    setupAnimationTriggers();
    
    // Initialize form validation
    initializeFormValidation();
});

// Initialize shop cards with random images
function initializeShopCards() {
    try {
        // Assign random images to card tiles
        for (let i = 1; i <= 3; i++) {
            const front = document.getElementById(`card-${i}-front`);
            const back = document.getElementById(`card-${i}-back`);
            const card = document.getElementById(`card-${i}`);
            
            if (front && back && card) {
                const [frontImage, backImage] = getRandomImage();
                front.style.backgroundImage = `url(${frontImage})`;
                back.style.backgroundImage = `url(${backImage})`;
            } else {
                console.warn(`Card ${i} elements not found`);
            }
        }
    } catch (error) {
        console.error('Error initializing shop cards:', error);
    }
}

// Setup hover animations for shop section
function setupAnimationTriggers() {
    try {
        const box = document.getElementById('box');
        const addToCartButton = document.getElementById('add-to-cart-button');
        
        if (box) {
            // Add card animation triggers
            for (let i = 1; i <= 3; i++) {
                const card = document.getElementById(`card-${i}`);
                if (card) {
                    // Add fade-in effect when the box is hovered
                    box.addEventListener('mouseenter', () => {
                        card.classList.remove('fade-out');
                        card.classList.add('fade-in');
                    });
                    
                    // Add fade-out effect when the mouse leaves the box
                    box.addEventListener('mouseleave', () => {
                        card.classList.remove('fade-in');
                        card.classList.add('fade-out');
                    });
                }
            }
            
            // Add to cart button animations
            if (addToCartButton) {
                box.addEventListener('mouseenter', () => {
                    addToCartButton.classList.remove('fade-out');
                    addToCartButton.classList.add('fade-in');
                });
                
                box.addEventListener('mouseleave', () => {
                    addToCartButton.classList.remove('fade-in');
                    addToCartButton.classList.add('fade-out');
                });
                
                // Add to cart functionality
                addToCartButton.addEventListener('click', function() {
                    alert('Item added to cart!');
                    // TODO: Implement proper cart functionality
                });
            }
        } else {
            console.warn('Product box element not found');
        }
    } catch (error) {
        console.error('Error setting up animation triggers:', error);
    }
}

// Initialize form validation
function initializeFormValidation() {
    try {
        const contactForm = document.querySelector('.contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(event) {
                event.preventDefault();
                
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const message = document.getElementById('message').value;
                
                // Simple validation
                if (name && email && message) {
                    alert('Thank you for your message! We will get back to you soon.');
                    contactForm.reset();
                } else {
                    alert('Please fill out all fields.');
                }
                
                // TODO: Implement server-side form submission
            });
        }
    } catch (error) {
        console.error('Error initializing form validation:', error);
    }
}

// Helper function to get random image pair
function getRandomImage() {
    // Generate a random even number between 2 and 104
    const randomNumber = Math.floor(Math.random() * 52) * 2 + 1;
    const nextNumber = randomNumber + 1;
    return [
        `images/${randomNumber}.png`, 
        `images/${nextNumber}.png`
    ];
}