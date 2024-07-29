document
  .getElementById("registration-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let errors = {};

    // Validate First Name
    let firstname = document.getElementById("firstname").value.trim();
    if (!firstname) {
      errors.firstname = "აუცილებელი ველი";
    }

    // Validate Last Name
    let lastname = document.getElementById("lastname").value.trim();
    if (!lastname) {
      errors.lastname = "აუცილებელი ველი";
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
      errors.passwConfirm = "პაროლები არ ემთხვევა";
    }

    // Display Errors
    document.querySelectorAll(".error-message").forEach((element) => {
      element.innerText = "";
    });

    for (let key in errors) {
      let errorElement = document.getElementById("error-" + key);
      if (errorElement) {
        errorElement.innerText = errors[key];
      }
    }

    // Submit the form if there are no errors
    if (Object.keys(errors).length === 0) {
      document.getElementById("registration-form").submit();
    }
  });
