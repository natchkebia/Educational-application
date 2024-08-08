import { getAuth, sendPasswordResetEmail } from "./firebase-config.js";

document.addEventListener("DOMContentLoaded", () => {
  const resetPassForm = document.getElementById("reset-pass-form");
  const formDesc = document.getElementById("form-desc");
  const verificationLoad = document.getElementById("verification-load");
  const errorLoginIdentifier = document.getElementById("error-loginIdentifier");

  async function handleFormSubmit(event) {
    event.preventDefault();

    const email = document.getElementById("loginIdentifier").value.trim();

    // Simple validation for empty email
    if (!email) {
      errorLoginIdentifier.textContent = "Please enter an email address.";
      return;
    }

    try {
      await sendPasswordResetEmail(getAuth(), email);
      // Show verification message and hide email input
      resetPassForm.classList.add("hide");
      formDesc.classList.add("hide");
      verificationLoad.classList.remove('hide')
    } catch (error) {
      // Handle Errors here.
      errorLoginIdentifier.textContent = error.message;
    }
  }

  resetPassForm.addEventListener("submit", handleFormSubmit);
});
