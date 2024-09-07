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
const signinBtnDesktop = document.getElementById("signin-btn-desktop");
const profileSection = document.getElementById("profile");
const logoutSection = document.getElementById("log-out-1");
const logoutDesktop = document.getElementById("log-out-2");
const profileBtn = document.getElementById("desktop-profile");
const profileInfo = document.getElementById("profile-info");
const authLinks = document.querySelectorAll(".authorization-link");
const signinDropdown = signinBtnDesktop.querySelector(".header__nav--dropdown");
const mobileMenuLoader = document.getElementById("mobile-menu-loader");
const profileLoader = document.getElementById("profile-loader");

// Function to show loader
function showLoader(loaderElement) {
  loaderElement.classList.remove("hide");
  profileBtn.classList.add("hide");
  signinBtnDesktop.classList.add("hide");
  authLinks.forEach((link) => link.classList.add("hide"));
}

// Function to hide loader
function hideLoader(loaderElement) {
  loaderElement.classList.add("hide");
  // profileBtn.classList.remove("hide");
  // signinBtnDesktop.classList.remove("hide");
}

// Function to show profile and logout in the mobile menu
function showProfile() {
  if (profileSection && logoutSection) {
    profileSection.classList.add("show");
    logoutSection.classList.add("show");
  }

  authLinks.forEach((link) => link.classList.add("hide"));
}

// Function to hide profile and logout in the mobile menu
function hideProfile() {
  if (profileSection && logoutSection) {
    profileSection.classList.remove("show");
    logoutSection.classList.remove("show");
  }

  authLinks.forEach((link) => link.classList.remove("hide"));
}

// Check user authentication state
onAuthStateChanged(auth, (user) => {
  // Show loaders while authentication state is being checked
  showLoader(mobileMenuLoader);
  showLoader(profileLoader);

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
          document.getElementById("user-name-deskt").textContent =
            firstname + " " + (userData.lastname || "");
          document.getElementById("user-nickname").textContent = userNickname;
          document.getElementById("user-contact-phone-value").textContent =
            userPhone;
          document.getElementById("user-contact-email-value").textContent =
            userEmail;

          // Show profile button and hide sign-in button
          profileBtn.classList.remove("hide");
          signinBtnDesktop.classList.add("hide");

          // Show profile and logout sections in mobile menu
          showProfile();
        } else {
          console.error("No user data found in database");
        }

        // Hide loaders after data is retrieved
        hideLoader(mobileMenuLoader);
        hideLoader(profileLoader);
      })
      .catch((error) => {
        console.error("Error retrieving user data:", error);

        // Hide loaders if there's an error
        hideLoader(mobileMenuLoader);
        hideLoader(profileLoader);
      });
  } else {
    // No user is signed in
    // Hide profile button and show sign-in button
    // profileBtn.classList.add("hide");
    signinBtnDesktop.classList.remove("hide");

    // Hide profile and logout sections in mobile menu
    hideProfile();

    // Hide loaders when no user is signed in
    hideLoader(mobileMenuLoader);
    hideLoader(profileLoader);
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

// Function to handle user logout
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

// Attach event listeners to logout elements
if (logoutSection) {
  logoutSection.addEventListener("click", (event) =>
    handleLogout(event, "./index.html")
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
