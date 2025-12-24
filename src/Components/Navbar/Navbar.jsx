import React from "react";
import "./Navbar.css";
import logo from "../../Assets/logo1.png"; // correct extension


const Navbar = () => {
  return (
    <nav className="navbar">
      <img src={logo} alt="Logo" className="logo" />
    </nav>
  );
};

export default Navbar;
