// Set smooth scrolling behavior
document.documentElement.style.scrollBehavior = 'smooth';

const CART_STORAGE_KEY = 'pictureThisCart';
const PICTURE_THIS_PRODUCT = {
    id: 'picture-this-card-game',
    name: 'Picture This! Card Game',
    price: 24.99
};

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

    // Render saved cart state when the cart page is open
    renderCart();
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
                    addProductToCart(PICTURE_THIS_PRODUCT);
                    alert('Item added to cart!');
                });
            }
        } else {
            console.warn('Product box element not found');
        }
    } catch (error) {
        console.error('Error setting up animation triggers:', error);
    }
}

function getCartItems() {
    try {
        return JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
    } catch (error) {
        console.error('Error reading cart storage:', error);
        return [];
    }
}

function saveCartItems(items) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

function addProductToCart(product) {
    const items = getCartItems();
    const existingItem = items.find((item) => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        items.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    saveCartItems(items);
}

function renderCart() {
    const cartSection = document.getElementById('cart');

    if (!cartSection) {
        return;
    }

    const items = getCartItems();

    if (items.length === 0) {
        cartSection.innerHTML = `
            <h2>Your Cart</h2>
            <p>Your cart is currently empty. Start shopping <a href="../index.html#shop">here</a>.</p>
        `;
        return;
    }

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const itemMarkup = items.map((item) => `
        <li>
            <span>${item.name}</span>
            <span>Qty ${item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)} CAD</span>
        </li>
    `).join('');

    cartSection.innerHTML = `
        <h2>Your Cart</h2>
        <ul class="cart-items">${itemMarkup}</ul>
        <p class="cart-total">Total: ${total.toFixed(2)} CAD</p>
        <a href="../index.html#shop">Continue shopping</a>
    `;
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
