class Weather
{
    constructor(options){
        console.info("We are in the constructor");

        // set default values
        this.weather = {};
        this.latitude = "";
        this.longitude = "";
        this.apiKey = options.apiKey;

        this.init();
    }

    getMyLocation(){
        var that = this;
        console.info("Getting my location");
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log(position);
            that.latitude = position.coords.latitude;
            that.longitude = position.coords.longitude;
            that.getWeather();
            that.getCity();
        });
    }

    getCity(){
        var geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(this.latitude, this.longitude);
        geocoder.geocode({
            'latLng': latlng
        }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    for (var i = 0; i < results.length; i++) {
                        if (results[i].types[0] === "locality") {
                            var city = results[i].address_components[0].short_name;
                            $("#location").text(city);
                        }
                    }
                }
            }
        });
    }

    getWeather(){
        var that = this;
        console.info("Getting current weather data");
        // GET request to https://api.darksky.net/forecast/[key]/[latitude],[longitude]
        const call = `https://api.darksky.net/forecast/${this.apiKey}/${this.latitude},${this.longitude}?units=ca`;

        $.ajax({
           method: "GET",
           url: call,
            dataType: "jsonp"
        }).done(function(response){
            console.log(response);
            that.weather = response.currently;
            that.daily = response.daily
            that.updateUI();
        });
    }

    init(){
        console.info("The init function, kicks things off");
        this.getMyLocation();
    }

    updateUI(){
        console.log("updating UI");

        var info;
        if( this.weather.temperature < 9 ){
            info = "Brrrr, minder je hoeveelheden en zorg voor verse broden tegen de middag";
        } else if( this.weather.temperature >= 9 || this.weather.temperature < 18){
            info = "Matig weer gebruik gemiddelde bak";
        } else if(this.weather.temperature >= 18 ){
            info = "Warm weer bak meer pistoles en stokbroden!";
        }
        $("#info").append(`<p>${info}</p>`);

        var icon;
        if( this.weather.icon = "rain" ){
            icon = "img/rain.png";
        } else if(this.weather.icon = "partly-cloudy-day"){
            icon = "img/hidan.png";
        } else if(this.weather.icon = "clear-day"){
            icon = "img/sun.png";
        } else {
            icon = "img/cloudy.png";
        }

        $("#today").append(`<img src="${icon}" alt="${this.weather.summary}"><p>${Math.round(this.weather.temperature)}&deg;</p>`);

        var d = new Date();
        var weekday = new Array(7);
        weekday[0] = "Ma";
        weekday[1] = "Di";
        weekday[2] = "Wo";
        weekday[3] = "Do";
        weekday[4] = "Vr";
        weekday[5] = "Za";
        weekday[6] = "Zo";
        var n = d.getDay();

        for(var i = n; i < n+3; i++){
            var w;
            if (i<=6){
                w = i;
            } else if(i == 7){
                w = 0;
            }else if (i == 8){
                w = 1;
            }else if (i == 9){
                w = 2;
            }

            var cover;
            if( this.daily.data[w].icon = "rain" ){
                cover = "img/rain.png";
            } else if(this.daily.data[w].icon = "partly-cloudy-day"){
                cover = "img/hidan.png";
            } else if(this.daily.data[w].icon = "clear-day"){
                cover = "img/sun.png";
            } else {
                cover = "img/cloudy.png";
            }

            var temp = (this.daily.data[w].temperatureMin + this.daily.data[w].temperatureMax)/2;

            $("#days").append(`<div><p>${weekday[w]}</p><img src="${cover}" alt="${this.daily.data[w].summary}"><p>${Math.round(temp)}</p></div>`);
        }
    };

    // ./node_modules/.bin/http-server


}

const options = {
    apiKey: "c58945c4d5c01e4ff07396403dd0f9bc"
}
const App = new Weather(options);