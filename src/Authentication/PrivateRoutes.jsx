import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function PrivateRoutes() {
    
 
    const token = getCookie("jwt");

    function getCookie(name) {
      const cookieString = document.cookie;
      const cookies = cookieString.split("; ");
      for (let i = 0; i < cookies.length; i++) {
        const [cookieName, cookieValue] = cookies[i].split("=");
        if (cookieName === name) {
          return decodeURIComponent(cookieValue);
        }
      }
      return null;
    }


    let loggedIn= true
    if(token == null)
    {
     removeCookie("jwt");
      loggedIn = false
    }


function removeCookie(name) {
  setCookie(name, "", -1);
}

function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
}
   // Details={loggedIn}
  
  if(loggedIn == false)
  {
    removeCookie("jwt");
    return <Navigate to="/login"/>
  }
  else{
    return (
    <>
    <Outlet/>
    </>
    )
  }
//   return (
//     <div>
      
//     </div>
//   )
}

export default PrivateRoutes
