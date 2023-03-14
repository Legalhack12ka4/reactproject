import React from 'react'
import { Navigate } from 'react-router-dom'

function PrivateRoutes() {
    
 
    const token = localStorage.getItem("jwt")
    let loggedIn= true
    if(token == null)
    {
      localStorage.removeItem("jwt");
      loggedIn = false
    }
   // Details={loggedIn}
  
  if(loggedIn == false)
  {
    localStorage.removeItem("jwt");
    return <Navigate to="/"/>
  
  }
//   return (
//     <div>
      
//     </div>
//   )
}

export default PrivateRoutes
