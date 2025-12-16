import { addToCart } from "./carrinho.js";

export function initAddToCartGlobal() {
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
