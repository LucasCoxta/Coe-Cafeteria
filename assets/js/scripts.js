import { initHeader } from "./header.js";
import { initCardapio } from "./cardapio.js";
import { initCarrinho } from "./carrinho.js";
import { initpedido } from "./pedido.js";
import { initImg } from "./img.js";
import { initAddToCartGlobal } from "./home.js";

document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initCardapio();
  initCarrinho();
  initpedido();
  initImg();
  initAddToCartGlobal();
});
