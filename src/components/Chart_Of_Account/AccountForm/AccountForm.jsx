import React from 'react'
import DropdownAddButton from '../../Leads/DropdownAddButton/DropdownAddButton';
import accountname from "../Images/account-name.svg";
import accountcode from "../Images/account-code.svg";
import "./AccountForm.scss";
import DropdownSimple from '../../Contacts/DropdownSimple/DropdownSimple';

function AccountForm() {
  return (
    <>
    <div className='accountform_heading'>
    {/* <Page_heading  parent={"Business Account / Leads"} child={"Add New Lead"}/> */}
    </div>
    <div className='leadform'>
    <div className='accountsform'>
    <h1 className='accountbox_heading1'>Create Chart of Account</h1>
     <div className='accountform_details' > 
    <div className='accountform-left'>
                    <label className='accountformlabel' style={{marginTop:"15px"}}>Account Type</label><br/>
                     <DropdownSimple/> 


                    <label className='accountformlabel' style={{marginTop:"5px"}}>Account Name</label><br/>
                    <div className='accountforminput' style={{marginTop:"5px"}}>

                        <img src={accountname} className="customerimg"/>
                        <input type="text" style={{border:"none", outline:"none"}} placeholder="Placeholder" /> 

                    </div>
                    <label className='accountformlabel' style={{marginTop:"5px"}}>Account Code</label><br/>
                    <div className='accountforminput' style={{marginTop:"5px"}}>
                        <img src={accountcode} className="customerimg"/>
                        <input type="text" style={{border:"none", outline:"none"}} placeholder="Placeholder" /> 
                    </div>

                    <label className='accountformlabel' style={{marginTop:"15px"}}>Module Type</label><br/>
                    <DropdownSimple/> 
                  <label className='accountformlabel' style={{marginTop:"15px"}}>Item Type</label><br/>
                  <DropdownSimple/> 
                  <label className='accountformlabel' style={{marginTop:"15px"}}>Reporting L1</label><br/>
                  <DropdownSimple/> 
                  <label className='accountformlabel' style={{marginTop:"15px"}}>Reporting L2</label><br/>
                  <DropdownSimple/> 
                  <label className='accountformlabel' style={{marginTop:"15px"}}>Reporting L3</label><br/>
                  <DropdownSimple/> 

                    <div className="accountformbutton_bottom">
                <button type="button" className="accountformsavebutton">
                  Submit
                </button>
                <button type="button" className="accountformcancelbutton">
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

export default AccountForm
