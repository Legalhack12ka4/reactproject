import React from 'react'
import "./Contacts.scss";
import SearchDropdown from '../AllDropdowns/SearchDropdown/SearchDropdown';
import dob from "../../assets/Images/FormIcon/DOB.svg";
import name from "../../assets/Images/FormIcon/Name Contact.svg";
import Phone from "../../assets/Images/FormIcon/Phone Contact.svg";
import email from "../../assets/Images/FormIcon/Email Contact.svg";

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
                        <img src={name} className="customerimg"/>
                        <input type="text" className='inputcontact' placeholder="Placeholder" /> 
                    </div>
                    <label className='contactlabel' style={{marginTop:"5px"}}>Mobile No.</label><br/>
                    <div className='contactinput' style={{marginTop:"5px"}}>

                        <img src={Phone} className="customerimg"/>
                        <input type="text" className='inputcontact' placeholder="Placeholder" /> 

                    </div>
                    <label className='contactlabel' style={{marginTop:"5px"}}>Email</label><br/>
                    <div className='contactinput' style={{marginTop:"5px"}}>

                        <img src={email} className="customerimg"/>
                        <input type="text" className='inputcontact' placeholder="Placeholder" /> 

                    </div>
                    <label className='contactlabel' style={{marginTop:"5px"}}>Date of Birth</label><br/>
                    <div className='contactinput' style={{marginTop:"5px"}}>

                        <img src={dob} className="customerimg"/>
                        <input type="text" className='inputcontact' placeholder="Placeholder" /> 

                    </div>
                
                    <label className='contactlabel' style={{marginTop:"15px"}}>Position</label><br/>
                    {/* <DropdownSimple/> */}
              <SearchDropdown width={331} options={contacts} />

                    <label className='contactlabel' style={{marginTop:"15px"}}>Ownership</label><br/>
                    {/* <DropdownSimple/> */}
              <SearchDropdown width={331} options={contacts} />

                    <div className="contactbutton_bottom">
                <button type="button" className="contactsavebutton">
                  Submit
                </button>
                <button type="button" className="contactcancelbutton"  onClick={handleclose}>
                Cancel
                </button>
              </div>
                  
        </div>

    </div> 
    </div>
    </div>
  </>
  )
}

export default Contacts
