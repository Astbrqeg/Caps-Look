import "./HeaderImage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

export default function HeaderImage(props) {
    return (
        <div>
            <section className="BestSellersSection">
                <div className="container-headerImage">
                    <div className="Image"><img src={props.img} />
                    </div>
                </div >
            </section >
        </div >
    )
}