const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
});

// define Mongoose schema and model for countries
const countrySchema = new mongoose.Schema({ name: String });
const Country = mongoose.model("Country", countrySchema);

// define Mongoose schema and model for states
const stateSchema = new mongoose.Schema({
  name: String,
  country: { type: mongoose.Schema.Types.ObjectId, ref: "Country" },
});
const State = mongoose.model("State", stateSchema);

// define Mongoose schema and model for cities
const citySchema = new mongoose.Schema({
  name: String,
  state: { type: mongoose.Schema.Types.ObjectId, ref: "State" },
});

const City = mongoose.model("City", citySchema);

const User = mongoose.model("User", userSchema);

module.exports = { User, City, State, Country };
