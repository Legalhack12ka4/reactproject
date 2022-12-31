import React, { useEffect, useState } from 'react'
import "./Leads.scss";
import logo from "../Customers/images/Email.svg";
import SearchDropdown from '../AllDropdowns/SearchDropdown/SearchDropdown';
import SearchDropdownAddButton from '../AllDropdowns/SearchDropdownAddButton/SearchDropdownAddButton';
import { classList } from '@syncfusion/ej2/base';
// import DropdownAddButton from './DropdownAddButton/DropdownAddButton';
// import DropdownAddButtonOthers from './DropdownAddButtonOthers.jsx/DropdownAddButtonOthers';

function Leads() {

const [checked, setChecked] = useState("Contacts")

// useEffect(() => {
//   window.history.go(-1)
//   // Update the document title using the browser API
//  // document.title = `You clicked ${count} times`;
// });

function handleclose () 
{
    var m = document.querySelector('.menu1 ');
    m.classList.remove('smenu');
    document.getElementById('gradient').classList.remove('body_gradient');
    //window.history.go(-1).classList.remove('body_gradient');
  // var back= window.history.back(document.getElementById('gradient').classList.remove('body_gradient'));
  // back.classList.remove('body_gradient');
   //window.location.reload(window.history.back());
  }
const contacts = [
  {
    value: "1",
    label: "Aman Jaria",
  },
  {
    value: "2",
    label: "Ashish Jaria",
  },
  {
    value: "3",
    label: "Parth Goswami",
  },
  {
    value: "4",
    label: "Suryansh Jaria",
  },
  {
    value: "5",
    label: "Kushal Nahata",
  },
];
  return (
   <>
    <div className='lead_heading'>
    {/* <Page_heading  parent={"Business Account / Leads"} child={"Add New Lead"}/> */}
    </div>
    <div className='leadform'>
    <div className='leads'>
    <h1 className='box_heading1'>New Lead</h1>
     <div className='lead_details' > 
    <div className='form-left'>
      
                    <label className='leadlabel' style={{marginTop:"5px"}}>Name</label><br/>
                    <div className='leadinput' style={{marginTop:"5px"}}>
                        <img src={logo} className="customerimg"/>
                        <input type="text" style={{border:"none", outline:"none"}} placeholder="Placeholder" /> 
                    </div>
                    <label className='leadlabel' style={{marginTop:"5px"}}>Mobile No.</label><br/>
                    <div className='leadinput' style={{marginTop:"5px"}}>

                        <img src={logo} className="customerimg"/>
                        <input type="text" style={{border:"none", outline:"none"}} placeholder="Placeholder" /> 

                    </div>
                    <label className='leadlabel' style={{marginTop:"5px"}}>Email</label><br/>
                    <div className='leadinput' style={{marginTop:"5px"}}>

                        <img src={logo} className="customerimg"/>
                        <input type="text" style={{border:"none", outline:"none"}} placeholder="Placeholder" /> 

                    </div>
                    <label className='leadlabel' style={{marginTop:"5px"}}>Company Name</label><br/>
                    <div className='leadinput' style={{marginTop:"5px"}}>
                        <img src={logo} className="customerimg"/>
                        <input type="text" style={{border:"none", outline:"none"}} placeholder="Placeholder" /> 
                    </div>

                    <label className='leadlabel' >Lead Source Type</label><br/>
                    <div className='radio-group'>
                    <label className='radio'>
                        <input type="radio" value="Contacts" name="lead"  checked={checked == "contacts" ? true : false} onClick={e=>setChecked("contacts")} />Contacts
                         <span></span> 
                    </label>
                    <label className='radio'>
                        <input type="radio" value="Others" name="lead" onClick={e=>setChecked("Others")}  checked={checked == "Others" ? true : false}/>Others
                        <span></span>
                    </label>
                    </div> 
                    <label className='leadlabel' style={{marginTop:"15px"}}>{checked == "contacts" ? "Contacts" : "Others"}</label><br/>
                    {checked =="contacts" ?  <SearchDropdown width={330} options={contacts}/> :<SearchDropdownAddButton/> }
                    <label className='leadlabel' style={{marginTop:"15px"}}>Ownership</label><br/>
                    <SearchDropdown width={330} options={contacts} />
                  {/* <DropdownAddButton/>  */}

                    <div className="leadbutton_bottom">
                <button type="button" className="leadsavebutton">
                  Save
                </button>
                <button type="button" className="leadcancelbutton"   onClick={handleclose}>
                Cancel
                </button>
              </div>
        </div>

        {/* <div className="leadform-right">
        <label className='leadlabel' >Lead Source Type</label><br/>
                    <div className='radio-group'>
                    <label className='radio'>
                        <input type="radio" value="Contacts" name="lead"   onClick={e=>setChecked("Contacts")} checked={checked == "Contacts" ? "true" : "false"}/>Contacts
                         <span></span> 
                    </label>
                    <label className='radio'>
                        <input type="radio" value="Others" name="lead" onClick={e=>setChecked("Others")}  checked={checked == "Others" ? "true" : "false"}/>Others
                        <span></span>
                    </label>
                    </div> 
                    <label className='leadlabel' style={{marginTop:"15px"}}>{checked == "Contacts" ? "Contacts" : "Others"}</label><br/>
                    {checked =="Contacts" ?  <DropdownAddButton/> :<DropdownAddButtonOthers/> }
                    <label className='leadlabel' style={{marginTop:"15px"}}>Ownership</label><br/>
                  <DropdownAddButton/> 
            </div> */}
    </div> 
    </div>
    </div>
   </>
  )
}

export default Leads
