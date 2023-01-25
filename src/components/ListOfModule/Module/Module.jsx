import React from 'react'
import { Link } from 'react-router-dom'
import Page_heading from '../../Page_Heading/Page_heading'
import "./Module.scss"
import link from "../../../assets/Images/ModulePaymentTerms/Link.svg";
import CustomerPage from '../../Customer-Page/CustomerPage';
// import { Padding } from '@syncfusion/ej2/charts';

function Module() {
  return (
    <div className="module_container">
  
    <div className='Module_heading'>
    <Page_heading  parent={"List of Module"} child={"Module List"}/>
    </div>
    <div className='Module'>
      <div style={{padding:"20px 20px"}}>
      <div style={{marginBottom:"20px"}}>
      <img src={link}/>
      <Link exact to="/module/module_paymenttable" className='payment_btn'>Payment Terms</Link>
      </div>
   <div>
   <img src={link}/>
   <Link exact to="/module/module_currencytable" className='currency_btn'>Currency</Link>
   </div>
   <div>
   <img src={link}/>
   <Link exact to="customer/customerPage" className='currency_btn'>customer</Link>
   </div>
   </div>
    </div>
    </div>
  )
}

export default Module
