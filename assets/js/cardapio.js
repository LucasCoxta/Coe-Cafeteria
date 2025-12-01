export function initCardapio() {
  const botoes = document.querySelectorAll(".container-Cat button");

  botoes.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove o ativo anterior
      document
        .querySelector(".container-Cat .ativo")
        ?.classList.remove("ativo");

      // Adiciona no clicado
      btn.classList.add("ativo");

      // Aqui você pode fazer filtragem dos itens usando o data-cat
      const categoria = btn.getAttribute("data-cat");
      console.log("Categoria selecionada:", categoria);
    });
  });
}
