import {
  auth,
  database,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  ref,
  set,
  EmailAuthProvider,
  updatePassword,
  sendEmailVerification,
  reauthenticateWithCredential,
} from "./firebase-config.js";

// Your registration logic here

// Handle form submission
document
  .getElementById("registration-form")
  ?.addEventListener("submit", handleFormSubmit);
document
  .getElementById("login-form")
  ?.addEventListener("submit", handleFormSubmit);
document
  .getElementById("change-password-form")
  ?.addEventListener("submit", handleFormSubmit);

// Handle email and password registration
function handleFormSubmit(event) {
  event.preventDefault(); // Prevent form from submitting

  const form = event.target;
  if (form.id === "registration-form") {
    handleRegistration();
  } else if (form.id === "login-form") {
    handleLogin();
  } else if (form.id === "change-password-form") {
    handleChangePassword();
  }
}

// Handle email and password registration
function handleRegistration() {
  let formIsValid = true;

  // Validate individual fields and stop if any validation fails
  formIsValid = validateField("firstname") && formIsValid;
  formIsValid = validateField("lastname") && formIsValid;
  formIsValid = validateField("email") && formIsValid;
  formIsValid = validateField("tel") && formIsValid;
  formIsValid = validateField("password") && formIsValid;
  formIsValid = validateField("passwConfirm") && formIsValid;

  // Stop execution if any validation error exists
  if (!formIsValid) {
    return;
  }

  // If no errors, proceed with user registration
  const firstname = document.getElementById("firstname").value.trim();
  const lastname = document.getElementById("lastname").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const tel = document.getElementById("tel").value.trim();

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Save email to local storage
      localStorage.setItem("registeredEmail", email);

      // Store additional user data in Realtime Database
      set(ref(database, "users/" + user.uid), {
        firstname: firstname,
        lastname: lastname,
        email: email,
        tel: tel,
      });

      handleSuccessfulAction();
      clearForm("registration-form");

      setTimeout(() => {
        window.location.href = "../index.html"; // Redirect to main page
      }, 3000);
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
    });

  const registeredEmails =
    JSON.parse(localStorage.getItem("registeredEmails")) || [];
  registeredEmails.push(email);
  localStorage.setItem("registeredEmails", JSON.stringify(registeredEmails));
}

// Handle login
function handleLogin() {
  const loginIdentifier = document.getElementById("loginIdentifier").value;
  const password = document.getElementById("password").value;
  const rememberMe = document.getElementById("remember").checked;

  // Simple validation
  let errors = {};
  if (!loginIdentifier) {
    errors.loginIdentifier = "აუცილებელი ველი";
  }

  if (!password) {
    errors.password = "აუცილებელი ველი";
  }

  validateField("loginIdentifier");
  validateField("password");

  if (Object.keys(errors).length > 0) {
    return; // Stop execution if there are validation errors
  }

  signInWithEmailAndPassword(auth, loginIdentifier, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User logged in:", user);
      handleSuccessfulAction();

      // Save credentials if "Remember Me" is checked
      if (rememberMe) {
        localStorage.setItem("savedLoginIdentifier", loginIdentifier);
        localStorage.setItem("savedPassword", password);
      } else {
        localStorage.removeItem("savedLoginIdentifier");
        localStorage.removeItem("savedPassword");
      }

      clearForm("login-form");

      setTimeout(() => {
        window.location.href = "../index.html"; // Redirect to the main page
      }, 3000); // 3000 milliseconds = 3 seconds
    })
    .catch((error) => {
      console.error("Error during login:", error);

      // Handle specific error codes and provide appropriate messages
      let errorMessage;
      switch (error.code) {
        case "auth/user-not-found":
        case "auth/wrong-password":
          errorMessage = "პაროლი ან მომხმარებელი არ არის სწორი";
          break;
        default:
          errorMessage = "პაროლი ან მომხმარებელი არ არის სწორი";
      }

      // Display the error message
      const errorElement =
        document.getElementById("error-loginIdentifier") ||
        document.getElementById("error-password");
      if (errorElement) {
        errorElement.textContent = errorMessage;
        errorElement.classList.add("show-icon");
      }
    });
}

// Handle password change
function handleChangePassword() {
  const oldPassword = document.getElementById("old-password").value;
  const newPassword = document.getElementById("new-password").value;
  const confirmNewPassword = document.getElementById(
    "confirm-new-password"
  ).value;

  // Simple validation
  let errors = {};

  // Check if new password is the same as the old password
  if (newPassword === oldPassword) {
    errors.newPassword = "ახალი პაროლი არ უნდა ემთხვეოდეს ძველს!";
  }

  // Check if the new passwords match
  if (newPassword !== confirmNewPassword) {
    errors.confirmNewPassword = "ახალი პაროლები არ ემთხვევა!";
  }

  validateField("old-password");
  validateField("new-password");
  validateField("confirm-new-password");

  if (Object.keys(errors).length > 0) {
    if (errors.newPassword) {
      const errorElement = document.getElementById("error-new-password");
      errorElement.textContent = errors.newPassword;
      errorElement.classList.add("show-icon");
    }

    if (errors.confirmNewPassword) {
      const errorElement = document.getElementById(
        "error-confirm-new-password"
      );
      errorElement.textContent = errors.confirmNewPassword;
      errorElement.classList.add("show-icon");
    }

    return; // Stop execution if there are validation errors
  }

  const user = auth.currentUser;
  const credential = EmailAuthProvider.credential(user.email, oldPassword);

  // Re-authenticate the user before updating the password
  reauthenticateWithCredential(user, credential)
    .then(() => {
      // Send a verification email
      return sendEmailVerification(user);
    })
    .then(() => {
      console.log(
        "Verification email sent. Proceeding to update the password..."
      );
      // Update the password
      return updatePassword(user, newPassword);
    })
    .then(() => {
      console.log("Password updated successfully");
      clearForm("change-password-form");
      handleSuccessfulAction();

      setTimeout(() => {
        window.location.href = "../index.html"; // Redirect to the main page
      }, 3000); // 3000 milliseconds = 3 seconds
    })
    .catch((error) => {
      console.error("Error during password change:", error);

      // Handle specific error codes and provide appropriate messages
      let errorMessage;
      switch (error.code) {
        case "auth/wrong-password":
          errorMessage = "ძველი პაროლი არასწორია";
          break;
        case "auth/too-many-requests":
          errorMessage = "შეცდომის გამო, თქვენი ანგარიში დროებით დაბლოკილია.";
          break;
        case "auth/requires-recent-login":
          errorMessage = "გთხოვთ, ხელახლა შეიყვანოთ თქვენი მონაცემები.";
          break;
        default:
          errorMessage = "გთხოვთ შეიყვანოთ ვალიდური პაროლი";
      }

      // Display the error message
      const errorElement = document.getElementById("error-old-password");
      if (errorElement) {
        errorElement.textContent = errorMessage;
        errorElement.classList.add("show-icon");
      }
    });
}

// Clear form inputs
function clearForm(formId) {
  document.getElementById(formId)?.reset();
}

// Validate form fields on input
document.querySelectorAll(".input-box__input").forEach((input) => {
  input.addEventListener("input", () => {
    validateField(input.id);
  });
});

// Validate individual fields
function validateField(fieldId) {
  let errors = {};
  const field = document.getElementById(fieldId);
  const value = field.value.trim();
  const errorElement = document.getElementById("error-" + fieldId);
  const inputWrapper = field.closest(".input-wrapper");

  switch (fieldId) {
    case "firstname":
      if (!value) {
        errors.firstname = "აუცილებელი ველი";
      } else if (!/^[\u10A0-\u10FF]+$/.test(value)) {
        errors.firstname = "გამოიყენე ქართული ასოები";
      }
      break;

    case "lastname":
      if (!value) {
        errors.lastname = "აუცილებელი ველი";
      } else if (!/^[\u10A0-\u10FF]+$/.test(value)) {
        errors.lastname = "გამოიყენე ქართული ასოები";
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
      } else if (!/^\+9955\d{8}$/.test(value)) {
        errors.tel = "ტელეფონის ინდექსი უნდა +995";
      }
      break;

    case "password":
      if (!value) {
        errors.password = "აუცილებელი ველი";
      } else if (
        !/[A-Z]/.test(value) ||
        !/[a-z]/.test(value) ||
        !/[0-9]/.test(value) ||
        !/[!@#$%^&*(),.?":{}|<>]/.test(value)
      ) {
        errors.password = "პაროლი უნდა შეიცავდეს დიდსა და პატარა ინგლისურ ასოებს, რიცხვსა და სპეციალურ სიმბოლოს";
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

    case "old-password":
      if (!value) {
        errors["old-password"] = "აუცილებელი ველი";
      }
      break;

    case "new-password":
      if (!value) {
        errors["new-password"] = "აუცილებელი ველი";
      } else if (
        !/[A-Z]/.test(value) ||
        !/[a-z]/.test(value) ||
        !/[0-9]/.test(value) ||
        !/[!@#$%^&*(),.?":{}|<>]/.test(value)
      ) {
        errors["new-password"] = "პაროლი უნდა შეიცავდეს დიდსა და პატარა ინგლისურ ასოებს, რიცხვსა და სპეციალურ სიმბოლოს";
      } else {
        const oldPassword = document.getElementById("old-password").value.trim();
        if (value === oldPassword) {
          errors["new-password"] = "ახალი და ძველი პაროლები ერთმანეთს ემთხვევა";
        }
      }
      break;

    case "confirm-new-password":
      if (!value) {
        errors["confirm-new-password"] = "აუცილებელი ველი";
      } else {
        const newPassword = document.getElementById("new-password").value.trim();
        if (newPassword !== value) {
          errors["confirm-new-password"] = "პაროლები ერთმანეთს არ ემთხვევა";
        }
      }
      break;

    case "loginIdentifier":
      if (!value) {
        errors.loginIdentifier = "აუცილებელი ველი";
      }
      break;

    default:
      break;
  }

  // Update the error message element and input wrapper class
  if (errorElement && inputWrapper) {
    if (Object.keys(errors).length > 0) {
      errorElement.textContent = errors[fieldId];
      errorElement.classList.add("show-icon");
      inputWrapper.classList.add("input-error");
      return false; // Return false if there's an error
    } else {
      errorElement.textContent = "";
      errorElement.classList.remove("show-icon");
      inputWrapper.classList.remove("input-error");
      return true; // Return true if no errors
    }
  }
  return true; // Default return true if no error elements were found
}


// Toggle password visibility
function togglePasswordVisibility(passwordId, iconId) {
  const passwordField = document.getElementById(passwordId);
  const eyeIcon = document.getElementById(iconId);

  if (passwordField.type === "password") {
    passwordField.type = "text";
    eyeIcon.src = "../images/autorization/eye.svg"; // Path to open eye icon
  } else {
    passwordField.type = "password";
    eyeIcon.src = "../images/autorization/eyeclose.svg"; // Path to closed eye icon
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("toggle-password")?.addEventListener("click", () => {
    togglePasswordVisibility("password", "toggle-password");
  });

  document
    .getElementById("toggle-passwConfirm")
    ?.addEventListener("click", () => {
      togglePasswordVisibility("passwConfirm", "toggle-passwConfirm");
    });

  // document.getElementById("password")?.addEventListener("click", () => {
  //   togglePasswordVisibility("old-password", "toggle-old-password");
  // });

  document
    .getElementById("toggle-old-password")
    ?.addEventListener("click", () => {
      togglePasswordVisibility("old-password", "toggle-old-password");
    });

  document
    .getElementById("toggle-new-password")
    ?.addEventListener("click", () => {
      togglePasswordVisibility("new-password", "toggle-new-password");
    });

  document
    .getElementById("toggle-confirm-new-password")
    ?.addEventListener("click", () => {
      togglePasswordVisibility(
        "confirm-new-password",
        "toggle-confirm-new-password"
      );
    });
});

// show success message function

function handleSuccessfulAction() {
  // Hide the registration form
  const form = document.querySelector(".form");
  const backTo = document.querySelector(".backto");
  if (form) {
    form.classList.add("hide");
    backTo.classList.add("hide");
  }

  // Show the success message
  const successMessage = document.getElementById("success-message");
  if (successMessage) {
    successMessage.classList.remove("hide");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Check for saved credentials in localStorage
  const savedLoginIdentifier = localStorage.getItem("savedLoginIdentifier");
  const savedPassword = localStorage.getItem("savedPassword");

  // Populate the form with the saved credentials if they exist
  if (savedLoginIdentifier) {
    document.getElementById("loginIdentifier").value = savedLoginIdentifier;
  }
  if (savedPassword) {
    document.getElementById("password").value = savedPassword;
  }

  // Set the "Remember Me" checkbox to checked if credentials are saved
  if (savedLoginIdentifier && savedPassword) {
    document.getElementById("remember").checked = true;
  }
});
