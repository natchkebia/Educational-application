document.addEventListener("DOMContentLoaded", () => {
  const filters = document.querySelectorAll(
    '.filter-content input[type="checkbox"]'
  );

  filters.forEach((filter) => {
    filter.addEventListener("change", updateFilters);
  });

  const clearFiltersButton = document.getElementById("clear-filters");
  if (clearFiltersButton) {
    clearFiltersButton.addEventListener("click", clearSelectedFilters);
  }

  
  fetch("../data/data.json")
    .then((response) => response.json())
    .then((data) => {
      courses = data.courses;
      displayCourses();
    })
    .catch((error) => console.error("Error fetching course data:", error));
  const sortingOptions = document.querySelectorAll(
    ".courses__header--content p"
  );
  sortingOptions.forEach((option) => {
    option.addEventListener("click", () => {
      sortOrder = option.textContent;
      updateSortingHeader(sortOrder);
      displayCourses();
    });
  });
});

const coursesPerPage = 9;
let currentPage = 1;
let activeFilters = {
  date: [],
  price: [],
  stars: [],
  title: [],
  duration: [],
  discountedPrice: [],
  level: [],
};
let courses = [];
let sortOrder = "popularity";
function updateSortingHeader(sortOrder) {
  const sortingHeader = document.querySelector(".courses__header h3");
  if (sortingHeader) {
    sortingHeader.textContent = sortOrder;
  }
}

function toggleFilter(filterId, headerElement) {
  const filterContent = document.getElementById(filterId);
  const filterIcon = headerElement.querySelector(".filter__icon");

  if (filterContent.style.display === "none" || !filterContent.style.display) {
    filterContent.style.display = "block";
    filterIcon.src = "../icons/arrow-up.svg";
    headerElement.classList.add("active");
  } else {
    filterContent.style.display = "none";
    filterIcon.src = "../icons/arrow-down.svg";
    headerElement.classList.remove("active");
  }
}

function toggleShowMore() {
  const additionalFilters = document.getElementById("additional-filters");
  const showMoreButton = document.getElementById("show-more");

  if (
    additionalFilters.style.display === "none" ||
    !additionalFilters.style.display
  ) {
    additionalFilters.style.display = "block";
    showMoreButton.textContent = "იხილეთ ნაკლები";
    additionalFilters.classList.add("show");
  } else {
    additionalFilters.style.display = "none";
    showMoreButton.textContent = "იხილეთ მეტი";
    additionalFilters.classList.remove("show");
  }
}

function calculateDurationInMonths(startDateStr, endDateStr) {
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);
  const yearDifference = endDate.getFullYear() - startDate.getFullYear();
  const monthDifference = endDate.getMonth() - startDate.getMonth();
  return yearDifference * 12 + monthDifference;
}

function filterCourses() {
  return courses.filter((course) => {
    const [startDateStr, endDateStr] = course.date.split(" - ");
    const durationInMonths = calculateDurationInMonths(
      startDateStr,
      endDateStr
    );

    return (
      (activeFilters.date.length === 0 ||
        activeFilters.date.includes(course.date)) &&
      (activeFilters.price.length === 0 ||
        activeFilters.price.some((priceRange) => {
          const [min, max] = priceRange.split("-").map(Number);
          return (
            course.discountedPrice &&
            course.discountedPrice.replace("₾", "") >= min &&
            course.discountedPrice.replace("₾", "") <= max
          );
        })) &&
      (activeFilters.stars.length === 0 ||
        activeFilters.stars.includes(course.stars.toString())) &&
      (activeFilters.title.length === 0 ||
        activeFilters.title.some((title) =>
          course.title.toLowerCase().includes(title.toLowerCase())
        )) &&
      (activeFilters.duration.length === 0 ||
        activeFilters.duration.some((durationRange) => {
          const [min, max] = durationRange.split("-").map(Number);
          return durationInMonths >= min && durationInMonths <= max;
        })) &&
      (activeFilters.discountedPrice.length === 0 ||
        activeFilters.discountedPrice.some((discountRange) => {
          const [min, max] = discountRange.split("-").map(Number);
          return (
            course.discountedPrice &&
            course.discountedPrice.replace("₾", "") >= min &&
            course.discountedPrice.replace("₾", "") <= max
          );
        })) &&
      (activeFilters.level.length === 0 ||
        activeFilters.level.includes(course.level))
    );
  });
}

function sortCourses(courses) {
  if (!sortOrder || sortOrder === "პოპულარობით") {
    const frequencyMap = courses.reduce((map, course) => {
      map[course.title] = (map[course.title] || 0) + 1;
      return map;
    }, {});
    return courses.sort(
      (a, b) => frequencyMap[b.title] - frequencyMap[a.title]
    );
  }

  switch (sortOrder) {
    case "ფასის ზრდადობით":
      return courses.sort(
        (a, b) =>
          parseFloat(a.discountedPrice.replace("₾", "")) -
          parseFloat(b.discountedPrice.replace("₾", ""))
      );
    case "ფასის კლებადობით":
      return courses.sort(
        (a, b) =>
          parseFloat(b.discountedPrice.replace("₾", "")) -
          parseFloat(a.discountedPrice.replace("₾", ""))
      );
    case "შეფასებებით":
      return courses.sort((a, b) => b.stars - a.stars);
    default:
      return courses;
  }
}

function displayCourses() {
  const courseList = document.getElementById("course-list");
  courseList.innerHTML = "";

  const filteredCourses = filterCourses();
  const sortedCourses = sortCourses(filteredCourses);

  const start = (currentPage - 1) * coursesPerPage;
  const end = start + coursesPerPage;
  const paginatedCourses = sortedCourses.slice(start, end);

  courseList.innerHTML = generateCourseCards(paginatedCourses);
  displayPagination(sortedCourses.length);
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
                  <img src="${course.imageUrl2 || course.imageUrl}" alt="${
        course.altText
      }" />
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
                          <div class="stars">${generateStars(
                            course.stars
                          )}</div>
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
    '<object type="image/svg+xml" data="../icons/star.svg"></object>';
  return starSVG.repeat(starCount);
}

const prevButton = document.getElementById("prev-page");
const nextButton = document.getElementById("next-page");

if (prevButton) {
  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      displayCourses();
    }
  });
}

if (nextButton) {
  nextButton.addEventListener("click", () => {
    const totalCourses = filterCourses().length;
    if (currentPage < Math.ceil(totalCourses / coursesPerPage)) {
      currentPage++;
      displayCourses();
    }
  });
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
    title: Array.from(
      document.querySelectorAll('input[name="title"]:checked')
    ).map((el) => el.value),
    duration: Array.from(
      document.querySelectorAll('input[name="duration"]:checked')
    ).map((el) => el.value),
    discountedPrice: Array.from(
      document.querySelectorAll('input[name="discountedPrice"]:checked')
    ).map((el) => el.value),
    level: Array.from(
      document.querySelectorAll('input[name="level"]:checked')
    ).map((el) => el.value),
  };
  currentPage = 1;
  displayCourses();
  updateSelectedFilters();
}

function updateSelectedFilters() {
  const selectedFiltersContainer = document.getElementById("selected-filters");
  const selectedFiltersSection = document.querySelector(".selected");
  const parentContainer = document.querySelector(".parent-container");

  selectedFiltersContainer.innerHTML = "";

  const selectedFilters = document.querySelectorAll(
    '.filter-content input[type="checkbox"]:checked'
  );

  if (selectedFilters.length > 0) {
    selectedFiltersSection.style.display = "flex";
    parentContainer.classList.add("selected-visible");

    selectedFilters.forEach((filter) => {
      const filterValue = filter.nextElementSibling.textContent;
      const filterContainer = document.createElement("div");
      filterContainer.className = "filter";

      const filterText = document.createElement("span");
      filterText.textContent = filterValue;

      const filterCloseButton = document.createElement("button");
      filterCloseButton.textContent = "X";
      filterCloseButton.addEventListener("click", () => {
        filter.checked = false;
        updateFilters();
      });

      filterContainer.appendChild(filterText);
      filterContainer.appendChild(filterCloseButton);
      selectedFiltersContainer.appendChild(filterContainer);
    });
  } else {
    selectedFiltersSection.style.display = "none";
    parentContainer.classList.remove("selected-visible");
  }
}

function clearSelectedFilters() {
  const selectedFilters = document.querySelectorAll(
    '.filter-content input[type="checkbox"]:checked'
  );
  selectedFilters.forEach((filter) => {
    filter.checked = false;
  });
  updateFilters();
}

function clearSelectedFilters() {
  const selectedFilters = document.querySelectorAll(
    '.filter-content input[type="checkbox"]:checked'
  );
  selectedFilters.forEach((filter) => {
    filter.checked = false;
  });
  updateFilters();

  displayCourses();
}

document.querySelector(".course__sort").addEventListener("click", function () {
  const content = document.querySelector(".courses__header--content");
  const icon = this.querySelector(".filter__icon");

  if (content.style.display === "none" || content.style.display === "") {
    content.style.display = "flex";
    icon.src = "../icons/black-arrow-up.svg";
  } else {
    content.style.display = "none";
    icon.src = "../icons/black-arrow-down.svg";
  }
});

const sortingDropdown = document.getElementById("sorting-dropdown");
if (sortingDropdown) {
  sortingDropdown.addEventListener("change", (event) => {
    sortOrder = event.target.value;
    displayCourses();
  });
}


// responsive


document.getElementById('filter-button').addEventListener('click', function () {
  document.getElementById('course').classList.toggle('new-class');
});

function toggleFilter(filterId, headerElement) {
  const filterContent = document.getElementById(filterId);
  const isExpanded = headerElement.getAttribute('aria-expanded') === 'true';
  headerElement.setAttribute('aria-expanded', !isExpanded);
  filterContent.style.display = isExpanded ? 'none' : 'block';
}

function toggleShowMore() {
  const additionalFilters = document.getElementById('additional-filters');
  const showMoreText = document.getElementById('show-more');
  if (additionalFilters.style.display === 'block') {
    additionalFilters.style.display = 'none';
    showMoreText.innerText = 'იხილეთ მეტი';
  } else {
    additionalFilters.style.display = 'block';
    showMoreText.innerText = 'ჩაკეცვა';
  }
}

