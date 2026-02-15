// Utility Functions
function formatCurrency(amount, currency = 'LKR') {
    return new Intl.NumberFormat('en-LK', { style: 'currency', currency: currency }).format(amount);
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
    setupAutocomplete();

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

// Autocomplete Logic
function setupAutocomplete() {
    const searchInputs = document.querySelectorAll('input[name="search"]');
    // Ensure data.js is loaded and getProducts is available
    if (typeof getProducts !== 'function') return;
    const products = getProducts();

    searchInputs.forEach(input => {
        // Ensure parent is relative for positioning
        const form = input.closest('form');
        if (!form) return;

        // Check if we need to force relative positioning
        const computedStyle = window.getComputedStyle(form);
        if (computedStyle.position === 'static') {
            form.style.position = 'relative';
        }

        // Create dropdown element
        const dropdown = document.createElement('ul');
        dropdown.className = 'absolute z-50 bg-white border border-gray-200 rounded-lg shadow-xl w-full left-0 mt-2 hidden max-h-60 overflow-y-auto divide-y divide-gray-100';
        dropdown.style.top = '100%';

        form.appendChild(dropdown);

        input.addEventListener('input', (e) => {
            const val = e.target.value.toLowerCase().trim();
            dropdown.innerHTML = '';

            if (val.length < 1) {
                dropdown.classList.add('hidden');
                return;
            }

            const matches = products.filter(p => p.name.toLowerCase().includes(val)).slice(0, 5); // Limit 5

            if (matches.length > 0) {
                dropdown.classList.remove('hidden');
                matches.forEach(p => {
                    const li = document.createElement('li');
                    li.className = 'px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center space-x-3 transition-colors';
                    li.innerHTML = `
                        <img src="${p.image}" class="w-10 h-10 rounded object-cover border border-gray-200" alt="">
                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-medium text-gray-900 truncate">${p.name}</p>
                            <p class="text-xs text-gray-500">${formatCurrency(p.price)}</p>
                        </div>
                    `;
                    li.addEventListener('click', () => {
                        input.value = p.name;
                        dropdown.classList.add('hidden');
                        form.submit(); // Auto-submit on selection
                    });
                    dropdown.appendChild(li);
                });
            } else {
                dropdown.classList.add('hidden');
            }
        });

        // Hide on click outside
        document.addEventListener('click', (e) => {
            if (!form.contains(e.target)) {
                dropdown.classList.add('hidden');
            }
        });
    });
}
