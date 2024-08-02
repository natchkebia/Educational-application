// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWXkUmUmCZmmATIsQfcdBTszFhOu-IkiM",
  authDomain: "eduapp-775ab.firebaseapp.com",
  databaseURL: "https://eduapp-775ab-default-rtdb.firebaseio.com",
  projectId: "eduapp-775ab",
  storageBucket: "eduapp-775ab.appspot.com",
  messagingSenderId: "420498752186",
  appId: "1:420498752186:web:58dbdc330a7c27db563883",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

function validateField(fieldId) {
  const field = document.getElementById(fieldId);
  const value = field.value.trim();
  const errorElement = document.getElementById("error-" + fieldId);

  let errorMessage = "";

  switch (fieldId) {
    case "firstname":
      if (!value) {
        errorMessage = "აუცილებელი ველი";
      } else if (!/^[\u10A0-\u10FF]+$/.test(value)) {
        errorMessage = "გამოიყენე ქართული ასოები";
      } else if (value.length > 20) {
        errorMessage = "სახელი არ უნდა აღემატებოდეს 20 ასოს"; // Maximum length exceeded
      }
      break;

    case "lastname":
      if (!value) {
        errorMessage = "აუცილებელი ველი";
      } else if (!/^[\u10A0-\u10FF]+$/.test(value)) {
        errorMessage = "გამოიყენე ქართული ასოები";
      } else if (value.length > 30) {
        errorMessage = "გვარი არ უნდა აღემატებოდეს 30 ასოს"; // Maximum length exceeded
      }
      break;

    case "email":
      if (!value) {
        errorMessage = "აუცილებელი ველი";
      } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        errorMessage = "ელ. ფოსტა არასწორია";
      }
      break;

    case "tel":
      if (!value) {
        errorMessage = "აუცილებელი ველი";
      } else if (!/^[0-9]+$/.test(value)) {
        errorMessage = "გამოიყენეთ მხოლოდ ციფრები";
      } else if (value.length > 9) {
        errorMessage = "სიმბოლოების რაოდენობა არ უნდა აღემატებოდეს 9–ს"; // Maximum length exceeded
      }
      break;

    case "password":
      if (!value) {
        errorMessage = "აუცილებელი ველი";
      } else if (
        value.length < 8 ||
        !/[A-Z]/.test(value) ||
        !/[a-z]/.test(value) ||
        !/[0-9]/.test(value) ||
        !/[!@#$%^&*(),.?":{}|<>]/.test(value)
      ) {
        errorMessage =
          "პაროლი უნდა შეიცავდეს მინიმუმ 8 სიმბოლოს, დიდსა და პატარა ინგლისურ ასოებს, რიცხვსა და სპეციალურ სიმბოლოს";
      }
      break;

    case "passwConfirm":
      if (!value) {
        errorMessage = "აუცილებელი ველი";
      } else {
        const password = document.getElementById("password").value.trim();
        if (password !== value) {
          errorMessage = "შეყვანილი პაროლები ერთმანეთს არ ემთხვევა";
        }
      }
      break;

    default:
      break;
  }

  // Show or hide error message
  if (errorMessage) {
    errorElement.innerText = errorMessage;
    errorElement.classList.add("show-icon");
  } else {
    errorElement.innerText = "";
    errorElement.classList.remove("show-icon");
  }
}

function setupRealTimeValidation() {
  const fields = [
    "firstname",
    "lastname",
    "email",
    "tel",
    "password",
    "passwConfirm",
  ];
  fields.forEach((fieldId) => {
    const field = document.getElementById(fieldId);
    field.addEventListener("input", () => validateField(fieldId));
  });
}

// Initialize real-time validation
setupRealTimeValidation();

document
  .getElementById("registration-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Validate all fields on submit
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
      let email = document.getElementById("email").value;
      let password = document.getElementById("password").value;
      let passwConfirm = document.getElementById("passwConfirm").value;

      if (password !== passwConfirm) {
        alert("Passwords do not match!");
        return;
      }

     createUserWithEmailAndPassword(auth, email, password)
       .then((userCredential) => {
         // Signed up
         const user = userCredential.user;
         // Clear the input fields
         document.getElementById("registration-form").reset();
         // Redirect to index.html
         window.location.href = "../index.html";
       })
       .catch((error) => {
         const errorMessage = error.message;
         alert(errorMessage);
       });
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

// Attach togglePasswordVisibility function to icons
document.getElementById("toggle-password").addEventListener("click", () => {
  togglePasswordVisibility("password", "toggle-password");
});
document.getElementById("toggle-passwConfirm").addEventListener("click", () => {
  togglePasswordVisibility("passwConfirm", "toggle-passwConfirm");
});
