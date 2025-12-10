export function initpedido() {

    document.addEventListener("DOMContentLoaded", () => {

        const cards = document.querySelectorAll('.card');

        cards.forEach(card => {

            // Quando passar o mouse no card → cria o ícone
            card.addEventListener("mouseenter", () => {

                const btn = card.querySelector('.btn-whatsapp');

                // Evita criar o ícone mais de uma vez
                if (btn && !btn.querySelector('.whatsapp-icon')) {

                    const icon = document.createElement("img");
                    icon.src = "img/whatsapp.png"; 
                    icon.alt = "WhatsApp";
                    icon.classList.add("whatsapp-icon");

                    btn.prepend(icon);
                }
            });

        });

    });

}

