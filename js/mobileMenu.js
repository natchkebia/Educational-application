// mobile-menu

function openMobileMenu() {
  document.getElementById("mobile-menu").classList.toggle("show");
  document.getElementById("burger-icon").classList.toggle("active");
  document.body.classList.toggle("inactive");
}

// function for showing profile in mobile menu and "log-out" add class "show", and hide authorization-link - add class hide

// function showProfile() {
//       document.getElementById("profile").classList.add("show");
//    document.getElementById("log-out").classList.add("show");
//    document.querySelectorAll(".authorization-link").classList.add("hide");

// }
