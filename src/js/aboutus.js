// Mobile menu toggle
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
const closeMobileMenu = document.getElementById("close-mobile-menu");
const mobileProductsToggle = document.getElementById("mobile-products-toggle");
const mobileProductsMenu = document.getElementById("mobile-products-menu");

mobileMenuButton.addEventListener("click", () => {
  mobileMenuButton.classList.toggle("open");
  mobileMenu.classList.toggle("open");
  document.body.style.overflow = mobileMenu.classList.contains("open")
    ? "hidden"
    : "auto";
});

closeMobileMenu.addEventListener("click", () => {
  mobileMenuButton.classList.remove("open");
  mobileMenu.classList.remove("open");
  document.body.style.overflow = "auto";
});

mobileProductsToggle.addEventListener("click", () => {
  mobileProductsMenu.classList.toggle("hidden");
  mobileProductsToggle.querySelector("i").classList.toggle("fa-chevron-down");
  mobileProductsToggle.querySelector("i").classList.toggle("fa-chevron-up");
});

// Set current year automatically
document.getElementById("current-year").textContent = new Date().getFullYear();
