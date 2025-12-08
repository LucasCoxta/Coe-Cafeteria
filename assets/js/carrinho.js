export function initCarrinho() {
  let cart = [];
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  const cartCount = document.getElementById("cartCount");

  function addToCart(name, price) {
    cart.push({ name, price });

    updateCart();
    openCart();
  }

  function updateCart() {
    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {
      total += item.price;

      cartItems.innerHTML += `
      <div class="cart-item">
        <span>${item.name}</span>
        <span>R$ ${item.price.toFixed(2)}</span>
      </div>
    `;
    });

    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = cart.length;
  }

  // Abrir e fechar carrinho
  const cartBtn = document.getElementById("cartBtn");
  const cartOverlay = document.getElementById("cartOverlay");
  const closeCart = document.getElementById("closeCart");

  function openCart() {
    cartOverlay.classList.add("active");
  }

  cartBtn.onclick = openCart;
  closeCart.onclick = () => cartOverlay.classList.remove("active");
}
