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
    // searched city (singular)
    let city = "";
    // list of search history
    let cityList = [];

    // search IDs
    let citySearch = $("#city-search");
    let searchBtn = $("#search-btn");
    let clearBtn = $("#clear-btn");
    let listGroup = $("#list-group");
    // results IDs
    let futureForecast = $("future-forecast");
    let currentDay = $("#current-day");
    let currentCity = $("#current-city");
    let currentWeather = $("#current-weather");
    let currentTemp = $("#temperature");
    let currentHum = $("#humidity");
    let currentWS = $("#wind-speed");
    // API Key & URL
    let APIKey = "e8d3342f00d8fa35a4f128c8d46cbea2";
    let weatherURL =  "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

        // Date powered by DayJS
        let dayJS = dayjs();
        let today = dayJS.format('ddd, DD/MM/YYYY');
        console.log("Current day is " + today);
        // display current day
        currentDay.text(today);
    
        // for loop to display the next 5 dates (for the forecast)
        function nextFiveDays(){
            for (i = 0; i < 5; i++){
                let futureDay = dayJS.add(i+1, "day");
                $("#f-date-" + i).text(futureDay.format('ddd, DD/MM/YY')).css('font-weight', 'bold');
            }
        }
        nextFiveDays();



    // reference of an example API call

    // {"coord":{"lon":138.6,"lat":-34.9333},
    // "weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04n"}],
    // "base":"stations",
    // "main":{"temp":282.59,"feels_like":282.59,"temp_min":281.71,"temp_max":283.89,"pressure":1031,"humidity":80},
    // "visibility":10000,"wind":{"speed":0.45,"deg":136,"gust":1.34},"clouds":{"all":100},"dt":1683464926,
    // "sys":{"type":2,"id":2001763,"country":"AU","sunrise":1683408361,"sunset":1683446301},"timezone":34200,"id":2078025,
    // "name":"Adelaied","cod":200}
    
    // function to get weather data from the most recently searched city
    function displayCurrentWeather(city) {

    // use API to get weather from searched city
    let weatherURL =  "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

        $.ajax({
            url: weatherURL,
            method: "GET",
            // GET from API then display each wanted response
        }).then(function(response) {
            // weather icon
            let weatherIcon = response.weather[0].icon;
            currentWeather.html(`<img src="http://openweathermap.org/img/wn/${weatherIcon}@2x.png">`);
            // city name
            let cityName = response.name;
            currentCity.html(cityName)
            // city temperature
            let cityTemp = response.main.temp;
            currentTemp.html(cityTemp + " °F");
            // city humidity
            let cityHum = response.main.humidity;
            currentHum.html(cityHum + " %");
            // city wind speed
            let cityWS = response.wind.speed;
            currentWS.html(cityWS + " mph");

            // future 5 days
            for (i = 0; i < 5; i++){
                $("#f-icon-" + i).html(`<img src="http://openweathermap.org/img/wn/${weatherIcon}@2x.png">`);
                $("#f-temp-" + i).html(cityTemp + " °F");
                $("#f-humidity-" + i).html(cityHum + " %");
                $("#f-ws-" + i).html(cityWS + " mph");
            }

        }) 
    };

     // display weather based on searched city
     function displayWeather(event){
        // event.preventDefault();
        if (citySearch.val() !== "") {
            city = citySearch.val().trim();
            displayCurrentWeather(city);
            // displayFutureForecast(city);
        }
    };

    // display future weather (for next 5 days)
    // function displayFutureForecast(city) {
    //    $.ajax({
    //     url: weatherURL,
    //     method: "GET",
    //    }).then(function(response){
    //     // for loop to iterate through the next 5 days forecast (date separate using dayJS)
    //     for (i = 0; i < 5; i++){
    //         let forecastIcon = response.list
    //     }
    //    })
    // }

    // function to get searched city & store in local storage
    function getCity() {
        city = citySearch.val();
        if (city) {
            localStorage.setItem("city name", city);
            cityList.push(city);
            localStorage.setItem("city history", JSON.stringify(cityList));
            return city;
        } 
        else if (!city) {
            alert("Please enter a valid city name.");
        }
    }

    // get search history on page load
    function getCityHistory() {
        listGroup.text("");
        let cityHistory = JSON.parse(localStorage.getItem("city history"));

        if (cityHistory) {
            cityList = cityHistory;
        } else {
            cityList = [];
        }
    };
    getCityHistory();

    // append each searched city under history
    function searchHistory() {
        listGroup.text("");
            if (city) {
                $(".list-group").append('<li class="list-group-item mt-1">' + city + '</li>');
            };
        }

    // search city function
    function searchCity(e) {
        e.preventDefault();
        getCity();
        displayWeather();
        searchHistory();
    }

    // clear search history
  function clearHistory(event) {
    event.preventDefault();
    cityList = [];
    localStorage.removeItem("city history");
    document.location.reload();
  };

//   TODO: DEBUG LI ITEMS
  // call weather data for past search history 
//   $(document).on("click", "li", (event) => {
//     event.preventDefault();
//     let searchHistory = $(event.target).text();
//     city = searchHistory;
//     // re-run get weather for this city
//     displayCurrentWeather();
//     displayFutureForecast();
//   })   

  // misc click handlers
  searchBtn.on("click", searchCity)
  clearBtn.on("click", clearHistory);

});