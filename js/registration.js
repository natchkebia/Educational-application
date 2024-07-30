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
document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.querySelector('input[name="password"]');
    const passwordToggle = document.querySelector('.password-toggle img');
    //   password togle
    passwordToggle.addEventListener("click", function () {
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        passwordToggle.src = "../icons/eye.svg"; 
      } else {
        passwordInput.type = "password";
        passwordToggle.src = "../icons/closedEye.svg";
      }
    });
  
    // border color
    const inputs = document.querySelectorAll('.autorization__form input');
  
    inputs.forEach(input => {
      input.addEventListener("input", function () {
        if (input.value.trim() !== "") {
          input.classList.add("input--has-text");
        } else {
          input.classList.remove("input--has-text");
        }
      });
  
      input.addEventListener("focus", function () {
        if (input.value.trim() !== "") {
          input.classList.add("input--has-text");
        }
      });
  
      input.addEventListener("blur", function () {
        if (input.value.trim() === "") {
          input.classList.remove("input--has-text");
        }
      });
    });
  
    
    // form submission
    const form = document.querySelector('.autorization__form');
    
    form.addEventListener("submit", function (event) {
      event.preventDefault(); 

      let valid = true;
      const inputs = form.querySelectorAll('input[required]');

      inputs.forEach(input => {
        const errorMessage = input.parentElement.querySelector('.error-message');

        if (input.value.trim() === "") {
          input.classList.add("input--error");
          if (errorMessage) {
            errorMessage.style.display = "flex"; 
          }
          valid = false;
        } else {
          input.classList.remove("input--error");
          if (errorMessage) {
            errorMessage.style.display = "none"; 
          }
        }
      });

      if (valid) {
        console.log('Form is valid and ready to submit');
        // form.submit(); 
      }
    });
    
    // Google and Facebook authorization
    const googleButton = document.querySelector('.button__wrapper img[alt="google icon"]');
    const facebookButton = document.querySelector('.button__wrapper img[alt="facebook icon"]');
  
    googleButton.parentElement.addEventListener("click", function () {
      window.location.href = "https://accounts.google.com/o/oauth2/v2/auth?client_id=YOUR_CLIENT_ID&response_type=token&scope=email&redirect_uri=YOUR_REDIRECT_URI";
    });
  
    facebookButton.parentElement.addEventListener("click", function () {
      window.location.href = "https://www.facebook.com/v11.0/dialog/oauth?client_id=YOUR_CLIENT_ID&response_type=token&redirect_uri=YOUR_REDIRECT_URI&scope=email";
    });
  });
  