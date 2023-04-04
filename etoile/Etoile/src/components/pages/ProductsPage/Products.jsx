import React from "react";
import "./Products.css";
import { NavLink, Link } from "react-router-dom";
import HeaderImage from '../../HeaderImage/HeaderImage';
import NavBar1 from '../../Navbar1/navbars';
import NavBar2 from '../../Navbar2/Navbar2';
import ProductCard from "../../ProductCard/ProductCard";
import PriceFilter from "./PriceFilter";

export default function Products() {
    const [products, setList] = React.useState([]);

    const [filter, setFilter] = React.useState({
        minPrice: 0,
        maxPrice: 100
    });

    const ProductsData = async () => {
        try {
            let request = await fetch("http://localhost:3001/Products");
            let response = await request.json();
            setList(response);
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        ProductsData();
    }, [])



    const addToCart = async (product) => {
        try {
            const request = await fetch("http://localhost:3001/AddProductToCart", {
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

    return (
        <>
            <NavBar1 />
            <NavBar2 />
            <div className="ProductsPageContainer">
                <div className="ProductsPageTop">
                    <HeaderImage img={require("./makeup-brushes-on-white-marble-background-picjumbo-com.jpg")} />
                    <div>
                        <div className="ProductsPageBottom">
                            <div className="filter">
                                <PriceFilter filters={filter} setFilters={setFilter} />
                            </div>
                            {products
                                .filter((product) => product.price >= filter.minPrice)
                                .filter((product) => product.price <= filter.maxPrice)
                                .filter((product) => product.type === filter.type)
                                .map((product, index) => (
                                    <div className="ProductsPageItem">
                                        <Link to="/Product"></Link>
                                        <ProductCard
                                            key={product.id}
                                            img={product.img}
                                            productName={product.productname}
                                            price={product.price}
                                        />
                                        <Link to={`/products/${product.id}`}>View Details</Link>
                                        <div className="underButton"
                                            onClick={() => addToCart(product)}
                                        ><input className="addButton" type="submit" value="add to cart" /></div>
                                    </div>
                                ))}

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}