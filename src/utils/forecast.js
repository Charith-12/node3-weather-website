const request = require("request");

const forecast = (longitude, latitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=b26dc00fa4db49cbfbf58d3c62685215&query=" +
    encodeURIComponent(latitude) +
    "," +
    encodeURIComponent(longitude) +
    "&units=m";

  request({ url, json: true }, (error, { body }) => {
    // {body} means response.body
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      const dataSource = body.current;
      callback(
        undefined,
        dataSource.weather_descriptions[0] +
          ". It is currently " +
          dataSource.temperature +
          "°C degrees out and feels like " +
          dataSource.feelslike +
          "°C. \nHumidity is " +
          dataSource.humidity +
          "%.\nThere is " +
          dataSource.wind_speed +
          "km/h wind coming from " +
          dataSource.wind_dir
      );
    }
  });
};

module.exports = forecast;
