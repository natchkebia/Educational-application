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
document.addEventListener("DOMContentLoaded", () => {
  fetch("./data/data.json")
    .then((response) => response.json())
    .then((data) => {
      const sliderContainer = document.getElementById("slider-container");
      sliderContainer.innerHTML = generateCourseCards(data.courses);
      initializeSlider();
    })
    .catch((error) => console.error("Error fetching course data:", error));
});

function generateCourseCards(courses) {
  return courses
    .map(
      (course) => `
    <a class="courses__slider--card"  href="./detail-pages/courses-detail-page.html">
      <div class="slider__card--img">
        <img src="${course.imageUrl}" alt="${course.altText}" />
        <div class="courses__slider--people">
        <div class="courses__slider--wrapper img1"></div>
        <div class="courses__slider--wrapper img2"></div>
        <div class="courses__slider--wrapper img3"></div>
        <div class="courses__slider--wrapper img4"></div>
        <div class="courses__slider--wrapper img5"></div>
        <span>${course.spots} ადგილი</span>
      </div>
      </div>
      <div class="course__slider--wraper">
        <div class="slider__card--text">
          <p>${course.date}</p>
          <h3>${course.title}</h3>
          <p>${course.description}</p>
          <div class="slider__card--text--footer">
            <div class="stars">
              ${generateStars(course.stars)}
            </div>
            <div class="courses__prise">
              ${
                course.originalPrice
                  ? `<span class="custom-underline">${course.originalPrice}</span>`
                  : ""
              }
              <span>${course.discountedPrice}</span>
            </div>
          </div>
        </div>
        <div class="slider__card--footer">
          <div class="slider__card--footer--svg">
            <object type="image/svg+xml" data="icons/lection.svg"></object>
            <span>${course.lectures} ლექცია</span>
          </div>
          <div class="slider__card--footer--svg">
            <object type="image/svg+xml" data="icons/time.svg"></object>
            <span>${course.hours} საათი</span>
          </div>
        </div>
      </div>
      
      ${
        course.discount
          ? `<div class="courses__slider--discount">-${course.discount}<object type="image/svg+xml" data="icons/discount.svg"></object></div>`
          : ""
      }
    </a>
  `
    )
    .join("");
}

function generateStars(starCount) {
  const starSVG =
    '<object type="image/svg+xml" data="icons/star.svg"></object>';
  return starSVG.repeat(starCount);
}

function initializeSlider() {
  const sliderContainer = document.getElementById("slider-container");
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");
  let coursesCurrentIndex = 0;
  let slideWidth = 270 + 24;
  let startX = 0;
  let endX = 0;

  function updateSlider() {
    const offset = -coursesCurrentIndex * slideWidth;
    sliderContainer.style.transform = `translateX(${offset}px)`;
  }

  function showNextSlide() {
    coursesCurrentIndex++;
    if (window.innerWidth <= 547) {
      if (coursesCurrentIndex > sliderContainer.children.length - 1) {
        coursesCurrentIndex = 0;
      }
    } else if (window.innerWidth <= 860) {
      if (coursesCurrentIndex > sliderContainer.children.length - 2) {
        coursesCurrentIndex = 0;
      }
    } else if (window.innerWidth <= 1024) {
      if (coursesCurrentIndex > sliderContainer.children.length - 3) {
        coursesCurrentIndex = 0;
      }
    } else {
      if (coursesCurrentIndex > sliderContainer.children.length - 4) {
        coursesCurrentIndex = 0;
      }
    }
    updateSlider();
  }

  function showPrevSlide() {
    coursesCurrentIndex--;
    if (coursesCurrentIndex < 0) {
      if (window.innerWidth <= 547) {
        coursesCurrentIndex = sliderContainer.children.length - 1;
      } else if (window.innerWidth <= 860) {
        coursesCurrentIndex = sliderContainer.children.length - 2;
      } else if (window.innerWidth <= 1024) {
        coursesCurrentIndex = sliderContainer.children.length - 3;
      } else {
        coursesCurrentIndex = sliderContainer.children.length - 4;
      }
    }
    updateSlider();
  }

  nextButton.addEventListener("click", showNextSlide);
  prevButton.addEventListener("click", showPrevSlide);

  sliderContainer.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  sliderContainer.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX;
    const distance = endX - startX;
    if (Math.abs(distance) > 50) {
      if (distance < 0) {
        showNextSlide();
      } else {
        showPrevSlide();
      }
    }
  });

  updateSlider();

  function updateButtonVisibility() {
    if (window.innerWidth <= 1270) {
      prevButton.style.display = "none";
      nextButton.style.display = "none";
    } else {
      prevButton.style.display = "block";
      nextButton.style.display = "block";
    }
  }

  function updateSlideWidth() {
    if (window.innerWidth <= 547) {
      slideWidth = window.innerWidth;
    } else if (window.innerWidth <= 860) {
      slideWidth = (window.innerWidth - 2 * 12) / 2;
    } else if (window.innerWidth <= 1024) {
      slideWidth = (window.innerWidth - 2 * 12) / 3;
    } else {
      slideWidth = 270 + 24;
    }
    sliderContainer.style.transform = `translateX(-${
      coursesCurrentIndex * slideWidth
    }px)`;
  }

  window.addEventListener("resize", () => {
    updateButtonVisibility();
    updateSlideWidth();
  });
  updateButtonVisibility();
  updateSlideWidth();
}
