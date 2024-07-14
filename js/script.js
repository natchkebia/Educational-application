let currentIndex = 0;

function moveSlide(direction) {
  const slides = document.querySelectorAll('.slider__slide');
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
  document.querySelector('.hero__container--slider').style.transform = `translateX(${newTransformValue}%)`;
}

function updateDots() {
  const dots = document.querySelectorAll('.dot');
  dots.forEach(dot => dot.classList.remove('active'));
  dots[currentIndex].classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
  updateDots();
});
