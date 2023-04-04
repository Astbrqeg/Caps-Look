import React from "react";

function Profile(){
    const logout = ()=>{
        window.localStorage.clear();  
        window.location.href = "/";   
      }
return(
    <button onClick={logout}>Log out</button>
)
}

export default Profile;