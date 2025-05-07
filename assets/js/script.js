// Data for products
const products = [
  {
    id: "tarbes",
    name: "Tarbes",
    brand: "Eglo",
    price: 210,
    category: "lightbulb",
    popular: true,
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
    description:
      "Amy Rose by Globo, gold metal frame and cylindrical shade, elegant and classic.",
    stars: 4,
    reviews: 95,
  },
];

// State management
let cart = JSON.parse(localStorage.getItem("cart")) || {};
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let user = JSON.parse(localStorage.getItem("user")) || { username: "Guest", isAdmin: false };
let currentDetailProduct = null;
let currentDetailQuantity = 1;
let currentCategory = "all";

// Initialize the app
function init() {
  // Update user status in sidebar
  document.getElementById("user-status").textContent = user.username;

  // Render product list if on index page
  if (document.getElementById("product-list")) {
    renderProductList();
    updateCartCount();
    showPanel("product-list");
  }

  // Update cart count in footer
  updateFooterCartCount();
}

// Save state to localStorage
function saveState() {
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("favorites", JSON.stringify(favorites));
  localStorage.setItem("user", JSON.stringify(user));
}

// Render product list (popular and all)
function renderProductList() {
  const popularContainer = document.getElementById("popular-products");
  const allContainer = document.getElementById("all-products");
  popularContainer.innerHTML = "";
  allContainer.innerHTML = "";

  // Filter products by category
  const filteredProducts =
    currentCategory === "all"
      ? products
      : products.filter((p) => p.category === currentCategory);

  // Popular products
  const popularProducts = filteredProducts.filter((p) => p.popular);
  popularProducts.forEach((product) => {
    const article = createProductCard(product, false);
    popularContainer.appendChild(article);
  });

  // All products
  filteredProducts.forEach((product) => {
    const article = createProductCard(product, true);
    allContainer.appendChild(article);
  });
}

// Create product card element
function createProductCard(product, isGrid) {
  const article = document.createElement("article");
  article.className = isGrid
    ? "bg-white rounded-xl p-3 relative flex flex-col items-start cursor-pointer hover:shadow-lg transition-shadow"
    : "bg-white rounded-xl flex items-center gap-3 p-3 min-w-[140px] shrink-0 cursor-pointer hover:shadow-lg transition-shadow";

  article.onclick = (e) => {
    if (
      e.target.tagName === "BUTTON" ||
      e.target.closest("button") ||
      e.target.tagName === "I"
    )
      return;
    openProductDetail(product.id);
  };

  if (isGrid) {
    const favBtn = document.createElement("button");
    favBtn.setAttribute("aria-label", `Favorite ${product.name}`);
    favBtn.className = "absolute top-3 right-3 text-black text-lg";
    favBtn.innerHTML = favorites.includes(product.id)
      ? '<i class="fas fa-heart text-red-500"></i>'
      : '<i class="far fa-heart"></i>';
    favBtn.onclick = (e) => {
      e.stopPropagation();
      toggleFavoriteCard(product.id, favBtn);
    };
    article.appendChild(favBtn);
  }

  const placeholder = document.createElement("div");
  placeholder.className = isGrid
    ? "w-full h-28 bg-gray-200 flex items-center justify-center text-gray-500 text-xs"
    : "w-14 h-14 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs";
  placeholder.textContent = "No Image";
  article.appendChild(placeholder);

  const info = document.createElement("div");
  info.className = isGrid ? "flex flex-col text-xs mt-2" : "flex flex-col text-xs";

  const name = document.createElement(isGrid ? "h3" : "span");
  name.className = "font-semibold truncate max-w-[70px]";
  name.textContent = product.name;
  info.appendChild(name);

  const brand = document.createElement("p");
  brand.className = "text-gray-400 truncate max-w-[70px] text-[9px]";
  brand.textContent = product.brand;
  info.appendChild(brand);

  const price = document.createElement("span");
  price.className = "font-semibold mt-1";
  price.textContent = `$${product.price}`;
  info.appendChild(price);

  article.appendChild(info);

  if (isGrid) {
    const btnContainer = document.createElement("div");
    btnContainer.className = "flex justify-between w-full items-center mt-2";

    const priceSpan = document.createElement("span");
    priceSpan.className = "font-semibold text-xs";
    priceSpan.textContent = `$${product.price}`;

    const addBtn = document.createElement("button");
    addBtn.setAttribute("aria-label", `Add ${product.name} to cart`);
    addBtn.className =
      "bg-black text-white rounded-full w-7 h-7 flex items-center justify-center text-xs";
    addBtn.innerHTML = '<i class="fas fa-lock"></i>';
    addBtn.onclick = (e) => {
      e.stopPropagation();
      openProductDetail(product.id);
    };

    btnContainer.appendChild(priceSpan);
    btnContainer.appendChild(addBtn);

    article.appendChild(btnContainer);
  }

  return article;
}

// Filter products by search and category
function filterProducts() {
  const searchTerm = document
    .getElementById("search")
    .value.toLowerCase()
    .trim();
  currentCategory = "all";

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm) ||
      p.brand.toLowerCase().includes(searchTerm)
  );

  const popularContainer = document.getElementById("popular-products");
  const allContainer = document.getElementById("all-products");
  popularContainer.innerHTML = "";
  allContainer.innerHTML = "";

  const popularProducts = filtered.filter((p) => p.popular);
  popularProducts.forEach((product) => {
    const article = createProductCard(product, false);
    popularContainer.appendChild(article);
  });

  filtered.forEach((product) => {
    const article = createProductCard(product, true);
    allContainer.appendChild(article);
  });

  document.querySelectorAll(".category-btn").forEach((btn) => {
    btn.classList.remove("bg-[#f97316]", "text-white");
    btn.classList.add("bg-white", "text-gray-600");
  });
}

// Category selection
function selectCategory(event) {
  const btns = document.querySelectorAll(".category-btn");
  btns.forEach((btn) => {
    btn.classList.remove("bg-[#f97316]", "text-white");
    btn.classList.add("bg-white", "text-gray-600");
  });
  const btn = event.currentTarget;
  btn.classList.add("bg-[#f97316]", "text-white");
  btn.classList.remove("bg-white", "text-gray-600");

  currentCategory = btn.dataset.category;
  document.getElementById("search").value = "";
  renderProductList();
}

// Show panel by id, hide others
function showPanel(panelId) {
  ["product-list", "product-detail", "cart"].forEach((id) => {
    document.getElementById(id).classList.toggle("hidden", id !== panelId);
  });
}

// Open product detail by id
function openProductDetail(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  currentDetailProduct = product;
  currentDetailQuantity = 1;

  document.getElementById("detail-title").textContent = product.name;
  document.getElementById("detail-name").textContent = product.name;
  document.getElementById("detail-brand").textContent = product.brand;
  document.getElementById("detail-price").textContent = `$${product.price}`;
  document.getElementById("detail-quantity").textContent = currentDetailQuantity;
  document.getElementById("detail-description").innerHTML = `<p class="font-semibold mb-1">Description:</p><p>${product.description}</p>`;
  document.getElementById("detail-reviews").textContent = `${product.reviews} reviews`;

  const starsContainer = document.getElementById("detail-stars");
  starsContainer.innerHTML = "";
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("i");
    star.className = i <= product.stars ? "fas fa-star" : "far fa-star";
    starsContainer.appendChild(star);
  }

  const favBtn = document.getElementById("detail-fav-btn");
  favBtn.innerHTML = favorites.includes(product.id)
    ? '<i class="fas fa-heart text-red-500"></i>'
    : '<i class="far fa-heart"></i>';

  showPanel("product-detail");
}

// Toggle favorite for product cards
function toggleFavoriteCard(productId, button) {
  if (favorites.includes(productId)) {
    favorites = favorites.filter((id) => id !== productId);
    button.innerHTML = '<i class="far fa-heart"></i>';
  } else {
    favorites.push(productId);
    button.innerHTML = '<i class="fas fa-heart text-red-500"></i>';
  }
  saveState();
}

// Toggle favorite in detail view
function toggleFavorite() {
  if (!currentDetailProduct) return;
  const productId = currentDetailProduct.id;
  const favBtn = document.getElementById("detail-fav-btn");
  if (favorites.includes(productId)) {
    favorites = favorites.filter((id) => id !== productId);
    favBtn.innerHTML = '<i class="far fa-heart"></i>';
  } else {
    favorites.push(productId);
    favBtn.innerHTML = '<i class="fas fa-heart text-red-500"></i>';
  }
  saveState();
  // Re-render product list to update favorite icons
  renderProductList();
}

// Change quantity in detail view
function changeDetailQuantity(delta) {
  let newQty = currentDetailQuantity + delta;
  if (newQty < 1) newQty = 1;
  currentDetailQuantity = newQty;
  document.getElementById("detail-quantity").textContent = currentDetailQuantity;
}

// Add product from detail to cart
function addToCartFromDetail() {
  if (!currentDetailProduct) return;
  const id = currentDetailProduct.id;
  if (cart[id]) {
    cart[id] += currentDetailQuantity;
  } else {
    cart[id] = currentDetailQuantity;
  }
  alert(
    `${currentDetailQuantity} x ${currentDetailProduct.name} added to cart.`
  );
  updateCartCount();
  updateFooterCartCount();
  saveState();
  showPanel("product-list");
}

// Update cart count badge
function updateCartCount() {
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const badge = document.getElementById("cart-count");
  badge.textContent = count;
  badge.style.display = count > 0 ? "flex" : "none";
}

// Update footer cart count
function updateFooterCartCount() {
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const badge = document.getElementById("footer-cart-count");
  badge.textContent = count;
  badge.style.display = count > 0 ? "flex" : "none";
}

// Render cart items
function renderCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  cartItemsContainer.innerHTML = "";

  const cartProductCount = Object.values(cart).reduce((a, b) => a + b, 0);
  document.getElementById("cart-product-count").textContent = `${cartProductCount} product${cartProductCount !== 1 ? "s" : ""}`;

  if (cartProductCount === 0) {
    cartItemsContainer.innerHTML =
      '<li class="text-center text-gray-500 text-sm">Your cart is empty.</li>';
    updateCartTotals();
    return;
  }

  for (const [productId, quantity] of Object.entries(cart)) {
    const product = products.find((p) => p.id === productId);
    if (!product) continue;

    const li = document.createElement("li");
    li.className =
      "bg-white rounded-xl p-3 flex items-center justify-between gap-3";

    const placeholder = document.createElement("div");
    placeholder.className = "w-14 h-14 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs";
    placeholder.textContent = "No Image";
    li.appendChild(placeholder);

    const info = document.createElement("div");
    info.className = "flex flex-col text-xs flex-grow min-w-0";

    const name = document.createElement("span");
    name.className = "font-semibold truncate";
    name.textContent = product.name;
    info.appendChild(name);

    const brand = document.createElement("span");
    brand.className = "text-gray-400 truncate";
    brand.textContent = product.brand;
    info.appendChild(brand);

    const qtyControls = document.createElement("div");
    qtyControls.className =
      "flex items-center gap-2 mt-1 text-gray-600 select-none";

    const decBtn = document.createElement("button");
    decBtn.setAttribute("aria-label", `Decrease quantity ${product.name}`);
    decBtn.className = "text-xs";
    decBtn.textContent = "−";
    decBtn.onclick = () => {
      if (cart[productId] > 1) {
        cart[productId]--;
      } else {
        delete cart[productId];
      }
      renderCart();
      updateCartCount();
      updateFooterCartCount();
      saveState();
    };

    const qtySpan = document.createElement("span");
    qtySpan.className = "text-xs";
    qtySpan.textContent = quantity;

    const incBtn = document.createElement("button");
    incBtn.setAttribute("aria-label", `Increase quantity ${product.name}`);
    incBtn.className = "text-xs";
    incBtn.textContent = "+";
    incBtn.onclick = () => {
      cart[productId]++;
      renderCart();
      updateCartCount();
      updateFooterCartCount();
      saveState();
    };

    qtyControls.appendChild(decBtn);
    qtyControls.appendChild(qtySpan);
    qtyControls.appendChild(incBtn);

    info.appendChild(qtyControls);

    li.appendChild(info);

    const priceSpan = document.createElement("span");
    priceSpan.className = "font-semibold text-sm whitespace-nowrap";
    priceSpan.textContent = `$${product.price}`;
    li.appendChild(priceSpan);

    const removeBtn = document.createElement("button");
    removeBtn.setAttribute("aria-label", `Remove ${product.name}`);
    removeBtn.className = "text-gray-400 text-xs";
    removeBtn.textContent = "×";
    removeBtn.onclick = () => {
      delete cart[productId];
      renderCart();
      updateCartCount();
      updateFooterCartCount();
      saveState();
    };
    li.appendChild(removeBtn);

    cartItemsContainer.appendChild(li);
  }

  updateCartTotals();
}

// Render cart modal items
function renderCartModal() {
  const cartItemsContainer = document.getElementById("cart-modal-items");
  cartItemsContainer.innerHTML = "";

  const cartProductCount = Object.values(cart).reduce((a, b) => a + b, 0);
  document.getElementById("cart-modal-product-count").textContent = `${cartProductCount} product${cartProductCount !== 1 ? "s" : ""}`;

  if (cartProductCount === 0) {
    cartItemsContainer.innerHTML =
      '<li class="text-center text-gray-500 text-sm">Your cart is empty.</li>';
    updateCartModalTotals();
    return;
  }

  for (const [productId, quantity] of Object.entries(cart)) {
    const product = products.find((p) => p.id === productId);
    if (!product) continue;

    const li = document.createElement("li");
    li.className =
      "bg-white rounded-xl p-3 flex items-center justify-between gap-3";

    const placeholder = document.createElement("div");
    placeholder.className = "w-14 h-14 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs";
    placeholder.textContent = "No Image";
    li.appendChild(placeholder);

    const info = document.createElement("div");
    info.className = "flex flex-col text-xs flex-grow min-w-0";

    const name = document.createElement("span");
    name.className = "font-semibold truncate";
    name.textContent = product.name;
    info.appendChild(name);

    const brand = document.createElement("span");
    brand.className = "text-gray-400 truncate";
    brand.textContent = product.brand;
    info.appendChild(brand);

    const qtySpan = document.createElement("span");
    qtySpan.className = "text-xs mt-1";
    qtySpan.textContent = `Qty: ${quantity}`;
    info.appendChild(qtySpan);

    li.appendChild(info);

    const priceSpan = document.createElement("span");
    priceSpan.className = "font-semibold text-sm whitespace-nowrap";
    priceSpan.textContent = `$${product.price}`;
    li.appendChild(priceSpan);

    cartItemsContainer.appendChild(li);
  }

  updateCartModalTotals();
}

// Update cart totals
function updateCartTotals() {
  const subtotalEl = document.getElementById("cart-subtotal");
  const deliveryEl = document.getElementById("cart-delivery");
  const totalEl = document.getElementById("cart-total");

  const deliveryFee = 14;
  let subtotal = 0;
  for (const [productId, quantity] of Object.entries(cart)) {
    const product = products.find((p) => p.id === productId);
    if (!product) continue;
    subtotal += product.price * quantity;
  }

  subtotalEl.textContent = `$${subtotal}`;
  deliveryEl.textContent = `$${subtotal > 0 ? deliveryFee : 0}`;
  totalEl.textContent = `$${subtotal > 0 ? subtotal + deliveryFee : 0}`;
}

// Update cart modal totals
function updateCartModalTotals() {
  const subtotalEl = document.getElementById("cart-modal-subtotal");
  const deliveryEl = document.getElementById("cart-modal-delivery");
  const totalEl = document.getElementById("cart-modal-total");

  const deliveryFee = 14;
  let subtotal = 0;
  for (const [productId, quantity] of Object.entries(cart)) {
    const product = products.find((p) => p.id === productId);
    if (!product) continue;
    subtotal += product.price * quantity;
  }

  subtotalEl.textContent = `$${subtotal}`;
  deliveryEl.textContent = `$${subtotal > 0 ? deliveryFee : 0}`;
  totalEl.textContent = `$${subtotal > 0 ? subtotal + deliveryFee : 0}`;
}

// Show cart panel and render
function openCart() {
  renderCart();
  showPanel("cart");
}

// Open cart modal
function openCartModal() {
  renderCartModal();
  document.getElementById("cart-modal").classList.remove("hidden");
}

// Go to cart panel from modal
function goToCart() {
  closeModal("cart-modal");
  if (window.location.pathname.includes("index.html") || window.location.pathname.endsWith("/")) {
    openCart();
  } else {
    window.location.href = "../index.html#cart";
  }
}

// Open checkout modal
function openCheckoutModal() {
  if (Object.keys(cart).length === 0) {
    alert("Your cart is empty.");
    return;
  }
  document.getElementById("checkout-modal").classList.remove("hidden");
}

// Complete checkout
function completeCheckout(event) {
  event.preventDefault();
  const name = document.getElementById("checkout-name").value.trim();
  const address = document.getElementById("checkout-address").value.trim();
  if (!name || !address) {
    alert("Please fill in all fields.");
    return;
  }
  alert(`Order placed successfully!\nName: ${name}\nAddress: ${address}`);
  cart = {};
  updateCartCount();
  updateFooterCartCount();
  renderCart();
  saveState();
  closeModal("checkout-modal");
  showPanel("product-list");
}

// Apply promo code
function applyPromoCode(e) {
  e.preventDefault();
  const code = document.getElementById("promo-code").value.trim();
  if (!code) {
    alert("Please enter a promo code.");
    return;
  }
  if (code.toUpperCase() === "DISCOUNT10") {
    alert("Promo code applied! You get a 10% discount on your next purchase.");
  } else {
    alert("Invalid promo code.");
  }
  document.getElementById("promo-code").value = "";
}

// Close modal
function closeModal(modalId) {
  document.getElementById(modalId).classList.add("hidden");
}

// Open testimonial modal
function openTestimonialModal() {
  document.getElementById("testimonial-modal").classList.remove("hidden");
}

// Open admin modal
function openAdminModal() {
  document.getElementById("admin-modal").classList.remove("hidden");
}

// Admin login
function adminLogin(event) {
  event.preventDefault();
  const username = document.getElementById("admin-username").value.trim();
  const password = document.getElementById("admin-password").value.trim();
  if (username === "admin" && password === "admin123") {
    user = { username: "Admin", isAdmin: true };
    saveState();
    document.getElementById("user-status").textContent = user.username;
    alert("Admin login successful!");
    closeModal("admin-modal");
  } else {
    alert("Invalid username or password.");
  }
}

// Logout
function logout(event) {
  event.preventDefault();
  user = { username: "Guest", isAdmin: false };
  saveState();
  document.getElementById("user-status").textContent = user.username;
  alert("Logged out successfully.");
  toggleSidebar();
}

// Sidebar toggle
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  sidebar.classList.toggle("-translate-x-full");
  overlay.classList.toggle("hidden");
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  init();
  if (window.location.hash === "#cart") {
    openCart();
  }
});
