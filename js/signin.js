import { auth, onAuthStateChanged } from "./firebase-config.js";

const loginBtn = document.querySelector(".login-btn");
const login = document.querySelector(".header__nav--dropdown");

loginBtn.addEventListener("click", () => {
  login.classList.toggle("hide");
});

document.addEventListener("click", (e) => {
  if (!login.contains(e.target) && e.target !== loginBtn) {
    login.classList.add("hide");
  }
});

// Check Authentication State in Redirected HTML Page

// Check if the user is logged in
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    console.log("User is logged in:", user);
    // You can display user info or redirect to a different page if needed
  } else {
    // No user is signed in
    console.log("No user is logged in");
    // Redirect to login page or show a message
    window.location.href = "login.html";
  }
});
