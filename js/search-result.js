document.addEventListener("DOMContentLoaded", () => {
  // Retrieve search results from localStorage
  const searchResults = JSON.parse(localStorage.getItem("searchResults"));

  // Get the container for search results
  const searchedList = document.getElementById("searched-list");

  // Check if there are search results
  if (searchResults && searchResults.length > 0) {
    // Generate the HTML for course cards
    const courseCardsHTML = createCards(searchResults);

    // Insert the generated HTML into the searched-list div
    searchedList.innerHTML = courseCardsHTML;
  } else {
    // Display a message if there are no results
    searchedList.innerHTML = "<p>No results found.</p>";
  }
});

// Function to create cards (imported from courses.js)
function createCards(courses) {
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
                            <img src="${
                              course.imageUrl2 || course.imageUrl
                            }" alt="${course.altText}" />
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
                                    <p class="course-card ${bgClass}">${
        course.level
      }</p>
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
                                    <span>${course.duration} საათი</span>
                                </div>
                            </div>
                        </div>
                    </a>
                `;
    })
    .join("");
}

function generateStars(stars) {
  const fullStar =
    '<object type="image/svg+xml" data="../icons/full-star.svg"></object>';
  const emptyStar =
    '<object type="image/svg+xml" data="../icons/empty-star.svg"></object>';
  return fullStar.repeat(stars) + emptyStar.repeat(5 - stars);
}
