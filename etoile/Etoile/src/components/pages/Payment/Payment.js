import { useState } from "react";
import "./Payment.css";


export const Payment = () => {
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [number, setNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [error, setError] = useState(false);

  const userVal = async () => {
    try {
      let request = await fetch("http://localhost:3001/payment", {
        credentials: "include",
      });
      let response = await request.json();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (first.length == 0 || last.length == 0 || number.length == 0 || expiry.length == 0 || cvv.length == 0) {
      setError(true);
    }
    if (first.length == 0 && last.length == 0 && number.length == 0 && expiry.length == 0 && cvv.length == 0) {
      setError(true);
    }
    if (first && last && number && expiry && cvv) {
      console.log(first, last, number, expiry, cvv);
    }



  }

  return (
    <div className="payment">
      <h3 className="title">Total</h3>
      <input type="text" className="first" onChange={(e) => setFirst(e.target.value)} value={first} placeholder="First Name" />
      <input type="text" className="last" onChange={(e) => setLast(e.target.value)} value={last} placeholder="Last Name" />
      <br></br>
      <br></br>
      <input type="number" className="number" onChange={(e) => setNumber(e.target.value)} value={number} placeholder="Card Number" min='1000000000000000' max='9999999999999999' maxLength='16' minLength='16' />
      <input type="month" className="expiry" onChange={(e) => setExpiry(e.target.value)} value={expiry} placeholder='MM/YY' />
      <input type="number" className="cvv" onChange={(e) => setCvv(e.target.value)} value={cvv} placeholder=" CVV" min='100' max='999' maxLength='3' minLength='3' />
      {error ?
        <label className="message">Something went wrong!</label> : ""}
      <br></br>
      <br></br>
      <button type="button" className="submit" onClick={userVal}>Submit Payment</button>
    </div>
  )
};

