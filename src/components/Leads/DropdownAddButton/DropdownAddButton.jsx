import React from 'react'
import { Link } from 'react-router-dom';
import Select from "react-select";
import "./DropdownAddButton.scss";

function DropdownAddButton() {

    const handlecheck = () =>
    {
      alert("Click for add");
    }
    const option = [
        {
          value: "Owner",
          label:(<div className='contdetails' >Aman Jaria</div>),
        },
        {
          value: "Accountant",
          label: (<div className='contdetails'>Ashish Jaria</div>),
        },
        {
          value: "Sales Person",
          label: (<div className='contdetails' >Parth Goswami</div>),
        },
        {
          value: "Key Person",
          label: (<div className='contdetails'>Suryansh Jaria</div>),
        },
        {
          value: "Technician",
          label: (<div className='contdetails'>Kushal Nahata</div>),
        },
        {
            value: "Manager",
            
            label: (<div><Link className='contbtndetails' type="button"  exact to="/customers" >+ Add New </Link></div>),
            isDisabled: true,
          },
      ];
  return (
    <div className='drpsimple'>
       <Select placeholder="Select value" options={option} />
    </div>
  )
}

export default DropdownAddButton
