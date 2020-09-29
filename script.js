var display = {
    city: "",
    temp: "",
    humid: "",
    wind: "",
    uv: ""
};

var cityArray = [];
var fiveDayForcast = [];


$(".citySearch").on("click", function() {
    var citySearch = $(".cityInput").val();
    cityArray.unshift(citySearch);
    storeData();

    searchDiv(citySearch);
    apiSearch(citySearch);
    });

    //display text in jumbotron
    function updateDisplay() {

        $(".city").text(display.city);
        $(".temp").text("Temperature: " + display.temp + " F");
        $(".humid").text("Humidity: " + display.humid + "%");
        $(".wind").text("Wind Speed: " + display.wind + " MPH");
        $(".uv").text("UV Index: " + display.uv);
    }

    //ajax call for current weather
    function apiSearch(city) {
        var citySearch = city;
        var apiKey = "9079e0330fe858fe04fbf89c11cb7f8c";

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+citySearch+"&appid="+ apiKey;

        $.ajax({
            url: queryURL,
            method: "GET"
          })
            .then(function(response) {
              console.log(response);
              display.city = response.name;
              display.temp = response.main.temp;
              display.humid = response.main.humidity;
              display.wind = response.wind.speed;
              //display.uv = response.
              updateDisplay();
              api5DayForcast(display.city);
            });    
    }

//ajax call for 5 day forcast
    function api5DayForcast(city) {

        var citySearch = city;
        var apiKey = "9079e0330fe858fe04fbf89c11cb7f8c";

        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+citySearch+"&appid="+ apiKey;

        $.ajax({
            url: queryURL,
            method: "GET"
          })
            .then(function(response) {
              fiveDayForcast = response.list;
              fiveDayForcastDiv();
            });
    }

    //creates html elements for five day forcast
    function fiveDayForcastDiv() {
        $(".fiveDay").empty();
        for(var i = 0; i < 5; i++) {
            var div = $("<div>");
            var spaceDiv = $("<div>");
            var date = $("<p>");
            var temp = $("<p>");
            var humid = $("<p>");

            var dateStr = fiveDayForcast[i].dt_txt.split(" ");

            div.addClass("day");
            //div.addClass("col-2");
            spaceDiv.addClass("space");


            date.text(dateStr[0]);
            temp.text("Temp: " + fiveDayForcast[i].main.temp + " F");
            humid.text("Humidity: " + fiveDayForcast[i].main.humidity + "%");

            div.append(date);
            div.append(temp);
            div.append(humid);
            $(".fiveDay").append(div);
            $(".fiveDay").append(spaceDiv);
            console.log(fiveDayForcast[i]);
            console.log(fiveDayForcast[i].dt_txt);
        }
    }


//creates search divs
    function searchDiv(city) {
        var searchDiv = $("<div>");
          var p = $("<p>");
          p.text(city);
          searchDiv.addClass("search");
          searchDiv.attr("city",city);
          searchDiv.append(p);
          searchDiv.prependTo($(".prevSearch"));

          $(".search").on("click", function() {
            apiSearch($(this).attr("city"));
        });
    }


//load text array
function loadData() {
    var cityJson = localStorage.getItem("Searches");
    if(cityJson) {
        cityArray = JSON.parse(cityJson);
        return true
    }
    else {
        return false;
    }
}

//stores array cityArray
function storeData() {
    var citiesString = JSON.stringify(cityArray);
    localStorage.setItem("Searches", citiesString);
  }

function init() {
    if(loadData()) {
        for(var i = cityArray.length; i >= 0; i--) {
            searchDiv(cityArray[i]);
        }
        apiSearch(cityArray[0]);
    }
}

init();