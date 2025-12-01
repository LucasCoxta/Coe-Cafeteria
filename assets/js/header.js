export function initHeader() {
  const menuBtn = document.getElementById("menu-btn");
  const menu = document.getElementById("menu");

  menuBtn.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  // Glass após scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      document.querySelector("header").classList.add("glass");
    } else {
      document.querySelector("header").classList.remove("glass");
    }
  });

  // Marcar página ativa automaticamente
  const links = document.querySelectorAll("nav a");
  links.forEach((link) => {
    if (link.href === window.location.href) {
      link.classList.add("active");
    }
  });
}
