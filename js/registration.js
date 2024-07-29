document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.querySelector('input[name="password"]');
    const passwordToggle = document.querySelector('.password-toggle img');
    //   password togle
    passwordToggle.addEventListener("click", function () {
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        passwordToggle.src = "../icons/eye.svg"; 
      } else {
        passwordInput.type = "password";
        passwordToggle.src = "../icons/closedEye.svg";
      }
    });
  
    // border color
    const inputs = document.querySelectorAll('.autorization__form input');
  
    inputs.forEach(input => {
      input.addEventListener("input", function () {
        if (input.value.trim() !== "") {
          input.classList.add("input--has-text");
        } else {
          input.classList.remove("input--has-text");
        }
      });
  
      input.addEventListener("focus", function () {
        if (input.value.trim() !== "") {
          input.classList.add("input--has-text");
        }
      });
  
      input.addEventListener("blur", function () {
        if (input.value.trim() === "") {
          input.classList.remove("input--has-text");
        }
      });
    });
  
    
    // form submission
    const form = document.querySelector('.autorization__form');
    
    form.addEventListener("submit", function (event) {
      event.preventDefault(); 

      let valid = true;
      const inputs = form.querySelectorAll('input[required]');

      inputs.forEach(input => {
        const errorMessage = input.parentElement.querySelector('.error-message');

        if (input.value.trim() === "") {
          input.classList.add("input--error");
          if (errorMessage) {
            errorMessage.style.display = "flex"; 
          }
          valid = false;
        } else {
          input.classList.remove("input--error");
          if (errorMessage) {
            errorMessage.style.display = "none"; 
          }
        }
      });

      if (valid) {
        console.log('Form is valid and ready to submit');
        // form.submit(); 
      }
    });
    
    // Google and Facebook authorization
    const googleButton = document.querySelector('.button__wrapper img[alt="google icon"]');
    const facebookButton = document.querySelector('.button__wrapper img[alt="facebook icon"]');
  
    googleButton.parentElement.addEventListener("click", function () {
      window.location.href = "https://accounts.google.com/o/oauth2/v2/auth?client_id=YOUR_CLIENT_ID&response_type=token&scope=email&redirect_uri=YOUR_REDIRECT_URI";
    });
  
    facebookButton.parentElement.addEventListener("click", function () {
      window.location.href = "https://www.facebook.com/v11.0/dialog/oauth?client_id=YOUR_CLIENT_ID&response_type=token&redirect_uri=YOUR_REDIRECT_URI&scope=email";
    });
  });
  