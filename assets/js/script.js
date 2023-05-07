// All code interacting with DOM runs after browser finished 
// rendering all elements in HTML
$(document).ready(function () {

    // listener for events on get location button
    $(".saveBtn").on("click", function(event) {
    event.preventDefault();
    // Get location name entered by the user
    let userLocation = $(this).attr("user-location").val();
  })

   // get current hour from dayJS
  let currentHour = dayjs().hour();
  console.log("Current Hour in DayJS is " + currentHour);
  // Testing/debugging only: change number to simulate the hour
  // let currentHour = 11;

 });