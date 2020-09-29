var display = {
    city: "",
    temp: "",
    humid: "",
    wind: "",
    uv: ""
};

var cityArray = [];
var fiveDayForcast = [];
var citySearch;


$(".citySearch").on("click", function () {
    var citySearch = $(".cityInput").val();
    apiSearch(citySearch, true);
});

//display text in jumbotron
function updateDisplay() {

    $(".city").text(display.city);
    $(".temp").text("Temperature: " + display.temp + " F");
    $(".humid").text("Humidity: " + display.humid + "%");
    $(".wind").text("Wind Speed: " + display.wind + " MPH");
    $(".uv").text("UV Index: " + display.uv);
    if (display.uv < 4) {
        $(".uv").css("color", "blue");

    }
    else if (display.uv > 6) {
        $(".uv").css("color", "red");

    }
    else {
        $(".uv").css("color", "orange");

    }


    api5DayForcast(display.city);
}

//ajax call for current weather
function apiSearch(city, search) {

    var apiKey = "9079e0330fe858fe04fbf89c11cb7f8c";

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            if (search) {
                cityArray.unshift(response.name);
                storeData();
                searchDiv(response.name);
            }
            display.city = response.name;
            apiGetUV(response.coord.lat, response.coord.lon);
        });
}



//ajax call for 5 day forcast
function apiGetUV(lat, lon) {

    var apiKey = "9079e0330fe858fe04fbf89c11cb7f8c";

    var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            display.temp = toFahr(response.current.temp);
            display.humid = response.current.humidity;
            display.wind = toMPH(response.current.wind_speed);
            display.uv = response.current.uvi;
            updateDisplay();


        });
}

//creates html elements for five day forcast
function fiveDayForcastDiv() {
    $(".fiveDay").empty();
    for (var i = 0; i < 5; i++) {
        var div = $("<div>");
        var spaceDiv = $("<div>");
        var date = $("<p>");
        var temp = $("<p>");
        var humid = $("<p>");
        var image = $("<img>");

        var dateStr = fiveDayForcast[i].dt_txt.split(" ");

        div.addClass("day");
        spaceDiv.addClass("space");

        image.attr("src", "https://openweathermap.org/img/wn/" + fiveDayForcast[i].weather[0].icon +"@2x.png");

        date.text(dateStr[0]);
        temp.text("Temp: " + toFahr(fiveDayForcast[i].main.temp) + " F");
        humid.text("Humidity: " + fiveDayForcast[i].main.humidity + "%");

        div.append(date);
        div.append(image);
        div.append(temp);
        div.append(humid);
        $(".fiveDay").append(div);
        $(".fiveDay").append(spaceDiv);
    }
}


//ajax call for 5 day forcast
function api5DayForcast(city) {

    var apiKey = "9079e0330fe858fe04fbf89c11cb7f8c";
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            fiveDayForcast = response.list;
            fiveDayForcastDiv();

        });
}

//creates search divs
function searchDiv(city) {
    var searchDiv = $("<div>");
    var p = $("<p>");
    p.text(city);
    searchDiv.addClass("search");
    searchDiv.attr("city", city);
    searchDiv.append(p);
    searchDiv.prependTo($(".prevSearch"));

    $(".search").on("click", function () {
        apiSearch($(this).attr("city"), false);
    });
}


//load text array
function loadData() {
    var cityJson = localStorage.getItem("Searches");
    if (cityJson) {
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

//initialize the data
function init() {
    if (loadData()) {
        for (var i = cityArray.length; i >= 0; i--) {
            searchDiv(cityArray[i]);
        }
        apiSearch(cityArray[0], false);
    }
}

//converts temperature to fahrenheit
function toFahr(temp) {

    return Math.floor(parseFloat((temp - 273.15) * 1.80 + 32));
}

//converts wind speed to from m/s to mph
function toMPH(speed) {
    return speed * 2.237

}

init();