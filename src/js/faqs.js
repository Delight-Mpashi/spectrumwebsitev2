// src/js/faqs.js
// Mobile menu functionality
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
const closeMobileMenu = document.getElementById("close-mobile-menu");
const mobileProductsToggle = document.getElementById("mobile-products-toggle");
const mobileProductsMenu = document.getElementById("mobile-products-menu");

// Toggle mobile menu
mobileMenuButton.addEventListener("click", function () {
  this.classList.toggle("open");
  mobileMenu.classList.toggle("open");
  document.body.style.overflow = mobileMenu.classList.contains("open")
    ? "hidden"
    : "auto";
});

// Close mobile menu
closeMobileMenu.addEventListener("click", function () {
  mobileMenuButton.classList.remove("open");
  mobileMenu.classList.remove("open");
  document.body.style.overflow = "auto";
});

// Toggle mobile products menu
mobileProductsToggle.addEventListener("click", function () {
  mobileProductsMenu.classList.toggle("hidden");
  const icon = this.querySelector("i");
  icon.classList.toggle("fa-chevron-down");
  icon.classList.toggle("fa-chevron-up");
});

// FAQ functionality
function toggleFAQ(element) {
  // Close other FAQs when one is opened
  document.querySelectorAll(".faq-item").forEach((item) => {
    if (item !== element && item.classList.contains("active")) {
      item.classList.remove("active");
    }
  });

  // Toggle current FAQ
  element.classList.toggle("active");
}

// Search functionality
document.getElementById("faq-search").addEventListener("input", function (e) {
  const searchTerm = e.target.value.toLowerCase();

  document.querySelectorAll(".faq-item").forEach((item) => {
    const question = item.querySelector("h3").textContent.toLowerCase();
    const answer = item.querySelector(".faq-answer").textContent.toLowerCase();

    if (question.includes(searchTerm) || answer.includes(searchTerm)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
});

// Set current year automatically
document.getElementById("current-year").textContent = new Date().getFullYear();

//Show Answer Function
function toggleAccordion(clickedHeader) {
  const allItems = document.querySelectorAll(".faq-item");

  allItems.forEach((item) => {
    const answer = item.querySelector(".faq-answer");
    const icon = item.querySelector(".rotate-icon");

    if (item.contains(clickedHeader)) {
      //Toggle the clicked answer
      answer.classList.toggle("hidden");
      icon.classList.toggle("rotate-180");
    } else {
      //Hidden other answers
      answer.classList.add("hidden");
      icon.classList.remove("rotate-180");
    }
  });
}
