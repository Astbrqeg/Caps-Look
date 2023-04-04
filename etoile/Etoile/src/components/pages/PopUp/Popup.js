import React, { useState } from "react";
import "./Popup.css";
import { Link } from "react-router-dom";
function Popup() {
  const [adminkey, setAdminkey] = useState('');
  const [error, setError] = useState(false);
  const RESPONSE_STATUS = {
    FAIL: false,
    SUCCESS: true,
  };
  const submit = async () => {
    try {
      if (adminkey.length == 0) {
        setError(true);
      }
      else {
        const body = { adminkey };
        const result = await fetch("http://localhost:3001/popup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const bodyPar = await result.json();
        //console.log(bodyPar, "bodyPar");
        if (bodyPar?.status === RESPONSE_STATUS.SUCCESS) {
          console.log("good user and pass");
          //window.location.href = "/adminlog";
        } else {
          setError(true);
          //console.log("bad input. try again and show message");
          //bodyPar.message;
        }
      }
    } catch (err) {
      console.error(err.message, "hiiiiii1");
    }
  }
  return (
    <div className="popup" >
      <div className="poupupBackground">
        <div className="popupContainer">
          <div className="titleCloseBtn">
            <Link to="/login"><button className="titleCloseBtn" >
              X
            </button>
            </Link>
          </div>
          <div >
            <p className="title">Please enter the security key</p>
          </div>
          <input type="password" className="passwordp" onChange={(e) => setAdminkey(e.target.value)} value={adminkey} placeholder="Security Key" id="adminkey" />
          <br></br>
          <br></br>
          {error ?
            <label className="messagep">Error</label> : ""}
          <button type="button" onClick={submit} className="submitp">Login</button>
        </div>
      </div>
    </div>
  );
}
export default Popup;