const loginBtn = document.querySelector(".login-btn");
const login = document.querySelector(".header__nav--dropdown");

loginBtn.addEventListener("click", () => {
  login.classList.toggle("hide");
});

document.addEventListener("click", (e) => {
  if (!login.contains(e.target) && e.target !== loginBtn) {
    login.classList.add("hide");
  }
});
