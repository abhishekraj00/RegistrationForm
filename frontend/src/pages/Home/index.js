import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import UserCard from "../../components/UserCard";

const Home = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    axios.get("/users").then((response) => setUserData(response.data));
  }, []);

  return (
    <div className="card-container">
      {userData?.map((user) => (
        <UserCard user={user} key={user._id} />
      ))}
    </div>
  );
};

export default Home;
