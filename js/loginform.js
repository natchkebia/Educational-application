// Validate individual fields
function validateField(fieldId) {
  let errors = {};
  const field = document.getElementById(fieldId);
  const value = field.value.trim();
  let errorElement = document.getElementById("error-" + fieldId);

  switch (fieldId) {
    case "loginIdentifier":
      if (!value) {
        errors.loginIdentifier = "აუცილებელი ველი";
      } else if (
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) && // Email format
        !/^[0-9]{9}$/.test(value) // Mobile number format
      ) {
        errors.loginIdentifier = "შეიყვანეთ სწორი ელ. ფოსტა ან ტელ. ნომერი";
      }
      break;

    case "password":
      if (!value) {
        errors.password = "აუცილებელი ველი";
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

// Handle form submission
function handleFormSubmission(event) {
  event.preventDefault();
  const formId = event.target.id;

  let fieldsToValidate = [];
  if (formId === "login-form") {
    fieldsToValidate = ["loginIdentifier", "password"];
  }

  // Validate all fields
  fieldsToValidate.forEach(validateField);

  // Check if there are any errors
  const errorMessages = document.querySelectorAll(".error-message");
  const hasErrors = Array.from(errorMessages).some((element) =>
    element.classList.contains("show-icon")
  );

  // If no validation errors, proceed with login
  if (!hasErrors) {
    // Fetch and validate login credentials from local JSON data
    fetch("../data/registredUsers.json")
      .then((response) => response.json())
      .then((data) => {
        const loginSuccess = validateLoginCredentials(
          document.getElementById("loginIdentifier").value,
          document.getElementById("password").value,
          data
        );

        if (loginSuccess) {
          // Redirect or perform successful login actions
          alert("Login successful!");
          // window.location.href = "dashboard.html"; // Redirect to dashboard
        } else {
          // Show error message for incorrect credentials
          const errorElement = document.getElementById("error-password");
          errorElement.innerText = "პაროლი ან მომხმარებელი არ არის სწორი";
          errorElement.classList.add("show-icon");
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }
}

// Validate login credentials with local JSON data
function validateLoginCredentials(identifier, password, userData) {
  return userData.some(
    (user) =>
      (user.email === identifier || user.phone === identifier) &&
      user.password === password
  );
}

// Add event listener to the form
document
  .getElementById("login-form")
  .addEventListener("submit", handleFormSubmission);

// Save password checkbox functionality
function handleRememberMeCheckbox() {
  const rememberMeCheckbox = document.getElementById("remember");
  if (rememberMeCheckbox.checked) {
    localStorage.setItem(
      "savedPassword",
      document.getElementById("password").value
    );
  } else {
    localStorage.removeItem("savedPassword");
  }
}

// Load saved password if checkbox is checked
function loadSavedPassword() {
  const savedPassword = localStorage.getItem("savedPassword");
  if (savedPassword) {
    document.getElementById("password").value = savedPassword;
    document.getElementById("remember").checked = true;
  }
}

// Initialize event listeners

document
  .getElementById("remember")
  .addEventListener("change", handleRememberMeCheckbox);

// Toggle password visibility
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

// Call loadSavedPassword on page load
window.addEventListener("load", loadSavedPassword);



