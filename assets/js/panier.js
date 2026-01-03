console.log("panier.js multi-produits chargé");

const CART_KEY = "cart";
const PRODUCTS_KEY = "products";
const SHIPPING_FLAT = 0;

/* Helpers */
function moneyEUR(v) {
  const n = Number(v);
  return Number.isFinite(n) ? `${n.toLocaleString("fr-FR")} €` : "0 €";
}

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/* Core data */
function getCart() {
  return readJSON(CART_KEY, []);
}

function setCart(cart) {
  writeJSON(CART_KEY, cart);
}

function getProducts() {
  return readJSON(PRODUCTS_KEY, []);
}

/* RENDER */
function render() {
  const cart = getCart();
  const products = getProducts();

  const container = document.getElementById("cartItems");
  const subtotalEl = document.getElementById("sumSubtotal");
  const shippingEl = document.getElementById("sumShipping");
  const totalEl = document.getElementById("sumTotal");

  container.innerHTML = "";

  if (!cart.length) {
    container.innerHTML = "<p>Votre panier est vide.</p>";
    subtotalEl.textContent = moneyEUR(0);
    shippingEl.textContent = moneyEUR(0);
    totalEl.textContent = moneyEUR(0);
    return;
  }

  let subtotal = 0;

  cart.forEach(item => {
    const product = products.find(p => String(p.id) === String(item.productId));
    if (!product) return;

    const qty = Math.max(1, item.qty);
    const price = Number(product.price) || 0;
    const lineTotal = price * qty;
    subtotal += lineTotal;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <div class="cart-thumb"></div>

      <div class="cart-details">
        <p class="cart-line"><strong>${product.title}</strong></p>
        <p class="cart-line">Prix ${moneyEUR(price)}</p>
        <p class="cart-line">Quantité</p>

        <div class="cart-actions">
          <button data-action="remove" data-id="${product.id}">🗑️</button>
          <button data-action="minus" data-id="${product.id}">−</button>
          <span class="qty">${qty}</span>
          <button data-action="plus" data-id="${product.id}">+</button>
        </div>
      </div>
    `;

    container.appendChild(div);
  });

  const shipping = subtotal > 0 ? SHIPPING_FLAT : 0;
  const total = subtotal + shipping;

  subtotalEl.textContent = moneyEUR(subtotal);
  shippingEl.textContent = moneyEUR(shipping);
  totalEl.textContent = moneyEUR(total);
}

/* EVENTS */
function bindEvents() {
  document.addEventListener("click", e => {
    const btn = e.target.closest("button[data-action]");
    if (!btn) return;

    const action = btn.dataset.action;
    const id = btn.dataset.id;

    let cart = getCart();
    const item = cart.find(i => String(i.productId) === String(id));
    if (!item) return;

    if (action === "plus") item.qty += 1;
    if (action === "minus") item.qty = Math.max(1, item.qty - 1);
    if (action === "remove") cart = cart.filter(i => String(i.productId) !== String(id));

    setCart(cart);
    render();
  });
}

/* INIT */
document.addEventListener("DOMContentLoaded", () => {
  bindEvents();
  render();
});
