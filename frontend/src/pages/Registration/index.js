import React, { useEffect, useState } from "react";
import {
  calculateAge,
  getDateFouteenYearsOlder,
} from "../../utils/helperFunction";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./Registration.css";

const RegistrationForm = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");

  //country,city,and state data from database
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  // fetch countries from API
  useEffect(() => {
    axios
      .get("/countries")
      .then((response) => setCountries(response.data))
      .catch((error) => console.log(error));
  }, []);

  // fetch states from API when country changes
  useEffect(() => {
    if (country) {
      axios
        .get(`/states?country=${country}`)
        .then((response) => setStates(response.data))
        .catch((error) => console.log(error));
    }
  }, [country]);

  // fetch cities from API when state changes
  useEffect(() => {
    if (state) {
      axios
        .get(`/cities?state=${state}`)
        .then((response) => setCities(response.data))
        .catch((error) => console.log(error));
    }
  }, [state]);

  useEffect(() => {
    const age = calculateAge(dob);
    setAge(age);
  }, [dob]);

  // handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/register", {
        firstName,
        lastName,
        email,
        country,
        state,
        city,
        gender,
        dob,
        age,
      });

      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Form submission successful");
        navigate("/");
      }
    } catch (error) {}
  };

  return (
    <div className="container">
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="name-containre">
          <label>
            First Name:
            <input
              type="text"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              pattern="[A-Za-z]+"
              required
            />
          </label>
          <br />
          <label>
            Last Name:
            <input
              type="text"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              pattern="[A-Za-z]+"
              required
            />
          </label>
        </div>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
        <br />
        <div className="country-containre">
          <label>
            Country:
            <select
              value={country}
              onChange={(event) => {
                setCountry(event.target.value);
              }}
            >
              <option value="">Select a city</option>
              {countries.map((country, i) => (
                <option key={country._id} value={country._id}>
                  {country.name}
                </option>
              ))}
            </select>
          </label>
          <br />
          <label>
            State:
            <select
              disabled={!country ? true : false}
              value={state}
              onChange={(event) => setState(event.target.value)}
            >
              <option value="">Select a state</option>
              {states.map((state) => (
                <option key={state._id} value={state._id}>
                  {state.name}
                </option>
              ))}
            </select>
          </label>
          <br />
          <label>
            City:
            <select
              disabled={!state ? true : false}
              value={city}
              onChange={(event) => setCity(event.target.value)}
            >
              <option value="">Select a city</option>
              {cities.map((city) => (
                <option key={city._id} value={city._id}>
                  {city.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <br />
        <label className="gnder">
          Gender:
          <input
            type="radio"
            name="gender"
            value="male"
            checked={gender === "male"}
            onChange={(event) => setGender(event.target.value)}
            required
          />{" "}
          Male
          <input
            type="radio"
            name="gender"
            value="female"
            checked={gender === "female"}
            onChange={(event) => setGender(event.target.value)}
            required
          />{" "}
          Female
        </label>
        <br />
        <label>
          Date of Birth:
          <input
            type="date"
            value={dob}
            onChange={(event) => setDob(event.target.value)}
            max={
              new Date(getDateFouteenYearsOlder()).toISOString().split("T")[0]
            }
            required
          />
        </label>
        <br />
        <label>
          <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
            Age:<p>must be older than 14</p>
          </div>
          <input
            type="number"
            value={age ? age : "0"}
            onChange={(event) => setAge(event.target.value)}
          />
        </label>
        <br />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
