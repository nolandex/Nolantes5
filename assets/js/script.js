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

  // Clicking on card opens detail
  article.onclick = (e) => {
    // Prevent click on buttons inside card from triggering detail open
    if (
      e.target.tagName === "BUTTON" ||
      e.target.closest("button") ||
      e.target.tagName === "I"
    )
      return;
    openProductDetail(product.id);
  };

  // Favorite button top right for grid cards
  if (isGrid) {
    const favBtn = document.createElement("button");
    favBtn.setAttribute("aria-label", `Favorite ${product.name}`);
    favBtn.className = "absolute top-3 right-3 text-black text-lg";
    favBtn.innerHTML = '<i class="fas fa-heart"></i>';
    favBtn.onclick = (e) => {
      e.stopPropagation();
      alert("Favorite feature not implemented.");
    };
    article.appendChild(favBtn);
  }

  // Placeholder instead of image
  const placeholder = document.createElement("div");
  placeholder.className = isGrid
    ? "w-full h-28 bg-gray-200 flex items-center justify-center text-gray-500 text-xs"
    : "w-14 h-14 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs";
  placeholder.textContent = "No Image";
  article.appendChild(placeholder);

  // Info container
  const info = document.createElement("div");
  info.className = isGrid
    ? "flex flex-col text-xs mt-2"
    : "flex flex-col text-xs";

  // Name
  const name = document.createElement(isGrid ? "h3" : "span");
  name.className = "font-semibold truncate max-w-[70px]";
  name.textContent = product.name;
  info.appendChild(name);

  // Brand
  const brand = document.createElement("p");
  brand.className = "text-gray-400 truncate max-w-[70px] text-[9px]";
  brand.textContent = product.brand;
  info.appendChild(brand);

  // Price
  const price = document.createElement("span");
  price.className = "font-semibold mt-1";
  price.textContent = `$${product.price}`;
  info.appendChild(price);

  article.appendChild(info);

  // Add to cart button for grid cards
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
  currentCategory = "all"; // Reset category filter on search

  // Filter products by search term
  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm) ||
      p.brand.toLowerCase().includes(searchTerm)
  );

  // Render filtered products in popular and all sections
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

  // Reset category buttons highlight
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

  // Fill detail panel
  document.getElementById("detail-title").textContent = product.name;
  document.getElementById("detail-name").textContent = product.name;
  document.getElementById("detail-brand").textContent = product.brand;
  document.getElementById("detail-price").textContent = `$${product.price}`;
  document.getElementById("detail-quantity").textContent = currentDetailQuantity;
  document.getElementById("detail-description").innerHTML = `<p class="font-semibold mb-1">Description:</p><p>${product.description}</p>`;
  document.getElementById("detail-reviews").textContent = `${product.reviews} reviews`;

  // Render stars
  const starsContainer = document.getElementById("detail-stars");
  starsContainer.innerHTML = "";
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("i");
    star.className = i <= product.stars ? "fas fa-star" : "far fa-star";
    starsContainer.appendChild(star);
  }

  // Favorite icon toggle (not implemented, so always outline)
  const favBtn = document.getElementById("detail-fav-btn");
  favBtn.innerHTML = '<i class="far fa-heart"></i>';
  favBtn.onclick = () => alert("Favorite feature not implemented.");

  showPanel("product-detail");
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
  showPanel("product-list");
}

// Update cart count badge
function updateCartCount() {
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const badge = document.getElementById("cart-count");
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

    // Placeholder instead of image
    const placeholder = document.createElement("div");
    placeholder.className = "w-14 h-14 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs";
    placeholder.textContent = "No Image";
    li.appendChild(placeholder);

    // Info container
    const info = document.createElement("div");
    info.className = "flex flex-col text-xs flex-grow min-w-0";

    // Name
    const name = document.createElement("span");
    name.className = "font-semibold truncate";
    name.textContent = product.name;
    info.appendChild(name);

    // Brand
    const brand = document.createElement("span");
    brand.className = "text-gray-400 truncate";
    brand.textContent = product.brand;
    info.appendChild(brand);

    // Quantity controls
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
    };

    qtyControls.appendChild(decBtn);
    qtyControls.appendChild(qtySpan);
    qtyControls.appendChild(incBtn);

    info.appendChild(qtyControls);

    li.appendChild(info);

    // Price
    const priceSpan = document.createElement("span");
    priceSpan.className = "font-semibold text-sm whitespace-nowrap";
    priceSpan.textContent = `$${product.price}`;
    li.appendChild(priceSpan);

    // Remove button
    const removeBtn = document.createElement("button");
    removeBtn.setAttribute("aria-label", `Remove ${product.name}`);
    removeBtn.className = "text-gray-400 text-xs";
    removeBtn.textContent = "×";
    removeBtn.onclick = () => {
      delete cart[productId];
      renderCart();
      updateCartCount();
    };
    li.appendChild(removeBtn);

    cartItemsContainer.appendChild(li);
  }

  updateCartTotals();
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

// Show cart panel and render
function openCart() {
  renderCart();
  showPanel("cart");
}

// Apply promo code (dummy)
function applyPromoCode(e) {
  e.preventDefault();
  const code = document.getElementById("promo-code").value.trim();
  if (!code) {
    alert("Please enter a promo code.");
    return;
  }
  alert(`Promo code "${code}" applied! (Not really, this is a demo)`);
  document.getElementById("promo-code").value = "";
}

// Checkout (dummy)
function checkout() {
  if (Object.keys(cart).length === 0) {
    alert("Your cart is empty.");
    return;
  }
  alert("Checkout successful! (Demo only)");
  cart = {};
  updateCartCount();
  renderCart();
  showPanel("product-list");
}

// Event listeners for bottom nav cart button
document.querySelector('[aria-label="Cart"]').onclick = openCart;

// Initialize on page load
window.onload = init;
