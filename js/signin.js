import {
  auth,
  onAuthStateChanged,
  ref,
  get,
  getDatabase,
} from "./firebase-config.js";

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
    showProfile();
    // User is signed in
    const userId = user.uid;
    const userRef = ref(getDatabase(), "users/" + userId);

    get(userRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          const displayName = userData.firstname || "User";
          loginBtn.textContent = displayName;
        } else {
          loginBtn.textContent = "User";
        }
      })
      .catch((error) => {
        console.error("Error retrieving user data:", error);
      });

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

    // Handle non-authenticated state
    document.getElementById("profile")?.classList.remove("show");
    document.getElementById("log-out")?.classList.remove("show");

    // Show authorization links
    document.querySelectorAll(".authorization-link").forEach((link) => {
      link.classList.remove("hide");
    });
  }
});

// mobile-menu

function openMobileMenu() {
  document.getElementById("mobile-menu").classList.toggle("show");
  document.getElementById("burger-icon").classList.toggle("active");
  document.body.classList.toggle("inactive");
}

function showProfile() {
  // Show profile and log-out elements
  document.getElementById("profile")?.classList.add("show");
  document.getElementById("log-out")?.classList.add("show");

  // Hide authorization links
  document.querySelectorAll(".authorization-link").forEach((link) => {
    link.classList.add("hide");
  });
}
