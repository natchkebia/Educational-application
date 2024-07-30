document.addEventListener("DOMContentLoaded", () => {
    fetch("../data/data.json")
      .then((response) => response.json())
      .then((data) => {
        courses = data.courses;
        displayCourses();
      })
      .catch((error) => console.error("Error fetching course data:", error));
  });
  
  const coursesPerPage = 9;
  let currentPage = 1;
  let activeFilters = {
    date: [],
    price: [],
    stars: [],
  };
  
  let courses = [];
  
  function toggleFilter(filterId) {
    const filterContent = document.getElementById(filterId);
    filterContent.style.display =
      filterContent.style.display === "none" ? "block" : "none";
  }
  
  function displayCourses() {
    const courseList = document.getElementById("course-list");
    courseList.innerHTML = "";
  
    const filteredCourses = courses.filter((course) => {
      return (
        (activeFilters.date.length === 0 ||
          activeFilters.date.includes(course.date)) &&
        (activeFilters.price.length === 0 ||
          activeFilters.price.some((priceRange) => {
            const [min, max] = priceRange.split("-").map(Number);
            const discountedPrice = parseInt(
              course.discountedPrice.replace("₾", "")
            );
            return discountedPrice >= min && discountedPrice <= max;
          })) &&
        (activeFilters.stars.length === 0 ||
          activeFilters.stars.includes(course.stars.toString()))
      );
    });
  
    const start = (currentPage - 1) * coursesPerPage;
    const end = start + coursesPerPage;
    const paginatedCourses = filteredCourses.slice(start, end);
  
    courseList.innerHTML = generateCourseCards(paginatedCourses);
    displayPagination(filteredCourses.length);
  }
 
  function generateCourseCards(courses) {
    console.log(courses, 'aa');
    return courses
      .map(
        (course) => `
          <a class="courses__slider--card new__card" href="../detail-pages/courses-detail-page.html">
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
          </a>
        `
      )
      .join("");
  }
  
  function generateStars(starCount) {
    const starSVG =
      '<object type="image/svg+xml" data="../icons/star.svg"></object>';
    return starSVG.repeat(starCount);
  }
  
  function displayPagination(totalCourses) {
    const pageNumbers = document.getElementById("page-numbers");
    pageNumbers.innerHTML = "";
  
    const totalPages = Math.ceil(totalCourses / coursesPerPage);
  
    for (let i = 1; i <= totalPages; i++) {
      const pageNumber = document.createElement("span");
      pageNumber.className = "page-number";
      pageNumber.textContent = i;
      if (i === currentPage) {
        pageNumber.classList.add("active");
      }
      pageNumber.addEventListener("click", () => {
        currentPage = i;
        displayCourses();
      });
      pageNumbers.appendChild(pageNumber);
    }
  }
  
  function updateFilters() {
    activeFilters = {
      date: Array.from(
        document.querySelectorAll('input[name="date"]:checked')
      ).map((el) => el.value),
      price: Array.from(
        document.querySelectorAll('input[name="price"]:checked')
      ).map((el) => el.value),
      stars: Array.from(
        document.querySelectorAll('input[name="stars"]:checked')
      ).map((el) => el.value),
    };
    currentPage = 1;
    displayCourses();
  }
  
  document
    .querySelectorAll('input[name="date"]')
    .forEach((el) => el.addEventListener("change", updateFilters));
  document
    .querySelectorAll('input[name="price"]')
    .forEach((el) => el.addEventListener("change", updateFilters));
  document
    .querySelectorAll('input[name="stars"]')
    .forEach((el) => el.addEventListener("change", updateFilters));
  
  document.getElementById("prev-page").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      displayCourses();
    }
  });
  
  document.getElementById("next-page").addEventListener("click", () => {
    const totalPages = Math.ceil(courses.length / coursesPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      displayCourses();
    }
  });
  
  window.onload = () => {
    displayCourses();
  };
  