// signin.js
import { auth, onAuthStateChanged } from "./firebase-config.js";

const loginBtn = document.querySelector(".login-btn");
const loginDropdown = document.querySelector(".header__nav--dropdown");
const signinLink = document.getElementById("signin-link");
const registerLink = document.getElementById("register-link");

loginBtn.addEventListener("click", () => {
  loginDropdown.classList.toggle("hide");
});

document.addEventListener("click", (e) => {
  if (!loginDropdown.contains(e.target) && e.target !== loginBtn) {
    loginDropdown.classList.add("hide");
  }
});

// Check user authentication state
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    const displayName = user.displayName;
    loginBtn.textContent = displayName;

    signinLink.textContent = "პაროლის შეცვლა";
    signinLink.href = "./pages/changePassword.html"; // Change link to password change page

    registerLink.textContent = "გამოსვლა";
    registerLink.href = "#"; // Handle logout separately
    registerLink.addEventListener("click", () => {
      auth
        .signOut()
        .then(() => {
          window.location.href = "../index.html"; // Redirect to login page after logout
        })
        .catch((error) => {
          console.error("Logout Error:", error);
        });
    });
  } else {
    // No user is signed in
    loginBtn.textContent = "შესვლა";
    signinLink.textContent = "ავტორიზაცია";
    signinLink.href = "./pages/logIn.html";

    registerLink.textContent = "რეგისტრაცია";
    registerLink.href = "./pages/registration.html";
  }
});
