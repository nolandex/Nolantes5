// Data for products
const products = [
  {
    id: "tarbes",
    name: "Tarbes",
    brand: "Eglo",
    price: 210,
    category: "lightbulb",
    popular: true,
    image: "assets/images/products/1.jpg",
    alt: "Tarbes Eglo lamp with black metal frame and exposed bulb",
    description:
      "Tarbes lamp by Eglo with black metal frame and exposed bulb, stylish and modern.",
    stars: 4,
    reviews: 120,
  },
  {
    id: "oran",
    name: "Oran",
    brand: "Marset",
    price: 210,
    category: "lightbulb",
    popular: true,
    image: "assets/images/products/2.jpg",
    alt: "Oran Marset lamp with three black metal shades hanging",
    description:
      "Oran lamp by Marset with three black metal shades hanging, elegant design.",
    stars: 4,
    reviews: 98,
  },
  {
    id: "galaxy-prox",
    name: "Galaxy Prox",
    brand: "TK Lighting",
    price: 140,
    category: "lightbulb",
    popular: false,
    image: "assets/images/products/3.jpg",
    alt: "Galaxy Prox TK Lighting lamp with black metal frame and exposed bulb",
    description:
      "Galaxy Prox lamp by TK Lighting with black metal frame and exposed bulb, modern style.",
    stars: 4,
    reviews: 75,
  },
  {
    id: "maximago-light",
    name: "Maximago Light",
    brand: "Vitaluce",
    price: 120,
    category: "lightbulb",
    popular: false,
    image: "assets/images/products/4.jpg",
    alt: "Maximago Light Vitaluce lamp with black metal frame and exposed bulb",
    description:
      "Maximago Light by Vitaluce with black metal frame and exposed bulb, minimalist design.",
    stars: 4,
    reviews: 430,
  },
  {
    id: "galaxy-1642",
    name: "Galaxy 1642",
    brand: "Vitaluce",
    price: 120,
    category: "lightbulb",
    popular: false,
    image: "assets/images/products/5.jpg",
    alt: "Galaxy 1642 Vitaluce pendant lamp with black metal frame and exposed bulb hanging from ceiling",
    description:
      "Galaxy 1642 pendant lamp by Vitaluce with black metal frame and exposed bulb, elegant and modern.",
    stars: 4,
    reviews: 430,
  },
  {
    id: "arte-pamp-cucina",
    name: "Arte Pamp Cucina",
    brand: "Arte Lamp",
    price: 210,
    category: "lamp",
    popular: false,
    image: "assets/images/products/6.jpg",
    alt: "Arte Pamp Cucina Arte Lamp white dome shaped lamp",
    description:
      "Arte Pamp Cucina by Arte Lamp, white dome shaped lamp, perfect for kitchen.",
    stars: 4,
    reviews: 150,
  },
  {
    id: "velay-oml",
    name: "Velay OML",
    brand: "Omnilux",
    price: 70,
    category: "lamp",
    popular: false,
    image: "assets/images/products/7.jpg",
    alt: "Velay OML Omnilux black lamp with round base and black shade",
    description:
      "Velay OML by Omnilux, black lamp with round base and black shade, modern design.",
    stars: 3,
    reviews: 80,
  },
  {
    id: "amy-rose",
    name: "Amy Rose",
    brand: "Globo",
    price: 169,
    category: "lamp",
    popular: false,
    image: "assets/images/products/8.jpg",
    alt: "Amy Rose Globo lamp with gold metal frame and cylindrical shade",
    description:
      "Amy Rose by Globo, gold metal frame and cylindrical shade, elegant and classic.",
    stars: 4,
    reviews: 95,
  },
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

// ... (Semua fungsi JavaScript lainnya dari kode asli tetap sama) ...

// Event listeners for bottom nav cart button
document.querySelector('[aria-label="Cart"]').onclick = openCart;

// Initialize on page load
window.onload = init;
