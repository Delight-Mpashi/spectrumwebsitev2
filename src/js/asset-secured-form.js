document.addEventListener("DOMContentLoaded", function () {
  // Show the whitebook prompt when the page loads
  const whitebookPrompt = document.getElementById("whitebookPrompt");
  if (whitebookPrompt) {
    whitebookPrompt.style.display = "flex";
  }

  // Mobile menu toggle functionality
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      mobileMenuButton.classList.toggle("open");
      mobileMenu.classList.toggle("open");
      // Disable scrolling when menu is open
      document.body.style.overflow = mobileMenu.classList.contains("open")
        ? "hidden"
        : "auto";
    });

    // Close mobile menu button
    const closeMobileMenu = document.getElementById("close-mobile-menu");
    if (closeMobileMenu) {
      closeMobileMenu.addEventListener("click", () => {
        mobileMenuButton.classList.remove("open");
        mobileMenu.classList.remove("open");
        document.body.style.overflow = "auto"; // Re-enable scrolling
      });
    }

    // Mobile products dropdown toggle
    const mobileProductsToggle = document.getElementById(
      "mobile-products-toggle"
    );
    const mobileProductsMenu = document.getElementById("mobile-products-menu");

    if (mobileProductsToggle && mobileProductsMenu) {
      mobileProductsToggle.addEventListener("click", () => {
        mobileProductsMenu.classList.toggle("hidden");
        const icon = mobileProductsToggle.querySelector("i");
        if (icon) {
          icon.classList.toggle("fa-chevron-down");
          icon.classList.toggle("fa-chevron-up");
        }
      });
    }
  }

  // Whitebook prompt 'Yes' and 'No' button handling
  const promptYes = document.getElementById("promptYes");
  const promptNo = document.getElementById("promptNo");
  const assetSecuredForm = document.getElementById("assetSecuredForm");

  if (promptYes && promptNo && assetSecuredForm) {
    // If 'Yes' is clicked, hide prompt and show the form
    promptYes.addEventListener("click", () => {
      whitebookPrompt.style.display = "none";
      assetSecuredForm.classList.add("active");
    });

    // If 'No' is clicked, show an alert
    promptNo.addEventListener("click", () => {
      alert("You need a registered white book to apply for this loan.");
    });
  }

  // NRC input formatting (adds slashes automatically)
  const nrcInput = document.getElementById("nrc");
  if (nrcInput) {
    nrcInput.addEventListener("input", function (e) {
      let value = e.target.value.replace(/\D/g, ""); // Remove non-digits

      if (value.length > 6) {
        value = value.substring(0, 6) + "/" + value.substring(6);
      }
      if (value.length > 9) {
        value = value.substring(0, 9) + "/" + value.substring(9);
      }
      if (value.length > 11) {
        value = value.substring(0, 11); // Limit total length
      }

      e.target.value = value;
    });
  }

  // Phone number input validation (ensures only digits and max 9 length)
  const phoneNumberInput = document.getElementById("phoneNumber");
  if (phoneNumberInput) {
    phoneNumberInput.addEventListener("input", function (e) {
      // Remove any non-digit characters
      let value = e.target.value.replace(/\D/g, "");
      // Limit to 9 digits
      if (value.length > 9) {
        value = value.substring(0, 9);
      }
      e.target.value = value;
    });
  }

  // Form submission logic
  const submitButton = document.getElementById("submitApplication");
  if (submitButton) {
    submitButton.addEventListener("click", function () {
      // Define required fields for validation
      const requiredFields = [
        "firstName",
        "lastName",
        "nrc",
        "phoneNumber",
        "vehicleMake",
        "vehicleModel",
        "vehicleYear",
      ];
      let isValid = true;

      // Validate each required field
      requiredFields.forEach((fieldId) => {
        const field = document.getElementById(fieldId);
        if (field && !field.value.trim()) {
          field.classList.add("border-red-500"); // Add error border
          isValid = false;
        } else if (field) {
          field.classList.remove("border-red-500"); // Remove error border if valid
        }
      });

      // Validate NRC format
      const nrcInput = document.getElementById("nrc");
      const nrcValue = nrcInput.value.trim();
      const nrcPattern = /^\d{6}\/\d{2}\/\d{1}$/;
      if (!nrcPattern.test(nrcValue)) {
        nrcInput.classList.add("border-red-500"); // Add error border
        alert("Please enter a valid NRC number in the format 000000/00/1");
        isValid = false;
      } else {
        nrcInput.classList.remove("border-red-500"); // Remove error border if valid
      }

      // Validate phone number
      const phoneInput = document.getElementById("phoneNumber");
      const phoneValue = phoneInput.value.trim();
      if (phoneValue.length !== 9 || !/^\d+$/.test(phoneValue)) {
        phoneInput.classList.add("border-red-500"); // Add error border
        alert("Please enter a valid 9-digit phone number");
        isValid = false;
      } else {
        phoneInput.classList.remove("border-red-500"); // Remove error border if valid
      }

      // Validate consent checkbox
      const consentCheckbox = document.getElementById("consent");
      if (consentCheckbox && !consentCheckbox.checked) {
        alert("Please consent to information usage to proceed");
        isValid = false;
      }

      if (isValid) {
        // Collect all form data (for demonstration purposes, would typically be sent to a server)
        const formData = {
          firstName: document.getElementById("firstName").value,
          lastName: document.getElementById("lastName").value,
          nrc: document.getElementById("nrc").value,
          phoneNumber: "+260" + document.getElementById("phoneNumber").value,
          vehicleMake: document.getElementById("vehicleMake").value,
          vehicleModel: document.getElementById("vehicleModel").value,
          vehicleYear: document.getElementById("vehicleYear").value,
          consent: document.getElementById("consent").checked,
        };

        console.log("Form data:", formData); // Log data to console
        alert(
          "Application submitted successfully! We will contact you shortly."
        );

        // Optionally, reset the form after successful submission
        document.getElementById("firstName").value = "";
        document.getElementById("lastName").value = "";
        document.getElementById("nrc").value = "";
        document.getElementById("phoneNumber").value = "";
        document.getElementById("vehicleMake").value = "";
        document.getElementById("vehicleModel").value = "";
        document.getElementById("vehicleYear").value = "";
        document.getElementById("consent").checked = false;
      } else {
        alert("Please fill in all required fields and correct any errors."); // General alert for validation failures
      }
    });
  }

  // Set current year in the footer dynamically
  document.getElementById("current-year").textContent =
    new Date().getFullYear();
});
