import React from 'react'
import Select from "react-select";
import "./UniversalDropdown.scss";

function UniversalDropdown() {
    const option = [
        {
          value: "Owner",
          label:(<div className='contdetails' >Value 1</div>),
        },
        {
          value: "Accountant",
          label: (<div className='contdetails'>Value 2</div>),
        },
        {
          value: "Sales Person",
          label: (<div className='contdetails' >Value 3</div>),
        },
       
      ];
  return (
    <div className='drpuni'>
       <Select placeholder="Select value" options={option} />
    </div>
  )
}

export default UniversalDropdown
