// Get a reference to the search form
const searchForm = document.querySelector('#search-form');

// Add an event listener to the form submit event
searchForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the form from submitting normally

  // Get the values from the form inputs
  const queryInput = document.querySelector('#search-query');
  const formatSelect = document.querySelector('#format-select');
  const query = queryInput.value.trim();
  const format = formatSelect.value;

  // Build the URL with the query parameters
  let url = `search-results.html?q=${encodeURIComponent(query)}&format=${encodeURIComponent(format)}`;

  // Redirect the user to the search results page
  location.replace(url);
});
