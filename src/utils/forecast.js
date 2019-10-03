const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/5df415d7957320b71d925d487a333266/${latitude},${longitude}`;

    request({url: url, json: true}, (error, response) => {
        if(error) {
            callback('Unable to connect to location services!', undefined);
        } else if(response.body.error) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            callback(undefined,
                `${response.body.daily.data[0].summary} It is currently ${response.body.currently.temperature} degrees out there. There is ${response.body.currently.precipProbability}% chance of rain.`
            )
        }
    });
}

module.exports = forecast;