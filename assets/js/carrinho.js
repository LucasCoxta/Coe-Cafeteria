// =======================
// ESTADO DO CARRINHO
// =======================
let cart = JSON.parse(localStorage.getItem("coe_cart_v1")) || [];

const CART_EVENT = "cart:update";

// =======================
// UTILIDADES
// =======================
function formatPrice(value) {
  return Number(value).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function saveCart() {
  localStorage.setItem("coe_cart_v1", JSON.stringify(cart));
}

function calcTotal() {
  return cart.reduce((total, item) => total + item.preco * item.qtd, 0);
}

// =======================
// BADGE
// =======================
function animateBadge(badge) {
  badge.classList.remove("bump");
  void badge.offsetWidth;
  badge.classList.add("bump");
  setTimeout(() => badge.classList.remove("bump"), 250);
}

function updateBadge() {
  const total = cart.reduce((s, i) => s + i.qtd, 0);

  ["cartCount", "cartCountDesktop"].forEach((id) => {
    const badge = document.getElementById(id);
    if (!badge) return;

    badge.textContent = total;
    badge.style.display = total > 0 ? "flex" : "none";

    if (total > 0) animateBadge(badge);
  });
}

// =======================
// RENDER DO CARRINHO
// =======================
function renderCart() {
  const itemsContainer = document.getElementById("cartItems");
  const totalEl = document.getElementById("cartTotal");
  if (!itemsContainer || !totalEl) return;

  itemsContainer.innerHTML = "";

  if (cart.length === 0) {
    itemsContainer.innerHTML =
      "<p style='color:#666'>Seu carrinho está vazio.</p>";
  } else {
    cart.forEach((item) => {
      itemsContainer.innerHTML += `
        <div class="cart-item">
          <div>
            <strong>${item.nome}</strong>
            <div>R$ ${formatPrice(item.preco)}</div>
          </div>

          <div class="cart-actions">
            <button class="icon-btn" data-dec="${item.id}">
            <i class="fa-solid fa-minus"></i>
            </button>

            <span class="cart-qty">${item.qtd}</span>

            <button class="icon-btn" data-inc="${item.id}">
            <i class="fa-solid fa-plus"></i>
            </button>
            <button class="icon-btn remove" data-remove="${item.id}">
            <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      `;
    });
  }

  totalEl.textContent = formatPrice(calcTotal());
  updateBadge();
}

// =======================
// MODAL
// =======================
function openCart() {
  document.getElementById("cartOverlay")?.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeCart() {
  document.getElementById("cartOverlay")?.classList.remove("active");
  document.body.style.overflow = "";
}

// =======================
// ADD AO CARRINHO
// =======================
export function addToCart(produto) {
  const exists = cart.find((i) => i.id === produto.id);

  if (exists) {
    exists.qtd++;
  } else {
    cart.push({ ...produto, qtd: 1 });
  }

  saveCart();
  renderCart();
  document.dispatchEvent(new CustomEvent(CART_EVENT));
}

// =======================
// AÇÕES (+ - REMOVER)
// =======================
function handleActions(e) {
  const btn = e.target.closest("button");
  if (!btn) return;

  const id = btn.dataset.inc || btn.dataset.dec || btn.dataset.remove;
  if (!id) return;

  const item = cart.find((i) => i.id === id);
  if (!item) return;

  if (btn.dataset.inc) item.qtd++;
  if (btn.dataset.dec) item.qtd = Math.max(1, item.qtd - 1);
  if (btn.dataset.remove) cart = cart.filter((i) => i.id !== id);

  saveCart();
  renderCart();
}

// =======================
// WHATSAPP
// =======================
function generateWhatsAppMessage() {
  if (cart.length === 0) return "Olá! Gostaria de fazer um pedido";

  let msg = "*Pedido da Cafeteria*\n\n";

  cart.forEach((item) => {
    msg += `• ${item.nome} (${item.qtd}x)\n`;
    msg += `  R$ ${formatPrice(item.preco * item.qtd)}\n\n`;
  });

  msg += `*Total:* R$ ${formatPrice(calcTotal())}\n\n`;
  msg += "Pode confirmar, por favor?";

  return msg;
}

function sendOrderToWhatsApp() {
  const phone = "5599999999999"; // ALTERE AQUI
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(
    generateWhatsAppMessage()
  )}`;
  window.open(url, "_blank");
}

// =======================
// LISTENER GLOBAL ADD CART
// =======================
let addToCartListenerInitialized = false;

function initAddToCartGlobal() {
  if (addToCartListenerInitialized) return;
  addToCartListenerInitialized = true;

  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-add-cart");
    if (!btn) return;

    const produto = {
      id: btn.dataset.id,
      nome: btn.dataset.nome,
      preco: Number(btn.dataset.preco),
      imagem: btn.dataset.img,
    };

    if (!produto.id || !produto.nome || !produto.preco) return;

    addToCart(produto);
  });
}

// =======================
// INIT
// =======================
export function initCarrinho() {
  document.getElementById("closeCart")?.addEventListener("click", closeCart);

  document.getElementById("cartOverlay")?.addEventListener("click", (e) => {
    if (e.target.id === "cartOverlay") closeCart();
  });

  document
    .getElementById("cartItems")
    ?.addEventListener("click", handleActions);

  document.querySelectorAll(".cart-wrapper").forEach((btn) => {
    btn.addEventListener("click", openCart);
  });

  document
    .getElementById("whatsappOrder")
    ?.addEventListener("click", sendOrderToWhatsApp);

  initAddToCartGlobal();

  renderCart();
  updateBadge();
}
