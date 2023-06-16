const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
  resgisterData,
  setCountriesData,
  getCity,
  getCountry,
  getState,
  getUser,
  getCountryName,
  getStateName,
  getCityName,
} = require("../controllers/resisterControler");

//middleware
router.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

//route to create regirter data
router.post("/register", resgisterData);

// route to set Country,states and city data
router.post("/setCountryData", setCountriesData);

// route to fetch countries
router.get("/countries", getCountry);

// route to fetch states
router.get("/states", getState);

// route to fetch cities
router.get("/cities", getCity);

//route to fetch user data
router.get("/users", getUser);

//route to fetch country
router.get("/country", getCountryName);

//route to fetch state
router.get("/state", getStateName);

//route to fetch city
router.get("/city", getCityName);

module.exports = router;
