const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define Paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// set up Handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Set up static directory to serve
app.use(express.static(publicDirectoryPath));

// app.get("", (req, res) => {
//   res.send("Hello Express!!!");
// });

// app.get("/help", (req, res) => {
//   res.send("Help Page");
// });

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Charith Vithana",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Charith Vithana",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "\\_Get help_/",
    name: "Charith Vithana",
    message: "I'm drowning",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must enter an address!",
    });
  }

  geocode(
    req.query.address,
    (error, { longitude, latitude, location } = {}) => {
      if (error) {
        return res.send({
          error: error,
          address: req.query.address,
        });
      }

      forecast(longitude, latitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error: error,
            address: req.query.address,
          });
        }

        res.send({
          location: location,
          forecast: forecastData,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must enter a search term",
    });
  }

  console.log(req.query.search);

  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Error 404",
    name: "Charith Vithana",
    message: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Error 404",
    name: "Charith Vithana",
    message: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
