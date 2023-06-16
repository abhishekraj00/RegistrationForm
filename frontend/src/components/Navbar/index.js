import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <div className="container-navbar">
      <Link to={"/"} className="link">
        Home
      </Link>
      <Link to={"/registration"} className="link">
        Registration Page
      </Link>
    </div>
  );
};

export default Navbar;
