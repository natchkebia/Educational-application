const icon = document.querySelector(".icon");
const search = document.querySelector(".search");
const input = document.querySelector(".input input");
const clearBtn = document.querySelector(".clear");
const navItems = document.querySelectorAll(
  ".header__nav--list--item:nth-child(-n+4)"
);
const searchWrapper = document.getElementById("search-wrapper");
const searchDropdown = document.getElementById("search-dropdown");
const searchResults = document.getElementById("search-results");
const searchHistoryDropdown = document.getElementById("search-history");

let searchHistory = [];
let debounceTimeout;

// Debounce function to delay execution
function debounce(func, delay) {
  return function (...args) {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => func(...args), delay);
  };
}

// Function to format the date and time
function formatDateTime(date) {
  const months = [
    "იანვ",
    "ფებ",
    "მარ",
    "აპრ",
    "მაი",
    "ივნ",
    "ივლ",
    "აგვ",
    "სექ",
    "ოქტ",
    "ნოემბ",
    "დეკ",
  ];

  const day = date.getDate().toString().padStart(2, "0");
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day} ${month} ${year} - ${hours}:${minutes}`;
}

// Toggle active class when search icon is clicked
icon.onclick = function (event) {
  search.classList.toggle("active");

  if (search.classList.contains("active")) {
    navItems.forEach((item) => {
      item.style.display = "none";
    });

    searchWrapper.classList.add("search-wrapper");
  } else {
    closeSearch();
  }

  event.stopPropagation();
};

// Close the search when clicking outside
document.addEventListener("click", function (event) {
  if (
    search.classList.contains("active") &&
    !search.contains(event.target) &&
    !icon.contains(event.target)
  ) {
    closeSearch();
  }
});

// Close the search and reset elements
function closeSearch() {
  navItems.forEach((item) => {
    item.style.display = "";
  });

  clearBtn.style.display = "none";
  input.value = "";
  search.classList.remove("active");
  searchWrapper.classList.remove("search-wrapper");
  searchDropdown.classList.remove("show");
  searchHistoryDropdown.classList.remove("show");
}

// Clear the input field when the clear button is clicked
clearBtn.onclick = function () {
  input.value = "";
  clearBtn.style.display = "none";
  searchDropdown.classList.remove("show");
  searchHistoryDropdown.classList.add("show"); // Show search history dropdown
};

// Show or hide the clear button when the user types
function onInputChange() {
  const query = input.value.trim();
  if (query.length > 0) {
    clearBtn.style.display = "flex";
    handleSearch(query); // Trigger search as the user types
    searchHistoryDropdown.classList.remove("show"); // Hide search history dropdown while searching
  } else {
    clearBtn.style.display = "none";
    searchDropdown.classList.remove("show"); // Hide dropdown if input is empty
    showSearchHistory(); // Show search history dropdown when input is empty
  }
}

const debouncedInputChange = debounce(onInputChange, 500); // Debounce with 500ms delay

input.addEventListener("input", debouncedInputChange);

// Function to fetch courses from data.json
async function fetchCourses() {
  try {
    const response = await fetch("./data/data.json");
    if (!response.ok) {
      throw new Error("Failed to fetch courses data");
    }
    const data = await response.json();
    return data.courses;
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
}

// Function to search through the fetched courses
function searchCourses(courses, query) {
  const lowerCaseQuery = query.toLowerCase();

  return courses.filter((course) => {
    const title = course.title ? course.title.toLowerCase() : "";
    const description = course.description
      ? course.description.toLowerCase()
      : "";
    const mentor = course.mentor ? course.mentor.toLowerCase() : "";

    return (
      title.includes(lowerCaseQuery) ||
      description.includes(lowerCaseQuery) ||
      mentor.includes(lowerCaseQuery)
    );
  });
}

// Function to display search results in the dropdown
function showResults(results) {
  searchResults.innerHTML = "";

  if (results.length === 0) {
    searchDropdown.classList.remove("show");
    return;
  }

  results.forEach((result) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div>
        <strong>${result.title}</strong><br>
        ${result.description}<br>
        <small>Mentor: ${result.mentor}, Price: ${result.discountedPrice} (Discount: ${result.discount})</small>
      </div>
    `;
    li.dataset.title = result.title; // Store the title in data attribute
    li.dataset.description = result.description; // Store the description in data attribute
    searchResults.appendChild(li);

    // Add click event listener to redirect to the result page
    li.addEventListener("click", () => {
      window.location.href = `./detail-pages/courses-detail-page.html?id=${encodeURIComponent(
        result.id
      )}`;
    });
  });

  searchDropdown.classList.add("show");
}

// Function to handle search
async function handleSearch(query) {
  if (query.length > 0) {
    const courses = await fetchCourses(); // Fetch courses data
    const filteredResults = searchCourses(courses, query); // Filter courses based on query
    showResults(filteredResults); // Display filtered results
    addToSearchHistory(query); // Add search term to history
  } else {
    searchDropdown.classList.remove("show"); // Hide dropdown if input is empty
  }
}

// Search history functions
function addToSearchHistory(query) {
  const dateTime = formatDateTime(new Date()); // Get current date and time
  searchHistory = searchHistory.filter((entry) => entry.query !== query); // Remove any existing entry with the same query
  searchHistory.push({ query, dateTime }); // Add new entry
}

function showSearchHistory() {
  searchHistoryDropdown.innerHTML = "";

  searchHistory.forEach((historyItem) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div>
        <strong>${historyItem.query}</strong><br>
        <small>${historyItem.dateTime}</small>
      </div>
    `;
    searchHistoryDropdown.appendChild(li);
  });

  searchHistoryDropdown.classList.add("show");
}
