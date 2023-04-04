import { useState } from "react";
import "./AdminLog.css";
import { Link } from "react-router-dom";
function AdminLog() {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState(false);
   const RESPONSE_STATUS = {
      FAIL: false,
      SUCCESS: true,
   };
   const submit = async () => {
      try {
         if (username.length == 0 || password.length == 0) {
            setError(true);
         } else {
            const body = { username, password };
            const result = await fetch("http://localhost:3001/adminlog", {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify(body),
            });
            const bodyPar = await result.json();
            console.log(bodyPar, "bodyPar");
            if (bodyPar?.status === RESPONSE_STATUS.SUCCESS) {
               console.log("good user and pass");
               window.location.href = "/payment";
            } else {
               setError(true);
            }
         }
      } catch (err) {
         setError(true);
      }
   }

   return (
      <div className="adminlog">
         <h3 className="title">Admin Login</h3>
         <input type="text" className="email" onChange={(e) => setUsername(e.target.value)} value={username} placeholder="UserName" />
         <input type="password" className="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password" />
         {error ?
            <label className="message">Something went wrong!</label> : ""}
         <br></br>
         <br></br>
         <button type="button" onClick={submit} className="submitd">Login</button>
         <br></br>
         <Link to="/"><button className="link-btnd">
            Home Page
         </button>
         </Link>
      </div>
   )
};
export default AdminLog;