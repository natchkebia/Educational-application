document
  .getElementById("registration-form")
  .addEventListener("submit", handleSubmit);

function validateField(field) {
  const value = document.getElementById(field).value.trim();
  const errorElement = document.getElementById(`error-${field}`);

  if (!value) {
    errorElement.textContent = "ეს ველი სავალდებულოა";
    return false;
  } else {
    errorElement.textContent = "";
    return true;
  }
}

function handleSubmit(event) {
  event.preventDefault(); 
  const isValidFirstName = validateField("firstname");
  const isValidEmail = validateField("email");
  const isValidText = validateField("textarea");

  if (isValidFirstName && isValidEmail && isValidText) {
    document.querySelector(".success__message").style.display = "flex";
    document.getElementById("registration-form").reset();
  }
}

function toggleAccordion(element) {
  const content = element.nextElementSibling;
  const arrow = element.querySelector("img");

  if (content.style.display === "block") {
    content.style.display = "none";
    arrow.src = "../icons/arrow-down.svg";
  } else {
    content.style.display = "block";
    arrow.src = "../icons/arrow-up.svg";
  }
}
