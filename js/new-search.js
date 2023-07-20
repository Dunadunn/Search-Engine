var newSearchFormEl = document.querySelector('#new-search-form');
var newSearchQueryEl = document.querySelector('#new-search-query');
var newSearchFormatEl = document.querySelector('#new-search-format');
var newResultsContainerEl = document.querySelector('#results-container');

var newFormSubmitHandler = function (event) {
  event.preventDefault();

  var newSearchQuery = newSearchQueryEl.value.trim();
  var newSearchFormat = newSearchFormatEl.value.trim();

  if (newSearchQuery) {
    getNewSearchResults(newSearchQuery, newSearchFormat);

    newSearchQueryEl.value = '';
    newSearchFormatEl.value = '';
  } else {
    // Display an error message if the search query is empty
    newResultsContainerEl.innerHTML = '<p>Please enter a search query.</p>';
  }
};

var getNewSearchResults = function (query, format) {
  // Build the API URL based on the search query and format
  var newApiUrl = 'https://api.loc.gov/' + (format ? format + '/' : '') + '?q=' + query;

  // Make a GET request to the API URL
  fetch(newApiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayNewResults(data);
        });
      } else {
        // Display an error message if the API request fails
        newResultsContainerEl.innerHTML = '<p>Unable to fetch search results. Please try again later.</p>';
      }
    })
    .catch(function (error) {
      // Display an error message if there is an error with the fetch request
      newResultsContainerEl.innerHTML = '<p>An error occurred while fetching search results. Please try again later.</p>';
    });
};

var displayNewResults = function (data) {
  // Clear the results container
  newResultsContainerEl.innerHTML = '';

  // Check if there are any search results
  if (data.results.length === 0) {
    newResultsContainerEl.innerHTML = '<p>No results found.</p>';
    return;
  }

  // Loop through the search results and display them
  for (var i = 0; i < data.results.length; i++) {
    var newResultEl = document.createElement('div');
    newResultEl.classList = 'result';
    newResultEl.innerHTML = '<h3>' + data.results[i].title + '</h3><p>' + data.results[i].description + '</p>';

    newResultsContainerEl.appendChild(newResultEl);
  }
};

newSearchFormEl.addEventListener('submit', newFormSubmitHandler);
