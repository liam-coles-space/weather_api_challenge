
class Weather {
    constructor(client){
        this.client = client
        this.data = {}
    }

    getWeatherData() {
        return this.data;
    }

    load(city) {
        return this.client.fetchWeatherData(city).then((weatherData) =>{
            this.data = weatherData;
        })
    }

    compareWith(city) {
        return this.client.fetchWeatherData(city).then((weatherData) =>{
            let newCityData = weatherData;
            if (this.data.main.temp > newCityData.main.temp) {
                return 'Warmer';
            } else if (this.data.main.temp < newCityData.main.temp){
                return 'Colder';
            } else {
                return 'No difference'
            }
        })
    }

    displayWeather(){
        if (Object.keys(this.data).length !== 0){
            return `City: ${this.data.name}\nWeather: ${this.data.weather[0].main}\nTemperature: ${this.data.main.temp}\nFeels like: ${this.data.main.feels_like}\nHumidity ${this.data.main.humidity}%` 
        }
        else{
            return ''
        }
    }
}


module.exports = Weather;