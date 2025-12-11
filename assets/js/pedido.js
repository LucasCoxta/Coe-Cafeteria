export function initpedido() {
    document.addEventListener("DOMContentLoaded", () => {
        function openWhatsApp(number, message) {
            const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
            window.open(url, "_blank");
        }
        const mainCards = document.querySelectorAll(".cards-container .card");

        mainCards.forEach(card => {
            card.addEventListener("click", () => {

                const titulo = card.querySelector("h3")?.textContent || "Pedido";

                openWhatsApp(
                    "5561981904208",
                    `Olá! Gostaria de ver mais opções da categoria: ${titulo}.`
                );

            });
        });
        const cardWhats = document.querySelector(".pedido-card.whatsapp");
        if (cardWhats) {
            cardWhats.addEventListener("click", () => {
                openWhatsApp("5561912341234", "Olá! Quero fazer um pedido.");
            });
        }
        const cardIfood = document.querySelector(".pedido-card.ifood");
        if (cardIfood) {
            cardIfood.addEventListener("click", () => {
                window.open("https://www.ifood.com.br", "_blank");
            });
        }

    });
}


