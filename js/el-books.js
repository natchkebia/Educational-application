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

// acordion
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(".accordion__section");

  sections.forEach((section) => {
    const title = section.querySelector(".accordion__title");
    // Event listener for the accordion title
    title.addEventListener("click", function (event) {
      event.stopPropagation();

      // Toggle "show-content" class for the clicked section
      section.classList.toggle("show-content");

      // Close other sections
      sections.forEach((otherSection) => {
        if (otherSection !== section) {
          otherSection.classList.remove("show-content");
          otherSection
            .querySelector(".more__content")
            .classList.remove("show-more");
          const otherButtons = otherSection.querySelectorAll(".more__button");
          otherButtons.forEach((button) => {
            button.textContent = "იხილე მეტი";
            button.classList.remove("hidden");
          });
        }
      });
    });
  });
});

// see more btn

document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("toggleButton");
  const textContent = document.querySelector(".accordion__text");
  const buttonText = document.getElementById("buttonText");
  const toggleIcon = document.getElementById("toggleIcon");

  let isExpanded = false;

  toggleButton.addEventListener("click", (e) => {
    e.preventDefault();
    isExpanded = !isExpanded;

    if (isExpanded) {
      textContent.classList.add("expanded");
      buttonText.textContent = "იხილე ნაკლები";
      toggleIcon.classList.add("rotate");
    } else {
      textContent.classList.remove("expanded");
      buttonText.textContent = "იხილე მეტი";
      toggleIcon.classList.remove("rotate");
    }
  });
});
