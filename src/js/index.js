document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu functionality
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileMenuOverlay = document.getElementById("mobile-menu-overlay");
  const closeMobileMenu = document.getElementById("close-mobile-menu");

  // Toggle mobile menu
  function toggleMobileMenu() {
    mobileMenuButton.classList.toggle("open");
    mobileMenu.classList.toggle("open");
    mobileMenuOverlay.classList.toggle("active");
    document.body.style.overflow = mobileMenu.classList.contains("open")
      ? "hidden"
      : "auto";
  }

  // Event listeners
  if (mobileMenuButton) {
    mobileMenuButton.addEventListener("click", toggleMobileMenu);
  }

  if (closeMobileMenu) {
    closeMobileMenu.addEventListener("click", toggleMobileMenu);
  }

  if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener("click", toggleMobileMenu);
  }

  // Mobile submenu toggle
  const mobileProductsToggle = document.getElementById(
    "mobile-products-toggle"
  );
  const mobileProductsMenu = document.getElementById("mobile-products-menu");
  const mobileProductsIcon = document.getElementById("mobile-products-icon");

  if (mobileProductsToggle && mobileProductsMenu) {
    mobileProductsToggle.addEventListener("click", () => {
      mobileProductsMenu.classList.toggle("hidden");
      mobileProductsIcon.classList.toggle("rotate-180");
    });
  }

  // Close mobile menu when clicking on a link (except products toggle)
  document.querySelectorAll("#mobile-menu a").forEach((link) => {
    if (!link.closest("#mobile-products-menu")) {
      link.addEventListener("click", toggleMobileMenu);
    }
  });

  // FAQ accordion
  document.querySelectorAll(".faq-item").forEach((item) => {
    item.addEventListener("click", () => {
      const faqId = item.getAttribute("data-faq");
      const answer = document.querySelector(
        `.faq-answer[data-answer="${faqId}"]`
      );
      if (!answer) return;

      // Close all other FAQ answers
      document.querySelectorAll(".faq-answer").forEach((ans) => {
        if (ans !== answer) {
          ans.classList.remove("open");
          ans.previousElementSibling?.classList.remove("open");
        }
      });

      // Toggle current FAQ answer
      answer.classList.toggle("open");
      item.classList.toggle("open");
    });
  });

  // Current year
  const yearSpan = document.getElementById("current-year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});

// Apply Now button functionality
document.addEventListener("DOMContentLoaded", function () {
  const applyNowBtn = document.getElementById("applyNowBtn");
  const loanModal = document.getElementById("loanModal");
  const closeModal = document.getElementById("closeModal");

  // Show modal when Apply Now is clicked
  applyNowBtn.addEventListener("click", function (e) {
    e.preventDefault();
    loanModal.classList.remove("hidden");
    document.body.style.overflow = "hidden"; // Prevent scrolling
  });

  // Close modal when X is clicked
  closeModal.addEventListener("click", function (e) {
    if (e.target === loanModal) {
      loanModal.classList.add("hidden");
      document.body.style.overflow = "auto";
    }
  });

  // Close modal when clicking outside
  loanModal.addEventListener("click", function (e) {
    if (e.target === loanModal) {
      loanModal.classList.add("hidden");
      document.body.style.overflow = "auto";
    }
  });
});
