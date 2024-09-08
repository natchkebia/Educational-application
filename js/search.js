const icon = document.querySelector(".icon");
const search = document.querySelector(".search");
const input = document.querySelector(".input input"); // Select input directly
const clearBtn = document.querySelector(".clear"); // Select clear button
const navItems = document.querySelectorAll(
  ".header__nav--list--item:nth-child(-n+4)"
); // Select first 4 nav items
const searchWrapper = document.getElementById("search-wrapper"); // Select search wrapper

const searchDropdown = document.getElementById("search-dropdown");
const searchResults = document.getElementById("search-results");

// Toggle active class when search icon is clicked
icon.onclick = function (event) {
  search.classList.toggle("active");

  if (search.classList.contains("active")) {
    // Hide the first four nav items when search is active
    navItems.forEach((item) => {
      item.style.display = "none";
    });

    // Add class 'search-wrapper' to #search-wrapper when search is open
    searchWrapper.classList.add("search-wrapper");
  } else {
    closeSearch();
  }

  // Stop event propagation to prevent document click handler from closing the search
  event.stopPropagation();
};

// Close the search when clicking outside
document.addEventListener("click", function (event) {
  // Check if the search is active and if the click is outside the search box
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
  // Show the first four nav items when search is closed
  navItems.forEach((item) => {
    item.style.display = ""; // Reset to default
  });

  // Hide the clear button and reset input when the search is closed
  clearBtn.style.display = "none";
  input.value = ""; // Clear input
  search.classList.remove("active");

  // Remove class 'search-wrapper' from #search-wrapper when search is closed
  searchWrapper.classList.remove("search-wrapper");

  // Hide the search dropdown when search is closed
  searchDropdown.classList.remove("show");
}

// Clear the input field when the clear button is clicked
clearBtn.onclick = function () {
  input.value = ""; // Clear input
  clearBtn.style.display = "none"; // Hide clear button
  searchDropdown.classList.remove("show"); // Hide dropdown
};

// Show or hide the clear button when the user types
input.addEventListener("input", function () {
  if (input.value.length > 0) {
    clearBtn.style.display = "flex"; // Show clear button
  } else {
    clearBtn.style.display = "none"; // Hide clear button when input is empty
  }
});

// Function to display search results in the dropdown
function showResults(results) {
  searchResults.innerHTML = ""; // Clear previous results
  if (results.length === 0) {
    searchDropdown.classList.remove("show");
    return;
  }

  results.forEach((result) => {
    const li = document.createElement("li");
    li.textContent = result; // Set result text
    searchResults.appendChild(li);
  });

  searchDropdown.classList.add("show");
}

// Function to simulate fetching results (replace with real API call)
function fetchResults(query) {
  // Simulate a search result
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        `Result 1 for "${query}"`,
        `Result 2 for "${query}"`,
        `Result 3 for "${query}"`,
      ]);
    }, 500); // Simulate network delay
  });
}

// Update search results on search input change
input.addEventListener("input", async function () {
  const query = input.value.trim();
  if (query.length > 0) {
    const results = await fetchResults(query); // Fetch search results
    showResults(results);
  } else {
    searchDropdown.classList.remove("show"); // Hide dropdown if input is empty
  }
});
