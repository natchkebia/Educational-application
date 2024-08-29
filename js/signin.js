import {
  auth,
  getDatabase,
  ref,
  get,
  onAuthStateChanged,
  signOut,
} from "./firebase-config.js";

// Select DOM elements
const loginBtn = document.querySelector(".login-btn");
const loginDropdown = document.querySelector(".header__nav--dropdown");
const signinLink = document.getElementById("signin-link");
const registerLink = document.getElementById("register-link");
const profileSection = document.getElementById("profile");
const logoutSection = document.getElementById("log-out"); // Updated for mobile logout button

// Function to show profile and logout in the mobile menu
function showProfile() {
  if (profileSection && logoutSection) {
    profileSection.classList.add("show");
    logoutSection.classList.add("show");
  }

  const authLinks = document.querySelectorAll(".authorization-link");
  authLinks.forEach((link) => link.classList.add("hide"));
}

// Function to hide profile and logout in the mobile menu
function hideProfile() {
  if (profileSection && logoutSection) {
    profileSection.classList.remove("show");
    logoutSection.classList.remove("show");
  }

  const authLinks = document.querySelectorAll(".authorization-link");
  authLinks.forEach((link) => link.classList.remove("hide"));
}

// Function to update desktop UI elements with the first name
function updateDesktopUI(firstname) {
  if (loginBtn) {
    loginBtn.textContent = firstname;
  }
}

// Check user authentication state
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    const userId = user.uid;
    const userRef = ref(getDatabase(), "users/" + userId);

    get(userRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          const firstname = userData.firstname || "User";
          const userNickname = userData.username || "@username_1";
          const userPhone = userData.tel || "(+995) 551 55 55 55";
          const userEmail = userData.email || "academy_user9@gmail.com";

          // Update mobile menu with user data
          document.getElementById("user-name").textContent =
            firstname + " " + (userData.lastname || "");
          document.getElementById("user-nickname").textContent = userNickname;
          document.getElementById("user-contact-phone-value").textContent =
            userPhone;
          document.getElementById("user-contact-email-value").textContent =
            userEmail;

          // Update desktop UI with only the first name
          updateDesktopUI(firstname);

          // Show profile and logout sections in mobile menu
          showProfile();
        } else {
          console.error("No user data found in database");
        }
      })
      .catch((error) => {
        console.error("Error retrieving user data:", error);
      });

    // Update login button text and links
    signinLink.textContent = "პაროლის შეცვლა";
    signinLink.href = "change-password.html";

    registerLink.textContent = "გამოსვლა";
    registerLink.href = "#";
    registerLink.addEventListener("click", () => {
      signOut(auth)
        .then(() => {
          window.location.href = "../index.html";
        })
        .catch((error) => {
          console.error("Logout Error:", error);
        });
    });

    // Add event listener for mobile logout button
    if (logoutSection) {
      logoutSection.addEventListener("click", (event) => {
        event.preventDefault();
        signOut(auth)
          .then(() => {
            window.location.href = "../index.html";
          })
          .catch((error) => {
            console.error("Logout Error:", error);
          });
      });
    }
  } else {
    // No user is signed in
    loginBtn.textContent = "შესვლა";
    signinLink.textContent = "ავტორიზაცია";
    signinLink.href = "/pages/logIn.html";

    registerLink.textContent = "რეგისტრაცია";
    registerLink.href = "/pages/registration.html";

    
    // Hide profile and logout sections in mobile menu
    hideProfile();
  }
});

// Handle dropdown menu toggle
loginBtn.addEventListener("click", () => {
  loginDropdown.classList.toggle("hide");
});

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
  if (!loginDropdown.contains(e.target) && e.target !== loginBtn) {
    loginDropdown.classList.add("hide");
  }
});


// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

// We listen to the resize event
window.addEventListener('resize', () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});