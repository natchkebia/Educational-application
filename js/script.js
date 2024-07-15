// hero
let current = 0;

function moveSlide(direction) {
  const slides = document.querySelectorAll('.slider__slide');
  const totalSlides = slides.length;

  current += direction;

  if (current < 0) {
    current = totalSlides - 1;
  } else if (current >= totalSlides) {
    current = 0;
  }

  updateSlidePosition();
  updateDots();
}

function currentSlide(index) {
  current = index;
  updateSlidePosition();
  updateDots();
}

function updateSlidePosition() {
  const newTransformValue = -current * 100;
  document.querySelector('.hero__container--slider').style.transform = `translateX(${newTransformValue}%)`;
}

function updateDots() {
  const dots = document.querySelectorAll('.dot');
  dots.forEach(dot => dot.classList.remove('active'));
  dots[current].classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
  updateDots();
});

// courses 

const slides = document.querySelector('.slider-container');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
let currentIndex = 0;

function updateSlider() {
    const offset = -currentIndex * (270 + 24);
    slides.style.transform = `translateX(${offset}px)`;
}

nextButton.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex > slides.children.length - 4) { 
        currentIndex = 0; 
    }
    updateSlider();
});

prevButton.addEventListener('click', () => {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = slides.children.length - 4; 
    }
    updateSlider();
});
