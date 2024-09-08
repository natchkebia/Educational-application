document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('searchBar');
    const dropdown = document.getElementById('dropdown');
    const searchHistory = [];

    // Fetch data from the local JSON file
    async function fetchData() {
        try {
            const response = await fetch('data.json');
            return await response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Filter the data based on the search term
    async function search(term) {
        const data = await fetchData();
        const lowerTerm = term.toLowerCase();
        const filteredResults = data.filter(item => 
            item.title.toLowerCase().includes(lowerTerm)
        );

        // Filter search history
        const filteredHistory = searchHistory.filter(historyItem =>
            historyItem.toLowerCase().includes(lowerTerm)
        );

        // Show dropdown with results and history
        displayDropdown(filteredResults, filteredHistory, term);
    }

    // Display the dropdown with search results and history
    function displayDropdown(results, history, term) {
        dropdown.innerHTML = ''; // Clear previous dropdown content

        if (results.length === 0 && history.length === 0) {
            dropdown.style.display = 'none'; // Hide dropdown if no results
            return;
        }

        dropdown.style.display = 'block'; // Show dropdown

        // Add search history items first
        if (history.length > 0) {
            history.forEach(item => {
                const historyItem = document.createElement('div');
                historyItem.classList.add('dropdown-item', 'history-item');
                historyItem.textContent = item;
                historyItem.onclick = () => selectHistory(item);
                dropdown.appendChild(historyItem);
            });
        }

        // Add a divider if both history and results exist
        if (history.length > 0 && results.length > 0) {
            const divider = document.createElement('hr');
            dropdown.appendChild(divider);
        }

        // Add search results
        results.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.classList.add('dropdown-item');
            resultItem.innerHTML = `<a href="${result.link}" target="_blank">${result.title}</a>`;
            dropdown.appendChild(resultItem);
        });

        // If there's an exact match in history, do not add it again
        if (!searchHistory.includes(term) && term.trim() !== '') {
            searchHistory.push(term); // Add to history if a new term
        }
    }

    // Handle selecting a history item
    function selectHistory(term) {
        searchBar.value = term;
        search(term);
    }

    // Event listener for input typing in the search bar
    searchBar.addEventListener('input', (event) => {
        const searchTerm = event.target.value;
        if (searchTerm.trim() !== '') {
            search(searchTerm);
        } else {
            dropdown.style.display = 'none'; // Hide dropdown if no input
        }
    });

    // Hide the dropdown when clicking outside
    document.addEventListener('click', (event) => {
        if (!dropdown.contains(event.target) && !searchBar.contains(event.target)) {
            dropdown.style.display = 'none';
        }
    });

    // Optionally, you can also trigger search on "Enter" key press
    searchBar.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const searchTerm = searchBar.value;
            search(searchTerm);
            dropdown.style.display = 'none'; // Hide dropdown after search
        }
    });
});
