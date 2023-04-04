import React from "react";
import ImageSlider from '../../Slider/Slider';
import NavBar1 from '../../Navbar1/navbars';
import NavBar2 from '../../Navbar2/Navbar2';
import { Link } from "react-router-dom";
import { BsTwitter } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import './Home.css';

export default function Home() {
    const [list, setList] = React.useState([{}]);
    const storageUser = window.localStorage.getItem("user");


    const Data = async () => {
        try {
            let res = await fetch("http://localhost:3001/");
            let jsond = await res.json();

            setList(jsond);
            console.log(jsond)
        } catch (err) {
            console.log(err);
        }
    };
    React.useEffect(() => {
        Data();
    }, []);
    return (
        <>
            <NavBar1 />
            <NavBar2 />
            <div className="HomePage">
                <div>
                    <ImageSlider />
                </div>
                {/*Start of introduction section*/}
                <div>
                    <form action="/menu" id="Introduce" >
                        <section id="IntroduceSection">
                            <div className="IntroduceContainer">
                                <div className="IntroduceLogo">
                                    <img className="fit-picture" src={require('./logo-color.jpg')} alt='EtoileLogo' />
                                </div>
                                <div className="IntroduceParagraph" >
                                    <p>
                                        We challenge beauty industry norms for what is considered women esthetics & makeup
                                        and instead focus on creating different meaning of beauty that makes you feel comfortable
                                        & confident in who you are.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </form>
                </div>
                {/*End of introduction section*/}
                {/*Start of BestSeller section*/}
                <div>

                    <section className="BestSellersSection">
                        <div className="BestSellersContainer">
                            <div className="BestSellersTop">
                                <h3 className="section-title">Our Best Sellers</h3>
                            </div >
                            <div className="BestSeller-bottom">
                                <div className="BestSellers-item" id="product1">
                                    <img src={require('./61pBTQ8rFzL._AC_UF894,1000_QL80_.jpg')} />
                                </div>
                                <div className="BestSellers-item" id="product2">
                                    <img
                                        src={require('./27363683002.jpg')} />
                                </div>
                                <div className="BestSellers-item" id="product3">
                                    <img
                                        src={require('./3677083.jpg')} />
                                </div>
                            </div>
                            <div className="BestSeller-bottom-last">
                                <div className="BestSellerOffer">
                                    <Link to="/Products"><h3 className="link-btn">View all products</h3></Link>
                                </div>
                            </div>
                        </div>
                    </section>
                </div >
                {/*End of BestSeller section*/}
                {/*Start of Catigories section*/}
                <div>
                    <section className="CatigoriesSection">
                        <div className="CatigoriesContainer">
                            <div className="CatigoriesTop">
                                <h1 className="section-title"><span>Categories </span></h1>
                            </div>
                            <div className="CatigoriesBottom">
                                <div className="Catigoryitem" id="HairCare">
                                    <div className="icon">
                                    </div>
                                    <a href="/Hair"><h2>Hair Care</h2></a>
                                </div>
                                <div className="Catigoryitem" id="SkinCare">
                                    <div className="icon">
                                    </div>
                                   <a href="/SkinCare"><h2>Skin Care</h2></a>
                                </div>
                                <div className="Catigoryitem" id="MakeUp">
                                    <div className="icon">
                                    </div>
                                    <a href="/Makeup"><h2>Make Up</h2></a>
                                </div>
                                <div className="Catigoryitem" id="Fragrance">
                                    <div className="icon">
                                    </div>
                                   <a href="/Fragrance"> <h2>Fragrance</h2></a>
                                </div>
                                <div className="Catigoryitem" id="ToolsBrushes">
                                    <div className="icon">
                                    </div>
                                   <a href="/Tools&Brushes"><h2>Tools & Brushes</h2></a>
                                </div>
                                <div className="Catigoryitem" id="BathBody">
                                    <div className="icon">
                                    </div>
                                    <a href="/Bath&Body"><h2>Bath & Body</h2></a>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                {/*End of Catigories section*/}
                {/*Start of Reviews section*/}
                <div>
                    <section className="Reviews">
                        <div className="ReviewContainer">
                            <div className="rate-top">
                                <h1 className="section-title"><span>Reviews</span></h1>
                            </div>
                            <div className="rate-bottom">
                                <div className="rate-item">
                                    <div><h2>Yosrada,</h2><h3> 24.12.2022 15:30</h3></div>
                                    <p>Best shopping experience i have ever!</p>
                                </div>
                                <div className="rate-item">
                                    <div><h2>Astbrq,</h2><h3> 24.12.2022 16:33</h3></div>
                                    <p>Best products and fair prices, recommended.</p>
                                </div>
                                <div className="rate-item">
                                    <div><h2>Koto,</h2><h3> 29.12.2022 11:11:11</h3></div>
                                    <p>Meeeooow!!!</p>
                                </div>
                            </div>
                            <br></br>
                            <div className="reviewOffer">
                                <Link to="/Reviews"><h3 className="link-btn">Show me all the reviews</h3></Link>
                            </div>
                            {!storageUser &&
                            <div className="cant-Review">
                                <h2>To submit your review, please <a href='/login'>sign-in</a></h2>
                            </div>}
                        </div>
                    </section>
                </div>
                {/*End of Reviews section*/}
                {/*Start of contact-us section*/}
                <div>
                    <section className="contact-us">
                        <div className="contact-container">
                            <h1 className="section-title">Find & <span>Contact us</span></h1>
                            <div className="info-location">
                                <h2>WebAhead CS2, Mussawa center, Haifa  </h2>
                                <a href="https://www.google.co.il/maps/@32.8170145,34.9919278,3a,75y,263.67h,73.26t/data=!3m6!1e1!3m4!1seiDgFvxh49LkKZua6h_GNQ!2e0!7i13312!8i6656?hl=en&authuser=0"><img
                                    src={require('./maps.jpg')} /></a>
                            </div>
                            <div className="info-cantact">
                                <h2>E-mail</h2>
                                <h3>E-mail : info@Etiole.com</h3>
                                <h2>Follow us on social media</h2>
                                <br></br>
                                <BsFacebook /> <BsInstagram /> <BsTwitter />
                            </div>
                        </div>
                    </section >
                </div >
                {/*End of contact-us section*/}
            </div >
        </>
    );
}