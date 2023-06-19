document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");

  const navMenuMobile = document.querySelector(".nav_menu_mobile");
  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("is-active");

    navMenuMobile.classList.toggle("show");
  });
});

// Por alguna razon deja de  funciona al cambiar de ruta :/
