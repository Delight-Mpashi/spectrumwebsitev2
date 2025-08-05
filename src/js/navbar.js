const template = document.createElement("template");
template.innerHTML = `
  <style>
    :host {
      // all: initial;
      // box-sizing: border-box;
      // font-family: 'Segoe UI', sans-serif;
      // display: block;
      // margin: 0;
      // padding: 0;
    }

    .origin-left { --underline-origin: left; }
    .origin-center { --underline-origin: center; }
    .origin-right { --underline-origin: right; }

    .header {
      position: fixed;
      top: 0;
      left: 0;
      width: 90vw;
      padding: 1rem 5%;
      background-color: #ffffff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 1001;
      box-shadow: 2px 2px 6px rgba(0,0,0,0.2);
    }

    .logo-container {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .logo-container img {
      height: 40px;
      width: auto;
    }

    .logo-text {
      font-size: 1.5rem;
      color: #1E488F;
      text-decoration: none;
      font-weight: bold;
    }

    .nav {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }

    .nav a,
    .nav button {
      font-size: 1rem;
      color: #1E488F;
      background: none;
      border: none;
      cursor: pointer;
      text-decoration: none;
      padding: 0.5rem 0;
      font-family: inherit;
      position: relative;
      --underline-origin: left;
    }

    .nav a:hover,
    .nav button:hover {
      color: #00bcd4;
    }

    .nav a::after,
    .nav button::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      height: 2px;
      width: 100%;
      background-color: #0087ca;
      transform: scaleX(0);
      transform-origin: var(--underline-origin);
      transition: transform 0.3s ease;
    }

    .nav a:hover::after,
    .nav button:hover::after {
      transform: scaleX(1);
    }

    .dropdown {
      position: relative;
    }

    .dropdown-menu {
      display: none;
      position: absolute;
      top: 2.5rem;
      left: 0;
      background-color: #ffffff;
      box-shadow: 4px 4px 10px rgba(0,0,0,0.2);
      border-radius: 5px;
      overflow: hidden;
      z-index: 1001;
      min-width: 180px;
    }

    .dropdown-menu a {
      display: block;
      padding: 0.75rem 1rem;
      color: #2563EB;
      text-decoration: none;
      white-space: nowrap;
      position: relative;
      --underline-origin: left;
    }

    .dropdown-menu a::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      height: 2px;
      width: 100%;
      background-color: #0087ca;
      transform: scaleX(0);
      transform-origin: var(--underline-origin);
      transition: transform 0.3s ease;
    }

    .dropdown-menu a:hover {
      background-color: #00bcd4;
      color: #000;
    }

    .dropdown-menu a:hover::after {
      transform: scaleX(1);
    }

    .dropdown:hover .dropdown-menu {
      display: block;
    }

    #contact-cta {
      background-color: #163875;
      color: #fff;
      padding: 0.5rem 1rem;
      border-radius: 5px;
      display: inline-block;
      align-items: center;
    }

    /* Hamburger Styles */  
    .hamburger {
      display: none;
      flex-direction: column;
      cursor: pointer;
      gap: 4px;
    }
    .hamburger .bar {
      width: 25px;
      height: 3px;
      background-color: #1E488F;
      border-radius: 2px;
      transition: 0.3s ease;
    }


    .hamburger.active .top {
      transform: rotate(45deg) translate(5px, 5px);
    }

    .hamburger.active .middle {
      opacity: 0;
    }

    .hamburger.active .bottom {
      transform: rotate(-45deg) translate(6px, -6px);
    }

    /* Mobile Menu Styles */
    .mobile-menu {
      position: fixed; /* Changed to fixed overlay */
      top: 0;
      right: 0;
      width: 50%; /* Or your desired width */
      height: 100vh;
      background-color: #ffffff;
      box-shadow: -4px 0px 10px rgba(0,0,0,0.1);
      z-index: 999; /* Below the header */
      padding: 6rem 2rem 2rem; /* Add padding to clear header */

      display: flex; /* Always flex */
      flex-direction: column;
      gap: 1.5rem;

      transform: translateX(100%); /* Hide it off-screen */
      transition: transform 0.3s ease-in-out;
    }
    .mobile-menu.show {
      transform: translateX(0); /* Slide it into view */
    }

    .mobile-menu a,
    .mobile-menu button {
      color: #1E488F;
      text-align: left;
      text-decoration: none;
      width: 200px;
    }

    .mobile-menu button {
      background: none;
      border: none;
      cursor: pointer;
      font-family: inherit;
      font-size: 1rem;
      width: 200px; /* Adjusted for mobile */
      padding: 0.5rem 0;
      position: relative;
    }

    .mobile-menu a:hover,
    .mobile-menu button:hover {
      color: #00bcd4;
    }

    #contact-cta-mobile-menu {
      background-color: #163875;
      color: #fff;
      padding: 0.5rem 1rem;
      border-radius: 5px;
      align-items: center;
      width: 80%;
      text-align: left;
      display: block;
      marign-right: 20;
    }

    .mobile-dropdown-menu {
      display: none;
      flex-direction: column;
      background-color: #ffffff;
      border-radius: 5px;
      margin-left: 1rem;
      margin-top: 0.5rem;
    }

    .mobile-dropdown.open .mobile-dropdown-menu {
      display: flex;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .nav {
        display: none;
      }
      .hamburger {
        display: flex;
      }
      .mobile-menu.show {
        display: flex;
      }
    }
  </style>

  <header class="header">
    <div class="logo-container">
      <a href="/" class="logo-text">
        <img src="/assets/images/sclogo.png" alt="Logo" />
      </a>
    </div>

    <div class="nav">
      <a href="/">Home</a>
      <a href="/about">About</a>
      <div class="dropdown">
        <button>Products ▾</button>
        <div class="dropdown-menu">
          <a href="/loan/civil-servant">Civil Servant Loan</a>
          <a href="/loan/asset-secured">Asset Secured Loan</a>
        </div>
      </div>
      <a id="contact-cta" href="/contact">Contact Us</a>
    </div>

    <div class="hamburger" id="hamburger">
      <div class="bar top"></div>
      <div class="bar middle"></div>
      <div class="bar bottom"></div>
    </div>

  </header>

  <div class="mobile-menu" id="mobileMenu">
    <a href="/">Home</a>
    <a href="/about">About</a>
    <div class="mobile-dropdown" id="mobileDropdown">
      <button id="mobileDropdownBtn">Products ▾</button>
      <div class="mobile-dropdown-menu" id="mobileDropdownMenu">
        <a href="/loan/civil-servant">Civil Servant Loan</a>
        <a href="/loan/asset-secured">Asset Secured Loan</a>
      </div>
    </div>
    <a id="contact-cta-mobile-menu" href="/contact">Contact Us</a>
  </div>
`;

class NavBar extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(template.content.cloneNode(true));

    // Hamburger toggle
    shadow.querySelector("#hamburger").addEventListener("click", () => {
      shadow.querySelector("#mobileMenu").classList.toggle("show");
      shadow.querySelector("#hamburger").classList.toggle("active");
    });

    // Mobile dropdown toggle
    shadow.querySelector("#mobileDropdownBtn").addEventListener("click", () => {
      shadow.querySelector("#mobileDropdown").classList.toggle("open");
    });

    // Assign underline origin dynamically
    const navLinks = shadow.querySelectorAll(".nav a");
    const navButtons = shadow.querySelectorAll(".nav button");
    const total = navLinks.length;

    navLinks.forEach((el, index) => {
      if (index === 0) {
        el.classList.add("origin-left");
      } else if (index === total - 1) {
        el.classList.add("origin-right");
      } else {
        el.classList.add("origin-center");
      }
    });

    if (navButtons.length) {
      navButtons.forEach((btn) => btn.classList.add("origin-center"));
    }
  }
}

customElements.define("nav-bar", NavBar);
