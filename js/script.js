// hero

let currentIndex = 0;

function moveSlide(direction) {
  const slides = document.querySelectorAll(".slider__slide");
  const totalSlides = slides.length;

  currentIndex += direction;

  if (currentIndex < 0) {
    currentIndex = totalSlides - 1;
  } else if (currentIndex >= totalSlides) {
    currentIndex = 0;
  }

  updateSlidePosition();
  updateDots();
}

function currentSlide(index) {
  currentIndex = index;
  updateSlidePosition();
  updateDots();
}

function updateSlidePosition() {
  const newTransformValue = -currentIndex * 100;
  document.querySelector(
    ".hero__container--slider"
  ).style.transform = `translateX(${newTransformValue}%)`;
}

function updateDots() {
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot) => dot.classList.remove("active"));
  dots[currentIndex].classList.add("active");
}

function detectSwipe(element, callback) {
  let touchStartX = 0;
  let touchEndX = 0;

  element.addEventListener("touchstart", function (event) {
    touchStartX = event.changedTouches[0].screenX;
  });

  element.addEventListener("touchend", function (event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    if (touchEndX < touchStartX) {
      callback(1); 
    } else if (touchEndX > touchStartX) {
      callback(-1);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateSlidePosition();
  updateDots();

  const slider = document.querySelector(".hero__container--slider");
  detectSwipe(slider, moveSlide);
});

// courses

const slides = document.querySelector(".slider-container");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
let coursesCurrentIndex = 0;

function updateSlider() {
  const offset = -coursesCurrentIndex * (270 + 24);
  slides.style.transform = `translateX(${offset}px)`;
}

nextButton.addEventListener("click", () => {
  coursesCurrentIndex++;
  if (coursesCurrentIndex > slides.children.length - 4) {
    coursesCurrentIndex = 0;
  }
  updateSlider();
});

prevButton.addEventListener("click", () => {
  coursesCurrentIndex--;
  if (coursesCurrentIndex < 0) {
    coursesCurrentIndex = slides.children.length - 4;
  }
  updateSlider();
});
