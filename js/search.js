const icon = document.querySelector(".icon");
const search = document.querySelector(".search");
const input = document.querySelector(".input input"); // Select input directly

icon.onclick = function () {
  search.classList.toggle("active");
};

function clearInput() {
  input.value = ""; // Clear the input field
}
