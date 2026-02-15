// Initial Product Data
const initialProducts = [
    {
        id: 1,
        name: "Cherry Glo Lip Tint",
        price: 15.00,
        currency: "USD",
        image: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "A subtle, hydrating tint for everyday wear. Enriched with Vitamin E.",
        category: "Lips",
        stock: 50
    },
    {
        id: 2,
        name: "Rose Gold Highlighting Serum",
        price: 28.00,
        currency: "USD",
        image: "https://images.unsplash.com/photo-1599305090598-fe179d501227?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "Get that golden hour glow instantly. Lightweight and non-greasy formula.",
        category: "Face",
        stock: 0 // Out of stock example
    },
    {
        id: 3,
        name: "Velvet Matte Foundation",
        price: 35.00,
        currency: "USD",
        image: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "Full coverage foundation with a breathable, velvet finish. Available in 20 shades.",
        category: "Face",
        stock: 20
    },
    {
        id: 4,
        name: "Midnight Volumizing Mascara",
        price: 18.00,
        currency: "USD",
        image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "Intense black volume without the clumps. Water-resistant.",
        category: "Eyes",
        stock: 35
    },
    {
        id: 5,
        name: "Berry Bliss Eye Shadow Palette",
        price: 42.00,
        currency: "USD",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdd403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "12 highly pigmented shades ranging from soft pinks to deep berries.",
        category: "Eyes",
        stock: 15
    },
    {
        id: 6,
        name: "Hydra-Boost Daily Moisturizer",
        price: 24.00,
        currency: "USD",
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "Deep hydration with Hyaluronic Acid and Aloe Vera.",
        category: "Skincare",
        stock: 25
    }
];

// Initialize Products in LocalStorage if not exists
if (!localStorage.getItem('cherryza_products')) {
    localStorage.setItem('cherryza_products', JSON.stringify(initialProducts));
}

// Global accessor for products (will prefer localStorage)
function getProducts() {
    return JSON.parse(localStorage.getItem('cherryza_products')) || [];
}

function saveProducts(products) {
    localStorage.setItem('cherryza_products', JSON.stringify(products));
}
