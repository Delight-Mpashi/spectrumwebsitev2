// Set current year in the footer
document.getElementById("current-year").textContent = new Date().getFullYear();

// Mobile Menu Toggle Functionality
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
const closeMobileMenuButton = document.getElementById("close-mobile-menu");
const mobileProductsToggle = document.getElementById("mobile-products-toggle");
const mobileProductsMenu = document.getElementById("mobile-products-menu");

// Function to open the mobile menu
function openMobileMenu() {
  mobileMenu.classList.remove("translate-x-full");
  mobileMenu.classList.add("translate-x-0");
  mobileMenu.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden"; // Prevent scrolling body when menu is open
}

// Function to close the mobile menu
function closeMobileMenu() {
  mobileMenu.classList.remove("translate-x-0");
  mobileMenu.classList.add("translate-x-full");
  mobileMenu.setAttribute("aria-hidden", "true");
  document.body.style.overflow = ""; // Restore body scrolling
  // Ensure products submenu is hidden when main menu closes
  mobileProductsMenu.classList.add("hidden");
  mobileProductsToggle.setAttribute("aria-expanded", "false");
  mobileProductsToggle.querySelector("i").classList.remove("fa-chevron-up");
  mobileProductsToggle.querySelector("i").classList.add("fa-chevron-down");
}

// Toggle mobile menu on button click
mobileMenuButton.addEventListener("click", openMobileMenu);
closeMobileMenuButton.addEventListener("click", closeMobileMenu);

// Close mobile menu when clicking outside (optional, but good for UX)
document.addEventListener("click", function (event) {
  if (
    !mobileMenu.contains(event.target) &&
    !mobileMenuButton.contains(event.target) &&
    mobileMenu.classList.contains("translate-x-0")
  ) {
    closeMobileMenu();
  }
});

// Mobile Products Submenu Toggle
mobileProductsToggle.addEventListener("click", function () {
  const isExpanded =
    mobileProductsToggle.getAttribute("aria-expanded") === "true";
  if (isExpanded) {
    mobileProductsMenu.classList.add("hidden");
    mobileProductsToggle.setAttribute("aria-expanded", "false");
    mobileProductsToggle.querySelector("i").classList.remove("fa-chevron-up");
    mobileProductsToggle.querySelector("i").classList.add("fa-chevron-down");
  } else {
    mobileProductsMenu.classList.remove("hidden");
    mobileProductsToggle.setAttribute("aria-expanded", "true");
    mobileProductsToggle.querySelector("i").classList.remove("fa-chevron-down");
    mobileProductsToggle.querySelector("i").classList.add("fa-chevron-up");
  }
});
