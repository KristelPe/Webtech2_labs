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
            that.updateUI();
        });
    }

    init(){
        console.info("The init function, kicks things off");
        this.getMyLocation();
    }

    updateUI(){
        console.log("updating UI");
        var color;
        if( this.weather.temperature < 15 ){
            color = "#AFEEEE";
        } else {
            color = "#e67e22";
        }
        $("#app").css("background-color", color);
        $("#app").append(`<h1>${Math.round(this.weather.temperature)}&deg;</h1>`)
    };
}

const options = {
    apiKey: "c58945c4d5c01e4ff07396403dd0f9bc"
}
const App = new Weather(options);