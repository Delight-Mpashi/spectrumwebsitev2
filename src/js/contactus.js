// Contact Us JavaScript Code
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

// FAQ accordion
document.querySelectorAll(".faq-item").forEach((item) => {
  item.addEventListener("click", () => {
    const faqId = item.getAttribute("data-faq");
    const answer = document.querySelector(
      `.faq-answer[data-answer="${faqId}"]`
    );
    const icon = item.querySelector(".faq-icon");

    // Close all other FAQs
    document.querySelectorAll(".faq-answer").forEach((ans) => {
      if (ans !== answer) {
        ans.classList.remove("open");
        ans.previousElementSibling.classList.remove("open");
      }
    });

    // Toggle current FAQ
    answer.classList.toggle("open");
    item.classList.toggle("open");
  });
});

// Set current year
document.getElementById("current-year").textContent = new Date().getFullYear();

// Page visibility handler (replaces unload)
document.addEventListener("visibilitychange", function () {
  if (document.visibilityState === "hidden") {
    // Perform any cleanup needed when page becomes hidden
  }
});

// Form submission with proper consent validation
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Validate consent
  const consentCheckbox = document.getElementById("consent");
  if (!consentCheckbox.checked) {
    alert("Please agree to the Privacy Policy before submitting");
    consentCheckbox.focus();
    return false;
  }

  // If consent is given, proceed with form submission
  alert("Thank you for your message! We will contact you shortly.");
  e.target.reset();
  return true;
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});
