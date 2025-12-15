export function initImg() {
  document.addEventListener("DOMContentLoaded", () => {
    const imgs = document.querySelectorAll("img:not([loading])");

    imgs.forEach((img) => {
      const rect = img.getBoundingClientRect();
      if (rect.top > window.innerHeight) {
        img.setAttribute("loading", "lazy");
      } else {
        img.setAttribute("loading", "eager");
      }
    });
  });
}
