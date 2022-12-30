import React from 'react'
import Select from "react-select";
import "./DropdownWithLargeWidth.scss";

function DropdownWithLargeWidth() {
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
    <div className='drpwidth'>
       <Select placeholder="Select value" options={option} />
    </div>
  )
}

export default DropdownWithLargeWidth
