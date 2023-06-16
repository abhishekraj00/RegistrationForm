import axios from "axios";
import React, { useEffect, useState } from "react";
import "./User.css";

const UserCard = (prop) => {
  const [countryname, setCountryName] = useState();
  const [statename, setStateName] = useState();
  const [cityname, setCityName] = useState();

  const { firstName, lastName, email, country, state, city, gender, dob, age } =
    prop.user;

  useEffect(() => {
    axios
      .get(`/country/?countryId=${country}`)
      .then((response) => setCountryName(response.data))
      .catch((error) => console.log(error));

    axios
      .get(`/state/?stateId=${state}`)
      .then((response) => setStateName(response.data))
      .catch((error) => console.log(error));

    axios
      .get(`/city/?cityId=${city}`)
      .then((response) => setCityName(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="card">
      <div className="name">
        Name:{" "}
        <b>
          {firstName} {lastName}
        </b>
      </div>
      <div className="email">
        Email: <p>{email}</p>
      </div>
      <div className="gender">
        Gender :<p>{gender}</p>
      </div>
      <div className="dob">
        DOB :<p>{new Date(dob).toLocaleDateString()}</p>
      </div>
      <div className="age">
        Age :<p>{age}</p>
      </div>
      <div className="country">
        Country: <p>{countryname}</p>
      </div>
      <div className="state">
        State: <p>{statename}</p>
      </div>
      <div className="city">
        City: <p>{cityname}</p>
      </div>
    </div>
  );
};

export default UserCard;
