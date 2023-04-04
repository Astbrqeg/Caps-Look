import "./Navbar2.css";
import React from "react";
import { Link } from "react-router-dom";
function Navbar2() {
  return (
    <nav className="nav">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Products">All Products</Link>
        </li>
        <li>
          <Link to="/Makeup">Makeup</Link>
        </li>
        <li>
          <Link to="/SkinCare">SkinCare</Link>
        </li>
        <li>
          <Link to="/Hair">Hair</Link>
        </li>
        <li>
          <Link to="/Fragrance">Fragrance</Link>
        </li>
        <li>
          <Link to="/Tools&Brushes">Tools&Brushes</Link>
        </li>
        <li>
          <Link to="/Bath&Body">Bath&Body</Link>
        </li>
      </ul>
    </nav>
  );
}
export default Navbar2;