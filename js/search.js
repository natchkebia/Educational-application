const icon = document.querySelector(".icon");
const search = document.querySelector(".search");
const input = document.querySelector(".input input"); // Select input directly
const clearBtn = document.querySelector(".clear"); // Select clear button
const navItems = document.querySelectorAll(
  ".header__nav--list--item:nth-child(-n+4)"
); // Select first 4 nav items

// Toggle active class when search icon is clicked
icon.onclick = function (event) {
  search.classList.toggle("active");

  if (search.classList.contains("active")) {
    // Hide the first four nav items when search is active
    navItems.forEach((item) => {
      item.style.display = "none";
    });
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
}

// Clear the input field when the clear button is clicked
clearBtn.onclick = function () {
  input.value = ""; // Clear input
  clearBtn.style.display = "none"; // Hide clear button
};

// Show or hide the clear button when the user types
input.addEventListener("input", function () {
  if (input.value.length > 0) {
    clearBtn.style.display = "flex"; // Show clear button
  } else {
    clearBtn.style.display = "none"; // Hide clear button when input is empty
  }
});
