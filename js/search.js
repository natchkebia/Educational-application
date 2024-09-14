import { getLinkPath } from "./adress.js";

const icon = document.querySelector(".icon");
const search = document.querySelector(".search");
const input = document.querySelector(".input input");
const clearBtn = document.querySelector(".clear");
const searchSubmitBtn = document.getElementById("search-submit"); // Grab the search submit button
const navItems = document.querySelectorAll(
  ".header__nav--list--item:nth-child(-n+4)"
);
const searchWrapper = document.getElementById("search-wrapper");
const searchDropdown = document.getElementById("search-dropdown");
const searchResults = document.getElementById("search-results");
const searchHistoryDropdown = document.getElementById("search-history");
const clearHistoryBtn = document.getElementById("clear-history-btn");
const noResults = document.getElementById("no-results");

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
    !icon.contains(event.target) &&
    !searchDropdown.contains(event.target) &&
    !searchHistoryDropdown.contains(event.target)
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
  noResults.style.display = "none"; // Hide "No results found" image
  searchSubmitBtn.disabled = true; // Disable submit button on search close
}

// Clear the input field when the clear button is clicked
clearBtn.onclick = function () {
  input.value = "";
  clearBtn.style.display = "none";
  searchDropdown.classList.remove("show");
  searchHistoryDropdown.classList.add("show"); // Show search history dropdown
  searchSubmitBtn.disabled = true; // Disable submit button when cleared
};

// Show or hide the clear button when the user types
function onInputChange() {
  const query = input.value.trim();

  if (query.length >= 3) {
    clearBtn.style.display = "flex";
    handleSearch(query); // Trigger search as the user types
    searchHistoryDropdown.classList.remove("show"); // Hide search history dropdown while searching
  } else {
    clearBtn.style.display = "none";
    searchDropdown.classList.remove("show"); // Hide dropdown if input is empty
    searchSubmitBtn.disabled = true; // Disable submit button if query is less than 3 characters
    // Show search history only if the input is focused
    if (input === document.activeElement) {
      showSearchHistory(); // Show search history dropdown when input is empty
    }
  }
}

const debouncedInputChange = debounce(onInputChange, 500); // Debounce with 500ms delay

input.addEventListener("input", debouncedInputChange);

// Function to fetch courses from data.json
async function fetchCourses() {
  try {
    const response = await fetch(getLinkPath("./data/data.json"));
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
    const mentor = course.mentor ? course.mentor.toLowerCase() : "";

    return title.includes(lowerCaseQuery) || mentor.includes(lowerCaseQuery);
  });
}

// Function to display search results in the dropdown
function showResults(results) {
  searchResults.innerHTML = "";

  if (results.length === 0) {
    console.log("No results found");
    searchDropdown.classList.add("show");
    searchResults.style.display = "none"; // Hide search results
    noResults.style.display = "block"; // Show "No results found" image
    searchSubmitBtn.disabled = true; // Disable submit button if no results
    return;
  }

  searchResults.style.display = "block";
  noResults.style.display = "none"; // Hide "No results found" image
  searchSubmitBtn.disabled = false; // Enable submit button if results found

  // Clear the existing search results in localStorage
  localStorage.removeItem("searchResults");
  localStorage.removeItem("searchQuery");

  // Store new search results and query in localStorage
  localStorage.setItem("searchResults", JSON.stringify(results));
  localStorage.setItem("searchQuery", input.value); // Store the query string

  results.forEach((result) => {
    const li = document.createElement("li");
    li.innerHTML = ` 
      <div>
        ${result.title}
      </div>
    `;
    li.dataset.title = result.title; // Store the title in data attribute
    li.dataset.id = result.id; // Assuming each course has a unique ID
    searchResults.appendChild(li);

    // Add click event listener to redirect to the detail page
    li.addEventListener("click", () => {
      const detailPageUrl = getLinkPath(
        `detail-pages/courses-detail-page.html?id=${encodeURIComponent(
          result.id
        )}`
      );
      window.location.href = detailPageUrl;
    });
  });

  searchDropdown.classList.add("show");
}

// Function to handle search
async function handleSearch(query) {
  if (query.length >= 3) {
    const courses = await fetchCourses(); // Fetch courses data
    const filteredResults = searchCourses(courses, query); // Filter courses based on query
    showResults(filteredResults); // Display results
  } else {
    searchDropdown.classList.remove("show"); // Hide dropdown if input is empty
    searchResults.style.display = "none"; // Hide search results
    noResults.style.display = "none"; // Hide "No results found" image
    searchSubmitBtn.disabled = true; // Disable submit button if no query
  }
}

// Search history functions
function addToSearchHistory(query) {
  const dateTime = formatDateTime(new Date()); // Get current date and time
  searchHistory = searchHistory.filter((entry) => entry.query !== query); // Remove any existing entry with the same query
  searchHistory.push({ query, dateTime }); // Add new entry

  // Save updated search history to local storage
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
}

function showSearchHistory() {
  // Load search history from local storage
  const savedHistory = localStorage.getItem("searchHistory");
  if (savedHistory) {
    searchHistory = JSON.parse(savedHistory);
  } else {
    searchHistory = [];
  }

  // Sort by date in ascending order (oldest first)
  searchHistory.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));

  // Limit to the latest 4 entries
  const limitedHistory = searchHistory.slice(0, 4);

  const historyResults = document.getElementById("history-results");
  historyResults.innerHTML = ""; // Clear previous results

  // Append items in the order of oldest first
  limitedHistory.forEach((historyItem) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div>
        <span>${historyItem.query}</span>
        <span class="date">${historyItem.dateTime}</span>
      </div>
    `;
    historyResults.appendChild(li);
  });

  historyResults.querySelectorAll("li").forEach((item) => {
    item.addEventListener("click", () => {
      const query = item.querySelector("span").textContent; // Get query from the span text content
      input.value = query; // Set input value
      handleSearch(query); // Trigger search
      searchHistoryDropdown.classList.remove("show"); // Hide history dropdown
    });
  });

  searchHistoryDropdown.classList.add("show");
}

// Show search history when the input field is focused
input.addEventListener("focus", showSearchHistory);

// Hide search history when the input field loses focus
input.addEventListener("blur", () => {
  // Delay hiding to allow for clicks on the search history
  setTimeout(() => {
    searchHistoryDropdown.classList.remove("show");
  }, 200);
});

// Clear search history function
function deleteHistory(event) {
  // Prevent search bar from closing
  event.stopPropagation();

  // Clear search history from local storage
  localStorage.removeItem("searchHistory");

  // Clear the searchHistory array in memory
  searchHistory = [];

  // Clear the history results displayed in the UI
  const historyResults = document.getElementById("history-results");
  historyResults.innerHTML = "";
}

// Attach the deleteHistory function to the clearHistoryBtn
clearHistoryBtn.addEventListener("click", deleteHistory);

document.getElementById("search-submit").addEventListener("click", () => {
  // Redirect to the new page
  window.location.href = getLinkPath("./pages/search-result.html");
});
