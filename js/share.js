export function generateCourseCards(courses) {
    return courses
      .map(
        (course) => `
      <a class="courses__slider--card" href="${course.detailPageLink || './detail-pages/courses-detail-page.html'}">
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
              <object type="image/svg+xml" data="${course.lectionIcon || 'icons/lection.svg'}"></object>
              <span>${course.lectures} ლექცია</span>
            </div>
            <div class="slider__card--footer--svg">
              <object type="image/svg+xml" data="${course.timeIcon || 'icons/time.svg'}"></object>
              <span>${course.hours} საათი</span>
            </div>
          </div>
          ${
            course.discount
              ? `<div class="courses__slider--discount">-${course.discount}<object type="image/svg+xml" data="${course.discountIcon || 'icons/discount.svg'}"></object></div>`
              : ""
          }
        </div>
      </a>
    `
      )
      .join("");
  }
  
  export function generateStars(starCount) {
    const starSVG = '<object type="image/svg+xml" data="icons/star.svg"></object>';
    return starSVG.repeat(starCount);
  }
  
  export function updateButtonVisibility(prevButton, nextButton) {
    if (window.innerWidth <= 1270) {
      prevButton.style.display = "none";
      nextButton.style.display = "none";
    } else {
      prevButton.style.display = "block";
      nextButton.style.display = "block";
    }
  }
  