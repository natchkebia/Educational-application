document.addEventListener("DOMContentLoaded", () => {
  const resultsList = document.getElementById("results-list");
  const searchResults = localStorage.getItem("searchResults");

  if (searchResults) {
    const results = JSON.parse(searchResults);

    results.forEach((result) => {
      const li = document.createElement("li");
      li.innerHTML = `
                <div>
                    <h2>${result.title}</h2>
                    <p>${result.description}</p>
                    <p>Price: ${result.price}₾</p>
                    <a href="detail-pages/courses-detail-page.html?id=${encodeURIComponent(
                      result.id
                    )}">View Details</a>
                </div>
            `;
      resultsList.appendChild(li);
    });

    // Clear results from localStorage after displaying them
    localStorage.removeItem("searchResults");
  } else {
    resultsList.innerHTML = "<li>No results found</li>";
  }
});
