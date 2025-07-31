// Mobile menu toggle
const mobileMenuButton = document.getElementById("mobile-menu-button");
const closeMobileMenu = document.getElementById("close-mobile-menu");
const mobileMenu = document.getElementById("mobile-menu");
const mobileProductsToggle = document.getElementById("mobile-products-toggle");
const mobileProductsMenu = document.getElementById("mobile-products-menu");

mobileMenuButton.addEventListener("click", () => {
  mobileMenuButton.classList.toggle("open");
  mobileMenu.classList.toggle("open");
  document.body.style.overflow = "hidden";
});

closeMobileMenu.addEventListener("click", () => {
  mobileMenuButton.classList.remove("open");
  mobileMenu.classList.remove("open");
  document.body.style.overflow = "";
});

mobileProductsToggle.addEventListener("click", () => {
  mobileProductsMenu.classList.toggle("hidden");
});

// Set current year in footer
document.getElementById("current-year").textContent = new Date().getFullYear();

// Form submission
document
  .getElementById("grievanceForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Validate required fields
    const requiredFields = this.querySelectorAll("[required]");
    let isValid = true;

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        field.classList.add("border-red-500");
        isValid = false;
      } else {
        field.classList.remove("border-red-500");
      }
    });

    if (!isValid) {
      alert("Please fill in all required fields.");
      return;
    }

    // Here you would typically send the form data to your server
    alert(
      "Thank you for submitting your grievance. We will respond within the specified timeframe."
    );
    this.reset();

    // For actual implementation, you would use fetch or AJAX:
    /*
            const formData = new FormData(this);
            fetch('/submit-grievance', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Thank you for submitting your grievance. We will respond within the specified timeframe.');
                    this.reset();
                } else {
                    alert('There was an error submitting your grievance. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error submitting your grievance. Please try again.');
            });
            */
  });

// Toggle corrective action details based on radio selection
document
  .querySelectorAll('input[name="correctiveActionTaken"]')
  .forEach((radio) => {
    radio.addEventListener("change", function () {
      const detailsField = document.getElementById("correctiveActionDetails");
      if (this.value === "yes") {
        detailsField.required = true;
      } else {
        detailsField.required = false;
      }
    });
  });
