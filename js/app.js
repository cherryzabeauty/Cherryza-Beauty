// Utility Functions
function formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(amount);
}

// Cart Logic
// Cart is an array of { id, quantity }
function getCart() {
    return JSON.parse(localStorage.getItem('cherryza_cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('cherryza_cart', JSON.stringify(cart));
    updateCartIcon();
}

function addToCart(productId) {
    let cart = getCart();
    const existingItem = cart.find(item => item.id === productId);

    // Check stock
    const products = getProducts();
    const product = products.find(p => p.id === productId);

    if (!product) return;
    if (product.stock <= 0) {
        alert("Sorry, this item is out of stock!");
        return;
    }

    if (existingItem) {
        if (existingItem.quantity < product.stock) {
            existingItem.quantity++;
            alert("Added another to cart!");
        } else {
            alert("Max stock reached!");
        }
    } else {
        cart.push({ id: productId, quantity: 1 });
        alert("Added to cart!");
    }
    saveCart(cart);
}

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
}

function updateCartIcon() {
    const cart = getCart();
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const badge = document.getElementById('cart-count');
    if (badge) badge.innerText = count;
}


// Featured Products Rendering (for Home Page)
document.addEventListener('DOMContentLoaded', () => {
    updateCartIcon();

    const featuredContainer = document.getElementById('featured-products');
    if (featuredContainer) {
        const products = getProducts();
        // Just take the first 3 for featured
        const featured = products.slice(0, 3);

        featuredContainer.innerHTML = featured.map(product => `
            <div class="group relative">
                <div class="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none shadow-sm transition hover:shadow-lg">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-full object-center object-cover lg:w-full lg:h-full">
                    ${product.stock === 0 ? '<div class="absolute top-2 right-2 bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded">OUT OF STOCK</div>' : ''}
                </div>
                <div class="mt-4 flex justify-between">
                    <div>
                        <h3 class="text-sm text-gray-700">
                            <a href="shop.html">
                                <span aria-hidden="true" class="absolute inset-0"></span>
                                ${product.name}
                            </a>
                        </h3>
                        <p class="mt-1 text-sm text-gray-500">${product.category}</p>
                    </div>
                    <p class="text-sm font-medium text-gray-900">${formatCurrency(product.price, product.currency)}</p>
                </div>
            </div>
        `).join('');
    }
});
