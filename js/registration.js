// Validate individual fields
function validateField(fieldId) {
  let errors = {};
  const field = document.getElementById(fieldId);
  const value = field.value.trim();
  let errorElement = document.getElementById("error-" + fieldId);

  switch (fieldId) {
    case "firstname":
      if (!value) {
        errors.firstname = "აუცილებელი ველი";
      } else if (!/^[A-Za-z]+$/.test(value)) {
        errors.firstname = "მხოლოდ ასოები არის დაშვებული";
      }
      break;
    case "lastname":
      if (!value) {
        errors.lastname = "აუცილებელი ველი";
      } else if (!/^[A-Za-z]+$/.test(value)) {
        errors.lastname = "მხოლოდ ასოები არის დაშვებული";
      }
      break;
    case "email":
      if (!value) {
        errors.email = "აუცილებელი ველი";
      } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        errors.email = "ელ. ფოსტა არასწორია";
      }
      break;
    case "tel":
      if (!value) {
        errors.tel = "აუცილებელი ველი";
      } else if (!/^[0-9]+$/.test(value)) {
        errors.tel = "ტელ. ნომერი უნდა იყოს ციფრები";
      }
      break;
    case "password":
      // No specific validation for password on input
      break;
    case "passwConfirm":
      const password = document.getElementById("password").value.trim();
      if (password !== value) {
        errors.passwConfirm = "შეყვანილი პაროლები ერთმანეთს არ ემთხვევა";
      }
      break;
    default:
      break;
  }

  // Show or hide error message
  if (errors[fieldId]) {
    errorElement.innerText = errors[fieldId];
    errorElement.classList.add("show-icon");
  } else {
    errorElement.innerText = "";
    errorElement.classList.remove("show-icon");
  }
}

// Validate entire form on submit
document
  .getElementById("registration-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Validate all fields
    [
      "firstname",
      "lastname",
      "email",
      "tel",
      "password",
      "passwConfirm",
    ].forEach(validateField);

    // Check if there are any errors
    const errorMessages = document.querySelectorAll(".error-message");
    const hasErrors = Array.from(errorMessages).some((element) =>
      element.classList.contains("show-icon")
    );

    // Submit form if there are no errors
    if (!hasErrors) {
      document.getElementById("registration-form").submit();
    }
  });

function togglePasswordVisibility(passwordId, iconId) {
  const passwordField = document.getElementById(passwordId);
  const eyeIcon = document.getElementById(iconId);

  if (passwordField.type === "password") {
    passwordField.type = "text";
    eyeIcon.src = "../images/autorization/eye.svg"; // Show open eye
  } else {
    passwordField.type = "password";
    eyeIcon.src = "../images/autorization/eyeclose.svg"; // Show closed eye
  }
}
