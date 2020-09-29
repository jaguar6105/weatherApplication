


var apiKey = "9079e0330fe858fe04fbf89c11cb7f8c";


$(".citySearch").on("click", function() {
    var city = $(".cityInput").val();
    console.log(city)
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=9079e0330fe858fe04fbf89c11cb7f8c" //+ apiKey;

    $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {
          console.log(response);
        });
    });