const template = document.createElement("template");
template.innerHTML = `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    
    :host {
      font-family: 'Inter', sans-serif;
    }

    .origin-left { --underline-origin: left; }
    .origin-center { --underline-origin: center; }
    .origin-right { --underline-origin: right; }

    .header {
      position: fixed;
      top: 0;
      left: 0;
      width: 90vw;
      padding: 0 5%;
      background-color: #ffffff;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      z-index: 1001;
      box-shadow: 2px 2px 6px rgba(0,0,0,0.2);
    }

    .top-bar {
  width: 100%;
  background-color: #ffffff; /* Changed from blue */
  color: #1E488F;             /* Set to brand color or gray */
  padding: 0.5rem 0;
  display: centre;
  justify-content: center;   /* Center the contact text */
  align-items: center;
  border-bottom: 1px solid #d1d5db; /* Light gray line */
}
.scrolling-text {
  white-space: normal;
  overflow: visible;
  animation: none;
  font-weight: 500;
  text-align: center; 
  width: 100%;        
}


    @keyframes scrollText {
      0% { transform: translateX(100%); }
      100% { transform: translateX(-100%); }
    }

    .social-icons {
  display: flex;
  gap: 1rem;
  margin-left: auto;
  padding-right: 1rem;
  justify-content: flex-end;
  align-items: center;
}

    .social-icons a {
      color: #1E488F;
      text-decoration: none;
      font-size: 1rem;
      transition: color 0.3s ease;
    }

    .social-icons a:hover {
      color: #1E488F;
    }

    .main-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 0;
      width: 100%;
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
      font-family: 'Inter', sans-serif;
      position: relative;
      --underline-origin: left;
      font-weight: 500;
    }

    .nav a:hover,
    .nav button:hover {
      color: #163875;
    }

    .nav a::after,
    .nav button::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      height: 2px;
      width: 100%;
      background-color: #163875;
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
      color: #163875;
      text-decoration: none;
      white-space: nowrap;
      position: relative;
      --underline-origin: left;
      font-family: 'Inter', sans-serif;
    }

    .dropdown-menu a::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      height: 2px;
      width: 100%;
      background-color: #163875;
      transform: scaleX(0);
      transform-origin: var(--underline-origin);
      transition: transform 0.3s ease;
    }

    .dropdown-menu a:hover {
      background-color: #163875;
      color: #ffff;
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
      font-weight: 600;
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
      position: fixed;
      top: 15px;
      right: 0;
      width: 50%;
      height: 100vh;
      padding-top: 1rem;
      background-color: #ffffff;
      box-shadow: -4px 0px 10px rgba(0,0,0,0.1);
      z-index: 999;
      padding: 7rem 2rem 2rem;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      transform: translateX(100%);
      transition: transform 0.3s ease-in-out;
    }
    .mobile-menu.show {
      transform: translateX(0);
    }

    .mobile-menu a,
    .mobile-menu button {
      color: #1E488F;
      text-align: left;
      text-decoration: none;
      width: 200px;
      font-family: 'Inter', sans-serif;
    }

    .mobile-menu button {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 1rem;
      width: 200px;
      padding: 0.5rem 0;
      position: relative;
      font-weight: 500;
    }

    .mobile-menu a:hover,
    .mobile-menu button:hover {
      color: #163875;
    }

    #contact-cta-mobile-menu {
      background-color: #163875;
      color: #fff;
      padding: 0.5rem 1rem;
      border-radius: 5px;
      width: 80%;
      text-align: left;
      display: block;
      margin-top: 1rem;
      font-weight: 600;
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
      .social-icons {
        display: none;
      }
      .mobile-social-icons {
        display: flex;
        gap: 1rem;
        margin-top: 2rem;
      }
    }

    @media (min-width: 769px) {
      .mobile-social-icons {
        display: none;
      }
    }
  </style>

  <header class="header">
    <div class="top-bar">
      <div class="scrolling-text"><strong>HOTLINE:</strong> +260 761 197 777</div>
      <div class="social-icons">
        <a href="https://twitter.com" target="_blank" aria-label="Twitter">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
          </svg>
        </a>
        <a href="https://facebook.com" target="_blank" aria-label="Facebook">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
          </svg>
        </a>
        <a href="https://instagram.com" target="_blank" aria-label="Instagram">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
          </svg>
        </a>
      </div>
    </div>

    <div class="main-header">
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
    
    <div class="mobile-social-icons">
      <a href="https://twitter.com" target="_blank" aria-label="Twitter">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#1E488F">
          <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
        </svg>
      </a>
      <a href="https://facebook.com" target="_blank" aria-label="Facebook">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#1E488F">
          <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
        </svg>
      </a>
      <a href="https://instagram.com" target="_blank" aria-label="Instagram">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#1E488F">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
        </svg>
      </a>
    </div>
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