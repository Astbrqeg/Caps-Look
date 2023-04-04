import "./ProductCard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

export default function ProductCard(props) {
    return (
        <div className="ProductCard-item">
            <img src={props.img} />
            <h3>{props.productName}</h3>
            <h3>{props.price} $</h3>
        </div>
    )
}