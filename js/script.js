// testimonial

const slides = document.querySelector(".slider-container");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
let currentIndex = 0;

function updateSlider() {
  const offset = -currentIndex * (270 + 24);
  slides.style.transform = `translateX(${offset}px)`;
}

nextButton.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex > slides.children.length - 4) {
    currentIndex = 0;
  }
  updateSlider();
});

prevButton.addEventListener("click", () => {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = slides.children.length - 4;
  }
  updateSlider();
});
