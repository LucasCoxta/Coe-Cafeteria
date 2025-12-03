let dadosCardapio = {};

export function initCardapio() {
  const botoes = document.querySelectorAll(".container-Cat button");
  const container = document.getElementById("lista-produtos");

  // 1. Carregar o JSON
  fetch("../json/lista-cardapio.json")
    .then((response) => response.json())
    .then((data) => {
      dadosCardapio = data;
      renderizarCategoria("cafes-especiais");
    })
    .catch((error) => console.log("Erro ao carregar o cardápio:", error));

  // 2. Evento de clique nos filtros
  botoes.forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelector(".container-Cat .ativo")
        ?.classList.remove("ativo");
      btn.classList.add("ativo");

      const categoria = btn.getAttribute("data-cat");
      console.log("Categoria selecionada:", categoria);

      renderizarCategoria(categoria);
    });
  });

  // 3. Função que renderiza uma categoria específica
  function renderizarCategoria(cat) {
    container.innerHTML = ""; // limpa antes de renderizar

    if (!dadosCardapio[cat]) {
      container.innerHTML = "<p>Nenhum item encontrado.</p>";
      return;
    }

    dadosCardapio[cat].forEach((item) => {
      container.innerHTML += `
        <div class="card-cardapio">
          <img src="${item.imagem}" alt="${item.nome}">
          <div class="info-cardapio">
            <h3>${item.nome}</h3>
            <p>${item.descricao}</p>
            <p class="preco-cardapio">R$ ${item.preco}</p>
          </div>
        </div>
      `;
    });
  }
}
