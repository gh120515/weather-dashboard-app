// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

// All code interacting with DOM runs after browser finished 
// rendering all elements in HTML
$(document).ready(function () {

// global variables
    let city = "";

    // search IDs
    let citySearch = $("#city-search");
    let searchBtn = $("#search-btn");
    let clearBtn = $("#clear-btn");
    // results IDs
    let futureForecast = $("future-forecast");
    let currentDay = $("#current-day");
    let currentCity = $("#current-city");
    let currentWeatehr = $("#current-weather");
    let currentTemp = $("#current-temp");
    let currentHum = $("#humidity");
    let currentWS = $("#wind-speed");
    // array for storing past search history (cities)
    let cityHistory = [];

    // set up API
    let APIkey = "e8d3342f00d8fa35a4f128c8d46cbea2";

  // clear search history
  function clearHistory(event) {
    event.preventDefault();
    cityHistory = [];
    localStorage.removeItem("city-name");
  }

  // click handlers
  clearBtn.on("click", clearHistory);

    // Date powered by DayJS
    let dayJS = dayjs().format('DD/MM/YYYY');
    console.log("Current day is " + dayJS);
    // display current day
    currentDay.text("(" + dayJS + ")")

 });