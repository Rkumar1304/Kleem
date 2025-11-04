document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("form-status");

  // 🧩 Allow only numbers in phone input
  const phoneInput = form.querySelector('input[type="tel"]');
  if (phoneInput) {
    phoneInput.addEventListener("input", (e) => {
      e.target.value = e.target.value.replace(/\D/g, ""); 
    });
  }

  // 🔥 Real-time validation
  form.querySelectorAll("input[required], textarea[required]").forEach((field) => {
    field.addEventListener("input", () => validateField(field));
  });

  // 🚀 Handle form submit
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let isValid = true;

    const fields = form.querySelectorAll("input[required], textarea[required]");
    fields.forEach((field) => {
      if (!validateField(field)) {
        isValid = false;
      }
    });

    if (!isValid) {
      showStatus("⚠️ Please fix the errors above.", "red");
      return;
    }

    // ✅ If valid, send form data
    showStatus("⏳ Submitting...", "black");

    try {
      await fetch("https://script.google.com/macros/s/AKfycbykpWYL27lmWNYLqnfLZnS0vADStxvaCR0yyGAz1sCYUTpZeNhcyhHg0M4_7mkBU75G/exec", {
        method: "POST",
        mode: "no-cors",
        body: new FormData(form),
      });

      showStatus("✅ Message sent successfully!", "green");
      form.reset();
      form.querySelectorAll(".form-group").forEach((fg) => fg.classList.remove("invalid"));
    } catch (err) {
      console.error("Fetch error:", err);
      showStatus("❌ Failed to send. Please try again.", "red");
    }
  });

  // 🧠 Validation functions
  function validateField(field) {
    const formGroup = field.parentElement;
    const error = formGroup.querySelector(".error");
    formGroup.classList.remove("invalid");
    if (error) error.textContent = "";

    if (!field.value.trim()) {
      if (error) error.textContent = "This field is required";
      formGroup.classList.add("invalid");
      return false;
    }

    if (field.type === "email" && !validateEmail(field.value)) {
      if (error) error.textContent = "Please enter a valid email address";
      formGroup.classList.add("invalid");
      return false;
    }

    if (field.type === "tel" && !validatePhone(field.value)) {
      if (error) error.textContent = "Please enter a valid phone number";
      formGroup.classList.add("invalid");
      return false;
    }

    return true;
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validatePhone(phone) {
    return /^[0-9]{7,15}$/.test(phone);
  }

  // 🕓 Utility: show + auto-hide status message
  function showStatus(message, color) {
    status.textContent = message;
    status.style.color = color;
    status.style.opacity = "1";

    // Hide after 5 seconds
    clearTimeout(status._timeout);
    status._timeout = setTimeout(() => {
      status.style.transition = "opacity 0.5s ease";
      status.style.opacity = "0";
    }, 5000);
  }
});

