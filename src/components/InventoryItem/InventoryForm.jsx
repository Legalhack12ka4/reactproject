import React, { useState } from "react";
import Page_heading from '../Page_Heading/Page_heading';
import name from "./Icons/name.svg";
import fname from "./Icons/fname.svg";
import HSN from "./Icons/HSN.svg";
import Barcode from "./Icons/Barcode.svg";
import "./InventoryForm.scss";
import DropdownSimpleInventory from './DropdownSimpleInventory/DropdownSimpleInventory';
// import Select from "react-select";
import Switch from "react-switch";

function InventoryForm() {
    const [checked, setChecked] = useState(false);
  const handleChange = nextChecked => {
    setChecked(nextChecked);
  };
  return (
  <>
   <div className='Vendor_heading'>
    <Page_heading  parent={"Item or Service"} child={"Add Inventory Item"}/>
    </div>
    <div className=''>
    <div className='inventory'>
    {/* <h1 className='box_heading1'>New Vendor</h1> */}
     {/* <div className='Vendor_details' >  */}
            <div className="imageupload"></div>
            <div className='form_contain'>
            <div className='right_form'>
            <label className='leadlabel' style={{marginTop:"5px"}}>Name</label><br/>
                    <div className='leadinput' style={{marginTop:"5px"}}>
                        <img src={name} className="customerimg"/>
                        <input type="text" style={{border:"none", outline:"none"}} placeholder="Placeholder" /> 
                    </div>
                    <label className='leadlabel' style={{marginTop:"5px"}}>Foreign Name</label><br/>
                    <div className='leadinput' style={{marginTop:"5px"}}>
                        <img src={fname} className="customerimg"/>
                        <input type="text" style={{border:"none", outline:"none"}} placeholder="Placeholder" /> 
                    </div>
                    <label className='leadlabel' style={{marginTop:"5px"}}>Tags</label><br/>
                    <DropdownSimpleInventory/>
               
   
                <div style={{marginBottom:"20px"}}>
                    <Switch
          onChange={handleChange}
          checked={checked}
          className="react-switch"
        />  <label className='leadlabel' style={{marginTop:"5px"}}>Enable Manufacturing</label>
        </div>

<div>
<Switch
          onChange={handleChange}
          checked={checked}
          className="react-switch"
        /> <label className='leadlabel' style={{marginTop:"5px"}}>Enable Variant</label>
        </div>
      
                    {/* <label class="switch">
                <input type="checkbox"/>
                <span class="slider round"></span>
                </label> */}
                    </div>  
            <div className='left_form'>
            <label className='leadlabel' style={{marginTop:"5px"}}>HSN Code</label><br/>
                    <div className='leadinput' style={{marginTop:"5px"}}>
                        <img src={HSN} className="customerimg"/>
                        <input type="text" style={{border:"none", outline:"none"}} placeholder="Placeholder" /> 
                    </div>
                    <label className='leadlabel' style={{marginTop:"5px"}}>Barcode</label><br/>
                    <div className='leadinput' style={{marginTop:"5px"}}>
                        <img src={Barcode} className="customerimg"/>
                        <input type="text" style={{border:"none", outline:"none"}} placeholder="Placeholder" /> 
                    </div>
                    <label className='leadlabel' style={{marginTop:"5px"}}>Unity Of Measurement</label><br/>
                   <DropdownSimpleInventory/>

            </div>

            </div>
    {/* <div className='form-left'>
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
                
                    <label className='leadlabel' style={{marginTop:"15px"}}>Type</label><br/>
                    <DropdownSimple/>
                    <div className="leadbutton_bottom">
                <button type="button" className="leadsavebutton">
                  Save
                </button>
                <button type="button" className="leadcancelbutton">
                Cancel
                </button>
              </div>
                  
        </div>

        <div className="Vendorform-right">
        <label className='leadlabel'>Lead Source</label><br/>
                    <DropdownSimple/>

                    <label className='leadlabel' style={{marginTop:"5px"}}>Date of Birth</label><br/>
                    <div className='leadinput' style={{marginTop:"8px"}}>

                        <img src={logo} className="customerimg"/>
                        <input type="text" style={{border:"none", outline:"none"}} placeholder="Placeholder" /> 

                    </div>
            </div> */}
    {/* </div>  */}
    </div>
    </div>
  </>
  )
}

export default InventoryForm
