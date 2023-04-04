import "./cartCards.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
export default function Cards(props) {
    let [quantity, setQuantity] = React.useState(props.quantity);
    const updateQuantityPlus = async () => {
        await setQuantity(quantity + 1);
        const data = {
            key: props.productid,
            quantity: ++quantity,
            flag: "update",
        };
        UpdateDatabase(data);
    };
    const updateQuantityMinus = async () => {
        await setQuantity(quantity - 1);
        const data = { key: props.productid, quantity: --quantity, flag: "update" };
        UpdateDatabase(data);
    };
    const deleteProduct = async () => {
        const data = { key: props.productid, flag: "delete" };
        UpdateDatabase(data);
        window.location.reload(false);
    };
    return (
        <div className="box">
            <img src={props.img} alt=""></img>
            <div className="content">
                <h3>{props.nameOfProduct}</h3>
                <h7>Price: {props.price} $</h7>
                <p className="unit">
                    <input className="quantity" value={quantity}></input>
                    <button className="btn3" onClick={updateQuantityMinus}>
                        -
                    </button>
                    <button className="btn4" onClick={updateQuantityPlus}>
                        +
                    </button>
                    <h7>
                        <br></br>Sub-Total:{quantity * props.price}
                    </h7>
                </p>
                <p>
                    <p className="btnarea">
                        <i className="fafatrash">
                            <button type="submit" className="btn2" onClick={deleteProduct}>
                                Remove
                            </button>
                        </i>
                    </p>
                </p>
            </div>
        </div>
    );
}
async function UpdateDatabase(data) {
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
        const data_json = response.json();
    } catch (error) {
        console.log(error);
    }
}