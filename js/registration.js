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
      } else if (!/^[\u10A0-\u10FF]+$/.test(value)) {
        errors.firstname = "გამოიყენე ქართული ასოები";
      } else if (value.length > 20) {
        errors.firstname = "სახელი არ უნდა აღემატებოდეს 20 ასოს"; // Maximum length exceeded
      }
      break;

    case "lastname":
      if (!value) {
        errors.firstname = "აუცილებელი ველი";
      } else if (!/^[\u10A0-\u10FF]+$/.test(value)) {
        errors.firstname = "გამოიყენე ქართული ასოები";
      } else if (value.length > 30) {
        errors.lastname = "გვარი არ უნდა აღემატებოდეს 30 ასოს"; // Maximum length exceeded
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
        errors.tel = "გამოიყენეთ მხოლოდ ციფრები";
      } else if (value.length > 9) {
        errors.tel = "სიმბოლოების რაოდენობა არ უნდა აღემატებოდეს 9–ს"; // Maximum length exceeded
      }
      break;
    case "password":
      if (!value) {
        errors.password = "აუცილებელი ველი";
      } else if (
        value.length < 8 ||
        !/[A-Z]/.test(value) ||
        !/[a-z]/.test(value) ||
        !/[0-9]/.test(value) ||
        !/[!@#$%^&*(),.?":{}|<>]/.test(value)
      ) {
        errors.password =
          "პაროლი უნდა შეიცავდეს მინიმუმ 8 სიმბოლოს, დიდსა და პატარა ასოებს, რიცხვსა და სპეციალურ სიმბოლოს";
      }
      break;
    case "passwConfirm":
      if (!value) {
        errors.passwConfirm = "აუცილებელი ველი";
      }
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
