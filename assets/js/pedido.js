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

  //Fazer pedidos na parte dos cards, cafés e Bebidas etc...
  document.querySelectorAll(".cardPO-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const numero = btn.dataset.whats;
      const produto = btn.dataset.produto;

      const mensagem = `Olá! Gostaria de fazer um pedido de ${produto}. Pode me ajudar?`;

      const mensagemCodificada = encodeURIComponent(mensagem);

      window.open(
        `https://wa.me/${numero}?text=${mensagemCodificada}`,
        "_blank"
      );
    });
  });

  //Fazer pedido pelo WhatsApp.
  document.querySelectorAll(".pedido-card.whatsapp").forEach((card) => {
    card.addEventListener("click", () => {
      const numero = card.dataset.whats;

      const mensagem = "Olá! Gostaria de fazer um pedido";

      const mensagemCodificada = encodeURIComponent(mensagem);

      window.open(
        `https://wa.me/${numero}?text=${mensagemCodificada}`,
        "_blank"
      );
    });
  });
}
