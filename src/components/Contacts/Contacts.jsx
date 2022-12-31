import React from 'react'
import Page_heading from '../Page_Heading/Page_heading';
import logo from "../Customers/images/Email.svg";
import "./Contacts.scss";
import SearchDropdown from '../AllDropdowns/SearchDropdown/SearchDropdown';
//import DropdownSimple from './DropdownSimple/DropdownSimple';
// import Select from "react-select";

function Contacts() {

  function handleclose () 
	{
		  var m = document.querySelector('.menu1 ');
		  m.classList.remove('smenu');
		  document.getElementById('gradient').classList.remove('body_gradient');
	  }

  const contacts = [
    {
      value: "1",
      label: "Value 1",
    },
    {
      value: "2",
      label: "Value 2",
    },
    {
      value: "3",
      label: "Value3",
    },
  ];
  return (
  <>
   <div className='contact_heading'>
    {/* <Page_heading  parent={"Business Account / Contacts"} child={"Add New Contact"}/> */}
    </div>
    <div className='contactform'>
    <div className='contacts'>
    <h1 className='box_heading1'>New Contact</h1>
     <div className='contact_details' > 
    <div className='form-left'>
                    <label className='contactlabel' style={{marginTop:"5px"}}>Name</label><br/>
                    <div className='contactinput' style={{marginTop:"5px"}}>
                        <img src={logo} className="customerimg"/>
                        <input type="text" style={{border:"none", outline:"none"}} placeholder="Placeholder" /> 
                    </div>
                    <label className='contactlabel' style={{marginTop:"5px"}}>Mobile No.</label><br/>
                    <div className='contactinput' style={{marginTop:"5px"}}>

                        <img src={logo} className="customerimg"/>
                        <input type="text" style={{border:"none", outline:"none"}} placeholder="Placeholder" /> 

                    </div>
                    <label className='contactlabel' style={{marginTop:"5px"}}>Email</label><br/>
                    <div className='contactinput' style={{marginTop:"5px"}}>

                        <img src={logo} className="customerimg"/>
                        <input type="text" style={{border:"none", outline:"none"}} placeholder="Placeholder" /> 

                    </div>
                    <label className='contactlabel' style={{marginTop:"5px"}}>Date of Birth</label><br/>
                    <div className='contactinput' style={{marginTop:"5px"}}>

                        <img src={logo} className="customerimg"/>
                        <input type="text" style={{border:"none", outline:"none"}} placeholder="Placeholder" /> 

                    </div>
                
                    <label className='contactlabel' style={{marginTop:"15px"}}>Position</label><br/>
                    {/* <DropdownSimple/> */}
              <SearchDropdown width={330} options={contacts} />

                    <label className='contactlabel' style={{marginTop:"15px"}}>Ownership</label><br/>
                    {/* <DropdownSimple/> */}
              <SearchDropdown width={330} options={contacts} />

                    <div className="contactbutton_bottom">
                <button type="button" className="contactsavebutton">
                  Save
                </button>
                <button type="button" className="contactcancelbutton"  onClick={handleclose}>
                Cancel
                </button>
              </div>
                  
        </div>

         {/* <div className="contactform-right">
        <label className='leadlabel'>Lead Source</label><br/>
                    <DropdownSimple/>

                    <label className='leadlabel' style={{marginTop:"5px"}}>Date of Birth</label><br/>
                    <div className='leadinput' style={{marginTop:"8px"}}>

                        <img src={logo} className="customerimg"/>
                        <input type="text" style={{border:"none", outline:"none"}} placeholder="Placeholder" /> 

                    </div>

            </div>  */}
    </div> 
    </div>
    </div>
  </>
  )
}

export default Contacts
