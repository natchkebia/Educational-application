document.querySelectorAll(".gallery__btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    // Remove active class from all thumbnails
    document.querySelectorAll(".gallery__btn--active").forEach((thumbnail) => {
      thumbnail.classList.remove("gallery__btn--active");
    });

    // Add active class to the clicked thumbnail
    this.classList.add("gallery__btn--active");

    // Change the main image based on the clicked thumbnail
    const target = this.getAttribute("data-target");
    const newSrc = `../images/library/el-book${target}.png`;
    document.getElementById("mainSlide").src = newSrc;
  });
});
