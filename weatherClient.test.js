const WeatherClient = require('./weatherClient.js');
const jestFetchMock = require('jest-fetch-mock');
jestFetchMock.enableMocks();

describe('fetchWeatherData', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });
    
    it('can fetch the weather data for London',(done) => {
        fetch.mockResponseOnce(JSON.stringify({ name: "London" ,
                                                sys:{
                                                    country: "GB"
                                                    }
                                                }));
        const weatherClient = new WeatherClient();
        weatherClient.fetchWeatherData('London').then((weatherData) =>{
            expect(weatherData.name).toEqual('London');
            expect(weatherData.sys.country).toEqual('GB');
            done();
        })
    })

});