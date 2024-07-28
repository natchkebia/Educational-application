// "use strict";

// let formElement = document.getElementById("registration-form");

// formElement.addEventListener("submit", function (event) {
//   event.preventDefault();

//   let errors = {};

//   //   username
//   let usernameValue = document.getElementById("firstname").value;

//   if (usernameValue == "") {
//     errors.username = "აუცილებელი ველი";
//   }

    
    
    
  
//   // password

//   let passValue = document.getElementById("password").value;
//   let passConfirmValue = document.getElementById("password-confirmation").value;

//   if (passValue == "") {
//     errors.password = "password field can not be empty";
//   }
//   if (passValue != passConfirmValue) {
//     errors.passwConfirm = "passwords do not match";
//   }
// //   // check box

// //   let checkInput = document.getElementById("agree").checked;
// //   if (!checkInput) {
// //     errors.check = "Please agree to the terms";
// //   }
//   console.log(errors);

//   formElement.querySelectorAll(".error-message").forEach((element) => {
//     element.innerText = "";
//   });

//   for (let item in errors) {
//     let textError = document.getElementById("erorr-" + item);
//     if (textError) {
//       textError.textContent = errors[item];
//     }
//   }
//   if (Object.keys(errors).length == 0) {
//     formElement.submit();
//   }
// });

// let passwShow = document.getElementById("password");
// let icon = document.getElementById("show-icon");

// let passwShowLogin = document.getElementById("password-in-login");
// let iconLogin = document.getElementById("show-icon-login");

// // password show
// // function showHidePasswordLogin() {
// //   if (passwShowLogin.type == "password") {
// //     passwShowLogin.setAttribute("type", "text");
// //     iconLogin.classList.remove("fa-eye");
// //     iconLogin.classList.add("fa-eye-slash");
// //   } else {
// //     passwShowLogin.setAttribute("type", "password");
// //     iconLogin.classList.remove("fa-eye-slash");
// //     iconLogin.classList.add("fa-eye");
// //   }
// // }
// // iconLogin.addEventListener("click", showHidePasswordLogin);

// // login form password show

// // function showHidePassword() {
// //   if (passwShow.type == "password") {
// //     passwShow.setAttribute("type", "text");
// //     icon.classList.remove("fa-eye");
// //     icon.classList.add("fa-eye-slash");
// //   } else {
// //     passwShow.setAttribute("type", "password");
// //     icon.classList.remove("fa-eye-slash");
// //     icon.classList.add("fa-eye");
// //   }
// // }
// // icon.addEventListener("click", showHidePassword);
