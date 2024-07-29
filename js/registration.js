document
  .getElementById("registration-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let errors = {};

    // Validate First Name
    let firstname = document.getElementById("firstname").value.trim();
    if (!firstname) {
      errors.firstname = "აუცილებელი ველი";
    } else if (!/^[A-Za-z]+$/.test(firstname)) {
      errors.firstname = "მხოლოდ ასოები არის დაშვებული";
    }

    // Validate Last Name
    let lastname = document.getElementById("lastname").value.trim();
    if (!lastname) {
      errors.lastname = "აუცილებელი ველი";
    } else if (!/^[A-Za-z]+$/.test(lastname)) {
      errors.lastname = "მხოლოდ ასოები არის დაშვებული";
    }

    // Validate Email
    let email = document.getElementById("email").value.trim();
    if (!email) {
      errors.email = "აუცილებელი ველი";
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      errors.email = "ელ. ფოსტა არასწორია";
    }

    // Validate Phone Number
    let tel = document.getElementById("tel").value.trim();
    if (!tel) {
      errors.tel = "აუცილებელი ველი";
    } else if (!/^[0-9]+$/.test(tel)) {
      errors.tel = "ტელ. ნომერი უნდა იყოს ციფრები";
    }

    // Validate Password
    let password = document.getElementById("password").value.trim();
    let passwConfirm = document.getElementById("passwConfirm").value.trim();
    if (!password) {
      errors.password = "აუცილებელი ველი";
    } else if (password !== passwConfirm) {
      errors.passwConfirm = "შეყვანილი პაროლები ერთმანეთს არ ემთხვევა";
    }

    // Display Errors
    document.querySelectorAll(".error-message").forEach((element) => {
      element.innerText = "";
      element.classList.remove("show-icon"); // Remove icon class initially
    });

    for (let key in errors) {
      let errorElement = document.getElementById("error-" + key);
      if (errorElement) {
        errorElement.innerText = errors[key];
        errorElement.classList.add("show-icon"); // Add icon class if there's an error
      }
    }

    // Submit the form if there are no errors
    if (Object.keys(errors).length === 0) {
      document.getElementById("registration-form").submit();
    }
  });
