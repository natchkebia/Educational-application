// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
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

// Handle email and password registration
const signInbtn = document.getElementById("signInbtn");
signInbtn.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent form from submitting

  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let passwConfirm = document.getElementById("passwConfirm").value;

  // Simple validation
  if (password !== passwConfirm) {
    alert("Passwords do not match!");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      // Additional user info can be stored here if needed
      clearForm();
      window.location.href = "index.html"; // Redirect to index.html
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
    });
});

// Google Sign-In
const googleSigninBtn = document.getElementById("google-signin");
googleSigninBtn.addEventListener("click", () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // The signed-in user info
      const user = result.user;
      clearForm();
      window.location.href = "index.html"; // Redirect to index.html
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
    });
});

// Facebook Sign-In
const facebookSigninBtn = document.getElementById("facebook-signin");
facebookSigninBtn.addEventListener("click", () => {
  const provider = new FacebookAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // The signed-in user info
      const user = result.user;
      clearForm();
      window.location.href = "index.html"; // Redirect to index.html
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
    });
});

// Clear form inputs
function clearForm() {
  document.getElementById("registration-form").reset();
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
        errors.lastname = "აუცილებელი ველი";
      } else if (!/^[\u10A0-\u10FF]+$/.test(value)) {
        errors.lastname = "გამოიყენე ქართული ასოები";
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
