import { getAuth, sendPasswordResetEmail } from "./firebase-config.js";

document.addEventListener("DOMContentLoaded", () => {
  const resetPassForm = document.getElementById("reset-pass-form");
  const formDesc = document.getElementById("form-desc");
  const verificationLoad = document.getElementById("verification-load");
  const errorLoginIdentifier = document.getElementById("error-loginIdentifier");

  async function handleFormSubmit(event) {
    event.preventDefault();

    // Validate the field
    validateField("loginIdentifier");

    const email = document.getElementById("loginIdentifier").value.trim();

    // Check if there are validation errors
    if (errorLoginIdentifier.textContent) {
      return; // Prevent form submission if there's an error
    }

    try {
      await sendPasswordResetEmail(getAuth(), email);
      // Show verification message and hide email input
      resetPassForm.classList.add("hide");
      formDesc.classList.add("hide");
      verificationLoad.classList.remove("hide");
    } catch (error) {
      // Handle Errors here.
      errorLoginIdentifier.textContent =
        "Error sending reset email: " + error.message;
    }
  }

  function validateField(fieldId) {
    let errors = {};
    const field = document.getElementById(fieldId);
    const value = field.value.trim();
    const errorElement = document.getElementById("error-" + fieldId);

    switch (fieldId) {
      case "loginIdentifier":
        if (!value) {
          errors.loginIdentifier = "გთხოვთ, შეიყვანოთ ელ. ფოსტა.";
        } else if (
          !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
        ) {
          errors.loginIdentifier = "ელ. ფოსტა არასწორია";
        }
        break;
      default:
        break;
    }

    // Update the error message element
    if (errorElement) {
      if (errors[fieldId]) {
        errorElement.textContent = errors[fieldId];
        errorElement.classList.add("show-icon");
      } else {
        errorElement.textContent = "";
        errorElement.classList.remove("show-icon");
      }
    }
  }

  // Attach form submit event
  resetPassForm.addEventListener("submit", handleFormSubmit);

  // Optional: Attach input event listener for live validation
  document.getElementById("loginIdentifier").addEventListener("input", () => {
    validateField("loginIdentifier");
  });
});
