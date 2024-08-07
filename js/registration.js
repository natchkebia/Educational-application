import {
  auth,
  database,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  ref,
  set,
} from "./firebase-config.js";

// Your registration logic here

// Handle form submission
document
  .getElementById("registration-form")
  ?.addEventListener("submit", handleFormSubmit);
document
  .getElementById("login-form")
  ?.addEventListener("submit", handleFormSubmit);

// Handle email and password registration
function handleFormSubmit(event) {
  event.preventDefault(); // Prevent form from submitting

  const form = event.target;
  if (form.id === "registration-form") {
    handleRegistration();
  } else if (form.id === "login-form") {
    handleLogin();
  }
}

// Handle email and password registration
function handleRegistration() {
  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const passwConfirm = document.getElementById("passwConfirm").value;
  const tel = document.getElementById("tel").value;

  // Simple validation
  let errors = {};
  if (password !== passwConfirm) {
    errors.password = "პაროლები არ ემთხვევა!";
  }

  validateField("firstname");
  validateField("lastname");
  validateField("email");
  validateField("tel");
  validateField("password");
  validateField("passwConfirm");

  if (Object.keys(errors).length > 0) {
    return; // Stop execution if there are validation errors
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      set(ref(database, "users/" + user.uid), {
        firstname: firstname,
        lastname: lastname,
        email: email,
        tel: tel,
      });
      handleSuccessfulAction();
      console.log("Data is sent:", user);
      clearForm("registration-form");
      setTimeout(() => {
        window.location.href = "../index.html"; // Redirect to the main page
      }, 3000); // 5000 milliseconds = 5 seconds
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
    });
}

// Handle login
function handleLogin() {
  const loginIdentifier = document.getElementById("loginIdentifier").value;
  const password = document.getElementById("password").value;

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

      clearForm("login-form");

      setTimeout(() => {
        window.location.href = "../index.html"; // Redirect to the main page
      }, 3000); // 5000 milliseconds = 5 seconds
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
// Google Sign-In
const googleSigninBtn = document.getElementById("google-signin");
googleSigninBtn?.addEventListener("click", () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      const userId = user.uid;

      const userRef = ref(database, "users/" + userId);
      set(userRef, {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      })
        .then(() => {
          console.log("User data successfully written to database:", user);
          // clearForm("login-form"); // or "registration-form"
          // window.location.href = "../index.html";
        })
        .catch((error) => {
          console.error("Error writing user data to database:", error);
        });
    })
    .catch((error) => {
      console.error("Error during Google sign-in:", error);
      alert("Failed to sign in with Google: " + error.message);
    });
});

// Facebook Sign-In
const facebookSigninBtn = document.getElementById("facebook-signin");
facebookSigninBtn?.addEventListener("click", () => {
  const provider = new FacebookAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      // clearForm("login-form"); // or "registration-form"
      // window.location.href = "../index.html";
    })
    .catch((error) => {
      console.error("Error during Facebook sign-in:", error);
      alert("Failed to sign in with Facebook: " + error.message);
    });
});

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

  switch (fieldId) {
    case "firstname":
      if (!value) {
        errors.firstname = "აუცილებელი ველი";
      } else if (!/^[\u10A0-\u10FF]+$/.test(value)) {
        errors.firstname = "გამოიყენე ქართული ასოები";
      } else if (value.length > 20) {
        errors.firstname = "სახელი არ უნდა აღემატებოდეს 20 ასოს";
      }
      break;

    case "lastname":
      if (!value) {
        errors.lastname = "აუცილებელი ველი";
      } else if (!/^[\u10A0-\u10FF]+$/.test(value)) {
        errors.lastname = "გამოიყენე ქართული ასოები";
      } else if (value.length > 30) {
        errors.lastname = "გვარი არ უნდა აღემატებოდეს 30 ასოს";
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
        errors.tel = "სიმბოლოების რაოდენობა არ უნდა აღემატებოდეს 9–ს";
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
          "პაროლი უნდა შეიცავდეს მინიმუმ 8 სიმბოლოს, დიდსა და პატარა ინგლისურ ასოებს, რიცხვსა და სპეციალურ სიმბოლოს";
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

    case "loginIdentifier":
      if (!value) {
        errors.loginIdentifier = "აუცილებელი ველი";
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

// Attach togglePasswordVisibility function to icons
document.getElementById("toggle-password")?.addEventListener("click", () => {
  togglePasswordVisibility("password", "toggle-password");
});
document
  .getElementById("toggle-passwConfirm")
  ?.addEventListener("click", () => {
    togglePasswordVisibility("passwConfirm", "toggle-passwConfirm");
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
