// All code interacting with DOM runs after browser finished 
// rendering all elements in HTML
$(document).ready(function () {

// global variables
    let clearButton = $("#clear-btn");
    // array for storing past search history (cities)
    let cityHistory = [];

    // listener for events on get location button
    $(".location").on("click", function(event) {
    event.preventDefault();
    // Get location name entered by the user
    let userLocation = $(this).attr("user-location").val();
  })

   // get current hour from dayJS
  let currentHour = dayjs().hour();
  console.log("Current Hour in DayJS is " + currentHour);
  // Testing/debugging only: change number to simulate the hour
  // let currentHour = 11;


  // clear search history
  function clearHistory(event) {
    event.preventDefault();
    cityHistory = [];
    localStorage.removeItem("city-name");
  }

  // click handlers
  $("#clear-btn").on("click", clearHistory);

 });