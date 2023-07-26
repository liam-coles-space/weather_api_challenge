const apiKey = require('./api-key'); // include our key


class WeatherClient {

    fetchWeatherData(city) {
        const apiUrl = `http://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;
        return fetch(apiUrl)
        .then((response) => response.json())
        .then((weatherData) => weatherData);
    }
    
}

module.exports = WeatherClient