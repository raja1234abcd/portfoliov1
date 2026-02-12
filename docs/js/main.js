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
const API_URL = "https://portfoliov1-backend.onrender.com/api/contact";

const contactForm = document.getElementById("contact-form");
const status = document.getElementById("form-status");
const statusText = status.querySelector(".status-text");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const button = contactForm.querySelector("button");
    const buttonText = button.querySelector(".btn-text");

    // 🔄 START loading
    button.classList.add("loading");
    button.disabled = true;
    buttonText.textContent = "Sending...";
    // Sending
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

      // ✅ SUCCESS
      status.className = "success";
      statusText.textContent = "Message sent successfully!";

      contactForm.reset();
    } catch (error) {
      contactForm.classList.add("shake");

      setTimeout(() => {
        contactForm.classList.remove("shake");
      }, 400);

      // ❌ ERROR
      status.className = "error";
      statusText.textContent = "Failed to send message.";
    } finally {
      // 🛑 STOP loading
      button.classList.remove("loading");
      button.disabled = false;
      buttonText.textContent = "Send Message";
    }
  });
}
