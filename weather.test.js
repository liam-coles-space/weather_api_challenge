const Weather = require('./weather.js');


describe('getWeatherData', () => {
    describe('returns {}', () => {
        it('when called on an empty data property',() => {
            let mockClient = {}
            weather = new Weather(mockClient);
            expect(weather.getWeatherData()).toEqual({});
        })
    })

});

describe('load()', () => {
    describe('adds weather data object to data property', () => {
        
        it('when called with London',(done) => {
            const mockClient = {
                fetchWeatherData: jest.fn(), // This is a jest mock function
            };
            
            mockClient.fetchWeatherData.mockResolvedValueOnce({
                name: "London",
                timezone: 3600
            });
            weather = new Weather(mockClient);
            weather.load('London').then(() =>{
                let weatherData = weather.getWeatherData()
                expect(weatherData.name).toEqual('London')
                expect(weatherData.timezone).toEqual(3600)
                done();
            })
        })
    })

});

describe('compareWith(<city>)', () => {
    describe('returns with warmer result', () => {
        
        it('when called with Barcelona and London is stored',(done) => {
            const mockClient = {
                fetchWeatherData: jest.fn(), // This is a jest mock function
            };
            
            mockClient.fetchWeatherData.mockResolvedValueOnce({
                name: "London",
                timezone: 3600,
                main: {
                    temp : 25.25
                }
            }).mockResolvedValueOnce({
                name: "Barcelona",
                timezone: 3600,
                main: {
                    temp : 18.42
                }
            });
            weather = new Weather(mockClient);
            weather.load('London').then(() => weather.compareWith('Barcelona')).then((result) => {
                expect(result).toEqual('Warmer')
                done();
            })
        })
    })

    describe('returns with colder result', () => {
        
        it('when called with Paris and London is stored',(done) => {
            const mockClient = {
                fetchWeatherData: jest.fn(), // This is a jest mock function
            };
            
            mockClient.fetchWeatherData.mockResolvedValueOnce({
                name: "London",
                timezone: 3600,
                main: {
                    temp : 25.25
                }
            }).mockResolvedValueOnce({
                name: "Paris",
                timezone: 3600,
                main: {
                    temp : 40.85
                }
            });
            weather = new Weather(mockClient);
            weather.load('London').then(() => weather.compareWith('Paris')).then((result) => {
                expect(result).toEqual('Colder')
                done();
            })
        })
    })

    describe('returns with no difference result', () => {
        
        it('when called with Paris and London is stored',(done) => {
            const mockClient = {
                fetchWeatherData: jest.fn(), // This is a jest mock function
            };
            
            mockClient.fetchWeatherData.mockResolvedValueOnce({
                name: "London",
                timezone: 3600,
                main: {
                    temp : 40.85
                }
            }).mockResolvedValueOnce({
                name: "Paris",
                timezone: 3600,
                main: {
                    temp : 40.85
                }
            });
            weather = new Weather(mockClient);
            weather.load('London').then(() => weather.compareWith('Paris')).then((result) => {
                expect(result).toEqual('No difference')
                done();
            })
        })
    })

});

describe('displayWeather', () => {
    describe('returns empty string', () => {
        it('when called on an empty data property',() => {
            let mockClient = {}
            weather = new Weather(mockClient);
            expect(weather.displayWeather()).toEqual('');
        })
    })

    describe('returns correctly fommated result', () => {
        it('when called on populated data property',(done) => {
            const mockClient = {
                data: {},
                fetchWeatherData: jest.fn(), // This is a jest mock function
            };
            
            mockClient.fetchWeatherData.mockResolvedValueOnce({
                weather: [{main: 'Clouds'}],
                name: "London",
                main: {
                    temp: 18.4,
                    feels_like: 16,
                    humidity: 64
                }
            });
            weather = new Weather(mockClient);
            weather.load('London').then(() =>{
                expect(weather.displayWeather()).toEqual('City: London\nWeather: Clouds\nTemperature: 18.4\nFeels like: 16\nHumidity 64%');
                done();
            })
            
        })
    })
});

