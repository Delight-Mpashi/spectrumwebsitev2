// Mobile menu toggle functionality
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
    : "auto"; /* Disable scrolling when menu is open */
});

closeMobileMenu.addEventListener("click", () => {
  mobileMenuButton.classList.remove("open");
  mobileMenu.classList.remove("open");
  document.body.style.overflow = "auto"; /* Re-enable scrolling */
});

mobileProductsToggle.addEventListener("click", () => {
  mobileProductsMenu.classList.toggle("hidden");
  mobileProductsToggle.querySelector("i").classList.toggle("fa-chevron-down");
  mobileProductsToggle.querySelector("i").classList.toggle("fa-chevron-up");
});

// Form navigation logic (Next to Page 2)
document.getElementById("nextToPage2").addEventListener("click", function () {
  // Check if consent checkbox is checked
  if (document.getElementById("consent").checked) {
    // Validate NRC format
    const nrcInput = document.getElementById("nrc");
    const nrcValue = nrcInput.value.trim();
    const nrcPattern = /^\d{6}\/\d{2}\/\d{1}$/;

    if (!nrcPattern.test(nrcValue)) {
      nrcInput.classList.add("border-red-500"); // Add error border
      alert("Please enter a valid NRC number in the format 000000/00/1");
      return; // Stop function if validation fails
    } else {
      nrcInput.classList.remove("border-red-500"); // Remove error border if valid
    }

    // Validate phone number
    const phoneInput = document.getElementById("phoneNumber");
    const phoneValue = phoneInput.value.trim();
    if (phoneValue.length !== 9 || !/^\d+$/.test(phoneValue)) {
      phoneInput.classList.add("border-red-500"); // Add error border
      alert("Please enter a valid 9-digit phone number");
      return; // Stop function if validation fails
    } else {
      phoneInput.classList.remove("border-red-500"); // Remove error border if valid
    }

    // Proceed to page 2 if validations pass
    document.getElementById("page1").classList.remove("active");
    document.getElementById("page2").classList.add("active");

    // Update progress steps visual indicators
    document.querySelectorAll(".progress-step")[0].classList.add("completed");
    document.querySelectorAll(".progress-step")[1].classList.add("active");
  } else {
    alert("Please consent to information usage to proceed");
  }
});

// Form navigation logic (Back to Page 1)
document.getElementById("backToPage1").addEventListener("click", function () {
  document.getElementById("page2").classList.remove("active");
  document.getElementById("page1").classList.add("active");

  // Update progress steps visual indicators
  document.querySelectorAll(".progress-step")[1].classList.remove("active");
});

// NRC input formatting (adds slashes automatically)
document.getElementById("nrc").addEventListener("input", function (e) {
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

// Phone number input validation (ensures only digits and max 9 length)
document.getElementById("phoneNumber").addEventListener("input", function (e) {
  // Remove any non-digit characters
  let value = e.target.value.replace(/\D/g, "");
  // Limit to 9 digits
  if (value.length > 9) {
    value = value.substring(0, 9);
  }
  e.target.value = value;
});

// Loan calculation function
document.addEventListener("DOMContentLoaded", () => {
  const employeeNumberInput = document.getElementById("employeeNumber");
  const netPayInput = document.getElementById("netPay");
  const basicPayInput = document.getElementById("basicPay");
  const loanTermSlider = document.getElementById("loanTerm");
  const maxLoanAmountElement = document.getElementById("maxLoanAmount");
  const monthlyInstallmentElement =
    document.getElementById("monthlyInstallment");

  // ✅ Employee number validation: only digits, max 8 characters
  employeeNumberInput?.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/\D/g, "").slice(0, 8);
  });

  const flatRates = {
    6: 0.02409524,
    12: 0.02321884,
    24: 0.02392016,
    36: 0.0251091,
    48: 0.02634731,
    60: 0.02753518,
  };

  const FIXED_FEE = 0.0294;
  const MONTHLY_FEE = 0.0055;

  // Clean Employee Number input
  employeeNumberInput?.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/\D/g, "").slice(0, 8);
  });

  const formatCurrency = (amount) => {
    return `K${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  // PMEC affordability: Net - (40% of Basic) - 200
  const calculateAffordability = (netPay, basicPay) => {
    return netPay - basicPay * 0.4 - 200;
  };

  // Reverse Excel-style Loan Amount Formula
  const calculateLoanAmount = (affordability, months, flatRate) => {
    const numerator = affordability * months;
    const denominator =
      1 + flatRate * months + FIXED_FEE + MONTHLY_FEE * months;
    const loanAmount = numerator / denominator;
    return loanAmount / 1.15;
  };

  // Excel-style Installment Formula (O13)
  const calculateInstallment = (loanAmount, months, flatRate) => {
    const installment =
      loanAmount *
      1.15 *
      (1 / months + flatRate + FIXED_FEE / months + MONTHLY_FEE);
    return installment;
  };

  const updateLoanDetails = () => {
    const netPay = parseFloat(netPayInput.value) || 0;
    const basicPay = parseFloat(basicPayInput.value) || 0;
    const months = parseInt(loanTermSlider.value);

    if (netPay > 0 && basicPay > 0 && flatRates.hasOwnProperty(months)) {
      const flatRate = flatRates[months];
      const affordability = calculateAffordability(netPay, basicPay);

      const loanAmount = calculateLoanAmount(affordability, months, flatRate);
      const installment = calculateInstallment(loanAmount, months, flatRate);

      maxLoanAmountElement.textContent = formatCurrency(loanAmount);
      monthlyInstallmentElement.textContent = formatCurrency(installment);
    } else {
      maxLoanAmountElement.textContent = "K0.00";
      monthlyInstallmentElement.textContent = "K0.00";
    }
  };

  // Bind all events
  [netPayInput, basicPayInput, loanTermSlider].forEach((input) =>
    input.addEventListener("input", updateLoanDetails)
  );

  updateLoanDetails();
});

// Form submission logic (Submit Application)
document
  .getElementById("submitApplication")
  .addEventListener("click", function (e) {
    e.preventDefault();

    // Define required fields for Page 2
    const requiredFields = ["employeeNumber", "basicPay", "netPay"];
    let isValid = true;

    // Validate each required field
    requiredFields.forEach((fieldId) => {
      const field = document.getElementById(fieldId);
      if (!field.value.trim()) {
        field.classList.add("border-red-500");
        isValid = false;
      } else {
        field.classList.remove("border-red-500");
      }
    });

    // Validate final consent checkbox
    if (!document.getElementById("finalConsent").checked) {
      isValid = false;
      alert(
        "Please confirm that all information is accurate and agree to the terms"
      );
    }

    if (isValid) {
      // Get form values
      const formData = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        nrc: document.getElementById("nrc").value,
        phoneNumber: "+260" + document.getElementById("phoneNumber").value,
        referral: document.getElementById("referral").value,
        employeeNumber: document.getElementById("employeeNumber").value,
        basicPay: parseFloat(document.getElementById("basicPay").value) || 0,
        netPay: parseFloat(document.getElementById("netPay").value) || 0,
        loanTerm: document.getElementById("loanTerm").value,
        maxLoanAmount: document.getElementById("maxLoanAmount").textContent,
        monthlyInstallment:
          document.getElementById("monthlyInstallment").textContent,
        consent: document.getElementById("consent").checked,
        finalConsent: document.getElementById("finalConsent").checked,
      };

      console.log("Form submitted:", formData); // Log data to console

      // In a real application, you would send this data to your server
      alert(
        "Application submitted successfully! Our team will contact you shortly."
      );

      // Here you would typically redirect to a thank you page or reset the form
      // window.location.href = "/thank-you.html";
    } else {
      alert("Please fill in all required fields");
    }
  });

// Set current year in the footer dynamically
document.getElementById("current-year").textContent = new Date().getFullYear();
