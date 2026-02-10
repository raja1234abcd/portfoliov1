console.log("✅ main.js is running");

document.documentElement.classList.remove("no-js");

document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll(".reveal");

  if (!reveals.length) {
    console.warn("⚠️ No reveal elements found");
    return;
  }

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
});

// ================= CONTACT FORM =================

// Auto-switch API based on environment
const API_URL =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://localhost:5000/api/contact"
    : "https://YOUR-BACKEND.onrender.com/api/contact";

const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const button = contactForm.querySelector("button");
    button.disabled = true;
    button.textContent = "Sending...";

    const formData = {
      name: contactForm.name.value.trim(),
      email: contactForm.email.value.trim(),
      message: contactForm.message.value.trim()
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      alert("✅ Message sent successfully!");
      contactForm.reset();

    } catch (error) {
      alert("❌ Failed to send message. Please try again.");
      console.error(error);

    } finally {
      button.disabled = false;
      button.textContent = "Send Message";
    }
  });
}
