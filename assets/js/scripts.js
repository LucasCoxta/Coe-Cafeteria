import { initHeader } from "./header.js";
import { initCardapio } from "./cardapio.js";
import { initCarrinho } from "./carrinho.js";

document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initCardapio();
  initCarrinho();
});
