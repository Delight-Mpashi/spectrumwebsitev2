// Mobile menu toggle
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
const closeMobileMenu = document.getElementById("close-mobile-menu");
const desktopProductsToggle = document.getElementById(
  "desktop-products-toggle"
);
const desktopProductsMenu = document.getElementById("desktop-products-menu");
const mobileProductsToggle = document.getElementById("mobile-products-toggle");
const mobileProductsMenu = document.getElementById("mobile-products-menu");
const mainHeader = document.getElementById("main-header");

mobileMenuButton.addEventListener("click", () => {
  const isOpen = mobileMenuButton.classList.toggle("open");
  mobileMenu.classList.toggle("open");
  document.body.style.overflow = isOpen ? "hidden" : "auto";
  mobileMenuButton.setAttribute("aria-expanded", isOpen);
});

closeMobileMenu.addEventListener("click", () => {
  mobileMenuButton.classList.remove("open");
  mobileMenu.classList.remove("open");
  document.body.style.overflow = "auto";
  mobileMenuButton.setAttribute("aria-expanded", "false");
});

// Desktop products dropdown ARIA
if (desktopProductsToggle && desktopProductsMenu) {
  desktopProductsToggle.addEventListener("click", () => {
    const isExpanded =
      desktopProductsToggle.getAttribute("aria-expanded") === "true";
    desktopProductsToggle.setAttribute("aria-expanded", !isExpanded);
    desktopProductsMenu.classList.toggle("hidden");
  });

  // Close dropdown if clicking outside
  document.addEventListener("click", (event) => {
    if (
      !desktopProductsToggle.contains(event.target) &&
      !desktopProductsMenu.contains(event.target)
    ) {
      desktopProductsToggle.setAttribute("aria-expanded", "false");
      desktopProductsMenu.classList.add("hidden");
    }
  });
}

// Mobile products dropdown toggle ARIA
if (mobileProductsToggle && mobileProductsMenu) {
  mobileProductsToggle.addEventListener("click", () => {
    const isExpanded = mobileProductsMenu.classList.toggle("hidden");
    mobileProductsToggle.setAttribute("aria-expanded", !isExpanded);
  });
}

// Set current year
document.getElementById("current-year").textContent = new Date().getFullYear();

// Back to top button
const backToTopButton = document.getElementById("back-to-top");

window.onscroll = function () {
  if (
    document.body.scrollTop > 300 ||
    document.documentElement.scrollTop > 300
  ) {
    backToTopButton.style.display = "flex";
  } else {
    backToTopButton.style.display = "none";
  }
};

function topFunction() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Policy acceptance toggle
const policyCheckbox = document.getElementById("policy-acceptance");
const acceptButton = document.getElementById("accept-button");
const originalButtonText = acceptButton.textContent;

policyCheckbox.addEventListener("change", function () {
  if (this.checked) {
    acceptButton.disabled = false;
    acceptButton.classList.remove("bg-gray-400", "cursor-not-allowed");
    acceptButton.classList.add("bg-blue-600", "hover:bg-blue-700");
  } else {
    acceptButton.disabled = true;
    acceptButton.classList.add("bg-gray-400", "cursor-not-allowed");
    acceptButton.classList.remove("bg-blue-600", "hover:bg-blue-700");
    acceptButton.textContent = originalButtonText; // Reset text if unchecked
  }
});

acceptButton.addEventListener("click", function () {
  if (!acceptButton.disabled) {
    acceptButton.textContent = "Policy Acknowledged!";
    // Optional: Revert text after a few seconds
    setTimeout(() => {
      if (policyCheckbox.checked) {
        // Only revert if still checked
        acceptButton.textContent = originalButtonText;
      }
    }, 3000);
    // In a real application, you would record this acceptance via an API call
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const target = document.querySelector(targetId);

    if (target) {
      const headerOffset = mainHeader ? mainHeader.offsetHeight : 0; // Dynamically get header height
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // For mobile menu, close it after clicking a link
      if (mobileMenu.classList.contains("open")) {
        mobileMenuButton.classList.remove("open");
        mobileMenu.classList.remove("open");
        document.body.style.overflow = "auto";
        mobileMenuButton.setAttribute("aria-expanded", "false");
      }
    }
  });
});
