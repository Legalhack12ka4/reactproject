import React from 'react'
import Page_heading from '../Page_Heading/Page_heading';
import logo from "../Customers/images/Email.svg";
import "./Vendors.scss";
import DropdownSimple from './DropdownSimple/DropdownSimple';
// import Select from "react-select";

function Vendors() {

    // const option = [
    //     {
    //       value: "Owner",
    //       label:(<div className='contdetails' >Owner</div>),
    //     },
    //     {
    //       value: "Accountant",
    //       label: (<div className='contdetails'>Accountant</div>),
    //     },
    //     {
    //       value: "Sales Person",
    //       label: (<div className='contdetails' >Sales Person</div>),
    //     },
    //     {
    //       value: "Key Person",
    //       label: (<div className='contdetails'>Key Person</div>),
    //     },
    //     {
    //       value: "Technician",
    //       label: (<div className='contdetails'>Technician</div>),
    //     },
    //     {
    //         value: "Manager",
    //         label: (<div className='contdetails'>Manager</div>),
    //       },
    //   ];

  return (
  <>
   <div className='Vendor_heading'>
    <Page_heading  parent={"Business Account / Vendors"} child={"Add New Vendor"}/>
    </div>
    <div className='Vendorform'>
    <div className='Vendors'>
    <h1 className='box_heading1'>New Vendor</h1>
     <div className='Vendor_details' > 
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

                    {/* <div className='Vendorbutton_bottom'>
            <button type='button' className='cancelbutton'>Cancel</button>
            <button type='button' className='savebutton'>Save</button>
            </div> */}
        {/* <label className='leadlabel' >Lead Source Type</label><br/>
                    <div className='radio-group'>
                    <label className='radio'>
                        <input type="radio" value="Vendors" name="lead"  />Vendors
                         <span></span> 
                    </label>
                    <label className='radio'>
                        <input type="radio" value="Others" name="lead" />Others
                        <span></span>
                    </label>
                    </div> 
                    <label className='leadlabel' style={{marginTop:"15px"}}>{checked == "Vendors" ? "Vendors" : "Others"}</label><br/>
                    {checked =="Vendors" ?  <DropdownAddButton/> :<DropdownAddButtonOthers/> }
                    <label className='leadlabel' style={{marginTop:"15px"}}>Ownership</label><br/>
                  <DropdownAddButton/>  */}
            </div>
    </div> 
    </div>
    </div>
  </>
  )
}

export default Vendors
