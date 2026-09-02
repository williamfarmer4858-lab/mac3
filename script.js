/* ============================================================
   McDelivery UAE (Demo) — script.js
   Pure vanilla JS, no frameworks, no build tools.
   ============================================================ */

const CART_STORAGE_KEY = "mcdelivery_uae_cart";
const UI_STORAGE_KEY = "mcdelivery_uae_ui";
const DELIVERY_FEE = 7;

/* ---------- Menu data ---------- */
const MENU_ITEMS = [
  {
    id: "burger-big-tasty",
    name: "Big Tasty",
    category: "Burgers",
    description: "Two beef patties, fresh lettuce, tomato, cheese and special sauce.",
    price: 29,
    image: "",
    emoji: "🍔"
  },
  {
    id: "burger-big-mac",
    name: "Big Mac",
    category: "Burgers",
    description: "The classic two all-beef patties, special sauce, lettuce, cheese, pickles, onions.",
    price: 22,
    image: "",
    emoji: "🍔"
  },
  {
    id: "burger-cheeseburger",
    name: "Cheeseburger",
    category: "Burgers",
    description: "Beef patty topped with melted cheese, onions, pickles, ketchup and mustard.",
    price: 9,
    image: "",
    emoji: "🍔"
  },
  {
    id: "chicken-mcspicy",
    name: "McSpicy Chicken",
    category: "Chicken",
    description: "Crispy spicy chicken fillet with lettuce and mayo in a soft bun.",
    price: 19,
    image: "",
    emoji: "🍗"
  },
  {
    id: "chicken-nuggets-9",
    name: "Chicken McNuggets (9pc)",
    category: "Chicken",
    description: "9 pieces of crispy golden chicken nuggets served with your choice of sauce.",
    price: 18,
    image: "",
    emoji: "🍗"
  },
  {
    id: "chicken-mcgrill",
    name: "Grilled Chicken Sandwich",
    category: "Chicken",
    description: "Grilled chicken breast with lettuce and mayo in a toasted bun.",
    price: 20,
    image: "",
    emoji: "🍗"
  },
  {
    id: "breakfast-mcmuffin",
    name: "Egg McMuffin",
    category: "Breakfast",
    description: "English muffin with egg, cheese and Canadian bacon.",
    price: 12,
    image: "",
    emoji: "🍳"
  },
  {
    id: "breakfast-pancakes",
    name: "Hotcakes",
    category: "Breakfast",
    description: "Fluffy pancakes served with syrup and butter.",
    price: 14,
    image: "",
    emoji: "🥞"
  },
  {
    id: "sides-fries-medium",
    name: "French Fries (Medium)",
    category: "Sides",
    description: "Golden, crispy world-famous fries, salted to perfection.",
    price: 9,
    image: "",
    emoji: "🍟"
  },
  {
    id: "sides-mozzarella",
    name: "Mozzarella Sticks",
    category: "Sides",
    description: "Crispy fried mozzarella sticks served with tomato dip.",
    price: 13,
    image: "",
    emoji: "🧀"
  },
  {
    id: "dessert-mcflurry-oreo",
    name: "McFlurry Oreo",
    category: "Desserts",
    description: "Creamy soft-serve blended with crushed Oreo cookie pieces.",
    price: 11,
    image: "",
    emoji: "🍨"
  },
  {
    id: "dessert-apple-pie",
    name: "Apple Pie",
    category: "Desserts",
    description: "Warm, flaky pastry filled with spiced apple filling.",
    price: 6,
    image: "",
    emoji: "🥧"
  },
  {
    id: "beverage-coke",
    name: "Coca-Cola",
    category: "Beverages",
    description: "Ice-cold Coca-Cola, the perfect companion to your meal.",
    price: 7,
    image: "",
    emoji: "🥤"
  },
  {
    id: "beverage-mcCafe-latte",
    name: "McCafé Latte",
    category: "Beverages",
    description: "Smooth espresso with steamed milk, hot or iced.",
    price: 15,
    image: "",
    emoji: "☕"
  },
  {
    id: "happy-meal-nuggets",
    name: "Happy Meal Chicken Nuggets",
    category: "Happy Meal",
    description: "4pc nuggets, small fries, small drink and a surprise toy.",
    price: 19,
    image: "",
    emoji: "🎁"
  },
  {
    id: "happy-meal-cheeseburger",
    name: "Happy Meal Cheeseburger",
    category: "Happy Meal",
    description: "Cheeseburger, small fries, small drink and a surprise toy.",
    price: 19,
    image: "",
    emoji: "🎁"
  }
];

/* ---------- State ---------- */
let cart = loadCart();
let currentCategory = "All";
let currentSearch = "";

/* ---------- Persistence helpers ---------- */
function loadCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function saveCart() {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

function loadUiState() {
  try {
    const raw = localStorage.getItem(UI_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function saveUiState() {
  localStorage.setItem(
    UI_STORAGE_KEY,
    JSON.stringify({ category: currentCategory, search: currentSearch })
  );
}

/* ---------- Cart helpers ---------- */
function getQty(id) {
  return cart[id] || 0;
}

function setQty(id, qty) {
  const clamped = Math.max(0, qty);
  if (clamped === 0) {
    delete cart[id];
  } else {
    cart[id] = clamped;
  }
  saveCart();
  renderAll();
}

function addItem(id) {
  setQty(id, getQty(id) + 1);
}

function removeItem(id) {
  setQty(id, getQty(id) - 1);
}

function cartTotalCount() {
  return Object.values(cart).reduce((sum, q) => sum + q, 0);
}

function cartSubtotal() {
  return Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = MENU_ITEMS.find((m) => m.id === id);
    return item ? sum + item.price * qty : sum;
  }, 0);
}

/* ---------- Rendering: Menu ---------- */
function getFilteredItems() {
  return MENU_ITEMS.filter((item) => {
    const matchesCategory =
      currentCategory === "All" || item.category === currentCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(currentSearch.toLowerCase()) ||
      item.description.toLowerCase().includes(currentSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });
}

function productImageMarkup(item) {
  if (item.image) {
    return `<img src="${item.image}" alt="${item.name}" />`;
  }
  return item.emoji || "🍽️";
}

function renderMenu() {
  const grid = document.getElementById("menuGrid");
  const noResults = document.getElementById("noResults");
  const items = getFilteredItems();

  grid.innerHTML = "";

  if (items.length === 0) {
    noResults.hidden = false;
  } else {
    noResults.hidden = true;
  }

  items.forEach((item) => {
    const qty = getQty(item.id);
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <div class="product-image">${productImageMarkup(item)}</div>
      <div class="product-body">
        <h3 class="product-name">${item.name}</h3>
        <p class="product-desc">${item.description}</p>
        <p class="product-price">${item.price} AED</p>
        <div class="product-actions">
          ${
            qty > 0
              ? `<div class="qty-controls">
                   <button class="qty-btn" data-action="remove" data-id="${item.id}" aria-label="Remove one ${item.name}">−</button>
                   <span class="qty-value">${qty}</span>
                   <button class="qty-btn" data-action="add" data-id="${item.id}" aria-label="Add one ${item.name}">+</button>
                 </div>`
              : `<button class="add-btn" data-action="add" data-id="${item.id}">Add</button>`
          }
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

/* ---------- Rendering: Cart ---------- */
function renderCart() {
  const cartItemsEl = document.getElementById("cartItems");
  const cartEmptyMsg = document.getElementById("cartEmptyMsg");
  const cartSummary = document.getElementById("cartSummary");

  const entries = Object.entries(cart).filter(([, qty]) => qty > 0);

  cartItemsEl.innerHTML = "";

  if (entries.length === 0) {
    cartEmptyMsg.hidden = false;
    cartSummary.hidden = true;
    return;
  }

  cartEmptyMsg.hidden = true;
  cartSummary.hidden = false;

  entries.forEach(([id, qty]) => {
    const item = MENU_ITEMS.find((m) => m.id === id);
    if (!item) return;
    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <div class="cart-item-icon">${productImageMarkup(item)}</div>
      <div class="cart-item-info">
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-price">${item.price} AED × ${qty} = ${item.price * qty} AED</p>
      </div>
      <div class="cart-item-controls">
        <button class="qty-btn" data-action="remove" data-id="${id}" aria-label="Remove one ${item.name}">−</button>
        <span class="qty-value">${qty}</span>
        <button class="qty-btn" data-action="add" data-id="${id}" aria-label="Add one ${item.name}">+</button>
      </div>
    `;
    cartItemsEl.appendChild(row);
  });

  const subtotal = cartSubtotal();
  const total = subtotal + DELIVERY_FEE;

  document.getElementById("subtotalVal").textContent = `${subtotal} AED`;
  document.getElementById("deliveryVal").textContent = `${DELIVERY_FEE} AED`;
  document.getElementById("totalVal").textContent = `${total} AED`;
}

function renderCartBadge() {
  document.getElementById("cartBadge").textContent = cartTotalCount();
}

function renderAll() {
  renderMenu();
  renderCart();
  renderCartBadge();
}

/* ---------- Drawer / Modal controls ---------- */
function openCart() {
  document.getElementById("cartDrawer").classList.add("open");
  document.getElementById("overlay").classList.add("visible");
}

function closeCart() {
  document.getElementById("cartDrawer").classList.remove("open");
  document.getElementById("overlay").classList.remove("visible");
}

function openCheckout() {
  if (cartTotalCount() === 0) return;
  renderCheckoutSummary();
  document.getElementById("checkoutModal").classList.add("open");
  document.getElementById("checkoutOverlay").classList.add("visible");
  closeCart();
}

function closeCheckout() {
  document.getElementById("checkoutModal").classList.remove("open");
  document.getElementById("checkoutOverlay").classList.remove("visible");
}

function renderCheckoutSummary() {
  const el = document.getElementById("checkoutSummary");
  const subtotal = cartSubtotal();
  const total = subtotal + DELIVERY_FEE;
  const entries = Object.entries(cart).filter(([, qty]) => qty > 0);

  let itemsHtml = entries
    .map(([id, qty]) => {
      const item = MENU_ITEMS.find((m) => m.id === id);
      if (!item) return "";
      return `<div class="summary-row"><span>${item.name} × ${qty}</span><span>${item.price * qty} AED</span></div>`;
    })
    .join("");

  el.innerHTML = `
    ${itemsHtml}
    <div class="summary-row"><span>Subtotal</span><span>${subtotal} AED</span></div>
    <div class="summary-row"><span>Delivery Fee</span><span>${DELIVERY_FEE} AED</span></div>
    <div class="summary-row total-row"><span>Total</span><span>${total} AED</span></div>
  `;
}

/* ---------- Event wiring ---------- */
function handleQtyClick(e) {
  const btn = e.target.closest("[data-action]");
  if (!btn) return;
  const id = btn.dataset.id;
  const action = btn.dataset.action;
  if (action === "add") addItem(id);
  if (action === "remove") removeItem(id);
}

function initCategories() {
  const container = document.getElementById("categories");
  container.addEventListener("click", (e) => {
    const btn = e.target.closest(".chip");
    if (!btn) return;
    container
      .querySelectorAll(".chip")
      .forEach((c) => c.classList.remove("active"));
    btn.classList.add("active");
    currentCategory = btn.dataset.category;
    saveUiState();
    renderMenu();
  });
}

function initSearch() {
  const input = document.getElementById("searchInput");
  input.addEventListener("input", () => {
    currentSearch = input.value.trim();
    saveUiState();
    renderMenu();
  });
}

function initCartControls() {
  document.getElementById("cartBtn").addEventListener("click", openCart);
  document.getElementById("closeCartBtn").addEventListener("click", closeCart);
  document.getElementById("overlay").addEventListener("click", closeCart);
  document.getElementById("cartItems").addEventListener("click", handleQtyClick);
  document.getElementById("checkoutBtn").addEventListener("click", openCheckout);
}

function initCheckoutControls() {
  document
    .getElementById("closeCheckoutBtn")
    .addEventListener("click", closeCheckout);
  document
    .getElementById("checkoutOverlay")
    .addEventListener("click", closeCheckout);
  document
    .getElementById("checkoutForm")
    .addEventListener("submit", handleCheckoutSubmit);
}

function handleCheckoutSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("custName").value.trim();
  const phone = document.getElementById("custPhone").value.trim();
  const address = document.getElementById("custAddress").value.trim();
  const area = document.getElementById("custArea").value.trim();
  const errorEl = document.getElementById("formError");
  const successEl = document.getElementById("formSuccess");

  successEl.hidden = true;

  if (!name || !phone || !address || !area) {
    errorEl.textContent = "Please fill in all required fields.";
    errorEl.hidden = false;
    return;
  }

  if (cartTotalCount() === 0) {
    errorEl.textContent = "Your cart is empty.";
    errorEl.hidden = false;
    return;
  }

  errorEl.hidden = true;
  successEl.hidden = false;

  // Clear cart + localStorage
  cart = {};
  saveCart();
  renderAll();

  document.getElementById("checkoutForm").reset();

  setTimeout(() => {
    closeCheckout();
    successEl.hidden = true;
  }, 2200);
}

function initHeroCta() {
  document.getElementById("orderNowBtn").addEventListener("click", () => {
    document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
  });
}

function initMenuGridEvents() {
  document.getElementById("menuGrid").addEventListener("click", handleQtyClick);
}

function restoreUiState() {
  const state = loadUiState();
  if (state.category) {
    currentCategory = state.category;
    document.querySelectorAll(".chip").forEach((chip) => {
      chip.classList.toggle("active", chip.dataset.category === currentCategory);
    });
  }
  if (state.search) {
    currentSearch = state.search;
    document.getElementById("searchInput").value = currentSearch;
  }
}

/* ---------- Init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  restoreUiState();
  initCategories();
  initSearch();
  initCartControls();
  initCheckoutControls();
  initHeroCta();
  initMenuGridEvents();
  renderAll();
});
