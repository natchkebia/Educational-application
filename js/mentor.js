document.addEventListener("DOMContentLoaded", () => {
    fetch("../data/data.json")
      .then((response) => response.json())
      .then((data) => {
        const filteredCourses = data.courses.filter(
          (course) => course.mentor === "ნია ხვიტია"
        );
  
        document.querySelector('h3 span').textContent = `(${filteredCourses.length})`;

        displayCourses(filteredCourses);
      })
      .catch((error) => console.error("Error fetching course data:", error));
  });
  
  function generateCourseCards(courses, bgClass = '') {
    return courses
      .map(
        (course) => `
          <a class="courses__slider--card new__card" href="../detail-pages/courses-detail-page.html">
              <div class="slider__card--img">
                  <img src="${course.imageUrl2 || course.imageUrl}" alt="${course.altText}" />
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
                              ${course.originalPrice ? `<span class="custom-underline">${course.originalPrice}</span>` : ""}
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
                  ${course.discount ? `<div class="courses__slider--discount">-${course.discount}<object type="image/svg+xml" data="../icons/discount.svg"></object></div>` : ""}
              </div>
          </a>`
      )
      .join("");
  }
  
  function generateStars(starCount) {
    const starSVG =
      '<object type="image/svg+xml" data="../icons/star.svg"></object>';
    return starSVG.repeat(starCount);
  }  
  
  function displayCourses(courses) {
    const coursesContainer = document.querySelector(".mentor__courses--content");
    coursesContainer.innerHTML = generateCourseCards(courses);
  }
  