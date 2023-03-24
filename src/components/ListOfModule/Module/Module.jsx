import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import Page_heading from '../../Page_Heading/Page_heading'
import "./Module.scss"
import link from "../../../assets/Images/ModulePaymentTerms/Link.svg";
import CustomerPage from '../../Customer-Page/CustomerPage';
import { CategorySelect, InputGroup, SearchSelect } from '../../Dropdowns/Dropdowns';
import SearchDropdown from '../../AllDropdowns/SearchDropdown/SearchDropdown';
import CustomInput from '../../CustomInput/CustomInput';
// import { Padding } from '@syncfusion/ej2/charts';

function Module() {
  const [value, setValue] = React.useState('')

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const option = [
    { value: '1', label: 'Option ' },
    { value: '2', label: 'Option ' },
    { value: '3', label: 'Option ' },
    { value: '4', label: 'Option 4' },
    { value: '5', label: 'Option 5' },
    { value: '6', label: 'Option 6' },
  ];

//   const token = localStorage.getItem("jwt")
//   let loggedIn= true
//   if(token == null)
//   {
//     localStorage.removeItem("jwt");
//     loggedIn = false
//   }
//  // Details={loggedIn}

// if(loggedIn == false)
// {
//   localStorage.removeItem("jwt");
//   return <Navigate to="/"/>
// }
  return (
    <div className="module_container">


  
    <div className='Module_heading'>
    <Page_heading  parent={"List of Module"} child={"Module List"}/>
    </div>
    <div className='Module'>

      <div style={{marginBottom:"20px"}}>
      <img src={link}/>
      <Link exact to="/module/module_paymenttable" className='payment_btn'>Payment Terms</Link>
      </div>
      <div style={{marginBottom:"20px"}}>
      <img src={link}/>
      <Link exact to="/module/module_commissiontable" className='payment_btn'>Commission Terms</Link>
      </div>
   <div style={{marginBottom:"20px"}}>
   <img src={link}/>
   <Link exact to="/module/module_currencytable" className='currency_btn'>Currency</Link>
   </div>
   <div style={{marginBottom:"20px"}}>
   <img src={link}/>
   <Link exact to="/customers/customerPage" className='currency_btn'>Customer</Link>
   </div>
   <div style={{marginBottom:"20px"}}>
   <img src={link}/>
   <Link exact to="/itempreview" className='currency_btn'>Item Preview</Link>
   </div>
   <div style={{marginBottom:"20px"}}>
   <img src={link}/>
   <Link exact to="/unitofmeasurement" className='currency_btn'>Unit of Measurement</Link>
   </div>

   <div style={{marginBottom:"20px"}}>
   <img src={link}/>
   <Link exact to="/contact_preview" className='currency_btn'>Contact Preview</Link>
   </div>

   </div>
    </div>
 
  )
}

export default Module
