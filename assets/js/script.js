// Data for products
const products = [
  {
    id: "tarbes",
    name: "Tarbes",
    brand: "Eglo",
    price: 210,
    category: "lightbulb",
    popular: true,
    image:
      "https://storage.googleapis.com/a1aa/image/01f2914c-971c-49aa-ca22-e60f58a9f105.jpg",
    alt: "Tarbes Eglo lamp with black metal frame and exposed bulb",
    description:
      "Tarbes lamp by Eglo with black metal frame and exposed bulb, stylish and modern.",
    stars: 4,
    reviews: 120,
  },
  // ... (Semua data produk lainnya dari kode asli) ...
];

// Cart data structure: { productId: quantity }
let cart = {};

// Current selected product for detail view
let currentDetailProduct = null;
let currentDetailQuantity = 1;

// Current selected category filter
let currentCategory = "all";

// Initialize the app
function init() {
  renderProductList();
  updateCartCount();
  showPanel("product-list");
}

// ... (Semua fungsi JavaScript lainnya dari kode asli) ...

// Event listeners for bottom nav cart button
document.querySelector('[aria-label="Cart"]').onclick = openCart;

// Initialize on page load
window.onload = init;
