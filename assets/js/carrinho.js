let cart = JSON.parse(localStorage.getItem("coe_cart_v1")) || [];

const CART_EVENT = "cart:update";

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

function animateBadge(badge) {
  badge.classList.remove("bump");
  void badge.offsetWidth;
  badge.classList.add("bump");

  setTimeout(() => {
    badge.classList.remove("bump");
  }, 250);
}

function updateBadge() {
  const total = cart.reduce((s, i) => s + i.qtd, 0);

  const badgeMobile = document.getElementById("cartCount");
  const badgeDesktop = document.getElementById("cartCountDesktop");

  [badgeMobile, badgeDesktop].forEach((badge) => {
    if (!badge) return;

    badge.textContent = total;
    badge.setAttribute("data-count", total);
    badge.style.display = total > 0 ? "flex" : "none";

    if (total > 0) animateBadge(badge);
  });

  if (badgeMobile) {
    badgeMobile.textContent = total;
    badgeMobile.setAttribute("data-count", total);
    badgeMobile.style.display = total > 0 ? "flex" : "none";
  }

  if (badgeDesktop) {
    badgeDesktop.textContent = total;
    badgeDesktop.setAttribute("data-count", total);
    badgeDesktop.style.display = total > 0 ? "flex" : "none";
  }

  document.querySelectorAll(".cart-wrapper").forEach((w) => {
    w.classList.add("pulse");
    setTimeout(() => w.classList.remove("pulse"), 300);
  });
}

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
            <button data-dec="${item.id}" class="icon-btn">
              <i class="fa-solid fa-minus"></i>
            </button>

            <span class="cart-qty">${item.qtd}</span>

            <button data-inc="${item.id}" class="icon-btn">
              <i class="fa-solid fa-plus"></i>
            </button>

            <button data-remove="${item.id}" class="icon-btn remove">
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

function openCart() {
  document.getElementById("cartOverlay")?.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeCart() {
  document.getElementById("cartOverlay")?.classList.remove("active");
  document.body.style.overflow = "";
}

export function addToCart(produto) {
  const exists = cart.find((i) => i.id === produto.id);

  if (exists) {
    exists.qtd += 1;
  } else {
    cart.push({ ...produto, qtd: 1 });
  }

  saveCart();
  renderCart();

  document.dispatchEvent(new CustomEvent(CART_EVENT));
}

function handleActions(e) {
  const button = e.target.closest("button");
  if (!button) return;

  const id = button.dataset.inc || button.dataset.dec || button.dataset.remove;
  if (!id) return;

  const item = cart.find((i) => i.id === id);
  if (!item) return;

  if (button.dataset.inc) {
    item.qtd++;
  }

  if (button.dataset.dec) {
    item.qtd = Math.max(1, item.qtd - 1);
  }

  if (button.dataset.remove) {
    cart = cart.filter((i) => i.id !== id);
  }

  saveCart();
  renderCart();
}

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

  document.addEventListener(CART_EVENT, () => {
    renderCart();
  });

  renderCart();
  updateBadge();
}
