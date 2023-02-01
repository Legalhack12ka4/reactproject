import React from 'react';
import './PageNotFound.scss';
import sideimage from "../../assets/Images/PageNotFound/sideimage.svg";
import leftimage from "../../assets/Images/PageNotFound/leftimage.svg";
import back from "../../assets/Images/PageNotFound/back.svg";
import forward from "../../assets/Images/PageNotFound/forward.svg";
import { Link, useNavigate } from 'react-router-dom';



function PageNotFound() {
  const navigate = useNavigate();
  const goBack = () => {
		navigate(-1);
	}
  return (
    <div className='not-found'>
     
   <div style={{display:"flex", gap:"150px", padding:"170px 190px"}}>
    <div>
      <p className='error'>404 Error</p>
      <div style={{display:"flex", gap:"39px", marginTop:"34px"}}>
        <div><p  className='page'>Page Not found...</p></div>
        <div> <img src={leftimage} /></div>
      </div>
      <p className='textdesc'>We're sorry, the page you requested could not be found 
        <br/>Please go back to previous page or homepage </p>

        <div style={{display:"flex", gap:"12px", marginTop:"34px"}}>
           <div>
          <button className='back' onClick={goBack}><img src={back} style={{marginRight:"8px"}}/>Go Back</button>
          </div>
        <div> <Link exact to="/"><button className='home'>Go Home</button></Link> </div>
      </div>
      <p className='doc'>Documention <img src={forward} style={{marginLeft:"11px"}}/></p>
      <p className='docdesc'>Drive into to learn all about our software.</p>

      <p className='doc'>Take support <img src={forward} style={{marginLeft:"11px"}}/></p>
      <p className='docdesc'>Our friendly team is here to help.</p>
    </div>
    
   
   
   
   
    <div>
      <img src={sideimage} />
    </div>
   </div>

  </div>
  )
}

export default PageNotFound
