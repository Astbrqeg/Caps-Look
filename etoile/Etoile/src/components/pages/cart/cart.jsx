import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Cards from "./Productcards.js";
import "./list.css";


export default function Cart() {
  const [list, setlist] = React.useState([]);
  let total = 0;
  const storageUser = window.localStorage.getItem("user");

  const productInCard = async () => {
    try {
      let response = await fetch("http://localhost:3001/Cart", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resJson = await response.json();
      console.log(resJson, "products");
      setlist(resJson);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    productInCard();
  }, []);
  const makeOrder = () => {
    const data = { flag: "updateOrderTable", total: total };
    updateOrderDB(data);
  }
  if (list.length > 0) {
    console.log("test1");
    for (let i = 0; i < list.length; i++) {
      console.log("test2");
      total += list[i].price * list[i].quantity;
    }
    return (
      <div class="wrapper">
        <h1>Shopping Cart</h1>
        <div class="project">
          <div class="shop">{list.map(insertcards)}</div>
        </div>
        <h3 className="total">Total:{total}</h3>
        <Link to="/payment">
          <button className="pay" type="submit" onClick={makeOrder}>
            PAY
          </button>
        </Link>
      </div>
    );
  } else if (list.length === 0 && storageUser) {
    return (
      <div >
        <h2 className="emptyyy">Your Cart Is Empty</h2>
        <Link to="/Products" className="papg">
          <button className="shopping">Go To Shopping!!</button>
        </Link>
      </div>
    );
  } else if (list.length === 0 && !storageUser) {
    return (
      <div >
        <h2 className="oh67">You Have To Login </h2>
        <Link to="/login" className="underdown">
          <button className="giva">Login</button>
        </Link>
      </div>
    )
  }
}
function insertcards(item) {
  return (
    <Cards
      key={item.productid}
      nameOfProduct={item.productname}
      price={item.price}
      img={item.img}
      quantity={item.quantity}
      productid={item.productid}
    />
  );
}
async function updateOrderDB(data) {
  try {
    const response = await fetch("http://localhost:3001/Cart", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json_response = await response.json();
  } catch (error) {
    console.log(error);
  }
}