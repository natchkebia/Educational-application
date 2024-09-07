import {
  auth,
  getDatabase,
  ref,
  get,
  onAuthStateChanged,
  signOut,
} from "./firebase-config.js";

// Select DOM elements
const signinLink = document.getElementById("signin-link");
const signin = document.getElementById("signin-btn-desktop");
const profileSection = document.getElementById("profile");
const logoutSection = document.getElementById("log-out-1");
const logoutDesktop = document.getElementById("log-out-2");
const profileBtn = document.getElementById("desktop-profile");
const profileInfo = document.getElementById("profile-info");
const signinBtnDesktop = document.getElementById("signin-btn-desktop");
const signinDropdown = signinBtnDesktop.querySelector(".header__nav--dropdown");

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

          // Show profile and logout sections in mobile menu
          showProfile();
        } else {
          console.error("No user data found in database");
        }
      })
      .catch((error) => {
        console.error("Error retrieving user data:", error);
      });
  } else {
    // No user is signed in
    hideProfile();
  }
});

// Handle profile button click
profileBtn.addEventListener("click", () => {
  profileInfo.classList.toggle("hide");
  signinDropdown.classList.add("hide");
});

// Handle sign-in dropdown toggle
signinBtnDesktop.addEventListener("click", () => {
  signinDropdown.classList.toggle("hide");
  profileInfo.classList.add("hide");
});

// Hide dropdowns when clicking outside
document.addEventListener("click", (event) => {
  if (
    !signinBtnDesktop.contains(event.target) &&
    !profileBtn.contains(event.target)
  ) {
    profileInfo.classList.add("hide");
    signinDropdown.classList.add("hide");
  }
});

// Handle user logout
logoutSection.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      console.log("User signed out successfully.");
    })
    .catch((error) => {
      console.error("Error signing out:", error);
    });
});

function handleLogout(event, redirectUrl) {
  event.preventDefault(); // Prevent the default anchor behavior
  signOut(auth)
    .then(() => {
      console.log("User signed out successfully.");
      // Redirect to the specified URL
      window.location.href = redirectUrl;
    })
    .catch((error) => {
      console.error("Error signing out:", error);
    });
}

if (logoutSection) {
  logoutSection.addEventListener("click", (event) =>
    handleLogout(event, "./pages/login.html")
  );
}

if (logoutDesktop) {
  logoutDesktop.addEventListener("click", (event) =>
    handleLogout(event, "./index.html")
  );
}

// Adjust viewport height for CSS custom property
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);

window.addEventListener("resize", () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});
