// Get the query parameters from the URL
const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get('q');
const format = urlParams.get('format');

// Get a reference to the results container
const resultsContainer = document.querySelector('#results-container');

// Function to fetch search results
const fetchSearchResults = async () => {
  try {
    let apiUrl = 'https://api.loc.gov/';
    if (format) {
      apiUrl += `format/${format}/`;
    } else {
      apiUrl += 'search/';
    }
    apiUrl += `?q=${encodeURIComponent(query)}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    displayResults(data.results);
  } catch (error) {
    console.error('Error:', error);
    resultsContainer.innerHTML = 'An error occurred while fetching the search results.';
  }
};

// Function to display search results
const displayResults = (results) => {
  if (results.length === 0) {
    resultsContainer.innerHTML = 'No results found.';
    return;
  }

  // Create a list of results
  const resultList = document.createElement('ul');

  // Loop through the results and create list items
  results.forEach((result) => {
    const listItem = document.createElement('li');
    listItem.textContent = result.title;
    resultList.appendChild(listItem);
  });

  // Add the list to the results container
  resultsContainer.appendChild(resultList);
};

// Call the fetchSearchResults function when the page loads
fetchSearchResults();

var searchFormEl = document.querySelector('#search-form');
var searchQueryEl = document.querySelector('#search-query');
var searchFormatEl = document.querySelector('#search-format');
var resultsContainerEl = document.querySelector('#results-container');

var formSubmitHandler = function (event) {
  event.preventDefault();

  var searchQuery = searchQueryEl.value.trim();
  var searchFormat = searchFormatEl.value.trim();

  if (searchQuery) {
    getSearchResults(searchQuery, searchFormat);

    searchQueryEl.value = '';
    searchFormatEl.value = '';
  } else {
    // Display an error message if the search query is empty
    resultsContainerEl.innerHTML = '<p>Please enter a search query.</p>';
  }
};

var getSearchResults = function (query, format) {
  // Build the API URL based on the search query and format
  var apiUrl = 'https://api.loc.gov/' + (format ? format + '/' : '') + '?q=' + query;

  // Make a GET request to the API URL
  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayResults(data);
        });
      } else {
        // Display an error message if the API request fails
        resultsContainerEl.innerHTML = '<p>Unable to fetch search results. Please try again later.</p>';
      }
    })
    .catch(function (error) {
      // Display an error message if there is an error with the fetch request
      resultsContainerEl.innerHTML = '<p>An error occurred while fetching search results. Please try again later.</p>';
    });
};

searchFormEl.addEventListener('submit', formSubmitHandler);
