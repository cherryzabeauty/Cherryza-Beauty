// Initial Product Data
const initialProducts = [];

// Storage Key
const DB_KEY = 'cherryza_products_v2'; // Version changed to reset data

// Initialize Products in LocalStorage if not exists
if (!localStorage.getItem(DB_KEY)) {
    localStorage.setItem(DB_KEY, JSON.stringify(initialProducts));
}

// Global accessor for products (will prefer localStorage)
function getProducts() {
    return JSON.parse(localStorage.getItem(DB_KEY)) || [];
}

function saveProducts(products) {
    localStorage.setItem(DB_KEY, JSON.stringify(products));
}
