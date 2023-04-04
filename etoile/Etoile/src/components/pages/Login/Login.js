import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import '../AdminLogin/AdminLog.css';



function Login() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState(false);
   const RESPONSE_STATUS = {
      FAIL: false,
      SUCCESS: true,
   };
 
   
       
   const submit = async () => {
      try {
         if (email.length == 0 || password.length == 0) {
            setError(true);
         } else {
            const body = { email, password };
            const result = await fetch("http://localhost:3001/login", {
               method: "POST",
               credentials: "include",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify(body),
            });
            const bodyPar = await result.json();
            console.log(bodyPar, "bodyPar");
            if (bodyPar?.status === RESPONSE_STATUS.SUCCESS) {
               console.log("good user and pass");
               // window.location.href = "/";
               window.localStorage.setItem('user', JSON.stringify(body.email))
               window.location.href = '/';
            } else {
               setError(true);
               
               //bodyPar.message;
            }
         }
      } catch (err) {
         console.error(err.message, "hiiiiii1");
      }

     
   };
   return (
      <div className="login">
         <h3 className="title">Login</h3>
         <input type="email" className="email" onChange={(e) => setEmail(e.target.value)} value={email} name="email" placeholder="Email" />
         <br></br>
         <input type="password" className="password" onChange={(e) => setPassword(e.target.value)} name="password" value={password} placeholder="Password" />
         {error ?
            <label className="message">Something went wrong!</label> : ""}
         <br></br>
         <br></br>
         <button type="button" onClick={submit} className="submitLogin">Login</button>
         <br></br>
         <Link to="/Signup"><button className="link-btn">
            New user? Create account here.
         </button>
         </Link>
      </div>
   )
};
export default Login;