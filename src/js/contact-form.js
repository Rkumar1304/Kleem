document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    const fields = form.querySelectorAll("input[required], textarea[required]");
    fields.forEach((field) => {
      if (!validateField(field)) {
        isValid = false;
      }
    });

    if (isValid) {
      alert("Message sent successfully!");
      form.reset();
      form.querySelectorAll(".form-group").forEach((fg) => fg.classList.remove("invalid"));
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
