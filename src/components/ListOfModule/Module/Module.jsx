import React from 'react'
import { Link } from 'react-router-dom'
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
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ];

  return (
    <div className="module_container">


  
    <div className='Module_heading'>
    <Page_heading  parent={"List of Module"} child={"Module List"}/>
    </div>
    <div className='Module'>

    <SearchSelect width={330} name="ownership" addNew="User" lable="Contact" options={option} value={value} onChange={handleChange}/>
    <SearchSelect width={150} name="ownership" addNew="User" lable="Lable" options={option} value={value} onChange={handleChange}/>
    {/* <CategorySelect  /> */}
    <InputGroup />
    <CustomInput label="Contact" width={330} icon/>


      <div style={{padding:"20px 20px"}}>
      <div style={{marginBottom:"20px"}}>
      <img src={link}/>
      <Link exact to="/module/module_paymenttable" className='payment_btn'>Payment Terms</Link>
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
   <Link exact to="/login" className='currency_btn'>Login</Link>
   </div>
   <div style={{marginBottom:"20px"}}>
   <img src={link}/>
   <Link exact to="/manufactured_group" className='currency_btn'>Manufactured Group</Link>
   </div>
   <div style={{marginBottom:"20px"}}>
   <img src={link}/>
   <Link exact to="/manufactured_item" className='currency_btn'>Manufactured Item</Link>
   </div>

   
  
  

   {/* <div style={{marginBottom:"20px"}}>
   <img src={link}/>
   <Link exact to="/itemtable" className='currency_btn'>Item Table</Link>
   </div>
   <div style={{marginBottom:"20px"}}>
   <img src={link}/>
   <Link exact to="/itemgrouptable" className='currency_btn'>Item Group Table</Link>
   </div> */}
   </div>
    </div>
    </div>
  )
}

export default Module
