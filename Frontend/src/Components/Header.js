import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

const Header = () => {
  return (
    <div className="header">
      <div className="brand">
        <Link to="/">MERN Stack CRUD Operations</Link>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/addemployee">Add New Employee</Link>
      </div>
    </div>
  );
};

export default Header;
