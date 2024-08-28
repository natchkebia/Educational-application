document.addEventListener("DOMContentLoaded", () => {
  fetch("../data/data.json")
    .then((response) => response.json())
    .then((data) => {
      const filteredCourses = data.courses.filter(
        (course) => course.mentor === "ნია ხვიტია"
      );

      document.querySelector(
        "h2 span"
      ).textContent = `(${filteredCourses.length})`;

      displayCourses(filteredCourses);
      initializeSlider();
    })
    .catch((error) => console.error("Error fetching course data:", error));
});

function displayCourses(courses) {
  const sliderContainer = document.getElementById("slider-container");
  sliderContainer.innerHTML = generateCourseCards(courses);
}

function generateCourseCards(courses) {
  return courses
    .map((course) => {
      let bgClass;
      switch (course.level) {
        case "დამწყები":
          bgClass = "beginner-bg";
          break;
        case "სამოყვარულო":
          bgClass = "intermediate-bg";
          break;
        case "პროფესიონალური":
          bgClass = "professional-bg";
          break;
        default:
          bgClass = "";
      }

      return `
        <a class="courses__slider--card new__card" href="../detail-pages/courses-detail-page.html">
            <div class="slider__card--img">
                <img src="${course.imageUrl2}" alt="${course.altText}" />
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
                    <div>
                        <p>${course.date}</p>
                        <p class="course-card ${bgClass}">${course.level}</p>
                    </div>
                    <h3>${course.title}</h3>
                    <p>${course.description}</p>
                    <div class="slider__card--text--footer">
                        <div class="stars">${generateStars(course.stars)}</div>
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
                        <object type="image/svg+xml" data="../icons/lection.svg"></object>
                        <span>${course.lectures} ლექცია</span>
                    </div>
                    <div class="slider__card--footer--svg">
                        <object type="image/svg+xml" data="../icons/time.svg"></object>
                        <span>${course.hours} საათი</span>
                    </div>
                </div>
                ${
                  course.discount
                    ? `<div class="courses__slider--discount">-${course.discount}<object type="image/svg+xml" data="../icons/discount.svg"></object></div>`
                    : ""
                }
            </div>
        </a>`;
    })
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
