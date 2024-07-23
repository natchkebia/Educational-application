
document.addEventListener("DOMContentLoaded", function () {
  const titles = document.querySelectorAll(".column--title");

  titles.forEach((title) => {
    title.addEventListener("click", () => {
      const column = title.parentElement;
      column.classList.toggle("down");
    });
  });
});
