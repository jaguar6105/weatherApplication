var display = {
    city: "",
    temp: "",
    humid: "",
    wind: "",
    uv: ""
};

var cityArray = [];


$(".citySearch").on("click", function() {
    var citySearch = $(".cityInput").val();

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
            });    
    }



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
