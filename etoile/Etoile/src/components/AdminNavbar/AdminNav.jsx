import React from "react";
import logo from "../logo.png";
import { Nav, NavLink } from "./NavElements";
import "./AdminNav.css";
/////////////
import cards from "../CartProduct/Productcards"; // async function fetchdata() {
//   const option = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ user: ["yosra", "darawsha"] }),
//   };
//   const response = await fetch("http://localhost3001/");
//   const data = await response.json();
//   console.log(data.body);
// }

export default function NavbarAdmin() {
  function handleSubmit(e) {
    e.preventDefault();
    // const opject = fetchdata();
    // console.log(opject);
  }
  /////////////
  // return (
  //   // <>
  //   //   <Nav className="navbar">
  //   //     <NavLink to="/" element={<Cart />}>
  //   //       <img src={logo} alt="logo" className="logo" onSubmit={handleSubmit} />
  //   //     </NavLink>
  //   //   </Nav>
  //   // </>
  // );
}
