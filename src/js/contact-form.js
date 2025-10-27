document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");

  // 🟢 Submit Handler
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let isValid = true;

    // Validate all required fields
    const fields = form.querySelectorAll("input[required], textarea[required]");
    fields.forEach((field) => {
      if (!validateField(field)) {
        isValid = false;
      }
    });

    // If validation fails, stop submission
    if (!isValid) return;

    // Prepare form data
    const formData = new FormData(form);

    try {
      // 📨 Send data to Google Apps Script Web App
      await fetch("https://script.google.com/macros/s/AKfycbwUoKrX_gPfEob8nOub2A0hwzVuHxUDRLvwvLWaltity_QQ00931vhkVBKLABShZJeb/exec", {
        method: "POST",
        mode: "no-cors", // ✅ required for Apps Script
        body: formData,
      });

      alert("✅ Message sent successfully!");
      form.reset();
      form.querySelectorAll(".form-group").forEach((fg) => fg.classList.remove("invalid"));
    } catch (err) {
      console.error("Fetch error:", err);
      alert("⚠️ Network error. Please try again.");
    }
  });

  // 🔥 Real-time validation
  form.querySelectorAll("input[required], textarea[required]").forEach((field) => {
    field.addEventListener("input", () => validateField(field));
  });

  // 🧩 Allow only numbers in phone input
  const phoneInput = form.querySelector('input[type="tel"]');
  phoneInput.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/\D/g, ""); 
  });

  // 🧠 Validation Functions
  function validateField(field) {
    const formGroup = field.parentElement;
    const error = formGroup.querySelector(".error");
    formGroup.classList.remove("invalid");
    error.textContent = "";

    if (!field.value.trim()) {
      error.textContent = "This field is required";
      formGroup.classList.add("invalid");
      return false;
    }

    if (field.type === "email" && !validateEmail(field.value)) {
      error.textContent = "Please enter a valid email address";
      formGroup.classList.add("invalid");
      return false;
    }

    if (field.type === "tel" && !validatePhone(field.value)) {
      error.textContent = "Please enter a valid phone number";
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
});