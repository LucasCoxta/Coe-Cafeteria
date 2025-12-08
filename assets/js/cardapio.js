import { addToCart } from "./carrinho.js";

let dadosCardapio = {};

export function initCardapio() {
  const container = document.getElementById("lista-produtos");
  const botoes = document.querySelectorAll(".container-Cat button");

  fetch("../json/lista-cardapio.json")
    .then((res) => res.json())
    .then((data) => {
      dadosCardapio = data;
      renderizarCategoria(Object.keys(data)[0]);
    });

  botoes.forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelector(".container-Cat .ativo")
        ?.classList.remove("ativo");
      btn.classList.add("ativo");
      renderizarCategoria(btn.dataset.cat);
    });
  });

  function renderizarCategoria(cat) {
    container.innerHTML = "";

    if (!dadosCardapio[cat]) {
      container.innerHTML = "<p>Nenhum item encontrado.</p>";
      return;
    }

    dadosCardapio[cat].forEach((item, i) => {
      const id = `${cat}-${i}`;

      container.innerHTML += `
        <div class="card-cardapio">
          <img src="${item.imagem}" alt="${item.nome}">
          <div class="info-cardapio">
            <h3>${item.nome}</h3>
            <p>${item.descricao}</p>
              <span class="preco-cardapio">R$ ${item.preco}</span>
              <button
                class="btn-add-cart"
                data-id="${id}"
                data-nome="${item.nome}"
                data-preco="${item.preco}"
                data-img="${item.imagem}"
              >
                Fazer pedido <i class="fa-solid fa-plus"></i>
              </button>
          </div>
        </div>
      `;
    });

    document.querySelectorAll(".btn-add-cart").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const el = e.currentTarget;

        addToCart({
          id: el.dataset.id,
          nome: el.dataset.nome,
          preco: Number(el.dataset.preco),
          imagem: el.dataset.img,
        });
      });
    });
  }
}
