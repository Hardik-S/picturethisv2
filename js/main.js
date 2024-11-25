
document.documentElement.style.scrollBehavior = 'smooth';
const cart = [];
document.querySelector('#addToCartButton').addEventListener('click', () => {
    // Create alert element
    const alert = document.createElement('div');
    alert.textContent = 'Added to Cart!';
    alert.style.position = 'fixed';
    alert.style.top = '20px';
    alert.style.right = '20px';
    alert.style.padding = '10px 20px';
    alert.style.backgroundColor = '#5cb85c';
    alert.style.color = '#fff';
    alert.style.borderRadius = '5px';
    alert.style.boxShadow = '0 0 10px rgba(0,0,0,0.1)';
    alert.style.zIndex = '1000';
    document.body.appendChild(alert);

    // Remove the alert after 3 seconds
    setTimeout(() => {
        alert.remove();
    }, 3000);
    cart.push('item name');
    console.log(cart);
    showCart();
});
