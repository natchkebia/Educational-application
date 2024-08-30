import { getAuth, sendPasswordResetEmail } from "./firebase-config.js";

document.addEventListener("DOMContentLoaded", () => {
  const resetPassForm = document.getElementById("reset-pass-form");
  const formDesc = document.getElementById("form-desc");
  const verificationLoad = document.getElementById("verification-load");
  const errorLoginIdentifier = document.getElementById("error-loginIdentifier");

  async function handleFormSubmit(event) {
    event.preventDefault();

    const email = document.getElementById("loginIdentifier").value.trim();

    // Reset previous error states
    clearErrorStyles("loginIdentifier");

    if (!email) {
      setErrorStyles("loginIdentifier", "გთხოვთ, შეიყვანოთ ელ. ფოსტა.");
      return;
    }

    // Check if the email exists in localStorage
    const storedEmail = localStorage.getItem("registeredEmail"); // Adjust this key as needed

    if (!storedEmail || storedEmail !== email) {
      setErrorStyles(
        "loginIdentifier",
        "მომხმარებელი ამ ელ. ფოსტით არ არის რეგისტრირებული."
      );
      return;
    }

    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      // Show verification message and hide email input
      resetPassForm.classList.add("hide");
      formDesc.classList.add("hide");
      verificationLoad.classList.remove("hide");
    } catch (error) {
      handleResetPasswordError(error);
    }
  }

  function setErrorStyles(fieldId, errorMessage) {
    const field = document.getElementById(fieldId);
    const wrapper = field.closest(".input-wrapper");
    const errorElement = document.getElementById("error-" + fieldId);

    if (wrapper && errorElement) {
      wrapper.classList.add("input-error");
      errorElement.textContent = errorMessage;
      errorElement.classList.add("show-icon");
    }
  }

  function clearErrorStyles(fieldId) {
    const field = document.getElementById(fieldId);
    const wrapper = field.closest(".input-wrapper");
    const errorElement = document.getElementById("error-" + fieldId);

    if (wrapper && errorElement) {
      wrapper.classList.remove("input-error");
      errorElement.textContent = "";
      errorElement.classList.remove("show-icon");
    }
  }

  resetPassForm.addEventListener("submit", handleFormSubmit);
});
