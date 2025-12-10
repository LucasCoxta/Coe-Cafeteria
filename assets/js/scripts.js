import { initHeader } from "./header.js";
import { initCardapio } from "./cardapio.js";
import { initCarrinho } from "./carrinho.js";
import { initpedido } from "./pedido.js";

document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initCardapio();
  initCarrinho();
  initpedido();
});
