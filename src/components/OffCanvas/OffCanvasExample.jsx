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
				<div className='' id="gradient">
			<div className='menu1'>
				
				{form}
			</div>
			</div>

  
</>


	)
}
export default OffCanvasExample
