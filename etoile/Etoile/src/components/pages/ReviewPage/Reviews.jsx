import React from "react";
import "./Reviews.css";
import NavBar1 from '../../Navbar1/navbars';
import NavBar2 from '../../Navbar2/Navbar2';



export default function Reviews() {
    const [reviews, setReviews] = React.useState("");
    const [error, setError] = React.useState(false);
    const [list, setList] = React.useState([]);
    const storageUser = window.localStorage.getItem("user");



    const ShowReviews = async () => {
        try {
            let request = await fetch("http://localhost:3001/Reviews");
            let response = await request.json();
            setList(response);
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        ShowReviews();
    }, [])

    const submit = async () => {
        try {
            if (reviews.length == 0) {
                setError(true);
            } else {
                const body = { reviews };
                 await fetch("http://localhost:3001/Reviews", {
                    method: "POST",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                });
                
            }
        } catch (err) {
            console.error(err.message, "hiiiiii1");
        }
    }

    return (
        <div className="rev">
            <NavBar1 />
            <NavBar2 />
            <br></br>
            {storageUser &&
                <div>
                    <textarea className="reviews" onChange={(e) => setReviews(e.target.value)} value={reviews} name="reviews" placeholder="Add your review here!" cols="5" rows="3"></textarea>
                    <button type="button" onClick={submit} className="submitLogin">submit review</button>
                </div>}
            {error ?
                <label className="message">You Cant Submit Something Empty!</label> : ""}
            <br></br>
            <br></br>
            {list.map((rev) => (
                <div className="rate-item">
                    <h3>{rev.posttime}</h3>
                    <p>{rev.review}</p>

                </div>
            ))}


        </div>
    )
}
