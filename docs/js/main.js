console.log("✅ main.js is running");

document.addEventListener("DOMContentLoaded", () => {
  // ================= THEME =================

  const themeToggle = document.getElementById("theme-toggle");
  const prefersLight = window.matchMedia(
    "(prefers-color-scheme: light)",
  ).matches;
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  } else if (prefersLight) {
    document.documentElement.setAttribute("data-theme", "light");
  }

  if (themeToggle) {
    const icon = themeToggle.querySelector(".theme-icon");

    const updateIcon = () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      icon.textContent = currentTheme === "light" ? "☀️" : "🌙";
    };

    updateIcon();

    themeToggle.addEventListener("click", () => {
      // Add cinematic transition
      document.documentElement.classList.add("theme-transition");

      // Animate icon
      themeToggle.classList.add("animating");

      setTimeout(() => {
        const currentTheme =
          document.documentElement.getAttribute("data-theme");

        if (currentTheme === "light") {
          document.documentElement.removeAttribute("data-theme");
          localStorage.setItem("theme", "dark");
        } else {
          document.documentElement.setAttribute("data-theme", "light");
          localStorage.setItem("theme", "light");
        }

        updateIcon();

        themeToggle.classList.remove("animating");

        setTimeout(() => {
          document.documentElement.classList.remove("theme-transition");
        }, 300);
      }, 200);
    });
  }

  // ================= REVEAL =================

  const reveals = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  reveals.forEach((el) => observer.observe(el));

  // ================= CONTACT FORM =================

  const API_URL = "https://portfoliov1-backend.onrender.com/api/contact";

  const contactForm = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  if (contactForm && status) {
    const statusText = status.querySelector(".status-text");

    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const button = contactForm.querySelector("button");
      const buttonText = button.querySelector(".btn-text");

      button.classList.add("loading");
      button.disabled = true;
      buttonText.textContent = "Sending...";

      status.className = "muted";
      statusText.textContent = "Sending...";

      const formData = {
        name: contactForm.name.value.trim(),
        email: contactForm.email.value.trim(),
        message: contactForm.message.value.trim(),
      };

      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message);

        status.className = "success";
        statusText.textContent = "Message sent successfully!";
        contactForm.reset();
      } catch (error) {
        contactForm.classList.add("shake");
        setTimeout(() => contactForm.classList.remove("shake"), 400);

        status.className = "error";
        statusText.textContent = "Failed to send message.";
      } finally {
        button.classList.remove("loading");
        button.disabled = false;
        buttonText.textContent = "Send Message";
      }
    });
  }
  // ================= NAV ACTIVE LINK =================

  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav ul li a");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.clientHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
  // ================= MOBILE MENU =================

  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.querySelector(".nav-links");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("open");
    });

    // Close menu when link clicked
    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
      });
    });
  }
});
