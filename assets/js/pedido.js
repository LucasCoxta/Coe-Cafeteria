export function initpedido() {
  document.addEventListener("click", (e) => {
    const card = e.target.closest(".card");

    if (!card) {
      document
        .querySelectorAll(".card")
        .forEach((c) => c.classList.remove("active"));
      return;
    }

    document
      .querySelectorAll(".card")
      .forEach((c) => c.classList.remove("active"));

    card.classList.add("active");
  });

  document.addEventListener("click", (e) => {
    if (e.target.closest(".cardOP-btn")) {
      e.stopPropagation();
      console.log("Botão clicado");
    }
  });
}
