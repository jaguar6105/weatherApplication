var display = {
    city: "",
    temp: "",
    humid: "",
    wind: "",
    uv: ""
};


var apiKey = "9079e0330fe858fe04fbf89c11cb7f8c";


$(".citySearch").on("click", function() {
    var citySearch = $(".cityInput").val();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+citySearch+"&appid=9079e0330fe858fe04fbf89c11cb7f8c" //+ apiKey;

    display.city = citySearch;
    updateDisplay();


    $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {
          console.log(response);
          display.city = citySearch;
          updateDisplay();
        });
    });

    function updateDisplay() {

        $(".city").text(display.city);
        $(".temp").text("Temperature: " + display.temp + " F");
        $(".humid").text("Humidity: " + display.humid + "%");
        $(".wind").text("Wind Speed: " + display.wind + " MPH");
        $(".uv").text("UV Index: " + display.uv);


    }