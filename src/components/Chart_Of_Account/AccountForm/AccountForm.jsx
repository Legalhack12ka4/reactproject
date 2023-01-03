import React from 'react'
//import DropdownAddButton from '../../Dropdowns/DropdownAddButton/DropdownAddButton';
import accountname from "../Images/account-name.svg";
import accountcode from "../Images/account-code.svg";
import "./AccountForm.scss";
import SearchDropdown from '../../AllDropdowns/SearchDropdown/SearchDropdown';
//import DropdownSimple from '../../Dropdowns/DropdownSimple/DropdownSimple';

function AccountForm() {
  function handleclose () 
{
    var m = document.querySelector('.menu1 ');
    m.classList.remove('smenu');
    document.getElementById('gradient').classList.remove('body_gradient');
  }

  const accounts = [
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
    <div className='accountform_heading'>
    {/* <Page_heading  parent={"Business Account / Leads"} child={"Add New Lead"}/> */}
    </div>
    <div className='leadform'>
    <div className='accountsform'>
    <h1 className='accountbox_heading1'>Create Chart of Account</h1>
     <div className='accountform_details' > 
    <div className='accountform-left'>
                    <label className='accountformlabel' style={{marginTop:"15px"}}>Account Type</label><br/>
                    <SearchDropdown width={331} options={accounts} />
              
                    <label className='accountformlabel' style={{marginTop:"5px"}}>Account Name</label><br/>
                    <div className='accountforminput' style={{marginTop:"5px"}}>
                        <img src={accountname} className="customerimg"/>
                        <input type="text" className='inputaccount' placeholder="Placeholder" /> 
                    </div>

                    <label className='accountformlabel' style={{marginTop:"5px"}}>Account Code</label><br/>
                    <div className='accountforminput' style={{marginTop:"5px"}}>
                        <img src={accountcode} className="customerimg"/>
                        <input type="text" className='inputaccount' placeholder="Placeholder" /> 
                    </div>

                    <label className='accountformlabel' style={{marginTop:"15px"}}>Module Type</label><br/>
                    <SearchDropdown width={331} options={accounts} />
                    {/* <DropdownSimple/>  */}
                  <label className='accountformlabel' style={{marginTop:"15px"}}>Item Type</label><br/>
                  <SearchDropdown width={331} options={accounts} />
                  {/* <DropdownSimple/>  */}
                  <label className='accountformlabel' style={{marginTop:"15px"}}>Reporting L1</label><br/>
                  <SearchDropdown width={331} options={accounts} />
                  {/* <DropdownSimple/>  */}
                  <label className='accountformlabel' style={{marginTop:"15px"}}>Reporting L2</label><br/>
                  <SearchDropdown width={331} options={accounts} />
                  {/* <DropdownSimple/>  */}
                  <label className='accountformlabel' style={{marginTop:"15px"}}>Reporting L3</label><br/>
                  <SearchDropdown width={331} options={accounts} />
                  {/* <DropdownSimple/>  */}

                  {/* <div className="customerbutton_bottom">
                <button type="button" className="customersavebutton">
                  Submit
                </button>
                <button type="button" className="customercancelbutton">
                  Cancel
                </button>
              </div>
            </div> */}

                    <div className="accountformbutton_bottom">
                <button type="button" className="accountformsavebutton">
                  Submit
                </button>
                <button type="button" className="accountformcancelbutton"   onClick={handleclose}>
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
