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

let searchHistory = []; // Store search terms with dates

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
    item.style.display = ""; // Reset to default
  });

  clearBtn.style.display = "none";
  input.value = "";
  search.classList.remove("active");
  searchWrapper.classList.remove("search-wrapper");
  searchDropdown.classList.remove("show"); // Hide search results dropdown
  searchHistoryDropdown.classList.remove("show"); // Hide search history dropdown
}

// Clear the input field when the clear button is clicked
clearBtn.onclick = function () {
  input.value = "";
  clearBtn.style.display = "none";
  searchDropdown.classList.remove("show"); // Hide search results dropdown
  searchHistoryDropdown.classList.add("show"); // Show search history dropdown
};

// Show or hide the clear button when the user types
input.addEventListener("input", function () {
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
});

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
    searchResults.appendChild(li);
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
  const date = new Date().toLocaleDateString(); // Get current date
  searchHistory = searchHistory.filter((entry) => entry.query !== query); // Remove any existing entry with the same query
  searchHistory.push({ query, date }); // Add new entry
}

function showSearchHistory() {
  searchHistoryDropdown.innerHTML = "";

  searchHistory.forEach((historyItem) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div>
        <strong>${historyItem.query}</strong><br>
        <small>Date: ${historyItem.date}</small>
      </div>
    `;
    searchHistoryDropdown.appendChild(li);
  });

  searchHistoryDropdown.classList.add("show");
}
