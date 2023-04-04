import React, { useState, useEffect } from "react";
import Navbar from "../../Navbar1/navbars";
import Navbar2 from "../../Navbar2/Navbar2";
import ProductCard from "../../ProductCard/ProductCard";
import './ProductDetail.css';
import { useParams } from "react-router-dom";


export default function ProductDetail() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    const ProductsData = async () => {
        try {
            let request = await fetch(`http://localhost:3001/Products/${id}`);
            let response = await request.json();
            setProducts(response.rows[0]);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        ProductsData();
    }, [id])

    const Loading = () => {
        return (
            <div>
                Loading...
            </div>
        )
    }

    const addToCart = async (product) => {
        try {
            await fetch("http://localhost:3001/AddProductToCart", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    product
                }),
            });

        } catch (error) {
            console.log(error);
        }
    }

    const Show = () => {

        return (
            <div className="prodetcon">
                <div className="o494">
                    <img src={products.img} />
                </div>
                <div className="oodj9">
                    <h2>{products.productname}</h2>
                    <h3>{products.description}</h3>
                    <h3>Price: {products.price}$</h3>
                </div>
                <div className="underhhButton"onClick={() => addToCart(products)}>
                  <input className="addnButton" type="submit" value="add to cart" /></div>
                </div>

        )
    }



    return (
        <div>
            <Navbar />
            <Navbar2 />
            <div className="ProductsPageContainer">

                <div>
                    {loading ? <Loading /> : <Show />}
                </div>


            </div>

        </div>
    )
}