import React, { useState } from 'react';
import "./OffCanvasExample.scss";

function OffCanvasExample({form}) {
	
  function showMenu () 
  {
		var m = document.querySelector('.menu1');
		m.classList.add('smenu');
	}
	function closeMenu () 
	{
		  var m = document.querySelector('.menu1 ');
		  m.classList.remove('smenu');
		  document.getElementById('gradient').classList.remove('body_gradient');
	  }
  
	return (

<>     
			{/* <span className='ticon' onClick={showMenu}>&#9776;</span> */}
			<div className='menu1'>
				{/* <div className='menu1_container'> */}
				<span className='close' onClick={closeMenu}>&times;</span>

				{form}

				
				{/* </div> */}
			</div>
			

  
</>


	)
}
export default OffCanvasExample
