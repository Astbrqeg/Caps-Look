import React from "react";
import logo from "./logo.png";
import { Nav, NavLink, Bars, NavMenu } from "./navbarElement";
import { FaUserAlt } from "react-icons/fa";
import { BsFillBasket2Fill, BsSearch } from "react-icons/bs";
import "./nav.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import AutocompleteInput from "./AutocompleteInput";



export default function Navbar() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const storageUser = window.localStorage.getItem("user");

  const logout = async () => {
    await fetch("http://localhost:3001/Logout", {
      credentials: "include"
    })
    window.localStorage.setItem('user', "");

  }


  return (
    <>
      <Nav className="navbar">
        <NavLink to="/">
          <img src={logo} alt="logo" className="logonav" />
        </NavLink>

            <AutocompleteInput apiUrl="http://localhost:3001/Products"/>
        
        <div className="items">
          <NavMenu className="navmenu">
            <Link
              className="cartnav"
              to="/cart"
              activeStyle
            >
              <BsFillBasket2Fill />
            </Link>

            {!storageUser && (
              <a className="tologin" href="/login"><FaUserAlt />
              </a>
            )}

            {storageUser && (
              <div className="loggedin">
                <i >Welcome {storageUser} </i>
                <a  onClick={logout} href="/">
                  <i > Log out</i>
                </a>
              </div>
            )}

          </NavMenu>
        </div>
      </Nav>
    </>
  );
}

